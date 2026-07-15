import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { LineChart, Plus, X } from "lucide-react";

const WeightedAverage = () => {
  const [rows, setRows] = useState([
    { id: 1, name: "الاختبار الأول", score: "85", weight: "30" },
    { id: 2, name: "الاختبار النهائي", score: "78", weight: "40" },
    { id: 3, name: "أعمال السنة", score: "92", weight: "30" },
  ]);
  const shareRef = useRef(null);

  const result = useMemo(() => {
    let sumWx = 0;
    let sumW = 0;
    rows.forEach((r) => {
      const s = parseFloat(r.score);
      const w = parseFloat(r.weight);
      if (!isNaN(s) && !isNaN(w) && w > 0) {
        sumWx += s * w;
        sumW += w;
      }
    });
    const avg = sumW > 0 ? sumWx / sumW : 0;
    return { avg, sumW };
  }, [rows]);

  const update = (id, key, val) =>
    setRows((r) => r.map((row) => (row.id === id ? { ...row, [key]: val } : row)));

  const remove = (id) => setRows((r) => r.filter((row) => row.id !== id));

  const add = () =>
    setRows((r) => [
      ...r,
      { id: Date.now(), name: `العنصر ${r.length + 1}`, score: "", weight: "" },
    ]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  return (
    <div data-testid="weighted-page">
      <PageHeader icon={LineChart} title="حاسبة النسبة الموزونة" subtitle="متوسط مرجّح للدرجات أو المعدلات" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="space-y-3 mb-5" data-testid="weighted-rows">
            <div className="hidden sm:grid grid-cols-[1fr_100px_100px_40px] gap-2 text-xs text-muted-foreground px-1">
              <div>العنصر</div>
              <div>الدرجة</div>
              <div>الوزن</div>
              <div></div>
            </div>
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-[1fr_90px_90px_40px] gap-2 items-center">
                <input
                  type="text"
                  value={r.name}
                  onChange={(e) => update(r.id, "name", e.target.value)}
                  data-testid={`weighted-name-${r.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
                <input
                  type="number"
                  value={r.score}
                  onChange={(e) => update(r.id, "score", e.target.value)}
                  data-testid={`weighted-score-${r.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm number-display focus:outline-none focus:border-primary"
                />
                <input
                  type="number"
                  value={r.weight}
                  onChange={(e) => update(r.id, "weight", e.target.value)}
                  data-testid={`weighted-weight-${r.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm number-display focus:outline-none focus:border-primary"
                />
                <button onClick={() => remove(r.id)} data-testid={`weighted-remove-${r.id}`}
                  className="w-9 h-9 rounded-full text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 grid place-items-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={add} data-testid="weighted-add"
            className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">
            <Plus className="w-4 h-4" /> إضافة عنصر
          </button>

          <div ref={shareRef} className="mt-6 bg-primary text-primary-foreground rounded-xl p-5" data-testid="weighted-result">
            <div className="text-xs text-primary-foreground/70 mb-1">المتوسط المرجّح</div>
            <div className="font-display font-bold text-4xl number-display text-[hsl(var(--gold))]">
              {fmt(result.avg)}
            </div>
            <div className="mt-2 text-xs text-primary-foreground/70">
              إجمالي الأوزان: <span className="number-display">{fmt(result.sumW)}</span>
            </div>
          </div>
        </div>
        <ShareResult
          title="حاسبة النسبة الموزونة"
          textLines={[
            ...rows
              .filter((r) => r.score && r.weight)
              .map((r) => `• ${r.name}: ${r.score} (وزن ${r.weight})`),
            `📊 المتوسط المرجّح: ${fmt(result.avg)}`,
          ]}
          targetRef={shareRef}
        />
      </div>
    </div>
  );
};

export default WeightedAverage;
