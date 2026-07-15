import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Briefcase } from "lucide-react";

// Saudi labor law end-of-service benefit calculator
const EndOfService = () => {
  const [salary, setSalary] = useState("10000");
  const [years, setYears] = useState("6");
  const [months, setMonths] = useState("0");
  const [endType, setEndType] = useState("terminated"); // terminated | resigned
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const s = parseFloat(salary);
    const y = parseFloat(years) || 0;
    const m = parseFloat(months) || 0;
    if (!s || s <= 0) return null;
    const totalYears = y + m / 12;

    // Base gratuity: 1/2 month for first 5 years + 1 month for each year after
    let base = 0;
    if (totalYears <= 5) base = (s / 2) * totalYears;
    else base = (s / 2) * 5 + s * (totalYears - 5);

    let entitlement = 0;
    let note = "";
    if (endType === "terminated") {
      entitlement = base;
      note = "استحقاق كامل — فصل من العمل أو انتهاء عقد محدد المدة.";
    } else {
      // Resignation
      if (totalYears < 2) {
        entitlement = 0;
        note = "لا استحقاق — أقل من سنتين ومستقيل.";
      } else if (totalYears < 5) {
        entitlement = base / 3;
        note = "ثُلث المكافأة — استقالة بين 2 و5 سنوات.";
      } else if (totalYears < 10) {
        entitlement = (base * 2) / 3;
        note = "ثُلثا المكافأة — استقالة بين 5 و10 سنوات.";
      } else {
        entitlement = base;
        note = "استحقاق كامل — استقالة بعد 10 سنوات.";
      }
    }
    return { base, entitlement, note, totalYears };
  }, [salary, years, months, endType]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div data-testid="eos-page">
      <PageHeader
        icon={Briefcase}
        title="حاسبة نهاية الخدمة"
        subtitle="مكافأة الموظف وفق نظام العمل السعودي"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
            <Field label="الراتب الأساسي الشهري" value={salary} onChange={setSalary} testid="eos-salary" suffix="ريال" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="سنوات الخدمة" value={years} onChange={setYears} testid="eos-years" suffix="سنة" />
              <Field label="أشهر" value={months} onChange={setMonths} testid="eos-months" suffix="شهر" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">سبب انتهاء الخدمة</label>
              <div className="flex bg-secondary rounded-full p-1 w-fit" data-testid="eos-end-type">
                <button
                  onClick={() => setEndType("terminated")}
                  data-testid="eos-terminated"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${endType === "terminated" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}
                >
                  فصل / انتهاء عقد
                </button>
                <button
                  onClick={() => setEndType("resigned")}
                  data-testid="eos-resigned"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${endType === "resigned" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}
                >
                  استقالة
                </button>
              </div>
            </div>
            <div className="pt-4 border-t border-border text-xs text-muted-foreground leading-relaxed">
              وفق المادة 84-85 من نظام العمل السعودي. الحساب استرشادي بناءً على الراتب الأساسي.
            </div>
          </div>

          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 relative overflow-hidden" data-testid="eos-result">
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[hsl(var(--gold))]/10 -translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-1">
                المكافأة المستحقة
              </div>
              <div className="font-display font-bold text-4xl sm:text-5xl number-display" data-testid="eos-value">
                {result ? fmt(result.entitlement) : "—"}
                <span className="text-base font-medium text-primary-foreground/70 mr-2">ريال</span>
              </div>
              {result && (
                <>
                  <div className="mt-4 p-3 rounded-lg bg-primary-foreground/10 text-sm text-primary-foreground/80" data-testid="eos-note">
                    {result.note}
                  </div>
                  <div className="mt-4 space-y-3">
                    <Row label="مدة الخدمة" value={`${fmt(result.totalYears)} سنة`} testid="eos-duration" />
                    <Row label="المكافأة الكاملة" value={`${fmt(result.base)} ريال`} testid="eos-base" highlight />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {result && (
          <ShareResult
            title="حاسبة نهاية الخدمة"
            textLines={[
              `💼 الراتب: ${fmt(parseFloat(salary))} ريال`,
              `⏳ مدة الخدمة: ${fmt(result.totalYears)} سنة`,
              `📋 نوع الإنهاء: ${endType === "terminated" ? "فصل/انتهاء عقد" : "استقالة"}`,
              `💰 المكافأة: ${fmt(result.entitlement)} ريال`,
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
      <input type="number" value={value} min="0"
        onChange={(e) => onChange(e.target.value)} data-testid={testid}
        className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-16 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>
    </div>
  </label>
);

const Row = ({ label, value, highlight, testid }) => (
  <div className="flex items-center justify-between gap-3 pb-2 border-b border-primary-foreground/10">
    <span className="text-sm text-primary-foreground/70">{label}</span>
    <span className={`number-display font-semibold ${highlight ? "text-[hsl(var(--gold))]" : ""}`} data-testid={testid}>{value}</span>
  </div>
);

export default EndOfService;
