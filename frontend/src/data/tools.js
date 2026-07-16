import {
  Banknote, Cake, Percent, CalendarSync, CalendarDays, Sparkles, MessageCircle,
  Home as HomeIcon, Activity, Receipt, User, Fuel, Coins, Plane, Briefcase,
  HandCoins, Scale, Clock, Ruler, Hash, FileImage, LineChart, Gem, FileType2,
  Compass, Circle, TrendingUp, Wallet, QrCode, KeyRound, Type, Users, Timer,
  CalendarClock, GraduationCap, Palette, Rocket, Link as LinkIcon, Dice6,
  Flame, Moon, Baby, Dumbbell, Bed, Heart, PiggyBank, Zap, UserCog, School,
  Target, Braces, Code2, Binary, Paintbrush2, Globe, StopCircle, AlignJustify,
} from "lucide-react";

export const CATEGORIES = [
  { id: "financial", label: "مالية ومحاسبية", icon: Wallet, color: "emerald" },
  { id: "islamic", label: "إسلامية", icon: Moon, color: "teal" },
  { id: "health", label: "صحية ولياقة", icon: Heart, color: "rose" },
  { id: "education", label: "تعليمية", icon: GraduationCap, color: "indigo" },
  { id: "datetime", label: "وقت وتاريخ", icon: Clock, color: "cyan" },
  { id: "dev", label: "أدوات المطوّرين", icon: Braces, color: "slate" },
  { id: "social", label: "محتوى وسوشيال", icon: Hash, color: "violet" },
  { id: "creative", label: "إبداعية وتصميم", icon: Palette, color: "pink" },
  { id: "fun", label: "ترفيه ومسلّية", icon: Dice6, color: "amber" },
  { id: "utility", label: "أدوات عامة", icon: FileType2, color: "orange" },
];

