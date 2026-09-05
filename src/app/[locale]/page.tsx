import Image from "next/image";
import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
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
import { EmptyState } from "@/components/EmptyState";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { assetPath } from "@/lib/asset-path";
import { GALLERY_IMAGES, GALLERY_ORDER } from "@/data/gallery";

const HERO_IMAGES = GALLERY_ORDER.map((id) => GALLERY_IMAGES[id].src);

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
            <Image
              src={assetPath("/images/brand/logo-mark.png")}
              alt=""
              width={120}
              height={123}
              priority
              className="mb-8 h-24 w-auto brightness-0 invert sm:h-28"
            />
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

      {/* Educational Journey */}
      <section className="bg-ivory-50 py-24 sm:py-28">
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

      {/* Community preview */}
      <section className="bg-ivory-50 py-24 sm:py-28">
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

      {/* News preview */}
      <section className="bg-bronze-50/60 py-24 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("home.newsPreview.kicker")}
            title={t("home.newsPreview.title")}
            className="mx-auto mb-12"
          />
          <EmptyState
            title={t("news.empty.title")}
            body={t("news.empty.body")}
            icon={<Newspaper size={22} strokeWidth={1.5} />}
          />
          <MotionReveal className="mt-10 text-center">
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
                href="tel:+27538321164"
                className="rounded-2xl border border-bronze-200 bg-ivory-100 px-6 py-5 transition-colors hover:border-teal-600"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bronze-500">
                  {t("contact.details.phoneLabel")}
                </p>
                <p className="mt-1 font-medium">{t("contact.details.officePhone")}</p>
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
