import categoriesJson from "../../../../docs/docs/nlp/meta-program-categories.json";
import cardsJson from "../../../../docs/docs/nlp/meta-program-cards-starter.json";
import visualScenesJson from "../../../../docs/docs/nlp/visual-scene-prompts-starter.json";

import type {
  MetaProgramCard,
  MetaProgramCategory,
  VisualScenePrompt,
} from "@/features/nlp-study/meta-programs/meta-program-types";

const visualScenesById = visualScenesJson as Record<string, VisualScenePrompt>;

export const metaProgramCategories = (
  [...(categoriesJson as MetaProgramCategory[])]
).sort((first, second) => first.order - second.order);

export const metaProgramCards = (cardsJson as MetaProgramCard[]).map((card) => ({
  ...card,
  visualScene: visualScenesById[card.id]?.visualScene ?? card.visualScene,
}));