export const TOOLS = [
  // FINANCIAL
  { to: "/finance", title: "التمويل الشخصي", desc: "قسط شهري أو أقصى تمويل حسب الراتب.", icon: Banknote, cat: "financial" },
  { to: "/mortgage", title: "التمويل العقاري", desc: "قسط منزلك مع الدفعة المقدمة.", icon: HomeIcon, cat: "financial" },
  { to: "/investment", title: "نمو الاستثمار", desc: "فائدة مركبة + مساهمات شهرية.", icon: TrendingUp, cat: "financial" },
  { to: "/net-salary", title: "الراتب الصافي", desc: "بعد التأمينات (السعودية).", icon: Wallet, cat: "financial" },
  { to: "/budget", title: "الميزانية الشهرية", desc: "دخل ومصاريف + نسبة توفير.", icon: PiggyBank, cat: "financial" },
  { to: "/tax", title: "حاسبة الضريبة (VAT)", desc: "إضافة/استخراج الضريبة.", icon: Receipt, cat: "financial" },
  { to: "/zakat", title: "حاسبة الزكاة", desc: "زكاة المال 2.5% مع النصاب.", icon: HandCoins, cat: "financial" },
  { to: "/eos", title: "نهاية الخدمة", desc: "مكافأة الموظف حسب نظام العمل.", icon: Briefcase, cat: "financial" },
  { to: "/retirement", title: "الوقت للتقاعد", desc: "كم باقي على تقاعدك.", icon: UserCog, cat: "financial" },
  { to: "/wedding", title: "تكلفة الزواج", desc: "ميزانية شاملة لحفل الزفاف.", icon: Heart, cat: "financial" },
  { to: "/electricity", title: "استهلاك الكهرباء", desc: "تقدير الفاتورة الشهرية.", icon: Zap, cat: "financial" },
  { to: "/bill-split", title: "قسمة الفاتورة", desc: "بين مجموعة أصدقاء.", icon: Users, cat: "financial" },
  { to: "/gold", title: "أسعار الذهب", desc: "سعر الغرام لكل عيار.", icon: Gem, cat: "financial" },
  { to: "/currency", title: "محوّل العملات", desc: "أسعار حيّة لـ 20+ عملة.", icon: Coins, cat: "financial" },
  { to: "/car-fuel", title: "استهلاك السيارة", desc: "لتر/100كم + التكلفة.", icon: Fuel, cat: "financial" },
  { to: "/travel", title: "تكلفة السفر", desc: "تذاكر + فندق + مواصلات.", icon: Plane, cat: "financial" },
  { to: "/inheritance", title: "الميراث الشرعي", desc: "توزيع التركة على الورثة.", icon: Scale, cat: "financial" },

  // ISLAMIC
  { to: "/qibla", title: "اتجاه القبلة", desc: "من موقعك إلى الكعبة.", icon: Compass, cat: "islamic" },
  { to: "/tasbih", title: "عدّاد الأذكار", desc: "مسبحة إلكترونية.", icon: Circle, cat: "islamic" },
  { to: "/ramadan", title: "رمضان", desc: "عدّاد رمضان القادم.", icon: Moon, cat: "islamic" },
  { to: "/hijri", title: "التاريخ الهجري", desc: "تقويم + تاريخ اليوم.", icon: CalendarDays, cat: "islamic" },

  // HEALTH
  { to: "/bmi", title: "كتلة الجسم BMI", desc: "تصنيف الوزن + المثالي.", icon: Activity, cat: "health" },
  { to: "/body-comp", title: "اللياقة والدهون", desc: "% الدهون + خصر/ورك.", icon: Dumbbell, cat: "health" },
  { to: "/calories", title: "السعرات اليومية", desc: "BMR + TDEE + خطط.", icon: Flame, cat: "health" },
  { to: "/pregnancy", title: "حاسبة الحمل", desc: "أسبوع + موعد الولادة.", icon: Baby, cat: "health" },
  { to: "/sleep", title: "حاسبة النوم", desc: "دورات 90 دقيقة.", icon: Bed, cat: "health" },
  { to: "/age", title: "حاسبة العمر", desc: "بالسنة والشهر واليوم.", icon: Cake, cat: "health" },

  // EDUCATION
  { to: "/gpa", title: "المعدل التراكمي GPA", desc: "مقياس 4.0 أو 5.0.", icon: GraduationCap, cat: "education" },
  { to: "/uni-score", title: "نسبة الجامعة", desc: "ثانوية + قدرات + تحصيلي.", icon: School, cat: "education" },
  { to: "/final-grade", title: "الدرجة النهائية", desc: "كم أحتاج في الاختبار.", icon: Target, cat: "education" },
  { to: "/weighted-avg", title: "النسبة الموزونة", desc: "متوسط مرجّح للدرجات.", icon: LineChart, cat: "education" },
  { to: "/percent", title: "النسبة المئوية", desc: "4 وضعيات للحساب.", icon: Percent, cat: "education" },

  // DATE & TIME
  { to: "/date-convert", title: "تحويل التاريخ", desc: "ميلادي ↔ هجري.", icon: CalendarSync, cat: "datetime" },
  { to: "/time-calc", title: "حاسبة الوقت", desc: "فرق + جمع/طرح.", icon: Clock, cat: "datetime" },
  { to: "/countdown", title: "عدّاد تنازلي", desc: "كم باقي على تاريخ.", icon: CalendarClock, cat: "datetime" },
  { to: "/world-clock", title: "ساعة عالمية", desc: "أوقات 12 مدينة.", icon: Globe, cat: "datetime" },
  { to: "/stopwatch", title: "ساعة إيقاف", desc: "Stopwatch + Laps.", icon: StopCircle, cat: "datetime" },
  { to: "/pomodoro", title: "بومودورو", desc: "مؤقّت التركيز.", icon: Timer, cat: "datetime" },
  { to: "/timestamp", title: "Unix Timestamp", desc: "رقم ↔ تاريخ.", icon: Clock, cat: "datetime" },

  // DEV
  { to: "/json", title: "JSON Formatter", desc: "تنسيق وتصغير.", icon: Braces, cat: "dev" },
  { to: "/base64", title: "Base64", desc: "تشفير/فك تشفير.", icon: Code2, cat: "dev" },
  { to: "/number-bases", title: "أنظمة العد", desc: "Dec ↔ Bin ↔ Hex.", icon: Binary, cat: "dev" },
  { to: "/color-conv", title: "محوّل الألوان", desc: "HEX ↔ RGB ↔ HSL.", icon: Paintbrush2, cat: "dev" },
  { to: "/qr", title: "مولّد QR Code", desc: "لأي نص أو رابط.", icon: QrCode, cat: "dev" },
  { to: "/password", title: "كلمات مرور", desc: "قوية + قياس القوة.", icon: KeyRound, cat: "dev" },
  { to: "/numbers", title: "محوّل الأرقام", desc: "عربي/إنجليزي + تفقيط.", icon: Hash, cat: "dev" },

  // SOCIAL/CONTENT
  { to: "/whatsapp", title: "مراسلة واتساب", desc: "بدون إضافة الرقم.", icon: MessageCircle, cat: "social" },
  { to: "/social", title: "روابط سوشيال", desc: "سناب/تلغرام/إنستقرام.", icon: LinkIcon, cat: "social" },
  { to: "/hashtags", title: "مولّد هاشتاقات", desc: "عربية لأي موضوع.", icon: Hash, cat: "social" },
  { to: "/text-tools", title: "أدوات النصوص", desc: "عدّاد + تحويلات.", icon: Type, cat: "social" },
  { to: "/lorem", title: "Lorem عربي", desc: "نص تجريبي عربي.", icon: AlignJustify, cat: "social" },
  { to: "/ai", title: "مواقع الذكاء AI", desc: "دليل 25 أداة AI.", icon: Sparkles, cat: "social" },

  // CREATIVE
  { to: "/colors", title: "بالتة الألوان", desc: "بالتات عشوائية.", icon: Palette, cat: "creative" },
  { to: "/file-convert", title: "محوّل الصور", desc: "PNG ↔ JPG ↔ WEBP.", icon: FileImage, cat: "creative" },
  { to: "/file-tools", title: "محوّلات ملفات", desc: "24 نوع (PDF/Word/...).", icon: FileType2, cat: "creative" },

  // FUN
  { to: "/wheel", title: "دولاب الحظ", desc: "اختر عشوائياً بصرياً.", icon: Circle, cat: "fun" },
  { to: "/lottery", title: "قرعة / سحب", desc: "اختر فائزاً من قائمة.", icon: Dice6, cat: "fun" },
  { to: "/planet-age", title: "عمرك بالكواكب", desc: "على المريخ والمشتري.", icon: Rocket, cat: "fun" },

  // UTILITY
  { to: "/units", title: "محوّل الوحدات", desc: "طول/وزن/حرارة.", icon: Ruler, cat: "utility" },
  { to: "/contact", title: "اتصل بي", desc: "تواصل عبر البريد وتويتر.", icon: User, cat: "utility" },
];

export const findCategory = (id) => CATEGORIES.find((c) => c.id === id);
export const toolsInCategory = (id) => TOOLS.filter((t) => t.cat === id);
