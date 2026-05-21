export type NlpTopicStatus = "Not Started" | "In Progress" | "Integrated";

export type NlpTopic = {
  id: string;
  title: string;
  overview: string;
  keyIdeas: string[];
  status: NlpTopicStatus;
};

export type NlpTopicGroup = {
  id: string;
  title: string;
  description: string;
  pathwayDay?: number;
  topics: NlpTopic[];
};

export type NlpCourseDay = {
  day: number;
  title: string;
  focus: string;
  groupIds: string[];
};

const groupKeyIdeas: Record<string, string[]> = {
  "NLP Foundations": [
    "Treat NLP as a practical model, not a fixed truth claim.",
    "Separate the map from the territory before choosing an intervention.",
    "Use communication models to notice structure, state, and meaning.",
  ],
  "Meta Programs": [
    "Notice recurring attention filters and motivation patterns.",
    "Use templates to observe patterns without over-labelling people.",
    "Expand flexibility by adding choices to existing preferences.",
  ],
  Listening: [
    "Prioritise presence before technique.",
    "Track sensory evidence, predicates, and shifts in state.",
    "Calibrate from observable cues instead of assumptions.",
  ],
  "Supporting and Rapport": [
    "Build safety through pacing before leading.",
    "Use matching, mirroring, and perspective shifts with care.",
    "Increase flexibility across positions, quadrants, and contexts.",
  ],
  States: [
    "Study state as a learnable mind-body pattern.",
    "Elicit and anchor useful states through clear sensory cues.",
    "Use state shifts to support performance and emotional regulation.",
  ],
  "Meta States and Framing": [
    "Work with thoughts and feelings about thoughts and feelings.",
    "Use frames to change meaning, response options, and direction.",
    "Keep patterns practical, ecological, and easy to review later.",
  ],
  "Precision Questioning": [
    "Listen for missing information, broad claims, and meaning leaps.",
    "Use clean questions to recover specificity.",
    "Turn vague goals into well-formed outcomes.",
  ],
  "Strategies and Modelling": [
    "Model sequences of representation, decision, and action.",
    "Use TOTE-style loops to notice tests, operations, and exits.",
    "Capture useful strategies so they can be practised and refined.",
  ],
  "Time-Lines": [
    "Map how time is encoded subjectively.",
    "Use timeline patterns to review history and future choices.",
    "Keep emotional change work grounded and well-paced.",
  ],
  "Milton Model and Trance": [
    "Study permissive language patterns and attention direction.",
    "Notice how ambiguity can invite internal search.",
    "Keep trance practice ethical, consent-based, and contextual.",
  ],
  "NLP Patterns": [
    "Use patterns as structured practice formats, not scripts to force.",
    "Track parts, positions, agreements, and integration outcomes.",
    "Capture reflections after each exercise while the learning is fresh.",
  ],
  "Appendices and Reference": [
    "Keep reference material easy to scan and revisit.",
    "Use tests and histories as study aids rather than final authority.",
    "Connect NLP, Neuro-Semantics, and related influences carefully.",
  ],
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createTopics(groupTitle: string, titles: string[]): NlpTopic[] {
  const keyIdeas = groupKeyIdeas[groupTitle];

  return titles.map((title) => ({
    id: `${slugify(groupTitle)}-${slugify(title)}`,
    keyIdeas,
    overview: `${title} is mapped as a concise study node from the NLP Practitioner pathway, ready for theory notes, workbook practice, diagrams, personal examples, and later source-backed expansion.`,
    status: "Not Started",
    title,
  }));
}

export const nlpTopicGroups: NlpTopicGroup[] = [
  {
    id: "nlp-foundations",
    title: "NLP Foundations",
    description:
      "The core models, assumptions, and distinctions used to orient the rest of the practitioner material.",
    pathwayDay: 1,
    topics: createTopics("NLP Foundations", [
      "What is NLP?",
      "NLP as a Model",
      "NLP Presuppositions",
      "Neuro-Semantic Presuppositions",
      "NLP Communication Model",
      "Map and Territory",
    ]),
  },
  {
    id: "meta-programs",
    title: "Meta Programs",
    description:
      "A map for noticing attention filters, motivation patterns, and flexible behavioural preferences.",
    pathwayDay: 2,
    topics: createTopics("Meta Programs", [
      "Meta-Programs Model",
      "Meta States as Meta Programs",
      "Meta-Program Template",
      "Meta Program Categories",
      "Detecting Meta Programs",
      "Expanding Meta Programs",
    ]),
  },
  {
    id: "listening",
    title: "Listening",
    description:
      "Presence, sensory acuity, calibration, and representational listening as the foundation for useful intervention.",
    pathwayDay: 2,
    topics: createTopics("Listening", [
      "Art of Being Present",
      "Benchmarks for Listening",
      "Sensory Acuity",
      "Calibration",
      "Representational Listening",
      "Representational System Predicates",
    ]),
  },
  {
    id: "supporting-and-rapport",
    title: "Supporting and Rapport",
    description:
      "Pacing, matching, mirroring, and perceptual flexibility for creating safety and shared direction.",
    pathwayDay: 3,
    topics: createTopics("Supporting and Rapport", [
      "Pacing",
      "Supporting through Pacing",
      "Matching and Mirroring",
      "Perceptual Flexibility",
      "Quadrants",
      "Native Perspectives",
    ]),
  },
  {
    id: "states",
    title: "States",
    description:
      "State elicitation, induction, anchoring, and state change patterns for performance and regulation.",
    pathwayDay: 4,
    topics: createTopics("States", [
      "State Management 101",
      "State Elicitation",
      "State Induction",
      "Anchoring",
      "Collapsing Anchors",
    ]),
  },
  {
    id: "meta-states-and-framing",
    title: "Meta States and Framing",
    description:
      "Meta-stating, frames, reframing, belief change, and pattern placeholders for shifting meaning and response.",
    pathwayDay: 5,
    topics: createTopics("Meta States and Framing", [
      "Meta-States Model",
      "Basic Meta-Stating Pattern",
      "Framing Model",
      "Reframing Criticism",
      "Six-Step Reframing",
      "Belief Change",
      "Meta Yes / Meta No",
      "Sphere of Excellence",
      "Swish Pattern",
      "Movie Rewind Pattern",
    ]),
  },
  {
    id: "precision-questioning",
    title: "Precision Questioning",
    description:
      "Meta Model categories and outcome questions for recovering useful specificity from vague language.",
    pathwayDay: 6,
    topics: createTopics("Precision Questioning", [
      "Meta Model",
      "Deletions",
      "Generalisations",
      "Distortions",
      "Basic Meta Model Questions",
      "Well-Formed Outcome Questions",
    ]),
  },
  {
    id: "strategies-and-modelling",
    title: "Strategies and Modelling",
    description:
      "Strategy elicitation, TOTE loops, notation, and modelling useful sequences across learning and influence.",
    pathwayDay: 7,
    topics: createTopics("Strategies and Modelling", [
      "Strategies Model",
      "TOTE Model",
      "NLP Notational System",
      "Strategy Elicitation",
      "Motivation Strategies",
      "Decision Strategies",
      "Learning Strategies",
      "Influencing Strategies",
    ]),
  },
  {
    id: "time-lines",
    title: "Time-Lines",
    description:
      "Subjective time coding and change patterns for reviewing history, decisions, and future direction.",
    pathwayDay: 7,
    topics: createTopics("Time-Lines", [
      "Time-Lines Model",
      "Encoding Time",
      "Time-Line Awareness Pattern",
      "Change Personal History",
      "Releasing Negative Emotions",
      "Decision Destroyer",
      "Reimprinting",
    ]),
  },
  {
    id: "milton-model-and-trance",
    title: "Milton Model and Trance",
    description:
      "Hypnotic language and trance process placeholders for later ethical, practice-led expansion.",
    pathwayDay: 8,
    topics: createTopics("Milton Model and Trance", [
      "Milton Model",
      "Hypnotic Language Patterns",
      "Hypnotic Processes",
      "Trance Induction",
    ]),
  },
  {
    id: "nlp-patterns",
    title: "NLP Patterns",
    description:
      "Applied pattern cards for somatic swish, parts work, agreement, negotiation, and meeting practice.",
    pathwayDay: 8,
    topics: createTopics("NLP Patterns", [
      "Somatic Swish",
      "Creating a New Part",
      "Agreement Frame",
      "Visual Squash",
      "Negotiating Between Parts",
      "Having Great Meetings",
    ]),
  },
  {
    id: "appendices-and-reference",
    title: "Appendices and Reference",
    description:
      "Reference material, tests, history, and wider Neuro-Semantic context for deeper later study.",
    pathwayDay: 8,
    topics: createTopics("Appendices and Reference", [
      "VIBES",
      "Representational Systems Test",
      "History of NLP",
      "Meta Model Reference",
      "Neuro-Semantics",
      "Program Influences",
    ]),
  },
];

export const nlpCoursePathway: NlpCourseDay[] = [
  {
    day: 1,
    focus: "Orient the map, language, assumptions, and communication model before adding techniques.",
    groupIds: ["nlp-foundations"],
    title: "Foundations and Communication",
  },
  {
    day: 2,
    focus: "Build the observation layer: meta-programs, presence, sensory acuity, and calibration.",
    groupIds: ["meta-programs", "listening"],
    title: "Listening and Pattern Detection",
  },
  {
    day: 3,
    focus: "Practise pacing, rapport, and perceptual flexibility across contexts.",
    groupIds: ["supporting-and-rapport"],
    title: "Supporting and Rapport",
  },
  {
    day: 4,
    focus: "Explore state elicitation, induction, anchoring, and collapsing anchors.",
    groupIds: ["states"],
    title: "States and Anchoring",
  },
  {
    day: 5,
    focus: "Use frames, meta-states, reframing, belief change, and core change patterns.",
    groupIds: ["meta-states-and-framing"],
    title: "Meta States and Framing",
  },
  {
    day: 6,
    focus: "Ask cleaner questions and turn vague intent into well-formed outcomes.",
    groupIds: ["precision-questioning"],
    title: "Precision Questioning",
  },
  {
    day: 7,
    focus: "Model strategies and timeline structures without adding unnecessary complexity.",
    groupIds: ["strategies-and-modelling", "time-lines"],
    title: "Strategies, Modelling, and Time",
  },
  {
    day: 8,
    focus: "Review Milton patterns, trance, applied NLP patterns, and reference material.",
    groupIds: [
      "milton-model-and-trance",
      "nlp-patterns",
      "appendices-and-reference",
    ],
    title: "Integration and Reference",
  },
];
