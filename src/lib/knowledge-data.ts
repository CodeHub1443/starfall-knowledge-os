/**
 * PROTOTYPE DATA ONLY — replace with real API reads.
 *
 * Backend data required for these surfaces:
 *  - GET /knowledge/stats        -> { memories, stories, beliefs, lessons, projects }
 *  - GET /knowledge/graph        -> { nodes: [{id,label,type,weight}], edges: [{from,to}] }
 *  - GET /knowledge/recent       -> recent extractions (insight text, type, createdAt)
 *  - GET /knowledge/items        -> library items (type,title,summary,content,date,confidence,relations,source)
 *  - POST /chat/messages (stream)-> assistant reply + extracted knowledge events
 *  - GET /connections            -> integration status per provider
 *  - GET /me + PATCH /me         -> profile + personalization
 */

export type KnowledgeType =
  | "story"
  | "belief"
  | "lesson"
  | "idea"
  | "decision"
  | "project"
  | "preference";

export const typeMeta: Record<KnowledgeType, { label: string; hue: string }> = {
  story: { label: "Story", hue: "var(--violet)" },
  belief: { label: "Belief", hue: "var(--primary)" },
  lesson: { label: "Lesson", hue: "var(--success)" },
  idea: { label: "Idea", hue: "var(--warning)" },
  decision: { label: "Decision", hue: "var(--violet)" },
  project: { label: "Project", hue: "var(--primary)" },
  preference: { label: "Preference", hue: "var(--muted-foreground)" },
};

export interface KnowledgeItem {
  id: string;
  type: KnowledgeType;
  title: string;
  summary: string;
  content: string;
  date: string;
  confidence: number;
  relations: string[];
  source: string;
}

export const stats = [
  { label: "Memories", value: 1284 },
  { label: "Stories", value: 87 },
  { label: "Beliefs", value: 42 },
  { label: "Lessons", value: 31 },
  { label: "Projects", value: 18 },
];

export const recentlyLearned = [
  {
    id: "r1",
    type: "preference" as KnowledgeType,
    text: "You prefer practical examples over theoretical explanations.",
    when: "2 hours ago",
  },
  {
    id: "r2",
    type: "idea" as KnowledgeType,
    text: "You're increasingly interested in GPU scheduling and inference cost curves.",
    when: "Yesterday",
  },
  {
    id: "r3",
    type: "belief" as KnowledgeType,
    text: "You recently changed your view on enterprise AI sales cycles.",
    when: "3 days ago",
  },
  {
    id: "r4",
    type: "lesson" as KnowledgeType,
    text: "Shipping a rough prototype early gets better feedback than a polished deck.",
    when: "Last week",
  },
];

export const library: KnowledgeItem[] = [
  {
    id: "k1",
    type: "story",
    title: "The migration weekend",
    summary: "Moved 40TB of embeddings without downtime, learned to trust the rollback plan.",
    content:
      "We planned a three-day cutover. The dual-write layer held, but the reindex job stalled at 60%. The rollback plan we almost skipped writing is what saved the weekend.",
    date: "2026-06-14",
    confidence: 0.92,
    relations: ["Infrastructure", "Team leadership"],
    source: "Conversation",
  },
  {
    id: "k2",
    type: "belief",
    title: "Small teams outperform when the loop is short",
    summary: "You believe feedback latency matters more than headcount.",
    content:
      "Repeatedly across conversations you argue that a team of four with a one-day feedback loop beats a team of twenty with a two-week loop.",
    date: "2026-05-02",
    confidence: 0.81,
    relations: ["Leadership", "Process"],
    source: "Conversation",
  },
  {
    id: "k3",
    type: "lesson",
    title: "Enterprise pilots die in procurement, not in demos",
    summary: "Qualify legal and security readiness before investing in a pilot.",
    content:
      "Two pilots stalled after successful technical evaluations. The blocker both times was a security questionnaire nobody owned.",
    date: "2026-04-21",
    confidence: 0.88,
    relations: ["Sales", "Enterprise AI"],
    source: "Conversation",
  },
  {
    id: "k4",
    type: "idea",
    title: "Inference cost dashboard per customer",
    summary: "Attribute GPU spend to accounts to price usage tiers honestly.",
    content: "Idea surfaced while discussing margin pressure on the AI product line.",
    date: "2026-06-01",
    confidence: 0.64,
    relations: ["GPU optimization", "Pricing"],
    source: "Conversation",
  },
  {
    id: "k5",
    type: "decision",
    title: "Stopped hiring for the growth pod",
    summary: "Chose depth over breadth for the next two quarters.",
    content: "Decided to freeze growth hiring and reinvest in the core retrieval quality.",
    date: "2026-03-11",
    confidence: 0.9,
    relations: ["Leadership", "Strategy"],
    source: "Conversation",
  },
  {
    id: "k6",
    type: "project",
    title: "Second Brain retrieval rewrite",
    summary: "Hybrid lexical + semantic retrieval with per-user reranking.",
    content: "Active project. Currently benchmarking rerankers against your own knowledge base.",
    date: "2026-06-18",
    confidence: 0.95,
    relations: ["Infrastructure", "AI"],
    source: "Conversation",
  },
  {
    id: "k7",
    type: "preference",
    title: "Writes in short declarative sentences",
    summary: "Prefers concrete numbers, dislikes hype adjectives.",
    content: "Applied automatically when drafting posts and articles.",
    date: "2026-02-08",
    confidence: 0.86,
    relations: ["Writing style"],
    source: "Conversation",
  },
  {
    id: "k8",
    type: "story",
    title: "First customer said no for a year",
    summary: "Persistence plus a narrow wedge eventually won the account.",
    content:
      "Twelve months of quarterly check-ins. The deal closed when you narrowed the offer to one workflow.",
    date: "2026-01-30",
    confidence: 0.78,
    relations: ["Sales", "Enterprise AI"],
    source: "Conversation",
  },
];

