import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { EmptyState } from "@/components/EmptyState";

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

  return (
    <>
      <PageHero kicker={t("hero.kicker")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container>
          <div className="mx-auto mb-14 grid max-w-4xl gap-5 sm:grid-cols-3">
            {[0, 1, 2].map((n) => (
              <div
                key={n}
                className="overflow-hidden rounded-2xl border border-dashed border-bronze-300 bg-bronze-50/50"
              >
                <div className="pattern-geometric aspect-[4/3] w-full bg-bronze-100/50" />
                <div className="space-y-2 p-5">
                  <div className="h-2.5 w-16 rounded-full bg-bronze-200" />
                  <div className="h-3.5 w-full rounded-full bg-bronze-200" />
                  <div className="h-3.5 w-2/3 rounded-full bg-bronze-200" />
                </div>
              </div>
            ))}
          </div>
          <EmptyState
            title={t("empty.title")}
            body={t("empty.body")}
            icon={<Newspaper size={22} strokeWidth={1.5} />}
            ctaLabel={t("empty.cta")}
            ctaHref="/contact"
          />
        </Container>
      </section>
    </>
  );
}
