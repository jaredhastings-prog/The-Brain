"use client";

import Link from "next/link";
import * as React from "react";
import {
  ArrowLeft,
  ChevronDown,
  ExternalLink,
  Layers3,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type {
  StudyUnit,
  WeeklyLearningBlock,
  WeeklyLearningBlockKind,
  WeeklySubModule,
  WeeklySummarySection,
  WeeklyTopic,
} from "@/features/business-psychology/data/business-psychology-data";
import { getUnitHref } from "@/features/business-psychology/data/business-psychology-data";
import { cn } from "@/lib/utils";

type LearningLink = NonNullable<WeeklyLearningBlock["links"]>[number];
type LearningStep = NonNullable<WeeklyLearningBlock["steps"]>[number];
type LearningTable = NonNullable<WeeklySummarySection["table"]>;
type LearningImage = {
  alt: string;
  caption?: string;
  src: string;
};
type RenderableLearningStep = LearningStep & {
  detailTitle?: string;
  paragraphs?: string[];
};
type RenderableLearningBlock = Omit<WeeklyLearningBlock, "steps"> & {
  activityVariant?: "timeline";
  images?: LearningImage[];
  steps?: RenderableLearningStep[];
  table?: LearningTable;
};
type RenderableSubModule = Omit<WeeklySubModule, "learningBlocks"> & {
  learningBlocks?: RenderableLearningBlock[];
};

const healthyWorkWeekOneReadingLinks: Record<
  | "dollard"
  | "fisher"
  | "henderson"
  | "minecorpDiscussionOne"
  | "minecorpDiscussionTwo"
  | "minecorpFifo"
  | "straume",
  LearningLink
> = {
  dollard: {
    href: "https://onedrive.live.com/?sortField=LinkFilename&isAscending=true&viewid=21523cd0%2D1147%2D4e12%2Db379%2D79b70de4a413&id=%2Fpersonal%2F7ee6e2db905242ea%2FDocuments%2FECU%2FNational%20surveillance%20of%20psychosocial%20risk%20factors%20in%20the%20workplace%20%20An%20international%20overview%2Epdf&parent=%2Fpersonal%2F7ee6e2db905242ea%2FDocuments%2FECU",
    label: "Dollard (2007)",
  },
  fisher: {
    href: "https://onedrive.live.com/personal/7ee6e2db905242ea/_layouts/15/doc.aspx?sourcedoc={aee54e4e-6e8e-4a19-a148-159d5856e5c7}&action=edit",
    label:
      "Part 1., Chapter 2: Conceptualizing and measuring wellbeing at work. Fisher et al. (2014).",
  },
  henderson: {
    href: "https://onedrive.live.com/?sortField=LinkFilename&isAscending=true&viewid=21523cd0%2D1147%2D4e12%2Db379%2D79b70de4a413&id=%2Fpersonal%2F7ee6e2db905242ea%2FDocuments%2FECU%2FIntegrating%20the%20hedonic%20and%20eudaimonic%20perspectives%20to%20more%20comprehensively%20understand%20wellbeing%20and%20pathways%20to%20wellbeing%2Epdf&parent=%2Fpersonal%2F7ee6e2db905242ea%2FDocuments%2FECU",
    label: "Henderson and Knight (2012)",
  },
  minecorpDiscussionOne: {
    href: "https://www.youtube.com/watch?v=rOoJj054pCg",
    label: "Minecorp discussion video 1",
  },
  minecorpDiscussionTwo: {
    href: "https://www.youtube.com/watch?v=B4SVlGO7itA",
    label: "Minecorp discussion video 2",
  },
  minecorpFifo: {
    href: "https://www.youtube.com/watch?v=doFHEqwRLyY",
    label: "Minecorp / FIFO wellbeing video",
  },
  straume: {
    href: "https://onedrive.live.com/?sortField=LinkFilename&isAscending=true&viewid=21523cd0%2D1147%2D4e12%2Db379%2D79b70de4a413&id=%2Fpersonal%2F7ee6e2db905242ea%2FDocuments%2FECU%2FHappiness%20%20inspiration%20and%20the%20fully%20functioning%20person%20%20Separating%20hedonic%20and%20%2Epdf&parent=%2Fpersonal%2F7ee6e2db905242ea%2FDocuments%2FECU",
    label: "Straume and Vitterso (2012)",
  },
};

const healthyWorkWeekOneImages = {
  wellbeingDimensionsModel: {
    alt: "Wellbeing dimensions model",
    caption: "Wellbeing dimensions model",
    src: "/images/business-psychology/wellbeing-dimensions-model.png",
  },
  wellbeingWorkDimensionsTable: {
    alt: "Wellbeing at work dimensions table",
    caption: "Wellbeing at work dimensions table",
    src: "/images/business-psychology/wellbeing-work-dimensions-table.png",
  },
} satisfies Record<string, LearningImage>;

const healthyWorkWeekOneMinecorpCaseStudy = [
  "Minecorp is a mining company with the majority of its workers working on mine sites in a fly-in-fly-out (FIFO) capacity.",
  "Minecorp is part of an industry which has set itself the ambitious goal of becoming free of fatalities. Its number-one value and commitment is the safety and health of its workforce, where everyone who goes to work in the industry returns home safe and healthy.",
  "The Australian mining workforce, and the workforce of Minecorp specifically, is characterised as a high income, predominantly male workforce. Weekly salaries at Minecorp are nearly double the national average with even higher salaries for those working under fly-in fly-out (FIFO) or drive-in drive-out (DIDO) arrangements.",
  "The median age of the mining workforce is 40 years old and approximately 10 per cent are under 25 years old (ABS, 2013). In addition to physical hazards and risks, there is also a degree of correlation between the industries demographics and those of at-risk groups in the Australian community, thereby warranting closer attention to the risk of mental illness.",
];

const healthyWorkWeekOneMinecorpNotes = [
  "In the case of Minecorp, and Mining organisations in general, I see the overarching risk to employee wellbeing as the cultural acceptance to often cut corners in the interest of meeting targets and deadlines. Each time a procedure is not followed or a band-aid solution is applied, culminates into an accepted way-of-working.",
  "As seen in the video, an inexperienced worker was put in a position to ultimately fail. Directly because of decisions made by supervisors feeling they were torn between production targets and worker shortages.",
  "The impact on the inexperienced worker in this case will be mental and physical, clearly displaying signs of stress before the incident happened.",
  "Along with wanting to impress as a new employee, those with an external validation bias are going to do what it takes to earn approval of others regardless of their internal congruence. Leading to mistakes and further risks.",
  "A strategy for Minecorp that pertains to the risk I have highlighted is to de-stigmatise pushing back on requests that don't feel right. I see hierarchical expectations that when someone more experienced makes a request that it must be met — regardless of whether procedure is being followed.",
  "This could be achieved by embedding a shared understanding that it is OK to speak up if it doesn't feel right. With the ultimate goal of building a psychologically safe culture where workers at all levels can question unsafe practices without fear of negative repercussions such as judgement, discrimination, or social isolation.",
];

const healthyWorkWeekOneInsertedBlocks: Record<string, RenderableLearningBlock> = {
  "1.6 Discussion: Your take on Minecorp": {
    id: "my-notes",
    kind: "note",
    title: "My Notes",
    items: healthyWorkWeekOneMinecorpNotes,
  },
};

const healthyWorkWeekOneSummaries: Record<string, RenderableLearningBlock> = {
  "1.1 Discussion: Why is workplace wellbeing important?": {
    id: "summary",
    kind: "summary",
    title: "Key Summary",
    items: [
      "Wellbeing is both an employee health issue and an organisational performance issue.",
      "Poor wellbeing can show up as stress, disengagement, absence, safety incidents, turnover, or reduced work quality.",
      "A useful wellbeing plan must consider both employee needs and employer responsibilities.",
    ],
  },
  "1.2 The concept of wellbeing": {
    id: "summary",
    kind: "summary",
    title: "Key Summary",
    body:
      "Wellbeing is a multi-dimensional state rather than a single mood or metric. It includes how people feel, function, relate, cope, and make meaning in the contexts where they live and work.",
    items: [
      "Wellbeing includes subjective experience and observable functioning.",
      "Wellbeing is shaped by personal, social, organisational, and environmental factors.",
      "The concept is broad, so definitions must be specific enough to guide workplace action.",
    ],
  },
  "1.3 Dimensions of wellbeing": {
    id: "summary",
    kind: "summary",
    title: "Key Summary",
    body:
      "Wellbeing can be mapped across connected dimensions. The dimensions are not isolated: strain in one area can affect the others.",
    table: {
      headers: ["Dimension", "Study Focus"],
      rows: [
        ["Psychological", "Mood, stress, coping, identity, confidence, and meaning."],
        [
          "Physical",
          "Energy, fatigue, safety, injury risk, sleep, and health behaviours.",
        ],
        ["Social", "Belonging, support, respect, conflict, and inclusion."],
        [
          "Occupational",
          "Work design, demands, resources, autonomy, recognition, and workload.",
        ],
      ],
    },
  },
  "1.4 Wellbeing at work": {
    id: "summary",
    kind: "summary",
    title: "Key Summary",
    body:
      "Wellbeing at work is influenced by job demands, available resources, management behaviour, workplace culture, safety systems, role clarity, workload, relationships, and the wider organisational environment.",
    items: [
      "Healthy work is designed to reduce unnecessary harm and support employee functioning.",
      "Wellbeing at work is not only an individual responsibility; it is also shaped by systems and culture.",
      "A strong analysis looks for both risks and protective factors.",
    ],
  },
  "1.5 The case of Minecorp": {
    id: "summary",
    kind: "summary",
    title: "Key Summary",
    body:
      "Minecorp acts as the applied case for examining workplace wellbeing in context. The case invites analysis of how work design, safety, leadership, stress, culture, and organisational responses interact.",
    items: [
      "Identify the visible wellbeing risks in the work environment.",
      "Look for underlying organisational patterns, not only individual symptoms.",
      "Connect the case to evidence-based wellbeing planning.",
    ],
  },
  "1.6 Discussion: Your take on Minecorp": {
    id: "summary",
    kind: "summary",
    title: "Key Summary",
    body:
      "The Minecorp discussion asks how wellbeing concepts apply to a realistic organisational setting. The useful move is to translate concepts into observable risks, needs, trade-offs, and intervention points.",
    items: [
      "What is happening at the individual, team, leadership, and system level?",
      "Which wellbeing dimensions are most affected?",
      "What evidence would be needed before recommending an intervention?",
    ],
  },
  "1.7 Brainstorming wellbeing concepts": {
    id: "summary",
    kind: "summary",
    title: "Key Summary",
    body:
      "This section expands the vocabulary for analysing wellbeing. The goal is to build a broad concept map before narrowing to assessment-relevant factors.",
    items: [
      "Generate wellbeing factors before judging which ones matter most.",
      "Group concepts into demands, resources, risks, supports, outcomes, and interventions.",
      "Use the brainstorm to identify evidence gaps and possible assessment themes.",
    ],
  },
  "1.8 Understanding risks": {
    id: "summary",
    kind: "summary",
    title: "Key Summary",
    body:
      "Risk analysis connects wellbeing concepts to likely harm. Risks may be psychosocial, physical, cultural, relational, procedural, or leadership-related.",
    items: [
      "Separate immediate hazards from deeper systemic contributors.",
      "Consider severity, likelihood, exposure, and who is affected.",
      "Use risks to prioritise interventions rather than treating every issue equally.",
    ],
  },
  "1.9 Discussion: Exploring wellbeing factors": {
    id: "summary",
    kind: "summary",
    title: "Key Summary",
    body:
      "Wellbeing factors interact. Workload may affect stress, stress may affect safety, safety climate may affect trust, and trust may affect whether employees report issues early.",
    items: [
      "Map relationships between factors instead of listing them in isolation.",
      "Look for reinforcing loops, pressure points, and protective resources.",
      "Use interrelationships to design interventions that address causes, not only symptoms.",
    ],
  },
  "Week 1 Summary": {
    id: "summary",
    kind: "summary",
    title: "Key Summary",
    body:
      "Week 1 frames workplace wellbeing as a multi-dimensional, system-shaped, evidence-informed area of business psychology. The practical task is to define wellbeing clearly, identify relevant risks and resources, and connect those factors to realistic organisational action.",
    items: [
      "Workplace wellbeing is best analysed through connected dimensions.",
      "Healthy work requires attention to demands, resources, culture, safety, leadership, and employee experience.",
      "Minecorp provides a case base for practising applied diagnosis and evidence-based wellbeing planning.",
    ],
  },
};

export function BusinessPsychologyWeekPage({
  unit,
  week,
}: {
  unit: StudyUnit;
  week: WeeklyTopic;
}) {
  const subModules = getRenderableSubModules(unit, week);

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
        <SubModuleAccordion subModules={subModules} />
      </DashboardCard>
    </div>
  );
}

