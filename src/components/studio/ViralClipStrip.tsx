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
  User,
  Sparkles,
} from "lucide-react";
import { VideoClip, CaptionPresetId } from "../../types/studio";
import { INITIAL_CLIPS, CAPTION_STYLES } from "../../lib/constants";
import { TiltedCard } from "../react-bits/TiltedCard";
import { DecryptedText } from "../react-bits/DecryptedText";

function getScoreBadge(score: number) {
  if (score >= 90) {
    return "bg-[#10B981] text-black border-transparent font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]";
  }
  if (score >= 85) {
    return "bg-[#E06D3B] text-white border-transparent font-bold shadow-[0_0_12px_rgba(224,109,59,0.4)]";
  }
  return "bg-white/20 text-white border-transparent font-bold";
}

function renderSpeakerBadge(type: "solo" | "split" | "switching") {
  if (type === "split") {
    return (
      <span className="flex items-center gap-1 text-white/90">
        <Columns className="w-3 h-3 text-[#10B981]" /> Split
      </span>
    );
  }
  if (type === "switching") {
    return (
      <span className="flex items-center gap-1 text-white/90">
        <Film className="w-3 h-3 text-[#E06D3B]" /> Auto
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-white/90">
      <User className="w-3 h-3 text-white" /> Solo
    </span>
  );
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <h3 className="font-display font-semibold text-lg text-[#F4F4F6]">
              Ranked 9:16 Viral Shorts
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#161920] text-[#10B981] border border-white/[0.08] text-xs font-mono font-medium">
              6 Viral Clips Scored in 28s
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1 font-sans">
            Scored with Whisper-v3 diarization, hook climax ranking, and kinetic auto-subtitles.
          </p>
        </div>

        {/* Output-Only Guarantee Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#12151B] border border-white/[0.07] text-xs font-mono text-text-muted">
          <span>Credit Rule:</span>
          <span className="text-[#10B981] font-semibold">
            0 Credits Burned Previewing
          </span>
        </div>
      </div>

      {/* 6-Card 9:16 Vertical Grid with TiltedCard 3D tilt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {clips.map((clip) => {
          const isPlaying = playingClipId === clip.id;
          const scoreBadgeClass = getScoreBadge(clip.viralityScore);

          return (
            <div key={clip.id} className="studio-clip-card h-full">
              <TiltedCard maxAngle={8} scale={1.02} className="h-full">
                <div
                  className={`rounded-xl bg-[#0E1014] border transition-all duration-200 flex flex-col justify-between overflow-hidden relative group h-full ${
                    isPlaying
                      ? "border-[#10B981]/80 ring-2 ring-[#10B981]/20 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
                      : "border-white/[0.08] hover:border-white/30 hover:shadow-2xl"
                  }`}
                >
                  {/* Vertical 9:16 Video Stage Preview */}
                  <div className="relative aspect-[9/16] w-full bg-[#040507] overflow-hidden flex flex-col">
                    {/* Top Half: Speaker / Context B-Roll */}
                    <div className="h-1/2 w-full relative overflow-hidden bg-[#0E1014]">
                      <img
                        src={clip.thumbnail}
                        alt={clip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] to-transparent opacity-60" />

                      {/* Solid Virality Score Badge (Top-Left) */}
                      <div
                        className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded font-mono text-[11px] flex items-center gap-1 shadow-md ${scoreBadgeClass}`}
                      >
                        <DecryptedText text={clip.viralityScore.toString()} speed={30} className="font-bold" />
                        <span className="text-[9px] uppercase font-sans">
                          {clip.tier}
                        </span>
                      </div>

                      {/* Speaker Layout Indicator (Top-Right) */}
                      <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[10px] font-mono text-text-secondary border border-white/10">
                        {renderSpeakerBadge(clip.speakerType)}
                      </div>

                      {/* Letter Grades Ribbon (Hook / Flow / Value / Trend) */}
                      <div className="absolute bottom-1.5 left-2 right-2 z-10 flex items-center justify-between text-[9px] font-mono bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10">
                        <span title="Hook Strength">H: <strong className="text-[#10B981]">{clip.letterGrades.hook}</strong></span>
                        <span title="Pacing & Flow">F: <strong className="text-white">{clip.letterGrades.flow}</strong></span>
                        <span title="Information Value">V: <strong className="text-[#E06D3B]">{clip.letterGrades.value}</strong></span>
                        <span title="Trend Alignment">T: <strong className="text-[#E5C158]">{clip.letterGrades.trend}</strong></span>
                      </div>
                    </div>

                    {/* Bottom Half: Centered Speaker + Kinetic Animated Captions */}
                    <div className="h-1/2 w-full relative bg-[#0E1014] p-2 flex flex-col justify-between items-center text-center border-t border-white/[0.08]">
                      {/* Play / Pause Toggle Button */}
                      <button
                        type="button"
                        onClick={() => setPlayingClipId(isPlaying ? null : clip.id)}
                        className={`w-9 h-9 rounded-full border text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md my-auto ${
                          isPlaying
                            ? "bg-[#10B981] text-black border-[#10B981]"
                            : "bg-white/10 hover:bg-white/20 border-white/20"
                        }`}
                        aria-label={isPlaying ? "Pause clip preview" : "Play clip preview"}
                      >
                        {isPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-current" />
                        ) : (
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        )}
                      </button>

                      {/* Live Kinetic Caption Word Overlay */}
                      <div className="w-full px-1 py-1">
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
                      <div className="flex items-center justify-between w-full text-[10px] font-mono text-text-muted border-t border-white/[0.06] pt-1">
                        <span className="flex items-center gap-1 tabular-nums">
                          <Clock className="w-3 h-3 text-text-muted" /> {clip.durationFormatted}
                        </span>
                        <span className="flex items-center gap-1 text-[#10B981] font-mono font-medium">
                          <Eye className="w-3 h-3 text-text-muted" /> {clip.estimatedViews}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Meta & Control Actions */}
                  <div className="p-3 bg-[#0E1014] space-y-2 border-t border-white/[0.08]">
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
                          className="w-full text-xs font-semibold bg-[#161920] border border-white/[0.2] px-1.5 py-0.5 rounded text-white font-sans"
                          aria-label="Edit clip title"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => setEditingTitleId(clip.id)}
                          className="w-full text-left text-xs font-semibold text-[#F4F4F6] line-clamp-2 leading-snug hover:text-white transition-colors font-sans"
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
                        className="flex-1 py-1.5 px-2 rounded-md bg-white hover:bg-[#F4F4F6] text-[#08090B] font-semibold text-[11px] shadow-sm flex items-center justify-center gap-1 transition-all active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download 1080p</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditClip(clip)}
                        className="p-1.5 rounded-md bg-[#161920] hover:bg-white/10 border border-white/[0.08] text-text-secondary hover:text-white transition-colors"
                        title="Edit smart crop, captions, or aspect ratio"
                        aria-label={`Edit ${clip.title}`}
                      >
                        <Scissors className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </TiltedCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
