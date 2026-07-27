export type LiamIdeaCategory =
  | "Activities"
  | "Outings"
  | "Learning"
  | "Keepsakes"
  | "Everyday"
  | "Other";

export type LiamIdea = {
  id: string;
  title: string;
  category: LiamIdeaCategory;
  notes?: string;
};

export const liamIdeaCategories: LiamIdeaCategory[] = [
  "Activities",
  "Outings",
  "Learning",
  "Keepsakes",
  "Everyday",
  "Other",
];

// A running register of ideas for things to do with and for Liam.
// Add entries over time — these starters are placeholders to replace.
export const liamIdeas: LiamIdea[] = [
  {
    id: "one-on-one-day",
    title: "Plan a regular one-on-one day",
    category: "Activities",
    notes: "Just the two of you — his choice of what to do.",
  },
  {
    id: "shared-project",
    title: "Start a shared project to build over time",
    category: "Activities",
  },
  {
    id: "somewhere-new",
    title: "Take a day trip somewhere neither of you has been",
    category: "Outings",
  },
  {
    id: "teach-a-skill",
    title: "Teach him a skill you know well",
    category: "Learning",
    notes: "Cooking, tools, driving, money — whatever's next for him.",
  },
  {
    id: "record-a-memory",
    title: "Write down a memory or lesson to share with him later",
    category: "Keepsakes",
  },
];
