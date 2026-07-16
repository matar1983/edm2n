import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Zap } from "lucide-react";

// Saudi residential tariff (simplified)
const TARIFFS = [
  { max: 6000, price: 0.18 },
  { max: Infinity, price: 0.30 },
];

const Electricity = () => {
  const [devices, setDevices] = useState([
    { id: 1, name: "مكيّف سبليت", watts: "1500", hours: "8", count: "2" },
    { id: 2, name: "ثلاجة", watts: "200", hours: "24", count: "1" },
    { id: 3, name: "غسالة", watts: "1500", hours: "1", count: "1" },
    { id: 4, name: "تلفزيون", watts: "100", hours: "5", count: "2" },
    { id: 5, name: "إضاءة LED", watts: "10", hours: "6", count: "20" },
  ]);
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const dailyKwh = devices.reduce((s, d) => {
      const w = parseFloat(d.watts) || 0;
      const h = parseFloat(d.hours) || 0;
      const c = parseFloat(d.count) || 0;
      return s + (w * h * c) / 1000;
    }, 0);
    const monthlyKwh = dailyKwh * 30;
    // Cost via tiered tariff
    let cost = 0;
    let remaining = monthlyKwh;
    let prevLimit = 0;
    for (const t of TARIFFS) {
      const inTier = Math.min(remaining, t.max - prevLimit);
      if (inTier <= 0) break;
      cost += inTier * t.price;
      remaining -= inTier;
      prevLimit = t.max;
    }
    return { dailyKwh, monthlyKwh, cost };
  }, [devices]);

  const update = (id, k, v) => setDevices((d) => d.map((x) => x.id === id ? { ...x, [k]: v } : x));
  const remove = (id) => setDevices((d) => d.filter((x) => x.id !== id));
  const add = () => setDevices((d) => [...d, { id: Date.now(), name: "جهاز جديد", watts: "0", hours: "0", count: "1" }]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 1 });

  return (
    <div data-testid="elec-page">
      <PageHeader icon={Zap} title="حاسبة استهلاك الكهرباء" subtitle="تقدير الفاتورة الشهرية بحسب الأجهزة" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div ref={shareRef} className="grid sm:grid-cols-3 gap-3 mb-4">
          <Stat label="استهلاك يومي" v={`${fmt(result.dailyKwh)} كيلوواط·س`} t="elec-daily" />
          <Stat label="استهلاك شهري" v={`${fmt(result.monthlyKwh)} كيلوواط·س`} t="elec-monthly" />
          <Stat label="التكلفة التقريبية" v={`${fmt(result.cost)} ريال`} highlight t="elec-cost" />
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-sm font-semibold mb-3">قائمة الأجهزة</div>
          <div className="hidden sm:grid grid-cols-[1fr_90px_80px_70px_40px] gap-2 text-xs text-muted-foreground px-1 mb-1">
            <div>الجهاز</div><div>واط</div><div>ساعات/يوم</div><div>العدد</div><div></div>
          </div>
          <div className="space-y-2" data-testid="elec-rows">
            {devices.map((d) => (
              <div key={d.id} className="grid grid-cols-[1fr_80px_70px_60px_36px] gap-2">
                <input value={d.name} onChange={(e) => update(d.id, "name", e.target.value)} data-testid={`elec-name-${d.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                <input type="number" value={d.watts} min="0" onChange={(e) => update(d.id, "watts", e.target.value)} data-testid={`elec-w-${d.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-2 py-2 text-sm number-display focus:outline-none focus:border-primary" />
                <input type="number" value={d.hours} min="0" max="24" onChange={(e) => update(d.id, "hours", e.target.value)} data-testid={`elec-h-${d.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-2 py-2 text-sm number-display focus:outline-none focus:border-primary" />
                <input type="number" value={d.count} min="1" onChange={(e) => update(d.id, "count", e.target.value)} data-testid={`elec-c-${d.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-2 py-2 text-sm number-display focus:outline-none focus:border-primary" />
                <button onClick={() => remove(d.id)} data-testid={`elec-remove-${d.id}`}
                  className="w-9 h-9 rounded-full text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 text-lg">×</button>
              </div>
            ))}
          </div>
          <button onClick={add} data-testid="elec-add"
            className="mt-3 text-sm text-primary font-medium hover:underline">+ إضافة جهاز</button>
        </div>
        <div className="mt-3 text-xs text-muted-foreground bg-secondary/40 rounded-xl p-3">
          التعرفة السعودية للسكني: 0.18 ريال حتى 6000 كيلوواط·س، ثم 0.30 ريال (تقديري).
        </div>
        <ShareResult title="استهلاك الكهرباء"
          textLines={[`⚡ يومي: ${fmt(result.dailyKwh)} كيلوواط·س`, `📊 شهري: ${fmt(result.monthlyKwh)} كيلوواط·س`, `💰 الفاتورة: ${fmt(result.cost)} ريال`]}
          targetRef={shareRef} />
      </div>
    </div>
  );
};

const Stat = ({ label, v, highlight, t }) => (
  <div className={`rounded-xl p-4 border ${highlight ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`} data-testid={t}>
    <div className={`text-xs ${highlight ? "text-primary-foreground/70" : "text-muted-foreground"} mb-1`}>{label}</div>
    <div className={`font-display font-bold text-xl number-display ${highlight ? "text-[hsl(var(--gold))]" : "text-primary"}`}>{v}</div>
  </div>
);

export default Electricity;
