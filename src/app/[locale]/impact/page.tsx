import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal, MotionStagger } from "@/components/MotionReveal";
import { PageHero } from "@/components/PageHero";
import { StatCounter } from "@/components/StatCounter";
import { Timeline, type TimelineItem } from "@/components/Timeline";
import { ReachDiagram } from "@/components/ReachDiagram";
import { CTA } from "@/components/CTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "impact" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

export default async function ImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("impact");
  const tHome = await getTranslations("home");
  const stats = t.raw("stats") as {
    value: number;
    suffix: string;
    label: string;
    description: string;
  }[];
  const legacyItems = t.raw("legacy.items") as {
    value: number;
    prefix: string;
    suffix: string;
    label: string;
    description: string;
  }[];
  const qurbaniParagraphs = t.raw("qurbani.paragraphs") as string[];
  const qurbaniStats = t.raw("qurbani.stats") as {
    value: number;
    prefix: string;
    suffix: string;
    label: string;
    description: string;
  }[];
  const diagramTowns = t.raw("reach.diagramTowns") as { name: string; km: number }[];
  const provinces = t.raw("reach.provinces") as {
    name: string;
    towns: { name: string; km: number }[];
  }[];
  const milestones = t.raw("milestones.items") as TimelineItem[];

  return (
    <>
      <PageHero kicker={t("hero.kicker")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="bg-ivory-50 py-20 sm:py-24">
        <Container>
          <MotionStagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <MotionReveal
                key={stat.label}
                className="rounded-2xl border border-bronze-200/70 bg-bronze-50/40 p-6 text-center sm:p-8"
              >
                <p className="font-serif text-4xl text-teal-800 sm:text-5xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold text-ink-900">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{stat.description}</p>
              </MotionReveal>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-teal-800 py-24 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-200">
              {t("qurbani.kicker")}
            </p>
            <h2 className="text-balance font-serif text-3xl text-ivory-50 sm:text-4xl">
              {t("qurbani.title")}
            </h2>
            <div className="mt-6 space-y-4">
              {qurbaniParagraphs.map((paragraph, i) => (
                <MotionReveal key={i} delay={i * 0.04}>
                  <p className="text-balance leading-relaxed text-teal-100">{paragraph}</p>
                </MotionReveal>
              ))}
            </div>
          </div>
          <MotionStagger className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {qurbaniStats.map((stat) => (
              <MotionReveal
                key={stat.label}
                className="rounded-2xl border border-ivory-50/15 bg-ivory-50/5 p-6 text-center"
              >
                <p className="font-serif text-4xl text-bronze-300">
                  <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold text-ivory-50">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-ivory-300">{stat.description}</p>
              </MotionReveal>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-bronze-50/60 py-24 sm:py-28">
        <Container className="max-w-3xl text-center">
          <MotionReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("network.kicker")}
            </p>
            <h2 className="text-balance font-serif text-3xl text-ink-900 sm:text-4xl">
              {t("network.title")}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-ink-500">
              {t("network.body")}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-balance leading-relaxed text-ink-500">
              {t("network.growth")}
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("reach.kicker")}
            title={t("reach.title")}
            subtitle={t("reach.subtitle")}
            className="mx-auto mb-14"
          />
          <MotionReveal className="mx-auto max-w-xl">
            <ReachDiagram
              center={t("reach.center")}
              unit={t("reach.unit")}
              towns={diagramTowns}
              mapsHint={t("reach.mapsHint")}
              mapsButtonLabel={t("reach.mapsButtonLabel")}
            />
          </MotionReveal>

          <div className="mx-auto mt-16 grid max-w-3xl gap-10 sm:grid-cols-2">
            {provinces.map((province, pi) => (
              <MotionReveal key={province.name} delay={pi * 0.06}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-bronze-600">
                  {province.name}
                </h3>
                <ul className="space-y-2.5">
                  {province.towns.map((town) => (
                    <li
                      key={town.name}
                      className="flex items-baseline justify-between border-b border-bronze-200/60 pb-2 text-sm"
                    >
                      <span className="text-ink-700">{town.name}</span>
                      <span dir="ltr" className="font-semibold text-teal-800">
                        {town.km} {t("reach.unit")}
                      </span>
                    </li>
                  ))}
                </ul>
              </MotionReveal>
            ))}
          </div>
          <MotionReveal className="mx-auto mt-8 max-w-2xl text-center text-xs text-ink-300">
            <p>{t("reach.approxNote")}</p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-ink-900 pattern-geometric-light py-20 sm:py-24">
        <Container>
          <SectionHeading
            align="center"
            tone="light"
            kicker={t("legacy.kicker")}
            title={t("legacy.title")}
            className="mx-auto mb-12"
          />
          <MotionStagger className="grid gap-6 sm:grid-cols-3">
            {legacyItems.map((item) => (
              <MotionReveal
                key={item.label}
                className="rounded-2xl border border-ivory-50/10 bg-ivory-50/5 p-6 text-center sm:p-8"
              >
                <p className="font-serif text-4xl text-bronze-300 sm:text-5xl">
                  <StatCounter value={item.value} prefix={item.prefix} suffix={item.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold text-ivory-50">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-ivory-300">{item.description}</p>
              </MotionReveal>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading kicker={t("milestones.kicker")} title={t("milestones.title")} />
          <div className="mt-12">
            <Timeline items={milestones} />
          </div>
        </Container>
      </section>

      <section className="bg-teal-800 py-20 sm:py-24">
        <Container className="max-w-2xl text-center">
          <MotionReveal>
            <h2 className="text-balance font-serif text-2xl text-ivory-50 sm:text-3xl">
              {t("renovations.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-balance leading-relaxed text-teal-100">
              {t("renovations.body")}
            </p>
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
