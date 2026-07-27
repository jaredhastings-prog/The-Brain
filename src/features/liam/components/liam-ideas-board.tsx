"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  liamContent,
  liamLists,
  type LiamListName,
} from "@/features/liam/data/liam-data";

export function LiamIdeasBoard() {
  const [active, setActive] = React.useState<LiamListName>("Activities");
  const items = liamContent[active];

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-semibold tracking-normal text-foreground sm:text-3xl">
          Liam
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Running lists of things to do with and for Liam.
        </p>
      </div>

      <div className="flex gap-2">
        {liamLists.map((name) => (
          <Button
            key={name}
            size="sm"
            variant={active === name ? "default" : "outline"}
            onClick={() => setActive(name)}
            className="h-9 rounded-full px-5 text-sm"
          >
            {name}
          </Button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex gap-2.5 text-sm leading-6 text-foreground"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
