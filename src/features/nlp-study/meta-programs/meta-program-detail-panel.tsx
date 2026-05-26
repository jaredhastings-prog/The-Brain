import { BookOpen, RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetaProgramContinuum } from "@/features/nlp-study/meta-programs/meta-program-continuum";
import { MetaProgramVisual } from "@/features/nlp-study/meta-programs/meta-program-visual";
import type { MetaProgramCard } from "@/features/nlp-study/meta-programs/meta-program-types";

export function MetaProgramDetailPanel({
  card,
  isFlipped,
  onFlip,
}: {
  card: MetaProgramCard;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  return (
    <aside className="w-full min-w-0 max-w-full space-y-4 overflow-hidden rounded-lg border border-border/80 bg-card/95 p-4 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] sm:p-5 xl:sticky xl:top-4 xl:p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="signal">Selected card</Badge>
        <Badge variant="outline">#{card.number}</Badge>
        <Badge variant="secondary">{card.continuumType}</Badge>
      </div>

      <div>
        <h2 className="min-w-0 break-words text-xl font-semibold text-foreground [overflow-wrap:anywhere]">
          {card.title}
        </h2>
        <p className="mt-2 min-w-0 break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
          {card.oneLine}
        </p>
      </div>

      <div className="xl:hidden">
        <MetaProgramVisual
          imagePath={card.imagePath}
          title={card.title}
          visualScene={card.visualScene}
        />
      </div>

      <Button
        className="w-full min-w-0 max-w-full whitespace-normal text-center"
        onClick={onFlip}
        type="button"
        variant="outline"
      >
        <RotateCcw />
        {isFlipped ? "Show front" : "Flip for deeper view"}
      </Button>

      <div className="min-w-0 max-w-full overflow-hidden rounded-md border border-border/70 bg-background/75 p-3">
        <div className="mb-3 flex min-w-0 items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
          <BookOpen className="size-4 shrink-0" />
          <span className="min-w-0 break-words [overflow-wrap:anywhere]">
            {isFlipped ? "Back of card" : "Front of card"}
          </span>
        </div>
        {isFlipped ? (
          <div className="space-y-4">
            <DetailSection title="Definition" values={[card.definition]} />
            <DetailSection title="Language Cues" values={card.languageCues} />
            <DetailSection
              title="Behavioural Signs"
              values={card.behaviouralSigns}
            />
            <DetailSection title="Strengths" values={card.strengths} />
            <DetailSection title="Blind Spots" values={card.blindSpots} />
            <DetailSection
              title="Coaching Prompts"
              values={card.coachingPrompts}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="min-w-0 break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
              {card.frontSummary}
            </p>
            <MetaProgramContinuum
              className="max-w-full"
              continuum={card.continuum}
              type={card.continuumType}
              variant="comfortable"
            />
            <DetailSection title="Example" values={[card.example]} />
          </div>
        )}
      </div>

      <div className="hidden xl:block">
        <MetaProgramVisual
          imagePath={card.imagePath}
          title={card.title}
          visualScene={card.visualScene}
        />
      </div>

      <DetailSection
        title="Personal Notes"
        values={[card.personalNotesPlaceholder]}
      />
    </aside>
  );
}

function DetailSection({ title, values }: { title: string; values: string[] }) {
  return (
    <section className="min-w-0 max-w-full">
      <h3 className="min-w-0 break-words text-xs font-semibold uppercase tracking-normal text-muted-foreground [overflow-wrap:anywhere]">
        {title}
      </h3>
      <ul className="mt-2 min-w-0 max-w-full space-y-2 text-sm leading-6 text-muted-foreground">
        {values.map((value) => (
          <li className="flex min-w-0 max-w-full gap-2" key={value}>
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span className="min-w-0 break-words [overflow-wrap:anywhere]">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
