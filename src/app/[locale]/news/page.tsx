import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { MotionReveal } from "@/components/MotionReveal";
import { NewsSlideshow } from "@/components/NewsSlideshow";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("news");
  const items = t.raw("items") as { id: string; title: string; summary: string }[];

  return (
    <>
      <PageHero kicker={t("hero.kicker")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="max-w-3xl">
          <NewsSlideshow items={items} />
          <MotionReveal className="mt-10 text-center text-sm text-ink-500">
            <p>{t("empty.body")}</p>
          </MotionReveal>
        </Container>
      </section>
    </>
  );
}
