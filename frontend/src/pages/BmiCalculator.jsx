import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Activity } from "lucide-react";

const CATEGORIES = [
  { max: 18.5, label: "نقص في الوزن", color: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500/10", advice: "تناول وجبات غنية بالسعرات والبروتين." },
  { max: 25, label: "وزن طبيعي", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", advice: "حافظ على نمط حياتك الحالي." },
  { max: 30, label: "زيادة في الوزن", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10", advice: "مارس الرياضة وقلّل السعرات." },
  { max: 100, label: "سِمنة", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10", advice: "يُنصح باستشارة أخصائي تغذية." },
];

const BmiCalculator = () => {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || h <= 0 || !w || w <= 0) return null;
    const bmi = w / (h * h);
    const cat = CATEGORIES.find((c) => bmi < c.max) || CATEGORIES[CATEGORIES.length - 1];
    const idealMin = 18.5 * h * h;
    const idealMax = 24.9 * h * h;
    return { bmi, cat, idealMin, idealMax };
  }, [height, weight]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 1 });

  return (
    <div data-testid="bmi-page">
      <PageHeader
        icon={Activity}
        title="حاسبة كتلة الجسم BMI"
        subtitle="قِس مؤشر كتلة جسمك واعرف تصنيفه"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <div className="space-y-5">
              <Field label="الطول (سنتيمتر)" value={height} onChange={setHeight} testid="bmi-height" suffix="سم" />
              <Field label="الوزن (كيلوجرام)" value={weight} onChange={setWeight} testid="bmi-weight" suffix="كجم" />
            </div>
          </div>

          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 relative overflow-hidden" data-testid="bmi-result">
            <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-[hsl(var(--gold))]/10" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-2">
                مؤشر كتلة الجسم
              </div>
              <div className="font-display font-bold text-6xl number-display" data-testid="bmi-value">
                {result ? fmt(result.bmi) : "—"}
              </div>
              {result && (
                <>
                  <div className={`mt-4 inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${result.cat.bg} ${result.cat.color}`} data-testid="bmi-category">
                    {result.cat.label}
                  </div>
                  <div className="mt-4 text-sm text-primary-foreground/80 leading-relaxed">
                    {result.cat.advice}
                  </div>
                  <div className="mt-6 pt-4 border-t border-primary-foreground/20 text-sm text-primary-foreground/80">
                    <div>الوزن المثالي: <span className="font-semibold text-[hsl(var(--gold))] number-display">{fmt(result.idealMin)} - {fmt(result.idealMax)} كجم</span></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {result && (
          <ShareResult
            title="حاسبة كتلة الجسم"
            textLines={[
              `📏 الطول: ${height} سم`,
              `⚖️ الوزن: ${weight} كجم`,
              `📊 BMI: ${fmt(result.bmi)} — ${result.cat.label}`,
              `✅ الوزن المثالي: ${fmt(result.idealMin)} - ${fmt(result.idealMax)} كجم`,
            ]}
            targetRef={shareRef}
          />
        )}
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, testid, suffix }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1.5 block">{label}</span>
    <div className="relative">
      <input
        type="number"
        value={value}
        step="0.1"
        min="0"
        onChange={(e) => onChange(e.target.value)}
        data-testid={testid}
        className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-16 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {suffix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">{suffix}</span>}
    </div>
  </label>
);

export default BmiCalculator;
