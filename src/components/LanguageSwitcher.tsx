"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en" as const, label: "EN" },
  { code: "ar" as const, label: "العربية" },
];

function persistLocale(code: string) {
  try {
    window.localStorage.setItem("miftahuddin-locale", code);
  } catch {
    // localStorage may be unavailable (e.g. private browsing) — safe to ignore
  }
}

export function LanguageSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "flex items-center gap-0.5 rounded-full border p-0.5 text-xs font-semibold tracking-wide",
        variant === "light"
          ? "border-ink-900/10 bg-ivory-50/70"
          : "border-ivory-50/25 bg-ivory-50/10",
      )}
    >
      {LANGUAGES.map(({ code, label }) => {
        const active = locale === code;
        return (
          <Link
            key={code}
            href={pathname}
            locale={code}
            onClick={() => persistLocale(code)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors",
              active
                ? variant === "light"
                  ? "bg-teal-700 text-ivory-50"
                  : "bg-ivory-50 text-teal-800"
                : variant === "light"
                  ? "text-ink-500 hover:text-ink-900"
                  : "text-ivory-200 hover:text-ivory-50",
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
