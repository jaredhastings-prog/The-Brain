"use client";

import * as React from "react";
import {
  Archive,
  BrainCircuit,
  CheckCircle2,
  Filter,
  Mic,
  Sparkles,
  Tags,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCaptureInbox } from "@/features/capture-inbox/context/capture-inbox-context";
import {
  captureStatuses,
  captureTypes,
  lifeDomains,
  processingTargets,
  type CaptureInboxItem,
  type CapturePriority,
  type CaptureStatus,
  type CaptureType,
  type LifeDomain,
  type ProcessingTarget,
} from "@/features/capture-inbox/types";
import { cn } from "@/lib/utils";

type FilterValue<T extends string> = "All" | "Uncategorised" | T;

export function GlobalCaptureInbox() {
  const { error, isLoading, items, processCapture, updateCaptureStatus } =
    useCaptureInbox();
  const [actionNoticeByItem, setActionNoticeByItem] = React.useState<
    Record<string, string>
  >({});
  const [typeFilter, setTypeFilter] =
    React.useState<FilterValue<CaptureType>>("All");
  const [domainFilter, setDomainFilter] =
    React.useState<FilterValue<LifeDomain>>("All");
  const [statusFilter, setStatusFilter] =
    React.useState<FilterValue<CaptureStatus>>("All");

  const filteredItems = items.filter((item) => {
    const matchesType =
      typeFilter === "All" ||
      (typeFilter === "Uncategorised" ? !item.type : item.type === typeFilter);
    const matchesDomain =
      domainFilter === "All" ||
      (domainFilter === "Uncategorised"
        ? !item.domain
        : item.domain === domainFilter);
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesType && matchesDomain && matchesStatus;
  });

  const unprocessedCount = items.filter(
    (item) => item.status === "Unprocessed",
  ).length;
  const archivedCount = items.filter(
    (item) => item.status === "Archived",
  ).length;

  function showActionNotice(id: string, message: string) {
    setActionNoticeByItem((current) => ({ ...current, [id]: message }));
  }

  async function runItemAction(
    id: string,
    action: () => Promise<void>,
    successMessage: string,
  ) {
    try {
      await action();
      showActionNotice(id, successMessage);
    } catch (actionError) {
      showActionNotice(
        id,
        actionError instanceof Error
          ? actionError.message
          : "Unable to update capture.",
      );
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="signal">Global Capture</Badge>
          <Badge variant="outline">Fast dump mode</Badge>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
              Global Capture Inbox
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Capture first, categorise later. Drop the thought quickly and let
              the inbox hold it until you are ready to triage.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <CaptureStat label="Captured" value={items.length.toString()} />
            <CaptureStat
              label="Unprocessed"
              value={unprocessedCount.toString()}
            />
            <CaptureStat
              label="Archived"
              value={archivedCount.toString()}
            />
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_340px]">
        <DashboardCard
          description="Filter lightly when needed. New captures can stay uncategorised until later."
          eyebrow="Triage"
          title="Captured Items"
        >
          {error ? (
            <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          ) : null}
          <div className="mb-4 grid gap-3 md:grid-cols-3">
            <FilterSelect
              label="Type"
              onChange={(value) =>
                setTypeFilter(value as FilterValue<CaptureType>)
              }
              options={captureTypes}
              value={typeFilter}
            />
            <FilterSelect
              label="Domain"
              onChange={(value) =>
                setDomainFilter(value as FilterValue<LifeDomain>)
              }
              options={lifeDomains}
              value={domainFilter}
            />
            <FilterSelect
              label="Status"
              onChange={(value) =>
                setStatusFilter(value as FilterValue<CaptureStatus>)
              }
              options={captureStatuses}
              value={statusFilter}
              withUncategorised={false}
            />
          </div>

          <div className="space-y-3">
            {isLoading ? (
              <div className="rounded-md border border-border/70 bg-muted/45 px-4 py-8 text-center text-sm text-muted-foreground">
                Loading captures...
              </div>
            ) : filteredItems.length ? (
              filteredItems.map((item) => (
                <CapturedItemCard
                  actionNotice={actionNoticeByItem[item.id]}
                  item={item}
                  key={item.id}
                  onArchive={() =>
                    runItemAction(
                      item.id,
                      () => updateCaptureStatus(item.id, "Archived"),
                      "Archived in Supabase.",
                    )
                  }
                  onMarkProcessed={() =>
                    runItemAction(
                      item.id,
                      () => updateCaptureStatus(item.id, "Processed"),
                      "Marked processed in Supabase.",
                    )
                  }
                  onPlaceholderAction={(action) =>
                    showActionNotice(item.id, `${action} coming soon.`)
                  }
                  onProcess={(target) =>
                    runItemAction(
                      item.id,
                      () => processCapture(item.id, target),
                      `${target} routing is coming soon. Capture marked processed.`,
                    )
                  }
                />
              ))
            ) : (
              <div className="rounded-md border border-border/70 bg-muted/45 px-4 py-8 text-center text-sm text-muted-foreground">
                No captures match the current filters.
              </div>
            )}
          </div>
        </DashboardCard>

        <div className="space-y-4">
          <DashboardCard
            description="Future capture assists are reserved here without adding backend or AI logic yet."
            eyebrow="Future assist"
            title="Capture Intelligence"
          >
            <div className="space-y-3">
              <FuturePlaceholder
                description="Voice capture placeholder"
                icon={<Mic className="size-4" />}
                title="Voice Capture"
              />
              <FuturePlaceholder
                description="AI auto-categorisation placeholder"
                icon={<BrainCircuit className="size-4" />}
                title="Auto-Categorisation"
              />
              <FuturePlaceholder
                description="AI suggested tags placeholder"
                icon={<Sparkles className="size-4" />}
                title="Suggested Tags"
              />
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}

function CaptureStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/80 bg-muted/45 px-4 py-3">
      <div className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold tracking-normal text-foreground">
        {value}
      </div>
    </div>
  );
}

