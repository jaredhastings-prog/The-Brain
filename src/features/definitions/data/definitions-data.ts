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
];
