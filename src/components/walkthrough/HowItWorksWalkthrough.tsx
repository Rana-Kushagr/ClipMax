import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
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
  ArrowRight,
  User,
  Mic,
  Video,
  CheckCircle2,
  Sliders,
  Sparkle,
} from "lucide-react";
import { Magnet } from "../react-bits/Magnet";
import { ExpandableScreen } from "../ui/expandable-screen";
import { MarkerUnderline } from "../brand/SharkoBrandLogo";

interface HowItWorksWalkthroughProps {
  onLoadWorkflowSample: () => void;
}

export function HowItWorksWalkthrough({
  onLoadWorkflowSample,
}: Readonly<HowItWorksWalkthroughProps>) {
  // Current active scene state (1: 0-5s, 2: 5-10s, 3: 10-15s)
  // Decoupled from 60fps high-frequency ticks to eliminate unnecessary React re-renders!
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // High-performance direct DOM refs
  const timeRef = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const scrubberFillRef = useRef<HTMLDivElement>(null);
  const scrubberTextRef = useRef<HTMLSpanElement>(null);
  const headerTimeRef = useRef<HTMLSpanElement>(null);
  const chapter1FillRef = useRef<HTMLDivElement>(null);
  const chapter2FillRef = useRef<HTMLDivElement>(null);
  const chapter3FillRef = useRef<HTMLDivElement>(null);
  const bountyAmountRef = useRef<HTMLSpanElement>(null);
  const bountyViewsRef = useRef<HTMLSpanElement>(null);

  const isDraggingRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number>(performance.now());

  const chapters = [
    {
      step: 1,
      title: "1. Ingest & Spectral Radar",
      description: "Auto-detects YouTube, Twitch, or MP4s, scans 2h audio in 2s, and isolates top viral hooks.",
      timecode: "00:00 - 00:05",
      icon: Scissors,
    },
    {
      step: 2,
      title: "2. Spring Slicing & Kinetic Captions",
      description: "Spring morphs 16:9 to 9:16 vertical, stacks active speakers, and burns SMPTE kinetic captions.",
      timecode: "00:05 - 00:10",
      icon: Sparkles,
    },
    {
      step: 3,
      title: "3. Telegram Approval & Live Bounty Counter",
      description: "Push 1-click mobile approval to Telegram or claim verified per-view cash bounties.",
      timecode: "00:10 - 00:15",
      icon: DollarSign,
    },
  ];

  // Helper to update all direct DOM refs at 60fps without React reconciliation
  const updateDom = useCallback((t: number) => {
    const formatted = `${t.toFixed(2)}s / 15.00s`;

    if (scrubberFillRef.current) {
      scrubberFillRef.current.style.width = `${(t / 15) * 100}%`;
    }
    if (scrubberTextRef.current) {
      scrubberTextRef.current.textContent = `SCRUBBER: ${formatted}`;
    }
    if (headerTimeRef.current) {
      headerTimeRef.current.textContent = formatted;
    }

    // Update chapter progress bars
    if (chapter1FillRef.current) {
      const p1 = Math.max(0, Math.min(100, (t / 5) * 100));
      chapter1FillRef.current.style.width = `${p1}%`;
    }
    if (chapter2FillRef.current) {
      const p2 = Math.max(0, Math.min(100, ((t - 5) / 5) * 100));
      chapter2FillRef.current.style.width = `${p2}%`;
    }
    if (chapter3FillRef.current) {
      const p3 = Math.max(0, Math.min(100, ((t - 10) / 5) * 100));
      chapter3FillRef.current.style.width = `${p3}%`;
    }

    // Update Scene 3 Bounty live counters
    if (t >= 10) {
      const frac = Math.max(0, Math.min(1, (t - 10) / 5));
      if (bountyAmountRef.current) {
        bountyAmountRef.current.textContent = `+$${(frac * 240).toFixed(2)}`;
      }
      if (bountyViewsRef.current) {
        bountyViewsRef.current.textContent = Math.floor(frac * 120000).toLocaleString();
      }
    }
  }, []);

  // Track section visibility to pause animation loops completely when off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          lastTimeRef.current = performance.now();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 60FPS high-precision timeline loop (zero React state updates per frame!)
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isPlaying && isVisibleRef.current && !isDraggingRef.current) {
        let next = timeRef.current + delta;
        if (next >= 15) {
          next = 0; // Seamless loop at 15.0s
        }
        timeRef.current = next;

        // Check if scene transition occurred (only 3 scene changes per 15s loop!)
        const targetScene = next < 5 ? 1 : next < 10 ? 2 : 3;
        setCurrentScene((prev) => (prev !== targetScene ? targetScene : prev));

        updateDom(next);
      }

      animId = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, updateDom]);

  // Audio waveform & spectral radar canvas rendering for Scene 1 (paused when off-screen)
  useEffect(() => {
    if (currentScene !== 1 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const draw = () => {
      if (!isVisibleRef.current) return;

      const width = canvas.width;
      const height = canvas.height;
      ctx.fillStyle = "#000511";
      ctx.fillRect(0, 0, width, height);

      const bars = 48;
      const barWidth = width / bars - 2;
      t += 0.04;

      for (let i = 0; i < bars; i++) {
        const isPeak = [7, 16, 25, 34, 42].includes(i);
        const wave = Math.sin(t + i * 0.28) * 10;
        const baseHeight = isPeak
          ? height * 0.78 + wave
          : 10 + ((i * 13) % (height * 0.42)) + wave * 0.25;
        const clampedHeight = Math.max(6, Math.min(height - 4, baseHeight));

        const x = i * (barWidth + 2);
        const y = height - clampedHeight;

        ctx.fillStyle = isPeak ? "#89CFF0" : "rgba(0, 71, 171, 0.45)";
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, clampedHeight, 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [currentScene]);

  // Interactive scrubber handlers (Support both Mouse and Touch for Mobile Phones!)
  const handleScrubberChange = useCallback((clientX: number) => {
    if (!scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / (rect.width || 1)));
    const newTime = ratio * 15;
    timeRef.current = newTime;
    const newScene = newTime < 5 ? 1 : newTime < 10 ? 2 : 3;
    setCurrentScene(newScene);
    updateDom(newTime);
  }, [updateDom]);

  const handleScrubberMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    handleScrubberChange(e.clientX);

    const onMouseMove = (ev: MouseEvent) => {
      if (isDraggingRef.current) {
        handleScrubberChange(ev.clientX);
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      lastTimeRef.current = performance.now();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleScrubberTouchStart = (e: React.TouchEvent) => {
    if (!e.touches[0]) return;
    isDraggingRef.current = true;
    handleScrubberChange(e.touches[0].clientX);
  };

  const handleScrubberTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !e.touches[0]) return;
    handleScrubberChange(e.touches[0].clientX);
  };

  const handleScrubberTouchEnd = () => {
    isDraggingRef.current = false;
    lastTimeRef.current = performance.now();
  };

  const jumpToChapter = (sceneNum: number) => {
    const t = (sceneNum - 1) * 5;
    timeRef.current = t;
    setCurrentScene(sceneNum);
    updateDom(t);
    lastTimeRef.current = performance.now();
  };

  return (
    <div
      ref={sectionRef}
      className="relative z-10 py-6 px-4 sm:px-6 max-w-[1240px] mx-auto select-none"
      aria-label="Cinema Walkthrough Player"
    >
      {/* Section Header with Crisp, High-Contrast Marker Accent */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EBF3FF] dark:bg-[#0066FF]/20 border border-[#BFDBFE] dark:border-[#0066FF]/40 text-[#0066FF] dark:text-[#89CFF0] text-xs font-bold tracking-wider uppercase mb-1">
          <Sparkles className="w-3.5 h-3.5 animate-spark" />
          <span>AUTONOMOUS PIPELINE</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#0B0F19] dark:text-white tracking-tight">
          How Sharko works in{' '}
          <MarkerUnderline color="pink" showSparks>
            three simple steps.
          </MarkerUnderline>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-sans max-w-2xl mx-auto">
          From long YouTube podcast to 45 scheduled vertical shorts in less than 3 minutes.
        </p>
      </div>

      {/* Main Walkthrough Console Surface */}
      <div className="relative rounded-2xl bg-[#000816] border border-[#89CFF0]/25 shadow-2xl overflow-hidden">
        {/* Top Player Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#00040A] text-xs border-b border-[#89CFF0]/15">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#89CFF0] animate-pulse" />
            <span className="font-mono text-[#FFFFFF] font-semibold tracking-wide text-[11px] sm:text-xs">
              AUTONOMOUS MOTION ENGINE
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span
              ref={headerTimeRef}
              className="font-mono text-[#89CFF0] font-semibold hidden sm:inline tabular-nums"
            >
              0.00s / 15.00s
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="font-mono text-zinc-400 hidden sm:inline">
              SCENE {currentScene}/3: {chapters[currentScene - 1].title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-[#040C1E] hover:bg-[#0047AB]/30 border border-[#89CFF0]/25 text-[#89CFF0] hover:text-white transition-colors"
              aria-label={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              type="button"
              onClick={() => {
                timeRef.current = 0;
                setCurrentScene(1);
                updateDom(0);
                lastTimeRef.current = performance.now();
              }}
              className="p-1.5 rounded-lg bg-[#040C1E] hover:bg-[#0047AB]/30 border border-[#89CFF0]/25 text-[#89CFF0] hover:text-white transition-colors"
              aria-label="Restart walkthrough"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-[#040C1E] hover:bg-[#0047AB]/30 border border-[#89CFF0]/25 text-[#89CFF0] hover:text-white transition-colors hidden sm:flex"
              aria-label={isMuted ? "Unmute walkthrough" : "Mute walkthrough"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 16:9 Cinema Stage */}
        <div className="relative aspect-video w-full bg-[#000000] overflow-hidden flex items-center justify-center">
          {/* SCENE 1: Ingest & Spectral Radar (0.0s - 5.0s) */}
          {currentScene === 1 && (
            <div className="w-full h-full relative flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
              <div className="relative w-full max-w-xl aspect-video rounded-xl bg-[#000B1D] border border-[#89CFF0]/25 overflow-hidden shadow-2xl flex flex-col justify-between p-3 sm:p-4">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&auto=format&fit=crop&q=80"
                  alt="Raw studio recording"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-50"
                />

                {/* Animated Horizontal Laser Scan Line */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#89CFF0] to-transparent shadow-[0_0_15px_#89CFF0] animate-pulse top-1/2 -translate-y-1/2 pointer-events-none" />

                {/* Top Telemetry */}
                <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-black/70 text-[#89CFF0] border border-[#89CFF0]/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#89CFF0] animate-ping" />
                    INGESTING: 4K H.265 STREAM (2h 14m)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 text-white border border-[#89CFF0]/40">
                    SCAN SPEED: 1,840 FPS
                  </span>
                </div>

                {/* Audio Waveform Canvas */}
                <div className="relative z-10 space-y-1.5 mt-auto">
                  <div className="flex justify-between text-[10px] font-mono text-[#FFFFFF]">
                    <span>SPECTRAL FREQUENCY RADAR</span>
                    <span className="text-[#89CFF0]">6 VIRAL CLIMAX PEAKS LOCATED</span>
                  </div>
                  <canvas
                    ref={canvasRef}
                    width={520}
                    height={48}
                    className="w-full h-10 sm:h-12 rounded-lg bg-black/80 border border-[#89CFF0]/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SCENE 2: Spring Slicing & Kinetic Captions (5.0s - 10.0s) */}
          {currentScene === 2 && (
            <div className="w-full h-full relative flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
              <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {/* 16:9 Input Thumbnail with Speaker Bounding Boxes */}
                <div className="relative w-48 sm:w-64 aspect-video rounded-xl bg-[#000B1D] border border-[#89CFF0]/25 overflow-hidden shadow-xl shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
                    alt="Speaker framing"
                    className="w-full h-full object-cover filter brightness-90"
                  />
                  <div className="absolute top-2 left-2 w-14 h-16 border-2 border-[#89CFF0] rounded pointer-events-none">
                    <span className="absolute -top-4 left-0 text-[8px] font-mono bg-[#89CFF0] text-black px-1 font-bold">
                      HOST
                    </span>
                  </div>
                  <div className="absolute top-4 right-3 w-14 h-16 border-2 border-[#0047AB] rounded pointer-events-none">
                    <span className="absolute -top-4 left-0 text-[8px] font-mono bg-[#0047AB] text-white px-1 font-bold">
                      GUEST
                    </span>
                  </div>
                </div>

                <div className="text-center font-mono text-xs text-[#89CFF0] flex flex-col items-center">
                  <Sparkles className="w-5 h-5 text-[#89CFF0] animate-spin" />
                  <span className="mt-1 text-[10px]">SPRING MORPH</span>
                  <ArrowRight className="w-4 h-4 text-[#89CFF0] rotate-90 sm:rotate-0" />
                </div>

                {/* 9:16 Output Phone Preview with Kinetic Captions */}
                <div className="relative w-36 sm:w-44 aspect-[9/16] rounded-xl bg-[#000B1D] border-2 border-[#89CFF0] shadow-[0_0_25px_rgba(137,207,240,0.3)] overflow-hidden flex flex-col justify-between p-2 shrink-0">
                  <div className="h-1/2 w-full rounded bg-[#030917] overflow-hidden relative mb-1">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                      alt="Speaker 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-1/2 w-full rounded bg-[#030917] overflow-hidden relative flex flex-col justify-end p-2">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80"
                      alt="Speaker 2"
                      className="absolute inset-0 w-full h-full object-cover filter brightness-85"
                    />
                    <div className="relative z-10 text-center font-display font-black text-[10px] sm:text-xs text-white uppercase tracking-wider">
                      <span className="text-[#89CFF0] underline">AUTONOMOUS</span> CLIPPING
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 3: Telegram Approval & Live Bounty Counter (10.0s - 15.0s) */}
          {currentScene === 3 && (
            <div className="w-full h-full relative flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
              <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {/* Telegram / Mobile Bot Mockup */}
                <div className="w-64 p-3.5 rounded-xl bg-[#000816] border border-[#89CFF0]/25 shadow-xl space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FFFFFF]">
                    <Smartphone className="w-3.5 h-3.5 text-[#89CFF0]" />
                    <span>Telegram Autopilot Bot</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#00040A] text-[11px] text-zinc-400 space-y-2 border border-[#89CFF0]/15">
                    <div className="font-semibold text-[#FFFFFF]">
                      Ready for Approval: Neural Indexing (98 Score)
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        className="flex-1 py-1 rounded bg-[#89CFF0] text-black font-semibold text-[10px] text-center hover:bg-white transition-colors"
                      >
                        ✓ Approve & Post
                      </button>
                      <button
                        type="button"
                        className="py-1 px-2.5 rounded bg-[#040C1E] text-zinc-300 text-[10px] border border-[#89CFF0]/25 hover:text-white"
                      >
                        Regen
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cash Bounty Earning Card with Live Counter */}
                <div className="w-64 p-3.5 rounded-xl bg-[#000816] border border-[#89CFF0]/50 shadow-[0_0_30px_rgba(0,71,171,0.35)] space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#FFFFFF] flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#89CFF0]" />
                      Verified Bounty
                    </span>
                    <span
                      ref={bountyAmountRef}
                      className="font-mono text-[#89CFF0] text-xs font-bold tabular-nums"
                    >
                      +$0.00
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    <span
                      ref={bountyViewsRef}
                      className="text-[#FFFFFF] font-mono font-medium tabular-nums"
                    >
                      0
                    </span>{" "}
                    Verified Sample Views @ $2.00 CPM Payout.
                  </div>
                  <div className="pt-1.5 border-t border-[#89CFF0]/15 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>Fee: 0% Wallet Reinvest</span>
                    <span className="text-[#89CFF0] font-semibold">READY TO WITHDRAW</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 15.00s Continuous Interactive Timeline Scrubber (Touch & Mouse Supported) */}
        <div className="px-4 sm:px-6 py-3 bg-[#00040A] border-t border-[#89CFF0]/15">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
            <span>00:00.00</span>
            <span
              ref={scrubberTextRef}
              className="text-[#89CFF0] font-semibold tabular-nums"
            >
              SCRUBBER: 0.00s / 15.00s
            </span>
            <span>00:15.00</span>
          </div>
          <div
            ref={scrubberRef}
            onMouseDown={handleScrubberMouseDown}
            onTouchStart={handleScrubberTouchStart}
            onTouchMove={handleScrubberTouchMove}
            onTouchEnd={handleScrubberTouchEnd}
            className="relative w-full h-3 bg-[#050D1E] rounded-full cursor-pointer overflow-hidden group touch-none"
          >
            {/* Played progress fill */}
            <div
              ref={scrubberFillRef}
              className="h-full bg-gradient-to-r from-[#0047AB] via-[#89CFF0] to-[#FFFFFF] rounded-full"
              style={{ width: "0%" }}
            />
            {/* Chapter demarcation ticks */}
            <div className="absolute top-0 bottom-0 left-[33.33%] w-[1px] bg-white/20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-[66.66%] w-[1px] bg-white/20 pointer-events-none" />
          </div>
        </div>

        {/* 3 Clickable Timeline Chapter Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-[#00040A]">
          {chapters.map((ch) => {
            const Icon = ch.icon;
            const isActive = currentScene === ch.step;
            const refToUse =
              ch.step === 1
                ? chapter1FillRef
                : ch.step === 2
                ? chapter2FillRef
                : chapter3FillRef;

            return (
              <button
                key={ch.step}
                type="button"
                onClick={() => jumpToChapter(ch.step)}
                className={`p-4 text-left transition-colors relative group border-t border-[#89CFF0]/15 ${
                  isActive ? "bg-[#030E26]" : "hover:bg-[#020712]"
                }`}
                aria-pressed={isActive}
              >
                {/* Active Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#00040A]">
                  <div
                    ref={refToUse}
                    className="h-full bg-[#89CFF0]"
                    style={{ width: "0%" }}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                      isActive
                        ? "bg-[#89CFF0] text-[#000000] border-[#89CFF0]"
                        : "bg-[#040C1E] text-zinc-400 border-[#89CFF0]/20"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-[#FFFFFF] flex items-center gap-1.5">
                      <span>{ch.title}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 font-sans">
                      {ch.description}
                    </p>
                    <span className="text-[10px] font-mono text-[#89CFF0] block pt-0.5">
                      {ch.timecode}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable Screen Modal for Full Pipeline Execution */}
      <div className="mt-8 flex justify-center">
        <ExpandableScreen
          layoutId="walkthrough-pipeline-specs"
          trigger={
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl bg-[#040C1E] hover:bg-[#0047AB]/30 border border-[#89CFF0]/25 text-[#89CFF0] hover:text-white text-xs font-mono font-medium flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Sliders className="w-3.5 h-3.5 text-[#89CFF0]" />
              <span>Expand Pipeline Telemetry Specs</span>
            </button>
          }
        >
          <div className="p-6 space-y-6 text-[#FFFFFF] bg-[#000816] rounded-2xl border border-[#89CFF0]/25">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#89CFF0]">
                FULL PIPELINE TELEMETRY
              </span>
              <h3 className="text-2xl font-display font-bold mt-1 text-[#FFFFFF]">
                Autonomous Studio Architecture
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Zero human-in-the-loop required from video ingestion to schedule dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-[#00040A] border border-[#89CFF0]/20 space-y-2">
                <span className="text-[#89CFF0] font-semibold">1. INGEST & DIARIZE</span>
                <p className="text-[11px] text-zinc-400 font-sans">
                  GPU-accelerated demuxing strips audio into Whisper-v3 timestamps, isolating speaker changes and silence boundaries.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#00040A] border border-[#89CFF0]/20 space-y-2">
                <span className="text-[#89CFF0] font-semibold">2. REFRAME & SUBTITLES</span>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Multi-head attention models identify active talker faces and generate dynamic 9:16 vertical split compositions.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#00040A] border border-[#89CFF0]/20 space-y-2">
                <span className="text-[#89CFF0] font-semibold">3. DISPATCH & BOUNTY</span>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Webhook triggers deliver mobile push notifications to Telegram, with 1-click approvals queuing direct API posts.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#89CFF0]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-mono text-zinc-400">
                Render SLA: Sub-60s on 1080p 60FPS Clips
              </span>

              <button
                type="button"
                onClick={() => {
                  onLoadWorkflowSample();
                }}
                className="btn-sharko-primary w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Sliders className="w-4 h-4" />
                <span>Execute This Pipeline in Studio</span>
              </button>
            </div>
          </div>
        </ExpandableScreen>
      </div>
    </div>
  );
}

export default HowItWorksWalkthrough;
