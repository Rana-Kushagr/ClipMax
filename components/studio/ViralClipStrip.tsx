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

function getScoreColor(score: number): string {
  if (score >= 90) return "text-accent border-accent bg-accent/10";
  if (score >= 80) return "text-warning border-warning bg-warning/10";
  return "text-primary border-primary bg-primary/10";
}

function renderSpeakerBadge(type: "solo" | "split" | "switching") {
  if (type === "split") {
    return (
      <span className="flex items-center gap-1 text-primary">
        <Columns className="w-3 h-3" /> Split
      </span>
    );
  }
  if (type === "switching") {
    return (
      <span className="flex items-center gap-1 text-warning">
        <Film className="w-3 h-3" /> Auto
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-subtle" />
            <h3 className="font-display font-extrabold text-xl text-text-primary">
              Ranked 9:16 Viral Shorts
            </h3>
            <span className="px-2 py-0.5 rounded-md bg-accent-subtle text-accent border border-accent/20 text-xs font-mono font-bold">
              6 Viral Clips Found in 28s
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Scored with Whisper-v3 diarization, hook climax ranking, and kinetic auto-subtitles.
          </p>
        </div>

        {/* Output-Only Guarantee Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-subtle border border-border text-xs font-mono text-text-muted">
          <span>Credit Rule:</span>
          <span className="text-accent font-semibold">
            0 Credits Burned Previewing
          </span>
        </div>
      </div>

      {/* 6-Card 9:16 Vertical Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {clips.map((clip) => {
          const isPlaying = playingClipId === clip.id;
          const scoreColor = getScoreColor(clip.viralityScore);

          return (
            <div
              key={clip.id}
              className={`rounded-2xl bg-surface border transition-all duration-200 flex flex-col justify-between overflow-hidden relative group hover:border-border-strong hover:shadow-2xl ${
                isPlaying ? "ring-2 ring-primary/40 border-primary" : "border-border"
              }`}
            >
              {/* Vertical 9:16 Video Stage Preview */}
              <div className="relative aspect-[9/16] w-full bg-canvas-deep overflow-hidden flex flex-col">
                {/* Top Half: Speaker / Context B-Roll */}
                <div className="h-1/2 w-full relative overflow-hidden bg-surface-subtle">
                  <img
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />

                  {/* Virality Score Badge (Top-Left) */}
                  <div
                    className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md border font-mono font-extrabold text-xs flex items-center gap-1 shadow-lg ${scoreColor}`}
                  >
                    <span>{clip.viralityScore}</span>
                    <span className="text-[9px] uppercase font-sans font-bold">
                      {clip.tier}
                    </span>
                  </div>

                  {/* Speaker Layout Indicator (Top-Right) */}
                  <div className="absolute top-2 right-2 z-10 p-1 rounded-md bg-canvas-deep/80 backdrop-blur-sm text-[10px] font-mono text-text-muted">
                    {renderSpeakerBadge(clip.speakerType)}
                  </div>
                </div>

                {/* Bottom Half: Centered Speaker + Kinetic Animated Captions */}
                <div className="h-1/2 w-full relative bg-surface p-2 flex flex-col justify-between items-center text-center border-t border-white/[0.04]">
                  {/* Play / Pause Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setPlayingClipId(isPlaying ? null : clip.id)}
                    className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 text-primary flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg my-auto"
                    aria-label={isPlaying ? "Pause clip preview" : "Play clip preview"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* Live Kinetic Caption Word Overlay */}
                  <div className="w-full px-1 py-2">
                    <div
                      className={`text-[11px] leading-tight transition-all ${activeCaption.fontClass}`}
                      style={{ color: activeCaption.textColor }}
                    >
                      <span
                        className="px-1 py-0.5 rounded"
                        style={{
                          backgroundColor:
                            activeCaption.id === "clean-studio"
                              ? "rgba(17,23,38,0.8)"
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
                  <div className="flex items-center justify-between w-full text-[10px] font-mono text-text-muted border-t border-border/50 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {clip.durationFormatted}
                    </span>
                    <span className="flex items-center gap-1 text-accent font-semibold">
                      <Eye className="w-3 h-3" /> {clip.estimatedViews}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Meta & Control Actions */}
              <div className="p-3 bg-surface space-y-2 border-t border-border">
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
                      className="w-full text-xs font-semibold bg-surface-subtle border border-primary px-1.5 py-0.5 rounded text-white"
                      aria-label="Edit clip title"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditingTitleId(clip.id)}
                      className="w-full text-left text-xs font-bold text-text-primary line-clamp-2 leading-snug hover:text-primary transition-colors"
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
                    className="flex-1 py-2 px-2 rounded-xl bg-accent hover:bg-accent-hover text-slate-950 font-display font-extrabold text-[11px] shadow-sm flex items-center justify-center gap-1 transition-all active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download 1080p</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEditClip(clip)}
                    className="p-2 rounded-xl bg-surface-subtle hover:bg-surface-strong border border-border text-text-secondary hover:text-white transition-colors"
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
