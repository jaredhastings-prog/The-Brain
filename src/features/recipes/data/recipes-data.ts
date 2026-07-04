import type { Recipe } from "@/features/recipes/types";

export const recipes: Recipe[] = [
  {
    id: "high-protein-waffles",
    title: "High Protein Waffles (Gluten & Grain-Free)",
    description:
      "Fluffy waffles with 31 grams of protein per serving — ideal for post-workout breakfasts. Made with almond flour, protein powder, and eggs. Gluten-free, grain-free, and refined sugar-free.",
    category: "Breakfast",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 2,
    ingredients: [
      "1 1/4 cups blanched almond flour",
      "1/2 cup protein powder",
      "2 teaspoons baking powder",
      "1/4 teaspoon sea salt",
      "1/2 cup non-dairy milk (plus more as needed)",
      "2 large eggs",
      "1-2 tablespoons pure maple syrup",
      "1 teaspoon vanilla extract",
      "1/2 tablespoon ground cinnamon (optional)",
      "Olive oil or cooking spray for waffle maker",
    ],
    method: [
      "Add all ingredients to a blender or food processor and blend until a smooth batter forms. Alternatively, whisk together in a mixing bowl.",
      "Preheat and lightly grease your waffle maker.",
      "Pour batter into the waffle maker and cook 2-3 minutes per the manufacturer's instructions.",
      "Repeat until all the batter is used.",
      "Serve warm with your desired toppings.",
      "Storage: keep leftovers in an airtight container in the fridge for up to one week, or freeze for up to one month. Reheat in the microwave.",
    ],
    source:
      "https://goodfoodbaddie.com/protein-waffles-recipe-grain-free-gluten-free/",
    imageUrl:
      "https://goodfoodbaddie.com/wp-content/uploads/2024/05/gluten-free-protein-waffles.jpg",
    tags: ["High protein", "Gluten-free", "Post-workout"],
  },
];

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function getRecipesByCategory(category: string): Recipe[] {
  if (category === "All") return recipes;
  return recipes.filter((r) => r.category === category);
}
