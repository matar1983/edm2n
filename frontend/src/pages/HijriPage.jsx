import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { CalendarDays, ChevronRight, ChevronLeft } from "lucide-react";
import moment from "moment-hijri";

const HIJRI_MONTHS_AR = [
  "محرم", "صفر", "ربيع الأول", "ربيع الآخر",
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة",
];

const DAYS_AR_SHORT = ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];
const DAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const toArabicNum = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

const HijriPage = () => {
  const today = moment();
  const [viewYear, setViewYear] = useState(today.iYear());
  const [viewMonth, setViewMonth] = useState(today.iMonth()); // 0-based

  const monthData = useMemo(() => {
    // First day of Hijri month
    const first = moment(`${viewYear}/${viewMonth + 1}/1`, "iYYYY/iM/iD");
    const daysInMonth = first.iDaysInMonth();
    const startWeekday = first.day(); // 0=Sun...6=Sat

    const cells = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const dm = moment(`${viewYear}/${viewMonth + 1}/${d}`, "iYYYY/iM/iD");
      cells.push({
        day: d,
        gregDay: dm.date(),
        gregMonth: dm.month() + 1,
        isToday:
          dm.iYear() === today.iYear() &&
          dm.iMonth() === today.iMonth() &&
          dm.iDate() === today.iDate(),
      });
    }
    return { cells, daysInMonth };
  }, [viewYear, viewMonth, today]);

  const prevMonth = () => {
    let m = viewMonth - 1, y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    setViewMonth(m); setViewYear(y);
  };
  const nextMonth = () => {
    let m = viewMonth + 1, y = viewYear;
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m); setViewYear(y);
  };

  return (
    <div data-testid="hijri-page">
      <PageHeader
        icon={CalendarDays}
        title="التاريخ الهجري"
        subtitle="تاريخ اليوم والتقويم الشهري"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        {/* Today card */}
        <div
          className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden"
          data-testid="hijri-today-card"
        >
          <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-[hsl(var(--gold))]/10" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-2">
              تاريخ اليوم
            </div>
            <div className="text-sm text-primary-foreground/80 mb-1">
              {DAYS_AR[today.day()]}
            </div>
            <div className="font-display font-bold text-4xl sm:text-5xl">
              {toArabicNum(today.iDate())} {HIJRI_MONTHS_AR[today.iMonth()]}{" "}
              {toArabicNum(today.iYear())} هـ
            </div>
            <div className="mt-3 text-sm text-primary-foreground/70 number-display">
              يوافق {today.date()} / {today.month() + 1} / {today.year()} م
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden" data-testid="hijri-calendar">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <button
              onClick={prevMonth}
              data-testid="hijri-prev"
              className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors grid place-items-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="font-display font-bold text-lg" data-testid="hijri-month-label">
              {HIJRI_MONTHS_AR[viewMonth]} {toArabicNum(viewYear)} هـ
            </div>
            <button
              onClick={nextMonth}
              data-testid="hijri-next"
              className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors grid place-items-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 sm:p-5">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS_AR_SHORT.map((d) => (
                <div
                  key={d}
                  className="text-center text-xs font-semibold text-muted-foreground py-2"
                >
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {monthData.cells.map((cell, idx) => (
                <div key={cell ? `d-${cell.day}` : `blank-${idx}`} className="aspect-square">
                  {cell && (
                    <div
                      className={`w-full h-full rounded-lg flex flex-col items-center justify-center border transition-colors ${
                        cell.isToday
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-secondary/40 border-transparent hover:border-primary/30"
                      }`}
                      data-testid={cell.isToday ? "hijri-today-cell" : undefined}
                    >
                      <div className="font-display font-bold text-base sm:text-lg">
                        {toArabicNum(cell.day)}
                      </div>
                      <div className={`text-[10px] ${cell.isToday ? "text-primary-foreground/70" : "text-muted-foreground"} number-display`}>
                        {cell.gregDay}/{cell.gregMonth}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HijriPage;
