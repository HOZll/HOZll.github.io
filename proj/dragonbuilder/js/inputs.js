window.DragonBuilder = window.DragonBuilder || {};

DragonBuilder.stateHistory = [];
DragonBuilder.historyIndex = -1;
DragonBuilder.isRestoringHistory = false;

// DEFINE CONSTANTS FOR EACH INPUT
DragonBuilder.initInputs = function () {
DragonBuilder.inputs = {
baseColor: document.getElementById("baseColor"),
baseColorHex: document.getElementById("baseColorHex"),
baseTexture: document.getElementById("baseTexture"),
bellyColor: document.getElementById("bellyColor"),
bellyColorHex: document.getElementById("bellyColorHex"),
bellyStyle: document.getElementById("bellyStyle"),
boneColor: document.getElementById("boneColor"),
boneColorHex: document.getElementById("boneColorHex"),
breathStyle: document.getElementById("breath"),
breathColor: document.getElementById("breathColor"),
breathColorHex: document.getElementById("breathColorHex"),
browPosition: document.getElementById("browPosition"),
browColor: document.getElementById("browColor"),
browColorHex: document.getElementById("browColorHex"),
browStyle: document.getElementById("browStyle"),
earStyle: document.getElementById("earStyle"),
eyeScleraColor: document.getElementById("eyeScleraColor"),
eyeMarkingStyle: document.getElementById("eyemarkingStyle"),
eyeMarkingColor: document.getElementById("eyemarkingColor"),
eyePupil: document.getElementById("eyePupilCheckbox"),
eyeMarkingColorHex: document.getElementById("eyemarkingColorHex"),
eyeColor: document.getElementById("eyeColor"),
eyeColorHex: document.getElementById("eyeColorHex"),
eyeStyle: document.getElementById("eyeStyle"),
fangStyle: document.getElementById("fangStyle"),
fleshColor: document.getElementById("fleshColor"),
fleshColorHex: document.getElementById("fleshColorHex"),
forelegdecColor: document.getElementById("forelegdecColor"), //rename to legforedecColor
forelegdecColor2: document.getElementById("forelegdecColor2"), //rename to legforedecColor2
forelegdecColorHex: document.getElementById("forelegdecColorHex"), //rename to legforedecColorHex
forelegdecColor2Hex: document.getElementById("forelegdecColor2Hex"),//rename to legforedecColorHex2
forelegdecStyle: document.getElementById("forelegdecStyle"),//rename to legforedecStyle
forelegdecStyle2: document.getElementById("forelegdecStyle2"),//rename to legforedecStyle2
forelegmarkingColor2: document.getElementById("forelegmarkingColor2"),//rename to legforemarking2Color
forelegmarkingColor2Hex: document.getElementById("forelegmarkingColor2Hex"),//rename to legforemarking2ColorHex
forelegmarkingStyle2: document.getElementById("forelegmarkingStyle2"),//rename to legforemarking2Style
forelegmarkingColor: document.getElementById("forelegmarkingColor"),//rename to legforemarkingColor
forelegmarkingColorHex: document.getElementById("forelegmarkingColorHex"),//rename to legforemarkingColorHex
forelegmarkingStyle: document.getElementById("forelegmarkingStyle"),//rename to legforemarkingStyle
forelegStyleSelect: document.getElementById("forelegStyleSelect"),//rename to legforeStyleSelect
headacc: document.getElementById("headacc"),
headtopColor: document.getElementById("headtopColor"),
headtopColorHex: document.getElementById("headtopColorHex"),
headtopStyle: document.getElementById("headtopStyle"),
hindlegdecColor: document.getElementById("hindlegdecColor"),//rename to leghinddecColor
hindlegdecColor2: document.getElementById("hindlegdecColor2"),//rename to leghinddecColor2
hindlegdecColorHex: document.getElementById("hindlegdecColorHex"),//rename to leghinddecColorHex
hindlegdecColor2Hex: document.getElementById("hindlegdecColor2Hex"),//rename to leghinddecColorHex2
hindlegdecStyle: document.getElementById("hindlegdecStyle"),//rename to leghinddecStyle
hindlegdecStyle2: document.getElementById("hindlegdecStyle2"),//rename to leghinddecStyle2
hindlegmarkingColor2: document.getElementById("hindlegmarkingColor2"),//rename to leghindmarking2Color
hindlegmarkingColor2Hex: document.getElementById("hindlegmarkingColor2Hex"),//rename to leghindmarking2ColorHex
hindlegmarkingStyle2: document.getElementById("hindlegmarkingStyle2"),//rename to leghindmarking2Style
hindlegmarkingColor: document.getElementById("hindlegmarkingColor"),//rename to leghindmarkingColor
hindlegmarkingColorHex: document.getElementById("hindlegmarkingColorHex"),//rename to leghindmarkingColorHex
hindlegmarkingStyle: document.getElementById("hindlegmarkingStyle"),//rename to leghindmarkingStyle
hindlegStyleSelect: document.getElementById("hindlegStyleSelect"),//rename to leghindStyleSelect
hornStyle: document.getElementById("hornStyle"),
hornAcc: document.getElementById("hornAcc"),
jawdecColor: document.getElementById("jawdecColor"),
jawdecColorHex: document.getElementById("jawdecColorHex"),
jawdecStyle: document.getElementById("jawdecStyle"),
jawdecColor2: document.getElementById("jawdecColor2"),
jawdecColor2Hex: document.getElementById("jawdecColor2Hex"),
jawdecStyle2: document.getElementById("jawdecStyle2"),
maneColor: document.getElementById("maneColor"),
maneColorHex: document.getElementById("maneColorHex"),
maneStyle: document.getElementById("maneStyle"),
marking1Color: document.getElementById("marking1Color"),
marking1ColorHex: document.getElementById("marking1ColorHex"),
marking1Style: document.getElementById("marking1Style"),
marking2Color: document.getElementById("marking2Color"),
marking2ColorHex: document.getElementById("marking2ColorHex"),
marking2Style: document.getElementById("marking2Style"),
marking3Color: document.getElementById("marking3Color"),
marking3ColorHex: document.getElementById("marking3ColorHex"),
marking3Style: document.getElementById("marking3Style"),
mouthStyle: document.getElementById("mouthStyle"),
neckacc: document.getElementById("neckacc"),
neckaddStyle: document.getElementById("neckaddStyle"),
neckaddColor: document.getElementById("neckaddColor"),
neckaddColorHex: document.getElementById("neckaddColorHex"),
snoutmarkingColor: document.getElementById("snoutmarkingColor"),
snoutmarkingColorHex: document.getElementById("snoutmarkingColorHex"),
snoutmarkingStyle: document.getElementById("snoutmarkingStyle"),
snoutStyle: document.getElementById("snoutStyle"),
snoutaddStyle: document.getElementById("snoutAddStyle"),
snoutaddColor: document.getElementById("snoutAddColor"),
snoutaddColorHex: document.getElementById("snoutAddColorHex"),
spinedecColor: document.getElementById("spinedecColor"),
spinedecColorHex: document.getElementById("spinedecColorHex"),
spinedecStyle: document.getElementById("spinedecStyle"),
spinedecColor2: document.getElementById("spinedecColor2"),
spinedecColor2Hex: document.getElementById("spinedecColor2Hex"),
spinedecStyle2: document.getElementById("spinedecStyle2"),
spinedecColor3: document.getElementById("spinedecColor3"),
spinedecColor3Hex: document.getElementById("spinedecColor3Hex"),
spinedecStyle3: document.getElementById("spinedecStyle3"),
tailacc: document.getElementById("tailacc"),
taildecColor: document.getElementById("taildecColor"),
taildecColor2: document.getElementById("taildecColor2"),
taildecColorHex: document.getElementById("taildecColorHex"),
taildecColor2Hex: document.getElementById("taildecColor2Hex"),
taildecStyle: document.getElementById("taildecStyle"),
taildecStyle2: document.getElementById("taildecStyle2"),
tailmarking2Color: document.getElementById("tailmarking2Color"),
tailmarking2ColorHex: document.getElementById("tailmarking2ColorHex"),
tailmarking2Style: document.getElementById("tailmarking2Style"),
tailmarkingColor: document.getElementById("tailmarkingColor"),
tailmarkingColorHex: document.getElementById("tailmarkingColorHex"),
tailmarkingStyle: document.getElementById("tailmarkingStyle"),
torsoacc: document.getElementById("torsoacc"),
torsoacc2: document.getElementById("torsoacc2"),
whiskerColor: document.getElementById("whiskerColor"),
whiskerColorHex: document.getElementById("whiskerColorHex"),
whiskerStyle: document.getElementById("whiskerStyle"),
wingColor: document.getElementById("wingColor"),
wingColorHex: document.getElementById("wingColorHex"),
wingmarkingdorsalColor: document.getElementById("wingmarkingdorsalColor"),
wingmarkingdorsalColor2: document.getElementById("wingmarkingdorsalColor2"),
wingmarkingdorsalColorHex: document.getElementById("wingmarkingdorsalColorHex"),
wingmarkingdorsalColor2Hex: document.getElementById("wingmarkingdorsalColor2Hex"),
wingmarkingdorsalStyle: document.getElementById("wingmarkingdorsalStyle"),
wingmarkingdorsalStyle2: document.getElementById("wingmarkingdorsalStyle2"),
wingmarkingventralColor: document.getElementById("wingmarkingventralColor"),
wingmarkingventralColor2: document.getElementById("wingmarkingventralColor2"),
wingmarkingventralColorHex: document.getElementById("wingmarkingventralColorHex"),
wingmarkingventralColor2Hex: document.getElementById("wingmarkingventralColor2Hex"),
wingmarkingventralStyle: document.getElementById("wingmarkingventralStyle"),
wingmarkingventralStyle2: document.getElementById("wingmarkingventralStyle2"),
wingStyle: document.getElementById("wingStyle"),
};

DragonBuilder.autoWireColorInputs();
DragonBuilder.applyInputRules();

};

