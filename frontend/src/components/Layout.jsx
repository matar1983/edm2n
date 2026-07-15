import { Link, useLocation } from "react-router-dom";
import { Moon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { path: "/", label: "الرئيسية" },
  { path: "/finance", label: "التمويل" },
  { path: "/mortgage", label: "العقاري" },
  { path: "/age", label: "العمر" },
  { path: "/bmi", label: "BMI" },
  { path: "/percent", label: "النسبة" },
  { path: "/tax", label: "الضريبة" },
  { path: "/date-convert", label: "تحويل التاريخ" },
  { path: "/hijri", label: "الهجري" },
  { path: "/ai", label: "AI" },
  { path: "/whatsapp", label: "واتساب" },
];

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col arabesque-bg" data-testid="layout-root">
      <header className="border-b border-border/60 bg-background/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between gap-6 py-4">
            <Link to="/" className="flex items-center gap-3 group" data-testid="header-logo">
              <div className="relative w-11 h-11 rounded-2xl bg-primary text-primary-foreground grid place-items-center shadow-lg shadow-primary/20 transition-transform group-hover:rotate-6">
                <Moon className="w-5 h-5" strokeWidth={2.2} />
                <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-[hsl(var(--gold))] ring-2 ring-background" />
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-lg leading-tight">دليل مطر</div>
                <div className="text-[11px] text-muted-foreground -mt-0.5">
                  الدليل الإلكتروني
                </div>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center gap-1" data-testid="header-nav">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`nav-link-${item.path.replace("/", "") || "home"}`}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile / tablet nav scroller */}
          <nav
            className="xl:hidden pb-3 -mx-1 overflow-x-auto no-scrollbar"
            data-testid="header-nav-mobile"
          >
            <div className="flex gap-2 px-1 min-w-max">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "text-foreground/70 border-border hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full">{children}</main>

      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <footer
      className="mt-16 border-t border-border/60 bg-primary text-primary-foreground"
      data-testid="footer-root"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--gold))] text-primary grid place-items-center">
                <Moon className="w-5 h-5" />
              </div>
              <div className="font-display font-bold text-xl">دليل مطر الإلكتروني</div>
            </div>
            <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-xs">
              مجموعة أدوات وحاسبات عربية أنيقة — تصميم عصري بروح كلاسيكية.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold mb-3 text-[hsl(var(--gold))]">
              روابط سريعة
            </div>
            <div className="grid grid-cols-2 gap-y-1.5 text-sm">
              {navItems.slice(0, 8).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-primary-foreground/80 hover:text-[hsl(var(--gold))] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/70">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} دليل مطر الإلكتروني
          </div>
          <div className="text-center sm:text-left">
            برمجة وتصميم:{" "}
            <span className="text-[hsl(var(--gold))] font-semibold">مطر الموايقي</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Layout;
