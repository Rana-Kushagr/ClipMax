"use client";

import React, { useState } from "react";
import {
  Scissors,
  Subtitles,
  Columns,
  Calendar,
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
      className="relative z-10 py-16 px-4 sm:px-6 max-w-[1240px] mx-auto space-y-8"
      aria-label="Interactive Studio Workspaces"
    >
      {/* Studio Navigation Tabs with Editorial Heading */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-medium">
            Studio Workspaces
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight mt-1">
            Cinema-grade AI studio,{" "}
            <span className="font-editorial italic font-normal text-text-primary">
              built for retention
            </span>
            .
          </h2>
        </div>

        {/* Tab switcher buttons */}
        <div className="p-1 rounded-lg bg-surface-subtle hairline-border flex items-center gap-1 overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveStudioTab("clips")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all shrink-0 ${
              activeStudioTab === "clips"
                ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
                : "text-text-secondary hover:text-white"
            }`}
          >
            <Scissors className="w-3.5 h-3.5 text-text-muted" />
            <span>Viral 9:16 Strip</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedClipForCrop(INITIAL_CLIPS[0]);
              setIsCropModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all shrink-0 text-text-secondary hover:text-white"
          >
            <Columns className="w-3.5 h-3.5 text-text-muted" />
            <span>Smart Reframe Modal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStudioTab("captions")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all shrink-0 ${
              activeStudioTab === "captions"
                ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
                : "text-text-secondary hover:text-white"
            }`}
          >
            <Subtitles className="w-3.5 h-3.5 text-text-muted" />
            <span>Kinetic Captions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveStudioTab("schedule")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all shrink-0 ${
              activeStudioTab === "schedule"
                ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
                : "text-text-secondary hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-text-muted" />
            <span>Schedule & Bot</span>
          </button>
        </div>
      </div>

      {/* Render Active Playground in Flat Hairline Container */}
      <div className="rounded-xl bg-surface hairline-border p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
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
