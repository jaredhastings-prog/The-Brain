import * as React from "react";
import {
  BookOpen,
  ChevronDown,
  FileText,
  FolderOpen,
  Image,
  Layers3,
  Link2,
  MessageSquareText,
  NotebookPen,
  Workflow,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type {
  NlpTopic,
  NlpTopicGroup,
} from "@/features/nlp-study/data/nlp-repository-content";
import { cn } from "@/lib/utils";

export function NlpTopicGroupCard({
  group,
  isOpen,
  onToggle,
  onTopicToggle,
  openTopicId,
}: {
  group: NlpTopicGroup;
  isOpen: boolean;
  onToggle: () => void;
  onTopicToggle: (topicId: string, groupId: string) => void;
  openTopicId: string;
}) {
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
            <Badge variant="outline">{group.topics.length} entries</Badge>
            <Badge variant="secondary">Reference area</Badge>
          </div>
          <h2 className="mt-3 text-base font-semibold text-foreground">
            {group.title}
          </h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
            {group.description}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 size-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen ? (
        <div className="space-y-3 border-t border-border/70 p-3">
          {group.topics.map((topic) => (
            <NlpTopicCard
              groupId={group.id}
              groupTitle={group.title}
              isOpen={openTopicId === topic.id}
              key={topic.id}
              onToggle={onTopicToggle}
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
  onToggle,
  topic,
}: {
  groupId: string;
  groupTitle: string;
  isOpen: boolean;
  onToggle: (topicId: string, groupId: string) => void;
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
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
            <FolderOpen className="size-4" />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-foreground">
              {topic.title}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{groupTitle}</p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen ? (
        <div className="border-t border-border/70 px-4 py-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="space-y-4">
              <RepositoryBlock
                icon={<BookOpen className="size-4" />}
                title="Overview"
              >
                <p>{topic.overview}</p>
              </RepositoryBlock>
              <RepositoryBlock
                icon={<Layers3 className="size-4" />}
                title="Core Concepts"
              >
                <BulletList items={topic.coreConcepts} />
              </RepositoryBlock>
              <RepositoryBlock
                icon={<Workflow className="size-4" />}
                title="Patterns / Techniques"
              >
                <BulletList items={topic.patterns} />
              </RepositoryBlock>
            </div>

            <div className="space-y-3">
              <RepositoryListPanel
                description="Model maps, process diagrams, visual tables, and image references."
                icon={<Image className="size-4" />}
                items={topic.models}
                title="Models / Diagrams"
              />
              <RepositoryListPanel
                description="Concrete examples, context notes, and observed applications."
                icon={<MessageSquareText className="size-4" />}
                items={topic.examples}
                title="Examples"
              />
              <RepositoryPlaceholder
                description="Private notes, personal distinctions, and future source-backed expansions."
                icon={<NotebookPen className="size-4" />}
                title="Personal Notes"
              />
              <RepositoryPlaceholder
                description="Books, PDFs, videos, links, and supporting references."
                icon={<Link2 className="size-4" />}
                title="Related Resources"
              />
              <RepositoryPlaceholder
                description="Future links from Global Capture Inbox entries and raw notes."
                icon={<FileText className="size-4" />}
                title="Linked Captures"
              />
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

function RepositoryBlock({
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li className="flex gap-2" key={item}>
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function RepositoryPlaceholder({
  description,
  icon,
  title,
}: {
  description: string;
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
        {description}
      </p>
    </div>
  );
}

function RepositoryListPanel({
  description,
  icon,
  items,
  title,
}: {
  description: string;
  icon: React.ReactNode;
  items: string[];
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
        {description}
      </p>
      <ul className="mt-3 space-y-2 text-xs leading-5 text-muted-foreground">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
