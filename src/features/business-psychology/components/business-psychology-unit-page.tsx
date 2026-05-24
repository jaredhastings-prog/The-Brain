"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ClipboardList,
  FileText,
  GraduationCap,
  Image,
  Landmark,
  Link2,
  NotebookPen,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudyTabs } from "@/features/business-psychology/components/study-tabs";
import type { StudyUnit } from "@/features/business-psychology/data/business-psychology-data";
import { getWeekHref } from "@/features/business-psychology/data/business-psychology-data";

export function BusinessPsychologyUnitPage({ unit }: { unit: StudyUnit }) {
  return (
    <div className="space-y-6 pb-20">
      <Button asChild size="sm" variant="ghost">
        <Link href="/study-learning/master-of-business-psychology">
          <ArrowLeft className="size-4" />
          Degree dashboard
        </Link>
      </Button>

      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={unit.status === "Active" ? "signal" : "outline"}>
            {unit.status}
          </Badge>
          <Badge variant="secondary">{unit.code}</Badge>
        </div>
        <div className="mt-8 max-w-4xl">
          <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
            {unit.name}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {unit.overview.description}
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <UnitMetric
          icon={CalendarDays}
          label="Weekly topics"
          value={
            unit.weeklyTopics.length ? unit.weeklyTopics.length.toString() : "To add"
          }
        />
        <UnitMetric
          icon={ClipboardList}
          label="Assessments"
          value={
            unit.assessments.length ? unit.assessments.length.toString() : "To add"
          }
        />
        <UnitMetric icon={GraduationCap} label="Grade / result" value={unit.result} />
      </section>

      <DashboardCard
        description="Unit workspace tabs for notes, assessment details, resources, grades, and linked captures."
        eyebrow="Unit page"
        title={unit.name}
      >
        <StudyTabs
          ariaLabel={`${unit.name} unit sections`}
          tabs={[
            {
              id: "overview",
              label: "Overview",
              icon: BookOpen,
              content: <OverviewTab unit={unit} />,
            },
            {
              id: "weekly-content",
              label: "Weekly Content",
              icon: CalendarDays,
              content: <WeeklyContentTab unit={unit} />,
            },
            {
              id: "assessments",
              label: "Assessments",
              icon: ClipboardList,
              content: <AssessmentsTab unit={unit} />,
            },
            {
              id: "notes",
              label: "Notes",
              icon: NotebookPen,
              content: (
                <PlaceholderPanel
                  title="Notes workspace"
                  items={[
                    "Add copied university notes, personal summaries, diagrams, and assignment planning notes here.",
                    "Future: connect notes to weekly topics, assessment briefs, and Global Capture Inbox entries.",
                  ]}
                />
              ),
            },
            {
              id: "resources",
              label: "Resources",
              icon: Link2,
              content: <ResourceTab unit={unit} />,
            },
            {
              id: "grades",
              label: "Grades",
              icon: Landmark,
              content: <GradesTab unit={unit} />,
            },
            {
              id: "linked-captures",
              label: "Linked Captures",
              icon: FileText,
              content: (
                <PlaceholderPanel
                  title="Linked Captures"
                  items={[
                    "Future: show capture inbox items connected to this unit.",
                    "Useful captures may include assignment ideas, reading notes, lecture screenshots, reflection notes, and voice dumps.",
                  ]}
                />
              ),
            },
          ]}
        />
      </DashboardCard>
    </div>
  );
}

function OverviewTab({ unit }: { unit: StudyUnit }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <StudyBlock title="Description" items={[unit.overview.description]} />
      <StudyBlock title="Learning Outcomes" items={unit.overview.learningOutcomes} />
      <StudyBlock title="Unit Content" items={unit.overview.unitContent} />
      <StudyBlock title="Unit Presentation" items={unit.overview.unitPresentation} />
      <StudyBlock title="Assessments" items={unit.overview.assessmentOverview} />
    </div>
  );
}

function WeeklyContentTab({ unit }: { unit: StudyUnit }) {
  if (!unit.weeklyTopics.length) {
    return (
      <PlaceholderPanel
        title="Weekly topics to add"
        items={[
          "Add weekly topic names, summaries, lecture notes, readings, screenshots, videos, key concepts, and assessment links.",
        ]}
      />
    );
  }

  return (
    <div className="space-y-3">
      {unit.weeklyTopics.map((topic) => (
        <article
          className="rounded-md border border-border/70 bg-background/70 p-4"
          key={topic.id}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge variant="outline">Week {topic.week}</Badge>
              <h3 className="mt-3 text-sm font-semibold text-foreground">
                {topic.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {topic.summary}
              </p>
            </div>
            <Button asChild className="shrink-0" size="sm" variant="secondary">
              <Link href={getWeekHref(unit.id, topic.id)}>Open week</Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

function AssessmentsTab({ unit }: { unit: StudyUnit }) {
  if (!unit.assessments.length) {
    return (
      <PlaceholderPanel
        title="Assessments to add"
        items={["Add assessment briefs, due dates, rubrics, marks, feedback, and planning notes."]}
      />
    );
  }

  return (
    <div className="space-y-3">
      {unit.assessments.map((assessment) => (
        <div
          className="rounded-md border border-border/70 bg-background/70 p-4"
          key={assessment.id}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              {assessment.title}
            </h3>
            <Badge variant="signal">{assessment.grade}</Badge>
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {assessment.notes}
          </p>
        </div>
      ))}
    </div>
  );
}

function ResourceTab({ unit }: { unit: StudyUnit }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {unit.keyResources.map((resource) => (
        <div
          className="flex items-start gap-3 rounded-md border border-border/70 bg-background/70 p-3"
          key={resource}
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
            <Image className="size-4" />
          </span>
          <div>
            <div className="text-sm font-medium text-foreground">{resource}</div>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Placeholder for PDFs, screenshots, YouTube links, copied notes, or
              university resource links.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function GradesTab({ unit }: { unit: StudyUnit }) {
  if (!unit.assessments.length) {
    return (
      <PlaceholderPanel
        title="Grades to add"
        items={["Add grade records, rubric feedback, and result reflections as they become available."]}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border/70">
      {unit.assessments.map((assessment) => (
        <div
          className="grid gap-2 border-b border-border/70 bg-background/70 px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_120px]"
          key={assessment.id}
        >
          <span className="text-sm text-muted-foreground">{assessment.title}</span>
          <span className="text-sm font-semibold text-foreground">
            {assessment.grade}
          </span>
        </div>
      ))}
    </div>
  );
}

function UnitMetric({
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
          <div className="mt-1 text-lg font-semibold text-foreground">{value}</div>
        </div>
      </div>
    </div>
  );
}

function StudyBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-border/70 bg-background/70 p-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlaceholderPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-background/65 p-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
