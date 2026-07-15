import { useState, useEffect, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import { Timer, Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { toast } from "sonner";

const MODES = {
  work: { label: "تركيز", minutes: 25, color: "bg-primary" },
  short: { label: "استراحة قصيرة", minutes: 5, color: "bg-emerald-500" },
  long: { label: "استراحة طويلة", minutes: 15, color: "bg-sky-500" },
};

const Pomodoro = () => {
  const [mode, setMode] = useState("work");
  const [seconds, setSeconds] = useState(MODES.work.minutes * 60);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            toast.success(`انتهى: ${MODES[mode].label}`);
            if (mode === "work") setCompleted((c) => c + 1);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  const switchMode = (m) => {
    setRunning(false);
    setMode(m);
    setSeconds(MODES[m].minutes * 60);
  };

  const reset = () => {
    setRunning(false);
    setSeconds(MODES[mode].minutes * 60);
  };

  const skip = () => {
    setRunning(false);
    setSeconds(0);
    if (mode === "work") setCompleted((c) => c + 1);
    toast.info("تم التخطي");
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const totalSec = MODES[mode].minutes * 60;
  const progress = ((totalSec - seconds) / totalSec) * 100;

  return (
    <div data-testid="pomodoro-page">
      <PageHeader icon={Timer} title="مؤقّت التركيز (Pomodoro)" subtitle="اعمل 25 دقيقة → استرح 5 دقائق → كرّر" />
      <div className="max-w-2xl mx-auto px-5 sm:px-8 pb-12">
        <div className="flex bg-secondary rounded-full p-1 mb-6 w-fit mx-auto" data-testid="pomo-modes">
          {Object.entries(MODES).map(([k, v]) => (
            <button key={k} onClick={() => switchMode(k)} data-testid={`pomo-mode-${k}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === k ? "bg-primary text-primary-foreground" : "text-foreground/70"
              }`}>
              {v.label} ({v.minutes})
            </button>
          ))}
        </div>

        <div className="bg-primary text-primary-foreground rounded-3xl p-8 text-center relative overflow-hidden" data-testid="pomo-clock">
          <div className="absolute inset-x-0 top-0 h-1 bg-primary-foreground/10">
            <div className="h-full bg-[hsl(var(--gold))] transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
          <div className="font-display font-bold text-8xl sm:text-9xl number-display" dir="ltr" data-testid="pomo-time">
            {mm}:{ss}
          </div>
          <div className="mt-2 text-sm text-primary-foreground/70">{MODES[mode].label}</div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button onClick={() => setRunning(!running)} data-testid="pomo-toggle"
              className="w-16 h-16 rounded-full bg-[hsl(var(--gold))] text-primary grid place-items-center hover:opacity-90 shadow-lg">
              {running ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 mr-0.5" />}
            </button>
            <button onClick={reset} data-testid="pomo-reset"
              className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 grid place-items-center">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button onClick={skip} data-testid="pomo-skip"
              className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 grid place-items-center">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 text-center bg-card border border-border rounded-2xl p-5">
          <div className="text-xs text-muted-foreground">جلسات مكتملة اليوم</div>
          <div className="font-display font-bold text-4xl number-display text-primary" data-testid="pomo-completed">{completed}</div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
