import type { Metadata } from "next";
import Image from "next/image";
import {
  GraduationCap,
  Phone,
  Users,
  HeartHandshake,
  Landmark,
  BookOpen,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal, MotionStagger } from "@/components/MotionReveal";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { assetPath } from "@/lib/asset-path";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "education" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

export default async function EducationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("education");
  const tHome = await getTranslations("home");
  const tContact = await getTranslations("contact.details");
  const introParagraphs = t.raw("intro.paragraphs") as string[];
  const socialWelfareParagraphs = t.raw("socialWelfare.paragraphs") as string[];
  const centreServices = t.raw("centre.services") as string[];
  const centreServiceIcons = [GraduationCap, Users, HeartHandshake, Landmark, BookOpen];

  return (
    <>
      <PageHero kicker={t("hero.kicker")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading title={t("intro.title")} />
            <div className="mt-6 space-y-5">
              {introParagraphs.map((paragraph, i) => (
                <MotionReveal key={i} delay={i * 0.05}>
                  <p className="text-balance text-lg leading-relaxed text-ink-700">{paragraph}</p>
                </MotionReveal>
              ))}
            </div>
          </div>
          <MotionReveal
            delay={0.1}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:sticky lg:top-28"
          >
            <Image
              src={assetPath("/images/gallery/galeshewe-minaret.jpg")}
              alt=""
              fill
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="object-cover"
            />
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-bronze-50/60 py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading kicker={t("socialWelfare.kicker")} title={t("socialWelfare.title")} />
          <div className="mt-6 space-y-5">
            {socialWelfareParagraphs.map((paragraph, i) => (
              <MotionReveal key={i} delay={i * 0.05}>
                <p className="text-balance text-lg leading-relaxed text-ink-700">{paragraph}</p>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory-50 py-20 sm:py-24">
        <Container className="max-w-3xl text-center">
          <MotionReveal>
            <h2 className="text-balance font-serif text-2xl text-ink-900 sm:text-3xl">
              {t("reach.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-lg leading-relaxed text-ink-500">
              {t("reach.body")}
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-bronze-50/60 py-20 sm:py-24">
        <Container className="max-w-3xl text-center">
          <MotionReveal>
            <h2 className="text-balance font-serif text-2xl text-ink-900 sm:text-3xl">
              {t("beyondMakaatib.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance text-lg leading-relaxed text-ink-500">
              {t("beyondMakaatib.body")}
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <MotionReveal
            delay={0.1}
            className="relative order-2 aspect-[4/5] overflow-hidden rounded-3xl lg:order-1"
          >
            <Image
              src={assetPath("/images/gallery/haji-adams-centre-museum.jpg")}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </MotionReveal>
          <div className="order-1 lg:order-2">
            <MotionReveal>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
                {t("centre.kicker")}
              </p>
              <h2 className="text-balance font-serif text-3xl text-ink-900 sm:text-4xl">
                {t("centre.title")}
              </h2>
              <p className="mt-2 text-sm font-medium text-bronze-600">{t("centre.subtitle")}</p>
              <p className="mt-5 text-balance text-lg leading-relaxed text-ink-500">
                {t("centre.body")}
              </p>
            </MotionReveal>
            <MotionStagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {centreServices.map((service, i) => {
                const Icon = centreServiceIcons[i] ?? GraduationCap;
                return (
                  <MotionReveal
                    key={service}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-bronze-200/70 bg-bronze-50/40 px-3 py-5 text-center"
                  >
                    <Icon size={20} strokeWidth={1.5} className="text-teal-700" aria-hidden />
                    <span className="text-xs font-medium leading-tight text-ink-700">
                      {service}
                    </span>
                  </MotionReveal>
                );
              })}
            </MotionStagger>
          </div>
        </Container>
      </section>

      <section className="bg-ink-900 pattern-geometric-light py-24 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            tone="light"
            kicker={t("future.kicker")}
            title={t("future.title")}
            subtitle={t("future.body")}
            className="mx-auto mb-12"
          />
          <MotionReveal className="mx-auto max-w-xl rounded-2xl border border-ivory-50/15 bg-ivory-50/5 px-8 py-10 text-center">
            <span
              aria-hidden
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-bronze-300/60 text-bronze-300"
            >
              <GraduationCap size={20} strokeWidth={1.5} />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bronze-300">
              {t("future.admissions.label")}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-balance leading-relaxed text-ivory-200">
              {t("future.admissions.body")}
            </p>
            <div dir="ltr" className="mt-5 flex flex-col items-center gap-1.5 text-sm text-ivory-100">
              <a
                href="tel:+27828156786"
                className="inline-flex items-center gap-2 transition-colors hover:text-bronze-300"
              >
                <Phone size={14} strokeWidth={1.75} aria-hidden />
                {tContact("officePhone1")}
              </a>
              <a
                href="tel:+27825189669"
                className="inline-flex items-center gap-2 transition-colors hover:text-bronze-300"
              >
                <Phone size={14} strokeWidth={1.75} aria-hidden />
                {tContact("officePhone2")}
              </a>
              <a
                href="tel:+27722569288"
                className="inline-flex items-center gap-2 transition-colors hover:text-bronze-300"
              >
                <Phone size={14} strokeWidth={1.75} aria-hidden />
                {tContact("generalPhone")}
              </a>
            </div>
          </MotionReveal>
        </Container>
      </section>

      <CTA
        title={tHome("cta.title")}
        body={tHome("cta.body")}
        primaryLabel={tHome("cta.ctaPrimary")}
        primaryHref="/contact"
        secondaryLabel={tHome("cta.ctaSecondary")}
        secondaryHref="/about"
      />
    </>
  );
}
