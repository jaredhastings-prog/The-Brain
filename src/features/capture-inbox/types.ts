export type CaptureKind = "text" | "voice" | "link" | "file" | "image";

export type CaptureInboxItem = {
  id: string;
  kind: CaptureKind;
  title: string;
  rawContent: string;
  createdAt: string;
  suggestedSection?: string;
  isProcessed: boolean;
};
