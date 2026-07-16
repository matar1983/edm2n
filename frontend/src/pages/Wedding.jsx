import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Heart } from "lucide-react";

const items = [
  { key: "mahr", label: "المهر", def: "50000" },
  { key: "hall", label: "قاعة الحفل", def: "40000" },
  { key: "dinner", label: "العشاء والطعام", def: "35000" },
  { key: "car", label: "سيارة الزفة", def: "5000" },
  { key: "kosha", label: "الكوشة والتنسيق", def: "15000" },
  { key: "photo", label: "التصوير والفيديو", def: "8000" },
  { key: "singer", label: "المطرب / الفرقة", def: "20000" },
  { key: "dress", label: "الفستان والبدلة", def: "12000" },
  { key: "makeup", label: "المكياج والتجميل", def: "5000" },
  { key: "invitations", label: "الدعوات", def: "3000" },
  { key: "honeymoon", label: "شهر العسل", def: "25000" },
  { key: "misc", label: "مصاريف أخرى", def: "10000" },
];

const Wedding = () => {
  const [values, setValues] = useState(Object.fromEntries(items.map((i) => [i.key, i.def])));
  const shareRef = useRef(null);

  const total = useMemo(() =>
    items.reduce((sum, i) => sum + (parseFloat(values[i.key]) || 0), 0),
    [values]
  );

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 0 });

  return (
    <div data-testid="wedding-page">
      <PageHeader icon={Heart} title="حاسبة تكلفة الزواج" subtitle="ميزانية شاملة لحفل الزفاف" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 mb-5 text-center" data-testid="wedding-result">
          <div className="text-[hsl(var(--gold))] font-semibold text-sm mb-2">التكلفة الإجمالية للزواج</div>
          <div className="font-display font-bold text-5xl sm:text-6xl number-display" data-testid="wedding-total">
            {fmt(total)}<span className="text-lg text-primary-foreground/70 mr-2">ريال</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3" data-testid="wedding-items">
          {items.map((i) => (
            <label key={i.key} className="bg-card border border-border rounded-xl p-4 block">
              <span className="text-xs text-muted-foreground mb-1 block">{i.label}</span>
              <div className="relative">
                <input type="number" value={values[i.key]} min="0"
                  onChange={(e) => setValues((v) => ({ ...v, [i.key]: e.target.value }))}
                  data-testid={`wedding-${i.key}`}
                  className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-lg px-3 py-2 pl-14 focus:outline-none focus:border-primary" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">ريال</span>
              </div>
            </label>
          ))}
        </div>
        <ShareResult title="تكلفة الزواج"
          textLines={[...items.map((i) => `• ${i.label}: ${fmt(parseFloat(values[i.key]) || 0)} ريال`), `💰 الإجمالي: ${fmt(total)} ريال`]}
          targetRef={shareRef} />
      </div>
    </div>
  );
};

export default Wedding;
