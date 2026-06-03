"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  listStudySubModuleContent,
  studySubModuleContentFields,
  type StudySubModuleContentKey,
  type StudySubModuleFieldName,
  upsertStudySubModuleContent,
} from "@/features/business-psychology/data/study-submodule-content-repository";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { cn } from "@/lib/utils";

type FieldStatus = "idle" | "saving" | "saved" | "error";
type FieldValues = Record<StudySubModuleFieldName, string>;
type FieldStatuses = Record<StudySubModuleFieldName, FieldStatus>;
type FieldErrors = Partial<Record<StudySubModuleFieldName, string>>;

export function HealthyWorkSubModuleContentEditor({
  subModuleSlug,
  unitSlug,
  weekSlug,
}: StudySubModuleContentKey) {
  const supabase = React.useMemo(
    () => (hasSupabaseConfig() ? createSupabaseBrowserClient() : null),
    [],
  );
  const [values, setValues] = React.useState<FieldValues>(createEmptyValues);
  const [statuses, setStatuses] =
    React.useState<FieldStatuses>(createIdleStatuses);
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [savedFields, setSavedFields] = React.useState<
    Set<StudySubModuleFieldName>
  >(() => new Set());
  const [userId, setUserId] = React.useState<string | null>(null);
  const [loadStatus, setLoadStatus] = React.useState<
    "loading" | "ready" | "error"
  >("loading");
  const [loadError, setLoadError] = React.useState("");

  const contentKey = React.useMemo(
    () => ({
      subModuleSlug,
      unitSlug,
      weekSlug,
    }),
    [subModuleSlug, unitSlug, weekSlug],
  );

  React.useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      if (!supabase) {
        setLoadStatus("error");
        setLoadError(
          "Supabase is not configured, so editable fields cannot load or save yet.",
        );
        return;
      }

      try {
        setLoadStatus("loading");
        setLoadError("");
        setErrors({});

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw new Error(userError.message);
        }

        if (!user) {
          throw new Error("Sign in to load and save editable study content.");
        }

        const savedContent = await listStudySubModuleContent(
          supabase,
          contentKey,
        );
        const nextValues = createEmptyValues();
        const nextSavedFields = new Set<StudySubModuleFieldName>();

        savedContent.forEach((field) => {
          nextValues[field.fieldName] = field.content;
          nextSavedFields.add(field.fieldName);
        });

        if (isMounted) {
          setUserId(user.id);
          setValues(nextValues);
          setSavedFields(nextSavedFields);
          setStatuses(createIdleStatuses());
          setLoadStatus("ready");
        }
      } catch (error) {
        if (isMounted) {
          setLoadStatus("error");
          setLoadError(getErrorMessage(error));
        }
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [contentKey, supabase]);

  const updateField = React.useCallback(
    (fieldName: StudySubModuleFieldName, value: string) => {
      setValues((current) => ({
        ...current,
        [fieldName]: value,
      }));
      setStatuses((current) => ({
        ...current,
        [fieldName]: "idle",
      }));
      setErrors((current) => ({
        ...current,
        [fieldName]: undefined,
      }));
    },
    [],
  );

  const saveField = React.useCallback(
    async (fieldName: StudySubModuleFieldName) => {
      if (!supabase || !userId) {
        setStatuses((current) => ({ ...current, [fieldName]: "error" }));
        setErrors((current) => ({
          ...current,
          [fieldName]: "Sign in before saving this field.",
        }));
        return;
      }

      try {
        setStatuses((current) => ({ ...current, [fieldName]: "saving" }));
        setErrors((current) => ({ ...current, [fieldName]: undefined }));

        const savedField = await upsertStudySubModuleContent(
          supabase,
          userId,
          contentKey,
          fieldName,
          values[fieldName],
        );

        setValues((current) => ({
          ...current,
          [fieldName]: savedField.content,
        }));
        setSavedFields((current) => new Set(current).add(fieldName));
        setStatuses((current) => ({ ...current, [fieldName]: "saved" }));
      } catch (error) {
        setStatuses((current) => ({ ...current, [fieldName]: "error" }));
        setErrors((current) => ({
          ...current,
          [fieldName]: getErrorMessage(error),
        }));
      }
    },
    [contentKey, supabase, userId, values],
  );

  if (loadStatus === "loading") {
    return (
      <div className="rounded-md border border-dashed border-border bg-background/65 p-4 text-sm leading-6 text-muted-foreground">
        Loading saved editable content...
      </div>
    );
  }

  if (loadStatus === "error") {
    return (
      <div className="rounded-md border border-dashed border-border bg-background/65 p-4 text-sm leading-6 text-muted-foreground">
        {loadError}
      </div>
    );
  }

  return (
    <div className="grid min-w-0 gap-3 lg:grid-cols-2">
      {studySubModuleContentFields.map((field) => {
        const fieldStatus = statuses[field.name];
        const hasContent = Boolean(values[field.name].trim());
        const hasSavedContent = savedFields.has(field.name);
        const isSaving = fieldStatus === "saving";
        const canSave = !isSaving && (hasContent || hasSavedContent);

        return (
          <section
            className="min-w-0 rounded-md border border-border/70 bg-muted/25 p-3"
            key={field.name}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                className="text-xs font-medium uppercase tracking-normal text-muted-foreground"
                htmlFor={`${subModuleSlug}-${field.name}`}
              >
                {field.label}
              </label>
              <span
                className={cn(
                  "text-xs text-muted-foreground",
                  fieldStatus === "saved" && "text-emerald-700",
                  fieldStatus === "error" && "text-destructive",
                )}
              >
                {readStatusLabel(fieldStatus, canSave)}
              </span>
            </div>
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm leading-6 shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              id={`${subModuleSlug}-${field.name}`}
              onChange={(event) => updateField(field.name, event.target.value)}
              placeholder="Content to be added."
              value={values[field.name]}
            />
            {errors[field.name] ? (
              <p className="mt-2 text-xs leading-5 text-destructive">
                {errors[field.name]}
              </p>
            ) : null}
            <div className="mt-3 flex justify-end">
              <Button
                disabled={!canSave}
                onClick={() => saveField(field.name)}
                size="sm"
                type="button"
                variant="secondary"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function createEmptyValues(): FieldValues {
  return studySubModuleContentFields.reduce((values, field) => {
    values[field.name] = "";
    return values;
  }, {} as FieldValues);
}

function createIdleStatuses(): FieldStatuses {
  return studySubModuleContentFields.reduce((statuses, field) => {
    statuses[field.name] = "idle";
    return statuses;
  }, {} as FieldStatuses);
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong.";
}

function readStatusLabel(status: FieldStatus, canSave: boolean) {
  if (status === "saving") {
    return "Saving...";
  }

  if (status === "saved") {
    return "Saved";
  }

  if (status === "error") {
    return "Error";
  }

  return canSave ? "Ready to save" : "Add text, then save";
}
