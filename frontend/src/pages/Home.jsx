import { Link } from "react-router-dom";
import {
  Banknote,
  Cake,
  Percent,
  CalendarSync,
  CalendarDays,
  Sparkles,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";

const tiles = [
  {
    to: "/finance",
    title: "حاسبة التمويل الشخصي",
    desc: "احسب القسط الشهري وإجمالي التكلفة بدقة.",
    icon: Banknote,
    accent: "from-emerald-500/10 to-emerald-600/5",
    testid: "tile-finance",
  },
  {
    to: "/age",
    title: "حاسبة العمر",
    desc: "احسب عمرك بالسنة والشهر واليوم والساعة.",
    icon: Cake,
    accent: "from-amber-500/10 to-amber-600/5",
    testid: "tile-age",
  },
  {
    to: "/percent",
    title: "حاسبة النسبة المئوية",
    desc: "زيادة، نقصان، نسبة من عدد، والفرق بين رقمين.",
    icon: Percent,
    accent: "from-sky-500/10 to-sky-600/5",
    testid: "tile-percent",
  },
  {
    to: "/date-convert",
    title: "تحويل التاريخ",
    desc: "بين الميلادي والهجري باتجاهين.",
    icon: CalendarSync,
    accent: "from-fuchsia-500/10 to-fuchsia-600/5",
    testid: "tile-date-convert",
  },
  {
    to: "/hijri",
    title: "التاريخ الهجري",
    desc: "تاريخ اليوم وتقويم شهري بالتقويم الهجري.",
    icon: CalendarDays,
    accent: "from-teal-500/10 to-teal-600/5",
    testid: "tile-hijri",
  },
  {
    to: "/ai",
    title: "مواقع الذكاء الاصطناعي",
    desc: "أهم أدوات الـ AI مصنفة حسب المجال.",
    icon: Sparkles,
    accent: "from-rose-500/10 to-rose-600/5",
    testid: "tile-ai",
  },
  {
    to: "/whatsapp",
    title: "مراسلة رقم واتساب",
    desc: "أرسل رسالة لأي رقم بدون إضافته لجهات الاتصال.",
    icon: MessageCircle,
    accent: "from-lime-500/10 to-lime-600/5",
    testid: "tile-whatsapp",
  },
];

const Home = () => {
  return (
    <div data-testid="home-page">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-16 pb-8">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]" />
              دليل مطر الإلكتروني
            </div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-foreground">
              أدوات <span className="text-primary">أنيقة</span> بين يديك
              <br />
              <span className="font-serif-ar italic text-[hsl(var(--gold))]">
                حاسبات ومحوّلات
              </span>{" "}
              يومية
            </h1>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              مجموعة أدوات عربية مصممة بذوق — حاسبة تمويل، حاسبة عمر، محوّل تاريخ،
              دليل مواقع الذكاء الاصطناعي، ومراسلة واتساب بدون إضافة الرقم.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/finance"
                data-testid="hero-cta-finance"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                جرّب حاسبة التمويل
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                to="/ai"
                data-testid="hero-cta-ai"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-primary/20 text-foreground font-medium hover:border-primary/50 transition-colors"
              >
                مواقع الذكاء الاصطناعي
              </Link>
            </div>
          </div>

          {/* Decorative panel */}
          <div className="relative hidden md:block">
            <div className="relative aspect-square rounded-[2rem] bg-primary p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <pattern
                      id="arabic-pattern"
                      x="0"
                      y="0"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M20 0 L40 20 L20 40 L0 20 Z"
                        fill="none"
                        stroke="rgb(255,255,255)"
                        strokeWidth="0.8"
                      />
                      <circle cx="20" cy="20" r="6" fill="none" stroke="rgb(255,255,255)" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="200" height="200" fill="url(#arabic-pattern)" />
                </svg>
              </div>
              <div className="relative h-full flex flex-col justify-between text-primary-foreground">
                <div className="text-xs font-semibold text-[hsl(var(--gold))] uppercase tracking-widest">
                  Dalil Matar
                </div>
                <div>
                  <div className="font-serif-ar text-6xl leading-none text-[hsl(var(--gold))]">
                    ٧
                  </div>
                  <div className="mt-2 text-primary-foreground/80 text-sm">
                    أدوات ذكيّة في مكان واحد
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-[hsl(var(--gold))] rotate-6 -z-10" />
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display font-bold text-2xl">أدوات الموقع</h2>
          <div className="text-sm text-muted-foreground">اختر ما يناسبك</div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tiles.map((t, i) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                data-testid={t.testid}
                className={`tile-hover relative bg-card border border-border rounded-2xl p-6 overflow-hidden group`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-bl ${t.accent} opacity-60 pointer-events-none`}
                />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-display font-bold text-lg mb-1">
                    {t.title}
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {t.desc}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    ابدأ الآن
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
