import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Palette, RefreshCw, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const genColor = () => {
  const h = Math.floor(Math.random() * 360);
  const s = 60 + Math.floor(Math.random() * 30);
  const l = 45 + Math.floor(Math.random() * 20);
  return { h, s, l };
};

const hslToHex = ({ h, s, l }) => {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (v) => Math.round(255 * v).toString(16).padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
};

const ColorPalette = () => {
  const [palette, setPalette] = useState(() => Array.from({ length: 5 }, genColor));
  const [copiedIdx, setCopiedIdx] = useState(null);

  const regenerate = () => setPalette(Array.from({ length: 5 }, genColor));

  const copy = async (hex, idx) => {
    await navigator.clipboard.writeText(hex);
    setCopiedIdx(idx);
    toast.success(`تم نسخ ${hex}`);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div data-testid="colors-page">
      <PageHeader icon={Palette} title="مولّد بالتة الألوان" subtitle="بالتات عشوائية للمصممين والمطورين" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <button onClick={regenerate} data-testid="colors-regen"
          className="mb-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90">
          <RefreshCw className="w-4 h-4" /> بالتة جديدة
          <span className="text-xs opacity-70 mr-1">(اضغط Space)</span>
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3" data-testid="colors-palette"
          onKeyDown={(e) => e.key === " " && regenerate()} tabIndex="0">
          {palette.map((c, i) => {
            const hex = hslToHex(c);
            return (
              <div key={i} className="rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => copy(hex, i)}
                data-testid={`color-${i}`}>
                <div className="aspect-[3/4]" style={{ backgroundColor: hex }} />
                <div className="bg-card border border-border p-3 flex items-center justify-between border-t-0 rounded-b-2xl">
                  <div dir="ltr" className="font-mono text-sm font-semibold">{hex}</div>
                  <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition">
                    {copiedIdx === i ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-xs text-muted-foreground text-center">
          اضغط على أي لون لنسخ كوده HEX
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;
