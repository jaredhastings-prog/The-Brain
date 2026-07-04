"use client";

import { useState } from "react";
import { UtensilsCrossed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/features/recipes/components/recipe-card";
import { recipeCategories, type RecipeCategory } from "@/features/recipes/types";
import type { Recipe } from "@/features/recipes/types";

const ALL = "All";

export function RecipeBrowser({ recipes }: { recipes: Recipe[] }) {
  const [active, setActive] = useState<string>(ALL);

  const filtered =
    active === ALL ? recipes : recipes.filter((r) => r.category === active);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <FilterChip label={ALL} active={active === ALL} onClick={() => setActive(ALL)} />
        {recipeCategories.map((cat) => (
          <FilterChip
            key={cat}
            label={cat}
            active={active === cat}
            onClick={() => setActive(cat)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState category={active} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      size="sm"
      variant={active ? "default" : "outline"}
      onClick={onClick}
      className="h-8 rounded-full px-4 text-xs"
    >
      {label}
    </Button>
  );
}

function EmptyState({ category }: { category: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-20 text-center">
      <UtensilsCrossed className="mb-3 size-8 text-muted-foreground/40" />
      <p className="text-sm font-medium text-foreground">No recipes yet</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {category === ALL
          ? "Add your first recipe and it will appear here."
          : `No ${category.toLowerCase()} recipes saved yet.`}
      </p>
    </div>
  );
}
