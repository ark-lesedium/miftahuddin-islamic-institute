"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "./nav-links";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const isRtl = locale === "ar";

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const offset = isRtl ? "-100%" : "100%";

  const menu = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ink-900/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.25 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.menu")}
            className="fixed inset-y-0 z-50 flex w-full max-w-sm flex-col bg-ivory-50 pattern-geometric shadow-2xl lg:hidden"
            style={isRtl ? { insetInlineStart: 0 } : { insetInlineEnd: 0 }}
            initial={{ x: offset }}
            animate={{ x: 0 }}
            exit={{ x: offset }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-ink-900/8 px-6 py-5">
              <span className="font-serif text-lg text-ink-900">{t("brand.nameFull")}</span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-900 hover:bg-ink-900/5"
                aria-label={t("nav.close")}
              >
                <X size={18} strokeWidth={1.75} aria-hidden />
              </button>
            </div>

            <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-xl px-3 py-3.5 text-lg font-medium transition-colors",
                        active
                          ? "bg-bronze-100/70 text-teal-800"
                          : "text-ink-700 hover:bg-ink-900/5",
                      )}
                    >
                      {t(`nav.${link.key}`)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-ink-900/8 px-6 py-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                {t("nav.language")}
              </p>
              <LanguageSwitcher />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Server-rendered output has no `document`; the portal target only ever
  // matters once this is running in the browser, which is also the only time
  // `open` can become true (a click), so no mount-tracking state is needed.
  if (typeof document === "undefined") return null;
  return createPortal(menu, document.body);
}
