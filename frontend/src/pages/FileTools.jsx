import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import {
  FileType2,
  ArrowLeft,
  ExternalLink,
  Zap,
  FileText,
  Image as ImageIcon,
  Film,
  Layers,
  Sparkles,
} from "lucide-react";

/**
 * File Conversion Hub
 * - "internal" conversions handled by our own /file-convert page
 * - "external" conversions link to reputable free services (iLovePDF, CloudConvert)
 */

const CATEGORIES = [
  { id: "all", label: "الكل", icon: Layers },
  { id: "pdf", label: "PDF", icon: FileText },
  { id: "image", label: "الصور", icon: ImageIcon },
  { id: "doc", label: "المستندات", icon: FileText },
  { id: "media", label: "الوسائط", icon: Film },
  { id: "cad", label: "هندسي CAD", icon: Sparkles },
];

const CONVERSIONS = [
  // PDF conversions (iLovePDF)
  { from: "PDF", to: "Word", cat: "pdf", provider: "iLovePDF", url: "https://www.ilovepdf.com/pdf_to_word", desc: "PDF إلى مستند Word قابل للتحرير" },
  { from: "Word", to: "PDF", cat: "doc", provider: "iLovePDF", url: "https://www.ilovepdf.com/word_to_pdf", desc: "مستند Word إلى PDF" },
  { from: "PDF", to: "Excel", cat: "pdf", provider: "iLovePDF", url: "https://www.ilovepdf.com/pdf_to_excel", desc: "PDF إلى جداول Excel" },
  { from: "Excel", to: "PDF", cat: "doc", provider: "iLovePDF", url: "https://www.ilovepdf.com/excel_to_pdf", desc: "Excel إلى PDF" },
  { from: "PDF", to: "PPTX", cat: "pdf", provider: "iLovePDF", url: "https://www.ilovepdf.com/pdf_to_powerpoint", desc: "PDF إلى عرض PowerPoint" },
  { from: "PowerPoint", to: "PDF", cat: "doc", provider: "iLovePDF", url: "https://www.ilovepdf.com/powerpoint_to_pdf", desc: "PowerPoint إلى PDF" },
  { from: "PDF", to: "JPG", cat: "pdf", provider: "iLovePDF", url: "https://www.ilovepdf.com/pdf_to_jpg", desc: "استخراج صور من PDF" },
  { from: "PDF", to: "JPEG", cat: "pdf", provider: "iLovePDF", url: "https://www.ilovepdf.com/pdf_to_jpg", desc: "PDF إلى JPEG" },
  { from: "Image", to: "PDF", cat: "image", provider: "iLovePDF", url: "https://www.ilovepdf.com/jpg_to_pdf", desc: "دمج صور في ملف PDF" },
  { from: "HTML", to: "PDF", cat: "doc", provider: "iLovePDF", url: "https://www.ilovepdf.com/html-to-pdf", desc: "صفحة ويب إلى PDF" },
  { from: "PDF", to: "HTML", cat: "pdf", provider: "CloudConvert", url: "https://cloudconvert.com/pdf-to-html", desc: "PDF إلى صفحة HTML" },
  { from: "PDF", to: "TXT", cat: "pdf", provider: "CloudConvert", url: "https://cloudconvert.com/pdf-to-txt", desc: "استخراج النص من PDF" },
  { from: "PDF", to: "EPUB", cat: "pdf", provider: "CloudConvert", url: "https://cloudconvert.com/pdf-to-epub", desc: "PDF إلى كتاب إلكتروني EPUB" },
  { from: "PDF", to: "SVG", cat: "pdf", provider: "CloudConvert", url: "https://cloudconvert.com/pdf-to-svg", desc: "PDF إلى صور SVG قابلة للتكبير" },

  // Image conversions
  { from: "PNG", to: "JPG", cat: "image", internal: true, desc: "PNG إلى JPG (داخل المتصفح)" },
  { from: "Image", to: "JPG", cat: "image", internal: true, desc: "أي صورة إلى JPG (داخل المتصفح)" },
  { from: "HEIC", to: "JPG", cat: "image", provider: "CloudConvert", url: "https://cloudconvert.com/heic-to-jpg", desc: "صور أيفون HEIC إلى JPG" },
  { from: "JPEG", to: "EPS", cat: "image", provider: "CloudConvert", url: "https://cloudconvert.com/jpg-to-eps", desc: "JPEG إلى Encapsulated PostScript" },
  { from: "PNG", to: "EPS", cat: "image", provider: "CloudConvert", url: "https://cloudconvert.com/png-to-eps", desc: "PNG إلى EPS" },
  { from: "Image", to: "Word", cat: "image", provider: "iLovePDF", url: "https://www.ilovepdf.com/jpg-to-word", desc: "OCR للصورة إلى Word" },

  // CAD
  { from: "DWG", to: "PDF", cat: "cad", provider: "CloudConvert", url: "https://cloudconvert.com/dwg-to-pdf", desc: "AutoCAD DWG إلى PDF" },
  { from: "PDF", to: "DXF", cat: "cad", provider: "CloudConvert", url: "https://cloudconvert.com/pdf-to-dxf", desc: "PDF إلى DXF (AutoCAD)" },

  // Media
  { from: "MP4", to: "MP3", cat: "media", provider: "CloudConvert", url: "https://cloudconvert.com/mp4-to-mp3", desc: "استخراج الصوت من الفيديو" },
  { from: "Video", to: "GIF", cat: "media", provider: "CloudConvert", url: "https://cloudconvert.com/mp4-to-gif", desc: "فيديو إلى GIF متحرك" },
];

