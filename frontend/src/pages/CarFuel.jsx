import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Fuel } from "lucide-react";

const CarFuel = () => {
  const [km, setKm] = useState("500");
  const [liters, setLiters] = useState("40");
  const [price, setPrice] = useState("2.33");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const d = parseFloat(km);
    const l = parseFloat(liters);
    const p = parseFloat(price);
    if (!d || d <= 0 || !l || l <= 0 || isNaN(p) || p < 0) return null;
    const consumption = (l * 100) / d;
    const costTotal = l * p;
    const costPerKm = costTotal / d;
    const kmPerL = d / l;
    let rating = "متوسط";
    if (consumption <= 6) rating = "ممتاز";
    else if (consumption <= 9) rating = "جيد";
    else if (consumption <= 12) rating = "متوسط";
    else rating = "مرتفع";
    return { consumption, costTotal, costPerKm, kmPerL, rating };
  }, [km, liters, price]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  return (
    <div data-testid="car-fuel-page">
      <PageHeader
        icon={Fuel}
        title="حاسبة استهلاك السيارة"
        subtitle="لتر / 100 كم + التكلفة"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
            <Field label="المسافة المقطوعة" value={km} onChange={setKm} testid="car-km" suffix="كم" />
            <Field label="الوقود المستهلك" value={liters} onChange={setLiters} testid="car-liters" suffix="لتر" />
            <Field label="سعر اللتر" value={price} onChange={setPrice} testid="car-price" suffix="ريال" step="0.01" />
          </div>
          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 relative overflow-hidden" data-testid="car-result">
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[hsl(var(--gold))]/10 -translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-1">
                استهلاك الوقود
              </div>
              <div className="font-display font-bold text-4xl sm:text-5xl number-display" data-testid="car-consumption">
                {result ? fmt(result.consumption) : "—"}
                <span className="text-base font-medium text-primary-foreground/70 mr-2">لتر/100 كم</span>
              </div>
              {result && (
                <div className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))]`}>
                  {result.rating}
                </div>
              )}
              <div className="mt-6 space-y-3">
                <Row label="كم/لتر" value={result ? `${fmt(result.kmPerL)} كم` : "—"} testid="car-kmpl" />
                <Row label="التكلفة الإجمالية" value={result ? `${fmt(result.costTotal)} ريال` : "—"} testid="car-cost" />
                <Row label="تكلفة الكيلومتر" value={result ? `${fmt(result.costPerKm)} ريال` : "—"} highlight testid="car-costkm" />
              </div>
            </div>
          </div>
        </div>
        {result && (
          <ShareResult
            title="حاسبة استهلاك السيارة"
            textLines={[
              `🚗 المسافة: ${km} كم | الوقود: ${liters} لتر`,
              `⛽ الاستهلاك: ${fmt(result.consumption)} لتر/100كم (${result.rating})`,
              `💰 التكلفة: ${fmt(result.costTotal)} ريال (${fmt(result.costPerKm)} ريال/كم)`,
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
      <input type="number" value={value} step={step || "1"} min="0"
        onChange={(e) => onChange(e.target.value)} data-testid={testid}
        className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-16 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">{suffix}</span>
    </div>
  </label>
);

const Row = ({ label, value, highlight, testid }) => (
  <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-primary-foreground/10">
    <span className="text-sm text-primary-foreground/70">{label}</span>
    <span className={`number-display font-semibold ${highlight ? "text-[hsl(var(--gold))]" : ""}`} data-testid={testid}>{value}</span>
  </div>
);

export default CarFuel;
