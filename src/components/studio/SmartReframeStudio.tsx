import React, { useState } from "react";
import {
  Columns,
  Sparkles,
  Download,
  Users,
  User,
  Sliders,
  Check,
} from "lucide-react";
import { INITIAL_CLIPS } from "../../lib/constants";

interface SmartReframeStudioProps {
  onApplyCrop?: (aspectRatio: string, layout: string) => void;
}

export function SmartReframeStudio({
  onApplyCrop,
}: Readonly<SmartReframeStudioProps>) {
  const [aspectRatio, setAspectRatio] = useState<string>("9:16");
  const [framingMode, setFramingMode] = useState<"Split" | "Solo" | "Auto">("Split");
  const clip = INITIAL_CLIPS[0];

  const handleApply = () => {
    if (onApplyCrop) {
      onApplyCrop(aspectRatio, framingMode);
    }
  };

  return (
    <div className="space-y-6 select-none" aria-label="Smart Reframe Studio">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#F3E5AB]/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <h3 className="font-display font-semibold text-lg text-[#F4F4F6] flex items-center gap-2">
              <Columns className="w-5 h-5 text-[#10B981]" />
              <span>Smart Reframe Studio</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded bg-[#2A2016] text-[#F3E5AB] border border-[#F3E5AB]/20 text-xs font-mono font-medium">
              Neural Dual-Speaker Tracking
            </span>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-1 font-sans">
            AI isolates dual-speaker conversational dynamics, locks active gaze, and outputs 9:16 vertical splits.
          </p>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="px-4 py-2 rounded-xl bg-[#F3E5AB] hover:bg-white text-[#17120C] font-semibold text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Apply Reframe (1080p HD)</span>
        </button>
      </div>

      {/* Side-by-Side 16:9 Source & 9:16 Vertical Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 16:9 Source Widescreen (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
            <span>16:9 SOURCE WIDESCREEN STREAM</span>
            <span className="text-[#10B981]">NEURAL TRACKING: ACTIVE</span>
          </div>

          <div className="relative aspect-video w-full rounded-2xl bg-[#110D09] border border-[#F3E5AB]/20 overflow-hidden shadow-2xl">
            <img
              src={clip.thumbnail}
              alt="Source stream"
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />

            {/* Neural Face-Tracking Box 1: Speaker 1 (99.4%) */}
            <div className="absolute top-[18%] left-[22%] w-[26%] h-[56%] border-2 border-[#10B981] rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.4)] pointer-events-none">
              <span className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-[#10B981] text-black text-[10px] font-mono font-bold">
                SPEAKER 01: 99.4%
              </span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#10B981]" />
            </div>

            {/* Neural Face-Tracking Box 2: Speaker 2 (98.7%) */}
            <div className="absolute top-[22%] right-[18%] w-[25%] h-[54%] border-2 border-[#D99B52] rounded-lg shadow-[0_0_15px_rgba(217,155,82,0.4)] pointer-events-none">
              <span className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-[#D99B52] text-[#17120C] text-[10px] font-mono font-bold">
                SPEAKER 02: 98.7%
              </span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#D99B52]" />
            </div>
          </div>

          {/* Framing Mode Switcher */}
          <div className="p-4 rounded-xl bg-[#1E1710] border border-[#F3E5AB]/15 space-y-2.5 shadow-xl">
            <div className="text-xs font-mono text-[#F3E5AB] uppercase tracking-wider font-semibold">
              Framing Mode Switcher
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["Split", "Solo", "Auto"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setFramingMode(mode)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold font-mono border transition-all ${
                    framingMode === mode
                      ? "bg-[#F3E5AB] text-[#17120C] border-[#F3E5AB] shadow"
                      : "bg-[#2A2016] text-[#A1A1AA] border-[#F3E5AB]/15 hover:text-white"
                  }`}
                >
                  {mode === "Split" && "2-Speaker Split"}
                  {mode === "Solo" && "Solo Face-Track"}
                  {mode === "Auto" && "Auto Scene Switch"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 9:16 Vertical Output Monitor (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          <div className="flex items-center justify-between w-full text-xs font-mono text-[#A1A1AA]">
            <span>9:16 VERTICAL OUTPUT</span>
            <span className="text-[#F3E5AB]">1080x1920 HD</span>
          </div>

          <div className="relative aspect-[9/16] w-64 rounded-2xl bg-[#110D09] border-2 border-[#10B981]/70 shadow-[0_0_40px_rgba(16,185,129,0.25)] overflow-hidden flex flex-col justify-between p-2">
            {/* Top Half: Speaker 1 */}
            <div className="h-1/2 w-full rounded-lg bg-[#2A2016] overflow-hidden relative mb-1 border border-[#F3E5AB]/10">
              <img
                src={clip.thumbnail}
                alt="Speaker 1"
                className="w-full h-full object-cover filter brightness-95"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[#10B981] font-mono text-[9px] font-bold">
                SPEAKER 01 (HOST)
              </span>
            </div>

            {/* Bottom Half: Speaker 2 */}
            <div className="h-1/2 w-full rounded-lg bg-[#2A2016] overflow-hidden relative border border-[#F3E5AB]/10 flex flex-col justify-end p-2">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80"
                alt="Speaker 2"
                className="absolute inset-0 w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

              {/* Kinetic Caption Overlay */}
              <div className="relative z-10 text-center font-display font-black text-xs text-white uppercase italic tracking-wider drop-shadow-md">
                <span className="text-[#10B981] underline">SYSTEMS</span> SCALE FAST
              </div>
            </div>
          </div>

          {/* Aspect Ratio Pills */}
          <div className="flex items-center gap-2">
            {["9:16", "1:1", "16:9", "4:3"].map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => setAspectRatio(ratio)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  aspectRatio === ratio
                    ? "bg-[#10B981] text-black font-bold"
                    : "bg-[#2A2016] text-[#A1A1AA] hover:text-white"
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
