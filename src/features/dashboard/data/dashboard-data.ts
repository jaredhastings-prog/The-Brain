export const executiveMetrics = [
  {
    label: "Priority lanes",
    value: "5",
    helper: "Active focus areas across business, study, health, finance, and family.",
    tone: "cyan" as const,
  },
  {
    label: "Open captures",
    value: "12",
    helper: "Holding pattern for ideas, commitments, and loose thoughts.",
    tone: "amber" as const,
  },
  {
    label: "Agent runway",
    value: "4",
    helper: "Prepared orchestration lanes for research, planning, review, and synthesis.",
    tone: "emerald" as const,
  },
];

export const dashboardWidgets = [
  {
    title: "Business Radar",
    description:
      "Unified operating view for Evolve Lab, Frontier SQ, Frontier Wear, and The Coaching Room.",
    items: ["Revenue signals", "Open decisions", "Follow-up queue"],
  },
  {
    title: "Learning Track",
    description:
      "Study overview for Business Psychology, NLP, and long-form knowledge capture.",
    items: ["Assessments", "Reading backlog", "Concept memory"],
  },
  {
    title: "Performance Stack",
    description:
      "Health, focus, energy, and recovery signals without cognitive overload.",
    items: ["Sleep trend", "Training rhythm", "Medication notes"],
  },
  {
    title: "Memory Timeline",
    description:
      "Chronological context layer for events, relationships, and decisions.",
    items: ["Recent memories", "Milestones", "Reflection prompts"],
  },
  {
    title: "Global Capture",
    description:
      "Low-friction inbox for voice, text, links, screenshots, and future automations.",
    items: ["Unsorted", "Needs action", "Archive-ready"],
  },
  {
    title: "Proactive Insights",
    description:
      "Future AI surface for patterns, nudges, and cross-domain synthesis.",
    items: ["Risk signals", "Opportunity prompts", "Weekly briefing"],
  },
];
