import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { HandCoins } from "lucide-react";

const ZakatCalc = () => {
  const [cash, setCash] = useState("0");
  const [gold, setGold] = useState("0");
  const [silver, setSilver] = useState("0");
  const [investments, setInvestments] = useState("0");
  const [businessAssets, setBusinessAssets] = useState("0");
  const [debtsOwed, setDebtsOwed] = useState("0"); // debts owed by user (subtracted)
  const [nisabValue, setNisabValue] = useState("22000"); // ~ current SAR value of 85g gold nisab
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const total =
      (parseFloat(cash) || 0) +
      (parseFloat(gold) || 0) +
      (parseFloat(silver) || 0) +
      (parseFloat(investments) || 0) +
      (parseFloat(businessAssets) || 0) -
      (parseFloat(debtsOwed) || 0);
    const nisab = parseFloat(nisabValue) || 0;
    const reachesNisab = total >= nisab;
    const zakat = reachesNisab ? total * 0.025 : 0;
    return { total, zakat, reachesNisab };
  }, [cash, gold, silver, investments, businessAssets, debtsOwed, nisabValue]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  return (
    <div data-testid="zakat-page">
      <PageHeader
        icon={HandCoins}
        title="حاسبة الزكاة"
        subtitle="زكاة المال (2.5%) — النقود والذهب والاستثمارات"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
            <Field label="النقود (كاش + بنوك)" value={cash} onChange={setCash} testid="zakat-cash" />
            <Field label="قيمة الذهب" value={gold} onChange={setGold} testid="zakat-gold" />
            <Field label="قيمة الفضة" value={silver} onChange={setSilver} testid="zakat-silver" />
            <Field label="الاستثمارات (أسهم/عقار للبيع)" value={investments} onChange={setInvestments} testid="zakat-investments" />
            <Field label="عروض التجارة" value={businessAssets} onChange={setBusinessAssets} testid="zakat-business" />
            <Field label="الديون المستحقة عليك" value={debtsOwed} onChange={setDebtsOwed} testid="zakat-debts" />
            <div className="pt-3 border-t border-border">
              <Field
                label="قيمة النصاب (تقدير 85 غم ذهب)"
                value={nisabValue}
                onChange={setNisabValue}
                testid="zakat-nisab"
                hint="أدخل القيمة الحالية للنصاب بالريال"
              />
            </div>
          </div>

          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 relative overflow-hidden" data-testid="zakat-result">
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[hsl(var(--gold))]/10 -translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-1">
                زكاة مالك
              </div>
              <div className="font-display font-bold text-4xl sm:text-5xl number-display" data-testid="zakat-value">
                {fmt(result.zakat)}
                <span className="text-base font-medium text-primary-foreground/70 mr-2">ريال</span>
              </div>
              <div className="mt-6 space-y-3">
                <Row label="إجمالي المال الزكوي" value={`${fmt(result.total)} ريال`} testid="zakat-total" />
                <Row label="النصاب" value={`${fmt(parseFloat(nisabValue))} ريال`} testid="zakat-nisab-val" />
                <Row
                  label="بلغ النصاب؟"
                  value={result.reachesNisab ? "نعم ✓" : "لم يبلغ"}
                  highlight
                  testid="zakat-reaches"
                />
              </div>
              <div className="mt-5 text-xs text-primary-foreground/70 leading-relaxed">
                ملاحظة: تجب الزكاة بعد بلوغ المال النصاب وحولان الحول (سنة هجرية). النسبة 2.5%.
              </div>
            </div>
          </div>
        </div>
        <ShareResult
          title="حاسبة الزكاة"
          textLines={[
            `💰 إجمالي المال: ${fmt(result.total)} ريال`,
            `📊 النصاب: ${fmt(parseFloat(nisabValue))} ريال`,
            `${result.reachesNisab ? "✅ بلغ النصاب" : "❌ لم يبلغ النصاب"}`,
            `🕌 زكاة مالك: ${fmt(result.zakat)} ريال (2.5%)`,
          ]}
          targetRef={shareRef}
        />
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, testid, hint }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1 block">{label}</span>
    <div className="relative">
      <input type="number" value={value} min="0"
        onChange={(e) => onChange(e.target.value)} data-testid={testid}
        className="w-full text-base font-semibold number-display bg-secondary/50 border border-border rounded-lg px-3 py-2 pl-14 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">ريال</span>
    </div>
    {hint && <span className="text-[11px] text-muted-foreground mt-1 block">{hint}</span>}
  </label>
);

const Row = ({ label, value, highlight, testid }) => (
  <div className="flex items-center justify-between gap-3 pb-2 border-b border-primary-foreground/10">
    <span className="text-sm text-primary-foreground/70">{label}</span>
    <span className={`number-display font-semibold ${highlight ? "text-[hsl(var(--gold))]" : ""}`} data-testid={testid}>{value}</span>
  </div>
);

export default ZakatCalc;
