import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Receipt } from "lucide-react";

const PRESET_RATES = [5, 10, 14, 15];

const TaxCalculator = () => {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("15");
  const [mode, setMode] = useState("add"); // add | extract
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const a = parseFloat(amount);
    const r = parseFloat(rate);
    if (!a || a <= 0 || isNaN(r)) return null;
    if (mode === "add") {
      const tax = a * (r / 100);
      return { base: a, tax, total: a + tax };
    }
    // extract: amount is total-including-VAT, find base
    const base = a / (1 + r / 100);
    const tax = a - base;
    return { base, tax, total: a };
  }, [amount, rate, mode]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div data-testid="tax-page">
      <PageHeader
        icon={Receipt}
        title="حاسبة الضريبة (VAT)"
        subtitle="أضف أو استخرج قيمة الضريبة بسهولة"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex bg-secondary rounded-full p-1 mb-6 w-fit" data-testid="tax-mode-toggle">
            <button
              onClick={() => setMode("add")}
              data-testid="tax-mode-add"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === "add" ? "bg-primary text-primary-foreground" : "text-foreground/70"
              }`}
            >
              إضافة الضريبة
            </button>
            <button
              onClick={() => setMode("extract")}
              data-testid="tax-mode-extract"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                mode === "extract" ? "bg-primary text-primary-foreground" : "text-foreground/70"
              }`}
            >
              استخراج من السعر
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">
                {mode === "add" ? "المبلغ (بدون ضريبة)" : "المبلغ (شامل الضريبة)"}
              </span>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  step="0.01"
                  min="0"
                  onChange={(e) => setAmount(e.target.value)}
                  data-testid="tax-amount"
                  className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-16 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">ريال</span>
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">نسبة الضريبة</span>
              <div className="relative">
                <input
                  type="number"
                  value={rate}
                  step="0.1"
                  min="0"
                  onChange={(e) => setRate(e.target.value)}
                  data-testid="tax-rate"
                  className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-12 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">%</span>
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                {PRESET_RATES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRate(String(r))}
                    data-testid={`tax-preset-${r}`}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      String(r) === rate
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </label>
          </div>
        </div>

        {result && (
          <>
            <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 grid sm:grid-cols-3 gap-6" data-testid="tax-result">
              <ResultTile label="المبلغ الأصلي" value={`${fmt(result.base)} ريال`} testid="tax-base" />
              <ResultTile label={`الضريبة (${rate}%)`} value={`${fmt(result.tax)} ريال`} highlight testid="tax-vat" />
              <ResultTile label="الإجمالي" value={`${fmt(result.total)} ريال`} big testid="tax-total" />
            </div>
            <ShareResult
              title="حاسبة الضريبة"
              textLines={[
                `💰 المبلغ الأصلي: ${fmt(result.base)} ريال`,
                `📊 نسبة الضريبة: ${rate}%`,
                `➕ قيمة الضريبة: ${fmt(result.tax)} ريال`,
                `✅ الإجمالي: ${fmt(result.total)} ريال`,
              ]}
              targetRef={shareRef}
            />
          </>
        )}
      </div>
    </div>
  );
};

const ResultTile = ({ label, value, highlight, big, testid }) => (
  <div>
    <div className={`text-xs mb-2 ${highlight ? "text-[hsl(var(--gold))]" : "text-primary-foreground/70"}`}>{label}</div>
    <div className={`font-display font-bold number-display ${big ? "text-3xl sm:text-4xl" : "text-2xl"} ${highlight ? "text-[hsl(var(--gold))]" : ""}`} data-testid={testid}>
      {value}
    </div>
  </div>
);

export default TaxCalculator;
