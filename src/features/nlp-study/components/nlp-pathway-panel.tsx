import { Route } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { nlpCoursePathway } from "@/features/nlp-study/data/nlp-study-content";

export function NlpPathwayPanel() {
  return (
    <DashboardCard
      description="A compact 8-day view based on the practitioner course structure."
      eyebrow="Pathway"
      title="Course Sequence"
    >
      <div className="space-y-3">
        {nlpCoursePathway.map((day) => (
          <div
            className="rounded-md border border-border/70 bg-muted/35 p-3"
            key={day.day}
          >
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-md bg-accent text-sm font-semibold text-accent-foreground">
                {day.day}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Route className="size-4 text-muted-foreground" />
                  {day.title}
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {day.focus}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
