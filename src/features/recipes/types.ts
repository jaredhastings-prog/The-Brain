export type RecipeCategory =
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Snacks"
  | "Desserts"
  | "Drinks"
  | "Other";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  category: RecipeCategory;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  method: string[];
  source?: string;
  imageUrl?: string;
  imagePath?: string;
  galleryImages?: string[];
  tags?: string[];
};

export const recipeCategories: RecipeCategory[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Desserts",
  "Drinks",
  "Other",
];