// CAPTURE STATE

DragonBuilder.captureState = function () {

  const state = {};
  const inputs = DragonBuilder.inputs;

  for (const key in inputs) {

    const input = inputs[key];
    if (!input) continue;

    if (input.type === "checkbox") {
      state[key] = input.checked;
    } else {
      state[key] = input.value;
    }

  }

  return state;
};

// PUSH HISTORY

DragonBuilder.pushHistory = function () {

  if (DragonBuilder.isRestoringHistory) return;
  if (DragonBuilder.isLoadingDragon) return;

  const state = DragonBuilder.captureState();

  // Remove redo states if user changed something after undo
  DragonBuilder.stateHistory =
    DragonBuilder.stateHistory.slice(0, DragonBuilder.historyIndex + 1);

  DragonBuilder.stateHistory.push(state);

  DragonBuilder.historyIndex++;

  // Optional cap to prevent memory growth
  const MAX_HISTORY = 100;

  if (DragonBuilder.stateHistory.length > MAX_HISTORY) {
    DragonBuilder.stateHistory.shift();
    DragonBuilder.historyIndex--;
  }
DragonBuilder.updateUndoRedoButtons?.();
};

// LISTENDERS FOR UNDO AND REDO
document.getElementById("undoButton")?.addEventListener(
  "click",
  DragonBuilder.undo
);

