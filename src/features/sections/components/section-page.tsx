import type * as React from "react";
import { ArrowUpRight, Boxes, Clock3, Route } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SectionDefinition } from "@/features/sections/section-registry";

type SectionPageProps = {
  section: SectionDefinition;
};

const statusLabel: Record<SectionDefinition["status"], string> = {
  foundation: "Foundation ready",
  planned: "Planned",
  ready: "Ready",
};

export function SectionPage({ section }: SectionPageProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border/80 bg-card/70 p-5 shadow-sm md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={section.status === "planned" ? "attention" : "signal"}>
            {statusLabel[section.status]}
          </Badge>
          <Badge variant="outline">{section.eyebrow}</Badge>
        </div>
        <div className="mt-8 max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
            {section.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {section.description}
          </p>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        <DashboardCard
          eyebrow="Current frame"
          title="Focus Areas"
          description="The initial organizing model for this section."
        >
          <ListWithIcon icon={<Boxes className="size-4" />} items={section.focusAreas} />
        </DashboardCard>
        <DashboardCard
          eyebrow="Future capability"
          title="Expansion Path"
          description="Prepared lanes for later product and AI depth."
        >
          <ListWithIcon
            icon={<Route className="size-4" />}
            items={section.futureCapabilities}
          />
        </DashboardCard>
        <DashboardCard
          eyebrow="Data state"
          title="Integration Status"
          description="Frontend-only placeholder until data services are added."
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-md border border-border/70 bg-background/40 px-3 py-2">
              <Clock3 className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                No backend or database logic connected.
              </span>
            </div>
            <Button className="w-full justify-between" variant="secondary">
              Review architecture
              <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

function ListWithIcon({
  icon,
  items,
}: {
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          className="flex items-center gap-3 rounded-md border border-border/70 bg-background/40 px-3 py-2 text-sm"
          key={item}
        >
          <div className="grid size-8 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
            {icon}
          </div>
          <span className="text-muted-foreground">{item}</span>
        </div>
      ))}
    </div>
  );
}
