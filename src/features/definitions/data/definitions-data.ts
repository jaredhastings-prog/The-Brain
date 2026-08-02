export type DefinitionSection = {
  heading: string;
  // Plain paragraphs, or term/detail pairs rendered as a definition list.
  body?: string[];
  items?: { term: string; detail: string }[];
};

export type Definition = {
  id: string;
  term: string;
  // Short definition shown on the card front and at the top of the back.
  summary: string;
  sections?: DefinitionSection[];
  tags?: string[];
};

export const definitions: Definition[] = [
  {
    id: "prejudice",
    term: "Prejudice",
    summary:
      "An unfair opinion or feeling formed without knowing the facts, usually directed against people based on their group, race, or religion.",
    sections: [
      {
        heading: "Key features",
        items: [
          { term: "Prejudgment", detail: "Deciding what someone is like before you meet them." },
          { term: "No facts", detail: "Ignoring real proof or truth." },
          {
            term: "Group focus",
            detail: "Judging a single person by broad stereotypes of their whole group.",
          },
        ],
      },
      {
        heading: "Common types",
        items: [
          { term: "Racism", detail: "Unfair views based on skin colour or ethnic background." },
          { term: "Religious bias", detail: "Unfair views based on a person's faith." },
        ],
      },
      {
        heading: "Key synonyms",
        items: [
          {
            term: "Bias",
            detail: "A personal preference or leaning that prevents neutral judgment.",
          },
          {
            term: "Bigotry",
            detail: "Obstinate, intolerant devotion to one's own opinions and prejudices.",
          },
          {
            term: "Discrimination",
            detail: "The unfair action or treatment based on prejudice.",
          },
          {
            term: "Intolerance",
            detail:
              "An unwillingness to accept views, beliefs, or behaviour different from one's own.",
          },
        ],
      },
      {
        heading: "Important distinctions",
        items: [
          {
            term: "Prejudice vs. Bias",
            detail:
              "Prejudice is usually negative and deeply emotional. Bias can be positive, negative, or neutral, and is often just a subconscious preference or mental shortcut.",
          },
          {
            term: "Prejudice vs. Discrimination",
            detail:
              "Prejudice is an internal feeling, thought, or attitude. Discrimination is the external action, behaviour, or policy that results from that thought.",
          },
        ],
      },
    ],
  },
  {
    id: "ignorance",
    term: "Ignorance",
    summary:
      "A lack of knowledge, information, or awareness about something. Unlike prejudice, it is an absence of understanding rather than an unfair judgment — though it can be innocent or wilful.",
    sections: [
      {
        heading: "Key features",
        items: [
          {
            term: "Absence of knowledge",
            detail: "Not knowing a fact, skill, or piece of information — a gap, not a distortion.",
          },
          {
            term: "Not inherently negative",
            detail:
              "Everyone is ignorant of most things; it only becomes a fault when knowledge is available and refused.",
          },
          {
            term: "Correctable",
            detail: "Can be resolved by learning, exposure, or being informed.",
          },
        ],
      },
      {
        heading: "Common types",
        items: [
          {
            term: "Innocent ignorance",
            detail: "Simply never having had access to the information — no fault involved.",
          },
          {
            term: "Wilful ignorance",
            detail:
              "Deliberately avoiding facts or refusing to learn, often to protect a belief or avoid discomfort.",
          },
          {
            term: "Circumstantial ignorance",
            detail: "Lacking knowledge because of situation, education, or environment.",
          },
        ],
      },
      {
        heading: "Key synonyms",
        items: [
          { term: "Unawareness", detail: "Not being conscious of something." },
          {
            term: "Nescience",
            detail: "A formal term for lack of knowledge, especially of a whole subject.",
          },
          {
            term: "Naivety",
            detail: "Lack of experience or worldly knowledge, often with a sense of innocence.",
          },
          {
            term: "Illiteracy",
            detail: "Ignorance in a specific domain (e.g. reading, or 'financial illiteracy').",
          },
        ],
      },
      {
        heading: "Important distinctions",
        items: [
          {
            term: "Ignorance vs. Prejudice",
            detail:
              "Ignorance is an absence of knowledge and can be neutral or accidental. Prejudice is an active, usually negative judgment. Ignorance is often the soil prejudice grows in, but they are not the same thing.",
          },
          {
            term: "Ignorance vs. Stupidity",
            detail:
              "Ignorance is not knowing (a lack of information); stupidity is a lack of ability to understand or reason. An intelligent person can be ignorant of a topic they've simply never encountered.",
          },
          {
            term: "Ignorance vs. Wilful blindness",
            detail:
              "Plain ignorance is not knowing. Wilful blindness is choosing not to know when the truth is within reach — which carries moral and often legal responsibility.",
          },
        ],
      },
    ],
  },
  {
    id: "primitive",
    term: "Primitive / Primitively",
    summary:
      "Relating to an early, basic, or original stage of development — simple and undeveloped, or acting from raw instinct rather than refined thought. 'Primitively' is the adverb: doing something in a basic, instinctive, or unrefined way.",
    sections: [
      {
        heading: "Key features",
        items: [
          {
            term: "Early / original",
            detail: "Belonging to the first or earliest stage of something.",
          },
          {
            term: "Basic / undeveloped",
            detail: "Simple, crude, or lacking refinement and sophistication.",
          },
          {
            term: "Instinctive",
            detail: "Driven by raw, deep-seated impulse rather than reason.",
          },
        ],
      },
      {
        heading: "Common types",
        items: [
          {
            term: "Developmental",
            detail: "An early stage of evolution or progress (e.g. primitive tools, primitive organisms).",
          },
          {
            term: "Behavioural",
            detail: "Raw, instinctive drives (e.g. primitive urges, the 'primitive brain').",
          },
          {
            term: "Foundational",
            detail: "An irreducible building block (e.g. a 'primitive' in maths or computing).",
          },
        ],
      },
      {
        heading: "Key synonyms",
        items: [
          { term: "Rudimentary", detail: "Basic, at an early or incomplete stage of development." },
          { term: "Crude", detail: "Rough and unrefined, made or done without skill or finish." },
          { term: "Elementary", detail: "Simple and foundational; concerning the first principles." },
          { term: "Instinctive", detail: "Arising from natural impulse rather than learned thought." },
          { term: "Archaic", detail: "Belonging to a much earlier period; old-fashioned or ancient." },
        ],
      },
      {
        heading: "Important distinctions",
        items: [
          {
            term: "Primitive vs. Primitively",
            detail:
              "'Primitive' is the adjective, describing the thing ('a primitive shelter', 'a primitive fear'). 'Primitively' is the adverb, describing the manner of action ('they lived primitively', 'he reacted primitively').",
          },
          {
            term: "Primitive vs. Simple",
            detail:
              "Simple means uncomplicated by design and can be elegant. Primitive implies underdeveloped or crude — simple because it hasn't yet advanced, not because it was refined down.",
          },
          {
            term: "Neutral vs. Dismissive",
            detail:
              "'Primitive' can be neutral and technical (primitive life forms, a primitive data type) or dismissive and critical ('a primitive attempt'). It is now often considered offensive when applied to people or cultures.",
          },
        ],
      },
    ],
  },
  {
    id: "anecdotally",
    term: "Anecdotally",
    summary:
      "Based on personal accounts or individual stories rather than formal research or data. Used to flag that a claim comes from informal observation and experience, not systematic proof.",
    sections: [
      {
        heading: "Key features",
        items: [
          {
            term: "Personal accounts",
            detail: "Drawn from individual stories and experiences, not systematic study.",
          },
          {
            term: "Informal",
            detail: "Reported casually or from memory rather than through rigorous method.",
          },
          {
            term: "Illustrative, not proof",
            detail: "Can suggest a pattern but isn't necessarily representative or measurable.",
          },
        ],
      },
      {
        heading: "Common types",
        items: [
          {
            term: "Anecdotal evidence",
            detail: "Support for a claim that rests on personal testimony rather than research.",
          },
          {
            term: "As a hedge",
            detail: "'Anecdotally…' signals an informal observation the speaker can't fully back with data.",
          },
          {
            term: "As illustration",
            detail: "Using a short real-life account to make a broader point relatable.",
          },
        ],
      },
      {
        heading: "Key synonyms",
        items: [
          { term: "Informally", detail: "Not through official or systematic channels." },
          { term: "Reportedly", detail: "According to what has been said, without confirmation." },
          { term: "Unofficially", detail: "Not established or verified by a formal source." },
          {
            term: "Impressionistically",
            detail: "Based on general impressions rather than precise measurement.",
          },
        ],
      },
      {
        heading: "Important distinctions",
        items: [
          {
            term: "Anecdotally vs. Empirically",
            detail:
              "Anecdotal knowledge comes from individual stories. Empirical knowledge comes from systematic observation, testing, and measurement.",
          },
          {
            term: "Anecdotally vs. Statistically",
            detail:
              "A single account can be vivid but unrepresentative. Statistical evidence aggregates many cases, so it shows whether the pattern actually holds.",
          },
          {
            term: "Anecdotally (adverb) vs. Anecdote (noun)",
            detail:
              "'Anecdotally' frames how something is known or said ('anecdotally, it works'). An 'anecdote' is the short account itself.",
          },
        ],
      },
    ],
  },
  {
    id: "ambivalence",
    term: "Ambivalence",
    summary:
      "Holding two opposing feelings or attitudes toward something at the same time — wanting and not wanting it at once. It is the coexistence of both, not the absence of feeling.",
    sections: [
      {
        heading: "Key features",
        items: [
          {
            term: "Both at once",
            detail: "Genuinely feeling two opposite pulls (e.g. attraction and aversion) toward the same thing simultaneously.",
          },
          {
            term: "Internal tension",
            detail: "The conflict is felt inside the person, and can create discomfort, hesitation, or feeling stuck.",
          },
          {
            term: "Not neutrality",
            detail: "It is strong feeling on both sides, not the absence of feeling or simple not-caring.",
          },
        ],
      },
      {
        heading: "Common types",
        items: [
          {
            term: "Emotional",
            detail: "Mixed feelings about a person or situation — love and resentment toward the same person.",
          },
          {
            term: "Decisional",
            detail: "Being torn between options, wanting and not wanting the same choice (common in change and coaching).",
          },
          {
            term: "Attitudinal",
            detail: "Holding both positive and negative evaluations of an idea, group, or belief at once.",
          },
        ],
      },
      {
        heading: "Key synonyms",
        items: [
          { term: "Mixed feelings", detail: "The everyday phrase for the same experience." },
          { term: "Uncertainty", detail: "Being unsure — though ambivalence is specifically pulled two ways, not just unsure." },
          { term: "Conflicted", detail: "Torn between opposing desires or values." },
          { term: "Equivocation", detail: "Wavering or hedging, often outwardly, between two positions." },
        ],
      },
      {
        heading: "Important distinctions",
        items: [
          {
            term: "Ambivalence vs. Indifference",
            detail:
              "Ambivalence is caring strongly in two opposite directions. Indifference is not caring either way — one is full of feeling, the other is empty of it.",
          },
          {
            term: "Ambivalence vs. Ambiguity",
            detail:
              "Ambivalence is about a person's conflicting feelings (internal). Ambiguity is about something being open to more than one meaning (external, in the thing itself).",
          },
          {
            term: "Ambivalence vs. Indecision",
            detail:
              "Indecision is simply not having chosen yet. Ambivalence is the deeper reason it's hard to choose — genuinely wanting and not wanting the same thing.",
          },
        ],
      },
    ],
  },
];
