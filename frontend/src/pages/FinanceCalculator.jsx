import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Banknote } from "lucide-react";

const FinanceCalculator = () => {
  const [mode, setMode] = useState("salary"); // "salary" | "amount"

  return (
    <div data-testid="finance-page">
      <PageHeader
        icon={Banknote}
        title="حاسبة التمويل الشخصي"
        subtitle="احسب أقصى تمويل حسب راتبك أو القسط الشهري من مبلغ محدد"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div
          className="flex bg-secondary rounded-full p-1 mb-6 w-fit mx-auto"
          data-testid="finance-mode-toggle"
        >
          <button
            onClick={() => setMode("salary")}
            data-testid="finance-mode-salary"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "salary"
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70"
            }`}
          >
            أقصى تمويل من الراتب
          </button>
          <button
            onClick={() => setMode("amount")}
            data-testid="finance-mode-amount"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "amount"
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70"
            }`}
          >
            قسط من مبلغ
          </button>
        </div>

        {mode === "salary" ? <SalaryMode /> : <AmountMode />}
      </div>
    </div>
  );
};

const fmt = (n) =>
  n.toLocaleString("ar-EG", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

/* =====================  Mode 1: How much can I borrow?  ===================== */
const SalaryMode = () => {
  const [salary, setSalary] = useState("10000");
  const [obligations, setObligations] = useState("0");
  const [dbr, setDbr] = useState("33.33");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("5");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const S = parseFloat(salary);
    const O = parseFloat(obligations) || 0;
    const d = parseFloat(dbr);
    const annualRate = parseFloat(rate);
    const n = parseFloat(years);
    if (!S || S <= 0 || isNaN(d) || d <= 0 || isNaN(annualRate) || !n || n <= 0)
      return null;

    const maxMonthly = (S * d) / 100 - O;
    if (maxMonthly <= 0) {
      return { insufficient: true, maxMonthly: 0, maxLoan: 0, total: 0, totalInterest: 0, months: n * 12 };
    }
    const months = n * 12;
    const r = annualRate / 100 / 12;
    let maxLoan;
    if (r === 0) {
      maxLoan = maxMonthly * months;
    } else {
      // Inverse of annuity formula: P = M * (1 - (1+r)^-n) / r
      maxLoan = (maxMonthly * (1 - Math.pow(1 + r, -months))) / r;
    }
    const total = maxMonthly * months;
    const totalInterest = total - maxLoan;
    return {
      insufficient: false,
      maxMonthly,
      maxLoan,
      total,
      totalInterest,
      months,
    };
  }, [salary, obligations, dbr, rate, years]);

  return (
    <>
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
        {/* Inputs */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="space-y-5">
            <Field
              label="الراتب الأساسي الشهري"
              value={salary}
              onChange={setSalary}
              testid="salary-input"
              suffix="ريال"
            />
            <Field
              label="الالتزامات الشهرية الحالية (إن وجدت)"
              value={obligations}
              onChange={setObligations}
              testid="salary-obligations"
              suffix="ريال"
            />
            <div>
              <Field
                label="نسبة الاستقطاع المسموحة (DBR)"
                value={dbr}
                onChange={setDbr}
                testid="salary-dbr"
                suffix="%"
                step="0.01"
              />
              <div className="mt-2 flex gap-2 flex-wrap">
                {[
                  { v: "33.33", label: "قطاع خاص 33%" },
                  { v: "25", label: "متقاعد 25%" },
                  { v: "45", label: "دخل ≥ 15K — 45%" },
                  { v: "65", label: "عقاري 65%" },
                ].map((p) => (
                  <button
                    key={p.v}
                    onClick={() => setDbr(p.v)}
                    data-testid={`salary-dbr-preset-${p.v}`}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                      dbr === p.v
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <Field
              label="نسبة الفائدة السنوية"
              value={rate}
              onChange={setRate}
              testid="salary-rate"
              suffix="%"
              step="0.1"
            />
            <Field
              label="مدة التمويل"
              value={years}
              onChange={setYears}
              testid="salary-years"
              suffix="سنة"
            />

            <div className="pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground leading-relaxed">
                ملاحظة: وفق أنظمة ساما، أقصى نسبة استقطاع شهرية (DBR) هي 33% من الراتب
                للقطاع الخاص، و25% للمتقاعدين، وقد تصل إلى 45% لأصحاب الدخول العالية،
                و65% للتمويل العقاري.
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div
          ref={shareRef}
          className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          data-testid="salary-result-card"
        >
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[hsl(var(--gold))]/10 -translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-1">
              أقصى مبلغ تمويل
            </div>
            <div
              className="font-display font-bold text-4xl sm:text-5xl number-display"
              data-testid="salary-max-loan"
            >
              {result ? fmt(result.maxLoan) : "—"}
              <span className="text-base font-medium text-primary-foreground/70 mr-2">
                ريال
              </span>
            </div>

            {result?.insufficient && (
              <div className="mt-4 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/30 rounded-lg px-3 py-2">
                التزاماتك الحالية تتجاوز نسبة الاستقطاع المسموحة. لا يوجد هامش
                للحصول على تمويل جديد.
              </div>
            )}

            <div className="mt-8 space-y-4">
              <ResultRow
                label="أقصى قسط شهري"
                value={result ? fmt(result.maxMonthly) : "—"}
                highlight
                testid="salary-max-monthly"
              />
              <ResultRow
                label="إجمالي المبلغ المسدد"
                value={result ? fmt(result.total) : "—"}
                testid="salary-total"
              />
              <ResultRow
                label="إجمالي الفوائد"
                value={result ? fmt(result.totalInterest) : "—"}
                testid="salary-interest"
              />
              <ResultRow
                label="عدد الأقساط"
                value={result ? result.months : "—"}
                testid="salary-months"
              />
            </div>
          </div>
        </div>
      </div>
      {result && !result.insufficient && (
        <ShareResult
          title="حاسبة التمويل — من الراتب"
          textLines={[
            `💼 الراتب الأساسي: ${fmt(parseFloat(salary))} ريال`,
            `📊 نسبة الاستقطاع: ${dbr}%`,
            `💳 أقصى قسط شهري: ${fmt(result.maxMonthly)} ريال`,
            `💰 أقصى تمويل: ${fmt(result.maxLoan)} ريال`,
            `📈 المدة: ${years} سنة بنسبة ${rate}%`,
          ]}
          targetRef={shareRef}
        />
      )}
    </>
  );
};

/* =====================  Mode 2: Monthly from loan amount  ===================== */
const AmountMode = () => {
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
    return { monthly, total, totalInterest, months };
  }, [amount, rate, years]);

  return (
    <>
      <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
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
            <div
              className="font-display font-bold text-4xl sm:text-5xl number-display"
              data-testid="finance-monthly"
            >
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
    </>
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
      className={`number-display font-semibold ${
        highlight ? "text-[hsl(var(--gold))]" : ""
      }`}
      data-testid={testid}
    >
      {value}
    </span>
  </div>
);

export default FinanceCalculator;
