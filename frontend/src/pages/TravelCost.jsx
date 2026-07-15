import { useState, useMemo, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import ShareResult from "@/components/ShareResult";
import { Plane } from "lucide-react";

const TravelCost = () => {
  const [ticket, setTicket] = useState("2000");
  const [nights, setNights] = useState("5");
  const [hotelPerNight, setHotelPerNight] = useState("400");
  const [days, setDays] = useState("6");
  const [transportPerDay, setTransportPerDay] = useState("100");
  const [foodPerDay, setFoodPerDay] = useState("150");
  const [other, setOther] = useState("500");
  const [persons, setPersons] = useState("2");
  const shareRef = useRef(null);

  const result = useMemo(() => {
    const tk = parseFloat(ticket) || 0;
    const nt = parseFloat(nights) || 0;
    const hp = parseFloat(hotelPerNight) || 0;
    const dy = parseFloat(days) || 0;
    const tp = parseFloat(transportPerDay) || 0;
    const fp = parseFloat(foodPerDay) || 0;
    const ot = parseFloat(other) || 0;
    const p = parseFloat(persons) || 1;

    const flights = tk * p;
    const hotels = nt * hp;
    const transport = dy * tp * p;
    const food = dy * fp * p;
    const total = flights + hotels + transport + food + ot;
    const perPerson = p > 0 ? total / p : total;
    return { flights, hotels, transport, food, other: ot, total, perPerson };
  }, [ticket, nights, hotelPerNight, days, transportPerDay, foodPerDay, other, persons]);

  const fmt = (n) => n.toLocaleString("ar-EG", { maximumFractionDigits: 2 });

  return (
    <div data-testid="travel-page">
      <PageHeader
        icon={Plane}
        title="حاسبة تكلفة السفر"
        subtitle="التذاكر + الفندق + المواصلات + الطعام"
      />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="عدد المسافرين" value={persons} onChange={setPersons} testid="travel-persons" suffix="فرد" />
              <Field label="تذكرة الطيران/شخص" value={ticket} onChange={setTicket} testid="travel-ticket" suffix="ريال" />
              <Field label="عدد الليالي" value={nights} onChange={setNights} testid="travel-nights" suffix="ليلة" />
              <Field label="الفندق/الليلة" value={hotelPerNight} onChange={setHotelPerNight} testid="travel-hotel" suffix="ريال" />
              <Field label="عدد الأيام" value={days} onChange={setDays} testid="travel-days" suffix="يوم" />
              <Field label="مواصلات/يوم/شخص" value={transportPerDay} onChange={setTransportPerDay} testid="travel-transport" suffix="ريال" />
              <Field label="طعام/يوم/شخص" value={foodPerDay} onChange={setFoodPerDay} testid="travel-food" suffix="ريال" />
              <Field label="مصاريف أخرى" value={other} onChange={setOther} testid="travel-other" suffix="ريال" />
            </div>
          </div>
          <div ref={shareRef} className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 relative overflow-hidden" data-testid="travel-result">
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-[hsl(var(--gold))]/10 -translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--gold))] font-semibold mb-1">
                الإجمالي
              </div>
              <div className="font-display font-bold text-4xl sm:text-5xl number-display" data-testid="travel-total">
                {fmt(result.total)}<span className="text-base font-medium text-primary-foreground/70 mr-2">ريال</span>
              </div>
              <div className="mt-6 space-y-3">
                <Row label="التذاكر" value={`${fmt(result.flights)} ريال`} testid="travel-flights" />
                <Row label="الفنادق" value={`${fmt(result.hotels)} ريال`} testid="travel-hotels" />
                <Row label="المواصلات" value={`${fmt(result.transport)} ريال`} testid="travel-transport-total" />
                <Row label="الطعام" value={`${fmt(result.food)} ريال`} testid="travel-food-total" />
                <Row label="أخرى" value={`${fmt(result.other)} ريال`} testid="travel-other-total" />
                <Row label="نصيب الفرد" value={`${fmt(result.perPerson)} ريال`} highlight testid="travel-per-person" />
              </div>
            </div>
          </div>
        </div>
        <ShareResult
          title="حاسبة تكلفة السفر"
          textLines={[
            `👥 ${persons} مسافرون | ${nights} ليالي | ${days} أيام`,
            `✈️ التذاكر: ${fmt(result.flights)}`,
            `🏨 الفنادق: ${fmt(result.hotels)}`,
            `🚗 المواصلات: ${fmt(result.transport)}`,
            `🍽️ الطعام: ${fmt(result.food)}`,
            `💰 الإجمالي: ${fmt(result.total)} ريال (${fmt(result.perPerson)} للفرد)`,
          ]}
          targetRef={shareRef}
        />
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, testid, suffix }) => (
  <label className="block">
    <span className="text-xs font-medium mb-1 block">{label}</span>
    <div className="relative">
      <input type="number" value={value} min="0"
        onChange={(e) => onChange(e.target.value)} data-testid={testid}
        className="w-full text-base font-semibold number-display bg-secondary/50 border border-border rounded-lg px-3 py-2 pl-12 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suffix}</span>
    </div>
  </label>
);

const Row = ({ label, value, highlight, testid }) => (
  <div className="flex items-center justify-between gap-3 pb-2 border-b border-primary-foreground/10">
    <span className="text-sm text-primary-foreground/70">{label}</span>
    <span className={`number-display font-semibold ${highlight ? "text-[hsl(var(--gold))]" : ""}`} data-testid={testid}>{value}</span>
  </div>
);

export default TravelCost;
