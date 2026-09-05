import type { Metadata } from "next";
import { Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MotionReveal, MotionStagger } from "@/components/MotionReveal";
import { PageHero } from "@/components/PageHero";
import { IslamicDivider } from "@/components/IslamicDivider";
import { EmptyState } from "@/components/EmptyState";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "leadership" });
  return { title: t("hero.title"), description: t("hero.subtitle") };
}

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("leadership");
  const roles = t.raw("team.roles") as { count: number; label: string }[];

  return (
    <>
      <PageHero kicker={t("hero.kicker")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container className="max-w-2xl text-center">
          <MotionReveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-600">
              {t("message.kicker")}
            </p>
            <IslamicDivider className="mb-6" />
            <p className="text-balance font-serif text-xl italic leading-relaxed text-ink-700 sm:text-2xl">
              &ldquo;{t("message.quote")}&rdquo;
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-bronze-600">
              — {t("message.attribution")}
            </p>
          </MotionReveal>
        </Container>
      </section>

      <section className="bg-bronze-50/60 py-24 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            kicker={t("team.kicker")}
            title={t("team.title")}
            className="mx-auto mb-14"
          />
          <MotionStagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {roles.map((role) => (
              <MotionReveal
                key={role.label}
                className="rounded-2xl border border-bronze-200/70 bg-ivory-50 px-4 py-7 text-center"
              >
                <p className="font-serif text-3xl text-teal-800">{role.count}</p>
                <p className="mt-1.5 text-sm leading-snug text-ink-500">{role.label}</p>
              </MotionReveal>
            ))}
          </MotionStagger>
        </Container>
      </section>

      <section className="bg-ivory-50 py-24 sm:py-28">
        <Container>
          <EmptyState
            title={t("profiles.title")}
            body={t("profiles.body")}
            icon={<Users size={22} strokeWidth={1.5} />}
          />
        </Container>
      </section>
    </>
  );
}
