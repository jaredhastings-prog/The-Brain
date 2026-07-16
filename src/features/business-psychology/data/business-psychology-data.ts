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

const humanInformationProcessingWeeklyTopics: WeeklyTopic[] = [
  {
    id: "week-1-foundations-of-human-thinking",
    week: 1,
    title: "Foundations of human thinking",
    summary:
      "Introduces cognition, cognitive perspectives, mental concepts, categorisation, and knowledge networks.",
    subModules: createPlaceholderSubModules([
      "Week 1 introduction",
      "1.1 The importance of cognition",
      "1.2 Different cognitive perspectives",
      "1.3 Basic building blocks of cognition: Mental concepts",
      "1.4 Categorising via prototypes and exemplars",
      "1.5 Knowledge networks: Part 1",
      "1.6 Knowledge networks: Part 2",
      "Week 1 summary",
    ]),
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
    summary: "",
    keyConcepts: [],
    assessmentLinks: [],
    subModules: [
      createSubModule("2.1 The Performance Appraisal"),
      createSubModule("2.2 Feedback Sources"),
      createSubModule("2.3 The Feedback Sandwich"),
      createSubModule("2.4 Rater and Method Bias"),
    ],
  },
  {
    id: slugify("Week 3: Employee Motivation"),
    week: 3,
    title: "Employee Motivation",
    summary: "",
    keyConcepts: [],
    assessmentLinks: [],
    subModules: [
      createSubModule("3.1 Extrinsic and Intrinsic Motivation"),
      createSubModule("3.2 Psychology and the Mind"),
      createSubModule("3.3 Content and Process Theories of Motivation"),
      createSubModule("3.4 Positive Psychology"),
      createSubModule("3.5 Conservation of Resources Theory"),
      createSubModule("3.6 Application of Positive Psychology to a Performance Management System"),
    ],
  },
  {
    id: slugify("Week 4: Rewarding Performance"),
    week: 4,
    title: "Rewarding Performance",
    summary: "",
    keyConcepts: [],
    assessmentLinks: [],
    subModules: [
      createSubModule("4.1 Performance-Related Pay"),
      createSubModule("4.2 PRP and Innovation"),
      createSubModule("4.3 PRP in the Public Sector"),
      createSubModule("4.4 Meaning at Work"),
    ],
  },
  {
    id: slugify("Week 5: Work Design"),
    week: 5,
    title: "Work Design",
    summary: "",
    keyConcepts: [],
    assessmentLinks: [],
    subModules: [
      createSubModule("5.1 Introduction to Work Design"),
      createSubModule("5.2 Job Demands and Resources"),
      createSubModule("5.3 Doing More with Less"),
      createSubModule("5.4 Measuring Job Demands and Resources"),
      createSubModule("5.5 Comparing Job Demands and Resources Across Different Contexts"),
      createSubModule("5.6 Underperformance"),
    ],
  },
  {
    id: slugify("Week 6: The Future of Performance Management"),
    week: 6,
    title: "The Future of Performance Management",
    summary: "",
    keyConcepts: [],
    assessmentLinks: [],
    subModules: [
      createSubModule("6.1 Bringing It All Back Home"),
      createSubModule("6.2 Cases for Changing Performance Management"),
      createSubModule("6.3 Getting Rid of Rankings"),
      createSubModule("6.4 Crisis Performance Management"),
      createSubModule("6.5 Performance Management: What's Next?"),
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
