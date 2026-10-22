import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Subtitles,
  Columns,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { VideoClip, CaptionPresetId } from "../../types/studio";
import { SmartReframeStudio } from "./SmartReframeStudio";
import { KineticCaptionStudio } from "./KineticCaptionStudio";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { sharkoApi } from "../../services/sharkoApi";

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
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (clip) {
      setTitle(clip.title);
    }
  }, [clip]);

  // Hard Main-Page Scroll Lock When Editor Is Open (Shared DRY hook)
  useBodyScrollLock(isOpen, onClose);

  if (!isOpen || typeof document === "undefined") return null;

  const handleExportClick = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const clipId = clip?.id || "clip-1";
      const res = await sharkoApi.exportClipJob(clipId, {
        clipId,
        framingMode: "split",
        aspectRatio: "9:16",
        captionPreset: activeCaptionPreset,
      });
      if (res.ok || res.isOfflineFallback) {
        onExport(title);
        onClose();
      }
    } finally {
      setIsExporting(false);
    }
  };

  const modalContent = (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[99999] h-[100dvh] w-full overflow-y-auto bg-[#000000] flex flex-col sm:items-center sm:justify-center p-0 sm:p-6"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Backdrop click to dismiss (Desktop only) */}
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 -z-10 cursor-default bg-transparent border-none w-full h-full hidden sm:block"
          aria-label="Dismiss editor modal"
          tabIndex={-1}
        />

        {/* Sticky Mobile Top Action Bar (iOS/Android 44x44px Touch Targets) */}
        <div className="sticky top-0 z-30 flex sm:hidden items-center justify-between bg-[#000000]/95 backdrop-blur-md px-4 py-3 border-b border-[#89CFF0]/20 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#050D1E] border border-[#89CFF0]/30 text-[#89CFF0] active:scale-95 transition touch-manipulation"
            aria-label="Back to studio overview"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-mono text-xs font-bold text-[#89CFF0] truncate max-w-[160px]">
            {title}
          </span>
          <button
            type="button"
            onClick={handleExportClick}
            disabled={isExporting}
            className="btn-sharko-primary min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 active:scale-95 touch-manipulation"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl sm:max-h-[92vh] sm:overflow-y-auto rounded-none sm:rounded-2xl bg-[#000000] border-0 sm:border border-[#89CFF0]/25 shadow-2xl p-4 sm:p-7 text-[#FFFFFF] space-y-6 flex-1 sm:flex-initial"
        >
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#89CFF0]/20">
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#89CFF0] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#89CFF0] font-semibold">
                  SHARKO STUDIO INSPECTOR — HUNT THE MOMENTS
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#0047AB]/30 border border-[#89CFF0]/40 text-[#89CFF0] text-[11px] font-mono font-bold">
                  {clip?.viralityScore || 98} VIRAL SCORE
                </span>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-lg sm:text-xl font-display font-bold bg-transparent text-white focus:outline-none focus:ring-1 focus:ring-[#89CFF0]/40 rounded px-1 -ml-1 text-[16px] sm:text-[20px]"
                aria-label="Clip title"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
              {/* Tab Selector */}
              <div className="p-1 rounded-xl bg-[#050D1E] border border-[#89CFF0]/25 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("reframe")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors touch-manipulation ${
                    activeTab === "reframe"
                      ? "bg-[#89CFF0] text-[#000000] font-bold shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Reframe</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("captions")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors touch-manipulation ${
                    activeTab === "captions"
                      ? "bg-[#89CFF0] text-[#000000] font-bold shadow"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Subtitles className="w-3.5 h-3.5" />
                  <span>Captions</span>
                </button>
              </div>

              {/* Close Button (Desktop) */}
              <button
                type="button"
                onClick={onClose}
                className="hidden sm:flex p-2 rounded-xl bg-[#050D1E] hover:bg-[#0047AB]/30 border border-[#89CFF0]/25 text-zinc-300 hover:text-white transition-colors"
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
                clipScore={clip?.viralityScore || 98}
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
          <div className="pt-4 border-t border-[#89CFF0]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#89CFF0]">
              <Sparkles className="w-4 h-4" />
              <span>Full HD 1080x1920 • 60 FPS • SMPTE-Timed</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#050D1E] hover:bg-[#0047AB]/25 border border-[#89CFF0]/25 text-zinc-300 hover:text-white font-mono text-xs transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExportClick}
                disabled={isExporting}
                className="btn-sharko-primary flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-75 disabled:cursor-wait touch-manipulation"
              >
                <Download className="w-4 h-4" />
                <span>{isExporting ? "Exporting HD..." : "Export 1080p HD Watermark-Free"}</span>
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
