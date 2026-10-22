import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Subtitles,
  Columns,
  Calendar,
} from "lucide-react";
import { ViralClipStrip } from "./ViralClipStrip";
import { SmartReframeStudio } from "./SmartReframeStudio";
import { KineticCaptionStudio } from "./KineticCaptionStudio";
import { SocialCalendarBot } from "./SocialCalendarBot";
import { StudioEditorModal } from "./StudioEditorModal";
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
}: Readonly<InteractiveStudioShowcaseProps>) {
  const [activeCaptionPreset, setActiveCaptionPreset] =
    useState<CaptionPresetId>("sharko-emerald");
  const [selectedClipForCrop, setSelectedClipForCrop] =
    useState<VideoClip | null>(null);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);

  const handleEditClip = (clip: VideoClip) => {
    setSelectedClipForCrop(clip);
    setIsEditorModalOpen(true);
  };

  const handleApplyCrop = (
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
    { id: "reframe", label: "Smart Reframe", icon: Columns },
    { id: "captions", label: "Kinetic Captions", icon: Subtitles },
    { id: "schedule", label: "Schedule & Bot", icon: Calendar },
  ] as const;

  return (
    <section
      id="playgrounds"
      className="relative z-10 py-16 px-4 sm:px-6 max-w-[1240px] mx-auto space-y-8 overflow-visible"
      aria-label="Interactive Studio Workspaces"
    >
      {/* Studio Navigation Tabs with Editorial Heading */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] font-medium">
            Studio Workspaces
          </span>
          <BlurText
            text="Cinema-grade AI studio, built for retention."
            italicWords={["retention"]}
            as="h2"
            className="font-display font-bold text-2xl sm:text-3xl text-[#F4F4F6] tracking-tight mt-1"
          />
        </div>

        {/* Tab switcher buttons with Framer Motion layoutId pill */}
        <div className="p-1 rounded-xl bg-[#1E1710] border border-[#F3E5AB]/15 flex items-center gap-1 overflow-x-auto max-w-full shadow-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeStudioTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStudioTab(tab.id)}
                className={`relative px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors shrink-0 ${
                  isActive ? "text-[#17120C] font-semibold" : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="studioWorkspacePill"
                    className="absolute inset-0 bg-[#F3E5AB] rounded-lg shadow-sm -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#17120C]" : "text-[#10B981]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Studio Workspace with AnimatePresence mode="wait" */}
      <div className="rounded-2xl bg-[#1E1710] border border-[#F3E5AB]/15 p-4 sm:p-6 shadow-2xl min-h-[480px] overflow-visible">
        <AnimatePresence mode="wait">
          {activeStudioTab === "clips" && (
            <motion.div
              key="tab-clips"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="overflow-visible"
            >
              <ViralClipStrip
                onEditClip={handleEditClip}
                activeCaptionPreset={activeCaptionPreset}
                onExportClip={handleExportClip}
              />
            </motion.div>
          )}

          {activeStudioTab === "reframe" && (
            <motion.div
              key="tab-reframe"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <SmartReframeStudio onApplyCrop={handleApplyCrop} />
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
                onExportSuccess={onExportSuccess}
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

      {/* Portaled, Scroll-Locked Full-Screen Studio Editor Modal */}
      <StudioEditorModal
        clip={selectedClipForCrop || INITIAL_CLIPS[0]}
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        onExport={onExportSuccess}
      />
    </section>
  );
}
