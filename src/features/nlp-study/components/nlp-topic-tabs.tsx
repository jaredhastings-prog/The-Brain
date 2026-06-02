"use client";

import * as React from "react";
import NextImage from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Image as ImageIcon,
  Layers3,
  Link2,
  MessageSquareText,
  Workflow,
} from "lucide-react";

import communicationModelImage from "../../../../docs/nlp/NLP-Commsmodel-Image.png";
import eyeAccessingCuesImage from "../../../../docs/docs/nlp/eye-acessing-cues.png";
import type { NlpTopic } from "@/features/nlp-study/data/nlp-repository-content";
import {
  getNlpTopicReferenceContent,
  type NlpContentImage,
  type NlpContentSection,
  type NlpContentStep,
  type NlpContentTable,
  type NlpModelDiagramNode,
  type NlpModelImage,
  type NlpOverviewCallout,
  type NlpTopicReferenceTabId,
} from "@/features/nlp-study/data/nlp-reference-overrides";
import { cn } from "@/lib/utils";

type TopicTabId = NlpTopicReferenceTabId;

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
  { id: "resources", icon: Link2, label: "Resources" },
];

const modelImageByKey = {
  "eye-accessing-cues": eyeAccessingCuesImage,
} satisfies Record<NlpModelImage["imageKey"], typeof eyeAccessingCuesImage>;

