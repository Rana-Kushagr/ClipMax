import React, { useState, useEffect } from "react";
import {
  Subtitles,
  Check,
  RotateCcw,
  Sliders,
  Download,
  Layers,
} from "lucide-react";
import { CAPTION_STYLES } from "../../lib/constants";
import { CaptionPresetId } from "../../types/studio";

interface TokenWord {
  id: number;
  word: string;
  state: "default" | "mint" | "sand" | "cut";
}

const INITIAL_TRANSCRIPT: TokenWord[] = [
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

interface KineticCaptionStudioProps {
  activePreset: CaptionPresetId;
  onSelectPreset: (id: CaptionPresetId) => void;
  onExportSuccess?: (title: string) => void;
}

export function KineticCaptionStudio({
  activePreset,
  onSelectPreset,
  onExportSuccess,
}: Readonly<KineticCaptionStudioProps>) {
  const [tokens, setTokens] = useState<TokenWord[]>(INITIAL_TRANSCRIPT);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [stripFillerWords, setStripFillerWords] = useState(true);
  const [aiBrollOverlay, setAiBrollOverlay] = useState(true);

  // Cycle token state: default -> mint (#10B981) -> sand (#F3E5AB) -> cut -> default
  const handleTokenClick = (id: number) => {
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

  const activeTokens = tokens.filter((t) => t.state !== "cut");

  // Animate kinetic subtitle words
  useEffect(() => {
    if (activeTokens.length === 0) return;
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % activeTokens.length);
    }, 450);
    return () => clearInterval(interval);
  }, [activeTokens.length]);

  const activeStyle =
    CAPTION_STYLES.find((s) => s.id === activePreset) || CAPTION_STYLES[0];

  const resetTokens = () => setTokens(INITIAL_TRANSCRIPT);

  return (
    <div className="space-y-6 select-none" aria-label="Kinetic Caption Studio">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#F3E5AB]/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <h3 className="font-display font-semibold text-lg text-[#F4F4F6] flex items-center gap-2">
              <Subtitles className="w-5 h-5 text-[#10B981]" />
              <span>Kinetic Caption & Transcript Studio</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded bg-[#2A2016] text-[#F3E5AB] border border-[#F3E5AB]/20 text-xs font-mono font-medium">
              Live Phoneme Sync
            </span>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-1 font-sans">
            Click words to cycle highlight modes (Default → Mint #10B981 → Sand #F3E5AB → Strikethrough Cut).
          </p>
        </div>

        <button
          type="button"
          onClick={resetTokens}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A2016] border border-[#F3E5AB]/20 text-xs font-mono text-[#F3E5AB] hover:text-white hover:bg-[#382B1E] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Transcript</span>
        </button>
      </div>

      {/* Complete 3-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Clickable Word-by-Word Transcript Tokens + Automation Toggles (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-[#1E1710] border border-[#F3E5AB]/15 space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
              <span className="text-[#F3E5AB] uppercase tracking-wider font-semibold">
                Transcript Tokens
              </span>
              <span className="text-[10px]">Click to cycle</span>
            </div>

            {/* Word Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {tokens.map((token) => {
                const isCut = token.state === "cut";
                const isMint = token.state === "mint";
                const isSand = token.state === "sand";

                let chipClasses = "bg-[#2A2016] text-white border-[#F3E5AB]/15 hover:border-[#F3E5AB]/40";
                if (isCut) chipClasses = "bg-red-500/10 text-red-400 line-through border-red-500/30";
                if (isMint) chipClasses = "bg-[#10B981]/20 text-[#10B981] font-bold border-[#10B981]/40";
                if (isSand) chipClasses = "bg-[#F3E5AB]/20 text-[#F3E5AB] font-bold border-[#F3E5AB]/40";

                return (
                  <button
                    key={token.id}
                    type="button"
                    onClick={() => handleTokenClick(token.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-all active:scale-95 ${chipClasses}`}
                  >
                    {token.word}
                  </button>
                );
              })}
            </div>

            {/* Automation Toggles */}
            <div className="pt-3 border-t border-[#F3E5AB]/10 space-y-2.5 text-xs font-mono text-[#A1A1AA]">
              <label className="flex items-center justify-between cursor-pointer select-none">
                <span className="text-[#F4F4F6]">Strip 'um' & 'uh' Gaps</span>
                <input
                  type="checkbox"
                  checked={stripFillerWords}
                  onChange={(e) => setStripFillerWords(e.target.checked)}
                  className="rounded border-[#F3E5AB]/30 text-[#10B981] focus:ring-[#10B981]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer select-none">
                <span className="text-[#F4F4F6]">AI B-Roll Overlay</span>
                <input
                  type="checkbox"
                  checked={aiBrollOverlay}
                  onChange={(e) => setAiBrollOverlay(e.target.checked)}
                  className="rounded border-[#F3E5AB]/30 text-[#10B981] focus:ring-[#10B981]"
                />
              </label>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Live 9:16 Phone Preview Updating in Real Time (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col items-center space-y-3">
          <div className="text-xs font-mono text-[#A1A1AA]">LIVE 9:16 PREVIEW</div>

          <div className="relative aspect-[9/16] w-64 rounded-2xl bg-[#110D09] border-2 border-[#10B981]/60 shadow-[0_0_35px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col justify-end p-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
              alt="Speaker"
              className="absolute inset-0 w-full h-full object-cover filter brightness-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

            {/* Top Score Badge */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#10B981] text-black font-mono text-[10px] font-bold shadow">
              98 VIRAL
            </div>

            {/* Active Caption Typography */}
            <div className="relative z-10 text-center space-y-1">
              <div className="text-[10px] font-mono text-[#F3E5AB] uppercase tracking-wider">
                {activeStyle.name}
              </div>
              <div
                className={`font-display font-black leading-tight drop-shadow-md text-base uppercase italic tracking-wider`}
                style={{ color: activeStyle.textColor }}
              >
                <span>
                  {activeTokens
                    .slice(
                      Math.max(0, activeWordIndex - 1),
                      Math.min(activeTokens.length, activeWordIndex + 2)
                    )
                    .map((token, idx) => {
                      const isHighlighted = idx === 1;
                      const color =
                        token.state === "sand"
                          ? "#F3E5AB"
                          : token.state === "mint"
                          ? "#10B981"
                          : isHighlighted
                          ? activeStyle.highlightColor
                          : activeStyle.textColor;

                      return (
                        <span
                          key={token.id}
                          className={`inline-block mx-0.5 transition-all ${
                            isHighlighted ? "scale-110 font-black underline" : "opacity-85"
                          }`}
                          style={{ color }}
                        >
                          {token.word}
                        </span>
                      );
                    })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 5 Clickable Visual Caption Preset Tiles + Save & Export (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono text-[#F3E5AB] uppercase tracking-wider font-semibold">
            5 Caption Style Presets
          </div>

          <div className="space-y-2">
            {CAPTION_STYLES.map((style) => {
              const isSelected = activePreset === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => onSelectPreset(style.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-[#2A2016] border-[#F3E5AB] shadow-md ring-1 ring-[#F3E5AB]/40"
                      : "bg-[#1E1710] border-[#F3E5AB]/15 hover:border-[#F3E5AB]/35"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{style.name}</span>
                      <span className="text-[10px] font-mono font-normal text-[#D99B52]">
                        ({style.badge})
                      </span>
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] line-clamp-1 font-sans">
                      {style.description}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#10B981] text-black flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Export Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                if (onExportSuccess) {
                  onExportSuccess(`Kinetic Captions applied: ${activeStyle.name} (1080p Export)`);
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F3E5AB] hover:bg-white text-[#17120C] font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Save & Export 1080p HD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
