import { useState, useEffect, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Coins, RefreshCw, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

const CURRENCIES = [
  { code: "SAR", name: "ريال سعودي", flag: "🇸🇦" },
  { code: "USD", name: "دولار أمريكي", flag: "🇺🇸" },
  { code: "EUR", name: "يورو", flag: "🇪🇺" },
  { code: "GBP", name: "جنيه إسترليني", flag: "🇬🇧" },
  { code: "AED", name: "درهم إماراتي", flag: "🇦🇪" },
  { code: "KWD", name: "دينار كويتي", flag: "🇰🇼" },
  { code: "QAR", name: "ريال قطري", flag: "🇶🇦" },
  { code: "BHD", name: "دينار بحريني", flag: "🇧🇭" },
  { code: "OMR", name: "ريال عماني", flag: "🇴🇲" },
  { code: "EGP", name: "جنيه مصري", flag: "🇪🇬" },
  { code: "JOD", name: "دينار أردني", flag: "🇯🇴" },
  { code: "LBP", name: "ليرة لبنانية", flag: "🇱🇧" },
  { code: "IQD", name: "دينار عراقي", flag: "🇮🇶" },
  { code: "TRY", name: "ليرة تركية", flag: "🇹🇷" },
  { code: "JPY", name: "ين ياباني", flag: "🇯🇵" },
  { code: "CNY", name: "يوان صيني", flag: "🇨🇳" },
  { code: "INR", name: "روبية هندية", flag: "🇮🇳" },
  { code: "PKR", name: "روبية باكستانية", flag: "🇵🇰" },
  { code: "MAD", name: "درهم مغربي", flag: "🇲🇦" },
  { code: "DZD", name: "دينار جزائري", flag: "🇩🇿" },
  { code: "TND", name: "دينار تونسي", flag: "🇹🇳" },
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("SAR");
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);
  const shareRef = useRef(null);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      const data = await res.json();
      if (data?.rates) {
        setRates({ base: from, rates: data.rates });
        setUpdatedAt(data.time_last_update_utc || new Date().toUTCString());
        toast.success("تم تحديث الأسعار");
      } else throw new Error();
    } catch {
      toast.error("تعذّر جلب الأسعار — تحقق من الاتصال");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from]);

  const converted = useMemo(() => {
    if (!rates || !amount) return null;
    const rate = rates.rates[to];
    if (!rate) return null;
    const val = parseFloat(amount) * rate;
    return { value: val, rate };
  }, [amount, rates, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 4 });

  return (
    <div data-testid="currency-page">
      <PageHeader
        icon={Coins}
        title="محول العملات"
        subtitle="أسعار حيّة من مصدر مجاني — تحدّث تلقائياً"
      />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="mb-5">
            <label className="text-sm font-medium mb-1.5 block">المبلغ</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              data-testid="currency-amount"
              className="w-full text-2xl font-bold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div>
              <label className="text-sm font-medium mb-1.5 block">من</label>
              <CurrencySelect value={from} onChange={setFrom} testid="currency-from" />
            </div>
            <button
              onClick={swap}
              data-testid="currency-swap"
              className="w-11 h-11 rounded-full bg-primary text-primary-foreground grid place-items-center hover:rotate-180 transition-transform"
              title="تبديل"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
            <div>
              <label className="text-sm font-medium mb-1.5 block">إلى</label>
              <CurrencySelect value={to} onChange={setTo} testid="currency-to" />
            </div>
          </div>

          <div ref={shareRef} className="mt-6 bg-primary text-primary-foreground rounded-xl p-6" data-testid="currency-result">
            <div className="text-xs text-primary-foreground/70 mb-2">النتيجة</div>
            <div className="font-display font-bold text-3xl sm:text-4xl number-display text-[hsl(var(--gold))]" data-testid="currency-value">
              {loading
                ? "..."
                : converted
                ? `${fmt(converted.value)} ${to}`
                : "—"}
            </div>
            {converted && (
              <div className="mt-2 text-sm text-primary-foreground/70">
                1 {from} = <span className="number-display font-semibold">{fmt(converted.rate)}</span> {to}
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <button
              onClick={fetchRates}
              disabled={loading}
              data-testid="currency-refresh"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-primary/50 text-sm font-medium disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              تحديث الأسعار
            </button>
            {updatedAt && (
              <div className="text-xs text-muted-foreground">
                آخر تحديث: {new Date(updatedAt).toLocaleString("ar-EG")}
              </div>
            )}
          </div>
        </div>

        {converted && (
          <ShareResult
            title="محول العملات"
            textLines={[
              `${amount} ${from} = ${fmt(converted.value)} ${to}`,
              `السعر: 1 ${from} = ${fmt(converted.rate)} ${to}`,
            ]}
            targetRef={shareRef}
          />
        )}
      </div>
    </div>
  );
};

const CurrencySelect = ({ value, onChange, testid }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    data-testid={testid}
    className="w-full text-base bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
  >
    {CURRENCIES.map((c) => (
      <option key={c.code} value={c.code}>
        {c.flag} {c.code} — {c.name}
      </option>
    ))}
  </select>
);

export default CurrencyConverter;
