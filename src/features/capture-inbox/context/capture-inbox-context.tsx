"use client";

import * as React from "react";

import {
  createCaptureRecord,
  listCaptures,
  type NewCaptureInput,
  updateCaptureStatusRecord,
} from "@/features/capture-inbox/data/capture-repository";
import type {
  CaptureInboxItem,
  CaptureStatus,
  ProcessingTarget,
} from "@/features/capture-inbox/types";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type CaptureInboxContextValue = {
  addCapture: (capture: NewCaptureInput) => Promise<void>;
  closeQuickCapture: () => void;
  error: string | null;
  isQuickCaptureOpen: boolean;
  isLoading: boolean;
  items: CaptureInboxItem[];
  openQuickCapture: () => void;
  processCapture: (id: string, target: ProcessingTarget) => Promise<void>;
  updateCaptureStatus: (id: string, status: CaptureStatus) => Promise<void>;
};

const CaptureInboxContext =
  React.createContext<CaptureInboxContextValue | null>(null);

export function CaptureInboxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = React.useMemo(() => createSupabaseBrowserClient(), []);
  const [items, setItems] = React.useState<CaptureInboxItem[]>([]);
  const [userId, setUserId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    async function loadCaptures() {
      setIsLoading(true);
      setError(null);

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw new Error(userError.message);
        }

        if (!user) {
          throw new Error("No authenticated user found.");
        }

        const captures = await listCaptures(supabase);

        if (isMounted) {
          setUserId(user.id);
          setItems(captures);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(getErrorMessage(loadError));
          setItems([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCaptures();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  const addCapture = React.useCallback(
    async (capture: NewCaptureInput) => {
      if (!userId) {
        throw new Error("No authenticated user found.");
      }

      try {
        setError(null);
        const savedCapture = await createCaptureRecord(
          supabase,
          userId,
          capture,
        );

        setItems((current) => [savedCapture, ...current]);
      } catch (saveError) {
        setError(getErrorMessage(saveError));
        throw saveError;
      }
    },
    [supabase, userId],
  );

  const processCapture = React.useCallback(
    async (id: string, _target: ProcessingTarget) => {
      try {
        setError(null);
        const updatedCapture = await updateCaptureStatusRecord(
          supabase,
          id,
          "Processed",
        );

        setItems((current) =>
          current.map((item) => (item.id === id ? updatedCapture : item)),
        );
      } catch (processError) {
        setError(getErrorMessage(processError));
        throw processError;
      }
    },
    [supabase],
  );

  const updateCaptureStatus = React.useCallback(
    async (id: string, status: CaptureStatus) => {
      try {
        setError(null);
        const updatedCapture = await updateCaptureStatusRecord(
          supabase,
          id,
          status,
        );

        setItems((current) =>
          current.map((item) => (item.id === id ? updatedCapture : item)),
        );
      } catch (statusError) {
        setError(getErrorMessage(statusError));
        throw statusError;
      }
    },
    [supabase],
  );

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
      error,
      isLoading,
      isQuickCaptureOpen,
      items,
      openQuickCapture,
      processCapture,
      updateCaptureStatus,
    }),
    [
      addCapture,
      closeQuickCapture,
      error,
      isLoading,
      isQuickCaptureOpen,
      items,
      openQuickCapture,
      processCapture,
      updateCaptureStatus,
    ],
  );

  return (
    <CaptureInboxContext.Provider value={value}>
      {children}
    </CaptureInboxContext.Provider>
  );
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

export function useCaptureInbox() {
  const context = React.useContext(CaptureInboxContext);

  if (!context) {
    throw new Error("useCaptureInbox must be used within CaptureInboxProvider");
  }

  return context;
}
