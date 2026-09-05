import { Link } from "@/i18n/navigation";
import { Button } from "./ui/button";
import { Container } from "./Container";
import { MotionReveal } from "./MotionReveal";
import { IslamicDivider } from "./IslamicDivider";

export function CTA({
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-teal-800 py-20 sm:py-24">
      <div className="pattern-geometric-light absolute inset-0 opacity-70" aria-hidden />
      <Container className="relative">
        <MotionReveal className="mx-auto max-w-2xl text-center">
          <IslamicDivider className="mb-8 opacity-80 [&_span]:bg-ivory-50/30 [&_path]:stroke-ivory-100" />
          <h2 className="text-balance text-3xl font-medium text-ivory-50 sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-teal-100 sm:text-lg">
            {body}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="ghostLight">
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>
            {secondaryLabel && secondaryHref ? (
              <Button asChild variant="outlineLight">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            ) : null}
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
