export type ViralityTier = "Viral" | "High" | "Good";
export type GradeRating = "A+" | "A" | "A-" | "B+";

export interface ClipLetterGrades {
  hook: GradeRating;
  flow: GradeRating;
  value: GradeRating;
  trend: GradeRating;
}

export interface VideoClip {
  id: string;
  title: string;
  viralityScore: number;
  tier: ViralityTier;
  duration: number; // in seconds
  durationFormatted: string;
  hook: string;
  hookQuote: string;
  estimatedViews: string;
  speakerType: "solo" | "split" | "switching";
  tags: string[];
  thumbnail: string;
  videoUrl?: string;
  aspectRatio: "9:16" | "1:1" | "16:9" | "4:3" | "9:8";
  letterGrades: ClipLetterGrades;
}

export type CaptionPresetId =
  | "clipmax-emerald"
  | "bold-gold"
  | "high-contrast"
  | "clean-studio"
  | "vivid-pop";

export interface CaptionStylePreset {
  id: CaptionPresetId;
  name: string;
  description: string;
  tagline: string;
  textColor: string;
  highlightColor: string;
  fontClass: string;
  badge: string;
}

export interface EditingStylePreset {
  id: string;
  name: string;
  pacing: string;
  captionPreset: string;
  prompt: string;
  badge: string;
}

export interface BountyCampaign {
  id: string;
  brand: string;
  logo: string;
  brandCategory: string;
  title: string;
  hookGuide: string;
  totalPool: number;
  remainingPool: number;
  payoutPerK: number;
  minDuration: string;
  claimedPercent: number;
  footageUrl: string;
}

export interface ScheduleEvent {
  id: string;
  clipTitle: string;
  day: "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
  time: string;
  platform: "tiktok" | "youtube" | "instagram" | "x";
  status: "scheduled" | "posted";
}

export interface MobileApprovalBot {
  status: "pending" | "approved" | "regenerated";
  clipTitle: string;
  clipDuration: string;
  scheduledTime: string;
  platforms: string[];
  score: number;
  thumbnail: string;
}
