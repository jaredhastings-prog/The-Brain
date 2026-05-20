"use client";

import * as React from "react";
import {
  BrainCircuit,
  ChevronDown,
  Filter,
  Inbox,
  Mic,
  Plus,
  Sparkles,
  Tags,
  X,
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
  domainHierarchy,
  lifeDomains,
  type CaptureInboxItem,
  type CapturePriority,
  type CaptureStatus,
  type CaptureSubDomain,
  type CaptureType,
  type LifeDomain,
} from "@/features/capture-inbox/types";
import { cn } from "@/lib/utils";

type FilterValue<T extends string> = "All" | "Uncategorised" | T;

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
  status: "Inbox",
};

export function GlobalCaptureInbox() {
  const [items, setItems] = React.useState<CaptureInboxItem[]>(mockCapturedItems);
  const [form, setForm] =
    React.useState<QuickCaptureFormState>(initialFormState);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
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

  const availableSubDomains = form.domain ? domainHierarchy[form.domain] : [];
  const canSave = Boolean(form.title.trim() || form.rawContent.trim());
  const inboxCount = items.filter((item) => item.status === "Inbox").length;
  const uncategorisedCount = items.filter((item) => !item.domain).length;

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

  function closeModal() {
    setIsModalOpen(false);
    setIsDetailsOpen(false);
  }

  function resetCapture() {
    setForm(initialFormState);
    setIsDetailsOpen(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = form.title.trim();
    const trimmedContent = form.rawContent.trim();

    if (!trimmedTitle && !trimmedContent) {
      return;
    }

    const domain = form.domain || undefined;
    const type = form.type || undefined;
    const priority = form.priority || undefined;
    const subDomain =
      domain && form.subDomain
        ? (form.subDomain as CaptureSubDomain)
        : undefined;

    const nextItem: CaptureInboxItem = {
      id: `capture-${Date.now()}`,
      title: trimmedTitle || undefined,
      type,
      domain,
      subDomain,
      priority,
      status: form.status,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      rawContent: trimmedContent || trimmedTitle,
      createdAt: new Date().toISOString(),
      aiRoutingHint: domain
        ? `Routed to ${subDomain ? `${domain} / ${subDomain}` : domain}.`
        : "Uncategorised. Ready for later routing.",
    };

    setItems((current) => [nextItem, ...current]);
    resetCapture();
    setIsModalOpen(false);
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
            <CaptureStat label="In inbox" value={inboxCount.toString()} />
            <CaptureStat
              label="Uncategorised"
              value={uncategorisedCount.toString()}
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

      <Button
        aria-label="Open quick capture"
        className="fixed bottom-5 right-5 z-40 size-14 rounded-full shadow-[0_16px_36px_rgb(24_24_27_/_0.18)] md:bottom-8 md:right-8"
        onClick={() => setIsModalOpen(true)}
        size="icon"
        type="button"
      >
        <Plus className="size-6" />
      </Button>

      {isModalOpen ? (
        <QuickCaptureModal
          availableSubDomains={availableSubDomains}
          canSave={canSave}
          form={form}
          isDetailsOpen={isDetailsOpen}
          onClose={closeModal}
          onDetailsToggle={() => setIsDetailsOpen((current) => !current)}
          onSubmit={handleSubmit}
          updateField={updateField}
        />
      ) : null}
    </div>
  );
}

function QuickCaptureModal({
  availableSubDomains,
  canSave,
  form,
  isDetailsOpen,
  onClose,
  onDetailsToggle,
  onSubmit,
  updateField,
}: {
  availableSubDomains: readonly string[];
  canSave: boolean;
  form: QuickCaptureFormState;
  isDetailsOpen: boolean;
  onClose: () => void;
  onDetailsToggle: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  updateField: <K extends keyof QuickCaptureFormState>(
    field: K,
    value: QuickCaptureFormState[K],
  ) => void;
}) {
  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end bg-zinc-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
    >
      <div className="w-full rounded-t-2xl border border-border bg-card shadow-[0_24px_70px_rgb(24_24_27_/_0.22)] sm:mx-auto sm:max-w-2xl sm:rounded-lg">
        <form
          className="max-h-[92vh] overflow-y-auto p-4 sm:p-5"
          onSubmit={onSubmit}
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
              onClick={onClose}
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
            onClick={onDetailsToggle}
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
            <Button onClick={onClose} type="button" variant="ghost">
              Cancel
            </Button>
            <Button disabled={!canSave} type="submit">
              Save capture
              <Inbox className="size-4" />
            </Button>
          </div>
        </form>
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

function CapturedItemCard({ item }: { item: CaptureInboxItem }) {
  const domainLabel = item.domain
    ? item.subDomain
      ? `${item.domain} / ${item.subDomain}`
      : item.domain
    : "Uncategorised";

  return (
    <article className="rounded-md border border-border/80 bg-card/95 p-4 shadow-[0_1px_2px_rgb(24_24_27_/_0.03)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={item.status === "Inbox" ? "attention" : "secondary"}>
              {item.status}
            </Badge>
            <Badge variant="outline">{item.type ?? "Uncategorised"}</Badge>
            <Badge variant="outline">{domainLabel}</Badge>
          </div>
          <h2 className="mt-3 text-base font-semibold text-foreground">
            {item.title ?? "Untitled capture"}
          </h2>
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
    </article>
  );
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
