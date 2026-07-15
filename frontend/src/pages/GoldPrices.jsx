import { useState, useEffect, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Gem, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// Karat purities
const KARATS = [
  { k: 24, purity: 1.0 },
  { k: 22, purity: 22 / 24 },
  { k: 21, purity: 21 / 24 },
  { k: 18, purity: 18 / 24 },
  { k: 14, purity: 14 / 24 },
  { k: 12, purity: 12 / 24 },
  { k: 10, purity: 10 / 24 },
];

const TROY_OZ_TO_GRAM = 31.1035;

const GoldPrices = () => {
  // Manual override or fetched value: price of 24k gold per gram in USD
  const [pricePerGramUSD, setPricePerGramUSD] = useState(null);
  const [usdToSar, setUsdToSar] = useState(3.75);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [weight, setWeight] = useState("10");
  const [selectedKarat, setSelectedKarat] = useState(21);
  const shareRef = useRef(null);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      // Try to get gold price via a free public source
      // Fallback: use SAR rate to calc from USD
      const [usdRateRes] = await Promise.all([
        fetch("https://open.er-api.com/v6/latest/USD").then((r) => r.json()),
      ]);
      const sarRate = usdRateRes?.rates?.SAR;
      if (sarRate) setUsdToSar(sarRate);

      // Try free gold API (may or may not work due to CORS)
      let goldOz = null;
      try {
        const r = await fetch("https://api.gold-api.com/price/XAU");
        if (r.ok) {
          const d = await r.json();
          goldOz = d?.price;
        }
      } catch {}

      if (goldOz) {
        setPricePerGramUSD(goldOz / TROY_OZ_TO_GRAM);
        setUpdatedAt(new Date().toISOString());
        toast.success("تم تحديث سعر الذهب");
      } else {
        // Fallback: use a reasonable recent average if no fetch works
        if (pricePerGramUSD === null) {
          setPricePerGramUSD(85); // approx $85/gram 24k (adjust manually if needed)
          setUpdatedAt(new Date().toISOString());
          toast.info("استخدام قيمة تقديرية — يمكنك تعديلها يدوياً");
        } else {
          toast.info("لم يتحدث السعر — تحقق يدوياً");
        }
      }
    } catch (e) {
      toast.error("تعذّر الاتصال بمصادر البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const perKaratSAR = useMemo(() => {
    if (pricePerGramUSD === null) return {};
    const priceSar = pricePerGramUSD * usdToSar;
    return Object.fromEntries(
      KARATS.map((k) => [k.k, priceSar * k.purity])
    );
  }, [pricePerGramUSD, usdToSar]);

  const weightValue = useMemo(() => {
    const w = parseFloat(weight);
    if (isNaN(w) || w <= 0 || !perKaratSAR[selectedKarat]) return null;
    return w * perKaratSAR[selectedKarat];
  }, [weight, selectedKarat, perKaratSAR]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  const setManualPrice = (v) => {
    const p = parseFloat(v);
    if (!isNaN(p) && p > 0) {
      setPricePerGramUSD(p / usdToSar); // v was in SAR
    }
  };

  return (
    <div data-testid="gold-page">
      <PageHeader
        icon={Gem}
        title="أسعار الذهب"
        subtitle="سعر الغرام لعيارات الذهب — تحدّث دورياً من مصادر عامة"
      />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 mb-4 relative overflow-hidden" data-testid="gold-header">
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[hsl(var(--gold))]/10 -translate-y-1/2 -translate-x-1/2" />
          <div className="relative flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-1">
                سعر عيار 24 (غرام)
              </div>
              <div className="font-display font-bold text-4xl sm:text-5xl number-display">
                {pricePerGramUSD !== null ? fmt(pricePerGramUSD * usdToSar) : "..."}
                <span className="text-base font-medium text-primary-foreground/70 mr-2">ريال</span>
              </div>
              {pricePerGramUSD !== null && (
                <div className="text-xs text-primary-foreground/60 mt-1 number-display">
                  ≈ ${fmt(pricePerGramUSD)} USD | 1 USD = {fmt(usdToSar)} SAR
                </div>
              )}
            </div>
            <button onClick={fetchPrices} disabled={loading} data-testid="gold-refresh"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-sm font-medium disabled:opacity-50">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              تحديث
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 mb-4">
          <div className="text-xs text-muted-foreground mb-2">
            تعديل يدوي لسعر الغرام لعيار 24 (بالريال) — استخدمه لو أردت سعر السوق المحلي الدقيق
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder={pricePerGramUSD !== null ? String(Math.round(pricePerGramUSD * usdToSar)) : ""}
              onChange={(e) => setManualPrice(e.target.value)}
              data-testid="gold-manual-price"
              className="flex-1 bg-secondary/50 border border-border rounded-lg px-3 py-2 text-base number-display focus:outline-none focus:border-primary"
            />
            <span className="text-sm text-muted-foreground">ريال / غرام 24</span>
          </div>
          {updatedAt && (
            <div className="text-[11px] text-muted-foreground mt-2">
              آخر تحديث: {new Date(updatedAt).toLocaleString("ar-EG")}
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-6" data-testid="gold-karats">
          {KARATS.map((k) => (
            <div key={k.k} className="bg-card border border-border rounded-xl p-4"
              data-testid={`gold-karat-${k.k}`}>
              <div className="text-xs text-muted-foreground">عيار {k.k}</div>
              <div className="font-display font-bold text-2xl number-display text-primary">
                {perKaratSAR[k.k] !== undefined ? fmt(perKaratSAR[k.k]) : "—"}
              </div>
              <div className="text-[11px] text-muted-foreground">ريال / غرام</div>
            </div>
          ))}
        </div>

        {/* Weight calculator */}
        <div ref={shareRef} className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="text-sm font-semibold text-primary mb-3">حاسبة القيمة حسب الوزن</div>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">الوزن (غرام)</span>
              <input type="number" value={weight} min="0" step="0.1"
                onChange={(e) => setWeight(e.target.value)} data-testid="gold-weight"
                className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground mb-1 block">العيار</span>
              <select value={selectedKarat} onChange={(e) => setSelectedKarat(Number(e.target.value))}
                data-testid="gold-karat-select"
                className="w-full text-base bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary">
                {KARATS.map((k) => (
                  <option key={k.k} value={k.k}>عيار {k.k}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="bg-primary text-primary-foreground rounded-xl p-4">
            <div className="text-xs text-primary-foreground/70">القيمة</div>
            <div className="font-display font-bold text-3xl number-display text-[hsl(var(--gold))]" data-testid="gold-value">
              {weightValue !== null ? `${fmt(weightValue)} ريال` : "—"}
            </div>
          </div>
        </div>

        {weightValue !== null && (
          <ShareResult
            title="أسعار الذهب"
            textLines={[
              `⚖️ الوزن: ${weight} غرام | العيار: ${selectedKarat}`,
              `💰 القيمة: ${fmt(weightValue)} ريال`,
              `📊 سعر عيار 24: ${fmt(perKaratSAR[24] || 0)} ريال/غم`,
            ]}
            targetRef={shareRef}
          />
        )}

        <div className="mt-4 text-xs text-muted-foreground leading-relaxed bg-secondary/40 border border-border rounded-xl p-4">
          <strong className="text-foreground">تنبيه:</strong> الأسعار المعروضة استرشادية من مصادر السوق العالمية،
          ولا تشمل مصنعية المجوهرات ولا هوامش الصاغة. لأدق سعر تحقق من محلات الذهب في منطقتك.
        </div>
      </div>
    </div>
  );
};

export default GoldPrices;
