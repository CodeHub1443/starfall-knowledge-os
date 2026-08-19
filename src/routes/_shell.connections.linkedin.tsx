import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { GlowButton } from "@/components/brain/GlowButton";
import { PageHeader } from "@/components/layout/AppShell";
import { StatusBadge } from "./_shell.connections.index";
import { toast } from "sonner";

export const Route = createFileRoute("/_shell/connections/linkedin")({
  head: () => ({
    meta: [
      { title: "LinkedIn connection — Aurelia" },
      { name: "description", content: "Review the permissions, sync status and publishing scope of your LinkedIn connection." },
      { property: "og:title", content: "LinkedIn connection — Aurelia" },
      { property: "og:description", content: "Permissions and publishing scope for LinkedIn." },
    ],
  }),
  component: LinkedInPage,
});

function LinkedInPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader
        eyebrow="Publishing"
        title="LinkedIn"
        subtitle="One of several output channels. Your knowledge stays yours."
        actions={
          <GlowButton size="sm" variant="outline" asChild>
            <Link to="/connections">All connections</Link>
          </GlowButton>
        }
      />

      <div className="glass mt-8 rounded-2xl p-6">
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid size-12 place-items-center rounded-xl bg-[image:var(--gradient-accent)] font-display font-semibold text-primary-foreground">
            in
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Personal profile</h2>
              <StatusBadge status="connected" />
            </div>
            <p className="text-sm text-muted-foreground">Last synced 1 hour ago</p>
          </div>
          <GlowButton variant="danger" size="sm" onClick={() => toast("Disconnected (prototype)")}>
            Disconnect
          </GlowButton>
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <h3 className="text-sm font-semibold">Permissions granted</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {["Read your basic profile", "Publish posts on your behalf", "Read engagement on your own posts"].map((p) => (
              <li key={p} className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-success" /> {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Access tokens are stored server-side and never displayed in this interface.
          </p>
        </div>
      </div>
    </div>
  );
}
