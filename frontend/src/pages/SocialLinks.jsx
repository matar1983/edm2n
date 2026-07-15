import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { LinkIcon, Send } from "lucide-react";
import { toast } from "sonner";

const PLATFORMS = [
  {
    id: "telegram", label: "تلغرام", icon: "✈️",
    color: "bg-sky-500",
    prefix: "t.me/",
    hint: "أدخل اسم المستخدم أو الرقم مع مفتاح الدولة",
    build: (v) => `https://t.me/${v.replace(/^@/, "")}`,
  },
  {
    id: "snapchat", label: "سناب شات", icon: "👻",
    color: "bg-yellow-400",
    prefix: "snapchat.com/add/",
    hint: "أدخل اسم المستخدم",
    build: (v) => `https://www.snapchat.com/add/${v.replace(/^@/, "")}`,
  },
  {
    id: "instagram", label: "إنستقرام", icon: "📷",
    color: "bg-gradient-to-br from-fuchsia-500 to-orange-500",
    prefix: "instagram.com/",
    hint: "أدخل اسم المستخدم",
    build: (v) => `https://www.instagram.com/${v.replace(/^@/, "")}`,
  },
  {
    id: "twitter", label: "X / تويتر", icon: "𝕏",
    color: "bg-black",
    prefix: "x.com/",
    hint: "أدخل اسم المستخدم",
    build: (v) => `https://x.com/${v.replace(/^@/, "")}`,
  },
  {
    id: "tiktok", label: "تيك توك", icon: "🎵",
    color: "bg-black",
    prefix: "tiktok.com/@",
    hint: "أدخل اسم المستخدم",
    build: (v) => `https://www.tiktok.com/@${v.replace(/^@/, "")}`,
  },
  {
    id: "youtube", label: "يوتيوب", icon: "▶️",
    color: "bg-red-600",
    prefix: "youtube.com/@",
    hint: "أدخل اسم القناة",
    build: (v) => `https://www.youtube.com/@${v.replace(/^@/, "")}`,
  },
];

const SocialLinks = () => {
  const [platform, setPlatform] = useState("telegram");
  const [username, setUsername] = useState("");

  const p = PLATFORMS.find((x) => x.id === platform);
  const clean = username.trim().replace(/^@/, "");
  const link = clean ? p.build(clean) : "";

  const open = () => {
    if (!link) return toast.error("أدخل اسم المستخدم");
    window.open(link, "_blank");
  };

  const copy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    toast.success("تم النسخ");
  };

  return (
    <div data-testid="social-page">
      <PageHeader icon={LinkIcon} title="فتح روابط السوشيال" subtitle="افتح حساب أي شخص بدون حفظه في متابعينك" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <label className="text-sm font-medium mb-2 block">اختر المنصّة</label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6" data-testid="social-platforms">
            {PLATFORMS.map((pl) => (
              <button key={pl.id} onClick={() => setPlatform(pl.id)} data-testid={`social-${pl.id}`}
                className={`p-3 rounded-xl border transition-all ${
                  platform === pl.id
                    ? "border-primary bg-primary/5 scale-105"
                    : "border-border hover:border-primary/50"
                }`}>
                <div className="text-2xl mb-1">{pl.icon}</div>
                <div className="text-xs font-medium">{pl.label}</div>
              </button>
            ))}
          </div>

          <label className="block mb-5">
            <span className="text-sm font-medium mb-1.5 block">اسم المستخدم</span>
            <div className="relative">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                data-testid="social-username" placeholder="username"
                dir="ltr"
                className="w-full text-lg bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary text-left" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">{p.hint}</div>
          </label>

          {link && (
            <div className="mb-4 p-4 rounded-xl bg-secondary/60 border border-border" data-testid="social-preview">
              <div className="text-xs text-muted-foreground mb-1">الرابط</div>
              <div dir="ltr" className="text-sm text-primary font-medium break-all">{link}</div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button onClick={open} data-testid="social-open"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90">
              <Send className="w-4 h-4" /> فتح الحساب
            </button>
            <button onClick={copy} disabled={!link} data-testid="social-copy"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border font-medium hover:bg-secondary disabled:opacity-40">
              نسخ الرابط
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
