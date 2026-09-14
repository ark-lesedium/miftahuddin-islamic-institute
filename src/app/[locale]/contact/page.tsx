import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal, MotionStagger } from "@/components/MotionReveal";
import { ContactForm } from "@/components/ContactForm";
import { IslamicDivider } from "@/components/IslamicDivider";

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
  const accounts = t.raw("giving.accounts") as {
    type: string;
    bank: string;
    accountNumber: string;
    branchCode: string;
    note: string;
  }[];

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
                    <span className="text-ink-500">{t("details.officePhone1Label")}: </span>
                    <a className="hover:text-teal-700" href="tel:+27828156786">
                      {t("details.officePhone1")}
                    </a>
                  </p>
                  <p className="text-ink-700">
                    <span className="text-ink-500">{t("details.officePhone2Label")}: </span>
                    <a className="hover:text-teal-700" href="tel:+27825189669">
                      {t("details.officePhone2")}
                    </a>
                  </p>
                  <p className="text-ink-700">
                    <span className="text-ink-500">{t("details.generalPhoneLabel")}: </span>
                    <a className="hover:text-teal-700" href="tel:+27722569288">
                      {t("details.generalPhone")}
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
                href="https://www.google.com/maps/search/?api=1&query=10+Nargis+Crescent%2C+Moghul+Street%2C+Kimberley%2C+South+Africa"
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

      <section id="giving" className="scroll-mt-24 bg-bronze-50/60 py-24 sm:py-28">
        <Container className="max-w-4xl">
          <SectionHeading
            align="center"
            kicker={t("giving.kicker")}
            title={t("giving.title")}
            subtitle={t("giving.intro")}
            className="mx-auto mb-14"
          />

          <MotionStagger className="grid gap-5 sm:grid-cols-3">
            {accounts.map((account, i) => (
              <MotionReveal
                key={`${account.type}-${i}`}
                className="rounded-2xl border border-bronze-200 bg-ivory-50 p-6"
              >
                <span className="inline-block rounded-full bg-bronze-100 px-2.5 py-0.5 text-xs font-semibold text-bronze-700">
                  {account.type}
                </span>
                <p className="mt-3 font-serif text-lg text-ink-900">{t("giving.accountName")}</p>
                <p className="text-sm text-ink-500">{account.bank}</p>
                <p dir="ltr" className="mt-3 text-end text-xl font-semibold tracking-wide text-teal-800 sm:text-start">
                  {account.accountNumber}
                </p>
                {account.branchCode ? (
                  <p className="mt-1 text-sm text-ink-500">{account.branchCode}</p>
                ) : null}
                {account.note ? (
                  <p className="mt-3 text-xs leading-relaxed text-ink-500">{account.note}</p>
                ) : null}
              </MotionReveal>
            ))}
          </MotionStagger>

          <MotionReveal className="mx-auto mt-10 max-w-2xl space-y-2 text-center text-sm text-ink-500">
            <p>{t("giving.reference")}</p>
            <p>{t("giving.certificate")}</p>
          </MotionReveal>

          <MotionReveal className="mt-8 rounded-2xl border border-bronze-200 bg-ivory-50 px-6 py-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-600">
              {t("giving.proofLabel")}
            </p>
            <p className="mx-auto mt-2 max-w-xl text-balance leading-relaxed text-ink-700">
              {t("giving.proofEmail")}{" "}
              <a
                dir="ltr"
                href={`mailto:${t("details.email")}`}
                className="font-semibold text-teal-700 hover:text-teal-800"
              >
                {t("details.email")}
              </a>{" "}
              {t("giving.proofWhatsapp")}{" "}
              <a
                dir="ltr"
                href="https://wa.me/27828156786"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-700 hover:text-teal-800"
              >
                082 815 6786
              </a>
              .
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="max-w-2xl text-center">
          <MotionReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("leadershipMessage.kicker")}
            </p>
            <IslamicDivider className="mb-6" />
            <p className="text-balance font-serif text-xl italic leading-relaxed text-ink-700 sm:text-2xl">
              &ldquo;{t("leadershipMessage.body")}&rdquo;
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-bronze-600">
              — {t("leadershipMessage.attribution")}
            </p>
          </MotionReveal>
        </Container>
      </section>
    </>
  );
}
