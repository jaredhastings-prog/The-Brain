import type { Recipe } from "@/features/recipes/types";

export const recipes: Recipe[] = [];

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function getRecipesByCategory(category: string): Recipe[] {
  if (category === "All") return recipes;
  return recipes.filter((r) => r.category === category);
}
