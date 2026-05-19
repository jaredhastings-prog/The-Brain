export type MemoryDomain =
  | "business"
  | "study"
  | "health"
  | "family"
  | "finance"
  | "relationships"
  | "projects";

export type MemoryRecord = {
  id: string;
  domain: MemoryDomain;
  title: string;
  summary: string;
  occurredAt: string;
  sourceCaptureId?: string;
  vectorEmbeddingId?: string;
};

export type MemoryRetrievalRequest = {
  query: string;
  domains?: MemoryDomain[];
  limit?: number;
};