function FilterSelect<T extends readonly string[]>({
  label,
  onChange,
  options,
  value,
  withUncategorised = true,
}: {
  label: string;
  onChange: (value: string) => void;
  options: T;
  value: FilterValue<T[number]>;
  withUncategorised?: boolean;
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
        <Filter className="size-3" />
        {label}
      </span>
      <select
        className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="All">All</option>
        {withUncategorised ? (
          <option value="Uncategorised">Uncategorised</option>
        ) : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CapturedItemCard({
  actionNotice,
  item,
  onArchive,
  onMarkProcessed,
  onPlaceholderAction,
  onProcess,
}: {
  actionNotice?: string;
  item: CaptureInboxItem;
  onArchive: () => Promise<void>;
  onMarkProcessed: () => Promise<void>;
  onPlaceholderAction: (action: string) => void;
  onProcess: (target: ProcessingTarget) => Promise<void>;
}) {
  const isArchived = item.status === "Archived";
  const isProcessed = item.status === "Processed";

  return (
    <article className="rounded-md border border-border/80 bg-card/95 p-4 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={getStatusBadgeVariant(item.status)}>
              {item.status}
            </Badge>
            <Badge variant="outline">
              Capture: {item.type ?? "Uncategorised"}
            </Badge>
            <Badge variant="outline">
              Domain: {item.domain ?? "Uncategorised"}
            </Badge>
            <Badge variant="outline">
              Sub-domain: {item.subDomain ?? "None"}
            </Badge>
          </div>
          <h2 className="mt-3 text-base font-semibold text-foreground">
            {item.title ?? "Untitled capture"}
          </h2>
          <div className="mt-1 text-xs text-muted-foreground">
            Created {formatCaptureDate(item.createdAt)}
          </div>
        </div>
        {item.priority ? <PriorityBadge priority={item.priority} /> : null}
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {item.rawContent}
      </p>

      {item.tags.length ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Tags className="size-3" />
            Tags
          </span>
          {item.tags.map((tag) => (
            <span
              className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-4 rounded-md border border-dashed border-border bg-muted/35 px-3 py-2 text-xs leading-5 text-muted-foreground">
        {item.aiRoutingHint}
      </div>

      <div className="mt-4 border-t border-border/70 pt-4">
        <div className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
          Process
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {processingTargets.map((target) => (
            <Button
              disabled={isArchived}
              key={target}
              onClick={() => onProcess(target)}
              size="sm"
              type="button"
              variant="secondary"
            >
              Convert to {target}
            </Button>
          ))}
          <Button
            disabled={isProcessed || isArchived}
            onClick={onMarkProcessed}
            size="sm"
            type="button"
            variant="outline"
          >
            <CheckCircle2 className="size-3.5" />
            Mark Processed
          </Button>
          <Button
            disabled={isArchived}
            onClick={onArchive}
            size="sm"
            type="button"
            variant="outline"
          >
            <Archive className="size-3.5" />
            Archive
          </Button>
        </div>
      </div>

      <div className="mt-4 border-t border-border/70 pt-4">
        <div className="text-xs font-medium uppercase tracking-normal text-muted-foreground">
          AI Assist
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Suggest destination", "Extract actions", "Summarise"].map(
            (action) => (
              <Button
                key={action}
                onClick={() => onPlaceholderAction(action)}
                size="sm"
                type="button"
                variant="ghost"
              >
                <Sparkles className="size-3.5" />
                {action}
              </Button>
            ),
          )}
        </div>
        {actionNotice ? (
          <div className="mt-3 rounded-md border border-border/70 bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
            {actionNotice}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function getStatusBadgeVariant(
  status: CaptureStatus,
): "attention" | "secondary" | "signal" {
  if (status === "Processed") {
    return "signal";
  }

  if (status === "Archived") {
    return "secondary";
  }

  return "attention";
}

function formatCaptureDate(value: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
  }).format(new Date(value));
}

function PriorityBadge({ priority }: { priority: CapturePriority }) {
  return (
    <span
      className={cn(
        "w-fit rounded-md border px-2 py-1 text-xs font-medium",
        priority === "Urgent" && "border-red-600/20 bg-red-50 text-red-700",
        priority === "High" &&
          "border-amber-600/20 bg-amber-50 text-amber-700",
        priority === "Medium" &&
          "border-cyan-700/20 bg-cyan-50 text-cyan-700",
        priority === "Low" && "border-zinc-500/20 bg-zinc-50 text-zinc-600",
      )}
    >
      {priority}
    </span>
  );
}

function FuturePlaceholder({
  description,
  icon,
  title,
}: {
  description: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-md border border-dashed border-border bg-muted/35 p-3">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-md bg-accent text-accent-foreground">
          {icon}
        </div>
        <div>
          <div className="font-medium text-foreground">{title}</div>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
