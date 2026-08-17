import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
  glow = false,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  as?: "div" | "section" | "article" | "aside";
}) {
  return (
    <As className={cn("glass rounded-2xl", glow && "glow-ring", className)}>{children}</As>
  );
}