const FileTools = () => {
  const totalInternal = CONVERSIONS.filter((c) => c.internal).length;
  const totalExternal = CONVERSIONS.length - totalInternal;

  return (
    <div data-testid="file-tools-page">
      <PageHeader
        icon={FileType2}
        title="مركز محوّلات الملفات"
        subtitle={`${CONVERSIONS.length} نوع تحويل — بعضها داخل المتصفح والباقي عبر خدمات مجانية موثوقة`}
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-12">
        {/* Info banner */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white grid place-items-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-emerald-900 dark:text-emerald-100">
                  {totalInternal} تحويل داخل المتصفح
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                  لا يتم رفع ملفاتك — تحويل فوري وآمن
                </div>
              </div>
            </div>
          </div>
          <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white grid place-items-center shrink-0">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-sky-900 dark:text-sky-100">
                  {totalExternal} تحويل عبر خدمات موثوقة
                </div>
                <div className="text-xs text-sky-700 dark:text-sky-300 mt-1">
                  iLovePDF و CloudConvert — الأفضل مجاناً
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" data-testid="file-tools-grid">
          {CONVERSIONS.map((c) => (
            <ConversionCard key={`${c.from}-${c.to}`} {...c} />
          ))}
        </div>

        <div className="mt-6 text-xs text-muted-foreground leading-relaxed bg-secondary/40 border border-border rounded-xl p-4">
          <strong className="text-foreground">ملاحظة:</strong> الخدمات الخارجية (iLovePDF, CloudConvert) توفّر
          تحويلاً مجانياً بحد معقول من الحجم اليومي. للاستخدام الكثيف قد تحتاج اشتراكاً مدفوعاً لديهم.
          كل الروابط تفتح في تبويب جديد.
        </div>
      </div>
    </div>
  );
};

const ConversionCard = ({ from, to, desc, internal, provider, url, cat }) => {
  const testid = `conv-${from.toLowerCase()}-to-${to.toLowerCase()}`;

  const Inner = (
    <>
      <div className="flex items-center gap-2 mb-3">
        <FormatBadge label={from} />
        <ArrowLeft className="w-4 h-4 text-muted-foreground shrink-0" />
        <FormatBadge label={to} highlight />
      </div>
      <div className="text-sm text-foreground/80 mb-3 leading-relaxed line-clamp-2">
        {desc}
      </div>
      <div className="flex items-center justify-between gap-2">
        {internal ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            <Zap className="w-3 h-3" />
            داخل المتصفح
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300">
            <ExternalLink className="w-3 h-3" />
            {provider}
          </span>
        )}
        <span className="text-primary text-xs font-semibold inline-flex items-center gap-1">
          ابدأ
          <ArrowLeft className="w-3.5 h-3.5" />
        </span>
      </div>
    </>
  );

  if (internal) {
    return (
      <Link
        to="/file-convert"
        data-testid={testid}
        className="tile-hover bg-card border border-border rounded-2xl p-5 block group"
      >
        {Inner}
      </Link>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      data-testid={testid}
      className="tile-hover bg-card border border-border rounded-2xl p-5 block group"
    >
      {Inner}
    </a>
  );
};

const FormatBadge = ({ label, highlight }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold font-display ${
      highlight
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-foreground border border-border"
    }`}
    dir="ltr"
  >
    {label}
  </span>
);

export default FileTools;
