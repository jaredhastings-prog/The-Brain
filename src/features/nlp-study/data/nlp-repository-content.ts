export type NlpTopic = {
  id: string;
  title: string;
  overview: string;
  coreConcepts: string[];
  models: string[];
  patterns: string[];
  examples: string[];
};

export type NlpTopicGroup = {
  id: string;
  title: string;
  description: string;
  topics: NlpTopic[];
};

const groupCoreConcepts: Record<string, string[]> = {
  "NLP Foundations": [
    "NLP as a practical modelling lens",
    "Subjective maps, meanings, and behavioural structure",
    "Communication patterns across language, state, and attention",
  ],
  "Meta Programs": [
    "Attention filters and sorting preferences",
    "Motivation and decision tendencies",
    "Pattern expansion through added choice",
  ],
  Listening: [
    "Presence and sensory acuity",
    "Calibration from observable cues",
    "Representational predicates and state shifts",
  ],
  "Supporting and Rapport": [
    "Pacing before leading",
    "Matching, mirroring, and rapport signals",
    "Perceptual flexibility across positions and contexts",
  ],
  States: [
    "State as a mind-body pattern",
    "State elicitation and induction",
    "Anchoring and state change structures",
  ],
  "Meta States and Framing": [
    "Thoughts and feelings about thoughts and feelings",
    "Meaning frames and response frames",
    "Reframing, belief change, and pattern ecology",
  ],
  "Precision Questioning": [
    "Recovering missing information",
    "Challenging vague or global language",
    "Turning intent into well-formed outcomes",
  ],
  "Strategies and Modelling": [
    "Representational sequences",
    "Tests, operations, and exit points",
    "Capturing useful decision and learning patterns",
  ],
  "Time-Lines": [
    "Subjective time encoding",
    "Historical review and future orientation",
    "Decision, emotion, and identity patterns across time",
  ],
  "Milton Model and Trance": [
    "Permissive language patterns",
    "Attention direction and internal search",
    "Ethical trance and hypnotic process notes",
  ],
  "NLP Patterns": [
    "Reusable intervention structures",
    "Parts, positions, agreements, and integration",
    "Context-specific adaptations and examples",
  ],
  "Appendices and Reference": [
    "Reference maps and quick lookup material",
    "Historical and influence notes",
    "Tests, glossaries, and comparison tables",
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
  return titles.map((title) => ({
    id: `${slugify(groupTitle)}-${slugify(title)}`,
    coreConcepts: groupCoreConcepts[groupTitle],
    examples: [
      "Personal examples and observed communication patterns can be stored here.",
      "Cross-domain examples from business, coaching, relationships, health, or learning can be linked later.",
    ],
    models: [
      `${title} diagram placeholder`,
      "Reference graphics, tables, process maps, and annotated model images can live here.",
    ],
    overview: `${title} is a repository entry for NLP reference material, diagrams, examples, personal notes, resources, and future linked captures.`,
    patterns: [
      "Technique notes, pattern steps, distinctions, and application cautions can be added here.",
      "Related methods and adjacent patterns can be cross-linked as the repository grows.",
    ],
    title,
  }));
}

export const nlpTopicGroups: NlpTopicGroup[] = [
  {
    id: "nlp-foundations",
    title: "NLP Foundations",
    description:
      "Core models, assumptions, and distinctions that orient the wider NLP reference library.",
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
      "Reference material for attention filters, motivation patterns, and behavioural preferences.",
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
      "Presence, sensory acuity, calibration, and representational listening references.",
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
      "Pacing, matching, mirroring, and perceptual flexibility reference entries.",
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
      "State management, elicitation, induction, anchoring, and state change reference material.",
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
      "Meta-states, framing, reframing, belief change, and meaning-shift references.",
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
      "Meta Model categories and outcome-questioning references for cleaner language work.",
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
      "Strategy elicitation, TOTE loops, notation, and modelling reference entries.",
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
      "Subjective time coding and time-line pattern references for later expansion.",
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
      "Milton Model, hypnotic language, trance processes, and induction reference material.",
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
      "Applied pattern references for parts work, swishes, agreements, negotiation, and meetings.",
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
      "Reference material, tests, history, Neuro-Semantics notes, and influence maps.",
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
