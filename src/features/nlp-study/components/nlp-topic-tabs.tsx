"use client";

import * as React from "react";
import NextImage from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  FileText,
  Image as ImageIcon,
  Layers3,
  Link2,
  MessageSquareText,
  NotebookPen,
  Workflow,
} from "lucide-react";

import communicationModelImage from "../../../../docs/nlp/NLP-Commsmodel-Image.png";
import type { NlpTopic } from "@/features/nlp-study/data/nlp-repository-content";
import {
  getNlpTopicReferenceContent,
  type NlpModelDiagramNode,
} from "@/features/nlp-study/data/nlp-reference-overrides";
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
  { id: "models-diagrams", icon: ImageIcon, label: "Models / Diagrams" },
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
  const referenceContent = getNlpTopicReferenceContent(topic);
  const showCommunicationModelImage =
    topic.title === "NLP Communication Model" && referenceContent.modelDiagram;

  switch (tabId) {
    case "overview":
      return <OverviewContent topic={topic} />;
    case "core-concepts":
      return <BulletList items={topic.coreConcepts} />;
    case "models-diagrams":
      return (
        <div className="space-y-4">
          <RepositoryList
            description="Model maps, process diagrams, visual tables, and image references can be collected here."
            items={referenceContent.models ?? topic.models}
          />
          {showCommunicationModelImage ? <CommunicationModelImage /> : null}
          {referenceContent.modelDiagram ? (
            <ModelDiagram nodes={referenceContent.modelDiagram} />
          ) : null}
        </div>
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
        <RepositoryList
          description="Private notes, personal distinctions, coaching observations, and future repository additions can be collected here."
          items={topic.personalNotes}
        />
      );
    case "resources":
      return (
        <RepositoryList
          description="Books, videos, citation notes, and supporting references can be organised here without exposing private source files in the app."
          items={topic.resources}
        />
      );
    case "linked-captures":
      return (
        <RepositoryList
          description="Future links from Global Capture Inbox entries, raw notes, and related personal brain records will appear here."
          items={topic.linkedCaptures}
        />
      );
  }
}

function OverviewContent({ topic }: { topic: NlpTopic }) {
  const referenceContent = getNlpTopicReferenceContent(topic);

  return (
    <div className="space-y-4">
      <p className="text-sm leading-6 text-muted-foreground">
        {referenceContent.overview ?? topic.overview}
      </p>
      {referenceContent.overviewItems?.length ? (
        <NumberedList items={referenceContent.overviewItems} />
      ) : null}
    </div>
  );
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

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2 text-sm leading-6 text-muted-foreground">
      {items.map((item, index) => (
        <li className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2" key={item}>
          <span className="flex size-7 items-center justify-center rounded-md border border-border bg-background text-xs font-semibold text-foreground">
            {index + 1}
          </span>
          <span className="pt-0.5">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function CommunicationModelImage() {
  return (
    <figure className="overflow-hidden rounded-md border border-border/70 bg-background/70 p-3 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]">
      <NextImage
        alt="NLP Communication Model diagram showing how reality is filtered into internal representation, state, physiology, and behaviour"
        className="h-auto w-full rounded-sm object-contain"
        placeholder="blur"
        priority={false}
        src={communicationModelImage}
        sizes="(min-width: 1280px) 820px, (min-width: 768px) 70vw, 100vw"
      />
    </figure>
  );
}

function ModelDiagram({ nodes }: { nodes: NlpModelDiagramNode[] }) {
  return (
    <div className="rounded-md border border-border/70 bg-background/70 p-3">
      <div className="mb-3 text-xs font-medium uppercase tracking-normal text-muted-foreground">
        Recreated Communication Model Diagram
      </div>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {nodes.map((node, index) => (
          <div
            className="rounded-md border border-border bg-card/80 p-3 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]"
            key={node.label}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
                {index + 1}
              </span>
              <h4 className="text-sm font-semibold text-foreground">
                {node.label}
              </h4>
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              {node.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RepositoryList({
  description,
  items,
}: {
  description?: string;
  items: string[];
}) {
  return (
    <div className="space-y-3">
      {description ? (
        <p className="text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      ) : null}
      <BulletList items={items} />
    </div>
  );
}
