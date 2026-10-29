window.DragonBuilder = window.DragonBuilder || {};

DragonBuilder.layerRegistry = {

  // BEHIND WING

  // Hind Leg Rear

leghindrearbase: { 
  layerName: "leghindrearbase",
  styleInput: "hindlegStyleSelect",
  colorInput: "baseColor",
  assetPath: (inputs) => {
    const style = inputs.hindlegStyleSelect?.value;
    if (!style || style === "none") return null;
    return `/proj/dragonbuilder/hindlegs/hindleg_rear_${style}_base.png`;
  },
  cacheKey: (inputs) =>
    `leghindrearbase_${inputs.hindlegStyleSelect.value}`,
  recolor: true,
  optional: true,
  z: "behindFrontWing",
  order: 1
},

leghindrearmarking: { 
  layerName: "leghindrearmarking",
  colorInput: "hindlegmarkingColor",
  styleInput: "hindlegStyleSelect",
  assetPath: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const markingStyle = inputs.hindlegmarkingStyle?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!markingStyle || markingStyle === "none") return null;
    return `/proj/dragonbuilder/markings_hindleg/marking_${legStyle}_rear_${markingStyle}.png`;
  },
  cacheKey: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const markingStyle = inputs.hindlegmarkingStyle?.value;
    return `leghindrearmarking_${legStyle}_${markingStyle}`;
  },
  recolor: true,
  optional: true,
  z: "behindFrontWing",
  order: 2
},

  leghindrearflesh: {
  layerName: "leghindrearflesh",
  styleInput: "hindlegStyleSelect", 
  colorInput: "fleshColor",
  assetPath: (inputs) => {
    const style = inputs.hindlegStyleSelect?.value;
    if (!style || style === "none") return null;
    return `/proj/dragonbuilder/hindlegs/hindleg_rear_${style}_flesh.png`;
  },
  cacheKey: (inputs) =>
    `leghindrearflesh_${inputs.hindlegStyleSelect.value}`,
  recolor: true,
  optional: true,
  z: "behindFrontWing",
  order: 3
  },  