document.getElementById("redoButton")?.addEventListener(
  "click",
  DragonBuilder.redo
);

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "z") {
    e.preventDefault();
    DragonBuilder.undo();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === "y") {
    e.preventDefault();
    DragonBuilder.redo();
  }

});

// UNDO

DragonBuilder.undo = async function () {
  if (DragonBuilder.historyIndex <= 0) return;
  DragonBuilder.historyIndex--;
  const state = DragonBuilder.stateHistory[DragonBuilder.historyIndex];
  await DragonBuilder.applyState(state, { pushHistory:false });
  DragonBuilder.updateUndoRedoButtons();

};

// REDO

DragonBuilder.redo = async function () {
  if (DragonBuilder.historyIndex >= DragonBuilder.stateHistory.length - 1) return;
  DragonBuilder.historyIndex++;
  const state = DragonBuilder.stateHistory[DragonBuilder.historyIndex];
  await DragonBuilder.applyState(state, { pushHistory:false });
  DragonBuilder.updateUndoRedoButtons();

};


// UPDATE UNDO/REDO BUTTONS DISABLE STATE
DragonBuilder.updateUndoRedoButtons = function () {
  const undoBtn = document.getElementById("undoButton");
  const redoBtn = document.getElementById("redoButton");
  if (!undoBtn || !redoBtn) return;
  const history = DragonBuilder.stateHistory;
  const index = DragonBuilder.historyIndex;
  const hasHistory = Array.isArray(history) && history.length > 0;
  const hasUndo = hasHistory && index > 0;
  const hasRedo = hasHistory && index < history.length - 1;
  undoBtn.disabled = !hasUndo;
  redoBtn.disabled = !hasRedo;
  undoBtn.setAttribute("aria-disabled", !hasUndo);
  redoBtn.setAttribute("aria-disabled", !hasRedo);
  undoBtn.classList.toggle("disabled", !hasUndo);
  redoBtn.classList.toggle("disabled", !hasRedo);
};

// INPUT AFFECTS

