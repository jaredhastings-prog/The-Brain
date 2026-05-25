"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MetaProgramCardGrid } from "@/features/nlp-study/meta-programs/meta-program-card-grid";
import { MetaProgramCategoryTabs } from "@/features/nlp-study/meta-programs/meta-program-category-tabs";
import {
  metaProgramCards,
  metaProgramCategories,
} from "@/features/nlp-study/meta-programs/meta-program-data";
import { MetaProgramDetailPanel } from "@/features/nlp-study/meta-programs/meta-program-detail-panel";
import type { MetaProgramCategoryId } from "@/features/nlp-study/meta-programs/meta-program-types";

export function MetaProgramLearningDeck() {
  const initialCategoryId = metaProgramCategories[0].id;
  const initialCardId = metaProgramCards[0].id;
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState<MetaProgramCategoryId>(initialCategoryId);
  const [selectedCardId, setSelectedCardId] = React.useState(initialCardId);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [flippedCardIds, setFlippedCardIds] = React.useState<Set<string>>(
    () => new Set(),
  );

  const visibleCards = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return metaProgramCards.filter((card) => {
      const matchesCategory = card.categoryId === selectedCategoryId;
      const searchText = [
        card.title,
        card.oneLine,
        card.frontSummary,
        card.definition,
        card.continuum.join(" "),
        card.languageCues.join(" "),
        card.behaviouralSigns.join(" "),
        card.visualScene,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && (!query || searchText.includes(query));
    });
  }, [searchQuery, selectedCategoryId]);

  React.useEffect(() => {
    const firstVisibleCard = visibleCards[0];

    if (
      firstVisibleCard &&
      !visibleCards.some((card) => card.id === selectedCardId)
    ) {
      setSelectedCardId(firstVisibleCard.id);
    }
  }, [selectedCardId, visibleCards]);

  const selectedCard =
    metaProgramCards.find((card) => card.id === selectedCardId) ??
    visibleCards[0] ??
    metaProgramCards[0];
  const isSelectedCardFlipped = flippedCardIds.has(selectedCard.id);

  function handleCategorySelect(categoryId: MetaProgramCategoryId) {
    setSelectedCategoryId(categoryId);
    setSearchQuery("");

    const nextCard = metaProgramCards.find(
      (card) => card.categoryId === categoryId,
    );

    if (nextCard) {
      setSelectedCardId(nextCard.id);
    }
  }

  function handleFlipCard(cardId: string) {
    setFlippedCardIds((current) => {
      const next = new Set(current);

      if (next.has(cardId)) {
        next.delete(cardId);
      } else {
        next.add(cardId);
      }

      return next;
    });
  }

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <Button asChild size="sm" variant="outline">
          <Link href="/study-learning/nlp">
            <ArrowLeft />
            NLP Repository
          </Link>
        </Button>
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
              <Sparkles className="size-4" />
              Flashcard learning tool
            </div>
            <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
              Meta-Programs Learning Deck
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A JSON-backed flashcard deck for learning contextual
              meta-program continuums without replacing the NLP Repository.
            </p>
          </div>
          <label className="w-full space-y-2 lg:max-w-sm">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
              <Search className="size-3" />
              Search cards
            </span>
            <Input
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search cues, strengths, prompts..."
              value={searchQuery}
            />
          </label>
        </div>
      </section>

      <MetaProgramCategoryTabs
        cards={metaProgramCards}
        categories={metaProgramCategories}
        onSelectCategory={handleCategorySelect}
        selectedCategoryId={selectedCategoryId}
      />

      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="min-w-0 space-y-4">
          <MetaProgramCardGrid
            cards={visibleCards}
            flippedCardIds={flippedCardIds}
            onFlipCard={handleFlipCard}
            onSelectCard={setSelectedCardId}
            selectedCardId={selectedCard.id}
          />
        </div>
        <MetaProgramDetailPanel
          card={selectedCard}
          isFlipped={isSelectedCardFlipped}
          onFlip={() => handleFlipCard(selectedCard.id)}
        />
      </section>
    </div>
  );
}
