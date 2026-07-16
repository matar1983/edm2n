import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, ArrowLeft, Star, Sparkles } from "lucide-react";
import { CATEGORIES, TOOLS } from "@/data/tools";
import { useFavorites } from "@/contexts/FavoritesContext";
import SearchPalette from "@/components/SearchPalette";

const CAT_COLORS = {
  emerald: "from-emerald-500/20 to-emerald-600/5 text-emerald-700 dark:text-emerald-300",
  teal: "from-teal-500/20 to-teal-600/5 text-teal-700 dark:text-teal-300",
  rose: "from-rose-500/20 to-rose-600/5 text-rose-700 dark:text-rose-300",
  indigo: "from-indigo-500/20 to-indigo-600/5 text-indigo-700 dark:text-indigo-300",
  cyan: "from-cyan-500/20 to-cyan-600/5 text-cyan-700 dark:text-cyan-300",
  slate: "from-slate-500/20 to-slate-600/5 text-slate-700 dark:text-slate-300",
  violet: "from-violet-500/20 to-violet-600/5 text-violet-700 dark:text-violet-300",
  pink: "from-pink-500/20 to-pink-600/5 text-pink-700 dark:text-pink-300",
  amber: "from-amber-500/20 to-amber-600/5 text-amber-700 dark:text-amber-300",
  orange: "from-orange-500/20 to-orange-600/5 text-orange-700 dark:text-orange-300",
};

const Home = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const { favs } = useFavorites();

  const favTools = TOOLS.filter((t) => favs.includes(t.to));
  const featured = TOOLS.filter((t) => ["/finance", "/zakat", "/qibla", "/currency"].includes(t.to));

  return (
    <div data-testid="home-page">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))]" />
            {TOOLS.length} أداة عربية أنيقة
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.15] max-w-3xl mx-auto">
            دليل مطر الإلكتروني
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            كل الحاسبات والمحوّلات والأدوات اليومية في مكان واحد.
          </p>

          {/* Big search */}
          <button
            onClick={() => setSearchOpen(true)}
            data-testid="hero-search-btn"
            className="mt-8 mx-auto flex items-center gap-3 w-full max-w-xl bg-card border border-border hover:border-primary/50 rounded-2xl px-5 py-4 transition-colors group text-right"
          >
            <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            <span className="flex-1 text-muted-foreground">ابحث عن أداة...</span>
            <kbd className="hidden sm:inline text-xs font-mono px-2 py-0.5 bg-secondary rounded border border-border">⌘K</kbd>
          </button>
        </div>
      </section>

      {/* Favorites */}
      {favTools.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-[hsl(var(--gold))]" fill="currentColor" />
            <h2 className="font-display font-bold text-lg">أدواتك المفضّلة</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" data-testid="home-favs">
            {favTools.map((t) => {
              const Icon = t.icon;
              return (
                <Link key={t.to} to={t.to} data-testid={`home-fav-${t.to.replace("/", "")}`}
                  className="tile-hover bg-card border border-[hsl(var(--gold))]/40 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] grid place-items-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{t.title}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="font-display font-bold text-lg">الأكثر استخداماً</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-testid="home-featured">
          {featured.map((t) => {
            const Icon = t.icon;
            return (
              <Link key={t.to} to={t.to} data-testid={`home-featured-${t.to.replace("/", "")}`}
                className="tile-hover bg-primary text-primary-foreground rounded-2xl p-5">
                <div className="w-11 h-11 rounded-xl bg-primary-foreground/10 grid place-items-center mb-3">
                  <Icon className="w-5 h-5 text-[hsl(var(--gold))]" />
                </div>
                <div className="font-display font-bold text-base mb-1">{t.title}</div>
                <div className="text-xs text-primary-foreground/70">{t.desc}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-6 pb-16">
        <h2 className="font-display font-bold text-2xl mb-1">تصفّح حسب الفئة</h2>
        <p className="text-sm text-muted-foreground mb-6">{CATEGORIES.length} فئة تجمع كل الأدوات</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="home-cats">
          {CATEGORIES.map((c) => {
            const count = TOOLS.filter((t) => t.cat === c.id).length;
            const Icon = c.icon;
            const cls = CAT_COLORS[c.color] || CAT_COLORS.emerald;
            return (
              <Link key={c.id} to={`/category/${c.id}`} data-testid={`home-cat-${c.id}`}
                className="tile-hover relative bg-card border border-border rounded-2xl p-6 overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-bl ${cls.split(" text-")[0]} opacity-40 pointer-events-none`} />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-display font-bold text-lg mb-1">{c.label}</div>
                  <div className="text-sm text-muted-foreground">
                    <span className="number-display font-semibold">{count}</span> أداة
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    استعرض <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default Home;
