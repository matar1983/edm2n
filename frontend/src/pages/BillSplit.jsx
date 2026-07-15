import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Users } from "lucide-react";

const BillSplit = () => {
  const [total, setTotal] = useState("500");
  const [people, setPeople] = useState("4");
  const [tipPct, setTipPct] = useState("10");
  const [taxPct, setTaxPct] = useState("15");
  const [includeTaxInTotal, setIncludeTaxInTotal] = useState(true);
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const t = parseFloat(total) || 0;
    const n = parseInt(people) || 1;
    const tp = parseFloat(tipPct) || 0;
    const tx = parseFloat(taxPct) || 0;

    let subtotal = t;
    let tax = 0;
    if (includeTaxInTotal) {
      subtotal = t / (1 + tx / 100);
      tax = t - subtotal;
    } else {
      tax = subtotal * (tx / 100);
    }
    const tip = subtotal * (tp / 100);
    const grand = subtotal + tax + tip;
    const perPerson = grand / n;
    return { subtotal, tax, tip, grand, perPerson };
  }, [total, people, tipPct, taxPct, includeTaxInTotal]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div data-testid="bill-page">
      <PageHeader icon={Users} title="قسمة الفاتورة" subtitle="بين مجموعة أصدقاء مع البقشيش والضريبة" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
            <F label="المبلغ الإجمالي" v={total} s={setTotal} t="bs-total" suf="ريال" step="0.01" />
            <F label="عدد الأشخاص" v={people} s={setPeople} t="bs-people" suf="فرد" />
            <F label="نسبة البقشيش" v={tipPct} s={setTipPct} t="bs-tip" suf="%" step="1" />
            <F label="نسبة الضريبة" v={taxPct} s={setTaxPct} t="bs-tax" suf="%" step="0.1" />
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={includeTaxInTotal} onChange={(e) => setIncludeTaxInTotal(e.target.checked)}
                data-testid="bs-includes-tax" className="w-5 h-5 accent-primary" />
              <span className="text-sm font-medium">المبلغ الإجمالي شامل الضريبة</span>
            </label>
          </div>
          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8" data-testid="bs-result">
            <div className="text-xs text-[hsl(var(--gold))] font-semibold mb-1">نصيب الفرد</div>
            <div className="font-display font-bold text-4xl sm:text-5xl number-display" data-testid="bs-per-person">
              {fmt(result.perPerson)}<span className="text-base font-medium text-primary-foreground/70 mr-2">ريال</span>
            </div>
            <div className="mt-6 space-y-3">
              <R label="مبلغ الطعام (بدون ضريبة)" v={`${fmt(result.subtotal)} ريال`} t="bs-subtotal" />
              <R label="الضريبة" v={`${fmt(result.tax)} ريال`} t="bs-tax-val" />
              <R label="البقشيش" v={`${fmt(result.tip)} ريال`} t="bs-tip-val" />
              <R label="الإجمالي" v={`${fmt(result.grand)} ريال`} h t="bs-grand" />
            </div>
          </div>
        </div>
        <ShareResult title="قسمة الفاتورة"
          textLines={[
            `👥 ${people} أفراد | 💵 إجمالي: ${fmt(result.grand)} ريال`,
            `📊 ضريبة: ${fmt(result.tax)} | بقشيش: ${fmt(result.tip)}`,
            `💰 نصيب الفرد: ${fmt(result.perPerson)} ريال`,
          ]} targetRef={shareRef} />
      </div>
    </div>
  );
};

const F = ({ label, v, s, t, suf, step }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1.5 block">{label}</span>
    <div className="relative">
      <input type="number" value={v} step={step || "1"} min="0" onChange={(e) => s(e.target.value)} data-testid={t}
        className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-14 focus:outline-none focus:border-primary" />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suf}</span>
    </div>
  </label>
);

const R = ({ label, v, h, t }) => (
  <div className="flex items-center justify-between gap-3 pb-2 border-b border-primary-foreground/10">
    <span className="text-sm text-primary-foreground/70">{label}</span>
    <span className={`number-display font-semibold ${h ? "text-[hsl(var(--gold))]" : ""}`} data-testid={t}>{v}</span>
  </div>
);

export default BillSplit;
