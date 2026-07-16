import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Binary, Copy } from "lucide-react";
import { toast } from "sonner";

const bases = { 2: "ثنائي", 8: "ثماني", 10: "عشري", 16: "سداسي عشر" };

const NumberBases = () => {
  const [value, setValue] = useState("255");
  const [fromBase, setFromBase] = useState(10);

  let intVal = null;
  try {
    intVal = parseInt(String(value).trim(), fromBase);
    if (isNaN(intVal)) intVal = null;
  } catch { intVal = null; }

  const copy = async (v) => { await navigator.clipboard.writeText(v); toast.success("تم النسخ"); };

  return (
    <div data-testid="bases-page">
      <PageHeader icon={Binary} title="محوّل أنظمة العد" subtitle="عشري ↔ ثنائي ↔ ثماني ↔ سداسي عشر" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <label className="text-sm font-medium mb-1.5 block">النظام المصدر</label>
          <div className="flex bg-secondary rounded-full p-1 w-fit mb-4" data-testid="bases-from">
            {Object.entries(bases).map(([b, name]) => (
              <button key={b} onClick={() => setFromBase(parseInt(b))} data-testid={`bases-from-${b}`}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${fromBase === parseInt(b) ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
                {name} ({b})
              </button>
            ))}
          </div>
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} data-testid="bases-input"
            dir="ltr"
            className="w-full font-mono text-2xl font-bold bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
        </div>

        {intVal !== null && (
          <div className="space-y-3" data-testid="bases-outputs">
            {Object.entries(bases).map(([b, name]) => {
              const val = intVal.toString(parseInt(b)).toUpperCase();
              return (
                <div key={b} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-3" data-testid={`bases-out-${b}`}>
                  <div>
                    <div className="text-xs text-muted-foreground">{name} (Base {b})</div>
                    <div dir="ltr" className="font-mono text-2xl font-bold break-all">{val}</div>
                  </div>
                  <button onClick={() => copy(val)} className="p-2 rounded-full hover:bg-secondary"><Copy className="w-4 h-4" /></button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberBases;
