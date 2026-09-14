"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Marquee({
  items,
  durationS = 24,
  className,
}: {
  items: string[];
  durationS?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (items.length === 0) return null;

  const loopItems = [...items, ...items];

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden="true">
      <div
        className={cn("flex w-max items-center", !shouldReduceMotion && "animate-marquee")}
        style={!shouldReduceMotion ? { animationDuration: `${durationS}s` } : undefined}
      >
        {loopItems.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-3 px-5 text-sm font-medium">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-bronze-400" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
