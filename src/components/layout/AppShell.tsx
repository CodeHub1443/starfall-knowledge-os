import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sparkles, Network, MessageSquare, Wand2, Library as LibraryIcon, Link2, Settings2, Command,
} from "lucide-react";
import type { ReactNode } from "react";
import { StarField } from "@/components/brain/StarField";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/home", label: "Home", icon: Sparkles },
  { to: "/brain", label: "Brain", icon: Network },
  { to: "/chat", label: "Chat", icon: MessageSquare },
  { to: "/create", label: "Create", icon: Wand2 },
  { to: "/library", label: "Library", icon: LibraryIcon },
  { to: "/connections", label: "Connections", icon: Link2 },
  { to: "/settings", label: "Settings", icon: Settings2 },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen">
      <StarField />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-surface-2 focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      {/* Desktop rail */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[228px] flex-col border-r border-border/70 bg-sidebar/70 backdrop-blur-xl lg:flex">
        <Link to="/home" className="flex items-center gap-2.5 px-6 py-7">
          <span className="relative grid size-8 place-items-center rounded-xl bg-[image:var(--gradient-accent)]">
            <span className="size-2 rounded-full bg-background/80" />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">Aurelia</span>
        </Link>

        <nav className="flex-1 space-y-1 px-3" aria-label="Primary">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(`${to}/`);
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-xl border border-primary/25 bg-primary/10" aria-hidden />
                )}
                <Icon className={cn("size-[18px]", active && "text-primary")} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3">
          <div className="glass rounded-xl p-3">
            <p className="text-xs text-muted-foreground">Knowledge base</p>
            <p className="mt-1 text-sm font-medium">1,284 memories</p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full w-2/3 rounded-full bg-[image:var(--gradient-accent)]" />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">Growing with every conversation</p>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link to="/home" className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-[image:var(--gradient-accent)]">
            <span className="size-1.5 rounded-full bg-background/80" />
          </span>
          <span className="font-display text-sm font-semibold">Aurelia</span>
        </Link>
        <Link
          to="/settings"
          aria-label="Open settings"
          className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground"
        >
          <Command className="size-4" />
        </Link>
      </header>

      <main id="main" className="pb-24 lg:pb-0 lg:pl-[228px]">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav
        aria-label="Primary mobile"
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-background/90 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)]">
          {nav.slice(0, 5).map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(`${to}/`);
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px]",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80">{eyebrow}</p>
        ) : null}
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-xl text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions}
    </div>
  );
}
