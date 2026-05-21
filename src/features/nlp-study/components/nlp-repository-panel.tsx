import {
  Archive,
  BookMarked,
  FileText,
  Inbox,
  Link2,
  PenLine,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";

const repositoryAreas = [
  {
    description: "Manual excerpts, definitions, and concise source notes.",
    icon: <BookMarked className="size-4" />,
    title: "Key reference areas",
  },
  {
    description: "Books, videos, PDFs, diagrams, and external links.",
    icon: <Archive className="size-4" />,
    title: "Saved resources",
  },
  {
    description: "Future links from Global Capture Inbox entries.",
    icon: <Inbox className="size-4" />,
    title: "Linked captures",
  },
  {
    description: "Open placeholder for adding repository notes later.",
    icon: <PenLine className="size-4" />,
    title: "Add repository note",
  },
];

export function NlpRepositoryPanel() {
  return (
    <DashboardCard
      description="Static placeholders for the repository surfaces that can later connect to captures and saved notes."
      eyebrow="Reference desk"
      title="Repository Index"
    >
      <div className="space-y-3">
        <div className="rounded-md border border-border/70 bg-muted/35 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText className="size-4 text-muted-foreground" />
            Recently updated
          </div>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Placeholder for the newest notes, diagrams, resources, and linked
            capture references.
          </p>
        </div>

        {repositoryAreas.map((area) => (
          <div
            className="rounded-md border border-border/70 bg-muted/35 p-3"
            key={area.title}
          >
            <div className="flex items-start gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
                {area.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Link2 className="size-3.5 text-muted-foreground" />
                  {area.title}
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {area.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}
