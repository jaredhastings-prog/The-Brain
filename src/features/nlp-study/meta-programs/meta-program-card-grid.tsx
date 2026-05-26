import { Eye, RotateCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MetaProgramContinuum } from "@/features/nlp-study/meta-programs/meta-program-continuum";
import { MetaProgramVisual } from "@/features/nlp-study/meta-programs/meta-program-visual";
import type { MetaProgramCard } from "@/features/nlp-study/meta-programs/meta-program-types";
import { cn } from "@/lib/utils";

export function MetaProgramCardGrid({
  cards,
  flippedCardIds,
  onFlipCard,
  onSelectCard,
  selectedCardId,
}: {
  cards: MetaProgramCard[];
  flippedCardIds: Set<string>;
  onFlipCard: (cardId: string) => void;
  onSelectCard: (cardId: string) => void;
  selectedCardId: string;
}) {
  if (!cards.length) {
    return (
      <div className="rounded-lg border border-dashed border-border/80 bg-muted/30 px-4 py-10 text-center text-sm text-muted-foreground">
        No meta-program cards match the current search.
      </div>
    );
  }

  return (
    <div className="grid min-w-0 max-w-full gap-3 overflow-hidden">
      {cards.map((card) => {
        const isSelected = card.id === selectedCardId;
        const isFlipped = flippedCardIds.has(card.id);

        return (
          <article
            className={cn(
              "min-w-0 overflow-hidden rounded-lg border border-border/80 bg-card/95 p-4 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)] transition-colors",
              isSelected && "border-slate-400 bg-background",
            )}
            key={card.id}
          >
            <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
              <div className="min-w-0 max-w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">#{card.number}</Badge>
                  <Badge variant="secondary">{card.continuumType}</Badge>
                </div>
                <h3 className="mt-3 min-w-0 break-words text-base font-semibold text-foreground [overflow-wrap:anywhere]">
                  {card.title}
                </h3>
                <p className="mt-2 min-w-0 break-words text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]">
                  {isFlipped ? card.definition : card.frontSummary}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  aria-label={`Flip ${card.title} card`}
                  onClick={() => onFlipCard(card.id)}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <RotateCcw />
                </Button>
                <Button
                  onClick={() => onSelectCard(card.id)}
                  size="sm"
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                >
                  <Eye />
                  Open
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <MetaProgramContinuum
                className="max-w-full"
                continuum={card.continuum}
                type={card.continuumType}
                variant="compact"
              />
            </div>
            <div className="mt-4">
              <MetaProgramVisual
                imagePath={card.imagePath}
                title={card.title}
                visualScene={card.visualScene}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
