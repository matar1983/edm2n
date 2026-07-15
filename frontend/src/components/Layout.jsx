import { Link, useLocation } from "react-router-dom";
import { Moon, Sparkles } from "lucide-react";
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
              <a
                href="https://wa.me/966552211729"
                target="_blank"
                rel="noreferrer"
                data-testid="header-contact-btn"
                className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] px-3 py-1.5 text-sm font-semibold hover:bg-[hsl(var(--gold))]/25 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                تواصل
              </a>
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
        <div className="grid md:grid-cols-3 gap-8 items-start">
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

          <div>
            <div className="text-sm font-semibold mb-3 text-[hsl(var(--gold))]">
              للتواصل
            </div>
            <a
              href="https://wa.me/966552211729"
              target="_blank"
              rel="noreferrer"
              data-testid="footer-whatsapp-link"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors px-4 py-2 text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1s-.5-.2-.7.2-.8 1-.9 1.2-.4.2-.6.1c-.4-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3s0-.3.1-.4l.4-.5.3-.4c.1-.2 0-.3 0-.5s-.7-1.7-.9-2.3c-.3-.6-.5-.5-.7-.5H7.4c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3 2.1 3.2 5.1 4.5c.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.3.2-1.4 0-.2-.3-.3-.6-.4z" />
                <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.5.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.1 15 3.6 13.5 3.6 12 3.6 7.4 7.4 3.6 12 3.6s8.4 3.8 8.4 8.4-3.8 8.4-8.4 8.4z" />
              </svg>
              <span dir="ltr" className="number-display">0552211729</span>
            </a>
            <div className="mt-4 text-[11px] text-primary-foreground/60 leading-relaxed">
              اضغط للتواصل عبر واتساب مباشرة
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/70">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} دليل مطر الإلكتروني
          </div>
          <div className="text-center sm:text-left">
            برمجة وتصميم:{" "}
            <span className="text-[hsl(var(--gold))] font-semibold">مطر العنزي</span>{" "}
            و{" "}
            <span className="text-[hsl(var(--gold))] font-semibold">مطر الموايقي</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Layout;
