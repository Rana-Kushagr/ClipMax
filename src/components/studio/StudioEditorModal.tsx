import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Scissors,
  Check,
  RotateCcw,
  Volume2,
  Subtitles,
  Smartphone,
  Eye,
  Columns,
  Sparkles,
} from "lucide-react";
import { VideoClip, CaptionPresetId } from "../../types/studio";
import { CAPTION_STYLES } from "../../lib/constants";

interface StudioEditorModalProps {
  clip: VideoClip | null;
  isOpen: boolean;
  onClose: () => void;
  onExport: (clipTitle: string) => void;
}

interface TranscriptToken {
  id: number;
  word: string;
  state: "default" | "mint" | "sand" | "cut";
}

const DEFAULT_TOKENS: TranscriptToken[] = [
  { id: 1, word: "If", state: "default" },
  { id: 2, word: "you", state: "default" },
  { id: 3, word: "are", state: "default" },
  { id: 4, word: "building", state: "mint" },
  { id: 5, word: "low-latency", state: "sand" },
  { id: 6, word: "systems,", state: "default" },
  { id: 7, word: "memory", state: "mint" },
  { id: 8, word: "allocations", state: "sand" },
  { id: 9, word: "will", state: "default" },
  { id: 10, word: "silently", state: "default" },
  { id: 11, word: "kill", state: "sand" },
  { id: 12, word: "your", state: "default" },
  { id: 13, word: "P99", state: "mint" },
  { id: 14, word: "latency.", state: "default" },
];

