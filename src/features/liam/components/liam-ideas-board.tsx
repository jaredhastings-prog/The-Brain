"use client";

import * as React from "react";
import { Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  liamIdeaCategories,
  liamIdeas,
  type LiamIdea,
} from "@/features/liam/data/liam-data";
import { cn } from "@/lib/utils";

const ALL = "All";

export function LiamIdeasBoard() {
  const [active, setActive] = React.useState<string>(ALL);

  const filtered =
    active === ALL ? liamIdeas : liamIdeas.filter((idea) => idea.category === active);

  const groups = liamIdeaCategories
    .map((category) => ({
      category,
      ideas: filtered.filter((idea) => idea.category === category),
    }))
    .filter((group) => group.ideas.length > 0);

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-3xl font-semibold tracking-normal text-foreground">Liam</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          A running register of ideas — things to do with and for Liam. Keep adding to it
          over time.
        </p>
      </div>

      <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1">
        <FilterChip label={ALL} active={active === ALL} onClick={() => setActive(ALL)} />
        {liamIdeaCategories.map((category) => (
          <FilterChip
            key={category}
            label={category}
            active={active === category}
            onClick={() => setActive(category)}
          />
        ))}
      </div>

      {liamIdeas.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <section key={group.category}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {group.category}
              </h2>
              <ul className="mt-3 space-y-2">
                {group.ideas.map((idea) => (
                  <IdeaRow key={idea.id} idea={idea} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      size="sm"
      variant={active ? "default" : "outline"}
      onClick={onClick}
      className="h-9 shrink-0 snap-start rounded-full px-4 text-xs"
    >
      {label}
    </Button>
  );
}

function IdeaRow({ idea }: { idea: LiamIdea }) {
  return (
    <li className="rounded-lg border border-border/80 bg-card/95 p-4 shadow-[0_1px_2px_rgb(24_24_27_/_0.04)]">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
          <Lightbulb className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-5 text-foreground">{idea.title}</p>
          {idea.notes ? (
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{idea.notes}</p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function EmptyState() {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-16 text-center",
      )}
    >
      <Lightbulb className="mb-3 size-8 text-muted-foreground/40" />
      <p className="text-sm font-medium text-foreground">No ideas yet</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Add the first idea and it will appear here.
      </p>
    </div>
  );
}
