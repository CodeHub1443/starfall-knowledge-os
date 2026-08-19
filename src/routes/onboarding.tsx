import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowUp, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GlowButton } from "@/components/brain/GlowButton";
import { StarField } from "@/components/brain/StarField";
import { LoadingState } from "@/components/brain/States";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Let's get to know each other — Aurelia" },
      { name: "description", content: "A short conversation instead of a questionnaire: tell your Second Brain what you work on and how you think." },
      { property: "og:title", content: "Let's get to know each other — Aurelia" },
      { property: "og:description", content: "A conversation, not a questionnaire." },
    ],
  }),
  component: Onboarding,
});

/**
 * Conversational shell over the existing validated onboarding questions.
 * Each prompt maps 1:1 to an existing backend onboarding field — the payload
 * shape is unchanged, only the presentation is conversational.
 */
const prompts = [
  { field: "intro", text: "Tell me a little about yourself. What are you working on or thinking about these days?" },
  { field: "role", text: "How would you describe what you do, in your own words?" },
  { field: "focus", text: "What's taking most of your attention right now?" },
  { field: "audience", text: "Who do you usually write or speak for?" },
  { field: "voice", text: "And how do you like to sound — plain and direct, or more reflective?" },
];

interface Turn { role: "ai" | "user"; text: string }

function Onboarding() {
  const [turns, setTurns] = useState<Turn[]>([{ role: "ai", text: prompts[0].text }]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const navigate = useNavigate();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [turns, thinking]);

  const answer = () => {
    if (!input.trim()) return;
    setTurns((t) => [...t, { role: "user", text: input.trim() }]);
    setInput("");
    setThinking(true);
    const next = step + 1;
    window.setTimeout(() => {
      setThinking(false);
      if (next < prompts.length) {
        setStep(next);
        setTurns((t) => [...t, { role: "ai", text: prompts[next].text }]);
      } else {
        setTurns((t) => [
          ...t,
          { role: "ai", text: "That's enough to start. I've laid down your first nodes — let's look at your brain." },
        ]);
      }
    }, 700);
  };

  const done = step === prompts.length - 1 && turns.at(-1)?.role === "ai" && turns.length > prompts.length * 2 - 1;

  return (
    <div className="relative flex min-h-screen flex-col">
      <StarField />
      <div className="mx-auto w-full max-w-2xl px-5 pt-10">
        <div className="flex items-center gap-3">
          <Sparkles className="size-4 text-primary" />
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-[image:var(--gradient-accent)] transition-all duration-700"
              style={{ width: `${((step + 1) / prompts.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">Getting to know you</span>
        </div>
      </div>

      <div className="scroll-slim mx-auto w-full max-w-2xl flex-1 space-y-7 overflow-y-auto px-5 py-10">
        {turns.map((t, i) =>
          t.role === "ai" ? (
            <p key={i} className="animate-rise max-w-[60ch] text-lg leading-relaxed sm:text-xl">{t.text}</p>
          ) : (
            <p key={i} className="flex justify-end">
              <span className="max-w-[85%] rounded-3xl rounded-br-lg bg-surface-2/80 px-5 py-3 text-[15px]">{t.text}</span>
            </p>
          ),
        )}
        {thinking ? <LoadingState label="Listening" /> : null}
        {done ? (
          <GlowButton size="lg" onClick={() => navigate({ to: "/home" })}>Open my Second Brain</GlowButton>
        ) : null}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-0 px-5 pb-8">
        <form
          onSubmit={(e) => { e.preventDefault(); answer(); }}
          className="glass mx-auto flex w-full max-w-2xl items-end gap-3 rounded-3xl p-3"
        >
          <label htmlFor="ob" className="sr-only">Your answer</label>
          <textarea
            id="ob"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); answer(); } }}
            placeholder="Answer however feels natural…"
            className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label="Send answer"
            disabled={!input.trim()}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-primary-foreground disabled:opacity-40"
          >
            <ArrowUp className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
