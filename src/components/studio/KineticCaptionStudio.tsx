import React, { useState, useEffect } from "react";
import {
  Subtitles,
  Check,
  ArrowRight,
  Sparkles,
  Scissors,
  Type,
} from "lucide-react";
import { CaptionPresetId } from "../../types/studio";
import { CAPTION_STYLES } from "../../lib/constants";

interface TokenWord {
  id: number;
  text: string;
  state: "default" | "mint" | "amber" | "cut";
}

const INITIAL_TRANSCRIPT: TokenWord[] = [
  { id: 1, text: "HIGH", state: "default" },
  { id: 2, text: "PERFORMANCE", state: "mint" },
  { id: 3, text: "VIDEO", state: "default" },
  { id: 4, text: "ENGINEERING", state: "amber" },
  { id: 5, text: "SCALES", state: "default" },
  { id: 6, text: "YOUR", state: "default" },
  { id: 7, text: "SHORTS", state: "mint" },
  { id: 8, text: "ACROSS", state: "default" },
  { id: 9, text: "EVERY", state: "default" },
  { id: 10, text: "VERTICAL", state: "amber" },
  { id: 11, text: "FEED", state: "mint" },
];

interface KineticCaptionStudioProps {
  activePreset: CaptionPresetId;
  onSelectPreset: (presetId: CaptionPresetId) => void;
}

export function KineticCaptionStudio({
  activePreset,
  onSelectPreset,
}: KineticCaptionStudioProps) {
  const [tokens, setTokens] = useState<TokenWord[]>(INITIAL_TRANSCRIPT);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [isUppercase, setIsUppercase] = useState(true);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");

  // Cycle token state: default -> mint -> amber -> cut -> default
  const handleTokenClick = (id: number) => {
    setTokens((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextState: TokenWord["state"] =
          t.state === "default"
            ? "mint"
            : t.state === "mint"
            ? "amber"
            : t.state === "amber"
            ? "cut"
            : "default";
        return { ...t, state: nextState };
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
    CAPTION_STYLES.find((c) => c.id === activePreset) || CAPTION_STYLES[0];

  return (
    <div className="space-y-6 select-none" aria-label="Kinetic Caption Studio">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Subtitles className="w-4 h-4 text-[#10B981]" />
            <h3 className="font-display font-semibold text-lg text-[#F4F4F6]">
              Live Kinetic Caption Studio & Transcript Tokenizer
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#161920] text-text-secondary border border-white/[0.08] text-xs font-mono">
              Whisper-V3 Millisecond Alignment
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1 font-sans">
            Click any word below to cycle: <strong>Default</strong> → <span className="text-[#10B981]">Mint Highlight</span> → <span className="text-[#E06D3B]">Amber Highlight</span> → <span className="line-through text-red-400">Cut Word</span>.
          </p>
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setIsUppercase(!isUppercase)}
            className={`px-2.5 py-1 rounded-md border font-mono transition-colors ${
              isUppercase
                ? "bg-[#161920] border-white/40 text-white font-medium"
                : "bg-[#12151B] border-white/[0.08] text-text-muted"
            }`}
          >
            ALL CAPS: {isUppercase ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Interactive Word-By-Word Token Clicker Transcript Well */}
      <div className="p-4 rounded-xl bg-[#12151B] border border-white/[0.08] space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-text-muted">
          <span className="flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-[#10B981]" />
            CLICKABLE TRANSCRIPT TOKENS:
          </span>
          <span className="text-[11px] text-text-muted">Click token to change emphasis or cut</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {tokens.map((token) => {
            let badgeStyle = "bg-[#0E1014] text-white border-white/[0.1] hover:border-white/30";
            if (token.state === "mint") {
              badgeStyle = "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/50 font-bold shadow-[0_0_12px_rgba(16,185,129,0.25)]";
            } else if (token.state === "amber") {
              badgeStyle = "bg-[#E06D3B]/20 text-[#E06D3B] border-[#E06D3B]/50 font-bold shadow-[0_0_12px_rgba(224,109,59,0.25)]";
            } else if (token.state === "cut") {
              badgeStyle = "bg-red-500/10 text-red-400 border-red-500/20 line-through opacity-50";
            }

            return (
              <button
                key={token.id}
                type="button"
                onClick={() => handleTokenClick(token.id)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all active:scale-95 ${badgeStyle}`}
                title={`Token: ${token.text} (${token.state})`}
              >
                {token.text}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5 Dark Visual Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {CAPTION_STYLES.map((style) => {
          const isSelected = activePreset === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onSelectPreset(style.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between relative group ${
                isSelected
                  ? "bg-[#161920] border-[#10B981] ring-1 ring-[#10B981]/40 shadow-lg"
                  : "bg-[#12151B] border-white/[0.08] hover:border-white/20 hover:bg-[#161920]"
              }`}
              aria-pressed={isSelected}
            >
              {/* Top metadata */}
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-text-muted">
                  {style.tagline}
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
                  className={`text-center transition-all ${style.fontClass} ${
                    fontSize === "sm"
                      ? "text-xs"
                      : fontSize === "md"
                      ? "text-sm"
                      : "text-base"
                  }`}
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
              className={`font-display font-black leading-tight drop-shadow-lg ${
                fontSize === "sm" ? "text-base" : fontSize === "md" ? "text-lg" : "text-xl"
              } ${isUppercase ? "uppercase" : "normal-case"}`}
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
                    const highlightColor =
                      token.state === "amber"
                        ? "#E06D3B"
                        : token.state === "mint"
                        ? "#10B981"
                        : activeStyle.highlightColor;

                    return (
                      <span
                        key={token.id}
                        className={`inline-block mx-0.5 transition-transform ${
                          isHighlighted ? "scale-110 font-extrabold" : "opacity-80"
                        }`}
                        style={{
                          color: isHighlighted ? highlightColor : "#FFFFFF",
                        }}
                      >
                        {token.text}{" "}
                      </span>
                    );
                  })}
              </span>
            </div>
          </div>
        </div>

        {/* Caption Studio Parameters */}
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
              Submagic-Grade Kinetic Engine
            </span>
            <h4 className="font-display font-semibold text-lg text-white">
              Word-By-Word Millisecond Speech Synchronization
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed font-sans">
              Every word is parsed by Whisper-V3 with exact SMPTE timestamp offsets. Highlight colors, keyword emphasis, and spring animations keep retention above 90% in the vertical feed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#0E1014] border border-white/[0.08]">
              <span className="text-[11px] font-mono text-text-muted block mb-1">
                FONT SIZE SCALING:
              </span>
              <div className="flex gap-1.5">
                {(["sm", "md", "lg"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setFontSize(sz)}
                    className={`flex-1 py-1 rounded-md text-xs font-mono font-medium uppercase transition-colors ${
                      fontSize === sz
                        ? "bg-white text-black font-semibold"
                        : "bg-[#161920] text-text-muted hover:text-white border border-white/[0.08]"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0E1014] border border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-text-muted block">
                  ACTIVE PRESET:
                </span>
                <span className="text-xs font-semibold text-white">
                  {activeStyle.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#10B981]">
                1080P COMPLIANT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
