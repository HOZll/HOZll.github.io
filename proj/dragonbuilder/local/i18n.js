/* Lightweight text-node i18n for the local Dragon Builder build. */
(() => {
  const BASE = '/proj/dragonbuilder/local/i18n/';
  const LANGS = ['zh-CN', 'en'];
  const LS_KEY = 'db.lang';

  const dicts = {};
  const originals = new WeakMap();
  let textNodes = null;
  const state = { lang: null, ready: false };

  function detectLang() {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved && LANGS.includes(saved)) return saved;
    } catch { /* storage unavailable */ }
    const nav = (navigator.language || 'en').toLowerCase();
    return nav.startsWith('zh') ? 'zh-CN' : 'en';
  }

  function collectTextNodes() {
    if (textNodes) return textNodes;
    textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || parent.closest('script, style, textarea')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    while (walker.nextNode()) {
      const node = walker.currentNode;
      originals.set(node, node.nodeValue);
      textNodes.push(node);
    }
    return textNodes;
  }

  async function ensureDict(lang) {
    if (dicts[lang]) return dicts[lang];
    try {
      const res = await fetch(`${BASE}${lang}.json`, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      dicts[lang] = await res.json();
    } catch {
      dicts[lang] = { meta: { code: lang, name: lang }, text: {} };
    }
    return dicts[lang];
  }

  function applyDict(lang) {
    const dict = dicts[lang] || { meta: {}, text: {} };
    const map = dict.text || {};

    for (const node of collectTextNodes()) {
      const source = originals.get(node);
      if (source == null) continue;
      const key = source.trim();
      const lead = source.match(/^\s*/)[0];
      const trail = source.match(/\s*$/)[0];
      node.nodeValue = lead + (map[key] ?? key) + trail;
      if (node.parentElement?.tagName === 'OPTION') {
        node.parentElement.dataset.en = key;
      }
    }

    document.documentElement.lang = lang;
    if (dict.meta?.title) document.title = dict.meta.title;

    const select = document.getElementById('localLangSelect');
    if (select) select.value = lang;

    state.ready = true;
    document.body.classList.add('i18n-ready');
  }

  async function setLang(lang) {
    if (!LANGS.includes(lang)) lang = 'en';
    state.lang = lang;
    try { localStorage.setItem(LS_KEY, lang); } catch { /* ignore */ }
    await ensureDict(lang);
    applyDict(lang);
    window.dispatchEvent(new CustomEvent('local-lang-change', { detail: { lang } }));
  }

  function t(text) {
    if (!text) return text;
    const map = dicts[state.lang]?.text || {};
    return map[text] ?? text;
  }

  async function boot() {
    const lang = detectLang();
    await Promise.all([ensureDict('zh-CN'), ensureDict('en')]);
    await setLang(lang);
  }

  window.LocalI18n = {
    setLang,
    t,
    get lang() { return state.lang; },
    apply: () => { if (state.lang) applyDict(state.lang); },
  };

  document.addEventListener('DOMContentLoaded', () => {
    boot().catch(() => document.body.classList.add('i18n-ready'));
    // Never leave the UI hidden if dictionary loading stalls.
    setTimeout(() => document.body.classList.add('i18n-ready'), 4000);
  });
})();
