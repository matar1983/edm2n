import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Dumbbell } from "lucide-react";

const BodyComp = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("175");
  const [weight, setWeight] = useState("75");
  const [neck, setNeck] = useState("38");
  const [waist, setWaist] = useState("85");
  const [hip, setHip] = useState("95");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hp = parseFloat(hip);
    if (!h || !w || !n || !wa) return null;

    // US Navy body fat formula
    let bf;
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      if (!hp) return null;
      bf = 495 / (1.29579 - 0.35004 * Math.log10(wa + hp - n) + 0.22100 * Math.log10(h)) - 450;
    }
    bf = Math.max(0, Math.min(bf, 60));

    // Ideal weight (Robinson formula)
    const heightIn = h / 2.54;
    const inchesOver5ft = Math.max(heightIn - 60, 0);
    const idealKg = gender === "male" ? 52 + 1.9 * inchesOver5ft : 49 + 1.7 * inchesOver5ft;

    // Waist/hip ratio
    const whr = hp ? wa / hp : null;

    // BF category
    let cat;
    if (gender === "male") {
      if (bf < 6) cat = "ضروري";
      else if (bf < 14) cat = "رياضي";
      else if (bf < 18) cat = "جيد";
      else if (bf < 25) cat = "متوسط";
      else cat = "زائد";
    } else {
      if (bf < 14) cat = "ضروري";
      else if (bf < 21) cat = "رياضي";
      else if (bf < 25) cat = "جيد";
      else if (bf < 32) cat = "متوسط";
      else cat = "زائد";
    }

    return { bf, idealKg, whr, cat, diff: w - idealKg };
  }, [gender, height, weight, neck, waist, hip]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 1 });

  return (
    <div data-testid="body-comp-page">
      <PageHeader icon={Dumbbell} title="حاسبة اللياقة" subtitle="نسبة الدهون، الوزن المثالي، محيط الخصر/الورك" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">الجنس</label>
              <div className="flex bg-secondary rounded-full p-1 w-fit">
                <button onClick={() => setGender("male")} data-testid="bc-male"
                  className={`px-5 py-2 rounded-full text-sm font-medium ${gender === "male" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>ذكر</button>
                <button onClick={() => setGender("female")} data-testid="bc-female"
                  className={`px-5 py-2 rounded-full text-sm font-medium ${gender === "female" ? "bg-primary text-primary-foreground" : "text-foreground/70"}`}>أنثى</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <F label="العمر" v={age} s={setAge} t="bc-age" suf="سنة" />
              <F label="الطول" v={height} s={setHeight} t="bc-height" suf="سم" />
              <F label="الوزن" v={weight} s={setWeight} t="bc-weight" suf="كجم" />
              <F label="محيط الرقبة" v={neck} s={setNeck} t="bc-neck" suf="سم" />
              <F label="محيط الخصر" v={waist} s={setWaist} t="bc-waist" suf="سم" />
              {gender === "female" && <F label="محيط الورك" v={hip} s={setHip} t="bc-hip" suf="سم" />}
            </div>
          </div>
          <div ref={shareRef} className="space-y-3">
            {result && (
              <>
                <div className="bg-primary text-primary-foreground rounded-2xl p-6" data-testid="bc-result">
                  <div className="text-xs text-[hsl(var(--gold))] font-semibold mb-1">نسبة الدهون</div>
                  <div className="font-display font-bold text-5xl number-display" data-testid="bc-bf">
                    {fmt(result.bf)}%
                  </div>
                  <div className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))]" data-testid="bc-cat">
                    {result.cat}
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4" data-testid="bc-ideal">
                  <div className="text-xs text-muted-foreground">الوزن المثالي</div>
                  <div className="font-display font-bold text-2xl number-display text-primary">{fmt(result.idealKg)} كجم</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    الفرق: <span className="number-display font-semibold">{fmt(result.diff)}</span> كجم
                  </div>
                </div>
                {result.whr && (
                  <div className="bg-card border border-border rounded-xl p-4" data-testid="bc-whr">
                    <div className="text-xs text-muted-foreground">نسبة الخصر إلى الورك</div>
                    <div className="font-display font-bold text-2xl number-display text-primary">{fmt(result.whr)}</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {result && (
          <ShareResult title="حاسبة اللياقة"
            textLines={[
              `💪 نسبة الدهون: ${fmt(result.bf)}% (${result.cat})`,
              `⚖️ الوزن المثالي: ${fmt(result.idealKg)} كجم`,
              result.whr ? `📏 خصر/ورك: ${fmt(result.whr)}` : null,
            ].filter(Boolean)}
            targetRef={shareRef} />
        )}
      </div>
    </div>
  );
};

const F = ({ label, v, s, t, suf }) => (
  <label className="block">
    <span className="text-xs font-medium mb-1 block">{label}</span>
    <div className="relative">
      <input type="number" value={v} min="0" onChange={(e) => s(e.target.value)} data-testid={t}
        className="w-full text-base font-semibold number-display bg-secondary/50 border border-border rounded-lg px-3 py-2 pl-10 focus:outline-none focus:border-primary" />
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">{suf}</span>
    </div>
  </label>
);

export default BodyComp;