leghindrearmarking2: { 
  layerName: "leghindrearmarking2",
  colorInput: "hindlegmarkingColor2",
  styleInput: "hindlegStyleSelect",
  assetPath: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const markingStyle = inputs.hindlegmarkingStyle2?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!markingStyle || markingStyle === "none") return null;
    return `/proj/dragonbuilder/markings_hindleg/marking_${legStyle}_rear_${markingStyle}.png`;
  },
  cacheKey: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const markingStyle = inputs.hindlegmarkingStyle2?.value;
    return `leghindrearmarking2_${legStyle}_${markingStyle}`;
  },
  recolor: true,
  optional: true,
  z: "behindFrontWing",
  order: 4
},

  leghindrearbone: {
    styleInput: "hindlegStyleSelect",
    colorInput: "boneColor",
    layerName: "leghindrearbone",
    assetPath: (inputs) => {
      const style = inputs.hindlegStyleSelect?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/hindlegs/hindleg_rear_${style}_bone.png`;
    },
    cacheKey: (inputs) =>
      `leghindrearbone_${inputs.hindlegStyleSelect.value}`, 
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 5
  },  

leghindrearlineart: {
  layerName: "leghindrearlineart",
  styleInput: "hindlegStyleSelect",
  assetPath: (inputs) => {
    const style = inputs.hindlegStyleSelect?.value;
    if (!style || style === "none") return null;
    return `/proj/dragonbuilder/hindlegs/hindleg_rear_${style}_lines.png`;
  },
  cacheKey: (inputs) =>
    `leghindrearlineart_${inputs.hindlegStyleSelect.value}`,  
  recolor: false,
  optional: true,
  z: "behindFrontWing",
  order: 6
},



  // Foreleg Rear
  legforerearbase: {
    layerName: "legforerearbase",
    styleInput: "forelegStyleSelect",
    colorInput: "baseColor",
    assetPath: (inputs) => {
    const style = inputs.forelegStyleSelect?.value;
    if (!style || style === "none") return null;
    return `/proj/dragonbuilder/forelegs/foreleg_rear_${style}_base.png`;
  },
    cacheKey: (inputs) =>
      `legforerearbase_${inputs.forelegStyleSelect.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 7
  },  

    legforerearmarking: {
  layerName: "legforerearmarking",
    colorInput: "forelegmarkingColor",
    styleInput: "forelegStyleSelect",
    assetPath: (inputs) => {
    const legStyle = inputs.forelegStyleSelect?.value;
    const markingStyle = inputs.forelegmarkingStyle?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!markingStyle || markingStyle === "none") return null;
    return `/proj/dragonbuilder/markings_foreleg/marking_${legStyle}_rear_${markingStyle}.png`;
  },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const markingStyle = inputs.forelegmarkingStyle?.value;
      return `legforerearmarking_${legStyle}_${markingStyle}`;
    },
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 8
  },  

  legforerearflesh: {
    layerName: "legforerearflesh",
    styleInput: "forelegStyleSelect",
    colorInput: "fleshColor",
    assetPath: (inputs) => {
    const style = inputs.forelegStyleSelect?.value;
    if (!style || style === "none") return null;
    return `/proj/dragonbuilder/forelegs/foreleg_rear_${style}_flesh.png`;
  },
    cacheKey: (inputs) =>
      `legforerearflesh_${inputs.forelegStyleSelect.value}`,
    recolor: true,
    optional: true,
     z: "behindFrontWing",
    order: 9
  },  

  legforerearmarking2: {
    layerName: "legforerearmarking2",
    colorInput: "forelegmarkingColor2",
    styleInput: "forelegStyleSelect",
    assetPath: (inputs) => {
    const legStyle = inputs.forelegStyleSelect?.value;
    const markingStyle = inputs.forelegmarkingStyle2?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!markingStyle || markingStyle === "none") return null;
    return `/proj/dragonbuilder/markings_foreleg/marking_${legStyle}_rear_${markingStyle}.png`;
  },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const markingStyle = inputs.forelegmarkingStyle2?.value;
      return `legforerearmarking_${legStyle}_${markingStyle}`;
    },
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 10
  },  


  legforerearbone: {
    layerName: "legforerearbone",
    styleInput: "forelegStyleSelect",
    colorInput: "boneColor",
    assetPath: (inputs) => {
    const style = inputs.forelegStyleSelect?.value;
    if (!style || style === "none") return null;
    return `/proj/dragonbuilder/forelegs/foreleg_rear_${style}_bone.png`;
  },
    cacheKey: (inputs) =>
      `legforerearbone_${inputs.forelegStyleSelect.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 11
  },  

  legforerearlineart: {
    layerName: "legforerearlineart",
    styleInput: "forelegStyleSelect",
    assetPath: (inputs) => {
    const style = inputs.forelegStyleSelect?.value;
    if (!style || style === "none") return null;
    return `/proj/dragonbuilder/forelegs/foreleg_rear_${style}_lines.png`;
  },
    cacheKey: (inputs) =>
      `legforerearlineart_${inputs.forelegStyleSelect.value}`,
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 12
  },  

  legforereardeccolor: { 
    layerName: "legforereardeccolor",
    styleInput: "forelegdecStyle",
    colorInput: "forelegdecColor",
    assetPath: (inputs) => {
    const legStyle = inputs.forelegStyleSelect?.value;
    const decStyle = inputs.forelegdecStyle?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!decStyle || decStyle === "none") return null;
    return `/proj/dragonbuilder/legdecor/fore_${legStyle}_rear_${decStyle}_color.png`;
  },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle?.value;
      return `legforereardeccolor_${legStyle}_${decStyle}`;
    },
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 13
  }, 
  

  legforereardeclineart: {
    layerName: "legforereardeclineart",
    styleInput: "forelegdecStyle",
    assetPath: (inputs) => {
    const legStyle = inputs.forelegStyleSelect?.value;
    const decStyle = inputs.forelegdecStyle?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!decStyle || decStyle === "none") return null;
    return `/proj/dragonbuilder/legdecor/fore_${legStyle}_rear_${decStyle}_lines.png`;
  },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle?.value;
      return `legforereardeclineart_${legStyle}_${decStyle}`;
    },
    optional: true,
    recolor: false,
    z: "behindFrontWing",
    order: 14
  },  

  legforereardeccolor2: {
    layerName: "legforereardeccolor2",
    colorInput: "forelegdecColor2",
    styleInput: "forelegdecStyle2",
    assetPath: (inputs) => {
    const legStyle = inputs.forelegStyleSelect?.value;
    const decStyle = inputs.forelegdecStyle2?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!decStyle || decStyle === "none") return null;
    return `/proj/dragonbuilder/legdecor/fore_${legStyle}_rear_${decStyle}_color.png`;
  },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle2?.value;
      return `legforereardeccolor2_${legStyle}_${decStyle}`;
    },
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 15
  },  

  legforereardeclineart2: { 
    layerName: "legforereardeclineart2",
    styleInput: "forelegdecStyle2",
    assetPath: (inputs) => {
    const legStyle = inputs.forelegStyleSelect?.value;
    const decStyle = inputs.forelegdecStyle2?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!decStyle || decStyle === "none") return null;
    return `/proj/dragonbuilder/legdecor/fore_${legStyle}_rear_${decStyle}_lines.png`;
  },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle2?.value;
      return `legforereardeclineart2_${legStyle}_${decStyle}`;
    },
    optional: true,
    recolor: false,
    z: "behindFrontWing",
    order: 16
  },

  legforerearacc: {
      layerName: "legforerearacc",
    styleInput: "forelegacc",
    assetPath: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const accStyle = inputs.forelegacc?.value;
      if (!legStyle || legStyle === "none") return null;
      if (!accStyle || accStyle === "none") return null;
      return `/proj/dragonbuilder/acc_foreleg/${legStyle}_rear_${accStyle}.png`;
    },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const accStyle = inputs.forelegacc?.value;
      return `legforefrontacc_${legStyle}_${accStyle}`;
    },
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 33
  },

    legforefrontacc2: {
      layerName: "legforefrontacc2",
    styleInput: "forelegacc2",
    assetPath: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const accStyle = inputs.forelegacc2?.value;
      if (!legStyle || legStyle === "none") return null;
      if (!accStyle || accStyle === "none") return null;
      return `/proj/dragonbuilder/legdecor/fore_${legStyle}_front_${accStyle}_lines.png`;
    },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const accStyle = inputs.forelegacc2?.value;
      return `legforefrontacc2_${legStyle}_${accStyle}`;
    },
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 33
  },


  // Rear Wing

  wingrearbase: {
    layerName: "wingrearbase",
    styleInput: "wingStyle",
    colorInput: "baseColor",
    assetPath: (inputs) => {
      const style = inputs.wingStyle?.value;
      return `/proj/dragonbuilder/wings/wing_${style}_rear_base.png`;
    },
    cacheKey: (inputs) => `wingrearbase_${inputs.wingStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 17
  },  

  wingrearcolor: {
    layerName: "wingrearcolor",
    styleInput: "wingStyle",
    colorInput: "wingColor",
    assetPath: (inputs) => {
      const style = inputs.wingStyle?.value;
      return `/proj/dragonbuilder/wings/wing_${style}_rear_color.png`;
    },
    cacheKey: (inputs) => `wingrearcolor_${inputs.wingStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 18
  },  

  wingrearventralmarking: { // works!
    layerName: "wingrearventralmarking",
    styleInput: "wingStyle",
    colorInput: "wingmarkingventralColor",
    assetPath: (inputs) => {
      const wingStyle = inputs.wingStyle?.value;
      const markingStyle = inputs.wingmarkingventralStyle?.value;
      if (!wingStyle || wingStyle === "none") return null;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_wing/ventral_${wingStyle}_rear_${markingStyle}.png`;
    },
    cacheKey: (inputs) => `wingrearventralmarking_${inputs.wingStyle.value}_${inputs.wingmarkingventralStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 19
  },  

  wingrearventralmarking2: { // works!
    layerName: "wingrearventralmarking2",
    styleInput: "wingStyle",
    colorInput: "wingmarkingventralColor2",
    assetPath: (inputs) => {
      const wingStyle = inputs.wingStyle?.value;
      const markingStyle = inputs.wingmarkingventralStyle2?.value;
      if (!wingStyle || wingStyle === "none") return null;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_wing/ventral_${wingStyle}_rear_${markingStyle}.png`;
    },
    cacheKey: (inputs) => `wingrearventralmarking2_${inputs.wingStyle.value}_${inputs.wingmarkingventralStyle2.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 20
  },  

  wingreardorsalmarking: { // works! use as reference!
    layerName: "wingreardorsalmarking",
    styleInput: "wingStyle",
    colorInput: "wingmarkingdorsalColor",
    assetPath: (inputs) => {
      const wingStyle = inputs.wingStyle?.value;
      const markingStyle = inputs.wingmarkingdorsalStyle?.value;
      if (!wingStyle || wingStyle === "none") return null;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_wing/dorsal_${wingStyle}_rear_${markingStyle}.png`;
    },
    cacheKey: (inputs) => `wingreardorsalmarking_${inputs.wingStyle.value}_${inputs.wingmarkingdorsalStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 21
  },  

  wingreardorsalmarking2: { // works!
    layerName: "wingreardorsalmarking2",
    styleInput: "wingStyle",
    colorInput: "wingmarkingdorsalColor2",
    assetPath: (inputs) => {
      const wingStyle = inputs.wingStyle?.value;
      const markingStyle = inputs.wingmarkingdorsalStyle2?.value;
      if (!wingStyle || wingStyle === "none") return null;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_wing/dorsal_${wingStyle}_rear_${markingStyle}.png`;
    },
    cacheKey: (inputs) => `wingreardorsalmarking2_${inputs.wingStyle.value}_${inputs.wingmarkingdorsalStyle2.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 22
  },  

  wingrearbone: {
    layerName: "wingrearbone",
    styleInput: "wingStyle",
    colorInput: "boneColor",
    assetPath: (inputs) => {
      const wingStyle = inputs.wingStyle?.value;
      if (!wingStyle || wingStyle === "none") return null;
      return `/proj/dragonbuilder/wings/wing_${wingStyle}_rear_bone.png`;
    },
    cacheKey: (inputs) => `wingrearbone_${inputs.wingStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 23
  },  

  wingrearlineart: {
    layerName: "wingrearlineart",
    styleInput: "wingStyle",
    assetPath: (inputs) => {
      const wingStyle = inputs.wingStyle?.value;
      if (!wingStyle || wingStyle === "none") return null;
      return `/proj/dragonbuilder/wings/wing_${wingStyle}_rear_lines.png`;
    },
    cacheKey: (inputs) => `wingrearlineart_${inputs.wingStyle.value}`,
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 24
  },  



  leghindreardeccolor: {
    layerName: "leghindreardeccolor",
    styleInput: "hindlegdecStyle",
    colorInput: "hindlegdecColor",
  assetPath: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const decStyle = inputs.hindlegdecStyle?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!decStyle || decStyle === "none") return null;
    return `/proj/dragonbuilder/legdecor/hind_${legStyle}_rear_${decStyle}_color.png`;
  },
    cacheKey: (inputs) => {
      const legStyle = inputs.hindlegStyleSelect?.value;
      const decStyle = inputs.hindlegdecStyle?.value;
      return `leghindreardeccolor_${legStyle}_${decStyle}`;
    },
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 25
  },

  leghindreardeclineart: {
    layerName: "leghindreardeclineart",
    styleInput: "hindlegdecStyle",
  assetPath: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const decStyle = inputs.hindlegdecStyle?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!decStyle || decStyle === "none") return null;
    return `/proj/dragonbuilder/legdecor/hind_${legStyle}_rear_${decStyle}_lines.png`;
  },
    cacheKey: (inputs) => {
      const legStyle = inputs.hindlegStyleSelect?.value;
      const decStyle = inputs.hindlegdecStyle?.value;
      return `leghindreardeclineart_${legStyle}_${decStyle}`;
    },
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 26
  },  

  leghindreardeccolor2: {
    layerName: "leghindreardeccolor2",
    styleInput: "hindlegdecStyle2",
    colorInput: "hindlegdecColor2",
  assetPath: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const decStyle = inputs.hindlegdecStyle2?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!decStyle || decStyle === "none") return null;
    return `/proj/dragonbuilder/legdecor/hind_${legStyle}_rear_${decStyle}_color.png`;
  },
    cacheKey: (inputs) => {
      const legStyle = inputs.hindlegStyleSelect?.value;
      const decStyle = inputs.hindlegdecStyle2?.value;
      return `leghindreardeccolor2_${legStyle}_${decStyle}`;
    },
    recolor: true,
    optional: true, 
    z: "behindFrontWing",
    order: 27
  },

  leghindreardeclineart2: { 
    layerName: "leghindreardeclineart2",
    styleInput: "hindlegdecStyle2",
  assetPath: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const decStyle = inputs.hindlegdecStyle2?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!decStyle || decStyle === "none") return null;
    return `/proj/dragonbuilder/legdecor/hind_${legStyle}_rear_${decStyle}_lines.png`;
  },
    cacheKey: (inputs) => {
      const legStyle = inputs.hindlegStyleSelect?.value;
      const decStyle = inputs.hindlegdecStyle2?.value;
      return `leghindreardeclineart2_${legStyle}_${decStyle}`;
    },
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 28
  },


  // Facial Features Rear
  whiskerrear: {
    layerName: "whiskerrear",
    styleInput: "whiskerStyle",
    colorInput: "whiskerColor",
    assetPath: (inputs) => {
      const whiskerStyle = inputs.whiskerStyle?.value;
      if (!whiskerStyle || whiskerStyle === "none") return null;
      return `/proj/dragonbuilder/whiskers/whisker_rear_${whiskerStyle}.png`;
    },
    cacheKey: (inputs) => `whiskerrear_${inputs.whiskerStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 29
  },

whiskerrearlineart: {
  layerName: "whiskerrearlineart",
  styleInput: "whiskerStyle",
      assetPath: (inputs) => {
      const whiskerStyle = inputs.whiskerStyle?.value;
      if (!whiskerStyle || whiskerStyle === "none") return null;
      return `/proj/dragonbuilder/whiskers/whisker_rear_${whiskerStyle}_lines.png`;
    },
    cacheKey: (inputs) => `whiskerrearlineart_${inputs.whiskerStyle.value}`,
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 30
},

  fangrearbone: {
    layerName: "fangrearbone",
    styleInput: "fangStyle",
    colorInput: "boneColor",
    assetPath: (inputs) => {
      const fangStyle = inputs.fangStyle?.value;
      const boneColor = inputs.boneColor?.value;
      if (!fangStyle || fangStyle === "none") return null;
      return `/proj/dragonbuilder/fangs/fang_${fangStyle}_rear_color.png`;
    },
    cacheKey: (inputs) => `fangrearcolor_${inputs.fangStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 31
  },

  fangrearlineart: {
    layerName: "fangrearlineart",
    styleInput: "fangStyle",
    assetPath: (inputs) => {
      const fangStyle = inputs.fangStyle?.value;
      if (!fangStyle || fangStyle === "none") return null;
      return `/proj/dragonbuilder/fangs/fang_${fangStyle}_rear_lines.png`;
    },
    cacheKey: (inputs) => `fangrearlineart_${inputs.fangStyle.value}`,
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 32
  },

  earrearbase: {
    layerName: "earrearbase",
    styleInput: "earStyle",
    colorInput: "baseColor",
    assetPath: (inputs) => {
      const style = inputs.earStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/ears/ear_${style}_rear_base.png`;
    },
    cacheKey: (inputs) => `earrearbase_${inputs.earStyle.value}`,
    optional: true,
    recolor: true,
    z: "behindFrontWing",
    order: 33
  },

  earrearflesh: {
    layerName: "earrearflesh",
    styleInput: "earStyle",
    colorInput: "fleshColor",
    assetPath: (inputs) => {
      const style = inputs.earStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/ears/ear_${style}_rear_flesh.png`;
    },
    cacheKey: (inputs) => `earrearflesh_${inputs.earStyle.value}`,
    recolor: true,  
    optional: true,
    z: "behindFrontWing",
    order: 34
  },

  earrearlineart: {
    layerName: "earrearlineart",
    styleInput: "earStyle",
    assetPath: (inputs) => {
      const style = inputs.earStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/ears/ear_${style}_rear_lines.png`;
    },
    cacheKey: (inputs) => `earrearlineart_${inputs.earStyle.value}`,
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 35
  },

  hornrearcolor: {
    layerName: "hornrearcolor",
    colorInput: "boneColor",
    styleInput: "hornStyle",
    assetPath: (inputs) => {
      const style = inputs.hornStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/horns/horn_${style}_rear_color.png`;
    },
    cacheKey: (inputs) => `hornrearcolor_${inputs.hornStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 36
  },

  hornrearlineart: {
    layerName: "hornrearlineart",
    styleInput: "hornStyle",
    assetPath: (inputs) => {
      const style = inputs.hornStyle?.value;
if (!style || style === "none") return null;
      return `/proj/dragonbuilder/horns/horn_${style}_rear_lines.png`;
    },
    cacheKey: (inputs) => `hornrearlineart_${inputs.hornStyle.value}`,
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 37
  },

  hornaccrear: { 
    layerName: "hornaccrear",
    styleInput: "hornAcc",
    assetPath: (inputs) => {
      const hornStyle = inputs.hornStyle?.value;
      const accStyle = inputs.hornAccStyle?.value;
      if (!hornStyle || hornStyle === "none") return null;
      if (!accStyle || accStyle === "none") return null;
      return `/proj/dragonbuilder/hornacc/${hornStyle}_rear_${accStyle}.png`;
    },
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 38
  },  

  // Base
  base: {
    layerName: "base",
    colorInput: "baseColor",
  assetPath: (inputs) => {
    return `/proj/dragonbuilder/base/base_color.png`;
  },
    cacheKey: "base_color",
    recolor: true,
    optional: false,
    z: "behindFrontWing",
    order: 39
  },

  marking1: {
    layerName: "marking1",
    styleInput: "marking1Style",
    colorInput: "marking1Color",
    assetPath: (inputs) => {
      const style = inputs.marking1Style?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/markings/marking_${style}.png`;
    },
    cacheKey: (inputs) =>
      `marking1_${inputs.marking1Style.value}`, 
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 40
  },

  marking2: {
    layerName: "marking2",
    styleInput: "marking2Style",
    colorInput: "marking2Color",
    assetPath: (inputs) => {
      const style = inputs.marking2Style?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/markings/marking_${style}.png`;
    },
    cacheKey: (inputs) =>
      `marking2_${inputs.marking2Style.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 41
  },

  marking3: {
    layerName: "marking3",
    styleInput: "marking3Style",
    colorInput: "marking3Color",
    assetPath: (inputs) => {
      const style = inputs.marking3Style?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/markings/marking_${style}.png`;
    },
    cacheKey: (inputs) =>
      `marking3_${inputs.marking3Style.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 42
  },

  tailmarking: {
    layerName: "tailmarking",
    styleInput: "tailmarkingStyle",
    colorInput: "tailmarkingColor",
    assetPath: (inputs) => {
      const style = inputs.tailmarkingStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/markings_tail/tailmarking_${style}.png`;
    },
    cacheKey: (inputs) =>
      `tailmarking_${inputs.tailmarkingStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 43
  },

  tailmarking2: {
    layerName: "tailmarking2",
    styleInput: "tailmarking2Style",
    colorInput: "tailmarking2Color",
    assetPath: (inputs) => {
      const style = inputs.tailmarking2Style?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/markings_tail/tailmarking_${style}.png`;
    },
    cacheKey: (inputs) =>
      `tailmarking2_${inputs.tailmarking2Style.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 44
  },

    eyemarking: {
    layerName: "eyemarking",
    styleInput: "eyeMarkingStyle",
    colorInput: "eyeMarkingColor",
    assetPath: (inputs) => {
      const style = inputs.eyeMarkingStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/markings_eye/${style}.png`;
    },
    cacheKey: (inputs) =>
      `eyemarking_${inputs.eyeMarkingStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 45
  },

    eyemarking2: {
    layerName: "eyemarking2",
    styleInput: "eyeMarkingStyle2",
    colorInput: "eyeMarkingColor2",
    assetPath: (inputs) => {
      const style = inputs.eyeMarkingStyle2?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/markings_eye/${style}.png`;
    },
    cacheKey: (inputs) =>
      `eyemarking2_${inputs.eyeMarkingStyle2.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 46
  },

lineart: { //rename to baselineart
  layerName: "lineart",
  assetPath: (inputs) => {
    return `/proj/dragonbuilder/base/base_lines.png`;
  },
  cacheKey: "base_lineart",
  recolor: false,
  optional: false,
  z: "behindFrontWing",
  order: 47
},

basetexture: {
  layerName: "basetexture",
  styleInput: "baseTexture",
    assetPath: (inputs) => {
      const style = inputs.baseTexture?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/base/basetex_${style}.png`;
    },
    cacheKey: (inputs) =>
      `basetexture_${inputs.baseTexture.value}`,
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 48
},

  // Belly

  bellycolor: {
    layerName: "bellycolor",
    styleInput: "bellyStyle",
    colorInput: "bellyColor",
    assetPath: (inputs) => {
      const style = inputs.bellyStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/belly/belly_${style}_color.png`;
    },
    cacheKey: (inputs) =>
      `belly_${inputs.bellyStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 49
  },

  bellylineart: {
    layerName: "bellylineart",
    styleInput: "bellyStyle",
    assetPath: (inputs) => {
      const style = inputs.bellyStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/belly/belly_${style}_lines.png`;
    },
    cacheKey: (inputs) =>
      `bellylineart_${inputs.bellyStyle.value}`,
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 50
  },

  // Facial Features Front

  snoutbase: {
    layerName: "snoutbase",
    styleInput: "snoutStyle",
    colorInput: "baseColor",
    assetPath: (inputs) => {
      const style = inputs.snoutStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/snouts/snout_${style}_color.png`;
    },
    cacheKey: (inputs) =>
      `snoutbase_${inputs.snoutStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 51
  },

  snoutmarking: { //uses multiple style inputs BUT doesn't care if snout style is None
    layerName: "snoutmarking",
    styleInput: "snoutmarkingStyle",
    colorInput: "snoutmarkingColor",
    assetPath: (inputs) => {
      const snoutStyle = inputs.snoutStyle?.value;
      const markingStyle = inputs.snoutmarkingStyle?.value;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_snout/${snoutStyle}_${markingStyle}.png`;
    },
    cacheKey: (inputs) =>
      `snoutmarking_${inputs.snoutStyle.value}_${inputs.snoutmarkingStyle.value}`, 
  recolor: true,
  optional: true,
    z: "behindFrontWing",
    order: 52

  },



  snoutlineart: {
    layerName: "snoutlineart",
    styleInput: "snoutStyle",
    colorInput: "baseColor",
    assetPath: (inputs) => {
      const style = inputs.snoutStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/snouts/snout_${style}_lines.png`;
    },
    cacheKey: (inputs) =>
      `snoutlineart_${inputs.snoutStyle.value}`,  
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 53
  },

  snoutaddcolor: { //uses multiple style inputs
    layerName: "snoutaddcolor",
    styleInput: "snoutaddStyle",
    colorInput: "snoutaddColor",
    assetPath: (inputs) => {
      const decorstyle = inputs.snoutaddStyle?.value;
      const snoutstyle = inputs.snoutStyle?.value;
      if (!snoutstyle || snoutstyle === "none") return null;
      if (!decorstyle || decorstyle === "none") return null;
      return `/proj/dragonbuilder/snoutdecor/${snoutstyle}_${decorstyle}_color.png`;
    },
    cacheKey: (inputs) =>
      `snoutaddcolor_${inputs.snoutaddStyle.value}`,  
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 54
  },

  snoutaddlineart: {
    layerName: "snoutaddlineart",
    styleInput: "snoutaddStyle",
    assetPath: (inputs) => {
      const decorstyle = inputs.snoutaddStyle?.value;
      const snoutstyle = inputs.snoutStyle?.value;
      if (!snoutstyle || snoutstyle === "none") return null;
      if (!decorstyle || decorstyle === "none") return null;
      return `/proj/dragonbuilder/snoutdecor/${snoutstyle}_${decorstyle}_lines.png`;
    },
    cacheKey: (inputs) =>
      `snoutaddlineart_${inputs.snoutaddStyle.value}`,    
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 55
  },

  mouthflesh: {
    layerName: "mouthflesh",
    styleInput: "mouthStyle",
    colorInput: "fleshColor",
    assetPath: (inputs) => {
      const style = inputs.mouthStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/mouth/mouth_${style}_flesh.png`;
    },
    cacheKey: (inputs) =>
      `mouthflesh_${inputs.mouthStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 56
  },

  mouthbone: {
    layerName: "mouthbone",
    styleInput: "mouthStyle",
    colorInput: "boneColor",
    assetPath: (inputs) => {
      const style = inputs.mouthStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/mouth/mouth_${style}_bone.png`;
    },
    cacheKey: (inputs) =>
      `mouthbone_${inputs.mouthStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 57
  },

  mouthlineart: {
    layerName: "mouthlineart",
    styleInput: "mouthStyle",
    assetPath: (inputs) => {
      const style = inputs.mouthStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/mouth/mouth_${style}_lines.png`;
    },
    cacheKey: (inputs) =>
      `mouthlineart_${inputs.mouthStyle.value}`,  
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 58
  },

eyescleracolor: {
    layerName: "eyescleracolor",
    styleInput: "eyeStyle",
    colorInput: "eyeScleraColor",
    assetPath: (inputs) => {
      const style = inputs.eyeStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/eyes/eye_${style}_sclera.png`;
    },
    cacheKey: (inputs) =>
      `eyescleracolor_${inputs.eyeStyle.value}`,
  recolor: true,
  optional: false,
  z: "behindFrontWing",
  order: 59
},  

eyecolor: {
    layerName: "eyecolor",
    styleInput: "eyeStyle",
    colorInput: "eyeColor",
    assetPath: (inputs) => {
      const style = inputs.eyeStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/eyes/eye_${style}_iris.png`;
    },
    cacheKey: (inputs) =>
      `eyecolor_${inputs.eyeStyle.value}`,
  recolor: true,
  optional: false,
  z: "behindFrontWing",
  order: 60
},

eyepupil: {
    layerName: "eyepupil",
    styleInput: "eyeStyle",
    assetPath: (inputs) => {
      const style = inputs.eyeStyle?.value;
      const hasPupil = inputs.eyePupil?.checked;
      if (!style || style === "none") return null;
      if (!hasPupil) return null;
      return `/proj/dragonbuilder/eyes/eye_${style}_pupil.png`;
    },
    cacheKey: (inputs) =>
      `eyepupil_${inputs.eyeStyle.value}`,
  recolor: false,
  optional: false,
  z: "behindFrontWing",
  order: 61
},

eyelineart: {
  layerName: "eyelineart",
  styleInput: "eyeStyle",
assetPath: (inputs) => {
    const style = inputs.eyeStyle?.value;
    if (!style || style === "none") return null;
    return `/proj/dragonbuilder/eyes/eye_${style}_lines.png`;
  },
  cacheKey: (inputs) =>
    `eyelineart_${inputs.eyeStyle.value}`,
  recolor: false,
  optional: false,
  z: "behindFrontWing",
  order: 62
},


  browcolor: {
    layerName: "browcolor",
    styleInput: "browStyle",
    colorInput: "browColor",
    assetPath: (inputs) => {
      const style = inputs.browStyle?.value;
      const position = inputs.browPosition?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/brows/${style}_${position}_color.png`;
    },
    cacheKey: (inputs) =>
      `browcolor_${inputs.browStyle.value}_${inputs.browPosition.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 63
  },  

  browlineart: {
    layerName: "browlineart",
    styleInput: "browStyle",
    assetPath: (inputs) => {
      const style = inputs.browStyle?.value;
      const position = inputs.browPosition?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/brows/${style}_${position}_lines.png`;
    },
    cacheKey: (inputs) =>
      `browlineart_${inputs.browStyle.value}_${inputs.browPosition.value}`,
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 64
  },

  fangfrontbone: {
    layerName: "fangfrontbone",
    styleInput: "fangStyle",
    colorInput: "boneColor",
    assetPath: (inputs) => {
      const fangStyle = inputs.fangStyle?.value;
      const boneColor = inputs.boneColor?.value;
      if (!fangStyle || fangStyle === "none") return null;
      return `/proj/dragonbuilder/fangs/fang_${fangStyle}_front_color.png`;
    },
    cacheKey: (inputs) => `fangfrontbone_${inputs.fangStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 65
  },

  fangfrontlineart: { 
    layerName: "fangfrontlineart", 
    styleInput: "fangStyle",
    assetPath: (inputs) => {
      const fangStyle = inputs.fangStyle?.value;
      if (!fangStyle || fangStyle === "none") return null;
      return `/proj/dragonbuilder/fangs/fang_${fangStyle}_front_lines.png`;
    },
    cacheKey: (inputs) => `fangfrontlineart_${inputs.fangStyle.value}`, 
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 66
  },

  manecolor: {
    layerName: "manecolor",
    styleInput: "maneStyle",
    colorInput: "maneColor",
    assetPath: (inputs) => {
      const style = inputs.maneStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/manes/mane_${style}_color.png`;
    },
    cacheKey: (inputs) =>
      `manecolor_${inputs.maneStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 67
  },

  manelineart: {
    layerName: "manelineart",
    styleInput: "maneStyle",
    assetPath: (inputs) => {
      const style = inputs.maneStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/manes/mane_${style}_lines.png`;
    },
    cacheKey: (inputs) =>
      `manelineart_${inputs.maneStyle.value}`,
    recolor: false,
    optional: true,
    z: "behindFrontWing",
    order: 68
  },

  spinedeccolor: {
    layerName: "spinedeccolor",
    styleInput: "spinedecStyle",
    colorInput: "spinedecColor",
    assetPath: (inputs) => {
      const style = inputs.spinedecStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/spinedecor/spinedec_${style}_color.png`;
    },
    cacheKey: (inputs) =>
      `spinedeccolor_${inputs.spinedecStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 69
  },

  spinedeclineart: {
    layerName: "spinedeclineart",
    styleInput: "spinedecStyle",
    assetPath: (inputs) => {
      const style = inputs.spinedecStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/spinedecor/spinedec_${style}_lines.png`;
    },
    cacheKey: (inputs) =>
      `spinedeclineart_${inputs.spinedecStyle.value}`,
    optional: true,
    recolor: false,
    z: "behindFrontWing",
    order: 70
  },

    spinedeccolor2: {
    layerName: "spinedeccolor2",
    styleInput: "spinedecStyle2",
    colorInput: "spinedecColor2",
    assetPath: (inputs) => {
      const style = inputs.spinedecStyle2?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/spinedecor/spinedec_${style}_color.png`;
    },
    cacheKey: (inputs) =>
      `spinedeccolor2_${inputs.spinedecStyle2.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 71
  },

  spinedeclineart2: {
    layerName: "spinedeclineart2",
    styleInput: "spinedecStyle2",
    assetPath: (inputs) => {
      const style = inputs.spinedecStyle2?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/spinedecor/spinedec_${style}_lines.png`;
    },
    cacheKey: (inputs) =>
      `spinedeclineart2_${inputs.spinedecStyle2.value}`,
    optional: true,
    recolor: false,
    z: "behindFrontWing",
    order: 72
  },

  spinedeccolor3: {
    layerName: "spinedeccolor3",
    styleInput: "spinedecStyle3",
    colorInput: "spinedecColor3",
    assetPath: (inputs) => {
      const style = inputs.spinedecStyle3?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/spinedecor/spinedec_${style}_color.png`;
    },
    cacheKey: (inputs) =>
      `spinedeccolor3_${inputs.spinedecStyle3.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 73
  },

  spinedeclineart3: {
    layerName: "spinedeclineart3",
    styleInput: "spinedecStyle3",
    assetPath: (inputs) => {
      const style = inputs.spinedecStyle3?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/spinedecor/spinedec_${style}_lines.png`;
    },
    cacheKey: (inputs) =>
      `spinedeclineart3_${inputs.spinedecStyle3.value}`,
    optional: true,
    recolor: false,
    z: "behindFrontWing",
    order: 74
  },

    taildeccolor: {
    layerName: "taildeccolor",
    styleInput: "taildecStyle",
    colorInput: "taildecColor",
    assetPath: (inputs) => {
      const style = inputs.taildecStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/tails/tail_${style}_color.png`;
    },
    cacheKey: (inputs) => `taildeccolor_${inputs.taildecStyle.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 75
  },


    taildeclineart: {
    layerName: "taildeclineart",
    styleInput: "taildecStyle",
    assetPath: (inputs) => {
      const style = inputs.taildecStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/tails/tail_${style}_lines.png`;
    },
    cacheKey: (inputs) => `taildeclineart_${inputs.taildecStyle.value}`,
    optional: true,
    recolor: false,
    z: "behindFrontWing",
    order: 76
  },

  taildeccolor2: {
    layerName: "taildeccolor2",
    styleInput: "taildecStyle2",
    colorInput: "taildecColor2",
    assetPath: (inputs) => {
      const style = inputs.taildecStyle2?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/tails/tail_${style}_color.png`;
    },
    cacheKey: (inputs) => `taildeccolor2_${inputs.taildecStyle2.value}`,
    recolor: true,
    optional: true,
    z: "behindFrontWing",
    order: 77
  },

  taildeclineart2: {
    layerName: "taildeclineart2",
    styleInput: "taildecStyle2",
    assetPath: (inputs) => {
      const style = inputs.taildecStyle2?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/tails/tail_${style}_lines.png`;
    },
    cacheKey: (inputs) => `taildeclineart2_${inputs.taildecStyle2.value}`,
    optional: true, 
    recolor: false,
    z: "behindFrontWing",
    order: 78
  },  


  tailacc: {
    layerName: "tailacc",
    styleInput: "tailacc",
    assetPath: (inputs) => {
      const style = inputs.tailacc?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/acc_tail/${style}.png`;
    },
    cacheKey: (inputs) =>
      `tailacc_${inputs.tailacc.value}`,
    optional: true,
    recolor: false,
    z: "behindFrontWing",
    order: 79
  },

  torsoacc2: {
    layerName: "torsoacc2",
    styleInput: "torsoacc2",
    assetPath: (inputs) => {
      const style = inputs.torsoacc2?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/acc_torso/${style}.png`;
    },
    cacheKey: (inputs) =>
      `torsoacc2_${inputs.torsoacc2.value}`,
    optional: true,
    recolor: false,
    z: "behindFrontWing",
    order: 80
  },

  ///////////////////////////////////////////

  // FRONT WING - HIDDEN WITH 'HIDE FRONT WING' OPTION
  wingfrontbase: {
    layerName: "wingfrontbase",
    colorInput: "baseColor",
    styleInput: "wingStyle",
    assetPath: (inputs) => {
      const style = inputs.wingStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/wings/wing_${inputs.wingStyle.value}_front_base.png`;
    },
    cacheKey: inputs =>
      `wingfrontbase_${inputs.wingStyle.value}`,
    recolor: true,
    optional: true,
    z: "frontWing",
    order: 1
  },

  wingfrontcolor: {
    layerName: "wingfrontcolor",
    colorInput: "wingColor",
    styleInput: "wingStyle",
    assetPath: (inputs) => {
      const style = inputs.wingStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/wings/wing_${inputs.wingStyle.value}_front_color.png`;
    },
    cacheKey: inputs =>
      `wingfrontcolor_${inputs.wingStyle.value}`,
    recolor: true,
    optional: true,
    z: "frontWing",
    order: 2
  },

  wingfrontventralmarking: { 
    layerName: "wingfrontventralmarking",
    colorInput: "wingmarkingventralColor",
    styleInput: "wingStyle",
    assetPath: (inputs) => {
      const wingStyle = inputs.wingStyle?.value;
      const markingStyle = inputs.wingmarkingventralStyle?.value;
      if (!wingStyle || wingStyle === "none") return null;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_wing/ventral_${wingStyle}_front_${markingStyle}.png`;
    },
    cacheKey: (inputs) => `wingfrontventralmarking_${inputs.wingStyle.value}_${inputs.wingmarkingventralStyle.value}`,
    recolor: true,
    optional: true,
    z: "frontWing",
    order: 3
  },

  wingfrontventralmarking2: { 
    layerName: "wingfrontventralmarking2",
    colorInput: "wingmarkingventralColor2",
    styleInput: "wingStyle",
    assetPath: (inputs) => {
      const wingStyle = inputs.wingStyle?.value;
      const markingStyle = inputs.wingmarkingventralStyle2?.value;
      if (!wingStyle || wingStyle === "none") return null;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_wing/ventral_${wingStyle}_front_${markingStyle}.png`;
    },
    cacheKey: (inputs) => `wingfrontventralmarking2_${inputs.wingStyle.value}_${inputs.wingmarkingventralStyle2.value}`,
    recolor: true,
    optional: true,
    z: "frontWing",
    order: 4
  },

  wingfrontdorsalmarking: { 
    layerName: "wingfrontdorsalmarking",
    colorInput: "wingmarkingdorsalColor",
    styleInput: "wingStyle",
    assetPath: (inputs) => {
      const wingStyle = inputs.wingStyle?.value;
      const markingStyle = inputs.wingmarkingdorsalStyle?.value;
      if (!wingStyle || wingStyle === "none") return null;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_wing/dorsal_${wingStyle}_front_${markingStyle}.png`;
    },
    cacheKey: (inputs) => `wingfrontdorsalmarking_${inputs.wingStyle.value}_${inputs.wingmarkingdorsalStyle.value}`,
    recolor: true,
    optional: true,
    z: "frontWing",
    order: 5
  },

  wingfrontdorsalmarking2: { 
    layerName: "wingfrontdorsalmarking2",
    colorInput: "wingmarkingdorsalColor2",
    styleInput: "wingStyle",
    assetPath: (inputs) => {
      const wingStyle = inputs.wingStyle?.value;
      const markingStyle = inputs.wingmarkingdorsalStyle2?.value;
      if (!wingStyle || wingStyle === "none") return null;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_wing/dorsal_${wingStyle}_front_${markingStyle}.png`;
    },
    cacheKey: (inputs) => `wingfrontdorsalmarking2_${inputs.wingStyle.value}_${inputs.wingmarkingdorsalStyle2.value}`,
    recolor: true,
    optional: true,
    z: "frontWing",
    order: 6
  },

  wingfrontbone: {
    layerName: "wingfrontbone",
    styleInput: "wingStyle",
    colorInput: "boneColor",
    assetPath: (inputs) => {
      const style = inputs.wingStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/wings/wing_${inputs.wingStyle.value}_front_bone.png`;
    },
    cacheKey: inputs =>
      `wingfrontbone_${inputs.wingStyle.value}`,
    recolor: true,
    optional: true,
    z: "frontWing",
    order: 7
  },

  wingfrontlineart: {
    layerName: "wingfrontlineart",
    styleInput: "wingStyle",
    assetPath: (inputs) => {
      const style = inputs.wingStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/wings/wing_${inputs.wingStyle.value}_front_lines.png`;
    },
    cacheKey: inputs =>
      `wingfrontlineart_${inputs.wingStyle.value}`,
    recolor: false,
    z: "frontWing",
    order: 8
  },

  //////////////////////////////////////////

  // IN FRONT OF WING

  //////////////////////////////////////////



  // Hind leg Front

  leghindfrontbase: {
    layerName: "leghindfrontbase",
  styleInput: "hindlegStyleSelect",
  colorInput: "baseColor",
    assetPath: (inputs) => {
      if (!inputs.hindlegStyleSelect || inputs.hindlegStyleSelect.value === "none") {
        return null;
      }
      return `/proj/dragonbuilder/hindlegs/hindleg_front_${inputs.hindlegStyleSelect.value}_base.png`;
    },
    cacheKey: (inputs) =>
      `leghindfrontbase_${inputs.hindlegStyleSelect.value}`,
  recolor: true,
  optional: true,
    z: "inFrontOfWing",
    order: 1
  },

  leghindfrontmarking: {
  layerName: "leghindfrontmarking",
  colorInput: "hindlegmarkingColor",
  styleInput: "hindlegmarkingStyle",
  assetPath: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const markingStyle = inputs.hindlegmarkingStyle?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!markingStyle || markingStyle === "none") return null;
    return `/proj/dragonbuilder/markings_hindleg/marking_${legStyle}_front_${markingStyle}.png`;
  },
  cacheKey: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const markingStyle = inputs.hindlegmarkingStyle?.value;
    return `leghindfrontmarking_${legStyle}_${markingStyle}`;
  },
  recolor: true,
  optional: true,
    z: "inFrontOfWing",
    order: 2
  },

  leghindfrontflesh: {
    layerName: "leghindfrontflesh",
    styleInput: "hindlegStyleSelect",
    colorInput: "fleshColor",
    assetPath: (inputs) => {
      if (!inputs.hindlegStyleSelect || inputs.hindlegStyleSelect.value === "none") {
        return null;
      }
      return `/proj/dragonbuilder/hindlegs/hindleg_front_${inputs.hindlegStyleSelect.value}_flesh.png`;
    },
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 3
  },

  leghindfrontmarking2: { 
    layerName: "leghindfrontmarking2",
    colorInput: "hindlegmarkingColor2",
    styleInput: "hindlegmarkingStyle2",
    assetPath: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const markingStyle = inputs.hindlegmarkingStyle2?.value;
    if (!legStyle || legStyle === "none") return null;
    if (!markingStyle || markingStyle === "none") return null;
    return `/proj/dragonbuilder/markings_hindleg/marking_${legStyle}_front_${markingStyle}.png`;
  },
  cacheKey: (inputs) => {
    const legStyle = inputs.hindlegStyleSelect?.value;
    const markingStyle = inputs.hindlegmarkingStyle2?.value;
    return `leghindfrontmarking2_${legStyle}_${markingStyle}`;
  },
  recolor: true,
  optional: true,  
    z: "inFrontOfWing",
    order: 4
  },


  leghindfrontbone: {
    layerName: "leghindfrontbone",
    styleInput: "hindlegStyleSelect",
    colorInput: "boneColor",
    assetPath: (inputs) => {
      return `/proj/dragonbuilder/hindlegs/hindleg_front_${inputs.hindlegStyleSelect.value}_bone.png`;
    },
    cacheKey: inputs =>
      `leghindfrontbone_${inputs.hindlegStyleSelect.value}`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 5
  },

  leghindfrontlineart: { 
    layerName: "leghindfrontlineart",
    styleInput: "hindlegStyleSelect",
    assetPath: (inputs) => {
      if (!inputs.hindlegStyleSelect || inputs.hindlegStyleSelect.value === "none") {
        return null;
      }
      return `/proj/dragonbuilder/hindlegs/hindleg_front_${inputs.hindlegStyleSelect.value}_lines.png`;
    },
    cacheKey: inputs =>
      `leghindfrontlineart_${inputs.hindlegStyleSelect.value}`,
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 6
  },  

  leghindfrontdeccolor: { 
    layerName: "leghindfrontdeccolor",
    styleInput: "hindlegdecStyle",
    colorInput: "hindlegdecColor",
assetPath: (inputs) => {
      if (!inputs.hindlegStyleSelect || inputs.hindlegStyleSelect.value === "none") {
        return null;
      }
      if (!inputs.hindlegdecStyle || inputs.hindlegdecStyle.value === "none") {
        return null;
      }
      return `/proj/dragonbuilder/legdecor/hind_${inputs.hindlegStyleSelect.value}_front_${inputs.hindlegdecStyle.value}_color.png`;
    },
    cacheKey: inputs =>
      `leghindfrontdeccolor_${inputs.hindlegStyleSelect.value}_${inputs.hindlegdecStyle.value}`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 7
  },

  leghindfrontdeclineart: {
    layerName: "leghindfrontdeclineart",
    styleInput: "hindlegdecStyle",
   assetPath: (inputs) => {
      if (!inputs.hindlegStyleSelect || inputs.hindlegStyleSelect.value === "none") {
        return null;
      }
      if (!inputs.hindlegdecStyle || inputs.hindlegdecStyle.value === "none") {
        return null;
      }
      return `/proj/dragonbuilder/legdecor/hind_${inputs.hindlegStyleSelect.value}_front_${inputs.hindlegdecStyle.value}_lines.png`; 
    },
    cacheKey: inputs =>
      `leghindfrontdeclineart_${inputs.hindlegStyleSelect.value}_${inputs.hindlegdecStyle.value}`,
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 8
  },

  leghindfrontdeccolor2: {
    layerName: "leghindfrontdeccolor2",
    styleInput: "hindlegdecStyle2",
    colorInput: "hindlegdecColor2",
    assetPath: (inputs) => {
      if (!inputs.hindlegStyleSelect || inputs.hindlegStyleSelect.value === "none") {
        return null;
      }
      if (!inputs.hindlegdecStyle2 || inputs.hindlegdecStyle2.value === "none") {
        return null;
      }
      return `/proj/dragonbuilder/legdecor/hind_${inputs.hindlegStyleSelect.value}_front_${inputs.hindlegdecStyle2.value}_color.png`;
    },
    cacheKey: inputs =>
      `leghindfrontdeccolor2_${inputs.hindlegStyleSelect.value}_${inputs.hindlegdecStyle2.value}_`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 9
  },

  leghindfrontdeclineart2: {
    layerName: "leghindfrontdeclineart2",
    styleInput: "hindlegdecStyle2",
    assetPath: (inputs) => {
      if (!inputs.hindlegStyleSelect || inputs.hindlegStyleSelect.value === "none") {
        return null;
      }
      if (!inputs.hindlegdecStyle2 || inputs.hindlegdecStyle2.value === "none") {
        return null;
      }
      return `/proj/dragonbuilder/legdecor/hind_${inputs.hindlegStyleSelect.value}_front_${inputs.hindlegdecStyle2.value}_lines.png`;
    },
    cacheKey: inputs =>
      `leghindfrontdeclineart2_${inputs.hindlegStyleSelect.value}_${inputs.hindlegdecStyle2.value}_`,
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 10
  },


    // Jaw Dec 2 (behind ear)
    jawdeccolor2: {
    layerName: "jawdeccolor2",
    styleInput: "jawdecStyle2",
    colorInput: "jawdecColor2",
    assetPath: (inputs) => {
      const style = inputs.jawdecStyle2?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/jawdecor/jawdec_${style}_color.png`;
    },
    cacheKey: (inputs) => `jawdeccolor2_${inputs.jawdecStyle2.value}`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 11
  },

  jawdeclineart2: {
    layerName: "jawdeclineart2",
    styleInput: "jawdecStyle2",
    assetPath: (inputs) => {
      const style = inputs.jawdecStyle2?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/jawdecor/jawdec_${style}_lines.png`;
    },
    cacheKey: (inputs) => `jawdeclineart2_${inputs.jawdecStyle2.value}`,
    recolor: false,
    z: "inFrontOfWing",
    order: 12
  },

  // Front Ear
  earfrontbase: {
    layerName: "earfrontbase",
    styleInput: "earStyle",
    colorInput: "baseColor",
    assetPath: (inputs) => {
      const style = inputs.earStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/ears/ear_${style}_front_base.png`;
    },
    cacheKey: (inputs) => `earfrontbase_${inputs.earStyle.value}`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 13
  },

  earfrontflesh: {
    layerName: "earfrontflesh",
    styleInput: "earStyle",
    colorInput: "fleshColor",
    assetPath: (inputs) => {
      const style = inputs.earStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/ears/ear_${style}_front_flesh.png`;
    },
    cacheKey: (inputs) => `earfrontflesh_${inputs.earStyle.value}`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 14
  }, 

  earfrontlineart: {
    layerName: "earfrontlineart",
    styleInput: "earStyle",
    assetPath: (inputs) => {
      const style = inputs.earStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/ears/ear_${style}_front_lines.png`;
    },
    cacheKey: (inputs) => `earfrontlineart_${inputs.earStyle.value}`,
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 15
  },

  // Jaw Dec 1 (in front of ear)
  jawdeccolor: {
    layerName: "jawdeccolor",
    styleInput: "jawdecStyle",
    colorInput: "jawdecColor",
    assetPath: (inputs) => {
      const style = inputs.jawdecStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/jawdecor/jawdec_${style}_color.png`;
    },
    cacheKey: (inputs) => `jawdeccolor_${inputs.jawdecStyle.value}`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 16
  },

  jawdeclineart: {
    layerName: "jawdeclineart",
    styleInput: "jawdecStyle",
    assetPath: (inputs) => {
      const style = inputs.jawdecStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/jawdecor/jawdec_${style}_lines.png`;
    },
    cacheKey: (inputs) => `jawdeclineart_${inputs.jawdecStyle.value}`,
    recolor: false,
    z: "inFrontOfWing",
    order: 17
  },

  // Head top add-on
  headtopcolor: {
    layerName: "headtopcolor",
    styleInput: "headtopStyle",
    colorInput: "headtopColor",
    assetPath: (inputs) => {
      const style = inputs.headtopStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/headtop/headtop_${style}_color.png`;
    } ,
    cacheKey: (inputs) => `headtopcolor_${inputs.headtopStyle.value}`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 18
  },

  headtoplineart: {
    layerName: "headtoplineart",
    styleInput: "headtopStyle",
    assetPath: (inputs) => {
      const style = inputs.headtopStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/headtop/headtop_${style}_lines.png`;
    },
    cacheKey: (inputs) => `headtoplineart_${inputs.headtopStyle.value}`, 
    optional: true,
    recolor: false,
    z: "inFrontOfWing",
    order: 19
  },

  // Front Horn
  hornfrontcolor: {
    layerName: "hornfrontcolor",
    styleInput: "hornStyle",
    colorInput: "boneColor",
    assetPath: (inputs) => {
      const style = inputs.hornStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/horns/horn_${style}_front_color.png`;
    },
    cacheKey: (inputs) => `hornfrontcolor_${inputs.hornStyle.value}`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 20
  },

  hornfrontlineart: {
    layerName: "hornfrontlineart",
    styleInput: "hornStyle",
    assetPath: (inputs) => {
      const style = inputs.hornStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/horns/horn_${style}_front_lines.png`;
    },
    cacheKey: (inputs) => `hornfrontlineart_${inputs.hornStyle.value}`,
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 21
  },

  hornaccfront: { // uses multiple style inputs
    layerName: "hornaccfront",
    styleInput: "hornAcc",
    assetPath: (inputs) => {
      const hornStyle = inputs.hornStyle?.value;
      const accStyle = inputs.hornAccStyle?.value;
      if (!hornStyle || hornStyle === "none") return null;
      if (!accStyle || accStyle === "none") return null;
      return `/proj/dragonbuilder/hornacc/${hornStyle}_front_${accStyle}.png`;
    },
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 22
  },  

    // Torso Accessory

  torsoacc: {
    layerName: "torsoacc",
    styleInput: "torsoacc",
    assetPath: (inputs) => {
      const style = inputs.torsoacc?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/acc_torso/${style}.png`;
    },
    cacheKey: (inputs) =>
      `torsoacc_${inputs.torsoacc.value}`,
    optional: true,
    recolor: false,
    z: "inFrontOfWing",
    order: 23
  },

  // Foreleg Front

  legforefrontbase: {
    layerName: "legforefrontbase",
    styleInput: "forelegStyleSelect",
    colorInput: "baseColor",
      assetPath: (inputs) => {
      const style = inputs.forelegStyleSelect?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/forelegs/foreleg_front_${style}_base.png`;
    },
    cacheKey: (inputs) => `legforefrontbase_${inputs.forelegStyleSelect.value}`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 24
  },

    legforefrontmarking: { 
    layerName: "legforefrontmarking",
    colorInput: "forelegmarkingColor",
    styleInput: "forelegmarkingStyle",
    assetPath: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const markingStyle = inputs.forelegmarkingStyle?.value;
      if (!legStyle || legStyle === "none") return null;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_foreleg/marking_${legStyle}_front_${markingStyle}.png`;
    },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const markingStyle = inputs.forelegmarkingStyle?.value;
      return `legforefrontmarking_${legStyle}_${markingStyle}`;
    },
    recolor: true,
    z: "inFrontOfWing",
    order: 25
  },  

  legforefrontflesh: {
    layerName: "legforefrontflesh",
    styleInput: "forelegStyleSelect",
    colorInput: "fleshColor",
    assetPath: (inputs) => {
      const style = inputs.forelegStyleSelect?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/forelegs/foreleg_front_${style}_flesh.png`;
    },
    cacheKey: (inputs) => `legforefrontflesh_${inputs.forelegStyleSelect.value}`, 
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 26
  },

  legforefrontmarking2: { 
    styleInput: "forelegmarkingStyle2",
    layerName: "legforefrontmarking2",
    colorInput: "forelegmarkingColor2",
    assetPath: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const markingStyle = inputs.forelegmarkingStyle2?.value;
      if (!legStyle || legStyle === "none") return null;
      if (!markingStyle || markingStyle === "none") return null;
      return `/proj/dragonbuilder/markings_foreleg/marking_${legStyle}_front_${markingStyle}.png`;
    },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const markingStyle = inputs.forelegmarkingStyle2?.value;
      return `legforefrontmarking2_${legStyle}_${markingStyle}`;
    },
    recolor: true,
    z: "inFrontOfWing",
    order: 27
  },

  legforefrontbone: {
    layerName: "legforefrontbone",
    styleInput: "forelegStyleSelect",
    colorInput: "boneColor",
    assetPath: (inputs) => {
      const style = inputs.forelegStyleSelect?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/forelegs/foreleg_front_${style}_bone.png`;
    },
    cacheKey: (inputs) => `legforefrontbone_${inputs.forelegStyleSelect.value}`,
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 28
  },

  legforefrontlineart: {
    layerName: "legforefrontlineart",
    styleInput: "forelegStyleSelect",
    assetPath: (inputs) => {
      const style = inputs.forelegStyleSelect?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/forelegs/foreleg_front_${style}_lines.png`;
    },
    cacheKey: (inputs) => `legforefrontlineart_${inputs.forelegStyleSelect.value}`,
    optional: true,
    recolor: false,
    z: "inFrontOfWing",
    order: 29
  },

  legforefrontdeccolor: { // works! use for reference!
    layerName: "legforefrontdeccolor",
    styleInput: "forelegdecStyle",
    colorInput: "forelegdecColor",
    assetPath: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle?.value;
      if (!legStyle || legStyle === "none") return null;
      if (!decStyle || decStyle === "none") return null;
      return `/proj/dragonbuilder/legdecor/fore_${legStyle}_front_${decStyle}_color.png`;
    },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle?.value;
      return `legforefrontdeccolor_${legStyle}_${decStyle}`;
    },
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 30
  },

  legforefrontdeclineart: { // works! use for reference!
    layerName: "legforefrontdeclineart",
    styleInput: "forelegdecStyle",
    assetPath: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle?.value;
      if (!legStyle || legStyle === "none") return null;
      if (!decStyle || decStyle === "none") return null;
      return `/proj/dragonbuilder/legdecor/fore_${legStyle}_front_${decStyle}_lines.png`;
    },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyle?.value;
      const decStyle = inputs.forelegdecStyle?.value;
      return `legforefrontdeclineart_${legStyle}_${decStyle}`;
    },
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 31
  },

  legforefrontdeccolor2: { 
    layerName: "legforefrontdeccolor2",
    styleInput: "forelegdecStyle2",
    colorInput: "forelegdecColor2",
    assetPath: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle2?.value;
      if (!legStyle || legStyle === "none") return null;
      if (!decStyle || decStyle === "none") return null;
      return `/proj/dragonbuilder/legdecor/fore_${legStyle}_front_${decStyle}_color.png`;
    },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle2?.value;
      return `legforefrontdeccolor2_${legStyle}_${decStyle}`;
    },
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 32
  },

  legforefrontdeclineart2: { 
    layerName: "legforefrontdeclineart2",
    styleInput: "forelegdecStyle2",
    assetPath: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle2?.value;
      if (!legStyle || legStyle === "none") return null;
      if (!decStyle || decStyle === "none") return null;
      return `/proj/dragonbuilder/legdecor/fore_${legStyle}_front_${decStyle}_lines.png`;
    },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const decStyle = inputs.forelegdecStyle2?.value;
      return `legforefrontdeclineart2_${legStyle}_${decStyle}`;
    },
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 33
  },

  legforefrontacc: {
      layerName: "legforefrontacc",
    styleInput: "forelegacc",
    assetPath: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const accStyle = inputs.forelegacc?.value;
      if (!legStyle || legStyle === "none") return null;
      if (!accStyle || accStyle === "none") return null;
      return `/proj/dragonbuilder/legdecor/fore_${legStyle}_front_${accStyle}_lines.png`;
    },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const accStyle = inputs.forelegacc?.value;
      return `legforefrontacc_${legStyle}_${accStyle}`;
    },
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 33
  },

    legforefrontacc2: {
      layerName: "legforefrontacc2",
    styleInput: "forelegacc2",
    assetPath: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const accStyle = inputs.forelegacc2?.value;
      if (!legStyle || legStyle === "none") return null;
      if (!accStyle || accStyle === "none") return null;
      return `/proj/dragonbuilder/legdecor/fore_${legStyle}_front_${accStyle}_lines.png`;
    },
    cacheKey: (inputs) => {
      const legStyle = inputs.forelegStyleSelect?.value;
      const accStyle = inputs.forelegacc2?.value;
      return `legforefrontacc2_${legStyle}_${accStyle}`;
    },
    recolor: false,
    optional: true,
    z: "inFrontOfWing",
    order: 33
  },

  // Head and Neck Accessories
  neckacc: {
    layerName: "neckacc",
    styleInput: "neckacc",
    assetPath: (inputs) => {
      const style = inputs.neckacc?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/acc_neck/${style}.png`;
    },
    cacheKey: (inputs) =>
      `neckacc_${inputs.neckacc.value}`,
    optional: true,
    recolor: false,
    z: "inFrontOfWing",
    order: 34
  },

  neckaddcolor: {
    layerName: "neckaddColor",
    styleInput: "neckaddStyle",
    colorInput: "neckaddColor",
    assetPath: (inputs) => {
      const style = inputs.neckaddStyle?.value;
      const color = inputs.neckaddColor?.value;
      if (!style || style === "none") return null;
      if (!color || color === "none") return null;
      return `/proj/dragonbuilder/neckdecor/${style}_${color}.png`;
    },
    cacheKey: (inputs) => {
      const style = inputs.neckaddStyle?.value;
      const color = inputs.neckaddColor?.value;
      return `neckaddColor_${style}_${color}`;
    },
    recolor: true,
    optional: true,
    z: "inFrontOfWing",
    order: 35
  },

  neckaddlines: {
    layerName: "neckaddLines",
    styleInput: "neckaddStyle",
    assetPath: (inputs) => {
      const style = inputs.neckaddStyle?.value;
      const color = inputs.neckaddColor?.value;
      if (!style || style === "none") return null;
      if (!color || color === "none") return null;
      return `/proj/dragonbuilder/neckdecor/${style}_${color}.png`;
    },
    cacheKey: (inputs) => {
      const style = inputs.neckaddStyle?.value;
      return `neckaddLines_${style}`;
    },
    optional: true,
    z: "inFrontOfWing",
    order: 36
  },

  headacc: {
    layerName: "headacc",
    styleInput: "headacc",
    assetPath: (inputs) => {
      const style = inputs.headacc?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/acc_head/${style}.png`;
    },
    cacheKey: (inputs) =>
      `headacc_${inputs.headacc.value}`,
    optional: true,
    recolor: false,
    z: "inFrontOfWing",
    order: 37
  },


  whiskerfront: {
    layerName: "whiskerfront",
    styleInput: "whiskerStyle",
    colorInput: "whiskerColor",
    assetPath: (inputs) => {
      const style = inputs.whiskerStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/whiskers/whisker_front_${style}.png`;
    },
    cacheKey: (inputs) =>
      `whiskerfront_${inputs.whiskerStyle.value}`,
    optional: true,
    recolor: true,
    z: "inFrontOfWing",
    order: 38
  },
  
  whiskerfrontlineart: {
    layerName: "whiskerfrontlineart",
    styleInput: "whiskerStyle",
    assetPath: (inputs) => {
      const style = inputs.whiskerStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/whiskers/whisker_front_${style}_lines.png`;
    },
    cacheKey: (inputs) =>
      `whiskerfrontlineart_${inputs.whiskerStyle.value}`,
    optional: true,
    recolor: false,
    z: "inFrontOfWing",
    order: 39
  },


  breath: {
    layerName: "breath",
    styleInput: "breathStyle",
    colorInput: "breathColor",
    assetPath: (inputs) => {
      const style = inputs.breathStyle?.value;
      if (!style || style === "none") return null;
      return `/proj/dragonbuilder/breath/breath_${style}.png`;
    },
    cacheKey: (inputs) =>
      `breath_${inputs.breathStyle.value}`,
    optional: true,
    recolor: true,
    z: "inFrontOfWing",
    order: 999  
  }

  

};

DragonBuilder.buildLayerDrawOrder = function () {

  const ordered = [];

  DragonBuilder.zOrder.forEach(z => {

    const layers = Object.entries(DragonBuilder.layerRegistry)
      .filter(([_, layer]) => layer.z === z)
      .sort((a,b)=> (a[1].order ?? 0) - (b[1].order ?? 0));

    layers.forEach(([name]) => ordered.push(name));

  });

  DragonBuilder._drawOrder = ordered;
};