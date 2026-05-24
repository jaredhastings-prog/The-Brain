"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type StudyTab = {
  id: string;
  label: string;
  icon?: LucideIcon;
  content: React.ReactNode;
};

export function StudyTabs({
  ariaLabel,
  tabs,
}: {
  ariaLabel: string;
  tabs: StudyTab[];
}) {
  const [activeTabId, setActiveTabId] = React.useState(tabs[0]?.id ?? "");
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];
  const ActiveIcon = activeTab?.icon;

  if (!activeTab) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div
        aria-label={ariaLabel}
        className="flex gap-1 overflow-x-auto rounded-md border border-border/70 bg-card/70 p-1"
        role="tablist"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab.id === tab.id;

          return (
            <button
              aria-controls={`${tab.id}-panel`}
              aria-selected={isActive}
              className={cn(
                "inline-flex min-h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive && "bg-background text-foreground shadow-sm",
              )}
              id={`${tab.id}-tab`}
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              role="tab"
              type="button"
            >
              {Icon ? <Icon className="size-3.5" /> : null}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <section
        aria-labelledby={`${activeTab.id}-tab`}
        className="rounded-md border border-border/70 bg-card/70 p-4"
        id={`${activeTab.id}-panel`}
        role="tabpanel"
      >
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
          {ActiveIcon ? <ActiveIcon className="size-4" /> : null}
          {activeTab.label}
        </div>
        {activeTab.content}
      </section>
    </div>
  );
}
