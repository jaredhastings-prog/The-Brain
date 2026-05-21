import { GraduationCap } from "lucide-react";

import type { NlpProgressStats } from "@/features/nlp-study/types";

export function NlpProgressSummary({ stats }: { stats: NlpProgressStats }) {
  return (
    <div className="rounded-lg border border-border/80 bg-muted/35 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
            Progress summary
          </div>
          <div className="mt-1 text-3xl font-semibold tracking-normal text-foreground">
            {stats.progress}%
          </div>
        </div>
        <div className="grid size-12 place-items-center rounded-md bg-accent text-accent-foreground">
          <GraduationCap className="size-5" />
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${stats.progress}%` }}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <ProgressStat label="Topics" value={stats.total.toString()} />
        <ProgressStat label="Active" value={stats.inProgress.toString()} />
        <ProgressStat label="Integrated" value={stats.integrated.toString()} />
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        {stats.notStarted} topics are still waiting in the study map.
      </div>
    </div>
  );
}

function ProgressStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/70 bg-card/80 px-3 py-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold text-foreground">{value}</div>
    </div>
  );
}
