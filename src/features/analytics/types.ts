export type DashboardWidgetKind =
  | "metric"
  | "timeline"
  | "queue"
  | "briefing"
  | "chart";

export type DashboardWidgetDefinition = {
  id: string;
  title: string;
  kind: DashboardWidgetKind;
  domain: string;
  dataSourceKey?: string;
};

export type AnalyticsSignal = {
  id: string;
  label: string;
  value: string;
  trend?: "up" | "down" | "flat";
};