function getRenderableSubModules(
  unit: StudyUnit,
  week: WeeklyTopic,
): RenderableSubModule[] {
  const subModules = week.subModules ?? [];

  if (
    unit.id !== "healthy-work-wellbeing" ||
    week.id !== "week-1-defining-wellbeing-at-work"
  ) {
    return subModules;
  }

  return subModules.map((subModule) => {
    if (!subModule.learningBlocks?.length) {
      return subModule;
    }

    return {
      ...subModule,
      learningBlocks: enrichHealthyWorkWeekOneBlocks(subModule),
    };
  });
}

function enrichHealthyWorkWeekOneBlocks(
  subModule: WeeklySubModule,
): RenderableLearningBlock[] {
  let enrichedBlocks =
    subModule.learningBlocks
      ?.map((block) => enrichHealthyWorkWeekOneBlock(subModule, block))
      .filter((block) => shouldKeepHealthyWorkWeekOneBlock(subModule, block)) ??
    [];
  const insertedBlock = healthyWorkWeekOneInsertedBlocks[subModule.title];

  if (insertedBlock && !enrichedBlocks.some((block) => block.id === insertedBlock.id)) {
    const activityIndex = enrichedBlocks.findIndex(
      (block) => block.id === "activity-steps",
    );

    if (activityIndex === -1) {
      enrichedBlocks = [...enrichedBlocks, insertedBlock];
    } else {
      enrichedBlocks = [
        ...enrichedBlocks.slice(0, activityIndex + 1),
        insertedBlock,
        ...enrichedBlocks.slice(activityIndex + 1),
      ];
    }
  }

  const summaryBlock = healthyWorkWeekOneSummaries[subModule.title];

  if (!summaryBlock) {
    return enrichedBlocks;
  }

  const existingSummaryIndex = enrichedBlocks.findIndex(
    (block) => block.id === "summary",
  );

  if (existingSummaryIndex >= 0) {
    return enrichedBlocks.map((block, index) =>
      index === existingSummaryIndex ? summaryBlock : block,
    );
  }

  const purposeIndex = enrichedBlocks.findIndex(
    (block) => block.kind === "purpose" || block.id === "purpose",
  );

  if (purposeIndex === -1) {
    return [summaryBlock, ...enrichedBlocks];
  }

  return [
    ...enrichedBlocks.slice(0, purposeIndex + 1),
    summaryBlock,
    ...enrichedBlocks.slice(purposeIndex + 1),
  ];
}