DragonBuilder.inputAffects = {

baseColor: [
    "base",
    "wingfrontbase",
    "wingrearbase",
    "leghindfrontbase",
    "leghindrearbase",
    "legforerearbase",
    "legforefrontbase",
    "earfrontbase",
    "earrearbase",
    "snoutbase"
],

baseTexture: [
  "basetexture"
],

bellyColor: [
    "bellycolor"
],  

bellyStyle: [
    "bellylineart",
    "bellycolor"
],

boneColor: [
    "mouthbone",
    "fangfrontbone",
    "fangrearbone",
    "hornfrontcolor",
    "hornrearcolor",
    "legforefrontbone",
    "legforerearbone",
    "leghindfrontbone",
    "leghindrearbone",
    "wingfrontbone",
    "wingrearbone"
  ],

breathStyle: [
    "breath"
  ],    

breathColor: [
    "breath"
  ],

browStyle: [
    "browlineart",
    "browcolor",
  ],

browColor: [
    "browcolor"
  ],

browPosition: [
    "browlineart",
    "browcolor"
  ],

  earStyle: [
    "earfrontbase",
    "earfrontflesh",
    "earfrontlineart",
    "earrearbase",
    "earrearflesh",
    "earrearlineart"
  ],

  eyeStyle: [
    "eyescleracolor",
    "eyecolor",
    "eyepupil",
    "eyelineart"
  ],

  eyeScleraColor: [
    "eyescleracolor"
  ],

  eyeColor: [
    "eyecolor"
  ],

  eyePupil: [
    "eyepupil"
  ],

  eyeMarkingColor: [
    "eyemarking"
  ],

  eyeMarkingStyle: [
    "eyemarking"
  ],

  fangStyle: [
    "fangfrontbone",
    "fangfrontlineart",
    "fangrearbone",
    "fangrearlineart"
  ],

  fleshColor: [
    "earfrontflesh",
    "earrearflesh",
    "mouthflesh", 
    "leghindfrontflesh",
    "leghindrearflesh",
    "legforefrontflesh",
    "legforerearflesh" 
  ],

  forelegdecColor: [ //RENAME TO LEGFOREDECOLOR
    "legforefrontdeccolor",
    "legforereardeccolor"
  ],

  forelegdecColor2: [ //RENAME TO LEGFOREDECOLOR2
    "legforefrontdeccolor2",
    "legforereardeccolor2"
  ],

  forelegdecStyle: [ //RENAME TO LEGFOREDECSTYLE
    "legforefrontdeclineart",
    "legforefrontdeccolor",
    "legforereardeclineart",
    "legforereardeccolor"
  ],

  forelegdecStyle2: [ //RENAME TO LEGFOREDECSTYLE2
    "legforefrontdeclineart2",
    "legforefrontdeccolor2",
    "legforereardeclineart2",
    "legforereardeccolor2"
  ],

  forelegmarkingStyle: [ //RENAME TO LEGFOREMARKINGSTYLE
    "legforefrontmarking",
    "legforerearmarking"
  ],

 forelegmarkingColor: [ //RENAME TO LEGFOREMARKINGCOLOR
    "legforefrontmarking",
    "legforerearmarking"
  ],

    forelegmarkingStyle2: [ //RENAME TO LEGFOREMARKING2STYLE
    "legforefrontmarking2",
    "legforerearmarking2"
  ],

    forelegmarkingColor2: [ //RENAME TO LEGFOREMARKING2COLOR
    "legforefrontmarking2",
    "legforerearmarking2"
  ],

  forelegStyleSelect: [ //RENAME TO LEGFORESTYLESELECT
    "legforefrontbase",
    "legforefrontmarking",
    "legforefrontmarking2",
    "legforefrontflesh",
    "legforefrontbone",
    "legforefrontlineart",
    "legforerearbase",
    "legforerearmarking",
    "legforerearmarking2",
    "legforerearflesh",
    "legforerearbone",
    "legforerearlineart",
    "legforefrontdeccolor",
    "legforefrontdeccolor2",
    "legforefrontdeclineart",
    "legforefrontdeclineart2",
    "legforereardeccolor",
    "legforereardeccolor2",
    "legforereardeclineart",
    "legforereardeclineart2"
  ],

    hindlegStyleSelect: [ //RENAME TO LEGHINDSTYLESELECT
    "leghindfrontbase",
    "leghindfrontmarking",
    "leghindfrontmarking2",
    "leghindfrontflesh",
    "leghindfrontbone",
    "leghindfrontlineart",
    "leghindrearbase",
    "leghindrearflesh",
    "leghindrearbone",
    "leghindrearlineart",
    "leghindfrontdeccolor",
    "leghindfrontdeccolor2",
    "leghindfrontdeclineart",
    "leghindfrontdeclineart2",
    "leghindreardeccolor",
    "leghindreardeccolor2",
    "leghindreardeclineart",
    "leghindreardeclineart2",
    "leghindrearmarking",
    "leghindrearmarking2"
  ],

  headacc: [
    "headacc"
  ],

  headtopColor: [
    "headtopcolor"
  ],

  headtopStyle: [
    "headtoplineart",
    "headtopcolor"
  ],

  hindlegdecColor: [//RENAME TO LEGHINDDECOLOR
    "leghindfrontdeccolor",
    "leghindreardeccolor"
  ],

  hindlegdecColor2: [//RENAME TO LEGHINDDECOLOR2
    "leghindfrontdeccolor2",
    "leghindreardeccolor2"
  ],

  hindlegdecStyle: [//RENAME TO LEGHINDDECSTYLE
    "leghindfrontdeclineart",
    "leghindreardeclineart",
    "leghindfrontdeccolor",
    "leghindreardeccolor"
  ],

  hindlegdecStyle2: [//RENAME TO LEGHINDDECSTYLE2
    "leghindfrontdeclineart2",
    "leghindreardeclineart2",
    "leghindfrontdeccolor2",
    "leghindreardeccolor2"
  ],

    hindlegmarkingStyle: [//RENAME TO LEGHINDMARKINGSTYLE
    "leghindfrontmarking",
    "leghindrearmarking"
  ],

    hindlegmarkingColor: [//RENAME TO LEGHINDMARKINGCOLOR
    "leghindfrontmarking",
    "leghindrearmarking"
  ],

    hindlegmarkingStyle2: [//RENAME TO LEGHINDMARKING2STYLE
    "leghindfrontmarking2",
    "leghindrearmarking2"
  ],

    hindlegmarkingColor2: [//RENAME TO LEGHINDMARKING2COLOR
    "leghindfrontmarking2",
    "leghindrearmarking2"
  ],

    hornStyle: [
        "hornfrontcolor",
        "hornfrontlineart",
        "hornrearcolor",
        "hornrearlineart",
        "hornaccfront",
        "hornaccrear"
    ],

  hornAcc: [
    "hornaccfront",
    "hornaccrear"
  ],

    jawdecColor: [
        "jawdeccolor"
    ],

    jawdecStyle: [
        "jawdeclineart",
        "jawdeccolor"
    ],

    jawdecColor2: [
        "jawdeccolor2"
    ],

    jawdecStyle2: [
        "jawdeccolor2",
        "jawdeclineart2",
    ],

    maneColor: [
        "manecolor"
    ],

    maneStyle: [
        "manecolor",
        "manelineart"
    ],

    marking1Color: [
        "marking1"
    ],

    marking1Style: [
        "marking1"
    ],  

    marking2Color: [
        "marking2"
    ],

    marking2Style: [
        "marking2"
    ],  

    marking3Color: [
        "marking3"
    ],

    marking3Style: [
        "marking3"
    ],

    neckacc: [
        "neckacc"
    ],

    neckaddColor: [
        "neckaddcolor"
    ],

    neckaddStyle: [
        "neckaddcolor",
        "neckaddlineart"
    ],

    mouthStyle: [
        "mouthbone",
        "mouthflesh",
        "mouthlineart"
    ],

    snoutmarkingColor: [
        "snoutmarking"
    ],

    snoutmarkingStyle: [
        "snoutmarking"
    ],

    snoutStyle: [
        "snoutbase",
        "snoutlineart",
        "snoutmarking"
    ],

    snoutaddColor: [
        "snoutaddcolor"
    ],

    snoutaddStyle: [
        "snoutaddcolor",
        "snoutaddlineart",
    ],

    spinedecColor: [
        "spinedeccolor"
    ],

    spinedecStyle: [
        "spinedeccolor",
        "spinedeclineart"
    ],

      spinedecColor2: [
          "spinedeccolor2"
      ],

      spinedecStyle2: [
          "spinedeccolor2",
          "spinedeclineart2"
      ],

    spinedecColor3: [
          "spinedeccolor3"
      ],

    spinedecStyle3: [
          "spinedeccolor3",
          "spinedeclineart3"
      ],

    taildecStyle: [
        "taildeccolor",
        "taildeclineart"
    ],

    taildecColor: [
        "taildeccolor",
    ],

    taildecStyle2: [
        "taildeccolor2",
        "taildeclineart2"
    ],

    taildecColor2: [
        "taildeccolor2",
    ],

    tailmarkingStyle: [
        "tailmarking",
    ],

    tailmarkingColor: [
        "tailmarking",
    ],

    tailmarking2Style: [
        "tailmarking2",
    ],

    tailmarking2Color: [
        "tailmarking2",
    ],

    torsoacc: [
        "torsoacc"
    ],

    torsoacc2: [
        "torsoacc2"
    ],

    whiskerColor: [
        "whiskerrear",
        "whiskerfront",
    ],

    whiskerStyle: [
        "whiskerrear",
        "whiskerrearlineart",
        "whiskerfront",
        "whiskerfrontlineart"
    ],

    wingStyle: [
        "wingrearbase",
        "wingrearcolor",
        "wingrearbone",
        "wingrearventralmarking",
        "wingrearventralmarking2",
        "wingreardorsalmarking",
        "wingreardorsalmarking2",
        "wingrearlineart",
        "wingfrontbase",
        "wingfrontcolor",
        "wingfrontbone",
        "wingfrontdorsalmarking",
        "wingfrontdorsalmarking2",
        "wingfrontventralmarking",
        "wingfrontventralmarking2",
        "wingfrontlineart",
    ],

    wingColor: [
        "wingfrontcolor",
        "wingrearcolor"
    ],

    wingmarkingdorsalStyle: [
        "wingfrontdorsalmarking",
        "wingreardorsalmarking"
    ],

    wingmarkingdorsalStyle2: [
        "wingfrontdorsalmarking2",
        "wingreardorsalmarking2"
    ],

    wingmarkingdorsalColor: [
        "wingfrontdorsalmarking",
        "wingreardorsalmarking"
    ],

    wingmarkingdorsalColor2: [
        "wingfrontdorsalmarking2",
        "wingreardorsalmarking2"
    ],

    wingmarkingventralStyle: [
        "wingfrontventralmarking",
        "wingrearventralmarking"
    ],

    wingmarkingventralStyle2: [
        "wingfrontventralmarking2",
        "wingrearventralmarking2"
    ],

    wingmarkingventralColor: [
        "wingfrontventralmarking",
        "wingrearventralmarking"
    ],

    wingmarkingventralColor2: [
        "wingfrontventralmarking2",
        "wingrearventralmarking2"
    ],

    tailacc: [
        "tailacc"
    ]



};

