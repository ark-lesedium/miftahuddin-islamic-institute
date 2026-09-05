import { cn } from "@/lib/utils";
import { MotionReveal } from "./MotionReveal";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "start",
  tone = "dark",
  className,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <MotionReveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {kicker ? (
        <p
          className={cn(
            "mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
            align === "center" && "justify-center",
            tone === "dark" ? "text-bronze-600" : "text-bronze-300",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-px w-8",
              tone === "dark" ? "bg-bronze-400" : "bg-bronze-300/70",
            )}
          />
          {kicker}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-balance text-3xl font-medium sm:text-4xl",
          tone === "dark" ? "text-ink-900" : "text-ivory-50",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-balance text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-ink-500" : "text-ivory-200",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </MotionReveal>
  );
}