export function NlpTopicTabs({ topic }: { topic: NlpTopic }) {
  const [activeTab, setActiveTab] = React.useState<TopicTabId>("overview");
  const referenceContent = getNlpTopicReferenceContent(topic);
  const visibleTopicTabs = referenceContent.tabs?.length
    ? referenceContent.tabs
        .map((tabId) => topicTabs.find((topicTab) => topicTab.id === tabId))
        .filter((topicTab): topicTab is TopicTab => Boolean(topicTab))
    : topicTabs;
  const activeTopicTab =
    visibleTopicTabs.find((topicTab) => topicTab.id === activeTab) ??
    visibleTopicTabs[0] ??
    topicTabs[0]!;
  const ActiveIcon = activeTopicTab.icon;

  return (
    <div className="min-w-0 max-w-full space-y-4 overflow-hidden">
      <div
        aria-label={`${topic.title} repository sections`}
        className="grid w-full min-w-0 max-w-full grid-cols-1 gap-2 overflow-hidden rounded-md border border-border/70 bg-card/70 p-2 sm:grid-cols-2 lg:flex lg:touch-pan-x lg:gap-1 lg:overflow-x-auto lg:overscroll-x-contain lg:p-1 lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
        role="tablist"
      >
        {visibleTopicTabs.map((topicTab) => {
          const Icon = topicTab.icon;
          const isActive = activeTab === topicTab.id;

          return (
            <button
              aria-controls={`${topic.id}-${topicTab.id}-panel`}
              aria-selected={isActive}
              className={cn(
                "inline-flex min-h-11 w-full min-w-0 items-center justify-start gap-2 rounded-md border border-transparent px-3 py-2 text-left text-xs font-medium leading-tight text-muted-foreground transition-colors hover:bg-muted/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:min-h-9 lg:w-auto lg:max-w-none lg:shrink-0 lg:justify-center lg:whitespace-nowrap lg:border-0",
                isActive &&
                  "border-slate-300 bg-background text-foreground shadow-sm",
              )}
              id={`${topic.id}-${topicTab.id}-tab`}
              key={topicTab.id}
              onClick={() => setActiveTab(topicTab.id)}
              role="tab"
              type="button"
            >
              <Icon className="size-3.5 shrink-0" />
              <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                {topicTab.label}
              </span>
            </button>
          );
        })}
      </div>

      <section
        aria-labelledby={`${topic.id}-${activeTopicTab.id}-tab`}
        className="min-w-0 max-w-full overflow-hidden rounded-md border border-border/70 bg-card/70 p-3 sm:p-4"
        id={`${topic.id}-${activeTopicTab.id}-panel`}
        role="tabpanel"
      >
        <div className="mb-3 flex min-w-0 items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
          <ActiveIcon className="size-4" />
          <span className="min-w-0 break-words [overflow-wrap:anywhere]">
            {activeTopicTab.label}
          </span>
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
  const modelItems = referenceContent.models ?? topic.models;
  const patternItems = referenceContent.patterns ?? topic.patterns;

  switch (tabId) {
    case "overview":
      return <OverviewContent topic={topic} />;
    case "core-concepts":
      return (
        <CoreConceptContent
          intro={referenceContent.coreConceptIntro}
          items={referenceContent.coreConcepts ?? topic.coreConcepts}
          sections={referenceContent.coreConceptSections}
          steps={referenceContent.coreConceptSteps}
        />
      );
    case "models-diagrams":
      return (
        <div className="space-y-4">
          {modelItems.length ? (
            <RepositoryList
              description="Model maps, process diagrams, visual tables, and image references can be collected here."
              items={modelItems}
            />
          ) : null}
          {referenceContent.modelSections ? (
            <ContentSections sections={referenceContent.modelSections} />
          ) : null}
          {referenceContent.modelTables?.length ? (
            <ContentTables tables={referenceContent.modelTables} />
          ) : null}
          {referenceContent.modelImage ? (
            <ModelImageFigure modelImage={referenceContent.modelImage} />
          ) : null}
          {showCommunicationModelImage ? <CommunicationModelImage /> : null}
          {referenceContent.modelDiagram ? (
            <ModelDiagram nodes={referenceContent.modelDiagram} />
          ) : null}
        </div>
      );
    case "patterns-techniques":
      return (
        <div className="space-y-4">
          {patternItems.length ? <BulletList items={patternItems} /> : null}
          {referenceContent.patternSections ? (
            <ContentSections sections={referenceContent.patternSections} />
          ) : null}
        </div>
      );
    case "examples":
      return (
        <RepositoryList
          description="Concrete examples, context notes, and observed applications can be stored here."
          items={topic.examples}
        />
      );
    case "resources":
      return (
        <RepositoryList
          description="Books, videos, citation notes, and supporting references can be organised here without exposing private source files in the app."
          items={topic.resources}
        />
      );
  }
}

function OverviewContent({ topic }: { topic: NlpTopic }) {
  const referenceContent = getNlpTopicReferenceContent(topic);

  return (
    <div className="space-y-4">
      {referenceContent.overviewCallout ? (
        <OverviewCallout callout={referenceContent.overviewCallout} />
      ) : null}
      <p className="text-sm leading-6 text-muted-foreground">
        {referenceContent.overview ?? topic.overview}
      </p>
      {referenceContent.overviewItems?.length ? (
        <NumberedList items={referenceContent.overviewItems} />
      ) : null}
      {referenceContent.overviewImages?.length ? (
        <div className="grid min-w-0 max-w-full gap-3">
          {referenceContent.overviewImages.map((image) => (
            <ContentImageFigure image={image} key={image.src} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function OverviewCallout({ callout }: { callout: NlpOverviewCallout }) {
  return (
    <figure className="min-w-0 max-w-full rounded-md border border-border/70 bg-background/80 p-3 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)] sm:p-4">
      <blockquote className="min-w-0 break-words text-sm font-medium leading-6 text-foreground [overflow-wrap:anywhere]">
        &ldquo;{callout.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-2 text-xs font-medium tracking-normal text-muted-foreground">
        - {callout.source}
      </figcaption>
    </figure>
  );
}

function CoreConceptContent({
  intro,
  items,
  sections,
  steps,
}: {
  intro?: string[];
  items: string[];
  sections?: NlpContentSection[];
  steps?: NlpContentStep[];
}) {
  if (!intro?.length && !sections?.length && !steps?.length) {
    return <BulletList items={items} />;
  }

  return (
    <div className="min-w-0 max-w-full space-y-4">
      {intro?.length ? (
        <div className="space-y-2 text-sm leading-6 text-muted-foreground">
          {intro.map((paragraph) => (
            <p
              className="min-w-0 break-words [overflow-wrap:anywhere]"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}
      {items.length ? <BulletList items={items} /> : null}
      {steps?.length ? <StepList steps={steps} /> : null}
      {sections?.length ? <ContentSections sections={sections} /> : null}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="min-w-0 max-w-full space-y-2 text-sm leading-6 text-muted-foreground">
      {items.map((item) => (
        <li className="flex min-w-0 max-w-full gap-2" key={item}>
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span className="min-w-0 break-words [overflow-wrap:anywhere]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ContentSections({ sections }: { sections: NlpContentSection[] }) {
  return (
    <div className="grid min-w-0 max-w-full gap-3">
      {sections.map((section) => (
        <section
          className="min-w-0 overflow-hidden rounded-md border border-border/70 bg-background/70 p-3 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)] sm:p-4"
          key={section.heading}
        >
          <h4 className="mb-3 min-w-0 break-words text-sm font-semibold leading-5 text-foreground [overflow-wrap:anywhere]">
            {section.heading}
          </h4>
          {section.body?.length ? (
            <div className="space-y-2 text-sm leading-6 text-muted-foreground">
              {section.body.map((paragraph) => (
                <p
                  className="min-w-0 break-words [overflow-wrap:anywhere]"
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
          {section.bullets?.length ? (
            <div className="mt-3">
              <BulletList items={section.bullets} />
            </div>
          ) : null}
          {section.steps?.length ? (
            <StepList start={section.start} steps={section.steps} />
          ) : null}
        </section>
      ))}
    </div>
  );
}

function StepList({
  start = 1,
  steps,
}: {
  start?: number;
  steps: NlpContentStep[];
}) {
  return (
    <ol className="min-w-0 max-w-full space-y-3 text-sm leading-6 text-muted-foreground">
      {steps.map((step, index) => (
        <li
          className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-2"
          key={`${index}-${step.text}`}
        >
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-card text-xs font-semibold text-foreground">
            {index + start}
          </span>
          <div className="min-w-0 space-y-2">
            <p className="min-w-0 break-words text-foreground [overflow-wrap:anywhere]">
              {step.text}
            </p>
            <StepPrompts step={step} />
          </div>
        </li>
      ))}
    </ol>
  );
}

function StepPrompts({ step }: { step: NlpContentStep }) {
  if (!step.prompts?.length && !step.promptBullets?.length) {
    return null;
  }

  return (
    <div className="min-w-0 space-y-2 rounded-md border border-border/60 bg-muted/35 p-3 text-xs leading-5 text-muted-foreground">
      {step.prompts?.map((prompt) => (
        <p className="min-w-0 break-words [overflow-wrap:anywhere]" key={prompt}>
          <em>{prompt}</em>
        </p>
      ))}
      {step.promptBullets?.length ? (
        <ul className="min-w-0 space-y-1">
          {step.promptBullets.map((prompt) => (
            <li className="flex min-w-0 gap-2" key={prompt}>
              <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/70" />
              <span className="min-w-0 break-words [overflow-wrap:anywhere]">
                <em>{prompt}</em>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="min-w-0 max-w-full space-y-2 text-sm leading-6 text-muted-foreground">
      {items.map((item, index) => (
        <li
          className="grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] gap-2"
          key={item}
        >
          <span className="flex size-7 items-center justify-center rounded-md border border-border bg-background text-xs font-semibold text-foreground">
            {index + 1}
          </span>
          <span className="min-w-0 break-words pt-0.5 [overflow-wrap:anywhere]">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

function ContentTables({ tables }: { tables: NlpContentTable[] }) {
  return (
    <div className="grid min-w-0 max-w-full gap-3">
      {tables.map((table) => (
        <section
          className="min-w-0 overflow-hidden rounded-md border border-border/70 bg-background/70 p-3 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)] sm:p-4"
          key={table.title}
        >
          <h4 className="mb-3 min-w-0 break-words text-sm font-semibold leading-5 text-foreground [overflow-wrap:anywhere]">
            {table.title}
          </h4>
          <div className="min-w-0 max-w-full overflow-x-auto rounded-md border border-border/70">
            <table className="w-full min-w-[560px] table-fixed border-collapse text-left text-xs leading-5 sm:text-sm">
              <thead className="bg-muted/55 text-foreground">
                <tr>
                  {table.columns.map((column) => (
                    <th
                      className="border-r border-border/70 px-3 py-2 font-semibold last:border-r-0"
                      key={column}
                      scope="col"
                    >
                      <span className="block min-w-0 break-words [overflow-wrap:anywhere]">
                        {column}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {table.rows.map((row, rowIndex) => (
                  <tr
                    className="border-t border-border/70"
                    key={`${table.title}-${rowIndex}`}
                  >
                    {table.columns.map((column, columnIndex) => (
                      <td
                        className="border-r border-border/70 px-3 py-2 align-top last:border-r-0"
                        key={`${column}-${rowIndex}`}
                      >
                        <span className="block min-w-0 break-words [overflow-wrap:anywhere]">
                          {row[columnIndex] ?? ""}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

function CommunicationModelImage() {
  return (
    <figure className="min-w-0 max-w-full overflow-hidden rounded-md border border-border/70 bg-background/70 p-2 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)] sm:p-3">
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

function ContentImageFigure({ image }: { image: NlpContentImage }) {
  return (
    <figure className="min-w-0 max-w-full overflow-hidden rounded-md border border-border/70 bg-background/70 p-2 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)] sm:p-3">
      <NextImage
        alt={image.alt}
        className="h-auto max-h-[72vh] w-full rounded-sm object-contain"
        height={image.height}
        priority={false}
        src={image.src}
        width={image.width}
        sizes="(min-width: 1280px) 820px, (min-width: 768px) 70vw, 100vw"
      />
      {image.caption ? (
        <figcaption className="mt-2 min-w-0 break-words text-xs leading-5 text-muted-foreground [overflow-wrap:anywhere]">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function ModelImageFigure({ modelImage }: { modelImage: NlpModelImage }) {
  return (
    <figure className="min-w-0 max-w-full overflow-hidden rounded-md border border-border/70 bg-background/70 p-2 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)] sm:p-3">
      <NextImage
        alt={modelImage.alt}
        className="h-auto max-h-[72vh] w-full rounded-sm object-contain"
        placeholder="blur"
        priority={false}
        src={modelImageByKey[modelImage.imageKey]}
        sizes="(min-width: 1280px) 820px, (min-width: 768px) 70vw, 100vw"
      />
    </figure>
  );
}

function ModelDiagram({ nodes }: { nodes: NlpModelDiagramNode[] }) {
  return (
    <div className="min-w-0 max-w-full overflow-hidden rounded-md border border-border/70 bg-background/70 p-3">
      <div className="mb-3 text-xs font-medium uppercase tracking-normal text-muted-foreground">
        Recreated Communication Model Diagram
      </div>
      <div className="grid min-w-0 max-w-full gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {nodes.map((node, index) => (
          <div
            className="min-w-0 rounded-md border border-border bg-card/80 p-3 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]"
            key={node.label}
          >
            <div className="mb-2 flex min-w-0 items-start gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
                {index + 1}
              </span>
              <h4 className="min-w-0 break-words text-sm font-semibold leading-5 text-foreground [overflow-wrap:anywhere]">
                {node.label}
              </h4>
            </div>
            <p className="min-w-0 break-words text-xs leading-5 text-muted-foreground [overflow-wrap:anywhere]">
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
    <div className="min-w-0 max-w-full space-y-3 overflow-hidden">
      {description ? (
        <p className="break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
          {description}
        </p>
      ) : null}
      <BulletList items={items} />
    </div>
  );
}
