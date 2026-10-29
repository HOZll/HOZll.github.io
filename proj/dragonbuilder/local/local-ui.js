/* Local shell behaviour: active tab state, theme switch, dialog translation. */
(() => {
  const THEME_KEY = 'db.theme';
  const root = document.documentElement;

  const THEME_TITLES = {
    auto: 'Theme: Auto',
    light: 'Theme: Light',
    dark: 'Theme: Dark',
  };

  const THEME_ICONS = {
    auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8.2"/><path d="M12 3.8v16.4"/><path d="M12 3.8a8.2 8.2 0 0 1 0 16.4z" fill="currentColor" stroke="none"/></svg>',
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.8v2.2M12 19v2.2M2.8 12H5M19 12h2.2M5.5 5.5l1.6 1.6M16.9 16.9l1.6 1.6M18.5 5.5l-1.6 1.6M7.1 16.9l-1.6 1.6"/></svg>',
    dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z"/></svg>',
  };

  function t(text) {
    return window.LocalI18n ? window.LocalI18n.t(text) : text;
  }

  function setActiveTab(index) {
    document.querySelectorAll('#tabmenu .tabsection').forEach((button, i) => {
      button.classList.toggle('active', i === index);
    });
  }

  function wrapOpenTab() {
    const db = window.DragonBuilder;
    if (!db || typeof db.openTab !== 'function' || db.openTab.__localWrapped) return;
    const original = db.openTab;
    const wrapped = function (index) {
      const result = original.apply(this, arguments);
      try { setActiveTab(index); } catch { /* ignore */ }
      return result;
    };
    wrapped.__localWrapped = true;
    db.openTab = wrapped;
  }

  function resolveTheme(mode) {
    if (mode === 'light' || mode === 'dark') return mode;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function currentMode() {
    try { return localStorage.getItem(THEME_KEY) || 'auto'; } catch { return 'auto'; }
  }

  function updateThemeButton(mode) {
    const button = document.getElementById('localThemeToggle');
    if (!button) return;
    button.dataset.mode = mode;
    button.innerHTML = THEME_ICONS[mode] || THEME_ICONS.auto;
    const label = t(THEME_TITLES[mode] || THEME_TITLES.auto);
    button.title = label;
    button.setAttribute('aria-label', label);
  }

  function applyTheme(mode) {
    root.dataset.theme = resolveTheme(mode);
    try { localStorage.setItem(THEME_KEY, mode); } catch { /* ignore */ }
    updateThemeButton(mode);
  }

  function setupTheme() {
    const button = document.getElementById('localThemeToggle');
    const order = ['auto', 'light', 'dark'];
    if (button) {
      button.addEventListener('click', () => {
        const next = order[(order.indexOf(currentMode()) + 1) % order.length];
        applyTheme(next);
      });
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (currentMode() === 'auto') applyTheme('auto');
    });
    applyTheme(currentMode());
  }

  function setupLanguage() {
    const select = document.getElementById('localLangSelect');
    if (!select) return;
    select.addEventListener('change', () => {
      window.LocalI18n?.setLang(select.value);
    });
  }

  function patchDialogs() {
    const db = window.DragonBuilder;
    if (db && typeof db.confirm === 'function' && !db.confirm.__localPatched) {
      const original = db.confirm;
      const wrapped = function (message) {
        return original.call(this, t(message));
      };
      wrapped.__localPatched = true;
      db.confirm = wrapped;
    }
    if (!window.__localAlertPatched) {
      const originalAlert = window.alert;
      window.alert = function (message) {
        return originalAlert.call(window, t(message));
      };
      window.__localAlertPatched = true;
    }
  }

  /* ---------- Custom select for fine pointers ---------- */
  // Native <option> hover is not observable in Chromium, so desktop gets a
  // custom listbox layered on top of the untouched native select.
  const FINE_POINTER = window.matchMedia('(pointer: fine)').matches;
  const enhancedSelects = [];
  let tooltipEl = null;

  function originalEnglish(option) {
    const en = option?.dataset?.en?.trim();
    return en || '';
  }

  function isTranslated(option) {
    if (!option?.dataset?.en) return false;
    return option.dataset.en.trim() !== option.textContent.trim();
  }

  function positionTooltip(clientX, clientY) {
    if (!tooltipEl || tooltipEl.hidden) return;
    const rect = tooltipEl.getBoundingClientRect();
    let left = clientX + 14;
    let top = clientY + 18;
    if (left + rect.width > window.innerWidth - 8) left = clientX - rect.width - 14;
    if (top + rect.height > window.innerHeight - 8) top = clientY - rect.height - 12;
    tooltipEl.style.left = `${Math.max(8, left)}px`;
    tooltipEl.style.top = `${Math.max(8, top)}px`;
  }

  function showTooltip(event, text) {
    if (!tooltipEl || !text) return;
    tooltipEl.textContent = text;
    tooltipEl.hidden = false;
    positionTooltip(event.clientX, event.clientY);
  }

  function hideTooltip() {
    if (tooltipEl) tooltipEl.hidden = true;
  }

  /* ---------- Hover preview (independent offscreen render) ---------- */
  // Previews never touch the app's layer canvases: each run loads the same
  // layer assets into a private canvas, so hovering cannot race with (or
  // pollute) the real renderer, and the currently selected option previews too.
  const preview = {
    card: null,
    canvas: null,
    label: null,
    empty: null,
    parts: null,
    partsCtx: null,
    probe: null,
    imageCache: new Map(),
    seq: 0,
    queue: Promise.resolve(),
    timer: 0,
    leaveTimer: 0,
  };

  function ensurePreviewCard() {
    if (preview.card) return preview.card;
    const host = document.getElementById('finalImageContainer');
    if (!host) return null;
    const card = document.createElement('div');
    card.className = 'local-preview-card';
    card.hidden = true;
    card.innerHTML = '<div class="local-preview-head"></div><div class="local-preview-body"><canvas class="local-preview-canvas" width="480" height="400"></canvas><div class="local-preview-empty" hidden></div></div>';
    host.appendChild(card);
    preview.card = card;
    preview.canvas = card.querySelector('canvas');
    preview.label = card.querySelector('.local-preview-head');
    preview.empty = card.querySelector('.local-preview-empty');
    return card;
  }

  function inputKeyFor(select) {
    const db = window.DragonBuilder;
    if (!db?.inputs) return null;
    if (select.dataset.localInputKey) return select.dataset.localInputKey;
    for (const [key, element] of Object.entries(db.inputs)) {
      if (element === select) {
        select.dataset.localInputKey = key;
        return key;
      }
    }
    return null;
  }

  function isPreviewable(select, key) {
    return Boolean(
      key &&
      select.closest('#optionscontainer') &&
      (window.DragonBuilder?.inputAffects?.[key] || []).length
    );
  }

  function previewInputs(key, option) {
    const db = window.DragonBuilder;
    return new Proxy({}, {
      get(_target, prop) {
        if (typeof prop !== 'string') return undefined;
        if (prop === key) return { value: option.value, checked: null };
        return db.inputs?.[prop] ?? null;
      },
    });
  }

  function collectPreviewEntries(key, option) {
    const db = window.DragonBuilder;
    const inputs = previewInputs(key, option);
    const entries = [];
    for (const name of db.inputAffects?.[key] || []) {
      const layer = db.layerRegistry?.[name];
      if (!layer) continue;
      const style = layer.styleInput ? inputs[layer.styleInput]?.value : null;
      if (layer.optional && (!style || style === 'none')) continue;
      if (layer.styleInput && !style) continue;
      const color = layer.colorInput ? inputs[layer.colorInput]?.value : null;
      if (layer.recolor && !color) continue;
      let src = null;
      try {
        src = typeof layer.assetPath === 'function' ? layer.assetPath(inputs) : layer.assetPath;
      } catch { src = null; }
      if (typeof src !== 'string' || !src) continue;
      entries.push({ layer, src, color: layer.recolor ? color : null });
    }
    const zIndex = layer => db.zOrder.indexOf(layer.z);
    entries.sort((a, b) => (zIndex(a.layer) - zIndex(b.layer)) || ((a.layer.order ?? 0) - (b.layer.order ?? 0)));
    return entries;
  }

  async function loadPreviewImage(src) {
    if (preview.imageCache.has(src)) return preview.imageCache.get(src);
    const img = await window.DragonBuilder.loadImage(src);
    preview.imageCache.set(src, img);
    return img;
  }

  async function drawPreviewParts(entries) {
    ensurePreviewCard();
    const db = window.DragonBuilder;
    const srcW = db.canvases?.final?.width || 1200;
    const srcH = db.canvases?.final?.height || 1000;

    if (!preview.parts || preview.parts.width !== srcW) {
      preview.parts = document.createElement('canvas');
      preview.parts.width = srcW;
      preview.parts.height = srcH;
      preview.partsCtx = preview.parts.getContext('2d');
      preview.probe = null;
    }
    const partsCtx = preview.partsCtx;
    partsCtx.clearRect(0, 0, srcW, srcH);

    let any = false;
    for (const entry of entries) {
      try {
        let img = await loadPreviewImage(entry.src);
        if (entry.color) img = await db.recolorImageAsync(img, entry.color);
        partsCtx.drawImage(img, 0, 0, srcW, srcH);
        any = true;
      } catch { /* combo has no asset upstream */ }
    }
    return any;
  }

  function paintPreviewCard(any, labelText) {
    ensurePreviewCard();
    const thumb = preview.canvas;
    if (!thumb) return;
    const ctx = thumb.getContext('2d');
    ctx.clearRect(0, 0, thumb.width, thumb.height);
    preview.empty.hidden = any;
    preview.empty.textContent = window.LocalI18n ? window.LocalI18n.t('No extra part') : 'No extra part';

    const srcW = preview.parts ? preview.parts.width : 1200;
    const srcH = preview.parts ? preview.parts.height : 1000;

    let sx = 0;
    let sy = 0;
    let sw = srcW;
    let sh = srcH;

    if (any) {
      // Alpha bounds on a downscaled copy to zoom into the changed part.
      const smallW = 300;
      const smallH = Math.round((srcH / srcW) * smallW);
      if (!preview.probe || preview.probe.width !== smallW) {
        preview.probe = document.createElement('canvas');
        preview.probe.width = smallW;
        preview.probe.height = smallH;
      }
      const probeCtx = preview.probe.getContext('2d');
      probeCtx.clearRect(0, 0, smallW, smallH);
      probeCtx.drawImage(preview.parts, 0, 0, smallW, smallH);
      const data = probeCtx.getImageData(0, 0, smallW, smallH).data;
      let minX = smallW - 1;
      let minY = smallH - 1;
      let maxX = 0;
      let maxY = 0;
      let found = false;
      for (let y = 0; y < smallH; y++) {
        for (let x = 0; x < smallW; x++) {
          if (data[(y * smallW + x) * 4 + 3] > 8) {
            found = true;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      if (found) {
        const scaleX = srcW / smallW;
        const scaleY = srcH / smallH;
        sx = minX * scaleX;
        sy = minY * scaleY;
        sw = (maxX - minX + 1) * scaleX;
        sh = (maxY - minY + 1) * scaleY;

        // Keep the card aspect ratio around the changed region, then pad.
        const ratio = thumb.width / thumb.height;
        if (sw / sh < ratio) {
          const nextW = sh * ratio;
          sx -= (nextW - sw) / 2;
          sw = nextW;
        } else {
          const nextH = sw / ratio;
          sy -= (nextH - sh) / 2;
          sh = nextH;
        }
        const padX = sw * 0.12;
        const padY = sh * 0.12;
        sx -= padX; sy -= padY; sw += padX * 2; sh += padY * 2;

        if (sx < 0) { sw += sx; sx = 0; }
        if (sy < 0) { sh += sy; sy = 0; }
        if (sx + sw > srcW) sw = srcW - sx;
        if (sy + sh > srcH) sh = srcH - sy;
      }
    }

    if (any) {
      const scale = Math.min(thumb.width / sw, thumb.height / sh);
      const dw = sw * scale;
      const dh = sh * scale;
      ctx.drawImage(
        preview.parts, sx, sy, sw, sh,
        (thumb.width - dw) / 2, (thumb.height - dh) / 2, dw, dh
      );
    }

    const prefix = window.LocalI18n ? window.LocalI18n.t('Preview') : 'Preview';
    preview.label.textContent = `${prefix}: ${labelText}`;
  }

  function showPreviewCard() {
    const card = ensurePreviewCard();
    if (!card) return;
    card.hidden = false;
    requestAnimationFrame(() => card.classList.add('is-visible'));
  }

  function hidePreviewCard() {
    if (!preview.card) return;
    preview.card.classList.remove('is-visible');
    preview.card.hidden = true;
  }

  function cancelPreview() {
    clearTimeout(preview.timer);
    clearTimeout(preview.leaveTimer);
    preview.seq++;
    hidePreviewCard();
  }

  function schedulePreview(select, index) {
    const key = inputKeyFor(select);
    if (!isPreviewable(select, key)) return;
    const option = select.options[index];
    if (!option || option.disabled || select.disabled) return;

    clearTimeout(preview.leaveTimer);
    clearTimeout(preview.timer);
    preview.timer = window.setTimeout(() => renderPreview(select, key, option), 110);
  }

  function renderPreview(select, key, option) {
    if (!ensurePreviewCard()) return;
    const seq = ++preview.seq;
    preview.queue = preview.queue
      .then(async () => {
        if (seq !== preview.seq) return;
        const entries = collectPreviewEntries(key, option);
        const any = await drawPreviewParts(entries);
        if (seq !== preview.seq) return;
        paintPreviewCard(any, option.textContent.trim());
        showPreviewCard();
      })
      .catch(() => {});
  }

  /* ---------- Output background ---------- */
  // Intentionally NOT persisted: background settings reset on reload, just
  // like the builder's own options and colours.
  const BG_DEFAULT = { color: '#FFFFFF', transparent: true };
  let bgState = { ...BG_DEFAULT };
  let bgPanelRefs = null;
  try { localStorage.removeItem('db.bg'); } catch { /* ignore */ }

  function sameBgState(a, b) {
    return a.color === b.color && a.transparent === b.transparent;
  }

  // The checkbox is the source of truth: read it back instead of trusting
  // that the change event always fired.
  function readBgStateFromUI() {
    const refs = bgPanelRefs;
    if (!refs) return null;
    let color = refs.color.value;
    if (!/^#[0-9a-f]{6}$/i.test(color)) {
      const hex = refs.hex.value.trim();
      color = /^#[0-9a-f]{6}$/i.test(hex) ? hex : bgState.color;
    }
    return {
      color: color.toUpperCase(),
      transparent: refs.transparent.checked,
    };
  }

  function adoptUiBackgroundState() {
    const ui = readBgStateFromUI();
    if (!ui || sameBgState(ui, bgState)) return false;
    bgState = ui;
    return true;
  }

  function applyBackground(next, refs) {
    bgState = next;
    const host = document.getElementById('finalImageContainer');
    if (host) {
      host.classList.toggle('bg-checker', next.transparent);
      if (next.transparent) {
        host.style.removeProperty('background-color');
        host.style.removeProperty('background-image');
      } else {
        host.style.backgroundColor = next.color;
        host.style.backgroundImage = 'none';
      }
    }
    if (refs) {
      refs.color.value = next.color;
      refs.hex.value = next.color.toUpperCase();
      refs.transparent.checked = next.transparent;
      refs.colorWrap.classList.toggle('is-muted', next.transparent);
    }
  }

  function setupBackgroundPanel() {
    if (document.getElementById('localBgPanel')) return;
    const utilities = document.getElementById('utilitiesPanel');
    if (!utilities) return;

    const panel = document.createElement('section');
    panel.id = 'localBgPanel';
    panel.className = 'local-bg-panel';
    panel.innerHTML = `
      <div class="local-bg-title"></div>
      <div class="local-bg-row">
        <div class="color-input-container local-bg-color">
          <input type="color" id="localBgColor" value="#FFFFFF">
          <input type="text" id="localBgHex" value="#FFFFFF" spellcheck="false" maxlength="7">
        </div>
        <label class="local-bg-check"><input type="checkbox" id="localBgTransparent" checked><span class="local-bg-check-text"></span></label>
      </div>`;
    utilities.insertAdjacentElement('afterend', panel);

    const refs = {
      color: panel.querySelector('#localBgColor'),
      hex: panel.querySelector('#localBgHex'),
      transparent: panel.querySelector('#localBgTransparent'),
      colorWrap: panel.querySelector('.local-bg-color'),
    };
    const title = panel.querySelector('.local-bg-title');
    const checkTexts = panel.querySelectorAll('.local-bg-check-text');

    function refreshLabels() {
      title.textContent = t('Canvas background');
      checkTexts[0].textContent = t('Transparent background');
    }
    refreshLabels();
    window.addEventListener('local-lang-change', refreshLabels);

    function commit(next) {
      applyBackground(next, refs);
    }

    refs.color.addEventListener('input', () => {
      commit({ ...bgState, color: refs.color.value.toUpperCase() });
    });

    function applyHex(raw) {
      let value = raw.trim();
      if (!value.startsWith('#')) value = '#' + value;
      if (/^#[0-9a-f]{6}$/i.test(value)) {
        commit({ ...bgState, color: value.toUpperCase() });
      }
    }
    refs.hex.addEventListener('input', () => applyHex(refs.hex.value));
    refs.hex.addEventListener('blur', () => { refs.hex.value = bgState.color.toUpperCase(); });
    refs.hex.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        applyHex(refs.hex.value);
        refs.hex.blur();
      }
    });

    const bindCheck = (element, key) => {
      const handler = () => commit({ ...bgState, [key]: element.checked });
      element.addEventListener('change', handler);
      element.addEventListener('input', handler);
    };
    bindCheck(refs.transparent, 'transparent');

    bgPanelRefs = refs;
    applyBackground(bgState, refs);

    // Safety net: if a click/event ever gets swallowed, pick the change up
    // from the DOM within a quarter second (host preview included).
    setInterval(() => {
      if (adoptUiBackgroundState()) applyBackground(bgState, bgPanelRefs);
    }, 250);
  }

  // Transparent export keeps the original downloader; opaque export composites
  // the chosen colour underneath a copy of the canvas (the canvas itself is
  // never modified, so the live preview stays untouched).
  function installDownloadWithBackground() {
    const db = window.DragonBuilder;
    if (!db || db.downloadImage?.__localBg) return;
    const original = db.downloadImage;

    const wrapped = function () {
      if (bgState.transparent && typeof original === 'function') {
        return original.call(db);
      }
      const canvas = document.getElementById('canvasFinal');
      if (!canvas) return;

      let source = canvas;
      if (!bgState.transparent) {
        const out = document.createElement('canvas');
        out.width = canvas.width;
        out.height = canvas.height;
        const ctx = out.getContext('2d');
        ctx.fillStyle = bgState.color;
        ctx.fillRect(0, 0, out.width, out.height);
        ctx.drawImage(canvas, 0, 0);
        source = out;
      }

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      source.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        if (isMobile) {
          const newTab = window.open('', '_blank');
          if (newTab) newTab.location = url;
          else window.location.href = url;
          setTimeout(() => URL.revokeObjectURL(url), 5000);
        } else {
          const link = document.createElement('a');
          link.href = url;
          link.download = 'dragon.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }
      }, 'image/png');
    };
    wrapped.__localBg = true;
    db.downloadImage = wrapped;
  }

  function enhanceSelect(select) {
    if (select.dataset.localEnhanced || select.id === 'localLangSelect') return;
    select.dataset.localEnhanced = '1';

    const wrap = document.createElement('div');
    wrap.className = 'local-select-wrap';
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);
    select.classList.add('local-native-select');
    select.tabIndex = -1;

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'local-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = '<span class="local-select-label"></span><svg class="local-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    wrap.appendChild(trigger);

    const labelEl = trigger.querySelector('.local-select-label');
    const state = { open: false, popup: null, activeIndex: -1, lastLabel: null };

    function sync() {
      const option = select.selectedOptions[0];
      const text = option ? option.textContent.trim() : '';
      if (text !== state.lastLabel) {
        labelEl.textContent = text;
        state.lastLabel = text;
      }
      trigger.disabled = select.disabled;
      trigger.classList.toggle('is-disabled', select.disabled);
      const en = isTranslated(option) ? originalEnglish(option) : '';
      trigger.title = en;
    }

    function closePopup() {
      if (!state.open) return;
      state.open = false;
      if (state.popup) state.popup.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      hideTooltip();
      cancelPreview();
      document.removeEventListener('pointerdown', onDocPointer, true);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', closePopup);
      window.removeEventListener('keydown', onKeyDown);
      trigger.focus({ preventScroll: true });
    }

    function onDocPointer(event) {
      if (state.popup?.contains(event.target) || trigger.contains(event.target)) return;
      closePopup();
    }

    function onScroll(event) {
      if (state.popup && state.popup.contains(event.target)) return;
      closePopup();
    }

    function markActive(index) {
      const items = state.popup ? [...state.popup.children] : [];
      state.activeIndex = index;
      items.forEach((item, i) => item.classList.toggle('is-active', i === index));
      const active = items[index];
      if (active) active.scrollIntoView({ block: 'nearest' });
    }

    function choose(index) {
      const option = select.options[index];
      if (!option || option.disabled || select.disabled) return;
      cancelPreview();
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      closePopup();
      sync();
    }

    function buildPopup() {
      const popup = document.createElement('div');
      popup.className = 'local-select-popup';
      popup.setAttribute('role', 'listbox');
      [...select.options].forEach((option, i) => {
        const item = document.createElement('div');
        item.className = 'local-select-item';
        item.setAttribute('role', 'option');
        item.textContent = option.textContent.trim();
        if (option.selected) {
          item.classList.add('is-selected');
          item.setAttribute('aria-selected', 'true');
        }
        if (option.disabled) item.classList.add('is-disabled');

        item.addEventListener('mouseenter', event => {
          if (isTranslated(option)) showTooltip(event, originalEnglish(option));
          schedulePreview(select, i);
        });
        item.addEventListener('mousemove', event => {
          if (isTranslated(option)) positionTooltip(event.clientX, event.clientY);
        });
        item.addEventListener('mouseleave', () => {
          hideTooltip();
          clearTimeout(preview.timer);
          preview.leaveTimer = window.setTimeout(() => cancelPreview(), 140);
        });
        item.addEventListener('click', () => choose(i));
        popup.appendChild(item);
      });
      return popup;
    }

    function positionPopup() {
      const rect = trigger.getBoundingClientRect();
      const popup = state.popup;
      popup.style.width = `${Math.max(rect.width, 220)}px`;
      popup.style.left = `${Math.min(rect.left, window.innerWidth - Math.max(rect.width, 220) - 8)}px`;
      popup.style.top = '0px';
      popup.hidden = false;
      const height = popup.offsetHeight;
      let top = rect.bottom + 6;
      if (top + height > window.innerHeight - 8) top = Math.max(8, rect.top - height - 6);
      popup.style.top = `${top}px`;
    }

    function openPopup() {
      if (select.disabled) return;
      sync();
      if (state.popup) state.popup.remove();
      state.popup = buildPopup();
      document.body.appendChild(state.popup);
      positionPopup();
      state.open = true;
      trigger.setAttribute('aria-expanded', 'true');
      const selectedIndex = [...select.options].findIndex(o => o.selected && !o.disabled);
      const firstEnabled = [...select.options].findIndex(o => !o.disabled);
      markActive(selectedIndex >= 0 ? selectedIndex : Math.max(firstEnabled, 0));
      document.addEventListener('pointerdown', onDocPointer, true);
      // Defer: opening may scroll an ancestor (scrollIntoView) and would
      // otherwise immediately close the popup via onScroll.
      requestAnimationFrame(() => {
        if (state.open) window.addEventListener('scroll', onScroll, true);
      });
      window.addEventListener('resize', closePopup);
      window.addEventListener('keydown', onKeyDown);
    }

    function onKeyDown(event) {
      if (!state.open) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closePopup();
        return;
      }
      if (event.key === 'Tab') { closePopup(); return; }
      const count = select.options.length;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        let next = state.activeIndex;
        const step = event.key === 'ArrowDown' ? 1 : -1;
        for (let guard = 0; guard < count; guard++) {
          next = (next + step + count) % count;
          if (!select.options[next].disabled) break;
        }
        markActive(next);
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        choose(state.activeIndex);
      }
    }

    trigger.addEventListener('click', () => {
      if (state.open) closePopup();
      else openPopup();
    });
    trigger.addEventListener('keydown', event => {
      if (!state.open && (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        openPopup();
      }
    });
    select.addEventListener('change', sync);

    enhancedSelects.push({ select, sync, close: closePopup });
    sync();
  }

  function setupCustomSelects() {
    if (!FINE_POINTER) return;
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'local-select-tooltip';
    tooltipEl.hidden = true;
    document.body.appendChild(tooltipEl);

    const selects = document.querySelectorAll('#optionscontainer select, #randomizeSelect, #presetSelect');
    selects.forEach(enhanceSelect);

    // Programmatic value changes (presets, randomize, import) don't fire events.
    setInterval(() => enhancedSelects.forEach(entry => entry.sync()), 250);

    window.addEventListener('local-lang-change', () => {
      enhancedSelects.forEach(entry => entry.close());
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    wrapOpenTab();
    setActiveTab(0);
    setupTheme();
    setupLanguage();
    patchDialogs();
    setupCustomSelects();
    setupBackgroundPanel();
    installDownloadWithBackground();
  });

  window.addEventListener('local-lang-change', () => {
    updateThemeButton(currentMode());
  });
})();
