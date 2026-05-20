import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/supabase/database.types";
import {
  capturePriorities,
  captureStatuses,
  captureTypes,
  lifeDomains,
  type CaptureInboxItem,
  type CapturePriority,
  type CaptureStatus,
  type CaptureSubDomain,
  type CaptureType,
  type LifeDomain,
} from "@/features/capture-inbox/types";

export type NewCaptureInput = {
  title?: string;
  rawContent: string;
  type?: CaptureType;
  domain?: LifeDomain;
  subDomain?: CaptureSubDomain;
  priority?: CapturePriority;
  tags?: string[];
  status?: CaptureStatus;
};

type Supabase = SupabaseClient<Database>;
type CaptureRow = Database["public"]["Tables"]["captures"]["Row"];

export async function listCaptures(supabase: Supabase) {
  const { data, error } = await supabase
    .from("captures")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(mapCaptureRow);
}

export async function createCaptureRecord(
  supabase: Supabase,
  userId: string,
  capture: NewCaptureInput,
) {
  const { data, error } = await supabase
    .from("captures")
    .insert({
      body: capture.rawContent,
      capture_type: capture.type ?? "Uncategorised",
      life_domain: capture.domain ?? "Uncategorised",
      priority: capture.priority ?? null,
      status: capture.status ?? "Unprocessed",
      sub_domain: capture.subDomain ?? null,
      tags: capture.tags ?? [],
      title: capture.title ?? null,
      user_id: userId,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapCaptureRow(data);
}

export async function updateCaptureStatusRecord(
  supabase: Supabase,
  id: string,
  status: CaptureStatus,
) {
  const { data, error } = await supabase
    .from("captures")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapCaptureRow(data);
}

function mapCaptureRow(row: CaptureRow): CaptureInboxItem {
  const domain = readOptionalValue(row.life_domain, lifeDomains);
  const subDomain = row.sub_domain
    ? (row.sub_domain as CaptureSubDomain)
    : undefined;

  return {
    createdAt: row.created_at,
    domain,
    id: row.id,
    priority: readOptionalValue(row.priority, capturePriorities),
    rawContent: row.body,
    status: readStatus(row.status),
    subDomain,
    tags: row.tags ?? [],
    title: row.title ?? undefined,
    type: readOptionalValue(row.capture_type, captureTypes),
    aiRoutingHint: domain
      ? `Routed to ${subDomain ? `${domain} / ${subDomain}` : domain}.`
      : "Uncategorised. Ready for later routing.",
  };
}

function readOptionalValue<T extends readonly string[]>(
  value: string | null,
  options: T,
): T[number] | undefined {
  if (!value || value === "Uncategorised") {
    return undefined;
  }

  return options.includes(value as T[number]) ? (value as T[number]) : undefined;
}

function readStatus(value: string): CaptureStatus {
  return captureStatuses.includes(value as CaptureStatus)
    ? (value as CaptureStatus)
    : "Unprocessed";
}
