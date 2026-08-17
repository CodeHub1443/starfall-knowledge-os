import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, Brain, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LoadingState } from "@/components/brain/States";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/chat")({
  head: () => ({
    meta: [
      { title: "Chat — Aurelia Second Brain" },
      { name: "description", content: "Think out loud with an AI companion that quietly turns your conversations into lasting knowledge." },
      { property: "og:title", content: "Chat — Aurelia Second Brain" },
      { property: "og:description", content: "Think out loud. Your AI remembers what matters." },
    ],
  }),
  component: ChatPage,
});

interface Msg { id: string; role: "user" | "ai"; text: string; learned?: string }

const starters = [
  "Tell me what you're working on.",
  "Something interesting happened today?",
  "Help me think through a decision.",
  "Tell me what you learned today.",
];

const reply =
  "That lines up with something you told me in March about narrowing the wedge before scaling. Want me to hold this as a lesson, or keep pulling on the thread?";

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [streamed, setStreamed] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamed, thinking]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", text }]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      setThinking(false);
      let i = 0;
      const tick = window.setInterval(() => {
        i += 3;
        setStreamed(reply.slice(0, i));
        if (i >= reply.length) {
          window.clearInterval(tick);
          setStreamed("");
          setMessages((m) => [
            ...m,
            { id: crypto.randomUUID(), role: "ai", text: reply, learned: "Lesson · narrowing the wedge" },
          ]);
        }
      }, 18);
    }, 650);
  };

  const empty = messages.length === 0 && !thinking && !streamed;

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col lg:min-h-screen">
      <div className="scroll-slim flex-1 overflow-y-auto px-4 pb-6 pt-8 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          {empty ? (
            <div className="animate-rise flex flex-col items-center py-16 text-center">
              <div
                className="mb-6 grid size-14 place-items-center rounded-2xl bg-[image:var(--gradient-accent)]"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                <Brain className="size-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-semibold sm:text-4xl">What's on your mind?</h1>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Talk normally. I'll keep what matters and connect it to what I already know about you.
              </p>
              <div className="mt-8 grid w-full max-w-xl gap-3 sm:grid-cols-2">
                {starters.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="glass rounded-2xl px-4 py-4 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {messages.map((m) => (
                <Message key={m.id} msg={m} />
              ))}
              {thinking ? <LoadingState label="Thinking with your knowledge" /> : null}
              {streamed ? <Message msg={{ id: "stream", role: "ai", text: streamed }} /> : null}
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent px-4 pb-6 pt-4 sm:px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="glass mx-auto flex w-full max-w-3xl items-end gap-3 rounded-3xl p-3"
        >
          <label htmlFor="composer" className="sr-only">Message your Second Brain</label>
          <textarea
            id="composer"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Say anything…"
            className="scroll-slim max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim()}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-accent)] text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40"
          >
            <ArrowUp className="size-5" />
          </button>
        </form>
      </div>
    </div>
  );
}

function Message({ msg }: { msg: Msg }) {
  if (msg.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-3xl rounded-br-lg bg-surface-2/80 px-5 py-3 text-[15px] leading-relaxed">
          {msg.text}
        </p>
      </div>
    );
  }
  return (
    <div className={cn("flex gap-4")}>
      <span
        className="mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-primary/30 bg-primary/10"
        aria-hidden
      >
        <span className="size-1.5 rounded-full bg-primary" style={{ animation: "pulse-node 3s ease-in-out infinite" }} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="max-w-[68ch] text-[15px] leading-[1.75] text-foreground/95">{msg.text}</p>
        {msg.learned ? (
          <div className="animate-rise mt-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-xs text-primary">
            <Sparkles className="size-3.5" />
            Added to your Second Brain · {msg.learned}
          </div>
        ) : null}
      </div>
    </div>
  );
}
