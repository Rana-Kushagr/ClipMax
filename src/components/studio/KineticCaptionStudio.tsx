import React, { useState, useEffect } from "react";
import {
  Subtitles,
  Type,
  Check,
  RotateCcw,
  Sliders,
  ArrowRight,
  Flame,
} from "lucide-react";
import { CAPTION_STYLES } from "../../lib/constants";
import { CaptionPresetId } from "../../types/studio";

interface TokenWord {
  id: number;
  word: string;
  state: "default" | "mint" | "amber" | "cut";
}

const INITIAL_TRANSCRIPT: TokenWord[] = [
  { id: 1, word: "If", state: "default" },
  { id: 2, word: "you", state: "default" },
  { id: 3, word: "are", state: "default" },
  { id: 4, word: "building", state: "mint" },
  { id: 5, word: "low-latency", state: "amber" },
  { id: 6, word: "systems,", state: "default" },
  { id: 7, word: "memory", state: "mint" },
  { id: 8, word: "allocations", state: "amber" },
  { id: 9, word: "will", state: "default" },
  { id: 10, word: "silently", state: "default" },
  { id: 11, word: "kill", state: "amber" },
  { id: 12, word: "your", state: "default" },
  { id: 13, word: "P99", state: "mint" },
  { id: 14, word: "response", state: "default" },
  { id: 15, word: "times.", state: "default" },
];

interface KineticCaptionStudioProps {
  activePreset: CaptionPresetId;
  onSelectPreset: (id: CaptionPresetId) => void;
}

const getNextTokenState = (state: TokenWord["state"]): TokenWord["state"] => {
  switch (state) {
    case "default":
      return "mint";
    case "mint":
      return "amber";
    case "amber":
      return "cut";
    default:
      return "default";
  }
};

const getPreviewFontSizeClass = (size: "sm" | "md" | "lg"): string => {
  if (size === "sm") return "text-xs";
  if (size === "md") return "text-sm";
  return "text-base";
};

const getStageFontSizeClass = (size: "sm" | "md" | "lg"): string => {
  if (size === "sm") return "text-base";
  if (size === "md") return "text-lg";
  return "text-xl";
};

const getTokenHighlightColor = (
  state: TokenWord["state"],
  defaultHighlight: string
): string => {
  if (state === "amber") return "#E06D3B";
  if (state === "mint") return "#10B981";
  return defaultHighlight;
};

