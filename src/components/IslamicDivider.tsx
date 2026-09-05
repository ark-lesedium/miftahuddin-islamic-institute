import { cn } from "@/lib/utils";

export function IslamicDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      aria-hidden
    >
      <span className="h-px w-16 bg-bronze-300/70 sm:w-24" />
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 1L13.5 8.5L21 11L13.5 13.5L11 21L8.5 13.5L1 11L8.5 8.5L11 1Z"
          className="stroke-bronze-500"
          strokeWidth="1"
        />
      </svg>
      <span className="h-px w-16 bg-bronze-300/70 sm:w-24" />
    </div>
  );
}
