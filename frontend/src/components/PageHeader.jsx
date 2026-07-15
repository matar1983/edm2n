import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const PageHeader = ({ icon: Icon, title, subtitle }) => {
  return (
    <div className="border-b border-border/50 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link
            to="/"
            className="hover:text-primary transition-colors"
            data-testid="breadcrumb-home"
          >
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-foreground/80">{title}</span>
        </div>

        <div className="flex items-start gap-4">
          {Icon && (
            <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground grid place-items-center shrink-0 shadow-lg shadow-primary/20">
              <Icon className="w-6 h-6" />
            </div>
          )}
          <div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-muted-foreground mt-1.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
