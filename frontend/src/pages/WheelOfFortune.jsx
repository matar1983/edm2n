import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Circle, Play } from "lucide-react";
import { toast } from "sonner";

const COLORS = ["#0d5c4d", "#b8860b", "#c9a961", "#8b5cf6", "#ec4899", "#0ea5e9", "#f59e0b", "#10b981"];

const WheelOfFortune = () => {
  const [options, setOptions] = useState("خيار 1\nخيار 2\nخيار 3\nخيار 4\nخيار 5\nخيار 6");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState(null);

  const list = options.split("\n").map((o) => o.trim()).filter(Boolean);
  const slice = list.length > 0 ? 360 / list.length : 0;

  const spin = () => {
    if (list.length < 2) { toast.error("أضف خيارين على الأقل"); return; }
    setSpinning(true);
    setWinner(null);
    const winIdx = Math.floor(Math.random() * list.length);
    const laps = 6 + Math.floor(Math.random() * 3);
    // Rotate so that winIdx ends up at pointer (top, 0°). Slice centers at slice*idx + slice/2.
    const target = laps * 360 + (360 - (winIdx * slice + slice / 2));
    setRotation(target);
    setTimeout(() => {
      setSpinning(false);
      setWinner(list[winIdx]);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }, 4000);
  };

  return (
    <div data-testid="wheel-page">
      <PageHeader icon={Circle} title="دولاب الحظ" subtitle="اختر عشوائياً من مجموعة خيارات" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 items-start">
          <div className="bg-card border border-border rounded-2xl p-6">
            <label className="text-sm font-medium mb-1.5 block">الخيارات (خيار في كل سطر)</label>
            <textarea value={options} onChange={(e) => setOptions(e.target.value)} rows="10"
              data-testid="wheel-options"
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary resize-y" />
            <div className="text-xs text-muted-foreground mt-1">
              العدد: <span className="number-display font-semibold">{list.length}</span>
            </div>
            <button onClick={spin} disabled={spinning || list.length < 2} data-testid="wheel-spin"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50">
              <Play className="w-4 h-4" /> {spinning ? "جاري الدوران..." : "أدر الدولاب!"}
            </button>
          </div>

          <div className="relative aspect-square max-w-md mx-auto w-full" data-testid="wheel-visual">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-transparent border-t-[hsl(var(--gold))]" />
            </div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-2xl transition-transform ease-out"
              style={{ transform: `rotate(${rotation}deg)`, transitionDuration: spinning ? "4s" : "0s" }}>
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {list.map((opt, i) => {
                  const startA = i * slice - 90;
                  const endA = startA + slice;
                  const startRad = (startA * Math.PI) / 180;
                  const endRad = (endA * Math.PI) / 180;
                  const x1 = 100 + 100 * Math.cos(startRad);
                  const y1 = 100 + 100 * Math.sin(startRad);
                  const x2 = 100 + 100 * Math.cos(endRad);
                  const y2 = 100 + 100 * Math.sin(endRad);
                  const largeArc = slice > 180 ? 1 : 0;
                  const midA = ((startA + endA) / 2 * Math.PI) / 180;
                  const tx = 100 + 60 * Math.cos(midA);
                  const ty = 100 + 60 * Math.sin(midA);
                  return (
                    <g key={i}>
                      <path d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc} 1 ${x2},${y2} Z`} fill={COLORS[i % COLORS.length]} />
                      <text x={tx} y={ty} fill="white" fontSize="8" textAnchor="middle" dominantBaseline="middle"
                        transform={`rotate(${(startA + endA) / 2 + 90} ${tx} ${ty})`}>
                        {opt.slice(0, 12)}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
        {winner && (
          <div className="mt-6 bg-primary text-primary-foreground rounded-2xl p-6 text-center" data-testid="wheel-winner">
            <div className="text-[hsl(var(--gold))] font-semibold text-sm mb-2">النتيجة 🎉</div>
            <div className="font-display font-bold text-4xl">{winner}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelOfFortune;
