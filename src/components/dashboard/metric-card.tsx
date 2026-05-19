import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  helper: string;
  tone?: "cyan" | "emerald" | "amber" | "violet";
};

const toneClassName: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  amber: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  cyan: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
  emerald: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  violet: "border-violet-300/25 bg-violet-300/10 text-violet-100",
};

export function MetricCard({
  helper,
  label,
  tone = "cyan",
  value,
}: MetricCardProps) {
  return (
    <Card className="bg-card/75 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
            {value}
          </div>
        </div>
        <Badge className={cn("px-1.5", toneClassName[tone])} variant="outline">
          <ArrowUpRight className="size-3" />
        </Badge>
      </div>
      <div className="mt-3 text-xs leading-5 text-muted-foreground">{helper}</div>
    </Card>
  );
}
