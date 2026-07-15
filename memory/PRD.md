# دليل مطر الإلكتروني — PRD

## Original Problem Statement
موقع "دليل مطر الإلكتروني" باللغة العربية (RTL) — أدوات وحاسبات ومحوّلات.
- التذييل: الحقوق مع رابط واتساب `0552211729`
- برمجة وتصميم: مطر العنزي، مطر الموايقي

## Architecture
- **Frontend only** — React 19 + React Router v7 + Tailwind + shadcn + sonner.
- No backend required (كل الحسابات client-side).
- Hijri conversions: `moment-hijri`
- Screenshot capture: `html-to-image`
- Fonts: Reem Kufi + Rubik + Amiri (Google Fonts).
- Theme: RTL Arabic, أخضر زمردي `#0d5c4d` + ذهبي `#b8860b` + خلفية دافئة `#faf7f2`.
- Dark mode: ThemeProvider مع حفظ في localStorage.

## Implemented (2026-02)
### Pages (10)
- `/` رئيسية بشبكة الأدوات + hero
- `/finance` حاسبة قسط شهري (Annuity)
- `/mortgage` حاسبة تمويل عقاري (سعر + دفعة مقدمة + نسبة + مدة)
- `/age` حاسبة عمر (سنوات/شهور/أيام + إحصاءات + عيد ميلاد قادم)
- `/bmi` حاسبة كتلة الجسم مع التصنيف والوزن المثالي
- `/percent` حاسبة نسبة (4 أوضاع)
- `/tax` حاسبة ضريبة VAT (إضافة/استخراج + presets)
- `/date-convert` تحويل ميلادي↔هجري ثنائي الاتجاه
- `/hijri` بطاقة اليوم + تقويم شهري هجري
- `/ai` دليل ٢٥ موقع AI مع بحث + تصنيفات
- `/whatsapp` مُنشئ روابط wa.me مع مفاتيح ٢٠ دولة

### Features
- **زر تبديل الوضع الداكن** في الهيدر (يحفظ في localStorage + prefers-color-scheme)
- **مشاركة النتائج**: زر مشاركة موحّد `ShareResult` في كل حاسبة يحتوي:
  - نسخ ملخص نصي جاهز
  - نسخ/تنزيل صورة PNG للنتيجة (html-to-image)
  - مشاركة عبر واتساب مباشرة
  - مشاركة عبر تويتر
- تذييل موحّد بجميع الصفحات + رابط `wa.me/966552211729`

## Backlog / Next Steps
- P1: تحويل الموقع إلى PWA + تثبيت على الجوال
- P2: حاسبات إضافية (استهلاك السيارة، سعر الصرف)
- P2: SEO + Schema.org (Calculator markup)
- P2: تحسين accessibility (ARIA labels، keyboard navigation)
