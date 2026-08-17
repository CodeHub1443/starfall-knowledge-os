import { createFileRoute } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { BrainConstellation } from "@/components/brain/BrainConstellation";
import { GlowButton } from "@/components/brain/GlowButton";
import { KnowledgeCard } from "@/components/brain/KnowledgeCard";
import { EmptyState, LoadingState } from "@/components/brain/States";
import { PageHeader } from "@/components/layout/AppShell";
import { library } from "@/lib/knowledge-data";

export const Route = createFileRoute("/_shell/brain")({
  head: () => ({
    meta: [
      { title: "Knowledge Explorer — Aurelia" },
      { name: "description", content: "Ask your Second Brain what you know about anything and see the connected memories, beliefs and lessons behind the answer." },
      { property: "og:title", content: "Knowledge Explorer — Aurelia" },
      { property: "og:description", content: "Ask your Second Brain what you already know." },
    ],
  }),
  component: BrainPage,
});

const prompts = [
  "What do I know about leadership?",
  "What have I learned about AI infrastructure?",
  "What beliefs have changed?",
  "What do I keep talking about?",
];

function BrainPage() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [loading, setLoading] = useState(false);

  const results = useMemo(() => {
    if (!submitted) return [];
    const q = submitted.toLowerCase();
    const hits = library.filter((i) =>
      `${i.title} ${i.summary} ${i.content} ${i.relations.join(" ")}`.toLowerCase().includes(
        q.split(" ").sort((a, b) => b.length - a.length)[0] ?? q,
      ),
    );
    return hits.length ? hits : library.slice(0, 3);
  }, [submitted]);

  const run = (q: string) => {
    setQuery(q);
    setLoading(true);
    setSubmitted("");
    window.setTimeout(() => {
      setSubmitted(q);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader
        eyebrow="Knowledge Explorer"
        title="Explore what you know"
        subtitle="Semantic search across your memories, stories, beliefs and lessons — with the connections between them."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) run(query.trim());
            }}
            className="glass flex items-center gap-3 rounded-2xl px-4 py-3"
          >
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <label htmlFor="explore" className="sr-only">Ask your Second Brain</label>
            <input
              id="explore"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask your Second Brain anything…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <GlowButton size="sm" type="submit">Ask</GlowButton>
          </form>

          <div className="mt-3 flex flex-wrap gap-2">
            {prompts.map((p) => (
              <button
                key={p}
                onClick={() => run(p)}
                className="rounded-full border border-border bg-surface/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {p}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {loading ? (
              <div className="glass rounded-2xl p-6"><LoadingState label="Searching your knowledge" /></div>
            ) : submitted ? (
              <>
                <div className="glass rounded-2xl border-primary/25 p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-primary">
                    <Sparkles className="size-3.5" /> Synthesis
                  </div>
                  <p className="mt-3 text-sm leading-relaxed">
                    Across {results.length} connected items, your thinking centres on short feedback loops,
                    concrete numbers over narrative, and earning trust before scale. Your view on enterprise
                    timelines shifted this spring.
                  </p>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {results.map((item) => (
                    <KnowledgeCard key={item.id} item={item} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                icon={<Search className="size-5" />}
                title="Ask a question to begin"
                description="Your Second Brain answers from your own memories, not from the internet."
              />
            )}
          </div>
        </div>

        <aside className="glass h-fit rounded-2xl p-4">
          <h2 className="px-2 text-sm font-semibold">Your constellation</h2>
          <BrainConstellation />
          <p className="px-2 pb-2 text-xs text-muted-foreground">
            Hover a node to trace its connections.
          </p>
        </aside>
      </div>
    </div>
  );
}
