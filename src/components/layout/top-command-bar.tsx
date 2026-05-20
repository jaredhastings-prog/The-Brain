"use client";

import { Bell, Command, Menu, Plus, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { useCaptureInbox } from "@/features/capture-inbox/context/capture-inbox-context";

type TopCommandBarProps = {
  onOpenSidebar: () => void;
};

export function TopCommandBar({ onOpenSidebar }: TopCommandBarProps) {
  const { openQuickCapture } = useCaptureInbox();

  return (
    <header className="sticky top-0 z-30 border-b border-sidebar-accent/80 bg-sidebar/95 text-sidebar-foreground backdrop-blur-xl">
      <div className="flex min-h-16 items-center gap-3 px-4 md:px-6">
        <Button
          aria-label="Open navigation"
          className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
          onClick={onOpenSidebar}
          size="icon"
          variant="ghost"
        >
          <Menu />
        </Button>
        <div className="relative flex min-w-0 flex-1 items-center">
          <Search className="pointer-events-none absolute left-3 size-4 text-sidebar-foreground/45" />
          <Input
            aria-label="Search Jared Brain"
            className="h-10 border-sidebar-accent/90 bg-sidebar-accent/60 pl-9 pr-24 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/45 focus-visible:ring-primary"
            placeholder="Search, capture, or ask Jared Brain..."
          />
          <div className="pointer-events-none absolute right-2 hidden items-center gap-1 rounded-md border border-sidebar-accent bg-sidebar px-2 py-1 text-xs text-sidebar-foreground/55 sm:flex">
            <Command className="size-3" />
            <span>K</span>
          </div>
        </div>
        <Button
          aria-label="Global capture"
          className="border-sidebar-accent bg-sidebar-accent/55 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={openQuickCapture}
          size="icon"
          type="button"
          variant="outline"
        >
          <Plus />
        </Button>
        <Button
          className="hidden bg-sidebar-accent/75 text-sidebar-accent-foreground hover:bg-sidebar-accent md:inline-flex"
          variant="secondary"
        >
          <Sparkles />
          Insights
        </Button>
        <Button
          aria-label="Notifications"
          className="text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          size="icon"
          variant="ghost"
        >
          <Bell />
        </Button>
        <LogoutButton />
      </div>
    </header>
  );
}
