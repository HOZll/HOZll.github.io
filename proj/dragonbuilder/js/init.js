window.DragonBuilder = window.DragonBuilder || {};

// INITIAL RENDER
DragonBuilder.initialRender = async function () {
  console.log("Initial render starting...");

  if (!DragonBuilder.layerRegistry) {
    console.error("Layer registry missing!");
    return;
  }

  for (const layer of Object.values(DragonBuilder.layerRegistry)) {
    try {
      if (typeof layer.draw === "function") {
        await layer.draw();
      } else if (layer.layerName && DragonBuilder.renderLayer) {
        await DragonBuilder.renderLayer(layer);
      }
    } catch (err) {
      console.error("Initial render failed for layer:", layer.layerName || layer, err);
    }
  }

  DragonBuilder.mergeLayers();
  DragonBuilder.pushHistory();
  console.log("Initial render complete.");
};


// INITIALIZATION
DragonBuilder.init = async function () {
  DragonBuilder.showLoadingScreen();

  const required = {
    initCanvases: DragonBuilder.initCanvases,
    initInputs: DragonBuilder.initInputs,
    initListeners: DragonBuilder.initListeners,
    layerRegistry: DragonBuilder.layerRegistry
  };

  const missing = [];

  for (const [name, value] of Object.entries(required)) {
    if (!value) {
      missing.push(`${name} (undefined)`);
    } 
    else if (name === "layerRegistry" && (!value || Object.keys(value).length === 0)) {
      missing.push(`${name} (empty)`);
    }
  }

  if (missing.length) {
    console.group("❌ DragonBuilder init failed");

    missing.forEach(m => console.error("Missing:", m));

    console.info("Loaded state snapshot:", {
      initCanvases: !!DragonBuilder.initCanvases,
      initInputs: !!DragonBuilder.initInputs,
      initListeners: !!DragonBuilder.initListeners,
      layerRegistryKeys: Object.keys(DragonBuilder.layerRegistry || {})
    });

    console.groupEnd();
    DragonBuilder.hideLoadingScreen();
    return;
  }

  console.group("DragonBuilder init");
  console.time("DragonBuilder init");

  DragonBuilder.initCanvases();
  DragonBuilder.initInputs();
  DragonBuilder.initListeners();

  await DragonBuilder.initialRender();

  DragonBuilder.hideLoadingScreen();

  console.timeEnd("DragonBuilder init");
  console.log("Initialization complete");
  console.groupEnd();
};

// INPUT VALIDATOR
DragonBuilder.validateInputs = function () {

  for (const [name, el] of Object.entries(DragonBuilder.inputs)) {

    if (!el) {
      console.warn("Missing HTML input for:", name);
    }

  }

};


// DOM READY ENTRY
document.addEventListener("DOMContentLoaded", () => {
  const required = [
    "initCanvases",
    "initInputs",
    "initListeners",
    "initialRender"
  ];

  const missing = required.filter(k => typeof DragonBuilder[k] !== "function");

  if (missing.length) {
    console.error("DragonBuilder missing functions:", missing);
    return;
  }

  DragonBuilder.init().catch(err => {
    console.error("DragonBuilder failed to initialize:", err);
  });
});


// Warn users about unsaved changes when they attempt to close or refresh the page
window.addEventListener('beforeunload', (event) => {
  // Cancel the event to show the confirmation dialog
  event.preventDefault();
  
  // Necessary for Chrome and some other browsers
  event.returnValue = '';
});