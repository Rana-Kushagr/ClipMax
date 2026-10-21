import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { BlurText } from "../react-bits/BlurText";
import { Magnet } from "../react-bits/Magnet";
import { ExpandableScreen } from "../ui/expandable-screen";

interface HowItWorksWalkthroughProps {
  onLoadWorkflowSample: () => void;
}

export function HowItWorksWalkthrough({
  onLoadWorkflowSample,
}: Readonly<HowItWorksWalkthroughProps>) {
  // 15.00-second loopable 60FPS timeline
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisibleRef = useRef<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number>(performance.now());

  // Determine current scene (1: 0-5s, 2: 5-10s, 3: 10-15s)
  const currentScene = currentTime < 5 ? 1 : currentTime < 10 ? 2 : 3;

  // Track section visibility to pause animation loops when off-screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 60FPS high-precision timeline loop (paused when off-screen)
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (isPlaying && isVisibleRef.current && !isDraggingRef.current) {
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= 15) {
            return 0; // Seamless loop at 15.0s
          }
          return next;
        });
      }

      animId = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Audio waveform & spectral radar canvas rendering for Scene 1 (paused when off-screen)
  useEffect(() => {
    if (currentScene !== 1 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = currentTime * 3;

    const draw = () => {
      if (!isVisibleRef.current) {
        animId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const bars = 52;
      const barWidth = width / bars - 2;

      t += 0.04;

      for (let i = 0; i < bars; i++) {
        const isPeak = [7, 16, 25, 34, 42, 49].includes(i);
        const wave = Math.sin(t + i * 0.28) * 10;
        const baseHeight = isPeak
          ? height * 0.78 + wave
          : 12 + ((i * 13) % (height * 0.42)) + wave * 0.25;
        const clampedHeight = Math.max(6, Math.min(height - 4, baseHeight));

        const x = i * (barWidth + 2);
        const y = height - clampedHeight;

        if (isPeak) {
          ctx.fillStyle = "#F3E5AB";
          ctx.shadowColor = "rgba(243, 229, 171, 0.75)";
          ctx.shadowBlur = 12;
        } else {
          ctx.fillStyle = "rgba(217, 155, 82, 0.35)";
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, clampedHeight, 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [currentScene, currentTime]);

  // Interactive scrubber handlers
  const handleScrubberChange = useCallback((clientX: number) => {
    if (!scrubberRef.current) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setCurrentTime(ratio * 15);
  }, []);

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

  const jumpToChapter = (sceneNum: number) => {
    setCurrentTime((sceneNum - 1) * 5);
    lastTimeRef.current = performance.now();
  };

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

  // Live calculated earnings for Scene 3: climbs from $0.00 to +$240.00 based on time in scene
  const scene3Fraction = Math.max(0, Math.min(1, (currentTime - 10) / 5));
  const currentBountyViews = Math.floor(scene3Fraction * 120000);
  const currentBountyAmount = (scene3Fraction * 240).toFixed(2);

  return (
    <section
      ref={sectionRef}
      id="walkthrough"
      className="relative z-10 py-16 px-4 sm:px-6 max-w-[1240px] mx-auto select-none"
      aria-label="Cinema Walkthrough Player"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E1710]/90 border border-[#F3E5AB]/20 text-[#F3E5AB] text-xs font-mono font-medium mb-3 shadow-lg">
          <Sparkle className="w-3.5 h-3.5 text-[#D99B52]" />
          <span>CINEMA WALKTHROUGH PLAYER 60FPS</span>
        </div>
        <BlurText
          text="How ClipMax works in three simple steps."
          italicWords={["three", "simple"]}
          as="h2"
          className="font-display font-bold text-2xl sm:text-4xl text-[#F4F4F6] tracking-tight"
        />
        <p className="text-[#A1A1AA] text-sm sm:text-base mt-2 font-sans">
          Engineered with studio clarity so anyone can create viral shorts and claim escrow bounties in seconds.
        </p>
      </div>

      {/* Main Walkthrough Console Surface */}
      <div className="relative rounded-2xl bg-[#1E1710]/85 backdrop-blur-xl border border-[#F3E5AB]/15 shadow-[0_24px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Top Player Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#17120C]/90 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[#F4F4F6] font-semibold tracking-wide">
              AUTONOMOUS MOTION ENGINE
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="font-mono text-[#D99B52] font-semibold hidden sm:inline tabular-nums">
              {currentTime.toFixed(2)}s / 15.00s
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="font-mono text-[#F3E5AB]/75 hidden sm:inline">
              SCENE {currentScene}/3: {chapters[currentScene - 1].title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-[#2A2016] hover:bg-[#382B1E] border border-[#F3E5AB]/20 text-[#F3E5AB] hover:text-white transition-colors"
              aria-label={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              type="button"
              onClick={() => jumpToChapter(1)}
              className="p-1.5 rounded-lg bg-[#2A2016] hover:bg-[#382B1E] border border-[#F3E5AB]/20 text-[#F3E5AB] hover:text-white transition-colors"
              aria-label="Restart walkthrough"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-[#2A2016] hover:bg-[#382B1E] border border-[#F3E5AB]/20 text-[#F3E5AB] hover:text-white transition-colors"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Video / Motion Graphic Interactive Canvas Stage */}
        <div className="relative aspect-video w-full bg-[#110D09] flex items-center justify-center overflow-hidden p-4 sm:p-8">
          <div className="w-full h-full max-w-4xl flex items-center justify-center relative select-none">
            {/* SCENE 1 (0.0s - 5.0s): Universal Link Ingestion & Spectral Radar Scan */}
            {currentScene === 1 && (
              <div className="w-full max-w-2xl flex flex-col items-center justify-center space-y-6 text-center animate-fadeIn">
                <div className="relative w-full p-4 rounded-xl bg-[#1E1710] border border-[#F3E5AB]/20 shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2A2016] border border-[#F3E5AB]/20 flex items-center justify-center text-[#F3E5AB] font-bold">
                    <Video className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-[11px] text-[#A1A1AA] font-mono">INGESTING 4K STREAM:</div>
                    <div className="text-sm font-semibold text-[#F4F4F6] truncate font-sans">
                      https://youtube.com/watch?v=LexFridman_AI_Architecture_DeepDive
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-[#17120C] border border-[#F3E5AB]/20 text-[#10B981] font-mono text-xs font-semibold shrink-0">
                    2h 14m DETECTED
                  </div>
                </div>

                {/* 60FPS Live Waveform Peak Detection Scan Canvas */}
                <div className="w-full bg-[#1E1710] p-4 rounded-xl border border-[#F3E5AB]/20 space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-mono text-[#A1A1AA]">
                    <span className="flex items-center gap-2 text-[#F4F4F6]">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      SPECTRAL AUDIO SCAN (0 credits burned)
                    </span>
                    <span className="text-[#F3E5AB] font-semibold">6 VIRAL HOOKS PINPOINTED</span>
                  </div>
                  <div className="h-16 w-full bg-[#17120C] rounded-lg overflow-hidden p-1 flex items-center border border-[#F3E5AB]/10">
                    <canvas
                      ref={canvasRef}
                      width={620}
                      height={58}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 2 (5.0s - 10.0s): 16:9 to 9:16 Spring Slicing & Kinetic Captions */}
            {currentScene === 2 && (
              <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn">
                {/* 16:9 Source */}
                <div className="w-56 aspect-video bg-[#1E1710] rounded-xl border border-[#F3E5AB]/20 p-2 flex flex-col justify-between text-[10px] text-[#A1A1AA] opacity-80">
                  <span className="font-mono text-[#D99B52]">ORIGINAL 16:9 WIDE</span>
                  <div className="flex justify-around items-center h-16">
                    <div className="w-10 h-10 rounded-full bg-[#2A2016] border border-[#F3E5AB]/20 flex items-center justify-center text-xs">
                      <Mic className="w-4 h-4 text-[#F3E5AB]" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#2A2016] border border-[#F3E5AB]/20 flex items-center justify-center text-xs">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="text-center font-mono text-[9px] text-[#A1A1AA]">HORIZONTAL FEED</span>
                </div>

                <ArrowRight className="w-5 h-5 text-[#D99B52] hidden sm:block shrink-0 animate-pulse" />

                {/* 9:16 Vertical Reframed Output Phone */}
                <div className="w-48 aspect-[9/16] bg-[#1E1710] rounded-2xl border-2 border-[#10B981]/70 shadow-[0_0_35px_rgba(16,185,129,0.25)] p-2 relative flex flex-col justify-between overflow-hidden">
                  {/* Top score badge */}
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-[#10B981] text-black text-[10px] font-mono font-bold shadow">
                    98 VIRAL
                  </div>

                  {/* Stacked 2-speaker split */}
                  <div className="h-1/2 w-full rounded-lg bg-[#2A2016] flex items-center justify-center relative overflow-hidden mb-1 border border-[#F3E5AB]/10">
                    <div className="w-10 h-10 rounded-full bg-[#17120C] border border-[#F3E5AB]/20 flex items-center justify-center text-sm">
                      <Mic className="w-4 h-4 text-[#F3E5AB]" />
                    </div>
                  </div>

                  <div className="h-1/2 w-full rounded-lg bg-[#2A2016] flex items-center justify-center relative overflow-hidden border border-[#F3E5AB]/10">
                    <div className="w-10 h-10 rounded-full bg-[#17120C] border border-[#F3E5AB]/20 flex items-center justify-center text-sm">
                      <User className="w-4 h-4 text-white" />
                    </div>

                    {/* Kinetic Caption Overlay */}
                    <div className="absolute bottom-3 left-1 right-1 text-center font-display font-black text-xs text-white uppercase italic tracking-wider drop-shadow-md">
                      <span className="text-[#10B981] underline">SYSTEMS</span> SCALE FAST
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCENE 3 (10.0s - 15.0s): Telegram Bot Approval & Live Bounty Counter */}
            {currentScene === 3 && (
              <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn">
                {/* Telegram / Mobile Bot Mockup */}
                <div className="w-64 p-3.5 rounded-xl bg-[#1E1710] border border-[#F3E5AB]/20 shadow-xl space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F4F4F6]">
                    <Smartphone className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Telegram Autopilot Bot</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#17120C] text-[11px] text-[#A1A1AA] space-y-2 border border-[#F3E5AB]/10">
                    <div className="font-semibold text-[#F4F4F6]">
                      Ready for Approval: Neural Indexing (98 Score)
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        className="flex-1 py-1 rounded bg-[#F3E5AB] text-[#17120C] font-semibold text-[10px] text-center hover:bg-white transition-colors"
                      >
                        ✓ Approve & Post
                      </button>
                      <button
                        type="button"
                        className="py-1 px-2.5 rounded bg-[#2A2016] text-[#A1A1AA] text-[10px] border border-[#F3E5AB]/20 hover:text-white"
                      >
                        Regen
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cash Bounty Earning Card with Live Counter */}
                <div className="w-64 p-3.5 rounded-xl bg-[#1E1710] border border-[#10B981]/50 shadow-[0_0_30px_rgba(16,185,129,0.2)] space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F4F4F6] flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#10B981]" />
                      Verified Bounty
                    </span>
                    <span className="font-mono text-[#10B981] text-xs font-bold tabular-nums">
                      +${currentBountyAmount}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A1A1AA]">
                    <span className="text-[#F4F4F6] font-mono font-medium tabular-nums">{currentBountyViews.toLocaleString()}</span> Verified Sample Views @ $2.00 CPM Payout.
                  </div>
                  <div className="pt-1.5 border-t border-[#F3E5AB]/10 flex items-center justify-between text-[10px] font-mono text-[#A1A1AA]">
                    <span>Fee: 0% Wallet Reinvest</span>
                    <span className="text-[#10B981] font-semibold">READY TO WITHDRAW</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 15.00s Continuous Interactive Timeline Scrubber */}
        <div className="px-4 sm:px-6 py-3 bg-[#17120C] border-t border-[#F3E5AB]/10">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#A1A1AA] mb-1.5">
            <span>00:00.00</span>
            <span className="text-[#F3E5AB] font-semibold tabular-nums">
              SCRUBBER: {currentTime.toFixed(2)}s / 15.00s
            </span>
            <span>00:15.00</span>
          </div>
          <div
            ref={scrubberRef}
            onMouseDown={handleScrubberMouseDown}
            className="relative w-full h-2.5 bg-[#2A2016] rounded-full cursor-pointer overflow-hidden group"
          >
            {/* Played progress fill */}
            <div
              className="h-full bg-gradient-to-r from-[#10B981] via-[#D99B52] to-[#F3E5AB] rounded-full"
              style={{ width: `${(currentTime / 15) * 100}%` }}
            />
            {/* Chapter demarcation ticks */}
            <div className="absolute top-0 bottom-0 left-[33.33%] w-[1px] bg-white/20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 left-[66.66%] w-[1px] bg-white/20 pointer-events-none" />
          </div>
        </div>

        {/* 3 Clickable Timeline Chapter Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 bg-[#17120C]">
          {chapters.map((ch) => {
            const Icon = ch.icon;
            const isActive = currentScene === ch.step;
            const sceneStart = (ch.step - 1) * 5;
            const sceneProgress = Math.max(0, Math.min(100, ((currentTime - sceneStart) / 5) * 100));

            return (
              <button
                key={ch.step}
                type="button"
                onClick={() => jumpToChapter(ch.step)}
                className={`p-4 text-left transition-colors relative group border-t border-[#F3E5AB]/10 ${
                  isActive ? "bg-[#2A2016]/90" : "hover:bg-[#1E1710]"
                }`}
                aria-pressed={isActive}
              >
                {/* Active Progress Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#17120C]">
                    <div
                      className="h-full bg-[#F3E5AB] transition-all duration-75 ease-linear"
                      style={{ width: `${sceneProgress}%` }}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                        isActive
                          ? "bg-[#F3E5AB] text-[#17120C] font-mono font-bold"
                          : "bg-[#2A2016] text-[#A1A1AA] border border-[#F3E5AB]/20"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-display font-semibold text-xs text-[#F4F4F6]">
                      {ch.title}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#A1A1AA]">
                    {ch.timecode}
                  </span>
                </div>

                <p className="text-[11px] text-[#A1A1AA] leading-snug line-clamp-2 font-sans">
                  {ch.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Direct Action Footer with Cult UI ExpandableScreen */}
        <div className="p-4 bg-[#1E1710] flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#F3E5AB]/10">
          <span className="text-xs text-[#A1A1AA] font-sans">
            Ready to test this exact autonomous pipeline on your own videos?
          </span>

          <ExpandableScreen
            layoutId="cinema-workflow-modal"
            trigger={
              <Magnet strength={0.2} radius={45}>
                <div className="px-4 py-2 rounded-lg bg-[#F3E5AB] hover:bg-white text-[#17120C] font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95">
                  <span>Try This Exact Workflow Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Magnet>
            }
          >
            {/* Expanded Modal Content */}
            <div className="space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] font-mono text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>PIPELINE SPECIFICATION READY</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-[#F4F4F6]">
                  Launch Autonomous Pipeline: Lex Fridman #387 DeepDive
                </h3>
                <p className="text-xs text-[#A1A1AA] font-sans leading-relaxed">
                  ClipMax will ingest the 2h 14m podcast, detect speakers, extract the top 6 hook climaxes, style 9:16 vertical kinetic subtitles, and push to your Telegram queue.
                </p>
              </div>

              {/* 3 Step Pipeline Setup */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-[#2A2016] border border-[#F3E5AB]/15 space-y-1.5">
                  <div className="text-[10px] font-mono text-[#D99B52] uppercase">Step 1 • Ingest</div>
                  <div className="text-xs font-semibold text-white">4K Longform Stream</div>
                  <p className="text-[11px] text-[#A1A1AA]">2h 14m cached at zero credit cost</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#2A2016] border border-[#F3E5AB]/15 space-y-1.5">
                  <div className="text-[10px] font-mono text-[#D99B52] uppercase">Step 2 • Slicing</div>
                  <div className="text-xs font-semibold text-white">Dual-Speaker 9:16</div>
                  <p className="text-[11px] text-[#A1A1AA]">Auto face-track + kinetic subtitles</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#2A2016] border border-[#F3E5AB]/15 space-y-1.5">
                  <div className="text-[10px] font-mono text-[#D99B52] uppercase">Step 3 • Output</div>
                  <div className="text-xs font-semibold text-white">Telegram + Escrow</div>
                  <p className="text-[11px] text-[#A1A1AA]">1-click approve or earn $2/1K views</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#F3E5AB]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-mono text-[#10B981]">
                  Guarantee: 0 credits burned on preview or ranking.
                </span>

                <button
                  type="button"
                  onClick={() => {
                    onLoadWorkflowSample();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#10B981]/20 active:scale-95"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Execute This Pipeline in Studio</span>
                </button>
              </div>
            </div>
          </ExpandableScreen>
        </div>
      </div>
    </section>
  );
}
