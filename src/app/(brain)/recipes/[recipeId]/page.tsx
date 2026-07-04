import { notFound } from "next/navigation";

import { RecipeDetail } from "@/features/recipes/components/recipe-detail";
import { getRecipe, recipes } from "@/features/recipes/data/recipes-data";

export function generateStaticParams() {
  return recipes.map((r) => ({ recipeId: r.id }));
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) {
  const { recipeId } = await params;
  const recipe = getRecipe(recipeId);

  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} />;
}
