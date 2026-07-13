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
  start?: number;
};

export type NlpOverviewCallout = {
  quote: string;
  source: string;
};

export type NlpContentImage = {
  alt: string;
  caption?: string;
  height: number;
  src: string;
  width: number;
};

export type NlpContentTable = {
  columns: string[];
  rows: string[][];
  title: string;
};

export type NlpTopicReferenceTabId =
  | "overview"
  | "core-concepts"
  | "models-diagrams"
  | "patterns-techniques"
  | "examples"
  | "resources";

export type NlpModelImage = {
  alt: string;
  imageKey: "eye-accessing-cues";
};

type NlpTopicReferenceContent = {
  tabs?: NlpTopicReferenceTabId[];
  overview?: string;
  overviewCallout?: NlpOverviewCallout;
  overviewImages?: NlpContentImage[];
  overviewItems?: string[];
  coreConceptIntro?: string[];
  coreConcepts?: string[];
  coreConceptSections?: NlpContentSection[];
  coreConceptSteps?: NlpContentStep[];
  models?: string[];
  modelImage?: NlpModelImage;
  modelSections?: NlpContentSection[];
  modelDiagram?: NlpModelDiagramNode[];
  modelTables?: NlpContentTable[];
  patterns?: string[];
  patternSections?: NlpContentSection[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const TIME_LINES_TOPIC_TITLES = [
  "The Time-Lines Model",
  'Eliciting the Encoding of "Time"',
  "Pattern: Timeline Awareness",
  "Pattern: Changing Your Timeline",
  "Pattern: Change Personal History",
  "Pattern: Releasing Negative Emotions",
  "Pattern: Decision Destroyer",
  "Pattern: Reimprinting",
  "Pattern: Finishing Unfinished Business",
  "Hypnotic Language Patterns",
] as const;

const TIME_LINES_MODEL_OVERVIEW =
  "Time-lines describe how people internally organise past, present, and future. In NLP, time is treated as a human construction rather than an external object: people encode memories, present awareness, and imagined futures through internal representations, often arranged as a line or other spatial configuration. The location, size, colour, organisation, distance, and shape of that coding influence how events feel and how available they seem. In coaching, a time-line is therefore not reality itself; it is a blueprint of how the person currently represents time, causality, identity, expectation, and change.";

const TIME_LINES_MODEL_OVERVIEW_ITEMS = [
  "People encode past, present, and future through sensory and spatial distinctions. Many people organise these distinctions linearly, while others use shapes, metaphors, or multiple configurations for different life contexts.",
  "Time-lines shape memory and expectation because the past supplies remembered references and the future supplies hopes, plans, fears, and imagined outcomes. Those encodings can influence state, behaviour, self-concept, and what feels possible now.",
  "Advanced time awareness means being able to step back and notice the time map as a representation. Being caught inside time experience means living as if the remembered past or imagined future is present reality.",
  "Time-line awareness matters because it lets a practitioner listen for temporal words and metaphors, elicit the structure behind them, and help the client gain more choice in how memories, expectations, states, and future actions are represented.",
];

const TIME_LINES_MODEL_IMAGES: NlpContentImage[] = [
  {
    alt: "Summary diagram contrasting in-time and through-time orientation around a person",
    caption: "Time-line summary: common spatial coding for in-time and through-time experience.",
    height: 309,
    src: "/images/nlp/timeline-summary.png",
    width: 455,
  },
  {
    alt: "Diagram explaining in-time orientation and through-time orientation with body and arrow examples",
    caption: "In-time and through-time orientation examples.",
    height: 370,
    src: "/images/nlp/in-through-time.png",
    width: 615,
  },
];

const ELICITING_TIME_OVERVIEW =
  'Sometimes the problem we struggle with does not concern anything in today\'s reality, but something that occurred in "the past." Thus, the problem exists about how we keep our thoughts and feelings from the past in our current awareness.';

const ELICITING_TIME_CORE_CONCEPTS = [
  "Location is one of the most important coding variables in time-line work. People often store time sequentially and linearly, and location gives the mind an analogue way to represent sequence, relationship, and order.",
  "A practitioner should listen and look for how the person represents past, present, and future through size, distance, direction, position, and overall configuration. The person may describe events as behind, ahead, above, below, near, far, around them, or arranged as a line, shape, picture, calendar, filing cabinet, or other metaphor.",
  "A useful distinction in time-line work is the difference between in-time and through-time orientation. In-time experience is associated with being absorbed in the moment and losing awareness of time. Through-time experience is associated with knowing what time it is, sequencing activities, valuing punctuality, and ordering events effectively.",
  "Time coding affects present emotion, meaning, behaviour, and state because it supports cause-effect thinking, order, structure, cultural time concepts, and the felt reality of memories or future possibilities. Changing the coding can change how a person relates to an event or outcome.",
];

const ELICITING_TIME_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: 'Eliciting the Encoding of "Time"',
    steps: [
      {
        text: "Identify a low-emotion, regular referent activity.",
        prompts: [
          "Choose something simple and repeated, such as driving to work, brushing teeth, dressing, or combing hair.",
          "Invite the person to remember doing it five years ago, two years ago, last week, and this morning; then imagine doing it next week, two years from now, and five years from now.",
        ],
      },
      {
        text: "Notice how the person has encoded awareness of time.",
        prompts: [
          "Ask how they are aware of the activity across past, present, and future.",
          "Explore what they see, hear, or sense that lets them distinguish one time zone from another.",
        ],
        promptBullets: [
          "Look for colour or black-and-white, movie or still picture, 3D or flat, associated or dissociated viewpoint, framed or panoramic, brightness, distance, focus, and location in the field of vision.",
        ],
      },
      {
        text: "Step back and identify the overall configuration.",
        prompts: [
          "Ask whether the structure looks like a line, boomerang, spiral, calendar, filing cabinet, or another metaphor.",
          "Check whether there is more than one time-line or time configuration, and whether different lines apply to business, personal, recreational, spiritual, or other life areas.",
        ],
      },
      {
        text: "Elicit the spatial sorting of the time zones.",
        prompts: [
          "Ask how the person distinguishes past, present, and future.",
          "Identify where in space they sort memories of the past, their sense of the present, and imaginations of the future.",
        ],
      },
    ],
  },
];

const ELICITING_TIME_MODEL_TABLES: NlpContentTable[] = [
  {
    title: "Orientation to Time",
    columns: ["Past", "Present", "Future"],
    rows: [
      ["Memories", "Sensory awareness", "Possibilities/plans"],
      ["Solid/real", "Flexible", "Anticipation"],
      ["Fixed, rigid, stuck", "Some fixedness", "Primarily movement"],
      ["Limited", "Choice", "Opportunities/expansive"],
      ["Predestination", "Responsibility", "Visions/dreams"],
      ["Consequential", "Impulsivity thinking", "Anticipatory thinking"],
      ["Already", "Now", "Then, one of these days"],
      ["Sense of reality", "Sense of today; the now", "Sense of hope/desire"],
    ],
  },
  {
    title: "Time Styles",
    columns: ["Out of time", "In time", "A-temporal"],
    rows: [
      ["Dissociated", "Associated", "Timelessness"],
      ["Out of the body", "In/through the body", "Above the body"],
      ["Sequential", "Random, simultaneous, synthetic", "Meta-position"],
      ["Values and likes time", "Dis-values and dislikes time", "Neutral to time"],
      ["On time; punctual", "Frequently late, non-prompt", ""],
      ["Aware of time", "Lost in the now, the moment, the memory", ""],
    ],
  },
];

