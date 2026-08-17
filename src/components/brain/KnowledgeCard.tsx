import { typeMeta, type KnowledgeItem } from "@/lib/knowledge-data";
import { cn } from "@/lib/utils";

export function TypeBadge({ type }: { type: KnowledgeItem["type"] }) {
  const meta = typeMeta[type];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase"
      style={{
        color: meta.hue,
        background: `color-mix(in oklab, ${meta.hue} 14%, transparent)`,
        border: `1px solid color-mix(in oklab, ${meta.hue} 28%, transparent)`,
      }}
    >
      <span className="size-1.5 rounded-full" style={{ background: meta.hue }} />
      {meta.label}
    </span>
  );
}

export function KnowledgeCard({
  item,
  onOpen,
  className,
}: {
  item: KnowledgeItem;
  onOpen?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "glass group relative w-full overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: typeMeta[item.type].hue }}
      />
      <div className="flex items-start justify-between gap-3">
        <TypeBadge type={item.type} />
        <span className="text-xs text-muted-foreground">{item.date}</span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-foreground">{item.title}</h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {item.relations.slice(0, 2).map((r) => (
          <span key={r} className="rounded-full bg-surface-2/70 px-2.5 py-1 text-[11px] text-muted-foreground">
            {r}
          </span>
        ))}
        <span className="ml-auto text-[11px] text-muted-foreground">
          {Math.round(item.confidence * 100)}% confidence
        </span>
      </div>
    </button>
  );
}
