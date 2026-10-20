"use client";

import React, { useState, useEffect } from "react";
import {
  Link2,
  UploadCloud,
  Youtube,
  Tv,
  HardDrive,
  Zap,
  ShieldCheck,
  Loader2,
  FileVideo,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SmartOptionsDrawer } from "./SmartOptionsDrawer";
import { StudioQuickDock } from "./StudioQuickDock";

interface ClipCommandCenterProps {
  studioMode: "lightning" | "studio";
  setStudioMode: (mode: "lightning" | "studio") => void;
  onClipsGenerated: () => void;
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
  promptQuery: string;
  setPromptQuery: (q: string) => void;
  startTime: number;
  setStartTime: (t: number) => void;
  endTime: number;
  setEndTime: (t: number) => void;
  selectedPersona: string;
  setSelectedPersona: (p: string) => void;
  activeTool: string;
  setActiveTool: (t: string) => void;
}

export function ClipCommandCenter({
  studioMode,
  setStudioMode,
  onClipsGenerated,
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
  activeTool,
  setActiveTool,
}: ClipCommandCenterProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [platform, setPlatform] = useState<"youtube" | "twitch" | "kick" | "rumble" | "drive" | "file" | "unknown">("unknown");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  useEffect(() => {
    const url = videoUrl.toLowerCase();
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      setPlatform("youtube");
    } else if (url.includes("twitch.tv")) {
      setPlatform("twitch");
    } else if (url.includes("kick.com")) {
      setPlatform("kick");
    } else if (url.includes("rumble.com")) {
      setPlatform("rumble");
    } else if (url.includes("drive.google.com")) {
      setPlatform("drive");
    } else if (uploadedFileName) {
      setPlatform("file");
    } else {
      setPlatform("unknown");
    }
  }, [videoUrl, uploadedFileName]);

  const sampleUrls = [
    { name: "YouTube Interview", url: "https://youtube.com/watch?v=dQw4w9WgXcQ" },
    { name: "Twitch Stream", url: "https://twitch.tv/videos/189204812" },
    { name: "Kick Creator Vod", url: "https://kick.com/video/40281" },
  ];

  const handleStartGeneration = () => {
    if (!videoUrl && !uploadedFileName) {
      setVideoUrl("https://youtube.com/watch?v=dQw4w9WgXcQ");
    }

    setIsProcessing(true);
    setProgressPercent(0);
    setProcessStep(1);

    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            onClipsGenerated();
            const elem = document.getElementById("playgrounds");
            if (elem) elem.scrollIntoView({ behavior: "smooth" });
          }, 400);
          return 100;
        }

        const next = prev + 5;
        if (next >= 75) setProcessStep(4);
        else if (next >= 50) setProcessStep(3);
        else if (next >= 25) setProcessStep(2);

        return next;
      });
    }, 80);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
      setVideoUrl(`local-file://${file.name}`);
    }
  };

  return (
    <section id="studio-command" className="relative z-10 pt-16 pb-12 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Studio Tally Engine Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-subtle hairline-border mb-6 text-xs text-text-secondary">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
        <span className="font-mono text-[11px] tracking-wider text-white font-medium">
          ClipMax Engine v3.8
        </span>
        <span className="text-white/20">•</span>
        <span className="text-text-muted">Output-Only Architecture</span>
        <span className="text-white/20">•</span>
        <span className="text-emerald font-mono">100% Rollover</span>
      </div>

      {/* Hero Display Heading with High-Fashion Editorial Contrast */}
      <h1 className="font-display font-bold text-[clamp(2.5rem,5.5vw,4.25rem)] tracking-[-0.035em] text-text-primary max-w-4xl mx-auto leading-[1.04] mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
        Paste one long video. Get 10{" "}
        <span className="font-editorial italic font-normal text-text-primary">
          viral shorts
        </span>{" "}
        in one click.
      </h1>

      <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
        Autonomous face-tracking reframe, SMPTE-timed kinetic captions, and 1-click mobile schedule approval. Zero timeline editing required.
      </p>

      {/* Universal Command Recessed Well */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative max-w-3xl mx-auto rounded-xl bg-surface-subtle hairline-border transition-all p-2 sm:p-2.5 shadow-2xl backdrop-blur-xl ${
          dragActive
            ? "border-accent ring-1 ring-accent/40 bg-surface-elevated"
            : "hover:border-white/20"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Platform Indicator Icon */}
          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg bg-surface hairline-border text-text-muted shrink-0">
            {platform === "youtube" && <Youtube className="w-4 h-4 text-red-500" />}
            {platform === "twitch" && <Tv className="w-4 h-4 text-purple-400" />}
            {platform === "kick" && <Tv className="w-4 h-4 text-emerald" />}
            {platform === "rumble" && <Tv className="w-4 h-4 text-emerald" />}
            {platform === "drive" && <HardDrive className="w-4 h-4 text-blue-400" />}
            {platform === "file" && <FileVideo className="w-4 h-4 text-warning" />}
            {platform === "unknown" && <Link2 className="w-4 h-4 text-text-muted" />}
          </div>

          {/* Universal URL / Dropped file input */}
          <div className="relative w-full flex-1">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => {
                setVideoUrl(e.target.value);
                setUploadedFileName(null);
              }}
              placeholder="Paste YouTube, Twitch, Kick, Rumble, Drive URL or drop MP4/MOV..."
              className="w-full bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none font-sans"
              aria-label="Video URL or upload link"
              disabled={isProcessing}
            />

            {uploadedFileName && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-warning bg-warning/10 px-2 py-0.5 rounded-md border border-warning/20">
                <span className="font-mono text-[11px]">{uploadedFileName}</span>
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFileName(null);
                    setVideoUrl("");
                  }}
                  aria-label="Remove uploaded file"
                  className="hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* File Upload Trigger */}
          <label
            htmlFor="file-upload"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-text-secondary hover:text-white hover:bg-surface-elevated cursor-pointer transition-colors shrink-0"
            title="Drop or browse raw MP4, MOV up to 10GB"
          >
            <UploadCloud className="w-4 h-4 text-text-muted" />
            <span>Upload File</span>
            <input
              id="file-upload"
              type="file"
              accept="video/*"
              className="sr-only"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  setUploadedFileName(file.name);
                  setVideoUrl(`local-file://${file.name}`);
                }
              }}
            />
          </label>

          {/* Solid Studio White Primary Button */}
          <button
            type="button"
            onClick={handleStartGeneration}
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-primary hover:bg-white text-primary-obsidian font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75 disabled:cursor-wait shrink-0 shadow-sm"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-primary-obsidian" />
                <span>Processing {progressPercent}%</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-primary-obsidian text-primary-obsidian" />
                <span>Get Clips in 1 Click</span>
              </>
            )}
          </button>
        </div>

        {/* Processing Simulation Bar */}
        {isProcessing && (
          <div className="mt-3 pt-3 border-t border-white/[0.07] text-left px-2">
            <div className="flex justify-between items-center text-xs font-mono text-text-secondary mb-1.5">
              <span className="flex items-center gap-2 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                {processStep === 1 && "Phase 1/4: Ingesting 4K audio/video stream..."}
                {processStep === 2 && "Phase 2/4: Diarizing dual-speaker audio & timestamps..."}
                {processStep === 3 && "Phase 3/4: Scoring retention virality algorithms..."}
                {processStep === 4 && "Phase 4/4: Framing 9:16 layout & kinetic subtitle tracks..."}
              </span>
              <span className="text-white font-semibold tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Sample Links Quick Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-text-muted">
        <span>Try a sample video:</span>
        {sampleUrls.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setVideoUrl(s.url)}
            className="text-text-secondary hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white font-mono text-[11px]"
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Output-Only Trust Metering Guarantee */}
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-text-muted max-w-xl mx-auto bg-surface/60 hairline-border rounded-lg py-2 px-3">
        <ShieldCheck className="w-4 h-4 text-emerald shrink-0" />
        <span className="text-left sm:text-center text-[11px] leading-tight">
          <strong className="text-text-primary">0 credits burned on upload</strong> — only pay when you export a clip (3 free 1080p watermark-free clips/mo with 100% credit rollover).
        </span>
      </div>

      {/* Smart Drawer Toggle Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setStudioMode(studioMode === "studio" ? "lightning" : "studio")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-subtle hover:bg-surface-elevated hairline-border text-xs text-text-secondary hover:text-white transition-colors font-medium"
        >
          <span>
            {studioMode === "studio"
              ? "Collapse parameters"
              : "Refine clipping parameters (genre, custom prompt, timeframe)"}
          </span>
          {studioMode === "studio" ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Expandable Opus-Style Smart Drawer */}
      {studioMode === "studio" && (
        <div className="mt-4">
          <SmartOptionsDrawer
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            promptQuery={promptQuery}
            setPromptQuery={setPromptQuery}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            selectedPersona={selectedPersona}
            setSelectedPersona={setSelectedPersona}
          />
        </div>
      )}

      {/* 7-Icon Quick Tool Studio Dock */}
      <div className="mt-8">
        <StudioQuickDock
          activeTool={activeTool}
          setActiveTool={setActiveTool}
        />
      </div>
    </section>
  );
}
