import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  Layers3,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  businessPsychologyUnits,
  degreeWorkspaceSections,
  getUnitHref,
} from "@/features/business-psychology/data/business-psychology-data";

export function BusinessPsychologyDashboard() {
  const activeUnit = businessPsychologyUnits.find(
    (unit) => unit.status === "Active",
  );
  const recordedAssessments = businessPsychologyUnits.reduce(
    (total, unit) =>
      total +
      unit.assessments.filter((assessment) => assessment.title !== "Total")
        .length,
    0,
  );

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="signal">Active study workspace</Badge>
          <Badge variant="outline">Master of Business Psychology</Badge>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
              Master of Business Psychology
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A calm academic workspace for units, weekly topics, assessments,
              resources, grades, notes, and linked captures.
            </p>
          </div>
          <div className="rounded-md border border-border/70 bg-muted/35 p-4">
            <div className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
              Current focus
            </div>
            <div className="mt-2 text-sm font-semibold text-foreground">
              {activeUnit?.name ?? "Select active unit"}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {activeUnit?.code ?? "Unit code to add"}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StudyMetric
          icon={GraduationCap}
          label="Units"
          value={businessPsychologyUnits.length.toString()}
        />
        <StudyMetric
          icon={ClipboardList}
          label="Recorded assessments"
          value={recordedAssessments.toString()}
        />
        <StudyMetric icon={CheckCircle2} label="Current total" value="70.8%" />
      </section>

      <DashboardCard
        description="A Notion-inspired operating view for the degree, adapted into Jared Brain."
        eyebrow="Degree dashboard"
        title="Units"
      >
        <div className="grid gap-3">
          {businessPsychologyUnits.map((unit) => (
            <article
              className="rounded-lg border border-border/70 bg-muted/25 p-4"
              key={unit.id}
            >
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={unit.status === "Active" ? "signal" : "outline"}
                    >
                      {unit.status}
                    </Badge>
                    <Badge variant="secondary">{unit.code}</Badge>
                  </div>
                  <h2 className="mt-3 text-base font-semibold text-foreground">
                    {unit.name}
                  </h2>
                  <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                    <UnitStat
                      icon={CalendarDays}
                      label="Weekly topics"
                      value={
                        unit.weeklyTopics.length
                          ? unit.weeklyTopics.length.toString()
                          : "To add"
                      }
                    />
                    <UnitStat
                      icon={ClipboardList}
                      label="Assessments"
                      value={
                        unit.assessments.length
                          ? unit.assessments.length.toString()
                          : "To add"
                      }
                    />
                    <UnitStat icon={BookOpen} label="Grade" value={unit.result} />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-md border border-border/70 bg-background/70 p-3">
                    <div className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
                      Key resources
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {unit.keyResources.slice(0, 4).map((resource) => (
                        <Badge key={resource} variant="outline">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full justify-between" size="sm">
                    <Link href={getUnitHref(unit.id)}>
                      Open unit
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </DashboardCard>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardCard
          description="A clear first version for migrating study structure, notes, resources, grades, and capture links."
          eyebrow="Study system"
          title="Workspace Structure"
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {degreeWorkspaceSections.map((section) => (
              <div
                className="flex items-center gap-3 rounded-md border border-border/70 bg-muted/35 px-3 py-2 text-sm"
                key={section}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                  <Layers3 className="size-4" />
                </span>
                <span className="text-muted-foreground">{section}</span>
              </div>
            ))}
          </div>
        </DashboardCard>
        <DashboardCard
          description="Prepared lanes for future notes, screenshots, readings, videos, PDFs, and inbox-linked study captures."
          eyebrow="Capture links"
          title="Study Inbox"
        >
          <div className="rounded-md border border-dashed border-border bg-background/65 p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                <FileText className="size-4" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  Linked Captures placeholder
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Future: show Global Capture Inbox items tagged with this
                  degree, unit, week, assessment, or resource area.
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </section>
    </div>
  );
}

function StudyMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border/80 bg-card/95 p-4 shadow-[0_1px_2px_rgb(24_24_27_/_0.04)]">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-md bg-accent text-accent-foreground">
          <Icon className="size-4" />
        </span>
        <div>
          <div className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
            {label}
          </div>
          <div className="mt-1 text-xl font-semibold text-foreground">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function UnitStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-border/60 bg-background/65 px-3 py-2">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block truncate text-sm font-medium text-foreground">
          {value}
        </span>
      </span>
    </div>
  );
}
