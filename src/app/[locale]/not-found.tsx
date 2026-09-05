import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { IslamicDivider } from "@/components/IslamicDivider";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="flex min-h-[70vh] items-center bg-ivory-50 py-24">
      <Container className="text-center">
        <p className="font-serif text-6xl text-bronze-400">404</p>
        <IslamicDivider className="my-6" />
        <h1 className="font-serif text-3xl text-ink-900">{t("title")}</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-500">{t("body")}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-700 px-7 py-3 text-sm font-semibold text-ivory-50 transition-colors hover:bg-teal-800"
        >
          {t("cta")}
        </Link>
      </Container>
    </section>
  );
}
