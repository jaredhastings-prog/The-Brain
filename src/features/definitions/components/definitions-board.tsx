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
        <h1 className="text-3xl font-semibold tracking-normal text-foreground">
          Phrases &amp; Definitions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A board of words, concepts, and distinctions to focus on. Click a card to flip it.
        </p>
      </div>

      {definitions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/60 py-20 text-center text-sm text-muted-foreground">
          No definitions yet. Add your first term and it will appear here.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
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

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${definition.term} — click to ${flipped ? "hide" : "show"} definition`}
      className="group relative min-h-64 w-full text-left [perspective:1400px]"
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front */}
        <div className="absolute inset-0 flex min-h-64 flex-col justify-between rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_8px_20px_rgb(24_24_27_/_0.05)] [backface-visibility:hidden]">
          <div className="flex flex-wrap gap-1.5">
            {definition.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px]">
                {tag}
              </Badge>
            ))}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{definition.term}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-4">
              {definition.summary}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <RotateCw className="size-3.5" />
            Tap to flip
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 min-h-64 overflow-y-auto rounded-lg border border-primary/30 bg-card p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_8px_20px_rgb(24_24_27_/_0.05)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <h3 className="text-sm font-semibold text-foreground">{definition.term}</h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{definition.summary}</p>
          {definition.sections?.map((section) => (
            <div key={section.heading} className="mt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary/80">
                {section.heading}
              </p>
              {section.body?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mt-1 text-xs leading-5 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
              {section.items?.length ? (
                <ul className="mt-1 space-y-1">
                  {section.items.map((item) => (
                    <li key={item.term} className="text-xs leading-5">
                      <span className="font-medium text-foreground">{item.term}:</span>{" "}
                      <span className="text-muted-foreground">{item.detail}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
