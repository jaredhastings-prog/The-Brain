export type StudyUnitStatus = "Completed" | "Active" | "Mapped" | "To map";

export type WeeklyTopic = {
  id: string;
  week: number;
  title: string;
  summary: string;
  summarySections?: WeeklySummarySection[];
  subModules?: WeeklySubModule[];
  image?: {
    src: string;
    alt: string;
  };
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
  image?: {
    src: string;
    alt: string;
  };
  learningBlocks?: WeeklyLearningBlock[];
  notes: string[];
  keyConcepts: string[];
  screenshots: string[];
  videos: string[];
  readings: string[];
  reflections: string[];
  linkedCaptures: string[];
};

export type WeeklyLearningBlockKind =
  | "activity"
  | "definition"
  | "discussion"
  | "journal"
  | "note"
  | "objectives"
  | "purpose"
  | "reflection"
  | "resource"
  | "summary";

export type WeeklyLearningBlock = {
  id: string;
  kind: WeeklyLearningBlockKind;
  title: string;
  body?: string;
  images?: {
    alt: string;
    caption?: string;
    src: string;
  }[];
  definitions?: {
    definition: string;
    term: string;
  }[];
  items?: string[];
  links?: {
    href: string;
    label: string;
  }[];
  steps?: {
    body: string;
    id: string;
    items?: string[];
    links?: {
      href: string;
      label: string;
    }[];
    title: string;
  }[];
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

function createLearningSubModule(
  title: string,
  learningBlocks: WeeklyLearningBlock[],
): WeeklySubModule {
  return {
    ...createSubModule(title),
    learningBlocks,
  };
}

function createPlaceholderSubModule(title: string): WeeklySubModule {
  return {
    id: slugify(title),
    title,
    notes: ["Content to be added."],
    keyConcepts: ["Content to be added."],
    screenshots: ["Content to be added."],
    videos: ["Content to be added."],
    readings: ["Content to be added."],
    reflections: ["Content to be added."],
    linkedCaptures: ["Content to be added."],
  };
}

function createPlaceholderSubModules(titles: string[]) {
  return titles.map((title) => createPlaceholderSubModule(title));
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

const healthyWorkWeekOneSubModules: WeeklySubModule[] = [
  createLearningSubModule("Week 1 Introduction", [
    {
      id: "overview",
      kind: "purpose",
      title: "Purpose",
      body:
        "Welcome to Week 1 of Healthy Work and Wellbeing. This week is all about understanding how wellbeing can be defined both in life and in the workplace. It will involve some personal reflection on what wellbeing means to you, as well as an identification of wellbeing and related factors in the workplace in preparation for the upcoming assessments. We will also be looking at an example case and how healthy work and wellbeing factors can be assessed and related to this context.",
    },
    {
      id: "learning-objectives",
      kind: "objectives",
      title: "Learning Objectives",
      body: "By the end of this week, you should be able to:",
      items: [
        "Define and contrast individual wellbeing and wellbeing at work.",
        "Critically review the different dimensions of wellbeing and apply these dimensions to a workplace context.",
        "Identify the role of wellbeing factors at work.",
      ],
    },
  ]),
  createLearningSubModule(
    "1.1 Discussion: Why is workplace wellbeing important?",
    [
      {
        id: "purpose",
        kind: "purpose",
        title: "Purpose",
        body:
          "Wellbeing is a general term that is used often, across many facets of life. In this activity you will consider how wellness at work relates to wellness generally, connecting these concepts to your own experiences. This will help you to define and contrast individual wellbeing with wellbeing at work and start to build a picture of interrelated concepts which we will further refine over the coming activities.",
      },
      {
        id: "activity-steps",
        kind: "activity",
        title: "Activity Steps",
        steps: [
          {
            id: "step-1",
            title: "Step 1",
            body:
              "Watch the video below and complete the short exercise it describes, the wellness wheel.",
            links: [
              {
                href: "https://youtu.be/VJNMxYNzSUE",
                label: "Wellness wheel video",
              },
            ],
          },
          {
            id: "step-2",
            title: "Step 2",
            body: "Consider your wheel: Did you include work? Why or why not?",
          },
          {
            id: "step-3",
            title: "Step 3",
            body:
              "Review the definition for wellbeing below and copy it into your journal for future reference. You might like to start a note for definitions as you will be prompted to keep track of them in later activities.",
          },
          {
            id: "step-4",
            title: "Step 4",
            body:
              "On the discussion board, discuss the relationship between general wellbeing and the role of wellbeing at work.",
          },
        ],
      },
      {
        id: "definition",
        kind: "definition",
        title: "Definition Callout",
        definitions: [
          {
            term: "Wellbeing",
            definition:
              "An individual experience of feeling happy, fulfilled or content.",
          },
        ],
      },
      {
        id: "discussion-prompt",
        kind: "discussion",
        title: "Discussion Prompt",
        body:
          "Why does wellbeing at work matter, or not matter, to you? Give up to three supporting points.",
      },
    ],
  ),
  createLearningSubModule("1.2 The concept of wellbeing", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "Wellbeing isn't a new concept. Through reading this chapter, you'll be exposed to the concept and philosophies of wellbeing in a broad academic sense. By understanding how wellbeing is defined outside of the work context, you'll be able to better apply ideas about wellbeing in your later work.",
    },
    {
      id: "image-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Image placeholder.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1",
          body: "Read the article by Straume and Vitterso (2012).",
        },
        {
          id: "step-2",
          title: "Step 2",
          body:
            "Return to your wellbeing wheel. Are there changes to make based on what you've read?",
        },
        {
          id: "step-3",
          title: "Step 3",
          body:
            "View the chat topic below and add your comment, referring to the reading to support your response.",
        },
      ],
    },
    {
      id: "reading-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Reading material placeholder.",
    },
    {
      id: "journal-prompt",
      kind: "journal",
      title: "Journal Prompt",
      body:
        "Record any changes you would now make to your wellbeing wheel after completing the reading.",
    },
    {
      id: "discussion-prompt",
      kind: "discussion",
      title: "Discussion Prompt",
      body:
        "Add a comment that connects your thinking about wellbeing to the Straume and Vitterso reading.",
    },
  ]),
  createLearningSubModule("1.3 Dimensions of wellbeing", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "Wellbeing is multifaceted, with key dimensions including hedonic, eudaimonic and social wellbeing. These different dimensions of wellbeing have different implications for individuals generally, and in the workplace. This activity will introduce these foundational dimensions, to help you bring different perspectives to your thinking as you analyse workplace wellness. Building on previous activities, this reading will enable you to further link the dimensions of wellbeing to personal examples, both in work and in life.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1",
          body: "Read the chapter by Fisher et al. (2014).",
        },
        {
          id: "step-2",
          title: "Step 2",
          body:
            "Return to the three wellbeing dimensions - hedonic, eudaimonic and social - as they appear in the text. Using the text as reference, use your journal to jot your own definitions. You can use this journal to keep track of any unfamiliar terms.",
        },
        {
          id: "step-3",
          title: "Step 3",
          body: "View the Facilitator's definitions below.",
        },
      ],
    },
    {
      id: "reading-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Reading material placeholder.",
    },
    {
      id: "journal-prompt",
      kind: "journal",
      title: "Journal Prompt",
      body:
        "Write your own definitions for hedonic wellbeing, eudaimonic wellbeing, and social wellbeing.",
    },
    {
      id: "definition-callouts",
      kind: "definition",
      title: "Definition Callouts",
      definitions: [
        {
          term: "Hedonic wellbeing",
          definition:
            "A state in which decreased pleasure and decreased pain is seen to lead to happiness.",
        },
        {
          term: "Eudaimonic wellbeing",
          definition:
            "The subjective experiences associated with eudaimonia or living a life of virtue in pursuit of human excellence.",
        },
      ],
    },
  ]),
  createLearningSubModule("1.4 Wellbeing at work", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "Definitions and understandings of wellbeing can differ depending on context, as well as individual perspective. This is why it's important to engage with different sources to explore the concept of wellbeing, so we can further understand the commonalities and differences in how it can be conceptualised. The reading in this task is designed to deepen your understanding of wellbeing dimensions. After this reading, you'll engage in a category sorting exercise which helps to apply the dimensions of hedonic, social and eudaimonic wellbeing to the workplace.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1",
          body:
            "Consider the reading and definitions you wrote in the previous activity, then review the reading by Henderson and Knight (2012). Also read Conceptual Focus 3.1, pages 203-209. Take note of the author's discussion of wellbeing at work.",
        },
        {
          id: "step-2",
          title: "Step 2",
          body:
            "Using your new knowledge, sort the examples below as they relate to each of the dimensions.",
        },
        {
          id: "step-3",
          title: "Step 3",
          body:
            "Review the figure and definition below, using your journal to record any definitions you'd like to save for later.",
        },
      ],
    },
    {
      id: "reading-placeholder-1",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Reading material placeholder.",
    },
    {
      id: "reading-placeholder-2",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Reading material placeholder.",
    },
    {
      id: "exercise-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Exercise image placeholder.",
    },
    {
      id: "image-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Image placeholder.",
    },
    {
      id: "definition",
      kind: "definition",
      title: "Definition Callout",
      definitions: [
        {
          term: "Social Wellbeing",
          definition:
            "The extent to which we experience positive relationships and connectedness to others.",
        },
      ],
    },
  ]),
  createLearningSubModule("1.5 The case of Minecorp", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "Case studies can provide a helpful context for concepts that you will study. This activity will introduce our guiding case study which we will return to throughout the unit. By considering this case, you'll build skills you can apply in assessment.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1",
          body: "Carefully read the case below. We will return to it in the coming weeks.",
        },
        {
          id: "step-2",
          title: "Step 2",
          body:
            "Watch the video below and read the Submission to the Western Australian Government Inquiry into Mental Health Impacts of FIFO Work Arrangements. As you read and watch, jot down ideas to prepare for the next activity.",
        },
      ],
    },
    {
      id: "case-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Case study slides placeholder.",
    },
    {
      id: "video-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "YouTube video placeholder.",
    },
    {
      id: "journal-prompt",
      kind: "journal",
      title: "Journal Prompt",
      body: "Make notes on:",
      items: [
        "Potential workplace wellness risks at Minecorp.",
        "Potential wellness strategies.",
        "Your own response: Do you have related personal experiences to share?",
      ],
    },
  ]),
  createLearningSubModule("1.6 Discussion: Your take on Minecorp", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "It is important to identify the factors in a particular context that may pose unique risks or challenges to health and wellbeing. This allows us to think more strategically about the methods and practices that may work to support health and wellbeing in that particular context, rather than only applying universal methods and approaches that may not always be relevant or apply. This activity gives you an opportunity to practise this process, which you will also undertake in both Assessment 2 and Assessment 3.",
    },
    {
      id: "logo-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Minecorp logo placeholder.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1",
          body:
            "If required, revisit the Minecorp case study, then watch the videos below to expand on your understanding of the wellbeing risks associated with FIFO miners.",
        },
        {
          id: "step-2",
          title: "Step 2",
          body:
            "Return to your thoughts on Minecorp and post them in the discussion board. Before you comment, scan other responses from your peers and see if you can add a unique idea or extend an idea you read in another comment.",
        },
      ],
    },
    {
      id: "video-placeholder-1",
      kind: "resource",
      title: "Resource Placeholder",
      body: "YouTube video placeholder 1.",
    },
    {
      id: "video-placeholder-2",
      kind: "resource",
      title: "Resource Placeholder",
      body: "YouTube video placeholder 2.",
    },
    {
      id: "discussion-prompt",
      kind: "discussion",
      title: "Discussion Prompt",
      body: "Respond to the following:",
      items: [
        "What is one risk to wellbeing in this context and why?",
        "What kinds of strategies might help ensure a healthy and safe workplace at Minecorp?",
        "In your response, include any relevant personal insights or ideas based on your own workplace experiences.",
      ],
    },
  ]),
  createLearningSubModule("1.7 Brainstorming wellbeing concepts", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "One of the challenges of managing workplace wellbeing is understanding the individual complexity of different settings, which each have their own unique characteristics and issues. In this task, you will start to identify and explore the relationship between concepts presented throughout this week. This will help to inform what you submit in later assessments, where you will need to explain how different concepts interplay in your chosen workplace setting.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1",
          body:
            "Add concepts to the word cloud below that relate to wellbeing at work. If there are no concepts, then you're first. Help your peers by adding concepts to get the cloud started. For inspiration, view the list provided.",
        },
        {
          id: "step-2",
          title: "Step 2",
          body:
            "Consider the word cloud generated by yourself and peers and use one of the following methods to create a mind-map to show the relationships between different concepts and sub-concepts. How might they be influenced or affected by each other?",
          items: [
            "Work with pen and paper, using arrows, shapes and/or different colours.",
            "Use PowerPoint to create your map, using different shapes and connectors.",
            "Experiment with an online mind-mapping tool such as Coggle.",
          ],
        },
        {
          id: "step-3",
          title: "Step 3",
          body:
            "Save a digital version of your mind-map that you can share and return to. This could be a screenshot or a photo.",
        },
        {
          id: "step-4",
          title: "Step 4",
          body:
            "Review the Facilitator's definitions below and record them in your journal for later review.",
        },
      ],
    },
    {
      id: "word-map-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Screenshot of word map placeholder.",
    },
    {
      id: "concept-ideas",
      kind: "note",
      title: "Concept Ideas",
      items: [
        "Hedonic wellbeing",
        "Eudaimonic wellbeing",
        "Social wellbeing",
        "Safety culture",
        "Risk factors",
        "Hazards",
        "Health and safety policy",
        "Wellbeing plan / strategy",
      ],
    },
    {
      id: "definition-callouts",
      kind: "definition",
      title: "Definition Callouts",
      definitions: [
        {
          term: "Safety Culture",
          definition:
            "Organisational culture that places a high level of importance on safety beliefs, values and attitudes.",
        },
        {
          term: "Hazard",
          definition: "A potential source of harm.",
        },
        {
          term: "Risk Factor",
          definition:
            "Factors that can adversely impact an individual's mental or physical health.",
        },
      ],
    },
  ]),
  createLearningSubModule("1.8 Understanding risks", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "Part of understanding wellbeing in the workplace is identifying the factors that may influence it. The reading in this task introduces key psychosocial risks to wellbeing, which help us broaden our knowledge of both wellbeing and its associated factors.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1",
          body: "Read the article by Dollard (2007).",
        },
        {
          id: "step-2",
          title: "Step 2",
          body:
            "Look at the collage below. The images relate to psychosocial risks mentioned in the article. Choose three images and leave a comment on each to explain.",
        },
        {
          id: "step-3",
          title: "Step 3",
          body:
            "Review the Facilitator's definition for psychosocial safety and record it into your journal.",
        },
      ],
    },
    {
      id: "reading-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Reading material placeholder.",
    },
    {
      id: "collage-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Collage image placeholder.",
    },
    {
      id: "discussion-prompt",
      kind: "discussion",
      title: "Discussion Prompt",
      body: "For each selected image, consider:",
      items: [
        "How does it relate to a risk or risks from the article?",
        "What could be some of the outcomes related to these risks?",
        "Did the comments of your peers spark new ideas?",
      ],
    },
    {
      id: "note",
      kind: "note",
      title: "Note",
      body:
        "There are no exact right or wrong answers as to what image relates to what, so feel free to be creative in your associations while also justifying your choices.",
    },
    {
      id: "definition",
      kind: "definition",
      title: "Definition Callout",
      definitions: [
        {
          term: "Psychosocial safety climate",
          definition:
            "Shared perceptions of organisational policies, practices and procedures for the protection of worker psychological health and safety.",
        },
      ],
    },
  ]),
  createLearningSubModule("1.9 Discussion: Exploring wellbeing factors", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "Now that we have brainstormed the concepts related to health and wellbeing at work and started to map these relationships, it's time to explore the relationship between these concepts in terms of how they might influence or be affected by each other. We will be referring to concepts that might influence wellbeing as factors from here on.",
    },
    {
      id: "image-placeholder",
      kind: "resource",
      title: "Resource Placeholder",
      body: "Image placeholder.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1",
          body:
            "Revisit your mind-map from the previous brainstorming activity and see what improvements you can make based on your more recent learning.",
          items: [
            "Use a visual indicator, such as colour or shape, to highlight wellbeing enablers in your map.",
            "If desired, make a new version of your mind-map to better capture your ideas.",
          ],
        },
        {
          id: "step-2",
          title: "Step 2",
          body: "Go to the discussion below. Share your mind-map and share your thoughts.",
        },
        {
          id: "step-3",
          title: "Step 3",
          body:
            "Reflect on the discussion. What factors or interrelationships are interesting to you, and what questions might they spark? This thinking will help you when you consider what factors to focus on for assessment.",
        },
      ],
    },
    {
      id: "discussion-prompt",
      kind: "discussion",
      title: "Discussion Prompt",
      items: [
        "What similarities and differences do you see?",
        "How might you tweak your own mind-map or the mind-map of a peer?",
      ],
    },
    {
      id: "journal-prompt",
      kind: "journal",
      title: "Journal Prompt",
      body: "Record your response in your journal.",
    },
  ]),
  createLearningSubModule("Week 1 Summary", [
    {
      id: "summary",
      kind: "summary",
      title: "Summary",
      body:
        "This week we were introduced to the key dimensions of wellbeing, and we started the process of applying related concepts to the workplace context. In particular, we looked at:",
      items: [
        "hedonic, eudaimonic and social wellbeing",
        "how industry might play a role in an organisation's response to wellbeing",
        "workplace wellbeing, including relevant concepts and factors",
      ],
    },
    {
      id: "next-week",
      kind: "summary",
      title: "Next Week",
      body:
        "Next week we will start exploring more deeply the factors in the workplace that relate to wellbeing, including factors that support, or hinder, wellbeing at work. We will be applying the theoretical framework of job demands and resources to develop this understanding.",
    },
    {
      id: "assessment-checklist",
      kind: "reflection",
      title: "Reflection Prompt",
      body:
        "Before you go, work through the checklist to ensure you're on track for your upcoming assessments.",
    },
  ]),
];

