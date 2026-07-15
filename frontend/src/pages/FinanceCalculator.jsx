import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Banknote } from "lucide-react";

const FinanceCalculator = () => {
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("5");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const P = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const n = parseFloat(years);
    if (!P || P <= 0 || isNaN(annualRate) || !n || n <= 0) return null;

    const months = n * 12;
    const r = annualRate / 100 / 12;
    let monthly;
    if (r === 0) {
      monthly = P / months;
    } else {
      monthly = (P * r) / (1 - Math.pow(1 + r, -months));
    }
    const total = monthly * months;
    const totalInterest = total - P;

    return {
      monthly,
      total,
      totalInterest,
      months,
    };
  }, [amount, rate, years]);

  const fmt = (n) =>
    n.toLocaleString("ar-EG", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div data-testid="finance-page">
      <PageHeader
        icon={Banknote}
        title="حاسبة التمويل الشخصي"
        subtitle="احسب القسط الشهري وإجمالي التمويل"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
          {/* Inputs */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <div className="space-y-5">
              <Field
                label="مبلغ التمويل (ريال)"
                value={amount}
                onChange={setAmount}
                testid="input-amount"
                suffix="ريال"
              />
              <Field
                label="نسبة الفائدة السنوية %"
                value={rate}
                onChange={setRate}
                testid="input-rate"
                suffix="%"
                step="0.1"
              />
              <Field
                label="مدة التمويل (سنوات)"
                value={years}
                onChange={setYears}
                testid="input-years"
                suffix="سنة"
              />

              <div className="pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground leading-relaxed">
                  ملاحظة: الحساب تقديري ويعتمد على معادلة القسط المتساوي
                  (Annuity). يختلف القسط الفعلي بحسب سياسة الجهة الممولة.
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div
            ref={shareRef}
            className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            data-testid="finance-result-card"
          >
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[hsl(var(--gold))]/10 -translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-1">
                القسط الشهري
              </div>
              <div className="font-display font-bold text-4xl sm:text-5xl number-display" data-testid="finance-monthly">
                {result ? fmt(result.monthly) : "—"}
                <span className="text-base font-medium text-primary-foreground/70 mr-2">
                  ريال
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <ResultRow
                  label="إجمالي المبلغ المسدد"
                  value={result ? fmt(result.total) : "—"}
                  testid="finance-total"
                />
                <ResultRow
                  label="إجمالي الفوائد"
                  value={result ? fmt(result.totalInterest) : "—"}
                  highlight
                  testid="finance-interest"
                />
                <ResultRow
                  label="عدد الأقساط"
                  value={result ? result.months : "—"}
                  testid="finance-months"
                />
              </div>
            </div>
          </div>
        </div>
        {result && (
          <ShareResult
            title="حاسبة التمويل الشخصي"
            textLines={[
              `💰 مبلغ التمويل: ${fmt(parseFloat(amount))} ريال`,
              `📈 نسبة الفائدة: ${rate}% لمدة ${years} سنة`,
              `💳 القسط الشهري: ${fmt(result.monthly)} ريال`,
              `📊 إجمالي المسدد: ${fmt(result.total)} ريال`,
              `🔺 إجمالي الفوائد: ${fmt(result.totalInterest)} ريال`,
            ]}
            targetRef={shareRef}
          />
        )}
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, testid, suffix, step }) => (
  <label className="block">
    <span className="text-sm font-medium text-foreground/80 mb-1.5 block">
      {label}
    </span>
    <div className="relative">
      <input
        type="number"
        value={value}
        step={step || "1"}
        min="0"
        onChange={(e) => onChange(e.target.value)}
        data-testid={testid}
        className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-16 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
      {suffix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
          {suffix}
        </span>
      )}
    </div>
  </label>
);

const ResultRow = ({ label, value, highlight, testid }) => (
  <div className="flex items-center justify-between gap-3 pb-3 border-b border-primary-foreground/10">
    <span className="text-sm text-primary-foreground/70">{label}</span>
    <span
      className={`number-display font-semibold ${highlight ? "text-[hsl(var(--gold))]" : ""}`}
      data-testid={testid}
    >
      {value}
    </span>
  </div>
);

export default FinanceCalculator;
