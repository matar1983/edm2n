import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Clock } from "lucide-react";

const TimestampConv = () => {
  const [ts, setTs] = useState(Math.floor(Date.now() / 1000));
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 19));
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const dateFromTs = new Date(parseInt(ts) * 1000);
  const tsFromDate = Math.floor(new Date(dateStr).getTime() / 1000);

  return (
    <div data-testid="ts-page">
      <PageHeader icon={Clock} title="محوّل Unix Timestamp" subtitle="بين الرقم والتاريخ القابل للقراءة" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12 space-y-4">
        <div className="bg-primary text-primary-foreground rounded-2xl p-6 text-center">
          <div className="text-xs text-[hsl(var(--gold))] font-semibold mb-1">Timestamp الحالي</div>
          <div dir="ltr" className="font-mono font-bold text-4xl number-display" data-testid="ts-now">{now}</div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-sm font-semibold mb-2">Timestamp → تاريخ</div>
          <input type="number" value={ts} onChange={(e) => setTs(e.target.value)} data-testid="ts-input"
            dir="ltr"
            className="w-full font-mono text-lg bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
          {!isNaN(dateFromTs.getTime()) && (
            <div className="mt-3 bg-primary/5 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">ISO 8601</div>
              <div dir="ltr" className="font-mono text-sm number-display" data-testid="ts-iso">{dateFromTs.toISOString()}</div>
              <div className="text-xs text-muted-foreground mt-2">محلي</div>
              <div className="text-sm number-display" data-testid="ts-local">{dateFromTs.toLocaleString("ar-EG")}</div>
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="text-sm font-semibold mb-2">تاريخ → Timestamp</div>
          <input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} data-testid="ts-date-input"
            className="w-full text-lg number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
          {!isNaN(tsFromDate) && (
            <div className="mt-3 bg-primary/5 rounded-lg p-3">
              <div className="text-xs text-muted-foreground">Unix timestamp (ثانية)</div>
              <div dir="ltr" className="font-mono text-xl font-bold number-display" data-testid="ts-out-sec">{tsFromDate}</div>
              <div className="text-xs text-muted-foreground mt-2">ميلي ثانية</div>
              <div dir="ltr" className="font-mono text-lg number-display" data-testid="ts-out-ms">{tsFromDate * 1000}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimestampConv;
