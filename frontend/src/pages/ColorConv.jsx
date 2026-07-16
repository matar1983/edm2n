import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Paintbrush2, Copy } from "lucide-react";
import { toast } from "sonner";

const hexToRgb = (hex) => {
  const m = hex.replace("#", "").match(/^([0-9a-f]{6})$/i);
  if (!m) return null;
  return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16) };
};

const rgbToHsl = ({ r, g, b }) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const ColorConv = () => {
  const [hex, setHex] = useState("#0d5c4d");
  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb) : null;

  const copy = async (v) => { await navigator.clipboard.writeText(v); toast.success("تم النسخ"); };

  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";
  const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "";

  return (
    <div data-testid="color-conv-page">
      <PageHeader icon={Paintbrush2} title="محوّل الألوان" subtitle="HEX ↔ RGB ↔ HSL" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <input type="color" value={hex} onChange={(e) => setHex(e.target.value)} data-testid="cc-picker"
              className="w-20 h-20 rounded-xl cursor-pointer border border-border" />
            <div className="flex-1">
              <label className="text-sm font-medium mb-1.5 block">HEX</label>
              <input type="text" value={hex} onChange={(e) => setHex(e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value)}
                data-testid="cc-hex" dir="ltr"
                className="w-full font-mono text-lg font-bold bg-secondary/50 border border-border rounded-xl px-4 py-3 uppercase focus:outline-none focus:border-primary" />
            </div>
          </div>
          <div className="grid gap-3">
            <Row label="HEX" value={hex.toUpperCase()} onCopy={() => copy(hex.toUpperCase())} testid="cc-out-hex" />
            {rgb && <Row label="RGB" value={rgbStr} onCopy={() => copy(rgbStr)} testid="cc-out-rgb" />}
            {hsl && <Row label="HSL" value={hslStr} onCopy={() => copy(hslStr)} testid="cc-out-hsl" />}
          </div>
          <div className="mt-4 h-24 rounded-2xl" style={{ backgroundColor: hex }} />
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value, onCopy, testid }) => (
  <div className="bg-secondary/40 border border-border rounded-xl p-3 flex items-center justify-between gap-3" data-testid={testid}>
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div dir="ltr" className="font-mono text-base font-semibold">{value}</div>
    </div>
    <button onClick={onCopy} className="p-2 rounded-full hover:bg-secondary"><Copy className="w-4 h-4" /></button>
  </div>
);

export default ColorConv;
