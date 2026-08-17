import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Brain, FileText, Mail, Notebook, PenLine, Wand2 } from "lucide-react";
import { useState } from "react";
import { GlowButton } from "@/components/brain/GlowButton";
import { PageHeader } from "@/components/layout/AppShell";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/create/")({
  head: () => ({
    meta: [
      { title: "Create — Aurelia Second Brain" },
      { name: "description", content: "Turn what you know into a LinkedIn post, article, newsletter or note — grounded in your own knowledge." },
      { property: "og:title", content: "Create — Aurelia Second Brain" },
      { property: "og:description", content: "Turn what you know into something worth reading." },
    ],
  }),
  component: CreatePage,
});

const outputs = [
  { id: "linkedin", label: "LinkedIn post", icon: PenLine, available: true },
  { id: "article", label: "Article", icon: FileText, available: true },
  { id: "newsletter", label: "Newsletter", icon: Mail, available: true },
  { id: "note", label: "Note", icon: Notebook, available: true },
];

function CreatePage() {
  const [mode, setMode] = useState<"knowledge" | "custom">("knowledge");
  const [output, setOutput] = useState("linkedin");
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader
        eyebrow="Create"
        title="Turn what you know into something"
        subtitle="Every draft is grounded in your own memories, stories and beliefs — not generic AI filler."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {([
          { id: "knowledge", title: "From my knowledge", desc: "Let Aurelia pick the strongest material you already have.", icon: Brain },
          { id: "custom", title: "Custom topic", desc: "Give a direction and I'll ground it in what you know.", icon: Wand2 },
        ] as const).map(({ id, title, desc, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            aria-pressed={mode === id}
            className={cn(
              "glass rounded-2xl p-5 text-left transition-all hover:-translate-y-0.5",
              mode === id ? "border-primary/45 glow-ring" : "hover:border-primary/25",
            )}
          >
            <Icon className={cn("size-5", mode === id ? "text-primary" : "text-muted-foreground")} />
            <h2 className="mt-3 text-base font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </button>
        ))}
      </div>

      {mode === "custom" ? (
        <div className="glass mt-4 rounded-2xl p-5">
          <label htmlFor="topic" className="text-sm font-medium">What should it be about?</label>
          <textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            rows={3}
            placeholder="e.g. why enterprise AI pilots stall in procurement"
            className="scroll-slim mt-3 w-full resize-none rounded-xl border border-border bg-surface/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
          />
        </div>
      ) : null}

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Output</h2>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {outputs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setOutput(id)}
            aria-pressed={output === id}
            className={cn(
              "glass flex flex-col items-center gap-2 rounded-2xl px-3 py-5 text-sm transition-all",
              output === id ? "border-primary/45 text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-5" />
            {label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        More channels appear here as they're supported by your connections.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <GlowButton size="lg" onClick={() => navigate({ to: "/create/review" })}>
          <Wand2 /> Generate draft
        </GlowButton>
        <span className="text-xs text-muted-foreground">Grounded in 1,284 memories</span>
      </div>
    </div>
  );
}
