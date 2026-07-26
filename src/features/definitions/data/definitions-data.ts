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
    tags: ["Psychology", "Social"],
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
    tags: ["Psychology", "Social"],
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
];
