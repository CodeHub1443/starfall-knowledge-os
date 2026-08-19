import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GlowButton } from "@/components/brain/GlowButton";
import { StarField } from "@/components/brain/StarField";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Aurelia" },
      { name: "description", content: "Sign in or create an account to open your personal knowledge operating system." },
      { property: "og:title", content: "Sign in — Aurelia" },
      { property: "og:description", content: "Open your personal knowledge operating system." },
    ],
  }),
  component: AuthPage,
});

const inputCls =
  "w-full rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50";

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-12">
      <StarField />
      <div className="glass animate-rise w-full max-w-md rounded-3xl p-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-xl bg-[image:var(--gradient-accent)]">
            <span className="size-2 rounded-full bg-background/80" />
          </span>
          <span className="font-display text-sm font-semibold">Aurelia</span>
        </Link>

        <h1 className="mt-8 text-2xl font-semibold">
          {mode === "signin" ? "Welcome back" : "Create your brain"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin" ? "Your constellation is where you left it." : "It starts empty and grows with every conversation."}
        </p>

        <div className="mt-6 flex rounded-full border border-border p-1 text-sm">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={cn(
                "flex-1 rounded-full py-2 transition-colors",
                mode === m ? "bg-surface-2 text-foreground" : "text-muted-foreground",
              )}
            >
              {m === "signin" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: mode === "signup" ? "/onboarding" : "/home" });
          }}
        >
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" type="email" required placeholder="you@example.com" className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input id="password" type="password" required placeholder="••••••••" className={inputCls} />
          </div>
          <GlowButton type="submit" size="lg" className="w-full">
            {mode === "signin" ? "Enter your brain" : "Create account"}
          </GlowButton>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Authentication is handled by your existing backend.
        </p>
      </div>
    </div>
  );
}
