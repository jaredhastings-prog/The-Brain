import type {
  NlpTopic,
  NlpTopicGroup,
} from "@/features/nlp-study/data/nlp-repository-content";

export type NlpModelDiagramNode = {
  label: string;
  detail: string;
};

export type NlpContentStep = {
  text: string;
  prompts?: string[];
  promptBullets?: string[];
};

export type NlpContentSection = {
  heading: string;
  body?: string[];
  bullets?: string[];
  steps?: NlpContentStep[];
};

type NlpTopicReferenceContent = {
  overview?: string;
  overviewItems?: string[];
  models?: string[];
  modelSections?: NlpContentSection[];
  modelDiagram?: NlpModelDiagramNode[];
  patterns?: string[];
  patternSections?: NlpContentSection[];
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

const WHAT_IS_NLP_MODEL_SECTIONS: NlpContentSection[] = [
  {
    heading: "Neuro",
    body: [
      "The voluntary and autonomic nervous system through which experiences are processed by means of the five senses: visual, auditory, kinaesthetic, olfactory, and gustatory.",
      "Neurology is the physical foundation for the nervous system's abstracting process. It begins the mapping of the world outside by using non-linguistic sensory maps.",
    ],
    bullets: [
      "Visual - sights",
      "Auditory - sounds",
      "Kinaesthetic - feelings / sensations",
      "Olfactory - smell",
      "Gustatory - taste",
    ],
  },
  {
    heading: "Linguistic",
    body: [
      "Linguistic mapping is the symbolic mapping created inside about the territory outside.",
      "It involves higher cortical functions that make it possible to use symbols, create language, and map experience linguistically. This gives order and meaning to sensory representations through more abstract categories.",
    ],
    bullets: [
      "Language - words, sentences, syntax, grammar, and related symbolic structures",
      "Mathematics",
      "Music",
      "Non-propositional language - poetry, stories, narrative, and metaphor",
    ],
  },
  {
    heading: "Programming",
    body: [
      "Programming describes the processes and patterns used to order and sequence internal mapping.",
      "These patterns generate strategies for functioning and show up as skills, abilities, habits, and repeatable ways of communicating, leading, parenting, working, and relating.",
    ],
  },
];

const NLP_COMMUNICATION_MODEL_CONVERSATION: NlpContentSection[] = [
  {
    heading: "NLP Communications Model Conversation",
    steps: [
      {
        text: "Identify a challenge you are having now.",
        prompts: ["(How do you know it's a challenge?)"],
      },
      {
        text: "Practitioner to ask questions to explore client's map.",
        prompts: ["(Inquire into beliefs, values, memories.)"],
      },
      {
        text: "What is the movie that plays in mind when this stimulus occurs?",
        prompts: [
          "(If I was to peek into your movie mind what would I see, hear or feel.)",
        ],
      },
      {
        text: "How does the movie inform your State of Mind?",
        prompts: [
          "(What is the state you experience? How you experience it in the body? In your physiology?)",
        ],
      },
      {
        text: "How does it play out in your behaviour?",
      },
      {
        text: "If you could represent this differently what could you shift?",
        prompts: ["(How would that change the movie?)"],
      },
      {
        text: "What are you aware of now?",
        prompts: [
          "(That you were not aware before we had this conversation?)",
        ],
      },
    ],
  },
];

const EXPANDING_META_PROGRAMS_PATTERNS: NlpContentSection[] = [
  {
    heading: "Awareness of Meta Programs",
    steps: [
      {
        text: "Become aware of the meta-program.",
        prompts: [
          "(- What meta program do you suspect you run, where, when and with whom?)",
        ],
      },
      {
        text: "Identify contexts where you want to use a different meta-program filter.",
        prompts: [
          "(Then check the ecology and value of the meta program in those contexts.",
        ],
        promptBullets: [
          'Ask yourself; "Does it functionally fit for me to lean onto a different meta programs?")',
        ],
      },
      {
        text: "Give yourself permission to try it on for a day.",
        prompts: ["(- Do you have permission to shift it?)"],
      },
      {
        text: "Shift your consciousness to the other side of the continuum as you try on the other meta programs.",
      },
      {
        text: "Set multiple frames that will support using the preferred meta program.",
        prompts: ["(- What ideas or beliefs would support this filter?)"],
      },
    ],
  },
  {
    heading: "Expand the Meta-Program",
    steps: [
      {
        text: "Identify and check the ecology of the meta-program filter.",
        prompts: [
          "(- When, where, and how do you use this meta-program that does not serve you well?",
        ],
        promptBullets: [
          "How does it undermine your effectiveness in some way?)",
        ],
      },
      {
        text: "Describe the preferred Meta-program filter.",
        prompts: [
          "(- What Meta-level processing would you prefer to run your perceiving and valuing?",
        ],
        promptBullets: [
          "When, where, and how do you want this meta-program to govern your consciousness?)",
        ],
      },
      {
        text: "Try it out.",
        prompts: [
          "(Imaginatively adopt the new meta program, pretend to use it in sorting, perceiving, attending, etc. Notice how it seems, feels, works, etc. in some contexts where you think it would serve you better.",
          'Even if it seems a little "weird" and strange due to your unfamiliarity with looking at the world with that particular perceptual filter, notice what other feelings, beside discomfort, may arise with it.)',
        ],
      },
      {
        text: "Model it.",
        prompts: [
          "(- Do you know someone who uses this meta program?",
          "If so, then explore with that person his or her experience until you can fully step into that position. When you can, then step into 2nd position, so that you can see the world out of that person's Meta-program eyes, hearing what he or she hears, self-talking as he or she engages in self-dialogue and feeling what that person feels.",
        ],
        promptBullets: ["What's that like?)"],
      },
      {
        text: "Run a systems-check on the meta-program filter.",
        prompts: [
          "(Go Meta to an even higher level and consider what this meta program will do to you and for you in terms of perception, valuing, believing, behaving, etc.",
        ],
        promptBullets: [
          "What kind of a person would it begin to make you?",
          "What effect would it have on various aspects of your life?)",
        ],
      },
    ],
  },
];

const referenceContentByTitle: Record<string, NlpTopicReferenceContent> = {
  "What is NLP?": {
    models: [
      "NLP can be read through three connected layers: Neuro, Linguistic, and Programming.",
    ],
    modelSections: WHAT_IS_NLP_MODEL_SECTIONS,
  },
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
    patternSections: NLP_COMMUNICATION_MODEL_CONVERSATION,
  },
  "Expanding Meta Programs": {
    patternSections: EXPANDING_META_PROGRAMS_PATTERNS,
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
  const contentSections = [
    ...(referenceContent.modelSections ?? []),
    ...(referenceContent.patternSections ?? []),
  ]
    .map((section) =>
      [
        section.heading,
        section.body?.join(" ") ?? "",
        section.bullets?.join(" ") ?? "",
        section.steps
          ?.map((step) =>
            [
              step.text,
              step.prompts?.join(" ") ?? "",
              step.promptBullets?.join(" ") ?? "",
            ].join(" "),
          )
          .join(" ") ?? "",
      ].join(" "),
    )
    .join(" ");

  return [
    topic.title,
    referenceContent.overview ?? topic.overview,
    referenceContent.overviewItems?.join(" ") ?? "",
    topic.coreConcepts.join(" "),
    (referenceContent.models ?? topic.models).join(" "),
    referenceContent.modelDiagram
      ?.map((node) => `${node.label} ${node.detail}`)
      .join(" ") ?? "",
    (referenceContent.patterns ?? topic.patterns).join(" "),
    contentSections,
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
