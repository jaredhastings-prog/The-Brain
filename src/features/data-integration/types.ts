export type DataIntegrationStatus =
  | "not-configured"
  | "connected"
  | "needs-attention";

export type DataIntegrationDefinition = {
  id: string;
  name: string;
  category: "database" | "file" | "api" | "automation" | "model";
  status: DataIntegrationStatus;
  ownerFeature: string;
};

export type RepositoryRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
};
