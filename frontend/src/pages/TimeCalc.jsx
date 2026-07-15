import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Clock } from "lucide-react";

const TimeCalc = () => {
  const [tab, setTab] = useState("diff"); // diff | add
  return (
    <div data-testid="time-page">
      <PageHeader icon={Clock} title="حاسبة الوقت" subtitle="الفرق بين وقتين + جمع/طرح الوقت" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="flex bg-secondary rounded-full p-1 mb-6 w-fit mx-auto" data-testid="time-tabs">
          <TabBtn active={tab === "diff"} onClick={() => setTab("diff")} testid="time-tab-diff">
            الفرق بين وقتين
          </TabBtn>
          <TabBtn active={tab === "add"} onClick={() => setTab("add")} testid="time-tab-add">
            إضافة / طرح
          </TabBtn>
        </div>
        {tab === "diff" ? <TimeDiff /> : <TimeAddSub />}
      </div>
    </div>
  );
};

const TabBtn = ({ active, onClick, children, testid }) => (
  <button onClick={onClick} data-testid={testid}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
    {children}
  </button>
);

const TimeDiff = () => {
  const [t1, setT1] = useState("08:00");
  const [t2, setT2] = useState("17:30");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const [h1, m1] = t1.split(":").map(Number);
    const [h2, m2] = t2.split(":").map(Number);
    let diff = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diff < 0) diff += 24 * 60;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return { hours, minutes, total: diff };
  }, [t1, t2]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <TimeInput label="من" value={t1} onChange={setT1} testid="time-from" />
        <TimeInput label="إلى" value={t2} onChange={setT2} testid="time-to" />
      </div>
      <div ref={shareRef} className="bg-primary text-primary-foreground rounded-xl p-5" data-testid="time-diff-result">
        <div className="text-xs text-primary-foreground/70 mb-1">الفرق</div>
        <div className="font-display font-bold text-3xl number-display text-[hsl(var(--gold))]">
          {result.hours} ساعة و {result.minutes} دقيقة
        </div>
        <div className="mt-2 text-sm text-primary-foreground/70 number-display">
          = {result.total} دقيقة إجمالاً
        </div>
      </div>
      <ShareResult
        title="حاسبة الوقت — الفرق"
        textLines={[`من ${t1} إلى ${t2}`, `الفرق: ${result.hours} ساعة و ${result.minutes} دقيقة (${result.total} دقيقة)`]}
        targetRef={shareRef}
      />
    </div>
  );
};

const TimeAddSub = () => {
  const [base, setBase] = useState("14:30");
  const [addH, setAddH] = useState("2");
  const [addM, setAddM] = useState("15");
  const [op, setOp] = useState("+");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const [h, m] = base.split(":").map(Number);
    const delta = (parseInt(addH) || 0) * 60 + (parseInt(addM) || 0);
    let total = h * 60 + m + (op === "+" ? delta : -delta);
    total = ((total % (24 * 60)) + 24 * 60) % (24 * 60);
    const rh = Math.floor(total / 60);
    const rm = total % 60;
    return `${String(rh).padStart(2, "0")}:${String(rm).padStart(2, "0")}`;
  }, [base, addH, addM, op]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        <TimeInput label="الوقت الأساس" value={base} onChange={setBase} testid="time-base" />
        <div>
          <label className="text-sm font-medium mb-1.5 block">العملية</label>
          <div className="flex bg-secondary rounded-full p-1 w-fit">
            <button onClick={() => setOp("+")} data-testid="time-op-add"
              className={`px-4 py-2 rounded-full text-sm font-bold ${op === "+" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>+</button>
            <button onClick={() => setOp("-")} data-testid="time-op-sub"
              className={`px-4 py-2 rounded-full text-sm font-bold ${op === "-" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>−</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        <NumInput label="ساعات" value={addH} onChange={setAddH} testid="time-add-h" />
        <NumInput label="دقائق" value={addM} onChange={setAddM} testid="time-add-m" />
      </div>
      <div ref={shareRef} className="bg-primary text-primary-foreground rounded-xl p-5" data-testid="time-add-result">
        <div className="text-xs text-primary-foreground/70 mb-1">الناتج</div>
        <div className="font-display font-bold text-4xl number-display text-[hsl(var(--gold))]" dir="ltr">
          {result}
        </div>
      </div>
      <ShareResult
        title="حاسبة الوقت — إضافة/طرح"
        textLines={[`${base} ${op} ${addH} ساعة و ${addM} دقيقة = ${result}`]}
        targetRef={shareRef}
      />
    </div>
  );
};

const TimeInput = ({ label, value, onChange, testid }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1.5 block">{label}</span>
    <input type="time" value={value} onChange={(e) => onChange(e.target.value)} data-testid={testid}
      className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
  </label>
);

const NumInput = ({ label, value, onChange, testid }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1.5 block">{label}</span>
    <input type="number" value={value} min="0" onChange={(e) => onChange(e.target.value)} data-testid={testid}
      className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
  </label>
);

export default TimeCalc;
