export type SectionStatus = "foundation" | "planned" | "ready";

export type SectionDefinition = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  status: SectionStatus;
  focusAreas: string[];
  futureCapabilities: string[];
};

export const sectionRegistry = {
  business: {
    id: "business",
    title: "Business",
    eyebrow: "Venture operating system",
    description:
      "A unified executive view for business strategy, delivery, offers, operations, and follow-through across all ventures.",
    status: "foundation",
    focusAreas: ["Portfolio overview", "Decision log", "Operating rhythms"],
    futureCapabilities: [
      "Pipeline analytics",
      "Cross-venture risk detection",
      "Weekly executive briefing",
    ],
  },
  evolveLab: {
    id: "evolveLab",
    title: "Evolve Lab",
    eyebrow: "Business / Evolve Lab",
    description:
      "A focused workspace for the Evolve Lab offer, client journeys, content, experiments, and growth strategy.",
    status: "planned",
    focusAreas: ["Programs", "Clients", "Content experiments"],
    futureCapabilities: [
      "Offer analytics",
      "Client signal synthesis",
      "Campaign planning agents",
    ],
  },
  frontierSq: {
    id: "frontierSq",
    title: "Frontier SQ",
    eyebrow: "Business / Frontier SQ",
    description:
      "A strategic dashboard for Frontier SQ priorities, partnerships, product signals, and execution tracking.",
    status: "planned",
    focusAreas: ["Strategic priorities", "Partnerships", "Delivery status"],
    futureCapabilities: [
      "Product telemetry",
      "Opportunity scoring",
      "Partner follow-up automation",
    ],
  },
  frontierWear: {
    id: "frontierWear",
    title: "Frontier Wear",
    eyebrow: "Business / Frontier Wear",
    description:
      "A lightweight operating view for apparel ideas, suppliers, drops, audience signals, and launch planning.",
    status: "planned",
    focusAreas: ["Design pipeline", "Suppliers", "Launch calendar"],
    futureCapabilities: [
      "Inventory planning",
      "Audience feedback memory",
      "Drop readiness scoring",
    ],
  },
  coachingRoom: {
    id: "coachingRoom",
    title: "The Coaching Room",
    eyebrow: "Business / The Coaching Room",
    description:
      "A dedicated view for coaching practice strategy, session insights, client outcomes, and reflective learning.",
    status: "planned",
    focusAreas: ["Client outcomes", "Session themes", "Practice growth"],
    futureCapabilities: [
      "Session note synthesis",
      "Client progress patterns",
      "Ethical coaching safeguards",
    ],
  },
  studyLearning: {
    id: "studyLearning",
    title: "Study & Learning",
    eyebrow: "Knowledge development",
    description:
      "A calm learning dashboard for formal study, personal research, notes, assignments, and concept memory.",
    status: "foundation",
    focusAreas: ["Study load", "Reading queue", "Knowledge synthesis"],
    futureCapabilities: [
      "Assessment planning",
      "Spaced-repetition prompts",
      "Concept graph generation",
    ],
  },
  businessPsychology: {
    id: "businessPsychology",
    title: "Master of Business Psychology",
    eyebrow: "Study & Learning / Degree",
    description:
      "A degree-specific workspace for units, readings, assessments, concepts, and research memory.",
    status: "planned",
    focusAreas: ["Units", "Assessment calendar", "Research notes"],
    futureCapabilities: [
      "Academic source memory",
      "Essay planning agent",
      "Concept-to-practice mapping",
    ],
  },
  nlp: {
    id: "nlp",
    title: "NLP",
    eyebrow: "Study & Learning / NLP",
    description:
      "A learning surface for NLP models, patterns, exercises, references, and practical application notes.",
    status: "planned",
    focusAreas: ["Models", "Exercises", "Practice notes"],
    futureCapabilities: [
      "Pattern library",
      "Practice reflection prompts",
      "Cross-linking with coaching memory",
    ],
  },
  healthPerformance: {
    id: "healthPerformance",
    title: "Health & Performance",
    eyebrow: "Body, energy, focus",
    description:
      "A low-clutter place for health routines, recovery, energy, focus patterns, and performance experiments.",
    status: "foundation",
    focusAreas: ["Energy", "Recovery", "Focus rituals"],
    futureCapabilities: [
      "Trend dashboards",
      "Wearable data integration",
      "Proactive recovery nudges",
    ],
  },
  liam: {
    id: "liam",
    title: "Liam",
    eyebrow: "Family memory",
    description:
      "A protected, thoughtful place for memories, plans, milestones, routines, and relationship context.",
    status: "foundation",
    focusAreas: ["Milestones", "Plans", "Memories"],
    futureCapabilities: [
      "Memory timeline linking",
      "Photo and note capture",
      "Reminder intelligence",
    ],
  },
  finance: {
    id: "finance",
    title: "Finance",
    eyebrow: "Money clarity",
    description:
      "A consolidated view for budgets, goals, assets, obligations, and future financial intelligence.",
    status: "planned",
    focusAreas: ["Budget view", "Goals", "Obligations"],
    futureCapabilities: [
      "Forecast dashboards",
      "Subscription detection",
      "Scenario planning agents",
    ],
  },
  relationships: {
    id: "relationships",
    title: "Relationships",
    eyebrow: "People and connection",
    description:
      "A relationship context layer for people, commitments, follow-ups, shared memories, and care rhythms.",
    status: "planned",
    focusAreas: ["Key people", "Follow-ups", "Shared context"],
    futureCapabilities: [
      "Relationship cadence insights",
      "Commitment tracking",
      "Conversation preparation",
    ],
  },
  personalProjects: {
    id: "personalProjects",
    title: "Personal Projects",
    eyebrow: "Creative and practical work",
    description:
      "A modular project cockpit for experiments, builds, ideas, tasks, and active creative threads.",
    status: "foundation",
    focusAreas: ["Active projects", "Idea backlog", "Next actions"],
    futureCapabilities: [
      "Project health summaries",
      "AI planning collaborators",
      "Decision and blocker memory",
    ],
  },
  memoryTimeline: {
    id: "memoryTimeline",
    title: "Memory Timeline",
    eyebrow: "Longitudinal memory",
    description:
      "The chronological layer for events, decisions, reflections, relationships, and cross-domain context.",
    status: "foundation",
    focusAreas: ["Events", "Decisions", "Reflections"],
    futureCapabilities: [
      "Vector memory retrieval",
      "Life-area filtering",
      "Pattern detection over time",
    ],
  },
  aiAgents: {
    id: "aiAgents",
    title: "AI Agents",
    eyebrow: "Orchestration layer",
    description:
      "The future home for specialized assistants that can research, synthesize, plan, review, and brief.",
    status: "foundation",
    focusAreas: ["Agent catalog", "Run history", "Human review"],
    futureCapabilities: [
      "Tool orchestration",
      "Memory-aware prompts",
      "Proactive briefings",
    ],
  },
  captureInbox: {
    id: "captureInbox",
    title: "Global Capture Inbox",
    eyebrow: "Frictionless capture",
    description:
      "A single intake lane for thoughts, voice notes, links, ideas, documents, and raw memory before triage.",
    status: "foundation",
    focusAreas: ["Unsorted captures", "Triage", "Routing"],
    futureCapabilities: [
      "Voice capture",
      "Auto-classification",
      "Memory extraction",
    ],
  },
  settings: {
    id: "settings",
    title: "Settings",
    eyebrow: "System preferences",
    description:
      "A future configuration surface for account settings, privacy, integrations, models, and data controls.",
    status: "planned",
    focusAreas: ["Preferences", "Privacy", "Integrations"],
    futureCapabilities: [
      "Model routing controls",
      "Data retention policies",
      "Integration management",
    ],
  },
} satisfies Record<string, SectionDefinition>;

export type SectionKey = keyof typeof sectionRegistry;
