import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { AlignJustify, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const WORDS = [
  "بسم","لقد","إن","كل","حيث","بعد","قبل","الآن","اليوم","غداً","أمس","دائماً","أحياناً",
  "الحياة","الوقت","الطريق","الأمل","النور","الظل","الحلم","الحقيقة","الجمال","القوة","الحكمة",
  "بلد","مدينة","قرية","صحراء","بحر","نهر","جبل","سماء","نجم","قمر","شمس","سحاب","مطر","ريح",
  "قلب","عقل","روح","يد","عين","صوت","خطى","كلمة","قصة","حكاية","رواية","شعر","نثر","قصيدة",
  "سلام","حب","صدق","وفاء","أمانة","شرف","كرامة","عزيمة","إرادة","صبر","تفاؤل","إيمان","رجاء",
  "من","إلى","على","في","عن","لكل","بكل","فيها","معها","بها","لها","إليها","حولها"
];

const LoremArabic = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerP, setWordsPerP] = useState(50);
  const [text, setText] = useState("");

  const gen = () => {
    const paras = [];
    for (let p = 0; p < paragraphs; p++) {
      const sentences = [];
      let wordsLeft = wordsPerP;
      while (wordsLeft > 0) {
        const sLen = Math.min(wordsLeft, 6 + Math.floor(Math.random() * 8));
        const words = Array.from({ length: sLen }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
        sentences.push(words.join(" ") + ".");
        wordsLeft -= sLen;
      }
      paras.push(sentences.join(" "));
    }
    setText(paras.join("\n\n"));
  };

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    toast.success("تم النسخ");
  };

  return (
    <div data-testid="lorem-page">
      <PageHeader icon={AlignJustify} title="Lorem Ipsum عربي" subtitle="نص وهمي عربي لملء التصاميم" />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">عدد الفقرات</span>
              <input type="number" value={paragraphs} min="1" max="20"
                onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)} data-testid="lorem-p"
                className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">الكلمات لكل فقرة</span>
              <input type="number" value={wordsPerP} min="10" max="200"
                onChange={(e) => setWordsPerP(parseInt(e.target.value) || 10)} data-testid="lorem-w"
                className="w-full text-lg font-semibold number-display bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-primary" />
            </label>
          </div>
          <div className="flex gap-2 mb-4">
            <button onClick={gen} data-testid="lorem-gen"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90">
              <RefreshCw className="w-4 h-4" /> توليد
            </button>
            {text && (
              <button onClick={copy} data-testid="lorem-copy"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border font-medium hover:bg-secondary">
                <Copy className="w-4 h-4" /> نسخ
              </button>
            )}
          </div>
          {text && (
            <div className="bg-secondary/40 border border-border rounded-xl p-4 whitespace-pre-wrap text-base leading-relaxed" data-testid="lorem-text">
              {text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoremArabic;
