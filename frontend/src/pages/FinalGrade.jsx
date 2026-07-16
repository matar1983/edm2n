import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Target } from "lucide-react";

// Given current avg, final exam weight, and desired total → what score needed in final
const FinalGrade = () => {
  const [current, setCurrent] = useState("75");
  const [currentWeight, setCurrentWeight] = useState("60");
  const [finalWeight, setFinalWeight] = useState("40");
  const [target, setTarget] = useState("80");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const c = parseFloat(current);
    const cw = parseFloat(currentWeight);
    const fw = parseFloat(finalWeight);
    const t = parseFloat(target);
    if (isNaN(c) || isNaN(cw) || isNaN(fw) || isNaN(t) || fw === 0) return null;
    const needed = (t * (cw + fw) - c * cw) / fw;
    return needed;
  }, [current, currentWeight, finalWeight, target]);

  const cat = result === null ? null :
    result <= 0 ? { label: "لست بحاجة لأي درجة — لقد حققته!", color: "text-emerald-600" }
    : result > 100 ? { label: "الهدف غير قابل للتحقق حسابياً", color: "text-rose-600" }
    : result <= 50 ? { label: "سهل التحقيق", color: "text-emerald-600" }
    : result <= 75 ? { label: "قابل للتحقيق باجتهاد", color: "text-amber-600" }
    : { label: "يحتاج مجهوداً كبيراً", color: "text-rose-600" };

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  return (
    <div data-testid="final-grade-page">
      <PageHeader icon={Target} title="حاسبة الدرجة النهائية" subtitle="كم أحتاج في الاختبار النهائي للوصول للمعدل المطلوب؟" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <F label="أعمال السنة الحالية" v={current} s={setCurrent} t="fg-current" suf="من 100" />
          <F label="وزن أعمال السنة" v={currentWeight} s={setCurrentWeight} t="fg-cw" suf="%" />
          <F label="وزن الاختبار النهائي" v={finalWeight} s={setFinalWeight} t="fg-fw" suf="%" />
          <F label="الدرجة المستهدفة" v={target} s={setTarget} t="fg-target" suf="من 100" />
        </div>
        {result !== null && (
          <div ref={shareRef} className="mt-4 bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8" data-testid="fg-result">
            <div className="text-xs text-[hsl(var(--gold))] font-semibold mb-1">تحتاج في الاختبار النهائي</div>
            <div className="font-display font-bold text-6xl number-display" data-testid="fg-value">
              {fmt(result)}<span className="text-2xl text-primary-foreground/70 mr-2">من 100</span>
            </div>
            {cat && <div className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-semibold bg-primary-foreground/10 ${cat.color.replace("text-", "text-")}`}>{cat.label}</div>}
          </div>
        )}
        {result !== null && (
          <ShareResult title="الدرجة النهائية المطلوبة"
            textLines={[`📚 حالياً: ${current} (وزن ${currentWeight}%)`, `🎯 هدفي: ${target}`, `📝 أحتاج في النهائي: ${fmt(result)} من 100`]}
            targetRef={shareRef} />
        )}
      </div>
    </div>
  );
};

const F = ({ label, v, s, t, suf }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1.5 block">{label}</span>
    <div className="relative">
      <input type="number" value={v} min="0" step="0.01" onChange={(e) => s(e.target.value)} data-testid={t}
        className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-16 focus:outline-none focus:border-primary" />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suf}</span>
    </div>
  </label>
);

export default FinalGrade;
