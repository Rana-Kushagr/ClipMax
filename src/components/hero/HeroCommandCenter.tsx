import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { DecryptedText } from "../react-bits/DecryptedText";
import { SpotlightCard } from "../react-bits/SpotlightCard";
import { Magnet } from "../react-bits/Magnet";
import { BorderGlow } from "../ui/BorderGlow";
import { SmartOptionsDrawer, SmartOptionsState } from "./SmartOptionsDrawer";
import { StudioQuickDock } from "./StudioQuickDock";

interface HeroCommandCenterProps {
  studioMode: "lightning" | "studio";
  setStudioMode: (mode: "lightning" | "studio") => void;
  onClipsGenerated: () => void;
  options: SmartOptionsState;
  activeTool: string;
  setActiveTool: (t: string) => void;
  videoUrl: string;
  setVideoUrl: (u: string) => void;
}

export function HeroCommandCenter({
  studioMode,
  setStudioMode,
  onClipsGenerated,
  options,
  activeTool,
  setActiveTool,
  videoUrl,
  setVideoUrl,
}: Readonly<HeroCommandCenterProps>) {
  const [protocolBadge, setProtocolBadge] = useState<string>("https://");
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
      setProtocolBadge("youtube://");
    } else if (url.includes("twitch.tv")) {
      setPlatform("twitch");
      setProtocolBadge("twitch://");
    } else if (url.includes("kick.com")) {
      setPlatform("kick");
      setProtocolBadge("kick://");
    } else if (url.includes("rumble.com")) {
      setPlatform("rumble");
      setProtocolBadge("rumble://");
    } else if (url.includes("drive.google.com")) {
      setPlatform("drive");
      setProtocolBadge("drive://");
    } else if (uploadedFileName) {
      setPlatform("file");
      setProtocolBadge("mp4://");
    } else {
      setPlatform("unknown");
      setProtocolBadge("https://");
    }
  }, [videoUrl, uploadedFileName]);

  const sampleUrls = [
    { name: "YouTube Interview", url: "https://youtube.com/watch?v=SystemArchitecture_Discussion" },
    { name: "Twitch Stream", url: "https://twitch.tv/videos/189204812" },
    { name: "Kick Creator Vod", url: "https://kick.com/video/40281" },
  ];

  const handleStartGeneration = () => {
    if (!videoUrl && !uploadedFileName) {
      setVideoUrl("https://youtube.com/watch?v=SystemArchitecture_Discussion");
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
          }, 350);
          return 100;
        }

        const next = prev + 5;
        if (next >= 75) setProcessStep(4);
        else if (next >= 50) setProcessStep(3);
        else if (next >= 25) setProcessStep(2);

        return next;
      });
    }, 75);
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
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
      setVideoUrl(`local-file://${file.name}`);
    }
  };

  return (
    <section id="studio-command" className="relative z-10 pt-16 pb-12 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Studio Tally Engine Pill with DecryptedText */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1710] border border-[#F3E5AB]/20 mb-6 text-xs text-text-secondary shadow-lg">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
        <span className="font-mono text-[11px] tracking-wider text-white font-medium">
          <DecryptedText text="Sharko Engine v3.8" speed={35} />
        </span>
        <span className="text-white/20">•</span>
        <span className="text-[#D99B52] font-mono text-[11px] font-semibold tracking-wider">Hunt the Moments</span>
        <span className="text-white/20 hidden sm:inline">•</span>
        <span className="text-[#10B981] font-mono font-medium hidden sm:inline">100% Rollover</span>
      </div>

      {/* Hero Display Heading with Crisp 0.25s GPU Reveal */}
      <div className="max-w-4xl mx-auto mb-5">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-[#F4F4F6] leading-[1.04] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
        >
          Paste one long video. Get{" "}
          <span className="serif-italic text-[#F3E5AB]">viral shorts</span> in one click.
        </motion.h1>
      </div>

      <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
        Autonomous face-tracking reframe, SMPTE-timed kinetic captions, and 1-click mobile schedule approval. Zero timeline editing required.
      </p>

      {/* Universal Command Recessed Well with BorderGlow & SpotlightCard */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className="max-w-3xl mx-auto relative"
      >
        {/* Subtle Anamorphic Horizontal Lens Streak Behind Command Bar */}
        <div
          className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-full max-w-[760px] pointer-events-none z-0"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 5%, rgba(224,109,59,0.28) 35%, rgba(255,255,255,0.45) 50%, rgba(16,185,129,0.28) 65%, transparent 95%)",
            boxShadow: "0 0 32px 2px rgba(224,109,59,0.12)",
          }}
          aria-hidden="true"
        />
        <BorderGlow
          animated={true}
          borderRadius={18}
          glowColor="42 80 78"
          backgroundColor="#1E1710"
          colors={['#F3E5AB', '#D99B52', '#10B981']}
          className="w-full"
        >
          <SpotlightCard
            spotlightColor="rgba(243, 229, 171, 0.16)"
            className={`p-2 sm:p-2.5 transition-all shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl bg-transparent border-none ${
              dragActive
                ? "ring-2 ring-[#F3E5AB]/60 bg-[#2A2016]/90"
                : ""
            }`}
          >
          <div className="flex flex-col sm:flex-row items-center gap-2">
            {/* Live Protocol Badge Detection */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-[#08090B] border border-white/[0.08] text-xs font-mono shrink-0 select-none">
              {platform === "youtube" && <Youtube className="w-3.5 h-3.5 text-red-500" />}
              {platform === "twitch" && <Tv className="w-3.5 h-3.5 text-purple-400" />}
              {platform === "kick" && <Tv className="w-3.5 h-3.5 text-[#10B981]" />}
              {platform === "rumble" && <Tv className="w-3.5 h-3.5 text-[#10B981]" />}
              {platform === "drive" && <HardDrive className="w-3.5 h-3.5 text-blue-400" />}
              {platform === "file" && <FileVideo className="w-3.5 h-3.5 text-[#E06D3B]" />}
              {platform === "unknown" && <Link2 className="w-3.5 h-3.5 text-text-muted" />}
              <span className="text-[#10B981] font-semibold">{protocolBadge}</span>
            </div>

            {/* Widen input flex track (min-w-0 flex-1) to eliminate truncation! */}
            <div className="relative min-w-0 flex-1 w-full">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => {
                  setVideoUrl(e.target.value);
                  setUploadedFileName(null);
                }}
                placeholder="Paste YouTube, Twitch, Kick, Rumble, or Drive URL — or drop MP4..."
                className="w-full bg-transparent px-3 py-2 text-sm text-[#F4F4F6] placeholder:text-text-muted focus:outline-none font-sans"
                aria-label="Video URL or upload link"
                disabled={isProcessing}
              />

              {uploadedFileName && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-[#E06D3B] bg-[#E06D3B]/10 px-2 py-0.5 rounded-md border border-[#E06D3B]/20">
                  <span className="font-mono text-[11px] truncate max-w-[140px]">{uploadedFileName}</span>
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
              <span>Upload</span>
              <input
                id="file-upload"
                type="file"
                accept="video/*"
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const file = e.target.files[0];
                    setUploadedFileName(file.name);
                    setVideoUrl(`local-file://${file.name}`);
                  }
                }}
              />
            </label>

            {/* Solid Studio White Primary Button wrapped in Magnet */}
            <Magnet strength={0.2} radius={45}>
              <button
                type="button"
                onClick={handleStartGeneration}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#F4F4F6] hover:bg-white text-[#08090B] font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75 disabled:cursor-wait shrink-0 shadow-md"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#08090B]" />
                    <span>Processing {progressPercent}%</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-[#08090B] text-[#08090B]" />
                    <span>Get Clips in 1 Click</span>
                  </>
                )}
              </button>
            </Magnet>
          </div>

          {/* Processing Simulation Bar */}
          {isProcessing && (
            <div className="mt-3 pt-3 border-t border-white/[0.08] text-left px-2">
              <div className="flex justify-between items-center text-xs font-mono text-text-secondary mb-1.5">
                <span className="flex items-center gap-2 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  {processStep === 1 && "Phase 1/4: Ingesting 4K audio/video stream..."}
                  {processStep === 2 && "Phase 2/4: Diarizing dual-speaker audio & timestamps..."}
                  {processStep === 3 && "Phase 3/4: Scoring retention virality algorithms..."}
                  {processStep === 4 && "Phase 4/4: Framing 9:16 layout & kinetic subtitle tracks..."}
                </span>
                <span className="text-white font-semibold tabular-nums">{progressPercent}%</span>
              </div>
              <div className="w-full h-1 bg-[#08090B] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#10B981] to-[#E06D3B] transition-all duration-100 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </SpotlightCard>
        </BorderGlow>
      </div>

      {/* Sample Links Quick Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5 text-xs text-text-muted">
        <span>Try a sample video:</span>
        {sampleUrls.map((s) => (
          <button
            key={`sample-${s.name}`}
            type="button"
            onClick={() => setVideoUrl(s.url)}
            className="text-text-secondary hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#10B981] font-mono text-[11px]"
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Output-Only Trust Metering Guarantee */}
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-text-muted max-w-xl mx-auto bg-[#0E1014]/75 backdrop-blur-md border border-white/[0.07] rounded-lg py-2 px-3 shadow-md">
        <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0" />
        <span className="text-left sm:text-center text-[11px] leading-tight">
          <strong className="text-white">0 credits burned on upload</strong> — only pay when you export a clip (3 free 1080p watermark-free clips/mo with 100% credit rollover).
        </span>
      </div>

      {/* Smart Drawer Toggle Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setStudioMode(studioMode === "studio" ? "lightning" : "studio")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0E1014]/90 hover:bg-[#161920] border border-white/[0.08] text-xs text-text-secondary hover:text-white transition-colors font-medium shadow-sm"
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
          <SmartOptionsDrawer {...options} />
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
