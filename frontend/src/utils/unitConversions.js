// Unit conversion factors — all convert to a base unit
export const UNIT_CATEGORIES = {
  length: {
    label: "طول / مسافة",
    base: "m",
    units: {
      mm: { label: "ملم", factor: 0.001 },
      cm: { label: "سم", factor: 0.01 },
      m: { label: "متر", factor: 1 },
      km: { label: "كم", factor: 1000 },
      in: { label: "إنش", factor: 0.0254 },
      ft: { label: "قدم", factor: 0.3048 },
      yd: { label: "ياردة", factor: 0.9144 },
      mi: { label: "ميل", factor: 1609.344 },
    },
  },
  weight: {
    label: "وزن / كتلة",
    base: "kg",
    units: {
      mg: { label: "ملغ", factor: 0.000001 },
      g: { label: "غرام", factor: 0.001 },
      kg: { label: "كجم", factor: 1 },
      ton: { label: "طن", factor: 1000 },
      oz: { label: "أونصة", factor: 0.0283495 },
      lb: { label: "باوند", factor: 0.453592 },
    },
  },
  volume: {
    label: "حجم / سعة",
    base: "l",
    units: {
      ml: { label: "مل", factor: 0.001 },
      l: { label: "لتر", factor: 1 },
      m3: { label: "متر مكعب", factor: 1000 },
      gal_us: { label: "غالون US", factor: 3.78541 },
      gal_uk: { label: "غالون UK", factor: 4.54609 },
      cup: { label: "كوب", factor: 0.24 },
    },
  },
  area: {
    label: "مساحة",
    base: "m2",
    units: {
      cm2: { label: "سم²", factor: 0.0001 },
      m2: { label: "متر²", factor: 1 },
      km2: { label: "كم²", factor: 1_000_000 },
      ha: { label: "هكتار", factor: 10000 },
      acre: { label: "فدان", factor: 4046.86 },
      ft2: { label: "قدم²", factor: 0.092903 },
    },
  },
  speed: {
    label: "سرعة",
    base: "mps",
    units: {
      mps: { label: "م/ث", factor: 1 },
      kmh: { label: "كم/س", factor: 0.277778 },
      mph: { label: "ميل/س", factor: 0.44704 },
      knot: { label: "عقدة", factor: 0.514444 },
    },
  },
};

export const convertUnit = (value, from, to, category) => {
  const cat = UNIT_CATEGORIES[category];
  if (!cat) return 0;
  const baseValue = value * cat.units[from].factor;
  return baseValue / cat.units[to].factor;
};

// Temperature is not a simple factor conversion
export const convertTemperature = (value, from, to) => {
  let celsius;
  if (from === "c") celsius = value;
  else if (from === "f") celsius = ((value - 32) * 5) / 9;
  else if (from === "k") celsius = value - 273.15;
  else celsius = value;

  if (to === "c") return celsius;
  if (to === "f") return (celsius * 9) / 5 + 32;
  if (to === "k") return celsius + 273.15;
  return celsius;
};

export const TEMP_UNITS = {
  c: "سلسيوس (°C)",
  f: "فهرنهايت (°F)",
  k: "كلفن (K)",
};