function shouldKeepHealthyWorkWeekOneBlock(
  subModule: WeeklySubModule,
  block: RenderableLearningBlock,
) {
  if (
    subModule.title === "1.2 The concept of wellbeing" &&
    block.id === "reading-placeholder"
  ) {
    return false;
  }

  if (
    subModule.title === "1.3 Dimensions of wellbeing" &&
    block.id === "reading-placeholder"
  ) {
    return false;
  }

  if (
    subModule.title === "1.4 Wellbeing at work" &&
    (block.id === "reading-placeholder-1" ||
      block.id === "image-placeholder")
  ) {
    return false;
  }

  if (
    subModule.title === "1.5 The case of Minecorp" &&
    (block.id === "case-placeholder" || block.id === "video-placeholder")
  ) {
    return false;
  }

  if (
    subModule.title === "1.6 Discussion: Your take on Minecorp" &&
    (block.id === "video-placeholder-1" || block.id === "video-placeholder-2")
  ) {
    return false;
  }

  if (
    subModule.title === "1.8 Understanding risks" &&
    block.id === "reading-placeholder"
  ) {
    return false;
  }

  return true;
}

function enrichHealthyWorkWeekOneBlock(
  subModule: WeeklySubModule,
  block: RenderableLearningBlock,
): RenderableLearningBlock {
  if (subModule.title === "1.2 The concept of wellbeing") {
    if (block.id === "activity-steps" && block.steps?.length) {
      return {
        ...block,
        activityVariant: "timeline",
        steps: block.steps.map((step) =>
          step.id === "step-1"
            ? withLinks(step, healthyWorkWeekOneReadingLinks.straume)
            : step,
        ),
      };
    }

    if (block.id === "reading-placeholder") {
      return withLinks(block, healthyWorkWeekOneReadingLinks.straume);
    }

    if (block.id === "journal-prompt") {
      return {
        ...block,
        body: undefined,
        items: [
          "Hedonic = feelings of pleasure",
          "Eudaimonic = pursuing happiness by finding meaning and purpose",
        ],
        kind: "note",
        title: "My Notes",
      };
    }
  }

  if (subModule.title === "1.3 Dimensions of wellbeing") {
    if (block.id === "activity-steps" && block.steps?.length) {
      return {
        ...block,
        activityVariant: "timeline",
        steps: block.steps.map((step) =>
          step.id === "step-1"
            ? withLinks(
                { ...step, body: "Read the chapter below." },
                healthyWorkWeekOneReadingLinks.fisher,
              )
            : step,
        ),
      };
    }

    if (block.id === "reading-placeholder") {
      return withLinks(block, healthyWorkWeekOneReadingLinks.fisher);
    }

    if (block.id === "definition-callouts" && block.definitions?.length) {
      return {
        ...block,
        definitions: block.definitions.map((definition) =>
          definition.term === "Hedonic wellbeing"
            ? {
                ...definition,
                definition:
                  "A state in which increased pleasure and decreased pain is seen to lead to happiness.",
              }
            : definition,
        ),
      };
    }
  }

  if (subModule.title === "1.4 Wellbeing at work") {
    if (block.id === "activity-steps" && block.steps?.length) {
      return {
        ...block,
        activityVariant: "timeline",
        steps: block.steps.map((step) =>
          step.id === "step-1"
            ? withLinks(step, healthyWorkWeekOneReadingLinks.henderson)
            : step,
        ),
      };
    }

    if (block.id === "reading-placeholder-1") {
      return withLinks(block, healthyWorkWeekOneReadingLinks.henderson);
    }

    if (block.id === "exercise-placeholder") {
      return {
        ...block,
        body: "Wellbeing at work dimensions and model diagrams.",
        images: [
          healthyWorkWeekOneImages.wellbeingWorkDimensionsTable,
          healthyWorkWeekOneImages.wellbeingDimensionsModel,
        ],
        title: "Resource",
      };
    }
  }

  if (subModule.title === "1.5 The case of Minecorp") {
    if (block.id === "activity-steps" && block.steps?.length) {
      return {
        ...block,
        activityVariant: "timeline",
        steps: block.steps.map((step) => {
          if (step.id === "step-1") {
            return {
              ...step,
              detailTitle: "Case Study",
              paragraphs: healthyWorkWeekOneMinecorpCaseStudy,
            };
          }

          return step.id === "step-2"
            ? withLinks(step, healthyWorkWeekOneReadingLinks.minecorpFifo)
            : step;
        }),
      };
    }
  }

  if (subModule.title === "1.6 Discussion: Your take on Minecorp") {
    if (block.id === "activity-steps" && block.steps?.length) {
      return {
        ...block,
        activityVariant: "timeline",
        steps: block.steps.map((step) =>
          step.id === "step-1"
            ? withLinks(
                step,
                healthyWorkWeekOneReadingLinks.minecorpDiscussionOne,
                healthyWorkWeekOneReadingLinks.minecorpDiscussionTwo,
              )
            : step,
        ),
      };
    }
  }

  if (subModule.title === "1.8 Understanding risks") {
    if (block.id === "activity-steps" && block.steps?.length) {
      return {
        ...block,
        activityVariant: "timeline",
        steps: block.steps.map((step) =>
          step.id === "step-1"
            ? withLinks(step, healthyWorkWeekOneReadingLinks.dollard)
            : step,
        ),
      };
    }

    if (block.id === "reading-placeholder") {
      return withLinks(block, healthyWorkWeekOneReadingLinks.dollard);
    }
  }

  if (block.id === "activity-steps") {
    return { ...block, activityVariant: "timeline" };
  }

  return block;
}

