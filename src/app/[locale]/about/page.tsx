import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal, MotionStagger } from "@/components/MotionReveal";
import { PageHero } from "@/components/PageHero";
import { IslamicDivider } from "@/components/IslamicDivider";
import { KeyMark } from "@/components/KeyMark";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const historyParagraphs = t.raw("history.paragraphs") as string[];
  const editorialParagraphs = t.raw("editorial.paragraphs") as string[];
  const pillars = t.raw("pillarsDetail.items") as { title: string; body: string }[];

  return (
    <>
      <PageHero
        kicker={t("hero.kicker")}
        title={t("hero.title")}
        subtitle={t("hero.subtitle")}
      />

      <section className="relative overflow-hidden bg-ivory-50 py-24 sm:py-28">
        <KeyMark className="pointer-events-none absolute -start-12 top-8 h-80 w-auto -rotate-12 text-bronze-600/[0.05] sm:h-[26rem]" />
        <Container className="relative grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <MotionReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("history.kicker")}
            </p>
            <h2 className="font-serif text-5xl text-teal-800 sm:text-6xl">
              {t("history.title")}
            </h2>
          </MotionReveal>
          <div className="space-y-5">
            {historyParagraphs.map((paragraph, i) => (
              <MotionReveal key={i} delay={i * 0.05}>
                <p
                  className={cn(
                    "text-balance text-lg leading-relaxed text-ink-700",
                    i === 0 && "editorial-dropcap",
                  )}
                >
                  {paragraph}
                </p>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bronze-50/60 py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <MotionReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("legacy.kicker")}
            </p>
            <h3 className="font-serif text-2xl text-ink-900 sm:text-3xl">{t("legacy.title")}</h3>
            <p className="mx-auto mt-4 max-w-2xl text-balance leading-relaxed text-ink-500">
              {t("legacy.body")}
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading kicker={t("editorial.kicker")} title={t("editorial.title")} />
          <div className="mt-8 space-y-5">
            {editorialParagraphs.map((paragraph, i) => (
              <MotionReveal key={i} delay={i * 0.05}>
                <p className="text-balance text-lg leading-relaxed text-ink-700">{paragraph}</p>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bronze-50/60 py-24 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("pillarsDetail.kicker")}
            title={t("pillarsDetail.title")}
            className="mx-auto mb-14"
          />
          <MotionStagger className="grid gap-6 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <MotionReveal
                key={pillar.title}
                className="rounded-3xl border border-bronze-200/70 bg-ivory-50 p-8"
              >
                <h3 className="font-serif text-xl text-teal-800">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-500">{pillar.body}</p>
              </MotionReveal>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-ink-900 pattern-geometric-light py-24 sm:py-28">
        <Container className="max-w-2xl text-center">
          <MotionReveal>
            <p
              dir="rtl"
              className="font-arabic-serif text-3xl leading-relaxed text-bronze-200 sm:text-4xl"
            >
              {t("quote.arabic")}
            </p>
            <p className="mt-4 text-balance text-lg italic text-ivory-100">
              {t("quote.translation")}
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-ivory-300">
              {t("quote.attribution")}
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="max-w-2xl text-center">
          <MotionReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("thankYouDonors.kicker")}
            </p>
            <IslamicDivider className="mb-6" />
            <p className="text-balance font-serif text-xl italic leading-relaxed text-ink-700 sm:text-2xl">
              {t("thankYouDonors.body")}
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-bronze-600">
              — {t("thankYouDonors.attribution")}
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-teal-800 py-20 sm:py-24">
        <Container className="max-w-3xl text-center">
          <MotionReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-200">
              {t("values.kicker")}
            </p>
            <h2 className="text-balance font-serif text-3xl text-ivory-50 sm:text-4xl">
              {t("values.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-teal-100">
              {t("values.body")}
            </p>
          </MotionReveal>
        </Container>
      </section>
    </>
  );
}
