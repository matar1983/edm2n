import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Hash, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const TOPICS = {
  general: ["السعودية", "الرياض", "جدة", "الخليج", "العرب", "اليوم", "الآن", "خبر"],
  food: ["طعام", "مطاعم", "طبخ", "وصفات", "أكلات", "شيف", "لذيذ", "شهية"],
  travel: ["سفر", "سياحة", "رحلات", "استكشاف", "مغامرة", "شواطئ", "جبال", "طبيعة"],
  tech: ["تقنية", "برمجة", "ذكاء_اصطناعي", "تطوير", "ابتكار", "iPhone", "Android"],
  business: ["ريادة_أعمال", "استثمار", "شركات", "تسويق", "نجاح", "أعمال", "ماركتنق"],
  fitness: ["رياضة", "لياقة", "صحة", "تمارين", "جيم", "بروتين", "دايت"],
  fashion: ["أزياء", "موضة", "استايل", "أناقة", "عبايات", "عطور", "جمال"],
  islamic: ["إسلامي", "قرآن", "دعاء", "أذكار", "رمضان", "الحج", "الصلاة"],
};

const HashtagGen = () => {
  const [topic, setTopic] = useState("general");
  const [custom, setCustom] = useState("");
  const [tags, setTags] = useState([]);

  const generate = () => {
    const base = [...TOPICS[topic]];
    if (custom.trim()) {
      base.push(...custom.split(/[،,]/).map((t) => t.trim()).filter(Boolean));
    }
    // Shuffle and take 12-15
    const shuffled = base.sort(() => Math.random() - 0.5).slice(0, 15);
    setTags(shuffled.map((t) => `#${t}`));
  };

  const copyAll = async () => {
    if (tags.length === 0) return;
    await navigator.clipboard.writeText(tags.join(" "));
    toast.success("تم نسخ كل الهاشتاقات");
  };

  return (
    <div data-testid="hashtags-page">
      <PageHeader icon={Hash} title="مولّد الهاشتاقات" subtitle="هاشتاقات عربية جاهزة لأي موضوع" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">الموضوع</label>
            <div className="flex flex-wrap gap-2" data-testid="ht-topics">
              {Object.keys(TOPICS).map((t) => {
                const labels = { general: "عام", food: "طعام", travel: "سفر", tech: "تقنية", business: "أعمال", fitness: "رياضة", fashion: "أزياء", islamic: "إسلامي" };
                return (
                  <button key={t} onClick={() => setTopic(t)} data-testid={`ht-topic-${t}`}
                    className={`text-xs px-3 py-1.5 rounded-full border transition ${
                      topic === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
                    }`}>
                    {labels[t]}
                  </button>
                );
              })}
            </div>
          </div>
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">كلمات إضافية (افصل بفاصلة)</span>
            <input type="text" value={custom} onChange={(e) => setCustom(e.target.value)} data-testid="ht-custom"
              placeholder="مثال: مطعم, جدة, برجر"
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
          </label>
          <button onClick={generate} data-testid="ht-generate"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90">
            <RefreshCw className="w-4 h-4" /> ولّد هاشتاقات
          </button>
        </div>

        {tags.length > 0 && (
          <div className="mt-4 bg-primary text-primary-foreground rounded-2xl p-6" data-testid="ht-result">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[hsl(var(--gold))] font-semibold text-sm">الهاشتاقات ({tags.length})</div>
              <button onClick={copyAll} data-testid="ht-copy-all"
                className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20">
                <Copy className="w-3.5 h-3.5" /> نسخ الكل
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <span key={i} className="text-sm bg-primary-foreground/10 rounded-full px-3 py-1">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HashtagGen;
