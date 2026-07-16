import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Globe } from "lucide-react";

const CITIES = [
  { name: "الرياض", tz: "Asia/Riyadh" },
  { name: "مكة المكرمة", tz: "Asia/Riyadh" },
  { name: "دبي", tz: "Asia/Dubai" },
  { name: "الكويت", tz: "Asia/Kuwait" },
  { name: "القاهرة", tz: "Africa/Cairo" },
  { name: "بيروت", tz: "Asia/Beirut" },
  { name: "إسطنبول", tz: "Europe/Istanbul" },
  { name: "لندن", tz: "Europe/London" },
  { name: "باريس", tz: "Europe/Paris" },
  { name: "نيويورك", tz: "America/New_York" },
  { name: "طوكيو", tz: "Asia/Tokyo" },
  { name: "سيدني", tz: "Australia/Sydney" },
];

const WorldClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);

  return (
    <div data-testid="world-clock-page">
      <PageHeader icon={Globe} title="ساعة عالمية" subtitle="أوقات المدن الكبرى حول العالم" />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" data-testid="clock-cities">
          {CITIES.map((c) => {
            const time = now.toLocaleTimeString("ar-EG", { timeZone: c.tz, hour: "2-digit", minute: "2-digit", second: "2-digit" });
            const date = now.toLocaleDateString("ar-EG", { timeZone: c.tz, weekday: "long", day: "numeric", month: "short" });
            const hour = new Date(now.toLocaleString("en-US", { timeZone: c.tz })).getHours();
            const isNight = hour < 6 || hour >= 20;
            return (
              <div key={c.name} className={`rounded-2xl p-5 border ${isNight ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"}`} data-testid={`clock-${c.tz}`}>
                <div className={`text-xs mb-1 ${isNight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {isNight ? "🌙 ليل" : "☀️ نهار"}
                </div>
                <div className="font-display font-bold text-lg">{c.name}</div>
                <div dir="ltr" className={`font-display font-bold text-4xl number-display mt-2 ${isNight ? "text-[hsl(var(--gold))]" : "text-primary"}`}>
                  {time}
                </div>
                <div className={`text-xs mt-1 ${isNight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{date}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorldClock;
