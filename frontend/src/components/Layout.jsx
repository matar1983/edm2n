import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Search, ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import SearchPalette from "@/components/SearchPalette";
import { CATEGORIES } from "@/data/tools";

const Layout = ({ children }) => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setCatsOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col arabesque-bg" data-testid="layout-root">
      <header className="border-b border-border/60 bg-background/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group" data-testid="header-logo">
            <div className="relative w-11 h-11 rounded-2xl bg-primary text-primary-foreground grid place-items-center shadow-lg shadow-primary/20 transition-transform group-hover:rotate-6">
              <Moon className="w-5 h-5" strokeWidth={2.2} />
              <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-[hsl(var(--gold))] ring-2 ring-background" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-lg leading-tight">دليل مطر</div>
              <div className="text-[11px] text-muted-foreground -mt-0.5">الدليل الإلكتروني</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 mr-4">
            <Link to="/" data-testid="nav-home"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                location.pathname === "/" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground hover:bg-secondary"
              }`}>الرئيسية</Link>
            <div className="relative">
              <button onClick={() => setCatsOpen(!catsOpen)} data-testid="nav-cats-btn"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary">
                الفئات <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catsOpen ? "rotate-180" : ""}`} />
              </button>
              {catsOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-card border border-border rounded-2xl shadow-2xl p-2 z-50" data-testid="nav-cats-menu">
                  {CATEGORIES.map((c) => {
                    const Icon = c.icon;
                    return (
                      <Link key={c.id} to={`/category/${c.id}`} data-testid={`nav-cat-${c.id}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary grid place-items-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{c.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <Link to="/contact" data-testid="nav-contact"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                location.pathname === "/contact" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground hover:bg-secondary"
              }`}>اتصل بي</Link>
          </nav>

          <div className="flex-1" />

          <button onClick={() => setSearchOpen(true)} data-testid="header-search-btn"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/70 border border-border">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline text-xs text-muted-foreground">بحث</span>
            <kbd className="hidden lg:inline text-[10px] font-mono px-1.5 py-0.5 bg-background rounded border border-border">⌘K</kbd>
          </button>
          <ThemeToggle />
          <button onClick={() => setMobileOpen(!mobileOpen)} data-testid="mobile-menu-btn"
            className="md:hidden w-10 h-10 rounded-full bg-secondary border border-border grid place-items-center">
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/60 bg-background/95" data-testid="mobile-menu">
            <div className="max-w-6xl mx-auto px-5 py-3 space-y-1">
              <Link to="/" className="block px-3 py-2 rounded-lg hover:bg-secondary text-sm font-medium">الرئيسية</Link>
              <div className="text-xs text-muted-foreground px-3 pt-2 pb-1 font-semibold">الفئات</div>
              {CATEGORIES.map((c) => (
                <Link key={c.id} to={`/category/${c.id}`} className="block px-3 py-2 rounded-lg hover:bg-secondary text-sm">
                  {c.label}
                </Link>
              ))}
              <Link to="/contact" className="block px-3 py-2 rounded-lg hover:bg-secondary text-sm font-medium mt-2 border-t border-border pt-3">اتصل بي</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full">{children}</main>

      <footer className="mt-16 border-t border-border/60 bg-primary text-primary-foreground" data-testid="footer-root">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[hsl(var(--gold))] text-primary grid place-items-center">
                  <Moon className="w-4 h-4" />
                </div>
                <div className="font-display font-bold text-lg">دليل مطر الإلكتروني</div>
              </div>
              <p className="text-sm text-primary-foreground/75 leading-relaxed">
                مجموعة أدوات وحاسبات عربية أنيقة — تصميم عصري بروح كلاسيكية.
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold mb-3 text-[hsl(var(--gold))]">فئات مختارة</div>
              <div className="grid grid-cols-2 gap-y-1.5 text-sm">
                {CATEGORIES.slice(0, 6).map((c) => (
                  <Link key={c.id} to={`/category/${c.id}`}
                    className="text-primary-foreground/80 hover:text-[hsl(var(--gold))] transition-colors">
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/70">
            <div>جميع الحقوق محفوظة © {new Date().getFullYear()} دليل مطر الإلكتروني</div>
            <div>برمجة وتصميم:{" "}
              <a href="mailto:edm2n@msn.com" data-testid="credit-mowayqi-email"
                className="text-[hsl(var(--gold))] font-semibold hover:underline underline-offset-4">مطر الموايقي</a>
            </div>
          </div>
        </div>
      </footer>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default Layout;
