import categoriesJson from "../../../../docs/docs/nlp/meta-program-categories.json";
import cardsJson from "../../../../docs/docs/nlp/meta-program-cards.json";
import visualScenesJson from "../../../../docs/docs/nlp/visual-scene-prompts.json";

import type {
  MetaProgramCard,
  MetaProgramCategory,
  VisualScenePrompt,
} from "@/features/nlp-study/meta-programs/meta-program-types";

const visualScenesById = visualScenesJson as Record<string, VisualScenePrompt>;

const cardOverridesById: Record<string, Partial<MetaProgramCard>> = {
  "altitude-stage": {
    id: "conventional",
    title: "Conventional",
    continuumType: "two-point",
    continuum: ["Conformist", "Non Conformist"],
    oneLine:
      "How strongly a person orients to accepted norms versus independent non-conformity.",
    frontSummary:
      "How strongly a person orients to accepted norms versus independent non-conformity.",
    definition:
      "Conventional describes whether a person prefers to work inside established expectations, norms, and accepted ways of behaving, or outside them with independent, unconventional choices.",
    languageCues: [
      "Conformist: accepted, proper, standard, expected, fitting in",
      "Non Conformist: different, independent, unconventional, original",
    ],
    behaviouralSigns: [
      "Conformist: checks what is normal or approved before acting",
      "Non Conformist: questions norms and chooses a different route",
    ],
    strengths: [
      "Conformist: social fit, predictability, respect for standards",
      "Non Conformist: originality, independence, challenging stale assumptions",
    ],
    blindSpots: [
      "Conformist: over-adapting to approval",
      "Non Conformist: opposing norms even when they are useful",
    ],
    coachingPrompts: [
      "How important is social fit in this context?",
      "Where are you choosing the norm, and where are you choosing independence?",
    ],
    visualScene:
      "Two people choosing between an approved pathway and an independent alternative.",
    example:
      "A conformist follows the accepted process; a non-conformist creates a different approach when the standard path feels limiting.",
  },
};

const imagePathsByCardId: Record<string, string> = {
  "attitude-sort": "/images/meta-programs/attitude-sort.png",
  attention: "/images/meta-programs/attention.png",
  "authority-source": "/images/meta-programs/authority.png",
  causation: "/images/meta-programs/causation.png",
  "change-adopter": "/images/meta-programs/change-adopter.png",
  "classification-scale": "/images/meta-programs/classification-scale.png",
  "communication-channel":
    "/images/meta-programs/communication-channel.png",
  "completion-sort": "/images/meta-programs/completion.png",
  "convincer-demonstration":
    "/images/meta-programs/convincer-demonstration.png",
  "convincer-representation":
    "/images/meta-programs/convincer-representation.png",
  conventional: "/images/meta-programs/conventional.png",
  "decision-making": "/images/meta-programs/decision-making.png",
  directness: "/images/meta-programs/directness.png",
  "durability-of-intent": "/images/meta-programs/durability.png",
  "emotional-containment":
    "/images/meta-programs/emotional-containment.png",
  dominance: "/images/meta-programs/dominance.png",
  "ego-strength": "/images/meta-programs/ego-strength.png",
  epistemological: "/images/meta-programs/epistemological.png",
  exuberance: "/images/meta-programs/exuberance.png",
  focus: "/images/meta-programs/focus.png",
  buying: "/images/meta-programs/buying.png",
  "goal-striving": "/images/meta-programs/goal-striving.png",
  "information-kind": "/images/meta-programs/information-kind.png",
  "information-staging": "/images/meta-programs/information-staging.png",
  interactive: "/images/meta-programs/interactive.png",
  management: "/images/meta-programs/management.png",
  adaptation: "/images/meta-programs/adaptation.png",
  "modus-operandi": "/images/meta-programs/modus-operandi.png",
  morality: "/images/meta-programs/morality.png",
  motivation: "/images/meta-programs/motivation.png",
  "movie-position": "/images/meta-programs/movie-position.png",
  nature: "/images/meta-programs/nature.png",
  "organisational-style": "/images/meta-programs/organisational-style.png",
  "persistence-sort": "/images/meta-programs/persistence-sort.png",
  philosophical: "/images/meta-programs/philosophical.png",
  preference: "/images/meta-programs/preference.png",
  "quality-of-life": "/images/meta-programs/quality-of-life.png",
  representation: "/images/meta-programs/representational.png",
  "relationship-comparison":
    "/images/meta-programs/relationship-comparison.png",
  rejuvenation: "/images/meta-programs/rejuvenation.png",
  "responsibility-sort": "/images/meta-programs/responsibility-sort.png",
  "risk-taking": "/images/meta-programs/risk-taking.png",
  "scale-scope": "/images/meta-programs/scale.png",
  "scenario-type": "/images/meta-programs/scenario-type.png",
  "self-confidence": "/images/meta-programs/self-confidence.png",
  "self-esteem": "/images/meta-programs/self-esteem.png",
  "self-experience": "/images/meta-programs/self-experience.png",
  "self-instruction": "/images/meta-programs/self-instruction.png",
  "self-integrity": "/images/meta-programs/self-integrity.png",
  "self-monitoring": "/images/meta-programs/self-monitoring.png",
  "social-convincer": "/images/meta-programs/social-convincer.png",
  "social-presentation": "/images/meta-programs/social-presentation.png",
  "somatic-response": "/images/meta-programs/somatic-response.png",
  speed: "/images/meta-programs/speed.png",
  "stress-coping": "/images/meta-programs/stress-coping.png",
  "stream-of-consciousness":
    "/images/meta-programs/stream-of-consciousness.png",
  "time-experience": "/images/meta-programs/time-experience.png",
  "time-processing": "/images/meta-programs/time-processing.png",
  values: "/images/meta-programs/values.png",
  "work-style": "/images/meta-programs/work-style.png",
};

export const metaProgramCategories = (
  [...(categoriesJson as MetaProgramCategory[])]
).sort((first, second) => first.order - second.order);

export const metaProgramCards = (cardsJson as MetaProgramCard[]).map((card) => {
  const cardWithOverrides = {
    ...card,
    ...cardOverridesById[card.id],
  };

  return {
    ...cardWithOverrides,
    imagePath: imagePathsByCardId[cardWithOverrides.id],
    visualScene:
      visualScenesById[cardWithOverrides.id]?.visualScene ??
      cardWithOverrides.visualScene,
  };
});
