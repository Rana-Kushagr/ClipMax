import React, { useState } from "react";
import {
  ArrowRight,
  Play,
  Check,
  Link as LinkIcon,
  Download,
  Scissors,
  CheckCircle2,
  Sparkles,
  Zap,
  MessageSquare,
  Share2,
  Heart,
  MessageCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { MarkerUnderline, SharkoBrandLogo } from "../brand/SharkoBrandLogo";
import { StudioEditorModal } from "../studio/StudioEditorModal";
import { VideoClip } from "../../types/studio";
import { validateSafeVideoUrl, checkRateLimit } from "../../utils/security";

interface HeroCommandCenterProps {
  onClipsGenerated?: () => void;
  videoUrl?: string;
  setVideoUrl?: (u: string) => void;
  onOpenAuth?: (mode?: "login" | "signup") => void;
  studioMode?: "lightning" | "studio";
  setStudioMode?: (mode: "lightning" | "studio") => void;
  options?: any;
  activeTool?: string;
  setActiveTool?: (t: string) => void;
  onSelectStudioTab?: (tab: any) => void;
}

export function HeroCommandCenter({
  onClipsGenerated,
  videoUrl = "",
  setVideoUrl,
  onOpenAuth,
}: Readonly<HeroCommandCenterProps>) {
  const [inputUrl, setInputUrl] = useState(
    videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(78);
  const [activeTab, setActiveTab] = useState<"home" | "videos" | "clips" | "templates" | "brand" | "settings">("home");
  const [selectedClip, setSelectedClip] = useState<VideoClip | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState(false);

  const creatorAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  ];

  const initialClips = [
    {
      id: "clip-1",
      duration: "0:28",
      headline: "THIS CHANGED EVERYTHING",
      subtitle: "This changed everything...",
      views: "1.2M views",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      isPrimary: false,
    },
    {
      id: "clip-2",
      duration: "0:32",
      headline: "STOP OVERTHINKING",
      subtitle: "Stop overthinking and just start.",
      views: "892K views",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
      isPrimary: true,
    },
    {
      id: "clip-3",
      duration: "0:26",
      headline: "IT'S SIMPLER THAN YOU THINK",
      subtitle: "It's simpler than you think.",
      views: "654K views",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      isPrimary: false,
    },
    {
      id: "clip-4",
      duration: "0:31",
      headline: "CONSISTENCY WINS",
      subtitle: "Consistency wins.",
      views: "421K views",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      isPrimary: false,
    },
  ];

  const handleProcessUrl = (demoUrl?: string) => {
    const urlToTest = demoUrl || inputUrl;
    setUrlError(null);

    const validation = validateSafeVideoUrl(urlToTest);
    if (!validation.valid) {
      setUrlError(validation.reason || "Please enter a valid https:// video link.");
      return;
    }

    if (!checkRateLimit("hero-clip", 8, 60000)) {
      setUrlError("Rate limit reached. Please wait a moment before analyzing more streams.");
      return;
    }

    if (setVideoUrl) setVideoUrl(urlToTest);
    if (demoUrl) setInputUrl(demoUrl);

    setIsProcessing(true);
    setProgressPercent(10);

    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          if (onClipsGenerated) onClipsGenerated();
          return 100;
        }
        return prev + 18;
      });
    }, 280);
  };

  const openEditorForClip = (clipItem: typeof initialClips[0]) => {
    const convertedClip: VideoClip = {
      id: clipItem.id,
      title: clipItem.headline,
      viralityScore: 98,
      tier: "Viral",
      duration: 28,
      durationFormatted: clipItem.duration,
      hook: clipItem.headline,
      hookQuote: clipItem.subtitle,
      estimatedViews: clipItem.views,
      speakerType: "split",
      tags: ["Viral Hook", "High Retention"],
      thumbnail: clipItem.image,
      videoUrl: inputUrl,
      aspectRatio: "9:16",
      letterGrades: {
        hook: "A+",
        flow: "A",
        value: "A",
        trend: "A+",
      },
    };
    setSelectedClip(convertedClip);
    setIsEditorOpen(true);
  };

  return (
    <div className="relative pt-6 sm:pt-10 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* =========================================================
              LEFT COLUMN (5 Cols): Headline, Callouts, CTAs & Social Proof
              ========================================================= */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF3FF] border border-[#D0E4FF] text-[#0066FF] text-[13px] font-semibold">
              <Sparkles className="w-4 h-4 fill-current text-[#0066FF]" />
              <span>Turn long videos into viral clips with AI</span>
            </div>

            {/* Main Hero Headline with Pink Marker Underline */}
            <h1 className="font-display text-[38px] sm:text-[50px] lg:text-[52px] font-extrabold tracking-[-0.035em] text-[#0B0F19] leading-[1.08]">
              The fastest way to build a{" "}
              <MarkerUnderline color="pink" className="text-[#0B0F19]">
                money-making
              </MarkerUnderline>{" "}
              clipping side hustle.
            </h1>

            {/* Subtitle */}
            <p className="text-[16px] sm:text-[17px] text-[#475569] leading-relaxed max-w-xl">
              Paste a video link and Sharko finds the best moments, adds captions, and creates short clips ready to post.
            </p>

            {/* CTA Button Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => (onOpenAuth ? onOpenAuth("signup") : handleProcessUrl())}
                className="btn-electric-blue rounded-2xl px-7 py-4 text-[16px] font-bold text-white flex items-center gap-2"
              >
                <span>Try Sharko Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleProcessUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}
                className="btn-white-pill rounded-2xl px-6 py-4 text-[16px] font-bold text-[#0B0F19] flex items-center gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-[#0066FF]/10 flex items-center justify-center text-[#0066FF]">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>See a Demo</span>
              </button>
            </div>

            {/* Social Proof Strip */}
            <div className="pt-2 flex items-center gap-3 text-sm">
              <div className="flex -space-x-2 overflow-hidden">
                {creatorAvatars.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="Creator using Sharko"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="text-[13px] text-[#334155] font-medium leading-none">
                  <span className="font-extrabold text-[#0B0F19]">200,000+ creators</span> are already using Sharko
                </p>
                <div className="flex items-center gap-1 mt-1 text-[#FBBF24]">
                  {"★★★★★"}
                </div>
              </div>
            </div>

            {/* 3 Bottom Micro-Perks */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[12.5px] font-medium text-[#475569]">
              <div className="flex items-center gap-2">
                <span className="text-[#0066FF] font-bold">⚡</span>
                <span>Finds viral moments with AI</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0066FF] font-bold">💬</span>
                <span>Adds captions automatically</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0066FF] font-bold">📤</span>
                <span>Ready to post on all platforms</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              RIGHT COLUMN (7 Cols): Interactive Sharko Studio Window
              Mirroring Image 1 with Pink Handwritten Note & Floating Cards
              ========================================================= */}
          <div className="lg:col-span-7 relative">
            
            {/* Top-Right Handwritten Pink Note with Curved SVG Arrow */}
            <div className="hidden sm:flex items-center justify-end gap-2 absolute -top-8 right-4 z-20 pointer-events-none">
              <span className="font-display font-semibold text-[#FF1464] text-[13.5px] tracking-tight">
                Long video into viral clips in minutes.
              </span>
              <svg width="42" height="32" viewBox="0 0 52 38" fill="none" className="text-[#FF1464] -mt-1">
                <path
                  d="M4 6C18 3 42 10 46 28M46 28L39 24M46 28L48 20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Main Interactive App Card Container */}
            <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] overflow-hidden flex flex-col sm:flex-row min-h-[440px]">
              
              {/* Left Sidebar (Image 1 Mirror) */}
              <div className="hidden sm:flex flex-col w-[160px] border-r border-slate-100 bg-[#FAFCFF] p-3.5 space-y-4 shrink-0">
                <SharkoBrandLogo size="sm" showSubtitle={false} />

                <div className="space-y-1 text-[13px] font-medium pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("home")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition ${
                      activeTab === "home"
                        ? "bg-[#EBF3FF] text-[#0066FF] font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>🏠</span>
                    <span>Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("videos")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition ${
                      activeTab === "videos"
                        ? "bg-[#EBF3FF] text-[#0066FF] font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>▶️</span>
                    <span>My Videos</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("clips")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition ${
                      activeTab === "clips"
                        ? "bg-[#EBF3FF] text-[#0066FF] font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>🎬</span>
                    <span>Clips</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("templates")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition ${
                      activeTab === "templates"
                        ? "bg-[#EBF3FF] text-[#0066FF] font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>⊞</span>
                    <span>Templates</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("brand")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition ${
                      activeTab === "brand"
                        ? "bg-[#EBF3FF] text-[#0066FF] font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>🎨</span>
                    <span>Brand Kit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition ${
                      activeTab === "settings"
                        ? "bg-[#EBF3FF] text-[#0066FF] font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>⚙️</span>
                    <span>Settings</span>
                  </button>
                </div>
              </div>

              {/* Right Studio Workspace */}
              <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
                <div>
                  {/* Top Header Row with Credits & Avatar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="font-display font-bold text-[16px] sm:text-[18px] text-[#0B0F19]">
                        Turn any video into viral clips
                      </h3>
                      <p className="text-[12px] text-slate-500">
                        Paste a YouTube, TikTok, or any video link and let AI find the best moments.
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11.5px] font-semibold text-slate-700">
                        <span>🪙</span>
                        <span>250 credits</span>
                      </span>
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                        alt="User profile"
                        className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                      />
                    </div>
                  </div>

                  {/* URL Input Row with Find Clips → Button */}
                  <div className="mt-3.5 space-y-1">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleProcessUrl();
                      }}
                      className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 bg-slate-50/70 focus-within:border-[#0066FF] focus-within:bg-white transition"
                    >
                      <div className="flex items-center gap-2 flex-1 pl-2">
                        <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
                        <input
                          id="heroVideoUrlInput"
                          name="heroVideoUrlInput"
                          type="url"
                          value={inputUrl}
                          onChange={(e) => setInputUrl(e.target.value)}
                          placeholder="Paste YouTube, TikTok or video URL..."
                          className="w-full bg-transparent text-xs sm:text-sm text-[#0B0F19] placeholder-slate-400 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="btn-electric-blue shrink-0 rounded-lg px-4 py-2 text-xs font-bold flex items-center gap-1"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Finding...</span>
                          </>
                        ) : (
                          <>
                            <span>Find Clips</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                    {urlError && (
                      <p className="text-[11.5px] text-red-500 font-medium pl-1">{urlError}</p>
                    )}
                  </div>

                  {/* Generated Clips Header */}
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="font-display font-bold text-[#0B0F19] text-[13.5px]">
                      Generated Clips (6)
                    </span>
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-500 hover:text-slate-700">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => setSelectAll(e.target.checked)}
                        className="rounded accent-[#0066FF]"
                      />
                      <span>Select all</span>
                    </label>
                  </div>

                  {/* 4 Signature 9:16 Vertical Video Cards (Image 1 Mirror) */}
                  <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {initialClips.map((clip) => (
                      <div
                        key={clip.id}
                        className="group relative rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition"
                      >
                        {/* Video Thumbnail Viewport */}
                        <div className="relative aspect-[9/13] bg-slate-900 overflow-hidden cursor-pointer" onClick={() => openEditorForClip(clip)}>
                          <img
                            src={clip.image}
                            alt={clip.headline}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          {/* Duration Badge */}
                          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 text-white font-mono text-[9.5px] font-bold">
                            {clip.duration}
                          </div>
                          {/* Video Overlay Caption */}
                          <div className="absolute inset-x-1.5 bottom-2 text-center">
                            <span className="inline-block px-1.5 py-0.5 rounded bg-black/85 text-white font-display font-extrabold text-[10px] sm:text-[11px] leading-tight uppercase tracking-tight shadow">
                              {clip.headline}
                            </span>
                          </div>
                        </div>

                        {/* Card Info & Download / Edit Actions */}
                        <div className="p-2 space-y-1.5 text-left">
                          <p className="text-[11px] font-semibold text-[#0B0F19] truncate leading-tight">
                            {clip.subtitle}
                          </p>
                          <p className="text-[10px] text-slate-500 font-medium">
                            {clip.views}
                          </p>
                          <div className="flex items-center gap-1 pt-0.5">
                            <button
                              type="button"
                              onClick={() => openEditorForClip(clip)}
                              className={`flex-1 py-1 px-1.5 rounded-lg text-[10.5px] font-bold flex items-center justify-center gap-1 transition ${
                                clip.isPrimary
                                  ? "bg-[#EBF3FF] text-[#0066FF] hover:bg-blue-100"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditorForClip(clip)}
                              title="Edit in Studio Inspector"
                              className="p-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
                            >
                              <Scissors className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* =========================================================
                FLOATING CARD 1: Bottom-Left Processing Progress Card
                Mirroring Image 1 ("Finding the best moments... 78%")
                ========================================================= */}
            <div className="hidden sm:block absolute -bottom-7 -left-6 z-30 w-[240px] rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-[0_16px_40px_rgba(15,23,42,0.14)] text-left">
              <div className="flex items-center justify-between text-xs font-bold text-[#0B0F19]">
                <span>Finding the best moments...</span>
                <span className="text-[#0066FF]">{progressPercent}%</span>
              </div>

              {/* Progress Bar */}
              <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#1E88FF] to-[#0066FF] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Checklist */}
              <div className="mt-2.5 space-y-1 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Analyzing video</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Finding viral moments</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Adding captions</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block" />
                  <span>Creating clips...</span>
                </div>
              </div>
            </div>

            {/* =========================================================
                FLOATING CARD 2: Bottom-Right Tilted 9:16 Phone Mockup
                Mirroring Image 1 ("THE RIGHT MINDSET CHANGES EVERYTHING 🔥")
                ========================================================= */}
            <div className="hidden md:block absolute -bottom-9 -right-5 z-30 w-[170px] aspect-[9/16] rounded-[24px] border-4 border-[#0F172A] bg-black shadow-[0_20px_50px_rgba(15,23,42,0.22)] rotate-[3.5deg] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80"
                alt="Viral clip in vertical phone"
                className="w-full h-full object-cover"
              />

              {/* Top notch */}
              <div className="absolute top-1.5 inset-x-0 mx-auto w-10 h-2.5 bg-black rounded-full" />

              {/* Right Side Social Action Pills */}
              <div className="absolute right-2 bottom-12 space-y-2 text-white text-[9.5px] font-bold text-center">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  </div>
                  <span className="mt-0.5">125K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="mt-0.5">1.4K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center">
                    <Share2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="mt-0.5">12K</span>
                </div>
              </div>

              {/* Bold Viral Kinetic Subtitle */}
              <div className="absolute inset-x-2 bottom-3 text-center">
                <span className="inline-block px-2 py-1 rounded bg-black/85 text-[#FBBF24] font-display font-black text-[10px] leading-tight shadow-md">
                  THE RIGHT MINDSET CHANGES EVERYTHING 🔥
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Studio Clip Editor Modal (Smart Reframe & Word-by-Word Caption Editor) */}
      <StudioEditorModal
        clip={selectedClip}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onExport={(title) => {
          setIsEditorOpen(false);
          if (onClipsGenerated) onClipsGenerated();
        }}
      />
    </div>
  );
}

export default HeroCommandCenter;