const healthyWorkWeeklyTopics: WeeklyTopic[] = [
  {
    id: "week-1-defining-wellbeing-at-work",
    week: 1,
    title: "Defining Wellbeing at Work",
    summary:
      "Establishes the language of workplace wellbeing, including how wellbeing is defined, measured, and connected to healthy work.",
    summarySections: healthyWorkWeekOneSummary,
    subModules: healthyWorkWeekOneSubModules,
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

const hipWeekOneSubModules: WeeklySubModule[] = [
  createLearningSubModule("Week 1 Introduction", [
    {
      id: "overview",
      kind: "purpose",
      title: "Purpose",
      body:
        "Human thinking is a complex process that involves various cognitive functions, such as attention, perception, memory, language and problem-solving. Cognition refers to the mental processes that enable individuals to acquire, process, store and use information, and it plays a significant role in shaping our behaviour, emotions and overall mental health. This week introduces cognitive psychology as a discipline, the two traditional approaches used to study it (introspection and behaviourism), and the ways we categorise and network knowledge.",
    },
    {
      id: "learning-objectives",
      kind: "objectives",
      title: "Learning Objectives",
      body: "By successfully completing the tasks this week, you should be able to:",
      items: [
        "Form an understanding of the importance of cognition and how it affects everyday life.",
        "Develop an applied understanding of the two approaches used to study cognitive psychology.",
        "Challenge behaviourism in relation to mental states.",
        "Evaluate when categorising via prototype and via exemplar can be done.",
        "Develop an awareness of the roles of conceptual knowledge and knowledge networks.",
      ],
    },
    {
      id: "core-definition",
      kind: "definition",
      title: "Definition Callout",
      definitions: [
        {
          term: "Cognition",
          definition:
            "Mental processes that allow for the acquisition, storage, manipulation and use of knowledge and understanding. This is the whole toolbox.",
        },
        {
          term: "Cognitive functions",
          definition:
            "Attention (attend to), perception (take in and make meaning), memory (storage), language (speak representations) and problem-solving. These are the individual tools.",
        },
      ],
    },
  ]),
  createLearningSubModule("1.1 The importance of cognition", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "This activity will help you to understand the rationale for studying cognition and what this discipline can teach — it is all about getting you to think about thinking. Learning about the importance of cognition in everyday life will assist you in recognising the basic and more complex cognitive skills we rely on, and the circumstances where we need them most. You will also explore situations where your cognitive functions might be interrupted and the consequences that can arise from impaired cognition.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1: Reflect on your understanding of cognition",
          body:
            "Cognitive psychology is associated with how we perceive the world, remember, pay attention, think and produce language. Share up to three keywords you associate with cognition, then watch the class word cloud grow. Worked example: you are studying for a Tuesday exam and cannot hold the key topics in mind — is there a strategy that could help? It is Sunday, your friends are at the beach, your housemates are playing music next door, and you cannot block it out — why can't you better control your attention or concentration? These are exactly the questions a cognitive psychologist researches.",
        },
        {
          id: "step-2",
          title: "Step 2: Read about the foundations of cognitive psychology",
          body:
            "Read pages 1–2 and 20–23 of Chapter 1 in Taylor and Workman (2021), Cognitive Psychology: The Basics. See the article notes block below for the full write-up.",
        },
        {
          id: "step-3",
          title: "Step 3: Learn how modern science has deconstructed the mind",
          body:
            "Watch the TEDx talk by Dr John Vervaeke, 'All the king's disciplines: Cognitive science rescues the deconstructed mind' [12:49]. Pay attention to what Vervaeke says about cognition as a discipline.",
        },
        {
          id: "step-4",
          title: "Step 4: Consider how you use cognition in everyday life",
          body:
            "Work through each mental process and log a personal example. The analogies below are the ones worth keeping.",
        },
        {
          id: "step-5",
          title: "Step 5: Share an example of interrupted cognitive function",
          body:
            "Come up with one example of when your cognitive functions get interrupted and explain which functions were impacted. Then explore peers' posts and consider what could be done to improve cognitive function in their situations.",
        },
      ],
    },
    {
      id: "function-analogies",
      kind: "note",
      title: "The Cognitive Functions — Analogies and Examples",
      items: [
        "Perceiving — taking raw information in through the senses and giving it meaning. Camera lens (eyes/ears/touch) plus software (brain organising data into something recognisable). E.g. you see squiggly black marks on a page, the brain turns them into letters, then into words.",
        "Attending — the brain's spotlight; what we choose (or get forced) to focus on. Like a torch in the dark: the world is full of stuff, but only what the beam hits gets processed in detail. You can move the beam, but you can't light up everything at once. E.g. at a cafe, dozens of voices and clinking cups, until a friend says your name and your attention zooms in.",
        "Thinking — the brain's way of playing with information; combining, comparing and transforming it. Like LEGO bricks: each brick is a piece of info, thinking is snapping them together in new ways. E.g. you're hungry, the fridge has eggs and bread, so eggs + bread = scrambled eggs on toast.",
        "Processing — the conversion step; input becomes information. Like a blender: raw fruit is sensory input, the blender is processing, the smoothie is organised info you can use. E.g. you hear a friend speak, raw sound waves hit your ears, the brain processes it into words and then meaning.",
        "Problem-solving — the brain's toolkit for bridging the gap between where you are and where you want to be. Like finding your way through a maze. E.g. your phone won't charge, so you test the cord, then the socket, then a different charger, eliminating options step by step.",
        "Knowledge — the brain's library of past information that guides what you do now. Each book is a chunk of information; the catalogue is how it's organised so you can find the right book. E.g. you know fire is hot, so seeing flames tells you 'don't touch'. Without knowledge, every situation would feel brand new.",
        "Language — the brain's translation tool, turning private thoughts into public communication. Like a wifi router: your thoughts are the data, language is the signal that sends it. E.g. you think 'I'm hungry', convert it to 'let's get lunch', and the other person understands because you share the same code.",
        "Memory — the brain's save-and-recall system. Like cloud storage: saving a file is encoding, the file staying stored is retention, opening it later is retrieval. E.g. you learn a friend's phone number and later dial it without looking.",
      ],
    },
    {
      id: "article-notes-basics",
      kind: "resource",
      title:
        "Article Notes — Cognitive Psychology: The Basics (Ch. 1, pp. 1–2 and 20–23)",
      body:
        "Cognitive psychology is the branch of psychology that explores the operation of mental processes related to perceiving, attending, thinking, language and memory, mainly through inferences from behaviour. Neural networking (computer systems modelled on the brain and nervous system) comes out of computational modelling research that aspires to imitate human cognitive functioning. The development of cognitive psychology was in part a reaction to behaviourism's focus on overt behaviour: behaviourism was concerned only with what could be seen, so how we think and remember was off limits. With the popularisation of information processing during the 1970s, an all-encompassing approach to understanding mental processing was introduced, and information-processing models helped explain the transition from sensory pick-up of stimuli to forging meaning in the brain.",
      items: [
        "Four main areas of contribution: cognitive psychology, cognitive neuroscience, cognitive neuropsychology, computational cognitive science.",
        "Attention and perception — sensory organs pick up light, sound, pressure waves and molecules (sensation); attending to these inputs allows further processing; the brain interprets them based mainly on experience (perception). The two are interdependent: we perceive what goes on around us and try to make sense out of potential chaos.",
        "Learning and memory — learning occurs when we interact with our environment, but is of no consequence unless we can store and retrieve information as required. The two most popular memory models are the multi-store model and working memory. Consolidation into long-term storage is explained by levels of processing and implicit learning.",
        "Thinking: decision-making and problem-solving — reasoning is required for hypothesis testing (e.g. the classic Wason task). Problem-solving strategies include means-ends analysis, progress monitoring and planning. Decision-making judgements often require quick analysis using rules of thumb known as heuristics, which are largely the antithesis of deductive thought.",
        "Language and communication — reading, writing and speech are all part of language. The consensus is that language acquisition is driven by both nature and nurture. Language is a subset of communication, and communication can be non-verbal. Animals communicate, but as yet there is no evidence they produce anything akin to human language.",
      ],
    },
    {
      id: "feedback",
      kind: "reflection",
      title: "Feedback",
      body:
        "Reflect on your understanding of what cognitive psychology means today. Revisit the word cloud from Step 1 and think about what words you might want to add. Do the existing words have a different meaning now, and how has your understanding progressed?",
    },
  ]),
  createLearningSubModule("1.2 Different cognitive perspectives", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "In this activity you will learn about the different perspectives that form the foundations of cognitive psychology, which help explain why the discipline has taken the form we know today. Cognitive psychology emerged in the late 1950s, and academics often describe this as 'the cognitive revolution' because of its powerful impact on the wider field. One predecessor was a 19th-century movement that emphasised introspection as the main research tool; psychologists soon became disenchanted with it, and the behaviourist movement rejected introspection by criticising its validity as a method. Both approaches have influenced cognitive psychology today.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1: Explore the foundations of introspection",
          body:
            "The history of introspection: in the late 19th century, Wilhelm Wundt and his student Bradford Titchener created a new research enterprise that led to the modern field of experimental psychology. They believed psychology should focus on the study of conscious events — feelings, perceptions, recollections and thoughts — and concluded that the only way to study thoughts is through introspection, as only the individual can experience or observe their own inner life. Introspection means 'looking within': people observe and record the content of their own mental lives and the sequences of their own experiences. Wundt insisted introspection had to be trained, and the training included teaching vocabulary to describe observations, be as complete as possible, and report experiences with as little interpretation as possible. This style of research was influential for several years, but psychologists gradually started to disagree with the method.",
          links: [
            {
              href: "https://www.youtube.com/watch?v=QmAAi2T3Mhs",
              label:
                "Bear it in Mind (2022) — Origins of psychology: Wilhelm Wundt & introspection",
            },
          ],
        },
        {
          id: "step-2",
          title: "Step 2: Explore the foundations of behaviourism",
          body:
            "Behaviourism rejected introspection on the grounds of validity, arguing that human and animal behaviour can be explained in terms of conditioning without appeal to thoughts or feelings — and that some mental conditions are best treated by altering behaviour patterns. The canonical illustration is Pavlov's classical conditioning work with dogs.",
        },
        {
          id: "step-3",
          title:
            "Step 3: Find out more about the application of introspection and behaviourism",
          body:
            "Conduct a 10–15 minute online search and find an example of a study that used either introspection or behaviourism as a method of research (excluding the Pavlov example). My response: Lutz, Lachaux, Martinerie and Varela — participants provided first-person introspective reports about their experiences during a visual task, which were then correlated with neural synchrony patterns.",
          links: [
            {
              href: "https://pubmed.ncbi.nlm.nih.gov/11805299/",
              label:
                "Guiding the study of brain dynamics by using first-person data: synchrony patterns correlate with ongoing conscious states during a simple visual task",
            },
          ],
        },
        {
          id: "step-4",
          title: "Step 4: Assess the strengths and limitations",
          body:
            "Each approach has strengths and limitations. This matters for two reasons: it helps us understand the development of cognitive psychology as a discipline and why we use certain methods over others, and it underlines the importance of critical reflection. As you progress through the literature, keep asking: what are the strengths and limitations of this approach, and is there a better way to investigate the research question?",
        },
      ],
    },
    {
      id: "definitions",
      kind: "definition",
      title: "Definition Callout",
      definitions: [
        {
          term: "Introspection",
          definition:
            "Literally 'looking into'. The conscious examination of conscious experience — self-observation of your own thoughts. Strength: it is the only direct access to subjective experience. Limitation: it is unverifiable and cannot be observed by anyone else.",
        },
        {
          term: "Behaviourism",
          definition:
            "The theory that human and animal behaviour can be explained in terms of conditioning, without appeal to thoughts or feelings, and that some mental conditions are best treated by altering behaviour patterns. Strength: observable and objectively measurable. Limitation: it ignores inner mental states.",
        },
      ],
    },
    {
      id: "timeline",
      kind: "note",
      title: "The Emergence of Psychology as a Science — Timeline",
      items: [
        "1897 — Wilhelm Wundt",
        "1913 — Behaviourist approach",
        "1960s — Cognitive approach",
        "1980s — Biological approach",
        "Today — Cognitive neuroscience",
      ],
    },
    {
      id: "optional-resources",
      kind: "resource",
      title:
        "Optional Reading — Article Notes: 'History and Core Themes' (Abrahamsen & Bechtel)",
      body:
        "Chapter 1: History and Core Themes (pp. 1–12 and 24–26) from The Cambridge Handbook of Cognitive Science.",
      items: [
        "Key terms — Cognitive science: the interdisciplinary study of cognition across psychology, AI, linguistics, neuroscience, philosophy and anthropology. Cognitive revolution: the mid-20th-century shift from behaviourism and structuralism toward models of information processing, computation and mental representation. Symbolic models: cognitive architectures using discrete symbols and rule-based manipulation. Connectionism: subsymbolic, statistical models via artificial neural networks. Embodied/extended cognition: cognition as situated in body, environment and social systems.",
        "Origins and roots — early psychology (James, Wundt) and neurophysiology (Broca, Lashley) framed mind–brain questions; behaviourism (Watson, Skinner) dominated in the US, sidelining mental constructs until mid-century; Chomsky's generative grammar provided a foundation for cognitive science.",
        "The cognitive revolution (1940s–1960s) — information theory (Shannon) and computing supplied metaphors and models of mind. Key figures: Miller (memory capacity, 'chunking'), Broadbent (attention filter), Chomsky (transformational grammar), Newell & Simon (AI programs). The 1956 MIT symposium is often cited as the 'birth' of cognitive science.",
        "Symbolic models (1956–1975) — dominance of rules and representations (GPS, ACT, ELINOR). Cognitive psychology re-emerged, integrating perception, memory and reasoning, with strong links to AI and linguistics.",
        "Naming the field (1975–1980) — 'cognitive science' coined; the Cognitive Science Society and the journal Cognitive Science established. Interdisciplinary, but dominated by psychology and computer science.",
        "The connectionist challenge (1980s onward) — PDP networks (Rumelhart, McClelland, Hinton) revived neural networks; backpropagation allowed multilayer learning and fuelled debates with symbolic theorists. This opened space for statistical learning, Bayesian models and hybrid approaches.",
        "Expansion (1990s–present) — downward into cognitive neuroscience (fMRI, ERP, Marr's computational vision) and outward into embodied, situated and extended cognition (Gibson, Hutchins, Clark), plus evolutionary psychology, animal cognition, robotics and dynamical systems.",
        "Takeaway — cognitive science is pluralistic and dynamic, shifting between symbolic, connectionist and embodied paradigms. Interdisciplinarity is its defining trait, and current approaches increasingly integrate brain, body and environment.",
      ],
    },
    {
      id: "feedback",
      kind: "reflection",
      title: "Feedback",
      body:
        "Think about how your understanding of cognitive psychology has changed so far this week. Has learning about introspection and behaviourism changed or enhanced your understanding?",
    },
  ]),
  createLearningSubModule(
    "1.3 Basic building blocks of cognition: Mental concepts",
    [
      {
        id: "purpose",
        kind: "purpose",
        title: "Purpose",
        body:
          "This activity furthers your understanding of the basic building blocks of cognition, which underlie the mental processes that produce our thoughts, feelings and actions. It starts with mental representations — the ideas and concepts we use to understand the world — which are constantly updated based on our experiences and knowledge. You will also consider how past experience and current knowledge shape conceptual understanding and influence the way we think.",
      },
      {
        id: "activity-steps",
        kind: "activity",
        title: "Activity Steps",
        steps: [
          {
            id: "step-1",
            title: "Step 1: Learn about the use of mental concepts",
            body:
              "Psychologists use 'mental concepts' to explain our knowledge and thinking; they are the building blocks of all knowledge. If I tell you I have a dog named Ginger, you already know a lot about her — fur not feathers, likely to bark and chase cats, unlikely to fly — because of your concept of 'dog'. Slide 1, when seeing a dog, how do you know it is a dog and not a cat? Suppose you categorise a dog as 'a creature that barks and has fur and four legs'. What happens with a furless chihuahua or a barkless Benji? We could soften this to 'creatures that usually bark and usually have fur and four legs', which works in most instances, but comes with uncertainty because there are exceptions. Slide 2, Wittgenstein's family resemblances: there are probably no set features that everyone in a family shares, but there will be common features. A few members might share brown hair and large eyes; another member might not, but shares wide lips and a distinctive chin with some of them. The common features depend on the subgroup you use, and this feature overlap is why family members resemble each other. Slide 3, characteristic features: ordinary categories like 'dog' or 'vehicle' work the same way. There may be no features shared by all dogs, but we can categorise characteristic features — those most members have — and these enable us to recognise that a dog is a dog even when one doesn't have fur.",
          },
          {
            id: "step-2",
            title:
              "Step 2: Explore how mental concepts can be applied to abstract concepts",
            body:
              "Can family resemblance apply to abstract concepts such as 'winning'? Winning an argument may or may not be recognised by your opponent; winning a game is probably recognised by the other players; winning a competition will be officially recognised; you might 'win' a person's affection, admiration or friendship; and some types of winning are rewarded with an incentive, such as recognition or a monetary reward. There are many attributes typically associated with 'winning' and we apply them flexibly, distinguishing a win from a loss. The concept of 'winning' is therefore a group of instances that all have certain family resemblances.",
          },
          {
            id: "step-3",
            title:
              "Step 3: Apply mental concepts to understand visual information",
            body:
              "Look at a picture of the dog, Ginger. How would you use mental concepts to understand this image? Select all that apply: (a) apply general knowledge to new cases, (b) refine your definition of that category, (c) establish a category definition to understand the concept, (d) draw broad conclusions from this specific case. Correct answer: (a) and (d).",
          },
          {
            id: "step-4",
            title: "Step 4: Consolidate your understanding",
            body:
              "Watch 'Mary's room: A philosophical thought experiment' by Eleanor Nelsen (TED-Ed) [4:51] — a thought experiment about what happens when a neuroscientist who is an expert in colour, but who can only see in black and white, finally sees colour. Mary's room is also known as the knowledge argument, proposed by Frank Jackson. Reflect on: is there knowledge that can be attained only through conscious experience? Does Mary learn anything new when she perceives colour for the first time? What does the debate say about our understanding of knowledge?",
          },
        ],
      },
      {
        id: "limitations",
        kind: "note",
        title: "Limitations of Mental Concepts",
        items: [
          "There are no defining features for categorising most concepts, only shared attributes.",
          "We don't categorise on the basis of set definitions.",
          "We can easily find exceptions to any definition that we produce for most concepts.",
        ],
      },
      {
        id: "definitions",
        kind: "definition",
        title: "Definition Callout",
        definitions: [
          {
            term: "Knowledge argument",
            definition:
              "Can we know everything about something without the physical experience? Mary had a mental concept of colour despite never seeing it — until you experience something, it is only a concept.",
          },
          {
            term: "Qualia",
            definition:
              "The subjective or qualitative properties of experience. What it feels like, experientially, to see a red rose is different from what it feels like to see a yellow rose. Likewise for hearing a musical note played by a piano and hearing the same note played by a tuba.",
          },
        ],
      },
      {
        id: "my-note",
        kind: "note",
        title: "My Note",
        body:
          "Deletions, distortions and generalisations based on past knowledge and experience create our mental concepts. Here they are called categories.",
      },
      {
        id: "feedback",
        kind: "reflection",
        title: "Feedback",
        body:
          "We have learned how we process information in categories based on past knowledge, and why it is important to categorise. Think about how your categories might differ from your classmates', or from someone from a different culture or country.",
      },
    ],
  ),
  createLearningSubModule("1.4 Categorising via prototypes and exemplars", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "In this activity we explore how our brains use prototypes and exemplars to make judgments about the world. Have you ever seen something new and immediately thought, 'oh, that looks like a ___'? That's your brain using a prototype — a mental representation of what an object or concept should look like. We are good at making quick judgments from prototypes, but we also use exemplars — specific instances of a concept — to make more nuanced decisions.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1: Learn about prototypes in psychology",
          body:
            "Prototypes represent what is most typical for a category. A person's mental category of 'family' will likely feature readily accessible information based on shared physical attributes. If you see a four-legged fluff ball with little pointy ears that meows, you can quickly identify it as a cat by reference to your prototype cat — a depiction of the 'ideal' cat. Prototypes are usually based on the attribute cluster for a concept: the average of the various category members you have encountered. You will have your own representation of prototypes based on your experiences, and there is no definitive prototype for a concept, although most people have a prototypical example.",
        },
        {
          id: "step-2",
          title: "Step 2: Explore how prototype theory is tested",
          body:
            "Some researchers use a 'production task': participants name as many dogs or birds as they can. According to prototype theory, they first locate their prototype in memory and then ask what resembles it, starting with the closest match (the centre of the category) and working outward. For 'bird' in Australia, a crow-like bird may come first while a penguin comes much later because it is farther from the prototype. Another method presents different items from a category and asks which comes to mind first. My poll responses: vegetable — carrot; bird — pigeon; furniture — chair.",
        },
        {
          id: "step-3",
          title: "Step 3: Learn about exemplar theory",
          body:
            "Under prototype theory, new objects are processed by comparison to your prototype of the category. Exemplar theory suggests that in some situations we categorise using knowledge about specific category members instead. For example, a vase is placed in front of you and you are asked whether it is a vase. Under prototype theory you recall your prototype vase and compare. But you might instead notice that this object is very similar to one in your grandmother's living room — you saw flowers in it and she called it a vase — so if the new object resembles your grandmother's object, and that object is a vase, this must be a vase too. That is exemplar-based reasoning: we make category judgments by comparing new stimuli with similar instances already stored in memory.",
        },
        {
          id: "step-4",
          title:
            "Step 4: Consider when prototype theory and exemplar theory are used",
          body:
            "Hint: think about someone with extensive knowledge of fish species snorkelling on the Great Barrier Reef versus a first-time snorkeller. The expert draws on many exemplars of fish in memory to identify species; the newbie compares every fish to their prototype and identifies them all as simply 'fish' — 'fish with big lips', 'fish with blue stripes', 'big fish'. My response: a scientist would use exemplar theory when studying subjects, as they are evidence-based practitioners. Someone unfamiliar with the experience of being in love may draw from movies they have watched and their frame of reference for what love should look like.",
        },
        {
          id: "step-5",
          title: "Step 5: Test your knowledge",
          body:
            "Sort statements into prototype or exemplar theory. Statement 1 is exemplar theory because you are comparing the new unknown object against bird exemplars in your memory, not against a typical bird or the bird prototype. Statement 2 is prototype theory because you are comparing the new unknown object against your general idea of what fruit looks like. Statement 3 is exemplar theory because you are comparing the new unknown object against dog exemplars, not a typical dog or the dog prototype.",
        },
        {
          id: "step-6",
          title:
            "Step 6: Explore how categorising theories apply to other sensory experiences",
          body:
            "Do the categorising theories also apply to other sensory experiences, such as hearing sounds? My response: 'Categories as Acts of Meaning: The Case of Categories in Olfaction and Audition' (Dubois et al.) explores whether prototype and exemplar models generalise to smell and sound. In the olfactory channel, people sort odours by source (rose, lemon) rather than by sensory features, and smell lacks a universal descriptive vocabulary — so prototype/exemplar models struggle: what is the 'average' smell of a flower, or the exemplar of 'spicy'? In the auditory channel, speech sounds support prototype-like categories such as the 'average' sound of vowels, while exemplar storage applies to specific voices or instruments heard before. In my view, we are using stimuli as physiological anchors which then produce an internal representation, based on sameness or difference comparison biases.",
        },
      ],
    },
    {
      id: "definitions",
      kind: "definition",
      title: "Definition Callout",
      definitions: [
        {
          term: "Prototype",
          definition:
            "Your mental 'average example' of a category — a mental representation of the most typical or ideal example of a concept. A default picture in your head: when someone says 'bird', you don't imagine all birds, you imagine your typical bird. Good for fast conceptualisation: little cognitive load, fast recall, semi-constructed.",
        },
        {
          term: "Exemplar",
          definition:
            "A specific, individual instance or memory of a concept used to categorise new objects or ideas. Exemplar theory proposes that people form categories not from an abstract prototype but by comparing a new stimulus to a collection of specific memories from past experience. Like a photo album: when you see something new, you flip through memories of particular cases to decide what it is. The brain's way of judging by 'does this match something I've seen before?' — matching/sameness.",
        },
      ],
    },
    {
      id: "shorthand",
      kind: "note",
      title: "Shorthand",
      items: [
        "Prototype = average, the 'typical image'.",
        "Exemplar = specific, 'that one I've seen before'.",
      ],
    },
    {
      id: "article-notes-averageness",
      kind: "resource",
      title:
        "Article Notes — It's not just average faces that are attractive (Halberstadt & Rhodes, 2003)",
      body:
        "Halberstadt and Rhodes asked participants to rate the attractiveness of birds, fish and cars. Participants rated the most 'average' picture as the most attractive, suggesting we find average or typical exemplars attractive.",
      items: [
        "Key terms — Averageness: the degree to which a stimulus resembles the central tendency of its category. Direct selection hypothesis: preference for average faces evolved as an adaptation for identifying healthy, high-quality mates. Familiarity hypothesis: average stimuli appear more attractive because they are more familiar. Caricature/anticaricature: digitally exaggerating or reducing differences from a category average. Composite averaging: blending multiple exemplars (2, 4, 8, 16, 32) to systematically increase averageness.",
        "Methodology — Experiment 1 (birds): manipulated passerine line drawings using caricature/anticaricature software. Experiment 2 (fish): created composites of 2–32 fish images. Experiment 3 (automobiles): created composites of sedan line drawings. Participants rated stimuli on attractiveness, averageness and familiarity.",
        "Findings — Birds: attraction increased with similarity to the average, and averageness predicted attractiveness beyond familiarity. Fish: composite averaging increased attractiveness up to 16–32 blends, and averageness again predicted attractiveness beyond familiarity. Automobiles: averageness correlated with attractiveness, but the effect disappeared once familiarity was controlled — so attractiveness here was driven by familiarity, not averageness.",
        "Discussion — averageness effects are not limited to human faces; they also apply to animals. For artefacts such as cars and watches, familiarity accounts for attractiveness. For living organisms (birds, fish, humans) there seems to be an independent preference for averageness itself, possibly linked to cues of genetic quality and health.",
        "Implications — human preference for 'average' features may come from two mechanisms: familiarity (average items look more typical, driving attraction to both natural and manufactured objects) and biological quality signals (in animals, including humans, averageness may signal health, stability and genetic fitness). This challenges purely evolutionary accounts by showing averageness also taps general cognitive processing biases.",
        "Key references — Halberstadt & Rhodes (2000); Langlois & Roggman (1990); Rhodes & Tremewan (1996); Møller & Swaddle (1997); Zajonc (1968) mere exposure effect.",
      ],
    },
    {
      id: "article-notes-infants",
      kind: "resource",
      title:
        "Article Notes — Categorization of Speech by Infants: Support for Speech-Sound Prototypes (Grieser & Kuhl, 1989)",
      items: [
        "Key terms — Equivalence classification: treating distinct but phonetically similar sounds as members of the same category. Prototype effect: some category members are 'better' exemplars, serving as perceptual anchors for categorization. Good vs poor exemplars: prototypical (central) sounds vs less typical but still category-consistent sounds. Head-turn conditioning: a behavioural method where infants turn toward a sound change, reinforced with visual stimuli. Generalization score: how broadly infants apply category membership from a trained exemplar to novel stimuli.",
        "Background — adults categorise speech around prototypes. The question: do infants, by 6 months, also organise vowel categories around prototypes? This helps explain how infants process variable speech efficiently so early.",
        "Experiment 1 (categorization with good exemplars) — infants trained on two good vowel exemplars (/i/ as in peep, /e/ as in pep), then tested on 64 novel variants systematically shifted in vowel space. Infants correctly categorised over 90% of novel stimuli even when not prototypical, and performance was immediate (first-trial accuracy), not just learned.",
        "Experiment 2 (prototypes vs non-prototypes) — one group trained on a good (prototypical) /i/, the other on a poor (non-prototypical) /i/, then tested with 16 novel /i/ variants. Generalization was significantly greater after exposure to the good exemplar, and infant responses strongly correlated (r = .92) with adult ratings of stimulus 'goodness'.",
        "Discussion — infants show both equivalence classification and prototype effects, suggesting early perceptual efficiency: prototypes help infants rapidly organise speech despite variability. This raises the developmental question of whether prototypes are innate auditory biases (like focal colours) or shaped by early linguistic experience.",
        "Implications — human speech perception mechanisms are in place well before first words; infants' use of prototypes may explain how they handle vast acoustic variability in real speech; prototypes could serve as anchors for language acquisition, influencing later phoneme perception and learning.",
        "Key references — Kuhl (1979, 1983, 1985); Rosch (1975, 1977); Peterson & Barney (1952); Werker & Tees (1984).",
      ],
    },
    {
      id: "feedback",
      kind: "reflection",
      title: "Feedback",
      body:
        "What advantages do the two approaches provide for categorical reasoning? Prototypes provide a quick summary of the category, whereas exemplars allow you to adjust your concept to different contexts. Reflect on how you can apply this in everyday life.",
    },
  ]),
  createLearningSubModule("1.5 Knowledge networks: Part 1", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "In the previous activity we talked about how our brains use mental representations called exemplars and prototypes to quickly categorise new information. Now we dive deeper into how our brains store and retrieve information from memory. Memory is a huge part of cognition — it is what allows us to learn and remember things over time.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1: Conceptualise memory networks",
          body:
            "Picture memory like a network or mind map with nodes. The top category is 'animals', with characteristics such as 'has skin', 'eats' and 'breathes'. Subcategories of animal could be 'bird' and 'fish', each with their own characteristics. You know that a horse is an animal; that connection is an association link between two nodes, and the link itself is a form of knowledge. Retrieval works through activation spreading from one node to the next. If a node is 'far away' the activation needs to travel farther and retrieval takes longer — 'far away' means the ideas are not activated frequently, or you learnt them a long time ago.",
        },
        {
          id: "step-2",
          title: "Step 2: Learn about the semantic memory network",
          body:
            "Knowledge is organised in the mind through the semantic network. Watch 'Semantic networks and spreading activation | Processing the environment' [3:38].",
        },
        {
          id: "step-3",
          title:
            "Step 3: Explore what changes in the 'modified semantic network theory'",
          body:
            "Everyone has their own semantic network that develops based on their experience and knowledge, so we experience different processing times for retrieving certain information. Knowledge you use often stays front of mind; knowledge you don't use is forgotten or hard to retrieve. Links are strong or weak based on usage. What is one topic you activate every day, and one you do not activate often?",
        },
        {
          id: "step-4",
          title: "Step 4: Test your activation time",
          body:
            "The most prominent test of activation time is the sentence verification task (Collins & Quillian, 1969). Participants are shown true sentences (e.g. 'cats have claws') and false sentences (e.g. 'a dog is a bird') and asked to indicate true or false as fast as possible. You can try it via the free Inquisit app; press Ctrl+Q (PC) or Cmd+Q (Mac) to exit.",
        },
      ],
    },
    {
      id: "diagram",
      kind: "resource",
      title: "Semantic Network Hierarchy",
      body:
        "The classic Collins and Quillian hierarchy: Animal (has skin, can move around, eats, breathes) branches to Bird (has wings, can fly, has feathers) and Fish (has fins, can swim, has gills), which branch again to Canary and Ostrich, and Shark and Salmon.",
      images: [
        {
          alt: "Hierarchical semantic network with Animal at the top branching to Bird and Fish, then to Canary, Ostrich, Shark and Salmon, each with characteristic properties",
          caption:
            "Semantic network hierarchy — properties are stored at the highest applicable level.",
          src: "/images/business-psychology/hip/week-1/semantic-network-hierarchy.png",
        },
      ],
    },
    {
      id: "definitions",
      kind: "definition",
      title: "Definition Callout",
      definitions: [
        {
          term: "Memory network",
          definition:
            "A web of connected ideas in your brain. Like a spider web with lights on each knot: touch one knot (idea) and nearby lights (related ideas) glow too.",
        },
        {
          term: "Semantic network (basic)",
          definition:
            "A model of memory where knowledge is stored as nodes (ideas/concepts) connected by links (relationships). Each link shows how the ideas are connected — categories. 'Semantic' means meaning, so a semantic network is about how the meanings of concepts are linked in memory. The limitation is that basic semantic networks only link concepts (Toby ↔ dog) but don't capture the kind of relationship — 'Toby is a dog' versus 'Toby has a dog'.",
        },
      ],
    },
    {
      id: "feedback",
      kind: "reflection",
      title: "Feedback",
      body:
        "Although the activation of our memory network happens without us being consciously aware of it, can you think of situations where one thought or idea activated another?",
    },
  ]),
  createLearningSubModule("1.6 Knowledge networks: Part 2", [
    {
      id: "purpose",
      kind: "purpose",
      title: "Purpose",
      body:
        "Semantic networks and connectionist networks are both theoretical models used to explain how humans process and represent information. Semantic networks propose that knowledge is organised as interconnected concepts, with related concepts linked in a hierarchical network; this activity extends them with propositions, which explain the full range of knowledge we possess. Connectionist networks propose instead that the mind is made up of a large number of simple processing units working together, with connections between them forming complex patterns of activation. Both have strengths and weaknesses, and both are heavily influential in shaping how we believe the mind acquires and uses knowledge.",
    },
    {
      id: "activity-steps",
      kind: "activity",
      title: "Activity Steps",
      steps: [
        {
          id: "step-1",
          title: "Step 1: Learn about advanced semantic networks",
          body:
            "The semantic network theories from 1.5 help explain how information is stored, but they are too simple to explain the full range of our knowledge. How would we differentiate 'Toby has a dog' from 'Toby is a dog'? Anderson and Bower (1974) solve this by adding propositions — the smallest unit of knowledge that can be either true or false. 'Everyone loves chocolate' is a proposition, but 'everyone' alone is not; 'Marion likes purple flowers' is a proposition, whereas 'purple flowers' is not. Propositions can be presented as a structure of nodes and linkages, with each ellipse representing one proposition. With propositions added, we can distinguish 'cats eat meat' from 'meat eats cats'. The model still shares aspects of earlier network theories: associative links, some stronger than others depending on how frequently and recently we have used them, with activation spreading to other nodes once a node is activated.",
        },
        {
          id: "step-2",
          title: "Step 2: Learn about levels of processing",
          body:
            "The levels of processing theory focuses on the depth of processing involved in memory, and expects that deeper levels of analysis produce more sophisticated and longer-lasting memory traces — the deeper the processing, the longer the memory trace lasts. Watch 'Memory: Levels of processing and elaboration' [8:37].",
        },
        {
          id: "step-3",
          title: "Step 3: Learn about connectionist networks",
          body:
            "Slide 1 — In the network described in Step 1, each node represents an idea. Connectionist network theory proposes a different approach: each idea is represented by a pattern of activation across the network, so we need to look at several nodes at once to see what pattern is happening. Many nodes represent one concept and the activations happen in parallel — parallel distributed processing (PDP). Watch 'Parallel distributed processing (PDP)' [1:03]. Slide 2 — The connectionist model relates to how brain activity spreads. The brain relies on parallel processing when several regions are activated simultaneously; you can think of the nodes as neurons. Imagine how we would function if we were not able to process information simultaneously in several brain regions. Watch 'But what is a neural network?' [stop at 16:26].",
        },
        {
          id: "step-4",
          title: "Step 4: Share with your peers",
          body:
            "There are many other examples where neural networks and machine learning would be useful. Come up with one example and share it with your peers.",
        },
      ],
    },
    {
      id: "diagram",
      kind: "resource",
      title: "Propositional Network",
      body:
        "Each ellipse represents one proposition, with labelled links for agent, object, relation and subject. This is what allows the model to distinguish 'cats eat meat' from 'meat eats cats'.",
      images: [
        {
          alt: "Propositional network diagram with ellipses linking Cat, Cat food, Meat and Mouse via labelled agent, object, relation and subject links",
          caption:
            "Anderson and Bower's propositional network — propositions carry the relation type, not just the association.",
          src: "/images/business-psychology/hip/week-1/propositional-network.png",
        },
      ],
    },
    {
      id: "memory-tricks",
      kind: "note",
      title: "Memory Tricks — Elaboration and Mnemonics",
      items: [
        "Elaboration — linking a stimulus to other information at the time of encoding, via mental association.",
        "Elaborative rehearsal — repetition plus analysis: linking new information to existing information and processing it further.",
        "Mnemonics are memory aids that require elaborative rehearsal.",
        "Method of loci — sequential pieces of information are first associated with sequential locations in a very familiar room. When retrieving, you mentally walk around the room and retrieve the item at each location. Uses elaborative mental imagery.",
        "Peg-word system — you visually associate the items to be remembered with a jingle that you first memorise.",
        "Acronym — make a word where the letters stand for something (Big 5 personality: OCEAN; Great Lakes: HOMES; visible spectrum: ROY G. BIV).",
        "Multi-coding theory — memory is enhanced by using more than one type of coding: speak (vocal), hear (auditory), read (visual), write (kinesthetic), plus elaboration, self-reference and mnemonics.",
      ],
    },
    {
      id: "definitions",
      kind: "definition",
      title: "Definition Callout",
      definitions: [
        {
          term: "Semantic network (advanced)",
          definition:
            "Includes propositions — the smallest unit of meaning that can be true or false. Propositions make our semantic memory networks more precise: taking the correct path for a semantic outcome, joining the dots to make the mental picture.",
        },
        {
          term: "Connectionist network",
          definition:
            "A model where knowledge is stored in patterns of activity spread across many simple units (like neurons). Like a city skyline at night: no single light is 'dog'; instead the pattern of many lights glowing together is 'dog'. Remembering your grandmother's face isn't one 'face node', it's a pattern across many neurons firing together — eyes, smile, voice, emotions, all blended.",
        },
        {
          term: "Parallel distributed processing (PDP)",
          definition:
            "Activation of many nodes at the same time rather than one after another. This mirrors how the brain actually works — lots of neurons firing in parallel.",
        },
      ],
    },
    {
      id: "model-comparison",
      kind: "note",
      title: "Comparing the Three Models",
      items: [
        "Semantic network — knowledge is concepts as nodes linked by associations. Analogy: mind map or family tree. Example: 'Canary → Bird → Animal'. Strength: explains spreading activation, where one thought triggers another. Limitation: too simple; can't capture relation types ('is a' vs 'has a').",
        "Propositions — knowledge is mini sentences, the smallest true/false unit. Analogy: LEGO sentence blocks. Example: 'Toby has a dog' vs 'Toby is a dog'. Strength: captures meaning and relation type, not just links. Limitation: still abstract; doesn't explain how the brain encodes it.",
        "Connectionist (PDP) — knowledge is patterns of activation across many units. Analogy: city lights at night, or a fingerprint. Example: remembering grandma's face is many neurons firing together. Strength: mirrors how neurons work; explains flexibility and learning. Limitation: harder to visualise; less precise for symbolic rules.",
        "Shorthand: semantic = map of meanings; propositions = mini truth sentences; connectionist = neuron-like patterns. These networks are not mutually exclusive — they are evolutionary steps in modelling memory, different layers of explanation.",
      ],
    },
    {
      id: "feedback",
      kind: "reflection",
      title: "Feedback",
      body:
        "Knowing about memory networks helps us better understand how humans process and store information. Thinking about artificial intelligence, how would you write a program that can understand commands or recognise objects?",
    },
  ]),
  createLearningSubModule("Week 1 summary", [
    {
      id: "recap",
      kind: "summary",
      title: "Recap of this week's activities",
      body:
        "This week we covered the basic building blocks of cognition, from an overarching theoretical approach such as behaviourism to more specific theories on categorisation and knowledge-building. Cognition is a critical component of us as humans and informs how we view the world around us.",
    },
    {
      id: "this-week-you",
      kind: "summary",
      title: "This week you...",
      items: [
        "Discovered how cognition impacts almost every aspect of our day-to-day functioning.",
        "Learned about behaviourism and its competing approach, introspection.",
        "Explored how we conceptualise and store information derived from our environment.",
        "Evaluated a network-based approach to information storage.",
        "Critically analysed cognitive theories.",
      ],
    },
    {
      id: "look-ahead",
      kind: "summary",
      title: "A brief look ahead",
      body:
        "Next week we examine the specifics of how we retrieve and process information from our environment, particularly in the form of objects, words and faces.",
    },
  ]),
];

