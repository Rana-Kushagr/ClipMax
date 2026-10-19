"use client";

import React, { useState, useEffect } from "react";
import {
  Subtitles,
  Check,
} from "lucide-react";
import { CaptionPresetId } from "@/types/studio";
import { CAPTION_STYLES } from "@/lib/constants";

interface CaptionStyleTesterProps {
  activePreset: CaptionPresetId;
  onSelectPreset: (presetId: CaptionPresetId) => void;
}

export function CaptionStyleTester({
  activePreset,
  onSelectPreset,
}: CaptionStyleTesterProps) {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [isUppercase, setIsUppercase] = useState(true);
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md");

  const sampleWords = [
    "IF",
    "YOU",
    "ARE",
    "BUILDING",
    "AI",
    "PRODUCTS",
    "WITHOUT",
    "SOLVING",
    "REAL",
    "PROBLEMS",
    "YOU",
    "WILL",
    "FAIL",
  ];

  // Animate word by word kinetic timing
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % sampleWords.length);
    }, 450);
    return () => clearInterval(interval);
  }, [sampleWords.length]);

  return (
    <div className="space-y-6 select-none" aria-label="Kinetic Caption Style Tester">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <Subtitles className="w-5 h-5 text-accent" />
            <h3 className="font-display font-extrabold text-xl text-text-primary">
              Live Kinetic Caption Studio
            </h3>
            <span className="px-2 py-0.5 rounded-md bg-primary-subtle text-primary border border-primary/20 text-xs font-mono font-bold">
              Submagic & Vugola Preset Engine
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Tap any style tile below to apply dynamic kinetic typography across all generated vertical clips.
          </p>
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setIsUppercase(!isUppercase)}
            className={`px-2.5 py-1 rounded-lg border font-mono transition-colors ${
              isUppercase
                ? "bg-surface-strong border-primary text-primary"
                : "bg-surface-subtle border-border text-text-muted"
            }`}
          >
            ALL CAPS: {isUppercase ? "ON" : "OFF"}
          </button>
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
              className={`p-3.5 rounded-2xl border text-left transition-all duration-150 flex flex-col justify-between relative group ${
                isSelected
                  ? "bg-surface-strong border-accent shadow-[0_0_15px_rgba(16,185,129,0.25)] ring-1 ring-accent"
                  : "bg-surface border-border hover:border-slate-600 hover:bg-surface-subtle"
              }`}
              aria-pressed={isSelected}
            >
              {/* Top metadata */}
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-canvas-deep text-text-muted">
                  {style.tagline}
                </span>
                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-accent text-slate-950 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Live Preview Box inside card */}
              <div className="w-full h-20 rounded-xl bg-canvas-deep flex items-center justify-center p-2 mb-3 border border-white/[0.04] overflow-hidden">
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
                          ? "rgba(17,23,38,0.85)"
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
                <div className="text-xs font-bold text-white mb-1 group-hover:text-accent transition-colors">
                  {style.name}
                </div>
                <p className="text-[10px] text-text-muted leading-tight line-clamp-2">
                  {style.description}
                </p>
              </div>

              <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-[9px] font-mono text-accent">
                <span>{style.badge}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  Apply ➔
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Active Full-Viewport Preview Stage */}
      <div className="rounded-2xl bg-surface border border-border p-4 sm:p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-64 aspect-[9/16] rounded-2xl bg-canvas-deep border-2 border-accent shadow-2xl relative overflow-hidden flex flex-col justify-end p-4">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
            alt="Sample Speaker"
            className="absolute inset-0 w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

          {/* Virality Pill */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-accent text-slate-950 font-mono text-[10px] font-extrabold shadow">
            98 VIRAL
          </div>

          {/* Kinetic Active Words Overlay */}
          <div className="relative z-10 text-center space-y-1">
            <div className="text-[10px] font-mono text-accent uppercase tracking-wider">
              {CAPTION_STYLES.find((c) => c.id === activePreset)?.name}
            </div>
            <div
              className={`font-display font-black leading-tight drop-shadow-lg ${
                fontSize === "sm" ? "text-base" : fontSize === "md" ? "text-lg" : "text-xl"
              } ${isUppercase ? "uppercase" : "normal-case"}`}
              style={{
                color:
                  CAPTION_STYLES.find((c) => c.id === activePreset)?.textColor ||
                  "#FFFFFF",
              }}
            >
              <span>
                {sampleWords
                  .slice(
                    Math.max(0, activeWordIndex - 1),
                    Math.min(sampleWords.length, activeWordIndex + 2)
                  )
                  .map((word, idx) => {
                    const isHighlighted = idx === 1;
                    const highlightColor =
                      CAPTION_STYLES.find((c) => c.id === activePreset)
                        ?.highlightColor || "#10B981";
                    return (
                      <span
                        key={idx}
                        className={`inline-block mx-0.5 transition-transform ${
                          isHighlighted ? "scale-110 font-extrabold" : "opacity-80"
                        }`}
                        style={{
                          color: isHighlighted ? highlightColor : "#FFFFFF",
                        }}
                      >
                        {word}{" "}
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
            <span className="text-xs font-mono text-accent uppercase tracking-wider">
              Submagic-Grade Kinetic Engine
            </span>
            <h4 className="font-display font-bold text-lg text-white">
              Word-By-Word Millisecond Speech Synchronization
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Every word is parsed by Whisper-V3 with exact SMPTE timestamp offsets. Highlight colors, auto-emojis, and bouncy spring animations keep retention above 90% in the TikTok/Reels feed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-surface-subtle border border-border">
              <span className="text-[11px] font-mono text-text-muted block mb-1">
                FONT SIZE SCALING:
              </span>
              <div className="flex gap-1.5">
                {(["sm", "md", "lg"] as const).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setFontSize(sz)}
                    className={`flex-1 py-1 rounded-md text-xs font-mono font-bold uppercase transition-colors ${
                      fontSize === sz
                        ? "bg-accent text-slate-950"
                        : "bg-surface text-text-muted hover:text-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-subtle border border-border flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-text-muted block">
                  ACTIVE PRESET:
                </span>
                <span className="text-xs font-bold text-accent">
                  {CAPTION_STYLES.find((c) => c.id === activePreset)?.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-text-muted">
                1080P COMPLIANT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
