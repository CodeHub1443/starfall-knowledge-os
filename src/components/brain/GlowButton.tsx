import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const glowButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[image:var(--gradient-accent)] text-primary-foreground shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--primary)_70%,transparent)] hover:brightness-110 hover:shadow-[0_14px_50px_-10px_color-mix(in_oklab,var(--primary)_80%,transparent)]",
        ghost: "text-muted-foreground hover:text-foreground hover:bg-surface-2/60",
        outline:
          "border border-border bg-surface/40 text-foreground backdrop-blur hover:border-primary/50 hover:bg-surface-2/60",
        subtle: "bg-surface-2/70 text-foreground hover:bg-surface-2",
        danger: "border border-destructive/40 text-destructive hover:bg-destructive/10",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function GlowButton({
  className,
  variant,
  size,
  asChild,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof glowButtonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(glowButtonVariants({ variant, size }), className)} {...props} />;
}
