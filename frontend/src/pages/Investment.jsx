import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { TrendingUp } from "lucide-react";

const Investment = () => {
  const [initial, setInitial] = useState("10000");
  const [monthly, setMonthly] = useState("500");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const P = parseFloat(initial) || 0;
    const PMT = parseFloat(monthly) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(years) || 0) * 12;
    // Compound growth of initial + monthly contributions
    const futureP = P * Math.pow(1 + r, n);
    const futurePMT = r === 0 ? PMT * n : PMT * ((Math.pow(1 + r, n) - 1) / r);
    const total = futureP + futurePMT;
    const contributions = P + PMT * n;
    const profit = total - contributions;
    return { total, contributions, profit, n };
  }, [initial, monthly, rate, years]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  return (
    <div data-testid="investment-page">
      <PageHeader icon={TrendingUp} title="حاسبة نمو الاستثمار" subtitle="فائدة مركبة مع مساهمات شهرية" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
            <F label="المبلغ الأولي" v={initial} s={setInitial} t="inv-initial" suf="ريال" />
            <F label="مساهمة شهرية" v={monthly} s={setMonthly} t="inv-monthly" suf="ريال" />
            <F label="معدل النمو السنوي" v={rate} s={setRate} t="inv-rate" suf="%" step="0.1" />
            <F label="المدة" v={years} s={setYears} t="inv-years" suf="سنة" />
          </div>
          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8" data-testid="inv-result">
            <div className="text-xs text-[hsl(var(--gold))] font-semibold mb-1">القيمة النهائية</div>
            <div className="font-display font-bold text-4xl sm:text-5xl number-display" data-testid="inv-total">
              {fmt(result.total)}<span className="text-base font-medium text-primary-foreground/70 mr-2">ريال</span>
            </div>
            <div className="mt-6 space-y-3">
              <R label="إجمالي المساهمات" v={`${fmt(result.contributions)} ريال`} t="inv-contrib" />
              <R label="الأرباح" v={`${fmt(result.profit)} ريال`} h t="inv-profit" />
              <R label="عدد الأشهر" v={result.n} t="inv-months" />
            </div>
          </div>
        </div>
        <ShareResult title="نمو الاستثمار"
          textLines={[
            `💰 مبلغ أولي: ${fmt(parseFloat(initial))} + ${fmt(parseFloat(monthly))} شهرياً`,
            `📈 بمعدل ${rate}% لمدة ${years} سنة`,
            `🎯 القيمة النهائية: ${fmt(result.total)} ريال`,
            `💎 الأرباح: ${fmt(result.profit)} ريال`,
          ]}
          targetRef={shareRef} />
      </div>
    </div>
  );
};

const F = ({ label, v, s, t, suf, step }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1.5 block">{label}</span>
    <div className="relative">
      <input type="number" value={v} step={step || "1"} min="0" onChange={(e) => s(e.target.value)} data-testid={t}
        className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-16 focus:outline-none focus:border-primary" />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suf}</span>
    </div>
  </label>
);

const R = ({ label, v, h, t }) => (
  <div className="flex items-center justify-between gap-3 pb-2 border-b border-primary-foreground/10">
    <span className="text-sm text-primary-foreground/70">{label}</span>
    <span className={`number-display font-semibold ${h ? "text-[hsl(var(--gold))]" : ""}`} data-testid={t}>{v}</span>
  </div>
);

export default Investment;
