import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { MessageCircle, Send, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const COUNTRIES = [
  { code: "966", name: "السعودية 🇸🇦" },
  { code: "971", name: "الإمارات 🇦🇪" },
  { code: "965", name: "الكويت 🇰🇼" },
  { code: "974", name: "قطر 🇶🇦" },
  { code: "973", name: "البحرين 🇧🇭" },
  { code: "968", name: "عُمان 🇴🇲" },
  { code: "20", name: "مصر 🇪🇬" },
  { code: "962", name: "الأردن 🇯🇴" },
  { code: "961", name: "لبنان 🇱🇧" },
  { code: "964", name: "العراق 🇮🇶" },
  { code: "212", name: "المغرب 🇲🇦" },
  { code: "213", name: "الجزائر 🇩🇿" },
  { code: "216", name: "تونس 🇹🇳" },
  { code: "218", name: "ليبيا 🇱🇾" },
  { code: "967", name: "اليمن 🇾🇪" },
  { code: "970", name: "فلسطين 🇵🇸" },
  { code: "963", name: "سوريا 🇸🇾" },
  { code: "1", name: "الولايات المتحدة 🇺🇸" },
  { code: "44", name: "المملكة المتحدة 🇬🇧" },
  { code: "90", name: "تركيا 🇹🇷" },
];

const cleanNumber = (num, code) => {
  let n = num.replace(/\D/g, "");
  // remove leading zeros
  n = n.replace(/^0+/, "");
  // if starts with country code, keep as is; else prepend
  if (n.startsWith(code)) return n;
  return code + n;
};

const WhatsappSender = () => {
  const [code, setCode] = useState("966");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const cleaned = number.trim() ? cleanNumber(number, code) : "";
  const encoded = message ? encodeURIComponent(message) : "";
  const link = cleaned ? `https://wa.me/${cleaned}${encoded ? `?text=${encoded}` : ""}` : "";

  const handleSend = () => {
    if (!cleaned) {
      toast.error("الرجاء إدخال رقم صحيح");
      return;
    }
    window.open(link, "_blank");
  };

  const handleCopy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success("تم نسخ الرابط");
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div data-testid="whatsapp-page">
      <PageHeader
        icon={MessageCircle}
        title="مراسلة رقم واتساب"
        subtitle="أرسل رسالة لأي رقم بدون إضافته لجهات الاتصال"
      />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="grid sm:grid-cols-[220px_1fr] gap-4 mb-4">
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">الدولة</span>
              <select
                value={code}
                onChange={(e) => setCode(e.target.value)}
                data-testid="wa-country"
                className="w-full text-base bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} (+{c.code})
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">رقم الجوال</span>
              <input
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="مثال: 0552211729"
                dir="ltr"
                data-testid="wa-number"
                className="w-full text-lg number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-left"
              />
            </label>
          </div>

          <label className="block mb-5">
            <span className="text-sm font-medium mb-1.5 block">
              الرسالة (اختياري)
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="اكتب رسالتك هنا..."
              data-testid="wa-message"
              className="w-full text-base bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSend}
              data-testid="wa-send-btn"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#20b957] transition-colors shadow-lg shadow-[#25D366]/30"
            >
              <Send className="w-4 h-4" />
              فتح المحادثة في واتساب
            </button>
            <button
              onClick={handleCopy}
              disabled={!link}
              data-testid="wa-copy-btn"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-primary/50 font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              نسخ الرابط
            </button>
          </div>

          {cleaned && (
            <div className="mt-6 p-4 rounded-xl bg-secondary/60 border border-border" data-testid="wa-preview">
              <div className="text-xs text-muted-foreground mb-1">معاينة الرابط</div>
              <div dir="ltr" className="text-sm number-display break-all text-primary font-medium">
                {link}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-muted-foreground leading-relaxed bg-secondary/40 border border-border rounded-xl p-4">
          <strong className="text-foreground">ملاحظة:</strong> عند الضغط سيفتح تطبيق واتساب مباشرة على المحادثة، دون الحاجة لحفظ الرقم في جهات الاتصال. تأكد من كتابة الرقم مع مفتاح الدولة الصحيح.
        </div>
      </div>
    </div>
  );
};

export default WhatsappSender;
