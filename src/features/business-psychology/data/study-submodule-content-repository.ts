import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";

export const studySubModuleContentFields = [
  { name: "summary", label: "Summary" },
  { name: "key-concepts", label: "Key Concepts" },
  { name: "notes", label: "Notes" },
  { name: "readings-resources", label: "Readings / Resources" },
  { name: "reflections", label: "Reflections" },
  { name: "linked-captures-references", label: "Linked Captures / References" },
] as const;

export type StudySubModuleFieldName =
  (typeof studySubModuleContentFields)[number]["name"];

export type StudySubModuleContent = {
  content: string;
  fieldName: StudySubModuleFieldName;
};

export type StudySubModuleContentKey = {
  subModuleSlug: string;
  unitSlug: string;
  weekSlug: string;
};

type Supabase = SupabaseClient<Database>;
type StudySubModuleContentRow =
  Database["public"]["Tables"]["study_submodule_content"]["Row"];

export async function listStudySubModuleContent(
  supabase: Supabase,
  key: StudySubModuleContentKey,
) {
  const { data, error } = await supabase
    .from("study_submodule_content")
    .select("*")
    .eq("unit_slug", key.unitSlug)
    .eq("week_slug", key.weekSlug)
    .eq("submodule_slug", key.subModuleSlug);

  if (error) {
    throw new Error(error.message);
  }

  return data
    .filter((row) => isStudySubModuleFieldName(row.field_name))
    .map(mapStudySubModuleContentRow);
}

export async function upsertStudySubModuleContent(
  supabase: Supabase,
  userId: string,
  key: StudySubModuleContentKey,
  fieldName: StudySubModuleFieldName,
  content: string,
) {
  const { data, error } = await supabase
    .from("study_submodule_content")
    .upsert(
      {
        content,
        field_name: fieldName,
        submodule_slug: key.subModuleSlug,
        unit_slug: key.unitSlug,
        user_id: userId,
        week_slug: key.weekSlug,
      },
      {
        onConflict: "user_id,unit_slug,week_slug,submodule_slug,field_name",
      },
    )
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapStudySubModuleContentRow(data);
}

function mapStudySubModuleContentRow(
  row: StudySubModuleContentRow,
): StudySubModuleContent {
  return {
    content: row.content,
    fieldName: row.field_name as StudySubModuleFieldName,
  };
}

function isStudySubModuleFieldName(
  value: string,
): value is StudySubModuleFieldName {
  return studySubModuleContentFields.some((field) => field.name === value);
}