export function StudioEditorModal({
  clip,
  isOpen,
  onClose,
  onExport,
}: Readonly<StudioEditorModalProps>) {
  const [activeTab, setActiveTab] = useState<"reframe" | "captions">("reframe");
  const [aspectRatio, setAspectRatio] = useState<string>("9:16");
  const [framingMode, setFramingMode] = useState<"Split" | "Solo" | "Auto">("Split");
  const [activeCaptionPreset, setActiveCaptionPreset] = useState<CaptionPresetId>("sharko-emerald");
  const [tokens, setTokens] = useState<TranscriptToken[]>(DEFAULT_TOKENS);
  const [stripFillerWords, setStripFillerWords] = useState<boolean>(true);
  const [aiBrollOverlay, setAiBrollOverlay] = useState<boolean>(true);
  const [title, setTitle] = useState(clip?.title || "System Architecture DeepDive");

  useEffect(() => {
    if (clip) {
      setTitle(clip.title);
      setFramingMode(clip.speakerType === "solo" ? "Solo" : "Split");
    }
  }, [clip]);

  // Hard Main-Page Scroll Lock When Editor Is Open
  useEffect(() => {
    if (!isOpen) return;
    const scrollY = window.scrollY;
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.width = originalStyle.width;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const currentCaptionStyle =
    CAPTION_STYLES.find((c) => c.id === activeCaptionPreset) || CAPTION_STYLES[0];

  const handleCycleToken = (id: number) => {
    setTokens((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextState =
          t.state === "default"
            ? "mint"
            : t.state === "mint"
            ? "sand"
            : t.state === "sand"
            ? "cut"
            : "default";
        return { ...t, state: nextState };
      })
    );
  };

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
        <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

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

          {/* TAB 1: REFRAME STUDIO VIEW */}
          {activeTab === "reframe" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: 16:9 Source Widescreen with Dual Neural Bounding Boxes */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                  <span>SOURCE 16:9 RAW WIDESCREEN</span>
                  <span className="text-[#10B981]">NEURAL TRACKING: ACTIVE</span>
                </div>

                <div className="relative aspect-video w-full rounded-xl bg-[#110D09] border border-[#F3E5AB]/20 overflow-hidden shadow-xl">
                  <img
                    src={clip?.thumbnail || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80"}
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

                {/* Framing Mode Selector */}
                <div className="p-4 rounded-xl bg-[#2A2016]/80 border border-[#F3E5AB]/15 space-y-2">
                  <div className="text-xs font-mono text-[#D99B52] uppercase">Framing Mode Switcher</div>
                  <div className="grid grid-cols-3 gap-2">
                    {(["Split", "Solo", "Auto"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setFramingMode(mode)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold font-mono border transition-all ${
                          framingMode === mode
                            ? "bg-[#F3E5AB] text-[#17120C] border-[#F3E5AB] shadow"
                            : "bg-[#17120C] text-[#A1A1AA] border-[#F3E5AB]/15 hover:text-white"
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

              {/* Right Column: 9:16 Vertical Reframed Output Phone Monitor */}
              <div className="lg:col-span-5 flex flex-col items-center space-y-4">
                <div className="flex items-center justify-between w-full text-xs font-mono text-[#A1A1AA]">
                  <span>9:16 VERTICAL OUTPUT MONITOR</span>
                  <span className="text-[#F3E5AB]">1080x1920 HD</span>
                </div>

                <div className="relative aspect-[9/16] w-64 rounded-2xl bg-[#110D09] border-2 border-[#10B981]/70 shadow-[0_0_40px_rgba(16,185,129,0.25)] overflow-hidden flex flex-col justify-between p-2">
                  {/* Top Half: Speaker 1 */}
                  <div className="h-1/2 w-full rounded-lg bg-[#2A2016] overflow-hidden relative mb-1 border border-[#F3E5AB]/10">
                    <img
                      src={clip?.thumbnail || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                      alt="Speaker 1"
                      className="w-full h-full object-cover filter brightness-95"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[#10B981] font-mono text-[9px] font-bold">
                      HOST (SPEAKER 01)
                    </span>
                  </div>

                  {/* Bottom Half: Speaker 2 + Kinetic Subtitles */}
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
          )}

          {/* TAB 2: KINETIC CAPTION & TRANSCRIPT STUDIO */}
          {activeTab === "captions" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Interactive Word-by-Word Transcript Tokens */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                  <span>INTERACTIVE TRANSCRIPT TOKENS</span>
                  <span>Click to cycle highlight state</span>
                </div>

                <div className="p-4 rounded-xl bg-[#2A2016]/80 border border-[#F3E5AB]/15 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {tokens.map((token) => {
                      let colorClass = "bg-[#17120C] text-white border-[#F3E5AB]/15 hover:border-[#F3E5AB]/40";
                      if (token.state === "mint") {
                        colorClass = "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40 font-bold";
                      } else if (token.state === "sand") {
                        colorClass = "bg-[#F3E5AB]/20 text-[#F3E5AB] border-[#F3E5AB]/40 font-bold";
                      } else if (token.state === "cut") {
                        colorClass = "bg-red-500/10 text-red-400 line-through border-red-500/25";
                      }

                      return (
                        <button
                          key={token.id}
                          type="button"
                          onClick={() => handleCycleToken(token.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all active:scale-95 ${colorClass}`}
                        >
                          {token.word}
                        </button>
                      );
                    })}
                  </div>

                  {/* Transcript Automation Toggles */}
                  <div className="pt-3 border-t border-[#F3E5AB]/10 flex flex-wrap gap-4 text-xs font-mono text-[#A1A1AA]">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={stripFillerWords}
                        onChange={(e) => setStripFillerWords(e.target.checked)}
                        className="rounded border-[#F3E5AB]/30 text-[#10B981] focus:ring-[#10B981]"
                      />
                      <span className="text-[#F4F4F6]">Strip 'um' & 'uh' silence gaps</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={aiBrollOverlay}
                        onChange={(e) => setAiBrollOverlay(e.target.checked)}
                        className="rounded border-[#F3E5AB]/30 text-[#10B981] focus:ring-[#10B981]"
                      />
                      <span className="text-[#F4F4F6]">Auto B-Roll Overlay</span>
                    </label>
                  </div>
                </div>

                {/* 5 Caption Preset Tiles */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#D99B52] uppercase">Visual Caption Preset</div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {CAPTION_STYLES.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setActiveCaptionPreset(style.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          activeCaptionPreset === style.id
                            ? "bg-[#F3E5AB]/15 border-[#F3E5AB] ring-1 ring-[#F3E5AB]/40"
                            : "bg-[#2A2016] border-[#F3E5AB]/10 hover:border-[#F3E5AB]/30"
                        }`}
                      >
                        <div className="text-[11px] font-bold text-white mb-1 truncate">{style.name}</div>
                        <div className="text-[9px] text-[#A1A1AA] truncate font-sans">{style.badge}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Live Caption Preview Phone Stage */}
              <div className="lg:col-span-5 flex flex-col items-center space-y-4">
                <div className="text-xs font-mono text-[#A1A1AA]">LIVE KINETIC PREVIEW</div>
                <div className="relative aspect-[9/16] w-64 rounded-2xl bg-[#110D09] border border-[#F3E5AB]/25 overflow-hidden flex flex-col justify-end p-4 shadow-2xl">
                  <img
                    src={clip?.thumbnail || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover filter brightness-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                  {/* Active Caption Typography */}
                  <div className="relative z-10 text-center space-y-1">
                    <div
                      className={`text-sm leading-tight ${currentCaptionStyle.fontClass}`}
                      style={{ color: currentCaptionStyle.textColor }}
                    >
                      <span
                        className="px-1.5 py-0.5 rounded font-black uppercase italic"
                        style={{ color: currentCaptionStyle.highlightColor }}
                      >
                        LOW-LATENCY
                      </span>{" "}
                      <span className="font-bold uppercase">SYSTEMS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
