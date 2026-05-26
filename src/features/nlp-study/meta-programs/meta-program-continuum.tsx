import { cn } from "@/lib/utils";

export function MetaProgramContinuum({
  className,
  continuum,
  type,
  variant = "comfortable",
}: {
  className?: string;
  continuum: string[];
  type: string;
  variant?: "compact" | "comfortable";
}) {
  const isDense = continuum.length > 3;
  const minSegmentWidth =
    variant === "compact"
      ? isDense
        ? "5.75rem"
        : "7.25rem"
      : isDense
        ? "7rem"
        : "8.5rem";
  const gridTemplateColumns = `repeat(auto-fit, minmax(min(100%, ${minSegmentWidth}), 1fr))`;

  return (
    <div className={cn("w-full min-w-0 max-w-full space-y-3", className)}>
      <div
        className="grid w-full min-w-0 max-w-full auto-rows-fr gap-px overflow-hidden rounded-md border border-border/70 bg-border/70 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]"
        style={{ gridTemplateColumns }}
      >
        {continuum.map((position, index) => (
          <div
            className={cn(
              "relative min-w-0 bg-background",
              variant === "compact" ? "min-h-14 p-2.5" : "min-h-[4.5rem] p-3",
            )}
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
            <div
              className={cn(
                "grid min-w-0 max-w-full items-start gap-2",
                variant === "compact"
                  ? "grid-cols-[1.375rem_minmax(0,1fr)]"
                  : "grid-cols-[1.5rem_minmax(0,1fr)]",
              )}
            >
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-md bg-slate-900 font-semibold text-white",
                  variant === "compact" ? "size-5 text-[10px]" : "size-6 text-xs",
                )}
              >
                {index + 1}
              </span>
              <span
                className={cn(
                  "min-w-0 whitespace-normal break-words font-semibold leading-snug text-foreground [overflow-wrap:anywhere]",
                  variant === "compact"
                    ? "text-[11px]"
                    : isDense
                      ? "text-xs"
                      : "text-sm",
                )}
              >
                {position}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-wrap items-center gap-2 text-xs text-muted-foreground sm:justify-between">
        <span className="min-w-0 break-words [overflow-wrap:anywhere]">
          Continuum: {type}
        </span>
        <span className="min-w-0 break-words [overflow-wrap:anywhere]">
          Context-dependent range, not a fixed trait
        </span>
      </div>
    </div>
  );
}
