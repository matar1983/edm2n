import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { GraduationCap, Plus, X } from "lucide-react";

// Grade points on 4.0 and 5.0 scales
const SCALES = {
  4: [
    { g: "A", pts: 4.0 },
    { g: "B+", pts: 3.5 },
    { g: "B", pts: 3.0 },
    { g: "C+", pts: 2.5 },
    { g: "C", pts: 2.0 },
    { g: "D+", pts: 1.5 },
    { g: "D", pts: 1.0 },
    { g: "F", pts: 0 },
  ],
  5: [
    { g: "A+", pts: 5.0 },
    { g: "A", pts: 4.75 },
    { g: "B+", pts: 4.5 },
    { g: "B", pts: 4.0 },
    { g: "C+", pts: 3.5 },
    { g: "C", pts: 3.0 },
    { g: "D+", pts: 2.5 },
    { g: "D", pts: 2.0 },
    { g: "F", pts: 1.0 },
  ],
};

const GpaCalc = () => {
  const [scale, setScale] = useState(5);
  const [rows, setRows] = useState([
    { id: 1, name: "مادة 1", grade: 5.0, credits: 3 },
    { id: 2, name: "مادة 2", grade: 4.75, credits: 3 },
    { id: 3, name: "مادة 3", grade: 4.5, credits: 4 },
  ]);
  const shareRef = useRef(null);

  const gpa = useMemo(() => {
    let sumPts = 0;
    let sumCr = 0;
    rows.forEach((r) => {
      const g = parseFloat(r.grade);
      const c = parseFloat(r.credits);
      if (!isNaN(g) && !isNaN(c) && c > 0) {
        sumPts += g * c;
        sumCr += c;
      }
    });
    return sumCr > 0 ? sumPts / sumCr : 0;
  }, [rows]);

  const update = (id, key, val) => setRows((r) => r.map((row) => (row.id === id ? { ...row, [key]: val } : row)));
  const remove = (id) => setRows((r) => r.filter((row) => row.id !== id));
  const add = () => setRows((r) => [...r, { id: Date.now(), name: `مادة ${r.length + 1}`, grade: SCALES[scale][0].pts, credits: 3 }]);

  const currentScale = SCALES[scale];

  return (
    <div data-testid="gpa-page">
      <PageHeader icon={GraduationCap} title="حاسبة المعدل التراكمي GPA" subtitle="على مقياس 4.0 أو 5.0" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="flex bg-secondary rounded-full p-1 mb-5 w-fit mx-auto" data-testid="gpa-scale">
          <button onClick={() => setScale(5)} data-testid="gpa-scale-5"
            className={`px-5 py-2 rounded-full text-sm font-medium ${scale === 5 ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
            من 5.0
          </button>
          <button onClick={() => setScale(4)} data-testid="gpa-scale-4"
            className={`px-5 py-2 rounded-full text-sm font-medium ${scale === 4 ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
            من 4.0
          </button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 sm:p-6">
          <div className="space-y-3" data-testid="gpa-rows">
            <div className="hidden sm:grid grid-cols-[1fr_120px_100px_40px] gap-2 text-xs text-muted-foreground px-1">
              <div>المادة</div>
              <div>الدرجة</div>
              <div>الساعات</div>
              <div></div>
            </div>
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-[1fr_110px_90px_40px] gap-2 items-center">
                <input type="text" value={r.name} onChange={(e) => update(r.id, "name", e.target.value)}
                  data-testid={`gpa-name-${r.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                <select value={r.grade} onChange={(e) => update(r.id, "grade", parseFloat(e.target.value))}
                  data-testid={`gpa-grade-${r.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-2 py-2 text-sm number-display focus:outline-none focus:border-primary">
                  {currentScale.map((s) => (
                    <option key={s.g} value={s.pts}>{s.g} ({s.pts})</option>
                  ))}
                </select>
                <input type="number" value={r.credits} min="0" step="0.5"
                  onChange={(e) => update(r.id, "credits", e.target.value)} data-testid={`gpa-credits-${r.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm number-display focus:outline-none focus:border-primary" />
                <button onClick={() => remove(r.id)} data-testid={`gpa-remove-${r.id}`}
                  className="w-9 h-9 rounded-full text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 grid place-items-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={add} data-testid="gpa-add"
            className="mt-3 inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">
            <Plus className="w-4 h-4" /> إضافة مادة
          </button>

          <div ref={shareRef} className="mt-6 bg-primary text-primary-foreground rounded-xl p-5" data-testid="gpa-result">
            <div className="text-xs text-primary-foreground/70 mb-1">المعدل التراكمي</div>
            <div className="font-display font-bold text-5xl number-display text-[hsl(var(--gold))]" data-testid="gpa-value">
              {gpa.toFixed(2)}
            </div>
            <div className="text-sm text-primary-foreground/70 mt-1 number-display">من {scale}.00</div>
          </div>
        </div>
        <ShareResult title="المعدل التراكمي GPA"
          textLines={[
            `📚 ${rows.length} مادة`,
            `🎓 المعدل: ${gpa.toFixed(2)} من ${scale}.00`,
          ]} targetRef={shareRef} />
      </div>
    </div>
  );
};

export default GpaCalc;
