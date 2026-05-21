"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { NlpFilterSelect } from "@/features/nlp-study/components/nlp-filter-select";
import { NlpPathwayPanel } from "@/features/nlp-study/components/nlp-pathway-panel";
import { NlpProgressSummary } from "@/features/nlp-study/components/nlp-progress-summary";
import { NlpQuickActionsPanel } from "@/features/nlp-study/components/nlp-quick-actions-panel";
import { NlpTopicGroupCard } from "@/features/nlp-study/components/nlp-topic-group-card";
import {
  nlpTopicGroups,
  type NlpTopicStatus,
} from "@/features/nlp-study/data/nlp-study-content";
import type {
  NlpProgressStats,
  StatusByTopic,
  StatusFilter,
} from "@/features/nlp-study/types";

const statusOptions: NlpTopicStatus[] = [
  "Not Started",
  "In Progress",
  "Integrated",
];

const flatTopics = nlpTopicGroups.flatMap((group) =>
  group.topics.map((topic) => ({ group, topic })),
);

const initialStatuses = flatTopics.reduce<StatusByTopic>(
  (statuses, { topic }) => ({
    ...statuses,
    [topic.id]: topic.status,
  }),
  {},
);

export function NlpStudyHub() {
  const [groupFilter, setGroupFilter] = React.useState("All");
  const [openGroupIds, setOpenGroupIds] = React.useState<Set<string>>(
    () => new Set(["nlp-foundations"]),
  );
  const [openTopicId, setOpenTopicId] = React.useState(flatTopics[0].topic.id);
  const [quickActionNotice, setQuickActionNotice] = React.useState(
    "Choose a topic, then use the quick actions when you are ready.",
  );
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusByTopic, setStatusByTopic] =
    React.useState<StatusByTopic>(initialStatuses);
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("All");

  const selectedTopic =
    flatTopics.find(({ topic }) => topic.id === openTopicId) ?? flatTopics[0];

  const filteredGroups = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return nlpTopicGroups
      .filter((group) => groupFilter === "All" || group.id === groupFilter)
      .map((group) => {
        const groupMatchesSearch = [group.title, group.description]
          .join(" ")
          .toLowerCase()
          .includes(query);

        const topics = group.topics.filter((topic) => {
          const matchesStatus =
            statusFilter === "All" || statusByTopic[topic.id] === statusFilter;
          const topicMatchesSearch = [
            topic.title,
            topic.overview,
            topic.keyIdeas.join(" "),
          ]
            .join(" ")
            .toLowerCase()
            .includes(query);

          return (
            matchesStatus && (!query || groupMatchesSearch || topicMatchesSearch)
          );
        });

        return { ...group, topics };
      })
      .filter((group) => group.topics.length > 0);
  }, [groupFilter, searchQuery, statusByTopic, statusFilter]);

  const progressStats = React.useMemo<NlpProgressStats>(() => {
    const statuses = flatTopics.map(({ topic }) => statusByTopic[topic.id]);
    const integrated = statuses.filter(
      (status) => status === "Integrated",
    ).length;
    const inProgress = statuses.filter(
      (status) => status === "In Progress",
    ).length;
    const notStarted = statuses.filter(
      (status) => status === "Not Started",
    ).length;
    const weightedProgress = integrated + inProgress * 0.5;
    const progress = Math.round((weightedProgress / statuses.length) * 100);

    return {
      inProgress,
      integrated,
      notStarted,
      progress,
      total: statuses.length,
    };
  }, [statusByTopic]);

  function toggleGroup(groupId: string) {
    setOpenGroupIds((current) => {
      const next = new Set(current);

      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }

      return next;
    });
  }

  function updateTopicStatus(topicId: string, status: NlpTopicStatus) {
    setStatusByTopic((current) => ({ ...current, [topicId]: status }));
    const topicTitle =
      flatTopics.find(({ topic }) => topic.id === topicId)?.topic.title ??
      "Selected topic";

    setQuickActionNotice(`${topicTitle} marked ${status.toLowerCase()}.`);
  }

  function handleTopicToggle(topicId: string, groupId: string) {
    setOpenTopicId(topicId);
    setOpenGroupIds((current) => new Set(current).add(groupId));
  }

  function handlePlaceholderAction(action: "note" | "reflection") {
    const topicTitle = selectedTopic.topic.title;
    const actionLabel =
      action === "note" ? "Personal note placeholder" : "Exercise reflection";

    setQuickActionNotice(`${actionLabel} ready for ${topicTitle}.`);
  }

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="signal">Study & Learning</Badge>
          <Badge variant="outline">NLP Practitioner pathway</Badge>
        </div>
        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
              NLP Learning Hub
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A calm study dashboard for mapping practitioner topics, exercises,
              notes, diagrams, and integration status without adding content
              overload too early.
            </p>
          </div>
          <NlpProgressSummary stats={progressStats} />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <DashboardCard
            description="Search the topic map or narrow by model group and integration status."
            eyebrow="Topic map"
            title="NLP Models and Practice Areas"
          >
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_180px]">
              <label className="space-y-2">
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
                  <Search className="size-3" />
                  Search topics
                </span>
                <Input
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search models, patterns, exercises..."
                  value={searchQuery}
                />
              </label>
              <NlpFilterSelect
                label="Group"
                onChange={setGroupFilter}
                options={[
                  { label: "All groups", value: "All" },
                  ...nlpTopicGroups.map((group) => ({
                    label: group.title,
                    value: group.id,
                  })),
                ]}
                value={groupFilter}
              />
              <NlpFilterSelect
                label="Status"
                onChange={(value) => setStatusFilter(value as StatusFilter)}
                options={[
                  { label: "All statuses", value: "All" },
                  ...statusOptions.map((status) => ({
                    label: status,
                    value: status,
                  })),
                ]}
                value={statusFilter}
              />
            </div>

            <div className="mt-5 space-y-3">
              {filteredGroups.length ? (
                filteredGroups.map((group) => (
                  <NlpTopicGroupCard
                    group={group}
                    isOpen={openGroupIds.has(group.id)}
                    key={group.id}
                    onStatusChange={updateTopicStatus}
                    onToggle={() => toggleGroup(group.id)}
                    onTopicToggle={handleTopicToggle}
                    openTopicId={openTopicId}
                    statusByTopic={statusByTopic}
                  />
                ))
              ) : (
                <div className="rounded-md border border-border/70 bg-muted/45 px-4 py-8 text-center text-sm text-muted-foreground">
                  No NLP topics match the current filters.
                </div>
              )}
            </div>
          </DashboardCard>
        </div>

        <aside className="space-y-4">
          <NlpQuickActionsPanel
            notice={quickActionNotice}
            onAddNote={() => handlePlaceholderAction("note")}
            onAddReflection={() => handlePlaceholderAction("reflection")}
            onMarkInProgress={() =>
              updateTopicStatus(selectedTopic.topic.id, "In Progress")
            }
            onMarkIntegrated={() =>
              updateTopicStatus(selectedTopic.topic.id, "Integrated")
            }
            selectedTopic={selectedTopic}
          />
          <NlpPathwayPanel />
        </aside>
      </section>
    </div>
  );
}
