// Convert Arabic-Indic digits <-> Western digits
export const toArabicDigits = (input) =>
  String(input).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

export const toWesternDigits = (input) =>
  String(input).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

// Number to Arabic words (تفقيط)
const ONES = [
  "",
  "واحد",
  "اثنان",
  "ثلاثة",
  "أربعة",
  "خمسة",
  "ستة",
  "سبعة",
  "ثمانية",
  "تسعة",
  "عشرة",
  "أحد عشر",
  "اثنا عشر",
  "ثلاثة عشر",
  "أربعة عشر",
  "خمسة عشر",
  "ستة عشر",
  "سبعة عشر",
  "ثمانية عشر",
  "تسعة عشر",
];

const TENS = [
  "",
  "",
  "عشرون",
  "ثلاثون",
  "أربعون",
  "خمسون",
  "ستون",
  "سبعون",
  "ثمانون",
  "تسعون",
];

const HUNDREDS = [
  "",
  "مئة",
  "مئتان",
  "ثلاثمئة",
  "أربعمئة",
  "خمسمئة",
  "ستمئة",
  "سبعمئة",
  "ثمانمئة",
  "تسعمئة",
];

const under1000 = (n) => {
  if (n === 0) return "";
  let parts = [];
  const h = Math.floor(n / 100);
  const r = n % 100;
  if (h) parts.push(HUNDREDS[h]);
  if (r) {
    if (r < 20) parts.push(ONES[r]);
    else {
      const t = Math.floor(r / 10);
      const u = r % 10;
      if (u) parts.push(`${ONES[u]} و${TENS[t]}`);
      else parts.push(TENS[t]);
    }
  }
  return parts.join(" و");
};

export const numberToArabicWords = (n) => {
  n = Math.floor(Math.abs(Number(n) || 0));
  if (n === 0) return "صفر";

  const billions = Math.floor(n / 1_000_000_000);
  const millions = Math.floor((n % 1_000_000_000) / 1_000_000);
  const thousands = Math.floor((n % 1_000_000) / 1000);
  const ones = n % 1000;

  const parts = [];
  if (billions) {
    if (billions === 1) parts.push("مليار");
    else if (billions === 2) parts.push("ملياران");
    else if (billions < 11) parts.push(`${under1000(billions)} مليارات`);
    else parts.push(`${under1000(billions)} مليار`);
  }
  if (millions) {
    if (millions === 1) parts.push("مليون");
    else if (millions === 2) parts.push("مليونان");
    else if (millions < 11) parts.push(`${under1000(millions)} ملايين`);
    else parts.push(`${under1000(millions)} مليون`);
  }
  if (thousands) {
    if (thousands === 1) parts.push("ألف");
    else if (thousands === 2) parts.push("ألفان");
    else if (thousands < 11) parts.push(`${under1000(thousands)} آلاف`);
    else parts.push(`${under1000(thousands)} ألف`);
  }
  if (ones) parts.push(under1000(ones));

  return parts.join(" و");
};
