import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { UserCog } from "lucide-react";

const Retirement = () => {
  const [birth, setBirth] = useState("1985-01-01");
  const [retireAge, setRetireAge] = useState("60");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    if (!birth) return null;
    const b = new Date(birth);
    const now = new Date();
    const ageMs = now - b;
    const ageYears = ageMs / (365.25 * 86400000);
    const yearsLeft = parseFloat(retireAge) - ageYears;
    if (yearsLeft < 0) return { retired: true, ageYears, retirementDate: null };
    const retirementDate = new Date(b.getTime() + parseFloat(retireAge) * 365.25 * 86400000);
    const monthsLeft = yearsLeft * 12;
    const daysLeft = yearsLeft * 365.25;
    return { retired: false, ageYears, yearsLeft, monthsLeft, daysLeft, retirementDate };
  }, [birth, retireAge]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 1 });

  return (
    <div data-testid="retire-page">
      <PageHeader icon={UserCog} title="حاسبة الوقت المتبقّي للتقاعد" subtitle="كم باقي على تقاعدك" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 mb-4 grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">تاريخ الميلاد</span>
            <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} data-testid="ret-birth"
              className="w-full text-base number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
          </label>
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">سن التقاعد المستهدف</span>
            <input type="number" value={retireAge} min="30" max="80" onChange={(e) => setRetireAge(e.target.value)} data-testid="ret-age"
              className="w-full text-base number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
          </label>
        </div>

        {result && (
          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 text-center" data-testid="ret-result">
            {result.retired ? (
              <>
                <div className="text-[hsl(var(--gold))] font-bold text-2xl mb-3">تهانينا! أنت في سن التقاعد 🎉</div>
                <div className="text-primary-foreground/70">عمرك: <span className="number-display font-semibold">{fmt(result.ageYears)}</span> سنة</div>
              </>
            ) : (
              <>
                <div className="text-[hsl(var(--gold))] font-semibold text-sm mb-2">باقي على تقاعدك</div>
                <div className="font-display font-bold text-6xl sm:text-7xl number-display" data-testid="ret-years">{fmt(result.yearsLeft)}</div>
                <div className="text-primary-foreground/70">سنة</div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-primary-foreground/10 rounded-lg p-3">
                    <div className="text-xs text-primary-foreground/70">أشهر</div>
                    <div className="font-display font-bold text-2xl number-display" data-testid="ret-months">{fmt(result.monthsLeft)}</div>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-lg p-3">
                    <div className="text-xs text-primary-foreground/70">أيام</div>
                    <div className="font-display font-bold text-2xl number-display" data-testid="ret-days">{fmt(result.daysLeft)}</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-primary-foreground/80">
                  التاريخ المتوقع: {result.retirementDate.toLocaleDateString("ar-EG")}
                </div>
              </>
            )}
          </div>
        )}
        {result && !result.retired && (
          <ShareResult title="التقاعد" textLines={[`⏳ باقي ${fmt(result.yearsLeft)} سنة على تقاعدي`, `📅 ${result.retirementDate.toLocaleDateString("ar-EG")}`]} targetRef={shareRef} />
        )}
      </div>
    </div>
  );
};

export default Retirement;
