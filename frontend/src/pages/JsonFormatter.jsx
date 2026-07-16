import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Braces, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const JsonFormatter = () => {
  const [input, setInput] = useState('{"name":"مطر","tools":["حاسبة","محول"],"year":2026}');
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");

  const process = (action) => {
    try {
      const parsed = JSON.parse(input);
      let out = "";
      if (action === "format") out = JSON.stringify(parsed, null, indent);
      else if (action === "minify") out = JSON.stringify(parsed);
      else if (action === "escape") out = JSON.stringify(JSON.stringify(parsed, null, indent));
      else if (action === "unescape") {
        // Try unescape by parsing as string
        out = JSON.parse(input);
      }
      setOutput(out);
      setError("");
    } catch (e) {
      setError(e.message);
      setOutput("");
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("تم النسخ");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div data-testid="json-page">
      <PageHeader icon={Braces} title="JSON Formatter" subtitle="تنسيق، تصغير، تحقق من JSON" />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">المدخل</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} rows="16" dir="ltr"
              data-testid="json-input" spellCheck="false"
              className="w-full font-mono text-sm bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary resize-none" />
            <div className="flex flex-wrap gap-2 mt-3">
              <button onClick={() => process("format")} data-testid="json-format"
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">تنسيق</button>
              <button onClick={() => process("minify")} data-testid="json-minify"
                className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-secondary">تصغير</button>
              <button onClick={() => process("escape")} data-testid="json-escape"
                className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-secondary">Escape</button>
              <button onClick={() => process("unescape")} data-testid="json-unescape"
                className="px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-secondary">Unescape</button>
              <label className="inline-flex items-center gap-2 text-sm ml-2">
                <span className="text-muted-foreground">Indent:</span>
                <select value={indent} onChange={(e) => setIndent(parseInt(e.target.value))} data-testid="json-indent"
                  className="bg-secondary/50 border border-border rounded-lg px-2 py-1 text-sm">
                  <option value="2">2</option><option value="4">4</option><option value="0">Tab</option>
                </select>
              </label>
            </div>
            {error && <div className="mt-3 text-sm text-rose-600 bg-rose-500/10 border border-rose-500/30 rounded-lg p-3" data-testid="json-error">{error}</div>}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium">الخرج</label>
              {output && (
                <button onClick={copy} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-border hover:bg-secondary" data-testid="json-copy">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "منسوخ" : "نسخ"}
                </button>
              )}
            </div>
            <pre dir="ltr" data-testid="json-output"
              className="w-full h-[400px] overflow-auto font-mono text-sm bg-secondary/50 border border-border rounded-xl px-4 py-3 whitespace-pre-wrap break-all">
              {output || <span className="text-muted-foreground">اضغط تنسيق / تصغير...</span>}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