export const graph = {
  nodes: [
    { id: "you", label: "You", type: "core" as const, x: 50, y: 50, r: 16 },
    { id: "stories", label: "Stories", type: "story" as KnowledgeType, x: 22, y: 26, r: 10 },
    { id: "beliefs", label: "Beliefs", type: "belief" as KnowledgeType, x: 79, y: 24, r: 10 },
    { id: "lessons", label: "Lessons", type: "lesson" as KnowledgeType, x: 84, y: 63, r: 9 },
    { id: "ideas", label: "Ideas", type: "idea" as KnowledgeType, x: 55, y: 84, r: 9 },
    { id: "projects", label: "Projects", type: "project" as KnowledgeType, x: 18, y: 70, r: 9 },
    { id: "experience", label: "Experience", type: "decision" as KnowledgeType, x: 48, y: 16, r: 8 },
    { id: "leadership", label: "Leadership", type: "belief" as KnowledgeType, x: 92, y: 43, r: 6 },
    { id: "gpu", label: "GPU work", type: "idea" as KnowledgeType, x: 33, y: 92, r: 6 },
    { id: "sales", label: "Enterprise", type: "lesson" as KnowledgeType, x: 8, y: 46, r: 6 },
    { id: "writing", label: "Writing", type: "preference" as KnowledgeType, x: 71, y: 79, r: 6 },
  ],
  edges: [
    ["you", "stories"], ["you", "beliefs"], ["you", "lessons"], ["you", "ideas"],
    ["you", "projects"], ["you", "experience"], ["beliefs", "leadership"],
    ["ideas", "gpu"], ["stories", "sales"], ["lessons", "sales"], ["ideas", "writing"],
    ["projects", "gpu"], ["experience", "beliefs"], ["lessons", "leadership"],
  ] as [string, string][],
};

export const connections = [
  {
    category: "AI Providers",
    items: [
      { id: "openai", name: "OpenAI", desc: "Reasoning and drafting models", status: "connected", synced: "Synced 4 min ago", perms: ["Chat completions", "Embeddings"] },
      { id: "anthropic", name: "Anthropic", desc: "Long-context reasoning", status: "available", synced: "", perms: ["Chat completions"] },
    ],
  },
  {
    category: "Publishing",
    items: [
      { id: "linkedin", name: "LinkedIn", desc: "Personal profile publishing", status: "connected", synced: "Synced 1 hour ago", perms: ["Read profile", "Publish posts"] },
    ],
  },
  {
    category: "Knowledge sources",
    items: [
      { id: "gmail", name: "Gmail", desc: "Learn from threads you choose", status: "soon", synced: "", perms: [] },
      { id: "drive", name: "Google Drive", desc: "Documents and notes", status: "soon", synced: "", perms: [] },
      { id: "notion", name: "Notion", desc: "Workspace pages", status: "soon", synced: "", perms: [] },
      { id: "slack", name: "Slack", desc: "Channels you allow", status: "soon", synced: "", perms: [] },
      { id: "github", name: "GitHub", desc: "Repositories and issues", status: "soon", synced: "", perms: [] },
    ],
  },
] as const;
