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
  {
    id: "biscoff-protein-donuts",
    title: "Biscoff Protein Donuts (Dairy & Gluten-Free)",
    description:
      "Grain-free donuts made with almond flour and protein powder — a healthier and delicious way to enjoy the flavors of cookie butter.",
    category: "Snacks",
    prepTime: "10 min",
    cookTime: "10 min",
    servings: 6,
    ingredients: [
      "1 cup (100g) almond flour",
      "1/4 cup (25g) protein powder (plain or vanilla)",
      "1 teaspoon ground cinnamon",
      "1 teaspoon baking powder",
      "1/4 teaspoon fine sea salt",
      "1/4 cup (70g) pure maple syrup",
      "1 egg (50g)",
      "1 egg white (38g)",
      "2 tablespoons (25g) melted and cooled coconut oil",
      "1 teaspoon vanilla extract",
      "1/3 cup (60g) cookie butter (Biscoff, Speculoos, or Granola Butter)",
    ],
    method: [
      "Preheat oven to 350°F (175°C) and lightly grease a 6-donut pan.",
      "Whisk together almond flour, protein powder, cinnamon, baking powder, and salt.",
      "Add maple syrup, egg, egg white, vanilla, and coconut oil; stir until combined.",
      "Transfer the batter to a piping bag and pipe into the donut pan.",
      "Bake 10 minutes until firm and golden.",
      "Cool completely before removing from the pan.",
      "Microwave the cookie butter 15-30 seconds until melted.",
      "Dip donut tops in the melted cookie butter. Serve, or refrigerate up to 5 days.",
    ],
    source:
      "https://www.makingthymeforhealth.com/biscoff-protein-donuts-dairy-free-gluten-free/",
    imageUrl:
      "https://www.makingthymeforhealth.com/wp-content/uploads/2024/07/Biscoff-Protein-Donuts-dairy-free-gluten-free-_-2-700x1050.jpg",
    tags: ["High protein", "Gluten-free", "Dairy-free"],
  },
  {
    id: "gluten-free-chocolate-chip-cookies",
    title: "Gluten-Free Chocolate Chip Cookies",
    description:
      "Chewy cookies with crisp golden edges and gooey centers, featuring brown butter, almond flour, and a 30-minute rest for optimal flavor development.",
    category: "Snacks",
    prepTime: "15 min (+30 min rest)",
    cookTime: "10 min",
    servings: 18,
    ingredients: [
      "1 1/3 cups (200g) gluten-free measure-for-measure flour",
      "1/4 cup (25g) almond flour",
      "1 teaspoon baking soda",
      "1/2 teaspoon kosher salt",
      "1/2 cup (113g) butter",
      "1 tablespoon milk",
      "3/4 cup (160g) brown sugar",
      "1/4 cup (50g) granulated sugar",
      "1 large egg",
      "2 teaspoons vanilla extract",
      "1 cup (170g) chocolate chips",
      "Sea salt (optional, for sprinkling)",
    ],
    method: [
      "Whisk together gluten-free flour, almond flour, baking soda, and salt; set aside.",
      "Melt butter in a medium skillet over medium-low heat, stirring occasionally.",
      "Once foaming, stir continuously until the butter turns golden brown with a nutty aroma; pour into a bowl immediately.",
      "Add milk, brown sugar, and granulated sugar to the brown butter; whisk to combine.",
      "Whisk in egg and vanilla until smooth and creamy.",
      "Using a rubber spatula, mix in the dry ingredients until combined; stir in chocolate chips.",
      "Cover the bowl and let the dough rest at room temperature for 30 minutes (or refrigerate up to 5 days).",
      "Preheat oven to 350°F (175°C); line baking sheets with parchment paper.",
      "Scoop dough into 2-tablespoon balls, spacing 2 inches apart.",
      "Bake 10-12 minutes until the edges are golden and the center is set.",
      "Cool on the baking sheet for 5 minutes; sprinkle with sea salt if desired; transfer to a wire rack.",
    ],
    source:
      "https://meaningfuleats.com/the-best-gluten-free-chocolate-chip-cookies/",
    imageUrl:
      "https://meaningfuleats.com/wp-content/uploads/2024/04/gluten-free-chocolate-chip-cookies.jpg",
    tags: ["Gluten-free", "Baking"],
  },
];

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function getRecipesByCategory(category: string): Recipe[] {
  if (category === "All") return recipes;
  return recipes.filter((r) => r.category === category);
}
