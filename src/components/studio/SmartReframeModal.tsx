import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  RotateCcw,
  Columns,
  User,
  Film,
  Scan,
  Maximize2,
} from "lucide-react";
import { VideoClip } from "../../types/studio";

interface SmartReframeModalProps {
  clip: VideoClip | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyCrop: (clipId: string, aspectRatio: string, layout: string) => void;
}

export function SmartReframeModal({
  clip,
  isOpen,
  onClose,
  onApplyCrop,
}: SmartReframeModalProps) {
  const [aspectRatio, setAspectRatio] = useState<string>("9:16");
  const [layoutMode, setLayoutMode] = useState<"solo" | "split" | "switching">("split");
  const [cropBoxPosition, setCropBoxPosition] = useState<number>(50);

  useEffect(() => {
    if (clip) {
      setAspectRatio(clip.aspectRatio || "9:16");
      setLayoutMode(clip.speakerType || "split");
      setCropBoxPosition(50);
    }
  }, [clip]);

  // Keyboard close with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !clip) return null;

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
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md bg-[#08090B] hover:bg-[#161920] border border-white/[0.08] text-text-muted hover:text-white transition-colors"
            aria-label="Close Crop Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Side-by-side Source Monitor vs Output Stage */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Multi-Speaker Layout Mode Switcher */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-text-primary block">
              Speaker Framing Architecture:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLayoutMode("solo")}
                className={`p-3 rounded-lg border text-left transition-all flex items-center gap-2.5 ${
                  layoutMode === "solo"
                    ? "bg-[#161920] border-[#10B981]/50 text-white shadow-sm"
                    : "bg-[#12151B] border-white/[0.07] text-text-secondary hover:text-white"
                }`}
              >
                <User className="w-4 h-4 text-white shrink-0" />
                <div>
                  <div className="text-xs font-semibold">Solo Speaker Tracking</div>
                  <div className="text-[10px] text-text-muted">
                    Locks camera on active single speaker
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode("split")}
                className={`p-3 rounded-lg border text-left transition-all flex items-center gap-2.5 ${
                  layoutMode === "split"
                    ? "bg-[#161920] border-[#10B981]/50 text-white shadow-sm"
                    : "bg-[#12151B] border-white/[0.07] text-text-secondary hover:text-white"
                }`}
              >
                <Columns className="w-4 h-4 text-[#10B981] shrink-0" />
                <div>
                  <div className="text-xs font-semibold">2-Speaker Vertical Split</div>
                  <div className="text-[10px] text-text-muted">
                    Stacks host & guest top/bottom
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode("switching")}
                className={`p-3 rounded-lg border text-left transition-all flex items-center gap-2.5 ${
                  layoutMode === "switching"
                    ? "bg-[#161920] border-[#E06D3B]/50 text-white shadow-sm"
                    : "bg-[#12151B] border-white/[0.07] text-text-secondary hover:text-white"
                }`}
              >
                <Film className="w-4 h-4 text-[#E06D3B] shrink-0" />
                <div>
                  <div className="text-xs font-semibold">Auto Scene Switching</div>
                  <div className="text-[10px] text-text-muted">
                    Cuts to speaker on audio voice activity
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Aspect Ratio Morph Pills */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-text-primary block">
              Aspect Ratio Morph Target:
            </span>
            <div className="flex flex-wrap gap-2">
              {ratios.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setAspectRatio(r.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium border transition-colors flex items-center gap-1.5 ${
                    aspectRatio === r.id
                      ? "bg-white text-black font-semibold border-white shadow-sm"
                      : "bg-[#12151B] border-white/[0.08] text-text-secondary hover:text-white"
                  }`}
                >
                  <span>{r.label}</span>
                  <span className="text-[10px] text-text-muted font-sans">
                    ({r.description})
                  </span>
                </button>
              ))}
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
                    width: aspectRatio === "9:16" ? "32%" : aspectRatio === "1:1" ? "50%" : "70%",
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
                  min="20"
                  max="80"
                  value={cropBoxPosition}
                  onChange={(e) => setCropBoxPosition(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                  aria-label="Crop pan horizontal position"
                />
                <span className="text-xs font-mono text-white tabular-nums w-8">
                  {cropBoxPosition}%
                </span>
              </div>
            </div>

            {/* Right: 9:16 Vertical Output Preview */}
            <div className="lg:col-span-5 flex flex-col items-center space-y-2">
              <span className="text-xs font-mono text-text-muted">
                VERTICAL OUTPUT STAGE:
              </span>

              <div className="w-48 aspect-[9/16] rounded-2xl bg-[#040507] border-2 border-[#10B981]/80 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col">
                <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-[#10B981] text-black font-mono text-[9px] font-bold">
                  98 VIRAL
                </div>

                {layoutMode === "split" ? (
                  <>
                    <div className="h-1/2 w-full relative overflow-hidden border-b border-white/[0.1]">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
                        alt="Speaker 1"
                        className="w-full h-full object-cover filter brightness-90"
                      />
                    </div>
                    <div className="h-1/2 w-full relative overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
                        alt="Speaker 2"
                        className="w-full h-full object-cover filter brightness-90"
                      />
                      <div className="absolute bottom-3 left-1 right-1 text-center font-display font-black text-[11px] text-white uppercase italic tracking-wider drop-shadow-md">
                        <span className="text-[#10B981]">SYSTEMS</span> SCALE FAST
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-full w-full relative overflow-hidden">
                    <img
                      src={clip.thumbnail}
                      alt="Solo speaker"
                      className="w-full h-full object-cover filter brightness-90"
                    />
                    <div className="absolute bottom-4 left-1 right-1 text-center font-display font-black text-xs text-white uppercase italic tracking-wider drop-shadow-md">
                      <span className="text-[#10B981]">OPTIMIZED</span> QUERY PLAN
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#12151B] border-t border-white/[0.08] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setAspectRatio("9:16");
              setLayoutMode("split");
              setCropBoxPosition(50);
            }}
            className="px-3.5 py-1.5 rounded-md bg-[#08090B] hover:bg-[#161920] border border-white/[0.08] text-xs text-text-secondary hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-text-muted" />
            <span>Reset Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md text-xs text-text-muted hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onApplyCrop(clip.id, aspectRatio, layoutMode);
                onClose();
              }}
              className="px-4 py-2 rounded-md bg-white hover:bg-[#F4F4F6] text-[#08090B] font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Apply Smart Reframe</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
