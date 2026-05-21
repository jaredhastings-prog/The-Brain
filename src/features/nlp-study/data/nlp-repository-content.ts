export type NlpTopic = {
  id: string;
  title: string;
  overview: string;
  coreConcepts: string[];
  models: string[];
  patterns: string[];
  examples: string[];
  personalNotes: string[];
  resources: string[];
  linkedCaptures: string[];
};

export type NlpTopicGroup = {
  id: string;
  title: string;
  description: string;
  topics: NlpTopic[];
};

type TopicSeed = {
  title: string;
  focus: string;
  move: string;
  example: string;
};

type TopicGroupSeed = {
  id: string;
  title: string;
  description: string;
  principles: string[];
  modelFrame: string;
  practiceFrame: string;
  exampleFrame: string;
  topics: TopicSeed[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function topic(title: string, focus: string, move: string, example: string): TopicSeed {
  return { title, focus, move, example };
}

function createTopics(group: TopicGroupSeed): NlpTopic[] {
  return group.topics.map((entry) => ({
    id: `${group.id}-${slugify(entry.title)}`,
    title: entry.title,
    overview: `${entry.title} is a reference point for ${entry.focus}. In coaching, communication, and self-leadership, it helps Jared notice how internal maps, language, physiology, and meaning shape behaviour before choosing the next useful move.`,
    coreConcepts: [
      `${entry.title} focuses attention on ${entry.focus}.`,
      ...group.principles,
      "Treat the distinction as a working map rather than a fixed truth about a person.",
      "Look for observable cues in language, attention, physiology, state, and behaviour before forming an interpretation.",
    ],
    models: [
      `Diagram brief: ${group.modelFrame}`,
      `Visual model placeholder: show ${entry.title} as cue -> internal representation/filter -> state -> behaviour -> feedback.`,
      "Reference table placeholder: definition, signals, practitioner questions, related patterns, and linked repository entries.",
    ],
    patterns: [
      `Practitioner move: ${entry.move}`,
      group.practiceFrame,
      `Workbook reflection: apply ${entry.title} to a real conversation, coaching moment, decision, or self-management example and note what shifted.`,
    ],
    examples: [
      entry.example,
      group.exampleFrame,
      "Conversation cue: listen for the exact words, sensory predicates, attention shifts, state changes, and next useful question.",
    ],
    personalNotes: [
      `Add Jared's own coaching examples, client observations, metaphors, and personal integrations for ${entry.title} here.`,
      "Capture distinctions that prove useful in business, parenting, health, relationships, or personal operating system design.",
    ],
    resources: [
      "Source reference: NLP Practitioner Manual.",
      "Source reference: NLP Practitioner Workbook.",
      `Add concise summaries, diagrams, reading notes, and external references connected to ${entry.title}.`,
    ],
    linkedCaptures: [
      `Future: show Global Capture Inbox items tagged with ${entry.title}.`,
      "Future: connect relevant notes, reflections, voice captures, and applied examples from Jared Brain.",
    ],
  }));
}

const nlpRepositorySeeds: TopicGroupSeed[] = [
  {
    id: "nlp-foundations",
    title: "NLP Foundations",
    description: "Core frames for understanding NLP as a practical model of communication, meaning, state, and behaviour.",
    principles: [
      "NLP studies the relationship between neurology, language, internal representation, state, and behaviour.",
      "People respond to their internal maps of experience, not directly to reality itself.",
      "Useful change often begins by changing representation, meaning, physiology, attention, or feedback.",
    ],
    modelFrame: "place the event outside the person, then show sensory input moving through filters, representation, state, physiology, and response.",
    practiceFrame: "Ask what the person is representing, how they are representing it, what meaning they are giving it, and what response becomes available.",
    exampleFrame: "A leader who treats one slow reply as rejection can explore the map behind the reaction and create a calmer range of responses.",
    topics: [
      topic(
        "What is NLP?",
        "NLP as an applied study of how people structure subjective experience and communicate change",
        "Ask how a person is coding an experience through images, sounds, feelings, language, meanings, and actions.",
        "A client says they are stuck; the practitioner explores the internal picture, self-talk, body state, and response loop that makes stuckness feel real.",
      ),
      topic(
        "NLP as a Model",
        "NLP as a set of useful maps rather than an absolute theory",
        "Use NLP models pragmatically: test whether the map helps the person gain choice, clarity, or a more useful response.",
        "A communication model is useful when it helps Jared prepare a better question, not because it claims to explain every detail of the person.",
      ),
      topic(
        "Map and Territory",
        "the distinction between lived reality and the internal map used to navigate it",
        "Separate the facts of an event from the interpretation, label, memory, or prediction attached to it.",
        "Two people hear the same feedback; one maps it as attack, another maps it as information, and their states diverge.",
      ),
      topic(
        "NLP Communication Model",
        "how external events are filtered into internal representations, state, physiology, and behaviour",
        "Trace a response from trigger to filters, internal representation, meaning, state, body response, and outward behaviour.",
        "Before a sales call, an image of failure plus harsh self-talk creates tension; changing the representation opens a steadier state.",
      ),
      topic(
        "NLP Presuppositions",
        "useful operating assumptions that create flexibility, respect, and change orientation",
        "Choose the presupposition that makes the next intervention more humane, practical, and choice-rich.",
        "Assuming behaviour has a positive intent changes the tone from blame to curiosity and makes a new strategy easier to find.",
      ),
      topic(
        "Representational Systems",
        "visual, auditory, kinaesthetic, olfactory, and gustatory ways people code experience",
        "Listen for sensory predicates and ask representation-specific questions to clarify how the experience is structured.",
        "A person says the future looks foggy, another says it sounds wrong, and another says it feels heavy; each phrase points to a different doorway.",
      ),
    ],
  },
  {
    id: "meta-programs",
    title: "Meta Programs",
    description: "Attention, motivation, and sorting patterns that shape how people perceive, decide, and respond.",
    principles: [
      "Meta programs describe patterns in how attention is directed and information is sorted.",
      "They are contextual tendencies, not identity labels.",
      "Detect patterns through examples, contrast questions, and repeated language or behaviour cues.",
    ],
    modelFrame: "show context at the top, then attention filters, sorting style, motivation pattern, decision behaviour, and possible expansion moves.",
    practiceFrame: "Elicit examples from a specific context, compare contrasts, then offer one wider choice rather than trying to replace the person's style.",
    exampleFrame: "In hiring, one person sorts for possibility while another sorts for risk; both can be valuable when the context is clear.",
    topics: [
      topic("Meta-Programs Model", "the recurring filters people use to sort experience", "Ask contrast questions such as what draws attention first, what matters most, and how the person knows a choice is right.", "A founder may sort for big-picture possibility in strategy meetings and detailed risk when reviewing cash flow."),
      topic("Meta States as Meta Programs", "how higher-level states can become recurring filters", "Notice when a state about a state, such as confidence about uncertainty, becomes the way a person sorts new situations.", "A coach helps a client build curiosity about anxiety so the old anxious filter no longer runs the whole conversation."),
      topic("Meta-Program Template", "a repeatable way to capture context, cues, pattern, impact, and expansion options", "Record the context, sample language, behavioural evidence, and a practical expansion question.", "Jared logs that a client sorts by avoidance in finance decisions and tests a toward-value question."),
      topic("Meta Program Categories", "common sorting dimensions such as toward/away, options/procedures, internal/external, sameness/difference, and global/specific", "Use categories as lenses for listening rather than as boxes to put people in.", "A team conflict softens when one person sees their options style clashing with another person's procedure style."),
      topic("Detecting Meta Programs", "identifying patterns through language, examples, decisions, and body response", "Ask for three real examples before naming a pattern; check whether the pattern holds in that context.", "Someone repeatedly explains what they want to avoid, giving a possible away-from motivation cue."),
      topic("Expanding Meta Programs", "adding flexibility without shaming the current pattern", "Invite the complementary filter with a question, frame, or task that expands choice.", "A detail-focused manager explores the larger purpose before returning to the checklist."),
    ],
  },
  {
    id: "listening",
    title: "Listening",
    description: "Presence, calibration, sensory acuity, and representational listening for cleaner understanding.",
    principles: [
      "Listening includes words, predicates, physiology, rhythm, attention, silence, and state shifts.",
      "Calibration means noticing changes from a person's own baseline.",
      "Presence reduces projection and improves the quality of intervention.",
    ],
    modelFrame: "show layers of listening from presence to verbal content, sensory predicates, physiology, emotional tone, and meaning.",
    practiceFrame: "Listen first for structure before content: sensory channel, state shift, presupposition, deletion, generalisation, or distortion.",
    exampleFrame: "A small change in breathing or tempo can reveal more than the headline content of the sentence.",
    topics: [
      topic("Art of Being Present", "clean attention that is not overloaded by agenda or interpretation", "Pause, breathe, soften the need to solve, and track what is actually happening now.", "A practitioner notices the urge to advise and instead reflects the client's exact phrase back."),
      topic("Benchmarks for Listening", "observable markers that listening is accurate and useful", "Check understanding through pace, paraphrase, calibration, and the client's response.", "The client relaxes when their words are reflected precisely rather than improved into consultant language."),
      topic("Sensory Acuity", "fine-grained noticing through sight, sound, and felt sense", "Track shifts in skin tone, breathing, posture, voice tempo, eye focus, and gesture while staying respectful.", "A client's shoulders drop when describing one option and tighten when describing another."),
      topic("Calibration", "reading change against the person's baseline", "Establish a neutral baseline, then compare shifts when different topics, memories, or outcomes are introduced.", "The same smile means warmth in one context and compliance in another, so baseline matters."),
      topic("Representational Listening", "hearing which sensory system is organising the person's words", "Match questions to the sensory language: what do they see, hear, feel, sense, smell, or taste?", "A client says a plan 'doesn't sound right', so the next question explores tone, words, and internal dialogue."),
      topic("Representational System Predicates", "sensory verbs and phrases that reveal how experience is represented", "Collect predicates without over-interpreting one phrase; listen for patterns across several sentences.", "Phrases like 'clear picture', 'rings true', and 'heavy feeling' point to different representational channels."),
    ],
  },
  {
    id: "supporting-and-rapport",
    title: "Supporting and Rapport",
    description: "Pacing, matching, perceptual flexibility, and perspective-taking for trust and influence.",
    principles: [
      "Rapport is built through respectful pacing before leading.",
      "Matching can happen through language, values, rhythm, posture, predicates, or level of abstraction.",
      "Perceptual positions create more choice by changing viewpoint.",
    ],
    modelFrame: "show rapport as pace -> match -> calibrate -> lead, with perspective positions around the conversation.",
    practiceFrame: "Join the person where they are, verify connection, then invite a small shift in state, attention, or perspective.",
    exampleFrame: "A parent can pace a child's frustration before leading toward a calmer next step.",
    topics: [
      topic("Pacing", "meeting a person's current map, language, state, or rhythm before attempting change", "Acknowledge the person's experience accurately enough that they feel met.", "A coach says, 'Part of you wants speed and part wants certainty,' before exploring options."),
      topic("Supporting through Pacing", "using pacing as emotional and cognitive support", "Reflect values, concerns, and state without amplifying the problem frame.", "A leader validates pressure in the room before asking the team to choose the next clear action."),
      topic("Matching and Mirroring", "subtle alignment with language, posture, rhythm, energy, or predicates", "Match lightly and ethically; avoid imitation that feels mechanical or intrusive.", "A practitioner slows their speech slightly as the client moves into a reflective state."),
      topic("Perceptual Flexibility", "moving between viewpoints to gain more information and choice", "Invite first position, second position, observer position, and wider-system perspective.", "A disagreement shifts when Jared asks what the other person might be protecting or valuing."),
      topic("Quadrants", "organising perspectives across self, other, observer, and system", "Map the issue through multiple lenses before choosing an intervention.", "A business decision looks different from founder, customer, team, and market positions."),
      topic("Native Perspectives", "honouring the person's own language, culture, values, and internal logic", "Use the client's vocabulary and metaphors before introducing your own model.", "A client describes life as 'running hot'; the coach explores cooling, load, and pressure rather than switching metaphors."),
    ],
  },
  {
    id: "states",
    title: "States",
    description: "How emotional, cognitive, and physiological states are elicited, shifted, anchored, and integrated.",
    principles: [
      "State is shaped by representation, physiology, meaning, attention, and context.",
      "Useful work often starts by changing state before changing content.",
      "Anchors connect cues to states and can be designed, strengthened, or collapsed.",
    ],
    modelFrame: "show representation, physiology, meaning, and attention feeding state, then state shaping behaviour.",
    practiceFrame: "Name the state, elicit its structure, change one variable, and calibrate the behavioural difference.",
    exampleFrame: "A calmer state can make the same problem feel solvable without changing the facts.",
    topics: [
      topic("State Management 101", "recognising and choosing state as a practical resource", "Ask what state is present, what state is needed, and which representation or physiology would shift it.", "Before a difficult call, Jared changes posture, breathing, and internal imagery to access steadiness."),
      topic("State Elicitation", "bringing a state into awareness through memory, imagination, physiology, or language", "Ask for a real time when the person had the resource and intensify sensory detail.", "A client recalls a moment of decisive action and their voice becomes firmer."),
      topic("State Induction", "intentionally inviting a state through attention, pacing, words, and body cues", "Use language, rhythm, posture, and sensory detail to support the desired state.", "A coach slows tempo and invites the client to notice the feeling of grounded confidence."),
      topic("Anchoring", "linking a specific cue to a useful state", "Elicit a clean state, apply a distinct cue at the peak, break state, then test the anchor.", "A hand gesture becomes linked to calm focus before public speaking."),
      topic("Collapsing Anchors", "bringing incompatible states together so an old reaction loses intensity", "Elicit the unhelpful state and a stronger resource state, then integrate them carefully while calibrating.", "A fear response around feedback weakens when grounded curiosity is anchored into the same trigger."),
    ],
  },
  {
    id: "meta-states-and-framing",
    title: "Meta States and Framing",
    description: "Higher-level meanings, frames, reframes, and pattern work that transform how experience is organised.",
    principles: [
      "A meta state is a state applied to another state, such as curiosity about fear or respect for grief.",
      "Frames determine what an experience means and what response feels available.",
      "Changing the frame can change the emotional and behavioural options without denying the facts.",
    ],
    modelFrame: "show primary state, meta state, frame, meaning, and behavioural choice as layered levels.",
    practiceFrame: "Identify the current frame, test its effect, then introduce a higher-quality frame that creates more responsibility and choice.",
    exampleFrame: "Feedback framed as threat creates defence; feedback framed as data can create curiosity.",
    topics: [
      topic("Meta-States Model", "applying one state or meaning to another state", "Ask what the person feels about the feeling, believes about the response, or means by the experience.", "A client is anxious about being anxious; calm acceptance at the meta level changes the whole experience."),
      topic("Basic Meta-Stating Pattern", "bringing a resource state to bear on a primary experience", "Elicit the resource, intensify it, apply it to the target state, and test the new relationship.", "Confidence about uncertainty creates a different response than confidence instead of uncertainty."),
      topic("Framing Model", "how contexts and meanings shape interpretation", "Ask what frame is operating, who set it, whether it serves, and what frame would be more useful.", "A missed target becomes evidence of failure in one frame and market feedback in another."),
      topic("Reframing Criticism", "turning judgement into usable information", "Separate tone from data, identify the positive intention, and ask what useful feedback remains.", "A harsh comment becomes a request for clearer expectations once the emotional charge is reduced."),
      topic("Six-Step Reframing", "negotiating with a part that runs an unwanted behaviour", "Identify the behaviour, establish communication, find positive intent, generate alternatives, test ecology, and future pace.", "A procrastinating part is protecting against shame; new options can protect dignity while still moving."),
      topic("Belief Change", "updating limiting meanings into more useful organising frames", "Explore evidence, counterexamples, impact, intention, and a new belief that fits the person's values.", "The belief 'I always fail at consistency' shifts when the client identifies specific contexts where structure works."),
      topic("Meta Yes / Meta No", "using embodied yes/no signals to clarify alignment", "Elicit clean yes and no responses, then test decisions against the body's congruence signals.", "A business option sounds logical but gets a clear internal no when tested slowly."),
      topic("Sphere of Excellence", "building an embodied resource field around a person", "Elicit resources, place them in an imagined space, step in, intensify, and link to future contexts.", "Jared builds a sphere of calm authority before a high-stakes conversation."),
      topic("Swish Pattern", "redirecting an unwanted cue toward a preferred self-image or response", "Identify trigger image, create compelling desired image, swish rapidly, break state, and test.", "An old picture of avoidance gets replaced by a vivid image of taking the first small action."),
      topic("Movie Rewind Pattern", "reducing emotional charge in a remembered sequence", "Use dissociation, reverse sequencing, speed, and safety to change how the memory is encoded.", "A stressful memory loses intensity when viewed from a safe observer position and rewound quickly."),
    ],
  },
  {
    id: "precision-questioning",
    title: "Precision Questioning",
    description: "Meta Model distinctions and outcome questions for recovering missing information and improving clarity.",
    principles: [
      "Language both reveals and hides the structure of experience.",
      "Deletions, generalisations, and distortions can be gently questioned to recover choice.",
      "Good questions increase specificity without making the person feel interrogated.",
    ],
    modelFrame: "show surface statement -> deletion/generalisation/distortion -> precision question -> recovered information.",
    practiceFrame: "Question the language pattern softly, then listen for what new representation, choice, or responsibility appears.",
    exampleFrame: "The sentence 'This never works' can become specific, testable, and less global through one clean question.",
    topics: [
      topic("Meta Model", "a questioning map for clarifying vague or limiting language", "Identify the language pattern and ask the least intrusive question that restores missing detail.", "A client says 'They don't respect me'; the coach asks who specifically and how they know."),
      topic("Deletions", "missing people, actions, standards, comparisons, or referents", "Ask what, who, compared with what, according to whom, or how specifically.", "A sentence like 'It is too hard' invites the question, 'Too hard compared with what?'"),
      topic("Generalisations", "broad rules, universals, modal operators, and fixed identity claims", "Challenge always/never, can't/must, and identity labels with counterexamples and choice questions.", "A client says 'I can't say no'; one counterexample opens a new option."),
      topic("Distortions", "mind reads, cause-effect claims, complex equivalences, and nominalisations", "Ask how the person knows, what causes what, or what process is hidden inside the noun.", "A statement like 'His silence means he is angry' becomes testable rather than assumed."),
      topic("Basic Meta Model Questions", "the reusable precision questions that recover structure", "Keep questions short, kind, and context-specific.", "The simple question 'How specifically?' can turn a vague worry into a workable next step."),
      topic("Well-Formed Outcome Questions", "defining desired outcomes in sensory, contextual, ecological, and actionable terms", "Ask what the person wants, how they will know, where it matters, what resources are needed, and what could be affected.", "Instead of 'less stressed', the outcome becomes 'calm enough to make three calls before lunch'."),
    ],
  },
  {
    id: "strategies-and-modelling",
    title: "Strategies and Modelling",
    description: "How people sequence internal and external steps to decide, learn, motivate, influence, and perform.",
    principles: [
      "A strategy is a repeatable sequence of representations, tests, states, and actions.",
      "Modelling studies excellence by eliciting structure rather than copying personality.",
      "Changing one step in a sequence can alter the outcome of the whole strategy.",
    ],
    modelFrame: "show trigger -> internal/external steps -> test -> exit or loop, using representational notation where useful.",
    practiceFrame: "Elicit the sequence slowly, identify the key test or stuck point, then install a more useful step and future test it.",
    exampleFrame: "A motivation problem may be a sequence problem: the person starts with pressure instead of a compelling image of the result.",
    topics: [
      topic("Strategies Model", "the sequence that turns cues into outcomes", "Ask what happens first, then next, how they know, and what lets them finish.", "A client buys only after seeing a plan, hearing reassurance, and feeling low risk."),
      topic("TOTE Model", "test-operate-test-exit as a simple structure for behaviour", "Identify the entry test, operation, exit test, and what happens if the exit test fails.", "A writer keeps editing because the exit test is 'perfect' rather than 'clear enough to send'."),
      topic("NLP Notational System", "coding strategy steps through sensory channels and direction of attention", "Use notation to keep track of visual, auditory, kinaesthetic, internal, and external steps.", "A decision sequence might be Ve -> Ai -> Ki: see the option, hear self-talk, feel congruence."),
      topic("Strategy Elicitation", "drawing out the steps of a person's successful or stuck sequence", "Slow the person down and ask for the exact internal and external steps.", "A high performer describes how they scan the room, hear a question, picture the answer, then speak."),
      topic("Motivation Strategies", "how people get themselves to start and continue", "Find whether motivation is driven by toward images, away-from pressure, values, identity, or sequence design.", "A gym habit improves when the first image is finishing strong rather than the discomfort of starting."),
      topic("Decision Strategies", "how people know a choice is right enough", "Elicit criteria, sequence, representations, and final congruence test.", "One person needs to see numbers, another needs to hear trusted advice, another needs a body-level yes."),
      topic("Learning Strategies", "how people encode, test, and retrieve understanding", "Discover the sensory and cognitive steps that make learning stick.", "A student learns better when turning text into diagrams and explaining it aloud."),
      topic("Influencing Strategies", "sequencing communication to match how a person becomes persuaded", "Pace the person's decision strategy ethically and offer information in the order they can use it.", "A client who decides by examples needs stories before abstract principles."),
    ],
  },
  {
    id: "time-lines",
    title: "Time-Lines",
    description: "How people code time, organise memory and future, and update emotional meaning across a timeline.",
    principles: [
      "People often represent past, present, and future spatially and sensorially.",
      "Timeline work changes the coding of memories, decisions, and anticipated futures.",
      "Ecology, grounding, and consent matter when working with emotionally charged material.",
    ],
    modelFrame: "show past, present, and future as an editable spatial line with key events, learnings, and resource points.",
    practiceFrame: "Elicit the person's natural time coding, keep observer safety where needed, add resources, and test the new meaning.",
    exampleFrame: "Moving a future deadline from looming overhead to a clear point ahead can change pressure into planning.",
    topics: [
      topic("Time-Lines Model", "the way people internally organise time", "Ask where the past, present, and future are located and how they are represented.", "A client experiences next month as a heavy block in front of them; changing distance changes state."),
      topic("Encoding Time", "the sensory features that make time feel near, far, urgent, finished, or open", "Explore location, size, brightness, movement, voice, feeling, and distance in time representations.", "A past mistake still feels present because it is coded close, bright, and large."),
      topic("Time-Line Awareness Pattern", "bringing conscious attention to the person's timeline structure", "Map the line gently, identify resource points, and notice how the coding affects emotion and action.", "Jared notices future projects cluster together and separates them into clearer sequence."),
      topic("Change Personal History", "adding resources to earlier experiences so present responses update", "Identify the old response, locate earlier examples, add needed resources, and test present behaviour.", "An old school embarrassment no longer drives avoidance after adult confidence is added to the memory."),
      topic("Releasing Negative Emotions", "changing the relationship to stored emotional charge across time", "Use safe observer position, learnings, and updated coding to release unnecessary emotional intensity.", "Anger linked to an old event softens when the person extracts the boundary lesson and lets the charge settle."),
      topic("Decision Destroyer", "loosening an old decision that keeps shaping current behaviour", "Find the decision point, add resources and wider perspective, then choose a more useful decision.", "The decision 'I must do everything alone' is updated after revisiting the moment it was formed."),
      topic("Reimprinting", "updating an early imprint with resources for all key people in the scene", "Identify the imprint, resource the younger self and others, then bring the learning forward.", "A client adds adult protection and compassion to a childhood scene and present confidence changes."),
    ],
  },
  {
    id: "milton-model-and-trance",
    title: "Milton Model and Trance",
    description: "Indirect language, permissive suggestion, and trance processes for opening options and inner resources.",
    principles: [
      "The Milton Model uses ambiguity, presupposition, pacing, and suggestion to invite inner search.",
      "Trance can be understood as focused absorption and altered attention, not a theatrical state.",
      "Ethical use supports agency, consent, and resource access.",
    ],
    modelFrame: "show pace current experience -> soften attention -> invite inner search -> suggest resourceful options -> future apply.",
    practiceFrame: "Use permissive language, sensory pacing, and open suggestions while preserving choice and consent.",
    exampleFrame: "A reflective pause can help a client access a resource that direct questioning did not reach.",
    topics: [
      topic("Milton Model", "language patterns that invite unconscious search and flexible meaning", "Pace observable experience, use artful vagueness, and invite the person to discover their own resource.", "A practitioner says, 'And you may begin to notice what part of you already knows the next small step.'"),
      topic("Hypnotic Language Patterns", "presuppositions, embedded suggestions, binds, nominalisations, and unspecified references", "Use patterns gently to open possibility rather than bypass choice.", "The phrase 'as you consider what changes first' presupposes that change can begin."),
      topic("Hypnotic Processes", "attention shifts that deepen absorption, imagination, and resource access", "Guide attention from external detail to internal representation, body sensation, metaphor, or future rehearsal.", "A client imagines walking through a future conversation while feeling steadier in the body."),
      topic("Trance Induction", "creating a focused, receptive state through pacing and attention", "Pace breathing, posture, sensory detail, and rhythm before inviting a useful inner experience.", "A short grounding induction helps someone rehearse a boundary conversation calmly."),
    ],
  },
  {
    id: "nlp-patterns",
    title: "NLP Patterns",
    description: "Reusable intervention formats for parts work, negotiation, meetings, identity shifts, and behavioural change.",
    principles: [
      "Patterns are step-by-step maps that should be adapted to the person and context.",
      "Most patterns rely on state, representation, positive intent, ecology, and future testing.",
      "Clean setup and calibration matter more than mechanically following steps.",
    ],
    modelFrame: "show trigger, current pattern, resource or part relationship, integration move, and future test.",
    practiceFrame: "Set the frame, establish positive intent, run the format lightly, test ecology, and future apply the new response.",
    exampleFrame: "A pattern works best when the client experiences a genuine shift, not just an intellectual explanation.",
    topics: [
      topic("Somatic Swish", "using body-based cues to redirect an old response toward a preferred embodied state", "Identify the body cue, build the desired somatic representation, swish, break state, and test.", "A chest-tightening cue becomes linked to standing tall, breathing low, and acting cleanly."),
      topic("Creating a New Part", "designing an internal resource part for a needed function", "Define the function, positive intent, qualities, boundaries, and integration with the wider system.", "Jared creates a calm planner part that supports action without becoming controlling."),
      topic("Agreement Frame", "maintaining rapport while introducing difference", "Use 'I appreciate / I respect / I agree' frames before adding another perspective.", "A difficult meeting stays collaborative when disagreement is framed as building on shared intent."),
      topic("Visual Squash", "integrating two parts or polarities into a higher-level resource", "Represent each part, identify positive intent, allow exchange and integration, then bring the new whole into the body.", "A drive-for-growth part and a safety part integrate into wise ambition."),
      topic("Negotiating Between Parts", "helping internal parts collaborate around shared positive intent", "Give each part a voice, find shared values, generate options, and test agreement.", "The part wanting rest and the part wanting achievement negotiate a sustainable plan."),
      topic("Having Great Meetings", "using NLP frames to create clearer, more respectful group interaction", "Set outcomes, roles, sensory evidence, rapport norms, decision criteria, and next actions.", "A leadership meeting improves when each agenda item has an outcome, owner, and evidence of success."),
    ],
  },
  {
    id: "appendices-and-reference",
    title: "Appendices and Reference",
    description: "Reference material, tests, history, and broader Neuro-Semantic context for deeper repository work.",
    principles: [
      "Reference material supports practice by making distinctions easier to find and compare.",
      "Tests and histories should be used as orientation tools rather than rigid authority.",
      "Neuro-Semantics extends NLP with layered meaning, frames, and self-reflexive consciousness.",
    ],
    modelFrame: "show a reference index connecting concepts, tests, histories, related models, and application notes.",
    practiceFrame: "Use reference entries to clarify terms, compare maps, and connect practical examples across the repository.",
    exampleFrame: "A quick reference table can help Jared choose whether a conversation needs rapport, precision questions, state work, or framing.",
    topics: [
      topic("VIBES", "a compact reference for key channels and cues in experience", "Use the acronym as a checklist for what to notice, elicit, or record.", "A reflection note captures visual image, internal words, body emotion, and state shift in one pass."),
      topic("Representational Systems Test", "a reference tool for exploring sensory preferences and language patterns", "Treat test results as conversation starters, then verify through live examples.", "A person may score visual but use kinaesthetic language when discussing stress."),
      topic("History of NLP", "the development of NLP through modelling, communication, therapy, and applied change work", "Use history to understand why modelling, language, and state became central themes.", "Knowing the modelling roots keeps the repository practical rather than merely theoretical."),
      topic("Meta Model Reference", "a lookup map for deletions, generalisations, distortions, and precision questions", "Match the language pattern to a clean question and track what information returns.", "A practitioner uses the reference to choose between 'How do you know?' and 'Compared with what?'"),
      topic("Neuro-Semantics", "the extension of NLP into meaning, meta states, frames, and self-reflexive patterns", "Look for states about states and meanings about meanings in complex human responses.", "A client's shame about anger changes when respect and curiosity are applied at a meta level."),
      topic("Program Influences", "the wider influences that shaped NLP and related models", "Use influence notes to connect methods with their roots and practical intent.", "A repository entry links modelling, systems thinking, semantics, hypnosis, and coaching practice."),
    ],
  },
];

export const nlpTopicGroups: NlpTopicGroup[] = nlpRepositorySeeds.map((group) => ({
  id: group.id,
  title: group.title,
  description: group.description,
  topics: createTopics(group),
}));
