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
import { MetaProgramMobileDeckControls } from "@/features/nlp-study/meta-programs/meta-program-mobile-deck-controls";
import type {
  MetaProgramCard,
  MetaProgramCategory,
  MetaProgramCategoryId,
} from "@/features/nlp-study/meta-programs/meta-program-types";

const metaProgramCategoryById = new Map<
  MetaProgramCategoryId,
  MetaProgramCategory
>(
  metaProgramCategories.map((category) => [category.id, category] as const),
);

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getSearchQueryVariants(value: string) {
  const query = normalizeSearchText(value);
  const variants = new Set([query]);

  if (query.endsWith("s") && query.length > 3) {
    variants.add(query.slice(0, -1));
  }

  return [...variants].filter(Boolean);
}

function includesNormalized(value: string, query: string) {
  return normalizeSearchText(value).includes(query);
}

function hasExactWordMatch(value: string, query: string) {
  return normalizeSearchText(value).split(" ").includes(query);
}

function getSearchRank(card: MetaProgramCard, query: string): number | null {
  const category = metaProgramCategoryById.get(card.categoryId);
  const title = normalizeSearchText(card.title);
  const cardId = normalizeSearchText(card.id);
  const continuumLabels = card.continuum.join(" ");
  const categoryText = [category?.title, category?.subtitle].join(" ");
  const summaryText = [
    card.oneLine,
    card.frontSummary,
    card.definition,
  ].join(" ");
  const deeperText = [
    card.languageCues.join(" "),
    card.behaviouralSigns.join(" "),
    card.strengths.join(" "),
    card.blindSpots.join(" "),
    card.coachingPrompts.join(" "),
    card.example,
    card.visualScene,
  ].join(" ");

  if (title === query) {
    return 10;
  }

  if (cardId === query) {
    return 20;
  }

  if (title.startsWith(query)) {
    return 30;
  }

  if (hasExactWordMatch(card.title, query)) {
    return 35;
  }

  if (title.includes(query)) {
    return 40;
  }

  if (cardId.includes(query)) {
    return 45;
  }

  if (includesNormalized(continuumLabels, query)) {
    return 50;
  }

  if (includesNormalized(categoryText, query)) {
    return 60;
  }

  if (includesNormalized(summaryText, query)) {
    return 70;
  }

  if (includesNormalized(deeperText, query)) {
    return 80;
  }

  return null;
}

function getBestSearchRank(card: MetaProgramCard, queries: string[]) {
  const ranks = queries
    .map((query) => getSearchRank(card, query))
    .filter((rank): rank is number => rank !== null);

  return ranks.length ? Math.min(...ranks) : null;
}

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
  const previousSearchQuery = React.useRef(searchQuery);

  const visibleCards = React.useMemo(() => {
    const queries = getSearchQueryVariants(searchQuery);
    const hasActiveSearch = queries.length > 0;

    if (hasActiveSearch) {
      return metaProgramCards
        .flatMap((card) => {
          const rank = getBestSearchRank(card, queries);

          return rank === null ? [] : [{ card, rank }];
        })
        .sort(
          (first, second) =>
            first.rank - second.rank ||
            first.card.number - second.card.number,
        )
        .map((result) => result.card);
    }

    return metaProgramCards.filter(
      (card) => card.categoryId === selectedCategoryId,
    );
  }, [searchQuery, selectedCategoryId]);

  const isSearching = searchQuery.trim().length > 0;
  const selectedCategoryTitle =
    metaProgramCategoryById.get(selectedCategoryId)?.title ??
    "the selected category";
  const visibleCategoryCount = new Set(
    visibleCards.map((card) => card.categoryId),
  ).size;
  const visibleCategoryLabel =
    visibleCategoryCount === 1 ? "category" : "categories";

  React.useEffect(() => {
    const firstVisibleCard = visibleCards[0];
    const searchQueryChanged = previousSearchQuery.current !== searchQuery;

    previousSearchQuery.current = searchQuery;

    if (!firstVisibleCard) {
      return;
    }

    if (
      searchQueryChanged ||
      !visibleCards.some((card) => card.id === selectedCardId)
    ) {
      setSelectedCardId(firstVisibleCard.id);
    }
  }, [searchQuery, selectedCardId, visibleCards]);

  const selectedCard =
    visibleCards.find((card) => card.id === selectedCardId) ??
    visibleCards[0] ??
    null;
  const isSelectedCardFlipped = selectedCard
    ? flippedCardIds.has(selectedCard.id)
    : false;

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

  function handlePreviousCard() {
    if (!visibleCards.length || !selectedCard) {
      return;
    }

    const selectedIndex = visibleCards.findIndex(
      (card) => card.id === selectedCard.id,
    );
    const previousIndex =
      selectedIndex <= 0 ? visibleCards.length - 1 : selectedIndex - 1;

    setSelectedCardId(visibleCards[previousIndex].id);
  }

  function handleNextCard() {
    if (!visibleCards.length || !selectedCard) {
      return;
    }

    const selectedIndex = visibleCards.findIndex(
      (card) => card.id === selectedCard.id,
    );
    const nextIndex =
      selectedIndex >= visibleCards.length - 1 ? 0 : selectedIndex + 1;

    setSelectedCardId(visibleCards[nextIndex].id);
  }

  return (
    <div className="min-w-0 max-w-full space-y-5 overflow-x-hidden pb-28 sm:pb-24 xl:space-y-6 xl:pb-20">
      <section className="min-w-0 max-w-full overflow-hidden rounded-lg border border-border/80 bg-card/95 p-4 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <Button asChild size="sm" variant="outline">
          <Link href="/study-learning/nlp">
            <ArrowLeft />
            NLP Repository
          </Link>
        </Button>
        <div className="mt-6 flex min-w-0 flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-4xl">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
              <Sparkles className="size-4" />
              Flashcard learning tool
            </div>
            <h1 className="break-words text-2xl font-semibold tracking-normal text-foreground md:text-5xl">
              Meta-Programs Learning Deck
            </h1>
          </div>
          <label className="min-w-0 max-w-full space-y-2 lg:w-full lg:max-w-sm">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
              <Search className="size-3" />
              Search cards
            </span>
            <Input
              className="min-w-0 max-w-full"
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

      {isSearching ? (
        <div className="min-w-0 max-w-full rounded-lg border border-border/80 bg-card/80 px-4 py-3 text-sm leading-6 text-muted-foreground">
          <span className="font-medium text-foreground">
            Global search active:
          </span>{" "}
          showing {visibleCards.length} matching card
          {visibleCards.length === 1 ? "" : "s"} across {visibleCategoryCount}{" "}
          {visibleCategoryLabel}. Clear search to return to{" "}
          {selectedCategoryTitle}.
        </div>
      ) : null}

      <section className="min-w-0 max-w-full overflow-x-hidden">
        {selectedCard ? (
          <>
            <div className="space-y-3 xl:hidden">
              <MetaProgramMobileDeckControls
                cards={visibleCards}
                onNext={handleNextCard}
                onPrevious={handlePreviousCard}
                selectedCardId={selectedCard.id}
              />
              <MetaProgramDetailPanel
                card={selectedCard}
                isFlipped={isSelectedCardFlipped}
                onFlip={() => handleFlipCard(selectedCard.id)}
              />
            </div>

            <div className="hidden min-w-0 gap-4 xl:grid xl:grid-cols-[minmax(0,1fr)_420px]">
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
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-dashed border-border/80 bg-muted/30 px-4 py-10 text-center text-sm text-muted-foreground">
            No meta-program cards match the current search.
          </div>
        )}
      </section>
    </div>
  );
}
