import { ChevronDown, FolderOpen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { NlpTopicTabs } from "@/features/nlp-study/components/nlp-topic-tabs";
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
    <div className="min-w-0 max-w-full overflow-hidden rounded-lg border border-border/80 bg-card/90 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]">
      <button
        aria-expanded={isOpen}
        className="flex w-full min-w-0 items-start justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-muted/35"
        onClick={onToggle}
        type="button"
      >
        <div className="min-w-0 max-w-full">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{group.topics.length} entries</Badge>
            <Badge variant="secondary">Reference area</Badge>
          </div>
          <h2 className="mt-3 break-words text-base font-semibold text-foreground [overflow-wrap:anywhere]">
            {group.title}
          </h2>
          <p className="mt-1 max-w-3xl break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
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
        <div className="min-w-0 max-w-full space-y-3 overflow-hidden border-t border-border/70 p-2 sm:p-3">
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
    <article className="min-w-0 max-w-full overflow-hidden rounded-md border border-border/70 bg-muted/25">
      <button
        aria-expanded={isOpen}
        className="flex w-full min-w-0 items-start justify-between gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/40 sm:px-4"
        onClick={() => onToggle(topic.id, groupId)}
        type="button"
      >
        <div className="flex min-w-0 max-w-full items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
            <FolderOpen className="size-4" />
          </span>
          <div className="min-w-0 max-w-full">
            <h3 className="break-words text-sm font-semibold leading-5 text-foreground [overflow-wrap:anywhere]">
              {topic.title}
            </h3>
            <p className="mt-0.5 break-words text-xs leading-5 text-muted-foreground [overflow-wrap:anywhere]">
              {groupTitle}
            </p>
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
        <div className="min-w-0 max-w-full overflow-hidden border-t border-border/70 p-3 sm:px-4 sm:py-4">
          <NlpTopicTabs topic={topic} />
        </div>
      ) : null}
    </article>
  );
}
