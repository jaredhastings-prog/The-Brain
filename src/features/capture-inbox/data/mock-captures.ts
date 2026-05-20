import type { CaptureInboxItem } from "@/features/capture-inbox/types";

export const mockCapturedItems: CaptureInboxItem[] = [
  {
    id: "capture-001",
    title: "Map Evolve Lab onboarding journey",
    type: "Idea",
    domain: "Business",
    subDomain: "Evolve Lab",
    priority: "High",
    status: "Inbox",
    tags: ["evolve-lab", "offer", "client-journey"],
    rawContent:
      "Sketch a clearer onboarding path from first call through first 30 days. Include decisions, assets, client expectations, and places where AI can summarize progress.",
    createdAt: "2026-05-19T08:15:00.000Z",
    aiRoutingHint: "Likely belongs in Business / Evolve Lab.",
  },
  {
    id: "capture-002",
    title: "Business psychology assessment thread",
    type: "Study Note",
    domain: "Study & Learning",
    subDomain: "Master of Business Psychology",
    priority: "Medium",
    status: "Triaged",
    tags: ["masters", "assessment", "reading"],
    rawContent:
      "Need to connect motivation theory notes with real workplace coaching examples. Pull out three examples from current client context before writing.",
    createdAt: "2026-05-18T21:40:00.000Z",
    aiRoutingHint: "Route to Master of Business Psychology.",
  },
  {
    id: "capture-003",
    title: "Remember Liam weekend plan",
    type: "Memory",
    domain: "Liam",
    subDomain: "Activities",
    priority: "High",
    status: "In Progress",
    tags: ["liam", "weekend", "family"],
    rawContent:
      "Plan something outside this weekend. Keep it simple, active, and not over-scheduled. Check weather and choose one main thing.",
    createdAt: "2026-05-18T07:30:00.000Z",
    aiRoutingHint: "Could become a family reminder and memory timeline entry.",
  },
  {
    id: "capture-004",
    title: "Monthly subscription audit",
    type: "Finance Note",
    domain: "Finance",
    priority: "Medium",
    status: "Inbox",
    tags: ["budget", "subscriptions"],
    rawContent:
      "Review active tools, SaaS, streaming, and app subscriptions. Decide what is essential, what is experimental, and what can be cancelled.",
    createdAt: "2026-05-17T18:05:00.000Z",
    aiRoutingHint: "Future finance agent can turn this into a recurring review.",
  },
  {
    id: "capture-005",
    title: "Energy pattern reflection",
    type: "Health Note",
    domain: "Health & Performance",
    subDomain: "Mental Health",
    priority: "Low",
    status: "Archived",
    tags: ["energy", "sleep", "focus"],
    rawContent:
      "Late-day focus is better when the morning starts with movement and no heavy context switching before breakfast.",
    createdAt: "2026-05-16T06:55:00.000Z",
    aiRoutingHint: "Useful for future performance pattern summaries.",
  },
  {
    id: "capture-006",
    status: "Inbox",
    tags: [],
    rawContent:
      "Follow up on the thought about simplifying the weekly reset. Leave it uncategorised until it is clearer where it belongs.",
    createdAt: "2026-05-15T16:20:00.000Z",
    aiRoutingHint: "Uncategorised. Ready for later routing.",
  },
];
