import {
  VideoClip,
  CaptionStylePreset,
  EditingStylePreset,
  BountyCampaign,
  ScheduleEvent,
  MobileApprovalBot,
} from "../types/studio";

export const GENRE_LIST = [
  "Podcast & Interview",
  "Tech & Hardware",
  "Dev & Architecture",
  "Education & Science",
  "Finance & Economics",
  "Gaming & Stream",
  "Design & Creative",
  "AI & Machine Learning",
  "Health & Longevity",
  "Productivity & Systems",
  "Documentary & Essay",
  "Business & Startups",
  "Philosophy & Society",
  "Culture & Lifestyle",
  "Keynotes & Talks",
  "Coding & Software",
  "Music & Sound Design",
  "Cinema & Video Ops",
  "Founders & Builders",
  "Commentary & Review",
  "Fitness & Sports",
  "Food & Culinary",
  "News & Global Events",
  "Motorsports & Auto",
  "Space & Astrophysics",
  "Psychology & Mind",
  "Vlogs & Day-in-Life",
  "Tutorials & Workshops",
];

const makeCaptionStyle = (
  id: CaptionStylePreset["id"],
  name: string,
  description: string,
  tagline: string,
  highlightColor: string,
  badge: string,
  fontClass = "font-display font-black tracking-tight uppercase",
  textColor = "#FFFFFF"
): CaptionStylePreset => ({
  id,
  name,
  description,
  tagline,
  textColor,
  highlightColor,
  fontClass,
  badge,
});

export const CAPTION_STYLES: CaptionStylePreset[] = [
  makeCaptionStyle("sharko-emerald", "Sharko Mint", "High-velocity electric mint active word highlight with dark outline drop shadow.", "High Retention", "#10B981", "Most Popular"),
  makeCaptionStyle("bold-gold", "Hormozi Gold", "Solid golden-yellow keywords with subtle shadow and crisp word transitions.", "Word Tracking", "#E5C158", "High Visibility"),
  makeCaptionStyle("high-contrast", "Vugola Signature", "Bold sans-serif typography with alternating terracotta amber emphasis.", "High Contrast", "#E06D3B", "Key Phrases", "font-display font-black tracking-normal uppercase"),
  makeCaptionStyle("clean-studio", "Studio Minimal", "Minimalist typography inside a frosted obsidian backdrop capsule with gentle fade.", "Clean Studio", "#F4F4F6", "Executive", "font-sans font-semibold tracking-normal"),
  makeCaptionStyle("vivid-pop", "Cyber Neon", "Punchy cyan and magenta emphasis with kinetic pop animation on major vocal hooks.", "Dynamic Hook", "#38BDF8", "Fast Paced", "font-display font-extrabold tracking-tight uppercase"),
];

const makePreset = (
  id: string,
  name: string,
  pacing: string,
  captionPreset: string,
  prompt: string,
  badge: string
): EditingStylePreset => ({ id, name, pacing, captionPreset, prompt, badge });

export const EDITING_STYLE_PRESETS: EditingStylePreset[] = [
  makePreset("fast-punchy", "Fast & Punchy", "Rapid cuts (1.8s avg)", "Kinetic Mint", "Extract fast-paced vocal hooks, rapid insights, and high-energy statements", "High Energy"),
  makePreset("narrative-reveal", "Narrative & Reveal", "Story cadence (3.2s avg)", "Vugola Signature", "Isolate structured explanations, story builds, and dramatic conclusions", "Storytelling"),
  makePreset("deep-dive", "Technical Deep Dive", "Explanatory pacing (4.5s avg)", "Studio Minimal", "Extract core technical trade-offs, architectural decisions, and benchmarks", "Engineering"),
  makePreset("key-takeaways", "Key Takeaways", "Balanced cadence (2.8s avg)", "Hormozi Gold", "Find bullet-point summaries, actionable lessons, and core takeaways", "Educational"),
];

