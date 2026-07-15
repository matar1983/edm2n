import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Cake } from "lucide-react";

const AgeCalculator = () => {
  const [birth, setBirth] = useState("2000-01-01");
  const [today, setToday] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const shareRef = useRef(null);

  const result = useMemo(() => {
    if (!birth) return null;
    const b = new Date(birth);
    const t = new Date(today);
    if (isNaN(b) || isNaN(t) || b > t) return null;

    let years = t.getFullYear() - b.getFullYear();
    let months = t.getMonth() - b.getMonth();
    let days = t.getDate() - b.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(t.getFullYear(), t.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = t - b;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    // Next birthday
    let next = new Date(t.getFullYear(), b.getMonth(), b.getDate());
    if (next < t) next.setFullYear(next.getFullYear() + 1);
    const daysToBd = Math.ceil((next - t) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      daysToBd,
      nextBd: next,
    };
  }, [birth, today]);

  const fmt = (n) => n.toLocaleString("ar-EG");

  return (
    <div data-testid="age-page">
      <PageHeader
        icon={Cake}
        title="حاسبة العمر"
        subtitle="احسب عمرك بالسنة والشهر واليوم"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">
                تاريخ الميلاد
              </span>
              <input
                type="date"
                value={birth}
                max={today}
                onChange={(e) => setBirth(e.target.value)}
                data-testid="age-birth-input"
                className="w-full text-lg number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">
                التاريخ المرجعي (اليوم)
              </span>
              <input
                type="date"
                value={today}
                onChange={(e) => setToday(e.target.value)}
                data-testid="age-today-input"
                className="w-full text-lg number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
          </div>
        </div>

        {result ? (
          <>
            <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 mb-4" data-testid="age-result-main">
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-3">
                عمرك بالتفصيل
              </div>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display font-bold">
                <div>
                  <span className="text-5xl sm:text-6xl number-display" data-testid="age-years">{fmt(result.years)}</span>
                  <span className="text-lg text-primary-foreground/70 mr-2">سنة</span>
                </div>
                <div>
                  <span className="text-4xl number-display" data-testid="age-months">{fmt(result.months)}</span>
                  <span className="text-base text-primary-foreground/70 mr-2">شهر</span>
                </div>
                <div>
                  <span className="text-4xl number-display" data-testid="age-days">{fmt(result.days)}</span>
                  <span className="text-base text-primary-foreground/70 mr-2">يوم</span>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard label="إجمالي الأيام" value={fmt(result.totalDays)} testid="age-total-days" />
              <StatCard label="إجمالي الأسابيع" value={fmt(result.totalWeeks)} testid="age-total-weeks" />
              <StatCard label="إجمالي الساعات" value={fmt(result.totalHours)} testid="age-total-hours" />
              <StatCard
                label="عيد ميلادك القادم بعد"
                value={`${fmt(result.daysToBd)} يوم`}
                highlight
                testid="age-next-bd"
              />
            </div>
            <ShareResult
              title="حاسبة العمر"
              textLines={[
                `🎂 تاريخ الميلاد: ${birth}`,
                `📅 عمرك: ${fmt(result.years)} سنة و ${fmt(result.months)} شهر و ${fmt(result.days)} يوم`,
                `📊 إجمالي الأيام: ${fmt(result.totalDays)} يوم`,
                `🎉 عيد ميلادك القادم بعد ${fmt(result.daysToBd)} يوم`,
              ]}
              targetRef={shareRef}
            />
          </>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
            الرجاء إدخال تاريخ ميلاد صحيح قبل التاريخ المرجعي.
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, highlight, testid }) => (
  <div
    className={`rounded-2xl p-5 border ${
      highlight
        ? "bg-[hsl(var(--gold))]/10 border-[hsl(var(--gold))]/40"
        : "bg-card border-border"
    }`}
    data-testid={testid}
  >
    <div className="text-xs text-muted-foreground mb-2">{label}</div>
    <div
      className={`font-display font-bold text-2xl number-display ${
        highlight ? "text-[hsl(var(--gold))]" : "text-foreground"
      }`}
    >
      {value}
    </div>
  </div>
);

export default AgeCalculator;
