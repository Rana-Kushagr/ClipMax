import React, { useState } from "react";
import { Columns, Download } from "lucide-react";
import {
  SmartReframeViewport,
  FramingMode,
  AspectRatioKey,
  FRAMING_MODE_CONFIG,
} from "./SmartReframeViewport";

interface SmartReframeStudioProps {
  onApplyCrop?: (aspectRatio: string, layout: string) => void;
  initialAspectRatio?: AspectRatioKey;
  initialFramingMode?: FramingMode;
  clipScore?: number;
}

export function SmartReframeStudio({
  onApplyCrop,
  initialAspectRatio = "9:16",
  initialFramingMode = "split",
  clipScore = 99,
}: Readonly<SmartReframeStudioProps>) {
  const [aspectRatio, setAspectRatio] = useState<AspectRatioKey>(initialAspectRatio);
  const [framingMode, setFramingMode] = useState<FramingMode>(initialFramingMode);

  const handleApply = () => {
    if (onApplyCrop) {
      onApplyCrop(aspectRatio, FRAMING_MODE_CONFIG[framingMode].label);
    }
  };

  return (
    <div className="space-y-6 select-none" aria-label="Smart Reframe Studio">
      {/* Studio Stage Header */}
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
            AI isolates dual-speaker conversational dynamics, locks active gaze, and outputs adaptive vertical & widescreen splits.
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

      {/* Dynamic 3-Mode & 5-Ratio Viewport */}
      <SmartReframeViewport
        framingMode={framingMode}
        setFramingMode={setFramingMode}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        clipScore={clipScore}
      />
    </div>
  );
}
