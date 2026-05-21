import { CheckCircle2, FileText, PenLine, Sparkles } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Button } from "@/components/ui/button";
import type { TopicWithGroup } from "@/features/nlp-study/types";

export function NlpQuickActionsPanel({
  notice,
  onAddNote,
  onAddReflection,
  onMarkInProgress,
  onMarkIntegrated,
  selectedTopic,
}: {
  notice: string;
  onAddNote: () => void;
  onAddReflection: () => void;
  onMarkInProgress: () => void;
  onMarkIntegrated: () => void;
  selectedTopic: TopicWithGroup;
}) {
  return (
    <DashboardCard
      description="Local-only study actions for this first module version."
      eyebrow="Quick actions"
      title="Current Topic"
    >
      <div className="rounded-md border border-border/70 bg-muted/35 px-3 py-3">
        <div className="text-sm font-semibold text-foreground">
          {selectedTopic.topic.title}
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {selectedTopic.group.title}
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        <Button className="justify-start" onClick={onAddNote} variant="outline">
          <PenLine className="size-4" />
          Add note
        </Button>
        <Button
          className="justify-start"
          onClick={onAddReflection}
          variant="outline"
        >
          <FileText className="size-4" />
          Add exercise reflection
        </Button>
        <Button
          className="justify-start"
          onClick={onMarkInProgress}
          variant="secondary"
        >
          <Sparkles className="size-4" />
          Mark topic as in progress
        </Button>
        <Button
          className="justify-start"
          onClick={onMarkIntegrated}
          variant="secondary"
        >
          <CheckCircle2 className="size-4" />
          Mark topic as integrated
        </Button>
      </div>
      <div className="mt-4 rounded-md border border-border/70 bg-muted/35 px-3 py-2 text-xs leading-5 text-muted-foreground">
        {notice}
      </div>
    </DashboardCard>
  );
}
