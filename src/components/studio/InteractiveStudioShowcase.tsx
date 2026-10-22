import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ViralClipStrip } from "./ViralClipStrip";
import { SmartReframeStudio } from "./SmartReframeStudio";
import { KineticCaptionStudio } from "./KineticCaptionStudio";
import { SocialCalendarBot } from "./SocialCalendarBot";
import { StudioEditorModal } from "./StudioEditorModal";
import { VideoClip, CaptionPresetId } from "../../types/studio";
import { INITIAL_CLIPS } from "../../lib/constants";

export type StudioTabId = "strip" | "clips" | "reframe" | "captions" | "schedule";

interface StudioTabItem {
  id: StudioTabId;
  label: string;
  badge?: string;
}

interface InteractiveStudioShowcaseProps {
  activeStudioTab: StudioTabId;
  setActiveStudioTab: (tab: StudioTabId) => void;
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

  const STUDIO_TABS: readonly StudioTabItem[] = [
    { id: "strip", label: "Viral 9:16 Strip", badge: "6" },
    { id: "reframe", label: "Smart Reframe" },
    { id: "captions", label: "Kinetic Captions" },
    { id: "schedule", label: "Schedule & Bot" },
  ];

  return (
    <section
      id="playgrounds"
      className="relative z-10 py-16 px-4 sm:px-6 max-w-[1240px] mx-auto space-y-8 overflow-visible"
      aria-label="Interactive Studio Workspaces"
    >
      {/* Studio Navigation Tabs with Editorial Heading */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="space-y-0.5">
          <div className="text-xs font-mono uppercase tracking-wider text-[#D99B52] font-semibold">
            Interactive Workspaces
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4F4F6] tracking-tight">
            Autonomous Editing Stages
          </h3>
        </div>

        {/* Autonomous Editing Stages Navbar */}
        <div className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl bg-[#16120D] p-1.5 border border-[#F3E5AB]/20 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
          {STUDIO_TABS.map((tab) => {
            const isActive =
              activeStudioTab === tab.id ||
              (activeStudioTab === "clips" && tab.id === "strip") ||
              (activeStudioTab === "strip" && tab.id === "clips");
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveStudioTab(tab.id)}
                className={`relative z-10 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 font-display text-[13.5px] font-bold transition-all duration-200 select-none ${
                  isActive
                    ? "bg-[#F3E5AB] text-[#14100B] shadow-[0_2px_16px_rgba(243,229,171,0.35)] scale-[1.01]"
                    : "bg-transparent text-[#E5E0D8]/80 hover:bg-[#F3E5AB]/10 hover:text-[#F3E5AB]"
                }`}
              >
                <span>{tab.label}</span>
                {Boolean(tab.badge) && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-mono text-[10.5px] font-extrabold ${
                      isActive
                        ? "bg-[#14100B] text-[#F3E5AB]"
                        : "bg-[#10B981]/20 text-[#34D399]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Studio Workspace with AnimatePresence mode="wait" */}
      <div className="rounded-2xl bg-[#1E1710] border border-[#F3E5AB]/15 p-4 sm:p-6 shadow-2xl min-h-[480px] overflow-visible">
        <AnimatePresence mode="wait">
          {(activeStudioTab === "clips" || activeStudioTab === "strip") && (
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
