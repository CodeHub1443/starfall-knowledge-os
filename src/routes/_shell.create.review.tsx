import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Pencil, RefreshCw, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { GlowButton } from "@/components/brain/GlowButton";
import { PageHeader } from "@/components/layout/AppShell";
import { toast } from "sonner";

export const Route = createFileRoute("/_shell/create/review")({
  head: () => ({
    meta: [
      { title: "Review draft — Aurelia Second Brain" },
      { name: "description", content: "Review, edit and publish a draft grounded in your own knowledge base." },
      { property: "og:title", content: "Review draft — Aurelia" },
      { property: "og:description", content: "Review and publish a draft grounded in your knowledge." },
    ],
  }),
  component: ReviewPage,
});

const initial = `Most enterprise AI pilots don't die in the demo. They die in procurement.

Two of ours stalled last year after clean technical evaluations. Both times the blocker was a security questionnaire nobody owned.

What changed for us: we qualify legal and security readiness before we invest a single engineering week. Narrow the wedge, name the owner, then build.

Slower to start. Far fewer dead pilots.`;

const sources = [
  { title: "Enterprise pilots die in procurement, not in demos", type: "Lesson" },
  { title: "First customer said no for a year", type: "Story" },
  { title: "Writes in short declarative sentences", type: "Preference" },
];

function ReviewPage() {
  const [text, setText] = useState(initial);
  const [editing, setEditing] = useState(false);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader
        eyebrow="Review"
        title="Your LinkedIn draft"
        subtitle="Written from your own material. Edit anything before it goes out."
        actions={
          <GlowButton variant="outline" size="sm" asChild>
            <Link to="/create">Back to Create</Link>
          </GlowButton>
        }
      />

      <ol className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {["Generate", "Ground", "Review", "Edit", "Publish"].map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className={
                i <= 2
                  ? "inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-primary"
                  : "rounded-full border border-border px-3 py-1"
              }
            >
              {i <= 2 ? <Check className="size-3" /> : null}
              {s}
            </span>
            {i < 4 ? <span aria-hidden className="text-border">—</span> : null}
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs text-success">
              <ShieldCheck className="size-3.5" /> Grounded in your knowledge
            </span>
            <button
              onClick={() => setEditing((e) => !e)}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Pencil className="size-3.5" /> {editing ? "Preview" : "Edit"}
            </button>
          </div>

          {editing ? (
            <>
              <label htmlFor="draft" className="sr-only">Draft content</label>
              <textarea
                id="draft"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={14}
                className="scroll-slim mt-5 w-full resize-none rounded-xl border border-border bg-surface/50 p-4 text-[15px] leading-relaxed outline-none focus:border-primary/50"
              />
            </>
          ) : (
            <article className="mt-5 whitespace-pre-wrap text-[15px] leading-[1.8] text-foreground/95">
              {text}
            </article>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <GlowButton onClick={() => toast.success("Published to LinkedIn (prototype)")}>
              <Send /> Publish to LinkedIn
            </GlowButton>
            <GlowButton variant="outline" onClick={() => toast("Regenerating from your knowledge…")}>
              <RefreshCw /> Regenerate
            </GlowButton>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <h2 className="text-sm font-semibold">Sources from your brain</h2>
            <ul className="mt-4 space-y-3">
              {sources.map((s) => (
                <li key={s.title} className="flex gap-3">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  <div>
                    <p className="text-sm leading-snug">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.type}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-5">
            <h2 className="text-sm font-semibold">Preview</h2>
            <div className="mt-4 rounded-xl border border-border bg-surface/50 p-4">
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-full bg-[image:var(--gradient-accent)]" aria-hidden />
                <div>
                  <p className="text-sm font-medium">You</p>
                  <p className="text-[11px] text-muted-foreground">Now · LinkedIn</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-6 whitespace-pre-wrap text-[13px] leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
