import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Compass, MapPin } from "lucide-react";
import { toast } from "sonner";

// Kaaba coordinates
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

const toRad = (d) => (d * Math.PI) / 180;
const toDeg = (r) => (r * 180) / Math.PI;

const calcQibla = (lat, lon) => {
  const phi1 = toRad(lat);
  const phi2 = toRad(KAABA_LAT);
  const dL = toRad(KAABA_LON - lon);
  const y = Math.sin(dL);
  const x = Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(dL);
  let brng = toDeg(Math.atan2(y, x));
  return (brng + 360) % 360;
};

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};

const Qibla = () => {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [locName, setLocName] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("متصفحك لا يدعم تحديد الموقع");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(4));
        setLon(pos.coords.longitude.toFixed(4));
        setLocName("موقعك الحالي");
        toast.success("تم تحديد الموقع");
      },
      () => toast.error("تعذّر الحصول على موقعك")
    );
  };

  const bearing = lat && lon ? calcQibla(parseFloat(lat), parseFloat(lon)) : null;
  const distance = lat && lon ? haversine(parseFloat(lat), parseFloat(lon), KAABA_LAT, KAABA_LON) : null;

  return (
    <div data-testid="qibla-page">
      <PageHeader icon={Compass} title="اتجاه القبلة" subtitle="حدّد موقعك لمعرفة اتجاه المسجد الحرام" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <button onClick={getLocation} data-testid="qibla-locate"
            className="w-full mb-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90">
            <MapPin className="w-4 h-4" />
            استخدم موقعي الحالي
          </button>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">خط العرض (Lat)</span>
              <input type="number" value={lat} step="0.0001" onChange={(e) => setLat(e.target.value)}
                data-testid="qibla-lat" placeholder="24.7136"
                className="w-full text-base number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">خط الطول (Lon)</span>
              <input type="number" value={lon} step="0.0001" onChange={(e) => setLon(e.target.value)}
                data-testid="qibla-lon" placeholder="46.6753"
                className="w-full text-base number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
            </label>
          </div>

          {bearing !== null && (
            <div className="bg-primary text-primary-foreground rounded-2xl p-6" data-testid="qibla-result">
              <div className="text-xs text-primary-foreground/70 mb-1">اتجاه القبلة (من الشمال)</div>
              <div className="font-display font-bold text-5xl number-display text-[hsl(var(--gold))]" data-testid="qibla-bearing">
                {bearing.toFixed(1)}°
              </div>
              <div className="mt-6 flex items-center justify-center">
                <div className="relative w-48 h-48 rounded-full border-4 border-primary-foreground/30 grid place-items-center">
                  <div className="absolute inset-2 rounded-full border border-primary-foreground/10" />
                  <div className="text-xs absolute top-1 text-[hsl(var(--gold))] font-bold">شمال</div>
                  <div className="text-xs absolute bottom-1 text-primary-foreground/50">جنوب</div>
                  <div className="text-xs absolute right-1 text-primary-foreground/50">شرق</div>
                  <div className="text-xs absolute left-1 text-primary-foreground/50">غرب</div>
                  <div
                    className="absolute w-1 h-20 bg-[hsl(var(--gold))] rounded-full origin-bottom"
                    style={{
                      transform: `translateY(-40px) rotate(${bearing}deg)`,
                      transformOrigin: "50% 100%",
                    }}
                  />
                  <div className="w-3 h-3 rounded-full bg-[hsl(var(--gold))]" />
                </div>
              </div>
              <div className="mt-6 text-sm text-primary-foreground/80 number-display" data-testid="qibla-distance">
                المسافة إلى مكة: {distance.toLocaleString("ar-EG", { maximumFractionDigits: 1 })} كم
              </div>
              <div className="mt-3 text-xs text-primary-foreground/60 leading-relaxed">
                وجّه هاتفك أو بوصلتك بحيث يشير الشمال المغناطيسي إلى ٠°، ثم اتّجه بزاوية {bearing.toFixed(1)}° لتواجه القبلة.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Qibla;
