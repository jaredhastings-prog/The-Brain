"use client";

import * as React from "react";
import { ChevronDown, Inbox, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCaptureInbox } from "@/features/capture-inbox/context/capture-inbox-context";
import {
  capturePriorities,
  captureStatuses,
  captureTypes,
  domainHierarchy,
  lifeDomains,
  type CapturePriority,
  type CaptureStatus,
  type CaptureSubDomain,
  type CaptureType,
  type LifeDomain,
} from "@/features/capture-inbox/types";
import { cn } from "@/lib/utils";

type QuickCaptureFormState = {
  title: string;
  rawContent: string;
  type: "" | CaptureType;
  domain: "" | LifeDomain;
  subDomain: "" | CaptureSubDomain;
  priority: "" | CapturePriority;
  tags: string;
  status: CaptureStatus;
};

const initialFormState: QuickCaptureFormState = {
  title: "",
  rawContent: "",
  type: "",
  domain: "",
  subDomain: "",
  priority: "",
  tags: "",
  status: "Unprocessed",
};

export function GlobalQuickCapture() {
  const { isQuickCaptureOpen, openQuickCapture } = useCaptureInbox();

  return (
    <>
      <Button
        aria-label="Open quick capture"
        className="fixed bottom-5 right-5 z-40 size-14 rounded-full shadow-[0_16px_36px_rgb(24_24_27_/_0.18)] md:bottom-8 md:right-8"
        onClick={openQuickCapture}
        size="icon"
        type="button"
      >
        <Plus className="size-6" />
      </Button>
      {isQuickCaptureOpen ? <QuickCaptureModal /> : null}
    </>
  );
}

export function QuickCaptureButton({
  children = "Quick capture",
  ...props
}: Omit<
  React.ComponentPropsWithoutRef<typeof Button>,
  "asChild" | "onClick" | "type"
>) {
  const { openQuickCapture } = useCaptureInbox();

  return (
    <Button {...props} onClick={openQuickCapture} type="button">
      {children}
    </Button>
  );
}

function QuickCaptureModal() {
  const { addCapture, closeQuickCapture } = useCaptureInbox();
  const [form, setForm] =
    React.useState<QuickCaptureFormState>(initialFormState);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const availableSubDomains = form.domain ? domainHierarchy[form.domain] : [];
  const canSave = Boolean(form.rawContent.trim());

  function updateField<K extends keyof QuickCaptureFormState>(
    field: K,
    value: QuickCaptureFormState[K],
  ) {
    setForm((current) => {
      if (field === "domain") {
        return { ...current, [field]: value, subDomain: "" };
      }

      return { ...current, [field]: value };
    });
  }

  function handleClose() {
    setForm(initialFormState);
    setFormError(null);
    setIsSaving(false);
    setIsDetailsOpen(false);
    closeQuickCapture();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedContent = form.rawContent.trim();

    if (!trimmedContent) {
      return;
    }

    setFormError(null);
    setIsSaving(true);

    try {
      await addCapture({
        title: form.title.trim() || undefined,
        rawContent: trimmedContent,
        type: form.type || undefined,
        domain: form.domain || undefined,
        subDomain: form.subDomain || undefined,
        priority: form.priority || undefined,
        status: form.status,
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });
      handleClose();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to save capture.",
      );
      setIsSaving(false);
    }
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end bg-zinc-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
    >
      <div className="w-full rounded-t-2xl border border-border bg-card shadow-[0_24px_70px_rgb(24_24_27_/_0.22)] sm:mx-auto sm:max-w-2xl sm:rounded-lg">
        <form
          className="max-h-[92vh] overflow-y-auto p-4 sm:p-5"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Quick Capture
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Dump it now
              </h2>
            </div>
            <Button
              aria-label="Close quick capture"
              onClick={handleClose}
              size="icon"
              type="button"
              variant="ghost"
            >
              <X className="size-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <FieldGroup label="Quick title">
              <Input
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Optional"
                value={form.title}
              />
            </FieldGroup>

            <FieldGroup label="Brain dump">
              <textarea
                autoFocus
                className="min-h-44 w-full resize-y rounded-md border border-input bg-card px-3 py-3 text-base leading-7 text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-52"
                onChange={(event) =>
                  updateField("rawContent", event.target.value)
                }
                placeholder="Drop the thought here..."
                value={form.rawContent}
              />
            </FieldGroup>
          </div>

          <button
            aria-expanded={isDetailsOpen}
            className="mt-4 flex w-full items-center justify-between rounded-md border border-border/80 bg-muted/45 px-3 py-2 text-sm font-medium text-foreground"
            onClick={() => setIsDetailsOpen((current) => !current)}
            type="button"
          >
            Add Details
            <ChevronDown
              className={cn(
                "size-4 transition-transform",
                isDetailsOpen && "rotate-180",
              )}
            />
          </button>

          {isDetailsOpen ? (
            <div className="mt-3 grid gap-3 rounded-lg border border-border/80 bg-muted/35 p-3 sm:grid-cols-2">
              <FieldGroup label="Capture type">
                <Select
                  onChange={(value) => updateField("type", value as CaptureType)}
                  options={captureTypes}
                  placeholder="Uncategorised"
                  value={form.type}
                />
              </FieldGroup>
              <FieldGroup label="Life domain">
                <Select
                  onChange={(value) => updateField("domain", value as LifeDomain)}
                  options={lifeDomains}
                  placeholder="Uncategorised"
                  value={form.domain}
                />
              </FieldGroup>
              <FieldGroup label="Sub-domain">
                <Select
                  disabled={!form.domain || !availableSubDomains.length}
                  onChange={(value) =>
                    updateField(
                      "subDomain",
                      value as QuickCaptureFormState["subDomain"],
                    )
                  }
                  options={availableSubDomains}
                  placeholder={
                    !form.domain
                      ? "Choose a domain first"
                      : availableSubDomains.length
                        ? "No sub-domain"
                        : "No sub-domains"
                  }
                  value={form.subDomain}
                />
              </FieldGroup>
              <FieldGroup label="Priority">
                <Select
                  onChange={(value) =>
                    updateField("priority", value as CapturePriority)
                  }
                  options={capturePriorities}
                  placeholder="No priority"
                  value={form.priority}
                />
              </FieldGroup>
              <FieldGroup label="Tags">
                <Input
                  onChange={(event) => updateField("tags", event.target.value)}
                  placeholder="Comma-separated"
                  value={form.tags}
                />
              </FieldGroup>
              <FieldGroup label="Status">
                <Select
                  onChange={(value) =>
                    updateField("status", value as CaptureStatus)
                  }
                  options={captureStatuses}
                  value={form.status}
                />
              </FieldGroup>
            </div>
          ) : null}

          <div className="mt-5 flex items-center justify-end gap-2">
            <Button onClick={handleClose} type="button" variant="ghost">
              Cancel
            </Button>
            <Button disabled={!canSave || isSaving} type="submit">
              {isSaving ? "Saving..." : "Save capture"}
              <Inbox className="size-4" />
            </Button>
          </div>
          {formError ? (
            <div className="mt-3 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {formError}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

function FieldGroup({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

function Select<T extends readonly string[]>({
  disabled = false,
  onChange,
  options,
  placeholder,
  value,
}: {
  disabled?: boolean;
  onChange: (value: string) => void;
  options: T;
  placeholder?: string;
  value: "" | T[number];
}) {
  return (
    <select
      className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      {placeholder ? <option value="">{placeholder}</option> : null}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
