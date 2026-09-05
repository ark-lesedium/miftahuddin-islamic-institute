import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "./ui/button";
import { MotionReveal } from "./MotionReveal";
import { IslamicDivider } from "./IslamicDivider";

export function EmptyState({
  title,
  body,
  ctaLabel,
  ctaHref,
  icon,
}: {
  title: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  icon?: ReactNode;
}) {
  return (
    <MotionReveal className="mx-auto max-w-xl rounded-3xl border border-bronze-200 bg-bronze-50/50 px-8 py-14 text-center pattern-geometric">
      {icon ? (
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-ivory-50 text-teal-700 shadow-sm">
          {icon}
        </div>
      ) : null}
      <IslamicDivider className="mb-6" />
      <h3 className="font-serif text-2xl text-ink-900">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-balance leading-relaxed text-ink-500">{body}</p>
      {ctaLabel && ctaHref ? (
        <Button asChild variant="teal" size="sm" className="mt-7">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      ) : null}
    </MotionReveal>
  );
}
