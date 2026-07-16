import { Link, useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Search, Star } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { CATEGORIES, TOOLS, findCategory } from "@/data/tools";
import { useFavorites } from "@/contexts/FavoritesContext";

const Category = () => {
  const { id } = useParams();
  const [q, setQ] = useState("");
  const cat = findCategory(id);
  const { isFav, toggle } = useFavorites();

  if (!cat) return <Navigate to="/" replace />;
  const Icon = cat.icon;

  const tools = TOOLS.filter((t) => t.cat === id).filter((t) =>
    !q.trim() ||
    t.title.toLowerCase().includes(q.toLowerCase()) ||
    t.desc.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div data-testid={`category-page-${id}`}>
      <PageHeader icon={Icon} title={cat.label} subtitle={`${TOOLS.filter((t) => t.cat === id).length} أداة في هذه الفئة`} />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-12">
        <div className="relative mb-5">
          <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث ضمن هذه الفئة..."
            data-testid={`category-search-${id}`}
            className="w-full bg-card border border-border rounded-xl pr-10 pl-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid={`category-grid-${id}`}>
          {tools.map((t) => {
            const TIcon = t.icon;
            const fav = isFav(t.to);
            return (
              <div key={t.to} className="tile-hover relative bg-card border border-border rounded-2xl p-5 group" data-testid={`cat-tile-${t.to.replace("/", "")}`}>
                <button
                  onClick={(e) => { e.preventDefault(); toggle(t.to); }}
                  data-testid={`fav-${t.to.replace("/", "")}`}
                  className={`absolute top-3 left-3 w-8 h-8 rounded-full grid place-items-center transition-colors z-10 ${
                    fav ? "text-[hsl(var(--gold))]" : "text-muted-foreground/40 hover:text-[hsl(var(--gold))]"
                  }`}
                >
                  <Star className="w-4 h-4" fill={fav ? "currentColor" : "none"} />
                </button>
                <Link to={t.to} className="block">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary grid place-items-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <TIcon className="w-5 h-5" />
                  </div>
                  <div className="font-display font-bold mb-1">{t.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{t.desc}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    فتح <ArrowLeft className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            );
          })}
          {tools.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-10">لا نتائج مطابقة.</div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-4 h-4 rotate-180" /> العودة لكل الفئات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
