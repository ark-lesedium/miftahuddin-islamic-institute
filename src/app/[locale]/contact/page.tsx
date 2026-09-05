import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { MotionReveal } from "@/components/MotionReveal";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const addressLines = t.raw("details.addressLines") as string[];

  return (
    <>
      <PageHero kicker={t("hero.kicker")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="bg-ivory-50 py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionReveal>
            <h2 className="mb-8 font-serif text-2xl text-ink-900">{t("details.title")}</h2>

            <div className="space-y-7">
              <div className="flex gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bronze-100 text-bronze-700">
                  <MapPin size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-600">
                    {t("details.addressLabel")}
                  </p>
                  {addressLines.map((line) => (
                    <p key={line} className="text-ink-700">
                      {line}
                    </p>
                  ))}
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-bronze-600">
                    {t("details.postalLabel")}
                  </p>
                  <p className="text-ink-700">{t("details.postal")}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bronze-100 text-bronze-700">
                  <Phone size={18} strokeWidth={1.5} />
                </span>
                <div dir="ltr" className="text-start">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-600">
                    {t("details.phoneLabel")}
                  </p>
                  <p className="text-ink-700">
                    <a className="hover:text-teal-700" href="tel:+27538321164">
                      {t("details.officePhone")}
                    </a>
                  </p>
                  <p className="text-ink-700">
                    <a className="hover:text-teal-700" href="tel:+27538327555">
                      {t("details.homePhone")}
                    </a>
                  </p>
                  <p className="text-ink-700">
                    <a className="hover:text-teal-700" href="tel:+27828156786">
                      {t("details.mobilePhone")}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bronze-100 text-bronze-700">
                  <Mail size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-600">
                    {t("details.emailLabel")}
                  </p>
                  <a
                    dir="ltr"
                    className="inline-block text-ink-700 hover:text-teal-700"
                    href={`mailto:${t("details.email")}`}
                  >
                    {t("details.email")}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-bronze-200">
              <p className="border-b border-bronze-200 bg-bronze-50/60 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-bronze-600">
                {t("map.title")}
              </p>
              <div className="pattern-geometric relative flex h-56 flex-col items-center justify-center gap-2 bg-ivory-100 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory-50 text-teal-700 shadow-sm">
                  <MapPin size={18} strokeWidth={1.5} />
                </span>
                <p className="font-serif text-lg text-ink-900">Kimberley</p>
                <p className="text-sm text-ink-500">Northern Cape, South Africa</p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=12+Nargis+Crescent%2C+Moghul+Park%2C+Kimberley%2C+South+Africa"
                target="_blank"
                rel="noopener noreferrer"
                className="block border-t border-bronze-200 bg-ivory-50 px-5 py-3 text-center text-sm font-semibold text-teal-700 hover:text-teal-800"
              >
                {t("details.addressLabel")} &rarr;
              </a>
            </div>
          </MotionReveal>

          <MotionReveal
            delay={0.1}
            className="rounded-3xl border border-bronze-200/70 bg-bronze-50/40 p-8 sm:p-10"
          >
            <h2 className="mb-6 font-serif text-2xl text-ink-900">{t("form.title")}</h2>
            <ContactForm />
          </MotionReveal>
        </Container>
      </section>
    </>
  );
}
