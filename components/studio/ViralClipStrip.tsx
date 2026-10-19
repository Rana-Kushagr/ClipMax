"use client";

import React, { useState } from "react";
import {
  Download,
  Scissors,
  Play,
  Pause,
  Clock,
  Eye,
  Columns,
  Film,
} from "lucide-react";
import { VideoClip, CaptionPresetId } from "@/types/studio";
import { INITIAL_CLIPS, CAPTION_STYLES } from "@/lib/constants";

function getScoreBadge(score: number) {
  if (score >= 90) {
    return "bg-emerald text-black border-transparent font-bold";
  }
  if (score >= 80) {
    return "bg-amber-400 text-black border-transparent font-bold";
  }
  return "bg-white/20 text-white border-transparent font-bold";
}

function renderSpeakerBadge(type: "solo" | "split" | "switching") {
  if (type === "split") {
    return (
      <span className="flex items-center gap-1 text-white/90">
        <Columns className="w-3 h-3 text-accent" /> Split
      </span>
    );
  }
  if (type === "switching") {
    return (
      <span className="flex items-center gap-1 text-white/90">
        <Film className="w-3 h-3 text-warning" /> Auto
      </span>
    );
  }
  return <span>Solo</span>;
}

interface ViralClipStripProps {
  onEditClip: (clip: VideoClip) => void;
  activeCaptionPreset: CaptionPresetId;
  onExportClip: (clip: VideoClip) => void;
}

export function ViralClipStrip({
  onEditClip,
  activeCaptionPreset,
  onExportClip,
}: ViralClipStripProps) {
  const [playingClipId, setPlayingClipId] = useState<string | null>("clip-1");
  const [clips, setClips] = useState<VideoClip[]>(INITIAL_CLIPS);
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);

  const activeCaption =
    CAPTION_STYLES.find((c) => c.id === activeCaptionPreset) ||
    CAPTION_STYLES[0];

  const handleTitleChange = (id: string, newTitle: string) => {
    setClips((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: newTitle } : c))
    );
  };

  return (
    <div className="space-y-6 select-none" aria-label="Generated Viral Clips Strip">
      {/* Top Strip Header & Project Context */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 hairline-b">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald" />
            <h3 className="font-display font-semibold text-lg text-text-primary">
              Ranked 9:16 Viral Shorts
            </h3>
            <span className="px-2 py-0.5 rounded bg-surface-subtle text-emerald hairline-border text-xs font-mono font-medium">
              6 Viral Clips Found in 28s
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1 font-sans">
            Scored with Whisper-v3 diarization, hook climax ranking, and kinetic auto-subtitles.
          </p>
        </div>

        {/* Output-Only Guarantee Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-subtle hairline-border text-xs font-mono text-text-muted">
          <span>Credit Rule:</span>
          <span className="text-emerald font-semibold">
            0 Credits Burned Previewing
          </span>
        </div>
      </div>

      {/* 6-Card 9:16 Vertical Hairline Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {clips.map((clip) => {
          const isPlaying = playingClipId === clip.id;
          const scoreBadgeClass = getScoreBadge(clip.viralityScore);

          return (
            <div
              key={clip.id}
              className={`rounded-xl bg-surface-subtle hairline-border transition-all duration-200 flex flex-col justify-between overflow-hidden relative group hover:border-white/30 hover:shadow-2xl ${
                isPlaying ? "border-white/40 ring-1 ring-white/20" : ""
              }`}
            >
              {/* Vertical 9:16 Video Stage Preview */}
              <div className="relative aspect-[9/16] w-full bg-canvas-deep overflow-hidden flex flex-col">
                {/* Top Half: Speaker / Context B-Roll */}
                <div className="h-1/2 w-full relative overflow-hidden bg-surface">
                  <img
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />

                  {/* Solid Virality Score Badge (Top-Left) */}
                  <div
                    className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded font-mono text-[11px] flex items-center gap-1 shadow-md ${scoreBadgeClass}`}
                  >
                    <span className="tabular-nums">{clip.viralityScore}</span>
                    <span className="text-[9px] uppercase font-sans">
                      {clip.tier}
                    </span>
                  </div>

                  {/* Speaker Layout Indicator (Top-Right) */}
                  <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[10px] font-mono text-text-secondary">
                    {renderSpeakerBadge(clip.speakerType)}
                  </div>
                </div>

                {/* Bottom Half: Centered Speaker + Kinetic Animated Captions */}
                <div className="h-1/2 w-full relative bg-surface p-2 flex flex-col justify-between items-center text-center hairline-t">
                  {/* Play / Pause Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setPlayingClipId(isPlaying ? null : clip.id)}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 hairline-border text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md my-auto"
                    aria-label={isPlaying ? "Pause clip preview" : "Play clip preview"}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Live Kinetic Caption Word Overlay */}
                  <div className="w-full px-1 py-1.5">
                    <div
                      className={`text-[11px] leading-tight transition-all ${activeCaption.fontClass}`}
                      style={{ color: activeCaption.textColor }}
                    >
                      <span
                        className="px-1 py-0.5 rounded"
                        style={{
                          backgroundColor:
                            activeCaption.id === "clean-studio"
                              ? "rgba(14,16,21,0.85)"
                              : undefined,
                          color: activeCaption.highlightColor,
                        }}
                      >
                        {clip.hook.split(" ")[0]}
                      </span>{" "}
                      <span>{clip.hook.split(" ").slice(1, 4).join(" ")}</span>
                    </div>
                  </div>

                  {/* Duration pill */}
                  <div className="flex items-center justify-between w-full text-[10px] font-mono text-text-muted hairline-t pt-1">
                    <span className="flex items-center gap-1 tabular-nums">
                      <Clock className="w-3 h-3 text-text-muted" /> {clip.durationFormatted}
                    </span>
                    <span className="flex items-center gap-1 text-emerald font-mono font-medium">
                      <Eye className="w-3 h-3 text-text-muted" /> {clip.estimatedViews}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Meta & Control Actions */}
              <div className="p-3 bg-surface space-y-2 hairline-t">
                {/* Editable Title */}
                <div>
                  {editingTitleId === clip.id ? (
                    <input
                      type="text"
                      defaultValue={clip.title}
                      onBlur={(e) => {
                        handleTitleChange(clip.id, e.target.value);
                        setEditingTitleId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleTitleChange(clip.id, e.currentTarget.value);
                          setEditingTitleId(null);
                        }
                      }}
                      className="w-full text-xs font-semibold bg-surface-subtle hairline-border px-1.5 py-0.5 rounded text-white font-sans"
                      aria-label="Edit clip title"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingTitleId(clip.id)}
                      className="w-full text-left text-xs font-semibold text-text-primary line-clamp-2 leading-snug hover:text-white transition-colors font-sans"
                      title="Click to rename title"
                    >
                      {clip.title}
                    </button>
                  )}
                </div>

                {/* Primary Download 1080p HD & Edit Icon */}
                <div className="flex items-center gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() => onExportClip(clip)}
                    className="flex-1 py-1.5 px-2 rounded-md bg-primary hover:bg-white text-primary-obsidian font-semibold text-[11px] shadow-sm flex items-center justify-center gap-1 transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download 1080p</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEditClip(clip)}
                    className="p-1.5 rounded-md bg-surface-elevated hover:bg-white/10 hairline-border text-text-secondary hover:text-white transition-colors"
                    title="Edit smart crop, captions, or aspect ratio"
                    aria-label={`Edit ${clip.title}`}
                  >
                    <Scissors className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
