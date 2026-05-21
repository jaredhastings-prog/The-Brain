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

const nlpFoundationTopics: NlpTopic[] = [
  {
    id: "nlp-foundations-what-is-nlp",
    title: "What is NLP?",
    overview:
      "NLP is a practical communication and modelling framework for noticing how people turn sensory experience into internal maps, language, state, and behaviour. For coaching, it is useful as a way to ask: what is the client mapping, how are they coding it, and what extra resources or choices can be added?",
    coreConcepts: [
      "Neuro: experience is processed through the nervous system and the senses, including visual, auditory, kinaesthetic, olfactory, and gustatory channels.",
      "Linguistic: people give sensory experience meaning through words, symbols, stories, categories, and internal dialogue.",
      "Programming: repeated internal sequences become strategies, habits, skills, communication patterns, and state responses.",
      "NLP is most useful when treated as a descriptive model of subjective experience rather than a fixed theory of reality.",
    ],
    models: [
      "Neuro / Linguistic / Programming reference map",
      "Experience loop: sensory input, internal representation, meaning, state, behaviour, feedback",
      "Diagram placeholder for how external events become internal maps and responses",
    ],
    patterns: [
      "Use NLP as a structure lens: what is seen, heard, felt, said, believed, and then done?",
      "Separate sensory description from interpretation before choosing a coaching intervention.",
      "Reflection placeholder: choose a real coaching or business moment and map the sensory data, language, state, and behaviour sequence.",
    ],
    examples: [
      "A client saying, 'I cannot see a way forward,' may be organising the problem visually, not just metaphorically.",
      "A business decision can shift when the internal image, self-talk, and body state behind the decision are separated and reviewed.",
    ],
  },
  {
    id: "nlp-foundations-nlp-as-a-model",
    title: "NLP as a Model",
    overview:
      "NLP works best as a model: a practical map for observing, testing, refining, and applying patterns of human experience. A model is more than a technique; it needs explanatory ideas, clear variables, operating principles, and usable applications.",
    coreConcepts: [
      "Theory: the explanatory frame for why the system may work and how ideas can be tested or refined.",
      "Variables and elements: the necessary parts of the model, such as representations, language, state, frames, strategies, and behaviour.",
      "Guiding principles: the presuppositions and operating assumptions that shape how the model is used.",
      "Technologies or patterns: the practical steps that turn the model into usable coaching, communication, and self-management tools.",
    ],
    models: [
      "Four-part model canvas: theory, variables, guiding principles, applications",
      "Reference diagram placeholder comparing model, tool, pattern, and technique",
      "Model lineage placeholder: map/territory, representational systems, meta-programs, TOTE, strategies, and NLP patterns",
    ],
    patterns: [
      "Before using a technique, identify the model assumption, the variable being changed, and the response evidence you will watch for.",
      "Treat every intervention as a testable hypothesis and let the client's response guide refinement.",
      "Repository prompt: capture examples where a model distinction helped simplify a messy coaching conversation.",
    ],
    examples: [
      "A reframe is not just a clever sentence; it rests on a model of meaning, frames, state, and response.",
      "A strategy elicitation works because NLP treats behaviour as a sequence that can be mapped, tested, and adjusted.",
    ],
  },
  {
    id: "nlp-foundations-map-and-territory",
    title: "Map and Territory",
    overview:
      "The map is a person's internal representation of reality; the territory is the wider reality being represented. NLP keeps these separate because people usually respond to their map of an event, not the event in its full complexity.",
    coreConcepts: [
      "Maps are symbolic, sensory, linguistic, emotional, and incomplete.",
      "People delete, distort, and generalise information as they build internal maps.",
      "A map can be useful, limiting, outdated, or contextually inaccurate without being 'wrong' in a moral sense.",
      "Coaching often begins by helping someone notice the difference between observable territory and interpreted map.",
    ],
    models: [
      "Territory to map flow: event, sensory filters, internal representation, meaning, state, behaviour",
      "Map/territory gap diagram placeholder",
      "Distinction table placeholder: observable data, interpretation, emotion, action",
    ],
    patterns: [
      "Ask: what happened, what did you make it mean, and how did that meaning affect your state or choice?",
      "Use feedback to update the map instead of defending the old interpretation.",
      "Workbook reflection placeholder: identify a past challenge and separate the territory from the meanings added to it.",
    ],
    examples: [
      "'They ignored me' may be a map; 'they did not reply to my message by Friday' is closer to territory.",
      "A leader may feel blocked by a market story until the story is separated from the current facts, signals, and options.",
    ],
  },
  {
    id: "nlp-foundations-nlp-communication-model",
    title: "NLP Communication Model",
    overview:
      "The NLP Communication Model describes how people take in events, filter them through their maps, create internal representations, enter states, and respond through physiology and behaviour. It is a practical reference for coaching conversations because it shows where meaning and response are being constructed.",
    coreConcepts: [
      "People map external events internally through sensory representations, language, memories, beliefs, values, and perceptual filters.",
      "Deletion, distortion, and generalisation simplify experience but can also create blind spots.",
      "Communication is verbal and non-verbal; silence, physiology, breathing, gesture, tone, and timing all carry information.",
      "Communication happens state-to-state and across multiple layers of intention, meaning, emotion, and frame.",
      "High-quality communication uses feedback and feedforward loops to check what was received and what meaning was made.",
    ],
    models: [
      "External event -> filters -> internal representation -> state -> physiology -> behaviour",
      "Two-way communication loop with feedback and feedforward",
      "Diagram placeholder for how beliefs, values, memories, and meta-programs influence the map",
    ],
    patterns: [
      "Explore a challenge by asking into the client's map: beliefs, values, memories, inner movie, state, and response.",
      "Calibrate behaviour before assuming meaning; the highest quality information is often observable.",
      "Workbook conversation placeholder: map a current challenge through the communication model without trying to fix it too early.",
    ],
    examples: [
      "Two people can hear the same sentence and respond differently because their filters and internal representations differ.",
      "A coach can slow a conversation down by checking the inner movie, the self-talk, the body state, and the intended response separately.",
    ],
  },
  {
    id: "nlp-foundations-nlp-presuppositions",
    title: "NLP Presuppositions",
    overview:
      "NLP presuppositions are operating frames for communication, coaching, and self-management. They are best held as useful attitudes rather than dogma: frames that help a practitioner stay flexible, curious, behavioural, and resource-oriented.",
    coreConcepts: [
      "The map is not the territory, and people respond according to their map of reality.",
      "The meaning of communication is the response it gets, which puts attention on feedback rather than intention alone.",
      "There is no failure, only feedback that can refine the next move.",
      "The person or system with the most flexibility has the most influence.",
      "Mind and body influence each other as one system.",
      "People are more than their behaviours and can often access more resources than their current state suggests.",
    ],
    models: [
      "Presupposition frame stack: perception, communication, feedback, choice, resourcefulness",
      "Reference table placeholder for core presuppositions and coaching implications",
      "Behavioural evidence map for testing whether a presupposition is useful in context",
    ],
    patterns: [
      "Use presuppositions as stance checks before intervening: am I adding choice, tracking feedback, and staying behavioural?",
      "When stuck, pick one presupposition and ask how it would change the next question, frame, or response.",
      "Workbook reflection placeholder: choose one presupposition and translate it into a memorable coaching attitude for daily use.",
    ],
    examples: [
      "If a client resists, the repository frame is not 'they are difficult'; it may be a rapport signal or a map mismatch.",
      "If an action did not work, 'feedback' keeps attention on learning and adjustment rather than self-criticism.",
    ],
  },
  {
    id: "nlp-foundations-representational-systems",
    title: "Representational Systems",
    overview:
      "Representational systems are the sensory channels people use to code inner experience: seeing, hearing, feeling, smelling, tasting, and language-based processing. They form the raw material of the internal 'movies' people use to remember, imagine, decide, and respond.",
    coreConcepts: [
      "Visual representations organise experience through images, perspective, distance, brightness, colour, movement, and location.",
      "Auditory representations organise experience through tone, volume, rhythm, tempo, location, and voice.",
      "Kinaesthetic representations organise experience through sensation, pressure, movement, texture, temperature, and body feeling.",
      "Auditory digital or language-based processing organises experience through words, logic, categories, and internal dialogue.",
      "Representational predicates in speech can hint at how someone is currently processing information.",
    ],
    models: [
      "VAKOG plus auditory digital reference map",
      "Inner movie qualities map: visual, auditory, kinaesthetic, language, smell, taste, and balance",
      "Predicate listening table placeholder for visual, auditory, kinaesthetic, and language cues",
    ],
    patterns: [
      "Listen for predicates such as seeing, hearing, feeling, grasping, clear, loud, heavy, or logical.",
      "Ask clean sensory questions: what do you see, hear, feel, or say to yourself when that happens?",
      "Workbook reflection placeholder: use a representational systems check to notice your own preferred channels without boxing yourself in.",
    ],
    examples: [
      "A client who says an option 'looks clear' may be ready for a visual map, sketch, or future image.",
      "A client who says a decision 'does not feel right' may need kinaesthetic information, pacing, or embodied evidence before logic lands.",
    ],
  },
];

export const nlpTopicGroups: NlpTopicGroup[] = [
  {
    id: "nlp-foundations",
    title: "NLP Foundations",
    description:
      "Core models, assumptions, and distinctions that orient the wider NLP reference library.",
    topics: nlpFoundationTopics,
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