const TIMELINE_AWARENESS_OVERVIEW =
  "Timeline awareness helps a person notice how they internally organise past, present, and future. The pattern invites them to step back from the content of events and observe the structure of time itself, so they can see what feels close, distant, heavy, light, clear, distorted, fixed, or available to change.";

const TIMELINE_AWARENESS_CORE_CONCEPTS = [
  "A person can learn to become aware of how time is represented internally rather than only reacting from inside remembered or imagined events.",
  "Time may be experienced spatially, visually, kinaesthetically, symbolically, or through a personal metaphor such as a line, field, calendar, path, spiral, or set of locations.",
  "When a person changes their awareness of time, they may also change state, meaning, choice, emotional intensity, and their sense of what can happen next.",
  "Kinaesthetic timeline work uses the body and physical space to make time organisation experiential. This is especially useful when a person does not easily work with internal pictures or when a previous event still feels present in the body.",
  "The practitioner keeps attention on context, process, and structure rather than getting pulled into the story. The client does the internal work and determines the changes that fit.",
];

const TIMELINE_AWARENESS_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "Time-Line Awareness Pattern",
    steps: [
      {
        text: "Identify the time-line or time-lines.",
        prompts: [
          "After eliciting how the person represents past, present, and future, invite them to imagine floating above the time-line and looking down on it.",
        ],
      },
      {
        text: "Float back along the time-line.",
        prompts: [
          "Guide the person to move back in time while noticing the younger versions of themselves and the way past events are represented.",
        ],
      },
      {
        text: "Move forward through time.",
        prompts: [
          "Invite the person to observe both the represented events and the way those remembered or imagined events are coded.",
        ],
      },
      {
        text: "Identify time problems worth addressing.",
        prompts: [
          "Ask what events seem to carry too much importance, too little impact, or unusual coding such as dark areas, pits, twists, turns, gaps, or distortions.",
        ],
      },
      {
        text: "Explore preferred changes to the time-line.",
        prompts: [
          "Ask what the person may want to alter about the time-line, such as shape, configuration, tilt, colour, distance, or other structural qualities.",
        ],
      },
      {
        text: "Re-edit the representations.",
        prompts: [
          "Help the person notice the editorial frames and submodalities, then adjust qualities such as distance, size, brightness, colour, and position so the situation is represented in a more useful way.",
        ],
      },
    ],
  },
  {
    heading: "Kinaesthetic Time-Line Pattern",
    steps: [
      {
        text: "Lay the time-line on the floor.",
        prompts: [
          "Ask the person to stand, sense the direction of their past and future, point to each, then physically mark and walk the line through recent and more distant time.",
        ],
      },
      {
        text: "Identify the configuration of the time-line.",
        prompts: [
          "Have the person walk through present, past, and future, then step aside into a meta-position to notice the line's shape, size, direction, and felt quality.",
        ],
      },
      {
        text: "Identify a behaviour to change.",
        prompts: [
          "Invite the person to notice the kinaesthetic feelings linked to the unwanted behaviour, carefully amplify enough to recognise them, and anchor the problematic state.",
        ],
      },
      {
        text: "Step back to earlier occurrences of the same sensation.",
        prompts: [
          "Use the anchor to guide the person backward in small steps, noticing when the same feeling arises, identifying the age or time, and continuing toward the first occurrence.",
        ],
      },
      {
        text: "Move to meta-position after the earliest experience.",
        prompts: [
          "Once the earliest point is reached, invite the person to step off the time-line and ask what resources they need so they no longer have to re-experience life in the old way.",
          "If needed, help them construct or access references for the missing resources until the resources feel sufficient.",
        ],
      },
      {
        text: "Anchor and stack resources.",
        prompts: [
          "Anchor the resources as they arise from meta-position, reframe limiting meanings that appear, and build a stronger resource state for moving forward.",
        ],
      },
      {
        text: "View the younger self from several positions.",
        prompts: [
          "Return to the first occurrence with the new resources, gather additional perspectives, then quickly walk forward through the time-line while firing the resource anchors.",
        ],
      },
      {
        text: "Move up to the present and integrate.",
        prompts: [
          "Pause in the present so the learnings can integrate, then invite the person to look back and notice how the past now appears different.",
        ],
      },
      {
        text: "Face the future with new hope.",
        prompts: [
          "Turn toward the future and notice how it has changed, what feels brighter or more hopeful, and how the altered time-line can support movement forward.",
        ],
      },
      {
        text: "Take another meta-position.",
        prompts: [
          "Step aside from the time-line again, or to the end of it, and review present and future from an out-of-time perspective. Repeat from one or two additional perspectives if useful.",
        ],
      },
      {
        text: "Reorient to the present.",
        prompts: [
          "Bring the person fully back to the present with simple process instructions and a grounded final step.",
        ],
      },
    ],
  },
];

const CHANGING_TIMELINE_OVERVIEW =
  "Changing a time orientation means experimenting with how past, present, and future are arranged in awareness. A person's orientation to time can influence planning, presence, emotional distance, memory, and future pacing, so changing the coding can create new ways to relate to experiences and choices.";

const CHANGING_TIMELINE_CORE_CONCEPTS = [
  "A through-time orientation usually places time in front of the person or across their field of awareness, making sequence, planning, punctuality, and overview easier to access.",
  "An in-time orientation usually places time through or around the body, with the future and past often arranged front-to-back. This can support immersion, spontaneity, and being absorbed in the moment.",
  "Changing a through-time orientation invites the person to try on a more in-time arrangement, with the past behind and the future in front.",
  "Changing an in-time orientation invites the person to try on a more through-time arrangement, with past, present, and future placed in front of them as an observable sequence.",
  "The goal is not to prescribe one orientation as right. The purpose is to increase flexibility, choice, and usefulness so the person can access the time coding that best serves the context.",
];

const CHANGING_TIMELINE_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "Changing a Through-Time Orientation",
    steps: [
      {
        text: "Float above the time-line.",
        prompts: [
          "From above the line, straighten it so it runs left to right, then rotate either the line or the body ninety degrees.",
        ],
      },
      {
        text: "Drop down into the time-line.",
        prompts: [
          "Invite the person to experience the past behind them, the present directly in front of their face, and the future at arm's length or further ahead. Pause and ask how the new arrangement feels.",
        ],
      },
    ],
  },
  {
    heading: "Changing an In-Time Orientation",
    steps: [
      {
        text: "Float above time.",
        prompts: [
          "From above the time-line, straighten it and rotate either the line or the body ninety degrees.",
        ],
      },
      {
        text: "Drop behind the time-line.",
        prompts: [
          "Arrange time so it lies directly in front of the person: past images about an arm's length to one side, future images on the other side, and the present about a foot in front at eye level.",
          "Invite the person to notice what changes when they temporarily experience a through-time style of coding, and ask how it feels.",
        ],
      },
    ],
  },
];

const CHANGE_PERSONAL_HISTORY_OVERVIEW =
  "Change Personal History helps a person update remembered experiences that still influence present emotion, meaning, or behaviour. The pattern works with the way a memory is represented now, then brings needed resources into earlier experiences so the person can relate to the past with more choice and less old-state reactivity.";

