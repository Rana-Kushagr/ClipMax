"use client";

import React, { useState } from "react";
import {
  Sliders,
  Clock,
  Check,
  Tag,
  MessageSquare,
} from "lucide-react";
import { GENRE_LIST, CREATOR_PERSONAS } from "@/lib/constants";
import { CreatorPersona } from "@/types/studio";

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
  const [activeTab, setActiveTab] = useState<"genre" | "prompt" | "timeframe" | "persona">("genre");

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSelectPersona = (persona: CreatorPersona) => {
    setSelectedPersona(persona.id);
    setPromptQuery(persona.prompt);
  };

  const promptSuggestions = [
    "Compile all the hilarious moments and sudden outbursts",
    "Extract the #1 tactical insight and high-energy hooks",
    "Find contentious arguments and intense eye-opening facts",
    "Cut to before-and-after story reveals with strong emotional payoff",
  ];

  return (
    <div className="w-full bg-surface/95 border border-border-strong rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md transition-all">
      {/* Drawer Internal Navigation Header */}
      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-border gap-2">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-accent" />
          <span className="font-display font-bold text-sm text-white">
            Studio Control Drawer
          </span>
          <span className="text-xs text-slate-400 font-mono">
            (Opus-Grade Parameters)
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface-subtle border border-border text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("genre")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === "genre"
                ? "bg-accent text-white font-medium shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            28 Genres ({selectedGenres.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("prompt")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === "prompt"
                ? "bg-accent text-white font-medium shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            NL Prompt
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("timeframe")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === "timeframe"
                ? "bg-accent text-white font-medium shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Timeframe
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("persona")}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              activeTab === "persona"
                ? "bg-accent text-white font-medium shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Creator Personas
          </button>
        </div>
      </div>

      {/* Tab 1: 28 Genre Chips */}
      {activeTab === "genre" && (
        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Select genre optimizations to tune AI silence removal and pacing thresholds:</span>
            {selectedGenres.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedGenres([])}
                className="text-primary hover:underline font-mono text-[11px]"
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
                  className={`px-2.5 py-1 rounded-pill text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-primary/20 border-primary text-primary font-semibold shadow-[0_0_10px_rgba(0,229,153,0.2)]"
                      : "bg-surface-subtle border-border text-slate-300 hover:border-slate-600 hover:text-white"
                  }`}
                  aria-pressed={isSelected}
                >
                  <Tag className="w-3 h-3 opacity-70" />
                  <span>{genre}</span>
                  {isSelected && <Check className="w-3 h-3" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Natural Language Prompt Finder */}
      {activeTab === "prompt" && (
        <div className="pt-4 space-y-3">
          <label htmlFor="prompt-input" className="block text-xs text-slate-300 font-medium">
            Natural Language AI Moment Instruction:
          </label>
          <div className="relative">
            <input
              id="prompt-input"
              type="text"
              value={promptQuery}
              onChange={(e) => setPromptQuery(e.target.value)}
              placeholder="e.g. Find moments where the host talks about high ROI investments and sudden mistakes..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-border focus:border-accent focus:ring-1 focus:ring-accent text-sm text-slate-100 placeholder:text-slate-500 font-sans"
            />
            {promptQuery && (
              <button
                type="button"
                onClick={() => setPromptQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              Quick Prompt Inspiration:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {promptSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPromptQuery(suggestion)}
                  className="text-left p-2 rounded-lg bg-surface-subtle/60 hover:bg-surface-subtle border border-border/70 hover:border-accent/40 text-xs text-slate-300 hover:text-white transition-colors flex items-start gap-1.5"
                >
                  <MessageSquare className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Dual-Thumb Timeframe Slider */}
      {activeTab === "timeframe" && (
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Target Ingestion Window:</span>
            <span className="font-mono text-primary font-semibold">
              {Math.floor(startTime / 60)}:{(startTime % 60).toString().padStart(2, "0")} —{" "}
              {Math.floor(endTime / 60)}:{(endTime % 60).toString().padStart(2, "0")} (
              {Math.floor((endTime - startTime) / 60)} mins processed)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-surface-subtle border border-border space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" /> Start Timestamp
                </span>
                <span className="font-mono text-slate-200">
                  {Math.floor(startTime / 60)}:{(startTime % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={endTime - 30}
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
                aria-label="Start timestamp slider"
              />
            </div>

            <div className="p-3 rounded-xl bg-surface-subtle border border-border space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent" /> End Timestamp
                </span>
                <span className="font-mono text-slate-200">
                  {Math.floor(endTime / 60)}:{(endTime % 60).toString().padStart(2, "0")}
                </span>
              </div>
              <input
                type="range"
                min={startTime + 30}
                max="2700" // 45 minutes
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
                aria-label="End timestamp slider"
              />
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-500">
            * Output-Only Guarantee: Processing 45 minutes burns <strong>0 credits</strong>. Credits only deduct upon export.
          </div>
        </div>
      )}

      {/* Tab 4: Creator Personas */}
      {activeTab === "persona" && (
        <div className="pt-4 space-y-3">
          <span className="text-xs text-slate-400 block">
            Click any creator to automatically apply their cadence, viral prompt formula, and kinetic caption preset:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {CREATOR_PERSONAS.map((persona) => {
              const isSelected = selectedPersona === persona.id;
              return (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => handleSelectPersona(persona)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? "bg-surface-strong border-primary shadow-[0_0_15px_rgba(0,229,153,0.15)]"
                      : "bg-surface-subtle border-border hover:border-slate-600"
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={persona.avatar}
                      alt={persona.name}
                      className="w-8 h-8 rounded-full object-cover border border-border"
                    />
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {persona.name}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {persona.handle}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] text-slate-300 font-medium">
                      Pacing: <span className="text-slate-400">{persona.pacing}</span>
                    </div>
                    <div className="text-[10px] text-primary font-mono">
                      Preset: {persona.captionPreset}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-slate-950">
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
