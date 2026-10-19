"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Link2,
  UploadCloud,
  CheckCircle2,
  Youtube,
  Tv,
  HardDrive,
  Film,
  Zap,
  ArrowRight,
  ShieldCheck,
  Loader2,
  FileVideo,
  X,
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

  // Platform detection logic based on URL pattern
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
    { name: "Twitch Livestream", url: "https://twitch.tv/videos/189204812" },
    { name: "Kick Creator Stream", url: "https://kick.com/video/40281" },
  ];

  const handleStartGeneration = () => {
    if (!videoUrl && !uploadedFileName) {
      // Auto-populate with sample url if empty so the user can test in 1 click
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
    }, 90);
  };

  // Drag and drop handlers
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
    <section id="studio-command" className="relative z-10 pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Studio Tally Banner */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-surface-subtle border border-border mb-6 text-xs text-slate-300">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse-subtle" />
        <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-bold">
          ClipMax Engine V3.8
        </span>
        <span className="text-slate-600">|</span>
        <span>Output-Only Architecture</span>
        <span className="text-slate-600">|</span>
        <span className="text-warning font-semibold">100% Rollover</span>
      </div>

      {/* Hero Headline */}
      <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-5">
        Turn Long Videos Into Viral Shorts In{" "}
        <span className="bg-gradient-to-r from-primary via-emerald-300 to-primary bg-clip-text text-transparent">
          One Click
        </span>
      </h1>

      <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
        Paste any podcast, livestream, or video file. AI pinpoints the most engaging moments, auto-reframes to 9:16 with multi-speaker detection, and generates kinetic captions.
      </p>

      {/* Universal Command Bar */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative max-w-3xl mx-auto rounded-2xl bg-surface/95 border transition-all p-2 sm:p-2.5 shadow-2xl backdrop-blur-xl ${
          dragActive
            ? "border-primary ring-2 ring-primary/40 bg-primary/5"
            : "border-border-strong hover:border-slate-600"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Platform Indicator Icon */}
          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-surface-subtle border border-border text-slate-400 shrink-0">
            {platform === "youtube" && <Youtube className="w-5 h-5 text-red-500" />}
            {platform === "twitch" && <Tv className="w-5 h-5 text-purple-400" />}
            {platform === "kick" && <Tv className="w-5 h-5 text-primary" />}
            {platform === "rumble" && <Tv className="w-5 h-5 text-emerald-400" />}
            {platform === "drive" && <HardDrive className="w-5 h-5 text-blue-400" />}
            {platform === "file" && <FileVideo className="w-5 h-5 text-warning" />}
            {platform === "unknown" && <Link2 className="w-5 h-5 text-slate-500" />}
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
              placeholder="Paste a YouTube, Twitch, Kick, Rumble, or Drive link..."
              className="w-full bg-transparent px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none font-sans"
              aria-label="Video URL or upload link"
              disabled={isProcessing}
            />

            {uploadedFileName && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-warning bg-warning/10 px-2 py-0.5 rounded-md border border-warning/20">
                <span>{uploadedFileName}</span>
                <button
                  type="button"
                  onClick={() => {
                    setUploadedFileName(null);
                    setVideoUrl("");
                  }}
                  aria-label="Remove uploaded file"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* File Upload Trigger */}
          <label
            htmlFor="file-upload"
            className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-surface-subtle cursor-pointer border border-transparent hover:border-border transition-colors shrink-0"
            title="Drop or browse raw MP4, MOV, MKV up to 10GB"
          >
            <UploadCloud className="w-4 h-4 text-slate-400" />
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

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={handleStartGeneration}
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-slate-950 font-display font-extrabold text-sm shadow-[0_0_20px_rgba(0,229,153,0.3)] transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75 disabled:cursor-wait shrink-0"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Processing... {progressPercent}%</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Get Clips in 1 Click</span>
              </>
            )}
          </button>
        </div>

        {/* Processing Simulation Bar */}
        {isProcessing && (
          <div className="mt-3 pt-3 border-t border-border text-left px-2">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1.5">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                {processStep === 1 && "Phase 1/4: Ingesting 4K audio/video stream..."}
                {processStep === 2 && "Phase 2/4: Diarizing dual-speaker audio & timestamps..."}
                {processStep === 3 && "Phase 3/4: Scoring retention virality algorithms..."}
                {processStep === 4 && "Phase 4/4: Framing 9:16 layout & kinetic subtitle tracks..."}
              </span>
              <span className="text-slate-300 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-surface-subtle rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-100 ease-out rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Sample Links Quick Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500">
        <span>Try a sample video:</span>
        {sampleUrls.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setVideoUrl(s.url)}
            className="text-slate-400 hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary font-mono text-[11px]"
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Competitive Advantage #1: Output-Only Trust Metering Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 max-w-xl mx-auto bg-surface-subtle/80 border border-border/80 rounded-xl py-2 px-3">
        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
        <span className="text-left sm:text-center text-[11px] leading-tight">
          <strong className="text-slate-200">0 credits burned on upload</strong> — only pay when you export a clip (3 free 1080p watermark-free clips/mo + 100% credit rollover).
        </span>
      </div>

      {/* Expandable Opus-Style Smart Drawer */}
      {studioMode === "studio" && (
        <div className="mt-6">
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

      {/* 7-Icon Quick Tool Dock */}
      <div className="mt-8">
        <StudioQuickDock
          activeTool={activeTool}
          setActiveTool={setActiveTool}
        />
      </div>
    </section>
  );
}
