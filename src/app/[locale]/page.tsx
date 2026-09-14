import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal, MotionStagger } from "@/components/MotionReveal";
import { IslamicDivider } from "@/components/IslamicDivider";
import { KeyMark } from "@/components/KeyMark";
import { StatCounter } from "@/components/StatCounter";
import { CTA } from "@/components/CTA";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { NewsSlideshow } from "@/components/NewsSlideshow";
import { ReachDiagram } from "@/components/ReachDiagram";
import { QuranQuotes } from "@/components/QuranQuotes";
import { assetPath } from "@/lib/asset-path";
import { GALLERY_IMAGES, HERO_IMAGE_IDS, type GalleryImageId } from "@/data/gallery";

const HERO_IMAGES = HERO_IMAGE_IDS.map((id) => GALLERY_IMAGES[id].src);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("siteName"), description: t("defaultDescription") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  const pillars = t.raw("home.pillars.items") as {
    title: string;
    subtitle: string;
    body: string;
  }[];
  const stats = t.raw("impact.stats") as {
    value: number;
    suffix: string;
    label: string;
    description: string;
  }[];
  const quranQuotes = t.raw("home.quranQuotes.items") as {
    theme: string;
    text: string;
    secondary?: string;
    reference: string;
  }[];
  const newsItems = t.raw("news.items") as {
    id: string;
    title: string;
    summary: string;
    image?: GalleryImageId;
    live?: boolean;
    marquee?: string[];
  }[];
  const diagramTowns = t.raw("impact.reach.diagramTowns") as { name: string; km: number }[];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900">
        <HeroSlideshow images={HERO_IMAGES} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-ink-900/72 pattern-geometric-light"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-900/25 via-ink-900/35 to-ink-900"
        />
        <Container className="relative flex min-h-[86vh] flex-col items-center justify-center gap-10 py-28 text-center sm:min-h-[92vh]">
          <MotionReveal className="flex flex-col items-center">
            <span className="mb-8 flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-ivory-50 p-4 shadow-lg sm:h-32 sm:w-32">
              <Image
                src={assetPath("/images/brand/logo-mark.png")}
                alt=""
                width={87}
                height={120}
                priority
                className="h-full w-auto"
              />
            </span>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-bronze-300 sm:text-sm">
              {t("home.hero.kicker")}
            </p>
            <h1 className="text-balance font-serif text-4xl font-medium text-ivory-50 sm:text-6xl md:text-7xl">
              {t("home.hero.title")}
            </h1>
            <div className="mt-5 flex items-center justify-center gap-3">
              <KeyMark className="h-6 w-auto text-bronze-400 sm:h-7" />
              <p className="text-balance font-serif text-xl italic text-bronze-200 sm:text-2xl">
                {t("home.hero.headline")}
              </p>
            </div>
            <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-ivory-200 sm:text-lg">
              {t("home.hero.subtitle")}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15} className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="bronze">
              <Link href="/about">{t("home.hero.ctaPrimary")}</Link>
            </Button>
            <Button asChild variant="outlineLight">
              <Link href="/contact">{t("home.hero.ctaSecondary")}</Link>
            </Button>
          </MotionReveal>
        </Container>

        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <span className="flex flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.2em] text-ivory-300/70">
            {t("home.hero.scrollHint")}
            <span className="h-8 w-px animate-pulse bg-ivory-300/40" />
          </span>
        </div>
      </section>

      {/* News — kept at the top of the homepage so recent updates are the first thing visitors see */}
      <section className="bg-bronze-50/60 py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading
            align="center"
            kicker={t("home.newsPreview.kicker")}
            title={t("home.newsPreview.title")}
            className="mx-auto mb-10"
          />
          <NewsSlideshow items={newsItems} />
          <MotionReveal className="mt-8 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              {t("home.newsPreview.cta")}
              <span aria-hidden className="rtl:rotate-180">
                &rarr;
              </span>
            </Link>
          </MotionReveal>
        </Container>
      </section>

      {/* Introduction */}
      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="max-w-3xl text-center">
          <MotionReveal>
            <IslamicDivider className="mb-8" />
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("home.intro.kicker")}
            </p>
            <h2 className="text-balance font-serif text-3xl text-ink-900 sm:text-4xl">
              {t("home.intro.title")}
            </h2>
            <p className="mx-auto mt-6 text-balance text-lg leading-relaxed text-ink-500">
              {t("home.intro.body")}
            </p>
          </MotionReveal>
        </Container>
      </section>

      {/* Pillars */}
      <section className="bg-bronze-50/60 py-24 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("home.pillars.kicker")}
            title={t("home.pillars.title")}
            className="mx-auto mb-14"
          />
          <MotionStagger className="grid gap-6 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <MotionReveal
                key={pillar.title}
                className="rounded-3xl border border-bronze-200/70 bg-ivory-50 p-8 shadow-sm"
              >
                <p className="font-serif text-2xl text-teal-800">{pillar.title}</p>
                <p className="mb-4 mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-bronze-500">
                  {pillar.subtitle}
                </p>
                <p className="leading-relaxed text-ink-500">{pillar.body}</p>
              </MotionReveal>
            ))}
          </MotionStagger>
        </Container>
      </section>

      {/* Qur'an Quotes */}
      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("home.quranQuotes.kicker")}
            title={t("home.quranQuotes.title")}
            className="mx-auto mb-4"
          />
          <p className="mx-auto mb-12 max-w-xl text-balance text-center text-sm text-ink-500">
            {t("home.quranQuotes.note")}
          </p>
          <QuranQuotes items={quranQuotes} />
        </Container>
      </section>

      {/* Educational Journey */}
      <section className="bg-bronze-50/60 py-24 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <MotionReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("home.journeyPreview.kicker")}
            </p>
            <h2 className="text-balance font-serif text-3xl text-ink-900 sm:text-4xl">
              {t("home.journeyPreview.title")}
            </h2>
            <p className="mt-5 text-balance text-lg leading-relaxed text-ink-500">
              {t("home.journeyPreview.body")}
            </p>
            <Link
              href="/education"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              {t("home.journeyPreview.cta")}
              <span aria-hidden className="rtl:rotate-180">
                &rarr;
              </span>
            </Link>
          </MotionReveal>
          <MotionReveal delay={0.1} className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src={assetPath("/images/gallery/galeshewe-minaret.jpg")}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </MotionReveal>
        </Container>
      </section>

      {/* Total students */}
      <section className="bg-ivory-50 py-16 sm:py-20">
        <Container className="max-w-2xl text-center">
          <MotionReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("home.studentsStat.kicker")}
            </p>
            <p className="font-serif text-6xl text-teal-800 sm:text-7xl">
              <StatCounter
                value={t.raw("home.studentsStat.value") as number}
                suffix={t("home.studentsStat.suffix")}
              />
            </p>
            <p className="mt-2 text-lg font-semibold text-ink-900">
              {t("home.studentsStat.label")}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-balance leading-relaxed text-ink-500">
              {t("home.studentsStat.description")}
            </p>
          </MotionReveal>
        </Container>
      </section>

      {/* Impact preview */}
      <section className="bg-ink-900 pattern-geometric-light py-24 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            tone="light"
            kicker={t("home.impactPreview.kicker")}
            title={t("home.impactPreview.title")}
            className="mx-auto mb-14"
          />
          <MotionStagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <MotionReveal
                key={stat.label}
                className="rounded-2xl border border-ivory-50/10 bg-ivory-50/5 p-6 text-center sm:p-8"
              >
                <p className="font-serif text-4xl text-bronze-300 sm:text-5xl">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-semibold text-ivory-50">{stat.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-ivory-300">{stat.description}</p>
              </MotionReveal>
            ))}
          </MotionStagger>
          <MotionReveal className="mt-12 text-center">
            <Button asChild variant="outlineLight" size="sm">
              <Link href="/impact">{t("home.impactPreview.cta")}</Link>
            </Button>
          </MotionReveal>
        </Container>
      </section>

      {/* Reach diagram preview */}
      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("home.reachPreview.kicker")}
            title={t("home.reachPreview.title")}
            className="mx-auto mb-12"
          />
          <MotionReveal className="mx-auto max-w-xl">
            <ReachDiagram
              center={t("impact.reach.center")}
              unit={t("impact.reach.unit")}
              towns={diagramTowns}
            />
          </MotionReveal>
          <MotionReveal className="mt-8 text-center">
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              {t("home.reachPreview.cta")}
              <span aria-hidden className="rtl:rotate-180">
                &rarr;
              </span>
            </Link>
          </MotionReveal>
        </Container>
      </section>

      {/* Community preview */}
      <section className="bg-bronze-50/60 py-24 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <MotionReveal
            delay={0.1}
            className="relative order-2 aspect-[4/5] overflow-hidden rounded-3xl lg:order-1"
          >
            <Image
              src={assetPath("/images/gallery/britstown-interior.jpg")}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </MotionReveal>
          <MotionReveal className="order-1 lg:order-2">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("home.communityPreview.kicker")}
            </p>
            <h2 className="text-balance font-serif text-3xl text-ink-900 sm:text-4xl">
              {t("home.communityPreview.title")}
            </h2>
            <p className="mt-5 text-balance text-lg leading-relaxed text-ink-500">
              {t("home.communityPreview.body")}
            </p>
            <Link
              href="/impact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
            >
              {t("home.communityPreview.cta")}
              <span aria-hidden className="rtl:rotate-180">
                &rarr;
              </span>
            </Link>
          </MotionReveal>
        </Container>
      </section>

      {/* CTA */}
      <CTA
        title={t("home.cta.title")}
        body={t("home.cta.body")}
        primaryLabel={t("home.cta.ctaPrimary")}
        primaryHref="/contact"
        secondaryLabel={t("home.cta.ctaSecondary")}
        secondaryHref="/about"
      />

      {/* Contact preview */}
      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="max-w-2xl text-center">
          <MotionReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("home.contactPreview.kicker")}
            </p>
            <h2 className="text-balance font-serif text-3xl text-ink-900 sm:text-4xl">
              {t("home.contactPreview.title")}
            </h2>
            <div className="mt-8 grid gap-4 text-ink-700 sm:grid-cols-2">
              <a
                href="mailto:miftahuddininstitute@gmail.com"
                className="rounded-2xl border border-bronze-200 bg-ivory-100 px-6 py-5 transition-colors hover:border-teal-600"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-500">
                  {t("contact.details.emailLabel")}
                </p>
                <p className="mt-1 font-medium">{t("contact.details.email")}</p>
              </a>
              <a
                href="tel:+27828156786"
                className="rounded-2xl border border-bronze-200 bg-ivory-100 px-6 py-5 transition-colors hover:border-teal-600"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-500">
                  {t("contact.details.phoneLabel")}
                </p>
                <p dir="ltr" className="mt-1 font-medium">
                  {t("contact.details.officePhone1")}
                </p>
              </a>
            </div>
            <Button asChild variant="teal" className="mt-8">
              <Link href="/contact">{t("common.getInTouch")}</Link>
            </Button>
          </MotionReveal>
        </Container>
      </section>
    </>
  );
}
