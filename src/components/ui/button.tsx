import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[transform,background-color,color,border-color] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        bronze:
          "bg-bronze-500 text-ink-900 shadow-lg shadow-bronze-950/20 hover:scale-[1.03]",
        teal: "bg-teal-700 text-ivory-50 hover:bg-teal-800",
        outlineLight:
          "border border-ivory-50/30 text-ivory-50 hover:bg-ivory-50/10",
        outlineDark:
          "border border-ink-900/15 text-ink-900 hover:bg-ink-900/5",
        ghostLight: "bg-ivory-50 text-teal-800 hover:bg-white",
      },
      size: {
        default: "px-7 py-3",
        sm: "px-6 py-2.5",
      },
    },
    defaultVariants: {
      variant: "teal",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
