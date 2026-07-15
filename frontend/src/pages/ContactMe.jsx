import PageHeader from "@/components/PageHeader";
import { Mail, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const EMAIL = "edm2n@msn.com";
const TWITTER = "edm2n";

const ContactMe = () => {
  const [copied, setCopied] = useState(null);

  const copy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      toast.success("تم النسخ");
      setTimeout(() => setCopied(null), 1600);
    } catch {
      toast.error("تعذّر النسخ");
    }
  };

  return (
    <div data-testid="contact-page">
      <PageHeader
        icon={User}
        title="اتصل بي"
        subtitle="تواصل معي عبر البريد أو تويتر"
      />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pb-12">
        <div className="grid sm:grid-cols-2 gap-5">
          <ContactCard
            testid="contact-twitter"
            copyTestid="contact-twitter-copy"
            openTestid="contact-twitter-link"
            href={`https://twitter.com/${TWITTER}`}
            label="تويتر"
            value={`@${TWITTER}`}
            copyValue={`@${TWITTER}`}
            copiedKey="twitter"
            isCopied={copied === "twitter"}
            onCopy={() => copy(`@${TWITTER}`, "twitter")}
            iconBg="bg-black text-white"
            icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2H21l-6.55 7.49L22 22h-6.83l-4.79-6.28L4.8 22H2l7.02-8.03L2 2h6.91l4.33 5.72L18.24 2zm-2.4 18h1.88L7.24 4H5.24l10.6 16z" />
              </svg>
            }
            hint="افتح صفحة تويتر"
          />

          <ContactCard
            testid="contact-email"
            copyTestid="contact-email-copy"
            openTestid="contact-email-link"
            href={`mailto:${EMAIL}`}
            label="البريد الإلكتروني"
            value={EMAIL}
            copyValue={EMAIL}
            copiedKey="email"
            isCopied={copied === "email"}
            onCopy={() => copy(EMAIL, "email")}
            iconBg="bg-primary text-primary-foreground"
            icon={<Mail className="w-5 h-5" />}
            hint="أرسل رسالة"
          />
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          يسعدني تواصلك في أي وقت — سأرد في أقرب فرصة.
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({
  href,
  label,
  value,
  copyValue,
  onCopy,
  isCopied,
  icon,
  iconBg,
  hint,
  testid,
  copyTestid,
  openTestid,
}) => (
  <div
    className="bg-card border border-border rounded-2xl p-6 tile-hover"
    data-testid={testid}
  >
    <div className={`w-12 h-12 rounded-xl grid place-items-center mb-4 ${iconBg}`}>
      {icon}
    </div>
    <div className="text-xs text-muted-foreground mb-1">{label}</div>
    <div dir="ltr" className="font-display font-bold text-xl text-foreground break-all text-right">
      {value}
    </div>
    <div className="mt-5 flex flex-wrap gap-2">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        data-testid={openTestid}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        {hint}
      </a>
      <button
        onClick={onCopy}
        data-testid={copyTestid}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
      >
        {isCopied ? (
          <Check className="w-3.5 h-3.5 text-emerald-600" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
        {isCopied ? "تم النسخ" : "نسخ"}
      </button>
    </div>
  </div>
);

export default ContactMe;
