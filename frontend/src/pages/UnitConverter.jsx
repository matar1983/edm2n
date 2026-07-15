import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Ruler, ArrowLeftRight } from "lucide-react";
import {
  UNIT_CATEGORIES,
  convertUnit,
  convertTemperature,
  TEMP_UNITS,
} from "@/utils/unitConversions";

const UnitConverter = () => {
  const cats = Object.keys(UNIT_CATEGORIES);
  const [cat, setCat] = useState(cats[0]);
  return (
    <div data-testid="units-page">
      <PageHeader icon={Ruler} title="محوّل الوحدات" subtitle="طول، وزن، حجم، مساحة، سرعة، حرارة" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="flex flex-wrap gap-2 mb-5" data-testid="units-cats">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} data-testid={`unit-cat-${c}`}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                cat === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground/70 hover:border-primary/50"
              }`}>
              {UNIT_CATEGORIES[c].label}
            </button>
          ))}
          <button onClick={() => setCat("__temp")} data-testid="unit-cat-temp"
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              cat === "__temp" ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground/70 hover:border-primary/50"
            }`}>
            درجة حرارة
          </button>
        </div>

        {cat === "__temp" ? <TempConverter /> : <StandardConverter key={cat} category={cat} />}
      </div>
    </div>
  );
};

const StandardConverter = ({ category }) => {
  const units = Object.keys(UNIT_CATEGORIES[category].units);
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[Math.min(1, units.length - 1)]);
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    return convertUnit(v, from, to, category);
  }, [value, from, to, category]);

  const swap = () => { setFrom(to); setTo(from); };
  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 6 });
  const uList = UNIT_CATEGORIES[category].units;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <div className="mb-5">
        <label className="text-sm font-medium mb-1.5 block">القيمة</label>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} data-testid="unit-value"
          className="w-full text-2xl font-bold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
      </div>
      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-end mb-5">
        <UnitSelect value={from} onChange={setFrom} units={uList} label="من" testid="unit-from" />
        <button onClick={swap} data-testid="unit-swap"
          className="w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center hover:rotate-180 transition-transform">
          <ArrowLeftRight className="w-5 h-5" />
        </button>
        <UnitSelect value={to} onChange={setTo} units={uList} label="إلى" testid="unit-to" />
      </div>
      <div ref={shareRef} className="bg-primary text-primary-foreground rounded-xl p-5" data-testid="unit-result">
        <div className="text-xs text-primary-foreground/70 mb-1">النتيجة</div>
        <div className="font-display font-bold text-3xl number-display text-[hsl(var(--gold))]">
          {result === null ? "—" : `${fmt(result)} ${uList[to].label}`}
        </div>
      </div>
      {result !== null && (
        <ShareResult title="محوّل الوحدات"
          textLines={[`${value} ${uList[from].label} = ${fmt(result)} ${uList[to].label}`]}
          targetRef={shareRef} />
      )}
    </div>
  );
};

const TempConverter = () => {
  const [value, setValue] = useState("25");
  const [from, setFrom] = useState("c");
  const [to, setTo] = useState("f");
  const shareRef = useRef(null);
  const result = useMemo(() => {
    const v = parseFloat(value);
    if (isNaN(v)) return null;
    return convertTemperature(v, from, to);
  }, [value, from, to]);
  const swap = () => { setFrom(to); setTo(from); };
  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 4 });

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      <div className="mb-5">
        <label className="text-sm font-medium mb-1.5 block">القيمة</label>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} data-testid="temp-value"
          className="w-full text-2xl font-bold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
      </div>
      <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-end mb-5">
        <TempSelect value={from} onChange={setFrom} label="من" testid="temp-from" />
        <button onClick={swap} data-testid="temp-swap"
          className="w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center hover:rotate-180 transition-transform">
          <ArrowLeftRight className="w-5 h-5" />
        </button>
        <TempSelect value={to} onChange={setTo} label="إلى" testid="temp-to" />
      </div>
      <div ref={shareRef} className="bg-primary text-primary-foreground rounded-xl p-5" data-testid="temp-result">
        <div className="text-xs text-primary-foreground/70 mb-1">النتيجة</div>
        <div className="font-display font-bold text-3xl number-display text-[hsl(var(--gold))]">
          {result === null ? "—" : `${fmt(result)} ${TEMP_UNITS[to]}`}
        </div>
      </div>
      {result !== null && (
        <ShareResult title="محوّل درجة الحرارة"
          textLines={[`${value} ${TEMP_UNITS[from]} = ${fmt(result)} ${TEMP_UNITS[to]}`]}
          targetRef={shareRef} />
      )}
    </div>
  );
};

const UnitSelect = ({ value, onChange, units, label, testid }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1.5 block">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} data-testid={testid}
      className="w-full text-base bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
      {Object.entries(units).map(([k, u]) => (
        <option key={k} value={k}>{u.label}</option>
      ))}
    </select>
  </label>
);

const TempSelect = ({ value, onChange, label, testid }) => (
  <label className="block">
    <span className="text-sm font-medium mb-1.5 block">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} data-testid={testid}
      className="w-full text-base bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
      {Object.entries(TEMP_UNITS).map(([k, v]) => (
        <option key={k} value={k}>{v}</option>
      ))}
    </select>
  </label>
);

export default UnitConverter;
