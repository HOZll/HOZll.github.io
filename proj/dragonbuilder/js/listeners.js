window.DragonBuilder = window.DragonBuilder || {};

// GLOBAL CLEAR LAYER
DragonBuilder.clearLayer = function (layerName) {
  const ctx = DragonBuilder.ctx[layerName];
  const canvas = DragonBuilder.canvases[layerName];
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

// AUTO-WIRE INPUTS
DragonBuilder.autoWireInputs = function () {
  const inputs = DragonBuilder.inputs;
  const affects = DragonBuilder.inputAffects;

  if (!inputs || !affects) {
    console.warn("autoWireInputs failed: inputs or inputAffects missing");
    return;
  }

  Object.keys(affects).forEach(inputName => {
    const el = inputs[inputName];

    if (!el) {
      console.warn(`No input element found for "${inputName}"`);
      return;
    }

    if (el.dataset.wired === "true") return;
    el.dataset.wired = "true";

    const eventType =
      el.tagName === "SELECT" || el.type === "checkbox"
        ? "change"
        : "input";

    const handler = DragonBuilder.debounce(() => {
      DragonBuilder.applyInputRules(inputName);
      DragonBuilder.redrawFromInputs([inputName]);
      DragonBuilder.pushHistory();
    }, 60);

    el.addEventListener(eventType, handler);
  });

  DragonBuilder.applyInputRules();

  console.log("Auto-wired inputs successfully");
};




// INPUT LISTENERS
DragonBuilder.initListeners = function () {

  DragonBuilder.autoWireInputs();

  const $ = id => document.getElementById(id);

  // --- PRESET UI ---
  const presetSelect = $("presetSelect");
  const loadButton = $("loadpresetButton");

  if (presetSelect && loadButton) {

    presetSelect.addEventListener("change", () => {
      loadButton.disabled = !presetSelect.value;
    });

    loadButton.addEventListener("click", () => {
      const selectedPreset = presetSelect.value;

      if (!selectedPreset) {
        console.warn("No preset selected.");
        return;
      }

      DragonBuilder.loadPreset(selectedPreset);
    });
    }


  // --- RANDOMIZE UI ---
  const randomizeSelect = $("randomizeSelect");
  const randomizeButton = $("randomizeButton");

  if (randomizeSelect && randomizeButton) {

    randomizeSelect.addEventListener("change", () => {
      randomizeButton.disabled = !randomizeSelect.value;
    });

    randomizeButton.addEventListener("click", () => {
      const selectedMode = randomizeSelect.value;

      if (!selectedMode) {
        console.warn("No randomize mode selected.");
        return;
      }

      DragonBuilder.randomize(selectedMode);
    });
    }



  // --- OTHER LISTENERS ---
  $("downloadPNGButton")?.addEventListener("click", () =>
    DragonBuilder.downloadImage?.()
  );

  $("exportJSONButton")?.addEventListener("click", () =>
    DragonBuilder.exportJSON?.()
  );

  $("undoButton")?.addEventListener("click", () =>
    DragonBuilder.undo?.()
  );

  $("redoButton")?.addEventListener("click", () =>
    DragonBuilder.redo?.()
  );

  $("resetButton")?.addEventListener("click", () =>
    DragonBuilder.loadPreset?.("default")
  );
  
  $("redrawButton")?.addEventListener("click", () =>
    DragonBuilder.initialRender?.()
  );

  $("hideFrontWing")?.addEventListener("change", () =>
    DragonBuilder.initialRender?.()
  );

  $("importJSON")?.addEventListener("change", function () {
    const file = this.files?.[0];
    if (!file) return;

    DragonBuilder.importJSON?.(file);
    this.value = "";
  });

};