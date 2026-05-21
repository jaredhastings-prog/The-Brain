import type {
  NlpTopic,
  NlpTopicGroup,
  NlpTopicStatus,
} from "@/features/nlp-study/data/nlp-study-content";

export type StatusFilter = "All" | NlpTopicStatus;

export type StatusByTopic = Record<string, NlpTopicStatus>;

export type TopicWithGroup = {
  group: NlpTopicGroup;
  topic: NlpTopic;
};

export type NlpProgressStats = {
  inProgress: number;
  integrated: number;
  notStarted: number;
  progress: number;
  total: number;
};
