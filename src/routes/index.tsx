import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Layers, MessageSquare, Sparkles } from "lucide-react";
import { BrainConstellation } from "@/components/brain/BrainConstellation";
import { GlowButton } from "@/components/brain/GlowButton";
import { StarField } from "@/components/brain/StarField";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurelia — Your Personal Knowledge OS" },
      { name: "description", content: "A conversational second brain that learns from how you think and turns your knowledge into posts, articles and notes." },
      { property: "og:title", content: "Aurelia — Your Personal Knowledge OS" },
      { property: "og:description", content: "A conversational second brain that learns from how you think." },
    ],
  }),
  component: Landing,
});

const loop = [
  { icon: MessageSquare, title: "You talk", desc: "Ordinary conversation. No forms, no tagging, no classification." },
  { icon: Brain, title: "It understands", desc: "Stories, beliefs, lessons and decisions are extracted quietly." },
  { icon: Sparkles, title: "It connects", desc: "New knowledge finds its place in a constellation that keeps growing." },
  { icon: Layers, title: "You create", desc: "Posts, articles, newsletters and notes grounded in what you actually know." },
];

function Landing() {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <span className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-xl bg-[image:var(--gradient-accent)]">
            <span className="size-2 rounded-full bg-background/80" />
          </span>
          <span className="font-display text-[15px] font-semibold">Aurelia</span>
        </span>
        <GlowButton asChild variant="outline" size="sm">
          <Link to="/auth">Sign in</Link>
        </GlowButton>
      </header>

      <main>
        <section className="mx-auto w-full max-w-5xl px-5 pb-4 pt-14 text-center sm:px-8 sm:pt-24">
          <p className="animate-rise text-xs font-medium uppercase tracking-[0.24em] text-primary/80">
            Personal Knowledge OS
          </p>
          <h1 className="animate-rise mt-5 text-4xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl">
            Your knowledge is a
            <br className="hidden sm:block" /> <span className="text-gradient">universe</span>. Start mapping it.
          </h1>
          <p className="animate-rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Aurelia learns from your conversations and becomes a second brain that reasons with your
            own stories, beliefs and lessons — then helps you create from them.
          </p>
          <div className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-3">
            <GlowButton size="lg" asChild>
              <Link to="/onboarding">Begin the conversation <ArrowRight /></Link>
            </GlowButton>
            <GlowButton size="lg" variant="outline" asChild>
              <Link to="/home">See a live brain</Link>
            </GlowButton>
          </div>
        </section>

        <section aria-label="Preview of a knowledge constellation" className="mx-auto w-full max-w-3xl px-4">
          <BrainConstellation />
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-5 pb-20 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {loop.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="glass rounded-2xl p-6">
              <Icon className="size-5 text-primary" />
              <h2 className="mt-4 text-base font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        Private by default. Your knowledge never trains shared models.
      </footer>
    </div>
  );
}
