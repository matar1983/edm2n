import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { PiggyBank, Plus, X } from "lucide-react";

const Budget = () => {
  const [income, setIncome] = useState("10000");
  const [rows, setRows] = useState([
    { id: 1, cat: "سكن", amount: "3000" },
    { id: 2, cat: "أكل وشراب", amount: "1500" },
    { id: 3, cat: "مواصلات", amount: "800" },
    { id: 4, cat: "فواتير", amount: "600" },
    { id: 5, cat: "قسط تمويل", amount: "1500" },
  ]);
  const shareRef = useRef(null);

  const totalExp = useMemo(() => rows.reduce((s, r) => s + (parseFloat(r.amount) || 0), 0), [rows]);
  const balance = (parseFloat(income) || 0) - totalExp;
  const savingsRate = income ? (balance / parseFloat(income)) * 100 : 0;

  const update = (id, k, v) => setRows((r) => r.map((row) => row.id === id ? { ...row, [k]: v } : row));
  const remove = (id) => setRows((r) => r.filter((row) => row.id !== id));
  const add = () => setRows((r) => [...r, { id: Date.now(), cat: "بند جديد", amount: "0" }]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 0 });

  return (
    <div data-testid="budget-page">
      <PageHeader icon={PiggyBank} title="مخطط الميزانية الشهرية" subtitle="تتبّع دخلك ومصاريفك" />
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">الدخل الشهري</span>
            <input type="number" value={income} min="0" onChange={(e) => setIncome(e.target.value)} data-testid="bg-income"
              className="w-full text-2xl font-bold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
          </label>
        </div>
        <div ref={shareRef} className="grid grid-cols-3 gap-3 mb-4">
          <Stat label="المصاريف" v={`${fmt(totalExp)} ريال`} color="rose" t="bg-total-exp" />
          <Stat label={balance >= 0 ? "المدّخر" : "العجز"} v={`${fmt(Math.abs(balance))} ريال`} color={balance >= 0 ? "emerald" : "rose"} t="bg-balance" />
          <Stat label="نسبة التوفير" v={`${savingsRate.toFixed(1)}%`} color={savingsRate >= 20 ? "emerald" : savingsRate >= 10 ? "amber" : "rose"} t="bg-rate" />
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-sm font-semibold mb-3">بنود المصاريف</div>
          <div className="space-y-2" data-testid="bg-rows">
            {rows.map((r) => (
              <div key={r.id} className="grid grid-cols-[1fr_120px_36px] gap-2 items-center">
                <input value={r.cat} onChange={(e) => update(r.id, "cat", e.target.value)} data-testid={`bg-cat-${r.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                <input type="number" value={r.amount} min="0" onChange={(e) => update(r.id, "amount", e.target.value)} data-testid={`bg-amount-${r.id}`}
                  className="bg-secondary/50 border border-border rounded-lg px-3 py-2 text-sm number-display focus:outline-none focus:border-primary" />
                <button onClick={() => remove(r.id)} data-testid={`bg-remove-${r.id}`}
                  className="w-9 h-9 rounded-full text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 grid place-items-center">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={add} data-testid="bg-add"
            className="mt-3 inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline">
            <Plus className="w-4 h-4" /> إضافة بند
          </button>
        </div>
        <ShareResult title="الميزانية الشهرية"
          textLines={[`💵 دخل: ${fmt(parseFloat(income) || 0)}`, `📉 مصاريف: ${fmt(totalExp)}`, `💰 مدّخر: ${fmt(balance)} (${savingsRate.toFixed(1)}%)`]}
          targetRef={shareRef} />
      </div>
    </div>
  );
};

const Stat = ({ label, v, color, t }) => {
  const map = {
    emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
    rose: "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300",
    amber: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300",
  };
  return (
    <div className={`border rounded-xl p-4 ${map[color]}`} data-testid={t}>
      <div className="text-xs mb-1">{label}</div>
      <div className="font-display font-bold text-xl number-display">{v}</div>
    </div>
  );
};

export default Budget;
