import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { CalendarSync, ArrowLeftRight } from "lucide-react";
import moment from "moment-hijri";

const HIJRI_MONTHS_AR = [
  "محرم", "صفر", "ربيع الأول", "ربيع الآخر",
  "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان",
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة",
];

const GREG_MONTHS_AR = [
  "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
];

const DAYS_AR = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const toArabicNum = (n) =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

const DateConverter = () => {
  const [mode, setMode] = useState("g2h"); // g2h or h2g

  return (
    <div data-testid="date-convert-page">
      <PageHeader
        icon={CalendarSync}
        title="تحويل التاريخ"
        subtitle="بين الميلادي والهجري بدقة"
      />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="flex bg-secondary rounded-full p-1 mb-6 w-fit mx-auto" data-testid="convert-mode-toggle">
          <button
            onClick={() => setMode("g2h")}
            data-testid="mode-g2h"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "g2h" ? "bg-primary text-primary-foreground" : "text-foreground/70"
            }`}
          >
            ميلادي → هجري
          </button>
          <button
            onClick={() => setMode("h2g")}
            data-testid="mode-h2g"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              mode === "h2g" ? "bg-primary text-primary-foreground" : "text-foreground/70"
            }`}
          >
            هجري → ميلادي
          </button>
        </div>

        {mode === "g2h" ? <GregToHijri /> : <HijriToGreg />}
      </div>
    </div>
  );
};

const GregToHijri = () => {
  const [d, setD] = useState(new Date().toISOString().substring(0, 10));
  const shareRef = useRef(null);

  const result = useMemo(() => {
    if (!d) return null;
    const m = moment(d, "YYYY-MM-DD");
    if (!m.isValid()) return null;
    return {
      day: m.iDate(),
      month: m.iMonth(),
      year: m.iYear(),
      weekday: DAYS_AR[m.day()],
      gregLabel: `${m.date()} ${GREG_MONTHS_AR[m.month()]} ${m.year()}`,
    };
  }, [d]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <label className="block mb-6">
        <span className="text-sm font-medium mb-1.5 block">التاريخ الميلادي</span>
        <input
          type="date"
          value={d}
          onChange={(e) => setD(e.target.value)}
          data-testid="g2h-input"
          className="w-full text-lg number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      {result && (
        <>
          <div ref={shareRef}>
            <ConversionResult
              fromLabel="الميلادي"
              fromValue={result.gregLabel}
              arrowIcon
              toLabel="الهجري"
              toValue={`${toArabicNum(result.day)} ${HIJRI_MONTHS_AR[result.month]} ${toArabicNum(result.year)} هـ`}
              weekday={result.weekday}
              testid="g2h-result"
            />
          </div>
          <ShareResult
            title="تحويل التاريخ ميلادي → هجري"
            textLines={[
              `📆 ${result.weekday}`,
              `الميلادي: ${result.gregLabel}`,
              `الهجري: ${toArabicNum(result.day)} ${HIJRI_MONTHS_AR[result.month]} ${toArabicNum(result.year)} هـ`,
            ]}
            targetRef={shareRef}
          />
        </>
      )}
    </div>
  );
};

const HijriToGreg = () => {
  const now = moment();
  const [y, setY] = useState(String(now.iYear()));
  const [m, setM] = useState(String(now.iMonth()));
  const [d, setD] = useState(String(now.iDate()));
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const yy = parseInt(y), mm = parseInt(m), dd = parseInt(d);
    if (isNaN(yy) || isNaN(mm) || isNaN(dd) || dd < 1 || dd > 30) return null;
    const hm = moment(`${yy}/${mm + 1}/${dd}`, "iYYYY/iM/iD");
    if (!hm.isValid()) return null;
    return {
      gregLabel: `${hm.date()} ${GREG_MONTHS_AR[hm.month()]} ${hm.year()}`,
      weekday: DAYS_AR[hm.day()],
      hijriLabel: `${toArabicNum(dd)} ${HIJRI_MONTHS_AR[mm]} ${toArabicNum(yy)} هـ`,
    };
  }, [y, m, d]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">اليوم</span>
          <input
            type="number"
            min="1"
            max="30"
            value={d}
            onChange={(e) => setD(e.target.value)}
            data-testid="h2g-day"
            className="w-full text-lg number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">الشهر</span>
          <select
            value={m}
            onChange={(e) => setM(e.target.value)}
            data-testid="h2g-month"
            className="w-full text-base bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {HIJRI_MONTHS_AR.map((name, idx) => (
              <option key={idx} value={idx}>{name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">السنة</span>
          <input
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            data-testid="h2g-year"
            className="w-full text-lg number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      {result && (
        <>
          <div ref={shareRef}>
            <ConversionResult
              fromLabel="الهجري"
              fromValue={result.hijriLabel}
              arrowIcon
              toLabel="الميلادي"
              toValue={result.gregLabel}
              weekday={result.weekday}
              testid="h2g-result"
            />
          </div>
          <ShareResult
            title="تحويل التاريخ هجري → ميلادي"
            textLines={[
              `📆 ${result.weekday}`,
              `الهجري: ${result.hijriLabel}`,
              `الميلادي: ${result.gregLabel}`,
            ]}
            targetRef={shareRef}
          />
        </>
      )}
    </div>
  );
};

const ConversionResult = ({ fromLabel, fromValue, toLabel, toValue, weekday, testid }) => (
  <div className="mt-2 rounded-2xl border border-primary/20 bg-primary/5 p-5" data-testid={testid}>
    <div className="text-xs text-primary font-semibold mb-3">{weekday}</div>
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex-1 min-w-[140px]">
        <div className="text-xs text-muted-foreground mb-1">{fromLabel}</div>
        <div className="font-display font-semibold text-lg">{fromValue}</div>
      </div>
      <ArrowLeftRight className="w-5 h-5 text-primary shrink-0" />
      <div className="flex-1 min-w-[140px]">
        <div className="text-xs text-muted-foreground mb-1">{toLabel}</div>
        <div className="font-display font-bold text-xl text-primary">{toValue}</div>
      </div>
    </div>
  </div>
);

export default DateConverter;
