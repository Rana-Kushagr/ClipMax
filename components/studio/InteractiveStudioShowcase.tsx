"use client";

import React, { useState } from "react";
import {
  Scissors,
  Subtitles,
  Columns,
  Calendar,
  Sparkles,
  Download,
  CheckCircle2,
} from "lucide-react";
import { ViralClipStrip } from "./ViralClipStrip";
import { CaptionStyleTester } from "./CaptionStyleTester";
import { SocialCalendarApproval } from "./SocialCalendarApproval";
import { ReframeCropModal } from "./ReframeCropModal";
import { VideoClip, CaptionPresetId } from "@/types/studio";
import { INITIAL_CLIPS } from "@/lib/constants";

interface InteractiveStudioShowcaseProps {
  activeStudioTab: "clips" | "reframe" | "captions" | "schedule";
  setActiveStudioTab: (tab: "clips" | "reframe" | "captions" | "schedule") => void;
  onExportSuccess: (clipTitle: string) => void;
}

export function InteractiveStudioShowcase({
  activeStudioTab,
  setActiveStudioTab,
  onExportSuccess,
}: InteractiveStudioShowcaseProps) {
  const [activeCaptionPreset, setActiveCaptionPreset] =
    useState<CaptionPresetId>("clipmax-emerald");
  const [selectedClipForCrop, setSelectedClipForCrop] =
    useState<VideoClip | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const handleEditClip = (clip: VideoClip) => {
    setSelectedClipForCrop(clip);
    setIsCropModalOpen(true);
  };

  const handleApplyCrop = (
    clipId: string,
    aspectRatio: string,
    layout: string
  ) => {
    onExportSuccess(`Smart Reframe applied: ${aspectRatio} (${layout})`);
  };

  const handleExportClip = (clip: VideoClip) => {
    onExportSuccess(
      `1080p HD Exported: "${clip.title}" (1 clip credit used • Watermark-free)`
    );
  };

  return (
    <section
      id="playgrounds"
      className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8"
      aria-label="Interactive Studio Workspaces"
    >
      {/* Studio Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-bold">
            Studio Workspaces
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            The 4 Live Creator Playgrounds
          </h2>
        </div>

        {/* Tab switcher buttons */}
        <div className="p-1 rounded-2xl bg-surface border border-border flex items-center gap-1 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveStudioTab("clips")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeStudioTab === "clips"
                ? "bg-primary text-white shadow-md"
                : "text-text-secondary hover:text-white hover:bg-surface-subtle"
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>1. Viral 9:16 Strip</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedClipForCrop(INITIAL_CLIPS[0]);
              setIsCropModalOpen(true);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 text-text-secondary hover:text-white hover:bg-surface-subtle`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>2. Smart Reframe Modal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStudioTab("captions")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeStudioTab === "captions"
                ? "bg-accent text-slate-950 font-bold shadow-md"
                : "text-text-secondary hover:text-white hover:bg-surface-subtle"
            }`}
          >
            <Subtitles className="w-3.5 h-3.5" />
            <span>3. Kinetic Captions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStudioTab("schedule")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shrink-0 ${
              activeStudioTab === "schedule"
                ? "bg-primary text-white shadow-md"
                : "text-text-secondary hover:text-white hover:bg-surface-subtle"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>4. Schedule & Bot</span>
          </button>
        </div>
      </div>

      {/* Render Active Playground */}
      <div className="rounded-3xl bg-surface/70 border border-border-strong p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
        {activeStudioTab === "clips" && (
          <ViralClipStrip
            onEditClip={handleEditClip}
            activeCaptionPreset={activeCaptionPreset}
            onExportClip={handleExportClip}
          />
        )}

        {activeStudioTab === "captions" && (
          <CaptionStyleTester
            activePreset={activeCaptionPreset}
            onSelectPreset={(p) => setActiveCaptionPreset(p)}
          />
        )}

        {activeStudioTab === "schedule" && <SocialCalendarApproval />}
      </div>

      {/* Reframe Crop Modal (Playground 2) */}
      <ReframeCropModal
        clip={selectedClipForCrop}
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        onApplyCrop={handleApplyCrop}
      />
    </section>
  );
}
