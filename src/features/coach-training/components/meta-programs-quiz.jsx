"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Check, X, ChevronRight, Shuffle } from "lucide-react";

// ---------- Design tokens ----------
const ink = {
  bg: "#1B2130",
  bgSoft: "#242C3E",
  paper: "#EFE7D6",
  paperEdge: "#DED2B4",
  tabTeal: "#3F6952",
  tabTealText: "#EAF2ED",
  tabRust: "#8C5A2B",
  tabRustText: "#F5EBDD",
  tabPlum: "#5C4470",
  tabPlumText: "#F0EAF5",
  redPen: "#A8382C",
  textDark: "#2B2620",
};

const serif = "Georgia, 'Iowan Old Style', 'Palatino Linotype', serif";
const sans = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const mono = "'SFMono-Regular', Consolas, 'Liberation Mono', monospace";

// ---------- Meta Programs bank (all 60) ----------
const GROUPS = {
  communication: "Communication",
  thinking: "Thinking Style",
  decisions: "Decisions & Conviction",
  motivation: "Motivation & Values",
  work: "Work Style",
  self: "Self & Identity",
  emotional: "Emotional & Social",
  time: "Time",
  info: "Info Processing",
  verbatim: "Real Clients",
};

const Q = [
  { id: 1, group: "communication", statement: "I need to see the layout before any of this makes sense to me.", options: ["Representational — Visual", "Representational — Auditory", "Representational — Kinaesthetic", "Representational — Language"], correct: 0, explanation: "\"See\" + needing to view it first is Visual." },
  { id: 2, group: "thinking", statement: "I can't point to data — I just have a sense of where this is heading.", options: ["Epistemological — Intuitor", "Epistemological — Sensor", "Convincer Rep. — Feels Right", "Representational — Kinaesthetic"], correct: 0, explanation: "Inner knowing, no facts cited — Intuitor gathers info from the inside." },
  { id: 3, group: "thinking", statement: "Before the details, just tell me the overall vision first.", options: ["Scale — Global", "Scale — Detail", "Scale — Abductive", "Philosophical — Why"], correct: 0, explanation: "Big picture first, details later — Global/Deductive thinking." },
  { id: 4, group: "thinking", statement: "This is nothing like anything we've tried before — completely different situation.", options: ["Relationship Comparison — Mismatching", "Relationship Comparison — Matching", "Change Adaptor — Open", "Risk Taking — Approach"], correct: 0, explanation: "Searching for difference from past experience, not similarity." },
  { id: 5, group: "info", statement: "I hit the target this month, but honestly it's not that impressive.", options: ["Information Staging — Discounting", "Information Staging — Counting", "Self Confidence — Low", "Self Esteem — Conditional"], correct: 0, explanation: "Undervaluing a real win — backgrounding the success." },
  { id: 6, group: "thinking", statement: "I immediately think about everything that could go wrong with this plan.", options: ["Scenario Type — Pessimistic", "Scenario Type — Optimistic", "Risk Taking — Avoid", "Decision — Cautious"], correct: 0, explanation: "First response is scanning for problems/dangers." },
  { id: 7, group: "thinking", statement: "It's either right or wrong for me — there's no in-between.", options: ["Classification Scale — Either-Or", "Classification Scale — Continuum", "Classification Scale — Multi-Dimensional", "Decision — Bold"], correct: 0, explanation: "Clear black-and-white categories, no grey area." },
  { id: 8, group: "thinking", statement: "Things are what they are — they don't just change on their own.", options: ["Nature — Aristotelian", "Nature — Non-Aristotelian", "Durability — Impermeable", "Change Adaptor — Closed"], correct: 0, explanation: "World seen as solid, static \"things\" — not process/change." },
  { id: 9, group: "thinking", statement: "I can block out everything around me and just focus on the task.", options: ["Focus — Screening", "Focus — Non-Screening", "Stream of Consciousness — Focused", "Persistence — Patient"], correct: 0, explanation: "Screening is about filtering out *external* stimuli, not internal thought direction." },
  { id: 10, group: "thinking", statement: "I don't care why it broke — just tell me how to fix it.", options: ["Philosophical — How", "Philosophical — Why", "Buying — Time", "Operational Style — Procedures"], correct: 0, explanation: "Solution-focused, not origin-focused." },
  { id: 11, group: "communication", statement: "It's not what she said — it was her body language that told me everything.", options: ["Communication Channel — Non-Verbal", "Communication Channel — Verbal", "Representational — Kinaesthetic", "Convincer Rep. — Looks Right"], correct: 0, explanation: "Sorting for tone, posture, cues — not the words themselves." },
  { id: 12, group: "info", statement: "I'm open to being wrong about this if new evidence comes in.", options: ["Durability — Permeable", "Durability — Impermeable", "Change Adaptor — Open", "Convincer Demo. — Automatic"], correct: 0, explanation: "Beliefs that can be revised — not locked in." },
  { id: 13, group: "info", statement: "If the team's struggling, I look at what I did to contribute to that.", options: ["Causation — Personal", "Causation — External", "Responsibility Sort — Over", "Responsibility Sort — Healthy"], correct: 0, explanation: "Sees own role in causing/influencing the outcome." },
  { id: 14, group: "info", statement: "I can't leave a project half-finished — it nags at me until it's done.", options: ["Completion — Closure", "Completion — Non-Closure", "Persistence — Patient", "Goal Striving — Perfectionism"], correct: 0, explanation: "Energised by the need to close things out." },
  { id: 15, group: "info", statement: "Give me the numbers, not the vibe.", options: ["Information Kind — Quantitative", "Information Kind — Qualitative", "Convincer Rep. — Makes Sense", "Representational — Language"], correct: 0, explanation: "Wants measurements/figures over meaning-based description." },
  { id: 16, group: "thinking", statement: "My attention just goes everywhere at once — I can't help it.", options: ["Stream of Consciousness — Diffused", "Stream of Consciousness — Focused", "Focus — Non-Screening", "Persistence — Impatient"], correct: 0, explanation: "Diffused is internal thought spread across many directions.", followUp: { question: "Attention scattered in every direction. Which handbook pattern targets this directly?", options: ["Intentionality Pattern — 'energy flows where attention goes, as governed by intention'; strengthen the why", "Collapsing Anchors", "Movie Rewind", "De-Pleasuring Pattern"], correct: 0, explanation: "Handbook: use Intentionality 'when attention is scattered.' Attention organises around intention — climbing the meaning hierarchy gives the scattered attention something to organise around." } },
  { id: 17, group: "thinking", statement: "I really don't care if this fits how things are usually done around here.", options: ["Conventional — Non-Conformist", "Conventional — Conformist", "Risk Taking — Approach", "Change Adaptor — Open"], correct: 0, explanation: "Little regard for fitting in or social propriety." },
  { id: 18, group: "thinking", statement: "I'll have an answer before you've even finished asking the question.", options: ["Speed — Quick & Witty", "Speed — Deliberate & Slow", "Decision — Bold", "Somantic Response — Reactive"], correct: 0, explanation: "Fast mental processing speed — the core is thought-pace, not decision style." },
  { id: 19, group: "decisions", statement: "Nothing beats a firm handshake and a good feeling in the room.", options: ["Convincer Rep. — Feels Right", "Convincer Rep. — Sounds Right", "Convincer Rep. — Looks Right", "Convincer Rep. — Makes Sense"], correct: 0, explanation: "Hands-on, felt experience is what convinces." },
  { id: 20, group: "emotional", statement: "When I think back on that argument, it's like I'm watching it happen to someone else.", options: ["Movie Position — Outside", "Movie Position — Inside", "Ego Strength — Stable", "Self Monitoring — High"], correct: 0, explanation: "Psychological distance from the memory — watching, not reliving." },
  { id: 21, group: "emotional", statement: "I walk into a room and just light it up — I can't help being loud.", options: ["Exuberance — Surgency", "Exuberance — Desurgency", "Social Presentation — Sophisticated", "Dominance — Affiliation"], correct: 0, explanation: "High emotional intensity, bold and outgoing." },
  { id: 22, group: "emotional", statement: "I feel the urge to react, but I catch myself and choose my response.", options: ["Stress Coping — Assertive", "Stress Coping — Aggressive", "Stress Coping — Passive", "Ego Strength — Stable"], correct: 0, explanation: "Manages the fight/flight urge without acting on it — that choosing is the key marker." },
  { id: 23, group: "self", statement: "I trust my own read over anyone else's opinion.", options: ["Authority — Internal Referencing", "Authority — External Referencing", "Attention — Self-Referent", "Self Confidence — High"], correct: 0, explanation: "Where you look to know you're right — here, inward." },
  { id: 24, group: "self", statement: "Before I decide anything, I think about how it affects my team.", options: ["Attention — Other Referent", "Attention — Self-Referent", "Authority — External Referencing", "Management — Collaboration"], correct: 0, explanation: "Whose needs the decision centers on — theirs, not just his own." },
  { id: 25, group: "emotional", statement: "When one thing goes wrong, suddenly everything in my life feels wrong.", options: ["Emotional Containment — Multi-directional", "Emotional Containment — Uni-directional", "Scenario Type — Pessimistic", "Self Esteem — Conditional"], correct: 0, explanation: "Emotion bleeds across every area of life, not contained to one context.", followUp: { question: "One emotion floods every area of life. Which pattern contains the spread?", options: ["Eliminating Troubling Emotions — for emotions that are sticky, repetitive, overwhelming; change the relationship to the emotion", "Pleasure Pattern", "Excuse Blow-Out", "Strategy Elicitation (TOTE)"], correct: 0, explanation: "Handbook: use it when 'an emotion is sticky, repetitive, overwhelming.' The key distinction is emotion vs meta-emotion — changing the relationship to the feeling stops it bleeding across contexts." } },
  { id: 26, group: "emotional", statement: "After a big event, I need a whole day alone to feel like myself again.", options: ["Rejuvenation — Introvert", "Rejuvenation — Extrovert", "Focus — Screening", "Stream of Consciousness — Focused"], correct: 0, explanation: "Recharges by solitude, not company." },
  { id: 27, group: "emotional", statement: "I don't think — I just act, and deal with the consequences later.", options: ["Somantic Response — Active/Reactive", "Somantic Response — Inactive/Reflective", "Decision — Bold", "Risk Taking — Approach"], correct: 0, explanation: "Acts before thinking things through — the core is response speed, not risk appetite." },
  { id: 28, group: "emotional", statement: "I always think about how this will look to others before I say it.", options: ["Social Presentation — Artfully Shrewd", "Social Presentation — Artlessly Genuine", "Attention — Other Referent", "Self Monitoring — High"], correct: 0, explanation: "Managing the impression/image created in others' minds." },
  { id: 29, group: "emotional", statement: "Getting along with the team matters more to me than winning the argument.", options: ["Dominance — Affiliation", "Dominance — Achievement", "Dominance — Power", "Interactive — Cooperative"], correct: 0, explanation: "Values relationship-maintenance over competing — Dominance is about the underlying social motive." },
  { id: 30, group: "work", statement: "I do my best work alone — I don't need a team around me.", options: ["Work Style — Independent", "Work Style — Team Player", "Work Style — Manager", "Work Style — Bureaucrat"], correct: 0, explanation: "Self-motivated, prefers solo responsibility." },
  { id: 31, group: "emotional", statement: "New tech, new processes — bring it on, I love it.", options: ["Change Adaptor — Open to Change", "Change Adaptor — Closed to Change", "Risk Taking — Approach", "Adaptation — Perceiving"], correct: 0, explanation: "Change itself is experienced as exciting and desirable." },
  { id: 32, group: "emotional", statement: "I make a mistake and just laugh it off — it's not that serious.", options: ["Attitude — Playful", "Attitude — Serious", "Self Esteem — Unconditional", "Ego Strength — Stable"], correct: 0, explanation: "Lightness as the default filter on life and mistakes." },
  { id: 33, group: "emotional", statement: "I want it done now — waiting drives me up the wall.", options: ["Persistence — Impatient", "Persistence — Patient", "Speed — Quick & Witty", "Motivational Direction — Towards"], correct: 0, explanation: "Persistence is about tolerance for duration, not thought speed." },
  { id: 34, group: "decisions", statement: "Honestly, I've never fully trusted a vendor, no matter what they show me.", options: ["Convincer Demo. — Never", "Convincer Demo. — Automatic", "Convincer Demo. — Repetitions", "Convincer Demo. — Time Period"], correct: 0, explanation: "Consistently doesn't accept things as believable." },
  { id: 35, group: "motivation", statement: "I'm chasing the vision of where this could go — that's what drives me.", options: ["Motivational Direction — Towards", "Motivational Direction — Away From", "Convincer Rep. — Looks Right", "Time Zones — Future"], correct: 0, explanation: "Pulled by a desired outcome, not pushed by avoiding a feared one." },
  { id: 36, group: "work", statement: "Just give me the checklist — I'll follow it exactly, step by step.", options: ["Operational Style — Procedures", "Operational Style — Options", "Adaptation — Judging", "Philosophical — How"], correct: 0, explanation: "Wants the defined, proven sequence — not to improvise on it." },
  { id: 37, group: "work", statement: "I map out my month in advance and stick to the plan.", options: ["Adaptation — Judging", "Adaptation — Perceiving", "Operational Style — Procedures", "Durability — Impermeable"], correct: 0, explanation: "Wants life to adapt to the plan — broader than just following defined steps." },
  { id: 38, group: "motivation", statement: "I have to do this — I don't really have a choice.", options: ["Modus Operandi — Necessity", "Modus Operandi — Choice", "Modus Operandi — Possibility", "Modus Operandi — Impossibility"], correct: 0, explanation: "\"Have to\" language — compulsion, not agency." },
  { id: 39, group: "motivation", statement: "What fascinates me is how all the pieces of the org connect and interact.", options: ["Preference — Systems", "Preference — Information", "Preference — Activity", "Preference — Things"], correct: 0, explanation: "Focused on processes, dynamics, and how parts relate." },
  { id: 40, group: "decisions", statement: "Nothing I do is ever quite good enough — I could always have done more.", options: ["Goal Striving — Perfectionism", "Goal Striving — Optimizing", "Goal Striving — Scepticism", "Self Confidence — Low"], correct: 0, explanation: "Never satisfied with performance, constantly frustrated.", followUp: { question: "'Never good enough, could always have done more.' Which pattern eases the self-attack?", options: ["Acceptance Pattern — for self-rejection and harsh self-judgment; acceptance becomes the frame instead of rejection", "Swish Pattern on work imagery", "Somatic Swish", "Time-Line Awareness"], correct: 0, explanation: "Perfectionism runs on a rejection frame toward one's own performance. The Acceptance Pattern replaces the rejection meta-state — the standards survive, the constant frustration doesn't." } },
  { id: 41, group: "decisions", statement: "How fast can I get this? That's my first question, every time.", options: ["Buying — Time", "Buying — Cost", "Buying — Quality", "Motivational Direction — Towards"], correct: 0, explanation: "First filter on a purchase is speed of delivery." },
  { id: 42, group: "motivation", statement: "I'm guarded with new people until they prove themselves.", options: ["Social Convincer — Distrusting", "Social Convincer — Trusting", "Social Convincer — Balanced", "Authority — External Referencing"], correct: 0, explanation: "Holds back, questions, doesn't extend trust immediately." },
  { id: 43, group: "motivation", statement: "I want to win, plain and simple — beating the competition is the whole point.", options: ["Interactive — Competitive", "Interactive — Cooperative", "Dominance — Power", "Dominance — Achievement"], correct: 0, explanation: "Win/lose framing of the interaction itself — Dominance:Power is the broader social-motive cousin." },
  { id: 44, group: "communication", statement: "Just say what you mean — I don't do subtext.", options: ["Directness — Direct/Low Context", "Directness — Inferential/High Context", "Communication Channel — Verbal", "Representational — Language"], correct: 0, explanation: "Wants things stated explicitly, not assumed or implied." },
  { id: 45, group: "work", statement: "I hand things off and trust my team to run with it.", options: ["Management — Delegation", "Management — Control", "Management — Collaboration", "Work Style — Manager"], correct: 0, explanation: "Seeks out others to hand tasks and ownership to." },
  { id: 46, group: "decisions", statement: "I'd rather stick with what's proven than gamble on something new.", options: ["Risk Taking — Avoid", "Risk Taking — Approach", "Change Adaptor — Closed", "Relationship Comparison — Matching"], correct: 0, explanation: "Prefers safety and the known over the unproven." },
  { id: 47, group: "decisions", statement: "I'll weigh every angle for weeks before I commit to anything.", options: ["Decision — Cautious", "Decision — Bold", "Decision — Balanced", "Goal Striving — Perfectionism"], correct: 0, explanation: "Decision-making itself feels difficult and drawn-out." },
  { id: 48, group: "self", statement: "I am what I do — my job title is basically who I am.", options: ["Self Experience — Role/Position", "Self Experience — Mind", "Self Experience — Body", "Self Experience — Disidentified"], correct: 0, explanation: "Defines self by role, job, position." },
  { id: 49, group: "self", statement: "Tell me what to do and I'll probably resist it out of principle.", options: ["Self Instruction — Strong Willed", "Self Instruction — Compliant", "Authority — Internal Referencing", "Conventional — Non-Conformist"], correct: 0, explanation: "\"Telling\" itself is what gets resisted — specific to instruction, not decisions generally." },
  { id: 50, group: "self", statement: "I don't think I'm actually good at this, even though people say I am.", options: ["Self Confidence — Low", "Self Confidence — High", "Self Esteem — Conditional", "Ego Strength — Unstable"], correct: 0, explanation: "Discounts a demonstrated skill." },
  { id: 51, group: "self", statement: "My worth isn't up for debate — it doesn't depend on how well I perform.", options: ["Self Esteem — Unconditional", "Self Esteem — Conditional", "Self Confidence — High", "Self Integrity — Harmonious"], correct: 0, explanation: "Worth as a given, not earned through doing." },
  { id: 52, group: "self", statement: "I say one thing and do another, and it eats at me.", options: ["Self Integrity — Conflicted", "Self Integrity — Harmonious", "Morality — Conscientious", "Self Esteem — Conditional"], correct: 0, explanation: "Feels torn/incongruent between values and actual behaviour.", followUp: { question: "'I say one thing and do another, and it eats at me.' Which handbook pattern?", options: ["Meta-Alignment Pattern — for when someone is inconsistent, divided, or not congruent in a target behaviour", "Sphere of Excellence", "De-Pleasuring Pattern", "Movie Rewind"], correct: 0, explanation: "The handbook's exact use-case: 'when someone is inconsistent, divided, or not fully congruent.' Align environment → behaviour → capability → values → identity, then bring the levels down into action." } },
  { id: 53, group: "work", statement: "It's not really my fault — other people should have caught that.", options: ["Responsibility Sort — Under", "Responsibility Sort — Over", "Responsibility Sort — Healthy", "Authority — External Referencing"], correct: 0, explanation: "Avoids ownership, relies on others.", followUp: { question: "'Not really my fault — others should have caught it.' Avoidance protected by rationalisation. Which pattern?", options: ["Excuse Blow-Out Pattern — for when avoidance is protected by rationalisations rather than real constraints", "Acceptance Pattern", "Sphere of Excellence", "Collapsing Anchors"], correct: 0, explanation: "Handbook: Excuse Blow-Out is precisely for excuses standing in for responsibility — separate story from action, then future-pace immediate follow-through." } },
  { id: 54, group: "self", statement: "Bad news doesn't rattle me — I just go straight to solving it.", options: ["Ego Strength — Stable", "Ego Strength — Unstable", "Stress Coping — Assertive", "Self Confidence — High"], correct: 0, explanation: "Faces reality calmly — the broader capacity, not the moment-to-moment coping choice." },
  { id: 55, group: "self", statement: "I feel genuinely guilty if I think I've done something wrong, even small things.", options: ["Morality — Conscientious", "Morality — Unconscientious", "Self Integrity — Conflicted", "Goal Striving — Perfectionism"], correct: 0, explanation: "Well-developed sense of right/wrong, prone to guilt." },
  { id: 56, group: "self", statement: "I'm constantly aware of exactly what I'm feeling in the moment.", options: ["Self Monitoring — High", "Self Monitoring — Low", "Emotional Containment — Uni-directional", "Attention — Self-Referent"], correct: 0, explanation: "Easy access to own inner state — turning inward comes naturally." },
  { id: 57, group: "time", statement: "I'm always thinking three steps ahead, dreaming about where this goes.", options: ["Time Zones — Future", "Time Zones — Past", "Time Zones — Present", "Motivational Direction — Towards"], correct: 0, explanation: "Attention centred on what's yet to happen — Towards is the related-but-separate motivation program." },
  { id: 58, group: "time", statement: "I can lay my whole year out like a timeline and see exactly where I am on it.", options: ["Time Experience — Through Time", "Time Experience — In Time", "Time Zones — Future", "Representational — Visual"], correct: 0, explanation: "Time held at a distance, sequential and observable — not stepped inside." },
  { id: 59, group: "time", statement: "Success for me isn't about doing more or having more — it's just about feeling whole.", options: ["Quality of Life — Being", "Quality of Life — Doing", "Quality of Life — Having", "Self Esteem — Unconditional"], correct: 0, explanation: "Internal focus, value in the experience itself." },
  { id: 60, group: "motivation", statement: "This matters more to me than almost anything else in my life right now.", options: ["Values — High Value", "Values — Low Value", "Goal Striving — Perfectionism", "Motivational Direction — Towards"], correct: 0, explanation: "Significance/energised importance — the core Values marker." },
  { id: 61, group: "verbatim", statement: "I don't want next time to be afraid of someone leaving me, or be afraid of losing my job... I just don't want that. (Jean-Charles)", options: ["Motivational Direction — Away From", "Motivational Direction — Towards", "Scenario Type — Pessimistic", "Risk Taking — Avoid"], correct: 0, explanation: "Every clause is framed as what he wants to avoid — pure Away From energy, stacked three times.", followUp: { question: "He can only state what he does NOT want. Which handbook pattern comes first?", options: ["Well-Formed Outcome Pattern — the handbook says to use it precisely when someone can define only what they don't want", "Swish Pattern on the fear images", "Collapsing Anchors on each fear", "Movie Rewind Pattern"], correct: 0, explanation: "Handbook: use Well-Formed Outcome 'before other interventions... when someone can define only what they do not want.' Build the missing Towards representation first — after pacing the avoidance, never instead of it." } },
  { id: 62, group: "verbatim", statement: "It's easy to actually plan for the worst because I know how to manage it. (Jean-Charles)", options: ["Scenario Type — Pessimistic / Worst Case", "Scenario Type — Optimistic", "Decision — Cautious", "Motivational Direction — Away From"], correct: 0, explanation: "Defaults to worst-case scanning — and note he's turned it into a competence (\"I know how to manage it\").", followUp: { question: "Worst-case scanning he's proud of ('I know how to manage it'). Which pattern expands it without attacking it?", options: ["Basic Meta-Stating — honour the planning skill, then bring curiosity/possibility as a frame over it", "De-Pleasuring Pattern on the planning habit", "Excuse Blow-Out Pattern", "Somatic Swish"], correct: 0, explanation: "The frame around the experience needs changing, not the skill itself — Meta-Stating layers a new state (curiosity, best-case scanning) over the existing one instead of replacing a genuine resource." } },
  { id: 63, group: "verbatim", statement: "There is definitely the fear of... disappointing people. It's a big thing for me. (Jean-Charles)", options: ["Attention — Other Referent", "Attention — Self-Referent", "Authority — Internal Referencing", "Dominance — Power"], correct: 0, explanation: "Others' reactions carry the emotional weight — attention centres on their needs/feelings over his own.", followUp: { question: "Fear of disappointing people — he lives in others' reactions. Which handbook pattern?", options: ["Perceptual Flexibility Pattern — he's fixated in 2nd position; rebuild a resourced 1st position", "Sphere of Excellence", "De-Pleasuring Pattern", "Strategy Elicitation (TOTE)"], correct: 0, explanation: "Handbook: use Perceptual Flexibility for 'rigid one-position thinking.' Chronic other-attention is living in 2nd position — the pattern restores the full 1st/2nd/3rd/4th range so he can visit others' views without living there." } },
  { id: 64, group: "verbatim", statement: "I feel like I've come back 12 years ago when the exact same situation happened. (Jean-Charles)", options: ["Relationship Comparison — Matching Sameness", "Relationship Comparison — Mismatching", "Time Zones — Past", "Nature — Aristotelian"], correct: 0, explanation: "\"The exact same situation\" — pattern-matching the present to a past experience. Time Zones is the close distractor, but the operative move is the sameness-match.", followUp: { question: "'Exact same situation as 12 years ago' — an old event still structuring the present. Which pattern?", options: ["Change Personal History — present reactions structured by earlier experiences that still hold emotional force", "Sphere of Excellence", "Six-Step Reframing", "Pleasure Pattern"], correct: 0, explanation: "That's the handbook's exact use-case for Change Personal History: bring adult resources to the earlier scene so present events stop re-triggering it wholesale." } },
  { id: 65, group: "verbatim", statement: "I feel like I need to come to a decision within myself about what my next career move looks like. (Brit)", options: ["Authority — Internal Referencing", "Authority — External Referencing", "Attention — Self-Referent", "Decision — Cautious"], correct: 0, explanation: "\"Within myself\" — the validation source for the decision is internal, even while she gathers outside input.", followUp: { question: "Internal Referencing client deciding a career move. Which process respects her structure?", options: ["Well-Formed Outcome Pattern — the coach supplies process questions, never the verdict", "Give her a strong recommendation to react against", "Show her what similar executives chose", "Installing Empowering Beliefs chosen by the coach"], correct: 0, explanation: "Internal-referenced clients reject supplied answers and trust self-generated ones. The Well-Formed Outcome questions scaffold her own knowing — sensory-specific, ecological, hers." } },
  { id: 66, group: "verbatim", statement: "I'm a high achiever. I get a lot of satisfaction out of my work, but at the same time, at what cost? (Brit)", options: ["Dominance — Achievement", "Dominance — Power", "Quality of Life — Having", "Goal Striving — Perfectionism"], correct: 0, explanation: "Self-identifies through accomplishment and results — with an emerging Away From note (\"at what cost\")." },
  { id: 67, group: "verbatim", statement: "My coach said aim to be CEO... and I'm like, but I'm too nice to be a CEO. I don't see that as a weakness — I see it as a strength, but it's how it's viewed in this organisation. (Brit)", options: ["Authority — Internal Referencing", "Authority — External Referencing", "Self Confidence — Low", "Conventional — Conformist"], correct: 0, explanation: "She holds her own evaluation (\"strength\") against both her coach's and the organisation's framing — internal referencing under external pressure." },
  { id: 68, group: "verbatim", statement: "I have a lot of fear in my being that limits my choices... a lot of fear is based on future projection of things that haven't happened. (Julie)", options: ["Motivational Direction — Away From", "Time Zones — Future", "Scenario Type — Pessimistic", "Modus Operandi — Impossibility"], correct: 0, explanation: "Fear as the limiter of choices is Away From. She's also self-aware that the feared content is future projection — a nice stacked read." },
  { id: 69, group: "verbatim", statement: "What happens if I'm seen and heard? I feel totally vulnerable and exposed and terrible things will happen. That's just been my modus operandi from a child. (Julie)", options: ["Scenario Type — Pessimistic / Worst Case", "Movie Position — Inside", "Exuberance — Desurgency", "Self Esteem — Conditional"], correct: 0, explanation: "\"Terrible things will happen\" — automatic worst-case projection, running since childhood.", followUp: { question: "A childhood-installed 'if I'm seen, terrible things happen' belief. Which pattern addresses it at source?", options: ["Reimprinting Pattern — identity and emotion shaped by a strong early imprint", "Sphere of Excellence before presentations", "Swish Pattern on the fear image", "Excuse Blow-Out Pattern"], correct: 0, explanation: "She named it herself: 'from a child.' Handbook: use Reimprinting 'when identity, emotion, or relationship patterns are shaped by a strong early imprint.' Surface rehearsal leaves the root decision running." } },
  { id: 70, group: "verbatim", statement: "I need accountability. I need to have some action that comes up from within me... something that I know will create lasting change. (Julie)", options: ["Authority — Internal Referencing", "Authority — External Referencing", "Modus Operandi — Necessity", "Convincer Demo. — Time Period"], correct: 0, explanation: "Trap: \"accountability\" sounds external, but her stated requirement is that action arise \"from within me\" — the deciding source is internal.", followUp: { question: "'Action must come from within me... lasting change.' Which pattern generates that internal fuel?", options: ["State Accessing and Anchoring — elicit the resourced state and anchor it to her own self-fired cue", "External accountability app with reminders", "Coach-imposed weekly targets", "Public commitment to friends"], correct: 0, explanation: "Everything external violates her stated condition. A self-anchored resource state IS action arising from within — matching both her Internal Referencing and her lasting-change criterion." } },
  { id: 71, group: "verbatim", statement: "Before, I keep saying things like: I can't do this, I can't do that, I'll never achieve this. (Nicole)", options: ["Modus Operandi — Impossibility", "Modus Operandi — Necessity", "Self Confidence — Low", "Scenario Type — Pessimistic"], correct: 0, explanation: "\"Can't... can't... never\" — the impossibility modal operators, mapped-out laws against her own options.", followUp: { question: "'I can't... I'll never...' — old limiting decisions running her behaviour. Which handbook pattern?", options: ["Decision Destroyer — built exactly for old decisions like 'I can't' that still run behaviour", "Pleasure Pattern", "Sphere of Excellence", "Strategy Elicitation (TOTE)"], correct: 0, explanation: "Handbook: use Decision Destroyer 'when old decisions such as I'm-not-enough or I-can't are still running behaviour.' Meta-Yes/Meta-No is the companion move: Meta-No the limit, Meta-Yes the empowering replacement." } },
  { id: 72, group: "verbatim", statement: "There are so many providers, and some are really old school. I really like them as people, but I just know I can't learn from them. (Cassidy)", options: ["Epistemological — Intuitor", "Epistemological — Sensor", "Authority — External Referencing", "Social Convincer — Distrusting"], correct: 0, explanation: "\"I just know\" — no evidence cited, an inner read she trusts. Intuitor gathering from the inside.", followUp: { question: "'I just know I can't learn from them.' How do you make an Intuitor's knowing usable?", options: ["Strategy Elicitation (TOTE) — make the unconscious process visible so the intuition becomes a calibrated instrument", "Demand behavioural evidence before honouring it", "Override it with a pros/cons matrix", "Treat it as resistance to reframe away"], correct: 0, explanation: "Handbook: TOTE is for 'making an unconscious process visible.' Eliciting how she knows — the sequence, the tests — turns a black box into something she can trust deliberately." } },
  { id: 73, group: "verbatim", statement: "I was never this articulate growing up. I was an introvert. If I can go from that to this, I can certainly go from this to something else. (Swetha)", options: ["Modus Operandi — Possibility", "Modus Operandi — Desire", "Time Zones — Past", "Change Adaptor — Open"], correct: 0, explanation: "\"I can... I can certainly\" — possibility modals, using her own past change as proof of agency." },
  { id: 74, group: "verbatim", statement: "That's how I think I am, actually. I've always been that way — so concerned about what other people think. (Renee)", options: ["Authority — External Referencing", "Authority — Internal Referencing", "Attention — Other Referent", "Social Presentation — Artfully Shrewd"], correct: 0, explanation: "\"Concerned about what other people think\" is the doc's own External Referencing marker — evaluation lives outside her.", followUp: { question: "Lifelong External Referencing ('so concerned what others think'). Which pattern builds the internal ground?", options: ["Sense of Self Pattern — for over-reliance on others/performance for worth; builds unconditional self-frame", "Tell her to stop caring what people think", "Remove all feedback sources cold-turkey", "De-Pleasuring Pattern on approval"], correct: 0, explanation: "Handbook: Sense of Self is for weak self-frame and worth outsourced to performance or others. Layer acceptance → appreciation → esteem, then sequence self-check before others' input." } },
  { id: 75, group: "verbatim", statement: "I went to Claude AI and said: this is what I'm struggling with, this is what I want to work on. I want to be able to be with the best. Where do I start? (Jean-Charles)", options: ["Buying — Quality", "Buying — Cost", "Buying — Time", "Goal Striving — Perfectionism"], correct: 0, explanation: "\"I want to be with the best\" — the first purchase filter is quality, not price or speed." },
  { id: 76, group: "verbatim", statement: "I can see it's going to make me think a little differently, because I'm pretty set in some of my ways or some of my practices. (Becoming a Coach caller)", options: ["Change Adaptor — Closed to Change (self-aware)", "Change Adaptor — Open to Change", "Durability — Impermeable", "Conventional — Conformist"], correct: 0, explanation: "\"Pretty set in my ways\" — self-identified closed-to-change pattern, though he's deliberately opening it." },
  { id: 77, group: "verbatim", statement: "I used to set a mental target that I have to do some physical activity six days a week or seven days a week. (Shashi)", options: ["Modus Operandi — Necessity", "Modus Operandi — Choice", "Adaptation — Judging", "Goal Striving — Perfectionism"], correct: 0, explanation: "\"Have to\" — necessity modal; motivation framed as compulsion rather than desire or choice.", followUp: { question: "'I have to exercise six or seven days a week' — necessity pressure, weak ownership. Which pattern?", options: ["Intentionality Pattern — elicit the meaning hierarchy ('what's important about that?') until have-to becomes choose-to", "De-Pleasuring Pattern on exercise", "Movie Rewind", "Collapsing Anchors"], correct: 0, explanation: "Handbook: use Intentionality when 'motivation is weak or the activity lacks significance.' Climbing the why-ladder converts compulsion into meaning-driven choice without losing the behaviour." } },
  { id: 78, group: "verbatim", statement: "I just want to have a bit more structure, you know, understand things a little bit more... because everything is from experiential — my own knowledge, my own journey. (Coach Pathway caller)", options: ["Operational Style — Procedures (seeking)", "Operational Style — Options", "Scale — Detail", "Epistemological — Sensor"], correct: 0, explanation: "She's been running on self-generated experience and is explicitly asking for structure/frameworks — a procedures-seeking move." },
  { id: 101, group: "motivation", statement: "I just need to get away from all this stress — I don't even care where to, as long as it's not this.", options: ["Motivational Direction — Away From", "Motivational Direction — Towards", "Scenario Type — Pessimistic", "Risk Taking — Avoid"], correct: 0, explanation: "Motivation is pushed by what he's escaping, with no destination defined — classic Away From." },
  { id: 102, group: "thinking", statement: "Give me specifics — dates, numbers, exact steps. The big-vision talk does nothing for me.", options: ["Scale — Detail", "Scale — Global", "Information Kind — Quantitative", "Operational Style — Procedures"], correct: 0, explanation: "Chunks small first — needs the specifics before (or instead of) the overview." },
  { id: 103, group: "thinking", statement: "This is basically the same situation we had last year with the Henderson account.", options: ["Relationship Comparison — Matching", "Relationship Comparison — Mismatching", "Time Zones — Past", "Nature — Aristotelian"], correct: 0, explanation: "First move is finding sameness with past experience — Matching." },
  { id: 104, group: "info", statement: "I finished the certification, and it counts — I'm adding it to my list of proof that I can do this.", options: ["Information Staging — Counting", "Information Staging — Discounting", "Self Confidence — High", "Goal Striving — Optimizing"], correct: 0, explanation: "Foregrounds the win and registers it as evidence — the opposite of discounting." },
  { id: 105, group: "thinking", statement: "Sure there are risks, but my mind goes straight to how well this could turn out.", options: ["Scenario Type — Optimistic", "Scenario Type — Pessimistic", "Motivational Direction — Towards", "Risk Taking — Approach"], correct: 0, explanation: "Default scan is toward the best case — the scenario filter, not the motivation direction." },
  { id: 106, group: "thinking", statement: "It's not simply good or bad — there are degrees, and it depends on the angle you take.", options: ["Classification Scale — Continuum", "Classification Scale — Either-Or", "Classification Scale — Multi-Dimensional", "Durability — Permeable"], correct: 0, explanation: "Grades experience along a scale with grey zones rather than binary categories." },
  { id: 107, group: "thinking", statement: "I can't work in that office — every conversation and every ringing phone drags my attention away.", options: ["Focus — Non-Screening", "Focus — Screening", "Stream of Consciousness — Diffused", "Rejuvenation — Introvert"], correct: 0, explanation: "External stimuli get through — she cannot filter the environment out. Diffused is internal; this is external." },
  { id: 108, group: "thinking", statement: "I can't move on until I understand why this happened in the first place.", options: ["Philosophical — Why", "Philosophical — How", "Causation — Personal", "Completion — Closure"], correct: 0, explanation: "Origin-focused — needs the reason before the remedy." },
  { id: 109, group: "communication", statement: "Forget the body language — tell me the exact words he used.", options: ["Communication Channel — Verbal", "Communication Channel — Non-Verbal", "Representational — Auditory", "Directness — Direct/Low Context"], correct: 0, explanation: "Sorts for the words themselves over tone, posture, or cues." },
  { id: 110, group: "info", statement: "The market crashed — that's why we missed target. Nothing we did caused it.", options: ["Causation — External", "Causation — Personal", "Responsibility Sort — Under", "Authority — External Referencing"], correct: 0, explanation: "Locates cause entirely outside self/team. Under-responsibility is the ownership cousin; this is the causation filter itself." },
  { id: 111, group: "info", statement: "I've got five half-finished projects on the go and honestly, it doesn't bother me at all.", options: ["Completion — Non-Closure", "Completion — Closure", "Adaptation — Perceiving", "Persistence — Patient"], correct: 0, explanation: "Open loops carry no tension for him — comfortable without closure." },
  { id: 112, group: "info", statement: "Don't show me the survey scores — tell me the stories behind them, what people actually meant.", options: ["Information Kind — Qualitative", "Information Kind — Quantitative", "Preference — Information", "Representational — Language"], correct: 0, explanation: "Wants meaning-rich description over measurement." },
  { id: 113, group: "thinking", statement: "I'd rather do it the way it's always been done — there's a reason it became the standard.", options: ["Conventional — Conformist", "Conventional — Non-Conformist", "Change Adaptor — Closed", "Operational Style — Procedures"], correct: 0, explanation: "Sorts for social propriety and the established way — fitting in is the value." },
  { id: 114, group: "thinking", statement: "Give me a day with the question — I think best when I'm not rushed.", options: ["Speed — Deliberate & Slow", "Speed — Quick & Witty", "Decision — Cautious", "Somantic Response — Inactive/Reflective"], correct: 0, explanation: "Thought-pace itself is slow and thorough — distinct from how hard decisions feel." },
  { id: 115, group: "decisions", statement: "Once I heard the CEO explain it in her own words, I was sold.", options: ["Convincer Rep. — Sounds Right", "Convincer Rep. — Makes Sense", "Convincer Rep. — Looks Right", "Representational — Auditory"], correct: 0, explanation: "What convinced was the spoken delivery — hearing it made it credible." },
  { id: 116, group: "decisions", statement: "Show me it working three or four times — then I'll believe it.", options: ["Convincer Demo. — Repetitions", "Convincer Demo. — Automatic", "Convincer Demo. — Time Period", "Convincer Demo. — Never"], correct: 0, explanation: "Needs a set number of demonstrations before belief locks in." },
  { id: 117, group: "emotional", statement: "When I think about that day, I'm right back inside it — I feel everything all over again.", options: ["Movie Position — Inside", "Movie Position — Outside", "Emotional Containment — Multi-directional", "Self Monitoring — High"], correct: 0, explanation: "Re-lives the memory associated, from within — not watching from a distance.", followUp: { question: "She re-enters a painful memory fully associated every time it comes up. Which handbook pattern changes the encoding?", options: ["Movie Rewind Pattern — step out to the projection booth, watch dissociated, then rewind fast until the charge drops", "Well-Formed Outcome", "Excuse Blow-Out", "Meta-Alignment"], correct: 0, explanation: "The problem is position — she's locked inside the movie. Movie Rewind installs the dissociated viewing position and then scrambles the replay so it can't retrigger at full intensity." } },
  { id: 118, group: "self", statement: "I don't trust my own judgment on this — what do the experts say?", options: ["Authority — External Referencing", "Authority — Internal Referencing", "Self Confidence — Low", "Social Convincer — Trusting"], correct: 0, explanation: "The check for being right lives outside — in experts, data, others' verdicts." },
  { id: 119, group: "emotional", statement: "After a brutal week, I need a big dinner with friends — being around people fills me back up.", options: ["Rejuvenation — Extrovert", "Rejuvenation — Introvert", "Dominance — Affiliation", "Exuberance — Surgency"], correct: 0, explanation: "Recharges through company — energy returns from contact, not solitude." },
  { id: 120, group: "emotional", statement: "I never respond in the moment — I go quiet, sleep on it, and come back tomorrow.", options: ["Somantic Response — Inactive/Reflective", "Somantic Response — Active/Reactive", "Speed — Deliberate & Slow", "Stress Coping — Passive"], correct: 0, explanation: "The action pattern is to withhold response and process first — reflection before movement." },
  { id: 121, group: "work", statement: "Don't hand me a script — give me the goal and let me find my own way there.", options: ["Operational Style — Options", "Operational Style — Procedures", "Self Instruction — Strong Willed", "Work Style — Independent"], correct: 0, explanation: "Wants alternatives and freedom of route — procedures feel like a cage." },
  { id: 122, group: "work", statement: "I keep my calendar loose on purpose — I'd rather stay open and adjust as things unfold.", options: ["Adaptation — Perceiving", "Adaptation — Judging", "Change Adaptor — Open", "Operational Style — Options"], correct: 0, explanation: "Adapts self to the flow of events rather than making events fit a plan." },
  { id: 123, group: "motivation", statement: "I don't have to do any of this — I get to. And there are a dozen ways it could go.", options: ["Modus Operandi — Possibility", "Modus Operandi — Necessity", "Modus Operandi — Choice", "Motivational Direction — Towards"], correct: 0, explanation: "Runs on \"can/get to\" and open possibility rather than compulsion." },
  { id: 124, group: "decisions", statement: "I decide fast and commit hard — hesitation costs more than the occasional mistake.", options: ["Decision — Bold", "Decision — Cautious", "Risk Taking — Approach", "Speed — Quick & Witty"], correct: 0, explanation: "Decision-making itself is easy and immediate — the deciding, not the thinking speed or risk appetite." },
  { id: 125, group: "time", statement: "Success for me is the doing — shipping, building, producing. Sitting still feels like going backwards.", options: ["Quality of Life — Doing", "Quality of Life — Being", "Quality of Life — Having", "Persistence — Impatient"], correct: 0, explanation: "Value lives in activity and output — the Doing mode of the quality-of-life sort." },
  { id: 126, group: "verbatim", statement: "The thing that's always in my mind now is what am I going to do later — people say retirement, but what will keep me active during that phase of life? (Arun)", options: ["Time Zones — Future", "Motivational Direction — Away From", "Scenario Type — Pessimistic", "Quality of Life — Being"], correct: 0, explanation: "His attention keeps landing decades ahead — planning the later phase of life. The content is sometimes fearful, but the sorting is temporal: Future zone." },
  { id: 127, group: "verbatim", statement: "I'm a quick decision maker. I'll pick the information and make the decision based on the facts today, rather than over-analysing. If something was missing, I'd still decide on what I see. (Arun)", options: ["Decision — Bold", "Speed — Quick & Witty", "Risk Taking — Approach", "Epistemological — Sensor"], correct: 0, explanation: "Deciding itself is easy and immediate, even with incomplete information — the decision program, not raw thought-pace." },
  { id: 128, group: "verbatim", statement: "People matter, who is who — but I'll go with straight raw facts and information, what I see, and work from that. (Arun)", options: ["Epistemological — Sensor", "Epistemological — Intuitor", "Information Kind — Quantitative", "Communication Channel — Verbal"], correct: 0, explanation: "Gathers information from observable external facts — the Sensor pole of the epistemology sort." },
  { id: 129, group: "verbatim", statement: "There's nobody else — every decision is what I have to make. I won't depend on somebody to validate; the only thing I reach outside for is feedback. (Arun)", options: ["Authority — Internal Referencing", "Authority — External Referencing", "Attention — Self-Referent", "Self Confidence — High"], correct: 0, explanation: "The locus of evaluation is inside — external input is welcome as data (feedback), never as the verdict." },
  { id: 130, group: "verbatim", statement: "I don't want to be bound to one thing. The word that comes to mind is reincarnate myself — I can learn, practice, structure myself into whatever that next thing is. (Arun)", options: ["Modus Operandi — Possibility", "Modus Operandi — Necessity", "Change Adaptor — Open", "Self Experience — Role/Position"], correct: 0, explanation: "Life framed as an open field of \"can\" — possibility language stacked with explicit rejection of being bound." },
  { id: 131, group: "verbatim", statement: "I have a very restricted, proper schedule — this is allocated to mornings, that's for weekends, and I won't do things after a particular time. (Arun)", options: ["Adaptation — Judging", "Adaptation — Perceiving", "Operational Style — Procedures", "Focus — Screening"], correct: 0, explanation: "Life is made to fit the plan — time is pre-structured and defended. The Judging pole of the adaptation sort." },
  { id: 132, group: "verbatim", statement: "Going the other way around, I'd have to assume a lot of things, and that doesn't serve me — so I go with the assumption that it's all going to be good. (Arun)", options: ["Scenario Type — Optimistic", "Scenario Type — Pessimistic", "Durability — Impermeable", "Risk Taking — Approach"], correct: 0, explanation: "Deliberate best-case default — he's even articulate about why worst-case scanning costs him more than it protects." },
  { id: 133, group: "verbatim", statement: "I have a family, two kids — whatever decisions I make flow through to the others. So I always think about the repercussions on them rather than thinking about myself much. (Arun)", options: ["Attention — Other Referent", "Authority — External Referencing", "Responsibility Sort — Over", "Dominance — Affiliation"], correct: 0, explanation: "Whose needs the decision centres on — the family's. Note he stays internally referenced (he decides); the attention sort is about who the decision is for." },
  { id: 134, group: "verbatim", statement: "Being a team player is the driver — I won't be the one standing on the other side of the fence from the group. (Arun)", options: ["Work Style — Team Player", "Interactive — Competitive", "Conventional — Conformist", "Relationship Comparison — Matching"], correct: 0, explanation: "Identity and energy organised around belonging to the group effort — the work-style sort." },
  { id: 135, group: "verbatim", statement: "In high school I'd rather not submit an assignment than submit it and get a bad grade. I'm an all-or-nothing person. (Elena)", options: ["Classification Scale — Either-Or", "Goal Striving — Perfectionism", "Self Esteem — Conditional", "Decision — Cautious"], correct: 0, explanation: "\"All-or-nothing\" is the tell — experience sorted into two absolute categories with no middle. Perfectionism is the close cousin driving it, but the classification scale is the named structure." },
  { id: 136, group: "verbatim", statement: "I'm always stuck in the past, and it's so hard to get rid of that link — especially past connections. I use the past as a reference, but I'm not really living here. (Elena)", options: ["Time Zones — Past", "Time Experience — In Time", "Movie Position — Inside", "Completion — Non-Closure"], correct: 0, explanation: "Attention habitually centres on what has already happened — the Past time-zone sort, strong enough that the present feels unoccupied.", followUp: { question: "Past-anchored emotion she can't release, spiraling when she revisits it. Which handbook pattern targets this directly?", options: ["Releasing Negative Emotions — float above the time-line, revisit the event from a dissociated position, and release the stored emotion", "Swish Pattern", "Sphere of Excellence", "Excuse Blow-Out"], correct: 0, explanation: "The charge lives in past events on her time-line. The time-line release pattern works from a dissociated position above the event — exactly the structure she needs instead of associated re-living." } },
  { id: 137, group: "verbatim", statement: "If you told me I was really sad and crying all last week, I wouldn't remember what that felt like at all. I forget how I feel most of the time. (Elena)", options: ["Self Monitoring — Low", "Movie Position — Outside", "Emotional Containment — Uni-directional", "Ego Strength — Stable"], correct: 0, explanation: "Limited ongoing access to her own emotional state — the low pole of self-monitoring (dates and times she remembers fine)." },
  { id: 138, group: "verbatim", statement: "I've never done anything actually horrible, but the small things get me so guilty — after I smoke I take shorter breaths on purpose because I don't feel worthy of a real breath. (Elena)", options: ["Morality — Conscientious", "Self Esteem — Conditional", "Goal Striving — Perfectionism", "Stress Coping — Passive"], correct: 0, explanation: "An over-developed guilt response to minor transgressions — the conscientious pole, here turned into self-punishment.", followUp: { question: "Guilt that converts into self-punishment (restricting her own breath). Which pattern changes her relationship to herself here?", options: ["Acceptance Pattern — replace the self-rejection frame with acceptance so worth stops being forfeited by mistakes", "Collapsing Anchors on the guilt", "Strategy Elicitation (TOTE)", "Intentionality Pattern"], correct: 0, explanation: "The structure is rejection of self on the back of a behaviour. Acceptance re-frames the relationship to the mistake — the behaviour can change without worth being on trial." } },
  { id: 139, group: "verbatim", statement: "I look back at the past and think what I could have done better, how I could have helped somebody better — and it stirs up, like, self-shame. (Elena)", options: ["Goal Striving — Perfectionism", "Causation — Personal", "Time Zones — Past", "Morality — Conscientious"], correct: 0, explanation: "Retrospective measurement against an impossible standard — never good enough, applied backwards through time." },
  { id: 140, group: "verbatim", statement: "I'm typically quite a confident person — but on a stage, being seen like that? Someone called it a fear of big-upping yourself. (Tessa)", options: ["Self Confidence — High", "Self Confidence — Low", "Self Esteem — Unconditional", "Social Presentation — Artfully Shrewd"], correct: 0, explanation: "Trap question: her confidence (belief in her skills) is genuinely high. The stage discomfort is an identity/esteem-level issue about visibility — a different program than capability-confidence.", followUp: { question: "Confident in skill, but visibility on a stage threatens something deeper. Which identity-level pattern?", options: ["Sense of Self Pattern — build unconditional self-acceptance and esteem so being seen stops putting worth on the line", "Swish Pattern on the stage image", "Well-Formed Outcome", "Movie Rewind"], correct: 0, explanation: "Same structure as fear of being seen and heard: exposure only threatens a conditional sense of self. Ground worth as unconditional, and the stage becomes a place to perform rather than be judged into existence." } },
];

