import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import { BrainConstellation } from "@/components/brain/BrainConstellation";
import { GlowButton } from "@/components/brain/GlowButton";
import { TypeBadge } from "@/components/brain/KnowledgeCard";
import { recentlyLearned, stats } from "@/lib/knowledge-data";

export const Route = createFileRoute("/_shell/home")({
  head: () => ({
    meta: [
      { title: "Your Second Brain — Aurelia" },
      { name: "description", content: "A living map of your memories, beliefs, lessons and ideas, growing with every conversation." },
      { property: "og:title", content: "Your Second Brain — Aurelia" },
      { property: "og:description", content: "A living map of your memories, beliefs, lessons and ideas." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
      <section className="animate-rise text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary/80">Good evening</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">
          Your <span className="text-gradient">Second Brain</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">Your knowledge is growing.</p>
      </section>

      <section className="mt-2" aria-label="Knowledge constellation">
        <BrainConstellation />
      </section>

      <section className="-mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl px-4 py-5 text-center">
            <p className="font-display text-2xl font-semibold sm:text-3xl">{s.value.toLocaleString()}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recently learned</h2>
            <Link to="/library" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
              Library <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          <ul className="mt-5 space-y-4">
            {recentlyLearned.map((r) => (
              <li key={r.id} className="flex gap-3 border-b border-border/60 pb-4 last:border-0 last:pb-0">
                <span
                  className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                  style={{ animation: "pulse-node 4s ease-in-out infinite" }}
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-sm leading-relaxed">{r.text}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <TypeBadge type={r.type} />
                    <span className="text-xs text-muted-foreground">{r.when}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="glass glow-ring rounded-2xl p-6">
            <Sparkles className="size-5 text-primary" />
            <h2 className="mt-3 text-lg font-semibold">Keep the thread going</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Every conversation adds nodes to your constellation.
            </p>
            <GlowButton asChild className="mt-5 w-full">
              <Link to="/chat">
                <MessageSquare /> Start a conversation
              </Link>
            </GlowButton>
          </div>
          <div className="glass rounded-2xl p-6">
            <h2 className="text-sm font-semibold">Turn knowledge into output</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Draft a post, article or newsletter grounded in what you already know.
            </p>
            <GlowButton asChild variant="outline" className="mt-4 w-full">
              <Link to="/create">Open Create</Link>
            </GlowButton>
          </div>
        </div>
      </section>
    </div>
  );
}
