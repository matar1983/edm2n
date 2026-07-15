import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { QrCode, Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const QrGenerator = () => {
  const [text, setText] = useState("https://edm2n.com");
  const [size, setSize] = useState(300);
  const [color, setColor] = useState("0d5c4d");
  const [copied, setCopied] = useState(false);

  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text || " ")}&color=${color}&bgcolor=ffffff&margin=10`;

  const download = async () => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const dl = document.createElement("a");
      dl.href = URL.createObjectURL(blob);
      dl.download = "qrcode.png";
      dl.click();
      toast.success("تم التنزيل");
    } catch {
      toast.error("تعذّر التنزيل");
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("تم نسخ رابط الصورة");
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div data-testid="qr-page">
      <PageHeader icon={QrCode} title="مولّد رمز QR" subtitle="أنشئ رمز QR لأي نص أو رابط بلمسة" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">النص أو الرابط</span>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows="4" data-testid="qr-text"
                placeholder="https://example.com أو أي نص"
                dir="auto"
                className="w-full text-base bg-secondary/50 border border-border rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">الحجم: <span className="number-display">{size}px</span></span>
              <input type="range" min="100" max="600" step="50" value={size}
                onChange={(e) => setSize(parseInt(e.target.value))} data-testid="qr-size"
                className="w-full accent-primary" />
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">لون الرمز</span>
              <div className="flex items-center gap-3">
                <input type="color" value={`#${color}`} onChange={(e) => setColor(e.target.value.slice(1))}
                  data-testid="qr-color"
                  className="w-14 h-10 rounded-lg border border-border cursor-pointer" />
                <div dir="ltr" className="text-sm text-muted-foreground number-display">#{color}</div>
              </div>
            </label>
            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={download} data-testid="qr-download"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90">
                <Download className="w-4 h-4" /> تنزيل PNG
              </button>
              <button onClick={copyLink} data-testid="qr-copy-link"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-medium hover:bg-secondary">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />} نسخ الرابط
              </button>
            </div>
          </div>

          <div className="bg-secondary/30 border border-border rounded-2xl p-6 grid place-items-center min-h-[300px]" data-testid="qr-preview">
            <img src={url} alt="QR" className="max-w-full h-auto rounded-xl shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrGenerator;
