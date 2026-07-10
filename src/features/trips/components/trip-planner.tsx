"use client";

import Image from "next/image";
import * as React from "react";
import {
  CalendarDays,
  Check,
  Clock,
  ExternalLink,
  Luggage,
  MapPin,
  Wallet,
  Wind,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  activities,
  getActivity,
  itinerary,
  packingList,
  tripBudgetNzd,
  tripMeta,
  type ActivityCategory,
  type TripActivity,
} from "@/features/trips/data/wellington-trip";
import { cn } from "@/lib/utils";

const nzd = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
  maximumFractionDigits: 0,
});

const categoryStyles: Record<ActivityCategory, string> = {
  Culture: "border-violet-500/30 bg-violet-500/10 text-violet-600",
  Nature: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
  Food: "border-amber-500/30 bg-amber-500/10 text-amber-600",
  Sightseeing: "border-sky-500/30 bg-sky-500/10 text-sky-600",
};

export function TripPlanner() {
  const days = itinerary.length;

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="signal">Trip planner</Badge>
          <Badge variant="outline">
            {formatDate(tripMeta.startDate)} – {formatDate(tripMeta.endDate)}
          </Badge>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
          {tripMeta.destination}
        </h1>
        <p className="mt-2 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
          <Wind className="mt-0.5 size-4 shrink-0" />
          {tripMeta.season}
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {days} days
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {activities.length} activities
          </span>
          <span className="flex items-center gap-1.5">
            <Wallet className="size-4" />~{nzd.format(tripBudgetNzd())} activity budget
            (per person)
          </span>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">Day-by-day itinerary</h2>
        <div className="mt-4 space-y-4">
          {itinerary.map((day, index) => (
            <div
              key={day.date}
              className="rounded-lg border border-border/80 bg-card/95 p-4 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_4px_12px_rgb(24_24_27_/_0.04)] md:p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-foreground">
                  Day {index + 1} · {day.title}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {formatDateLong(day.date)}
                </span>
              </div>
              {day.notes && (
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{day.notes}</p>
              )}
              {day.activityIds.length > 0 && (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {day.activityIds.map((id) => {
                    const activity = getActivity(id);
                    return activity ? (
                      <ActivityCard key={id} activity={activity} compact />
                    ) : null;
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-foreground">All activities</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything on the list with costs and details.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex items-center gap-2">
          <Luggage className="size-4 text-muted-foreground" />
          <h2 className="text-base font-semibold text-foreground">Packing & prep</h2>
        </div>
        <PackingChecklist />
      </section>
    </div>
  );
}

function ActivityCard({
  activity,
  compact = false,
}: {
  activity: TripActivity;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border/80 bg-card/95 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_4px_12px_rgb(24_24_27_/_0.04)]">
      {activity.imageUrl && (
        <div className={cn("relative w-full bg-muted/60", compact ? "h-32" : "h-40")}>
          <Image
            src={activity.imageUrl}
            alt={activity.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug text-foreground">
            {activity.title}
          </h3>
          <Badge
            variant="outline"
            className={cn("shrink-0 text-[10px]", categoryStyles[activity.category])}
          >
            {activity.category}
          </Badge>
        </div>
        {!compact && (
          <p className="text-xs leading-5 text-muted-foreground">
            {activity.description}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {activity.duration}
          </span>
          <span className="flex items-center gap-1">
            <Wallet className="size-3.5" />
            {activity.estCostNzd === 0 ? "Free" : nzd.format(activity.estCostNzd)}
          </span>
          {activity.link && (
            <a
              href={activity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ExternalLink className="size-3.5" />
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function PackingChecklist() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="mt-3">
      <p className="text-xs text-muted-foreground">
        {done} of {packingList.length} packed
      </p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {packingList.map((item) => {
          const isChecked = !!checked[item.id];
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() =>
                  setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                }
                className={cn(
                  "flex w-full items-start gap-2.5 rounded-md border px-3 py-2.5 text-left text-sm transition-colors",
                  isChecked
                    ? "border-emerald-500/40 bg-emerald-500/10 text-muted-foreground line-through"
                    : "border-border/70 bg-muted/30 text-muted-foreground hover:bg-muted/50",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid size-4 shrink-0 place-items-center rounded border",
                    isChecked
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-border",
                  )}
                >
                  {isChecked && <Check className="size-3" />}
                </span>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        Checklist state resets on reload — it&apos;s a quick pre-trip scratchpad.
      </p>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "short" });
}

function formatDateLong(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
