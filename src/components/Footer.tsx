import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NAV_LINKS } from "./nav-links";
import { assetPath } from "@/lib/asset-path";

export function Footer() {
  const t = useTranslations();
  const tContact = useTranslations("contact.details");
  const addressLines = tContact.raw("addressLines") as string[];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-900/8 bg-ink-900 text-ivory-200 pattern-geometric-light">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <Image
                src={assetPath("/images/brand/logo-mark.png")}
                alt=""
                width={44}
                height={45}
                className="h-11 w-auto brightness-0 invert"
              />
              <span className="font-serif text-lg text-ivory-50">
                {t("brand.nameFull")}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-ivory-300">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-bronze-300">
              {t("footer.navTitle")}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ivory-200 transition-colors hover:text-ivory-50"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-bronze-300">
              {t("footer.contactTitle")}
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory-200">
              <li>{addressLines[0]}</li>
              <li>{tContact("postal")}</li>
              <li>
                <a
                  href="tel:+27538321164"
                  className="transition-colors hover:text-ivory-50"
                >
                  {t("contact.details.officePhone")}
                </a>
              </li>
              <li>
                <a
                  href="mailto:miftahuddininstitute@gmail.com"
                  className="transition-colors hover:text-ivory-50"
                >
                  {t("contact.details.email")}
                </a>
              </li>
            </ul>

            <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-bronze-300">
              {t("footer.languageTitle")}
            </h3>
            <LanguageSwitcher variant="dark" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ivory-50/10 pt-6 text-xs text-ivory-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {t("footer.copyright")}
          </p>
          <p className="font-arabic-serif text-sm text-ivory-300/90">
            {t("brand.nameArabic")}
          </p>
        </div>
        <p className="mt-3 text-center text-[0.65rem] text-ivory-300/45 sm:text-start">
          {t("footer.designedBy")}{" "}
          <span dir="ltr" className="tracking-wide">
            RANDPOWERSTATE
          </span>
        </p>
      </Container>
    </footer>
  );
}
