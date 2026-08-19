const map: Record<string, { label: string; color: string }> = {
  connected: { label: "Connected", color: "var(--success)" },
  available: { label: "Not connected", color: "var(--muted-foreground)" },
  soon: { label: "Coming soon", color: "var(--warning)" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = map[status] ?? { label: "Not connected", color: "var(--muted-foreground)" };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]"
      style={{ color: s.color, background: `color-mix(in oklab, ${s.color} 12%, transparent)` }}
    >
      <span className="size-1.5 rounded-full" style={{ background: s.color }} />
      {s.label}
    </span>
  );
}
