import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Home } from "lucide-react";

const MortgageCalculator = () => {
  const [price, setPrice] = useState("800000");
  const [downPct, setDownPct] = useState("10");
  const [rate, setRate] = useState("4.5");
  const [years, setYears] = useState("25");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const P = parseFloat(price);
    const dp = parseFloat(downPct);
    const annualRate = parseFloat(rate);
    const n = parseFloat(years);
    if (!P || P <= 0 || isNaN(dp) || isNaN(annualRate) || !n || n <= 0) return null;

    const downPayment = (P * dp) / 100;
    const loan = P - downPayment;
    const months = n * 12;
    const r = annualRate / 100 / 12;
    let monthly;
    if (r === 0) monthly = loan / months;
    else monthly = (loan * r) / (1 - Math.pow(1 + r, -months));
    const total = monthly * months;
    const totalInterest = total - loan;
    return { downPayment, loan, monthly, total, totalInterest, months };
  }, [price, downPct, rate, years]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div data-testid="mortgage-page">
      <PageHeader
        icon={Home}
        title="حاسبة التمويل العقاري"
        subtitle="احسب قسط منزلك الشهري بدقة"
      />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <div className="space-y-5">
              <Field label="سعر العقار" value={price} onChange={setPrice} testid="mortgage-price" suffix="ريال" />
              <Field label="الدفعة المقدمة" value={downPct} onChange={setDownPct} testid="mortgage-down" suffix="%" step="1" />
              <Field label="نسبة الفائدة السنوية" value={rate} onChange={setRate} testid="mortgage-rate" suffix="%" step="0.1" />
              <Field label="مدة التمويل" value={years} onChange={setYears} testid="mortgage-years" suffix="سنة" step="1" />
            </div>
          </div>

          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 relative overflow-hidden" data-testid="mortgage-result">
            <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full bg-[hsl(var(--gold))]/10" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-1">
                القسط الشهري
              </div>
              <div className="font-display font-bold text-4xl sm:text-5xl number-display" data-testid="mortgage-monthly">
                {result ? fmt(result.monthly) : "—"}
                <span className="text-base font-medium text-primary-foreground/70 mr-2">ريال</span>
              </div>

              <div className="mt-6 space-y-3">
                <Row label="الدفعة المقدمة" value={result ? `${fmt(result.downPayment)} ريال` : "—"} testid="mortgage-down-val" />
                <Row label="مبلغ التمويل" value={result ? `${fmt(result.loan)} ريال` : "—"} testid="mortgage-loan" />
                <Row label="إجمالي المدفوعات" value={result ? `${fmt(result.total)} ريال` : "—"} testid="mortgage-total" />
                <Row label="إجمالي الفوائد" value={result ? `${fmt(result.totalInterest)} ريال` : "—"} highlight testid="mortgage-interest" />
                <Row label="عدد الأقساط" value={result ? result.months : "—"} testid="mortgage-months" />
              </div>
            </div>
          </div>
        </div>

        {result && (
          <ShareResult
            title="حاسبة التمويل العقاري"
            textLines={[
              `🏠 سعر العقار: ${fmt(parseFloat(price))} ريال`,
              `💵 الدفعة المقدمة: ${fmt(result.downPayment)} ريال (${downPct}%)`,
              `📈 نسبة الفائدة: ${rate}% لمدة ${years} سنة`,
              `💳 القسط الشهري: ${fmt(result.monthly)} ريال`,
              `💰 إجمالي الفوائد: ${fmt(result.totalInterest)} ريال`,
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
    <span className="text-sm font-medium mb-1.5 block">{label}</span>
    <div className="relative">
      <input
        type="number"
        value={value}
        step={step || "1"}
        min="0"
        onChange={(e) => onChange(e.target.value)}
        data-testid={testid}
        className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-16 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {suffix && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">{suffix}</span>}
    </div>
  </label>
);

const Row = ({ label, value, highlight, testid }) => (
  <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-primary-foreground/10">
    <span className="text-sm text-primary-foreground/70">{label}</span>
    <span className={`number-display font-semibold ${highlight ? "text-[hsl(var(--gold))]" : ""}`} data-testid={testid}>
      {value}
    </span>
  </div>
);

export default MortgageCalculator;
