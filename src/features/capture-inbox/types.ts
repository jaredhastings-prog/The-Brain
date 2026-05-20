export const captureTypes = [
  "Idea",
  "Task",
  "Memory",
  "Reflection",
  "CRM Note",
  "Study Note",
  "Health Note",
  "Finance Note",
  "Relationship Note",
] as const;

export const lifeDomains = [
  "Business",
  "Study & Learning",
  "Health & Performance",
  "Liam",
  "Finance",
  "Relationships",
  "Personal Projects",
  "Memory Timeline",
] as const;

export const capturePriorities = ["Low", "Medium", "High", "Urgent"] as const;

export const captureStatuses = [
  "Inbox",
  "Triaged",
  "In Progress",
  "Done",
  "Archived",
] as const;

export type CaptureType = (typeof captureTypes)[number];
export type LifeDomain = (typeof lifeDomains)[number];
export type CapturePriority = (typeof capturePriorities)[number];
export type CaptureStatus = (typeof captureStatuses)[number];

export const domainHierarchy = {
  Business: [
    "Evolve Lab",
    "Frontier SQ",
    "Frontier Wear",
    "The Coaching Room",
  ],
  "Study & Learning": ["Master of Business Psychology", "NLP"],
  "Health & Performance": ["Gym", "Diet", "Mental Health", "Supplements"],
  Liam: ["Notes", "Expenses", "School", "Mediation", "Activities"],
  Finance: [],
  Relationships: [],
  "Personal Projects": [],
  "Memory Timeline": [],
} as const satisfies Record<LifeDomain, readonly string[]>;

export type CaptureSubDomain = {
  [Domain in keyof typeof domainHierarchy]: (typeof domainHierarchy)[Domain][number];
}[keyof typeof domainHierarchy];

export type CaptureInboxItem = {
  id: string;
  title?: string;
  type?: CaptureType;
  domain?: LifeDomain;
  subDomain?: CaptureSubDomain;
  priority?: CapturePriority;
  status: CaptureStatus;
  tags: string[];
  rawContent: string;
  createdAt: string;
  aiRoutingHint?: string;
};