const CHANGE_PERSONAL_HISTORY_CORE_CONCEPTS = [
  "Past memories can continue to shape present responses when they remain linked to strong states, limiting meanings, or old decisions.",
  "The work focuses on the current internal representation of remembered experience rather than trying to change historical facts.",
  "Resources such as confidence, self-worth, assertiveness, compassion, boundaries, or safety can be accessed in the present and brought into earlier memories.",
  "Changing the meaning and state connected to a remembered experience can change its present impact, so the memory becomes a reference for learning rather than a trigger for feeling bad or defining self negatively.",
  "The practitioner keeps the process structured: identify the state, trace related memories, build sufficient resources, apply them through the memory chain, test, and future pace.",
];

const CHANGE_PERSONAL_HISTORY_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "Change Personal History Pattern",
    steps: [
      {
        text: "Access the problematic memory.",
        prompts: [
          "Ask whether the person has a past memory that feels problematic, unwanted, or still carries strong unpleasant feelings.",
          "Invite them to access the memory lightly and signal when the feeling begins, then establish an anchor for that state.",
        ],
      },
      {
        text: "Search back through time for earlier related events.",
        prompts: [
          "Fire the anchor and ask the person to let the next earlier time they felt something like this come to mind.",
          "Have them signal when another instance appears and identify the age or time of that experience.",
        ],
      },
      {
        text: "Continue searching backwards through time.",
        prompts: [
          "Repeat the backward search to find several isomorphic experiences of the same negative state, calibrating carefully as the person identifies each one.",
        ],
      },
      {
        text: "Break state and elicit needed resources.",
        prompts: [
          "Bring the person back to the present moment.",
          "Ask what resources would have allowed them to be more effective, empowered, supported, or safe in those earlier situations.",
          "Elicit and anchor each resource state strongly enough to use in the change process.",
        ],
      },
      {
        text: "Collapse the resource anchor into the old experiences.",
        prompts: [
          "Return to the oldest remembered experience, fire the resource anchor, then introduce the old-state anchor and release it while maintaining the resource.",
          "Ask what the memory is like now with the resource present, and move through each related memory with the resource anchor.",
        ],
      },
      {
        text: "Break state and test.",
        prompts: [
          "After updating the memory sequence, break state and invite the person to think about the old problematic feeling.",
          "Ask what happens now and how the memories have changed.",
        ],
      },
      {
        text: "Future pace the resources.",
        prompts: [
          "Invite the person to imagine moving into future contexts while carrying the resources with them.",
          "Check whether the new response would enhance their life and feel useful going forward.",
        ],
      },
    ],
  },
];

const RELEASING_NEGATIVE_EMOTIONS_OVERVIEW =
  "Releasing Negative Emotions uses time-line work to change how old emotional learnings are held in present awareness. The pattern helps a person find the source or contributing factors of an emotion, preserve useful learning, create distance and perspective, and return to the present with more resourceful choice.";

const RELEASING_NEGATIVE_EMOTIONS_CORE_CONCEPTS = [
  "Emotions can remain connected to past events through the way those events are represented internally, especially when the person keeps re-entering the old state from the present.",
  "Time-line work can create distance, perspective, and access to new resources by helping the person float above the event, move before it, and view the future from a different vantage point.",
  "The aim is release, learning, and integration, not erasing personal history. Useful information, values, accountability, and lessons are preserved.",
  "Negative emotions are not treated as inherently bad. They may contain valid information, warnings, boundaries, or feedback that should be evaluated before release.",
  "Ecology and client safety matter. The practitioner checks whether the emotion is accurate, useful, complete, and ready to release before inviting the person to disconnect from old intensity.",
];

const RELEASING_NEGATIVE_EMOTIONS_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "Releasing Negative Emotions Pattern",
    steps: [
      {
        text: "Determine the kind and quality of the emotion.",
        prompts: [
          "Clarify whether the emotion is guilt, anger, fear, resentment, grief, self-pity, or another state.",
          "Ask what information the feeling may contain and whether it is valid, invalid, accurate, or inaccurate.",
        ],
      },
      {
        text: "Elicit and use the person's time-line.",
        prompts: [
          "Identify where the person places past events, future events, and today's happenings so the process can use their own time coding.",
        ],
      },
      {
        text: "Identify the cause or contributing factors.",
        prompts: [
          "Ask for the original source of the negative feeling and any other influences that contributed to it.",
          "Explore what the person has learned, or could learn, that will serve them in the future.",
          "Check whether they are ready to release the emotion and disconnect from the old intensity.",
        ],
      },
      {
        text: "Float back to the original event.",
        prompts: [
          "Guide the person to float above the time-line and go back to the original source or time when the feeling began.",
          "From that higher-level perspective, ask what they can learn from the experience and preserve those learnings in a resourceful way.",
        ],
      },
      {
        text: "Float back a little further in time.",
        prompts: [
          "Invite the person to float to a comfortable point before the event, then look forward toward the present from that earlier position.",
          "Ask whether the old emotion is present from this vantage point and whether it needs to be created this time.",
          "If responsibility, apology, amends, or changed action is relevant, include that ecology before inviting release.",
        ],
      },
      {
        text: "Zoom forward to the present.",
        prompts: [
          "With the future open and the useful learnings preserved, guide the person to move quickly forward through time to the present.",
          "Invite the feeling of release to move with them into the future while the past representation updates in a useful way.",
        ],
      },
      {
        text: "Future pace and test.",
        prompts: [
          "Have the person associate into a future context that would previously have triggered the old emotion.",
          "Check whether the dated emotional intensity is gone or reduced enough, and repeat the process if needed.",
        ],
      },
    ],
  },
];

const DECISION_DESTROYER_OVERVIEW =
  "Decision Destroyer works with old limiting decisions that still organise present meaning, emotion, behaviour, and choice. The pattern helps a person identify the decision, preserve any useful learning, return to the time before it was made, and install a more resourceful decision that can travel forward through the time-line.";

const DECISION_DESTROYER_CORE_CONCEPTS = [
  "Some present limitations are organised around past decisions that once made sense in a specific context but no longer serve the person.",
  "Old decisions can become unconscious frames or meta-states that continue to give instructions about what to expect, how to feel, and what actions are available.",
  "Time-line work helps the person access the decision point without treating the old decision as fixed, final, or identity-defining.",
  "The work preserves useful learning while updating the meaning, emotional charge, and future direction attached to the old decision.",
  "The aim is to loosen the grip of an outdated decision and create room for a more resourceful one that fits the person's present values and future ecology.",
  "Ecology and client safety matter. The practitioner checks the new decision, future pacing, and any consequences before treating the change as complete.",
];

