import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Rocket } from "lucide-react";

// Orbital period ratios (Earth years)
const PLANETS = [
  { name: "عطارد", en: "Mercury", ratio: 0.240846, moon: 0, color: "bg-gray-500" },
  { name: "الزهرة", en: "Venus", ratio: 0.615198, moon: 0, color: "bg-amber-500" },
  { name: "الأرض", en: "Earth", ratio: 1, moon: 0, color: "bg-blue-500" },
  { name: "المريخ", en: "Mars", ratio: 1.88085, moon: 0, color: "bg-red-500" },
  { name: "المشتري", en: "Jupiter", ratio: 11.862, moon: 0, color: "bg-orange-500" },
  { name: "زحل", en: "Saturn", ratio: 29.4571, moon: 0, color: "bg-yellow-600" },
  { name: "أورانوس", en: "Uranus", ratio: 84.0205, moon: 0, color: "bg-cyan-500" },
  { name: "نبتون", en: "Neptune", ratio: 164.8, moon: 0, color: "bg-indigo-500" },
];

const PlanetAge = () => {
  const [birth, setBirth] = useState("2000-01-01");
  const shareRef = useRef(null);

  const ages = useMemo(() => {
    const b = new Date(birth);
    if (isNaN(b)) return null;
    const nowMs = Date.now();
    const earthYears = (nowMs - b.getTime()) / (365.25 * 24 * 3600 * 1000);
    return PLANETS.map((p) => ({ ...p, age: earthYears / p.ratio }));
  }, [birth]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  return (
    <div data-testid="planet-age-page">
      <PageHeader icon={Rocket} title="عمرك في الكواكب الأخرى" subtitle="كم سنة تصبح لو كنت تعيش على المريخ أو المشتري؟" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-5 mb-5">
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">تاريخ ميلادك</span>
            <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} data-testid="planet-birth"
              className="w-full text-lg number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
          </label>
        </div>

        {ages && (
          <div ref={shareRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-testid="planet-grid">
            {ages.map((p) => (
              <div key={p.en} className="bg-card border border-border rounded-2xl p-5 relative overflow-hidden" data-testid={`planet-${p.en.toLowerCase()}`}>
                <div className={`absolute top-3 left-3 w-8 h-8 rounded-full ${p.color} opacity-70`} />
                <div className="text-xs text-muted-foreground mb-1">{p.en}</div>
                <div className="font-display font-bold text-lg mb-2">{p.name}</div>
                <div className="font-display font-bold text-3xl number-display text-primary">
                  {fmt(p.age)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">سنة {p.name}ية</div>
              </div>
            ))}
          </div>
        )}

        {ages && (
          <ShareResult title="عمرك في الكواكب"
            textLines={[
              `🎂 تاريخ الميلاد: ${birth}`,
              ...ages.map((p) => `🪐 ${p.name}: ${fmt(p.age)} سنة`),
            ]} targetRef={shareRef} />
        )}
      </div>
    </div>
  );
};

export default PlanetAge;
