import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Subtitles,
  Columns,
  Sparkles,
} from "lucide-react";
import { VideoClip, CaptionPresetId } from "../../types/studio";
import { SmartReframeStudio } from "./SmartReframeStudio";
import { KineticCaptionStudio } from "./KineticCaptionStudio";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

interface StudioEditorModalProps {
  clip: VideoClip | null;
  isOpen: boolean;
  onClose: () => void;
  onExport: (clipTitle: string) => void;
}

export function StudioEditorModal({
  clip,
  isOpen,
  onClose,
  onExport,
}: Readonly<StudioEditorModalProps>) {
  const [activeTab, setActiveTab] = useState<"reframe" | "captions">("reframe");
  const [activeCaptionPreset, setActiveCaptionPreset] =
    useState<CaptionPresetId>("sharko-emerald");
  const [title, setTitle] = useState(
    clip?.title || "System Architecture DeepDive"
  );

  useEffect(() => {
    if (clip) {
      setTitle(clip.title);
    }
  }, [clip]);

  // Hard Main-Page Scroll Lock When Editor Is Open (Shared DRY hook)
  useBodyScrollLock(isOpen, onClose);

  if (!isOpen || typeof document === "undefined") return null;

  const handleExportClick = () => {
    onExport(title);
    onClose();
  };

  const modalContent = (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0D0A07]/92 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Backdrop click to dismiss */}
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 -z-10 cursor-default bg-transparent border-none w-full h-full"
          aria-label="Dismiss editor modal"
          tabIndex={-1}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#1E1710] border border-[#F3E5AB]/25 shadow-2xl p-5 sm:p-7 text-[#F4F4F6] space-y-6"
        >
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F3E5AB]/15">
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#F3E5AB]">
                  SHARKO STUDIO INSPECTOR — HUNT THE MOMENTS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-[11px] font-mono font-bold">
                  {clip?.viralityScore || 98} VIRAL SCORE
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-lg sm:text-xl font-display font-bold bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-[#F3E5AB]/40 rounded px-1 -ml-1"
                aria-label="Clip title"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Tab Selector */}
              <div className="p-1 rounded-lg bg-[#2A2016] border border-[#F3E5AB]/20 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("reframe")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    activeTab === "reframe"
                      ? "bg-[#F3E5AB] text-[#17120C] font-semibold shadow"
                      : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Reframe</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("captions")}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    activeTab === "captions"
                      ? "bg-[#F3E5AB] text-[#17120C] font-semibold shadow"
                      : "text-[#A1A1AA] hover:text-white"
                  }`}
                >
                  <Subtitles className="w-3.5 h-3.5" />
                  <span>Captions</span>
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg bg-[#2A2016] hover:bg-[#382B1E] border border-[#F3E5AB]/20 text-[#A1A1AA] hover:text-white transition-colors"
                aria-label="Close studio editor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Workspace View: Reuses Standalone Components to Eliminate Duplication */}
          <div className="pt-2">
            {activeTab === "reframe" ? (
              <SmartReframeStudio
                onApplyCrop={(aspect, mode) => {
                  onExport(`${title} (${aspect} • ${mode})`);
                  onClose();
                }}
              />
            ) : (
              <KineticCaptionStudio
                activePreset={activeCaptionPreset}
                onSelectPreset={setActiveCaptionPreset}
                onExportSuccess={(msg) => {
                  onExport(msg);
                  onClose();
                }}
              />
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#F3E5AB]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
              <Sparkles className="w-4 h-4" />
              <span>Full HD 1080x1920 • 60 FPS • SMPTE-Timed</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#2A2016] hover:bg-[#382B1E] border border-[#F3E5AB]/20 text-[#A1A1AA] hover:text-white font-mono text-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExportClick}
                className="flex-1 sm:flex-initial px-6 py-2 rounded-xl bg-[#F3E5AB] hover:bg-white text-[#17120C] font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Export 1080p HD Watermark-Free</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

export default StudioEditorModal;
