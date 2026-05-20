"use client";

import * as React from "react";

import { mockCapturedItems } from "@/features/capture-inbox/data/mock-captures";
import type {
  CaptureInboxItem,
  CapturePriority,
  CaptureStatus,
  CaptureSubDomain,
  CaptureType,
  LifeDomain,
} from "@/features/capture-inbox/types";

type NewCaptureInput = {
  title?: string;
  rawContent: string;
  type?: CaptureType;
  domain?: LifeDomain;
  subDomain?: CaptureSubDomain;
  priority?: CapturePriority;
  tags?: string[];
  status?: CaptureStatus;
};

type CaptureInboxContextValue = {
  addCapture: (capture: NewCaptureInput) => void;
  closeQuickCapture: () => void;
  isQuickCaptureOpen: boolean;
  items: CaptureInboxItem[];
  openQuickCapture: () => void;
};

const CaptureInboxContext =
  React.createContext<CaptureInboxContextValue | null>(null);

export function CaptureInboxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] =
    React.useState<CaptureInboxItem[]>(mockCapturedItems);
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = React.useState(false);

  const addCapture = React.useCallback((capture: NewCaptureInput) => {
    const nextItem: CaptureInboxItem = {
      id: `capture-${Date.now()}`,
      title: capture.title || undefined,
      type: capture.type,
      domain: capture.domain,
      subDomain: capture.subDomain,
      priority: capture.priority,
      status: capture.status ?? "Inbox",
      tags: capture.tags ?? [],
      rawContent: capture.rawContent,
      createdAt: new Date().toISOString(),
      aiRoutingHint: capture.domain
        ? `Routed to ${
            capture.subDomain
              ? `${capture.domain} / ${capture.subDomain}`
              : capture.domain
          }.`
        : "Uncategorised. Ready for later routing.",
    };

    setItems((current) => [nextItem, ...current]);
  }, []);

  const closeQuickCapture = React.useCallback(() => {
    setIsQuickCaptureOpen(false);
  }, []);

  const openQuickCapture = React.useCallback(() => {
    setIsQuickCaptureOpen(true);
  }, []);

  const value = React.useMemo(
    () => ({
      addCapture,
      closeQuickCapture,
      isQuickCaptureOpen,
      items,
      openQuickCapture,
    }),
    [addCapture, closeQuickCapture, isQuickCaptureOpen, items, openQuickCapture],
  );

  return (
    <CaptureInboxContext.Provider value={value}>
      {children}
    </CaptureInboxContext.Provider>
  );
}

export function useCaptureInbox() {
  const context = React.useContext(CaptureInboxContext);

  if (!context) {
    throw new Error("useCaptureInbox must be used within CaptureInboxProvider");
  }

  return context;
}
