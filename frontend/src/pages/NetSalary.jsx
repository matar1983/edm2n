import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Wallet } from "lucide-react";

// Saudi GOSI (social insurance) rates:
// Employee: 9.75% (retirement + unemployment insurance)
// Base: excluding transport allowance if separated
const NetSalary = () => {
  const [gross, setGross] = useState("15000");
  const [housing, setHousing] = useState("0");
  const [transport, setTransport] = useState("0");
  const [otherDeductions, setOtherDeductions] = useState("0");
  const [isSaudi, setIsSaudi] = useState(true);
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const G = parseFloat(gross) || 0;
    const H = parseFloat(housing) || 0;
    const T = parseFloat(transport) || 0;
    const O = parseFloat(otherDeductions) || 0;
    const totalGross = G + H + T;
    // GOSI applies to basic + housing only (excluding transport)
    const gosiBase = G + H;
    const gosiEmployee = isSaudi ? gosiBase * 0.0975 : 0;
    const net = totalGross - gosiEmployee - O;
    return { totalGross, gosiBase, gosiEmployee, otherDeductions: O, net };
  }, [gross, housing, transport, otherDeductions, isSaudi]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  return (
    <div data-testid="net-salary-page">
      <PageHeader icon={Wallet} title="حاسبة الراتب الصافي" subtitle="بعد اقتطاعات التأمينات (السعودية)" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
            <F label="الراتب الأساسي" v={gross} s={setGross} t="ns-gross" />
            <F label="بدل السكن" v={housing} s={setHousing} t="ns-housing" />
            <F label="بدل النقل" v={transport} s={setTransport} t="ns-transport" />
            <F label="اقتطاعات أخرى (قروض، إلخ)" v={otherDeductions} s={setOtherDeductions} t="ns-other" />
            <div className="pt-3 border-t border-border">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={isSaudi} onChange={(e) => setIsSaudi(e.target.checked)}
                  data-testid="ns-saudi"
                  className="w-5 h-5 rounded accent-primary" />
                <span className="text-sm font-medium">مواطن سعودي (يخضع للتأمينات 9.75%)</span>
              </label>
            </div>
          </div>
          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8" data-testid="ns-result">
            <div className="text-xs text-[hsl(var(--gold))] font-semibold mb-1">الراتب الصافي</div>
            <div className="font-display font-bold text-4xl sm:text-5xl number-display" data-testid="ns-net">
              {fmt(result.net)}<span className="text-base font-medium text-primary-foreground/70 mr-2">ريال</span>
            </div>
            <div className="mt-6 space-y-3">
              <R label="إجمالي الراتب" v={`${fmt(result.totalGross)} ريال`} t="ns-total" />
              <R label="التأمينات الاجتماعية 9.75%" v={`${fmt(result.gosiEmployee)} ريال`} t="ns-gosi" h />
              <R label="اقتطاعات أخرى" v={`${fmt(result.otherDeductions)} ريال`} t="ns-other-total" />
            </div>
            <div className="mt-5 text-xs text-primary-foreground/60">
              التأمينات على (الأساسي + السكن)، ولا تُحسب على بدل النقل.
            </div>
          </div>
        </div>
        <ShareResult title="الراتب الصافي"
          textLines={[
            `💼 الراتب الإجمالي: ${fmt(result.totalGross)} ريال`,
            `📉 تأمينات: ${fmt(result.gosiEmployee)} ريال`,
            `📉 اقتطاعات أخرى: ${fmt(result.otherDeductions)} ريال`,
            `💰 الصافي: ${fmt(result.net)} ريال`,
          ]}
          targetRef={shareRef} />
      </div>
    </div>
  );
};

const F = ({ label, v, s, t }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1 block">{label}</span>
    <div className="relative">
      <input type="number" value={v} min="0" onChange={(e) => s(e.target.value)} data-testid={t}
        className="w-full text-base font-semibold number-display bg-secondary/50 border border-border rounded-lg px-3 py-2 pl-14 focus:outline-none focus:border-primary" />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">ريال</span>
    </div>
  </label>
);

const R = ({ label, v, h, t }) => (
  <div className="flex items-center justify-between gap-3 pb-2 border-b border-primary-foreground/10">
    <span className="text-sm text-primary-foreground/70">{label}</span>
    <span className={`number-display font-semibold ${h ? "text-[hsl(var(--gold))]" : ""}`} data-testid={t}>{v}</span>
  </div>
);

export default NetSalary;
