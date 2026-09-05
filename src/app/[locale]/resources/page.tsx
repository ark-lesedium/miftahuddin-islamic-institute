import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { MotionReveal } from "@/components/MotionReveal";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/asset-path";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("resources");
  const reports = t.raw("reports") as {
    title: string;
    period: string;
    description: string;
    fileType: string;
    fileSize: string;
    fileLabel: string;
    href: string;
  }[];

  return (
    <>
      <PageHero kicker={t("hero.kicker")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="max-w-4xl">
          <div className="space-y-6">
            {reports.map((report, i) => (
              <MotionReveal
                key={report.title}
                delay={i * 0.06}
                className="flex flex-col gap-6 rounded-3xl border border-bronze-200/70 bg-bronze-50/40 p-8 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ivory-50 text-teal-700 shadow-sm">
                    <FileText size={26} strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-serif text-xl text-ink-900">{report.title}</h2>
                      {report.period ? (
                        <span className="rounded-full bg-bronze-100 px-2.5 py-0.5 text-xs font-semibold text-bronze-700">
                          {report.period}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-500">
                      {report.description}
                    </p>
                    <p dir="ltr" className="mt-2 text-xs uppercase tracking-wide text-ink-300">
                      {report.fileType} &middot; {report.fileSize}
                    </p>
                  </div>
                </div>
                <Button asChild variant="teal" className="shrink-0">
                  <a href={assetPath(report.href)} download>
                    <Download size={16} strokeWidth={1.75} aria-hidden />
                    {report.fileLabel}
                  </a>
                </Button>
              </MotionReveal>
            ))}
          </div>

          <MotionReveal className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-500">
            <p>{t("note")}</p>
          </MotionReveal>
        </Container>
      </section>
    </>
  );
}
