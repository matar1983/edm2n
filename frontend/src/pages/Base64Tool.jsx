import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Code2, Copy, Check, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

const Base64Tool = () => {
  const [text, setText] = useState("مرحباً بكم في دليل مطر");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [copied, setCopied] = useState(null);

  const doEncode = () => {
    try {
      const enc = btoa(unescape(encodeURIComponent(text)));
      setEncoded(enc);
      toast.success("تم التشفير");
    } catch { toast.error("خطأ في التشفير"); }
  };

  const doDecode = () => {
    try {
      const dec = decodeURIComponent(escape(atob(encoded)));
      setDecoded(dec);
      toast.success("تم فك التشفير");
    } catch { toast.error("Base64 غير صالح"); }
  };

  const copy = async (v, k) => {
    await navigator.clipboard.writeText(v);
    setCopied(k);
    toast.success("تم النسخ");
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div data-testid="base64-page">
      <PageHeader icon={Code2} title="محوّل Base64" subtitle="تشفير وفك تشفير النصوص (يدعم العربية)" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12 space-y-5">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-sm font-semibold mb-2">النص العادي</div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows="4" dir="auto" data-testid="b64-text"
            className="w-full text-base bg-secondary/50 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-primary resize-none" />
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <button onClick={doEncode} data-testid="b64-encode"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
              <ArrowLeftRight className="w-4 h-4" /> تشفير إلى Base64
            </button>
            {encoded && (
              <button onClick={() => copy(encoded, "enc")} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary" data-testid="b64-copy-enc">
                {copied === "enc" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                نسخ الناتج
              </button>
            )}
          </div>
          {encoded && (
            <div dir="ltr" data-testid="b64-encoded" className="mt-3 font-mono text-sm break-all bg-primary text-primary-foreground rounded-lg p-3">
              {encoded}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-sm font-semibold mb-2">Base64</div>
          <textarea value={encoded} onChange={(e) => setEncoded(e.target.value)} rows="4" dir="ltr" spellCheck="false"
            data-testid="b64-input"
            className="w-full font-mono text-sm bg-secondary/50 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-primary resize-none" />
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <button onClick={doDecode} data-testid="b64-decode"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">
              <ArrowLeftRight className="w-4 h-4 rotate-180" /> فك التشفير
            </button>
            {decoded && (
              <button onClick={() => copy(decoded, "dec")} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border border-border hover:bg-secondary" data-testid="b64-copy-dec">
                {copied === "dec" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                نسخ الناتج
              </button>
            )}
          </div>
          {decoded && (
            <div dir="auto" data-testid="b64-decoded" className="mt-3 text-base break-all bg-primary text-primary-foreground rounded-lg p-3">
              {decoded}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Base64Tool;
