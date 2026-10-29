window.DragonBuilder = window.DragonBuilder || {};

// RANDOMIZE ALL

DragonBuilder.randomizeAll = async function (config = {}) {

  const {
    selectInputs = [],
    colorInputs = [],
    colorGroups = null,
    usePalette = false,
    paletteSize = 4
  } = config;

  const inputs = DragonBuilder.inputs;
  if (!inputs) {
    console.warn("Randomize failed: inputs not found");
    return;
  }

  const confirmed = await DragonBuilder.confirm(
    "Randomize dragon traits? This will overwrite your current dragon."
  );
  if (!confirmed) return;

  DragonBuilder.showLoadingScreen?.();
  await new Promise(requestAnimationFrame);
  await new Promise(resolve => setTimeout(resolve, 0));
  try {
    const newState = {};
    selectInputs.forEach(inputName => {
  const el = inputs[inputName];
  if (!el) return;
  if (!el.options) return;
  const validOptions = Array.from(el.options).filter(
    opt => !opt.disabled && opt.value !== ""
  );
  if (!validOptions.length) return;
  const randomOption =
    validOptions[Math.floor(Math.random() * validOptions.length)];
  newState[inputName] = randomOption.value;
    });
    if (usePalette && colorGroups) {
  const palettes = DragonBuilder.colorPalettes;
  const palette = getRandomPalette(palettes);
  if (!palette || palette.length < 5) {
    console.warn("Invalid palette");
    return;
  }
  const shuffled = shuffleArray(palette);
  const slotMap = {
    primary: shuffled[0],
    secondary: shuffled[1],
    accent1: shuffled[2],
    accent2: shuffled[3],
    accent3: shuffled[4]
  };

Object.entries(colorGroups).forEach(([groupName, inputList]) => {

  if (!Array.isArray(inputList)) {
    console.warn(`Invalid color group: ${groupName}`, inputList);
    return;
  }

  const color = slotMap[groupName];
  if (!color) return;

  inputList.forEach(inputName => {
    if (!inputName || typeof inputName !== "string") return;

    newState[inputName] = color;
    newState[inputName + "Hex"] = color.toUpperCase();
  });

});
}
    await DragonBuilder.applyState(newState);
    DragonBuilder.pushHistory?.();

  } catch (err) {
    console.error("Randomize failed:", err);
  }
  DragonBuilder.hideLoadingScreen?.();
};


// CONVERT PALETTE TO HEX VALUES

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);

  const f = n =>
    Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));

  return `#${[f(0), f(8), f(4)]
    .map(x => x.toString(16).padStart(2, "0"))
    .join("")}`;
};

// COLOR PALETTES FOR RANDOMIZATION

DragonBuilder.colorPalettes = {
   1: ["#1B3B6F","#20639B","#3CAEA3","#F6D55C","#ED553B"],
   2: ["#2E4057","#E27D60","#85DCB6","#E8A87C","#C38D9E"],
   3: ["#2F5233","#A7C957","#F4D35E","#EE964B","#F95738"],
   4: ["#FFB5E8","#B28DFF","#AFF8DB","#85E3FF","#FFFFD1"],
   5: ["#2F1847","#624763","#C62E65","#F9B3D1","#D63AF9"],
   6: ["#91EBA4","#C5EB91","#EB91D3","#6B4962","#496B50"],
   7: ["#1B4079","#4D7C8A","#7F9C96","#8FAD88","#CBDF90"],
   8: ["#734B5E","#BCBDC0","#565857","#8A8D91","#F5D3C8"],
   9: ["#818D92","#586A6A","#B9A394","#D4C5C7","#DAD4EF"],
  10: ["#0D0A0B","#454955","#F3EFF5","#9A031E","#FB8B24"],
  11: ["#202020","#535353","#838383","#8AF3FF","#E6F8B2"],
  12: ["#6B705C","#A5A58D","#DDBEA9","#CB997E","#B7B7A4"],
  13: ["#4F6D5E","#6B8F71","#A3B18A","#344E41","#7F9C96"],
  14: ["#F1F5F2","#DDE5E3","#C9D6D5","#AAB7B8","#6C7A89"],
  15: ["#C2A27C","#E5C9A3","#A68A64","#6E5A3C","#D9A066"],
  16: ["#2C6E6F","#3A8F8F","#6FB1A0","#1F4D4F","#00A8A8"],
  17: ["#5E6472","#9A8C98","#C9ADA7","#4A4E69","#22223B"],
  18: ["#E9C46A","#F4A261","#E76F51","#2A9D8F","#264653"],
  19: ["#F8F9FA","#E9ECEF","#CED4DA","#ADB5BD","#6C757D"],
  20: ["#588157","#A3B18A","#344E41","#3A5A40","#D00000"],
  21: ["#6E7173","#A7A9AC","#4F4F4F","#2E2E2E","#BFC0C0"],
  22: ["#264653","#2A9D8F","#E9C46A","#F4A261","#E76F51"],
  23: ["#3A5A40","#588157","#A3B18A","#DAD7CD","#FF6B6B"],
  24: ["#E6CFC4","#DDBEA9","#CB997E","#6B705C","#FF6F3C"],
  25: ["#4A5D73","#6C7A89","#A7B1C2","#2F3E46","#00A8E8"],
  26: ["#6A4E42","#9C6644","#7F5539","#3C2F2F","#FF3C38"],
  27: ["#E07A5F","#F2CC8F","#F4F1DE","#3D405B","#FF7F11"],
  28: ["#4F5D75","#BFC0C0","#EF8354","#2D3142","#00BBF9"],
  29: ["#EDE0D4","#E6CCB2","#DDB892","#B08968","#FFB703"],
  30: ["#2B2D42","#8D99AE","#EDF2F4","#EF233C","#D90429"],
  31: ["#2B2D42","#ED254E","#403D39","#252422","#EB5E28"]

};

