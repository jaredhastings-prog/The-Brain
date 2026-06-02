export type StudyUnitStatus = "Completed" | "Active" | "Mapped" | "To map";

export type WeeklyTopic = {
  id: string;
  week: number;
  title: string;
  summary: string;
  summarySections?: WeeklySummarySection[];
  subModules?: WeeklySubModule[];
  keyConcepts: string[];
  assessmentLinks: string[];
};

export type WeeklySummarySection = {
  id: string;
  title: string;
  body?: string;
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
};

export type WeeklySubModule = {
  id: string;
  title: string;
  notes: string[];
  keyConcepts: string[];
  screenshots: string[];
  videos: string[];
  readings: string[];
  reflections: string[];
  linkedCaptures: string[];
};

export type Assessment = {
  id: string;
  title: string;
  grade: string;
  notes: string;
};

export type StudyUnit = {
  id: string;
  name: string;
  code: string;
  status: StudyUnitStatus;
  result: string;
  weeklyTopics: WeeklyTopic[];
  assessments: Assessment[];
  keyResources: string[];
  overview: {
    description: string;
    learningOutcomes: string[];
    unitContent: string[];
    unitPresentation: string[];
    assessmentOverview: string[];
  };
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createSubModule(title: string, keyConcepts: string[] = []): WeeklySubModule {
  return {
    id: slugify(title),
    title,
    notes: [
      "Add lecture notes, copied university notes, and personal synthesis here.",
    ],
    keyConcepts: keyConcepts.length
      ? keyConcepts
      : ["Add key concepts, definitions, models, and useful distinctions."],
    screenshots: [
      "Add screenshots, diagrams, visual notes, or slide captures here.",
    ],
    videos: ["Add university media links, YouTube links, and timestamps here."],
    readings: ["Add readings, citations, article notes, and page references here."],
    reflections: [
      "Add application reflections, assignment links, and workplace examples here.",
    ],
    linkedCaptures: [
      "Future: show Global Capture Inbox items linked to this sub-module.",
    ],
  };
}

function createSubModules(titles: string[]) {
  return titles.map((title) => createSubModule(title));
}

const healthyWorkWeekOneSummary: WeeklySummarySection[] = [
  {
    id: "overview",
    title: "Overview",
    body:
      "Week 1 establishes the foundation for Healthy Work & Wellbeing by defining wellbeing, connecting wellbeing to work, and introducing Minecorp as an applied case for analysing workplace risks and organisational responsibilities.",
    bullets: [
      "Clarify what workplace wellbeing means before designing interventions.",
      "Separate general wellbeing from the specific conditions that shape wellbeing at work.",
      "Use Minecorp as a practical case for identifying risks, tensions, and wellbeing factors.",
    ],
  },
  {
    id: "why-workplace-wellbeing-important",
    title: "1.1 Why is Workplace Wellbeing Important?",
    body:
      "Workplace wellbeing matters because work affects health, identity, relationships, performance, motivation, safety, and quality of life. Healthy workplaces reduce avoidable harm and make sustainable performance more likely.",
    bullets: [
      "Wellbeing is both an employee health issue and an organisational performance issue.",
      "Poor wellbeing can show up as stress, disengagement, absence, safety incidents, turnover, or reduced work quality.",
      "A useful wellbeing plan must consider both employee needs and employer responsibilities.",
    ],
  },
  {
    id: "concept-of-wellbeing",
    title: "1.2 The Concept of Wellbeing",
    body:
      "Wellbeing is a multi-dimensional state rather than a single mood or metric. It includes how people feel, function, relate, cope, and make meaning in the contexts where they live and work.",
    bullets: [
      "Wellbeing includes subjective experience and observable functioning.",
      "Wellbeing is shaped by personal, social, organisational, and environmental factors.",
      "The concept is broad, so definitions must be specific enough to guide workplace action.",
    ],
  },
  {
    id: "dimensions-of-wellbeing",
    title: "1.3 Dimensions of Wellbeing",
    body:
      "Wellbeing can be mapped across connected dimensions. The dimensions are not isolated: strain in one area can affect the others.",
    table: {
      headers: ["Dimension", "Study focus"],
      rows: [
        ["Psychological", "Mood, stress, coping, identity, confidence, and meaning."],
        ["Physical", "Energy, fatigue, safety, injury risk, sleep, and health behaviours."],
        ["Social", "Belonging, support, respect, conflict, and inclusion."],
        ["Occupational", "Work design, demands, resources, autonomy, recognition, and workload."],
      ],
    },
  },
  {
    id: "wellbeing-at-work",
    title: "1.4 Wellbeing at Work",
    body:
      "Wellbeing at work is influenced by job demands, available resources, management behaviour, workplace culture, safety systems, role clarity, workload, relationships, and the wider organisational environment.",
    bullets: [
      "Healthy work is designed to reduce unnecessary harm and support employee functioning.",
      "Wellbeing at work is not only an individual responsibility; it is also shaped by systems and culture.",
      "A strong analysis looks for both risks and protective factors.",
    ],
  },
  {
    id: "case-of-minecorp",
    title: "1.5 The Case of Minecorp",
    body:
      "Minecorp acts as the applied case for examining workplace wellbeing in context. The case invites analysis of how work design, safety, leadership, stress, culture, and organisational responses interact.",
    bullets: [
      "Identify the visible wellbeing risks in the work environment.",
      "Look for underlying organisational patterns, not only individual symptoms.",
      "Connect the case to evidence-based wellbeing planning.",
    ],
  },
  {
    id: "application-of-minecorp",
    title: "1.6 Discussion: Application of Minecorp",
    body:
      "The Minecorp discussion asks how wellbeing concepts apply to a realistic organisational setting. The useful move is to translate concepts into observable risks, needs, trade-offs, and intervention points.",
    bullets: [
      "What is happening at the individual, team, leadership, and system level?",
      "Which wellbeing dimensions are most affected?",
      "What evidence would be needed before recommending an intervention?",
    ],
  },
  {
    id: "brainstorming-wellbeing-concepts",
    title: "1.7 Brainstorming Wellbeing Concepts",
    body:
      "This section expands the vocabulary for analysing wellbeing. The goal is to build a broad concept map before narrowing to assessment-relevant factors.",
    bullets: [
      "Generate wellbeing factors before judging which ones matter most.",
      "Group concepts into demands, resources, risks, supports, outcomes, and interventions.",
      "Use the brainstorm to identify evidence gaps and possible assessment themes.",
    ],
  },
  {
    id: "understanding-risks",
    title: "1.8 Understanding Risks",
    body:
      "Risk analysis connects wellbeing concepts to likely harm. Risks may be psychosocial, physical, cultural, relational, procedural, or leadership-related.",
    bullets: [
      "Separate immediate hazards from deeper systemic contributors.",
      "Consider severity, likelihood, exposure, and who is affected.",
      "Use risks to prioritise interventions rather than treating every issue equally.",
    ],
  },
  {
    id: "interrelating-wellbeing-factors",
    title: "1.9 Interrelating Wellbeing Factors",
    body:
      "Wellbeing factors interact. Workload may affect stress, stress may affect safety, safety climate may affect trust, and trust may affect whether employees report issues early.",
    bullets: [
      "Map relationships between factors instead of listing them in isolation.",
      "Look for reinforcing loops, pressure points, and protective resources.",
      "Use interrelationships to design interventions that address causes, not only symptoms.",
    ],
  },
  {
    id: "final-synthesis",
    title: "Week 1 Final Synthesis",
    body:
      "Week 1 frames workplace wellbeing as a multi-dimensional, system-shaped, evidence-informed area of business psychology. The practical task is to define wellbeing clearly, identify relevant risks and resources, and connect those factors to realistic organisational action.",
    bullets: [
      "Workplace wellbeing is best analysed through connected dimensions.",
      "Healthy work requires attention to demands, resources, culture, safety, leadership, and employee experience.",
      "Minecorp provides a case base for practising applied diagnosis and evidence-based wellbeing planning.",
    ],
  },
];

const healthyWorkWeeklyTopics: WeeklyTopic[] = [
  {
    id: "week-1-defining-wellbeing-at-work",
    week: 1,
    title: "Defining Wellbeing at Work",
    summary:
      "Establishes the language of workplace wellbeing, including how wellbeing is defined, measured, and connected to healthy work.",
    summarySections: healthyWorkWeekOneSummary,
    subModules: createSubModules([
      "1.1 Discussion: Why is workplace wellbeing important?",
      "1.2 The concept of wellbeing",
      "1.3 Dimensions of wellbeing",
      "1.4 Wellbeing at work",
      "1.5 The case of Minecorp",
      "1.6 Discussion: Your take on Minecorp",
      "1.7 Brainstorming wellbeing concepts",
      "1.8 Understanding risks",
      "1.9 Discussion: Exploring wellbeing factors",
    ]),
    keyConcepts: [
      "Employee wellbeing",
      "Healthy work",
      "Workplace culture",
      "Mental health at work",
    ],
    assessmentLinks: [
      "Useful foundation for Assessment 3: Evidence Based Wellbeing Plan.",
    ],
  },
  {
    id: "week-2-managing-work-stress",
    week: 2,
    title: "Managing work stress",
    summary:
      "Maps how work stress emerges from demands, resources, strain, appraisal, coping, and organisational context.",
    subModules: createSubModules([
      "2.1 Costs of workplace stress",
      "2.2 Managing workplace stress",
      "2.3 Discussion: Managing your own stress",
      "2.4 Defining stress",
      "2.5 Identifying stressors",
      "2.6 Understanding work stress: The JD-R model",
      "2.7 Understanding work stress: The challenge hindrance framework",
      "2.8 Discussion: Organisational responses to stress - Minecorp",
      "2.9 Discussion: Connecting responses and work contexts",
    ]),
    keyConcepts: [
      "Job demands",
      "Job resources",
      "Stressors",
      "Work stress responses",
    ],
    assessmentLinks: [
      "Relevant to Assessment 2: Presentation and Assessment 3: Wellbeing Plan.",
    ],
  },
  {
    id: "week-3-safety-at-work",
    week: 3,
    title: "Safety at work",
    summary:
      "Connects psychosocial safety, safety culture, and organisational systems to employee health and wellbeing.",
    subModules: createSubModules([
      "3.1 Relating safety to health and wellbeing",
      "3.2 Types of safety",
      "3.3 Discussion: Defining safety culture",
      "3.4 Discussion: Examining safety culture - Minecorp",
      "3.5 Discussion: Impacts of safety on wellbeing",
      "3.6 Discussion: Building a safety culture",
      "3.7 Safety culture across industries",
    ]),
    keyConcepts: [
      "Psychosocial safety",
      "Safety culture",
      "Risk factors",
      "Organisational responsibility",
    ],
    assessmentLinks: [
      "Useful evidence base for wellbeing interventions and workplace risk analysis.",
    ],
  },
  {
    id: "week-4-interventions-for-wellbeing",
    week: 4,
    title: "Interventions for wellbeing",
    summary:
      "Focuses on designing, selecting, and evaluating evidence-based initiatives that improve workplace wellbeing.",
    subModules: createSubModules([
      "4.1 Types of bullying",
      "4.2 Discussion: Preventing bullying and harassment",
      "4.3 Understanding triggers: Minecorp",
      "4.4 The role of management",
      "4.5 Discussion: Away from bullying, towards wellbeing",
      "4.6 Discussion: Health and wellbeing programs",
      "4.7 Discussion: Intervention at Minecorp",
    ]),
    keyConcepts: [
      "Intervention design",
      "Evidence-based initiatives",
      "Evaluation",
      "Mindfulness",
    ],
    assessmentLinks: [
      "Directly supports Assessment 3: Evidence Based Wellbeing Plan.",
    ],
  },
  {
    id: "week-5-fostering-wellbeing",
    week: 5,
    title: "Fostering wellbeing",
    summary:
      "Explores positive workplace behaviour, wellness practices, and conditions that help employees sustain wellbeing.",
    subModules: createSubModules([
      "5.1 Discussion: The role of mindfulness",
      "5.2 Critical reflection on mindfulness",
      "5.3 Fostering wellbeing",
      "5.4 Discussion: Climate and culture for wellbeing",
      "5.5 Mitigating external stressors: Minecorp",
      "5.6 The roles of employers and employees",
    ]),
    keyConcepts: [
      "Positive workplace behaviour",
      "Wellness at work",
      "Supportive culture",
      "Employee engagement",
    ],
    assessmentLinks: [
      "Supports practical recommendations for wellbeing initiatives.",
    ],
  },
  {
    id: "week-6-developing-resilience-compassion",
    week: 6,
    title: "Developing Resilience & Compassion",
    summary:
      "Examines resilience and compassion as individual and organisational capabilities within healthy workplaces.",
    subModules: createSubModules([
      "6.1 Defining resilience and compassion",
      "6.2 Types of resilience",
      "6.3 Cultivating compassion: Minecorp",
      "6.4 Discussion: Building resilience",
      "6.5 The role of managers and leaders in fostering resilience",
      "6.6 Discussion: Reflecting on your experience",
    ]),
    keyConcepts: [
      "Resilience",
      "Compassion at work",
      "Recovery",
      "Sustainable performance",
    ],
    assessmentLinks: [
      "Useful for integrating individual and organisational wellbeing strategies.",
    ],
  },
];

const humanInformationProcessingWeeklyTopics: WeeklyTopic[] = [
  {
    id: "week-1-foundations-of-human-thinking",
    week: 1,
    title: "Foundations of human thinking",
    summary:
      "Introduces the core questions, assumptions, and cognitive foundations of human information processing.",
    keyConcepts: [
      "Human thinking",
      "Cognition",
      "Information processing",
      "Mental representation",
    ],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
  {
    id: "week-2-how-do-we-obtain-knowledge",
    week: 2,
    title: "How do we obtain knowledge?",
    summary:
      "Explores attention, perception, learning, and the ways people gather information from the environment.",
    keyConcepts: ["Knowledge acquisition", "Attention", "Perception", "Learning"],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
  {
    id: "week-3-how-do-we-store-knowledge-memory",
    week: 3,
    title: "How do we store knowledge (memory)?",
    summary:
      "Covers memory systems, encoding, storage, retrieval, and the structure of remembered knowledge.",
    keyConcepts: ["Memory", "Encoding", "Storage", "Retrieval"],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
  {
    id: "week-4-verbal-and-visual-knowledge",
    week: 4,
    title: "Verbal and visual knowledge",
    summary:
      "Examines how people represent, process, and use verbal and visual forms of knowledge.",
    keyConcepts: [
      "Verbal knowledge",
      "Visual knowledge",
      "Mental imagery",
      "Representation",
    ],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
  {
    id: "week-5-information-processing-executive-functions",
    week: 5,
    title: "Information processing (executive functions)",
    summary:
      "Maps executive functions such as planning, inhibition, working memory, cognitive control, and flexible thinking.",
    keyConcepts: [
      "Executive functions",
      "Working memory",
      "Cognitive control",
      "Flexible thinking",
    ],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
  {
    id: "week-6-higher-order-thinking",
    week: 6,
    title: "Higher-order thinking",
    summary:
      "Focuses on reasoning, problem solving, decision making, creativity, and complex thought.",
    keyConcepts: [
      "Reasoning",
      "Problem solving",
      "Decision making",
      "Higher-order cognition",
    ],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
];

const psychologicalScienceWellbeingWeeklyTopics: WeeklyTopic[] = [
  {
    id: "week-1-biopsychosocial-models-of-wellbeing",
    week: 1,
    title: "Biopsychosocial models of wellbeing",
    summary:
      "Introduces wellbeing through biological, psychological, and social lenses.",
    keyConcepts: [
      "Biopsychosocial model",
      "Wellbeing",
      "Health psychology",
      "Context",
    ],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
  {
    id: "week-2-resiliency-models-of-wellbeing-across-the-lifespan",
    week: 2,
    title: "Resiliency models of wellbeing across the lifespan",
    summary:
      "Explores resilience, development, protective factors, and wellbeing across life stages.",
    keyConcepts: [
      "Resilience",
      "Lifespan development",
      "Protective factors",
      "Adaptation",
    ],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
  {
    id: "week-3-positive-psychology-for-wellbeing",
    week: 3,
    title: "Positive psychology for wellbeing",
    summary:
      "Examines positive psychology concepts and interventions that support wellbeing.",
    keyConcepts: [
      "Positive psychology",
      "Strengths",
      "Positive emotion",
      "Meaning",
    ],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
  {
    id: "week-4-goals-and-motivation",
    week: 4,
    title: "Goals and motivation",
    summary:
      "Connects motivation, goal pursuit, values, and wellbeing-related behaviour.",
    keyConcepts: ["Goals", "Motivation", "Values", "Behaviour change"],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
  {
    id: "week-5-self-regulation-and-emotion",
    week: 5,
    title: "Self-regulation and emotion",
    summary:
      "Focuses on emotion, self-regulation, coping, and psychological wellbeing.",
    keyConcepts: [
      "Self-regulation",
      "Emotion",
      "Coping",
      "Psychological flexibility",
    ],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
  {
    id: "week-6-psychological-science-academic-achievement-and-personal-wellbeing",
    week: 6,
    title: "Psychological science, academic achievement and personal wellbeing",
    summary:
      "Integrates psychological science with academic achievement, sustainable study habits, and personal wellbeing.",
    keyConcepts: [
      "Academic achievement",
      "Personal wellbeing",
      "Study behaviour",
      "Sustainable performance",
    ],
    assessmentLinks: [
      "Add assessment links, rubric notes, and study priorities for this week.",
    ],
  },
];

export const businessPsychologyUnits: StudyUnit[] = [
  {
    id: "healthy-work-wellbeing",
    name: "Healthy Work & Wellbeing",
    code: "HRM6006.2",
    status: "Completed",
    result: "70.8%",
    weeklyTopics: healthyWorkWeeklyTopics,
    assessments: [
      {
        id: "assessment-1-content-quiz",
        title: "Assessment 1: Content Quiz",
        grade: "70/100",
        notes: "Recorded result. Add quiz feedback and recurring themes later.",
      },
      {
        id: "assessment-2-presentation",
        title: "Assessment 2: Presentation",
        grade: "72/100",
        notes: "Recorded result. Add presentation notes, rubric feedback, and evidence links later.",
      },
      {
        id: "assessment-3-evidence-based-wellbeing-plan",
        title: "Assessment 3: Evidence Based Wellbeing Plan",
        grade: "70/100",
        notes: "Recorded result. Add final plan structure, sources, and marker feedback later.",
      },
      {
        id: "total-result",
        title: "Total",
        grade: "70.8%",
        notes: "Overall unit result recorded for dashboard visibility.",
      },
    ],
    keyResources: [
      "Lecture notes",
      "Assessment briefs",
      "Required readings",
      "Wellbeing plan evidence base",
    ],
    overview: {
      description:
        "The unit explores workplace culture, mental health and work stressors, as well as positive workplace behaviour, and how these impact employee health and wellbeing. Interventions and mechanisms for promoting healthy workplaces and employee wellbeing will also be examined.",
      learningOutcomes: [
        "Identify the antecedents and consequences of healthy work and employee wellbeing.",
        "Critically evaluate the role of job demands and resources in contributing to employee health and wellbeing.",
        "Design and formulate evidence-based initiatives to positively affect employee health and wellbeing.",
        "Negotiate tensions and advocate suitable compromises for employees and employers.",
      ],
      unitContent: [
        "Defining wellbeing",
        "Work: Demands and resources",
        "Managing work stress",
        "Psychosocial safety",
        "Safety culture",
        "Interventions for wellbeing",
        "Mindfulness",
        "Fostering wellness at work",
        "Developing resilience",
        "Compassion at work",
      ],
      unitPresentation: [
        "Add lecture deck links, screenshots, presentation notes, and core slide summaries here.",
        "Add screenshots, videos, PDFs, and copied university notes as structured study assets later.",
      ],
      assessmentOverview: [
        "Assessment 1: Content Quiz",
        "Assessment 2: Presentation",
        "Assessment 3: Evidence Based Wellbeing Plan",
      ],
    },
  },
  {
    id: "human-information-processing",
    name: "Psychological Science of Human Information Processing",
    code: "To add",
    status: "Completed",
    result: "Not recorded",
    weeklyTopics: humanInformationProcessingWeeklyTopics,
    assessments: [],
    keyResources: [
      "Unit outline to add",
      "Weekly lecture notes to add",
      "Assessment briefs to add",
    ],
    overview: {
      description:
        "In this unit, you will learn about core concepts, principles and theories of cognitive psychology, learning and language.",
      learningOutcomes: [
        "Information processing",
        "Cognitive biases and errors",
        "Learning and skills acquisition",
        "Memory and executive functioning",
      ],
      unitContent: [
        "You will also consider the application of cognitive psychology theories and principles to maximising human performance across a range of contemporary applications.",
      ],
      unitPresentation: [],
      assessmentOverview: [],
    },
  },
  {
    id: "psychological-science-of-wellbeing",
    name: "Psychological Science of Wellbeing",
    code: "To add",
    status: "Completed",
    result: "Not recorded",
    weeklyTopics: psychologicalScienceWellbeingWeeklyTopics,
    assessments: [],
    keyResources: [
      "Unit outline to add",
      "Core readings to add",
      "Wellbeing theory notes to add",
    ],
    overview: {
      description:
        "Structured placeholder for building a wellbeing unit workspace from Jared's existing Notion study system.",
      learningOutcomes: [
        "Add official learning outcomes from the university unit outline.",
      ],
      unitContent: [
        "Add weekly topics, models, readings, lecture notes, and assessment links.",
      ],
      unitPresentation: [
        "Add lecture decks, screenshots, videos, and concept diagrams.",
      ],
      assessmentOverview: [
        "Add assessment names, due dates, rubric notes, grades, and feedback.",
      ],
    },
  },
];

export const degreeWorkspaceSections = [
  "Degree dashboard",
  "Unit pages",
  "Weekly topic pages",
  "Assessments",
  "Resources",
  "Grades",
  "Linked Captures",
];

export function getBusinessPsychologyUnit(unitId: string) {
  return businessPsychologyUnits.find((unit) => unit.id === unitId);
}

export function getBusinessPsychologyWeek(unitId: string, weekId: string) {
  const unit = getBusinessPsychologyUnit(unitId);

  if (!unit) {
    return undefined;
  }

  return unit.weeklyTopics.find((topic) => topic.id === weekId);
}

export function getUnitHref(unitId: string) {
  return `/study-learning/master-of-business-psychology/units/${unitId}`;
}

export function getWeekHref(unitId: string, weekId: string) {
  return `${getUnitHref(unitId)}/weeks/${weekId}`;
}
