export type AgentCapability =
  | "research"
  | "planning"
  | "synthesis"
  | "review"
  | "briefing"
  | "routing";

export type AgentBlueprint = {
  id: string;
  name: string;
  purpose: string;
  capabilities: AgentCapability[];
  humanReviewRequired: boolean;
};

export const plannedAgentBlueprints: AgentBlueprint[] = [
  {
    id: "executive-chief-of-staff",
    name: "Executive Chief of Staff",
    purpose: "Prepare briefings, surface risks, and connect priorities across domains.",
    capabilities: ["briefing", "synthesis", "planning"],
    humanReviewRequired: true,
  },
  {
    id: "capture-router",
    name: "Capture Router",
    purpose: "Classify raw captures and suggest the correct domain, project, or memory lane.",
    capabilities: ["routing", "synthesis"],
    humanReviewRequired: true,
  },
  {
    id: "learning-synthesizer",
    name: "Learning Synthesizer",
    purpose: "Turn study notes and sources into concepts, prompts, and revision paths.",
    capabilities: ["research", "synthesis", "review"],
    humanReviewRequired: true,
  },
];