const DECISION_DESTROYER_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "Decision Destroyer",
    steps: [
      {
        text: "Identify the limiting decision.",
        prompts: [
          "Ask what the person decided, when they adopted the decision, how long they have lived with it, and how it has become limiting.",
          "Elicit the words, meanings, emotional quality, and present effects of the decision clearly enough to work with the actual frame.",
        ],
      },
      {
        text: "Identify the enhancing decision.",
        prompts: [
          "Ask what decision would serve the person better now and in the future.",
          "Have them describe the empowering decision fully, associate into it, and anchor the decision state strongly.",
        ],
      },
      {
        text: "Preserve the learnings.",
        prompts: [
          "Guide the person to float above the time-line and return to when the limiting decision was made.",
          "Invite them to notice and keep any useful learnings from that experience before changing the old decision structure.",
        ],
      },
      {
        text: "Move to a time before the limiting decision.",
        prompts: [
          "From above the time-line, float further back to a comfortable point before the decision event.",
          "Associate into that prior time and look forward from before the old decision existed, noticing that the future is open.",
          "Re-access the enhancing decision fully from this position.",
        ],
      },
      {
        text: "Let the empowering decision transform the time-line.",
        prompts: [
          "Bring the enhancing decision into the younger self and move forward through time with that new resourceful decision active.",
          "Allow memories, meanings, and feelings to update as the person moves from the decision point toward the present.",
        ],
      },
      {
        text: "Integrate, future pace, and check ecology.",
        prompts: [
          "Return to the present, let the experience integrate, and invite the person to imagine future contexts with the new decision in place.",
          "Check whether the new decision is useful, safe, congruent, and enhancing across relevant life contexts.",
        ],
      },
    ],
  },
  {
    heading: "Meta-stating a New Decision in Time",
    steps: [
      {
        text: "Identify the person's time-line.",
        prompts: [
          "Use a simple activity across past and future times to discover where the person locates memories and imaginations.",
          "Notice whether their time coding appears as a line, circle, drawer, filing system, or another configuration, and gather sensory differences.",
        ],
      },
      {
        text: "Float above the time-line.",
        prompts: [
          "Have the person float above their sense of time, move back to a specific memory, then move forward through the present into the future.",
        ],
      },
      {
        text: "Identify the old map to update.",
        prompts: [
          "Choose a limiting decision, limiting belief, or hurtful experience that still creates an unhelpful map.",
          "Keep the target specific enough to work with one decision or belief structure at a time.",
        ],
      },
      {
        text: "Access, anchor, and amplify resources.",
        prompts: [
          "Ask what states, ideas, understandings, or decisions would have transformed the old experience.",
          "Elicit and anchor those resources strongly before returning to the event.",
        ],
      },
      {
        text: "Move before the event and bring resources through it.",
        prompts: [
          "Float above the time-line and back to a comfortable point before the old experience.",
          "Prepare the person to re-enter the time-line with the resources active, then float down before the event and carry those resources through the experience to the present.",
        ],
      },
      {
        text: "Future pace and check ecology.",
        prompts: [
          "Invite the person to imagine future situations with the new decision and resources available.",
          "Check whether the updated decision supports effectiveness, empowerment, and safety.",
        ],
      },
    ],
  },
];

const REIMPRINTING_OVERVIEW =
  "Reimprinting works with formative experiences that shaped meaning, identity, state, or behaviour. The pattern helps a person revisit an imprint from a more resourced perspective, update the beliefs and learnings that formed around it, and integrate new resources without denying or erasing personal history.";

const REIMPRINTING_CORE_CONCEPTS = [
  "Imprint experiences can be single events or repeated experiences that organise later responses, beliefs, identity patterns, and emotional reactions.",
  "A person may carry beliefs from significant others, intense childhood experiences, or later interpretations that became attached to the original imprint.",
  "Returning to the imprint can be useful because it reaches the experience before years of later confirmation made the belief feel like reality.",
  "The person can revisit the imprint from a more resourced, dissociated, and multiple-perspective position rather than being overwhelmed inside the old state.",
  "Resources can be given to the younger self and to other participants in the memory, not to excuse harm, but to update the internal map with choices, boundaries, understanding, and new meanings.",
  "The aim is integration, not denial or erasure of history. The experience remains part of the person's story, but it no longer has to organise identity or behaviour in the same limiting way.",
  "The practitioner maintains ecology, pacing, and safety by anchoring resources, interrupting overwhelm, using dissociation when needed, and checking the updated future response.",
];

const REIMPRINTING_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "Reimprinting Pattern",
    steps: [
      {
        text: "Identify the problem.",
        prompts: [
          "Ask what belief, behaviour, emotion, or response the person wants to change.",
          "Elicit the associated feelings and explore what has stood in the way of changing it so far.",
        ],
      },
      {
        text: "Locate the imprint experience.",
        prompts: [
          "Anchor the associated feeling and use a historical search or time-line process to find the earlier experience connected to the imprint.",
        ],
      },
      {
        text: "Travel back with the emotion.",
        prompts: [
          "Guide the person back with the feeling while maintaining the anchor and looking for the earliest or most relevant experience.",
          "When they arrive, have them notice the people involved and verbalise the beliefs, meanings, and generalisations formed from the experience.",
        ],
      },
      {
        text: "Break state and review the experience.",
        prompts: [
          "Bring the person back to the present and have them step off the time-line.",
          "Invite them to review the imprint like a movie from outside it, identifying the younger self, the situation, other participants, and any beliefs formed during or after the event.",
        ],
      },
      {
        text: "Find positive intentions in the feeling or belief.",
        prompts: [
          "Explore what each part, feeling, belief, or participant was trying to accomplish, protect, avoid, or express.",
          "Keep the inquiry focused on intention and function rather than excusing harmful behaviour.",
        ],
      },
      {
        text: "Identify and anchor needed resources.",
        prompts: [
          "Ask what resources, choices, insights, abilities, or understandings the younger self needed but did not have.",
          "Ask what resources the other significant participants would have needed to respond differently.",
          "Elicit and anchor each needed resource strongly enough to use in the update process.",
        ],
      },
      {
        text: "Apply the resources.",
        prompts: [
          "From outside the time-line, review the imprint from the perspectives of the important participants.",
          "Give each character the resources they would have needed to create a better outcome, then notice what changes in behaviour, meaning, and belief.",
        ],
      },
      {
        text: "Associate and relive the imprint with resources.",
        prompts: [
          "Have the person step into the time-line as each relevant character while holding the resource anchor.",
          "Let the experience update from the inside with the new resources available, and modify the beliefs associated with the imprint.",
        ],
      },
      {
        text: "Receive resources as the younger self.",
        prompts: [
          "Ask the person to step into the time-line as the younger self and receive the needed qualities, choices, and resources from each significant character.",
        ],
      },
      {
        text: "Review, integrate, and future pace.",
        prompts: [
          "Step off the time-line and review the changed experience until the person is satisfied with the outcome.",
          "Then step back onto the time-line and move quickly into the future, using the resources to notice how they can think, feel, and live differently.",
        ],
      },
    ],
  },
];

const FINISHING_UNFINISHED_BUSINESS_OVERVIEW =
  "Finishing Unfinished Business helps a person complete unresolved inner material that still keeps attention, emotion, or meaning tied to the past. It is useful when old experiences, unexpressed communication, incomplete emotional processing, or unfinished developmental tasks continue to affect present choices, relationships, and self-concept.";

