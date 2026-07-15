import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Dice6, Shuffle, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Lottery = () => {
  const [names, setNames] = useState("أحمد\nمحمد\nخالد\nسارة\nنورة\nعبدالله");
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState([]);
  const [rolling, setRolling] = useState(false);

  const list = names.split("\n").map((n) => n.trim()).filter(Boolean);

  const draw = () => {
    if (list.length === 0) {
      toast.error("أضف أسماء أولاً");
      return;
    }
    const count = Math.min(winnerCount, list.length);
    setRolling(true);
    let ticks = 0;
    const iv = setInterval(() => {
      const shuffled = [...list].sort(() => Math.random() - 0.5).slice(0, count);
      setWinners(shuffled);
      ticks++;
      if (ticks > 15) {
        clearInterval(iv);
        setRolling(false);
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        toast.success("مبروك للفائزين! 🎉");
      }
    }, 80);
  };

  return (
    <div data-testid="lottery-page">
      <PageHeader icon={Dice6} title="سحب عشوائي / قرعة" subtitle="اختر فائزاً أو أكثر من قائمة أسماء" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <label className="block mb-5">
            <span className="text-sm font-medium mb-1.5 block">قائمة الأسماء (اسم في كل سطر)</span>
            <textarea value={names} onChange={(e) => setNames(e.target.value)} rows="8"
              data-testid="lot-names"
              className="w-full text-base bg-secondary/50 border border-border rounded-xl px-4 py-3 resize-y focus:outline-none focus:border-primary" />
            <div className="text-xs text-muted-foreground mt-1">
              العدد الحالي: <span className="number-display font-semibold">{list.length}</span>
            </div>
          </label>

          <div className="grid grid-cols-[1fr_auto] gap-3 items-end mb-5">
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">عدد الفائزين</span>
              <input type="number" value={winnerCount} min="1" max={list.length || 1}
                onChange={(e) => setWinnerCount(parseInt(e.target.value) || 1)}
                data-testid="lot-count"
                className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
            </label>
            <button onClick={draw} disabled={rolling} data-testid="lot-draw"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50">
              <Shuffle className={`w-4 h-4 ${rolling ? "animate-spin" : ""}`} />
              اسحب!
            </button>
          </div>

          {winners.length > 0 && (
            <div className="bg-primary text-primary-foreground rounded-2xl p-6" data-testid="lot-winners">
              <div className="flex items-center gap-2 text-[hsl(var(--gold))] font-semibold text-sm mb-3">
                <Sparkles className="w-4 h-4" />
                {rolling ? "جاري السحب..." : "الفائزون"}
              </div>
              <div className="space-y-2">
                {winners.map((w, i) => (
                  <div key={i} className={`flex items-center gap-3 rounded-xl p-3 ${rolling ? "bg-primary-foreground/5" : "bg-primary-foreground/15"}`}>
                    <div className="w-8 h-8 rounded-full bg-[hsl(var(--gold))] text-primary font-bold grid place-items-center text-sm number-display">
                      {i + 1}
                    </div>
                    <div className="font-display font-bold text-xl">{w}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lottery;