// ---------- Rep Systems bank (identify skills) ----------
const REP_GROUPS = {
  identify: "Identify",
  idiom: "Idiom Traps",
  failed: "Failed Channel",
  verbatim: "Real Clients",
};

const RQ = [
  { id: 1, group: "identify", statement: "I need to see the org chart before this makes any sense to me.", options: ["Visual", "Auditory", "Kinaesthetic", "Language"], correct: 0, explanation: "\"See\" + \"makes sense\" via viewing — literal Visual." },
  { id: 2, group: "identify", statement: "Walk me through it verbally — I don't want to read the report, just tell me what happened.", options: ["Auditory", "Visual", "Language", "Kinaesthetic"], correct: 0, explanation: "Explicitly rejects reading, wants spoken delivery — Auditory." },
  { id: 3, group: "identify", statement: "Give me the criteria in a list — the exact wording of the policy.", options: ["Language", "Visual", "Auditory", "Kinaesthetic"], correct: 0, explanation: "Precise wording, lists, criteria — lives in words themselves." },
  { id: 4, group: "identify", statement: "Something about this deal just doesn't sit right with me.", options: ["Kinaesthetic", "Auditory", "Visual", "Language"], correct: 0, explanation: "\"Doesn't sit right\" — felt-sense signal, body-based." },
  { id: 5, group: "identify", statement: "Your voice got quieter right at the part about the budget cuts — that's the bit that stuck with me.", options: ["Auditory", "Visual", "Kinaesthetic", "Language"], correct: 0, explanation: "Tone and volume shift — sensitivity to vocal quality is Auditory. \"Stuck with me\" is mild idiom." },
  { id: 6, group: "identify", statement: "I keep replaying that conversation in my head, hearing his exact words.", options: ["Auditory", "Visual", "Language", "Kinaesthetic"], correct: 0, explanation: "What's replaying is dialogue — sound, not a scene." },
  { id: 7, group: "identify", statement: "Give me the three main points as bullet points — not the whole story.", options: ["Language", "Auditory", "Visual", "Kinaesthetic"], correct: 0, explanation: "No sensory verb — the tell is the format: discrete, ordered list items." },
  { id: 8, group: "identify", statement: "I can't move forward until I've got a proper grip on the situation.", options: ["Kinaesthetic", "Language", "Visual", "Auditory"], correct: 0, explanation: "\"Grip\" is physical metaphor in an abstract context — the hardest Kinaesthetic tell to catch." },
  { id: 9, group: "identify", statement: "I want to sit down and map this out — but what matters is that when I look at the final plan, it clicks.", options: ["Visual", "Kinaesthetic", "Language", "Auditory"], correct: 0, explanation: "\"Map out\" is loose idiom; the literal, deciding phrase is \"look at... clicks\" — Visual snap-into-place." },
  { id: 10, group: "identify", statement: "When she explained the plan, her tone made me uneasy — it didn't sit right.", options: ["Auditory + Kinaesthetic", "Auditory only", "Kinaesthetic only", "Visual + Auditory"], correct: 0, explanation: "Input channel is Auditory (tone); the reaction is Kinaesthetic (didn't sit right). Two channels stacked." },
  { id: 11, group: "idiom", statement: "I hear what you're saying, but I need to see it play out in front of me before I'll believe it.", options: ["Visual — \"see it play out\" is literal; \"I hear you\" is idiom", "Auditory — \"I hear you\" is literal", "Both equally", "Kinaesthetic — \"believe it\" is felt"], correct: 0, explanation: "\"I hear you\" = idiomatic acknowledgment. The specific phrase carries the signal." },
  { id: 12, group: "idiom", statement: "I see what you mean, but until I've actually held the product in my hands, I won't know if it's any good.", options: ["Kinaesthetic — \"held in my hands\" is literal; \"I see\" is idiom", "Visual — \"I see what you mean\" is literal", "Language — \"any good\" is evaluative", "Both Visual and Kinaesthetic equally"], correct: 0, explanation: "Generic opener is filler; \"held in my hands\" is the real, specific signal." },
  { id: 13, group: "idiom", statement: "Look, I get it — but if the numbers don't add up on paper, I'm not moving forward.", options: ["Language — \"numbers add up on paper\" is literal", "Visual — \"look\" is the signal", "Kinaesthetic — \"moving forward\"", "Auditory — \"I get it\""], correct: 0, explanation: "\"Look\" and \"I get it\" are both filler. The deciding phrase is logical/written reconciliation." },
  { id: 14, group: "idiom", statement: "I feel you on this, but what convinces me is watching someone else pull it off first.", options: ["Visual / Looks Right — \"watching someone pull it off\"", "Kinaesthetic — \"I feel you\" is literal", "Auditory — \"convinces\" is verbal", "Both feel and watch equally"], correct: 0, explanation: "\"I feel you\" = idiom family with \"I hear you.\" The literal signal is witnessing proof." },
  { id: 15, group: "idiom", statement: "I want to walk through it step by step before I commit.", options: ["Language — sequential, ordered steps", "Kinaesthetic — \"walk through\" is physical", "Visual — imagining the walk", "Auditory — talking it through"], correct: 0, explanation: "\"Walk through\" is a common idiom for \"go over in order\" — the real request is a structured sequence." },
  { id: 16, group: "idiom", statement: "Once I get a feel for how the team responds to this change, I'll know whether to move forward.", options: ["Sensor (Epistemological) — gathering observed evidence", "Kinaesthetic — literal feeling", "Convincer — Feels Right", "Auditory — listening to the team"], correct: 0, explanation: "\"Get a feel for\" is idiom for observing reactions — evidence-gathering, not body sensation. Not a rep system at all." },
  { id: 17, group: "idiom", statement: "I don't trust it until the numbers add up on paper.", options: ["Convincer — Makes Sense (not a rep system)", "Language — words on paper", "Visual — seeing the paper", "Kinaesthetic — trust is felt"], correct: 0, explanation: "This answers \"what convinces you\" — Convincer Rep., not how they process generally." },
  { id: 18, group: "failed", statement: "He kept talking and talking, but none of it landed until he sketched it on the whiteboard — then it clicked.", options: ["Auditory failed → Visual succeeded", "Visual failed → Auditory succeeded", "Language failed → Kinaesthetic succeeded", "Kinaesthetic failed → Visual succeeded"], correct: 0, explanation: "Spoken input failed; the sketch is where understanding landed. Lean into the channel that worked." },
  { id: 19, group: "failed", statement: "Every time I try to explain it, the words don't land — but when we built the model with our hands, everything clicked.", options: ["Language failed → Kinaesthetic succeeded", "Auditory failed → Visual succeeded", "Visual failed → Kinaesthetic succeeded", "Language failed → Visual succeeded"], correct: 0, explanation: "Verbal/word explanation failed; hands-on building worked." },
  { id: 20, group: "failed", statement: "I stared at the diagram for an hour and nothing made sense — until my mentor told me plainly, in one sentence, what the point was.", options: ["Visual failed → Language succeeded", "Visual failed → Auditory succeeded", "Language failed → Auditory succeeded", "Kinaesthetic failed → Language succeeded"], correct: 0, explanation: "The emphasis is \"one plain sentence\" — conciseness/precision of wording (Language), not vocal tone (Auditory)." },
  { id: 21, group: "failed", statement: "I read the spec sheet twice and nothing clicked — until I watched the demo video, then it made sense.", options: ["Language failed → Visual succeeded", "Visual failed → Language succeeded", "Auditory failed → Visual succeeded", "Language failed → Kinaesthetic succeeded"], correct: 0, explanation: "Reading failed; watching worked. Build the next step around video/visuals, not more documents." },
  { id: 22, group: "verbatim", statement: "Failure and rejection — they don't mean as much as they used to. They're just knee-jerk responses and they don't actually have much weight anymore. (Ellie)", options: ["Kinaesthetic", "Language", "Visual", "Auditory"], correct: 0, explanation: "\"Knee-jerk\" and \"weight\" — physical metaphors carrying the real signal in an abstract topic.", followUp: { question: "'Failure and rejection don't carry much weight anymore.' What likely produced that shift — and what maintains it?", options: ["Collapsing Anchors — the old triggers were fired against stronger resource states until the charge dissolved", "De-Pleasuring Pattern", "Excuse Blow-Out", "Strategy Elicitation (TOTE)"], correct: 0, explanation: "When old negative anchors lose their charge, that's the collapsing-anchors signature: resource state and trigger activated together until physiology shifts. Reinforce by re-firing the resource anchor if residue returns." } },
  { id: 23, group: "verbatim", statement: "I don't know... probably just grounded, probably just grounded about here — where you can't really see that on the screen. (Ellie, gesturing to her body)", options: ["Kinaesthetic", "Visual", "Auditory", "Language"], correct: 0, explanation: "Locates the state physically in her body (\"about here\") — literal felt-sense processing." },
  { id: 24, group: "verbatim", statement: "If it's flashing and it's red, then it's incongruent... I have to change the colour and the way that's showing up. I need to do some work on revisualising that. (Ellie)", options: ["Visual", "Kinaesthetic", "Language", "Auditory"], correct: 0, explanation: "Colour, flashing, revisualising — she codes internal states as images she can literally edit.", followUp: { question: "She's already editing colour and flashing. Which handbook pattern is she natively running?", options: ["Swish Pattern — submodality contrast (red→yellow, flashing→steady) drives the change", "Six-Step Reframing", "Time-Line Awareness", "Excuse Blow-Out"], correct: 0, explanation: "Colour, brightness, movement are the Swish's raw material. She's a natural — make the editing deliberate: old cue fades while the desired self-image becomes large, bright, central." } },
  { id: 25, group: "verbatim", statement: "When I have a deliverable, I have a mental map — the deliverable should look like this, or the way I present it should be like this. (Shashi)", options: ["Visual", "Language", "Kinaesthetic", "Auditory"], correct: 0, explanation: "A mental image of the ideal output he compares reality against — \"should look like this.\"", followUp: { question: "His ideal-deliverable image triggers self-criticism when reality falls short. Which pattern?", options: ["Acceptance Pattern — for harsh self-judgment; accept the gap, keep the standard as direction not verdict", "Delete the mental map entirely", "Sphere of Excellence at his desk", "De-Pleasuring the deliverable"], correct: 0, explanation: "Handbook: Acceptance is for 'harsh self-judgment and chronic inner struggle.' The standard isn't the problem — the pass/fail frame is. Acceptance removes the secondary self-attack loop." } },
  { id: 26, group: "verbatim", statement: "I don't know whether it was upset, or fear... I'm not afraid of her. She looks normal. But I don't know why my legs were shaking. (Renee)", options: ["Kinaesthetic — body signalling before conscious awareness", "Visual — \"she looks normal\"", "Language — labelling emotions", "Auditory"], correct: 0, explanation: "Her body is carrying the signal (\"legs shaking\") ahead of her conscious read — a Kinaesthetic channel she hasn't yet learned to listen to.", followUp: { question: "Her legs shake before she consciously registers fear — a body-first trigger. Which pattern?", options: ["Somatic Swish — built for reactions that begin as felt sensations and body-based triggers", "Standard visual Swish", "Excuse Blow-Out", "Well-Formed Outcome"], correct: 0, explanation: "Handbook: use Somatic Swish for 'reactions that begin as felt sensations.' The cue is somatic, so the intervention must start in the body — spin the old sensation into the new response." } },
  { id: 27, group: "verbatim", statement: "Definition of words and structure, I suppose — forming the right sentences for the right reactions, to captivate people. (Georgette)", options: ["Language", "Auditory", "Visual", "Kinaesthetic"], correct: 0, explanation: "Definitions, structure, sentences — she lives in the words themselves and wants precision with them." },
  { id: 28, group: "verbatim", statement: "Words really carry very important information and energies. I noticed I keep saying the wrong things — I should say something differently. (Nicole)", options: ["Language", "Auditory", "Kinaesthetic", "Visual"], correct: 0, explanation: "The unit she works in is the words themselves — their exact form and what they carry." },
  { id: 29, group: "verbatim", statement: "I'm writing down everything you say — but yeah, that actually sounds like a good plan, I think. (Cassidy)", options: ["Language — \"writing everything down\" is the behaviour; \"sounds like\" is idiom", "Auditory — \"sounds like\" is literal", "Both equally", "Visual — she's reading her notes"], correct: 0, explanation: "\"Sounds like a good plan\" is everyday idiom. The real, observable channel is capturing exact words in writing." },
  { id: 30, group: "verbatim", statement: "I can see it's going to make me think a little differently, because I'm pretty set in some of my ways. (Becoming a Coach caller)", options: ["No strong rep signal — \"I can see\" is idiomatic here", "Visual — \"I can see\" is literal", "Kinaesthetic — \"set in my ways\"", "Language — \"think differently\""], correct: 0, explanation: "\"I can see\" = \"I understand/anticipate\" — the idiom family. Nothing else in the sentence carries literal sensory weight." },
  { id: 31, group: "verbatim", statement: "If I'm seen and heard, I feel totally vulnerable and exposed. (Julie)", options: ["Kinaesthetic — \"vulnerable and exposed\" is the felt reaction", "Visual + Auditory — \"seen and heard\" is her channel", "Language", "Auditory only"], correct: 0, explanation: "\"Seen and heard\" describes what others do; her own processing of it is the felt state — vulnerable, exposed.", followUp: { question: "'Seen and heard = vulnerable and exposed.' She wants to stand up as herself. Which identity-level pattern?", options: ["Sense of Self Pattern — build unconditional acceptance → appreciation → esteem so visibility stops threatening worth", "De-Pleasuring visibility", "Strategy Elicitation (TOTE)", "Pleasure Pattern"], correct: 0, explanation: "Exposure only threatens a conditional self. The Sense of Self Pattern separates core worth from performance and others' reactions — the ground she needs before choosing to be visible." } },
  { id: 101, group: "identify", statement: "The whole plan is laid out in my head like a map — I can zoom in on any part of it.", options: ["Visual", "Language", "Kinaesthetic", "Auditory"], correct: 0, explanation: "Spatial layout, zooming — she's operating on an internal image." },
  { id: 102, group: "identify", statement: "Something in her phrasing rang alarm bells — the words were fine, but the rhythm was off.", options: ["Auditory", "Language", "Kinaesthetic", "Visual"], correct: 0, explanation: "Rhythm, ring, phrasing-as-sound — sensitivity to how it sounded, not what was said." },
  { id: 103, group: "identify", statement: "The moment I walked in, the tension hit me — you could feel it in the room.", options: ["Kinaesthetic", "Visual", "Auditory", "Language"], correct: 0, explanation: "Atmosphere registered as physical impact — felt-sense first." },
  { id: 104, group: "identify", statement: "I'll believe it when it's in the contract — defined, with every term pinned down.", options: ["Language", "Visual", "Kinaesthetic", "Auditory"], correct: 0, explanation: "The unit of trust is exact wording — definitions and terms." },
  { id: 105, group: "idiom", statement: "I see where you're going with this, but what really lands for me is that gut certainty when it clicks in my body.", options: ["Kinaesthetic — \"lands / clicks in my body\" is literal; \"I see\" is idiom", "Visual — \"I see where you're going\" is literal", "Both equally", "Language — \"certainty\" is evaluative"], correct: 0, explanation: "Generic opener versus a specific, embodied signal — the body language is doing the real work." },
  { id: 106, group: "idiom", statement: "Sounds good — but honestly I need to sit and watch the full demo myself before I sign off.", options: ["Visual — \"watch the demo\" is literal; \"sounds good\" is idiom", "Auditory — \"sounds good\" is literal", "Kinaesthetic — \"sit\" is the signal", "Both equally"], correct: 0, explanation: "\"Sounds good\" is filler agreement; the stated requirement is watching." },
  { id: 107, group: "failed", statement: "You've sent three detailed emails and he still doesn't get it — he keeps asking to \"just jump on a call.\" Best move?", options: ["Call him — the written channel has failed and he's telling you his channel", "Send a fourth, clearer email", "Send the same email with bullet points", "Add a diagram to the email"], correct: 0, explanation: "Repeating a failed channel harder is not pacing. He has named his working channel — use it." },
  { id: 108, group: "failed", statement: "She's read the brochure twice and watched the venue video, but keeps saying she needs to \"get a feel for the place.\" Best move?", options: ["Book a site visit — she needs to be in the space; Visual inputs have already failed", "Send higher-resolution photos", "Walk her through the video again with commentary", "Send the floor plan with measurements"], correct: 0, explanation: "Two Visual passes haven't landed, and she's named the missing channel — physical presence." },
  { id: 109, group: "verbatim", statement: "Always visual, by default. I'm able to see things clearly at a larger scale, like a big picture — today it looks like this, but I can see what it could change into long-term. (Arun)", options: ["Visual", "Language", "Auditory", "Kinaesthetic"], correct: 0, explanation: "Self-declared and structurally confirmed — internal imagery at scale, projected across time." },
  { id: 110, group: "verbatim", statement: "It's kind of like a very tense feeling, like dread. It goes tense, tense, tense — and as it goes down, it becomes like this. (Elena)", options: ["Kinaesthetic", "Visual", "Auditory", "Language"], correct: 0, explanation: "The experience is carried as located, moving body sensation — she even maps its direction with her hands." },
  { id: 111, group: "verbatim", statement: "I see her — really thin, like a prisoner, black squiggly lines all over, the colours dull. The girl isn't moving but the lines are, slowly. (Elena)", options: ["Visual — rich submodality detail (colour, movement, distance)", "Kinaesthetic — she feels imprisoned", "Language — she's narrating", "Auditory"], correct: 0, explanation: "A fully-formed internal image with workable submodalities: brightness, colour, motion, and viewing position — prime material for visual re-coding work." },
  { id: 112, group: "verbatim", statement: "I thought I'd lost the ability to visualize. When I was younger I was very visual and creative — now I'm super logical and analytical and can't see things in my mind anymore. But today I saw things. (Elena)", options: ["Visual — dormant, not gone; access returned in one guided session", "Language — logic has permanently replaced imagery", "Kinaesthetic — she should work through feeling instead", "No usable channel"], correct: 0, explanation: "A preferred channel can atrophy when context stops exercising it. One session of guided imagery re-opened it — evidence for rebuilding, not abandoning, the channel." },
];

