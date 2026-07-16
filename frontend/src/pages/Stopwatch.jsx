import { useState, useEffect, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import { StopCircle, Play, Pause, Flag, RotateCcw } from "lucide-react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const startRef = useRef(0);
  const baseRef = useRef(0);
  const idRef = useRef(null);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now();
      idRef.current = setInterval(() => setTime(baseRef.current + Date.now() - startRef.current), 10);
    } else if (idRef.current) {
      clearInterval(idRef.current);
      baseRef.current = time;
    }
    return () => clearInterval(idRef.current);
    // eslint-disable-next-line
  }, [running]);

  const reset = () => { setRunning(false); setTime(0); baseRef.current = 0; setLaps([]); };
  const lap = () => setLaps((l) => [...l, time]);

  const fmt = (ms) => {
    const total = Math.floor(ms / 10);
    const cs = total % 100;
    const s = Math.floor(total / 100) % 60;
    const m = Math.floor(total / 6000) % 60;
    const h = Math.floor(total / 360000);
    return `${h ? String(h).padStart(2, "0") + ":" : ""}${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
  };

  return (
    <div data-testid="stopwatch-page">
      <PageHeader icon={StopCircle} title="ساعة إيقاف" subtitle="Stopwatch مع تسجيل الأشواط" />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 text-center" data-testid="sw-clock">
          <div dir="ltr" className="font-display font-bold text-6xl sm:text-7xl number-display" data-testid="sw-time">{fmt(time)}</div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button onClick={() => setRunning(!running)} data-testid="sw-toggle"
              className="w-16 h-16 rounded-full bg-[hsl(var(--gold))] text-primary grid place-items-center shadow-lg">
              {running ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 mr-0.5" />}
            </button>
            <button onClick={lap} disabled={!running} data-testid="sw-lap"
              className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 grid place-items-center disabled:opacity-40">
              <Flag className="w-5 h-5" />
            </button>
            <button onClick={reset} data-testid="sw-reset"
              className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 grid place-items-center">
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
        {laps.length > 0 && (
          <div className="mt-5 bg-card border border-border rounded-2xl p-5" data-testid="sw-laps">
            <div className="text-sm font-semibold mb-2">الأشواط</div>
            <div className="space-y-1 max-h-60 overflow-auto">
              {laps.map((l, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="text-sm text-muted-foreground">شوط {i + 1}</span>
                  <span dir="ltr" className="font-mono font-semibold number-display">{fmt(l)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;
