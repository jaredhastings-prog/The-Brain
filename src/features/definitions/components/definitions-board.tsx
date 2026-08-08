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

// Both faces are absolutely positioned so they can stack for the flip, which
// means they contribute no height to the card. We measure each face
// independently and drive the card's height from whichever one is showing.
function useFaceHeight(ref: React.RefObject<HTMLDivElement | null>) {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref]);

  return height;
}

function FlipCard({ definition }: { definition: Definition }) {
  const [flipped, setFlipped] = React.useState(false);
  const frontRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);

  const frontHeight = useFaceHeight(frontRef);
  const backHeight = useFaceHeight(backRef);
  const height = flipped ? backHeight : frontHeight;

  // iOS Safari still needs the -webkit- prefixes, and if backface-visibility
  // fails the two faces overlap. Hiding the inactive face with opacity and
  // visibility makes that impossible regardless of 3D support.
  const face = (isVisible: boolean): React.CSSProperties => ({
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? "visible" : "hidden",
    transition: "opacity 250ms ease",
  });

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${definition.term} — tap to ${flipped ? "hide" : "show"} definition`}
      style={{
        height: height || undefined,
        perspective: 1600,
        WebkitPerspective: 1600,
      }}
      className="relative block w-full min-h-56 text-left transition-[height] duration-500"
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 500ms",
        }}
        className="relative h-full w-full"
      >
        {/* Front */}
        <div
          ref={frontRef}
          style={face(!flipped)}
          className="absolute inset-x-0 top-0 flex min-h-56 flex-col justify-between gap-4 rounded-lg border border-border/80 bg-card p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_8px_20px_rgb(24_24_27_/_0.05)]"
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
          <div className="min-w-0">
            <h2 className="break-words text-xl font-semibold text-foreground sm:text-2xl">
              {definition.term}
            </h2>
            <p className="mt-2 break-words text-sm leading-6 text-muted-foreground">
              {definition.summary}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <RotateCw className="size-3.5" />
            Tap to flip
          </div>
        </div>

        {/* Back */}
        <div
          ref={backRef}
          style={{ ...face(flipped), transform: "rotateY(180deg)" }}
          className="absolute inset-x-0 top-0 rounded-lg border border-primary/30 bg-card p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_8px_20px_rgb(24_24_27_/_0.05)]"
        >
          <h3 className="break-words text-base font-semibold text-foreground">
            {definition.term}
          </h3>
          <p className="mt-1 break-words text-sm leading-5 text-muted-foreground">
            {definition.summary}
          </p>
          {definition.sections?.map((section) => (
            <div key={section.heading} className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary/80">
                {section.heading}
              </p>
              {section.body?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-1.5 break-words text-sm leading-6 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
              {section.items?.length ? (
                <ul className="mt-1.5 space-y-2">
                  {section.items.map((item) => (
                    <li key={item.term} className="break-words text-sm leading-6">
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