const makeClip = (
  id: string,
  title: string,
  viralityScore: number,
  tier: VideoClip["tier"],
  duration: number,
  durationFormatted: string,
  hook: string,
  hookQuote: string,
  estimatedViews: string,
  speakerType: VideoClip["speakerType"],
  tags: string[],
  thumbnail: string,
  letterGrades: VideoClip["letterGrades"]
): VideoClip => ({
  id,
  title,
  viralityScore,
  tier,
  duration,
  durationFormatted,
  hook,
  hookQuote,
  estimatedViews,
  speakerType,
  tags,
  thumbnail,
  aspectRatio: "9:16",
  letterGrades,
});

export const INITIAL_CLIPS: VideoClip[] = [
  makeClip(
    "clip-1",
    "System Architecture: Designing Low-Latency Real-Time Pipelines",
    98,
    "Viral",
    38,
    "00:38",
    "The fundamental bottleneck in real-time distributed systems is never the compute...",
    "The bottleneck is serialization and network hops across clusters.",
    "240K - 850K",
    "solo",
    ["Architecture", "Engineering", "High Performance"],
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    { hook: "A+", flow: "A+", value: "A+", trend: "A" }
  ),
  makeClip(
    "clip-2",
    "Database Performance: Query Optimization & Indexing Strategies",
    94,
    "Viral",
    44,
    "00:44",
    "Why 90% of developers configure B-Tree composite indexes in the wrong column order...",
    "Leading equality columns must precede range predicates for index seek.",
    "180K - 620K",
    "split",
    ["Databases", "Postgres", "Performance"],
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    { hook: "A+", flow: "A", value: "A", trend: "A-" }
  ),
  makeClip(
    "clip-3",
    "Video Transcoding: AV1 vs H.265 Hardware Acceleration in 2026",
    92,
    "Viral",
    52,
    "00:52",
    "Hardware encoding chips on modern GPUs have completely changed the bit-rate math...",
    "AV1 achieves 30% lower bitrates with identical VMAF perceptual quality.",
    "140K - 490K",
    "switching",
    ["Video Ops", "Hardware", "Encoding"],
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    { hook: "A", flow: "A-", value: "A+", trend: "A" }
  ),
  makeClip(
    "clip-4",
    "Speech Diarization: Whisper-v3 Millisecond Timestamp Synchronization",
    89,
    "High",
    41,
    "00:41",
    "How cross-attention decoder matrices enable word-level kinetic subtitle alignment...",
    "Sub-frame precision ensures dynamic captions hit exactly on vocal attack.",
    "95K - 320K",
    "solo",
    ["AI Audio", "Whisper", "Subtitles"],
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    { hook: "A-", flow: "A", value: "A-", trend: "B+" }
  ),
  makeClip(
    "clip-5",
    "Output-Only Metering: Token-Based Architecture Explained",
    85,
    "High",
    48,
    "00:48",
    "Why charging creators for video upload minutes is an anti-user business model...",
    "Creators should only pay when they export finished, high-value clips.",
    "70K - 240K",
    "split",
    ["SaaS Architecture", "Product Design", "Metering"],
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    { hook: "B+", flow: "A-", value: "A", trend: "B+" }
  ),
  makeClip(
    "clip-6",
    "Dynamic Framing: Multi-Speaker Aspect Ratio Transitions",
    81,
    "Good",
    35,
    "00:35",
    "The mathematics of automated bounding box transitions from 16:9 to vertical 9:16...",
    "Camera pan smoothing prevents viewer motion sickness on vertical feeds.",
    "45K - 160K",
    "solo",
    ["Computer Vision", "Auto Framing", "Shorts"],
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
    { hook: "B+", flow: "B+", value: "A-", trend: "B+" }
  ),
];

const makeBounty = (
  id: string,
  brand: string,
  logo: string,
  brandCategory: string,
  title: string,
  hookGuide: string,
  totalPool: number,
  remainingPool: number,
  payoutPerK: number,
  minDuration: string,
  claimedPercent: number,
  footageUrl: string
): BountyCampaign => ({
  id,
  brand,
  logo,
  brandCategory,
  title,
  hookGuide,
  totalPool,
  remainingPool,
  payoutPerK,
  minDuration,
  claimedPercent,
  footageUrl,
});