function withLinks<T extends { links?: LearningLink[] }>(
  item: T,
  ...links: LearningLink[]
): T {
  const mergedLinks = [...(item.links ?? [])];

  for (const link of links) {
    if (!mergedLinks.some((existingLink) => existingLink.href === link.href)) {
      mergedLinks.push(link);
    }
  }

  return { ...item, links: mergedLinks };
}

function SubModuleAccordion({ subModules }: { subModules: RenderableSubModule[] }) {
  const [openSubModuleId, setOpenSubModuleId] = React.useState("");

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
                    subModule.learningBlocks?.length
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
                {subModule.learningBlocks?.length ? (
                  <LearningBlockStack blocks={subModule.learningBlocks} />
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

function LearningBlockStack({ blocks }: { blocks: RenderableLearningBlock[] }) {
  return (
    <div className="min-w-0 space-y-3">
      {blocks.map((block) => (
        <LearningBlockCard block={block} key={block.id} />
      ))}
    </div>
  );
}

function LearningBlockCard({ block }: { block: RenderableLearningBlock }) {
  return (
    <section
      className={cn(
        "min-w-0 rounded-md border p-4 text-sm leading-6",
        getLearningBlockClassName(block.kind),
      )}
    >
      <h4 className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
        {block.title}
      </h4>
      {block.body ? (
        <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
          {block.body}
        </p>
      ) : null}
      {block.items?.length ? (
        <BulletList className="mt-3" items={block.items} />
      ) : null}
      {block.table ? <LearningBlockTable table={block.table} /> : null}
      {block.images?.length ? <LearningBlockImages images={block.images} /> : null}
      {block.steps?.length ? (
        <ActivitySteps steps={block.steps} variant={block.activityVariant} />
      ) : null}
      {block.definitions?.length ? (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {block.definitions.map((definition) => (
            <div
              className="min-w-0 rounded-md border border-primary/20 bg-primary/5 p-3"
              key={definition.term}
            >
              <h5 className="text-sm font-semibold text-foreground">
                {definition.term}
              </h5>
              <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
                {definition.definition}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      {block.links?.length ? <ResourceLinks links={block.links} /> : null}
    </section>
  );
}

function LearningBlockImages({ images }: { images: LearningImage[] }) {
  return (
    <div className="mt-3 grid min-w-0 gap-3">
      {images.map((image) => (
        <figure
          className="min-w-0 overflow-hidden rounded-md border border-border/70 bg-background/80 p-3"
          key={image.src}
        >
          <img
            alt={image.alt}
            className="max-h-[520px] w-full object-contain"
            loading="lazy"
            src={image.src}
          />
          {image.caption ? (
            <figcaption className="mt-2 break-words text-xs leading-5 text-muted-foreground">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

function LearningBlockTable({ table }: { table: LearningTable }) {
  return (
    <div className="mt-3 w-full overflow-hidden rounded-md border border-border/70">
      <table className="w-full table-fixed border-collapse text-sm">
        <thead className="bg-muted/45 text-xs font-medium uppercase tracking-normal text-muted-foreground">
          <tr>
            {table.headers.map((header, index) => (
              <th
                className={cn(
                  "border-r border-border/70 px-3 py-2 text-left last:border-r-0",
                  index === 0 ? "w-[36%]" : "w-[64%]",
                )}
                key={header}
                scope="col"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr className="border-t border-border/70 bg-background/70" key={row.join("-")}>
              {row.map((cell, index) => (
                <td
                  className={cn(
                    "break-words border-r border-border/70 px-3 py-2 align-top text-muted-foreground last:border-r-0",
                    index === 0 && "font-medium text-foreground",
                  )}
                  key={cell}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActivitySteps({
  steps,
  variant = "cards",
}: {
  steps: NonNullable<RenderableLearningBlock["steps"]>;
  variant?: "cards" | "timeline";
}) {
  if (variant === "timeline") {
    return (
      <ol className="mt-4 space-y-0">
        {steps.map((step, index) => (
          <li
            className="relative min-w-0 border-l border-border/70 pb-5 pl-5 last:border-l-0 last:pb-0"
            key={step.id}
          >
            <span className="absolute -left-3 grid size-6 place-items-center rounded-full border border-border bg-background text-[11px] font-semibold text-muted-foreground">
              {index + 1}
            </span>
            <div className="min-w-0">
              <h5 className="text-sm font-semibold text-foreground">
                {step.title}
              </h5>
              <p className="mt-1 break-words text-sm leading-6 text-muted-foreground">
                {step.body}
              </p>
              {step.paragraphs?.length ? (
                <div className="mt-3 min-w-0 rounded-md border border-border/70 bg-muted/20 p-3">
                  {step.detailTitle ? (
                    <h6 className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
                      {step.detailTitle}
                    </h6>
                  ) : null}
                  <div className="mt-2 space-y-3">
                    {step.paragraphs.map((paragraph) => (
                      <p
                        className="break-words text-sm leading-6 text-muted-foreground"
                        key={paragraph}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ) : null}
              {step.items?.length ? (
                <BulletList className="mt-2" items={step.items} />
              ) : null}
              {step.links?.length ? <ResourceLinks links={step.links} /> : null}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="mt-3 space-y-3">
      {steps.map((step) => (
        <li
          className="min-w-0 rounded-md border border-border/70 bg-background/70 p-3"
          key={step.id}
        >
          <h5 className="text-sm font-semibold text-foreground">{step.title}</h5>
          <p className="mt-1 break-words text-sm leading-6 text-muted-foreground">
            {step.body}
          </p>
          {step.items?.length ? (
            <BulletList className="mt-2" items={step.items} />
          ) : null}
          {step.links?.length ? <ResourceLinks links={step.links} /> : null}
        </li>
      ))}
    </ol>
  );
}

function ResourceLinks({
  links,
}: {
  links: NonNullable<WeeklyLearningBlock["links"]>;
}) {
  return (
    <div className="mt-3 flex min-w-0 flex-col gap-2">
      {links.map((link) => (
        <a
          className="inline-flex min-w-0 items-center gap-2 rounded-md border border-border/70 bg-background/70 px-3 py-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          href={link.href}
          key={link.href}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLink className="size-4 shrink-0" />
          <span className="min-w-0 break-words">{link.label}</span>
        </a>
      ))}
    </div>
  );
}

function getLearningBlockClassName(kind: WeeklyLearningBlockKind) {
  if (kind === "definition") {
    return "border-primary/25 bg-primary/5";
  }

  if (
    kind === "discussion" ||
    kind === "journal" ||
    kind === "note" ||
    kind === "reflection"
  ) {
    return "border-accent/60 bg-accent/10";
  }

  if (kind === "resource") {
    return "border-dashed border-border bg-muted/20";
  }

  if (kind === "summary") {
    return "border-primary/20 bg-primary/5";
  }

  if (kind === "objectives") {
    return "border-border/70 bg-card/80";
  }

  return "border-border/70 bg-muted/25";
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
        <li className="flex min-w-0 gap-2" key={item}>
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span className="min-w-0 break-words">{item}</span>
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