export function KineticCaptionStudio({
  activePreset,
  onSelectPreset,
}: Readonly<KineticCaptionStudioProps>) {
  const [tokens, setTokens] = useState<TokenWord[]>(INITIAL_TRANSCRIPT);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");
  const [isUppercase, setIsUppercase] = useState(true);

  // Cycle token state: default -> mint -> amber -> cut -> default
  const handleTokenClick = (id: number) => {
    setTokens((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        return { ...t, state: getNextTokenState(t.state) };
      })
    );
  };

  // Animate kinetic subtitle timing across active uncut words
  const activeTokens = tokens.filter((t) => t.state !== "cut");

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
    <div className="space-y-8">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Subtitles className="w-5 h-5 text-[#10B981]" />
            <span>Kinetic Subtitle & Transcript Studio</span>
          </h3>
          <p className="text-xs text-text-muted mt-1">
            Click words to cycle highlight modes (Mint → Amber → Strikethrough Cut). Subtitles auto-sync to audio phonemes.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2">
          {/* Font Size Selector */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[#14171F] border border-white/[0.08]">
            <Type className="w-3.5 h-3.5 text-text-muted ml-1 mr-1" />
            {(["sm", "md", "lg"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors uppercase ${
                  fontSize === size
                    ? "bg-[#10B981] text-black font-bold"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Uppercase Toggle */}
          <button
            onClick={() => setIsUppercase(!isUppercase)}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg border transition-colors ${
              isUppercase
                ? "bg-white/[0.08] text-white border-white/20"
                : "bg-transparent text-text-muted border-white/[0.08] hover:text-white"
            }`}
          >
            AA
          </button>

          {/* Reset */}
          <button
            onClick={resetTokens}
            className="p-1.5 rounded-lg bg-[#14171F] border border-white/[0.08] text-text-muted hover:text-white transition-colors"
            title="Reset words"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Word Tokenizer Bar */}
      <div className="p-4 rounded-xl bg-[#0E1015] border border-white/[0.08] space-y-3">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
            Interactive Word Track: Click word to change highlight state
          </span>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Mint
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#E06D3B]" /> Amber
            </span>
            <span className="flex items-center gap-1 text-text-muted line-through">
              Cut
            </span>
          </div>
        </div>

        {/* Word Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {tokens.map((token) => {
            const isCut = token.state === "cut";
            const isMint = token.state === "mint";
            const isAmber = token.state === "amber";

            let chipClasses = "bg-white/[0.04] text-white border-white/[0.08] hover:border-white/30";
            if (isCut) chipClasses = "bg-red-500/10 text-red-400/60 line-through border-red-500/20";
            if (isMint) chipClasses = "bg-[#10B981]/20 text-[#10B981] font-bold border-[#10B981]/40";
            if (isAmber) chipClasses = "bg-[#E06D3B]/20 text-[#E06D3B] font-bold border-[#E06D3B]/40";

            return (
              <button
                key={token.id}
                onClick={() => handleTokenClick(token.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-150 cursor-pointer select-none active:scale-95 ${chipClasses}`}
              >
                {token.word}
              </button>
            );
          })}
        </div>
      </div>

      {/* Caption Style Preset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {CAPTION_STYLES.map((style) => {
          const isSelected = activePreset === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelectPreset(style.id)}
              className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative group flex flex-col justify-between ${
                isSelected
                  ? "bg-[#14171F] border-[#10B981] shadow-lg shadow-[#10B981]/5 ring-1 ring-[#10B981]/30"
                  : "bg-[#0E1015] border-white/[0.08] hover:border-white/20 hover:bg-[#12151B]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  Preset
                </span>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-[#10B981] text-black flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Live Preview Box inside card */}
              <div className="w-full h-20 rounded-lg bg-[#040507] flex items-center justify-center p-2 mb-3 border border-white/[0.08] overflow-hidden">
                <div
                  className={`text-center transition-all ${style.fontClass} ${getPreviewFontSizeClass(
                    fontSize
                  )}`}
                  style={{ color: style.textColor }}
                >
                  <span
                    className="px-1 py-0.5 rounded"
                    style={{
                      backgroundColor:
                        style.id === "clean-studio"
                          ? "rgba(14,16,21,0.85)"
                          : undefined,
                      color: style.highlightColor,
                    }}
                  >
                    GET
                  </span>{" "}
                  VIRAL CLIPS
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <div className="text-xs font-semibold text-white mb-1 group-hover:text-white transition-colors">
                  {style.name}
                </div>
                <p className="text-[10px] text-text-muted leading-tight line-clamp-2 font-sans">
                  {style.description}
                </p>
              </div>

              <div className="mt-2 pt-2 border-t border-white/[0.07] flex items-center justify-between text-[9px] font-mono text-text-secondary">
                <span>{style.badge}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white flex items-center gap-1">
                  <span>Apply</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Active Full-Viewport Preview Stage */}
      <div className="rounded-xl bg-[#12151B] border border-white/[0.08] p-4 sm:p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-64 aspect-[9/16] rounded-xl bg-[#040507] border border-white/[0.1] shadow-2xl relative overflow-hidden flex flex-col justify-end p-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
            alt="Sample Speaker"
            className="absolute inset-0 w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

          {/* Virality Pill */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#10B981] text-black font-mono text-[10px] font-bold shadow">
            98 VIRAL
          </div>

          {/* Kinetic Active Words Overlay */}
          <div className="relative z-10 text-center space-y-1">
            <div className="text-[10px] font-mono text-[#10B981] uppercase tracking-wider">
              {activeStyle.name}
            </div>
            <div
              className={`font-display font-black leading-tight drop-shadow-lg ${getStageFontSizeClass(
                fontSize
              )} ${isUppercase ? "uppercase" : "normal-case"}`}
              style={{
                color: activeStyle.textColor,
              }}
            >
              <span>
                {activeTokens
                  .slice(
                    Math.max(0, activeWordIndex - 1),
                    Math.min(activeTokens.length, activeWordIndex + 2)
                  )
                  .map((token, idx) => {
                    const isHighlighted = idx === 1;
                    const highlightColor = getTokenHighlightColor(
                      token.state,
                      activeStyle.highlightColor
                    );

                    return (
                      <span
                        key={token.id}
                        className={`inline-block mx-0.5 transition-transform ${
                          isHighlighted ? "scale-110 font-extrabold" : "opacity-80"
                        }`}
                        style={{
                          color: isHighlighted ? highlightColor : activeStyle.textColor,
                        }}
                      >
                        {token.word}
                      </span>
                    );
                  })}
              </span>
            </div>
          </div>
        </div>

        {/* Right Info Deck */}
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-text-secondary">
            <Sliders className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Phoneme-Aligned Kinetic Typography</span>
          </div>

          <h4 className="text-xl font-bold text-white">
            Current Style: <span className="text-[#10B981]">{activeStyle.name}</span>
          </h4>
          <p className="text-sm text-text-muted leading-relaxed">
            {activeStyle.description} Built to maintain viewer retention across TikTok and YouTube Shorts algorithms with frame-by-frame color pop animations.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#0E1015] border border-white/[0.06] text-xs font-mono">
              <span className="text-text-muted block text-[10px] uppercase">
                Render Target
              </span>
              <span className="text-white font-semibold">1080x1920 (9:16)</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0E1015] border border-white/[0.06] text-xs font-mono">
              <span className="text-text-muted block text-[10px] uppercase">
                Font Family
              </span>
              <span className="text-white font-semibold">Plus Jakarta Sans 800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
