import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { CalendarClock } from "lucide-react";

const Countdown = () => {
  const [target, setTarget] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().slice(0, 16);
  });
  const [title, setTitle] = useState("رأس السنة الجديدة");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = new Date(target).getTime() - now;
  const past = diff < 0;
  const abs = Math.abs(diff);
  const days = Math.floor(abs / 86400000);
  const hours = Math.floor((abs / 3600000) % 24);
  const mins = Math.floor((abs / 60000) % 60);
  const secs = Math.floor((abs / 1000) % 60);

  return (
    <div data-testid="countdown-page">
      <PageHeader icon={CalendarClock} title="عدّاد تنازلي" subtitle="كم باقي على مناسبة أو تاريخ مهم" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-5 mb-4 space-y-4">
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">اسم الحدث</span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} data-testid="cd-title"
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
          </label>
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">التاريخ والوقت</span>
            <input type="datetime-local" value={target} onChange={(e) => setTarget(e.target.value)} data-testid="cd-target"
              className="w-full number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
          </label>
        </div>

        <div className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden" data-testid="cd-display">
          <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-[hsl(var(--gold))]/10" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-2">
              {past ? "مضى على الحدث" : "باقي على"}
            </div>
            <div className="font-display font-bold text-2xl sm:text-3xl mb-6">{title}</div>
            <div className="grid grid-cols-4 gap-3">
              <Cell v={days} label="أيام" testid="cd-days" />
              <Cell v={hours} label="ساعات" testid="cd-hours" />
              <Cell v={mins} label="دقائق" testid="cd-mins" />
              <Cell v={secs} label="ثوان" testid="cd-secs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cell = ({ v, label, testid }) => (
  <div className="bg-primary-foreground/10 rounded-xl py-4 px-2">
    <div className="font-display font-bold text-3xl sm:text-4xl number-display text-[hsl(var(--gold))]" data-testid={testid}>
      {String(v).padStart(2, "0")}
    </div>
    <div className="text-xs text-primary-foreground/70 mt-1">{label}</div>
  </div>
);

export default Countdown;
