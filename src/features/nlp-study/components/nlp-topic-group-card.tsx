import * as React from "react";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  FileText,
  LayoutPanelLeft,
  PenLine,
  Sparkles,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  NlpTopic,
  NlpTopicGroup,
  NlpTopicStatus,
} from "@/features/nlp-study/data/nlp-study-content";
import type { StatusByTopic } from "@/features/nlp-study/types";
import { cn } from "@/lib/utils";

export function NlpTopicGroupCard({
  group,
  isOpen,
  onStatusChange,
  onToggle,
  onTopicToggle,
  openTopicId,
  statusByTopic,
}: {
  group: NlpTopicGroup;
  isOpen: boolean;
  onStatusChange: (topicId: string, status: NlpTopicStatus) => void;
  onToggle: () => void;
  onTopicToggle: (topicId: string, groupId: string) => void;
  openTopicId: string;
  statusByTopic: StatusByTopic;
}) {
  const integratedCount = group.topics.filter(
    (topic) => statusByTopic[topic.id] === "Integrated",
  ).length;

  return (
    <div className="rounded-lg border border-border/80 bg-card/90 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-muted/35"
        onClick={onToggle}
        type="button"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{group.topics.length} topics</Badge>
            {group.pathwayDay ? (
              <Badge variant="secondary">Day {group.pathwayDay}</Badge>
            ) : null}
          </div>
          <h2 className="mt-3 text-base font-semibold text-foreground">
            {group.title}
          </h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
            {group.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {integratedCount}/{group.topics.length} integrated
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </button>

      {isOpen ? (
        <div className="space-y-3 border-t border-border/70 p-3">
          {group.topics.map((topic) => (
            <NlpTopicCard
              groupId={group.id}
              groupTitle={group.title}
              isOpen={openTopicId === topic.id}
              key={topic.id}
              onStatusChange={onStatusChange}
              onToggle={onTopicToggle}
              status={statusByTopic[topic.id]}
              topic={topic}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function NlpTopicCard({
  groupId,
  groupTitle,
  isOpen,
  onStatusChange,
  onToggle,
  status,
  topic,
}: {
  groupId: string;
  groupTitle: string;
  isOpen: boolean;
  onStatusChange: (topicId: string, status: NlpTopicStatus) => void;
  onToggle: (topicId: string, groupId: string) => void;
  status: NlpTopicStatus;
  topic: NlpTopic;
}) {
  return (
    <article className="rounded-md border border-border/70 bg-muted/25">
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40"
        onClick={() => onToggle(topic.id, groupId)}
        type="button"
      >
        <div className="flex min-w-0 items-center gap-3">
          <StatusIcon status={status} />
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {topic.title}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{groupTitle}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <StatusBadge status={status} />
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </div>
      </button>

      {isOpen ? (
        <div className="border-t border-border/70 px-4 py-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px]">
            <div className="space-y-4">
              <LearningBlock
                icon={<BookOpen className="size-4" />}
                title="Overview"
              >
                <p>{topic.overview}</p>
              </LearningBlock>
              <LearningBlock
                icon={<Target className="size-4" />}
                title="Key ideas"
              >
                <ul className="space-y-2">
                  {topic.keyIdeas.map((idea) => (
                    <li className="flex gap-2" key={idea}>
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </LearningBlock>
            </div>

            <div className="space-y-3">
              <PlaceholderPanel
                icon={<LayoutPanelLeft className="size-4" />}
                title="Visual / diagram"
              />
              <PlaceholderPanel
                icon={<PenLine className="size-4" />}
                title="Practice exercise"
              />
              <PlaceholderPanel
                icon={<FileText className="size-4" />}
                title="Personal notes"
              />
              <PlaceholderPanel
                icon={<BookOpen className="size-4" />}
                title="Resources"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-border/70 pt-4">
            <Button
              onClick={() => onStatusChange(topic.id, "In Progress")}
              size="sm"
              type="button"
              variant="secondary"
            >
              Mark in progress
            </Button>
            <Button
              onClick={() => onStatusChange(topic.id, "Integrated")}
              size="sm"
              type="button"
              variant="outline"
            >
              <CheckCircle2 className="size-3.5" />
              Mark integrated
            </Button>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function LearningBlock({
  children,
  icon,
  title,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <section>
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
        {icon}
        {title}
      </div>
      <div className="rounded-md border border-border/70 bg-card/70 px-3 py-3 text-sm leading-6 text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function PlaceholderPanel({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-md border border-dashed border-border bg-card/65 p-3">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="grid size-8 place-items-center rounded-md bg-accent text-accent-foreground">
          {icon}
        </span>
        {title}
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        Placeholder ready for practitioner manual notes, workbook reflections,
        diagrams, and resource links.
      </p>
    </div>
  );
}

function StatusIcon({ status }: { status: NlpTopicStatus }) {
  if (status === "Integrated") {
    return (
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-emerald-50 text-emerald-700">
        <CheckCircle2 className="size-4" />
      </span>
    );
  }

  if (status === "In Progress") {
    return (
      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-amber-50 text-amber-700">
        <Sparkles className="size-4" />
      </span>
    );
  }

  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-md bg-zinc-50 text-zinc-500">
      <Circle className="size-4" />
    </span>
  );
}

function StatusBadge({ status }: { status: NlpTopicStatus }) {
  if (status === "Integrated") {
    return <Badge variant="signal">Integrated</Badge>;
  }

  if (status === "In Progress") {
    return <Badge variant="attention">In Progress</Badge>;
  }

  return <Badge variant="outline">Not Started</Badge>;
}
