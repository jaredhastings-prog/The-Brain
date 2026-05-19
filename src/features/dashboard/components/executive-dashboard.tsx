import type * as React from "react";
import { ArrowRight, BrainCircuit, Inbox, Sparkles } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { WidgetGrid } from "@/components/dashboard/widget-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  dashboardWidgets,
  executiveMetrics,
} from "@/features/dashboard/data/dashboard-data";

export function ExecutiveDashboard() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
        <div className="rounded-lg border border-border/80 bg-card/70 p-5 shadow-sm md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="signal">Executive dashboard</Badge>
            <Badge variant="outline">Dark mode first</Badge>
          </div>
          <div className="mt-8 max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
              Jared Brain
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              A calm personal operating system for decisions, memory, business,
              learning, health, relationships, finance, and AI-assisted execution.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {executiveMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </div>
        </div>
        <DashboardCard
          description="Prepared for the future agent layer. No backend logic is active yet."
          eyebrow="AI readiness"
          title="Agent Orchestration"
        >
          <div className="space-y-4">
            <InsightRow
              icon={<BrainCircuit className="size-4" />}
              label="Memory retrieval"
              value="Contract ready"
            />
            <InsightRow
              icon={<Inbox className="size-4" />}
              label="Capture routing"
              value="Interface ready"
            />
            <InsightRow
              icon={<Sparkles className="size-4" />}
              label="Proactive insights"
              value="Placeholder ready"
            />
            <Button className="w-full justify-between" variant="secondary">
              View agent runway
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </DashboardCard>
      </section>

      <WidgetGrid>
        {dashboardWidgets.map((widget) => (
          <DashboardCard
            description={widget.description}
            key={widget.title}
            title={widget.title}
          >
            <div className="space-y-2">
              {widget.items.map((item) => (
                <div
                  className="flex items-center justify-between rounded-md border border-border/70 bg-background/40 px-3 py-2 text-sm"
                  key={item}
                >
                  <span className="text-muted-foreground">{item}</span>
                  <span className="size-2 rounded-full bg-primary" />
                </div>
              ))}
            </div>
          </DashboardCard>
        ))}
      </WidgetGrid>
    </div>
  );
}

function InsightRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border/70 bg-background/40 px-3 py-2">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid size-8 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
          {icon}
        </div>
        <span className="truncate text-sm text-muted-foreground">{label}</span>
      </div>
      <span className="shrink-0 text-xs text-foreground">{value}</span>
    </div>
  );
}
