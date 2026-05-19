export type InsightPriority = "low" | "medium" | "high";

export type ProactiveInsight = {
  id: string;
  title: string;
  summary: string;
  priority: InsightPriority;
  sourceDomains: string[];
  recommendedAction?: string;
};

export type InsightReviewState =
  | "new"
  | "accepted"
  | "dismissed"
  | "snoozed";
