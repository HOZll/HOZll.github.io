window.DragonBuilder = window.DragonBuilder || {};

// Z-ORDER LEVELS
DragonBuilder.zOrder = [
  "behindFrontWing",
  "frontWing",
  "inFrontOfWing"
];

// CACHES
DragonBuilder._recolorCache = new Map();
DragonBuilder._colorCache = new Map();
DragonBuilder._renderToken = 0;
DragonBuilder.assets = {};

// RECOLOR
DragonBuilder.recolorImageAsync = async function (img, color) {
  const key = img.src + "|" + color;

  if (DragonBuilder._recolorCache.has(key)) {
    return DragonBuilder._recolorCache.get(key);
  }

  // Cache parsed color
  let rgb = DragonBuilder._colorCache.get(color);
  if (!rgb) {
    rgb = [
      parseInt(color.slice(1, 3), 16),
      parseInt(color.slice(3, 5), 16),
      parseInt(color.slice(5, 7), 16)
    ];
    DragonBuilder._colorCache.set(color, rgb);
  }

  const [r, g, b] = rgb;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] !== 0) {
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  DragonBuilder._recolorCache.set(key, canvas);
  return canvas;
};


// MERGE LAYERS FUNCTION
DragonBuilder.mergeLayers = function () {
  const finalCtx = DragonBuilder.ctx.final;
  const finalCanvas = DragonBuilder.canvases.final;
  const hideFrontWing = document.getElementById("hideFrontWing")?.checked;

  finalCtx.clearRect(0, 0, finalCanvas.width, finalCanvas.height);

  const registry = DragonBuilder.layerRegistry;

  DragonBuilder.zOrder.forEach(zLevel => {

    if (zLevel === "frontWing" && hideFrontWing) return;

    const layers = Object.entries(registry)
      .filter(([_, layer]) => layer.z === zLevel)
      .sort((a, b) => (a[1].order ?? 0) - (b[1].order ?? 0));

    for (const [name] of layers) {
      const canvas = DragonBuilder.canvases[name];
      if (!canvas || !canvas._hasContent) continue;

      finalCtx.drawImage(canvas, 0, 0);
    }
  });

  // Throttle expensive export
  if (!DragonBuilder._lastExport || Date.now() - DragonBuilder._lastExport > 150) {
    const imgEl = document.getElementById("finalImage");
    if (imgEl) imgEl.src = finalCanvas.toDataURL();
    DragonBuilder._lastExport = Date.now();
  }
};

// SHOW LOADING SCREEN
DragonBuilder.showLoadingScreen = function () {
  const el = document.getElementById("loadingScreen");
  if (!el) return;

  el.style.display = "flex";
  el.style.opacity = "1";
  el.style.pointerEvents = "auto";
};

DragonBuilder.hideLoadingScreen = function () {
  const el = document.getElementById("loadingScreen");
  if (!el) return;

  el.style.opacity = "0";
  el.style.pointerEvents = "none";

  setTimeout(() => {
    el.style.display = "none";
  }, 200);
};

// Redraw from Inputs

DragonBuilder.redrawFromInputs = async function (inputNames) {
  // Normalize to array
  if (!Array.isArray(inputNames)) {
    inputNames = [inputNames];
  }

  const token = ++DragonBuilder._renderToken;

  DragonBuilder.showLoadingScreen();

  await new Promise(requestAnimationFrame);
  await new Promise(resolve => setTimeout(resolve, 0));

  const affects = DragonBuilder.inputAffects;
  const layersToRedraw = new Set();

  inputNames.forEach(name => {
    const affected = affects[name];
    if (!affected) return;
    affected.forEach(layer => layersToRedraw.add(layer));
  });

  const renderPromises = [];

  for (const layerName of layersToRedraw) {
    const layer = DragonBuilder.layerRegistry[layerName];
    if (!layer) continue;

    renderPromises.push(
      typeof layer.draw === "function"
        ? layer.draw()
        : DragonBuilder.renderLayer(layer)
    );
  }

  await Promise.all(renderPromises);

  if (token !== DragonBuilder._renderToken) return;

  DragonBuilder.mergeLayers();
  DragonBuilder.hideLoadingScreen();
};

// IMAGE LOADER

DragonBuilder.loadImage = function (src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};


// HIDE LOADING SCREEN
DragonBuilder.hideLoadingScreen = function () {
  const loadingScreen = document.getElementById("loadingScreen");

  if (!loadingScreen) {
    console.warn("Loading screen element not found.");
    return;
  }
  loadingScreen.style.opacity = "0";
  loadingScreen.style.pointerEvents = "none";

  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 200);
};


// NEW RENDERER
DragonBuilder.renderLayer = async function (config) {
  const {
    layerName,
    styleInput,
    colorInput,
    assetPath,
    cacheKey,
    recolor = false,
    optional = false
  } = config;

  const ctx = DragonBuilder.ctx?.[layerName];
  const canvas = DragonBuilder.canvases?.[layerName];
  const inputs = DragonBuilder.inputs;
  const debug = DragonBuilder.DEBUG_LAYERS;

  if (!ctx || !canvas) return;

  // Reset
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas._hasContent = false;

  const style = styleInput ? inputs?.[styleInput]?.value : null;
  const color = colorInput ? inputs?.[colorInput]?.value : null;

  // Skip optional
  if (optional && (!style || style === "none")) return;
  if (styleInput && !style) return;
  if (recolor && !color) return;

  const src = typeof assetPath === "function"
    ? assetPath(inputs)
    : assetPath;

  if (!src) return;

  try {
    const finalCacheKey =
      typeof cacheKey === "function"
        ? cacheKey(inputs)
        : style ? `${cacheKey}_${style}` : cacheKey;

    let img = DragonBuilder.assets[finalCacheKey];

    if (!img) {
      img = await DragonBuilder.loadImage(src);
      DragonBuilder.assets[finalCacheKey] = img;
    }

    if (!img?.width) return;

    if (recolor) {
      img = await DragonBuilder.recolorImageAsync(img, color);
    }

    ctx.drawImage(img, 0, 0);
    canvas._hasContent = true;

  } catch (err) {
    console.error(`[${layerName}] render failed`, err);
  }
};