import { RecipeBrowser } from "@/features/recipes/components/recipe-browser";
import { recipes } from "@/features/recipes/data/recipes-data";

export default function RecipesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal text-foreground">Recipes</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {recipes.length === 0
            ? "Your recipe collection is empty. Add your first recipe to get started."
            : `${recipes.length} recipe${recipes.length !== 1 ? "s" : ""} saved.`}
        </p>
      </div>
      <RecipeBrowser recipes={recipes} />
    </div>
  );
}
