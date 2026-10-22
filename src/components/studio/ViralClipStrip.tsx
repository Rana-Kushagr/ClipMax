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
} from "lucide-react";
import { VideoClip, CaptionPresetId } from "../../types/studio";
import { INITIAL_CLIPS, CAPTION_STYLES } from "../../lib/constants";
import { DecryptedText } from "../react-bits/DecryptedText";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import { BorderGlow } from "../ui/BorderGlow";

function getScoreBadge(score: number) {
  if (score >= 90) {
    return "bg-[#10B981] text-black border-transparent font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]";
  }
  if (score >= 85) {
    return "bg-[#D99B52] text-[#17120C] border-transparent font-bold shadow-[0_0_12px_rgba(217,155,82,0.4)]";
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
        <Film className="w-3 h-3 text-[#D99B52]" /> Auto
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
}: Readonly<ViralClipStripProps>) {
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
    <div className="space-y-6 select-none overflow-visible" aria-label="Generated Viral Clips Strip">
      {/* Top Strip Header & Project Context */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <h3 className="font-display font-semibold text-lg text-[#F4F4F6]">
              Ranked 9:16 Viral Shorts
            </h3>
            <span className="px-2.5 py-0.5 rounded bg-[#2A2016] text-[#F3E5AB] border border-[#F3E5AB]/20 text-xs font-mono font-medium">
              6 Viral Clips Scored in 28s
            </span>
          </div>
          <p className="text-xs text-[#A1A1AA] mt-1 font-sans">
            Scored with Whisper-v3 diarization, hook climax ranking, and kinetic auto-subtitles.
          </p>
        </div>

        {/* Output-Only Guarantee Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E1710] border border-[#F3E5AB]/15 text-xs font-mono text-[#A1A1AA]">
          <span>Credit Rule:</span>
          <span className="text-[#10B981] font-semibold">
            0 Credits Burned Previewing
          </span>
        </div>
      </div>

      {/* 6-Card 9:16 Vertical Grid: Mobile Snap-Scroll Carousel & Desktop 6-Col Grid */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory gap-4 p-2 -mx-2 sm:mx-0 scrollbar-none">
        {clips.map((clip, index) => {
          const isPlaying = playingClipId === clip.id;
          const scoreBadgeClass = getScoreBadge(clip.viralityScore);

          return (
            <div
              key={clip.id}
              className="studio-clip-card min-w-[250px] max-w-[275px] sm:min-w-0 sm:max-w-none snap-center shrink-0 sm:shrink studio-card-float h-full overflow-visible"
              style={{ animationDelay: `${index * 0.35}s` }}
            >
              <BorderGlow
                edgeSensitivity={10}
                glowColor="42 85 76"
                backgroundColor="#1E1710"
                borderRadius={22}
                glowRadius={36}
                glowIntensity={1.6}
                coneSpread={28}
                animated={true}
                colors={["#F3E5AB", "#D99B52", "#10B981"]}
                className="h-full overflow-visible shadow-2xl"
              >
                <CardContainer
                  containerClassName="w-full h-full p-0 overflow-visible"
                  className="w-full h-full overflow-visible"
                >
                  <CardBody className="h-full overflow-visible flex flex-col justify-between">
                    <div
                      className={`rounded-2xl bg-[#1E1710] border transition-all duration-300 flex flex-col justify-between overflow-hidden relative group h-full shadow-xl ${
                        isPlaying
                          ? "border-[#10B981]/80 ring-2 ring-[#10B981]/25 shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
                          : "border-[#F3E5AB]/15 hover:border-[#F3E5AB]/35 hover:shadow-2xl"
                      }`}
                    >
                      {/* Vertical 9:16 Video Stage Preview */}
                      <CardItem
                        translateZ={35}
                        className="relative aspect-[9/16] w-full bg-[#110D09] overflow-hidden flex flex-col cursor-pointer"
                        onClick={() => onEditClip(clip)}
                      >
                        {/* Top Half: Speaker / Context B-Roll */}
                        <div className="h-1/2 w-full relative overflow-hidden bg-[#1E1710]">
                          <img
                            src={clip.thumbnail}
                            alt={clip.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1710] to-transparent opacity-60" />

                          {/* Solid Virality Score Badge (Top-Left) */}
                          <CardItem
                            translateZ={65}
                            className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded font-mono text-[11px] flex items-center gap-1 shadow-md ${scoreBadgeClass}`}
                          >
                            <DecryptedText text={clip.viralityScore.toString()} speed={30} className="font-bold" />
                            <span className="text-[9px] uppercase font-sans">
                              {clip.tier}
                            </span>
                          </CardItem>

                          {/* Speaker Layout Indicator (Top-Right) */}
                          <div className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#A1A1AA] border border-white/10">
                            {renderSpeakerBadge(clip.speakerType)}
                          </div>

                          {/* Letter Grades Ribbon */}
                          <div className="absolute bottom-1.5 left-2 right-2 z-10 flex items-center justify-between text-[9px] font-mono bg-black/80 px-1.5 py-0.5 rounded border border-white/10">
                            <span title="Hook Strength">H: <strong className="text-[#10B981]">{clip.letterGrades.hook}</strong></span>
                            <span title="Pacing & Flow">F: <strong className="text-white">{clip.letterGrades.flow}</strong></span>
                            <span title="Information Value">V: <strong className="text-[#D99B52]">{clip.letterGrades.value}</strong></span>
                            <span title="Trend Alignment">T: <strong className="text-[#F3E5AB]">{clip.letterGrades.trend}</strong></span>
                          </div>
                        </div>

                        {/* Bottom Half: Centered Speaker + Kinetic Animated Captions */}
                        <div className="h-1/2 w-full relative bg-[#1E1710] p-2 flex flex-col justify-between items-center text-center border-t border-[#F3E5AB]/10">
                          {/* Play / Pause Toggle Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingClipId(isPlaying ? null : clip.id);
                            }}
                            className={`w-9 h-9 rounded-full border text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md my-auto ${
                              isPlaying
                                ? "bg-[#10B981] text-black border-[#10B981]"
                                : "bg-[#2A2016] hover:bg-[#382B1E] border-[#F3E5AB]/20 text-[#F3E5AB]"
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
                          <CardItem translateZ={50} className="w-full px-1 py-1">
                            <div
                              className={`text-[11px] leading-tight transition-all ${activeCaption.fontClass}`}
                              style={{ color: activeCaption.textColor }}
                            >
                              <span
                                className="px-1 py-0.5 rounded"
                                style={{
                                  backgroundColor:
                                    activeCaption.id === "clean-studio"
                                      ? "rgba(17,13,9,0.9)"
                                      : undefined,
                                  color: activeCaption.highlightColor,
                                }}
                              >
                                {clip.hook.split(" ")[0]}
                              </span>{" "}
                              <span>{clip.hook.split(" ").slice(1, 4).join(" ")}</span>
                            </div>
                          </CardItem>

                          {/* Duration pill */}
                          <div className="flex items-center justify-between w-full text-[10px] font-mono text-[#A1A1AA] border-t border-[#F3E5AB]/10 pt-1">
                            <span className="flex items-center gap-1 tabular-nums">
                              <Clock className="w-3 h-3 text-[#A1A1AA]" /> {clip.durationFormatted}
                            </span>
                            <span className="flex items-center gap-1 text-[#10B981] font-mono font-medium">
                              <Eye className="w-3 h-3 text-[#A1A1AA]" /> {clip.estimatedViews}
                            </span>
                          </div>
                        </div>
                      </CardItem>

                      {/* Card Meta & Control Actions */}
                      <div className="p-3 bg-[#17120C] space-y-2 border-t border-[#F3E5AB]/10">
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
                              className="w-full text-xs font-semibold bg-[#2A2016] border border-[#F3E5AB]/25 px-1.5 py-0.5 rounded text-white font-sans"
                              aria-label="Edit clip title"
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => setEditingTitleId(clip.id)}
                              className="w-full text-left text-xs font-semibold text-[#F4F4F6] line-clamp-2 leading-snug hover:text-[#F3E5AB] transition-colors font-sans"
                              title="Click to rename title"
                            >
                              {clip.title}
                            </button>
                          )}
                        </div>

                        {/* Bottom Action Bar */}
                        <CardItem translateZ={45} className="w-full">
                          <div className="flex items-center gap-1.5 pt-1 w-full">
                            <button
                              type="button"
                              onClick={() => onExportClip(clip)}
                              className="flex-1 py-1.5 px-2 rounded-md bg-[#F3E5AB] hover:bg-white text-[#17120C] font-semibold text-[11px] shadow-sm flex items-center justify-center gap-1 transition-all active:scale-95"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download HD</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onEditClip(clip)}
                              className="p-1.5 rounded-md bg-[#2A2016] hover:bg-[#382B1E] border border-[#F3E5AB]/20 text-[#F3E5AB] hover:text-white transition-colors"
                              title="Inspect & Edit in Full-Screen Studio Editor"
                              aria-label={`Edit ${clip.title}`}
                            >
                              <Scissors className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </CardItem>
                      </div>
                    </div>
                  </CardBody>
                </CardContainer>
              </BorderGlow>
            </div>
          );
        })}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] font-mono text-[#D99B52] pt-1">
        <span>← Swipe horizontally to inspect all 6 ranked shorts →</span>
      </div>
    </div>
  );
}
