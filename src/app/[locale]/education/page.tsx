import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal } from "@/components/MotionReveal";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";

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
  const introParagraphs = t.raw("intro.paragraphs") as string[];

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
              src="/images/gallery/minaret-construction.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="object-cover"
            />
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-bronze-50/60 py-20 sm:py-24">
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

      <section className="bg-ivory-50 py-20 sm:py-24">
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
          <div className="grid gap-5 sm:grid-cols-3">
            {[0, 1, 2].map((n) => (
              <MotionReveal
                key={n}
                delay={n * 0.08}
                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-ivory-50/25 bg-ivory-50/5 px-6 py-12 text-center"
              >
                <span
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-bronze-300/60 text-bronze-300"
                >
                  <BookOpen size={20} strokeWidth={1.5} />
                </span>
                <p className="text-sm font-medium text-ivory-100">{t("future.placeholderLabel")}</p>
              </MotionReveal>
            ))}
          </div>
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
