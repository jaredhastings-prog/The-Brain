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
      className="flex w-full min-w-0 max-w-full touch-pan-x gap-2 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
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
              "w-52 max-w-[calc(100vw-2rem)] shrink-0 rounded-full border border-border/80 bg-card/90 px-3 py-2.5 text-left shadow-[0_1px_2px_rgb(24_24_27_/_0.03)] transition-colors hover:border-slate-300 hover:bg-card md:w-auto md:min-w-0 md:max-w-none md:rounded-lg md:p-4",
              isActive && "border-slate-400 bg-background shadow-sm",
            )}
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            role="tab"
            type="button"
          >
            <div className="flex min-w-0 items-center justify-between gap-2">
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
            <h2 className="mt-2 min-w-0 break-words text-xs font-semibold text-foreground [overflow-wrap:anywhere] md:mt-4 md:text-sm">
              {category.title}
            </h2>
            <p className="mt-2 hidden min-w-0 break-words text-xs leading-5 text-muted-foreground [overflow-wrap:anywhere] md:block">
              {category.subtitle}
            </p>
          </button>
        );
      })}
    </div>
  );
}
