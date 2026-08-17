import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass flex flex-col items-center rounded-2xl px-6 py-14 text-center", className)}>
      <div className="mb-4 grid size-12 place-items-center rounded-full bg-surface-2/80 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function LoadingState({ label = "Thinking" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground" role="status" aria-live="polite">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 rounded-full bg-primary"
            style={{ animation: `pulse-node 1.4s ease-in-out ${i * 0.18}s infinite` }}
          />
        ))}
      </span>
      {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="glass rounded-2xl border-destructive/30 p-5 text-sm" role="alert">
      <p className="font-medium text-destructive">Something went wrong</p>
      <p className="mt-1 text-muted-foreground">{message}</p>
      {onRetry ? (
        <button onClick={onRetry} className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline">
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function SkeletonCard() {
  return <div className="glass h-40 animate-pulse rounded-2xl" aria-hidden />;
}
