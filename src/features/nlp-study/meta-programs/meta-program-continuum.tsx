import { cn } from "@/lib/utils";

export function MetaProgramContinuum({
  continuum,
  type,
}: {
  continuum: string[];
  type: string;
}) {
  return (
    <div className="space-y-3">
      <div
        className="grid overflow-hidden rounded-md border border-border/70 bg-background shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]"
        style={{
          gridTemplateColumns: `repeat(${continuum.length}, minmax(0, 1fr))`,
        }}
      >
        {continuum.map((position, index) => (
          <div
            className="relative min-h-16 border-r border-border/70 p-3 last:border-r-0"
            key={position}
          >
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1",
                index === 0 && "bg-cyan-600/70",
                index > 0 &&
                  index < continuum.length - 1 &&
                  "bg-emerald-600/70",
                index === continuum.length - 1 && "bg-amber-600/70",
              )}
            />
            <div className="flex items-center gap-2">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-slate-900 text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {position}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>Continuum: {type}</span>
        <span>Context-dependent range, not a fixed trait</span>
      </div>
    </div>
  );
}
