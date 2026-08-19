import { createFileRoute } from "@tanstack/react-router";
import { Library as LibIcon, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { KnowledgeCard, TypeBadge } from "@/components/brain/KnowledgeCard";
import { EmptyState } from "@/components/brain/States";
import { PageHeader } from "@/components/layout/AppShell";
import { library, typeMeta, type KnowledgeItem, type KnowledgeType } from "@/lib/knowledge-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/library")({
  head: () => ({
    meta: [
      { title: "Library — Aurelia Second Brain" },
      { name: "description", content: "Every story, belief, lesson, idea and decision your Second Brain has gathered, searchable and editable." },
      { property: "og:title", content: "Library — Aurelia Second Brain" },
      { property: "og:description", content: "Everything your Second Brain has gathered." },
    ],
  }),
  component: LibraryPage,
});

const filters: ("all" | KnowledgeType)[] = [
  "all", "story", "belief", "lesson", "idea", "decision", "project", "preference",
];

function LibraryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<KnowledgeItem | null>(null);

  const items = useMemo(
    () =>
      library.filter(
        (i) =>
          (filter === "all" || i.type === filter) &&
          `${i.title} ${i.summary}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [filter, q],
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <PageHeader
        eyebrow="Library"
        title="Everything you've told me"
        subtitle="Your accumulated knowledge, organised by what it is rather than where it came from."
      />

      <div className="glass mt-8 flex items-center gap-3 rounded-2xl px-4 py-3">
        <Search className="size-4 text-muted-foreground" />
        <label htmlFor="lib-search" className="sr-only">Search your library</label>
        <input
          id="lib-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search titles and summaries…"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="scroll-slim mt-4 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-colors",
              filter === f
                ? "border-primary/45 bg-primary/12 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {f === "all" ? "All" : `${typeMeta[f].label}s`}
          </button>
        ))}
      </div>

      {items.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <KnowledgeCard key={item.id} item={item} onOpen={() => setOpen(item)} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-6"
          icon={<LibIcon className="size-5" />}
          title="Nothing here yet"
          description="Knowledge appears automatically as you talk with your Second Brain."
        />
      )}

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpen(null)}
        >
          <div
            className="glass animate-rise max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <TypeBadge type={open.type} />
              <button onClick={() => setOpen(null)} aria-label="Close" className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-semibold">{open.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{open.summary}</p>
            <p className="mt-5 text-[15px] leading-relaxed">{open.content}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-5 text-sm">
              <div><dt className="text-xs text-muted-foreground">Captured</dt><dd>{open.date}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Confidence</dt><dd>{Math.round(open.confidence * 100)}%</dd></div>
              <div><dt className="text-xs text-muted-foreground">Source</dt><dd>{open.source}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Connected to</dt><dd>{open.relations.join(", ")}</dd></div>
            </dl>
          </div>
        </div>
      ) : null}
    </div>
  );
}
