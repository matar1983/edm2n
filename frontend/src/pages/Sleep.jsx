import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Bed } from "lucide-react";

// Sleep cycle = 90 min. Best to wake at end of a full cycle.
// Add 14 min to fall asleep.

const Sleep = () => {
  const [mode, setMode] = useState("wake"); // "wake" (I want to wake at X) or "sleep" (I sleep now, when to wake)
  const [time, setTime] = useState("06:00");
  const [now, setNow] = useState(false);

  const getCycles = () => {
    let base;
    if (mode === "wake") {
      const [h, m] = time.split(":").map(Number);
      base = new Date();
      base.setHours(h, m, 0, 0);
      // Subtract cycles + 14 min falling asleep
      return [6, 5, 4, 3].map((c) => {
        const d = new Date(base.getTime() - (c * 90 + 14) * 60000);
        return { cycles: c, time: d, hours: (c * 90) / 60 };
      });
    } else {
      base = now ? new Date() : new Date();
      if (!now) {
        const [h, m] = time.split(":").map(Number);
        base.setHours(h, m, 0, 0);
      }
      // Add 14 min + cycles
      return [3, 4, 5, 6].map((c) => {
        const d = new Date(base.getTime() + (c * 90 + 14) * 60000);
        return { cycles: c, time: d, hours: (c * 90) / 60 };
      });
    }
  };

  const cycles = getCycles();

  const fmt = (d) => d.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });

  return (
    <div data-testid="sleep-page">
      <PageHeader icon={Bed} title="حاسبة النوم" subtitle="متى تنام لتستيقظ نشيطاً — دورات النوم 90 دقيقة" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="flex bg-secondary rounded-full p-1 mb-5 w-fit mx-auto" data-testid="sleep-mode">
          <button onClick={() => setMode("wake")} data-testid="sleep-mode-wake"
            className={`px-4 py-2 rounded-full text-sm font-medium ${mode === "wake" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
            أريد الاستيقاظ في...
          </button>
          <button onClick={() => setMode("sleep")} data-testid="sleep-mode-sleep"
            className={`px-4 py-2 rounded-full text-sm font-medium ${mode === "sleep" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
            سأنام في...
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 mb-5">
          {mode === "sleep" && (
            <label className="flex items-center gap-3 mb-4 cursor-pointer">
              <input type="checkbox" checked={now} onChange={(e) => setNow(e.target.checked)}
                data-testid="sleep-now" className="w-5 h-5 accent-primary" />
              <span className="text-sm font-medium">سأنام الآن</span>
            </label>
          )}
          {!now && (
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">
                {mode === "wake" ? "وقت الاستيقاظ" : "وقت النوم"}
              </span>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} data-testid="sleep-time"
                className="w-full text-2xl font-bold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
            </label>
          )}
        </div>

        <div className="space-y-2" data-testid="sleep-suggestions">
          <div className="text-sm text-muted-foreground mb-2 text-center">
            {mode === "wake" ? "أوقات النوم المقترحة" : "أوقات الاستيقاظ المقترحة"}
          </div>
          {cycles.map((c, i) => (
            <div key={c.cycles} className={`rounded-xl p-4 flex items-center justify-between ${
              c.cycles === 5 ? "bg-primary text-primary-foreground" : "bg-card border border-border"
            }`} data-testid={`sleep-option-${c.cycles}`}>
              <div>
                <div className={`font-display font-bold text-3xl number-display ${c.cycles === 5 ? "text-[hsl(var(--gold))]" : "text-primary"}`}>
                  {fmt(c.time)}
                </div>
                <div className={`text-xs ${c.cycles === 5 ? "text-primary-foreground/70" : "text-muted-foreground"} number-display`}>
                  {c.hours} ساعات نوم ({c.cycles} دورات)
                </div>
              </div>
              {c.cycles === 5 && <div className="text-xs bg-[hsl(var(--gold))] text-primary font-bold px-2.5 py-1 rounded-full">مثالي ⭐</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sleep;
