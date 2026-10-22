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
      `Exported 1080p 60fps MP4 (${clip.aspectRatio} • ${clip.speakerType}) — 0 watermarks.`
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
          <div className="text-xs font-mono uppercase tracking-wider text-[#89CFF0] font-semibold">
            Interactive Workspaces
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#FFFFFF] tracking-tight">
            Autonomous Editing Stages
          </h3>
        </div>

        {/* Autonomous Editing Stages Navbar (Mobile-Responsive 2x2 Grid <-> Desktop Inline Flex) */}
        <div className="grid grid-cols-2 sm:inline-flex w-full sm:w-auto gap-1.5 p-1.5 rounded-2xl bg-[#030914] border border-[#89CFF0]/25 shadow-[0_10px_30px_rgba(0,0,0,0.65)]">
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
                className={`relative z-10 inline-flex items-center justify-center sm:justify-start gap-2 rounded-xl px-3 sm:px-4 py-2.5 font-display text-[12.5px] sm:text-[13.5px] font-bold transition-all duration-200 select-none touch-manipulation ${
                  isActive
                    ? "bg-[#89CFF0] text-[#000000] font-bold shadow-[0_0_16px_rgba(137,207,240,0.4)] scale-[1.01]"
                    : "bg-transparent text-zinc-300 hover:bg-[#0047AB]/25 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                {Boolean(tab.badge) && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-mono text-[10.5px] font-extrabold ${
                      isActive
                        ? "bg-[#000000] text-[#89CFF0]"
                        : "bg-[#0047AB]/30 text-[#89CFF0] border border-[#89CFF0]/30"
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
      <div className="rounded-2xl bg-[#030710] border border-[#89CFF0]/20 p-3 sm:p-6 shadow-2xl min-h-[480px] overflow-visible">
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
