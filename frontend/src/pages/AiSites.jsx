import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Sparkles, Search, ExternalLink } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "الكل" },
  { id: "chat", label: "محادثة ونصوص" },
  { id: "image", label: "توليد صور" },
  { id: "video", label: "فيديو" },
  { id: "audio", label: "صوت وموسيقى" },
  { id: "code", label: "برمجة" },
  { id: "productivity", label: "إنتاجية" },
];

const SITES = [
  { name: "ChatGPT", url: "https://chat.openai.com", desc: "أشهر منصات المحادثة الذكية من OpenAI.", cat: "chat", color: "#10a37f" },
  { name: "Claude", url: "https://claude.ai", desc: "مساعد ذكي من Anthropic بقدرات تحليلية قوية.", cat: "chat", color: "#c96442" },
  { name: "Gemini", url: "https://gemini.google.com", desc: "المساعد الذكي من جوجل.", cat: "chat", color: "#4285f4" },
  { name: "Perplexity", url: "https://www.perplexity.ai", desc: "محرك بحث ذكي بإجابات مدعومة بالمصادر.", cat: "chat", color: "#20808d" },
  { name: "DeepSeek", url: "https://chat.deepseek.com", desc: "نموذج مفتوح المصدر بأداء تنافسي.", cat: "chat", color: "#5C6BFF" },
  { name: "Grok", url: "https://grok.com", desc: "مساعد من xAI بأسلوب مختلف.", cat: "chat", color: "#000000" },

  { name: "Midjourney", url: "https://www.midjourney.com", desc: "توليد صور فنية عالية الجودة.", cat: "image", color: "#000000" },
  { name: "DALL·E", url: "https://openai.com/dall-e-3", desc: "توليد صور من نص عبر OpenAI.", cat: "image", color: "#10a37f" },
  { name: "Leonardo AI", url: "https://leonardo.ai", desc: "منصة متكاملة لتصميم الصور بالذكاء الاصطناعي.", cat: "image", color: "#7c3aed" },
  { name: "Ideogram", url: "https://ideogram.ai", desc: "توليد صور تحوي نصوصاً بجودة عالية.", cat: "image", color: "#ef4444" },
  { name: "Nano Banana", url: "https://gemini.google.com", desc: "أحدث محرك صور من Google Gemini.", cat: "image", color: "#fbbf24" },

  { name: "Sora", url: "https://sora.com", desc: "توليد فيديو من نص من OpenAI.", cat: "video", color: "#000000" },
  { name: "Runway", url: "https://runwayml.com", desc: "منصة فيديو احترافية مدعومة بالذكاء الاصطناعي.", cat: "video", color: "#000000" },
  { name: "Kling AI", url: "https://klingai.com", desc: "توليد فيديوهات واقعية.", cat: "video", color: "#0ea5e9" },
  { name: "Pika", url: "https://pika.art", desc: "أنيميشن ومقاطع فيديو قصيرة.", cat: "video", color: "#ec4899" },

  { name: "ElevenLabs", url: "https://elevenlabs.io", desc: "توليد أصوات وقراءة نصوص واقعية.", cat: "audio", color: "#000000" },
  { name: "Suno", url: "https://suno.com", desc: "توليد أغاني كاملة بالذكاء الاصطناعي.", cat: "audio", color: "#000000" },
  { name: "Udio", url: "https://www.udio.com", desc: "توليد موسيقى إبداعية.", cat: "audio", color: "#8b5cf6" },

  { name: "GitHub Copilot", url: "https://github.com/features/copilot", desc: "مساعد برمجة داخل المحرر.", cat: "code", color: "#24292e" },
  { name: "Cursor", url: "https://cursor.com", desc: "محرر برمجي مدعوم بالذكاء الاصطناعي.", cat: "code", color: "#000000" },
  { name: "v0", url: "https://v0.dev", desc: "توليد واجهات React جاهزة من نص.", cat: "code", color: "#000000" },
  { name: "Bolt", url: "https://bolt.new", desc: "بناء تطبيقات كاملة من دفعة واحدة.", cat: "code", color: "#3178c6" },

  { name: "Notion AI", url: "https://www.notion.so/product/ai", desc: "الذكاء الاصطناعي داخل مستندات Notion.", cat: "productivity", color: "#000000" },
  { name: "Gamma", url: "https://gamma.app", desc: "توليد عروض تقديمية جميلة بسرعة.", cat: "productivity", color: "#a855f7" },
  { name: "NotebookLM", url: "https://notebooklm.google.com", desc: "مساعد قراءة وأبحاث من جوجل.", cat: "productivity", color: "#4285f4" },
];

const AiSites = () => {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const filtered = SITES.filter((s) => {
    const okCat = cat === "all" || s.cat === cat;
    const okQ =
      !q.trim() ||
      s.name.toLowerCase().includes(q.toLowerCase()) ||
      s.desc.includes(q);
    return okCat && okQ;
  });

  return (
    <div data-testid="ai-page">
      <PageHeader
        icon={Sparkles}
        title="أهم مواقع الذكاء الاصطناعي"
        subtitle="دليل مختصر لأشهر الأدوات، مصنّف حسب المجال"
      />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-5 mb-5">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث عن أداة..."
              data-testid="ai-search"
              className="w-full bg-secondary/50 border border-border rounded-xl pr-10 pl-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap gap-2" data-testid="ai-categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                data-testid={`ai-cat-${c.id}`}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  cat === c.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-foreground/70 hover:border-primary/50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="ai-grid">
          {filtered.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              data-testid={`ai-site-${s.name.replace(/\s+/g, "-").toLowerCase()}`}
              className="tile-hover bg-card border border-border rounded-2xl p-5 flex gap-4 items-start"
            >
              <div
                className="w-11 h-11 rounded-xl grid place-items-center text-white font-display font-bold shrink-0"
                style={{ backgroundColor: s.color }}
              >
                {s.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-display font-bold truncate">{s.name}</div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </div>
              </div>
            </a>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-10">
              لا توجد نتائج مطابقة.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiSites;
