"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { NlpFilterSelect } from "@/features/nlp-study/components/nlp-filter-select";
import { NlpRepositoryPanel } from "@/features/nlp-study/components/nlp-repository-panel";
import { NlpTopicGroupCard } from "@/features/nlp-study/components/nlp-topic-group-card";
import { nlpTopicGroups } from "@/features/nlp-study/data/nlp-repository-content";

export function NlpRepository() {
  const [groupFilter, setGroupFilter] = React.useState("All");
  const [openGroupIds, setOpenGroupIds] = React.useState<Set<string>>(
    () => new Set(),
  );
  const [openTopicId, setOpenTopicId] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");

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
          const topicMatchesSearch = [
            topic.title,
            topic.overview,
            topic.coreConcepts.join(" "),
            topic.models.join(" "),
            topic.patterns.join(" "),
            topic.examples.join(" "),
          ]
            .join(" ")
            .toLowerCase()
            .includes(query);

          return !query || groupMatchesSearch || topicMatchesSearch;
        });

        return { ...group, topics };
      })
      .filter((group) => group.topics.length > 0);
  }, [groupFilter, searchQuery]);

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

  function handleTopicToggle(topicId: string, groupId: string) {
    setOpenTopicId((current) => (current === topicId ? "" : topicId));
    setOpenGroupIds((current) => new Set(current).add(groupId));
  }

  return (
    <div className="space-y-6 pb-20">
      <section className="rounded-lg border border-border/80 bg-card/95 p-5 shadow-[0_1px_2px_rgb(24_24_27_/_0.04),0_10px_24px_rgb(24_24_27_/_0.04)] md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="signal">Reference library</Badge>
          <Badge variant="outline">Knowledge repository</Badge>
        </div>
        <div className="mt-8 max-w-4xl">
          <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
            NLP Repository
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            A structured knowledge base for NLP models, patterns, techniques,
            diagrams, notes, and resources.
          </p>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <DashboardCard
            description="Browse model families, pattern references, notes, diagrams, and resource placeholders."
            eyebrow="Knowledge map"
            title="NLP Reference Areas"
          >
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_240px]">
              <label className="space-y-2">
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-normal text-muted-foreground">
                  <Search className="size-3" />
                  Search repository
                </span>
                <Input
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search models, patterns, diagrams, notes..."
                  value={searchQuery}
                />
              </label>
              <NlpFilterSelect
                label="Reference area"
                onChange={setGroupFilter}
                options={[
                  { label: "All areas", value: "All" },
                  ...nlpTopicGroups.map((group) => ({
                    label: group.title,
                    value: group.id,
                  })),
                ]}
                value={groupFilter}
              />
            </div>

            <div className="mt-5 space-y-3">
              {filteredGroups.length ? (
                filteredGroups.map((group) => (
                  <NlpTopicGroupCard
                    group={group}
                    isOpen={openGroupIds.has(group.id)}
                    key={group.id}
                    onToggle={() => toggleGroup(group.id)}
                    onTopicToggle={handleTopicToggle}
                    openTopicId={openTopicId}
                  />
                ))
              ) : (
                <div className="rounded-md border border-border/70 bg-muted/45 px-4 py-8 text-center text-sm text-muted-foreground">
                  No NLP repository entries match the current filters.
                </div>
              )}
            </div>
          </DashboardCard>
        </div>

        <aside className="space-y-4">
          <NlpRepositoryPanel />
        </aside>
      </section>
    </div>
  );
}
