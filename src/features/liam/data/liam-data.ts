export type LiamListName = "Activities" | "Ideas";

export type LiamItem = {
  id: string;
  text: string;
};

export const liamLists: LiamListName[] = ["Activities", "Ideas"];

// Two running lists for Liam. Add lines to either over time.
export const liamContent: Record<LiamListName, LiamItem[]> = {
  Activities: [],
  Ideas: [{ id: "graduation-bear", text: "Graduation Bear" }],
};
