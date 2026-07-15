import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Circle, RotateCcw, Plus } from "lucide-react";
import { toast } from "sonner";

const PRESETS = [
  { text: "سبحان الله", target: 33 },
  { text: "الحمد لله", target: 33 },
  { text: "الله أكبر", target: 34 },
  { text: "لا إله إلا الله", target: 100 },
  { text: "أستغفر الله", target: 100 },
  { text: "لا حول ولا قوة إلا بالله", target: 100 },
];

const KEY = "dalil-matar-tasbih";

const Tasbih = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [text, setText] = useState("سبحان الله");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) {
      try {
        const d = JSON.parse(stored);
        setTotal(d.total || 0);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify({ total }));
  }, [total]);

  const increment = () => {
    const next = count + 1;
    setCount(next);
    setTotal(total + 1);
    if (navigator.vibrate) navigator.vibrate(20);
    if (next === target) {
      toast.success(`تم إكمال ${target} × ${text}`);
      if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
    }
  };

  const reset = () => setCount(0);
  const resetTotal = () => { setTotal(0); toast.success("تم مسح الإجمالي"); };

  return (
    <div data-testid="tasbih-page">
      <PageHeader icon={Circle} title="عدّاد الأذكار" subtitle="مسبحة إلكترونية مع أدعية جاهزة" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="mb-5">
            <label className="text-xs font-medium mb-2 block">الذكر</label>
            <div className="flex flex-wrap gap-2 mb-3" data-testid="tasbih-presets">
              {PRESETS.map((p) => (
                <button key={p.text} onClick={() => { setText(p.text); setTarget(p.target); setCount(0); }}
                  data-testid={`tasbih-preset-${p.text}`}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    text === p.text ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                  }`}>
                  {p.text} ({p.target})
                </button>
              ))}
            </div>
            <div className="grid grid-cols-[1fr_100px] gap-2">
              <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                data-testid="tasbih-text"
                className="text-base bg-secondary/50 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-primary" />
              <input type="number" value={target} min="1"
                onChange={(e) => { setTarget(parseInt(e.target.value) || 1); setCount(0); }}
                data-testid="tasbih-target"
                className="text-base font-semibold number-display bg-secondary/50 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-primary" />
            </div>
          </div>

          <button onClick={increment} data-testid="tasbih-tap"
            className="w-full aspect-square max-w-sm mx-auto rounded-full bg-primary text-primary-foreground grid place-items-center relative overflow-hidden active:scale-95 transition-transform">
            <div className="absolute inset-4 rounded-full border-4 border-primary-foreground/10" />
            <div className="relative text-center">
              <div className="font-display font-serif-ar text-2xl text-[hsl(var(--gold))] mb-2 px-8" data-testid="tasbih-display-text">{text}</div>
              <div className="font-display font-bold text-7xl number-display" data-testid="tasbih-count">{count}</div>
              <div className="text-sm text-primary-foreground/70 mt-2 number-display">من {target}</div>
            </div>
          </button>

          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button onClick={reset} data-testid="tasbih-reset"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-secondary">
              <RotateCcw className="w-4 h-4" /> إعادة العدّ
            </button>
            <button onClick={() => setCount(count + 1)}
              className="hidden">+1</button>
          </div>

          <div className="mt-6 text-center bg-secondary/40 rounded-xl p-4">
            <div className="text-xs text-muted-foreground">الإجمالي الكلي (محفوظ)</div>
            <div className="font-display font-bold text-3xl number-display text-primary" data-testid="tasbih-total">{total}</div>
            <button onClick={resetTotal} className="text-xs text-muted-foreground hover:text-rose-500 mt-1">مسح الإجمالي</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasbih;
