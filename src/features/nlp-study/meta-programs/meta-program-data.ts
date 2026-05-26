import categoriesJson from "../../../../docs/docs/nlp/meta-program-categories.json";
import cardsJson from "../../../../docs/docs/nlp/meta-program-cards.json";
import visualScenesJson from "../../../../docs/docs/nlp/visual-scene-prompts.json";

import type {
  MetaProgramCard,
  MetaProgramCategory,
  VisualScenePrompt,
} from "@/features/nlp-study/meta-programs/meta-program-types";

const visualScenesById = visualScenesJson as Record<string, VisualScenePrompt>;

const imagePathsByCardId: Record<string, string> = {
  motivation: "/images/meta-programs/motivation.png",
  representation: "/images/meta-programs/representational.png",
  "scale-scope": "/images/meta-programs/scale.png",
  "self-esteem": "/images/meta-programs/self-esteem.png",
  "stress-coping": "/images/meta-programs/stress-coping.png",
};

export const metaProgramCategories = (
  [...(categoriesJson as MetaProgramCategory[])]
).sort((first, second) => first.order - second.order);

export const metaProgramCards = (cardsJson as MetaProgramCard[]).map((card) => ({
  ...card,
  imagePath: imagePathsByCardId[card.id],
  visualScene: visualScenesById[card.id]?.visualScene ?? card.visualScene,
}));