// ---------- Pacing & Matching bank ----------
const PACE_GROUPS = {
  match: "In-Channel Match",
  vocab: "Mirror Vocabulary",
  avoid: "Spot the Break",
  group: "Group Pacing",
  shift: "Match vs Shift",
  verbatim: "Real Clients",
};

const PQ = [
  // In-channel matching
  { id: 1, group: "match", statement: "Client (Kinaesthetic): \"There's this weight I keep carrying around about the deal.\" Best pacing response?", options: ["\"Let's sit with that weight — where do you notice it most?\"", "\"Let's map the deal out so you can see it clearly.\"", "\"Talk me through it out loud.\"", "\"Let's define exactly what's bothering you, point by point.\""], correct: 0, explanation: "Stays fully in-channel: sit with, weight, notice. The others switch systems." },
  { id: 2, group: "match", statement: "Client (Visual): \"I need to picture myself actually running this business day to day — that's what's missing.\" Best pacing response?", options: ["\"Let's picture a typical day running this business — in as much detail as you can see it.\"", "\"Let's talk through what running it would sound like.\"", "\"Let's get a feel for what running it would be like.\"", "\"Let's define exactly what 'running the business' means, step by step.\""], correct: 0, explanation: "Builds the exact thing she named as missing — an internal image — staying purely Visual." },
  { id: 3, group: "match", statement: "Client (Auditory): \"The way he pitched it put me at ease — his voice made me trust him.\" Best pacing response?", options: ["\"What was it about his tone or delivery that put you at ease?\"", "\"If you pictured him presenting again, what would you notice?\"", "\"Write down exactly what he said.\"", "\"What did your body do when you felt that ease?\""], correct: 0, explanation: "Stays with tone and delivery — the channel she's actually using." },
  { id: 4, group: "match", statement: "Client (Language): \"I need the exact wording of the offer before I can say yes. Not a summary — the actual terms, in writing.\" Best pacing response?", options: ["\"Let's go through the precise wording of each clause together, line by line.\"", "\"Let's picture what accepting would look like for you.\"", "\"How does saying yes feel in your gut?\"", "\"Talk me through your thinking out loud.\""], correct: 0, explanation: "Precise, literal, line-by-line language matches her explicitly stated need." },
  { id: 5, group: "match", statement: "Client (Kinaesthetic): \"Until I can literally hold a working prototype in my hands, I won't know if it's worth investing in.\" Best pacing response?", options: ["\"Let's get an actual prototype in your hands so you can work with it directly.\"", "\"Let's talk through what the prototype would include.\"", "\"Let's picture the finished prototype once it's built.\"", "\"Let's define exactly what 'working prototype' means first.\""], correct: 0, explanation: "Delivers the literal hands-on contact she said she needs — no channel translation." },
  { id: 6, group: "match", statement: "Client (Visual): \"I read the spec sheet twice, but it wasn't until the demo video that it clicked.\" Best next step?", options: ["\"Let's find or make a visual walkthrough — something you can watch play out.\"", "\"Let's re-read the spec sheet together, line by line.\"", "\"Let's talk the spec through out loud.\"", "\"Let's get hands-on with the product itself.\""], correct: 0, explanation: "Builds on the channel that already worked (watching), avoids repeating the one that already failed (reading)." },
  { id: 7, group: "match", statement: "Client (Language): \"I don't need the whole backstory. Just give me one sentence that sums up the offer.\" Best pacing response?", options: ["\"Here's the offer condensed into one precise sentence: [X]. Does that match what you're looking for?\"", "\"Let's picture the offer as one clean image.\"", "\"Let's talk through the whole story so you can hear how it connects.\"", "\"Let's sit with the offer and see how it feels.\""], correct: 0, explanation: "Delivers exactly the condensed verbal form requested — no translation into another channel." },
  // Mirror vocabulary
  { id: 8, group: "vocab", statement: "Client says: \"Right now it's all a blur to me.\" Which response builds strongest rapport?", options: ["\"Let's lay it out clearly so it stops being a blur.\"", "\"Let's bring some clarity to this.\"", "\"Let's demystify the numbers.\"", "\"Let's reduce the ambiguity here.\""], correct: 0, explanation: "Mirrors her exact word (\"blur\") back. Same-category synonyms are good; her own vocabulary is better." },
  { id: 9, group: "vocab", statement: "Client says: \"There's a pull toward the new role, but something's weighing me down about staying.\" Strongest mirror?", options: ["\"A real pull toward the new role — and a weight holding you back. Where do you feel each one?\"", "\"You're attracted to the role but hesitant.\"", "\"Sounds like you're torn between two options.\"", "\"Part of you wants it; part of you doesn't.\""], correct: 0, explanation: "Reflects her exact metaphors (\"pull,\" \"weight\") rather than paraphrasing into neutral abstractions." },
  { id: 10, group: "vocab", statement: "Client says: \"I need the clauses spelled out — vague language makes me nervous.\" Strongest mirror?", options: ["\"You need the exact clauses spelled out and precisely defined. Let's go line by line and lock the definitions in.\"", "\"You want clarity on the contract.\"", "\"You'd like more detail before signing.\"", "\"Let's make sure you're comfortable with the agreement.\""], correct: 0, explanation: "Uses her words: spelled out, defined, line by line. The paraphrases lose the rapport effect." },
  { id: 11, group: "vocab", statement: "Why mirror the client's exact words rather than a good synonym?", options: ["Their own words are anchored to their internal experience — synonyms translate it into *your* map, not theirs", "Synonyms are grammatically weaker", "It saves time in the session", "Clients get confused by new words"], correct: 0, explanation: "A person's own value/sensory words are 'passwords' to their experience. Even close synonyms subtly shift the meaning to your frame." },
  // Spot the break (words that quietly break pacing)
  { id: 12, group: "avoid", statement: "Coaching a Visual client, which word quietly BREAKS the channel match?", options: ["\"Demystify\"", "\"Picture\"", "\"Clear\"", "\"Lay it out\""], correct: 0, explanation: "\"Demystify\" sounds sophisticated but is abstract/conceptual — it carries no sensory channel, so it matches no one." },
  { id: 13, group: "avoid", statement: "Client (Kinaesthetic): \"This doesn't feel right.\" Which coach reply BREAKS pacing?", options: ["\"Let's look at the options side by side so you can compare them clearly.\"", "\"Let's sit with that feeling a moment.\"", "\"Where do you notice it most?\"", "\"What is that unease pointing to?\""], correct: 0, explanation: "Switching a felt-sense signal into visual comparison abandons her channel — content is fine, rapport quietly drops." },
  { id: 14, group: "avoid", statement: "Which of these openers is idiomatic filler you should NOT read as the client's channel?", options: ["\"I hear you, but...\"", "\"Your voice got quieter when...\"", "\"I keep hearing his exact words...\"", "\"The tone of the email felt cold...\""], correct: 0, explanation: "\"I hear you\" is a generic acknowledgment. The other three carry real, literal channel information." },
  { id: 15, group: "avoid", statement: "A coach responds to every client with neutral, channel-free language to stay 'objective.' What's the effect?", options: ["It matches no one — rapport is weaker with every client, not safer", "It's the safest professional choice", "It works well for Language clients", "It only fails with Kinaesthetic clients"], correct: 0, explanation: "Neutral language isn't neutral in effect — it simply fails to pace anyone. Matching beats hedging." },
  // Group pacing
  { id: 16, group: "group", statement: "Two stakeholders: one needs to \"see the roadmap laid out,\" the other needs to \"hear the reasoning behind each step.\" Best approach?", options: ["Show a visual roadmap on screen while narrating the reasoning aloud as you go", "Pick Visual — it's most common", "Ask them to agree on one system first", "Use neutral language matching neither"], correct: 0, explanation: "Layer both channels simultaneously — same content, two channels at once." },
  { id: 17, group: "group", statement: "Team of three: one wants to picture success, one needs it to feel right in the gut, one wants metrics defined precisely. Best session design?", options: ["One integrated exercise: a visual outcome map, with moments to check how it feels, with precise metrics attached to each milestone", "Three separate segments, one per person, in sequence", "Focus on metrics since numbers are objective", "Ask everyone to adapt to Visual"], correct: 0, explanation: "Integrated design keeps every channel present throughout — everyone stays engaged, and the team leaves with one shared artifact." },
  { id: 18, group: "group", statement: "Why does sequential accommodation (taking turns per person's channel) underperform integrated design in groups?", options: ["Each person disengages during the segments that aren't 'theirs,' and you end with separate outputs instead of one shared plan", "It takes slightly less preparation", "People find turn-taking unfair", "Sequential order biases the first channel"], correct: 0, explanation: "Integration keeps all channels live the whole time and produces a single shared deliverable." },
  // Match vs shift (pace → lead)
  { id: 19, group: "shift", statement: "\"I keep replaying that meeting — the same three sentences on a loop. I can't get past it.\" Match or shift?", options: ["Shift — externalize the loop: write the sentences down so they're fixed outside her head", "Match — deepen into the sound: \"what do those sentences tell you?\"", "Match — mirror the loop language back repeatedly", "Shift — move to body sensations"], correct: 0, explanation: "Looping/intrusive content → externalize into fixed form. Deepening a loop keeps it circulating.", followUp: { question: "The meeting replay is a charged loop. Beyond externalizing — which handbook pattern discharges it?", options: ["Movie Rewind Pattern — for highly charged mental replay; watch dissociated, then rewind rapidly until the charge drops", "Pleasure Pattern", "Meta-Alignment", "Intentionality Pattern"], correct: 0, explanation: "Handbook: Movie Rewind is for 'highly charged mental replay.' Writing it down externalizes; the rewind de-energises the encoding itself so the loop stops restarting." } },
  { id: 20, group: "shift", statement: "\"This decision hasn't felt right for weeks — the same uneasy feeling every day.\" Match or shift?", options: ["Match — deepen: \"what does that feeling want to tell you? Where do you notice it?\"", "Shift — write down what 'doesn't feel right' means", "Shift — picture it working out instead", "Shift — say it out loud to break the pattern"], correct: 0, explanation: "Persistent but *unexamined* — not a loop. Stay in-channel and listen deeper; the signal hasn't been heard yet." },
  { id: 21, group: "shift", statement: "\"I've read every article and comparison chart out there. I still can't decide.\" Match or shift?", options: ["Shift — her analytical channel is saturated: \"forget the articles; what does your gut say?\"", "Match — recommend better articles", "Match — summarise the research for her", "Match — build a more detailed comparison chart"], correct: 0, explanation: "When the dominant channel is maxed out without resolution, more of the same won't resolve it — deliberately switch." },
  { id: 22, group: "shift", statement: "\"One minute I picture myself thriving, the next there's this heavy weight about leaving my team.\" Two competing signals — which do you follow?", options: ["The weight — follow the signal carrying the emotional block, even though the image is the 'positive' one", "The image — always reinforce the positive channel", "Neither — force a verbal summary first", "Both equally, alternating each question"], correct: 0, explanation: "With competing signals, follow the one doing the real work of holding them back — usually where the block lives." },
  { id: 23, group: "shift", statement: "What's the correct order of pacing and leading?", options: ["Pace first — match their channel until rapport is established — then lead into a new channel if useful", "Lead first to establish authority, then pace", "Alternate every sentence", "Only ever pace; leading breaks rapport"], correct: 0, explanation: "Matching earns the trust that makes leading possible. Leading without pacing feels like being pushed." },
  { id: 24, group: "shift", statement: "Client says: \"It's really just that one image that's sticking with me — the doubt is minor.\" Which signal do you follow?", options: ["The image — follow what the client explicitly says is dominant, even if a feeling is also present", "The doubt — always follow the kinaesthetic signal", "Neither — ask them to choose", "Reframe the doubt as the real issue"], correct: 0, explanation: "\"Follow the felt sense\" is not a fixed rule — follow whatever the client signals is actually dominant and persistent." },
  { id: 25, group: "verbatim", statement: "Ellie: \"Probably just grounded, probably just grounded about here.\" Best pacing response?", options: ["\"Stay with that groundedness for a moment — what's it like right there?\"", "\"Great — let's map out what groundedness looks like.\"", "\"Let's define what grounded means to you, precisely.\"", "\"Tell me the story of how you got grounded.\""], correct: 0, explanation: "She's located a felt state in her body — stay in it and deepen, don't translate it into image, definition, or narrative.", followUp: { question: "She's found 'grounded, about here.' What locks that state in for future access?", options: ["State Accessing and Anchoring — amplify the groundedness to peak, anchor it to a self-fired cue, practise stepping in and out", "Excuse Blow-Out", "De-Pleasuring Pattern", "Decision Destroyer"], correct: 0, explanation: "A live resourced state is anchoring gold: amplify (double it), set the anchor at 8+, break state, re-fire, then future-pace it into the contexts where she needs it." } },
  { id: 26, group: "verbatim", statement: "Jean-Charles: \"Be afraid of someone leaving me, or losing my job... I just don't want that.\" Which framing paces his motivation?", options: ["\"So the work is making sure you never end up back in that place — let's build what protects you from it.\"", "\"Let's paint an exciting vision of where you're heading instead.\"", "\"Let's set some ambitious goals to chase.\"", "\"Focus on the positives — what do you want?\""], correct: 0, explanation: "He's Away From — pace the avoidance frame first. Jumping straight to Towards visions mismatches how his motivation actually moves." },
  { id: 27, group: "verbatim", statement: "Brit: \"I need to come to a decision within myself about my next career move.\" Best pacing response?", options: ["\"What does your own read tell you, when you set everyone else's opinions aside?\"", "\"Here's what I think you should do.\"", "\"What does your CEO think the right move is?\"", "\"Most people in your position choose X.\""], correct: 0, explanation: "Internal Referencing — the coach's job is to help her access her own evaluation, not supply an external one." },
  { id: 28, group: "verbatim", statement: "Renee: \"I've always been that way — so concerned about what other people think.\" Which move works WITH her current pattern (before leading anywhere)?", options: ["\"What feedback have you had from people you trust about this?\"", "\"Forget everyone else — what do YOU think?\"", "\"Other people's opinions shouldn't matter.\"", "\"You need to become internally referenced.\""], correct: 0, explanation: "She's External Referencing — pacing means starting where her evaluation actually lives (trusted others' input), then gradually leading toward her own read. Demanding instant internality mismatches her." },
  { id: 29, group: "verbatim", statement: "Julie: \"I need action that comes up from within me... something I know will create lasting change.\" Best pacing response?", options: ["\"So nothing imposed from outside will stick — it has to rise from within you. What's already stirring in there?\"", "\"I'll set you weekly tasks and check your compliance.\"", "\"Here's the proven 5-step program everyone follows.\"", "\"Your accountability partner will keep you on track.\""], correct: 0, explanation: "Mirrors her exact frame — \"from within me\" — and honours the internal source she named as her condition for lasting change." },
  { id: 30, group: "verbatim", statement: "Cassidy: \"I really like them as people, but I just know I can't learn from them.\" Best pacing response?", options: ["\"That knowing is worth trusting — what is it about the fit that's off?\"", "\"What evidence do you have that you can't learn from them?\"", "\"That seems like a hasty judgment — give them a chance.\"", "\"Let's list the pros and cons of each provider.\""], correct: 0, explanation: "She's an Intuitor — pace the inner knowing first. Demanding evidence or pro/con lists forces her into a channel that isn't how she decides." },
  { id: 31, group: "verbatim", statement: "Swetha: \"If I can go from that to this, I can certainly go from this to something else.\" Best pacing response?", options: ["\"Exactly — you've already proven you can change. So what can this next version of you do?\"", "\"You must commit fully or it won't work.\"", "\"Don't get ahead of yourself.\"", "\"You should set more realistic expectations.\""], correct: 0, explanation: "Mirrors her Possibility modals (\"can\") and her own proof-of-change logic. \"Must\" and \"should\" would inject necessity language she isn't using.", followUp: { question: "'If I went from that to this, I can go further.' Which pattern formalises this into a working belief?", options: ["Installing Empowering Beliefs — take her own proof-of-change and install it neurologically, not just intellectually", "Excuse Blow-Out", "De-Pleasuring Pattern", "Movie Rewind"], correct: 0, explanation: "She's already generated the empowering belief — the pattern's job is installation: frame-level change validated in the body, then future-paced, so it runs under pressure rather than staying a nice idea." } },
  { id: 32, group: "verbatim", statement: "Nicole: \"I keep saying I can't do this, I'll never achieve this.\" She's asked for help changing that. What's the pace-then-lead move?", options: ["Acknowledge how real the \"can't\" feels, then gently test it: \"what would it be like if it were 'I can't yet'?\"", "Correct her immediately: \"Stop saying can't — say CAN!\"", "Agree the goals may genuinely be impossible", "Ignore the language and change the subject"], correct: 0, explanation: "Pace the impossibility frame first (it's her lived experience), then lead the modal operator one step — can't → can't yet → could. Jumping straight to forced positivity skips the pacing.", followUp: { question: "After pacing her 'can't' and softening to 'can't yet' — which pattern completes the belief change?", options: ["Meta-Yes and Meta-No — Meta-No the limiting belief, Meta-Yes the empowering replacement until it feels installed", "Sphere of Excellence", "Time-Line Awareness", "Somatic Swish"], correct: 0, explanation: "Handbook: use Meta-Yes/Meta-No 'to weaken limiting beliefs and strengthen empowering beliefs.' The modal ladder opens the door; Meta-No/Meta-Yes walks the new belief through it." } },
  { id: 101, group: "match", statement: "Client (Auditory): \"It's like there's constant static in my head lately.\" Best pacing response?", options: ["\"What would it take to quiet the static — and what do you hear underneath it?\"", "\"Let's get a clear picture of what's causing it.\"", "\"Where do you feel that noise in your body?\"", "\"Let's define 'static' precisely.\""], correct: 0, explanation: "Stays in sound — quiet, hear, static. The others translate her signal out of its channel." },
  { id: 102, group: "vocab", statement: "Client: \"I'm juggling too many plates right now and one of them is going to smash.\" Strongest mirror?", options: ["\"Which plate, if you set it down on purpose, would let you keep the ones that matter in the air?\"", "\"You're overloaded and worried about failure.\"", "\"Sounds like a prioritisation problem.\"", "\"Let's build a task list and rank it.\""], correct: 0, explanation: "Extends her own metaphor (plates, in the air, set down) instead of flattening it into abstractions." },
  { id: 103, group: "avoid", statement: "Client (Kinaesthetic): \"I'm carrying this pressure everywhere I go.\" Which reply quietly BREAKS pacing?", options: ["\"Let's zoom out and get a clearer picture of your workload.\"", "\"Where does that pressure sit right now?\"", "\"What would it be like to set some of it down?\"", "\"When did you first pick it up?\""], correct: 0, explanation: "Zoom/picture switches her felt load into visual analysis — content fine, channel abandoned." },
  { id: 104, group: "group", statement: "Board presentation: one director wants the numbers pinned down, one wants to hear the narrative, one decides off the dashboard. Best design?", options: ["Dashboard on screen while you tell the story aloud, with a precise figures appendix in their hands", "Lead with the appendix — numbers are objective", "Tell the story first, then offer materials on request", "Ask the board which format they prefer and use only that"], correct: 0, explanation: "All three channels run simultaneously — nobody waits for 'their' segment." },
  { id: 105, group: "shift", statement: "\"I've talked this through with everyone I know — talked it to death, honestly — and I'm still stuck.\" Match or shift?", options: ["Shift — the verbal channel is saturated: \"let's stop talking it through; sketch it, or check what your gut already knows\"", "Match — talk it through together one more time", "Match — summarise everyone's advice aloud", "Shift — recommend she consult one more person"], correct: 0, explanation: "\"Talked to death\" is the tell — more of the saturated channel cannot resolve it. Deliberately switch systems." },
  { id: 106, group: "shift", statement: "\"There's a knot in my stomach every time I open that spreadsheet — but I've never stopped to ask what it's about.\" Match or shift?", options: ["Match — deepen into the felt sense: \"open it now, and let's listen to what the knot is telling you\"", "Shift — analyse the spreadsheet for errors", "Shift — visualise the finances going well", "Shift — write down three possible causes"], correct: 0, explanation: "An unexamined body signal is an invitation to go deeper in-channel, not to translate away from it." },
  { id: 107, group: "vocab", statement: "Client keeps saying she's \"stuck in the mud\" with her business. Best rapport move?", options: ["\"What would be the first thing that gets one wheel out of the mud?\"", "\"Let's identify the obstacles to progress.\"", "\"You feel blocked — tell me more.\"", "\"What's your plan to regain momentum?\""], correct: 0, explanation: "Works inside her metaphor. \"Obstacles,\" \"blocked,\" and \"momentum\" are translations into the coach's vocabulary." },
  { id: 108, group: "avoid", statement: "Which coach habit most reliably erodes rapport across a whole session?", options: ["Consistently paraphrasing the client's sensory words into abstract professional vocabulary", "Occasionally asking the client to repeat something", "Taking brief notes while listening", "Pausing before responding"], correct: 0, explanation: "Each paraphrase is a micro-mismatch — individually invisible, cumulatively the client feels subtly unheard." },
  { id: 109, group: "verbatim", statement: "Arun: \"Is there a mentoring thing where you can pose questions and get support? Not somebody making the decision for me — helping me think it through properly.\" Best pacing response?", options: ["\"A sounding board, not a decision-maker — you'd bring the question, we'd pressure-test your thinking, and the call stays yours.\"", "\"I can tell you what I'd do in your position.\"", "\"Most clients your age choose X — I'd recommend the same.\"", "\"Let's set up accountability check-ins where I assign next steps.\""], correct: 0, explanation: "He's internally referenced and said so explicitly. Pace it: position coaching as thinking support with the verdict staying his — anything prescriptive mismatches his authority sort." },
  { id: 110, group: "verbatim", statement: "Arun: \"Seeing is 80, hearing is 70, feeling is 60 — am I supposed to practice more on the feeling side?\" Best coaching response?", options: ["\"Your visual strength serves you well — keep it. The question is context: where would more felt-sense data improve your decisions? Practise there, low-stakes.\"", "\"Yes — feeling is the most important system; train it daily.\"", "\"No — always lead with your strongest system.\"", "\"The numbers don't matter; ignore the profile.\""], correct: 0, explanation: "Honour the dominant channel (pace), then develop the weaker one where it's contextually useful (lead) — neither worshipping nor discarding the profile." },
  { id: 111, group: "verbatim", statement: "Elena: \"I have a lot of things I want to talk about, but I don't really know where to start, to be honest.\" Best opening?", options: ["\"Start anywhere — wherever you begin will be the right place, and we'll follow it from there.\"", "\"Let's build a structured agenda first: list every issue, then rank them.\"", "\"Start with childhood — that's usually where it begins.\"", "\"Take the most serious problem first.\""], correct: 0, explanation: "Pacing an overwhelmed, scattered opening means lowering the entry bar, not raising it with structure demands. Order can emerge; rapport comes first." },
  { id: 112, group: "verbatim", statement: "Elena: \"I know I have the tools, but I don't use them — and that awareness makes me even more pissed off at myself.\" What needs pacing first?", options: ["The meta-level anger at herself — name it: \"so beyond the patterns, there's frustration at yourself for knowing better\" — before touching any technique", "The unused tools — assign a daily practice schedule", "The patterns themselves — start an intervention immediately", "The awareness — explain why insight alone doesn't change behaviour"], correct: 0, explanation: "The live material is the second-order emotion: anger about her own state. Pace the meta-state first — more tools would feed the very frame that's punishing her.", followUp: { question: "Anger at herself for not using what she knows — a self-attack riding on awareness. Which pattern addresses the frame?", options: ["Basic Meta-Stating — bring acceptance and appreciation to bear on the frustrated state, changing the frame above it", "More skills training", "Movie Rewind on past failures", "Excuse Blow-Out"], correct: 0, explanation: "The problem is the relationship between states — frustration applied to her own experience. Meta-stating deliberately applies a resourceful state (acceptance, patience) to the stuck one, dissolving the self-attack loop." } },
  { id: 113, group: "verbatim", statement: "Tessa: \"I might have a think about that — I'd have to look at budget. I was hoping for a lot less.\" Best pacing response?", options: ["\"Totally fair — how about one trial session first, so you can feel how it works before any bigger commitment?\"", "\"Quality coaching costs — you get what you pay for.\"", "\"I'll hold the spot, but you'd need to decide today.\"", "\"Maybe coaching isn't for you right now, then.\""], correct: 0, explanation: "Pace the real constraint (money, uncertainty) without defensiveness or pressure, and lower the risk of the first step — which keeps the door open on her terms." },
];

