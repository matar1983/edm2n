import { useState, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Hash, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import {
  toArabicDigits,
  toWesternDigits,
  numberToArabicWords,
} from "@/utils/arabicNumbers";

const NumberConverter = () => {
  const [input, setInput] = useState("2025");
  const [copiedKey, setCopiedKey] = useState(null);
  const shareRef = useRef(null);

  const arabic = toArabicDigits(input);
  const western = toWesternDigits(input);
  const words = numberToArabicWords(western);

  const copy = async (val, key) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedKey(key);
      toast.success("تم النسخ");
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      toast.error("تعذّر النسخ");
    }
  };

  return (
    <div data-testid="numbers-page">
      <PageHeader icon={Hash} title="محوّل الأرقام" subtitle="عربي ↔ إنجليزي + تفقيط (رقم → كتابة)" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-4">
          <label className="text-sm font-medium mb-1.5 block">أدخل رقماً أو نصاً يحتوي أرقاماً</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            data-testid="numbers-input"
            className="w-full text-2xl font-bold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary"
            dir="auto"
          />
        </div>

        <div ref={shareRef} className="space-y-3">
          <ResultCard
            label="أرقام إنجليزية (Western)"
            value={western}
            onCopy={() => copy(western, "w")}
            copied={copiedKey === "w"}
            testid="num-western"
            dir="ltr"
          />
          <ResultCard
            label="أرقام عربية (Arabic-Indic)"
            value={arabic}
            onCopy={() => copy(arabic, "a")}
            copied={copiedKey === "a"}
            testid="num-arabic"
          />
          <ResultCard
            label="تفقيط (كتابة نصية)"
            value={words}
            onCopy={() => copy(words, "wd")}
            copied={copiedKey === "wd"}
            testid="num-words"
          />
        </div>

        <ShareResult
          title="محوّل الأرقام"
          textLines={[
            `📥 المدخل: ${input}`,
            `🔢 إنجليزي: ${western}`,
            `٠١٢ عربي: ${arabic}`,
            `📝 تفقيط: ${words}`,
          ]}
          targetRef={shareRef}
        />
      </div>
    </div>
  );
};

const ResultCard = ({ label, value, onCopy, copied, testid, dir }) => (
  <div className="bg-card border border-border rounded-2xl p-5" data-testid={testid}>
    <div className="flex items-start justify-between gap-3 mb-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <button onClick={onCopy} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-border hover:bg-secondary transition-colors">
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "منسوخ" : "نسخ"}
      </button>
    </div>
    <div dir={dir} className="font-display font-semibold text-xl break-all leading-relaxed">
      {value}
    </div>
  </div>
);

export default NumberConverter;
