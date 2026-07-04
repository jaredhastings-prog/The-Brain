import Image from "next/image";
import Link from "next/link";
import { Clock, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/features/recipes/types";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const imageSrc = recipe.imageUrl ?? (recipe.imagePath ? `/${recipe.imagePath}` : null);
  const totalTime = recipe.cookTime || recipe.prepTime;

  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border/80 bg-card/95 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_4px_12px_rgb(24_24_27_/_0.04)] transition-shadow hover:shadow-[0_1px_2px_rgb(24_24_27_/_0.06),0_8px_20px_rgb(24_24_27_/_0.08)]"
    >
      <div className="relative h-44 w-full bg-muted/60">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl text-muted-foreground/30 select-none">
            🍽
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          <Badge variant="outline" className="shrink-0 text-xs">
            {recipe.category}
          </Badge>
        </div>
        {recipe.description && (
          <p className="text-xs leading-5 text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>
        )}
        <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
          {totalTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {totalTime}
            </span>
          )}
          {recipe.servings > 0 && (
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" />
              {recipe.servings} serving{recipe.servings !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
