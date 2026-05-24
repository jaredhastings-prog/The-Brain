"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  FileText,
  Image,
  Lightbulb,
  Link2,
  NotebookPen,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudyTabs } from "@/features/business-psychology/components/study-tabs";
import type {
  StudyUnit,
  WeeklyTopic,
} from "@/features/business-psychology/data/business-psychology-data";
import { getUnitHref } from "@/features/business-psychology/data/business-psychology-data";

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
              content: <ParagraphBlock text={week.summary} />,
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

function ParagraphBlock({ text }: { text: string }) {
  return <p className="text-sm leading-6 text-muted-foreground">{text}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
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
