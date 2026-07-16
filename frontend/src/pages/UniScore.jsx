import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { School } from "lucide-react";

// Saudi university weighted score = 30% high school + 30% general (Qudurat) + 40% subject (Tahsili)
const UniScore = () => {
  const [thanawi, setThanawi] = useState("95");
  const [qudurat, setQudurat] = useState("85");
  const [tahsili, setTahsili] = useState("80");
  const [wThanawi, setWThanawi] = useState("30");
  const [wQudurat, setWQudurat] = useState("30");
  const [wTahsili, setWTahsili] = useState("40");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const t = parseFloat(thanawi) || 0;
    const q = parseFloat(qudurat) || 0;
    const ta = parseFloat(tahsili) || 0;
    const wt = parseFloat(wThanawi) || 0;
    const wq = parseFloat(wQudurat) || 0;
    const wta = parseFloat(wTahsili) || 0;
    const totalW = wt + wq + wta;
    if (totalW === 0) return 0;
    return (t * wt + q * wq + ta * wta) / totalW;
  }, [thanawi, qudurat, tahsili, wThanawi, wQudurat, wTahsili]);

  const presets = [
    { label: "طب / صيدلة", w: [30, 30, 40] },
    { label: "هندسة / علوم", w: [30, 30, 40] },
    { label: "شرعي / نظري", w: [50, 30, 20] },
    { label: "متساوٍ", w: [33.33, 33.33, 33.33] },
  ];

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 3 });

  return (
    <div data-testid="uni-page">
      <PageHeader icon={School} title="حاسبة النسبة المؤهّلة للجامعة" subtitle="الثانوية + القدرات + التحصيلي" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-xs font-medium mb-2 block">قوالب الأوزان</label>
            <div className="flex flex-wrap gap-2" data-testid="uni-presets">
              {presets.map((p) => (
                <button key={p.label} onClick={() => {
                  setWThanawi(String(p.w[0])); setWQudurat(String(p.w[1])); setWTahsili(String(p.w[2]));
                }} data-testid={`uni-preset-${p.label}`}
                  className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/50">
                  {p.label} ({p.w.join("/")})
                </button>
              ))}
            </div>
          </div>
          <Row label="نسبة الثانوية" grade={thanawi} setGrade={setThanawi} weight={wThanawi} setWeight={setWThanawi} tG="uni-t-g" tW="uni-t-w" />
          <Row label="اختبار القدرات" grade={qudurat} setGrade={setQudurat} weight={wQudurat} setWeight={setWQudurat} tG="uni-q-g" tW="uni-q-w" />
          <Row label="التحصيلي" grade={tahsili} setGrade={setTahsili} weight={wTahsili} setWeight={setWTahsili} tG="uni-ta-g" tW="uni-ta-w" />

          <div ref={shareRef} className="mt-4 bg-primary text-primary-foreground rounded-xl p-5" data-testid="uni-result">
            <div className="text-xs text-primary-foreground/70 mb-1">نسبتك المؤهّلة</div>
            <div className="font-display font-bold text-5xl number-display text-[hsl(var(--gold))]" data-testid="uni-value">
              {fmt(result)}%
            </div>
          </div>
        </div>
        <ShareResult title="النسبة المؤهّلة"
          textLines={[
            `📊 ثانوية: ${thanawi}% (وزن ${wThanawi})`,
            `📊 قدرات: ${qudurat}% (وزن ${wQudurat})`,
            `📊 تحصيلي: ${tahsili}% (وزن ${wTahsili})`,
            `🎓 النسبة المؤهّلة: ${fmt(result)}%`,
          ]} targetRef={shareRef} />
      </div>
    </div>
  );
};

const Row = ({ label, grade, setGrade, weight, setWeight, tG, tW }) => (
  <div className="grid grid-cols-[1fr_100px_90px] gap-3 items-end">
    <div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
    <label className="block">
      <span className="text-[10px] text-muted-foreground block">النسبة %</span>
      <input type="number" value={grade} min="0" max="100" step="0.01" onChange={(e) => setGrade(e.target.value)} data-testid={tG}
        className="w-full bg-secondary/50 border border-border rounded-lg px-2 py-2 text-sm number-display font-semibold focus:outline-none focus:border-primary" />
    </label>
    <label className="block">
      <span className="text-[10px] text-muted-foreground block">الوزن</span>
      <input type="number" value={weight} min="0" max="100" step="0.01" onChange={(e) => setWeight(e.target.value)} data-testid={tW}
        className="w-full bg-secondary/50 border border-border rounded-lg px-2 py-2 text-sm number-display font-semibold focus:outline-none focus:border-primary" />
    </label>
  </div>
);

export default UniScore;
