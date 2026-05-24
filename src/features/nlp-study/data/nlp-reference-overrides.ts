import type {
  NlpTopic,
  NlpTopicGroup,
} from "@/features/nlp-study/data/nlp-repository-content";

export type NlpModelDiagramNode = {
  label: string;
  detail: string;
};

type NlpTopicReferenceContent = {
  overview?: string;
  overviewItems?: string[];
  models?: string[];
  modelDiagram?: NlpModelDiagramNode[];
};

const NLP_PRESUPPOSITIONS = [
  "The map is not the territory; it is a symbolic representation of the territory.",
  "People respond according to their map of reality, not reality itself.",
  "The meaning of communication is the response you get.",
  "There is no failure, only feedback.",
  "The element in any system with the most flexibility exercises the greatest influence. This is the Law of Requisite Variety.",
  "Mind and body are part of the same neuro-linguistic system and influence each other in a circular way.",
  "People are not broken; they work perfectly well. It is the person's frames that may not work contextually.",
  "People have all the resources they need; they need to access, strengthen, and sequence them.",
  "Excellence and genius can be modelled when tasks and skills are chunked small enough. If someone can do something, it is a human possibility.",
  "Choice is always better than lack of choice.",
  "NLP adds choices and does not take choices away; people make the best choices available to them at the time.",
  "When calibrating to a person's reality during incongruity, the highest-quality information is behavioural.",
  "Memory and imagination use the same neurological circuits as external sensory awareness, so they strongly influence development.",
  "People are more than their actions, words, emotions, roles, and behaviours.",
  "Behind every behaviour is a positive intention.",
  "Resistance indicates lack of rapport, and resistance is also necessary information.",
  "There is an abundance of personal resources, plenty for all.",
  "It is never too late to have a happy childhood.",
];

const NEURO_SEMANTIC_PRESUPPOSITIONS = [
  "Energy flows where attention goes, as directed by intention.",
  "If you get serious, you get stupid.",
  "Each person creates meaning and constructs a unique Matrix of meaning.",
  "Clean indexing between class and member-of-class levels prevents meta-confusions and double binds.",
  "Questioning activates the Matrix and is one of the most powerful communication skills.",
  "Personal power and congruency come from applying a principle to self first.",
  "Being gloriously fallible inoculates against fear of failure, vulnerability, and mistakes.",
  "There is no sameness in the world, only change and processes.",
  "Results require action.",
  "Productivity comes from closing the knowing-doing gap so knowledge becomes embodied skill.",
  "Only sensory-specific feedback is clean enough to be useful, and only when it is requested.",
  "The sanity line is drawn between responsibility to and responsibility for.",
  "Frames-by-inference operate in everything people think and say.",
  "Where there is a frame, there is a game; where there is a game, there is a frame.",
  "Winning the inner game makes the outer game easier.",
  "Someone is always setting the frames; whoever sets the frame controls the game.",
  "The name of the game is to name the game.",
];

const NLP_COMMUNICATION_MODEL_OVERVIEW = [
  "Communication is a mapping process: external events are brought inside through neurological and mental maps.",
  "Mapping deletes, distorts, and generalises information, then represents experience as internal sights, sounds, sensations, smells, tastes, and language.",
  "Communication is verbal and non-verbal. Silence, gesture, movement, breathing, tone, and posture communicate continuously.",
  "Communication creates states. Internal movies and language send messages to the nervous system and generate mind-body-emotion states.",
  "Communication happens state-to-state. People communicate from the states they are in to the states others are in.",
  "Communication is filtered by values, beliefs, knowledge, history, memories, imagination, anticipations, meanings, frames, intentions, identity, and capabilities.",
  "Communication is layered. Overt messages sit inside frames, intentions, meanings, emotions, motives, agendas, and objectives.",
  "Communication requires seeing and listening. Effective communication depends on sensory awareness, calibration, receptiveness, rapport, and real-time feedback.",
  "High-quality communication uses feedback and feedforward loops: feedback mirrors what was received; feedforward shares interpretation and meaning.",
  "Communication structures experience. Language calls reality into being, maps skills and strategies, and expresses understanding.",
  "Communication evokes responses and states. Transformational communication induces states of rapport, curiosity, learning, openness, motivation, decision, creation, and integration.",
];

const NLP_COMMUNICATION_MODEL_DIAGRAM: NlpModelDiagramNode[] = [
  {
    label: "Reality / External Events",
    detail: "Events, signals, people, contexts, and sensory data outside the nervous system.",
  },
  {
    label: "Deletion, Distortion, Generalisation",
    detail: "The primary filters that simplify, reshape, and organise incoming information.",
  },
  {
    label: "Cognitive Intentions",
    detail: "Motives, agendas, objectives, attention, and self-reflexive states in the back of the mind.",
  },
  {
    label: "Sensory Systems",
    detail: "Visual, auditory, kinaesthetic, olfactory, and gustatory channels used to code experience.",
  },
  {
    label: "Language",
    detail: "Words, symbols, concepts, categories, self-talk, and linguistic structures.",
  },
  {
    label: "Beliefs and Values",
    detail: "Evaluative filters that determine what matters, what is true, and what is possible.",
  },
  {
    label: "Memories",
    detail: "Stored experiences that influence interpretation, expectation, and emotional response.",
  },
  {
    label: "Decisions / Time Coding",
    detail: "Past decisions, future expectations, and the way time is represented internally.",
  },
  {
    label: "Internal Movie / Projection",
    detail: "The inner cinema of sights, sounds, sensations, language, meanings, and imagined reality.",
  },
  {
    label: "Emotional State",
    detail: "The mind-body-emotion state generated by the internal map.",
  },
  {
    label: "Physiology",
    detail: "Breathing, posture, movement, muscle tone, gesture, facial expression, and nervous-system response.",
  },
  {
    label: "Behaviour / Response / Reaction",
    detail: "The outward action, communication, habit, reaction, or choice produced by the state.",
  },
];

