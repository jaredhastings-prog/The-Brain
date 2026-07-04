import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Recipe } from "@/features/recipes/types";

export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const imageSrc = recipe.imageUrl ?? (recipe.imagePath ? `/${recipe.imagePath}` : null);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-4 text-muted-foreground">
          <Link href="/recipes">
            <ArrowLeft className="size-4" />
            All recipes
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{recipe.category}</Badge>
          {recipe.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground">
          {recipe.title}
        </h1>
        {recipe.description && (
          <p className="mt-2 text-base leading-7 text-muted-foreground">{recipe.description}</p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          {recipe.prepTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              Prep: {recipe.prepTime}
            </span>
          )}
          {recipe.cookTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              Cook: {recipe.cookTime}
            </span>
          )}
          {recipe.servings > 0 && (
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              {recipe.servings} serving{recipe.servings !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        {recipe.source && (
          <a
            href={recipe.source}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-fit items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
          >
            <ExternalLink className="size-4 shrink-0" />
            <span className="break-all">{recipe.source}</span>
          </a>
        )}
      </div>

      {imageSrc && (
        <div className="relative h-72 w-full overflow-hidden rounded-lg bg-muted/60 md:h-96">
          <Image
            src={imageSrc}
            alt={recipe.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>
      )}

      {recipe.galleryImages && recipe.galleryImages.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {recipe.galleryImages.map((src, i) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-lg bg-muted/60"
            >
              <Image
                src={src}
                alt={`${recipe.title} — step photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      )}

      <Separator />

      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-base font-semibold text-foreground">Ingredients</h2>
          <ul className="mt-4 space-y-2">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">Method</h2>
          <ol className="mt-4 space-y-4">
            {recipe.method.map((step, i) => (
              <li key={i} className="flex gap-4 text-sm">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
                  {i + 1}
                </span>
                <span className="leading-6 text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