const FINISHING_UNFINISHED_BUSINESS_CORE_CONCEPTS = [
  "Unfinished business can keep a person organised around the past, especially when an experience still feels unresolved, unaccepted, unspoken, or incomplete inside.",
  "The pattern helps the person complete what was left incomplete internally. Completion may involve expression, perspective, resource, release, forgiveness, acceptance, updated meaning, or a stronger relationship with reality.",
  "The work supports integration and present-time freedom rather than denial or erasure of history. The facts do not have to be approved, minimised, or made acceptable; they can be recognised as facts while the person stops carrying them as unfinished internal work.",
  "Developmental themes may be involved, including trust, autonomy, initiative, competence, identity, intimacy, contribution, and life integration. The practitioner listens for which kind of completion the person is ready to update.",
  "Ecology, pacing, and client safety matter. The practitioner helps the person access adult resources, stay oriented to present choice, and complete only what can be completed in a useful and respectful way.",
];

const FINISHING_UNFINISHED_BUSINESS_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "Finishing Unfinished Business Pattern",
    steps: [
      {
        text: "Adopt a commitment to reality.",
        prompts: [
          "Invite the person to take an adult, observant position toward past events: what happened can be recognised clearly without approving it, excusing it, or continuing to organise life around it.",
          "Help them distinguish accepting reality from endorsing what happened. The goal is a grounded relationship to facts, not resignation.",
        ],
      },
      {
        text: "Access and anchor adult acceptance.",
        prompts: [
          "Ask the person to remember a simple situation where they accepted something they did not particularly like, then notice the images, feelings, values, and beliefs that made acceptance possible.",
          "Anchor the state once it is available and stable enough to use.",
        ],
      },
      {
        text: "Access and anchor friendship with reality.",
        prompts: [
          "Guide the person to a state of facing what actually exists with maturity, steadiness, and willingness, instead of wishing, regretting, or fighting with the fact that it occurred.",
          "Notice the inner representations and supporting beliefs, then anchor this reality-friendly orientation.",
        ],
      },
      {
        text: "Access and anchor a finishing state.",
        prompts: [
          "Have the person recall a time when they completed a task, project, relationship, or chapter and could release it while keeping the useful learning.",
          "Anchor the felt sense of positive completion, closure, and forward movement.",
        ],
      },
      {
        text: "Identify the unfinished developmental task.",
        prompts: [
          "From a position above the time-line, invite the person to notice what unfinished business remains and which life task it seems connected to, such as trust, autonomy, identity, intimacy, contribution, or integration.",
          "Keep the exploration specific and paced; the person only needs to identify the completion that matters now.",
        ],
      },
      {
        text: "Move into a future where the task is finished.",
        prompts: [
          "Guide the person forward along the time-line to a point where the task has been completed in a healthy and ecological way.",
          "Fire the finishing and reality-friendly anchors, then invite them to experience what they see, hear, feel, believe, value, and do from that completed future.",
        ],
      },
      {
        text: "Integrate the completion into present life.",
        prompts: [
          "Bring the person back to the present with the completed feeling and meaning available.",
          "Ask them to look forward and notice the day-by-day steps, choices, and behaviours that naturally lead into that more complete future.",
        ],
      },
    ],
  },
];

const HYPNOTIC_LANGUAGE_OVERVIEW =
  "Hypnotic Language Patterns, often taught through the Milton Model, show how language can guide attention, invite internal experience, and open space for new meanings. In NLP communication, these patterns support pacing, suggestion, state change, internal representation, and resource access by engaging the listener's own imagination and meaning-making processes.";

const HYPNOTIC_LANGUAGE_CORE_CONCEPTS = [
  "Language can direct attention. A phrase can invite someone to notice a feeling, imagine a possibility, remember a resource, or organise experience in a new way.",
  "Hypnotic language often uses ambiguity, suggestion, pacing, permissive phrasing, metaphor, and presupposition to create room for the listener's own meanings rather than forcing a narrow interpretation.",
  "The Milton Model uses many of the same linguistic distinctions as the Meta-Model, but in the opposite direction. Instead of challenging vague language for precision, the practitioner may use artful vagueness to invite useful inner processing.",
  "Effective use begins with pacing the person's current experience, then gently leading attention toward resourceful states, choices, learnings, or future possibilities.",
  "These patterns should be used ethically and transparently, with respect for autonomy, consent, ecology, and the person's outcomes. The aim is to support resourcefulness, not manipulate.",
];

const HYPNOTIC_LANGUAGE_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "Artful Vagueness Patterns",
    body: [
      "These patterns give the listener enough structure to begin an inner search while leaving space for their own unconscious associations, memories, and resources.",
    ],
    steps: [
      {
        text: "Use comparative deletions to invite improvement without over-specifying the standard.",
        prompts: [
          'Example: "You may find yourself becoming more comfortable in the way that works for you."',
        ],
      },
      {
        text: "Use unspecified references so the person can supply their own relevant meaning.",
        prompts: [
          'Example: "A part of you can begin learning something useful now."',
        ],
      },
      {
        text: "Use nominalisations to point toward inner processes as if they are available objects.",
        prompts: [
          'Example: "That sense of confidence can continue to develop."',
        ],
      },
      {
        text: "Use universal quantifiers and lost performatives carefully to soften or amplify expectation.",
        prompts: [
          'Example: "Many people discover that change can happen naturally."',
        ],
      },
    ],
  },
  {
    heading: "Suggestion and Meaning Patterns",
    body: [
      "These patterns shape the frame around an experience by implying relationships, possibilities, or meanings that the listener can explore internally.",
    ],
    steps: [
      {
        text: "Use cause-effect language to link a present experience with a useful direction.",
        prompts: [
          'Example: "As you notice your breathing, you can begin to settle into the learning."',
        ],
      },
      {
        text: "Use complex equivalence to connect behaviour, attention, or response with a resourceful meaning.",
        prompts: [
          'Example: "That curiosity can be a sign that your mind is already exploring new options."',
        ],
      },
      {
        text: "Use presuppositions to assume useful movement without arguing for it.",
        prompts: [
          'Example: "When you notice the first small shift, you can let it teach you something."',
        ],
      },
      {
        text: "Use tag questions and conversational postulates as gentle invitations.",
        prompts: [
          'Example: "You can take a moment to notice what changes, can you not?"',
          'Example: "Can you allow that resource to become a little clearer?"',
        ],
      },
    ],
  },
  {
    heading: "Attention and Trance Process",
    body: [
      "Hypnotic communication works best when it follows the person's actual experience, uses what happens in the moment, and leads gradually toward the desired resource or learning.",
    ],
    steps: [
      {
        text: "Pace current experience before leading.",
        prompts: [
          "Name verifiable features of the present context, such as sitting, breathing, listening, or noticing, then connect that pacing to the state or learning you want to invite.",
        ],
      },
      {
        text: "Use double binds to make several responses useful.",
        prompts: [
          "Frame options so either path supports the intended direction, such as relaxing quickly or gradually, noticing a shift now or discovering it in a moment.",
        ],
      },
      {
        text: "Utilise what happens.",
        prompts: [
          "Incorporate sounds, movements, pauses, questions, or interruptions as part of the process rather than treating them as distractions.",
        ],
      },
      {
        text: "Use voice and marking intentionally.",
        prompts: [
          "Tone, pause, emphasis, and rhythm can mark embedded suggestions or distinguish statements, questions, and invitations.",
        ],
      },
      {
        text: "Build short resource chains.",
        prompts: [
          "Identify three to five useful states, then link them in sequence so one naturally leads to the next, such as calm to curiosity to learning to practical action.",
        ],
      },
    ],
  },
];

