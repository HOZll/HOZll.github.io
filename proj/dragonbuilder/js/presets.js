// CONFIRMATION MODAL

DragonBuilder.confirm = function (message) {
  return new Promise(resolve => {
    const modal = document.getElementById("confirmModal");
    const msg = document.getElementById("confirmMessage");
    const yesBtn = document.getElementById("confirmYes");
    const noBtn = document.getElementById("confirmNo");
    if (!modal || !msg || !yesBtn || !noBtn) {
      console.warn("Confirm modal missing, falling back to native confirm.");
      resolve(window.confirm(message));
      return;
    }
    msg.textContent = message;
    modal.style.display = "flex";
    const cleanup = () => {
      modal.style.display = "none";
      yesBtn.onclick = null;
      noBtn.onclick = null;
    };
    yesBtn.onclick = () => {
      cleanup();
      resolve(true);
    };
    noBtn.onclick = () => {
      cleanup();
      resolve(false);
    };
  });
};


// LOAD PRESET INCLUDING RESET TO DEFAULT

DragonBuilder.loadPreset = async function (presetName) {
  //console.log("Loading preset:", presetName);
  const confirmed = await DragonBuilder.confirm(
    "This action will replace your current dragon. Continue?"
  );
  if (!confirmed) return;
  DragonBuilder.showLoadingScreen();
  await new Promise(requestAnimationFrame);
  await new Promise(resolve => setTimeout(resolve, 0));
  try {
    const url = `/proj/dragonbuilder/presets/${presetName}.json`;
    console.log("Fetching:", url);
    const response = await fetch(url);
    console.log("Response status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const preset = await response.json();
    //console.log("Preset data:", preset);
    await DragonBuilder.applyState(preset);
  } catch (err) {
    console.error("Failed to load preset:", err);
    alert("Failed to load preset.");
  }
  DragonBuilder.hideLoadingScreen();
};


// CACHE PRESETS

DragonBuilder.presetCache = {};

async function fetchPreset(name) {
  if (DragonBuilder.presetCache[name]) {
    return DragonBuilder.presetCache[name];
  }
  const res = await fetch(`/presets/${name}.json`);
  const data = await res.json();
  DragonBuilder.presetCache[name] = data;
  return data;
};



// APPLY STATE FUNCTION

DragonBuilder.applyState = async function (state, options = {}) {
  const {
    pushHistory = true,
    redraw = true
  } = options;
  const inputs = DragonBuilder.inputs;
  const affects = DragonBuilder.inputAffects;
  const changedInputs = [];
  const layersToRedraw = new Set();
  for (const [key, value] of Object.entries(state)) {
    const input = inputs[key];
    if (!input) continue;
    const current =
      input.type === "checkbox" ? input.checked : input.value;
    if (current === value) continue;
    if (input.type === "checkbox") {
      input.checked = value;
    } else {
      input.value = value;
    }
    changedInputs.push(key);
    const affected = affects[key];
    if (affected) {
      affected.forEach(layer => layersToRedraw.add(layer));
    }
  }


  DragonBuilder.applyInputRules();
  if (redraw) {
    for (const layerName of layersToRedraw) {
      const layer = DragonBuilder.layerRegistry[layerName];
      if (!layer) continue;
      try {
        if (typeof layer.draw === "function") {
          await layer.draw();
        }
        else if (layer.layerName) {
          await DragonBuilder.renderLayer(layer);
        }
      } catch (err) {
        console.error("Layer redraw failed:", layerName, err);
      }
    }
    DragonBuilder.mergeLayers();
  }
  if (pushHistory && changedInputs.length) {
    DragonBuilder.pushHistory();
  }



};