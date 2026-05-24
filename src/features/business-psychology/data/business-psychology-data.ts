export type StudyUnitStatus = "Completed" | "Active" | "Mapped" | "To map";

export type WeeklyTopic = {
  id: string;
  week: number;
  title: string;
  summary: string;
  keyConcepts: string[];
  assessmentLinks: string[];
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

const healthyWorkWeeklyTopics: WeeklyTopic[] = [
  {
    id: "week-1-defining-wellbeing-at-work",
    week: 1,
    title: "Defining Wellbeing at Work",
    summary:
      "Establishes the language of workplace wellbeing, including how wellbeing is defined, measured, and connected to healthy work.",
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
    title: "Developing resilience and compassion",
    summary:
      "Examines resilience and compassion as individual and organisational capabilities within healthy workplaces.",
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
    title: "Verbal and Visual knowledge",
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
        "Structured placeholder for migrating Jared's Notion material into a unit workspace.",
      learningOutcomes: [
        "Add official learning outcomes from the university unit outline.",
      ],
      unitContent: [
        "Add weekly topics, readings, lecture notes, and assessment links.",
      ],
      unitPresentation: [
        "Add presentation decks, screenshots, diagrams, and lecture media.",
      ],
      assessmentOverview: [
        "Add assessment names, due dates, rubric notes, grades, and feedback.",
      ],
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
