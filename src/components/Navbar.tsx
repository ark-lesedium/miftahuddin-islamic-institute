"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_LINKS } from "./nav-links";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { assetPath } from "@/lib/asset-path";

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-ink-900/8 bg-ivory-50/92 shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_8px_24px_-16px_rgba(30,27,22,0.25)] backdrop-blur-md"
          : "border-transparent bg-ivory-50/70 backdrop-blur-sm",
      )}
    >
      <nav
        aria-label={t("nav.menu")}
        className="container-institute flex h-[4.5rem] items-center justify-between py-3"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 shrink-0"
          aria-label={t("brand.nameFull")}
        >
          <Image
            src={assetPath("/images/brand/logo-mark.png")}
            alt=""
            width={29}
            height={40}
            className="h-9 w-auto sm:h-10"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-balance font-serif text-sm font-medium text-ink-900 sm:text-base lg:text-lg">
              {t("brand.nameFull")}
            </span>
            <span className="hidden text-[0.65rem] uppercase tracking-[0.16em] text-ink-500 md:block">
              {t("brand.tagline")}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-teal-800"
                      : "text-ink-700 hover:text-teal-800",
                  )}
                >
                  {t(`nav.${link.key}`)}
                  {active && (
                    <span className="absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-bronze-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <Link
            href="/contact#giving"
            className="hidden items-center rounded-full bg-bronze-500 px-3.5 py-1.5 text-sm font-semibold text-ink-900 shadow-sm transition-transform hover:scale-[1.03] xl:inline-flex"
          >
            {t("common.donate")}
          </Link>
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-ink-900 transition-colors hover:bg-ink-900/5 xl:hidden"
            aria-label={t("nav.menu")}
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
          >
            <Menu size={20} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}