const STORAGE_KEY = "meta-quiz-stats-v3";
const emptyStats = () => ({
  meta: { attempted: 0, correct: 0 },
  rep: { attempted: 0, correct: 0 },
  pace: { attempted: 0, correct: 0 },
});

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prepare(bank) {
  return shuffle(bank).map((q) => {
    const order = shuffle(q.options.map((_, i) => i));
    let followUp = q.followUp;
    if (followUp) {
      const fo = shuffle(followUp.options.map((_, i) => i));
      followUp = {
        ...followUp,
        options: fo.map((i) => followUp.options[i]),
        correct: fo.indexOf(followUp.correct),
      };
    }
    return {
      ...q,
      options: order.map((i) => q.options[i]),
      correct: order.indexOf(q.correct),
      followUp,
    };
  });
}

const MODES = {
  meta: { label: "Meta Programs", title: "Meta Program Drill", groups: GROUPS, tab: ink.tabTeal, tabText: ink.tabTealText },
  rep: { label: "Rep Systems", title: "Rep Systems Drill", groups: REP_GROUPS, tab: ink.tabRust, tabText: ink.tabRustText },
  pace: { label: "Pacing", title: "Pacing & Matching Drill", groups: PACE_GROUPS, tab: ink.tabPlum, tabText: ink.tabPlumText },
};

