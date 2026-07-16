import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Baby } from "lucide-react";

const Pregnancy = () => {
  const [lmp, setLmp] = useState(""); // last menstrual period
  const shareRef = useRef(null);

  const result = useMemo(() => {
    if (!lmp) return null;
    const start = new Date(lmp);
    if (isNaN(start)) return null;
    const now = new Date();
    const days = Math.floor((now - start) / 86400000);
    if (days < 0 || days > 300) return null;
    const weeks = Math.floor(days / 7);
    const dayInWeek = days % 7;
    const trimester = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;
    const dueDate = new Date(start.getTime() + 280 * 86400000);
    const daysToBirth = Math.ceil((dueDate - now) / 86400000);
    return { days, weeks, dayInWeek, trimester, dueDate, daysToBirth };
  }, [lmp]);

  const stages = {
    1: "الثلث الأول: تكوّن الأعضاء الرئيسية",
    2: "الثلث الثاني: نمو سريع، قد تشعرين بالحركات",
    3: "الثلث الأخير: اكتمال الأعضاء والاستعداد للولادة",
  };

  return (
    <div data-testid="pregnancy-page">
      <PageHeader icon={Baby} title="حاسبة الحمل" subtitle="أسبوع الحمل + موعد الولادة المتوقع" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">أول يوم لآخر دورة (LMP)</span>
            <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} data-testid="preg-lmp"
              className="w-full text-lg number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
          </label>
        </div>
        {result && (
          <>
            <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8" data-testid="preg-result">
              <div className="text-xs text-[hsl(var(--gold))] font-semibold mb-1">أسبوع الحمل</div>
              <div className="font-display font-bold text-5xl number-display" data-testid="preg-weeks">
                {result.weeks}<span className="text-lg text-primary-foreground/70 mr-2">أسبوع</span>
                {" و "}
                {result.dayInWeek}<span className="text-lg text-primary-foreground/70 mr-2">يوم</span>
              </div>
              <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))]" data-testid="preg-trimester">
                الثلث {["", "الأول", "الثاني", "الثالث"][result.trimester]}
              </div>
              <div className="mt-3 text-sm text-primary-foreground/80">{stages[result.trimester]}</div>
              <div className="mt-6 space-y-3">
                <Row label="موعد الولادة المتوقع" v={result.dueDate.toLocaleDateString("ar-EG")} highlight t="preg-due" />
                <Row label="باقي حتى الولادة" v={`${result.daysToBirth} يوم`} t="preg-remaining" />
                <Row label="إجمالي الأيام" v={`${result.days} يوم`} t="preg-days" />
              </div>
            </div>
            <ShareResult title="حاسبة الحمل"
              textLines={[
                `🤰 أسبوع ${result.weeks} + ${result.dayInWeek} يوم`,
                `📅 موعد الولادة: ${result.dueDate.toLocaleDateString("ar-EG")}`,
                `⏳ باقي ${result.daysToBirth} يوم`,
              ]} targetRef={shareRef} />
          </>
        )}
        <div className="mt-4 text-xs text-muted-foreground bg-secondary/40 rounded-xl p-4">
          <strong className="text-foreground">تنبيه:</strong> هذه حاسبة استرشادية، ولا تُغني عن استشارة الطبيب المختص.
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, v, highlight, t }) => (
  <div className="flex items-center justify-between gap-3 pb-2 border-b border-primary-foreground/10">
    <span className="text-sm text-primary-foreground/70">{label}</span>
    <span className={`font-semibold number-display ${highlight ? "text-[hsl(var(--gold))]" : ""}`} data-testid={t}>{v}</span>
  </div>
);

export default Pregnancy;
