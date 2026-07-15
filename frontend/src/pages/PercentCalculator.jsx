import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Percent } from "lucide-react";

const TABS = [
  { id: "of", label: "نسبة من عدد" },
  { id: "what", label: "كم يمثل نسبةً؟" },
  { id: "change", label: "نسبة التغيّر" },
  { id: "add", label: "إضافة/خصم نسبة" },
];

const PercentCalculator = () => {
  const [tab, setTab] = useState("of");

  return (
    <div data-testid="percent-page">
      <PageHeader
        icon={Percent}
        title="حاسبة النسبة المئوية"
        subtitle="أربع طرق للحساب في مكان واحد"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div
            className="flex overflow-x-auto border-b border-border no-scrollbar"
            data-testid="percent-tabs"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                data-testid={`percent-tab-${t.id}`}
                className={`px-4 sm:px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-primary text-primary bg-primary/5"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {tab === "of" && <PctOf />}
            {tab === "what" && <PctWhat />}
            {tab === "change" && <PctChange />}
            {tab === "add" && <PctAddRemove />}
          </div>
        </div>
      </div>
    </div>
  );
};

const fmt = (n) =>
  isFinite(n)
    ? n.toLocaleString("ar-EG", { maximumFractionDigits: 4 })
    : "—";

const NumInput = ({ label, value, onChange, testid, suffix }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1.5 block">{label}</span>
    <div className="relative">
      <input
        type="number"
        value={value}
        step="any"
        onChange={(e) => onChange(e.target.value)}
        data-testid={testid}
        className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-12 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      {suffix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
          {suffix}
        </span>
      )}
    </div>
  </label>
);

const ResultBox = ({ text, value, testid }) => (
  <div
    className="mt-6 bg-primary text-primary-foreground rounded-xl p-5"
    data-testid={testid}
  >
    <div className="text-xs text-primary-foreground/70 mb-1">{text}</div>
    <div className="font-display font-bold text-3xl number-display text-[hsl(var(--gold))]">
      {value}
    </div>
  </div>
);

const PctOf = () => {
  const [p, setP] = useState("15");
  const [n, setN] = useState("2000");
  const val = (parseFloat(p) / 100) * parseFloat(n);
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-5">
        <NumInput label="النسبة" value={p} onChange={setP} testid="percent-of-p" suffix="%" />
        <NumInput label="العدد" value={n} onChange={setN} testid="percent-of-n" />
      </div>
      <ResultBox
        text={`${p || 0}% من ${n || 0} تساوي`}
        value={fmt(val)}
        testid="percent-of-result"
      />
    </div>
  );
};

const PctWhat = () => {
  const [a, setA] = useState("30");
  const [b, setB] = useState("120");
  const val = (parseFloat(a) / parseFloat(b)) * 100;
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-5">
        <NumInput label="الجزء" value={a} onChange={setA} testid="percent-what-a" />
        <NumInput label="الكل" value={b} onChange={setB} testid="percent-what-b" />
      </div>
      <ResultBox
        text={`${a || 0} يمثل من ${b || 0}`}
        value={`${fmt(val)} %`}
        testid="percent-what-result"
      />
    </div>
  );
};

const PctChange = () => {
  const [a, setA] = useState("100");
  const [b, setB] = useState("125");
  const val = ((parseFloat(b) - parseFloat(a)) / parseFloat(a)) * 100;
  const dir = val > 0 ? "زيادة" : val < 0 ? "نقصان" : "بدون تغيّر";
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-5">
        <NumInput label="القيمة الأولى" value={a} onChange={setA} testid="percent-change-a" />
        <NumInput label="القيمة الثانية" value={b} onChange={setB} testid="percent-change-b" />
      </div>
      <ResultBox
        text={`نسبة التغيّر (${dir})`}
        value={`${fmt(Math.abs(val))} %`}
        testid="percent-change-result"
      />
    </div>
  );
};

const PctAddRemove = () => {
  const [n, setN] = useState("500");
  const [p, setP] = useState("15");
  const add = parseFloat(n) * (1 + parseFloat(p) / 100);
  const sub = parseFloat(n) * (1 - parseFloat(p) / 100);
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-5">
        <NumInput label="العدد" value={n} onChange={setN} testid="percent-add-n" />
        <NumInput label="النسبة" value={p} onChange={setP} testid="percent-add-p" suffix="%" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5" data-testid="percent-add-plus">
          <div className="text-xs text-emerald-700 mb-1">بإضافة {p || 0}%</div>
          <div className="font-display font-bold text-2xl number-display text-emerald-900">
            {fmt(add)}
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5" data-testid="percent-add-minus">
          <div className="text-xs text-rose-700 mb-1">بخصم {p || 0}%</div>
          <div className="font-display font-bold text-2xl number-display text-rose-900">
            {fmt(sub)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PercentCalculator;