function getRandomPalette(palettes) {
  const keys = Object.keys(palettes);
  const key = keys[Math.floor(Math.random() * keys.length)];
  return palettes[key];
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

//
DragonBuilder.randomize = async function (mode = "all") {
  const configs = DragonBuilder.randomConfigs;

  const config = configs[mode];
  if (!config) {
    console.warn("Unknown randomize mode:", mode);
    return;
  }

  return DragonBuilder.randomizeAll(config);
};


DragonBuilder.randomConfigs = {

  all: {
    usePalette: true,
    selectInputs: [
      'baseColor',
'baseTexture',
'bellyColor',
'bellyStyle',
'boneColor',
'breathStyle',
'breathColor',
'browPosition',
'browColor',
'browStyle',
'earStyle',
'eyescleraColor',
'eyemarkingStyle',
'eyemarkingColor',
'eyePupil',
'eyeColor',
'eyeStyle',
'fangStyle',
'fleshColor',
'forelegdecColor',
'forelegdecColor2',
'forelegdecStyle',
'forelegdecStyle2',
'forelegmarkingColor2',
'forelegmarkingStyle2',
'forelegmarkingColor',
'forelegmarkingStyle',
'forelegStyleSelect',
'headacc',
'headtopColor',
'headtopStyle',
'hindlegdecColor',
'hindlegdecColor2',
'hindlegdecStyle',
'hindlegdecStyle2',
'hindlegmarkingColor2',
'hindlegmarkingStyle2',
'hindlegmarkingColor',
'hindlegmarkingStyle',
'hindlegStyleSelect',
'hornStyle',
'hornAcc',
'jawdecColor',
'jawdecStyle',
'jawdecColor2',
'jawdecStyle2',
'maneColor',
'maneStyle',
'marking1Color',
'marking1Style',
'marking2Color',
'marking2Style',
'marking3Color',
'marking3Style',
'mouthStyle',
'neckacc',
'snoutmarkingColor',
'snoutmarkingStyle',
'snoutStyle',
'snoutaddStyle',
'snoutaddColor',
'spinedecColor',
'spinedecStyle',
'spinedecColor2',
'spinedecStyle2',
'spinedecColor3',
'spinedecStyle3',
'tailacc',
'taildecColor',
'taildecColor2',
'taildecStyle',
'taildecStyle2',
'tailmarking2Color',
'tailmarking2Style',
'tailmarkingColor',
'tailmarkingStyle',
'torsoacc',
'torsoacc2',
'whiskerColor',
'whiskerStyle',
'wingColor',
'wingmarkingdorsalColor',
'wingmarkingdorsalColor2',
'wingmarkingdorsalStyle',
'wingmarkingdorsalStyle2',
'wingmarkingventralColor',
'wingmarkingventralColor2',
'wingmarkingventralStyle',
'wingmarkingventralStyle2',
'wingStyle'
],
    colorGroups: {
      primary: ['baseColor','whiskerColor'],
      secondary: ["bellyColor", "wingColor", "snoutmarkingColor","tailmarkingColor"],
      
      accent1: [
        'boneColor',
        'breathColor',
        'eyeColor',
        'hindlegdecColor2',
        'hindlegmarkingColor',
        'jawdecColor2',
        'marking1Color',
        'spinedecColor',
        'taildecColor',
        'wingmarkingventralColor'
      ],
      accent2: [
        'eyeMarkingColor',
'forelegdecColor',
'forelegmarkingColor2',
'hindlegdecColor',
'hindlegmarkingColor2',
'jawdecColor',
'marking2Color',
'snoutaddColor',
'spinedecColor2',
'taildecColor2',
'tailmarkingColor',
'wingmarkingdorsalColor'
      ],
      accent3: [
        'fleshColor',
'forelegdecColor2',
'forelegmarkingColor',
'headtopColor',
'maneColor',
'marking3Color',
'snoutmarkingColor',
'spinedecColor3',
'tailmarking2Color',
'wingmarkingdorsalColor2',
'wingmarkingventralColor2'
      ]
    }
  },

  traits: {
    selectInputs: [
      
     'baseTexture',
'bellyStyle',
'breathStyle',
'browPosition',
'browStyle',
'earStyle',
'eyeMarkingStyle',
'eyeStyle',
'fangStyle',
'forelegdecStyle',
'forelegdecStyle2',
'forelegmarkingStyle2',
'forelegmarkingStyle',
'forelegStyleSelect',
'headtopStyle',
'hindlegdecStyle',
'hindlegdecStyle2',
'hindlegmarkingStyle2',
'hindlegmarkingStyle',
'hindlegStyleSelect',
'hornStyle',
'jawdecStyle',
'jawdecStyle2',
'maneStyle',
'marking1Style',
'marking2Style',
'marking3Style',
'mouthStyle',
'snoutmarkingStyle',
'snoutStyle',
'snoutaddStyle',
'spinedecStyle',
'spinedecStyle2',
'spinedecStyle3',
'taildecStyle',
'taildecStyle2',
'tailmarking2Style',
'tailmarkingStyle',
'whiskerStyle',
'wingmarkingdorsalStyle',
'wingmarkingdorsalStyle2',
'wingmarkingventralStyle',
'wingmarkingventralStyle2',
'wingStyle',
    ]
  },

  colors: {
    usePalette: true,
    colorGroups: {
      primary: ['baseColor','whiskerColor'],
      secondary: ['bellyColor','browColor','wingColor'],
      accent1: [
        'boneColor',
        'breathColor',
        'eyeColor',
        'hindlegdecColor2',
        'hindlegmarkingColor',
        'jawdecColor2',
        'marking1Color',
        'spinedecColor',
        'taildecColor',
        'wingmarkingventralColor'
      ],
      accent2: [
        'eyeMarkingColor',
        'forelegdecColor',
        'forelegmarkingColor2',
        'hindlegdecColor',
        'hindlegmarkingColor2',
        'jawdecColor',
        'marking2Color',
        'snoutaddColor',
        'spinedecColor2',
        'taildecColor2',
        'tailmarkingColor',
        'wingmarkingdorsalColor'
      ],
      accent3: [
        'fleshColor',
        'forelegdecColor2',
        'forelegmarkingColor',
        'headtopColor',
        'maneColor',
        'marking3Color',
        'snoutmarkingColor',
        'spinedecColor3',
        'tailmarking2Color',
        'wingmarkingdorsalColor2',
        'wingmarkingventralColor2'
      ]
    }
  },

  markings: {
    selectInputs: [
      "marking1Style",
      "marking2Style",
      "snoutmarkingStyle",
      "eyemarkingStyle"
    ],
    usePalette: true,
    colorGroups: {
      markings: [
        "marking1Color",
        "marking2Color",
        "snoutmarkingColor",
        "eyemarkingColor"
      ]
    }
  },

  accessories: {
    selectInputs: [
      "neckacc",
      "torsacc",
      "tailacc",
      "headacc"
    ]
  }
};
