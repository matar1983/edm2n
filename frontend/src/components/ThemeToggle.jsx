import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      data-testid="theme-toggle-btn"
      aria-label={isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
      className="relative w-10 h-10 rounded-full bg-secondary hover:bg-secondary/70 border border-border grid place-items-center overflow-hidden transition-colors"
    >
      <Sun
        className={`w-4 h-4 absolute transition-all duration-500 ${
          isDark
            ? "opacity-0 rotate-90 scale-50"
            : "opacity-100 rotate-0 scale-100 text-[hsl(var(--gold))]"
        }`}
      />
      <Moon
        className={`w-4 h-4 absolute transition-all duration-500 ${
          isDark
            ? "opacity-100 rotate-0 scale-100 text-[hsl(var(--gold))]"
            : "opacity-0 -rotate-90 scale-50"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
