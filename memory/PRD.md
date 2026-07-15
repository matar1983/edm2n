# دليل مطر الإلكتروني — PRD

## Original Problem Statement
موقع "دليل مطر الإلكتروني" باللغة العربية (RTL) يحتوي على:
- حاسبة التمويل الشخصي
- حاسبة العمر
- حاسبة النسبة المئوية
- تحويل التاريخ (ميلادي ↔ هجري)
- التاريخ الهجري (تقويم)
- أهم مواقع الذكاء الاصطناعي
- مراسلة رقم واتساب بدون إضافته
- التذييل: الحقوق مع رابط واتساب 0552211729
- برمجة وتصميم: مطر العنزي، مطر الموايقي

## Architecture
- **Frontend only** — React 19 + React Router v7 + Tailwind + shadcn.
- No backend/API required (كل الحسابات client-side).
- Hijri conversions: `moment-hijri` library.
- Fonts: Reem Kufi + Rubik + Amiri (Google Fonts).
- Design: RTL Arabic, أخضر زمردي `#0d5c4d` + ذهبي `#b8860b` + خلفية دافئة `#faf7f2`.

## Implemented (2026-02)
- `/` صفحة رئيسية بشبكة أدوات + hero
- `/finance` حاسبة قسط شهري (Annuity)
- `/age` حاسبة عمر بتفاصيل السنة/شهر/يوم + إحصاءات + عيد ميلاد قادم
- `/percent` 4 وضعيات (نسبة من عدد، كم يمثل، نسبة تغيّر، إضافة/خصم)
- `/date-convert` ميلادي↔هجري (ثنائي الاتجاه)
- `/hijri` بطاقة تاريخ اليوم + تقويم شهري تفاعلي
- `/ai` دليل مواقع AI (25 موقع) + بحث + تصنيفات
- `/whatsapp` منشئ روابط wa.me مع مفاتيح دول (20 دولة)
- تذييل موحّد يظهر الحقوق + WhatsApp `wa.me/966552211729` + أسماء المصممَين

## Backlog / Next Steps
- P1: Dark mode toggle (المتغيرات جاهزة في CSS)
- P1: PWA + install prompt
- P2: مشاركة نتائج الحسابات (نسخ/صورة)
- P2: حاسبات إضافية (قروض عقارية، ضريبة، BMI)
- P2: تحسينات SEO ووسم Schema.org
