"use client";

import * as React from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopCommandBar } from "@/components/layout/top-command-bar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background/85 text-foreground lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar
        isMobileOpen={isSidebarOpen}
        onMobileClose={() => setIsSidebarOpen(false)}
      />
      <div className="min-w-0">
        <TopCommandBar onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
