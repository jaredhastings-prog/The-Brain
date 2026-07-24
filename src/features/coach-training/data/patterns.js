// Step-by-step protocols for the intervention patterns the quiz recommends,
// so the learner can practise administering them. Sourced from The Coaching
// Room's NLP Practitioner manual where the pattern appears there; the
// Neuro-Semantics "handbook" patterns are summarised to their working steps.

export const PATTERNS = {
  "state accessing and anchoring": {
    name: "State Accessing & Anchoring",
    source: "NLP Practitioner manual",
    when: "Install reliable access to a resource state the client can self-fire.",
    steps: [
      "Identify the desired state and its mind-body components. Ask: what state do you want? Are you beginning to enter it as you describe it? In what context(s) do you want it?",
      "Evoke it fully. Recall a time you had it powerfully; amplify: “be with that feeling… let it grow… now let it double.” Ask what would increase it even more.",
      "Anchor at the peak. As they reach 8+/10, apply a distinct touch (arm/forearm/shoulder), 1–2 seconds, equal pressure, exactly the same spot. Add a gesture and a tone as visual/auditory anchors.",
      "Break state, then test — fire the anchor alone and check the state returns.",
      "Future-pace — fire it while imagining the context where they'll need it.",
    ],
  },
  "anchoring": {
    name: "Anchoring",
    source: "NLP Practitioner manual",
    when: "Link a cue to a resource state for on-demand access.",
    steps: [
      "Identify the desired state and the context(s) where it's wanted.",
      "Evoke it fully — recall the most complete time they had it; amplify and double it.",
      "Anchor at peak (8+/10): distinct touch, 1–2s, equal pressure, same location; add gesture and tone.",
      "Practise stepping in and out — snapshot the state across all senses, then break and re-access so they can fly into it at will.",
      "Apply to everyday life — fire the anchor against a specific real context and future-pace the new response.",
    ],
  },
  "collapsing anchors": {
    name: "Collapsing Anchors",
    source: "NLP Practitioner manual",
    when: "Take the emotional charge out of a limiting state by integrating it with a stronger resource.",
    steps: [
      "Access the limiting state, set an anchor for it, and calibrate its intensity (0/10).",
      "Access a contradictory, powerful resource state; elicit it fully and set a separate anchor, testing that it fires.",
      "Fire both anchors simultaneously and hold — “there's nothing to do, just experience” — through the confusion/disorientation as both process at once.",
      "Release the limiting-state anchor while holding the resource anchor.",
      "Test — recall the old trigger and check how much of the limiting state returns.",
    ],
  },
  "swish": {
    name: "Swish Pattern",
    source: "NLP Practitioner manual",
    when: "Re-wire a trigger so the brain moves toward a desired self-image instead of an old response.",
    steps: [
      "Identify the experience/habit to change and the exact cue that triggers it.",
      "Elicit the cue picture — the image/sound/sensation that sets off the old response.",
      "Build a compelling desired self-image (the you for whom this is no longer a problem); make it bright, attractive, juiced-up.",
      "Link them: put a small dark dot of the desired image in the corner of the big cue picture.",
      "Swish — the cue picture shrinks dark and distant as the desired image explodes big, bright and close, all in under a second.",
      "Repeat five times, clearing the screen between each.",
      "Test — call up the old trigger and check the brain now jumps to the new image.",
    ],
  },
  "somatic swish": {
    name: "Somatic Swish",
    source: "NLP Practitioner manual",
    when: "For reactions that begin as a felt sensation or body-based trigger.",
    steps: [
      "Identify the somatic trigger — where in the body the unwanted reaction starts, and its direction of movement.",
      "Build the desired resourceful state as a felt sensation, with its own location and movement.",
      "Set the old sensation moving, then swish — replace its direction/quality with the resourceful sensation, fast.",
      "Repeat several times, breaking state between reps.",
      "Test by re-accessing the original body trigger.",
    ],
  },
  "movie rewind": {
    name: "Movie Rewind (Phobia Cure)",
    source: "NLP Practitioner manual",
    when: "Take the charge out of a highly charged memory or mental replay.",
    steps: [
      "Dissociate: imagine sitting in a cinema; freeze the moment just before the event as a black-and-white snapshot, watched from the tenth row.",
      "Double-dissociate: float back to the projection booth and watch yourself watching — hands on the glass, safe, in control.",
      "Play the black-and-white movie through from before to after the event, from the booth; note the cinematic features.",
      "Step into the comfortable scene at the very end, in colour and associated.",
      "Rewind: run the whole movie backwards super-fast (1–2 seconds) from end to start, in colour, as if inside it.",
      "Repeat the rewind 5–6 times, clearing between each.",
      "Test — try to access the old memory and check the charge is gone.",
    ],
  },
  "well-formed outcome": {
    name: "Well-Formed Outcome",
    source: "NLP Practitioner manual",
    when: "When someone can only state what they don't want — build the missing Towards representation.",
    steps: [
      "State the outcome positively — what do you want to move toward (not away from)?",
      "Specify it in sensory terms — what will you see, hear, feel when you have it?",
      "Contextualise — where, when, with whom, how often is this outcome wanted?",
      "Chunk into steps and stages — is each piece do-able, not overwhelming?",
      "Self-initiated and maintained — is it within your control to start and sustain?",
      "Specify resources — what will you need, and who will you have to become?",
      "Evidence procedure — how will you know you've achieved it?",
    ],
  },
  "basic meta-stating": {
    name: "Basic Meta-Stating",
    source: "NLP Practitioner manual (7 A's)",
    when: "Layer a resourceful state over a stuck one to change the frame governing it.",
    steps: [
      "Awareness — notice the primary state and what resource you want to bring to it.",
      "Access a resource state — a thought, feeling, belief or memory (e.g. acceptance, curiosity, calm).",
      "Amplify and anchor the resource fully.",
      "Apply it to the primary state — bring the resource to bear on, or embed the primary state inside, the resource.",
      "Analyse the ecology — does this layered frame serve every part of them?",
      "Appropriate to life — future-pace it as their frame of reference going forward.",
      "Accelerate — put it into action in real life.",
    ],
  },
  "acceptance pattern": {
    name: "Acceptance Pattern",
    source: "Neuro-Semantics",
    when: "For self-rejection and harsh self-judgment — make acceptance the frame instead of rejection.",
    steps: [
      "Identify the rejection frame — what about themselves (or a mistake) are they rejecting?",
      "Access a full state of acceptance — a time they completely accepted something as it was; amplify it.",
      "Meta-state: apply acceptance to the rejected experience — “I accept that this happened / that I did this.” Note: acceptance is not approval; standards survive.",
      "Check ecology — does accepting it free energy rather than excuse it?",
      "Future-pace — run the next likely trigger with acceptance as the governing frame.",
    ],
  },
  "sense of self pattern": {
    name: "Sense of Self Pattern",
    source: "Neuro-Semantics",
    when: "When worth is conditional — visibility, performance or others' reactions threaten the self.",
    steps: [
      "Separate worth from performance — surface where their value is currently contingent (on results, approval, being seen).",
      "Access unconditional self-acceptance — worth as a given, not earned.",
      "Layer acceptance → appreciation → esteem, meta-stating each onto their sense of self.",
      "Ground it at the identity level so exposure no longer puts worth on trial.",
      "Future-pace into the threatening context (the stage, the feedback) with worth held as unconditional.",
    ],
  },
  "meta-alignment pattern": {
    name: "Meta-Alignment Pattern",
    source: "Neuro-Semantics",
    when: "When someone is inconsistent, divided, or not congruent in a target behaviour.",
    steps: [
      "Identify the target behaviour where they're divided.",
      "Align the neuro-logical levels in turn: environment → behaviour → capability → values/beliefs → identity → purpose — checking congruence at each.",
      "Find where the misalignment sits and resolve it at that level.",
      "Bring the aligned levels back down into concrete action.",
      "Future-pace the now-congruent behaviour.",
    ],
  },
  "excuse blow-out": {
    name: "Excuse Blow-Out Pattern",
    source: "Neuro-Semantics",
    when: "When avoidance is protected by rationalisations rather than real constraints.",
    steps: [
      "Identify the excuse standing in for action — and confirm it's a story, not a genuine constraint.",
      "Separate the story from the action — make the excuse explicit and hold it up to scrutiny.",
      "Blow it out — exaggerate/absurdify the excuse until it loses its grip and its authority collapses.",
      "Re-commit to the action it was blocking.",
      "Future-pace immediate follow-through so the excuse can't re-form.",
    ],
  },
  "intentionality pattern": {
    name: "Intentionality Pattern",
    source: "Neuro-Semantics",
    when: "When attention is scattered — “energy flows where attention goes, as governed by intention.”",
    steps: [
      "Name the scattered experience — attention going everywhere at once.",
      "Climb the intention hierarchy — “what do you intend by X? And what do you intend by that?” up several levels.",
      "Find the highest, most compelling intention.",
      "Bring that intention back down as the organising frame for attention.",
      "Future-pace — let the scattered attention organise around the intention.",
    ],
  },
  "perceptual flexibility pattern": {
    name: "Perceptual Flexibility Pattern",
    source: "Neuro-Semantics",
    when: "For rigid one-position thinking (e.g. chronically living in 2nd position / others' reactions).",
    steps: [
      "Identify the fixed position they're stuck in (1st = self, 2nd = other, 3rd = observer, 4th = system).",
      "Rebuild a resourced 1st position — their own view, needs and read.",
      "Deliberately visit 2nd and 3rd positions, then return — proving they can move.",
      "Restore the full range so they can adopt any position without living there.",
      "Future-pace the situation with position-flexibility available.",
    ],
  },
  "eliminating troubling emotions": {
    name: "Eliminating Troubling Emotions",
    source: "Neuro-Semantics",
    when: "For emotions that are sticky, repetitive or overwhelming — change the relationship to the emotion.",
    steps: [
      "Distinguish the emotion from the meta-emotion — the feeling vs how they feel about the feeling.",
      "Step back to the meta-level and describe the relationship to the emotion.",
      "Apply a resourceful state (calm, acceptance, curiosity) to the troubling emotion.",
      "Change the frame so the emotion is contained to its context rather than bleeding across life.",
      "Future-pace the recurring trigger with the new relationship in place.",
    ],
  },
  "installing empowering beliefs": {
    name: "Installing Empowering Beliefs",
    source: "Neuro-Semantics",
    when: "Take a client's own proof-of-change and install it neurologically, not just intellectually.",
    steps: [
      "Elicit the empowering belief in the client's own words (often their own evidence: “I went from that to this”).",
      "Confirm they want it as a running belief.",
      "Meta-state it with conviction — validate it in the body, not just the head.",
      "Check ecology across contexts.",
      "Future-pace under pressure so it runs when it matters, not just when calm.",
    ],
  },
  "meta-yes and meta-no": {
    name: "Meta-Yes & Meta-No",
    source: "NLP Practitioner manual",
    when: "Weaken a limiting belief and strengthen an empowering replacement.",
    steps: [
      "Identify the limiting belief and its empowering replacement.",
      "Access a strong, congruent NO state — something they'd absolutely refuse.",
      "Apply the Meta-No to the limiting belief until it weakens/collapses.",
      "Access a strong, congruent YES state — something they'd wholeheartedly affirm.",
      "Apply the Meta-Yes to the empowering belief until it feels installed.",
      "Test and future-pace.",
    ],
  },
  "strategy elicitation (tote)": {
    name: "Strategy Elicitation (TOTE)",
    source: "NLP Practitioner manual",
    when: "Map how someone does a mental process (motivation, decision, learning) so it can be used or changed.",
    steps: [
      "Test — what triggers the strategy, and what tells them to start?",
      "Operate — what do they do internally (V/A/K/Ad steps) once triggered?",
      "Test — what's the comparison/criteria that says “good enough” or “not yet”?",
      "Exit — what tells them they're done and to act?",
      "Record the sequence, then test by running it back or re-installing a better one.",
    ],
  },
  "releasing negative emotions": {
    name: "Releasing Negative Emotions",
    source: "NLP Practitioner manual (Time-Line)",
    when: "Release a stored past emotion (guilt, anger, fear, grief) held on the time-line.",
    steps: [
      "Determine the kind of emotion and whether the information behind it is valid.",
      "Elicit the client's time-line (where past/present/future are located).",
      "Flush out the original source and contributing factors; find the learning to preserve.",
      "Float above the time-line back to the original event; learn from it at that higher perspective.",
      "Float back to just before the event, then forward to now — giving permission to let the emotion go.",
      "Test — look to the future and check whether the emotion needs to be recreated.",
    ],
  },
  "change personal history": {
    name: "Change Personal History",
    source: "NLP Practitioner manual (Time-Line)",
    when: "Re-code a chain of past experiences that keep an unresourceful pattern running.",
    steps: [
      "Identify the recurring unwanted feeling/response and anchor it.",
      "Float back along the time-line to earlier instances, tracing the pattern to its origin.",
      "From above the time-line, bring resources the younger self needed into each scene.",
      "Re-experience the events with the resources present, updating the coding.",
      "Return to now and future-pace a situation that would once have triggered the old pattern.",
    ],
  },
  "decision destroyer": {
    name: "Decision Destroyer",
    source: "NLP Practitioner manual (Time-Line)",
    when: "Dissolve an outdated limiting decision that still governs behaviour as a meta-state.",
    steps: [
      "Identify the limiting decision — what was decided, when, and how it limits now.",
      "Identify the enhancing decision you'd rather live by; access and anchor it fully.",
      "Float above the time-line to when the limiting decision was made; preserve any learnings.",
      "Move to a point before the limiting decision and drop the enhancing decision in there.",
      "Come forward through time letting the new decision re-code events, then future-pace.",
    ],
  },
  "reimprinting": {
    name: "Reimprinting Pattern",
    source: "NLP Practitioner manual (Time-Line)",
    when: "Heal a formative imprint experience and the belief installed by it.",
    steps: [
      "Identify the limiting belief and float back to its earliest imprint experience.",
      "From a dissociated position, identify the unmet needs and any significant others in the scene.",
      "Find the resources the younger self (and the others) needed.",
      "Re-live the imprint with those resources present, updating the belief formed there.",
      "Bring the new imprint forward through time to the present and future-pace.",
    ],
  },
};

// Map the leading phrase of a follow-up's correct option to a protocol.
export function lookupPattern(optionText) {
  if (!optionText) return null;
  let key = optionText.split(/\s+—\s+|\s+-\s+/)[0].trim().toLowerCase();
  key = key.replace(/\s+pattern$/, "").replace(/[.,]$/, "").trim();
  const aliases = {
    "movie rewind": "movie rewind",
    "well-formed outcome": "well-formed outcome",
    "excuse blow-out": "excuse blow-out",
    "collapsing anchors": "collapsing anchors",
    "somatic swish": "somatic swish",
    "swish": "swish",
  };
  if (aliases[key]) key = aliases[key];
  return PATTERNS[key] || null;
}