const HYPNOTIC_LANGUAGE_MODEL_TABLES: NlpContentTable[] = [
  {
    title: "Milton Model Language Families",
    columns: ["Family", "Purpose", "Common patterns"],
    rows: [
      [
        "Structure",
        "Organise attention through stories, assumptions, and levels of meaning.",
        "Metaphor, presupposition, multi-ordinal language, identification.",
      ],
      [
        "Distortion",
        "Invite new meaning by shaping relationships, causality, identity, and interpretation.",
        "Mind-reading, cause-effect, complex equivalence, nominalisation, lost performative, personalising.",
      ],
      [
        "Generalisation",
        "Open or narrow expectation by using broad frames and category-level language.",
        "Universal quantifiers, modal operators, either-or frames, evaluative language, over-defined or under-defined terms.",
      ],
      [
        "Deletion",
        "Leave space for the listener to fill in relevant internal content.",
        "Simple deletions, comparative deletions, superlative deletions, unspecified referents, unspecified processes.",
      ],
    ],
  },
  {
    title: "Application Flow",
    columns: ["Move", "What the practitioner is doing", "What it supports"],
    rows: [
      [
        "Pace",
        "Match the person's current sensory experience, language, state, or context.",
        "Rapport, safety, and attention.",
      ],
      [
        "Invite",
        "Use permissive language, ambiguity, metaphor, or suggestion.",
        "Internal search and resource access.",
      ],
      [
        "Lead",
        "Connect present awareness to a useful state, meaning, behaviour, or future possibility.",
        "Choice, integration, and action.",
      ],
      [
        "Check ecology",
        "Respect consent, autonomy, and outcomes while testing whether the response is useful.",
        "Ethical change work and client safety.",
      ],
    ],
  },
];

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

const FOUNDATIONS_OF_LISTENING_CORE_CONCEPTS: NlpContentSection[] = [
  {
    heading: "Sensory awareness",
    body: [
      "To notice and detect the person's state of mind. We call this calibrating to the person's experience and mental-emotional state.",
    ],
  },
  {
    heading: "Representational system understanding",
    body: [
      "To detect, recognise, and record the sensory representational and meta-representational systems that a person uses to make sense of things.",
    ],
  },
  {
    heading: "Eye accessing cue awareness and acuity",
    body: [
      "To be able to see in and experience how a person is processing information and the states that are being accessed.",
    ],
  },
  {
    heading: "Linguistic awareness",
    body: [
      "To detect the kind of language patterns a person is using.",
    ],
  },
];

const EYE_ACCESSING_CUES_CORE_CONCEPT_STEPS: NlpContentStep[] = [
  {
    text: "To be able to see in and experience how a person is processing information and the states that are being accessed.",
  },
  {
    text: "By tracking someone's eye movement, we can also track their internal movies.",
  },
  {
    text: "Eye chatter can include constructed and remembered information, along with feeling / emotion and self-talk.",
  },
];

