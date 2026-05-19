export type VoiceCaptureStatus =
  | "recording"
  | "transcribing"
  | "needs-review"
  | "routed";

export type VoiceCaptureDraft = {
  id: string;
  status: VoiceCaptureStatus;
  transcript: string;
  durationSeconds?: number;
  suggestedRoute?: string;
};