const humanInformationProcessingWeeklyTopics: WeeklyTopic[] = [
  {
    id: "week-1-foundations-of-human-thinking",
    week: 1,
    title: "Foundations of human thinking",
    summary:
      "Introduces cognition, cognitive perspectives, mental concepts, categorisation, and knowledge networks.",
    subModules: hipWeekOneSubModules,
    keyConcepts: [
      "Cognition",
      "Introspection and behaviourism",
      "Mental concepts and family resemblance",
      "Prototype and exemplar theory",
      "Semantic networks and propositions",
      "Connectionist networks (PDP)",
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
      "Explores how knowledge is obtained through perception, object and face recognition, attention, and priming.",
    subModules: createPlaceholderSubModules([
      "Week 2 introduction",
      "2.1 Perceiving and recognising objects: Word and object recognition",
      "2.2 Perceiving and recognising objects: Face recognition",
      "2.3 Attention: Selective attention",
      "2.4 Attention: Divided attention",
      "2.5 Attention: Priming",
      "Week 2 summary",
    ]),
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
      "Examines memory architecture, long-term memory, retrieval, consolidation, bias, and context.",
    subModules: createPlaceholderSubModules([
      "Week 3 introduction",
      "3.1 The architecture of memory",
      "3.2 Long-term memory",
      "3.3 Retrieving memories",
      "3.4 Memory and the brain",
      "3.5 Rehearsal and consolidatory strategies",
      "3.6 Biases in memory processing—part 1",
      "3.7 Biases in memory processing—part 2",
      "3.8 The importance of context",
      "Week 3 summary",
    ]),
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
      "Explores verbal and visual knowledge, language, language disorders, mental imagery, and applied uses.",
    subModules: createPlaceholderSubModules([
      "Week 4 introduction",
      "4.1 The fundamental structure of language",
      "4.2 Acquiring and interpreting language",
      "4.3 Disorders of language—part 1",
      "4.4 Disorders of language—part 2",
      "4.5 Mental imagery",
      "4.6 The extremes of imagery",
      "4.7 Applications beyond the lab",
      "Week 4 summary",
    ]),
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
      "Focuses on executive functions, development, adulthood, assessment, and common testing considerations.",
    subModules: createPlaceholderSubModules([
      "Week 5 Introduction",
      "5.1 What are executive functions?",
      "5.2 Executive functions in early development",
      "5.3 Adulthood and beyond",
      "5.4 Measuring executive functions",
      "5.5 Common issues with cognitive tests",
      "5.6 Additional assessment considerations",
      "Week 5 summary",
    ]),
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
      "Examines mental shortcuts, cognitive biases, reasoning, problem-solving, and skill acquisition.",
    subModules: createPlaceholderSubModules([
      "Week 6 introduction",
      "6.1 Mental shortcuts",
      "6.2 Cognitive biases",
      "6.3 Reasoning and thinking",
      "6.4 Problem-solving strategies",
      "6.5 Skill acquisition and learning",
      "Week 6 summary",
    ]),
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
    title: "Biopsychosocial models of Wellbeing",
    summary:
      "Explores wellbeing through biological, psychological, social, cultural, and resilience-based perspectives.",
    subModules: createPlaceholderSubModules([
      "Week 1 Introduction",
      "1.1 What is wellbeing?",
      "1.2 Historical concepts of wellbeing",
      "1.3 Introduction to the biopsychosocial model",
      "1.4 Current theoretical understanding from a biopsychosocial perspective",
      "1.5 Diverse views, values, beliefs and knowledge about wellbeing",
      "1.6 Aboriginal and Torres Strait Islander peoples' perception and expression of wellbeing",
      "1.7 Biopsychosocial risk and resilience factors for wellbeing",
      "Week 1 Summary",
    ]),
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
    title: "Resilliency models of wellbeing across the lifespan",
    summary:
      "Examines resilience across the lifespan, including individual, community, academic, risk, and protective factors.",
    subModules: createPlaceholderSubModules([
      "Week 2 Introduction",
      "2.1 What is resilience?",
      "2.2 Theoretical models of resilience factors",
      "2.3 Individual resilience",
      "2.4 Community resilience",
      "2.5 Academic resilience",
      "2.6 Identifying risk and resilience indicators",
      "2.7 Increasing resilience and reducing risk indicators",
      "2.8 Communicating risk and resilience factors",
      "Week 2 summary",
    ]),
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
      "Introduces positive psychology approaches to wellbeing, including optimism, gratitude, PERMA, and applied recommendations.",
    subModules: createPlaceholderSubModules([
      "Week 3 Introduction",
      "3.1 Stress and coping - what does the literature say?",
      "3.2 Positive psychology and optimism for wellbeing",
      "3.2.1 Psychological research on positive psychology and optimism for wellbeing",
      "3.3 Impact of gratitude on wellbeing",
      "3.4 The PERMA model of wellbeing",
      "3.5 Develop and communicate wellbeing recommendations for groups/organisations",
      "Week 3 summary",
    ]),
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
      "Explores goals, goal-setting, motivation, barriers, and evidence-based approaches to wellbeing-related behaviour change.",
    subModules: createPlaceholderSubModules([
      "Week 4 Introduction",
      "4.1 Your experience of goals and motivations",
      "4.2 Evidence-based goal setting",
      "4.3 SMART goals",
      "4.4 SWOT analysis of strengths and weaknesses",
      "4.5 Barriers to achieving goals",
      "4.6 Goal-achievement plan",
      "4.7 Intrinsic and extrinsic motivation",
      "4.8 Theories of motivation",
      "4.9 Applying motivation theory to wellbeing",
      "Week 4 summary",
    ]),
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
      "Examines emotion, emotional wellbeing, self-regulation, CBT, mindfulness, motivation, and individual differences.",
    subModules: createPlaceholderSubModules([
      "Week 5 Introduction",
      "5.1 What is emotion? What is the role of emotion in wellbeing?",
      "5.2 Indicators of emotional wellbeing",
      "5.3 Therapeutic interventions for emotion regulation management - CBT and mindfulness",
      "5.4 How emotion impacts motivation",
      "5.5 Self-regulation theory",
      "5.5.1 Character strengths",
      "5.6 Managing internal factors in self-regulation",
      "5.7 Individual differences in self-regulation",
      "Week 5 summary",
    ]),
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
      "Integrates psychological science with academic achievement, personal wellbeing, connectedness, and reflective practice.",
    subModules: createPlaceholderSubModules([
      "Week 6 introduction",
      "6.1 Strategies to support academic achievement",
      "6.2 How evidence-based strategies support personal wellbeing",
      "6.3 Connectedness and wellbeing",
      "6.4 Using psychological science to support Aboriginal and Torres Strait Islander peoples' social and emotional wellbeing",
      "6.5 Reflection on unit learning",
      "Week 6 summary",
    ]),
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


const hrm6005Week1ModuleImages: Record<string, { src: string; alt: string }> = {
  [slugify("1.2 Performance Management Systems")]: {
    src: "/images/business-psychology/hrm6005/week-1/module-1-2.png",
    alt: "Module 1.2 visual map — Performance Management Systems",
  },
  [slugify("1.3 Performance Management — A Multilevel Interpretation")]: {
    src: "/images/business-psychology/hrm6005/week-1/module-1-3.png",
    alt: "Module 1.3 visual map — A Multilevel Interpretation",
  },
  [slugify("1.4 Performance Management — A Process")]: {
    src: "/images/business-psychology/hrm6005/week-1/module-1-4.png",
    alt: "Module 1.4 visual map — A Process",
  },
  [slugify("1.5 Goal Setting")]: {
    src: "/images/business-psychology/hrm6005/week-1/module-1-5.png",
    alt: "Module 1.5 visual map — Goal Setting",
  },
  [slugify("1.6 Performance Management — Formality")]: {
    src: "/images/business-psychology/hrm6005/week-1/module-1-6.png",
    alt: "Module 1.6 visual map — Formality",
  },
  [slugify("1.7 Performance Management — A Critique (Part 1)")]: {
    src: "/images/business-psychology/hrm6005/week-1/module-1-7.png",
    alt: "Module 1.7 visual map — A Critique (Part 1)",
  },
  [slugify("1.8 Performance Management — A Critique (Part 2)")]: {
    src: "/images/business-psychology/hrm6005/week-1/module-1-8.png",
    alt: "Module 1.8 visual map — A Critique (Part 2)",
  },
};

function withHrm6005Week1Images(subModules: WeeklySubModule[]): WeeklySubModule[] {
  return subModules.map((subModule) => {
    const image = hrm6005Week1ModuleImages[subModule.id];
    return image ? { ...subModule, image } : subModule;
  });
}

const managingRewardingPerformanceWeeklyTopics: WeeklyTopic[] = [
  {
    id: slugify("Week 1: Performance Management Systems"),
    week: 1,
    title: "Performance Management Systems",
    summary: "",
    keyConcepts: [],
    assessmentLinks: [],
    image: {
      src: "/images/business-psychology/hrm6005/week-1/week-1-map.png",
      alt: "Week One mapped — visual summary of the week's content",
    },
    subModules: withHrm6005Week1Images([
      createLearningSubModule("1.1 Get to Know Your Assessment / Project Group", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "You will be working with your project group over weeks 1 and 2 to develop a presentation for Assessment 1.",
        },
        {
          id: "task",
          kind: "activity",
          title: "Task",
          body: "Each project group has its own dedicated discussion board. Visit this to introduce yourself to the rest of your group and organise your first meeting. You can use any method to coordinate and communicate with your team — you don't need to use the discussion board after the initial meeting.",
        },
      ]),
      createLearningSubModule("1.2 Performance Management Systems", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Performance management systems, like any systems, contain a set of principles and procedures that determine the way something is done. The aim of the activity is to become familiar with a PMS by examining its components.",
        },
        {
          id: "pms-diagram",
          kind: "activity",
          title: "The Components of a Performance Management System",
          body: "The image below presents an outline of the various components that make up a PMS.",
          images: [
            {
              alt: "Components of a performance management system",
              caption: "Components of a performance management system",
              src: "/images/business-psychology/hrm6005/week-1/pms-components.png",
            },
          ],
        },
        {
          id: "pms-component-definitions",
          kind: "definition",
          title: "PMS Component Definitions",
          definitions: [
            {
              term: "Performance management",
              definition:
                "Isn't the whole thing 'performance management'? Yes and no! 'Performance management' can also refer to the action of a manager 'managing' the performance of an individual or team that may not be performing. In essence, when someone isn't performing a manager may adopt a formal 'performance improvement plan' — a negotiated set of actions that the employee and manager agree on, so as to get the employee's output and/or behaviour back into appropriate alignment. This action is also referred to as 'performance management' — though in this case, it is framed in the negative. Managing underperformance needs to be done in a way that is appropriate and fair, and there is legislation to govern this (see the Fair Work legal framework note below).",
            },
            {
              term: "Performance management systems",
              definition:
                "Encompasses everything! The main emphasis on a performance management system is on the policies and processes; importantly however, it needs to be appropriately resourced by the organisation. By conceptualising performance management as a multi-level system — from the organisation (macro) to the manager (meso), to the employees (micro) — senior managers can see where there may be particular strengths or weaknesses in the system, and put in place interventions to improve things. For example, senior managers may get a report noting that female employees receive fewer financial bonuses than their male equivalents — and they can investigate whether there are gaps in the way performance is being measured, or inherent biases present in line managers, or poorly worded policies or processes. Systems are sometimes classed as 'formal' or 'informal' — but in truth, all systems have elements of formal (bureaucratic) and informal practices.",
            },
            {
              term: "The performance appraisal",
              definition:
                "The most 'visible' and 'applied' element of a performance management system. A performance appraisal is a process whereby an employee (usually) sits down with their manager, every six months or on an annual basis, and receives feedback about how they have performed. The appraisal never quite captures a full account of the actual performance of an employee, and can be subject to significant bias, which can make the whole process disempowering and, ironically, de-motivating. At the same time, it is an important step to ensure an employee is doing the job they are paid to do. In some contexts it may include an 'overall score' and potentially a stated financial bonus or reward — though whether an employee receives a reward is very much tied to their work context.",
            },
            {
              term: "Employee performance",
              definition:
                "The full account of an employee's output, both good and bad. Over the course of a year, it would be normal for an employee to have 'a few success stories' — where they have overdelivered on a target or KPI. At the same time, some KPIs may have been too ambitious (often referred to as 'stretch goals') and may not have been achieved in full. Performance encompasses both success and failure — but ideally the scale is tipped much more towards the success column. Performance is usually measured on reductionist, quantitative metrics — profit generated, widgets created — and in more and more work contexts such quantitative measures are a poor reflection of what performance is; occasionally narratives or case examples are used as discussion points in the appraisal process.",
            },
            {
              term: "Work behaviour and attitude",
              definition:
                "An account of how an employee 'operates' at work. Some organisations place great emphasis on people dressing professionally, being on time, being seen to work diligently; others are more results-oriented and give staff great freedom. Importantly, sometimes great performers can have negative work attitudes and poor behaviour, and poor performers may present with the right 'look and feel'. Accounting for behaviour and attitude is important to ensure bias isn't negatively affecting the result. Employees may also conduct corrupt, inappropriate, or negative work acts such as bullying, sexual harassment, or embezzlement. Irrespective of how good they are at performing, one of the roles of HRM is to keep such behaviour in check — mitigate it where possible and apply disciplinary actions where it is uncovered.",
            },
            {
              term: "Employee motivation",
              definition:
                "Captures the things that drive an employee to work. Motivation is a complex thing — influenced by the self (the employee themselves), the organisation and job design, as well as the reward and recognition structures that are put in place to drive employees' efforts and behaviours towards certain actions. Deep dive in week three.",
            },
            {
              term: "Work design (job design)",
              definition:
                "Has a huge impact on employee motivation and ultimately performance. Work design captures how, when, and where a person undertakes their work — the tasks that person does, the tools they use to do it (computers, phones, internet), the hours they work, the regularity of work. When exploring work design, we often use the Job Demands-Resources Model.",
            },
            {
              term: "Line manager support",
              definition:
                "It may seem like a small thing, but studies show that the way a line manager engages with their employees can predict between 50-80% of employee performance. Line managers have a fundamental role in negotiating and setting goals with their staff, and then monitoring and appraising their performance over time. However, there is an obvious power difference in the relationship, and for this reason biases, power struggles, politics, personality pathologies and office dynamics can get in the way of a constructive, supportive, and effective relationship.",
            },
            {
              term: "Performance management policies and processes",
              definition:
                "Most large organisations will have a performance management policy and associated processes — a set of formal parameters that articulate who does what to ensure performance against goals is being effectively set, monitored, and ideally met. The policies will detail processes for managing underperformance and employment termination. The policy may also detail actions related to employee misconduct — or such considerations may be dealt with in a separate policy (such as a code of conduct policy). Employee performance is sometimes linked with behaviour, and thus misconduct and underperformance are sometimes considered in tandem.",
            },
            {
              term: "Organisational support and resourcing",
              definition:
                "Many organisations have performance management policies, however, not all organisations will perform! For a performance management system to really work, it needs to be appropriately resourced — remuneration of staff, bonuses, other non-financial incentives, training for managers and employees. Without this organisational support, irrespective of how good 'on paper' any policy, process or action is, it will fail.",
            },
          ],
        },
        {
          id: "fair-work-legal-framework",
          kind: "note",
          title: "Fair Work Legal Framework (applies across the whole unit)",
          body: "Underperformance = not doing the job properly, breaching policies, or unacceptable/disruptive behaviour. It's distinct from serious misconduct (safety/reputation risk, or deliberate incompatible behaviour) — that's handled differently, via notice and final pay. Process an employer should follow:",
          items: [
            "Check the award, agreement, contract or policy first for any specific rules.",
            "Hold a private meeting — explain the issue, offer a support person, agree on clear improvement steps, document it.",
            "If needed, issue a written warning — clear reason, documented details, clear expectations, fair and reasonable.",
            "Follow up with regular check-ins.",
            "If no improvement, consider another meeting, further warning, changed duties/training, or (as a last resort) termination.",
            "Key legal point: there's no fixed rule requiring 1 or 3 warnings before dismissal — but the employee should generally get a genuine chance to improve. If they're later dismissed and claim unfair dismissal, the Fair Work Commission considers whether this process was followed.",
            "Best practice: employers should create and share a written performance management policy outlining what underperformance is, how it will be managed, and the possible consequences — kept up to date and applied consistently. It helps make expectations clear and prevents employees feeling treated unfairly.",
          ],
          links: [
            {
              href: "https://www.fairwork.gov.au/employment-conditions/performance-in-the-workplace#what-is-underperformance",
              label: "Fair Work — Managing underperformance",
            },
          ],
        },
        {
          id: "jdr-reading",
          kind: "resource",
          title: "Optional Additional Reading: Schaufeli & Taris (2014)",
          body: "Schaufeli, W., & Taris, T. (2014). A Critical Review of the Job Demands-Resources Model: Implications for Improving Work and Health. In Bridging Occupational, Organizational and Public Health: A Transdisciplinary Approach (pp. 43-68).",
        },
        {
          id: "jdr-summary",
          kind: "summary",
          title: "Article Summary: Job Demands-Resources (JD-R) Model",
          body: "Core idea: two processes drive employee wellbeing. Health impairment process: high job demands → strain/burnout → health problems. Motivational process: high job resources → engagement → positive performance outcomes. Job demands = aspects requiring effort with physical/psychological costs (workload, conflict, job insecurity). Job resources = aspects that help achieve goals, reduce demands, or drive growth (feedback, autonomy, support).",
          items: [
            "History: 2001 (Demerouti et al.) original model focused on burnout only; 2004 (Schaufeli & Bakker) revised model added work engagement as the positive counterpart; later extended to include personal resources (self-efficacy, optimism, resilience).",
            "Evidence: strong, consistent support across countries/industries. Resources reliably predict engagement; demands reliably predict burnout. Some evidence of reciprocal causation — engagement can build future resources ('gain spirals'). Buffering interaction effects are real but weaker than direct effects.",
            "Unresolved issue 1 — Epistemological status: it's a descriptive/heuristic model, not explanatory — it doesn't say why specific resources work.",
            "Unresolved issue 2 — Demands vs. resources isn't clean: a 'challenge' demand can motivate; a 'resource' can feel threatening. Authors suggest redefining by valence.",
            "Unresolved issue 3 — Personal resources' role is inconsistent — mediator, moderator, or third variable across studies.",
            "Unresolved issue 4 — Health impairment and motivational processes may not be fully separate — they seem to interact/overlap.",
            "Unresolved issue 5 — Reciprocal causation: demands/resources and outcomes influence each other over time, not just one-way.",
            "Unresolved issue 6 — Multilevel issues: applying the model to teams/organisations requires matching the level of measurement, which many studies get wrong.",
            "Practical value: the model's flexibility is its main strength. The JD-R Monitor is used in an 8-step cycle: define problem → design survey → communicate → run survey/give individual feedback → analyse/report → discuss results → intervene → evaluate and repeat.",
            "Bottom line: JD-R is popular because it's broad and practical, but that breadth means it lacks precision — using it well requires pairing it with more specific psychological theories.",
          ],
          images: [
            {
              alt: "The revised Job Demands-Resources (JD-R) model",
              caption: "The revised Job Demands-Resources (JD-R) model (Fig 4.1)",
              src: "/images/business-psychology/hrm6005/week-1/jdr-model.png",
            },
          ],
        },
        {
          id: "my-notes",
          kind: "journal",
          title: "My Notes from Week 1",
          items: [
            "The way that a line manager engages with their employees can predict between 50-80% of employee performance.",
            "Effort Reward Imbalance (ERI) model.",
            "The revised JD-R model included work engagement in addition to burnout and considered burnout and work engagement to be mediators of the relation between job demands and health problems, and job resources and turnover intention, respectively.",
            "Work engagement refers to a positive, fulfilling, work-related state of mind characterised by vigor (high levels of energy and mental resilience while working), dedication (a sense of significance, enthusiasm, and challenge), and absorption (being focused and happily engrossed in one's work).",
            "Burnout will lead to health problems, such as depression, cardiovascular disease, or psychosomatic complaints.",
            "Job resources have inherently motivational qualities (effort-recovery theory).",
            "Offering many resources fosters workers' willingness to dedicate their efforts and abilities to the work task (extrinsic motivation).",
            "They also play an intrinsic motivational role because they satisfy basic human needs for autonomy and relatedness.",
            "Personal resources = psychological characteristics or aspects of the self that are generally associated with resiliency and state management (inner game).",
          ],
        },
      ]),
      createLearningSubModule(
        "1.3 Performance Management — A Multilevel Interpretation",
        [
          {
            id: "purpose",
            kind: "purpose",
            title: "Purpose",
            body: "At a conceptual level, understanding how an organisation develops strategies and how these strategies translate into employee actions at the bottom of the hierarchy are important for seeing how PMSs work in practice. This task provides the cognitive tools to conceptualise organisational actions from the macro to the meso and the micro then back again.",
          },
          {
            id: "why-we-work",
            kind: "activity",
            title: "Let's Get High Level",
            steps: [
              {
                id: "why-do-we-work",
                title: "Why do we work?",
                body: "Rather than being a rhetorical question, the purpose of asking why we work is an important one. We need to ask it to understand why we have organisations, departments, teams, bosses, colleagues, targets, objectives, computers, the internet, etc. Organisations have emerged, particularly within the last 800 years, for specific purposes and generally to create value of some kind (money, profit, societal health, knowledge, faith, etc.).",
              },
              {
                id: "notion-of-company",
                title: "Where does the notion of a company come from?",
                body: "The word 'company' was derived to describe a group of wheat farmers on the island of Sardinia. The biggest trading bloc at the time, the Genovese, sent their ships to Sardinia each year to collect wheat. The Sardinian families realised they could negotiate a better deal if they combined forces and negotiated as a collective. 'Company' derives from 'com' (Latin for 'with or together') and 'pania' ('the making of bread'). The Sardinians' organisation was derived to create value from making bread — the etymology gives an indirect answer as to why work and organisations exist.",
              },
              {
                id: "purpose-fit",
                title: "How does purpose fit in?",
                body: "Knowing that all organisations exist to create a particular sort of value is key to understanding how work is structured and how we measure whether that work generates the desired value (i.e. performance management). This also allows us to consider the macro force of the organisation itself and the role of micro forces, such as employees, in generating outcomes.",
              },
            ],
          },
          {
            id: "top-down-bottom-up",
            kind: "activity",
            title: "Top-Down and Bottom-Up Management",
            body: "Examine the two management styles known as the top-down and bottom-up management approaches. See also Lee (2021), Top-down or bottom-up management: which is best for your business?",
            images: [
              {
                alt: "Top-down vs bottom-up management approaches",
                caption: "Top-down vs bottom-up management approaches",
                src: "/images/business-psychology/hrm6005/week-1/top-down-bottom-up.png",
              },
            ],
          },
          {
            id: "how-it-ties-in",
            kind: "summary",
            title: "How This Ties Into Performance Management",
            items: [
              "Organisations generally form strategies from the top-down but have important feedback loops (heuristics) for getting new ideas from employees at the bottom of the hierarchy and championing them up the line.",
              "Performance management is almost always a top-down process. It starts with senior leaders setting broad targets for the organisation and often for each division or function — termed a 'strategy'. A strategy has objectives (statements of desired functional performance) and objectives have KPIs (quantifiable metrics that evidence the objective has been met).",
              "Division managers receive the objectives and KPIs, decide which KPIs go to which work team, and pass these to team leaders. Team leaders bring their KPIs into performance planning meetings and apportion targets and goals to team members. Bureaucracy in action!",
              "This varies across contexts and industries. Performance in some organisations is difficult to quantify, particularly in knowledge-intensive and service sectors (education, health, scientific research). A nurse can't be told to save 100 lives a year — instead they get goals about how to treat patients and deploy their time.",
              "Goals are generally set top-down, but performance cascades up: individual output combines into team performance, teams into divisions, and divisional performance aggregates into the organisation's overall performance.",
            ],
          },
          {
            id: "flow-diagram",
            kind: "activity",
            title: "My Flow Diagram: Goals Down, Performance Up",
            body: "Task: draw a flow diagram showing how goals and KPIs flow from the top of the organisation down to the employee and how performance cascades from the employees to the whole organisation.",
            images: [
              {
                alt: "Flow diagram of goals and KPIs flowing down and performance cascading up",
                caption: "Goals & KPIs flow down; performance cascades up",
                src: "/images/business-psychology/hrm6005/week-1/goals-kpi-flow-diagram.png",
              },
            ],
          },
        ],
      ),
      createLearningSubModule("1.4 Performance Management — A Process", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Performance management systems involve a series of components that interlock to manage performance. The act of performance management should also be conceived of as a flow or cycle. In this activity, you explore a process (or flow) model of performance management.",
        },
        {
          id: "process-order",
          kind: "activity",
          title: "Ordering the Process",
          body: "A well-designed and executed performance management process has a flow-on effect from the employee to the manager, team, and ultimately the organisation. The individual processes below are ordered into a performance management process as a whole.",
          images: [
            {
              alt: "Performance management process steps",
              caption: "Performance management process steps",
              src: "/images/business-psychology/hrm6005/week-1/pm-process-steps.png",
            },
          ],
        },
        {
          id: "process-steps",
          kind: "summary",
          title: "The Steps Explained",
          items: [
            "Induction and socialisation — happens in the first days, weeks and months of joining. Formal elements include a sit-down with the line manager where broad expectations and supports are outlined; informal engagement comes from interactions with peers and observing how things get done. Important for orienting the employee to the written and unwritten rules of the place.",
            "Performance planning — a regular, formal process between employee and line manager. Goals are decided and negotiated, with delivery dates stipulated. May happen annually, six-monthly or more frequently. The power difference means the process is open to abuse, coercion, corruption and unfairness; happening behind closed doors can also create inequity between colleagues.",
            "Informal monitoring — not always conducted, but managers are generally expected to check in on progress. Can be supportive and collaborative, or malicious surveillance and micromanagement — the latter is detrimental to performance because it strips autonomy. If done incorrectly (even unintentionally) it undermines its own purpose.",
            "Performance appraisal — every six or twelve months, the employee examines performance against previously defined goals with their manager. Necessarily formal, can be subject to legal deliberations, so some account is generally recorded.",
            "Reward and recognition — in some contexts the appraisal is tied to rewards, particularly retail bonus structures. Where there is no bonus structure, past appraisals may be tied to promotion opportunities.",
            "A hidden step: career development — managers are expected to counsel subordinates on career development. With the power imbalance, this is fraught: an instrumentalist manager has a conflict of interest in keeping an excellent employee, while a supportive manager knows guiding an employee's next stage positively impacts their current motivation.",
            "'Bring us back to do' — performance management is a cycle. When work has been appraised, planning for the next cycle happens all over again, until you leave the organisation.",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "The purpose of reflecting on this process is to bring to the consciousness that which has been unconscious. By exploring how organisational actions (formal and informal) have shaped our feelings, emotions and experiences, we can gain enhanced abilities in planning, strategising and improving our organisations.",
        },
      ]),
      createLearningSubModule("1.5 Goal Setting", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Examine goal-setting templates commonly used in organisations as part of their performance planning process. Context: there is a motivation theory called goal-setting theory, which states that people who set goals achieve goals, even if they don't achieve the goals they set out to achieve. (Have a go at memorising that.) Goal setting has become entrenched in standard organisational behaviour, particularly as it applies to performance management.",
        },
        {
          id: "smart-goals",
          kind: "activity",
          title: "SMART Goals",
          body: "In every course, workshop or seminar on performance management, goal setting is given narrow but explicit attention — generally the part of performance planning where goals are set between supervisor and employee. Such goals should be SMART. The figures below show the acronym and pointers on how SMART goals provide parameters and eliminate guesswork. All of these things are true, but they are not the whole truth as to how work is conducted and how work performance is generated — for that we must delve into the critical perspective of performance management.",
          images: [
            {
              alt: "SMART goals acronym",
              caption: "SMART goals",
              src: "/images/business-psychology/hrm6005/week-1/smart-goals.png",
            },
            {
              alt: "SMART goal pointers",
              caption: "How SMART goals eliminate guesswork",
              src: "/images/business-psychology/hrm6005/week-1/smart-goals-pointers.png",
            },
          ],
        },
        {
          id: "sap-article",
          kind: "resource",
          title: "SAP: 10 Ways to Improve the Performance Management Process",
          body: "Article summary — Performance management process (3 stages): plan/set goals → monitor performance → evaluate/recognise. Cycle repeats.",
          items: [
            "Cadence: traditional = quarterly/annual reviews only. Continuous = ongoing, real-time.",
            "Goal tracking: continuous checks off goals as completed, in-system, visible to manager/team in real time — not saved up for a review.",
            "Cascading goals: set at corporate level, broken down through functions to individuals; continuous systems let these be adjusted live if strategy shifts, rather than locked for the year.",
            "Documentation: continuous captures achievements and 1:1s as they happen, so the annual review 'writes itself'.",
            "Feedback: continuous = ongoing coaching and feedback loops. Traditional = feedback saved for the periodic review.",
            "Business impact per SAP: better retention, clearer internal mobility/promotion paths, higher productivity, and a more direct link from review to compensation planning.",
            "One caution: don't jump straight from no process (or traditional) to full continuous overnight — it's a shift best made gradually.",
          ],
          images: [
            {
              alt: "SAP performance management process",
              caption: "SAP performance management process",
              src: "/images/business-psychology/hrm6005/week-1/sap-performance-management.png",
            },
          ],
        },
        {
          id: "history-videos",
          kind: "resource",
          title: "Where Do These Notions Come From? (Videos)",
          body: "More and more organisations are implementing app-based performance management systems with built-in goal setting. But where do these notions of work, goal setting and performance come from, and are they a true reflection of how work happens? Watch these two short clips.",
          links: [
            {
              href: "https://www.youtube.com/watch?v=kNrvxh8R1KU",
              label: "Classical History of Management (Lachina Creative, 2016)",
            },
            {
              href: "https://www.youtube.com/watch?v=6O9T7bqGAgI",
              label: "Frederick Taylor | Scientific Management Explained (Two Teachers, 2021)",
            },
          ],
          images: [
            {
              alt: "Classical History of Management video",
              caption: "Classical History of Management",
              src: "/images/business-psychology/hrm6005/week-1/video-classical-history-management.png",
            },
            {
              alt: "Frederick Taylor Scientific Management video",
              caption: "Frederick Taylor | Scientific Management Explained",
              src: "/images/business-psychology/hrm6005/week-1/video-taylor-scientific-management.png",
            },
          ],
        },
        {
          id: "taylorism",
          kind: "note",
          title: "Taylorism and Counterintuitive Goals",
          body: "Goal setting and SMART goals are tied to a somewhat archaic notion of work termed 'scientific management', often referred to as Taylorism. Taylorism has received a lot of criticism — the most discussed example being its application to the US forces in the Vietnam War by Robert McNamara. There are many anecdotal examples of poor goal setting applied to work: bus drivers paid for arriving at each stop on time who decided not to pick up some customers; truck drivers paid for delivering at a set time who race dangerously through traffic, drive fatigued, and cause accidents. Most of us have worked in contexts where set goals or performance expectations seem counterintuitive to the actual function of work.",
        },
        {
          id: "bad-goals",
          kind: "summary",
          title: "Ben Taylor (2018): 7 Examples of Bad Goals, and How to Fix Them",
          items: [
            "Picking numbers on a whim — base targets on past performance, not guesses.",
            "Ignoring other teams' dependencies — goals should be within your own team's control; if multi-team, agree on top-level objectives upfront.",
            "Missing a middle step — the path from step 1 to the end result needs to be as clear as the start and finish.",
            "Overly aggressive goals — can demotivate and crowd out other responsibilities; base goals on what's realistically achievable.",
            "Goals disconnected from org strategy — regularly check goals still align with what the wider business actually needs.",
            "Too many goals at once — focus on 1-2 big priorities at a time rather than juggling a long list.",
            "Skipping the review — don't just tick goals off; review what worked/didn't, since that makes setting the next round much easier.",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "We covered SMART goals in one quick-action 'band aid rip'. It is important to understand goal setting, but equally there are some gaping limitations to it as an approach. As Einstein said, 'Not everything that counts can be counted.'",
        },
      ]),
      createLearningSubModule("1.6 Performance Management — Formality", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Explore the formality-informality paradigm as it relates to performance management.",
        },
        {
          id: "formal-informal-activity",
          kind: "activity",
          title: "Formal, Informal, or Either?",
          body: "Correctly identify the following actions as either being formal, informal, or either.",
          images: [
            {
              alt: "Formal vs informal actions activity",
              caption: "Formal vs informal actions",
              src: "/images/business-psychology/hrm6005/week-1/formal-informal-activity.png",
            },
          ],
          steps: [
            {
              id: "handshake",
              title: "Shaking your boss's hand at the start of a job interview",
              body: "Formal — it forms part of the formal recruitment process. If the handshake were considered inappropriate (coerced and/or a basis of harassment), it could be used against the boss in legal proceedings. As job interviews are formal, all engagements associated with them should be considered formal.",
            },
            {
              id: "coffee",
              title: "Grabbing a coffee with your boss at the local café to discuss a problem with a report",
              body: "Generally informal — but context counts. If you are raising issues of pertinent concern (such as an ethical issue), it could become a formal meeting. Asking your boss for advice is generally not a formal process, particularly outside a performance appraisal.",
            },
            {
              id: "closed-door",
              title: "A closed-door meeting to appraise your performance with your boss",
              body: "Formal — closed-door meetings and performance appraisals are part of a formal process of work.",
            },
            {
              id: "cat-email",
              title: "Sending an email to your boss regarding your cat",
              body: "Formal — any email forms part of a workplace's communication platform, even if the tone is lighter or informal. Emails can form part of legal or disciplinary proceedings against parties who violate laws or workplace communication policies.",
            },
            {
              id: "staff-meeting",
              title: "Raising concerns about resourcing in a monthly staff meeting",
              body: "Formal — any staff meeting, whether minuted or not, is a formal action.",
            },
            {
              id: "hallway-chat",
              title: "Chatting to your boss's boss in the hallway about their weekend",
              body: "Informal — simply chatting to people higher in the hierarchy doesn't make the process formal, though you will perceivably shape your interaction according to the other person's status.",
            },
          ],
        },
        {
          id: "formal-informal-summary",
          kind: "summary",
          title: "Formal vs Informal Processes",
          items: [
            "Formal processes may be written down, subject to legal proceedings and/or form part of the standard operations of a workplace. A lot of work processes are formal.",
            "Informal processes are off the record and potentially more social. They are essential to a good working environment — a humanising aspect of work is when employees feel they have a voice to unofficially share ideas, concerns, happiness, and pain without fear it will reflect badly on their measured performance.",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "While the performance appraisal process is formal, good managers know that the secret to successfully promoting performance in the employees they manage relies on setting up effective informal support and communication channels.",
        },
        {
          id: "networks-reading",
          kind: "resource",
          title: "Optional Reading: The Role of Informal and Formal Networks",
          body: "Study: 272 Australian engineers/asset managers (public & private sector) surveyed to test how workplace relationships affect access to resources and innovative behaviour. Key idea: alongside the usual formal relationships (supervisor-employee = LMX, employee-organisation = POS), the authors identify a third, informal relationship — ILMX (Informal Leader-Member Exchange) — a bond with a non-line senior manager, often built through shared professional networks outside the direct reporting line.",
          items: [
            "POS and ILMX both significantly predicted employees' perception of having adequate resources (staff, time, support).",
            "LMX (direct supervisor relationship) did not significantly predict resource adequacy — surprising, since it's usually the assumed driver.",
            "Resource adequacy strongly predicted a proactive culture (60.5% variance explained) and, together with that culture, explained 28.1% of innovative behaviour.",
            "No significant difference between public and private sector employees — the two sectors have converged, likely due to outsourcing and shared accountability pressures.",
            "Practical takeaway: when your direct manager can't or won't unlock resources, an informal ally elsewhere in senior management — someone who shares your professional values — can be just as, or more, effective at getting you what you need to be proactive and innovative. Organisations should recognise and support these informal networks rather than relying solely on the formal chain of command.",
          ],
        },
      ]),
      createLearningSubModule("1.7 Performance Management — A Critique (Part 1)", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "What if, in trying to measure an employee's performance, we were in fact negatively affecting it? Does measuring an employee's performance and potentially assigning them a reward actually stimulate performance? Or is it an ethically ambiguous managerial action that can lead to negative outcomes of biblical proportions like the global financial crisis? The purpose of this topic is to navigate and review a critique of performance management.",
        },
        {
          id: "assessment-note",
          kind: "note",
          title: "Assessment Relevance",
          body: "This topic requires engagement with three academic texts. The topic and the texts may be directly relevant for the third major assignment (final report). Take notes in the weekly learning journal, highlighting and reflecting on sections of the texts of interest.",
        },
        {
          id: "qiu-summary",
          kind: "summary",
          title: "Qiu et al. (2015): Appraisal Purpose and Proactive Behavior",
          body: "Study: Qiu, Hu, Zhang & Li (2015), Social Behavior and Personality, n=512 Chinese employees. Question: does performance appraisal purpose (evaluative vs. developmental) affect employee proactive behavior, and what mediates this?",
          items: [
            "Evaluative appraisal (past-focused, tied to pay/promotion) → no direct effect on proactive behavior, but hurts it indirectly by lowering psychological ownership.",
            "Developmental appraisal (future-focused, training/growth) → direct positive effect on proactive behavior, plus indirect positive effects via higher psychological ownership and higher self-efficacy.",
            "Self-efficacy boosts psychological ownership, which in turn drives proactive behavior (organizational, interpersonal, and personal types).",
            "Practical takeaway: appraisals framed around growth/development build employees' sense of ownership and confidence, which drives initiative-taking. Purely evaluative, backward-looking appraisals can quietly undermine ownership even without an obvious direct hit to proactivity.",
            "Caveats: self-report data, single cognitive/individual-level lens, moderate model fit (CFI .882, RMSEA .064) — authors flag need for broader factors (autonomy, culture) in future work.",
          ],
        },
        {
          id: "psychological-ownership",
          kind: "definition",
          title: "Definition",
          definitions: [
            {
              term: "Psychological ownership",
              definition:
                "A state in which individuals feel as though the target of the ownership — material or immaterial in nature — or a piece of it, is theirs (Pierce, Kostova, & Dirks, 2001; Pierce, Rubenfeld, & Morgan, 2001).",
            },
          ],
        },
        {
          id: "figure-analysis",
          kind: "activity",
          title: "Reading the Model (Figure, p. 1106)",
          body: "The figure on page 1106 links the study's variables. Key path coefficients:",
          images: [
            {
              alt: "Qiu et al. (2015) model figure with path coefficients",
              caption: "Qiu et al. (2015) — path model, p. 1106",
              src: "/images/business-psychology/hrm6005/week-1/qiu-model-figure.png",
            },
          ],
          steps: [
            {
              id: "path-negative-11",
              title: "−.11** — EPA → psychological ownership",
              body: "The relationship linking evaluatively focused performance appraisal and psychological ownership. The asterisks mean statistical significance — 95% of the time there was a consistent trend across the sample. Negative: for every one-unit increase in evaluative focus, an 11% reduction in psychological ownership. The more evaluatively focused the appraisal, the less the employee felt it reflected the work they did.",
            },
            {
              id: "path-30",
              title: ".30** — psychological ownership → personal proactive behaviour",
              body: "Positive: when people felt psychological ownership over the appraisal, they were more proactive at work — the desired outcome. But a positive relationship cuts both ways: if psychological ownership is low (as per the path from EPA), personal proactive behaviour will also be low.",
            },
            {
              id: "path-49",
              title: ".49** — DPA → self-efficacy",
              body: "The link between developmentally focused performance appraisal and self-efficacy is positive (.49 is a big deal in this kind of analysis). Developmentally focused appraisals correlated with increased feelings of self-efficacy — belief in one's ability to achieve their goals.",
            },
          ],
        },
        {
          id: "summary",
          kind: "summary",
          title: "Summary",
          body: "When an appraisal is evaluatively focused, employees tend to disassociate themselves from it (reduced psychological ownership). This is a really bad outcome, because psychological ownership is correlated with proactive behaviour — a person will be less proactive as a result of their evaluatively focused performance appraisal.",
        },
      ]),
      createLearningSubModule("1.8 Performance Management — A Critique (Part 2)", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "This activity is a continuation of our research into critiquing performance management.",
        },
        {
          id: "hbr-summary",
          kind: "summary",
          title: "Cappelli & Tavis (2016): The Performance Management Revolution (HBR)",
          body: "Core argument: companies are dropping annual appraisals in favor of frequent, informal check-ins — shifting focus from accountability to development.",
          items: [
            "History (accountability ↔ development pendulum): WWI/WWII appraisals built for weeding out/ranking (military origin); 1950s-60s McGregor pushed employee-led goal-setting and GE split accountability from development discussions; 1970s-90s inflation, Jack Welch's forced ranking, exec pay rules and the 'War for Talent' pulled focus back to accountability; 2011+ Adobe, then Deloitte/PwC/Accenture/GE dropped annual reviews for frequent feedback.",
            "Three business drivers: faster employee development (especially professional services); agility — goals set annually don't survive changing projects/markets; teamwork over individual ranking (e.g., Gap, Sears).",
            "Persistent challenges: aligning individual goals with fast-shifting company goals; still needing a way to reward/differentiate performance; identifying poor performers without annual documentation; legal/discrimination risk without 'objective' scores; feedback systems/tech not built for continuous input.",
            "Some firms (Deloitte, PwC, New York Life) reintroduced a 'third way' — informal feedback plus periodic multi-dimension ratings — after going fully numberless caused problems.",
            "Bottom line: not a fad — driven by real business need for speed and development — but full removal of ratings has proven hard to sustain; hybrid models are emerging.",
            "Connection: Qiu et al. gives the psychological mechanism (ownership/self-efficacy) for why developmental appraisal works; this article gives the industry trend and practical models companies are using.",
          ],
        },
        {
          id: "debate",
          kind: "discussion",
          title: "Debate: Drop or Keep Evaluative Appraisals?",
          body: "Cappelli & Tavis identify three reasons why evaluative performance appraisals have been dropped: a return of people development, the need for agility, and the centrality of teamwork. They also identify reasons for retaining them: appraisals align individual and company goals, reward performance, identify poor performers, avoid legal troubles, and manage the feedback firehose. Consider whether the reasons for dropping outweigh the reasons to keep them.",
        },
        {
          id: "tweedie-summary",
          kind: "summary",
          title: "Tweedie et al. (2019): How Does Performance Management Affect Workers?",
          body: "Literature review (IJMR) on how PM affects workers, across three stages. Core argument: HRM and Critical HRM both under-theorise worker wellbeing as an end in itself — HRM subordinates it to org performance, CHRM focuses on power but not psychic harm. Recognition theory fills this gap by giving vocabulary for how (mis)recognition damages or sustains self-identity through work.",
          items: [
            "1. Mainstream HRM — three phases, each more socially aware but more organization-focused, not worker-focused: Phase I (1920s-90s) fixing rating accuracy (trait scales, MBO, BARS) — never solved; Phase II (80s-90s) PM's 'social context' — justice perceptions, fairness — but still to serve org performance; Phase III fully integrating PM into strategy/profit — worker wellbeing recedes further.",
            "2. Critical HRM — three theoretical lenses: labour process theory (Marxist, Braverman) — PM as class control tool; Foucauldian theory — PM as discursive power that disciplines workers into 'docile', self-monitoring subjects; conflicting rationalities (Habermas) — 'relational' (communicative, consent-based) vs 'transactional' (instrumental) PM, with instrumental logic tending to 'colonise' the relational.",
            "3. Recognition theory (the paper's proposed advance) — Axel Honneth: three recognition types — love (self-confidence), rights (self-respect), esteem (self-esteem, tied to work); PM = proxy judgment of a worker's social contribution. Christophe Dejours: esteem from management/clients (usefulness) vs colleagues (quality/'beauty'); misrecognition → suffering, breakdown of collegial bonds, even linked to workplace suicides.",
            "Reading tip: it's a big reading — the essential stuff is in the first six pages (up to page 82).",
          ],
        },
        {
          id: "journal",
          kind: "journal",
          title: "My Journal Entries",
          items: [
            "Three phases of HRM research — Mainstream HRM. Core question: does PM help the org? This phase is organisation-focused, not worker-focused. Research focuses on eliminating measurement error, understanding PM's social context, and integrating PM into org strategy. HRM research considers workers' perceptions and experiences, but leans towards a performative lens. Worker wellbeing only matters insofar as it affects org performance, never as an end in itself.",
            "Critical HRM research. Core question: does PM exert power/control over workers? Frames PM as a disciplinary, coercive or inequitable management device; generally ignores employee wellbeing or development. Overwhelmingly qualitative and viewed as anti-performative. Three influential approaches: labour process theory (PM as class control to extract more effort), Foucauldian theories (PM as discourse shaping workers into 'docile', self-monitoring subjects), and conflicting rationalities (relational vs transactional PM).",
            "Recognition theory. Core question: does PM protect or damage the worker's basic sense of self? Being properly acknowledged for your work is essential to psychological wellbeing — not just a 'nice to have'. Honneth: three types of recognition tied to parts of the self — love (close relationships) = self-confidence; rights (legal/civil equality) = self-respect; esteem (work) = self-esteem. At work, esteem = having your specific contribution acknowledged as valuable; appraisals are essentially judgements about this (appreciation for loyal service, admiration for skill/talent). Dejours: work is inherently a struggle against resistant reality, which causes stress; esteem makes that stress bearable and turns it into growth instead of harm. Two sources: management/clients recognise usefulness; colleagues/peers recognise quality — only people who do the same work can really judge if it's good. Core risk: 'misrecognition' — when PM systems fail to see or value real contribution (e.g., a call centre only measuring call times, ignoring actual customer care) — can cause genuine psychological harm; Dejours links this to burnout and even workplace suicides.",
            "Labour process theory (80 words): a Marxist approach to work in organisations — workplaces as sites of class struggle over control of labour. Applied to PM, managers use it as a control mechanism to extract effort and maintain dominance — not just through direct oversight, but by getting workers to monitor and regulate their own behaviour and making output more visible so it's easier to control. Real-world example: Amazon warehouse workers — pick rates, scan times and 'time off task' tracked minute by minute. Visibility (every action tracked), self-regulation (workers speed up on their own to avoid flags), extraction (the system squeezes maximum output; those who fall short get warnings or fired). The theory says this PM system exists purely to serve efficiency/profit goals — not to help workers develop or feel valued.",
            "What is pleasing about Phase 3 (80 words): it invites the worker into the process by seeking feedback (procedural justice). Individual performance data is linked directly to firm-level metrics like profitability — less about the rating tool and more about whether aggregating everyone's performance moves the business numbers.",
            "Why have HRM scholars paid scant attention to an employee-centric model (80 words): HRM was primarily a performance function designed to ensure workers are performing, with initial models taken from the World Wars where performance meant life or death. Org growth was the primary goal at executive level, so anything not attributing to that goal was seen as wastage that could be removed — a replaceability culture.",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "You survived! The purpose of the final activity was to see that, although there are strong criticisms of performance management, it serves as a necessary evil in organisations. The truth is less absolute — performance management that is too evaluative and in the wrong context can be disastrous. But a none-at-all approach also poses problems.",
        },
      ]),
    ]),
  },
  {
    id: slugify("Week 2: The Performance Appraisal and Bias"),
    week: 2,
    title: "The Performance Appraisal and Bias",
    summary:
      "Picking up from last week's critique of evaluative appraisals, this week builds practical capability in critiquing, using and navigating performance appraisals — and the biases that distort them. The content directly supports Assessments 1 and 2.",
    keyConcepts: [
      "Performance appraisal features: qualitative feedback, quantitative metrics, overall ratings, and the formal sign-off.",
      "Feedback platforms: top-down line manager review, 360-degree multi-rater feedback, and the balanced scorecard.",
      "Reductionist rating systems condense complex information into a single score — useful for decisions, costly in context.",
      "The feedback sandwich is widely espoused but not supported by the evidence; Corrective-Positive-Positive outperformed it.",
      "Empathic concern measurably improves how negative feedback lands, and benefits the leader's own promotability.",
      "Rater and method bias: recency, primacy, halo/horns, central tendency, leniency, similar-to-me, idiosyncratic, confirmation, gender, and the law of small numbers.",
    ],
    assessmentLinks: [
      "Assessment 1 (Presentation): use the bias material to critique the performance appraisals in the task.",
      "Assessment 2: journal notes on bias, feedback frameworks, and the empathy/EQ action list feed directly into the response.",
    ],
    image: {
      src: "/images/business-psychology/hrm6005/week-2/rater-bias.jpeg",
      alt: "Week 2 — the performance appraisal and bias",
    },
    subModules: [
      createLearningSubModule("Week 2 Introduction", [
        {
          id: "overview",
          kind: "purpose",
          title: "Purpose",
          body: "We left last week's content by exploring broad issues related to performance management, paying particular attention to the failings of evaluative performance appraisals relative to developmentally focused ones. This week picks up where that left off and builds specific capabilities in critiquing, utilising and navigating performance appraisals. The topic is built around the skills and knowledge needed for progression through the first and second assessment items.",
        },
        {
          id: "learning-objectives",
          kind: "objectives",
          title: "Learning Objectives",
          body: "After successfully completing this week's tasks, you should be able to:",
          items: [
            "Examine different elements of performance appraisals.",
            "Explore top-down, multi-user and balanced scorecard feedback platforms.",
            "Critique common verbal and written feedback frameworks.",
            "Examine the issue of user and rater bias as it applies to performance appraisals.",
          ],
        },
      ]),
      createLearningSubModule("2.1 The Performance Appraisal", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Immerse yourself in the features and components common to performance appraisals. A lot of attention in this unit is paid to appraisals and to the general aspects of work — though the actual appraisal document itself is typically underwhelming to look at.",
        },
        {
          id: "appraisal-form",
          kind: "activity",
          title: "Step 1: Features of an Appraisal Form",
          body: "Identify the generic features common to performance appraisal forms by analysing a standard template.",
          images: [
            {
              alt: "Performance appraisal form features",
              caption: "Common features of a performance appraisal form",
              src: "/images/business-psychology/hrm6005/week-2/appraisal-form-features.png",
            },
          ],
        },
        {
          id: "appraisal-elements",
          kind: "summary",
          title: "Step 2: Going Deeper Into the Elements",
          items: [
            "Beyond the generic features, appraisals may include a space for an overall rating, and — where rewards, commissions or bonuses apply — those may be listed too.",
            "Appraisals generally combine qualitative feedback (written, verbal, open-ended) with quantitative metrics (output, profit, tangibles, ratings) to capture both workplace output and workplace behaviour.",
            "The sign-off matters: appraisals typically end with a section where both reviewer and employee sign. This makes it a formal document, which can be subject to legal proceedings.",
            "Behavioural elements — punctuality, deportment, tattoos, 'professional' communication style — may have nothing to do with actual output, yet can shape the tone of an appraisal. Balance these against empirical facts.",
            "Evidence check: French, Mortensen and Timming (2019, Human Relations) analysed whether tattoos are associated with employment and wage discrimination. Across gender, ethnicity, role and education, tattoos — visible or offensive or not — showed no correlation with wage. The authors argue such behavioural discrimination is more myth than reality: it happens, but more rarely than assumed, and in some work contexts tattoos signal fitting in.",
            "Quantitative elements are common, especially Likert and rating scales (1-5 for overall performance). Overall performance rankings are a residual of Taylor's scientific management, where managers rated employees against each other and ascribed pay accordingly — and they remain subject to rater bias.",
          ],
        },
        {
          id: "prowse-reading",
          kind: "resource",
          title: "Step 4: Reading — Prowse & Prowse (2009), The Dilemma of Performance Appraisal",
          body: "A literature review in Measuring Business Excellence. Core argument: despite 80-90% adoption across US/UK organisations, research has ignored the critical success factor — line manager interpersonal and interviewing skill (the 'Bradford Approach') — while the theory stays underdeveloped.",
          items: [
            "History of appraisal methods: 1800s, Robert Owen's factory used coloured wood blocks to signal performance; early 1900s, Taylor's scientific management; 1930s, the psychological tradition of trait and graphic rating scales; 1940s, behavioural methods (BARS, BOS, critical incident); post-1945, Management by Objectives; 1960s, self-appraisal and discussion-based interviews; 1990s, 360-degree appraisal and the emergence of pay-for-performance.",
            "Orthodox critique: appraisal carries built-in conflicting purposes — motivating and developing versus judging past performance for reward. This creates bias: central tendency, halo/horns, recency, political manipulation by managers protecting their own interests, and gender/ethnicity bias.",
            "Radical critique (Foucauldian — Townley, Newton & Findley): appraisal functions as covert managerial control and surveillance rather than genuine development.",
            "Proposed fixes and their limits: 360-degree appraisal was meant to reduce bias and power imbalance, but a five-year study (Walker & Smither) still found subjectivity persisting. Interpersonal skills training for appraisers remains under-researched despite being critical.",
            "Performance-related pay: merit pay is increasingly tied to appraisal (UK civil service, NHS, banking), but the evidence is largely negative — demotivating, encourages gaming and narrow target focus, and reduces honest self-disclosure, since employees won't admit weaknesses that will hit their pay.",
            "Conclusion: appraisal remains 'muddled', and good outcomes hinge heavily on the quality of the relationship with the line manager. No viable alternative has been proposed that still delivers feedback, motivation and reward justification — so organisations keep using, revising and periodically abolishing appraisal systems rather than replacing them.",
          ],
        },
        {
          id: "journal",
          kind: "journal",
          title: "Journal Entry",
          body: "Skim pages 69-77 of The Dilemma of Performance Appraisal and answer in your own words:",
          items: [
            "What are the three questions for quality of feedback in performance appraisals?",
            "What is conflict avoidance?",
            "What is a recency effect?",
            "What mechanisms have been deployed to increase objectivity in performance appraisals?",
          ],
        },
      ]),
      createLearningSubModule("2.2 Feedback Sources", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Explore top-down, multi-user and balanced scorecard feedback platforms.",
        },
        {
          id: "context",
          kind: "note",
          title: "Some Context Before You Begin",
          body: "The most typical form of performance appraisal occurs between a line manager and one of their staff. It is a formal event, and completion of the document typically happens alongside a face-to-face meeting where verbal feedback is given. Feedback usually consists of the manager's perspective on the employee's performance, plus (in some cases) objective performance data collated into the appraisal. This is the most common form partly because it is relatively efficient — certainly more so than multi-rater appraisals.",
          images: [
            {
              alt: "Feedback sources",
              caption: "Feedback sources",
              src: "/images/business-psychology/hrm6005/week-2/feedback-sources.jpeg",
            },
          ],
        },
        {
          id: "360-definition",
          kind: "definition",
          title: "Definition",
          definitions: [
            {
              term: "360 Degree Feedback",
              definition:
                "An assessment system or process in which employees receive confidential, anonymous evaluations from the people who work around them. This typically includes manager, peers, and direct reports.",
            },
          ],
          images: [
            {
              alt: "360-degree feedback overview",
              caption: "360-degree feedback",
              src: "/images/business-psychology/hrm6005/week-2/360-feedback-1.png",
            },
            {
              alt: "360-degree feedback detail",
              src: "/images/business-psychology/hrm6005/week-2/360-feedback-2.png",
            },
            {
              alt: "360-degree feedback detail",
              src: "/images/business-psychology/hrm6005/week-2/360-feedback-3.png",
            },
          ],
        },
        {
          id: "reductionist-definition",
          kind: "definition",
          title: "Definition",
          body: "Rating systems are everywhere: customer service calls, star ratings for restaurants and service providers, ride-sharing platforms, and — in some regions of China — citizen social credit systems. Like it or not, reductionist forms of performance evaluation are creeping into all aspects of life and shaping decisions. If you are a telemarketer who has received several bad customer ratings, those form part of your performance appraisal.",
          definitions: [
            {
              term: "Reductionist rating system",
              definition:
                "A reductionist rating system condenses complex, multi-dimensional information into a single, easily digestible score, metric, or label. While highly useful for quick decision-making, it often strips away vital context, nuances, and the interconnected dynamics of the subject being evaluated.",
            },
          ],
        },
        {
          id: "psychology-of-ratings",
          kind: "summary",
          title: "Step 3: Roosa (2019), The Psychology of Ratings",
          body: "A general-interest piece on rating systems, with direct analogies to appraisal bias.",
          items: [
            "Social credit systems reward and punish citizens based on trust behaviour — an extreme, formalised rating system with real consequences.",
            "People rate too leniently. On platforms like Uber, raters avoid low scores even after bad experiences because they don't want to harm someone's livelihood — social/emotional bias overriding accuracy, exactly like managers avoiding negative appraisal ratings.",
            "Ratings tend to be all-or-nothing. YouTube found people rated 5-star or 1-star and rarely in between, which is why it abandoned stars for thumbs up/down.",
            "Explaining a rating changes it. When people had to justify their score, positive experiences got rated lower and negative ones higher — explanation moderates emotional extremes toward the middle. Yelp uses this by requiring a written review with every star rating.",
            "Ratings carry real economic weight: 85% of people trust online reviews like personal recommendations, and a one-star increase can raise revenue 5-9%.",
            "Relevance: this mirrors the central tendency and halo effects from Prowse & Prowse, and the reluctance to give critical feedback — the same rater psychology, just from consumer platforms instead of workplaces.",
          ],
        },
        {
          id: "my-notes-ratings",
          kind: "journal",
          title: "My Notes: Five Good and Five Bad Things About Rating Systems",
          items: [
            "Good — Rating systems are quick and efficient for consumers to complete. Anything more complex or time consuming would result in even less participation.",
            "Good — They can contain valuable feedback from the consumer's perspective where there are genuine holes in the business's process that need to be addressed.",
            "Good — When done electronically, data can be easily sorted and processed without manual intervention by company staff.",
            "Good — In the case of public services like Uber, rating systems can serve the social system by keeping people safe if a driver is behaving in an unsafe way.",
            "Bad — Rating systems are a reductionist system, so they do not cater for context and other factors that influence a rating. They are black and white, which can be frustrating for the employee/business if the ratings impact their development and finances.",
            "Bad — They are biased. One person's good or bad experience is likely to be different to another's. Asking questions like 'rate your experience' is quite global and will be answered subjectively.",
            "Bad — They have become commoditised. Every business asks for a rating of some sort, and they have become annoying, or seen as spam communication, which devalues the process.",
            "Bad — They can be seen as the be all and end all if a company has no other way to get consumer feedback. This lacks diversity and exacerbates the reductionist issue.",
          ],
        },
        {
          id: "balanced-scorecard",
          kind: "resource",
          title: "Step 5: The Balanced Scorecard",
          body: "Watch The Explainer: The Balanced Scorecard (HBR, 2:40). The balanced scorecard applies to company performance rather than employee performance, but it gives context for why performance appraisals today carry more financial metrics and use a range of qualitative and quantitative tools. Kaplan and Norton developed the framework in the early 90s, and it has since been applied to multiple performance contexts — think of metric-driven school report cards from that era. While most appraisals today look different to the 1993 model, many track employee performance against the financial, customer, internal (work behaviour), and learning and growth perspectives.",
        },
      ]),
      createLearningSubModule("2.3 The Feedback Sandwich", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Critique common verbal and written feedback frameworks.",
        },
        {
          id: "the-method",
          kind: "activity",
          title: "Step 1: The Feedback Sandwich Method",
          body: "The feedback sandwich is the most espoused method for giving feedback. The approach is simple — start with something positive, deliver the critical substance, which may be negative, and then finish with something positive.",
          links: [
            {
              href: "https://www.youtube.com/watch?v=hDNde-Eub_A",
              label: "What is a Feedback Sandwich | Explained in 2 min",
            },
          ],
          images: [
            {
              alt: "Feedback sandwich explainer video",
              caption: "What is a Feedback Sandwich",
              src: "/images/business-psychology/hrm6005/week-2/feedback-sandwich-video.png",
            },
          ],
        },
        {
          id: "my-notes-sandwich",
          kind: "journal",
          title: "My Notes: Is the Feedback Sandwich Useful?",
          body: "Yes, I think starting with a compliment or positive feedback acknowledges the effort that has been put in thus far. Jumping straight to negative feedback can leave someone feeling discounted. Like anything, if overdone the process can become scripted and the positive feedback de-valued. So, it does need to be applied at the right times and genuinely.",
        },
        {
          id: "henley-reed",
          kind: "summary",
          links: [
            {
              href: "https://www.tandfonline.com/doi/full/10.1080/01608061.2015.1093057",
              label: "Should You Order the Feedback Sandwich? Efficacy of Feedback Sequence and Timing",
            },
          ],
          title: "Henley & DiGennaro Reed (2015): Should You Order the Feedback Sandwich?",
          body: "Researchers tested whether the classic feedback sandwich (positive → corrective → positive) actually works best. Undergraduates performed simulated office tasks with different feedback sequences, delivered either before or after each session.",
          items: [
            "If feedback came before the task, no feedback at all worked best.",
            "If feedback came after the task, corrective first followed by two positives worked best.",
            "The classic sandwich was not the most efficacious sequence in either case, despite claims to the contrary.",
            "Key line for the journal: 'We found that the Corrective-Positive-Positive condition produced the highest aggregate mean' (Henley & DiGennaro Reed, 2015).",
          ],
        },
        {
          id: "empathic-concern",
          kind: "summary",
          links: [
            {
              href: "https://bpspsychub.onlinelibrary.wiley.com/doi/10.1111/joop.12184",
              label: "How empathic concern helps leaders in providing negative feedback: a two-study examination",
            },
          ],
          title: "Empathic Concern and Negative Feedback (two-study examination)",
          body: "Does a leader showing empathy while giving negative feedback make a difference?",
          items: [
            "Video experiment (n=177): everyone felt less negative after receiving criticism, but only those whose leader showed empathic concern also felt more positive afterward — and they rated the leader as more effective at giving feedback.",
            "Field study (n=306 leaders): leaders who gave high-quality negative feedback were rated more promotable by their boss — but only where subordinates also perceived empathic concern. Good feedback alone wasn't enough; empathy amplified the career benefit.",
            "Practitioner points: show empathic concern when delivering feedback; train leaders to recognise emotional reactions and communicate understanding; reward leaders who demonstrate it; educate leaders on the career benefits of high-quality negative feedback paired with empathy.",
          ],
        },
        {
          id: "journal-sandwich",
          kind: "journal",
          title: "My Journal Entry: Evidence on the Feedback Sandwich",
          body: "The evidence did not support the feedback sandwich process (Positive-Corrective-Positive) as being effective. The more effective process was Corrective-Positive-Positive. My thoughts are that by delivering negative feedback first, followed by two doses of positive reinforcement, the subjects were allowed the psychological space to recover from any negative impact of the corrective feedback, and to re-appraise the meta-feedback as being more balanced and constructive.",
        },
        {
          id: "empathy-eq",
          kind: "summary",
          title: "Step 5: Westfall (2021), Understanding Empathy — How EQ Can Improve Your Career Impact",
          body: "Core argument: empathy is a career-boosting leadership skill, not a soft nice-to-have — especially when people are stressed or burned out.",
          items: [
            "Empathy is not sympathy. Sympathy is feeling for someone and can lead to excuses or cutting corners. Empathy is understanding someone's situation as it is, without losing your own perspective — which lets you actually help them act.",
            "Empathy is not ego. It means focusing on others' experience rather than your own goals, identity, or need for recognition.",
            "'Cognitive compassion' — sensing someone's emotional state without being overwhelmed by it — is essentially emotional intelligence. Citing HBR, EQ has 12 components including self-management and social awareness.",
            "EQ is career fuel. Leaders who genuinely acknowledge where people are build trust and unlock better outcomes, because you can only move a team forward from where they actually are.",
            "The restaurant analogy: a great waiter who catches a nut allergy before you order isn't intruding — that's attentive service. Empathetic leadership works the same way: proactive and attentive, not passively nice.",
          ],
        },
        {
          id: "my-notes-empathy-actions",
          kind: "journal",
          title: "My Notes: Actions for Deploying Empathy and EQ in Critical Feedback",
          items: [
            "Create rapport with the employee immediately. Resistance can emerge when there is no rapport in a relationship, so establishing rapport is a key first step to an empathetic approach.",
            "Manage your own state before others. Ensure you are in an uptime state going into the discussion — switching on all your senses so you can detect the employee's emotional shifts during the discussion and check in on them.",
            "Access a second-person perspective. This is the perspective of empathy: removing your own subjectivity and applying the other person's worldview. What are they thinking, what are they feeling, what do they want me to understand?",
            "Apply sacred listening skills. Listen with an open heart and an open mind — without judgement, simply perceiving what the other is saying.",
            "Apply communication loops in the discussion. Repeat back what you think you have understood to ensure it matches what was communicated. Done effectively, this creates a deep level of accurate understanding and leaves the other person feeling heard.",
            "Frame the conversation effectively. Gain agreement upfront on how the discussion will go and the desired outcome. If both parties agree, this sets the foundation for a constructive, balanced discussion without surprises.",
            "Check in with the employee throughout. Ask if you have missed anything so far, and whether there is anything they would like to add.",
          ],
        },
        {
          id: "feedback-note",
          kind: "note",
          title: "Feedback",
          body: "The list of considerations for providing critical feedback that you co-develop with peers and facilitator should be used to inform the development of your Assessment 2 response.",
        },
      ]),
      createLearningSubModule("2.4 Rater and Method Bias", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Examine how performance reviews are shaped by implicit biases.",
        },
        {
          id: "assessment-note",
          kind: "note",
          title: "Assessment 2",
          body: "Notes taken in the journal activities relate directly to Assessment 2. Revisit the assessment to see how your notes on bias may be used.",
        },
        {
          id: "implicit-bias",
          kind: "activity",
          title: "Steps 1-2: Implicit Bias Self-Assessment",
          body: "Bias occurs when, rather than being neutral, you have a preference for or aversion to a person or people. These preferences or aversions are indicative of implicit (unconscious) bias. Take Harvard's Implicit Association Test and reflect on the result in your journal.",
          links: [
            {
              href: "https://implicit.harvard.edu/implicit/takeatest.html",
              label: "Implicit Association Test",
            },
          ],
        },
        {
          id: "my-notes-iat",
          kind: "journal",
          title: "My Notes",
          body: "My results are shaped by my upbringing and values.",
        },
        {
          id: "ten-biases",
          kind: "summary",
          title: "Step 3: Campbell (2019), 10 Performance Review Biases and How to Avoid Them",
          body: "Core premise: everyone is biased (citing Kahneman), so good performance review design must actively counter it. Ten biases and their fixes:",
          items: [
            "Recency bias — over-weighting recent events. Fix: collect feedback at multiple points through the year, not just at review time.",
            "Primacy bias — first impressions dominate. Fix: multiple data points over time.",
            "Halo/Horns effect — one trait, good or bad, colours the whole rating. Fix: rate on 2-3 distinct dimensions rather than one overall impression.",
            "Central tendency bias — everyone rated middle of the road. Fix: remove the neutral middle option on scales.",
            "Leniency bias — inflated ratings across the board. Fix: redesign the scale so 'average' isn't the top label; reserve top ratings for genuine standouts.",
            "Similar-to-me bias — rating people like yourself higher. Fix: agree assessment criteria before evaluating, reducing reliance on stereotypes.",
            "Idiosyncratic rater bias — rating others harshly on skills you're weak at, generously on skills you're strong at. Fix: frame questions around concrete intentions or decisions (e.g. 'I would hire this person again') rather than vague traits.",
            "Confirmation bias — seeking evidence that confirms your existing view. Fix: actively look for evidence that contradicts your initial impression.",
            "Gender bias — women get personality-focused feedback, men get behaviour/achievement-focused feedback. Fix: structured feedback forms rather than open text boxes, prompting for specific situations, behaviours and impact.",
            "Law of small numbers — judging someone's rank against too small a comparison group (best on a strong team is not best company-wide). Fix: company-wide talent calibration sessions to standardise what 'above average' means.",
            "Bottom line: people can't reliably self-detect their own bias, so the fix has to be structural — better scales, criteria and timing — not just awareness.",
          ],
          images: [
            {
              alt: "Rater and method bias",
              caption: "Rater and method bias",
              src: "/images/business-psychology/hrm6005/week-2/rater-bias.jpeg",
            },
          ],
        },
        {
          id: "bias-definitions",
          kind: "definition",
          links: [
            {
              href: "https://www.hrdconnect.com/2019/09/06/how-to-develop-your-talent-management-strategy/",
              label: "Talent management strategy (HRD Connect)",
            },
            {
              href: "https://sprad.io/blog/talent-calibration-guide-how-to-run-fair-evidence-based-rating-sessions-templates-inside",
              label: "Talent calibration guide",
            },
          ],
          title: "Definitions",
          definitions: [
            {
              term: "Talent Management",
              definition:
                "The systematic process of identifying a vacant position, hiring a suitable candidate, developing the skills and expertise of that candidate to match the position, and retaining them to achieve long-term business objectives.",
            },
            {
              term: "Talent Calibration",
              definition:
                "An HR practice where managers and leaders align employee performance evaluations against shared standards. While intended to reduce individual manager bias and ensure fairness, HBR research warns that unstructured sessions can inadvertently introduce new biases, like favouritism or uneven discussion times.",
            },
            {
              term: "Gender Bias",
              definition:
                "The tendency to make decisions, form judgments, or treat individuals preferentially based on their gender or socially constructed gender roles. It can be explicit (conscious) or implicit (unconscious), frequently manifesting as unequal treatment, stereotypes, or structural disadvantages across society.",
            },
            {
              term: "Constructive Feedback",
              definition:
                "Specific, actionable information meant to improve someone's performance or behaviour. Unlike destructive criticism, which is judgmental or personal, it is offered in a supportive manner to highlight strengths and provide practical, forward-looking solutions for growth.",
            },
          ],
        },
        {
          id: "gender-bias-reading",
          kind: "summary",
          title: "Step 4: Cecchi-Dimeglio (2017), How Gender Bias Corrupts Performance Reviews",
          body: "Core finding: annual performance reviews are highly subjective, which lets gender bias creep in. Based on content analysis of individual reviews at professional services firms.",
          items: [
            "Key data point: women were 1.4x more likely to receive critical subjective feedback, versus positive or critical objective feedback.",
            "Double standards — same behaviour, different spin: a woman lacking client confidence 'needs to be more self-confident' (a personal flaw), while a man with the same issue 'needs to develop his natural ability' (a skill to build). A woman's careful deliberation is 'analysis paralysis'; a man's is 'hesitant but thorough, works out alternatives'.",
            "Women received vaguer feedback overall, consistent with Stanford research by Correll & Simard.",
            "Women's success was more often attributed to luck or long hours than to skill or ability — so they got less credit for actual competence.",
            "General rater biases (leniency, halo) distort ratings for everyone, compounding the problem.",
            "Proposed fix, tested via field experiments: replace annual reviews with real-time weekly feedback from 2-6 reviewers (supervisors, peers, clients) at roughly 15 minutes each; use gender-neutral, pre-agreed criteria rather than open-ended commentary; include client feedback; and weight input by how much exposure each reviewer has to the person.",
            "Results: subjective, personality-based criticism of women disappears or significantly decreases; collaborative and participatory leadership styles (per Alice Eagly's research, more common among women) are better recognised; and managers get more accurate, contextual, longitudinal data on all employees.",
            "Bottom line: the fix isn't more bias-awareness training alone — it's structural. Objective criteria, frequency, and multiple raters reduce the room subjectivity has to operate in.",
          ],
        },
        {
          id: "feedback-note",
          kind: "note",
          title: "Feedback",
          body: "This activity relates directly to the first assessment item. Use what you've learned about gender bias and other forms of bias to critique the performance appraisals nested within the Assessment 2 task.",
        },
      ]),
    ],
  },
  {
    id: slugify("Week 3: Employee Motivation"),
    week: 3,
    title: "Employee Motivation",
    summary:
      "Covers the classical work-motivation canon — much of which hasn't held up under scrutiny, but whose vernacular still fills boardrooms — then moves to the theories that emerged from the positive psychology revolution, and applies that lens to a performance management case study.",
    keyConcepts: [
      "Intrinsic vs extrinsic motivation — foundational, but overstated in practice; most people run on shades of both.",
      "Content theories explain WHAT motivates (Maslow, Herzberg, McClelland, Alderfer); process theories explain HOW motivation is directed and sustained (Vroom, Adams, Locke & Latham, Skinner).",
      "Positive psychology (Seligman, 1998) shifted the field from fixing dysfunction to building flourishing — PERMA and flow.",
      "Flow (Csikszentmihalyi): intense absorption when challenge and skill are both high — a direct challenge to hours-based conceptions of work.",
      "Conservation of Resources theory (Hobfoll, 1989): people protect, retain and build valued resources; resource loss hits harder than equivalent gain.",
      "Strengths-based appraisal raises motivation to improve via perceived supervisor support — and matters most when the rating is low.",
    ],
    assessmentLinks: [
      "Assessment 3: CoR theory (two principles, four corollaries) can be used as a lens to evaluate a performance management system and its effect on staff.",
      "Assessment 3: the van Woerkom & Kroon journal activity was designed to prepare the third assessment item, including references critiquing traditional performance management.",
    ],
    image: {
      src: "/images/business-psychology/hrm6005/week-3/flow-theory.png",
      alt: "Week 3 — employee motivation",
    },
    subModules: [
      createLearningSubModule("Week 3 Introduction", [
        {
          id: "overview",
          kind: "purpose",
          title: "Purpose",
          body: "While there are many — perhaps hundreds — of theories of motivation and a plethora of subsets dealing with motivation at work, the most significant recent developments reshaping our understanding of employee motivation have come through the lens of positive psychology (Seligman chose it as his theme as APA president in 1998). This week briefly covers the standard work motivation body of knowledge — classical material, much of which has not held up under broader academic scrutiny, but whose vernacular around hierarchies of needs and hygiene factors is still commonplace in boardrooms and worksites. It then explores work motivation theories stemming from the positive psychology revolution, and concludes by examining a performance management case study through a positive psychology lens.",
        },
        {
          id: "learning-objectives",
          kind: "objectives",
          title: "Learning Objectives",
          body: "After completing this week's tasks, you should be able to:",
          items: [
            "Define intrinsic and extrinsic motivation.",
            "Explore traditional, content and process motivation and work motivation theories.",
            "Examine the contribution of positive psychology to the field of work motivation.",
            "Apply a positive psychology lens to an analysis of a performance management system.",
          ],
        },
      ]),
      createLearningSubModule("3.1 Extrinsic and Intrinsic Motivation", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Explore the definitions of extrinsic and intrinsic motivation, and their influence in workplace dynamics.",
        },
        {
          id: "context",
          kind: "note",
          title: "Some Context Before You Begin",
          body: "Extrinsic and intrinsic motivation are foundational concepts for discussing work motivation, and grasping them helps orient more challenging concepts such as the distinction between process and content theories. At the same time, their usability in practice is somewhat overstated. Rarely is an organisation in a position to radically boost someone's pay to drive extrinsic motivation, and equally it is difficult to change an employee's perspective to help them love the job for its own sake — particularly if that employee is picking up garbage all day.",
          images: [
            {
              alt: "Intrinsic and extrinsic motivation",
              src: "/images/business-psychology/hrm6005/week-3/intrinsic-extrinsic.png",
            },
          ],
        },
        {
          id: "video",
          kind: "resource",
          title: "Step 1: Extrinsic vs Intrinsic Motivation",
          body: "As you watch, make notes on possible workplace motivators for either extrinsic or intrinsic personality types, and the potential pros and cons of each in a workplace team dynamic.",
          links: [
            {
              href: "https://www.youtube.com/watch?v=HLiasZwWTjA",
              label: "Extrinsic vs Intrinsic Motivation (video)",
            },
          ],
          images: [
            {
              alt: "Extrinsic vs intrinsic motivation video",
              src: "/images/business-psychology/hrm6005/week-3/video-intrinsic-extrinsic.png",
            },
          ],
        },
        {
          id: "match-activity",
          kind: "activity",
          title: "Step 3: Matching Workplace Motivation Types",
          body: "Match workplace motivation types to intrinsic or extrinsic orientations.",
          images: [
            {
              alt: "Workplace motivation types matching activity",
              src: "/images/business-psychology/hrm6005/week-3/motivation-types-match.png",
            },
          ],
        },
        {
          id: "my-notes",
          kind: "journal",
          title: "My Notes: Pros and Cons in a Team Dynamic",
          items: [
            "Intrinsic — Pro: an intrinsically motivated employee will apply their attention to what fills their intrinsic needs. If met, they can be very productive and fulfilled.",
            "Intrinsic — Con: paying no attention to extrinsic forces can mean little or no adherence to systems, processes, or frameworks that exist to keep the workplace operating. This becomes an opposing force for the employee and could lead to wellbeing issues.",
            "Extrinsic — Pro: they will respond positively to competition, incentives and external validation, which in a workplace with this dynamic can work well.",
            "Extrinsic — Con: the employee may be missing their underlying intrinsic needs and end up masking their personality.",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "While doing this activity you might have realised the list was a bit simplistic. Humans are complicated, and our brains hold multiple and sometimes conflicting perspectives. Most of us have shades of extrinsic and intrinsic motivation when we do any one thing — it is rare that we do anything for money alone or purely because we love it. Often both drivers are at play.",
        },
      ]),
      createLearningSubModule("3.2 Psychology and the Mind", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Develop a background on what psychology is and how it differs from neuroscience. If you have a strong background in psychology you may want to skip this activity — it is a high-level overview that scaffolds foundational knowledge for later activities.",
        },
        {
          id: "mind-brain",
          kind: "summary",
          title: "Steps 1-2: Mind and Brain",
          body: "The clip shows Bart Simpson struggling to sleep while contemplating the difference between the brain and the mind — an important distinction here, because psychology is the study of the mind, whereas neuroscience is the study of the brain.",
          items: [
            "We know a lot about the mind: more than 120 years of dedicated study into how it works and how it influences human behaviour — preceded by nearly 3,000 years of debate about how and why humans exist and behave. Psychology was born out of the scientific method applied to human behaviour.",
            "Our understanding of the mechanics of the brain — how thoughts and feelings correspond with chemical reactions — remains nascent by comparison.",
            "Neuropsychology (the interaction between brain and mind) has developed hugely in the last two decades. Before that, most studies of the brain's interaction with behaviour were based on atypical or pathological scenarios: brain damage affecting behaviour, or brains significantly different from the norm.",
            "For a contemporary account, see A.C. Grayling's The Frontiers of Knowledge (2021).",
          ],
          links: [
            {
              href: "https://www.youtube.com/watch?v=pUwH-P3Iz0Y",
              label: "Introductory clip",
            },
          ],
          images: [
            {
              alt: "Mind and brain",
              src: "/images/business-psychology/hrm6005/week-3/mind-and-brain.jpeg",
            },
            {
              alt: "Theories of the mind",
              src: "/images/business-psychology/hrm6005/week-3/theories-of-mind.jpeg",
            },
          ],
        },
        {
          id: "six-psychologists",
          kind: "summary",
          title: "Step 4: Six Foundational Psychologists",
          body: "Modern psychology would not be what it is today without these contributions.",
          items: [
            "Sigmund Freud — often called the father of modern psychology. Developed theories from observations of minds appearing to suffer behavioural problems (which he termed neurosis and hysteria), treating many female victims of sexual abuse in Vienna from the 1890s. From these somewhat gendered observations of atypical patients he developed psychoanalysis, which uses hypnosis to put a patient in a state where they can recall and rationalise past traumatic events.",
            "Carl Jung — also interested in psychoanalysis, expanded understanding of the function of dreams in thought processing, and examined how interactions with the collective shape conscious and subconscious processing.",
            "Lev Vygotsky — picked up Jung's work in the Soviet Union and laid the foundation for social psychology and our understanding of childhood development of thought as shaped by the social, familial and parental environment.",
            "Jean Piaget — influential in unpacking normal cognition (as opposed to atypical cognition) and developed schema theory, explaining how we learn and how learning builds on prior learning. Schema theory has been a bedrock for understanding neuropsychology.",
            "Alfred Adler — an Austrian contemporary of Freud who championed individual psychology, explaining the drivers of behaviour for the typical population. A central tenet is that humans strive to be self-actualised and powerful as well as happy.",
            "Ivan Pavlov — focused on conditioning behaviour: how behaviours can be encouraged or discouraged through incentives or punishment. His work would be considered extreme and potentially unethical today, but it formed the basis of cognitive behaviour therapy, which remains the mainstay of psychological treatment because it is efficacious relative to psychotherapy and psychoanalysis.",
            "Note: these six men exclusively dominated early-modern psychology. Their theories are still touched on today, though many have been disputed or disregarded in favour of a more nuanced understanding.",
          ],
          images: [
            { alt: "Sigmund Freud", src: "/images/business-psychology/hrm6005/week-3/psychologist-26.png" },
            { alt: "Carl Jung", src: "/images/business-psychology/hrm6005/week-3/psychologist-27.png" },
            { alt: "Lev Vygotsky", src: "/images/business-psychology/hrm6005/week-3/psychologist-28.png" },
            { alt: "Jean Piaget", src: "/images/business-psychology/hrm6005/week-3/psychologist-29.png" },
            { alt: "Alfred Adler", src: "/images/business-psychology/hrm6005/week-3/psychologist-30.png" },
            { alt: "Ivan Pavlov", src: "/images/business-psychology/hrm6005/week-3/psychologist-31.png" },
          ],
        },
      ]),
      createLearningSubModule("3.3 Content and Process Theories of Motivation", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Review the two foundational families of motivation theory — content and process. These form the backbone of much of what we know about why employees do what they do and how they might be stimulated to perform. Things have moved on since, and later activities cover the more recent developments.",
          images: [
            {
              alt: "Theories of motivation",
              src: "/images/business-psychology/hrm6005/week-3/motivation-theories.jpeg",
            },
          ],
        },
        {
          id: "definition",
          kind: "definition",
          title: "Definition",
          definitions: [
            {
              term: "Content and Process Theories of Motivation",
              definition:
                "The separation of theories of motivation in the workplace into what motivates people (content), and how motivation occurs through cognitive processes (process).",
            },
          ],
        },
        {
          id: "my-notes-definitions",
          kind: "journal",
          title: "My Notes: Defining Content and Process Theories",
          items: [
            "Content theories explain what drives behaviour; process theories explain how behaviour is directed and sustained.",
            "Content theories focus on the specific needs, desires and incentives that get people to take action. These needs could be intrinsic or extrinsic. Key theories: Maslow's Hierarchy of Needs, Herzberg's Two-Factor Theory, McClelland's Theory of Needs.",
            "Process theories focus on the mental mechanisms and cognitive processes people use to choose specific behaviours and sustain them over time. Key theories: Vroom's Expectancy Theory, Adams' Equity Theory, Locke's Goal-Setting Theory.",
          ],
        },
        {
          id: "classify-activity",
          kind: "activity",
          title: "Step 2: Classify Each Theory",
          body: "Correctly identify each theory as a content or a process theory of motivation.",
          images: [
            {
              alt: "Content vs process theory classification activity",
              src: "/images/business-psychology/hrm6005/week-3/content-process-match.png",
            },
          ],
        },
        {
          id: "my-notes-maslow",
          kind: "journal",
          title: "My Notes: Maslow's Hierarchy of Needs",
          items: [
            "Proposes human needs are arranged in a five-level hierarchy: physiological (food, shelter, sleep), safety, belonging and social connection, esteem, and self-actualisation. The premise is that lower-level needs must be met before higher-level needs become motivating.",
            "In practice, the model helps managers recognise that different employees may be operating at different levels at any given time. Job stability addresses safety; team cohesion addresses belonging; recognition and advancement address esteem and self-actualisation. Satisfying basic needs can produce meaningful gains in productivity and retention.",
            "Criticism: the model is too rigid, prioritising linear progression as the only way people meet needs. Critics argue people often pursue and satisfy multiple needs simultaneously rather than strictly checking off one level to reach another.",
            "Workplace example: employees willing to tolerate low pay and poor job stability (safety/physiological) because they are deeply motivated by a passionate mission or creative freedom (self-actualisation).",
          ],
        },
        {
          id: "practical-application",
          kind: "summary",
          title: "Practical Application: How Each Family Shows Up in HR",
          items: [
            "Maslow's Hierarchy — basic pay and benefits meeting physiological and safety needs; job security policies and safe conditions; team-building for belonging; recognition and promotions for esteem; stretch projects and creative autonomy for self-actualisation.",
            "Herzberg's Two-Factor Theory — hygiene factors (fair pay, safe conditions, job security, good policies) prevent dissatisfaction but don't motivate; motivators (meaningful work, recognition, achievement, growth, responsibility) drive real engagement. Practical use: don't assume a pay rise will boost motivation — it just removes dissatisfaction.",
            "McClelland's Acquired Needs (achievement, affiliation, power) — assign high-achievers to goal-driven measurable projects; give affiliation-driven employees team-based or client-facing roles; offer power-motivated employees leadership tracks. Used in role-fit and career pathing.",
            "Alderfer's ERG (Existence, Relatedness, Growth) — similar to Maslow but non-hierarchical; used in flexible reward systems letting employees choose what matters most, e.g. flexible benefits menus.",
            "Vroom's Expectancy Theory (Effort → Performance → Outcome) — clear achievable KPIs, a transparent link between performance and reward, and rewards actually valued by the individual. Practical use: commission structures, clear promotion criteria, personalised incentives.",
            "Adams' Equity Theory — pay transparency and benchmarking for perceived fairness; consistent criteria-based ratings (ties back to the rater-bias papers); understanding 'quiet quitting' as equity-restoring behaviour when the input/output ratio feels unfair.",
            "Locke & Latham's Goal-Setting Theory — SMART goals outperform vague 'do your best' goals; OKRs; regular goal check-ins rather than annual-only reviews (ties to the Cappelli & Tavis shift to frequent feedback).",
            "Skinner's Reinforcement Theory — spot bonuses and immediate recognition (positive reinforcement); performance improvement plans as a structured consequence system; gamified recognition platforms tying instant reward to behaviour.",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "Many units exploring performance management and motivation stop at content and process theories — for the last 30 years these have been the bedrock from which practical techniques were developed, so it was important to explore them. However, the world has moved on from these dated and sometimes disproven theories. The latest developments come next.",
        },
      ]),
      createLearningSubModule("3.4 Positive Psychology", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Explore the concept of positive psychology and examine how it is deployed in relation to work motivation.",
        },
        {
          id: "flow",
          kind: "summary",
          title: "Steps 1-2: Flow",
          body: "Have you ever been completely immersed in an activity where you felt such enjoyment that nothing else mattered? If so, you were likely in a state of flow.",
          items: [
            "Csikszentmihalyi's theory of flow is an important theory within positive psychology.",
            "From a work motivation perspective, flow is revolutionary. We have previously conceived of work as a set number of hours per week during which one undertakes a set number of tasks — a work design perspective. Australia's Fair Work Act enshrines full-time work as an average of 38 hours per week.",
            "Flow creates a natural tension with that conception, because given the right circumstances a person can be more productive and could do what would usually be eight hours of work in two.",
            "Over the last five years there has been much media attention on the four-day working week, flexible work, and whether transit should count as work hours. Dig deep enough and all of these are prompted by flow theory: we can be more productive if we stop thinking about work as a 9-to-5 activity at a particular office, and instead as something done as efficiently as possible given the right circumstances.",
          ],
          links: [
            {
              href: "https://www.youtube.com/watch?v=8h6IMYRoCZw",
              label: "Flow by Mihaly Csikszentmihalyi — animated book summary",
            },
          ],
          images: [
            { alt: "Flow video", src: "/images/business-psychology/hrm6005/week-3/video-flow.png" },
            { alt: "Mihaly Csikszentmihalyi", src: "/images/business-psychology/hrm6005/week-3/csikszentmihalyi.png" },
            { alt: "Flow theory", src: "/images/business-psychology/hrm6005/week-3/flow-theory.png" },
            { alt: "Flow and work", src: "/images/business-psychology/hrm6005/week-3/flow-work.png" },
          ],
        },
        {
          id: "my-notes-flow",
          kind: "journal",
          title: "My Notes: A Flow Experience",
          body: "The flow state was also induced by some extrinsic motivation of realising both financial reward and recognition from superiors that I had done a good job. When in the state, I felt full focus and drive where nothing could distract me from the task. I found myself to be far more productive in work output when in the flow state.",
        },
        {
          id: "positive-psychology",
          kind: "summary",
          title: "Step 4: Ackerman (2019), What Is Positive Psychology & Why Is It Important?",
          body: "Positive psychology is the scientific study of what makes life most worth living — studying strengths rather than weaknesses, and building the good rather than only fixing what's broken.",
          items: [
            "Founder: Martin Seligman, who had earlier developed the learned helplessness theory tied to depression. Frustrated that psychology focused only on illness, he pushed the new sub-field when elected APA president in 1998; the foundational paper was published in 2000 with Mihaly Csikszentmihalyi.",
            "PERMA — Seligman's framework for wellbeing: Positive emotions, Engagement (losing yourself in something you enjoy), Relationships, Meaning, Accomplishment.",
            "Flourishing — the state of hitting all five PERMA elements; a process, not a fixed trait.",
            "Practical applications: gratitude journals, gratitude letters, strengths-based coaching, wellbeing therapy, positive psychotherapy.",
            "Criticisms: some findings overstated or hyped; too reliant on self-report survey data; cultural/Western bias in the research base; too individualistic, under-attending to teams, organisations and systemic issues; sometimes dismissed as shallow 'Pollyanna' positivity — though the author argues this last critique is weakest, since the field also studies the value of negative emotions.",
            "Bottom line: a legitimate scientific field, not self-help, aimed at understanding and building thriving rather than only treating dysfunction.",
          ],
        },
        {
          id: "learned-helplessness",
          kind: "definition",
          title: "Definition",
          definitions: [
            {
              term: "Learned Helplessness",
              definition:
                "A psychological state where an individual repeatedly faces uncontrollable stressors and eventually stops trying to change their circumstances, even when opportunities for escape arise. Coined by Martin Seligman and Steven Maier in the late 1960s, it often stems from past trauma or chronic failure, leading to deep-seated passivity, low motivation, and a persistent belief that one's actions are entirely futile.",
            },
          ],
        },
        {
          id: "donaldson-meta",
          kind: "summary",
          title: "Step 5: Donaldson, Lee & Donaldson (2019), Evaluating Positive Psychology Interventions at Work",
          body: "The first meta-analysis of workplace Positive Psychology Interventions (PPIs), pooling 22 studies — 52 effect sizes, roughly 6,000 participants across 10 countries.",
          items: [
            "Five intervention types tested: Psychological Capital (PsyCap), job crafting, employee strengths, employee gratitude, and employee wellbeing (PERMA-based).",
            "Overall small-to-moderate effect on work outcomes (g = .31).",
            "Bigger effect on reducing bad outcomes — stress, burnout, incivility (g = -.34) — than on boosting good outcomes (g = .25).",
            "Significant improvement in wellbeing, engagement, and 'other' outcomes (trust, leadership, organisational virtue). No significant effect on job performance itself — a notable gap.",
            "By type: no statistically significant differences between the five theories, though gratitude and strengths interventions had the strongest individual effects on desirable outcomes, and PsyCap the strongest effect on reducing undesirable ones.",
            "By delivery: group interventions were somewhat better for boosting good outcomes (likely social/collaborative benefits); individual interventions worked best for reducing bad outcomes, possibly because they mirror one-on-one positive psychotherapy.",
            "Caveat: publication bias was detected (Fail-Safe N, Egger's test), meaning true effects may be smaller than reported.",
            "Bottom line: workplace PPIs do work, modestly — particularly good at reducing stress, burnout and negative behaviour, less proven at directly lifting job performance. This challenges the 'toxic positivity' critique: focusing on the positive doesn't ignore the negative, and may be one of the more effective ways to address it.",
          ],
        },
        {
          id: "my-notes-ppi",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "Why would individually focused PPIs do better than group-level ones? Working individually allows the space and care to surface an individual's personal strengths and apply them to a specific problem. It's a tailored, personal approach that may target an individual's specific sources of stress better than a generic group or workshop can.",
            "Why might the mitigating effect on undesirable outcomes be stronger? The authors point to PPT's logic that rather than attacking a problem or deficiency, PPIs surface a person's existing strengths and build plans to use them more. It can be easier to neutralise a negative stress by strengthening something positive than it is to add extra positivity on top of an already adequate baseline.",
          ],
        },
        {
          id: "psycap-definitions",
          kind: "definition",
          title: "Definitions",
          definitions: [
            {
              term: "Psychological Capital (PsyCap)",
              definition:
                "A positive psychological state of development defined by four core resources, remembered by the acronym HERO: Hope, Efficacy, Resilience, and Optimism. Unlike fixed personality traits, PsyCap is malleable — these states can be actively developed and trained.",
            },
            {
              term: "Job Crafting",
              definition:
                "The process of proactively redesigning your own work to better align with your individual passions, strengths, and values. The concept involves three primary areas of adjustment: task crafting, relational crafting, and cognitive crafting.",
            },
          ],
        },
      ]),
      createLearningSubModule("3.5 Conservation of Resources Theory", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Take a deep dive into conservation of resources theory, which — coupled with positive psychology — provides a robust framework for understanding why individuals are drawn to perform, or not perform, at work.",
        },
        {
          id: "wellbeing-context",
          kind: "summary",
          title: "Before You Begin: The Concept of Wellbeing",
          items: [
            "Wellbeing has gained increasing focus over the last 20 years through positive psychology research. Increasingly it is seen not as a desirable outcome of work but as an important input to maintain in order to boost employee performance. The distinction might seem semantic — it isn't.",
            "Employees feeling good about themselves and their work used to be conceived of as nice-to-have but not essential. Building a work environment conducive to wellbeing is costly: people need to behave decently toward each other, employees need sufficient resourcing, and there need to be mechanisms where people feel valued and can raise concerns or ideas and have them acted on. That investment meant the wellbeing narrative was traditionally sidelined as a cost rather than an investment.",
            "The research now supports the broad notion that if employees have wellbeing, they will perform more. Bluntly: yelling at an employee to 'finish that report' is less efficacious than supporting them to finish it — and the yelling is likely to reduce quality, increasing performance anxiety and creating emotional blocks.",
            "Now that work requires less mechanical effort and more complex, creative problem-solving, providing a foundation of support guided by employee wellbeing is much more effective at getting a better result quicker.",
          ],
          images: [
            {
              alt: "Wellbeing",
              src: "/images/business-psychology/hrm6005/week-3/wellbeing.jpeg",
            },
          ],
        },
        {
          id: "assessment-note",
          kind: "note",
          title: "Assessment 3",
          body: "Content covered in this activity can be used in your third assignment for this unit.",
        },
        {
          id: "cor-definition",
          kind: "definition",
          title: "Definition",
          definitions: [
            {
              term: "Conservation of Resources Theory",
              definition:
                "Developed by Dr Stevan Hobfoll in 1989, a psychological stress model stating that humans are fundamentally motivated to protect, retain, and build their valued resources. Stress and burnout occur when these resources are threatened, actually lost, or when investment fails to yield expected resource gains.",
            },
          ],
          links: [
            {
              href: "https://www.youtube.com/embed/8Exq1ZDFzPI",
              label: "Why we conserve energy: the conservation of resources theory (3:10)",
            },
          ],
          images: [
            { alt: "Conservation of resources video", src: "/images/business-psychology/hrm6005/week-3/video-cor.png" },
          ],
        },
        {
          id: "resource-loss",
          kind: "note",
          title: "Step 2: The Primacy of Loss",
          body: "One particularly salient component of Hobfoll's theory is that the impact of a resource loss on an individual is significantly stronger than an equivalent resource gain. For example, when a manager yells at you about your work, it is likely to have a much more pronounced and negative impact than receiving praise.",
          images: [
            { alt: "Resource loss vs gain", src: "/images/business-psychology/hrm6005/week-3/resource-loss.png" },
          ],
        },
        {
          id: "my-notes-cor",
          kind: "journal",
          title: "My Notes: CoR Principles and Resource Types",
          items: [
            "The primacy of loss — losing a resource is psychologically much more painful and impactful than the joy of gaining an equivalent resource.",
            "Resource investment — to prevent loss and recover from stress, individuals must invest their existing resources to build more reserves.",
            "Four primary resource types: Objects (physical items like housing, tools, clothing); Conditions (states of value such as employment, marital status, good health); Personal characteristics (internal traits like self-esteem, optimism, skills); Energies (means to attain other resources, such as time, money, knowledge).",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "As part of your third assignment you may choose to adopt a CoR lens and apply the two principles and four corollaries to evaluate a performance management system and its effect on staff.",
        },
      ]),
      createLearningSubModule(
        "3.6 Application of Positive Psychology to a Performance Management System",
        [
          {
            id: "purpose",
            kind: "purpose",
            title: "Purpose",
            body: "Explore an application of positive psychology to a performance management process. This journal activity was designed to assist in preparing for the third assessment item.",
          },
          {
            id: "van-woerkom",
            kind: "summary",
            title: "van Woerkom & Kroon (2020), The Effect of Strengths-Based Performance Appraisal",
            body: "Core question: does focusing on employee strengths rather than deficits in performance appraisal boost motivation to improve — and does this depend on how good or bad the person's rating was? Theoretical basis is Self-Determination Theory, specifically the need for relatedness. Method: 422 consultants at a Dutch IT firm surveyed right after their annual appraisal, with answers linked to their actual official performance ratings.",
            items: [
              "Hypothesis 1 supported: strengths-based appraisal leads to higher motivation to improve — a direct positive relationship.",
              "Hypothesis 2 supported: Perceived Supervisor Support mediates the effect. Strengths-based appraisal boosts how supported employees feel, and that feeling of support is what drives the motivation boost — not just the appraisal content itself.",
              "Hypothesis 3 supported (the key finding): the effect is stronger when the performance rating was relatively low. A strengths-based approach matters more for preserving supervisor support and motivation when the rating is mediocre or poor.",
              "Why low ratings matter more: a low rating threatens self-view and can trigger defensive withdrawal from the supervisor relationship. Because strengths-based appraisal focuses on 'you at your best' rather than ranking against others, it buffers that blow — supervisors can convey competence and care even while delivering disappointing news.",
              "Practical implications: organisations reluctant to abandon ratings should still train supervisors in strengths-based conversation techniques — Strengthsfinder, reflected-best-self exercises, feedforward interviews, or a 3:1 positive-to-negative feedback ratio. Especially valuable for employees receiving disappointing ratings.",
              "Limitations: cross-sectional design can't prove causation; the sample skewed toward already high-performing employees; single company and single industry; and only the relatedness need from SDT was tested, not autonomy or competence.",
            ],
          },
          {
            id: "sdt-definition",
            kind: "definition",
            title: "Definition",
            definitions: [
              {
                term: "Self-Determination Theory",
                definition:
                  "A psychological framework exploring human motivation and personality. It posits that people are driven by an innate desire to grow. To achieve optimal functioning and wellbeing, three fundamental psychological needs must be met: autonomy, competence, and relatedness.",
              },
            ],
          },
          {
            id: "sdt-practical",
            kind: "summary",
            title: "Practical Application: SDT Needs as Observable Behaviour",
            items: [
              "Autonomy met — proposes their own approach rather than waiting for instructions; pushes back respectfully on inefficient process; shows initiative; uses ownership language ('my project', 'I decided to…').",
              "Autonomy unmet — waits passively for direction; follows process exactly even when it clearly isn't working; quiet compliance, doing only what's asked; frustration when micromanaged.",
              "Competence met — seeks challenges slightly above current skill; talks about progress and mastery; enters flow states; confidently offers solutions in their area.",
              "Competence unmet — avoids tasks that risk exposing a skill gap; anxiety or defensiveness around feedback; repeats safe tasks; expresses self-doubt.",
              "Relatedness met — builds genuine rather than transactional relationships; mentors or seeks mentorship voluntarily; uses 'we' language; comfortable sharing struggles.",
              "Relatedness unmet — isolates from the team; guarded, transactional communication with the manager; doesn't seek help; cynicism about team culture.",
              "HR applications — Autonomy: flexible work arrangements, job crafting, employee input into KPIs/OKRs, minimal micromanagement. Competence: stretch assignments matched to skill (the flow zone), developmental rather than purely evaluative feedback, mastery-oriented training, recognising growth not just outcomes. Relatedness: mentoring and buddy systems, genuinely collaborative team projects, manager check-ins focused on support, psychological safety practices.",
              "Programs built on SDT: Google's 20% time (autonomy), Netflix's 'freedom and responsibility' culture, feedforward interviews (Kluger & Nir — future-focused rather than past-deficit-focused), and job crafting interventions (Wrzesniewski & Dutton).",
            ],
          },
          {
            id: "my-notes-journal",
            kind: "journal",
            title: "My Notes: Journal Questions",
            items: [
              "Interpreting the .38 R² — nearly two-fifths of the difference between employees in how motivated they felt to improve their performance can be accounted for by whether they experienced a strengths-based appraisal and how supported they felt by their supervisor. When an employee got a bad performance rating, a strengths-based conversation helped them still feel supported by their manager, so they stay motivated to improve instead of shutting down or getting defensive.",
              "Summary of the paper's contribution — (1) Strengths-based appraisal boosts motivation to improve, partly because it increases how supported employees feel. (2) The effect is strongest when the rating is relatively low, helping employees cope with a disappointing rating without damaging the supervisor relationship. (3) Social and relational aspects of the appraisal matter, not just content: discussing an employee's unique qualities invites active participation and signals a developmental rather than purely evaluative purpose. (4) Contribution to SDT — among the first to treat the appraisal interview itself as a social context that can support or hurt the need for relatedness, an angle prior SDT research largely overlooked. (5) An unexpected age effect — age was negatively associated with performance ratings, PSS and MTI, suggesting older workers may benefit less from current appraisal approaches.",
            ],
          },
          {
            id: "my-notes-sbpa",
            kind: "journal",
            title: "My Notes: What a Strengths-Based Appraisal Looks Like in Practice",
            items: [
              "Preparation — the manager reviews the employee's peak moments over the past year and identifies tasks where they showed strengths. The employee completes a self-assessment focused on their most successful achievements, which strengths they used, and how they want to grow those strengths.",
              "Meeting structure — roughly 80% of time on strengths, 20% on managing risks. Success analysis: open-ended questions dissecting a recent win ('Your project was flawless. Which of your strengths did you rely on to keep the team on track?'). Future alignment: building world-class expertise rather than incremental improvement ('Since you excel at client relationship building, let's pair you with our high-value accounts next quarter and get you advanced negotiation training'). Risk mitigation: weaknesses addressed only if they block performance, reframed as blind spots, overdone strengths, or skills deficits to manage.",
              "Feedback phrasing — traditional: 'You need to work on your public speaking skills.' Strengths-based: 'Your analytical writing is incredibly clear. Let's leverage that structure to help you build confidence when presenting your data to stakeholders.'",
              "Action plans — strength stretch goals that require applying top talents to bigger, more complex organisational problems. Remediation rather than rehabilitation: for critical skills gaps, focus on workarounds — technology, restructuring the role, or partnering with teammates who hold complementary strengths.",
              "Deployment — treat it as a cultural shift, not an HR box-tick. Phase the rollout to secure buy-in, select the systems and tools, and train managers on the framework.",
            ],
          },
          {
            id: "my-notes-references",
            kind: "journal",
            title: "My Notes: References for Assessment 3",
            items: [
              "Culbert, S. A. (2010). Get rid of the performance review! How companies can stop intimidating, start managing — and focus on what really matters. Business Plus. Directly argues traditional performance review damages the supervisor-employee relationship.",
              "Adler, S., Campion, M., Colquitt, A., Grubb, A., Murphy, K., Ollander-Krane, R., et al. (2016). Getting rid of performance ratings: genius or folly? A debate. Industrial and Organizational Psychology, 9, 219-252. A full debate piece weighing both sides of abandoning ratings.",
              "Murphy, K. R. (2019). Performance evaluation will not die, but it should. Human Resource Management Journal, 30, 13-31. Directly critiques the continued survival of performance evaluation despite its flaws.",
              "van Woerkom, M., & de Bruijn, M. (2016). Why performance appraisal does not lead to performance improvement: excellent performance as a function of uniqueness instead of uniformity. Industrial and Organizational Psychology, 9, 275-281. Argues traditional appraisal's push for uniform standards actively works against improvement, since excellence is individual.",
            ],
          },
          {
            id: "feedback",
            kind: "note",
            title: "Feedback",
            body: "This last activity touched on all the former activities related to psychology, CoR and positive psychology, and sought to apply them to a performance management and appraisal approach.",
          },
        ],
      ),
    ],
  },
  {
    id: slugify("Week 4: Rewarding Performance"),
    week: 4,
    title: "Rewarding Performance",
    summary:
      "A deep dive into rewards — a specific critique of the role of financial rewards and intrinsic value at work. Heavy on scholarly evidence about performance-related pay, with the aim of building a nuanced understanding of how performance pay affects different kinds of work.",
    keyConcepts: [
      "PRP evidence is genuinely mixed, and context counts: positive effects cluster in production, sales and retail where output is easy to measure; results are far more mixed in knowledge work.",
      "Sample bias matters — most PRP research is US-based and WEIRD (Western, educated, industrialised, rich, democratic), and the US tipping/low-minimum-wage context differs sharply from Australia's.",
      "Lazear's taxonomy: pay can be input- or output-based, and discrete, continuous, or relative in structure.",
      "Pay-for-performance is good for effort on routine tasks but bad for innovation — the fix is contract design (tolerate early failure, reward long-run success), not removing incentives.",
      "Crowding-in vs crowding-out: whether performance pay helps or harms public service motivation depends on how the reward is delivered and who receives it.",
      "Meaning at work is not the same as meaningful work — eight sources across purpose, self-realisation, prestige and social.",
    ],
    assessmentLinks: [
      "Assessment 3: the PRP readings support a review of the effectiveness of a current performance management system.",
      "Assessment 3: Lazear provides an orthodox economic counterpoint to the Critical HRM and SDT readings — useful for contrasting mainstream and critical perspectives.",
      "Assessment 3: the meaning-over-transactions discussion builds critical reasoning for the final assessment.",
    ],
    image: {
      src: "/images/business-psychology/hrm6005/week-4/lazear-compensation.png",
      alt: "Week 4 — rewarding performance",
    },
    subModules: [
      createLearningSubModule("Week 4 Introduction", [
        {
          id: "overview",
          kind: "purpose",
          title: "Purpose",
          body: "This week takes a deep dive into rewards, offering a specific critique of the role of financial rewards and intrinsic value at work. Activities involve a lot of reading of the scholarly evidence related to performance-related pay, with guidance notes to keep that reading active and digestible. The purpose is a nuanced understanding of the impact of performance pay on different kinds of work performance. (The unit frames the week with Pink Floyd's 'Money' from The Dark Side of the Moon.)",
        },
        {
          id: "learning-objectives",
          kind: "objectives",
          title: "Learning Objectives",
          body: "After completing this week's tasks, you should be able to:",
          items: [
            "Examine the question: does money motivate?",
            "Explore the impact of financial rewards on intrinsic motivation.",
            "Research the role of meaning as it applies to work.",
            "Examine non-financial rewards.",
          ],
        },
      ]),
      createLearningSubModule("4.1 Performance-Related Pay", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Take a deep dive into the complexities of performance-related pay as it applies to employment systems in Australian and non-Australian contexts.",
        },
        {
          id: "prp-disclosure",
          kind: "note",
          title: "Product Disclosure: Why the Results Are So Mixed",
          items: [
            "PRP is contentious. Empirical research generally opens with 'previous research highlights mixed results for PRP'. One paper will say most researchers agree PRP can have a positive effect; another will say most agree it has little or no effect.",
            "Context counts. Studies showing a positive PRP-performance relationship are generally in production/manufacturing, sales and retail — settings where work output is easy to measure. In knowledge-based industries, where output depends on creativity and problem-solving, results are far more mixed.",
            "Most PRP studies come out of the US. Despite apparent similarity (Hofstede's dimensions make the two countries look nearly indistinguishable), Australia differs on a key point: a much more robust social welfare system, a significantly higher minimum wage, and a tax system that maintains a relatively better distribution of income across classes.",
            "In the US, where tipping is a culturally acceptable substitution for a poor minimum wage, PRP and work incentives are more the norm — and because they are more common, they can also be more successful at stimulating performance. This is sample bias. Expect to meet the acronym WEIRD (Western, educated, industrialised, rich and democratic): most research findings, particularly in psychology, derive from US-based, college-educated people who are in no way representative of the rest of the world.",
          ],
        },
        {
          id: "lazear",
          kind: "summary",
          title: "Step 1: Lazear (2018), Compensation and Incentives in the Workplace",
          body: "Journal of Economic Perspectives 32(3): 195-214. Core argument: compensation structure — not just level — drives worker behaviour. A personnel economics review through an agency theory lens, summarising decades of empirical labour economics research. Schedule 45-60 minutes for this one.",
          items: [
            "Taxonomy of incentive pay (a 2×3 matrix): input vs output based pay, crossed with discrete, continuous, or relative structure. An hourly wage is discrete/input; a piece rate is continuous/output; a promotion tournament is relative.",
            "Piece rates — strongly effective when output is easily observed. The Safelite Auto Glass case: switching from hourly to piece rate lifted productivity 44%. Works best where quality isn't hard to monitor.",
            "Team-based incentives — solve the 'won't help colleagues' problem of individual piece rates, but introduce free-riding. Work better in small groups, or via broader mechanisms like employee stock ownership.",
            "Tournament theory — promotions act like tournament prizes based on relative performance. A bigger spread between winner and loser pay produces more effort, but an excessive spread breeds sabotage, reduced cooperation, and more risk-taking, sometimes destructive.",
            "Career incentives — firms underpay young workers and overpay older ones to incentivise sustained effort and discourage shirking, since workers are protecting future rents.",
            "Nonmonetary incentives — acknowledges Deci's crowding-out effect (paying for previously voluntary acts can reduce intrinsic motivation) but argues intrinsic motivation is a marginal phenomenon in most paid labour markets, with pay still doing the heavy lifting.",
            "CEO/executive pay — reviews the 'overpaid CEO' critique against counterarguments (firm size complementarity, sorting effects, survivorship bias). Lazear is sceptical that CEO overpayment is as widespread or inefficient as critics claim.",
            "Relevance: a strongly orthodox economic counterpoint to the Critical HRM and SDT readings — useful for contrasting mainstream economic rationalist views of motivation against psychological and critical perspectives.",
          ],
          images: [
            {
              alt: "Lazear compensation and incentives",
              src: "/images/business-psychology/hrm6005/week-4/lazear-compensation.png",
            },
          ],
        },
        {
          id: "pay-definitions",
          kind: "definition",
          title: "Definitions",
          definitions: [
            {
              term: "Input and Output Pay",
              definition:
                "Input pay is compensation tied to the time or effort put in, not the result produced — e.g. hourly wage, salary, pay per course taught. Output pay is compensation tied to the result produced — e.g. piece rates, sales commission, or a fixed fee per job.",
            },
            {
              term: "Discrete, Continuous, Relative structure",
              definition:
                "Discrete — pay is all-or-nothing, tied to hitting one exact target (a fixed wage for a required 40-hour week, or a fixed fee for completing a job); no reward for exceeding or subtraction for falling short. Continuous — pay scales with however much input or output the worker provides (a piece rate, or flexible hours paid per hour). Relative (tournament theory) — pay depends on performance compared to others rather than an absolute standard, e.g. promotion tournaments won by ranking above peers.",
            },
            {
              term: "Piece-rate pay",
              definition:
                "A continuous, output-based pay scheme where workers are paid per unit of output they produce. A rate is set per unit, and pay scales directly with quantity produced.",
            },
            {
              term: "Team Based Incentives",
              definition:
                "Pay tied to the output of a group rather than the individual. Often used to solve the problem that pure piece-rate pay creates (individualism).",
            },
          ],
        },
        {
          id: "my-notes-lazear",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "Define piece-rate pay — pay based on output with a continuous structure. Worker pay scales with quantity produced and the agreed rate per unit/job.",
            "In Australia, what might be a problem switching from hourly to piece-rate pay, despite likely productivity gains? The trade-off is generally quality. Because there is a financial incentive for quantity, this can drive behaviour that prefers job speed over quality. Workers may also lean towards independent working over team-based work, which reduces collaboration, learning and mentoring, and creates a cultural shift.",
            "What are team-based incentives, and are they effective? Pay tied to the output of a group rather than the individual, often used to solve the individualism problem pure piece-rate pay creates. According to the article, in a manufacturing (output-based) setting, team-based pay successfully increased output. In an input-based setting (law), it saw more delegation of work to junior staff, where senior staff saw less incentive to put in effort themselves to increase earnings.",
            "How effective is relative pay? The key is getting the spread right. Too small a gap in promotion pay does not motivate; too large a gap can drive excessive risk-taking and unethical actions.",
            "As employees age, what other benefits might they provide outside traditional outputs? Generally, the longer an employee is at an organisation, the more knowledge they have of it. Knowledge has become a critical resource with an ageing population — more people retiring and taking critical company knowledge with them, leaving a knowledge deficit.",
            "How effective is intrinsic motivation in driving work outcomes, and where does it fall short? The article suggests intrinsic motivation is more effective at higher pay points where additional extrinsic financial rewards are less motivating, and in meaning-based roles where workers are aligned with the work. But it argues intrinsic motivation is marginal in most labour settings, where pay and extrinsic motivation elicit more effort.",
          ],
        },
      ]),
      createLearningSubModule("4.2 PRP and Innovation", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Explore the effect of performance incentives on innovative behaviour.",
        },
        {
          id: "ederer-manso",
          kind: "summary",
          title: "Ederer & Manso (2013), Is Pay for Performance Detrimental to Innovation?",
          body: "Management Science 59(7): 1496-1513. Central question: standard economics says pay-for-performance boosts effort and productivity, but psychology research says financial incentives inhibit creativity. How should compensation be structured if you specifically want to motivate innovation, not just effort?",
          items: [
            "Method: a controlled lab experiment with 379 subjects running a simulated lemonade stand — choosing location, ingredients and pricing across over six million possible combinations. This creates a genuine trade-off between exploitation (fine-tuning the inherited strategy) and exploration (abandoning it to search for a better, unknown one).",
            "Three pay conditions: fixed wage; standard pay-for-performance (a fixed % of profits every period); and an exploration contract that tolerates failure in the first half (no performance penalty for experimenting early) then rewards performance in the second — mirroring stock options with long vesting periods.",
            "Subjects on the exploration contract found the best strategy 80% of the time, far outperforming fixed wage (60%) and standard pay-for-performance (40%).",
            "Standard pay-for-performance backfired for innovation: those subjects mostly tweaked the existing strategy rather than searching for a new one — only 50% strayed from the default location, versus 80% under the exploration contract.",
            "Fixed-wage subjects explored a lot but haphazardly — only 55% tracked their choices carefully, versus 82% under the exploration contract. Exploring without discipline is inefficient.",
            "Risk aversion mattered: more risk-averse subjects performed worse specifically under standard pay-for-performance, since it punishes early failed experiments.",
            "Job security findings: a threat of termination for poor early results sharply reduced innovation (only 45% found the optimal strategy), while a golden parachute largely offset this (65%).",
            "Bottom line: pay-for-performance isn't bad per se — it's good for effort on routine tasks but bad for innovation, because it punishes early failure and pushes people to exploit what already works. The fix isn't removing incentives (a fixed wage isn't the answer either) but redesigning them: tolerate early failure, reward long-run success. Practices often criticised as 'rewarding failure' can be functional for innovation when combined with genuine long-term upside.",
          ],
        },
        {
          id: "my-notes-innovation",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "Why is performance-based pay not an effective motivator (per McGraw 1978, McCullers 1978, Kohn 1993, Amabile 1996)? They shared the finding that performance-based pay should not be used for creativity and innovation, because tying pay to performance narrows focus towards safe, proven strategies rather than the novel ones that produce innovation.",
            "How would you define innovation? Doing things differently to get a different result.",
            "How would you define an exploration contract? A contract designed to motivate innovation as opposed to routine effort.",
            "Summarise the experiment design — the lemonade stand experiment was designed to test which of three performance-based pay structures drove the most innovation from the stand holder.",
            "Summarise the results — participants on an exploration contract found the best strategy 80% of the time, far outperforming fixed wage and pay-for-performance.",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "You have seen that performance-based pay can be detrimental for roles involving problem-solving, failure and creativity — and dug deeper into a hybrid exploration contract, which may not suit all settings but combines some of the good things of a wage with a piece-pay structure that plays out over time.",
        },
      ]),
      createLearningSubModule("4.3 PRP in the Public Sector", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "A deep dive into the latest evidence about performance-related pay as it applies to the public sector — followed by a debate. Many professionals in Australia work for the public sector, and in recent years there has been considerable criticism of performance-based pay applied to Australian public sector contexts.",
        },
        {
          id: "assessment-note",
          kind: "note",
          title: "Assessment 3",
          body: "The readings in Steps 2 and 3 should be useful for Assessment 3, particularly if you are reviewing the effectiveness of a current performance management system.",
        },
        {
          id: "corduneanu",
          kind: "summary",
          title: "Corduneanu, Dudau & Kominis (2020), Crowding-in or Crowding-out",
          body: "Public Management Review. Core question: do performance-related pay and other extrinsic rewards undermine (crowd out) or enhance (crowd in) Public Service Motivation — the intrinsic drive to do good for others that characterises public sector workers? The literature has been contradictory for decades; this conceptual paper uses Self-Determination Theory to reconcile it. It matters because under New Public Management reforms, public sector workers are increasingly paid on performance metrics — and if this erodes their underlying motivation to serve, it backfires on delivery of public value.",
          items: [
            "Crowding-out evidence: performance bonuses reduced service quality among Chinese physicians (Qian & He 2018); PFP undermines professionalism and pride (Wynia 2009); high extrinsic rewards reduced intrinsically motivated people's willingness to even take public sector jobs (Georgellis et al. 2011).",
            "Crowding-in evidence: federal employees expecting merit pay performed better regardless of PSM level (Alonso & Lewis 2001); PFP linked to higher job satisfaction, especially for high-PSM employees (Stazyk 2013); 'love of money' strengthened the PSM-job satisfaction link in Chinese public servants (Liu & Tang 2011).",
            "The SDT resolution: the relationship isn't fixed — it depends on moderators. Contextual moderators include managerial autonomy support (when rewards are delivered in a supportive environment with positive feedback and minimal pressure, they're perceived as informational — signalling competence — rather than controlling) and colleague autonomy support.",
            "Person-specific moderators: general causality orientations (autonomous vs controlled), intrinsic/extrinsic reward values, and integrated versus non-integrated money motives. Thibault Landry et al. (2016) found money motives integrated into identity (pride in achievement, fair compensation, ability to give) support wellbeing, while non-integrated motives (impulse spending, overcoming self-doubt, social comparison) undermine it.",
            "Key theoretical contribution: the paper adds a fourth need — beneficence (doing good for others) — to SDT's traditional three, because ordinary SDT doesn't fully capture the prosocial dimension central to PSM.",
            "Bottom line: whether performance pay helps or harms public service motivation isn't a fixed effect. It depends on how the reward is delivered (autonomy-supportive vs controlling) and who receives it. This reframes decades of contradictory findings as a moderation problem rather than a yes/no question.",
          ],
        },
        {
          id: "my-notes-public",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "How have the authors defined intrinsic motivation? Through the lens of SDT, and meeting the three psychological needs of autonomy, competence and relatedness.",
            "Crowding-in and crowding-out — crowding in is where performance-related pay enhances the intrinsic drive to do good for others/society; crowding out is where it undermines that drive in a public service role.",
            "Summarise the mixed findings — the article documents contradictory evidence on whether PFP crowds out or crowds in Public Service Motivation, with evidence produced for both. Their conclusion is that the answer lies at the psychological level, in how rewards are subjectively experienced.",
            "Define public service motivation — the motivation to work in the public sector, where efforts benefit the immediate community or wider society rather than the self.",
            "Describe self-determination theory — a psychological theory explaining the inherent needs for human motivation: autonomy, relatedness and competence.",
            "Under what conditions do performance-contingent rewards advance PSM? Contextual factors (how the reward is delivered): managerial autonomy support and colleague autonomy support. Person-specific factors (who receives it): general causality orientations, intrinsic/extrinsic reward values, and integrated vs non-integrated money motives. The overarching principle: rewards advance rather than undermine PSM when they satisfy the four basic needs — autonomy, competence, relatedness and beneficence — rather than threatening them. That happens when the reward is delivered in an autonomy-supportive context, the employee has an autonomy-oriented disposition, and their motives for wanting the reward are integrated with their identity rather than externally imposed. In plain terms: it's not the reward itself that determines the outcome, but the psychological meaning it carries for that person in that context. The same bonus scheme can crowd in motivation for one pairing and crowd it out for another.",
          ],
        },
        {
          id: "australia-post",
          kind: "discussion",
          title: "Steps 3-4: The Australia Post Debate",
          body: "Read the ABC News article on Australia Post chief executive Christine Holgate's resignation, considering her reasoning for how she rewarded executives and the public's perception. Then take a position (80-100 words), using at least one academic reference from the week: are you FOR performance-contingent pay in this case, or AGAINST, and do you feel the Prime Minister made the right call in criticising the scenario?",
        },
        {
          id: "my-notes-debate",
          kind: "journal",
          title: "My Notes: Debate Position",
          body: "I am for performance-contingent pay in the case of Australia Post and Ms Holgate. I think that a CEO/Board has the right to reward its most high-performing employees. Australia Post is a government-owned business, however it operates as an independent business and does not receive funding from the Government. Personally, I would trust that the CEO and Board of a government-owned enterprise have considered that the benefit the enterprise is receiving from the work far outweighs the expense of the gift, and therefore is in the interest of the Australian public to drive more benefits.",
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "Pay for performance can sometimes be a good thing, but it very much depends on a whole range of factors. Review the peer responses in the debate and note any interesting points.",
        },
      ]),
      createLearningSubModule("4.4 Meaning at Work", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "So far this topic has spent a lot of time on money as a motivator. But most of us don't only go to work for the money — money is important as a hygiene factor, but it isn't the only reason. This activity researches the role of meaning as it applies to work.",
        },
        {
          id: "hurst-video",
          kind: "resource",
          title: "Step 1: Aaron Hurst — Elevation of Meaning",
          body: "Hurst's argument is that 'what is my purpose?' is a grandiose and intimidating question, and that purpose is more accessible than that. His research finds we are wired to find meaning at different elevations, and that this isn't hierarchical — people tend to start and stay at one level rather than graduating through them. Roughly a third of people find the most meaning through direct individual impact (a doctor seeing each patient as a unique opportunity), a third at the organisational level, and a third at the societal level. His prompt: work out which elevation gives you the most purpose, and redesign your identity and job around it.",
          links: [
            {
              href: "https://www.youtube.com/watch?v=H54vh7UI3_I",
              label: "How to find a meaningful job, or find purpose in the job you already have (4:51)",
            },
          ],
          images: [
            {
              alt: "Aaron Hurst — finding meaning at work",
              src: "/images/business-psychology/hrm6005/week-4/video-meaning-at-work.png",
            },
          ],
        },
        {
          id: "my-notes-elevations",
          kind: "journal",
          title: "My Notes: The Three Elevations of Meaning",
          items: [
            "Individual level — making an impact person by person in a unique and intimate way.",
            "Organisational level — making an impact by building organisations that can have a sustained impact at a larger scale.",
            "Societal level — making an impact by addressing meta issues that affect society systemically: patterns, trends, policy.",
          ],
        },
        {
          id: "hansen-keltner",
          kind: "summary",
          title: "Step 2: Hansen & Keltner (2012), Finding Meaning at Work, Even When Your Job Is Dull",
          body: "HBR. Core premise: meaning at work isn't the same as meaningful work — the latter refers to the task itself, but meaning can come from many sources beyond the content of what you do. The authors identify eight sources across four categories.",
          items: [
            "Purpose — Contributions beyond yourself: feeling your work helps others or serves a broader mission. Most jobs lack an obvious social mission, but even ordinary companies can infuse purpose if employees genuinely feel their work benefits others.",
            "Self-realisation — Learning: work as a vehicle for skill acquisition and growth. And Accomplishment: pursuing mastery and being recognised for it drives satisfaction, confidence and self-worth — intrinsically meaningful even without a grand social mission.",
            "Prestige — Status: the social credibility that comes with a job title or employer name. And Power: the ability to acquire and exercise influence, meaningful for those drawn to it.",
            "Social — Belonging to a community: the workplace as a source of friendship and connection, especially valuable where other community ties are eroding. Agency: feeling your ideas are heard and your contributions genuinely affect outcomes. Autonomy: freedom from being told what to do and control over your own work.",
            "Key takeaways: different people are drawn to different sources, with no universal hierarchy; more isn't necessarily better, and deeply experiencing even one can be enough; the real problem is experiencing none of them — that's when work feels empty.",
            "Relevance: complements SDT — autonomy and agency map to SDT's autonomy need, belonging to relatedness, learning and accomplishment to competence. But it adds dimensions SDT doesn't fully cover: status, power, and purpose beyond yourself.",
          ],
        },
        {
          id: "meaning-definition",
          kind: "definition",
          title: "Definition",
          definitions: [
            {
              term: "Meaning at Work",
              definition:
                "A person's experience of something meaningful, something of value, that work provides. That is not the same as 'meaningful work', which refers to the task itself.",
            },
          ],
        },
        {
          id: "my-notes-meaning",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "Define meaning at work — where a job, role or company provides purpose and fulfilment.",
            "The four categories — Purpose: contributions beyond yourself. Self-realisation: learning and accomplishment. Prestige: status and power. Social: belonging, agency and autonomy.",
            "What drives my meaning at work? I am driven by self-realisation and prestige.",
          ],
        },
        {
          id: "meaning-over-transactions",
          kind: "journal",
          title: "My Notes: Meaning Over Transactions",
          body: "How can performance management systems appropriate meaning over transactions? Shift the purpose of performance management from evaluative to developmental as the foundational layer — this immediately makes PM forward-looking and growth-focused. Incorporate SDT to satisfy employees' psychological needs by supporting autonomy, competence and relatedness. Include meaning-based assessments such as Michael Steger's Work and Meaning Inventory to assess whether employees are finding meaning in their work. Replace annual transactions with frequent, human dialogue where the conversation can be about meaning rather than scores.",
        },
      ]),
    ],
  },
  {
    id: slugify("Week 5: Work Design"),
    week: 5,
    title: "Work Design",
    summary:
      "Explores work design (job design) — the job characteristics conducive to employee performance, with particular focus on flexible work and autonomy as drivers of productivity, and on what happens when demands outstrip resources.",
    keyConcepts: [
      "Work design shapes outcomes: positive (engagement, performance, work-life balance, wellbeing) and negative (stress, work-life conflict, poor health).",
      "One hundred years of research clusters into five perspectives: sociotechnical systems, the Job Characteristics Model, Job Demands-Control, Job Demands-Resources, and role theory.",
      "The five job characteristics (Hackman & Oldham): skill variety, task identity, task significance, autonomy, feedback.",
      "JD-R lets you examine any job — whatever its form — and ask whether physical, emotional and cognitive demands are balanced by organisational, managerial and individual resources.",
      "Demands and resources are not fixed categories: remove a resource and a demand often appears in its place, and the classification can be subjective.",
      "'Doing more with less' (New Public Management) raises demands and strips resources, with individual, organisational and economy-wide costs.",
      "COPSOQ is a validated, free instrument for assessing psychosocial working conditions — a structural alternative to individual output rating.",
      "Underperformance has two dimensions (output and behaviour), and incompetence is frequently unintentional — often a systemic rather than individual failing.",
    ],
    assessmentLinks: [
      "Assessment 3: work design gives the other half of the puzzle — useful for arguing traditional PM frameworks fail partly because they ignore how the job itself is designed, not just how it is evaluated.",
      "Assessment 3: COPSOQ is an example of an alternative to traditional appraisal — assessing systemic conditions rather than individually rating output.",
    ],
    image: {
      src: "/images/business-psychology/hrm6005/week-5/more-with-less-demands.png",
      alt: "Week 5 — work design",
    },
    subModules: [
      createLearningSubModule("Week 5 Introduction", [
        {
          id: "overview",
          kind: "purpose",
          title: "Purpose",
          body: "This week explores the concept of work design (also known as job design), including the job characteristics conducive to employee performance, with a particular focus on flexible work and autonomy as drivers of employee productivity. (The unit frames the week with Sheena Easton's 1981 hit '9 to 5 (Morning Train)' — and how much times have changed since.)",
        },
        {
          id: "learning-objectives",
          kind: "objectives",
          title: "Learning Objectives",
          body: "After completing this week's tasks, you should be able to:",
          items: [
            "Explore the concept of work design.",
            "Examine the impact of work design elements on employee performance outcomes.",
            "Explore the job demands and resources across different sectors.",
            "Explore the issue of underperformance.",
          ],
        },
      ]),
      createLearningSubModule("5.1 Introduction to Work Design", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Introduce the concept of work design. Work design is a classic HRM concept, and most textbooks dedicate a detailed section to it. One problem with such an established and largely theoretical concept is that it can lack practical meaning — but work design can be highly practical, providing the foundation for exploring how the particulars of a job (where it happens, for how long, how regularly, involving which tasks) can be crafted to shape positive or negative work outcomes. Positive outcomes include engagement, performance, work-life balance, career satisfaction and wellbeing; negative outcomes include work stress, work-life conflict, and poor physical and mental health.",
        },
        {
          id: "parker",
          kind: "summary",
          title: "Step 1: Parker, Morgeson & Johns (2017), One Hundred Years of Work Design Research",
          body: "The Journal of Applied Psychology's 100th anniversary review — a big-picture retrospective mapping how the field evolved. Five historical perspectives were identified via citation mapping:",
          items: [
            "Sociotechnical Systems & Autonomous Work Groups (1950s onward) — sparked by Trist & Bamforth's 1951 coal mining studies, which found that replacing self-managing, multiskilled small teams with mass-production 'longwall' methods caused psychological and social harm. This showed work design itself, not just individual factors, causes sickness and dysfunction.",
            "Job Characteristics Model (Hackman & Oldham, 1975/1980) — the most dominant and highly-cited perspective. Five core characteristics (skill variety, task identity, task significance, autonomy, feedback) drive motivation, satisfaction and performance. Rated by expert judges as one of only eight OB theories simultaneously high in scientific validity and practical usefulness.",
            "Job Demands-Control Model (Karasek, 1979) — focused on health and strain rather than motivation. Core claim: high demands plus low control produces the highest strain, and control buffers the negative effects of demands. Karasek & Theorell (1990) later added social support as another buffer.",
            "Job Demands-Resources Model (Demerouti et al., 2001) — broadened 'resources' beyond control and support, and added a dual-path structure: demands primarily drive strain and burnout (health impairment path), while resources drive engagement and performance (motivational path). Widely applied but criticised as more descriptive than explanatory — it doesn't say why the relationships hold, and needs borrowed theories (SDT, Conservation of Resources, Social Cognitive Theory) to explain mechanisms.",
            "Role Theory — traces to Kahn et al. (1964) on role conflict, ambiguity and overload as distinct stressors, predating Karasek. Later expanded via job crafting (Wrzesniewski & Dutton, 2001) and role orientation/proactivity research showing autonomous job design promotes flexible role-taking and better performance.",
            "Key argument: these five clusters are historically distinct but 'convenient rather than substantive' — the boundaries are more a product of academic history and citation patterns than genuinely separate phenomena. The authors call for integrative, multilevel models bridging individual-level theories with team and system-level ones.",
            "Future directions: more multilevel research; better attention to social, relational, cognitive and physical aspects of work; considering curvilinear effects (Warr's 1984 'vitamin model', where traditionally positive characteristics like complexity show diminishing or negative returns at very high levels); and contemporary changes such as electronic monitoring, emotional labour and remote work.",
            "The paper closes by echoing a 1917 quote from JAP's first issue calling for work to preserve human dignity — bookending the field's century-long moral purpose.",
          ],
        },
        {
          id: "job-characteristics-definition",
          kind: "definition",
          title: "Definition",
          definitions: [
            {
              term: "Job Characteristics",
              definition:
                "From Hackman & Oldham's Job Characteristics Model: the specific design elements of work that drive motivation, satisfaction and performance — skill variety, task identity, task significance, autonomy, and feedback.",
            },
          ],
        },
        {
          id: "my-notes-work-design",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "Define 'job characteristics' — skill variety, task identity, task significance, autonomy, feedback. Aspects of a job.",
            "Define the job demands-resources/control model — focuses on health versus strain rather than motivation. It claims high demands plus low control equals highest strain, whereas control buffers the negative effects of demands.",
            "How has work design impacted management thinking? It has shaped how managers think about talent, engagement, flexibility and organisational structure.",
          ],
        },
      ]),
      createLearningSubModule("5.2 Job Demands and Resources", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Gain practical insight into work design through the lens of the Job Demands-Resources model.",
        },
        {
          id: "jdr-context",
          kind: "summary",
          title: "Step 1: Why JD-R?",
          items: [
            "Some of us work shifts, sometimes at night; some underground or in mostly dark settings; others sit for hours behind a computer; others are bound to the seat of a car or truck making deliveries; and some stand for hours delivering classes, chasing toddlers, or doing rounds on elderly residents.",
            "How is it possible to compare all the physical and knowledge-based roles that make up the labour force? And how can the work environment be catered so that — whether the job is based in a vehicle, a house, an office, a ward or a street — it is conducive to performance?",
            "The answer is the JD-R model: a framework that lets us examine work in whatever form it takes and ask whether the physical, emotional and cognitive demands of the job are balanced by organisational, managerial and individual resources local to the worker.",
            "Demands are those things that, left unchecked, drain or deplete an employee's ability to perform. Job resources are those things that mitigate the strain caused by demands, or provide energy or capital to overcome that strain.",
          ],
          images: [
            { alt: "Varied work contexts", src: "/images/business-psychology/hrm6005/week-5/work-contexts-1.jpeg" },
            { alt: "Varied work contexts", src: "/images/business-psychology/hrm6005/week-5/work-contexts-2.jpeg" },
          ],
        },
        {
          id: "sorting-activity",
          kind: "activity",
          title: "Step 2: Demand or Resource?",
          body: "Read the scenarios and sort each into job demand or job resource.",
          images: [
            {
              alt: "Job demands and resources sorting activity",
              src: "/images/business-psychology/hrm6005/week-5/demands-resources-activity.png",
            },
          ],
        },
        {
          id: "my-notes-demands",
          kind: "journal",
          title: "My Notes: Demands and Mitigating Resources",
          body: "Additional customers to manage — additional resources that could buffer the demands of managing more customers than the role initially required could be: travel compensation or a work vehicle to visit more customers, additional pay given the extra responsibility, and tools to manage more customers such as digital systems.",
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "Did you realise that if something that is a job resource weren't available, a demand would be there instead? For example, if instead of a supportive boss you had one who bullied, surveilled and micromanaged, you would be detracted from your ability to perform. There are no hard and fast rules about what counts as a demand versus a resource — it can be subjective. In some cases an individual might have a resource that stops them experiencing something in their work context as a demand at all.",
        },
      ]),
      createLearningSubModule("5.3 Doing More with Less", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Explore the JD-R model against the backdrop of contemporary workplace logic centred on doing more with less, and the impact of that logic on employee performance and wellbeing.",
        },
        {
          id: "origins",
          kind: "summary",
          title: "Origins of the Logic",
          items: [
            "'Doing more with less' has become particularly — but not exclusively — synonymous with the public sector. The phrase isn't new: it has grown as a workplace logic since the 1970s, influenced by Thatcherism and subsequently neoliberalism.",
            "Thatcherism held that the role of the public service was to be as lean as possible — small government, and if people wished to pull themselves up by their bootstraps, that was on them.",
            "Neoliberalism is a broader ideology, strongly associated with Reagan, holding that because the private sector is more efficient, governments should outsource or privatise as much as possible.",
            "In the public sector this logic acquired its own name: New Public Management — the deliberate under-resourcing of public sector departments and services by senior managers, bureaucrats and governments. Because the public sector cannot generate profit, its only route to apparent efficiency is reducing input costs, so departments face efficiency targets and regular program cuts.",
            "There is arguably a motivational logic behind this, akin to 'treat them mean, keep them keen' — a misguided managerial thought that underfunding operations motivates employees to work harder. The evidence does not support this; forcing employees to work under-resourced simply makes them stressed.",
          ],
          images: [
            { alt: "Doing more with less", src: "/images/business-psychology/hrm6005/week-5/more-with-less-1.png" },
          ],
        },
        {
          id: "increased-demands",
          kind: "summary",
          title: "What Happens to Demands",
          items: [
            "Employees have to work at a faster pace across more functions, undertaking tasks with higher cognitive or emotional demand.",
            "Being spread across multiple roles — perhaps filling in for staff who have left or can't be rehired — creates unpredictability and confusion about what one's role actually entails.",
            "Staff are asked to compromise and prioritise unreasonably, creating conflicts about which task comes first.",
            "Having worked at that intensity, staff may also be asked to undertake illegitimate tasks — beneath their pay grade, or a poor use of their time.",
            "In a climate of austerity and the flow-on effects of stress, staff may be bullied, manipulated or coerced into doing work — classic negative work acts that degrade mental health over time.",
          ],
          images: [
            { alt: "Increased demands", src: "/images/business-psychology/hrm6005/week-5/more-with-less-demands.png" },
          ],
        },
        {
          id: "reduced-resources",
          kind: "summary",
          title: "What Happens to Resources",
          items: [
            "Staff may be provisioned with fewer tangible and intangible resources, and not receive pay commensurate with their work.",
            "They may not receive social support from supervisors or colleagues, who may themselves be too stretched to provide it.",
            "Leaders, constantly stressed working without necessary resources, may be tired, lacking inspiration and the strategic capability to drive better outcomes.",
            "Employees might lose their ability to cope, with lower levels of resilience, hope and optimism.",
            "There may be a curt psychosocial climate where personal wellbeing is not a priority, and low levels of trust, with appetite for risk so low that employees are kept within strict lines of control.",
          ],
          images: [
            { alt: "Reduced resources", src: "/images/business-psychology/hrm6005/week-5/more-with-less-resources.png" },
          ],
        },
        {
          id: "outcomes",
          kind: "summary",
          title: "The Outcomes — Individual, Organisational and Economic",
          items: [
            "Over time, working continuously in a climate of doing more with less produces very negative health and wellbeing outcomes. The method meant to boost financial performance begins to have the opposite effect, and ends up costing — potentially a lot.",
            "Primary impacts on individuals range from reduced engagement (drive, energy, flow), a loss of meaning, and low wellbeing. Increased cognitive stress takes physical hold: reduced sleep, increased blood pressure and heart rate, burnout, and negative mental health outcomes.",
            "Over time people leave, creating further costs sourcing replacements — particularly for roles that have become undesirable.",
            "At scale this affects economy-wide productivity (consider aged care, or healthcare during COVID). An economically depressed sector then affects other sectors.",
            "Working under these conditions increases workplace risks and potentially accidents, with further workers' compensation costs. And when people en masse don't receive sufficient income, they don't receive sufficient superannuation — increasing collective economic burden later, as the cost of healthcare for people worn down by their work history falls to the public.",
          ],
          images: [
            { alt: "Outcomes of doing more with less", src: "/images/business-psychology/hrm6005/week-5/more-with-less-outcomes.png" },
          ],
        },
        {
          id: "reflection",
          kind: "reflection",
          title: "Step 3: Personalise It",
          body: "An employee's performance, to be assessed truly and fairly, needs to account for the job demands and resources they are exposed to. Reflect on a work context familiar to you and discuss your performance — good or bad — and the kinds of demands and resources that shaped that experience.",
        },
      ]),
      createLearningSubModule("5.4 Measuring Job Demands and Resources", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Introduces a conceptual and measurement framework for examining work design issues in practice.",
        },
        {
          id: "culture-surveys",
          kind: "note",
          title: "Some Context Before You Begin",
          body: "Most of us who have worked in corporate environments have been exposed to workplace culture surveys — an anonymous link once or twice a year, 15-20 minutes rating feelings about the work environment on a Likert scale. These surveys are affiliated with performance management systems, particularly in high-performance work environments, and are common in financial, professional and public administration settings. Results are sometimes reported against leaders' and managers' performance appraisals, but they are also used to get insight into what might be stifling employee productivity.",
          images: [
            { alt: "Measuring job demands and resources", src: "/images/business-psychology/hrm6005/week-5/measuring-jdr.png" },
          ],
        },
        {
          id: "copsoq",
          kind: "summary",
          title: "Step 1: COPSOQ III — Guidelines and Questionnaire",
          body: "The Copenhagen Psychosocial Questionnaire is an international, standardised instrument for assessing and improving psychosocial working conditions. Developed by Tage Kristensen and Vilhelm Borg at the Danish National Research Centre for the Working Environment (1995-2007), now coordinated by the International COPSOQ Network.",
          items: [
            "Widely used and validated — cited in hundreds of indexed journal articles, referenced by the WHO and ILO, and recognised as good practice by the EU Occupational Safety and Health Agency. Available in 25+ languages, enabling cross-country comparison.",
            "Theoretically integrative — operationalises multiple established work environment theories in one tool: demand-control-social support, effort-reward imbalance, job demands-resources, work-family conflict, social capital, the vitamin model, and sociotechnical systems theory. In other words, it draws together most of the theories from the Parker, Morgeson & Johns paper.",
            "Generic — usable across any industry, sector or workplace size, and allows benchmarking against general population reference values.",
            "Structure — three versions built from a shared item bank. CORE items are mandatory in every national version, ensuring international and longitudinal comparability; MIDDLE and LONG items are added depending on version. Short/middle versions suit workplace risk assessment and organisational development; the long version is primarily for research.",
            "Guidelines for workplace use: it exists to identify and reduce psychosocial risk, not just measure it, so results should drive real change. Management, worker representatives and staff must be involved at every stage — worker participation isn't optional, as the tool's validity depends on genuine buy-in. Anonymity and confidentiality are strictly mandatory. The wording and structure of the validated national questionnaire cannot be altered.",
            "Ten 'soft guidelines' include: never start an assessment without genuine intent to act on results; a response rate below 60% may signal lack of engagement; employees have the right to see and discuss results they contributed to; no one-size-fits-all solutions — interventions must be participatory and context-specific; distinguish clearly between what can and cannot be changed; repeat the survey 1-2 years after interventions; treat results as a tool for dialogue, not a verdict; and position the process within a learning-organisation mindset.",
            "Relevance: COPSOQ bridges the PM/appraisal material and the JD-R and work design literature, operationalising the psychosocial risk side of JD-R into a practical tool. For Assessment 3 it's a useful example of an alternative to traditional appraisal — rather than individually rating output, it assesses the systemic, organisational conditions that shape wellbeing and performance: a structural, participatory model rather than a top-down evaluative one.",
          ],
        },
        {
          id: "my-notes-copsoq",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "Define 'psychosocial risk factor' — something that exists in the work environment that poses a risk to an employee's psychological health.",
            "What work environment theories are covered through COPSOQ? JD-R; demand-control and social support; effort-reward imbalance; work-family conflict; the vitamin model; sociotechnical systems theory.",
            "What is the substance of the anonymity clause, and why is it important? Anonymity and data confidentiality must be guaranteed for workers' active participation.",
          ],
        },
      ]),
      createLearningSubModule(
        "5.5 Comparing Job Demands and Resources Across Different Contexts",
        [
          {
            id: "purpose",
            kind: "purpose",
            title: "Purpose",
            body: "Examine job demands and resources across different sectors.",
          },
          {
            id: "people-at-work",
            kind: "resource",
            title: "Step 1: The People at Work Tool",
            body: "People at Work is a tool and resource provided by the Queensland government for undertaking a job demands and resources analysis of different workplaces. It is loosely based on COPSOQ, though scales providing indicative measures of mental health are added to the COPSOQ questions, along with a more detailed examination of workplace bullying.",
            links: [
              {
                href: "https://www.peopleatwork.gov.au/",
                label: "People at Work",
              },
            ],
          },
          {
            id: "paw-report",
            kind: "activity",
            title: "Step 2: The 2016 Psychosocial Risk Audit",
            body: "In 2016, People at Work conducted a job demands and resources (psychosocial risk) audit of different workplaces across Australia.",
            steps: [
              {
                id: "exec-summary",
                title: "Read the executive summary",
                body: "Open the People at Work report and read the executive summary.",
              },
              {
                id: "industry-comparison",
                title: "Read pages 67-69, the industry comparison",
                body: "Pay particular attention to Table 8.1, which compares psychosocial hazard scores across industries.",
              },
            ],
            links: [
              {
                href: "https://www.worksafe.qld.gov.au/__data/assets/pdf_file/0014/12317/paw-report.pdf",
                label:
                  "People at Work (2016) — An assessment of psychosocial hazards in the workplace (PDF)",
              },
            ],
          },
          {
            id: "discussion",
            kind: "discussion",
            title: "Steps 3-4: Three Surprising Findings",
            body: "From Table 8.1, select three findings that surprised you and post approximately 100 words of analysis, explaining why you think those scores occurred. For example: emotional demands scores were high for education and training and for health care and social assistance — likely because of the degree of complex human interaction involved in those settings. Then comment on at least one peer's post.",
          },
          {
            id: "feedback",
            kind: "note",
            title: "Feedback",
            body: "Having access to a validated tool for assessing job demands, resources and workplace culture is a handy thing to have, particularly when it is free. The last set of tasks before closing the topic is to review the COPSOQ in action.",
          },
        ],
      ),
      createLearningSubModule("5.6 Underperformance", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Explore the causes and solutions to employee underperformance.",
        },
        {
          id: "definitions",
          kind: "definition",
          title: "Step 1: Three Key Terms",
          definitions: [
            {
              term: "Underperformance",
              definition:
                "Two dimensions. First, an employee can underperform because the quality or volume of their output is not up to standard. Second — which may or may not relate to the first — an employee's work behaviour is not deemed appropriate: for example, attending work under the influence of alcohol or drugs, or sending inappropriate communications to colleagues or clients.",
            },
            {
              term: "Blame",
              definition:
                "Traditionally we have put all the blame for underperformance on the employee. Sometimes this is appropriate, particularly where an employee has acted under the second dimension with the intention of deriving a negative outcome for the workplace. However, incompetence — more frequently associated with the first dimension — is often not intentional.",
            },
            {
              term: "Incompetence",
              definition:
                "The state where an employee lacks the necessary skills/ability, motivation or opportunity to generate the desired outcome.",
            },
          ],
        },
        {
          id: "fairwork-causes",
          kind: "summary",
          title: "Fair Work: Causes of Incompetence",
          items: [
            "The employee doesn't know what is expected of them because goals and standards are unclear.",
            "The employee may not have the knowledge or skills to do the job.",
            "The employee is unsure if they are meeting the requirements.",
            "Low personal motivation or confidence.",
            "Personal issues, such as family stress, physical and/or mental health problems, or problems with drugs or alcohol.",
            "Low morale in the workplace and/or a poor work environment.",
            "Interpersonal differences or cultural misunderstandings.",
            "Workplace bullying.",
          ],
          links: [
            {
              href: "https://www.fairwork.gov.au/employment-conditions/performance-in-the-workplace",
              label: "Fair Work — Managing underperformance",
            },
          ],
        },
        {
          id: "my-notes-dismissal",
          kind: "journal",
          title: "My Notes: Six Considerations Before Dismissing for Underperformance",
          items: [
            "Told them the purpose of performance meetings in advance and allowed them to prepare.",
            "Told them they could have a support person present.",
            "Clearly outlined the expected level of performance and the improvement that was required.",
            "Clearly warned them that their performance needed to improve.",
            "Gave them time and support to improve their performance.",
            "Told them that they may be dismissed if their performance didn't improve.",
          ],
        },
        {
          id: "hallowell",
          kind: "summary",
          title: "Step 3: Hallowell (2005), Overloaded Circuits — Why Smart People Underperform",
          body: "HBR. Core concept: Attention Deficit Trait (ADT) — a purely environmentally-caused condition, unlike ADD which has a genetic basis. ADT is brought on by chronic brain overload from modern work demands: constant multitasking, interruptions, and information overload. Symptoms include distractibility, inner frenzy, impatience, and difficulty organising, prioritising and managing time.",
          items: [
            "The neuroscience: the frontal lobes handle executive functioning — decision-making, prioritisation, planning — and work well under normal conditions. Beneath them, deep brain centres govern survival instincts and basic emotion. When overload hits, the brain treats it like a physical threat, triggering fear and panic. Control shifts from the rational frontal lobes to the primitive survival brain, impairing flexibility, humour, creativity and nuanced thinking exactly when they're most needed. Fear, not any diagnosable disorder, is the most dangerous factor undermining performance.",
            "Critical management failure: organisations tend to view ADT symptoms through a moral lens, seeing struggling employees as weak or deficient rather than recognising a real neurological response to an overloaded environment. Hallowell describes a client with stellar reviews who was told to resign after admitting he was overloaded — and who later thrived elsewhere.",
            "Case study: a toxic, isolated, no-help culture in a university chemistry department led to a graduate student's suicide. Leadership responded structurally — multiple supervisors instead of one, biweekly social gatherings, redesigned open office space, mental health education, and confidential support. Performance stayed excellent and the culture became far more humane.",
            "Solution 1 — promote positive emotions and human connection. Fear-free environments where colleagues trust and connect activate brain pathways supporting executive functioning, even under stress. Isolation worsens ADT; regular face-to-face human moments counteract it.",
            "Solution 2 — take physical care of your brain: adequate sleep (can you wake without an alarm?), stable blood glucose via complex carbs and protein rather than sugar and white flour, omega-3s, and exercise, which boosts brain health chemicals.",
            "Solution 3 — organise for ADT: break large tasks into smaller ones, keep a clear workspace, block distraction-free time, set specific email hours, end each day with a maximum five-item priority list, and apply the OHIO rule (Only Handle It Once — act, file or bin, no piles).",
            "Solution 4 — protect your frontal lobes: slow down, don't rush incoming information, and use mind-clearing tricks when overwhelmed to quiet the panicked lower brain.",
            "Solution 5 — leaders should match skills to tasks. JetBlue's David Neeleman openly discusses his weaknesses, delegates accordingly, and encourages managers to fit tasks to people's natural strengths rather than forcing uniformity — echoing the strengths-based approach from van Woerkom & Kroon.",
            "Bottom line: ADT is a real, named, manageable phenomenon, not a character flaw. The most powerful lever for leaders is naming it, removing the moral stigma, and redesigning environments rather than expecting individuals to push through.",
            "Relevance: connects directly to JD-R (demands overwhelming resources leads to strain and burnout) and to SDT (competence — matching tasks to strengths). It is also a strong counterpoint to purely metrics-driven PM: a traditional appraisal focused only on output would likely punish someone struggling with ADT as underperforming, when the real issue is systemic overload — reinforcing the Assessment 3 critique that traditional PM frameworks often misdiagnose structural problems as individual failings.",
          ],
        },
      ]),
    ],
  },
  {
    id: slugify("Week 6: The Future of Performance Management"),
    week: 6,
    title: "The Future of Performance Management",
    summary:
      "Circles back to the debates from Week 1 and examines in detail how and why performance management is changing — through the Deloitte and GE cases, the neuroscience against ratings, and a crisis-era alternative.",
    keyConcepts: [
      "The recap: evaluative appraisal reduces ownership and proactivity (Qiu et al.); the industry is shifting toward developmental, frequent feedback (Cappelli & Tavis); and PM elevates managerial power at the expense of employees (Tweedie et al.).",
      "Continuous PM: the 3 C's — Continuous, Crowdsourced, Culturally aligned — plus a shift from high-stakes/low-frequency to low-stakes/high-frequency conversations.",
      "Deloitte's redesign: check-ins, performance snapshots (4+ per year), and pulse surveys — the biggest leap was 'analog, not just digital', making PM fundamentally about conversations.",
      "GE dismantled the stack ranking it was most identified with — but its own HR chief admits she doesn't know how to escape 'meritocracy and differentiation', exposing the shadow-ranking problem.",
      "The neuroscience: ratings trigger a threat response and reinforce a fixed mindset, damaging all five SCARF factors (Status, Certainty, Autonomy, Relatedness, Fairness).",
      "The Performance Promoter Score offers a middle path — simplify and de-bureaucratise measurement rather than abolishing it.",
    ],
    assessmentLinks: [
      "Assessment 3: the Deloitte and GE cases are primary evidence that the academic ideas have been tested at scale — and that surface reform doesn't necessarily resolve the structural critique.",
      "Assessment 3: Rock et al. supplies a mechanistic, neuroscience-based explanation for why rating-based PM fails; PPS supplies the counterpoint that some measurement is still needed.",
      "This week is designed to put the finishing touches on the third assignment.",
    ],
    subModules: [
      createLearningSubModule("Week 6 Introduction", [
        {
          id: "overview",
          kind: "purpose",
          title: "Purpose",
          body: "Over six weeks we have delved into performance management and rewards, and must acknowledge ongoing inconsistencies in practice and theory. Performance management matters for ensuring employees are effective and efficient, and at the same time there needs to be an appropriate balance of job demands and resources. We have discovered that rewards, including financial ones, can motivate — but can also limit innovative thinking, with detrimental long-term effects. We have learned about bias and opportunity, and how some people are more able or likely to perform based on adherence to company values and image, which overlooks key contributors to performance. And we have outlined the specific components of appraisals and PM systems. The aim this week is to circle back to the Week 1 debates and examine in detail how and why performance management is changing.",
        },
        {
          id: "learning-objectives",
          kind: "objectives",
          title: "Learning Objectives",
          body: "After completing this week's tasks, you should be able to:",
          items: [
            "Review the breadth of learning in the content and relate it to the final assessment.",
            "Explore cases of performance management systems that have become more informal and agile.",
            "Explore the role of performance management in a crisis.",
          ],
        },
      ]),
      createLearningSubModule("6.1 Bringing It All Back Home", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Recap your learning about the changing nature of performance management systems. This provides the foundation for comparing the performance management case studies in subsequent activities.",
        },
        {
          id: "recap",
          kind: "summary",
          title: "A Recap of Performance Management",
          items: [
            "Qiu et al. (2015) found that evaluatively focused appraisals reduced an employee's sense of ownership of results and made them less proactive, while developmentally focused reviews stimulated proactive behaviour. It is easy to conclude evaluative = bad and developmental = good — but there are very valid reasons for evaluating performance, so not doing it also has drawbacks.",
            "Cappelli & Tavis (2016) gave a historical blow-by-blow of how performance management developed, noting that appraisals and PM systems are becoming more developmentally focused, with the impetus on regular communication between managers and employees rather than something that happens once a year.",
            "Tweedie et al. (2019) offered a detailed analytical review of performance management as a tool that elevates the power of management and diminishes that of employees — a fundamental design issue that makes it rife for workplace problems.",
            "Across these three, the complexity and contradictions should be fresh: for someone in HR or managing staff, performance management — formal or informal — has real advantages, such as tracking an individual's contribution and forming intrinsic and extrinsic reward pathways. But it can also have the unintended consequence of reducing motivation, particularly when the process is perceived as unfair.",
          ],
        },
        {
          id: "mosley",
          kind: "summary",
          title: "Step 1: Mosley (2020), 6 Ways To Reinvent Your Company's Performance Management",
          body: "Forbes. A practitioner piece grounded in industry data (the author is CEO of a continuous performance management provider, so read with that lens). Starting problem: annual raises and lump-sum bonuses barely work — a Workhuman study found any performance or engagement boost lasts only 3-4 weeks. Employee appetite for change is high: PwC found 60% of employees (72% of millennials) want feedback daily or weekly; Adobe found 80% want immediate, in-the-moment feedback.",
          items: [
            "1. Build a foundation of trust through authenticity and positivity — trust is the precondition for everything else. Most people fear feedback because it feels like judgment; reframing it around growth rather than retribution makes people more receptive. Leaders should model vulnerability, shifting the dynamic from hierarchy to partnership.",
            "2. Encourage employees to participate actively in their own success — give them tools to engage in real-time conversations about their own work and priorities, so they have ownership over growth rather than passively receiving a verdict. Set goals collaboratively, tied to strategic objectives, building meaning and connection.",
            "3. Embrace the 3 C's — Continuous, Crowdsourced, Culturally aligned. Feedback shouldn't be locked into an annual review: it should flow continuously, draw on input from multiple people rather than just the manager, and be tied to organisational values, not only individual output.",
            "4. Approach as a coach — develop people over time rather than directing and evaluating. Be a 'learn-it-all, not a know-it-all': approach with humility and curiosity, since coworkers closer to the actual work often see things the manager can't.",
            "5. Make weekly check-ins a top priority — employees with weekly check-ins are twice as likely to trust their manager, five times less likely to be disengaged, and twice as likely to believe they can grow in the organisation. Gallup links regular feedback to 14.9% lower turnover risk.",
            "6. Shift from high-stakes/low-frequency to low-stakes/high-frequency conversations — annual reviews carry heavy stakes (pay, promotion, job security), creating anxiety and often meaning employees learn about a problem months too late to fix it. Frequent, casual conversations lower the stakes of any single interaction, making feedback feel normal rather than threatening.",
            "Relevance: a practitioner echo of Cappelli & Tavis's shift toward continuous feedback, with more recent data and a sharper focus on trust and psychological safety as the mechanism — complementary to SDT and to Corduneanu et al.'s informational-versus-controlling distinction.",
          ],
        },
        {
          id: "my-notes-mosley",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "How long does the lift in engagement or performance last after a raise or bonus? Only 3-4 weeks.",
            "What are the features of continuous performance management? Ongoing, frequent, casual conversations — sometimes planned, other times occurring more organically within the flow of work.",
            "Define psychological safety — when an employee feels safe to speak their mind without fear of judgement from others.",
            "What happens when employees set their own goals against company objectives? Employees feel empowered to have some control over their professional destiny. They are invited to understand how their individual contribution impacts overall company objectives, which drives meaning and purpose.",
          ],
        },
        {
          id: "my-notes-inhibitors",
          kind: "journal",
          title: "My Notes: What Inhibits a Coach-Like Mentality?",
          items: [
            "Understanding how to be a coach instead of a manager.",
            "Self-belief in taking a coaching role.",
            "Their own job demands may inhibit the time and flexibility required to move to high-frequency touchpoints.",
          ],
        },
      ]),
      createLearningSubModule("6.2 Cases for Changing Performance Management", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Explore two cases of organisations changing their performance management systems to be more agile and responsive. Use the cases to help calibrate your attention before the final assignment.",
        },
        {
          id: "deloitte",
          kind: "summary",
          title: "Step 1: Orlando & Bank, A New Approach to Performance Management at Deloitte",
          body: "People + Strategy. The trigger: partner Rob Massey described the old system bluntly — 1.8 million hours across the firm that no longer fitted business needs, spent once a year looking back and slapping a label on people's work.",
          items: [
            "The pilot: 2,000 employees in Deloitte's tax business (later scaled to the full 70,000-person organisation) trialled a redesigned system for 18 months, built on three components.",
            "Check-ins — frequent, informal conversations between team leaders and members about the actual work. Not a rigid script: conversations go wherever is most needed — current performance, project challenges, or growth opportunities.",
            "Performance snapshots — a reliable, frequent individual assessment, minimum four times a year and often ten or more per person, via a four-question snapshot completed by the supervisor.",
            "Pulse surveys — quick tools for team leaders to assess whether they are creating the conditions for high performance.",
            "The philosophy shift was 'analog, not just digital': the biggest leap wasn't technology but making performance management fundamentally about conversations. Rather than reviewing what happened, conversations ask what you really liked and what kind of work inspires you — echoing the strengths-based, developmental logic from van Woerkom & Kroon and Qiu et al.",
            "Handling tough conversations: Massey describes an employee who hadn't absorbed prior verbal feedback. Shown a scatter plot of his supervisors' data across the year, seeing his position visually finally landed. Massey deliberately framed it as asking him to pay attention, not to leave — and he left the conversation energised rather than crushed, and improved afterward. The aim is to give people enough transparency and time to self-correct, not just a final verdict.",
            "Transparency debate: a genuinely contested internal question — how much performance data should be shared? Weighed against the risk that seeing where you stand could demotivate (people have positively skewed self-views), research suggesting moderate positive stress from seeing relative position can help if handled carefully, and employee expectation plus 'sunshine laws' requiring access to one's own records.",
            "Change management: nearly 200 internal change champions — senior managers, directors and partners rather than outside consultants — drove adoption through personal, often one-to-one communication, matching the relational philosophy of the system itself.",
            "Results: testimonials describe increased engagement and motivation, and Deloitte surfaced previously invisible organisational data, such as connections between feedback frequency and performance.",
            "Relevance: operationalises almost everything in the unit — developmental purpose, strengths-based framing, frequent low-stakes feedback — while showing the real organisational tensions (transparency, change management) in implementing these ideas at scale.",
          ],
        },
        {
          id: "my-notes-deloitte",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "Features of Deloitte's new system — check-ins, performance snapshots, pulse surveys, and transparency.",
            "Quantitative vs qualitative elements — quantitative: performance snapshots and pulse surveys. Qualitative: check-ins, talent reviews, coaching.",
            "How does transparency conflict with Tweedie et al.'s claims about PM as control? Deloitte's approach uses transparency of performance data (the scatter plot) to facilitate the employee's awareness of their own performance compared to others. When the employee became aware, he made the decision himself to act — that is developmental. I would not say Deloitte's approach is democratic, as it was not co-designed by the staff.",
            "Would you like to work for Deloitte? I like Deloitte's approach, mainly based on the developmental coaching nature of employee development. I would thrive in the trust-based nature of my relationship with my manager, and feel like my growth and development would be in their best interest and the organisation's. It would also motivate me to take self-directed action, which would be more purpose driven and mean more to me.",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "The first real case of an organisation updating its PM system to be more responsive and active in motivating staff. There are positive features here, not least its inherent potential for motivation. At the same time, elements of the approach likely come across as somewhat controlling, particularly through the lens of Tweedie et al. (2019).",
        },
      ]),
      createLearningSubModule("6.3 Getting Rid of Rankings", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Build on the previous activity and examine the case of General Electric — how and why it changed its performance management system.",
        },
        {
          id: "ge",
          kind: "summary",
          title: "Step 1: Why GE Had to Kill Its Annual Performance Reviews (Quartz, 2015)",
          body: "GE — the company most identified with rigid stack ranking — dismantled its own legacy system, joining Microsoft, Accenture and Adobe in abandoning formal annual reviews.",
          items: [
            "The historical background: Jack Welch's 'vitality curve' or 'rank and yank' — employees ranked against peers, boiled down to a single number, with the bottom 10% fired annually. Paired with Six Sigma and a culture of brutal candour, confrontation and command-and-control leadership. Welch never conceded the practice was flawed, defending it as late as 2013 by comparing it to grading schoolchildren.",
            "GE's own head of HR, Susan Peters, offered a more measured verdict: it had become more a ritual than something moving the company forward.",
            "Why change now: a cultural and generational shift (the world isn't on an annual cycle anymore, and millennial workers expect frequent, mobile-enabled feedback); a business shift toward high-tech focus with a FastWorks agile methodology replacing Six Sigma; and a leadership philosophy shift from command and control to 'connection and inspiration'.",
            "The new system, PD@GE: employees set near-term priorities; managers hold frequent informal touchpoints, logged as text, photos of notes, or voice recordings. An Insights feature lets employees request or give feedback from anyone, not just their direct manager. Feedback is deliberately restricted to two categories — continue doing, or consider changing — explicitly designed to soften negative feedback into coaching language, because humans don't really like giving negative feedback. Numerical ratings were dropped entirely for some experimental groups (notably HR itself). An annual summary conversation still occurs but is low-stakes, not tied directly to pay and promotion.",
            "Supporting evidence: Bob Sutton (Stanford) found peer-reviewed research consistently showed bigger pay gaps between top and bottom performers correlated with worse organisational performance — undercutting the theoretical basis for stack ranking.",
            "The unresolved tension — the most interesting part: despite the rhetoric, GE hasn't fully let go of ranking. Peters explicitly states they will maintain a culture of meritocracy and differentiation, and doesn't yet know what the answer is. The article raises the shadow-ranking problem: companies claim to drop formal ratings but informally recreate the same judgments in the background. The pay question is the sticking point — ratings exist largely as a justification mechanism for pay decisions.",
            "Relevance: an excellent primary case to pair with Deloitte, showing the same industry-wide shift playing out at the company most associated with the old model. More importantly, it gives a concrete, honest example supporting Tweedie et al.'s critique: even GE's HR chief can't fully escape meritocracy and differentiation — suggesting the underlying evaluative, comparative logic doesn't disappear just because the format changes.",
          ],
          links: [
            {
              href: "https://qz.com/428813/ge-performance-review-strategy-shift",
              label: "Why GE had to kill its annual performance reviews (Quartz, 2015)",
            },
          ],
        },
        {
          id: "my-notes-ge",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "Features of GE's new system — mobile-first, enabling employees to set near-term priorities and have frequent touchpoints with their manager, which can be informal and logged via a mobile app.",
            "What was harsh about the former system? Named 'rank and yank', GE's historical PM system was rigid: employees were ranked against their peers and given a single numeric rating.",
          ],
        },
        {
          id: "rock",
          kind: "summary",
          title: "Step 3: Rock, Davis & Jones (2014), Kill Your Performance Ratings",
          body: "strategy+business. Core argument: neuroscience shows numerical rating and ranking systems are neurologically counterproductive — they trigger threat responses that impair the exact learning and reflection PM is supposed to enable.",
          items: [
            "Problem 1 — ratings trigger fight or flight. Any numerical label, even a good one, activates a threat response similar to facing physical danger. An employee rated 2 out of 3 (meant as high praise) still disengages, because knowing others scored higher is enough to trigger a brain hijack. They then ignore feedback and resist stretch goals — the opposite of the intended effect.",
            "Problem 2 — ratings reinforce a fixed mindset (Dweck). Fixed mindset holds that talent is static; growth mindset holds that ability develops through effort. PM systems reinforce fixed thinking by looking backward and assigning a static label, discouraging risk-taking, effort and even honesty — fixed-mindset-primed people were 300% more likely to cheat on a test in one study.",
            "The SCARF model — five factors that ratings damage simultaneously. Status: any number but the top signals lower status. Certainty: the process is opaque, and hard work doesn't guarantee a good outcome since it's relative to peers. Autonomy: ratings look backward, implying fixed capacity, and often depend on factors employees can't control. Relatedness: forced ranking pits colleagues against each other — Microsoft's system was blamed for internal sabotage over external competition. Fairness: CEB found two-thirds of top-rated performers weren't actually seen by peers as top contributors, and 75% of employees think PM systems are unfair, up from 25% in 2008. These factors compound — unfairness plus lack of autonomy together produce a stronger reaction than either alone.",
            "A structural irony: forced ranking on a fixed curve means that even after years of attrition removing weak performers, someone still has to be ranked bottom 10% every year — so eventually a genuinely excellent employee is pushed out simply because the system requires a bottom tier to exist.",
            "Who actually benefits neurologically? Not the high performer — the senior executive overseeing the ranking system, who gains status, certainty and autonomy rewards from administering it. This is why leadership often resists change even when the evidence is overwhelming.",
            "What's replacing it: Juniper Networks dropped ratings and forced ranking entirely in 2011 for structured conversations, keeping one simple binary for culture fit — deliberately separating 'should you stay' from 'how can you grow' so growth conversations aren't clouded by rating anxiety; 88% rated conversations helpful and 87% reported willingness to give discretionary effort. Cargill piloted a no-rating system for three years against a rated control group, with 90% reporting a positive experience each year, then rolled it out company-wide. Gap rebranded PM as 'Grow, Perform, Succeed'. Microsoft fully retired ratings, distributions and annual reviews in 2013.",
            "Design principles for replacements: prime a growth mindset in language ('you worked hard on this' rather than 'you must be talented'); use structured or guided conversation formats; note that goal-setting alone without ratings was shown by CEB to increase performance by 36%; and separate fit/stay decisions from growth conversations.",
            "The sidebar finding: everyone — regardless of mindset type — found negative feedback demoralising, even those motivated to learn. Neuro-imaging showed fixed-mindset individuals had more brain activity linked to negative-sensation response and less linked to long-term learning after feedback, meaning feedback delivered carelessly can actively impair learning.",
            "Relevance: a mechanistic, neuroscience-based explanation for why rating-based PM fails. SDT's autonomy and relatedness needs map directly onto SCARF; the fixed-versus-growth distinction reinforces the evaluative-versus-developmental tension from Qiu et al.; and the Juniper and Cargill data give concrete post-reform outcomes to set against GE's more hesitant transition.",
          ],
          links: [
            {
              href: "https://www.strategy-business.com/article/00275",
              label: "Kill your performance ratings (strategy+business)",
            },
          ],
        },
        {
          id: "further-reading",
          kind: "resource",
          title: "Supporting Module Content",
          items: [
            "Kill your performance ratings — neuroscience shows why numbers-based HR management is obsolete.",
            "The Case Against Performance Reviews.",
            "Revisiting the Norm of Normality of Individual Performance.",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "A second case of a company de-formalising its performance management system to make a more inspiring workplace. In the discussion board you critiqued the strengths and weaknesses of this approach through the Job Demands and Resources lens.",
        },
      ]),
      createLearningSubModule("6.4 Crisis Performance Management", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "Review a method proposed by Herman Aguinis, one of the leading scholars in the performance management field: the performance promoter score, as a performance appraisal tool when a business operational disruption renders traditional appraisals inaccurate or ineffective.",
        },
        {
          id: "aguinis",
          kind: "summary",
          title: "Step 1: Aguinis & Burgi-Tian (2021), Measuring Performance During Crises and Beyond",
          body: "Business Horizons. The problem: COVID-19 disrupted both major ways of measuring performance. Results-based measurement broke because many pre-crisis goals became unreachable or irrelevant overnight. Behaviour-based measurement broke because it requires first-hand manager observation, which collapsed once 62%+ of the workforce went remote. Some organisations responded by abandoning performance management altogether — the authors argue this is the wrong response, because PM still serves critical functions: communicating strategic direction, collecting business data, giving feedback, protecting against legal risk, and retaining top talent.",
          items: [
            "The solution: the Performance Promoter Score, adapted from marketing's Net Promoter Score, which is strongly evidence-linked to firm growth and profitability across industries.",
            "Three questions, asked about an individual, team or unit: how likely is it that you would recommend working with this person or team to a friend or colleague (0-10); why did you provide that rating (open-ended); and what would it take to raise the score by one point (open-ended, forward-looking).",
            "Scores classify into promoters (9-10), passively satisfied (7-8) and detractors (6 or below). A Net Performance Promoter Score is the percentage of promoters minus the percentage of detractors, ranging from -100% to +100%, enabling comparison across people and units.",
            "Why it solves the crisis-era problem: it's flexible (doesn't depend on fixed KPIs, so it works when duties and goals are in flux), fast (under 15 seconds for the score, about five minutes total, and runnable on free tools), standardised (the same question for everyone enables cross-functional comparison), and comprehensive (captures both task performance and contextual performance — the discretionary, above-and-beyond behaviour especially relevant during crises).",
            "Practical guidance: use multiple sources rather than one manager — peers, subordinates and cross-functional contacts — which is especially valuable for remote workforces. Use it for frequent, low-effort check-ins rather than an annual event. Frequent conversations also help remote workers maintain a sense of connection and belonging.",
            "Anticipated risks and mitigations: begging (pressuring raters for high scores) — mitigate with a clear policy against pre-contacting raters. Nudging (offering incentives) — mitigate via strict rater anonymity. Exchanging (colleagues agreeing to rate each other highly) — mitigate by scrutinising the quality and specificity of open-ended answers. Sample skewing (cherry-picking friendly raters) — mitigate by using multiple methods to build the rater list.",
            "Relevance: a recent, pragmatic counterpoint to the 'kill your ratings entirely' camp. Rather than eliminating measurement, PPS simplifies and de-bureaucratises it while retaining a quantifiable signal — useful if the argument is that some organisations still need comparability for legal, developmental or resourcing purposes. It also operationalises Cecchi-Dimeglio's push for frequent, multi-source, structured feedback as a bias-reduction mechanism.",
          ],
        },
        {
          id: "my-notes-aguinis",
          kind: "journal",
          title: "My Notes: Journal Questions",
          items: [
            "What is wrong with running traditional appraisals during crises? The COVID-19 pandemic meant previously set goals and actions could not be met due to the restrictions the crisis put on working traditionally, along with people no longer being in direct contact due to remote-only working.",
            "What advantages of traditional appraisals do the authors point to? They argue against abandoning traditional performance management because it communicates strategic direction, enables meaningful feedback, protects the organisation legally, and identifies and retains top talent.",
            "The three PPS questions — how likely is it that you would recommend working with this person or team to a friend or colleague (0-10); why did you provide the rating that you provided; and what would it take to raise the score just by one point.",
            "What issues need planning for? Begging, nudging, exchanging, and sample skewing.",
          ],
        },
        {
          id: "feedback",
          kind: "note",
          title: "Feedback",
          body: "This is the third new kind of performance management system reviewed this week. In analysing it, you have reviewed and applied theories and concepts explored across the unit. At this point you are well placed to do the final, finishing touches on your third assignment.",
        },
      ]),
      createLearningSubModule("6.5 Performance Management: What's Next?", [
        {
          id: "purpose",
          kind: "purpose",
          title: "Purpose",
          body: "A brief final activity: a debate in which you and your peers explore what the future of performance management may involve.",
        },
        {
          id: "context",
          kind: "note",
          title: "Before You Begin",
          body: "We have covered a lot of ground, and seen that the performance management of employees has changed a great deal over the last hundred years. In the last decade there has been a trend toward softer, more adaptive, regular and developmentally focused appraisals. At the same time we have more data and digitalisation than ever before, and — as Aguinis and Burgi-Tian (2021) show — there remains pressure to provide reductionist performance markers for employees.",
        },
        {
          id: "debate",
          kind: "discussion",
          title: "Step 1: The Debate",
          body: "So, what is next for performance management? Take a position on one of two scenarios:",
          items: [
            "A. Performance management will get more formalised in the future, to the point where everything is measured.",
            "B. Performance management will become more informal in the future, to the point where it doesn't exist.",
          ],
        },
      ]),
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
        "This unit explores psychological theories, research, and applications related to wellbeing, flourishing, resilience, and human functioning. It considers how wellbeing is defined, measured, influenced, and supported across individual, relational, organisational, and applied contexts.",
      learningOutcomes: [],
      unitContent: [],
      unitPresentation: [],
      assessmentOverview: [],
    },
  },
  {
    id: "managing-and-rewarding-performance",
    name: "Managing and Rewarding Performance",
    code: "HRM6005",
    status: "Active",
    result: "",
    weeklyTopics: managingRewardingPerformanceWeeklyTopics,
    assessments: [
      {
        id: "assessment-1-presentation",
        title: "Assessment 1: Presentation",
        grade: "",
        notes: "Team based performance review. Worth 30%.",
      },
      {
        id: "assessment-2-exercise",
        title: "Assessment 2: Exercise",
        grade: "",
        notes: "Individual role play. Worth 30%.",
      },
      {
        id: "assessment-3-report",
        title: "Assessment 3: Report",
        grade: "",
        notes: "Final report. Worth 40%.",
      },
    ],
    keyResources: [
      "Unit outline to add",
      "Weekly lecture notes to add",
      "Assessment briefs to add",
    ],
    overview: {
      description:
        "Motivating and rewarding employees provides benefits not only for the employee, but also the organization. These are important aspects of performance management, a process that is required to obtain the best from employees, providing a stimulating and interesting work environment, and achieving organizational goals. In this unit, students explore the processes involved in managing employee performance within an organization from both an individual and team perspective.",
      learningOutcomes: [
        "Analyse the strategic link between performance management and reward processes and organisational outcomes.",
        "Critique the different issues related to managing employee performance.",
        "Analyse a performance management and reward system for an organisation.",
        "Communicate knowledge of performance management and reward processes in the workplace.",
        "Collaborate effectively in team settings to develop practical, theory-driven, and ethically responsible solutions to managing employee performance.",
      ],
      unitContent: [
        "Motivation and Performance Management",
        "Impact of Diversity on Performance Management",
        "Rewarding Performance",
        "Managing Individual and Team Performance",
        "Job Design and its Impact on Performance Management",
        "The Future of Performance Management",
      ],
      unitPresentation: [],
      assessmentOverview: [
        "Assessment 1: Presentation — Team based performance review (30%)",
        "Assessment 2: Exercise — Individual role play (30%)",
        "Assessment 3: Report — Final report (40%)",
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
