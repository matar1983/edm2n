import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Flame } from "lucide-react";

// BMR (Mifflin-St Jeor) then TDEE via activity factor
const ACTIVITY = [
  { key: "sedentary", label: "خامل (بدون رياضة)", factor: 1.2 },
  { key: "light", label: "خفيف (رياضة 1-3 أيام)", factor: 1.375 },
  { key: "moderate", label: "متوسط (3-5 أيام)", factor: 1.55 },
  { key: "high", label: "عالي (6-7 أيام)", factor: 1.725 },
  { key: "athlete", label: "رياضي محترف", factor: 1.9 },
];

const Calories = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("75");
  const [activity, setActivity] = useState("moderate");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!a || !h || !w) return null;
    // Mifflin-St Jeor
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr += gender === "male" ? 5 : -161;
    const f = ACTIVITY.find((x) => x.key === activity)?.factor || 1.2;
    const tdee = bmr * f;
    return {
      bmr,
      tdee,
      lose: tdee - 500,
      lossFast: tdee - 1000,
      gain: tdee + 500,
    };
  }, [gender, age, height, weight, activity]);

  const fmt = (n) => Math.round(n).toLocaleString("ar-EG");

  return (
    <div data-testid="calories-page">
      <PageHeader icon={Flame} title="حاسبة السعرات اليومية" subtitle="BMR + TDEE + خطط لخسارة/زيادة الوزن" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <label className="text-sm font-medium mb-2 block">الجنس</label>
              <div className="flex bg-secondary rounded-full p-1 w-fit">
                <button onClick={() => setGender("male")} data-testid="cal-male"
                  className={`px-5 py-2 rounded-full text-sm font-medium ${gender === "male" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
                  ذكر
                </button>
                <button onClick={() => setGender("female")} data-testid="cal-female"
                  className={`px-5 py-2 rounded-full text-sm font-medium ${gender === "female" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
                  أنثى
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <F label="العمر" v={age} s={setAge} t="cal-age" suf="سنة" />
              <F label="الطول" v={height} s={setHeight} t="cal-height" suf="سم" />
              <F label="الوزن" v={weight} s={setWeight} t="cal-weight" suf="كجم" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">مستوى النشاط</label>
              <select value={activity} onChange={(e) => setActivity(e.target.value)} data-testid="cal-activity"
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
                {ACTIVITY.map((a) => (
                  <option key={a.key} value={a.key}>{a.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div ref={shareRef} className="space-y-3">
            {result && (
              <>
                <div className="bg-primary text-primary-foreground rounded-2xl p-6" data-testid="cal-result">
                  <div className="text-xs text-[hsl(var(--gold))] font-semibold mb-1">احتياجك اليومي (TDEE)</div>
                  <div className="font-display font-bold text-5xl number-display" data-testid="cal-tdee">
                    {fmt(result.tdee)}<span className="text-base text-primary-foreground/70 mr-1">سعرة/يوم</span>
                  </div>
                  <div className="mt-3 text-xs text-primary-foreground/70">
                    معدل الأيض الأساسي (BMR): <span className="number-display font-semibold">{fmt(result.bmr)}</span> سعرة
                  </div>
                </div>
                <Plan color="emerald" label="خسارة وزن معتدلة (0.5 كجم/أسبوع)" cals={result.lose} t="cal-lose" />
                <Plan color="rose" label="خسارة وزن سريعة (1 كجم/أسبوع)" cals={result.lossFast} t="cal-lossfast" />
                <Plan color="amber" label="زيادة كتلة عضلية" cals={result.gain} t="cal-gain" />
              </>
            )}
          </div>
        </div>
        {result && (
          <ShareResult title="حاسبة السعرات اليومية"
            textLines={[
              `👤 ${gender === "male" ? "ذكر" : "أنثى"} | العمر ${age} | ${height} سم | ${weight} كجم`,
              `🔥 TDEE: ${fmt(result.tdee)} سعرة/يوم`,
              `📉 لخسارة الوزن: ${fmt(result.lose)} سعرة`,
              `💪 لزيادة الوزن: ${fmt(result.gain)} سعرة`,
            ]}
            targetRef={shareRef} />
        )}
      </div>
    </div>
  );
};

const F = ({ label, v, s, t, suf }) => (
  <label className="block">
    <span className="text-xs font-medium mb-1 block">{label}</span>
    <div className="relative">
      <input type="number" value={v} min="0" onChange={(e) => s(e.target.value)} data-testid={t}
        className="w-full text-base font-semibold number-display bg-secondary/50 border border-border rounded-lg px-3 py-2 pl-10 focus:outline-none focus:border-primary" />
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">{suf}</span>
    </div>
  </label>
);

const Plan = ({ color, label, cals, t }) => {
  const map = {
    emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    rose: "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300",
    amber: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300",
  };
  return (
    <div className={`border rounded-xl p-4 ${map[color]}`} data-testid={t}>
      <div className="text-xs mb-1">{label}</div>
      <div className="font-display font-bold text-2xl number-display">
        {Math.round(cals).toLocaleString("ar-EG")}<span className="text-sm mr-1">سعرة</span>
      </div>
    </div>
  );
};

export default Calories;
