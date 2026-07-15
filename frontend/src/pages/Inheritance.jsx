import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Scale } from "lucide-react";

/**
 * Simplified Islamic inheritance calculator.
 * Handles common cases: spouse + sons + daughters + father + mother.
 * Not exhaustive — for detailed cases consult a specialist.
 */
const Inheritance = () => {
  const [estate, setEstate] = useState("1000000");
  const [gender, setGender] = useState("male"); // deceased is male or female
  const [spouseAlive, setSpouseAlive] = useState(true);
  const [sons, setSons] = useState("2");
  const [daughters, setDaughters] = useState("1");
  const [fatherAlive, setFatherAlive] = useState(false);
  const [motherAlive, setMotherAlive] = useState(false);
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const total = parseFloat(estate) || 0;
    const s = parseInt(sons) || 0;
    const d = parseInt(daughters) || 0;
    const hasChildren = s + d > 0;

    let shares = [];
    let remaining = 1; // full share

    // Parents (fixed shares when there are children)
    if (motherAlive) {
      const share = hasChildren ? 1 / 6 : 1 / 3;
      shares.push({ heir: "الأم", ratio: share });
      remaining -= share;
    }
    if (fatherAlive) {
      const share = 1 / 6; // if children, father gets 1/6 fixed + residue via ta'seeb
      shares.push({ heir: "الأب", ratio: share });
      remaining -= share;
    }

    // Spouse
    if (spouseAlive) {
      let share;
      if (gender === "male") {
        // Wife
        share = hasChildren ? 1 / 8 : 1 / 4;
        shares.push({ heir: "الزوجة", ratio: share });
      } else {
        // Husband
        share = hasChildren ? 1 / 4 : 1 / 2;
        shares.push({ heir: "الزوج", ratio: share });
      }
      remaining -= share;
    }

    // Children take remainder via ta'seeb: son = 2 × daughter
    if (hasChildren) {
      const units = s * 2 + d;
      const perDaughter = units > 0 ? remaining / units : 0;
      if (s > 0)
        shares.push({
          heir: `الأبناء (${s})`,
          ratio: perDaughter * 2 * s,
          each: perDaughter * 2,
        });
      if (d > 0)
        shares.push({
          heir: `البنات (${d})`,
          ratio: perDaughter * d,
          each: perDaughter,
        });
      remaining = 0;
    } else if (fatherAlive) {
      // No children → father takes residue
      shares = shares.map((sh) =>
        sh.heir === "الأب" ? { ...sh, ratio: sh.ratio + remaining } : sh
      );
      remaining = 0;
    }

    const withAmount = shares.map((sh) => ({
      ...sh,
      amount: sh.ratio * total,
      eachAmount: sh.each ? sh.each * total : undefined,
    }));
    return { shares: withAmount, remaining, total };
  }, [estate, gender, spouseAlive, sons, daughters, fatherAlive, motherAlive]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2 });
  const pct = (n) => `${(n * 100).toFixed(2)}%`;

  return (
    <div data-testid="inheritance-page">
      <PageHeader
        icon={Scale}
        title="حاسبة الميراث الشرعي"
        subtitle="حساب مبسّط لأنصبة الورثة (زوج/زوجة، أبناء، بنات، والدين)"
      />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <label className="text-sm font-medium mb-1.5 block">قيمة التركة</label>
              <div className="relative">
                <input type="number" value={estate} min="0"
                  onChange={(e) => setEstate(e.target.value)} data-testid="inheritance-estate"
                  className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 pl-16 focus:outline-none focus:border-primary" />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">ريال</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">جنس المتوفى</label>
              <div className="flex bg-secondary rounded-full p-1 w-fit" data-testid="inheritance-gender">
                <button onClick={() => setGender("male")} data-testid="inh-male"
                  className={`px-4 py-2 rounded-full text-sm font-medium ${gender === "male" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
                  رجل
                </button>
                <button onClick={() => setGender("female")} data-testid="inh-female"
                  className={`px-4 py-2 rounded-full text-sm font-medium ${gender === "female" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>
                  امرأة
                </button>
              </div>
            </div>

            <Checkbox label={gender === "male" ? "الزوجة على قيد الحياة" : "الزوج على قيد الحياة"}
              checked={spouseAlive} onChange={setSpouseAlive} testid="inh-spouse" />

            <div className="grid grid-cols-2 gap-3">
              <NumField label="عدد الأبناء" value={sons} onChange={setSons} testid="inh-sons" />
              <NumField label="عدد البنات" value={daughters} onChange={setDaughters} testid="inh-daughters" />
            </div>

            <Checkbox label="الأب على قيد الحياة" checked={fatherAlive} onChange={setFatherAlive} testid="inh-father" />
            <Checkbox label="الأم على قيد الحياة" checked={motherAlive} onChange={setMotherAlive} testid="inh-mother" />

            <div className="pt-3 border-t border-border text-xs text-muted-foreground leading-relaxed">
              حاسبة مبسّطة للحالات الشائعة. للحالات المعقّدة (إخوة، أعمام، جدات…) استشر عالماً شرعياً.
            </div>
          </div>

          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8" data-testid="inheritance-result">
            <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-4">
              توزيع التركة
            </div>
            <div className="space-y-3">
              {result.shares.length === 0 && (
                <div className="text-primary-foreground/70">اختر ورثة لحساب الأنصبة.</div>
              )}
              {result.shares.map((sh, i) => (
                <div key={`${sh.heir}-${i}`} className="bg-primary-foreground/10 rounded-xl p-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <div className="font-semibold">{sh.heir}</div>
                    <div className="text-[hsl(var(--gold))] font-bold number-display">{pct(sh.ratio)}</div>
                  </div>
                  <div className="text-2xl font-display font-bold number-display">
                    {fmt(sh.amount)}<span className="text-xs font-normal text-primary-foreground/70 mr-1">ريال</span>
                  </div>
                  {sh.eachAmount !== undefined && (
                    <div className="text-xs text-primary-foreground/60 mt-1">
                      نصيب كل واحد: <span className="number-display font-semibold">{fmt(sh.eachAmount)}</span> ريال
                    </div>
                  )}
                </div>
              ))}
            </div>
            {result.remaining > 0.001 && (
              <div className="mt-4 p-3 rounded-lg bg-amber-500/20 text-amber-100 text-xs">
                يتبقّى {pct(result.remaining)} من التركة لم توزّع (رد على الورثة أو ورثة آخرين).
              </div>
            )}
          </div>
        </div>
        {result.shares.length > 0 && (
          <ShareResult
            title="الميراث الشرعي"
            textLines={[
              `💰 التركة: ${fmt(result.total)} ريال`,
              ...result.shares.map((sh) => `• ${sh.heir}: ${pct(sh.ratio)} — ${fmt(sh.amount)} ريال`),
            ]}
            targetRef={shareRef}
          />
        )}
      </div>
    </div>
  );
};

const Checkbox = ({ label, checked, onChange, testid }) => (
  <label className="flex items-center gap-3 cursor-pointer" data-testid={testid}>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
      className="w-5 h-5 rounded border-border accent-primary" />
    <span className="text-sm font-medium">{label}</span>
  </label>
);

const NumField = ({ label, value, onChange, testid }) => (
  <label className="block">
    <span className="text-xs font-medium mb-1 block">{label}</span>
    <input type="number" value={value} min="0"
      onChange={(e) => onChange(e.target.value)} data-testid={testid}
      className="w-full text-base font-semibold number-display bg-secondary/50 border border-border rounded-lg px-3 py-2 focus:outline-none focus:border-primary" />
  </label>
);

export default Inheritance;
