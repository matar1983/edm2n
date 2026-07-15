import { useState } from "react";
import { Share2, Copy, Check, Image as ImageIcon, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import * as htmlToImage from "html-to-image";

/**
 * ShareResult — reusable share widget for calculator results.
 *
 * Props:
 *  - title: string (label shown to the user, e.g. "حاسبة العمر")
 *  - textLines: string[] — lines that make up the shareable summary
 *  - targetRef: React ref pointing to the DOM node to capture as an image (optional)
 */
const ShareResult = ({ title, textLines = [], targetRef }) => {
  const [copied, setCopied] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.href : "";
  const summary = [
    `📊 ${title}`,
    ...textLines,
    "",
    `— دليل مطر الإلكتروني`,
    siteUrl,
  ].join("\n");

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("تم نسخ النتيجة");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("تعذّر النسخ");
    }
  };

  const handleCopyImage = async () => {
    if (!targetRef?.current) {
      toast.error("لا يوجد عنصر للتصوير");
      return;
    }
    try {
      const dataUrl = await htmlToImage.toPng(targetRef.current, {
        pixelRatio: 2,
        backgroundColor:
          getComputedStyle(document.body).getPropertyValue("background-color") ||
          "#faf7f2",
      });
      // Try modern clipboard API for image
      if (window.ClipboardItem) {
        const blob = await (await fetch(dataUrl)).blob();
        await navigator.clipboard.write([
          new window.ClipboardItem({ [blob.type]: blob }),
        ]);
        toast.success("تم نسخ الصورة");
        return;
      }
      // Fallback: download
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${title}.png`;
      a.click();
      toast.success("تم تنزيل الصورة");
    } catch (e) {
      // Fallback: download
      try {
        const dataUrl = await htmlToImage.toPng(targetRef.current, {
          pixelRatio: 2,
        });
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `${title}.png`;
        a.click();
        toast.success("تم تنزيل الصورة");
      } catch {
        toast.error("تعذّر إنشاء الصورة");
      }
    }
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(summary)}`;
    window.open(url, "_blank");
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(summary)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="mt-5 flex flex-wrap items-center gap-2"
      data-testid="share-result"
    >
      <div className="text-xs text-muted-foreground flex items-center gap-1.5 ml-1">
        <Share2 className="w-3.5 h-3.5" />
        مشاركة النتيجة:
      </div>
      <ShareBtn
        onClick={handleCopyText}
        testid="share-copy-text"
        label={copied ? "تم النسخ" : "نسخ النص"}
        icon={copied ? Check : Copy}
        highlight={copied}
      />
      {targetRef && (
        <ShareBtn
          onClick={handleCopyImage}
          testid="share-copy-image"
          label="صورة"
          icon={ImageIcon}
        />
      )}
      <ShareBtn
        onClick={handleWhatsApp}
        testid="share-whatsapp"
        label="واتساب"
        icon={MessageCircle}
        colorClass="text-[#25D366] border-[#25D366]/30 hover:bg-[#25D366]/10"
      />
      <ShareBtn
        onClick={handleTwitter}
        testid="share-twitter"
        label="تويتر"
        icon={XIcon}
        colorClass="text-foreground border-border hover:bg-secondary"
      />
    </div>
  );
};

const ShareBtn = ({ onClick, label, icon: Icon, testid, highlight, colorClass }) => (
  <button
    onClick={onClick}
    data-testid={testid}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
      highlight
        ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
        : colorClass ||
          "border-border text-foreground/80 hover:bg-secondary hover:text-foreground"
    }`}
  >
    <Icon className="w-3.5 h-3.5" />
    {label}
  </button>
);

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2H21l-6.55 7.49L22 22h-6.83l-4.79-6.28L4.8 22H2l7.02-8.03L2 2h6.91l4.33 5.72L18.24 2zm-2.4 18h1.88L7.24 4H5.24l10.6 16z" />
  </svg>
);

export default ShareResult;
