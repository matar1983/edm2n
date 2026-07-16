import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Moon } from "lucide-react";
import moment from "moment-hijri";

const Ramadan = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(id); }, []);

  const currentHijri = moment(now);
  const currentIsRamadan = currentHijri.iMonth() === 8;
  const currentDay = currentHijri.iDate();

  // Next Ramadan 1st
  let nextRamadanYear = currentHijri.iYear();
  if (currentHijri.iMonth() > 8 || (currentHijri.iMonth() === 8 && currentDay > 30)) {
    nextRamadanYear += 1;
  } else if (!currentIsRamadan) {
    // still same year (before ramadan)
  }
  if (currentIsRamadan) nextRamadanYear += 1;

  const nextRamadan = moment(`${nextRamadanYear}/9/1`, "iYYYY/iM/iD");
  const daysToRamadan = Math.ceil((nextRamadan.toDate() - now) / (86400000));

  const toAr = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

  return (
    <div data-testid="ramadan-page">
      <PageHeader icon={Moon} title="رمضان" subtitle="عدّاد صيام + كم باقي على رمضان القادم" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12 space-y-4">
        {currentIsRamadan ? (
          <div className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 text-center" data-testid="ramadan-active">
            <div className="text-[hsl(var(--gold))] font-semibold text-sm mb-2">أنت في رمضان الآن 🌙</div>
            <div className="font-serif-ar font-bold text-3xl mb-6">شهر مبارك</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-foreground/10 rounded-xl p-4">
                <div className="text-xs text-primary-foreground/70">اليوم الحالي</div>
                <div className="font-display font-bold text-4xl number-display text-[hsl(var(--gold))]" data-testid="ramadan-current-day">{toAr(currentDay)}</div>
                <div className="text-xs text-primary-foreground/70">من ٣٠</div>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-4">
                <div className="text-xs text-primary-foreground/70">باقي على العيد</div>
                <div className="font-display font-bold text-4xl number-display text-[hsl(var(--gold))]" data-testid="ramadan-remaining">{toAr(30 - currentDay)}</div>
                <div className="text-xs text-primary-foreground/70">يوم</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 text-center" data-testid="ramadan-countdown">
            <div className="text-[hsl(var(--gold))] font-semibold text-sm mb-2">باقي على رمضان القادم</div>
            <div className="font-display font-bold text-7xl number-display" data-testid="ramadan-days-left">{toAr(daysToRamadan)}</div>
            <div className="text-primary-foreground/70 mt-2">يوم</div>
            <div className="mt-4 text-sm text-primary-foreground/80 number-display">
              رمضان {toAr(nextRamadanYear)} هـ يوافق {nextRamadan.toDate().toLocaleDateString("ar-EG")} م
            </div>
          </div>
        )}
        <div className="bg-card border border-border rounded-2xl p-5 text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">ملاحظة:</strong> بداية رمضان تعتمد على رؤية الهلال، وقد تتقدم أو تتأخر يوماً واحداً عن التقويم الحسابي المعروض هنا.
        </div>
      </div>
    </div>
  );
};

export default Ramadan;
