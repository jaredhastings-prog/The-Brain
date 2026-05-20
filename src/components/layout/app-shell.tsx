"use client";

import * as React from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { TopCommandBar } from "@/components/layout/top-command-bar";
import { GlobalQuickCapture } from "@/features/capture-inbox/components/quick-capture-modal";
import { CaptureInboxProvider } from "@/features/capture-inbox/context/capture-inbox-context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <CaptureInboxProvider>
      <div className="min-h-screen bg-background text-foreground lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
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
        <GlobalQuickCapture />
      </div>
    </CaptureInboxProvider>
  );
}
