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

const managingRewardingPerformanceWeeklyTopics: WeeklyTopic[] = [
  {
    id: slugify("Week 1: Performance Management Systems"),
    week: 1,
    title: "Performance Management Systems",
    summary: "",
    keyConcepts: [],
    assessmentLinks: [],
    subModules: [
      createSubModule("1.1 Get to Know Your Assessment / Project Group"),
      createSubModule("1.2 Performance Management Systems"),
      createSubModule("1.3 Performance Management — A Multilevel Interpretation"),
      createSubModule("1.4 Performance Management — A Process"),
      createSubModule("1.5 Goal Setting"),
      createSubModule("1.6 Performance Management — Formality"),
      createSubModule("1.7 Performance Management — A Critique (Part 1)"),
      createSubModule("1.8 Performance Management — A Critique (Part 2)"),
    ],
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
