import { Container } from "./Container";
import { MotionReveal } from "./MotionReveal";

export function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pattern-geometric-light py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-bronze-400/40 to-transparent"
      />
      <Container className="relative">
        <MotionReveal className="max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-bronze-300">
            <span aria-hidden className="h-px w-8 bg-bronze-400" />
            {kicker}
          </p>
          <h1 className="text-balance text-4xl font-medium text-ivory-50 sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 text-balance text-lg leading-relaxed text-ivory-200">
              {subtitle}
            </p>
          ) : null}
        </MotionReveal>
      </Container>
    </section>
  );
}
