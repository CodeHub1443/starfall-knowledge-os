import { createFileRoute, Link } from "@tanstack/react-router";
import { GlowButton } from "@/components/brain/GlowButton";
import { PageHeader } from "@/components/layout/AppShell";
import { connections } from "@/lib/knowledge-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/_shell/connections/")({
  head: () => ({
    meta: [
      { title: "Connections — Aurelia Second Brain" },
      { name: "description", content: "Manage the AI providers, publishing channels and knowledge sources your Second Brain is allowed to use." },
      { property: "og:title", content: "Connections — Aurelia" },
      { property: "og:description", content: "Manage providers, publishing and knowledge sources." },
    ],
  }),
  component: ConnectionsPage,
});

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    connected: { label: "Connected", color: "var(--success)" },
    available: { label: "Not connected", color: "var(--muted-foreground)" },
    soon: { label: "Coming soon", color: "var(--warning)" },
  };
  const s = map[status] ?? map.available;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]"
      style={{ color: s.color, background: `color-mix(in oklab, ${s.color} 12%, transparent)` }}
    >
      <span className="size-1.5 rounded-full" style={{ background: s.color }} />
      {s.label}
    </span>
  );
}

function ConnectionsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader
        eyebrow="Connections"
        title="What your brain can reach"
        subtitle="Nothing is read or published without an explicit connection. Tokens are never shown."
      />

      <div className="mt-10 space-y-10">
        {connections.map((group) => (
          <section key={group.category}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {group.category}
            </h2>
            <div className="mt-4 space-y-3">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "glass flex flex-wrap items-center gap-4 rounded-2xl p-5",
                    item.status === "soon" && "opacity-70",
                  )}
                >
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2/70 font-display text-sm font-semibold"
                  >
                    {item.name.slice(0, 2)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold">{item.name}</h3>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    {item.perms.length ? (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {item.perms.join(" · ")}
                        {item.synced ? ` · ${item.synced}` : ""}
                      </p>
                    ) : null}
                  </div>
                  {item.status === "connected" ? (
                    item.id === "linkedin" ? (
                      <GlowButton size="sm" variant="outline" asChild>
                        <Link to="/connections/linkedin">Manage connection</Link>
                      </GlowButton>
                    ) : (
                      <GlowButton size="sm" variant="outline" onClick={() => toast("Disconnected (prototype)")}>
                        Disconnect
                      </GlowButton>
                    )
                  ) : item.status === "available" ? (
                    <GlowButton size="sm" onClick={() => toast("Connect flow handled by the existing backend")}>
                      Connect
                    </GlowButton>
                  ) : (
                    <GlowButton size="sm" variant="ghost" disabled>
                      Coming soon
                    </GlowButton>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
