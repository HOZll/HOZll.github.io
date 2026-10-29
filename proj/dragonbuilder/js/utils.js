window.DragonBuilder = window.DragonBuilder || {};




// OPEN TAB FUNCTION
DragonBuilder.openTab = function(tabIndex) {
    const sections = ["section1", "section2", "section3", "section4", "section5"];
    const tabs = ["tab1", "tab2", "tab3", "tab4", "tab5"];
    const colors = ["#ffa6be", "#ffe4a6", "#d3ffa6", "#a6ddff", "#e3a6ff"];

    sections.forEach((id, index) => {
        document.getElementById(id).style.display = (index === tabIndex) ? "block" : "none";
        document.getElementById(tabs[index]).style.fontWeight = (index === tabIndex) ? "bold" : "normal";
    });

    const container = document.getElementById("optionscontainer");
    container.style.borderColor = colors[tabIndex];
    container.style.setProperty('--scrollbar-color', colors[tabIndex]);
    container.style.setProperty('--scrollbar-color-hover', colors[tabIndex]);
}

// DEBOUNCE FUNCTION
DragonBuilder.debounce = function (func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

// AUTOMATICALLY WIRE COLOR PICKERS AND TEXT INPUTS
DragonBuilder.autoWireColorInputs = function () {
  const hexInputs = document.querySelectorAll('input[type="text"][id$="Hex"]');

  hexInputs.forEach(textInput => {
    const baseId = textInput.id.replace(/Hex$/, "");
    const colorPicker = document.getElementById(baseId);

    if (!colorPicker || colorPicker.type !== "color") {
      console.warn("No matching color picker for", textInput.id);
      return;
    }

    DragonBuilder.syncColorInputs(baseId, textInput.id, baseId);
  });

  console.log("Auto-wired color inputs");
};



// CONFIRM MODAL
DragonBuilder.confirmAction = function (message) {
  return new Promise(resolve => {
    const modal = document.getElementById("confirmModal");
    const msg = document.getElementById("confirmMessage");
    const confirmBtn = document.getElementById("confirmYes");
    const cancelBtn = document.getElementById("confirmNo");

    if (!modal || !confirmBtn || !cancelBtn) {
      console.warn("Modal elements missing");
      resolve(false);
      return;
    }

    msg.textContent = message;
    modal.classList.add("open");

    const cleanup = () => {
      modal.classList.remove("open");
      confirmBtn.removeEventListener("click", onConfirm);
      cancelBtn.removeEventListener("click", onCancel);
    };

    const onConfirm = () => {
      cleanup();
      resolve(true);
    };

    const onCancel = () => {
      cleanup();
      resolve(false);
    };

    confirmBtn.addEventListener("click", onConfirm);
    cancelBtn.addEventListener("click", onCancel);
  });
};




// SYNC COLOR PICKER AND TEXT INPUT
DragonBuilder.syncColorInputs = function (colorPickerId, textInputId, inputKey) {
  const colorPicker = document.getElementById(colorPickerId);
  const textInput = document.getElementById(textInputId);

  if (!colorPicker || !textInput) {
    console.warn("Color sync elements missing:", colorPickerId, textInputId);
    return;
  }

  // Live update text while scrubbing
  colorPicker.addEventListener("input", () => {
    textInput.value = colorPicker.value.toUpperCase();
  });
  
// Only redraw when picker closes
colorPicker.addEventListener("change", () => {
  DragonBuilder.redrawFromInputs([inputKey]);
});

// Manual hex entry
function updatePickerFromText() {
  const hex = textInput.value.trim().toUpperCase();
  if (/^#[0-9A-F]{6}$/.test(hex)) {
    colorPicker.value = hex;
    DragonBuilder.redrawFromInputs([inputKey]);
  }
}

  textInput.addEventListener("change", updatePickerFromText);
};





// LAYER VALIDATOR DEBUG TOOL
DragonBuilder.validateLayers = function () {

  console.group("🔍 DragonBuilder Layer Validation");

  const layers = DragonBuilder.layerRegistry;
  const inputs = DragonBuilder.inputs;

  if (!layers) {
    console.error("layerRegistry missing");
    console.groupEnd();
    return;
  }

  const seenCacheKeys = new Set();

  for (const [key, layer] of Object.entries(layers)) {

    console.group(`Layer: ${key}`);

    // --- Basic structure checks ---

    if (!layer.layerName) {
      console.warn("Missing layerName");
    }

    if (!layer.assetPath && !layer.draw) {
      console.error("Layer missing assetPath AND draw function");
    }

    // --- Color input validation ---

    if (layer.colorInput) {
      if (!inputs[layer.colorInput]) {
        console.error("Invalid colorInput:", layer.colorInput);
      }
    }

    // --- Try executing assetPath safely ---

    if (layer.assetPath) {
      try {

        const path = layer.assetPath(inputs);

        if (path !== null && typeof path !== "string") {
          console.warn("assetPath returned non-string:", path);
        }

        if (typeof path === "string" && !path.endsWith(".png")) {
          console.warn("assetPath may be invalid:", path);
        }

      } catch (err) {
        console.error("assetPath threw error:", err);
      }
    }

    // --- Try executing cacheKey safely ---

    if (layer.cacheKey) {
      try {

        const key = layer.cacheKey(inputs);

        if (key && seenCacheKeys.has(key)) {
          console.warn("Duplicate cacheKey detected:", key);
        }

        if (key) {
          seenCacheKeys.add(key);
        }
        
        if (layer.optional && !layer.styleInput) {
  console.warn("Optional layer has no styleInput (likely bug)");
}

  console.log("Layer count:", Object.keys(layers).length);
  console.groupEnd();  

      } catch (err) {
        console.error("cacheKey threw error:", err);
      }
    }

    // --- Z group check ---

    const validZ = [
      "background",
      "behindFrontWing",
      "frontWing",
      "inFrontOfWing",
      "foreground"
    ];

    if (layer.z && !validZ.includes(layer.z)) {
      console.warn("Unknown z-group:", layer.z);
    }

    // --- Order check ---

    if (typeof layer.order !== "number") {
      console.warn("Missing numeric order value");
    }

    console.groupEnd();
  }



};

DragonBuilder.validateLayerLinks = function () {

  console.group("🔗 DragonBuilder Layer Link Validation");

  const layers = DragonBuilder.layerRegistry;
  const inputs = DragonBuilder.inputs;
  const affects = DragonBuilder.inputAffects;
  const canvases = DragonBuilder.canvases;

  if (!layers) {
    console.error("layerRegistry missing");
    console.groupEnd();
    return;
  }

  const affectedLayers = new Set();

  // Build reverse lookup of inputAffects
  for (const [input, list] of Object.entries(affects || {})) {

    if (!inputs[input]) {
      console.warn(`inputAffects references unknown input: ${input}`);
    }

    for (const layer of list) {
      affectedLayers.add(layer);
    }
  }

  for (const [name, layer] of Object.entries(layers)) {

    console.group(`Layer link check: ${name}`);

    // --- Check if layer is reachable from inputs

    if (!affectedLayers.has(name)) {
      console.warn("Layer is never triggered by any input");
    }

    // --- Optional layers must have styleInput

    if (layer.optional && !layer.styleInput) {
      console.warn("Optional layer missing styleInput");
    }

    // --- styleInput existence

    if (layer.styleInput && !inputs[layer.styleInput]) {
      console.error("Invalid styleInput:", layer.styleInput);
    }

    // --- canvas existence

    if (!canvases?.[name]) {
      console.error("No canvas registered for layer");
    }

    // --- colorInput existence

    if (layer.colorInput && !inputs[layer.colorInput]) {
      console.error("Invalid colorInput:", layer.colorInput);
    }

    console.groupEnd();
  }

  console.groupEnd();

};

DragonBuilder.validateAll = function () {

  DragonBuilder.validateLayers();
  DragonBuilder.validateLayerLinks();

};