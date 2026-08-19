import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GlowButton } from "@/components/brain/GlowButton";
import { PageHeader } from "@/components/layout/AppShell";
import { cn } from "@/lib/utils";
import { library } from "@/lib/knowledge-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_shell/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Aurelia Second Brain" },
      { name: "description", content: "Personalization, memory controls, AI preferences, privacy and data export for your Second Brain." },
      { property: "og:title", content: "Settings — Aurelia" },
      { property: "og:description", content: "Personalization, memory and privacy controls." },
    ],
  }),
  component: SettingsPage,
});

const sections = ["Profile", "Personalization", "Memory", "AI", "Privacy & Data", "Security", "Subscription"] as const;

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-surface/50 px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50";

function SettingsPage() {
  const [tab, setTab] = useState<(typeof sections)[number]>("Profile");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader eyebrow="Settings" title="Your system" subtitle="How your Second Brain thinks, remembers and protects you." />

      <div className="mt-8 grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Settings sections" className="scroll-slim flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => setTab(s)}
              aria-current={tab === s}
              className={cn(
                "shrink-0 rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors",
                tab === s ? "border border-primary/25 bg-primary/10 text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </nav>

        <div className="glass rounded-2xl p-6">
          {tab === "Profile" ? (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Profile</h2>
              <Field label="Name"><input className={inputCls} defaultValue="Alex Mercer" /></Field>
              <Field label="Profession"><input className={inputCls} defaultValue="Founder, AI infrastructure" /></Field>
              <Field label="Email" hint="Managed by your existing account system.">
                <input className={inputCls} defaultValue="alex@example.com" readOnly />
              </Field>
              <GlowButton onClick={() => toast.success("Profile saved (prototype)")}>Save changes</GlowButton>
            </div>
          ) : null}

          {tab === "Personalization" ? (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Personalization</h2>
              <Field label="Interests"><input className={inputCls} defaultValue="GPU optimization, enterprise AI, team design" /></Field>
              <Field label="Writing style" hint="Learned from your conversations; you can override it.">
                <input className={inputCls} defaultValue="Short declarative sentences, concrete numbers, no hype" />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Preferred language"><input className={inputCls} defaultValue="English" /></Field>
                <Field label="Tone"><input className={inputCls} defaultValue="Direct, warm, specific" /></Field>
              </div>
              <Field label="Things I should remember">
                <textarea rows={3} className={cn(inputCls, "resize-none")} defaultValue="Long-term goals, customer stories, technical decisions" />
              </Field>
              <Field label="Things I should never remember">
                <textarea rows={3} className={cn(inputCls, "resize-none")} defaultValue="Health details, family names" />
              </Field>
              <GlowButton onClick={() => toast.success("Personalization saved (prototype)")}>Save changes</GlowButton>
            </div>
          ) : null}

          {tab === "Memory" ? (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">What I remember about you</h2>
              <p className="text-sm text-muted-foreground">Correct or remove anything. Changes propagate to future reasoning.</p>
              <ul className="space-y-3">
                {library.slice(0, 5).map((i) => (
                  <li key={i.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface/40 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{i.title}</p>
                      <p className="text-xs text-muted-foreground">{i.summary}</p>
                    </div>
                    <GlowButton size="sm" variant="ghost" onClick={() => toast("Editing (prototype)")}>Edit</GlowButton>
                    <GlowButton size="sm" variant="danger" onClick={() => toast("Forgotten (prototype)")}>Forget</GlowButton>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {tab === "AI" ? (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">AI behaviour</h2>
              <Field label="Reasoning depth" hint="Deeper reasoning uses more of your knowledge base per answer.">
                <input type="range" min={1} max={3} defaultValue={2} className="w-full accent-[var(--primary)]" />
              </Field>
              <Field label="Extraction sensitivity" hint="How eagerly I turn conversation into lasting knowledge.">
                <input type="range" min={1} max={3} defaultValue={2} className="w-full accent-[var(--primary)]" />
              </Field>
              <p className="text-xs text-muted-foreground">Model routing is configured under Connections.</p>
            </div>
          ) : null}

          {tab === "Privacy & Data" ? (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Privacy &amp; Data</h2>
              <p className="text-sm text-muted-foreground">
                Your knowledge is private by default and never used to train shared models.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <GlowButton variant="outline" onClick={() => toast("Export queued (prototype)")}>Export my knowledge</GlowButton>
                <GlowButton variant="outline" onClick={() => toast("Export queued (prototype)")}>Export conversations</GlowButton>
                <GlowButton variant="danger" onClick={() => toast("Requires confirmation (prototype)")}>Delete my knowledge</GlowButton>
                <GlowButton variant="danger" onClick={() => toast("Requires confirmation (prototype)")}>Delete account</GlowButton>
              </div>
            </div>
          ) : null}

          {tab === "Security" ? (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Security</h2>
              <Field label="Two-factor authentication" hint="Handled by your existing auth provider.">
                <GlowButton variant="outline" size="sm" onClick={() => toast("Opens existing auth flow")}>Manage 2FA</GlowButton>
              </Field>
              <Field label="Active sessions">
                <p className="text-sm text-muted-foreground">This device · last active now</p>
              </Field>
            </div>
          ) : null}

          {tab === "Subscription" ? (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Subscription</h2>
              <div className="rounded-xl border border-primary/25 bg-primary/8 p-5">
                <p className="text-sm font-medium text-primary">Second Brain · Pro</p>
                <p className="mt-1 text-sm text-muted-foreground">Unlimited memories, all output channels.</p>
              </div>
              <GlowButton variant="outline" onClick={() => toast("Billing portal (prototype)")}>Manage billing</GlowButton>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
