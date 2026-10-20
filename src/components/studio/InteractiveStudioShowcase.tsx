import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Subtitles,
  Columns,
  Calendar,
} from "lucide-react";
import { ViralClipStrip } from "./ViralClipStrip";
import { KineticCaptionStudio } from "./KineticCaptionStudio";
import { SocialCalendarBot } from "./SocialCalendarBot";
import { SmartReframeModal } from "./SmartReframeModal";
import { VideoClip, CaptionPresetId } from "../../types/studio";
import { INITIAL_CLIPS } from "../../lib/constants";
import { BlurText } from "../react-bits/BlurText";

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
    _clipId: string,
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

  const tabs = [
    { id: "clips", label: "Viral 9:16 Strip", icon: Scissors },
    { id: "reframe", label: "Smart Reframe Modal", icon: Columns },
    { id: "captions", label: "Kinetic Captions", icon: Subtitles },
    { id: "schedule", label: "Schedule & Bot", icon: Calendar },
  ] as const;

  return (
    <section
      id="playgrounds"
      className="relative z-10 py-16 px-4 sm:px-6 max-w-[1240px] mx-auto space-y-8"
      aria-label="Interactive Studio Workspaces"
    >
      {/* Studio Navigation Tabs with Editorial Heading using <BlurText /> */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-medium">
            Studio Workspaces
          </span>
          <BlurText
            text="Cinema-grade AI studio, built for retention."
            italicWord="retention"
            as="h2"
            className="font-display font-bold text-2xl sm:text-3xl text-[#F4F4F6] tracking-tight mt-1"
          />
        </div>

        {/* Tab switcher buttons with Framer Motion layoutId pill */}
        <div className="p-1 rounded-lg bg-[#12151B] border border-white/[0.08] flex items-center gap-1 overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeStudioTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (tab.id === "reframe") {
                    setSelectedClipForCrop(INITIAL_CLIPS[0]);
                    setIsCropModalOpen(true);
                  } else {
                    setActiveStudioTab(tab.id as "clips" | "captions" | "schedule");
                  }
                }}
                className={`relative px-3.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors shrink-0 ${
                  isActive ? "text-white font-semibold" : "text-text-secondary hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="studioWorkspacePill"
                    className="absolute inset-0 bg-[#161920] border border-white/[0.15] rounded-md shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Playground in Flat Hairline Container with AnimatePresence */}
      <div className="rounded-xl bg-[#0E1014] border border-white/[0.08] p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl min-h-[480px]">
        <AnimatePresence mode="wait">
          {activeStudioTab === "clips" && (
            <motion.div
              key="tab-clips"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <ViralClipStrip
                onEditClip={handleEditClip}
                activeCaptionPreset={activeCaptionPreset}
                onExportClip={handleExportClip}
              />
            </motion.div>
          )}

          {activeStudioTab === "captions" && (
            <motion.div
              key="tab-captions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <KineticCaptionStudio
                activePreset={activeCaptionPreset}
                onSelectPreset={(p) => setActiveCaptionPreset(p)}
              />
            </motion.div>
          )}

          {activeStudioTab === "schedule" && (
            <motion.div
              key="tab-schedule"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <SocialCalendarBot />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reframe Crop Modal */}
      <SmartReframeModal
        clip={selectedClipForCrop}
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        onApplyCrop={handleApplyCrop}
      />
    </section>
  );
}
