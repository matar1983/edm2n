import { Link } from "react-router-dom";
import {
  Banknote, Cake, Percent, CalendarSync, CalendarDays, Sparkles, MessageCircle,
  ArrowLeft, Home as HomeIcon, Activity, Receipt, User, Fuel, Coins, Plane,
  Briefcase, HandCoins, Scale, Clock, Ruler, Hash, FileImage, LineChart, Gem,
  FileType2, Compass, Circle, TrendingUp, Wallet, QrCode, KeyRound, Type,
  Users, Timer, CalendarClock, GraduationCap, Palette, Rocket, Link as LinkIcon,
  Dice6, Flame, Moon, Baby, Dumbbell, Bed, Heart, PiggyBank, Zap, UserCog,
  School, Target, Braces, Code2, Binary, Paintbrush2, Globe, StopCircle,
  AlignJustify,
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
    to: "/mortgage",
    title: "حاسبة التمويل العقاري",
    desc: "احسب قسط منزلك مع الدفعة المقدمة.",
    icon: HomeIcon,
    accent: "from-indigo-500/10 to-indigo-600/5",
    testid: "tile-mortgage",
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
    to: "/bmi",
    title: "حاسبة كتلة الجسم BMI",
    desc: "قِس مؤشر كتلة جسمك واعرف تصنيفه.",
    icon: Activity,
    accent: "from-teal-500/10 to-teal-600/5",
    testid: "tile-bmi",
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
    to: "/tax",
    title: "حاسبة الضريبة VAT",
    desc: "أضف أو استخرج قيمة الضريبة من أي مبلغ.",
    icon: Receipt,
    accent: "from-orange-500/10 to-orange-600/5",
    testid: "tile-tax",
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
    accent: "from-cyan-500/10 to-cyan-600/5",
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
  {
    to: "/gold",
    title: "أسعار الذهب",
    desc: "سعر الغرام لكل عيار + حاسبة قيمة حسب الوزن.",
    icon: Gem,
    accent: "from-yellow-500/10 to-yellow-600/5",
    testid: "tile-gold",
  },
  {
    to: "/currency",
    title: "محوّل العملات",
    desc: "تحويل بين 20+ عملة بأسعار حيّة.",
    icon: Coins,
    accent: "from-emerald-500/10 to-teal-600/5",
    testid: "tile-currency",
  },
  {
    to: "/car-fuel",
    title: "استهلاك السيارة",
    desc: "لتر/100كم + التكلفة لكل كيلومتر.",
    icon: Fuel,
    accent: "from-red-500/10 to-red-600/5",
    testid: "tile-car",
  },
  {
    to: "/travel",
    title: "تكلفة السفر",
    desc: "تذاكر + فندق + مواصلات + طعام.",
    icon: Plane,
    accent: "from-blue-500/10 to-blue-600/5",
    testid: "tile-travel",
  },
  {
    to: "/eos",
    title: "نهاية الخدمة",
    desc: "مكافأة الموظف وفق نظام العمل السعودي.",
    icon: Briefcase,
    accent: "from-slate-500/10 to-slate-600/5",
    testid: "tile-eos",
  },
  {
    to: "/zakat",
    title: "حاسبة الزكاة",
    desc: "زكاة المال 2.5% مع النصاب.",
    icon: HandCoins,
    accent: "from-amber-500/10 to-amber-600/5",
    testid: "tile-zakat",
  },
  {
    to: "/inheritance",
    title: "الميراث الشرعي",
    desc: "توزيع التركة على الورثة (مبسّط).",
    icon: Scale,
    accent: "from-purple-500/10 to-purple-600/5",
    testid: "tile-inheritance",
  },
  {
    to: "/time-calc",
    title: "حاسبة الوقت",
    desc: "الفرق بين وقتين + جمع/طرح.",
    icon: Clock,
    accent: "from-cyan-500/10 to-cyan-600/5",
    testid: "tile-time",
  },
  {
    to: "/units",
    title: "محوّل الوحدات",
    desc: "متر ↔ قدم، كجم ↔ باوند، °C ↔ °F ...",
    icon: Ruler,
    accent: "from-pink-500/10 to-pink-600/5",
    testid: "tile-units",
  },
  {
    to: "/numbers",
    title: "محوّل الأرقام",
    desc: "عربي ↔ إنجليزي + تفقيط (كتابة نصية).",
    icon: Hash,
    accent: "from-sky-500/10 to-sky-600/5",
    testid: "tile-numbers",
  },
  {
    to: "/weighted-avg",
    title: "النسبة الموزونة",
    desc: "متوسط مرجّح للدرجات والأوزان.",
    icon: LineChart,
    accent: "from-indigo-500/10 to-indigo-600/5",
    testid: "tile-weighted",
  },
  {
    to: "/file-convert",
    title: "محوّل صيغ الصور",
    desc: "PNG ↔ JPG ↔ WEBP داخل المتصفح.",
    icon: FileImage,
    accent: "from-fuchsia-500/10 to-fuchsia-600/5",
    testid: "tile-file",
  },
  {
    to: "/file-tools",
    title: "مركز محوّلات الملفات",
    desc: "24 نوع تحويل: PDF, Word, Excel, HEIC, DWG, MP4...",
    icon: FileType2,
    accent: "from-orange-500/10 to-red-600/5",
    testid: "tile-file-tools",
  },
  {
    to: "/contact",
    title: "اتصل بي",
    desc: "تواصل عبر البريد الإلكتروني أو تويتر.",
    icon: User,
    accent: "from-violet-500/10 to-violet-600/5",
    testid: "tile-contact",
  },
  // ========= الجزء الجديد =========
  {
    to: "/qibla",
    title: "اتجاه القبلة",
    desc: "حدّد موقعك واعرف اتجاه المسجد الحرام.",
    icon: Compass,
    accent: "from-emerald-500/10 to-emerald-600/5",
    testid: "tile-qibla",
  },
  {
    to: "/tasbih",
    title: "عدّاد الأذكار",
    desc: "مسبحة إلكترونية مع أدعية جاهزة.",
    icon: Circle,
    accent: "from-teal-500/10 to-teal-600/5",
    testid: "tile-tasbih",
  },
  {
    to: "/investment",
    title: "نمو الاستثمار",
    desc: "فائدة مركبة + مساهمات شهرية.",
    icon: TrendingUp,
    accent: "from-green-500/10 to-green-600/5",
    testid: "tile-investment",
  },
  {
    to: "/net-salary",
    title: "الراتب الصافي",
    desc: "بعد التأمينات الاجتماعية.",
    icon: Wallet,
    accent: "from-blue-500/10 to-blue-600/5",
    testid: "tile-net-salary",
  },
  {
    to: "/qr",
    title: "مولّد QR Code",
    desc: "رمز QR لأي نص أو رابط بلمسة.",
    icon: QrCode,
    accent: "from-slate-500/10 to-slate-600/5",
    testid: "tile-qr",
  },
  {
    to: "/password",
    title: "كلمات مرور قوية",
    desc: "توليد آمن + قياس القوّة.",
    icon: KeyRound,
    accent: "from-red-500/10 to-red-600/5",
    testid: "tile-password",
  },
  {
    to: "/text-tools",
    title: "أدوات النصوص",
    desc: "عدّاد + تحويلات + إزالة تشكيل.",
    icon: Type,
    accent: "from-sky-500/10 to-sky-600/5",
    testid: "tile-text",
  },
  {
    to: "/bill-split",
    title: "قسمة الفاتورة",
    desc: "بين مجموعة أصدقاء مع البقشيش.",
    icon: Users,
    accent: "from-amber-500/10 to-amber-600/5",
    testid: "tile-bill",
  },
  {
    to: "/pomodoro",
    title: "مؤقّت التركيز",
    desc: "Pomodoro: 25 عمل + 5 استراحة.",
    icon: Timer,
    accent: "from-rose-500/10 to-rose-600/5",
    testid: "tile-pomodoro",
  },
  {
    to: "/countdown",
    title: "عدّاد تنازلي",
    desc: "كم باقي على مناسبة أو تاريخ مهم.",
    icon: CalendarClock,
    accent: "from-cyan-500/10 to-cyan-600/5",
    testid: "tile-countdown",
  },
  {
    to: "/gpa",
    title: "المعدل التراكمي GPA",
    desc: "على مقياس 4.0 أو 5.0.",
    icon: GraduationCap,
    accent: "from-indigo-500/10 to-indigo-600/5",
    testid: "tile-gpa",
  },
  {
    to: "/colors",
    title: "بالتة الألوان",
    desc: "بالتات عشوائية بضغطة زر.",
    icon: Palette,
    accent: "from-pink-500/10 to-pink-600/5",
    testid: "tile-colors",
  },
  {
    to: "/planet-age",
    title: "عمرك بالكواكب",
    desc: "كم سنة تصبح على المريخ أو المشتري؟",
    icon: Rocket,
    accent: "from-purple-500/10 to-purple-600/5",
    testid: "tile-planet",
  },
  {
    to: "/social",
    title: "فتح روابط سوشيال",
    desc: "تلغرام / سناب / إنستقرام / تيك توك.",
    icon: LinkIcon,
    accent: "from-fuchsia-500/10 to-fuchsia-600/5",
    testid: "tile-social",
  },
  {
    to: "/lottery",
    title: "سحب عشوائي / قرعة",
    desc: "اختر فائزاً من قائمة أسماء.",
    icon: Dice6,
    accent: "from-yellow-500/10 to-yellow-600/5",
    testid: "tile-lottery",
  },
  {
    to: "/calories",
    title: "السعرات اليومية",
    desc: "BMR + TDEE + خطط للوزن.",
    icon: Flame,
    accent: "from-orange-500/10 to-orange-600/5",
    testid: "tile-calories",
  },
  { to: "/ramadan", title: "رمضان", desc: "عدّاد رمضان القادم أو الحالي.", icon: Moon, accent: "from-primary/10 to-primary/5", testid: "tile-ramadan" },
  { to: "/pregnancy", title: "حاسبة الحمل", desc: "أسبوع الحمل + موعد الولادة.", icon: Baby, accent: "from-pink-500/10 to-pink-600/5", testid: "tile-pregnancy" },
  { to: "/body-comp", title: "اللياقة والدهون", desc: "% الدهون + الوزن المثالي.", icon: Dumbbell, accent: "from-red-500/10 to-red-600/5", testid: "tile-body-comp" },
  { to: "/sleep", title: "حاسبة النوم", desc: "متى تنام لتستيقظ نشيطاً.", icon: Bed, accent: "from-indigo-500/10 to-indigo-600/5", testid: "tile-sleep" },
  { to: "/wedding", title: "تكلفة الزواج", desc: "ميزانية شاملة لحفل الزفاف.", icon: Heart, accent: "from-rose-500/10 to-rose-600/5", testid: "tile-wedding" },
  { to: "/budget", title: "الميزانية الشهرية", desc: "دخل ومصاريف + نسبة التوفير.", icon: PiggyBank, accent: "from-emerald-500/10 to-emerald-600/5", testid: "tile-budget" },
  { to: "/electricity", title: "استهلاك الكهرباء", desc: "تقدير الفاتورة الشهرية.", icon: Zap, accent: "from-yellow-500/10 to-yellow-600/5", testid: "tile-electricity" },
  { to: "/retirement", title: "الوقت للتقاعد", desc: "كم باقي على تقاعدك.", icon: UserCog, accent: "from-slate-500/10 to-slate-600/5", testid: "tile-retirement" },
  { to: "/uni-score", title: "نسبة الجامعة", desc: "ثانوية + قدرات + تحصيلي.", icon: School, accent: "from-blue-500/10 to-blue-600/5", testid: "tile-uni" },
  { to: "/final-grade", title: "الدرجة النهائية", desc: "كم أحتاج في النهائي؟", icon: Target, accent: "from-purple-500/10 to-purple-600/5", testid: "tile-final-grade" },
  { to: "/json", title: "JSON Formatter", desc: "تنسيق وتصغير JSON للمطورين.", icon: Braces, accent: "from-gray-500/10 to-gray-600/5", testid: "tile-json" },
  { to: "/base64", title: "Base64", desc: "تشفير/فك تشفير النصوص.", icon: Code2, accent: "from-cyan-500/10 to-cyan-600/5", testid: "tile-base64" },
  { to: "/timestamp", title: "Unix Timestamp", desc: "بين الرقم والتاريخ.", icon: Clock, accent: "from-teal-500/10 to-teal-600/5", testid: "tile-timestamp" },
  { to: "/number-bases", title: "أنظمة العد", desc: "عشري ↔ ثنائي ↔ Hex.", icon: Binary, accent: "from-stone-500/10 to-stone-600/5", testid: "tile-bases" },
  { to: "/color-conv", title: "محوّل الألوان", desc: "HEX ↔ RGB ↔ HSL.", icon: Paintbrush2, accent: "from-fuchsia-500/10 to-fuchsia-600/5", testid: "tile-color-conv" },
  { to: "/world-clock", title: "ساعة عالمية", desc: "أوقات مدن العالم.", icon: Globe, accent: "from-sky-500/10 to-sky-600/5", testid: "tile-world-clock" },
  { to: "/stopwatch", title: "ساعة إيقاف", desc: "Stopwatch + تسجيل الأشواط.", icon: StopCircle, accent: "from-emerald-500/10 to-emerald-600/5", testid: "tile-stopwatch" },
  { to: "/hashtags", title: "مولّد هاشتاقات", desc: "هاشتاقات عربية لأي موضوع.", icon: Hash, accent: "from-violet-500/10 to-violet-600/5", testid: "tile-hashtags" },
  { to: "/lorem", title: "Lorem Ipsum عربي", desc: "نص تجريبي عربي للتصاميم.", icon: AlignJustify, accent: "from-amber-500/10 to-amber-600/5", testid: "tile-lorem" },
  { to: "/wheel", title: "دولاب الحظ", desc: "اختر عشوائياً بلمسة بصرية.", icon: Circle, accent: "from-red-500/10 to-red-600/5", testid: "tile-wheel" },
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
                    ٦١
                  </div>
                  <div className="mt-2 text-primary-foreground/80 text-sm">
                    أداة ذكيّة في مكان واحد
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
