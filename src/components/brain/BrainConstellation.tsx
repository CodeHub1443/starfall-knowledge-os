import { useState } from "react";
import { graph, typeMeta, type KnowledgeType } from "@/lib/knowledge-data";
import { cn } from "@/lib/utils";

function hueFor(type: string) {
  return type === "core" ? "var(--primary)" : typeMeta[type as KnowledgeType]?.hue ?? "var(--primary)";
}

export function BrainConstellation({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const byId = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));

  return (
    <div className={cn("relative w-full", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--violet) 30%, transparent), transparent 70%)" }}
      />
      <svg
        viewBox="0 0 100 100"
        className="relative w-full"
        style={{ aspectRatio: compact ? "16 / 9" : "1 / 1", maxHeight: compact ? 260 : 520 }}
        role="img"
        aria-label="Your knowledge constellation: memories, stories, beliefs, lessons and projects connected together"
      >
        <g>
          {graph.edges.map(([a, b]) => {
            const na = byId[a];
            const nb = byId[b];
            const on = active === a || active === b;
            return (
              <line
                key={`${a}-${b}`}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={on ? "var(--primary)" : "oklch(0.8 0.06 250 / 0.18)"}
                strokeWidth={on ? 0.45 : 0.22}
                strokeDasharray="1.2 1.6"
                style={{ animation: "dash 26s linear infinite", transition: "stroke 0.4s" }}
              />
            );
          })}
        </g>
        {graph.nodes.map((n, i) => {
          const isCore = n.type === "core";
          const on = active === n.id;
          return (
            <g
              key={n.id}
              tabIndex={0}
              role="button"
              aria-label={n.label}
              onMouseEnter={() => setActive(n.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n.id)}
              onBlur={() => setActive(null)}
              className="cursor-pointer outline-none"
            >
              <circle
                cx={n.x} cy={n.y} r={n.r / 2.4}
                fill={hueFor(n.type)}
                opacity={0.16}
                style={{ animation: `pulse-node ${6 + (i % 5)}s ease-in-out infinite`, transformOrigin: `${n.x}px ${n.y}px` }}
              />
              <circle
                cx={n.x} cy={n.y}
                r={(isCore ? 2.6 : 1.5) * (on ? 1.35 : 1)}
                fill={hueFor(n.type)}
                style={{ transition: "r 0.3s", filter: "drop-shadow(0 0 2px currentColor)" }}
              />
              <text
                x={n.x} y={n.y + (isCore ? 6.4 : 4.6)}
                textAnchor="middle"
                fontSize={isCore ? 3 : 2.4}
                fill={on || isCore ? "oklch(0.97 0.006 250)" : "oklch(0.75 0.02 258)"}
                style={{ fontFamily: "var(--font-sans)", transition: "fill 0.3s" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
