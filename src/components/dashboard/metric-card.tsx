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
  amber: "border-amber-600/20 bg-amber-50 text-amber-700",
  cyan: "border-cyan-700/20 bg-cyan-50 text-cyan-700",
  emerald: "border-emerald-600/20 bg-emerald-50 text-emerald-700",
  violet: "border-violet-600/20 bg-violet-50 text-violet-700",
};

export function MetricCard({
  helper,
  label,
  tone = "cyan",
  value,
}: MetricCardProps) {
  return (
    <Card className="bg-card/95 p-4">
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