const referenceContentByTitle: Record<string, NlpTopicReferenceContent> = {
  "NLP Communication Model": {
    overview:
      "The NLP Communication Model explains how people map reality, filter experience, create internal movies, generate states, and respond through physiology and behaviour.",
    overviewItems: NLP_COMMUNICATION_MODEL_OVERVIEW,
    models: [
      "Recreated NLP Communication Model diagram: external reality is filtered through deletion, distortion, generalisation, intentions, sensory systems, language, beliefs, values, memories, decisions, and time coding.",
      "The filtered map becomes an internal movie or projection of reality, which generates emotional state, physiology, and behaviour.",
      "Use the model to locate the intervention point: sensory coding, language, belief, value, memory, decision, state, physiology, or feedback loop.",
    ],
    modelDiagram: NLP_COMMUNICATION_MODEL_DIAGRAM,
  },
  "NLP Presuppositions": {
    overview:
      "NLP presuppositions are the operating frames that govern effective communication, coaching, state management, behavioural flexibility, and change work.",
    overviewItems: NLP_PRESUPPOSITIONS,
  },
  "Neuro-Semantic Presuppositions": {
    overview:
      "Neuro-Semantic presuppositions extend NLP into frames, meanings, meta-states, self-application, responsibility, and the inner game of performance.",
    overviewItems: NEURO_SEMANTIC_PRESUPPOSITIONS,
  },
};

export function getNlpTopicReferenceContent(topic: NlpTopic) {
  return referenceContentByTitle[topic.title] ?? {};
}

export function getNlpTopicSearchText(topic: NlpTopic) {
  const referenceContent = getNlpTopicReferenceContent(topic);

  return [
    topic.title,
    referenceContent.overview ?? topic.overview,
    referenceContent.overviewItems?.join(" ") ?? "",
    topic.coreConcepts.join(" "),
    (referenceContent.models ?? topic.models).join(" "),
    referenceContent.modelDiagram
      ?.map((node) => `${node.label} ${node.detail}`)
      .join(" ") ?? "",
    topic.patterns.join(" "),
    topic.examples.join(" "),
    topic.personalNotes.join(" "),
    topic.resources.join(" "),
    topic.linkedCaptures.join(" "),
  ].join(" ");
}

export function withNlpReferenceOverrides(groups: NlpTopicGroup[]) {
  return groups.map((group) => {
    if (group.id !== "nlp-foundations") {
      return group;
    }

    const hasNeuroSemanticTopic = group.topics.some(
      (topic) => topic.title === "Neuro-Semantic Presuppositions",
    );

    if (hasNeuroSemanticTopic) {
      return group;
    }

    const neuroSemanticTopic: NlpTopic = {
      id: "nlp-foundations-neuro-semantic-presuppositions",
      title: "Neuro-Semantic Presuppositions",
      overview: referenceContentByTitle["Neuro-Semantic Presuppositions"].overview ?? "",
      coreConcepts: [
        "Neuro-Semantics extends NLP into frames, meanings, meta-states, self-application, responsibility, and the inner game of performance.",
        "Frames govern perception, emotion, choice, action, feedback, and performance.",
      ],
      models: [
        "Frame stack placeholder: attention -> intention -> meaning -> state -> action -> feedback.",
        "Reference table placeholder: presupposition, frame, practical implication, coaching question.",
      ],
      patterns: [
        "Name the operating frame, test its effect, and choose the frame that creates responsibility, action, and clean feedback.",
        "Apply the frame to self first before using it as a coaching distinction.",
      ],
      examples: [
        "A client who fears mistakes can use glorious fallibility as a stabilising frame for learning, action, and feedback.",
        "A leader who feels responsible for everyone can separate responsibility to others from responsibility for others.",
      ],
      personalNotes: [
        "Add Jared's own coaching examples, client observations, metaphors, and personal integrations for Neuro-Semantic Presuppositions here.",
        "Capture distinctions that prove useful in business, parenting, health, relationships, or personal operating system design.",
      ],
      resources: [
        "Add trusted references, diagrams, terms, and external links connected to Neuro-Semantic Presuppositions.",
        "Add concise summaries only; keep original documents outside the interface.",
      ],
      linkedCaptures: [
        "Future: show Global Capture Inbox items tagged with Neuro-Semantic Presuppositions.",
        "Future: connect relevant notes, reflections, voice captures, and applied examples from Jared Brain.",
      ],
    };

    const topics = group.topics.flatMap((topic) =>
      topic.title === "NLP Presuppositions"
        ? [topic, neuroSemanticTopic]
        : [topic],
    );

    return { ...group, topics };
  });
}
