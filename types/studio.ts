export type ViralityTier = "Viral" | "High" | "Good";

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
}

export type CaptionPresetId =
  | "clipmax-emerald"
  | "hormozi-gold"
  | "beast-impact"
  | "clean-studio"
  | "neon-bounce";

export interface CaptionStyle {
  id: CaptionPresetId;
  name: string;
  description: string;
  tagline: string;
  textColor: string;
  highlightColor: string;
  fontClass: string;
  badge: string;
}

export interface CreatorPersona {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  pacing: string;
  captionPreset: CaptionPresetId;
  prompt: string;
}

export interface BountyCampaign {
  id: string;
  brand: string;
  brandCategory: string;
  logo: string;
  title: string;
  payoutPerK: number; // in USD per 1000 views
  totalPool: number;
  remainingPool: number;
  claimedPercent: number;
  minDuration: string;
  platforms: ("tiktok" | "youtube" | "instagram")[];
  footageUrl: string;
  hookGuide: string;
}

export interface ScheduleEvent {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  time: string;
  platform: "tiktok" | "youtube" | "instagram" | "x";
  clipTitle: string;
  score: number;
  status: "scheduled" | "posted" | "pending_approval";
}

export interface MobileApprovalBot {
  id: string;
  channel: "telegram" | "whatsapp" | "discord";
  botName: string;
  timestamp: string;
  clipTitle: string;
  clipDuration: string;
  score: number;
  thumbnail: string;
  status: "waiting" | "approved" | "regenerated";
}
