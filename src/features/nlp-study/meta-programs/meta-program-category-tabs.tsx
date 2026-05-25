import { Badge } from "@/components/ui/badge";
import type {
  MetaProgramCard,
  MetaProgramCategory,
  MetaProgramCategoryId,
} from "@/features/nlp-study/meta-programs/meta-program-types";
import { cn } from "@/lib/utils";

export function MetaProgramCategoryTabs({
  cards,
  categories,
  onSelectCategory,
  selectedCategoryId,
}: {
  cards: MetaProgramCard[];
  categories: MetaProgramCategory[];
  onSelectCategory: (categoryId: MetaProgramCategoryId) => void;
  selectedCategoryId: MetaProgramCategoryId;
}) {
  return (
    <div
      aria-label="Meta-program categories"
      className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
      role="tablist"
    >
      {categories.map((category) => {
        const isActive = selectedCategoryId === category.id;
        const cardCount = cards.filter(
          (card) => card.categoryId === category.id,
        ).length;

        return (
          <button
            aria-selected={isActive}
            className={cn(
              "rounded-lg border border-border/80 bg-card/90 p-4 text-left shadow-[0_1px_2px_rgb(24_24_27_/_0.03)] transition-colors hover:border-slate-300 hover:bg-card",
              isActive && "border-slate-400 bg-background shadow-sm",
            )}
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            role="tab"
            type="button"
          >
            <div className="flex items-center justify-between gap-3">
              <Badge variant={isActive ? "signal" : "outline"}>
                {cardCount} cards
              </Badge>
              <span
                className={cn(
                  "size-2 rounded-full bg-muted-foreground/35",
                  isActive && "bg-emerald-600",
                )}
              />
            </div>
            <h2 className="mt-4 text-sm font-semibold text-foreground">
              {category.title}
            </h2>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {category.subtitle}
            </p>
          </button>
        );
      })}
    </div>
  );
}