const EYE_ACCESSING_CUES_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "Questions that cause eye chatter",
    body: [
      "Use these prompts to invite specific kinds of internal processing and observe the person's eye accessing patterns.",
    ],
  },
  {
    heading: "Vr: Visual Remembered",
    body: ["Recalling an image or picture."],
    start: 1,
    steps: [
      {
        text: "What was your favourite colour as a child? Go ahead and see it now.",
      },
      {
        text: "What colour was your bedroom in your childhood home of 12?",
      },
      {
        text: "What did you wear yesterday?",
      },
    ],
  },
  {
    heading: "Vc: Visual Constructed",
    body: ["Making up pictures you have never seen."],
    start: 4,
    steps: [
      {
        text: "What is it like when you imagine your car as green with yellow dots on it?",
      },
      {
        text: "What if you had bright flaming red hair? What would you look like?",
      },
      {
        text: "What if a traffic light had the green light at the top and the red light at the bottom?",
      },
    ],
  },
  {
    heading: "Ar: Auditory Remembered",
    body: ["Remembering sounds or voices previously heard."],
    start: 7,
    steps: [
      {
        text: "What does your favourite song sound like?",
      },
      {
        text: "Are you able to listen again, in your head, to the very last statement I made?",
      },
      {
        text: "What is the sound of ocean waves lapping on the shore?",
      },
    ],
  },
  {
    heading: "Ac: Auditory Constructed",
    body: ["Creating and inventing new sounds."],
    start: 10,
    steps: [
      {
        text: "What would I sound like if I sounded like Mickey Mouse?",
      },
      {
        text: "What would I sound like if I spoke 4 times slower or faster?",
      },
    ],
  },
  {
    heading: "K: Kinaesthetic",
    body: ["Feelings, sensations, emotions."],
    start: 12,
    steps: [
      {
        text: "What does it feel like to rub your hand over a cat or dog?",
      },
      {
        text: "What is the feel of the warm sun shining on your skin like?",
      },
      {
        text: "Have you ever dived into a cold stream or an icy sea?",
      },
    ],
  },
  {
    heading: "Ad: Auditory Digital",
    body: ["Internal talk, dialogue, self-conversation."],
    start: 15,
    steps: [
      {
        text: "What did you say to yourself the last time you made a major decision?",
      },
      {
        text: "Can you recite the words of your favourite song or poem to yourself... now?",
      },
      {
        text: "What do you say to yourself about what you really want out of life?",
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
  "Foundations of Listening": {
    coreConceptIntro: [
      "Listening is attending to a person and paying attention to the key elements in the person's communicating.",
      "Listening actively and effectively involves:",
    ],
    coreConcepts: [],
    coreConceptSections: FOUNDATIONS_OF_LISTENING_CORE_CONCEPTS,
  },
  "Sensory Acuity Skills": {
    overviewCallout: {
      quote: "The meaning of your communication is the response you get.",
      source: "NLP Presupposition #3",
    },
  },
  "Eye Accessing Cues": {
    tabs: [
      "overview",
      "models-diagrams",
      "core-concepts",
      "patterns-techniques",
    ],
    overview:
      "We generally all move our eyes in a recognisable and patterned way. This patterning gives some indication about what a person is processing on the inside, as he or she is thinking. If we face a person and watch the way his or her eyes move, then the following diagram gives us a way to make sense of what's happening for most people. This is, however, only a map, and can be different for differently wired people.",
    coreConceptIntro: [
      "The power of listening for eye chatter is that it enables us to listen for what is not being said. Maybe someone is sharing something that seems emotional for them, yet they do not access the lower right of feelings. We can hear that, and maybe even ask about it. Purposely watching for eye movement is also a great way to stay present to the other.",
    ],
    coreConcepts: [],
    coreConceptSteps: EYE_ACCESSING_CUES_CORE_CONCEPT_STEPS,
    models: [
      "Eye accessing cues map likely eye movements to visual remembered, visual constructed, auditory remembered, auditory constructed, kinaesthetic, and auditory digital processing.",
      "Use the diagram as a calibration aid. It is a map for most people, not an absolute rule for every nervous system.",
    ],
    modelImage: {
      alt: "Eye accessing cues diagram showing visual remembered, visual constructed, auditory remembered, auditory constructed, kinaesthetic, and auditory digital eye movement positions",
      imageKey: "eye-accessing-cues",
    },
    patternSections: EYE_ACCESSING_CUES_PATTERN_SECTIONS,
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

const ANCHORING_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "1. Identify the desired state and its mind-body component",
    steps: [
      {
        text: "What state do you want? Describe it a little bit.",
      },
      {
        text: "As you're talking about that state, are you beginning to enter into that state?",
      },
      {
        text: "When would you like this new empowering state (in what context(s))?",
      },
    ],
  },
  {
    heading: "2. Evoke it fully",
    steps: [
      {
        text: "Think of a time when you fully experienced this state…",
      },
      {
        text: "Think of a time when you clearly had it in a powerful way. What thoughts really evoke this state?",
      },
      {
        text: "What else do you need to do?",
      },
      {
        text: "How much do you now have the feeling of this state? Be with that feeling… let it grow… now let it double…",
      },
      {
        text: "What would increase the experience of this state even more?",
      },
      {
        text: "What would it be like if you did fully experience this state?",
        prompts: ["Use this if you're having any difficulty eliciting the state."],
      },
      {
        text: "How do you know to call or label this state X?…",
      },
    ],
  },
  {
    heading: "3. Anchor the state when it is highly amplified",
    body: [
      "Set a physical touch on arm, forearm, or shoulder as the person reaches the peak of their state for 1-2 seconds with equal pressure each time, in exactly the same location (only at an 8 or above on a 0 to 10 scale).",
      "Additionally, use visual anchoring through a gesture, auditory anchoring through a particular tone or intonation.",
    ],
  },
  {
    heading: "4. Practice stepping in and out — break state and repeatedly re-access",
    body: [
      "“In just a moment I want you to step out of that powerful state, but before you do, take a snapshot of it in all sensory systems (what you see, hear, feel, etc.). Now let's practice stepping in and out of that state so that you can quickly fly into that state at any time you choose.”",
    ],
  },
  {
    heading: "5. Apply the resourceful state to a time or place in everyday life",
    steps: [
      {
        text: "Where could you really use this state in your everyday life? What was the context again?",
      },
      {
        text: "Think of that context specifically, and feel this (fire the anchor) about that…",
      },
      {
        text: "Suppose you had this feeling or way of thinking as your attitude, fully and completely, in just the way that you would want it… Would you like that? → Yes",
      },
      {
        text: "Would that attitude transform things as you think about that context again? → Yes",
      },
      {
        text: "How does it transform things?… just notice inside… and enjoy. → Yes",
      },
    ],
  },
];

const COLLAPSING_ANCHORS_PATTERN_SECTIONS: NlpContentSection[] = [
  {
    heading: "Working with State Energies",
    body: [
      "As we work with states, we either build up neurological energies or we disperse those energies.",
      "Building up energies is amplifying states, eliciting sub-modalities that juice them up, bringing in resources, meta-stating, etc.",
      "Dispersing energies means tearing a neuro-linguistic (mind-body) program apart, de-framing it, meta-modelling it.",
    ],
  },
  {
    heading: "1. Access a limiting state",
    steps: [
      {
        text: "What state do you want to take the emotional charge out of?",
      },
      {
        text: "Check how fully the state is present.",
        prompts: [
          "Ask: How much are you accessing that state right now? Are you fully there right now? How do you know?",
        ],
      },
      {
        text: "Set the anchor.",
        prompts: [
          "As I set this as an anchor for that state, nod when you re-access that state even more. How is that?",
        ],
      },
      {
        text: "How much are you experiencing that limiting state? 0/10?",
      },
    ],
  },
  {
    heading: "2. Access a contradictory state",
    steps: [
      {
        text: "What would be a powerful and resourceful state for you given that limiting state?",
        prompts: ["Menu: relaxation for tension, playful for serious, etc."],
      },
      {
        text: "Elicit the resourceful state fully.",
        prompts: [
          "When are/were you most fully and completely in this state? What is that like? How much are you experiencing it now? 0/10?",
        ],
      },
      {
        text: "Set the anchor and test it.",
        prompts: [
          "Now that I've set an anchor for that state, how well does it fire it off when I do this [fire the anchor]?",
        ],
      },
    ],
  },
  {
    heading: "3. Fire both anchors simultaneously",
    steps: [
      {
        text: "Ask: now, are you ready to collapse the limiting state?",
      },
      {
        text: "Fire both anchors and hold them.",
        prompts: [
          "Coach says: there's no need to do anything, just experience. Just let it happen. So, notice what happens when I do this [fire both anchors simultaneously and hold them]. What is that like?",
        ],
      },
      {
        text: "Is there any confusion or disorientation as you try to process both experiences at the same time?",
      },
    ],
  },
  {
    heading: "4. Maintain the powerful state",
    steps: [
      {
        text: "Let go of the limiting state anchor whilst holding on to the powerful state anchor.",
      },
      {
        text: "How is that?",
      },
      {
        text: "As you recall that limiting state, how much do you have it back?",
      },
    ],
  },
];

const referenceContentByTopicId: Record<string, NlpTopicReferenceContent> =
  {
    "states-anchoring": {
      patterns: [],
      patternSections: ANCHORING_PATTERN_SECTIONS,
    },
    "states-collapsing-anchors": {
      patterns: [],
      patternSections: COLLAPSING_ANCHORS_PATTERN_SECTIONS,
    },
    "time-lines-the-time-lines-model": {
      tabs: ["overview"],
      overview: TIME_LINES_MODEL_OVERVIEW,
      overviewImages: TIME_LINES_MODEL_IMAGES,
      overviewItems: TIME_LINES_MODEL_OVERVIEW_ITEMS,
    },
    "time-lines-eliciting-the-encoding-of-time": {
      tabs: [
        "overview",
        "core-concepts",
        "patterns-techniques",
        "models-diagrams",
      ],
      overview: ELICITING_TIME_OVERVIEW,
      coreConcepts: ELICITING_TIME_CORE_CONCEPTS,
      modelTables: ELICITING_TIME_MODEL_TABLES,
      patterns: [],
      patternSections: ELICITING_TIME_PATTERN_SECTIONS,
    },
    "time-lines-pattern-timeline-awareness": {
      tabs: ["overview", "core-concepts", "patterns-techniques"],
      overview: TIMELINE_AWARENESS_OVERVIEW,
      coreConcepts: TIMELINE_AWARENESS_CORE_CONCEPTS,
      patterns: [],
      patternSections: TIMELINE_AWARENESS_PATTERN_SECTIONS,
    },
    "time-lines-pattern-changing-your-timeline": {
      tabs: ["overview", "core-concepts", "patterns-techniques"],
      overview: CHANGING_TIMELINE_OVERVIEW,
      coreConcepts: CHANGING_TIMELINE_CORE_CONCEPTS,
      patterns: [],
      patternSections: CHANGING_TIMELINE_PATTERN_SECTIONS,
    },
    "time-lines-pattern-change-personal-history": {
      tabs: ["overview", "core-concepts", "patterns-techniques"],
      overview: CHANGE_PERSONAL_HISTORY_OVERVIEW,
      coreConcepts: CHANGE_PERSONAL_HISTORY_CORE_CONCEPTS,
      patterns: [],
      patternSections: CHANGE_PERSONAL_HISTORY_PATTERN_SECTIONS,
    },
    "time-lines-pattern-releasing-negative-emotions": {
      tabs: ["overview", "core-concepts", "patterns-techniques"],
      overview: RELEASING_NEGATIVE_EMOTIONS_OVERVIEW,
      coreConcepts: RELEASING_NEGATIVE_EMOTIONS_CORE_CONCEPTS,
      patterns: [],
      patternSections: RELEASING_NEGATIVE_EMOTIONS_PATTERN_SECTIONS,
    },
    "time-lines-pattern-decision-destroyer": {
      tabs: ["overview", "core-concepts", "patterns-techniques"],
      overview: DECISION_DESTROYER_OVERVIEW,
      coreConcepts: DECISION_DESTROYER_CORE_CONCEPTS,
      patterns: [],
      patternSections: DECISION_DESTROYER_PATTERN_SECTIONS,
    },
    "time-lines-pattern-reimprinting": {
      tabs: ["overview", "core-concepts", "patterns-techniques"],
      overview: REIMPRINTING_OVERVIEW,
      coreConcepts: REIMPRINTING_CORE_CONCEPTS,
      patterns: [],
      patternSections: REIMPRINTING_PATTERN_SECTIONS,
    },
    "time-lines-pattern-finishing-unfinished-business": {
      tabs: ["overview", "core-concepts", "patterns-techniques"],
      overview: FINISHING_UNFINISHED_BUSINESS_OVERVIEW,
      coreConcepts: FINISHING_UNFINISHED_BUSINESS_CORE_CONCEPTS,
      patterns: [],
      patternSections: FINISHING_UNFINISHED_BUSINESS_PATTERN_SECTIONS,
    },
    "time-lines-hypnotic-language-patterns": {
      tabs: [
        "overview",
        "core-concepts",
        "patterns-techniques",
        "models-diagrams",
      ],
      overview: HYPNOTIC_LANGUAGE_OVERVIEW,
      coreConcepts: HYPNOTIC_LANGUAGE_CORE_CONCEPTS,
      modelTables: HYPNOTIC_LANGUAGE_MODEL_TABLES,
      patterns: [],
      patternSections: HYPNOTIC_LANGUAGE_PATTERN_SECTIONS,
    },
  };

export function getNlpTopicReferenceContent(topic: NlpTopic) {
  return (
    referenceContentByTopicId[topic.id] ??
    referenceContentByTitle[topic.title] ??
    {}
  );
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
    referenceContent.overviewCallout
      ? `${referenceContent.overviewCallout.quote} ${referenceContent.overviewCallout.source}`
      : "",
    referenceContent.overviewImages
      ?.map((image) => `${image.alt} ${image.caption ?? ""}`)
      .join(" ") ?? "",
    (referenceContent.coreConcepts ?? topic.coreConcepts).join(" "),
    referenceContent.coreConceptSteps?.map((step) => step.text).join(" ") ?? "",
    (referenceContent.models ?? topic.models).join(" "),
    referenceContent.modelImage?.alt ?? "",
    referenceContent.modelDiagram
      ?.map((node) => `${node.label} ${node.detail}`)
      .join(" ") ?? "",
    referenceContent.modelTables
      ?.map((table) =>
        [
          table.title,
          table.columns.join(" "),
          table.rows.map((row) => row.join(" ")).join(" "),
        ].join(" "),
      )
      .join(" ") ?? "",
    (referenceContent.patterns ?? topic.patterns).join(" "),
    referenceContent.coreConceptIntro?.join(" ") ?? "",
    contentSections,
    referenceContent.coreConceptSections
      ?.map((section) =>
        [section.heading, section.body?.join(" ") ?? ""].join(" "),
      )
      .join(" ") ?? "",
    topic.examples.join(" "),
    topic.personalNotes.join(" "),
    topic.resources.join(" "),
    topic.linkedCaptures.join(" "),
  ].join(" ");
}

function withListeningReferenceOverrides(group: NlpTopicGroup) {
  if (group.id !== "listening") {
    return group;
  }

  const benchmarksTopic = group.topics.find(
    (topic) => topic.title === "Benchmarks for Listening",
  );

  const foundationsTopic: NlpTopic = {
    ...(benchmarksTopic ?? group.topics[0]),
    id: "listening-foundations-of-listening",
    title: "Foundations of Listening",
    overview:
      "Attending to a person and paying attention to the key elements in their communication. It sharpens presence, calibration, and sensory accuracy so interventions are based on what is actually occurring.",
    coreConcepts: [],
    patterns: [
      "Track state, representation, eye accessing cues, and language patterns before choosing the next practitioner move.",
      "Listen first for structure before content: sensory channel, state shift, presupposition, deletion, generalisation, or distortion.",
      "Applied reflection: map one real example, identify the structure, and write the next clean practitioner move.",
    ],
    examples: [
      "A practitioner notices a client's words, breathing shift, eye movement, and language pattern before asking the next question.",
      "A small change in breathing or tempo can reveal more than the headline content of the sentence.",
      "Conversation cue: listen for the exact words, sensory predicates, attention shifts, state changes, and next useful question.",
    ],
  };

  const eyeAccessingCuesTopic: NlpTopic = {
    id: "listening-eye-accessing-cues",
    title: "Eye Accessing Cues",
    overview: referenceContentByTitle["Eye Accessing Cues"].overview ?? "",
    coreConcepts: [],
    models: referenceContentByTitle["Eye Accessing Cues"].models ?? [],
    patterns: [
      "Use sensory questions to invite remembered, constructed, kinaesthetic, and auditory digital processing, then calibrate the person's eye movements without over-certainty.",
    ],
    examples: [
      "A client talks about an emotional event but does not access kinaesthetic cues, prompting a gentle question about what they notice in the body.",
      "A practitioner asks a visual remembered question, observes the eye movement pattern, and uses it as calibration rather than diagnosis.",
    ],
    personalNotes: [],
    resources: ["Source: NLP Practitioner Manual eye accessing cues material."],
    linkedCaptures: [],
  };

  const remainingTopics = group.topics
    .filter(
      (topic) =>
        topic.title !== "Benchmarks for Listening" &&
        topic.title !== "Eye Accessing Cues",
    )
    .map((topic) =>
      topic.title === "Sensory Acuity"
        ? {
            ...topic,
            id: "listening-sensory-acuity-skills",
            title: "Sensory Acuity Skills",
          }
        : topic,
    );

  return {
    ...group,
    topics: [foundationsTopic, eyeAccessingCuesTopic, ...remainingTopics],
  };
}

function createTimeLinesTopic(title: (typeof TIME_LINES_TOPIC_TITLES)[number]) {
  return {
    id: `time-lines-${slugify(title)}`,
    title,
    overview: "",
    coreConcepts: [],
    models: [],
    patterns: [],
    examples: [],
    personalNotes: [],
    resources: [],
    linkedCaptures: [],
  } satisfies NlpTopic;
}

function withTimeLinesReferenceOverrides(group: NlpTopicGroup) {
  if (group.id !== "time-lines") {
    return group;
  }

  return {
    ...group,
    topics: TIME_LINES_TOPIC_TITLES.map(createTimeLinesTopic),
  };
}

export function withNlpReferenceOverrides(groups: NlpTopicGroup[]) {
  return groups.map((sourceGroup) => {
    const group = withTimeLinesReferenceOverrides(
      withListeningReferenceOverrides(sourceGroup),
    );

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
