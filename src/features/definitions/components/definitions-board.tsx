"use client";

import * as React from "react";
import { RotateCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { definitions, type Definition } from "@/features/definitions/data/definitions-data";
import { cn } from "@/lib/utils";

export function DefinitionsBoard() {
  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
          Phrases &amp; Definitions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A board of words, concepts, and distinctions to focus on. Tap a card to flip it.
        </p>
      </div>

      {definitions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/60 py-20 text-center text-sm text-muted-foreground">
          No definitions yet. Add your first term and it will appear here.
        </div>
      ) : (
        <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {definitions.map((definition) => (
            <FlipCard key={definition.id} definition={definition} />
          ))}
        </div>
      )}
    </div>
  );
}

function FlipCard({ definition }: { definition: Definition }) {
  const [flipped, setFlipped] = React.useState(false);
  const frontRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number>();

  // Size the card to whichever face is showing, so long definitions display
  // in full (no cramped inner scroll) on any screen size.
  React.useEffect(() => {
    const measure = () => {
      const front = frontRef.current?.offsetHeight ?? 0;
      const back = backRef.current?.offsetHeight ?? 0;
      setHeight(flipped ? back : front);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (frontRef.current) observer.observe(frontRef.current);
    if (backRef.current) observer.observe(backRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [flipped]);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${definition.term} — tap to ${flipped ? "hide" : "show"} definition`}
      style={{ height }}
      className="relative w-full text-left transition-[height] duration-500 [perspective:1600px]"
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front */}
        <div
          ref={frontRef}
          className="absolute inset-x-0 top-0 flex min-h-56 flex-col justify-between gap-4 rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_8px_20px_rgb(24_24_27_/_0.05)] [backface-visibility:hidden]"
        >
          {definition.tags?.length ? (
            <div className="flex flex-wrap gap-1.5">
              {definition.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
          <div>
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              {definition.term}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{definition.summary}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <RotateCw className="size-3.5" />
            Tap to flip
          </div>
        </div>

        {/* Back */}
        <div
          ref={backRef}
          className="absolute inset-x-0 top-0 rounded-lg border border-primary/30 bg-card p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_8px_20px_rgb(24_24_27_/_0.05)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
        >
          <h3 className="text-base font-semibold text-foreground">{definition.term}</h3>
          <p className="mt-1 text-sm leading-5 text-muted-foreground">{definition.summary}</p>
          {definition.sections?.map((section) => (
            <div key={section.heading} className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary/80">
                {section.heading}
              </p>
              {section.body?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-1.5 text-sm leading-6 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
              {section.items?.length ? (
                <ul className="mt-1.5 space-y-2">
                  {section.items.map((item) => (
                    <li key={item.term} className="text-sm leading-6">
                      <span className="font-medium text-foreground">{item.term}:</span>{" "}
                      <span className="text-muted-foreground">{item.detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
          <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <RotateCw className="size-3.5" />
            Tap to flip back
          </div>
        </div>
      </div>
    </button>
  );
}
