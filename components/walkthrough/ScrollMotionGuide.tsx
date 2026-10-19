"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Scissors,
  DollarSign,
  Smartphone,
  ArrowUpRight,
  ArrowRight,
  User,
  Mic,
  Video,
} from "lucide-react";

interface ScrollMotionGuideProps {
  onLoadWorkflowSample: () => void;
  videoSrc?: string;
}

export function ScrollMotionGuide({
  onLoadWorkflowSample,
  videoSrc,
}: ScrollMotionGuideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [stepProgress, setStepProgress] = useState(0);

  // Scroll linked expansion using framer-motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 1], [0.90, 1.0]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0.75, 0.95, 1.0]);
  const y = useTransform(smoothProgress, [0, 1], [40, 0]);

  // Step auto-advance timer (5 seconds per chapter)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setStepProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((curr) => (curr === 3 ? 1 : ((curr + 1) as 1 | 2 | 3)));
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const chapters = [
    {
      step: 1,
      title: "1. Ingest Link or File",
      description: "Auto-detects YouTube, Twitch, or MP4s, scans 2h in 2s, and isolates top 6 viral peaks.",
      timecode: "00:00 - 00:05",
      icon: Scissors,
    },
    {
      step: 2,
      title: "2. Autonomous Reframe & Subtitles",
      description: "Converts 16:9 to 9:16 vertical, stacks speakers, and adds word-by-word kinetic captions.",
      timecode: "00:05 - 00:10",
      icon: Sparkles,
    },
    {
      step: 3,
      title: "3. Auto-Schedule or Earn Bounties",
      description: "Push 1-click mobile approval to Telegram or claim verified per-view cash bounties.",
      timecode: "00:10 - 00:15",
      icon: DollarSign,
    },
  ];

  return (
    <section
      id="walkthrough"
      ref={containerRef}
      className="relative z-10 py-16 px-4 sm:px-6 max-w-[1240px] mx-auto"
      aria-label="How ClipMax Works Walkthrough"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-subtle hairline-border text-text-secondary text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Interactive 15-Second Motion Walkthrough</span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-4xl text-text-primary tracking-tight">
          How ClipMax works in{" "}
          <span className="font-editorial italic font-normal text-text-primary">
            three simple steps
          </span>
          .
        </h2>
        <p className="text-text-secondary text-sm sm:text-base mt-2 font-sans">
          Engineered for toy-simple studio clarity so anyone can create viral shorts and earn bounties in seconds.
        </p>
      </div>

      {/* Scroll-Expanding Motion Frame */}
      <motion.div
        style={{ scale, opacity, y }}
        className="relative rounded-2xl bg-surface hairline-border shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden"
      >
        {/* Top Player Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-surface-subtle hairline-b text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald" />
            <span className="font-mono text-text-primary font-semibold">
              CHOREOGRAPHY ENGINE 60FPS
            </span>
            <span className="text-text-muted hidden sm:inline">|</span>
            <span className="font-mono text-text-secondary hidden sm:inline">
              CHAPTER {activeStep}/3: {chapters[activeStep - 1].timecode}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-md bg-surface hover:bg-surface-elevated hairline-border text-text-secondary hover:text-white transition-colors"
              aria-label={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveStep(1);
                setStepProgress(0);
              }}
              className="p-1.5 rounded-md bg-surface hover:bg-surface-elevated hairline-border text-text-secondary hover:text-white transition-colors"
              aria-label="Restart walkthrough"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-md bg-surface hover:bg-surface-elevated hairline-border text-text-secondary hover:text-white transition-colors"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Video / Motion Graphic Interactive Canvas Stage */}
        <div className="relative aspect-video w-full bg-canvas-deep flex items-center justify-center overflow-hidden p-4 sm:p-8">
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full max-w-4xl flex items-center justify-center relative select-none">
              {/* STEP 1 MOTION GRAPHIC: Universal Link Ingestion & Peak Detection */}
              {activeStep === 1 && (
                <div className="w-full max-w-2xl flex flex-col items-center justify-center space-y-6 text-center animate-fadeIn">
                  <div className="relative w-full p-4 rounded-xl bg-surface-subtle hairline-border shadow-2xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-elevated hairline-border flex items-center justify-center text-white font-bold">
                      <Video className="w-4 h-4 text-emerald" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-xs text-text-muted font-mono">INGESTING STREAM:</div>
                      <div className="text-sm font-semibold text-white truncate font-sans">
                        https://youtube.com/watch?v=LexFridman_SamAltman_FutureAI
                      </div>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-surface hairline-border text-emerald font-mono text-xs font-semibold">
                      2h 14m DETECTED
                    </div>
                  </div>

                  {/* Waveform Peak Detection Scan */}
                  <div className="w-full bg-surface p-4 rounded-xl hairline-border space-y-2">
                    <div className="flex justify-between text-xs font-mono text-text-muted">
                      <span>AUDIO TIMELINE SCAN (0 credits burned)</span>
                      <span className="text-emerald font-semibold">6 VIRAL HOOKS PINPOINTED</span>
                    </div>
                    <div className="h-14 flex items-end justify-between gap-1 px-2 pt-2 bg-canvas-deep rounded-lg overflow-hidden">
                      {Array.from({ length: 48 }).map((_, i) => {
                        const isPeak = [7, 16, 25, 33, 40, 45].includes(i);
                        const height = isPeak ? 90 : 15 + ((i * 7) % 45);
                        return (
                          <div
                            key={i}
                            className={`w-full rounded-t transition-all duration-300 ${
                              isPeak
                                ? "bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                                : "bg-white/20"
                            }`}
                            style={{ height: `${height}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 MOTION GRAPHIC: 16:9 to 9:16 Reframe & Kinetic Captions */}
              {activeStep === 2 && (
                <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn">
                  {/* 16:9 Source */}
                  <div className="w-56 aspect-video bg-surface rounded-xl hairline-border p-2 flex flex-col justify-between text-[10px] text-text-muted opacity-70">
                    <span className="font-mono">ORIGINAL 16:9 WIDE</span>
                    <div className="flex justify-around items-center h-16">
                      <div className="w-10 h-10 rounded-full bg-surface-subtle hairline-border flex items-center justify-center text-xs">
                        <Mic className="w-4 h-4 text-white" />
                      </div>
                      <div className="w-10 h-10 rounded-full bg-surface-subtle hairline-border flex items-center justify-center text-xs">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <span className="text-center font-mono text-[9px]">HORIZONTAL FEED</span>
                  </div>

                  <ArrowRight className="w-5 h-5 text-white/30 hidden sm:block shrink-0" />

                  {/* 9:16 Vertical Reframed Output Phone */}
                  <div className="w-48 aspect-[9/16] bg-surface-elevated rounded-2xl hairline-border border-emerald/50 shadow-2xl p-2 relative flex flex-col justify-between overflow-hidden">
                    {/* Top score badge */}
                    <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-emerald text-black text-[10px] font-mono font-bold shadow">
                      98 VIRAL
                    </div>

                    {/* Stacked 2-speaker split */}
                    <div className="h-1/2 w-full rounded-lg bg-surface flex items-center justify-center relative overflow-hidden mb-1 hairline-border">
                      <div className="w-10 h-10 rounded-full bg-surface-subtle hairline-border flex items-center justify-center text-sm">
                        <Mic className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="h-1/2 w-full rounded-lg bg-surface flex items-center justify-center relative overflow-hidden hairline-border">
                      <div className="w-10 h-10 rounded-full bg-surface-subtle hairline-border flex items-center justify-center text-sm">
                        <User className="w-4 h-4 text-white" />
                      </div>

                      {/* Kinetic Caption Overlay */}
                      <div className="absolute bottom-3 left-1 right-1 text-center font-display font-black text-xs text-white uppercase italic tracking-wider drop-shadow-md">
                        <span className="text-emerald underline">AI WILL</span> REPLACE
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 MOTION GRAPHIC: 1-Click Mobile Bot Approval & Cash Bounties */}
              {activeStep === 3 && (
                <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn">
                  {/* Telegram / Mobile Bot Mockup */}
                  <div className="w-64 p-3 rounded-xl bg-surface-subtle hairline-border shadow-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                      <Smartphone className="w-3.5 h-3.5 text-accent" />
                      <span>Telegram Autopilot Bot</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface text-[11px] text-text-secondary space-y-2 hairline-border">
                      <div className="font-semibold text-text-primary">
                        Ready for Approval: #1 AI Startup Clip (98 Score)
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          className="flex-1 py-1 rounded bg-white text-black font-semibold text-[10px] text-center"
                        >
                          Approve & Post
                        </button>
                        <button
                          type="button"
                          className="py-1 px-2.5 rounded bg-surface-elevated text-text-secondary text-[10px] hairline-border"
                        >
                          Regen
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cash Bounty Earning Card */}
                  <div className="w-64 p-3 rounded-xl bg-surface-subtle hairline-border border-emerald/40 shadow-xl space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald" />
                        Verified Bounty
                      </span>
                      <span className="font-mono text-emerald text-[11px] font-bold">
                        +$240.00
                      </span>
                    </div>
                    <div className="text-[11px] text-text-secondary">
                      120,000 Verified Views on TikTok @ $2.00 CPM Payout.
                    </div>
                    <div className="pt-1.5 border-t border-white/[0.07] flex items-center justify-between text-[10px] font-mono text-text-muted">
                      <span>Fee: 0% Wallet Reinvest</span>
                      <span className="text-emerald font-semibold">READY TO WITHDRAW</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 3 Clickable Timeline Chapter Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 hairline-t divide-y md:divide-y-0 md:divide-x divide-white/[0.07] bg-surface-subtle">
          {chapters.map((ch) => {
            const Icon = ch.icon;
            const isActive = activeStep === ch.step;
            return (
              <button
                key={ch.step}
                type="button"
                onClick={() => {
                  setActiveStep(ch.step as 1 | 2 | 3);
                  setStepProgress(0);
                }}
                className={`p-4 text-left transition-colors relative group ${
                  isActive ? "bg-surface-elevated" : "hover:bg-surface"
                }`}
                aria-pressed={isActive}
              >
                {/* Active Progress Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-surface-subtle">
                    <div
                      className="h-full bg-white transition-all duration-100 ease-linear"
                      style={{ width: `${stepProgress}%` }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                        isActive
                          ? "bg-white text-black font-mono font-bold"
                          : "bg-surface text-text-muted hairline-border"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-display font-semibold text-xs text-text-primary">
                      {ch.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-text-muted">
                    {ch.timecode}
                  </span>
                </div>

                <p className="text-[11px] text-text-secondary leading-snug line-clamp-2 font-sans">
                  {ch.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Direct Action Footer */}
        <div className="p-4 bg-surface flex flex-col sm:flex-row items-center justify-between gap-3 hairline-t">
          <span className="text-xs text-text-muted font-sans">
            Want to see how your own videos look with 98-virality auto-framing?
          </span>
          <button
            type="button"
            onClick={onLoadWorkflowSample}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-primary hover:bg-white text-primary-obsidian font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <span>Try This Exact Workflow Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