export default function MetaProgramsQuiz() {
  const [mode, setMode] = useState("meta");
  const [activeByMode, setActiveByMode] = useState({
    meta: new Set(Object.keys(GROUPS)),
    rep: new Set(Object.keys(REP_GROUPS)),
    pace: new Set(Object.keys(PACE_GROUPS)),
  });
  const [pools, setPools] = useState(() => ({
    meta: prepare(Q),
    rep: prepare(RQ),
    pace: prepare(PQ),
  }));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [stage, setStage] = useState(1); // 1 = main question, 2 = intervention follow-up
  const [session, setSession] = useState({ correct: 0, total: 0 });
  const [stats, setStats] = useState(emptyStats());
  const [statsLoaded, setStatsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setStats(JSON.parse(raw));
    } catch (e) {
      /* no stats yet */
    } finally {
      setStatsLoaded(true);
    }
  }, []);

  const persist = useCallback((next) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) { /* best-effort */ }
  }, []);

  const cfg = MODES[mode];
  const active = activeByMode[mode];
  const pool = pools[mode];

  const filteredPool = useMemo(
    () => pool.filter((q) => active.has(q.group)),
    [pool, active]
  );
  const current = filteredPool.length ? filteredPool[idx % filteredPool.length] : null;

  const switchMode = (m) => {
    if (m === mode) return;
    setMode(m);
    setIdx(0);
    setSelected(null);
    setStage(1);
    setSession({ correct: 0, total: 0 });
  };

  const toggleGroup = (key) => {
    setActiveByMode((prev) => {
      const next = new Set(prev[mode]);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return { ...prev, [mode]: next };
    });
    setIdx(0);
    setSelected(null);
    setStage(1);
  };

  const selectAll = () => {
    setActiveByMode((prev) => ({ ...prev, [mode]: new Set(Object.keys(cfg.groups)) }));
    setIdx(0);
    setSelected(null);
    setStage(1);
  };

  const restart = () => {
    const bank = mode === "meta" ? Q : mode === "rep" ? RQ : PQ;
    setPools((prev) => ({ ...prev, [mode]: prepare(bank) }));
    setIdx(0);
    setSelected(null);
    setStage(1);
    setSession({ correct: 0, total: 0 });
  };

  const activePart = current && stage === 2 && current.followUp ? current.followUp : current;

  const answer = (i) => {
    if (selected !== null || !activePart) return;
    setSelected(i);
    const isCorrect = i === activePart.correct;
    setSession((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
    setStats((prev) => {
      const next = {
        ...prev,
        [mode]: {
          attempted: prev[mode].attempted + 1,
          correct: prev[mode].correct + (isCorrect ? 1 : 0),
        },
      };
      persist(next);
      return next;
    });
  };

  const next = () => {
    if (stage === 1 && current && current.followUp) {
      setStage(2);
      setSelected(null);
      return;
    }
    setSelected(null);
    setStage(1);
    // reshuffle the pool each time a full pass completes, so questions
    // never repeat in the same order
    if (filteredPool.length && (idx + 1) % filteredPool.length === 0) {
      const bank = mode === "meta" ? Q : mode === "rep" ? RQ : PQ;
      setPools((prev) => ({ ...prev, [mode]: prepare(bank) }));
      setIdx(0);
      return;
    }
    setIdx((i) => i + 1);
  };

  const resetStats = async () => {
    const fresh = emptyStats();
    setStats(fresh);
    await persist(fresh);
  };

  const modeStats = stats[mode];
  const accuracy = modeStats.attempted ? Math.round((modeStats.correct / modeStats.attempted) * 100) : null;

  return (
    <div style={{ background: ink.bg, minHeight: "100%", fontFamily: sans }} className="w-full min-h-screen flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-3 flex items-end justify-between">
          <div>
            <div style={{ fontFamily: mono, color: "#8A93A6", letterSpacing: "0.08em" }} className="text-xs uppercase">
              Case Files · Coaching Drills
            </div>
            <h1 style={{ color: ink.paper, fontFamily: serif }} className="text-xl font-bold leading-tight mt-0.5">
              {cfg.title}
            </h1>
          </div>
          <button
            onClick={restart}
            style={{ color: "#8A93A6" }}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-full border border-white/10 hover:text-white transition-colors"
            aria-label="Reshuffle deck"
          >
            <Shuffle size={13} /> Shuffle
          </button>
        </div>

        {/* Mode switcher */}
        <div className="flex gap-1.5 mb-3">
          {Object.entries(MODES).map(([key, m]) => (
            <button
              key={key}
              onClick={() => switchMode(key)}
              style={{
                background: mode === key ? m.tab : "transparent",
                color: mode === key ? m.tabText : "#8A93A6",
                borderColor: m.tab,
              }}
              className="flex-1 text-xs font-medium px-2 py-2 rounded-lg border transition-colors"
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Stats strip */}
        <div style={{ background: ink.bgSoft }} className="rounded-xl px-3 py-2 mb-3 flex items-center justify-between text-xs">
          <span style={{ color: "#8A93A6" }}>Session: <span style={{ color: ink.paper }}>{session.correct}/{session.total}</span></span>
          <span style={{ color: "#8A93A6" }}>
            All-time: <span style={{ color: ink.paper }}>{statsLoaded ? (accuracy === null ? "—" : `${accuracy}% (${modeStats.attempted})`) : "…"}</span>
          </span>
          <button onClick={resetStats} style={{ color: "#6E7688" }} className="underline underline-offset-2 hover:text-white transition-colors">
            reset
          </button>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <button
            onClick={selectAll}
            style={{
              background: active.size === Object.keys(cfg.groups).length ? cfg.tab : "transparent",
              color: active.size === Object.keys(cfg.groups).length ? cfg.tabText : "#8A93A6",
              borderColor: cfg.tab,
            }}
            className="text-xs px-2.5 py-1 rounded-full border transition-colors"
          >
            All
          </button>
          {Object.entries(cfg.groups).map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggleGroup(key)}
              style={{
                background: active.has(key) ? cfg.tab : "transparent",
                color: active.has(key) ? cfg.tabText : "#8A93A6",
                borderColor: "rgba(255,255,255,0.15)",
              }}
              className="text-xs px-2.5 py-1 rounded-full border transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Question card */}
        {current ? (
          <div
            style={{ background: ink.paper, border: `1px solid ${ink.paperEdge}` }}
            className="rounded-2xl overflow-hidden shadow-2xl"
          >
            <div style={{ background: cfg.tab }} className="px-4 py-1.5 flex items-center justify-between">
              <span style={{ fontFamily: mono, color: cfg.tabText, letterSpacing: "0.05em" }} className="text-[11px] uppercase">
                Case No. {String(current.id).padStart(3, "0")}
              </span>
              <span style={{ fontFamily: mono, color: "rgba(255,255,255,0.75)" }} className="text-[11px]">
                {stage === 2 ? "Part 2 · Intervention" : (current.followUp ? `${cfg.groups[current.group]} · 2-PART` : cfg.groups[current.group])}
              </span>
            </div>

            <div className="px-5 py-5">
              {stage === 2 && (
                <p style={{ fontFamily: serif, color: "#8A8072" }} className="text-sm leading-snug mb-2">
                  &ldquo;{current.statement}&rdquo;
                </p>
              )}
              <p style={{ fontFamily: serif, color: ink.textDark }} className="text-lg leading-snug mb-5">
                {stage === 2 ? activePart.question : <>&ldquo;{current.statement}&rdquo;</>}
              </p>

              <div className="flex flex-col gap-2">
                {activePart.options.map((opt, i) => {
                  const isSelected = selected === i;
                  const isCorrectOpt = i === activePart.correct;
                  const revealed = selected !== null;

                  let border = ink.paperEdge;
                  let bg = "transparent";
                  let textColor = ink.textDark;

                  if (revealed && isCorrectOpt) {
                    border = ink.tabTeal;
                    bg = "rgba(63,105,82,0.10)";
                    textColor = ink.tabTeal;
                  } else if (revealed && isSelected && !isCorrectOpt) {
                    border = ink.redPen;
                    bg = "rgba(168,56,44,0.08)";
                    textColor = ink.redPen;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => answer(i)}
                      disabled={revealed}
                      style={{ borderColor: border, background: bg, color: textColor, fontFamily: sans }}
                      className="text-left text-sm px-3.5 py-2.5 rounded-lg border-2 flex items-center justify-between gap-2 transition-colors disabled:cursor-default"
                    >
                      <span>{opt}</span>
                      {revealed && isCorrectOpt && <Check size={16} strokeWidth={3} style={{ color: ink.tabTeal, flexShrink: 0 }} />}
                      {revealed && isSelected && !isCorrectOpt && <X size={16} strokeWidth={3} style={{ color: ink.redPen, flexShrink: 0 }} />}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="mt-4 pt-4" style={{ borderTop: `1px dashed ${ink.paperEdge}` }}>
                  <p style={{ fontFamily: serif, fontStyle: "italic", color: selected === activePart.correct ? ink.tabTeal : ink.redPen }} className="text-sm leading-snug">
                    {activePart.explanation}
                  </p>
                  <button
                    onClick={next}
                    style={{ background: ink.textDark, color: ink.paper, fontFamily: sans }}
                    className="mt-3 w-full flex items-center justify-center gap-1 text-sm font-medium px-4 py-2.5 rounded-lg"
                  >
                    {stage === 1 && current.followUp ? "Part 2: Which pattern?" : "Next case"} <ChevronRight size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ background: ink.paper, color: ink.textDark }} className="rounded-2xl p-6 text-center text-sm">
            Select at least one category to begin.
          </div>
        )}

        <p style={{ color: "#5C6478", fontFamily: sans }} className="text-center text-[11px] mt-4">
          Stats saved to this device between visits.
        </p>
      </div>
    </div>
  );
}
