"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  FileText,
  Image,
  Layers3,
  Link2,
  MessageSquareText,
  NotebookPen,
  Workflow,
} from "lucide-react";

import type { NlpTopic } from "@/features/nlp-study/data/nlp-repository-content";
import { cn } from "@/lib/utils";

type TopicTabId =
  | "overview"
  | "core-concepts"
  | "models-diagrams"
  | "patterns-techniques"
  | "examples"
  | "personal-notes"
  | "resources"
  | "linked-captures";

type TopicTab = {
  id: TopicTabId;
  icon: LucideIcon;
  label: string;
};

const topicTabs: TopicTab[] = [
  { id: "overview", icon: BookOpen, label: "Overview" },
  { id: "core-concepts", icon: Layers3, label: "Core Concepts" },
  { id: "models-diagrams", icon: Image, label: "Models / Diagrams" },
  { id: "patterns-techniques", icon: Workflow, label: "Patterns / Techniques" },
  { id: "examples", icon: MessageSquareText, label: "Examples" },
  { id: "personal-notes", icon: NotebookPen, label: "Personal Notes" },
  { id: "resources", icon: Link2, label: "Resources" },
  { id: "linked-captures", icon: FileText, label: "Linked Captures" },
];

export function NlpTopicTabs({ topic }: { topic: NlpTopic }) {
  const [activeTab, setActiveTab] = React.useState<TopicTabId>("overview");
  const activeTopicTab =
    topicTabs.find((topicTab) => topicTab.id === activeTab) ?? topicTabs[0];
  const ActiveIcon = activeTopicTab.icon;

  return (
    <div className="space-y-4">
      <div
        aria-label={`${topic.title} repository sections`}
        className="flex gap-1 overflow-x-auto rounded-md border border-border/70 bg-card/70 p-1"
        role="tablist"
      >
        {topicTabs.map((topicTab) => {
          const Icon = topicTab.icon;
          const isActive = activeTab === topicTab.id;

          return (
            <button
              aria-controls={`${topic.id}-${topicTab.id}-panel`}
              aria-selected={isActive}
              className={cn(
                "inline-flex min-h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive && "bg-background text-foreground shadow-sm",
              )}
              id={`${topic.id}-${topicTab.id}-tab`}
              key={topicTab.id}
              onClick={() => setActiveTab(topicTab.id)}
              role="tab"
              type="button"
            >
              <Icon className="size-3.5" />
              <span>{topicTab.label}</span>
            </button>
          );
        })}
      </div>

      <section
        aria-labelledby={`${topic.id}-${activeTopicTab.id}-tab`}
        className="rounded-md border border-border/70 bg-card/70 p-4"
        id={`${topic.id}-${activeTopicTab.id}-panel`}
        role="tabpanel"
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
          <ActiveIcon className="size-4" />
          {activeTopicTab.label}
        </div>
        <TabContent tabId={activeTopicTab.id} topic={topic} />
      </section>
    </div>
  );
}

function TabContent({
  tabId,
  topic,
}: {
  tabId: TopicTabId;
  topic: NlpTopic;
}) {
  switch (tabId) {
    case "overview":
      return (
        <p className="text-sm leading-6 text-muted-foreground">
          {topic.overview}
        </p>
      );
    case "core-concepts":
      return <BulletList items={topic.coreConcepts} />;
    case "models-diagrams":
      return (
        <RepositoryList
          description="Model maps, process diagrams, visual tables, and image references can be collected here."
          items={topic.models}
        />
      );
    case "patterns-techniques":
      return <BulletList items={topic.patterns} />;
    case "examples":
      return (
        <RepositoryList
          description="Concrete examples, context notes, and observed applications can be stored here."
          items={topic.examples}
        />
      );
    case "personal-notes":
      return (
        <PlaceholderContent description="Private notes, personal distinctions, coaching observations, and future source-backed expansions can be added here." />
      );
    case "resources":
      return (
        <PlaceholderContent description="Books, videos, links, citation notes, and supporting references can be organised here without exposing private source files in the app." />
      );
    case "linked-captures":
      return (
        <PlaceholderContent description="Future links from Global Capture Inbox entries, raw notes, and related personal brain records will appear here." />
      );
  }
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

function RepositoryList({
  description,
  items,
}: {
  description: string;
  items: string[];
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      <BulletList items={items} />
    </div>
  );
}

function PlaceholderContent({ description }: { description: string }) {
  return (
    <div className="rounded-md border border-dashed border-border bg-muted/25 px-3 py-3">
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
