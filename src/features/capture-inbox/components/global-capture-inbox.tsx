"use client";

import * as React from "react";
import {
  AudioLines,
  BrainCircuit,
  Filter,
  Inbox,
  Plus,
  Tags,
} from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockCapturedItems } from "@/features/capture-inbox/data/mock-captures";
import {
  capturePriorities,
  captureStatuses,
  captureTypes,
  lifeDomains,
  type CaptureInboxItem,
  type CapturePriority,
  type CaptureStatus,
  type CaptureType,
  type LifeDomain,
} from "@/features/capture-inbox/types";
import { cn } from "@/lib/utils";

type FilterValue<T extends string> = "All" | T;

type CaptureFormState = {
  title: string;
  rawContent: string;
  type: CaptureType;
  domain: LifeDomain;
  priority: CapturePriority;
  tags: string;
  status: CaptureStatus;
};

const initialFormState: CaptureFormState = {
  title: "",
  rawContent: "",
  type: "Idea",
  domain: "Business",
  priority: "Medium",
  tags: "",
  status: "Inbox",
};

export function GlobalCaptureInbox() {
  const [items, setItems] = React.useState<CaptureInboxItem[]>(mockCapturedItems);
  const [form, setForm] = React.useState<CaptureFormState>(initialFormState);
  const [typeFilter, setTypeFilter] =
    React.useState<FilterValue<CaptureType>>("All");
  const [domainFilter, setDomainFilter] =
    React.useState<FilterValue<LifeDomain>>("All");
  const [statusFilter, setStatusFilter] =
    React.useState<FilterValue<CaptureStatus>>("All");

  const filteredItems = items.filter((item) => {
    const matchesType = typeFilter === "All" || item.type === typeFilter;
    const matchesDomain = domainFilter === "All" || item.domain === domainFilter;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesType && matchesDomain && matchesStatus;
  });

  function updateField<K extends keyof CaptureFormState>(
    field: K,
    value: CaptureFormState[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = form.title.trim();
    const trimmedContent = form.rawContent.trim();

    if (!trimmedTitle || !trimmedContent) {
      return;
    }

    const nextItem: CaptureInboxItem = {
      id: `capture-${Date.now()}`,
      title: trimmedTitle,
      type: form.type,
      domain: form.domain,
      priority: form.priority,
      status: form.status,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      rawContent: trimmedContent,
      createdAt: new Date().toISOString(),
      aiRoutingHint: "Future AI routing will suggest section, owner, and next action.",
    };

    setItems((current) => [nextItem, ...current]);
    setForm(initialFormState);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="signal">Global Capture</Badge>
          <Badge variant="outline">Ready for triage</Badge>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
              Global Capture Inbox
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A low-friction place to get thoughts, actions, memories, study
              notes, relationship context, and operating signals out of your head
              before they become noise.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <CaptureStat label="Captured" value={items.length.toString()} />
            <CaptureStat
              label="In inbox"
              value={items
                .filter((item) => item.status === "Inbox")
                .length.toString()}
            />
            <CaptureStat
              label="High priority"
              value={items
                .filter((item) => item.priority === "High" || item.priority === "Urgent")
                .length.toString()}
            />
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.25fr)]">
        <DashboardCard
          description="Create a structured capture without deciding the perfect final home yet."
          eyebrow="Quick entry"
          title="Capture Something"
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FieldGroup label="Title">
              <Input
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="Give the capture a clear handle"
                value={form.title}
              />
            </FieldGroup>

            <FieldGroup label="Raw note / brain dump">
              <textarea
                className="min-h-36 w-full resize-y rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onChange={(event) =>
                  updateField("rawContent", event.target.value)
                }
                placeholder="Dump the thought, context, task, memory, or note here..."
                value={form.rawContent}
              />
            </FieldGroup>

            <div className="grid gap-3 sm:grid-cols-2">
              <FieldGroup label="Capture type">
                <Select
                  onChange={(value) => updateField("type", value as CaptureType)}
                  options={captureTypes}
                  value={form.type}
                />
              </FieldGroup>
              <FieldGroup label="Life domain">
                <Select
                  onChange={(value) => updateField("domain", value as LifeDomain)}
                  options={lifeDomains}
                  value={form.domain}
                />
              </FieldGroup>
              <FieldGroup label="Priority">
                <Select
                  onChange={(value) =>
                    updateField("priority", value as CapturePriority)
                  }
                  options={capturePriorities}
                  value={form.priority}
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

            <FieldGroup label="Tags">
              <Input
                onChange={(event) => updateField("tags", event.target.value)}
                placeholder="Comma-separated tags"
                value={form.tags}
              />
            </FieldGroup>

            <Button className="w-full justify-between" type="submit">
              <span className="inline-flex items-center gap-2">
                <Plus className="size-4" />
                Add to inbox
              </span>
              <Inbox className="size-4" />
            </Button>
          </form>
        </DashboardCard>

        <div className="space-y-4">
          <DashboardCard
            description="Narrow captures by type, domain, and status while items wait for routing."
            eyebrow="Triage"
            title="Captured Items"
          >
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
              />
            </div>

            <div className="space-y-3">
              {filteredItems.length ? (
                filteredItems.map((item) => (
                  <CapturedItemCard item={item} key={item.id} />
                ))
              ) : (
                <div className="rounded-md border border-border/70 bg-muted/45 px-4 py-8 text-center text-sm text-muted-foreground">
                  No captures match the current filters.
                </div>
              )}
            </div>
          </DashboardCard>

          <div className="grid gap-4 md:grid-cols-2">
            <FuturePlaceholder
              description="Placeholder for spoken capture, transcription, and review before routing."
              icon={<AudioLines className="size-4" />}
              title="Voice Capture"
            />
            <FuturePlaceholder
              description="Placeholder for routing suggestions across domain, tags, related memories, and next action."
              icon={<BrainCircuit className="size-4" />}
              title="AI Auto-Routing"
            />
          </div>
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
  onChange,
  options,
  value,
}: {
  onChange: (value: string) => void;
  options: T;
  value: T[number];
}) {
  return (
    <select
      className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onChange={(event) => onChange(event.target.value)}
      value={value}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function FilterSelect<T extends readonly string[]>({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: T;
  value: "All" | T[number];
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
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function CapturedItemCard({ item }: { item: CaptureInboxItem }) {
  return (
    <article className="rounded-md border border-border/80 bg-card/95 p-4 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={item.status === "Inbox" ? "attention" : "secondary"}>
              {item.status}
            </Badge>
            <Badge variant="outline">{item.type}</Badge>
            <Badge variant="outline">{item.domain}</Badge>
          </div>
          <h2 className="mt-3 text-base font-semibold text-foreground">
            {item.title}
          </h2>
        </div>
        <PriorityBadge priority={item.priority} />
      </div>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {item.rawContent}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Tags className="size-3" />
          Tags
        </span>
        {item.tags.length ? (
          item.tags.map((tag) => (
            <span
              className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
              key={tag}
            >
              {tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">None</span>
        )}
      </div>

      <div className="mt-4 rounded-md border border-dashed border-border bg-muted/35 px-3 py-2 text-xs leading-5 text-muted-foreground">
        {item.aiRoutingHint}
      </div>
    </article>
  );
}

function PriorityBadge({ priority }: { priority: CapturePriority }) {
  return (
    <span
      className={cn(
        "w-fit rounded-md border px-2 py-1 text-xs font-medium",
        priority === "Urgent" &&
          "border-red-600/20 bg-red-50 text-red-700",
        priority === "High" &&
          "border-amber-600/20 bg-amber-50 text-amber-700",
        priority === "Medium" &&
          "border-cyan-700/20 bg-cyan-50 text-cyan-700",
        priority === "Low" &&
          "border-zinc-500/20 bg-zinc-50 text-zinc-600",
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
    <div className="rounded-lg border border-dashed border-border bg-card/80 p-4">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-md bg-accent text-accent-foreground">
          {icon}
        </div>
        <div className="font-medium text-foreground">{title}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
