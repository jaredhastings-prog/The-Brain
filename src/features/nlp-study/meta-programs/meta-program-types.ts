export type MetaProgramCategoryId =
  | "cognitive-thinking"
  | "emotional-feeling"
  | "cognitive-choosing"
  | "semantic-meta";

export type MetaProgramCategory = {
  id: MetaProgramCategoryId;
  title: string;
  subtitle: string;
  order: number;
};

export type MetaProgramContinuumType =
  | "two-point"
  | "three-point"
  | "multi-point";

export type MetaProgramCard = {
  id: string;
  number: number;
  title: string;
  categoryId: MetaProgramCategoryId;
  continuumType: MetaProgramContinuumType;
  continuum: string[];
  oneLine: string;
  frontSummary: string;
  definition: string;
  languageCues: string[];
  behaviouralSigns: string[];
  strengths: string[];
  blindSpots: string[];
  coachingPrompts: string[];
  visualScene: string;
  imagePath?: string;
  example: string;
  personalNotesPlaceholder: string;
};

export type VisualScenePrompt = {
  title: string;
  visualScene: string;
  imagePrompt: string;
};
