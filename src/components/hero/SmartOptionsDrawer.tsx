import React, { useState } from "react";
import {
  Sliders,
  Clock,
  Check,
  Tag,
  MessageSquare,
  SlidersHorizontal,
} from "lucide-react";
import { GENRE_LIST, EDITING_STYLE_PRESETS } from "../../lib/constants";
import { EditingStylePreset } from "../../types/studio";

interface SmartOptionsDrawerProps {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  promptQuery: string;
  setPromptQuery: (query: string) => void;
  startTime: number;
  setStartTime: (time: number) => void;
  endTime: number;
  setEndTime: (time: number) => void;
  selectedPersona: string;
  setSelectedPersona: (personaId: string) => void;
}

export function SmartOptionsDrawer({
  selectedGenres,
  setSelectedGenres,
  promptQuery,
  setPromptQuery,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  selectedPersona,
  setSelectedPersona,
}: SmartOptionsDrawerProps) {
  const [activeTab, setActiveTab] = useState<"genre" | "prompt" | "timeframe" | "preset">("genre");

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSelectPreset = (preset: EditingStylePreset) => {
    setSelectedPersona(preset.id);
    setPromptQuery(preset.prompt);
  };

  const promptSuggestions = [
    "Extract core technical trade-offs and architectural decisions",
    "Find key performance benchmarks and deployment metrics",
    "Isolate structured explanations and fundamental concepts",
    "Identify critical design patterns and system workflows",
  ];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-[#0E1014] border border-white/[0.08] rounded-xl p-4 sm:p-5 shadow-2xl backdrop-blur-md transition-all text-left">
      {/* Drawer Internal Navigation Header */}
      <div className="flex flex-wrap items-center justify-between pb-3.5 border-b border-white/[0.07] gap-2">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#10B981]" />
          <span className="font-display font-semibold text-sm text-[#F4F4F6]">
            Studio Clipping Parameters
          </span>
          <span className="text-xs text-text-muted font-mono">
            (Opus-Grade Controls)
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-md bg-[#12151B] border border-white/[0.07] text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("genre")}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === "genre"
                ? "bg-[#161920] text-white font-medium border border-white/[0.12] shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
          >
            Genres ({selectedGenres.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("prompt")}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === "prompt"
                ? "bg-[#161920] text-white font-medium border border-white/[0.12] shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
          >
            Custom Prompt
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("timeframe")}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === "timeframe"
                ? "bg-[#161920] text-white font-medium border border-white/[0.12] shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
          >
            Timeframe
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preset")}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === "preset"
                ? "bg-[#161920] text-white font-medium border border-white/[0.12] shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
          >
            Style Presets
          </button>
        </div>
      </div>

      {/* Tab 1: Genre Chips */}
      {activeTab === "genre" && (
        <div className="pt-3.5 space-y-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Select genre optimizations to tune AI silence cutoffs and pacing:</span>
            {selectedGenres.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedGenres([])}
                className="text-text-secondary hover:text-white font-mono text-[11px] underline"
              >
                Clear all ({selectedGenres.length})
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {GENRE_LIST.map((genre) => {
              const isSelected = selectedGenres.includes(genre);
              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#161920] border-white/30 text-white font-semibold"
                      : "bg-[#12151B] border-white/[0.07] text-text-secondary hover:border-white/20 hover:text-white"
                  }`}
                  aria-pressed={isSelected}
                >
                  <Tag className="w-3 h-3 text-text-muted" />
                  <span>{genre}</span>
                  {isSelected && <Check className="w-3 h-3 text-[#10B981]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Natural Language Prompt Finder */}
      {activeTab === "prompt" && (
        <div className="pt-3.5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-primary font-medium">
              Natural Language Hook Query:
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#E06D3B]/10 text-[#E06D3B] border border-[#E06D3B]/20">
              PROMPT HOOK
            </span>
          </div>

          <div className="relative">
            <input
              id="prompt-input"
              type="text"
              value={promptQuery}
              onChange={(e) => setPromptQuery(e.target.value)}
              placeholder="e.g. Find moments where the speakers discuss architecture trade-offs and performance..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#12151B] border border-white/[0.08] focus:border-white/40 focus:ring-1 focus:ring-white/40 text-sm text-[#F4F4F6] placeholder:text-text-muted font-sans"
            />
            {promptQuery && (
              <button
                type="button"
                onClick={() => setPromptQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white text-xs font-mono"
              >
                Clear
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider">
              Prompt Formulas:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {promptSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPromptQuery(suggestion)}
                  className="text-left p-2 rounded-md bg-[#12151B] hover:bg-[#161920] border border-white/[0.07] text-xs text-text-secondary hover:text-white transition-colors flex items-start gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dual-Thumb Timeframe Slider */}
      {activeTab === "timeframe" && (
        <div className="pt-3.5 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Target Ingestion Window:</span>
            <span className="font-mono text-[#F4F4F6] font-medium tabular-nums">
              00:{formatTime(startTime)}:00 — 00:{formatTime(endTime)}:00 (
              {Math.floor((endTime - startTime) / 60)} mins processed)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-[#12151B] border border-white/[0.07] space-y-1.5">
              <div className="flex justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-text-muted" /> Start Ingestion
                </span>
                <span className="font-mono text-white tabular-nums">
                  {formatTime(startTime)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={endTime - 30}
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
                aria-label="Start timestamp slider"
              />
            </div>

            <div className="p-3 rounded-lg bg-[#12151B] border border-white/[0.07] space-y-1.5">
              <div className="flex justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-text-muted" /> End Ingestion
                </span>
                <span className="font-mono text-white tabular-nums">
                  {formatTime(endTime)}
                </span>
              </div>
              <input
                type="range"
                min={startTime + 30}
                max="2700" // 45 minutes
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
                aria-label="End timestamp slider"
              />
            </div>
          </div>
          <div className="text-[11px] font-mono text-text-muted">
            * Output-Only Guarantee: Processing 45 minutes burns <strong className="text-white">0 credits</strong>. Credits only deduct upon export.
          </div>
        </div>
      )}

      {/* Tab 4: Editing Style Presets */}
      {activeTab === "preset" && (
        <div className="pt-3.5 space-y-3">
          <span className="text-xs text-text-muted block">
            Select a cadence and focus preset to configure AI clip extraction parameters:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {EDITING_STYLE_PRESETS.map((preset) => {
              const isSelected = selectedPersona === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-3 rounded-lg border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#161920] border-white/40 shadow-sm"
                      : "bg-[#12151B] border-white/[0.07] hover:bg-[#161920]"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-md bg-[#08090B] border border-white/[0.08] flex items-center justify-center text-text-secondary">
                      <SlidersHorizontal className="w-4 h-4 text-[#10B981]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white leading-tight">
                        {preset.name}
                      </div>
                      <div className="text-[10px] font-mono text-text-muted">
                        {preset.badge}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-text-secondary">
                      Pacing: <span className="text-text-muted">{preset.pacing}</span>
                    </div>
                    <div className="text-[10px] text-white/80 font-mono">
                      Caption: {preset.captionPreset}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center text-black">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
