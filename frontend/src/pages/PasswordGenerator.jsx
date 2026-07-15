import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { KeyRound, Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const generate = ({ length, upper, lower, digits, symbols }) => {
  let chars = "";
  if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (digits) chars += "0123456789";
  if (symbols) chars += "!@#$%^&*()_+-=[]{}<>?";
  if (!chars) return "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => chars[v % chars.length]).join("");
};

const strengthOf = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (pw.length >= 16) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 3) return { label: "ضعيفة", color: "bg-rose-500", w: "33%" };
  if (s <= 5) return { label: "متوسطة", color: "bg-amber-500", w: "66%" };
  return { label: "قوية", color: "bg-emerald-500", w: "100%" };
};

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digits, setDigits] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [pw, setPw] = useState(() => generate({ length: 16, upper: true, lower: true, digits: true, symbols: true }));
  const [copied, setCopied] = useState(false);

  const regen = () => setPw(generate({ length, upper, lower, digits, symbols }));

  const copy = async () => {
    if (!pw) return;
    await navigator.clipboard.writeText(pw);
    setCopied(true);
    toast.success("تم النسخ");
    setTimeout(() => setCopied(false), 1500);
  };

  const s = strengthOf(pw);

  return (
    <div data-testid="password-page">
      <PageHeader icon={KeyRound} title="مولّد كلمات المرور" subtitle="كلمة مرور قوية عشوائية بأمان تام" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="mb-4">
            <div dir="ltr" className="font-mono text-lg sm:text-xl font-semibold bg-secondary/70 border border-border rounded-xl px-4 py-4 break-all text-left" data-testid="password-value">
              {pw || "—"}
            </div>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className={`h-full ${s.color} transition-all`} style={{ width: s.w }} />
              </div>
              <span className="text-xs font-semibold text-muted-foreground" data-testid="password-strength">{s.label}</span>
            </div>
            <div className="mt-3 flex gap-3">
              <button onClick={regen} data-testid="password-regen"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90">
                <RefreshCw className="w-4 h-4" /> توليد جديد
              </button>
              <button onClick={copy} data-testid="password-copy"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border font-medium hover:bg-secondary">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />} نسخ
              </button>
            </div>
          </div>
          <label className="block mt-6">
            <span className="text-sm font-medium mb-1.5 block">الطول: <span className="number-display">{length}</span></span>
            <input type="range" min="4" max="64" value={length}
              onChange={(e) => setLength(parseInt(e.target.value))} data-testid="password-length"
              className="w-full accent-primary" />
          </label>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Check2 label="حروف كبيرة (A-Z)" checked={upper} onChange={setUpper} testid="pw-upper" />
            <Check2 label="حروف صغيرة (a-z)" checked={lower} onChange={setLower} testid="pw-lower" />
            <Check2 label="أرقام (0-9)" checked={digits} onChange={setDigits} testid="pw-digits" />
            <Check2 label="رموز خاصة (!@#$)" checked={symbols} onChange={setSymbols} testid="pw-symbols" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Check2 = ({ label, checked, onChange, testid }) => (
  <label className="flex items-center gap-2 cursor-pointer bg-secondary/40 rounded-lg px-3 py-2">
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
      data-testid={testid}
      className="w-4 h-4 accent-primary" />
    <span className="text-xs font-medium">{label}</span>
  </label>
);

export default PasswordGenerator;