export const BOUNTY_CAMPAIGNS: BountyCampaign[] = [
  makeBounty("bounty-1", "DevTools Community", "DEV", "Developer Tools", "Terminal Workflows & Developer Productivity Showcase", "Clip standout terminal setups, build-tool speed comparisons, or CLI tips.", 4500, 2850, 3.5, "30s", 36, "https://youtube.com/watch?v=DevTools_Terminal_Productivity_2026"),
  makeBounty("bounty-2", "Cloud Architecture Pod", "CLOUD", "Cloud Infrastructure", "Serverless vs Kubernetes Scaling Debate Highlights", "Find moments discussing cost trade-offs, cold-start latency, and scaling spikes.", 6000, 4200, 4.0, "35s", 30, "https://youtube.com/watch?v=Cloud_Kubernetes_Serverless_Scale"),
  makeBounty("bounty-3", "Workflow Automations", "AUTO", "Productivity Tools", "Autonomous Agent Orchestration & Workspace Integration", "Highlight multi-agent coordination, real-time tool calls, and API integrations.", 3200, 1950, 3.25, "25s", 39, "https://youtube.com/watch?v=Autonomous_Agent_Architecture_Demo"),
  makeBounty("bounty-4", "Vector DB Foundry", "VEC", "AI Systems", "HNSW Indexing vs Flat L2 Vector Search Benchmarks", "Cut to the performance charts showing latency drop and recall precision tradeoffs.", 5000, 3100, 4.25, "28s", 38, "https://youtube.com/watch?v=Vector_Index_Benchmarking_Technical_Talk"),
  makeBounty("bounty-5", "Kernel & Rust Hub", "RUST", "Developer Tools", "Zero-Copy Memory Allocations in High-Throughput Pipelines", "Isolate the profiler breakdown of CPU cache misses and SIMD vectorization.", 4200, 2600, 3.8, "30s", 38, "https://youtube.com/watch?v=Rust_Zero_Copy_High_Performance_Engine"),
];

const makeEvent = (
  id: string,
  clipTitle: string,
  day: ScheduleEvent["day"],
  time: string,
  platform: ScheduleEvent["platform"],
  status: ScheduleEvent["status"]
): ScheduleEvent => ({ id, clipTitle, day, time, platform, status });

export const SCHEDULE_EVENTS: ScheduleEvent[] = [
  makeEvent("evt-1", "System Architecture: Designing Low-Latency Pipelines", "Mon", "09:30 AM", "tiktok", "posted"),
  makeEvent("evt-2", "Database Performance: Query Optimization & Indexing", "Mon", "02:45 PM", "youtube", "scheduled"),
  makeEvent("evt-3", "Video Transcoding: AV1 vs H.265 Acceleration", "Tue", "11:15 AM", "instagram", "scheduled"),
  makeEvent("evt-4", "Speech Diarization: Whisper-v3 Timestamp Sync", "Wed", "05:00 PM", "x", "scheduled"),
  makeEvent("evt-5", "Output-Only Metering: Token-Based Architecture", "Thu", "01:20 PM", "tiktok", "scheduled"),
  makeEvent("evt-6", "Dynamic Framing: Multi-Speaker Aspect Ratio Transitions", "Fri", "04:30 PM", "youtube", "scheduled"),
  makeEvent("evt-7", "High Performance Video Engineering Scales Your Content", "Sat", "12:00 PM", "instagram", "scheduled"),
];

export const MOCK_APPROVAL_BOT: MobileApprovalBot = {
  status: "pending",
  clipTitle: "Database Performance: Query Optimization & Indexing Strategies",
  clipDuration: "00:44",
  scheduledTime: "02:45 PM (Today)",
  platforms: ["TikTok", "YouTube Shorts"],
  score: 94,
  thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
};
