"use client";

import { Bell, Command, Menu, Plus, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type TopCommandBarProps = {
  onOpenSidebar: () => void;
};

export function TopCommandBar({ onOpenSidebar }: TopCommandBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="flex min-h-16 items-center gap-3 px-4 md:px-6">
        <Button
          aria-label="Open navigation"
          className="lg:hidden"
          onClick={onOpenSidebar}
          size="icon"
          variant="ghost"
        >
          <Menu />
        </Button>
        <div className="relative flex min-w-0 flex-1 items-center">
          <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
          <Input
            aria-label="Search Jared Brain"
            className="h-10 border-border/80 bg-card/70 pl-9 pr-24 text-sm"
            placeholder="Search, capture, or ask Jared Brain..."
          />
          <div className="pointer-events-none absolute right-2 hidden items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-xs text-muted-foreground sm:flex">
            <Command className="size-3" />
            <span>K</span>
          </div>
        </div>
        <Button aria-label="Global capture" size="icon" variant="outline">
          <Plus />
        </Button>
        <Button className="hidden md:inline-flex" variant="secondary">
          <Sparkles />
          Insights
        </Button>
        <Button aria-label="Notifications" size="icon" variant="ghost">
          <Bell />
        </Button>
      </div>
    </header>
  );
}
