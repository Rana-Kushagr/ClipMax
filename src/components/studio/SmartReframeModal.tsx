import React, { useState } from "react";
import {
  X,
  Check,
  RotateCcw,
  Sliders,
  Scan,
  Users,
  User,
  Layers,
} from "lucide-react";
import { VideoClip } from "../../types/studio";

type FramingMode = "Auto" | "Split" | "Solo";

interface SmartReframeModalProps {
  clip: VideoClip;
  isOpen: boolean;
  onClose: () => void;
  onApplyCrop: (clipId: string, aspectRatio: string, layout: FramingMode) => void;
}

const getCropWidth = (ratio: string): string => {
  if (ratio === "9:16") return "32%";
  if (ratio === "1:1") return "50%";
  return "70%";
};

export function SmartReframeModal({
  clip,
  isOpen,
  onClose,
  onApplyCrop,
}: Readonly<SmartReframeModalProps>) {
  const [aspectRatio, setAspectRatio] = useState<string>("9:16");
  const [framingMode, setFramingMode] = useState<FramingMode>(
    clip.speakerType === "split" ? "Split" : clip.speakerType === "solo" ? "Solo" : "Auto"
  );
  const [activeSpeakerMode, setActiveSpeakerMode] = useState<
    "auto" | "speaker1" | "speaker2" | "split"
  >("auto");
  const [cropBoxPosition, setCropBoxPosition] = useState<number>(50); // % horizontal pan

  if (!isOpen) return null;

  const ratios = [
    { id: "9:16", label: "9:16", description: "TikTok / Shorts / Reels" },
    { id: "1:1", label: "1:1", description: "Instagram Feed" },
    { id: "16:9", label: "16:9", description: "YouTube Landscape" },
    { id: "4:3", label: "4:3", description: "Classic Broadcast" },
    { id: "9:8", label: "9:8", description: "Facebook Dual" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="crop-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#040507]/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#0E1014] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#12151B]">
          <div>
            <h3
              id="crop-modal-title"
              className="font-display font-semibold text-lg text-white flex items-center gap-2"
            >
              <Scan className="w-5 h-5 text-[#10B981]" />
              Smart Reframe & Multi-Speaker Crop Monitor
            </h3>
            <p className="text-xs text-text-muted font-sans">
              Autonomous face-tracking bounding boxes transform 16:9 horizontal master into 9:16 vertical distribution.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-text-muted hover:text-white transition-colors"
            aria-label="Close Crop Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Top Mode Bar: Aspect Ratio Pills & Speaker Mode */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
            {/* Aspect Ratio Pills */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                Target Canvas Aspect Ratio
              </span>
              <div className="flex items-center gap-1.5">
                {ratios.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setAspectRatio(r.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      aspectRatio === r.id
                        ? "bg-[#10B981] text-black font-bold shadow-md shadow-[#10B981]/20"
                        : "bg-[#14171F] text-text-secondary border border-white/[0.06] hover:text-white"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Framing Mode: Solo, Split, Auto */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                Autonomous Camera Director Mode
              </span>
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#14171F] border border-white/[0.06]">
                <button
                  onClick={() => {
                    setFramingMode("Auto");
                    setActiveSpeakerMode("auto");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                    framingMode === "Auto"
                      ? "bg-[#10B981] text-black font-bold"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>Auto Dynamic</span>
                </button>
                <button
                  onClick={() => {
                    setFramingMode("Split");
                    setActiveSpeakerMode("split");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                    framingMode === "Split"
                      ? "bg-[#10B981] text-black font-bold"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Stacked Split</span>
                </button>
                <button
                  onClick={() => {
                    setFramingMode("Solo");
                    setActiveSpeakerMode("speaker1");
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                    framingMode === "Solo"
                      ? "bg-[#10B981] text-black font-bold"
                      : "text-text-muted hover:text-white"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Solo Lock</span>
                </button>
              </div>
            </div>
          </div>

          {/* Side-by-Side Monitors: 16:9 Master Source (Left) vs 9:16 Output (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Left: 16:9 Master Source Monitor with Live Face Bounding Boxes */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex justify-between items-center text-xs text-text-muted">
                <span className="font-mono text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  SOURCE MONITOR (16:9 4K FEED)
                </span>
                <span className="font-mono text-[11px] text-[#10B981]">
                  DIARIZATION CONFIDENCE 99.4%
                </span>
              </div>

              <div className="relative aspect-video w-full rounded-xl bg-[#040507] border border-white/[0.1] overflow-hidden select-none">
                <img
                  src={clip.thumbnail}
                  alt={clip.title}
                  className="w-full h-full object-cover filter brightness-80"
                />

                {/* Speaker 01 Face Bounding Box */}
                <div className="absolute top-[20%] left-[24%] w-24 h-28 border-2 border-[#10B981] rounded-sm pointer-events-none">
                  <div className="absolute -top-5 left-0 px-1 py-0.2 bg-[#10B981] text-black text-[9px] font-mono font-bold">
                    SPEAKER 01: 99.4%
                  </div>
                  <div className="absolute -bottom-4 left-0 text-[8px] font-mono text-white/80 bg-black/70 px-1">
                    PRIMARY HOST
                  </div>
                </div>

                {/* Speaker 02 Face Bounding Box */}
                <div className="absolute top-[22%] right-[22%] w-24 h-28 border-2 border-[#38BDF8] rounded-sm pointer-events-none">
                  <div className="absolute -top-5 left-0 px-1 py-0.2 bg-[#38BDF8] text-black text-[9px] font-mono font-bold">
                    SPEAKER 02: 98.1%
                  </div>
                  <div className="absolute -bottom-4 left-0 text-[8px] font-mono text-white/80 bg-black/70 px-1">
                    GUEST
                  </div>
                </div>

                {/* Active Dynamic Crop Reticle */}
                <div
                  className="absolute top-1 bottom-1 border-2 border-white/80 rounded-md pointer-events-none transition-all duration-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  style={{
                    left: `${Math.max(8, Math.min(68, cropBoxPosition - 16))}%`,
                    width: getCropWidth(aspectRatio),
                  }}
                >
                  <div className="absolute top-1 left-1 bg-black/80 px-1 rounded text-[8px] font-mono text-white">
                    {aspectRatio} CROP
                  </div>
                </div>
              </div>

              {/* Crop Reticle Pan Slider */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs font-mono text-text-muted shrink-0">
                  Manual Pan Offset:
                </span>
                <input
                  type="range"
                  min={20}
                  max={80}
                  value={cropBoxPosition}
                  onChange={(e) => setCropBoxPosition(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#14171F] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                />
                <span className="text-xs font-mono text-white w-10 text-right">
                  {cropBoxPosition}%
                </span>
              </div>
            </div>

            {/* Right: 9:16 Vertical Delivery Output Preview */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full flex justify-between items-center text-xs text-text-muted mb-2">
                <span className="font-mono text-white">
                  RENDER PREVIEW ({aspectRatio})
                </span>
                <span className="font-mono text-[11px] text-text-muted">
                  60 FPS REC.709
                </span>
              </div>

              {/* Vertical Screen Phone Container */}
              <div className="w-48 sm:w-56 aspect-[9/16] rounded-2xl bg-[#040507] border-2 border-white/20 shadow-2xl relative overflow-hidden flex flex-col">
                {framingMode === "Split" ? (
                  /* Stacked Split Screen View */
                  <div className="w-full h-full flex flex-col">
                    {/* Top Speaker */}
                    <div className="flex-1 relative overflow-hidden border-b border-black">
                      <img
                        src={clip.thumbnail}
                        alt="Speaker 1"
                        className="w-full h-full object-cover object-[25%_center] filter brightness-90"
                      />
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-[#10B981]">
                        SPEAKER 01
                      </div>
                    </div>
                    {/* Bottom Speaker */}
                    <div className="flex-1 relative overflow-hidden">
                      <img
                        src={clip.thumbnail}
                        alt="Speaker 2"
                        className="w-full h-full object-cover object-[75%_center] filter brightness-90"
                      />
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-[#38BDF8]">
                        SPEAKER 02
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Solo / Auto View */
                  <div className="w-full h-full relative overflow-hidden">
                    <img
                      src={clip.thumbnail}
                      alt={clip.title}
                      className="w-full h-full object-cover filter brightness-90"
                      style={{
                        objectPosition: `${cropBoxPosition}% center`,
                      }}
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#10B981] text-black font-mono text-[10px] font-bold">
                      {clip.viralityScore} VIRAL
                    </div>
                  </div>
                )}

                {/* Subtitle Safe Margin Area Overlay */}
                <div className="absolute inset-x-3 bottom-6 p-2 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-center">
                  <span className="text-[10px] font-display font-black text-white">
                    "ZERO ALLOCATION PIPELINES"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08] bg-[#12151B]">
          <button
            onClick={() => {
              setFramingMode(
                clip.speakerType === "split" ? "Split" : clip.speakerType === "solo" ? "Solo" : "Auto"
              );
              setCropBoxPosition(50);
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-text-muted hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono text-text-secondary hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onApplyCrop(clip.id, aspectRatio, framingMode);
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#10B981]/90 text-black font-mono text-xs font-bold transition-all shadow-md shadow-[#10B981]/20"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Apply Reframe Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
