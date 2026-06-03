"use client";

import Link from "next/link";
import * as React from "react";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ClipboardList,
  FileText,
  Image,
  Layers3,
  Lightbulb,
  Link2,
  NotebookPen,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HealthyWorkSubModuleContentEditor } from "@/features/business-psychology/components/healthy-work-submodule-content-editor";
import { StudyTabs } from "@/features/business-psychology/components/study-tabs";
import type {
  StudyUnit,
  WeeklySubModule,
  WeeklySummarySection,
  WeeklyTopic,
} from "@/features/business-psychology/data/business-psychology-data";
import { getUnitHref } from "@/features/business-psychology/data/business-psychology-data";
import { cn } from "@/lib/utils";

export function BusinessPsychologyWeekPage({
  unit,
  week,
}: {
  unit: StudyUnit;
  week: WeeklyTopic;
}) {
  return (
    <div className="space-y-6 pb-20">
      <Button asChild size="sm" variant="ghost">
        <Link href={getUnitHref(unit.id)}>
          <ArrowLeft className="size-4" />
          {unit.name}
        </Link>
      </Button>

      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="signal">Week {week.week}</Badge>
          <Badge variant="outline">{unit.code}</Badge>
        </div>
        <div className="mt-8 max-w-4xl">
          <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
            {week.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {week.summary}
          </p>
        </div>
      </section>

      <DashboardCard
        eyebrow="Sub-modules"
        title="Weekly Study Structure"
        description="Open a sub-module to organise notes, concepts, screenshots, videos, readings, reflections, and linked captures."
      >
        <SubModuleAccordion
          subModules={week.subModules ?? []}
          unit={unit}
          week={week}
        />
      </DashboardCard>

      <DashboardCard
        description="Weekly workspace for summary, module notes, readings, screenshots, videos, key concepts, assessment links, personal notes, Feynman explanation, and linked captures."
        eyebrow="Weekly topic page"
        title={`Week ${week.week}: ${week.title}`}
      >
        <StudyTabs
          ariaLabel={`${week.title} weekly sections`}
          tabs={[
            {
              id: "summary",
              label: "Summary",
              icon: BookOpen,
              content: <WeekSummaryContent week={week} />,
            },
            {
              id: "module-notes",
              label: "Module Notes",
              icon: NotebookPen,
              content: (
                <PlaceholderList
                  items={[
                    "Add copied university module notes, lecture summaries, and personal synthesis here.",
                    "Keep this area concise first, then expand with details when the source notes are migrated.",
                  ]}
                />
              ),
            },
            {
              id: "readings",
              label: "Readings",
              icon: Link2,
              content: (
                <PlaceholderList
                  items={[
                    "Add required readings, article links, citation notes, and key page references.",
                    "Future: separate required, recommended, and assessment-critical readings.",
                  ]}
                />
              ),
            },
            {
              id: "images-screenshots",
              label: "Images / Screenshots",
              icon: Image,
              content: (
                <PlaceholderList
                  items={[
                    "Add lecture screenshots, model images, diagrams, slides, and visual examples.",
                    "Keep visual references organised by lecture, model, assessment, or personal summary.",
                  ]}
                />
              ),
            },
            {
              id: "videos",
              label: "Videos",
              icon: PlayCircle,
              content: (
                <PlaceholderList
                  items={[
                    "Add YouTube links, university media links, timestamps, and video summaries.",
                  ]}
                />
              ),
            },
            {
              id: "key-concepts",
              label: "Key Concepts",
              icon: Lightbulb,
              content: <BulletList items={week.keyConcepts} />,
            },
            {
              id: "assessment-links",
              label: "Assessment Links",
              icon: ClipboardList,
              content: <BulletList items={week.assessmentLinks} />,
            },
            {
              id: "my-notes",
              label: "My Notes",
              icon: FileText,
              content: (
                <PlaceholderList
                  items={[
                    "Add Jared's personal notes, reflections, assignment ideas, and applied workplace examples.",
                  ]}
                />
              ),
            },
            {
              id: "feynman-technique",
              label: "Feynman Technique",
              icon: Sparkles,
              content: (
                <PlaceholderList
                  items={[
                    "Explain the topic in plain language as if teaching it to someone outside the degree.",
                    "Add gaps, unclear terms, simple metaphors, and one practical business psychology example.",
                  ]}
                />
              ),
            },
            {
              id: "linked-captures",
              label: "Linked Captures",
              icon: FileText,
              content: (
                <PlaceholderList
                  items={[
                    "Future: show Global Capture Inbox notes linked to this week.",
                    "Useful captures may include lecture thoughts, reading insights, assignment ideas, and voice dumps.",
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

function WeekSummaryContent({ week }: { week: WeeklyTopic }) {
  if (!week.summarySections?.length) {
    return <p className="text-sm leading-6 text-muted-foreground">{week.summary}</p>;
  }

  return (
    <div className="space-y-3">
      {week.summarySections.map((section) => (
        <SummarySectionCard key={section.id} section={section} />
      ))}
    </div>
  );
}

function SummarySectionCard({ section }: { section: WeeklySummarySection }) {
  return (
    <section className="rounded-md border border-border/70 bg-background/70 p-4">
      <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
      {section.body ? (
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {section.body}
        </p>
      ) : null}
      {section.bullets?.length ? (
        <BulletList className="mt-3" items={section.bullets} />
      ) : null}
      {section.table ? <SummaryTable table={section.table} /> : null}
    </section>
  );
}

function SummaryTable({
  table,
}: {
  table: NonNullable<WeeklySummarySection["table"]>;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-md border border-border/70">
      <div className="grid grid-cols-[130px_minmax(0,1fr)] bg-muted/45 text-xs font-medium uppercase tracking-normal text-muted-foreground">
        {table.headers.map((header) => (
          <div className="border-r border-border/70 px-3 py-2 last:border-r-0" key={header}>
            {header}
          </div>
        ))}
      </div>
      {table.rows.map((row) => (
        <div
          className="grid grid-cols-[130px_minmax(0,1fr)] border-t border-border/70 bg-background/70 text-sm"
          key={row.join("-")}
        >
          {row.map((cell, index) => (
            <div
              className={cn(
                "border-r border-border/70 px-3 py-2 text-muted-foreground last:border-r-0",
                index === 0 && "font-medium text-foreground",
              )}
              key={cell}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function SubModuleAccordion({
  subModules,
  unit,
  week,
}: {
  subModules: WeeklySubModule[];
  unit: StudyUnit;
  week: WeeklyTopic;
}) {
  const [openSubModuleId, setOpenSubModuleId] = React.useState("");
  const isHealthyWorkPilot = unit.id === "healthy-work-wellbeing";

  if (!subModules.length) {
    return (
      <div className="rounded-md border border-dashed border-border bg-background/65 p-4 text-sm leading-6 text-muted-foreground">
        Add sub-modules for this week as the university notes are migrated.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {subModules.map((subModule) => {
        const isOpen = openSubModuleId === subModule.id;

        return (
          <article
            className="rounded-md border border-border/70 bg-background/70"
            key={subModule.id}
          >
            <button
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/35"
              onClick={() =>
                setOpenSubModuleId((current) =>
                  current === subModule.id ? "" : subModule.id,
                )
              }
              type="button"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                  <Layers3 className="size-4" />
                </span>
                <h3
                  className={cn(
                    "min-w-0 text-sm font-semibold text-foreground",
                    isHealthyWorkPilot
                      ? "whitespace-normal break-words leading-5"
                      : "truncate",
                  )}
                >
                  {subModule.title}
                </h3>
              </div>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            {isOpen ? (
              <div className="border-t border-border/70 p-4">
                {isHealthyWorkPilot ? (
                  <HealthyWorkSubModuleContentEditor
                    subModuleSlug={subModule.id}
                    unitSlug={unit.id}
                    weekSlug={week.id}
                  />
                ) : (
                  <SubModulePlaceholderGrid subModule={subModule} />
                )}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

function SubModulePlaceholderGrid({
  subModule,
}: {
  subModule: WeeklySubModule;
}) {
  const sections = [
    { title: "Notes", items: subModule.notes },
    { title: "Key Concepts", items: subModule.keyConcepts },
    { title: "Screenshots / Images", items: subModule.screenshots },
    { title: "Videos", items: subModule.videos },
    { title: "Readings", items: subModule.readings },
    { title: "Reflections", items: subModule.reflections },
    { title: "Linked Captures", items: subModule.linkedCaptures },
  ];

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {sections.map((section) => (
        <div
          className="rounded-md border border-border/70 bg-muted/25 p-3"
          key={section.title}
        >
          <h4 className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
            {section.title}
          </h4>
          <BulletList className="mt-2" items={section.items} />
        </div>
      ))}
    </div>
  );
}

function BulletList({
  className,
  items,
}: {
  className?: string;
  items: string[];
}) {
  return (
    <ul className={cn("space-y-2 text-sm leading-6 text-muted-foreground", className)}>
      {items.map((item) => (
        <li className="flex gap-2" key={item}>
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PlaceholderList({ items }: { items: string[] }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-background/65 p-4">
      <BulletList items={items} />
    </div>
  );
}