// DOWNLOAD DRAGON PNG

DragonBuilder.downloadImage = function () {
  const canvas = document.getElementById("canvasFinal");
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    const newTab = window.open("", "_blank");

    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);

      if (newTab) {
        newTab.location = url;
      } else {
        window.location.href = url;
      }

      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }, "image/png");

  } else {
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "dragon.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }
};

// EXPORT DRAGON SETTINGS TO JSON FILE
DragonBuilder.exportJSON = function () {
  const state = DragonBuilder.captureState();

  const json = JSON.stringify(state, null, 2);
  const blob = new Blob([json], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dragon_settings.json";
  a.click();

  URL.revokeObjectURL(url);
};

// LOAD/IMPORT DRAGON FROM JSON FILE
document
  .getElementById("importJSON")
  ?.addEventListener("change", function (e) {
    const file = e.target.files?.[0];
    if (!file) return;
    DragonBuilder.importJSON(file);
    e.target.value = "";
});

DragonBuilder.importJSON = function (file) {
  const allowedKeys = new Set(Object.keys(DragonBuilder.inputs));
  const MAX_SIZE = 100 * 1024;
  if (file.size > MAX_SIZE) {
    alert("Save file is too large.");
    return;
  }
  if (!file.name.toLowerCase().endsWith(".json")) {
    alert("Invalid file type.");
    return;
  }
  const reader = new FileReader();
  reader.onload = async function (e) {
    try {
      const rawState = JSON.parse(e.target.result);
      const state = {};
      for (const [key, value] of Object.entries(rawState)) {
        if (!allowedKeys.has(key)) {
          console.warn("Unknown key in save file:", key);
          continue;
        }
        state[key] = value;
      }
      DragonBuilder.showLoadingScreen();
      await DragonBuilder.applyState(state);
      DragonBuilder.hideLoadingScreen();
      console.log("Dragon loaded successfully");
    } catch (err) {
      console.error("Failed to load dragon file:", err);
      alert("Failed to load dragon file.");
      DragonBuilder.hideLoadingScreen();
    }
  };

  reader.readAsText(file);
};

// INPUT RULES
DragonBuilder.inputRules = {

forelegdecStyle: {
    dependsOn: "forelegStyleSelect",
    disableIf: (val) => val === "none",
    allowedValues: {
      "*": ["none","01","02","03","04","05","06"], // default - all foreleg decor options
      "01": ["none","01","02","03","04","05","06"], // default hand-paw - all foreleg decor options
      "02": ["none"], // bat wing-walker - no foreleg decor options
      "03": ["none"], // flipperfin - no foreleg decor options
      "04": ["none"], // feather wing-walker - no foreleg decor options
      "05": ["none","01","02","03","05"], // webbed - all foreleg decor options except for scutes
      "06": ["none"], // theropod/raptor arms - no foreleg decor options
      "07": ["none"], // claw-paw - no foreleg decor options
      "08": ["none"], // stompy squamate - no foreleg decor options
    }
  },

  forelegdecStyle2: {
    dependsOn: "forelegStyleSelect",
    disableIf: (val) => val === "none",
    allowedValues: {
      "*": ["none","01","02","03","04","05","06"], // default - all foreleg decor options
      "01": ["none","01","02","03","04","05","06"], // default hand-paw - all foreleg decor options
      "02": ["none"], // bat wing-walker - no foreleg decor options
      "03": ["none"], // flipperfin - no foreleg decor options
      "04": ["none"], // feather wing-walker - no foreleg decor options
      "05": ["none","01","02","03","05"], // webbed - all foreleg decor options except for scutes
      "06": ["none"], // raptor arms - no foreleg decor options
      "07": ["none"], // claw-paw - no foreleg decor options
      "08": ["none"], // stompy squamate - no foreleg decor options
    }
  },

  forelegmarkingStyle: {
    dependsOn: "forelegStyleSelect",
    disableIf: (val) => val === "none",
    allowedValues: {
      "*": ["none","01","02","03","04","05","06","07","08","09","10","11","12","99"], // default - all options
      "01": ["none","01","02","03","04","05","06","07","08","09","10","11","12","99"], // default hand-paw - all options except special
      "02": ["none","01","99"], // bat wing-walker - no foreleg marking options
      "03": ["none","01","99"], // flipperfin - no foreleg marking options
      "04": ["none","01","99"], // feather wing-walker - no foreleg marking options
      "05": ["none","02","03","04","05","07","99"], // webbed - all foreleg marking options
      "06": ["none","01","99"], // theropod/raptor arms - no foreleg marking options
      "07": ["none"], // claw-paw - no foreleg marking options
      "08": ["none"], // stompy squamate, none
    }
  },

    forelegmarkingStyle2: {
    dependsOn: "forelegStyleSelect",
    disableIf: (val) => val === "none",
    allowedValues: {
      "*": ["none","01","02","03","04","05","06","07","08","09","10","11","12","99"], // default - all options
      "01": ["none","01","02","03","04","05","06","07","08","09","10","11","12","99"], // default hand-paw - all options except special
      "02": ["none","01","99"], // bat wing-walker - none, ankle socks, special
      "03": ["none","01","99"], // flipperfin - none, ankle socks, special
      "04": ["none","01","99"], // feather wing-walker - none, ankle socks, special
      "05": ["none","02","03","04","05","07","99"], // webbed - all foreleg marking options
      "06": ["none","01","99"], // theropod/raptor arms - none, ankle socks, special
      "07": ["none"], // claw-paw - no foreleg marking options
      "08": ["none"], // stompy squamate, none
    }
  },

hindlegdecStyle: {
    dependsOn: "hindlegStyleSelect",
    disableIf: (val) => val === "none",
    allowedValues: {
      "*": ["none","01","02","03","04","05"], // default - all hind leg decor options
      "01": ["none","01","02","03","04","05"], // default toe-paw - all options
      "02": ["none"], // three-toed claws - none
      "03": ["none"], // flipperfin - none
      "04": ["none"], // stompy squamate - none
      "05": ["none","01","02","03","05"], // webbed - all hind leg decor options
      "06": ["none","01","02","03","05"], // mammalian paws - all hind leg decor options EXCEPT for scutes
      "07": ["none","01","02","03","05"], //  equine hooves - all hind leg decor options EXCEPT for scutes
      "08": ["none","01","02","03","05"], // therpod - all hind leg decor options EXCEPT for scutes
    }
  }, 

  hindlegdecStyle2: {
    dependsOn: "hindlegStyleSelect",
    disableIf: (val) => val === "none",
    allowedValues: {
      "*": ["none","01","02","03","04","05"], // default - all options
      "01": ["none","01","02","03","04","05"], // default toe-paw - all options
      "02": ["none"], // three-toed claws - none
      "03": ["none"], // flipperfin - none
      "04": ["none"], // stompy squamate - none
      "05": ["none","01","02","03","05"], // webbed - all hind leg decor options
      "06": ["none","01","02","03","05"], // mammalian paws - all hind leg decor options EXCEPT for scutes
      "07": ["none","01","02","03","05"], //  equine hooves - all hind leg decor options EXCEPT for scutes
      "08": ["none","01","02","03","05"], // therpod - all hind leg decor options EXCEPT for scutes
    }
  }, 

  hindlegmarkingStyle: {
    dependsOn: "hindlegStyleSelect",
    disableIf: (val) => val === "none",
    allowedValues: {
      "*": ["none","01","02","03","04","05","06","07","08","99"], // default
      "01": ["none","01","02","03","04","05","06","07","08","99"], // default toe-paw
      "02": ["none"], // three-toed claws, none
      "03": ["none","99"], // flipperfin
      "04": ["none"], // stompy squamate, none
      "05": ["none","02","03","04","05","07","99"], // webbed 
      "06": ["none","02","03","04","05","07","99"], // mammalian paws 
      "07": ["none","01","02","03","04","05","07","99"], //  equine hooves
      "08": ["none","02","03","04","05","07","99"], // therpod
    }
  },

    hindlegmarkingStyle2: {
    dependsOn: "hindlegStyleSelect",
    disableIf: (val) => val === "none",
    allowedValues: {
      "*": ["none","01","02","03","04","05","06","07","08","99"], // default
      "01": ["none","01","02","03","04","05","06","07","08","99"], // default 
      "02": ["none"], // three-toed claws, none
      "03": ["none","99"], // flipperfin
      "04": ["none"], // stompy squamate, none
      "05": ["none","02","03","04","05","07","99"], // webbed
      "06": ["none","02","03","04","05","07","99"], // mammalian paws
      "07": ["none","01","02","03","04","05","07","99"], //  equine hooves
      "08": ["none","02","03","04","05","07","99"], // therpod
    }
  },

  wingColor: {
    dependsOn: "wingStyle",
    disableIf: (val) => val === "none",
  },

  wingmarkingdorsalStyle: {
    dependsOn: "wingStyle",
    disableIf: (val) => val === "none",
      allowedValues: {
      "*": ["none","01"], // default - all options
      "01": ["none","01"], // default medium bat wings - all options
      "02": ["none","01"], // feathered big - none
      "03": ["none","01"], // feather/bat hybrid - none
      "04": ["none","01"], // bat mini - none
      "05": ["none","01"], // feathered mini - none
      "06": ["none"], // doesn't exist
      "07": ["none"], //  doesn't exist
      "08": ["none"], // doesn't exist
      "09": ["none"], // doesn't exist
      "10": ["none","01"], // dragonfly - none
      "11": ["none","01"], // butterfly - none
      "12": ["none","01"], // original big old bat wings - none
      "13": ["none","01"], // bat-like medium with transparent membranes - none
      "14": ["none"], // swim-paddle - none
      "15": ["none"], // ornamental swoop - none
      "16": ["none"], // chibi feathered floating - none
    }
  },

  wingmarkingdorsalStyle2: {
    dependsOn: "wingStyle",
    disableIf: (val) => val === "none",
          allowedValues: {
      "*": ["none","01"], // default - all options
      "01": ["none","01"], // default medium bat wings - all options
      "02": ["none","01"], // feathered big - none
      "03": ["none","01"], // feather/bat hybrid - none
      "04": ["none","01"], // bat mini - none
      "05": ["none","01"], // feathered mini - none
      "06": ["none"], // doesn't exist
      "07": ["none"], //  doesn't exist
      "08": ["none"], // doesn't exist
      "09": ["none"], // doesn't exist
      "10": ["none","01"], // dragonfly - none
      "11": ["none","01"], // butterfly - none
      "12": ["none","01"], // original big old bat wings - none
      "13": ["none","01"], // bat-like medium with transparent membranes - none
      "14": ["none"], // swim-paddle - none
      "15": ["none"], // ornamental swoop - none
      "16": ["none"], // chibi feathered floating - none
    }
  },

  wingmarkingventralStyle: {
    dependsOn: "wingStyle",
    disableIf: (val) => val === "none",
      allowedValues: {
      "*": ["none","01","02","03","04","05","06","07","08","09","10","11","12","13"], // default - all options
      "01": ["none","01","02","03","04","05","06","07","08","09","10","11","12","13"], // default medium bat wings - all options
      "02": ["none","01"], // feathered big - none
      "03": ["none","01"], // feather/bat hybrid - none
      "04": ["none","01"], // bat mini - none
      "05": ["none","01"], // feathered mini - none
      "06": ["none"], // doesn't exist
      "07": ["none"], //  doesn't exist
      "08": ["none"], // doesn't exist
      "09": ["none"], // doesn't exist
      "10": ["none","01"], // dragonfly - none
      "11": ["none","01"], // butterfly - none
      "12": ["none","01"], // original big old bat wings - none
      "13": ["none","01","02","03","04","05","06","07","08","09","10","11","12","13"], // bat-like medium with transparent membranes - none
      "14": ["none","01","02","03","04","05","06","07","08","09","10","11","12","13"], // swim-paddle - none
      "15": ["none"], // ornamental swoop - none
      "16": ["none"], // chibi feathered floating - none
    }
  },

  wingmarkingventralStyle2: {
    dependsOn: "wingStyle",
    disableIf: (val) => val === "none",
      allowedValues: {
      "*": ["none","01","02","03","04","05","06","07","08","09","10","11","12","13"], // default - all options
      "01": ["none","01","02","03","04","05","06","07","08","09","10","11","12","13"], // default medium bat wings - all options
      "02": ["none","01"], // feathered big - none
      "03": ["none","01"], // feather/bat hybrid - none
      "04": ["none","01"], // bat mini - none
      "05": ["none","01"], // feathered mini - none
      "06": ["none"], // doesn't exist - future feathered-bat hybrid medium size
      "07": ["none"], //  doesn't exist - future new feathered wings with long elegant feathers
      "08": ["none"], // doesn't exist - future plasma/energy/fire wings
      "09": ["none"], // doesn't exist - future skeletal bone wings
      "10": ["none","01"], // dragonfly - none
      "11": ["none","01"], // butterfly - none
      "12": ["none","01"], // original big old bat wings - none
      "13": ["none","01","02","03","05","06","07","08","09","10","11","12","13"], // transparent bat - most options except for 'fingerbones' (04)
      "14": ["none","01","02","03","04","05","06","07","08","09","10","11","12","13"], // swim-paddle - none
      "15": ["none"], // ornamental swoop
      "16": ["none"], // chibi feathered floating
    }
  }



};


DragonBuilder.applyInputRules = function () {
  const rules = DragonBuilder.inputRules;
  const inputs = DragonBuilder.inputs;

  if (!rules) return;

  Object.entries(rules).forEach(([targetName, rule]) => {
    const target = inputs[targetName];
    if (!target) return;

    const dependsOn = inputs[rule.dependsOn];
    if (!dependsOn) return;

    const currentValue = dependsOn.value;

    if (rule.disableIf) {
      const shouldDisable = rule.disableIf(currentValue);
      target.disabled = shouldDisable;
    }

  if (rule.allowedValues && target.tagName === "SELECT") {

  const allowed =
  rule.allowedValues[currentValue] ??
  rule.allowedValues["*"];

  if (!allowed) return;

  Array.from(target.options).forEach(option => {
    option.disabled = !allowed.includes(option.value);
  });

  if (!allowed.includes(target.value)) {
    target.value = allowed[0] ?? "none";
  }
}
    });
}

// NEW APPLY STATE FUNCTION

DragonBuilder.applyState = async function (state) {
  const inputs = DragonBuilder.inputs;
  const changedInputs = [];

  for (const [key, value] of Object.entries(state)) {

    const input = inputs[key];
    if (!input) {
      console.warn("Unknown state key:", key);
      continue;
    }

    let changed = false;

    if (input.type === "checkbox") {
      if (input.checked !== value) {
        input.checked = value;
        changed = true;
      }
    } else {
      if (input.value !== value) {
        input.value = value;
        changed = true;
      }
    }

    if (changed) {
      changedInputs.push(key);

      if (DragonBuilder.applyInputRules) {
        DragonBuilder.applyInputRules(key);
      }
    }
  }

  await DragonBuilder.redrawFromInputs(changedInputs);
};