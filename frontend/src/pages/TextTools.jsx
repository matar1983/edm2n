import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Type, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const removeTashkeel = (s) => s.replace(/[\u064B-\u065F\u0670\u0640]/g, "");
const reverse = (s) => Array.from(s).reverse().join("");

const TextTools = () => {
  const [text, setText] = useState("مرحباً بكم في دليل مطر");
  const [copied, setCopied] = useState(null);

  const stats = {
    chars: text.length,
    charsNoSpace: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text.split("\n").length,
    sentences: text.split(/[.!?؟।。]+/).filter((s) => s.trim()).length,
  };

  const outputs = [
    { key: "upper", label: "أحرف كبيرة (Latin)", value: text.toUpperCase() },
    { key: "lower", label: "أحرف صغيرة (Latin)", value: text.toLowerCase() },
    { key: "reverse", label: "معكوس النص", value: reverse(text) },
    { key: "notashkeel", label: "بدون تشكيل", value: removeTashkeel(text) },
    { key: "trim", label: "بدون مسافات إضافية", value: text.replace(/\s+/g, " ").trim() },
    { key: "camel", label: "أول حرف كبير من كل كلمة", value: text.toLowerCase().replace(/(^|\s)([a-z])/g, (_, s, c) => s + c.toUpperCase()) },
  ];

  const copy = async (key, val) => {
    await navigator.clipboard.writeText(val);
    setCopied(key);
    toast.success("تم النسخ");
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div data-testid="text-tools-page">
      <PageHeader icon={Type} title="أدوات النصوص" subtitle="تحويلات + عدّاد الكلمات والأحرف" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 mb-4">
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows="6" data-testid="tt-input"
            dir="auto"
            className="w-full text-base bg-secondary/50 border border-border rounded-xl px-4 py-3 resize-y focus:outline-none focus:border-primary" />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <Stat label="الأحرف" v={stats.chars} t="tt-chars" />
            <Stat label="بدون مسافات" v={stats.charsNoSpace} t="tt-nospace" />
            <Stat label="الكلمات" v={stats.words} t="tt-words" />
            <Stat label="الأسطر" v={stats.lines} t="tt-lines" />
            <Stat label="الجُمل" v={stats.sentences} t="tt-sentences" />
          </div>
        </div>

        <div className="space-y-3">
          {outputs.map((o) => (
            <div key={o.key} className="bg-card border border-border rounded-xl p-4" data-testid={`tt-out-${o.key}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="text-xs text-muted-foreground">{o.label}</div>
                <button onClick={() => copy(o.key, o.value)} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-border hover:bg-secondary">
                  {copied === o.key ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === o.key ? "منسوخ" : "نسخ"}
                </button>
              </div>
              <div dir="auto" className="text-base font-medium break-all">
                {o.value || <span className="text-muted-foreground">—</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, v, t }) => (
  <div className="bg-secondary/40 rounded-lg px-3 py-2 text-center">
    <div className="text-xs text-muted-foreground">{label}</div>
    <div className="font-display font-bold text-xl number-display text-primary" data-testid={t}>{v.toLocaleString("ar-EG")}</div>
  </div>
);

export default TextTools;
