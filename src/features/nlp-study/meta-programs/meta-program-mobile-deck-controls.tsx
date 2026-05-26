import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { MetaProgramCard } from "@/features/nlp-study/meta-programs/meta-program-types";

export function MetaProgramMobileDeckControls({
  cards,
  onNext,
  onPrevious,
  selectedCardId,
}: {
  cards: MetaProgramCard[];
  onNext: () => void;
  onPrevious: () => void;
  selectedCardId: string;
}) {
  const selectedIndex = Math.max(
    0,
    cards.findIndex((card) => card.id === selectedCardId),
  );
  const selectedCard = cards[selectedIndex];
  const hasMultipleCards = cards.length > 1;

  if (!selectedCard) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border/80 bg-card/95 p-3 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <Button
          aria-label="Previous meta-program card"
          disabled={!hasMultipleCards}
          onClick={onPrevious}
          size="icon"
          type="button"
          variant="outline"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div className="min-w-0 text-center">
          <Badge variant="outline">
            {selectedIndex + 1} of {cards.length}
          </Badge>
          <h2 className="mt-2 truncate text-sm font-semibold text-foreground">
            {selectedCard.title}
          </h2>
          <p className="mt-1 max-h-10 overflow-hidden text-xs leading-5 text-muted-foreground">
            {selectedCard.oneLine}
          </p>
        </div>

        <Button
          aria-label="Next meta-program card"
          disabled={!hasMultipleCards}
          onClick={onNext}
          size="icon"
          type="button"
          variant="outline"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
