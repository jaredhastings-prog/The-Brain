export type LiamListName = "Activities" | "Ideas";

export type LiamItem = {
  id: string;
  text: string;
};

export const liamLists: LiamListName[] = ["Activities", "Ideas"];

// Two running lists for Liam. Add lines to either over time.
export const liamContent: Record<LiamListName, LiamItem[]> = {
  Activities: [
    { id: "activity-1", text: "Plan a regular one-on-one day" },
    { id: "activity-2", text: "Start a shared project to build over time" },
  ],
  Ideas: [
    { id: "idea-1", text: "Take a day trip somewhere neither of you has been" },
    { id: "idea-2", text: "Teach him a skill you know well" },
    { id: "idea-3", text: "Write down a memory or lesson to share with him later" },
  ],
};
