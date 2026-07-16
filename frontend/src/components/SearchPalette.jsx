import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { TOOLS, CATEGORIES } from "@/data/tools";

const SearchPalette = ({ open, onClose }) => {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return TOOLS.slice(0, 8);
    const query = q.toLowerCase();
    return TOOLS.filter((t) =>
      t.title.toLowerCase().includes(query) ||
      t.desc.toLowerCase().includes(query) ||
      t.to.includes(query)
    ).slice(0, 12);
  }, [q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} data-testid="search-palette">
      <div className="max-w-2xl mx-auto mt-20 px-4" onClick={(e) => e.stopPropagation()}>
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ابحث عن أداة (مثال: زكاة، QR، تمويل...)"
              autoFocus
              data-testid="search-input"
              className="flex-1 bg-transparent border-0 focus:outline-none text-lg"
            />
            <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary" data-testid="search-close">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="max-h-[420px] overflow-auto" data-testid="search-results">
            {results.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">لا نتائج مطابقة</div>
            ) : (
              <div className="p-2">
                {results.map((t) => {
                  const cat = CATEGORIES.find((c) => c.id === t.cat);
                  const Icon = t.icon;
                  return (
                    <Link
                      key={t.to}
                      to={t.to}
                      onClick={onClose}
                      data-testid={`search-result-${t.to.replace("/", "")}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{t.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{t.desc}</div>
                      </div>
                      {cat && (
                        <span className="text-[10px] font-semibold text-muted-foreground shrink-0 hidden sm:inline">
                          {cat.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <div className="px-5 py-2.5 border-t border-border bg-secondary/40 text-[11px] text-muted-foreground flex items-center justify-between">
            <span>{results.length} نتيجة</span>
            <span>اضغط ESC للإغلاق</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPalette;
