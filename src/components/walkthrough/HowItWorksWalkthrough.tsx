import React, { useState, useEffect, useRef } from "react";
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
import { BlurText } from "../react-bits/BlurText";
import { Magnet } from "../react-bits/Magnet";

type StepNumber = 1 | 2 | 3;

interface HowItWorksWalkthroughProps {
  onLoadWorkflowSample: () => void;
}

export function HowItWorksWalkthrough({
  onLoadWorkflowSample,
}: Readonly<HowItWorksWalkthroughProps>) {
  const [activeStep, setActiveStep] = useState<StepNumber>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [stepProgress, setStepProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 15-second chapter timer: 5s per step (50ms interval => 100 ticks = 5s)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setStepProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((curr) => (curr === 3 ? 1 : ((curr + 1) as 1 | 2 | 3)));
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Live 60FPS HTML5 Canvas Audio Waveform & Peak Scan Animation (Step 1)
  useEffect(() => {
    if (activeStep !== 1 || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const bars = 56;
      const barWidth = width / bars - 2;

      t += 0.05;

      for (let i = 0; i < bars; i++) {
        const isPeak = [8, 17, 26, 35, 43, 50].includes(i);
        const wave = Math.sin(t + i * 0.25) * 12;
        const baseHeight = isPeak ? height * 0.75 + wave : 15 + ((i * 11) % (height * 0.45)) + wave * 0.3;
        const clampedHeight = Math.max(8, Math.min(height - 6, baseHeight));

        const x = i * (barWidth + 2);
        const y = height - clampedHeight;

        if (isPeak) {
          ctx.fillStyle = "#10B981";
          ctx.shadowColor = "rgba(16, 185, 129, 0.6)";
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
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
  }, [activeStep]);

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
      className="relative z-10 py-16 px-4 sm:px-6 max-w-[1240px] mx-auto"
      aria-label="How ClipMax Works Walkthrough"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1014] border border-white/[0.08] text-text-secondary text-xs font-medium mb-3 shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Interactive 15-Second 60FPS Walkthrough Stage</span>
        </div>
        <BlurText
          text="How ClipMax works in three simple steps."
          italicWord="three"
          as="h2"
          className="font-display font-bold text-2xl sm:text-4xl text-[#F4F4F6] tracking-tight"
        />
        <p className="text-text-secondary text-sm sm:text-base mt-2 font-sans">
          Engineered with studio clarity so anyone can create viral shorts and earn bounties in seconds.
        </p>
      </div>

      {/* Main Walkthrough Card Container */}
      <div className="relative rounded-2xl bg-[#0E1014] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top Player Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#12151B] border-b border-white/[0.07] text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-white font-semibold">
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
              className="p-1.5 rounded-md bg-[#08090B] hover:bg-[#161920] border border-white/[0.08] text-text-secondary hover:text-white transition-colors"
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
              className="p-1.5 rounded-md bg-[#08090B] hover:bg-[#161920] border border-white/[0.08] text-text-secondary hover:text-white transition-colors"
              aria-label="Restart walkthrough"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-md bg-[#08090B] hover:bg-[#161920] border border-white/[0.08] text-text-secondary hover:text-white transition-colors"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Video / Motion Graphic Interactive Canvas Stage */}
        <div className="relative aspect-video w-full bg-[#040507] flex items-center justify-center overflow-hidden p-4 sm:p-8">
          <div className="w-full h-full max-w-4xl flex items-center justify-center relative select-none">
            {/* STEP 1 MOTION GRAPHIC: Universal Link Ingestion & Peak Detection */}
            {activeStep === 1 && (
              <div className="w-full max-w-2xl flex flex-col items-center justify-center space-y-6 text-center animate-fadeIn">
                <div className="relative w-full p-4 rounded-xl bg-[#0E1014] border border-white/[0.08] shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#161920] border border-white/[0.08] flex items-center justify-center text-white font-bold">
                    <Video className="w-4 h-4 text-[#10B981]" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-text-muted font-mono">INGESTING STREAM:</div>
                    <div className="text-sm font-semibold text-white truncate font-sans">
                      https://youtube.com/watch?v=SystemArchitecture_Discussion
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-[#08090B] border border-white/[0.08] text-[#10B981] font-mono text-xs font-semibold">
                    2h 14m DETECTED
                  </div>
                </div>

                {/* 60FPS Live Waveform Peak Detection Scan Canvas */}
                <div className="w-full bg-[#0E1014] p-4 rounded-xl border border-white/[0.08] space-y-2">
                  <div className="flex justify-between text-xs font-mono text-text-muted">
                    <span>AUDIO TIMELINE SCAN (0 credits burned)</span>
                    <span className="text-[#10B981] font-semibold">6 VIRAL HOOKS PINPOINTED</span>
                  </div>
                  <div className="h-16 w-full bg-[#040507] rounded-lg overflow-hidden p-1 flex items-center">
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

            {/* STEP 2 MOTION GRAPHIC: 16:9 to 9:16 Reframe & Kinetic Captions */}
            {activeStep === 2 && (
              <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn">
                {/* 16:9 Source */}
                <div className="w-56 aspect-video bg-[#0E1014] rounded-xl border border-white/[0.08] p-2 flex flex-col justify-between text-[10px] text-text-muted opacity-80">
                  <span className="font-mono">ORIGINAL 16:9 WIDE</span>
                  <div className="flex justify-around items-center h-16">
                    <div className="w-10 h-10 rounded-full bg-[#161920] border border-white/[0.08] flex items-center justify-center text-xs">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#161920] border border-white/[0.08] flex items-center justify-center text-xs">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <span className="text-center font-mono text-[9px]">HORIZONTAL FEED</span>
                </div>

                <ArrowRight className="w-5 h-5 text-white/40 hidden sm:block shrink-0" />

                {/* 9:16 Vertical Reframed Output Phone */}
                <div className="w-48 aspect-[9/16] bg-[#161920] rounded-2xl border-2 border-[#10B981]/60 shadow-[0_0_30px_rgba(16,185,129,0.2)] p-2 relative flex flex-col justify-between overflow-hidden">
                  {/* Top score badge */}
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-[#10B981] text-black text-[10px] font-mono font-bold shadow">
                    98 VIRAL
                  </div>

                  {/* Stacked 2-speaker split */}
                  <div className="h-1/2 w-full rounded-lg bg-[#0E1014] flex items-center justify-center relative overflow-hidden mb-1 border border-white/[0.07]">
                    <div className="w-10 h-10 rounded-full bg-[#161920] border border-white/[0.08] flex items-center justify-center text-sm">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="h-1/2 w-full rounded-lg bg-[#0E1014] flex items-center justify-center relative overflow-hidden border border-white/[0.07]">
                    <div className="w-10 h-10 rounded-full bg-[#161920] border border-white/[0.08] flex items-center justify-center text-sm">
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

            {/* STEP 3 MOTION GRAPHIC: 1-Click Mobile Bot Approval & Cash Bounties */}
            {activeStep === 3 && (
              <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-center gap-6 animate-fadeIn">
                {/* Telegram / Mobile Bot Mockup */}
                <div className="w-64 p-3 rounded-xl bg-[#0E1014] border border-white/[0.08] shadow-xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                    <Smartphone className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Telegram Autopilot Bot</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#08090B] text-[11px] text-text-secondary space-y-2 border border-white/[0.06]">
                    <div className="font-semibold text-white">
                      Ready for Approval: Database Performance & Indexing (98 Score)
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        className="flex-1 py-1 rounded bg-white text-black font-semibold text-[10px] text-center"
                      >
                        ✓ Approve & Post
                      </button>
                      <button
                        type="button"
                        className="py-1 px-2.5 rounded bg-[#161920] text-text-secondary text-[10px] border border-white/[0.08]"
                      >
                        Regen
                      </button>
                    </div>
                  </div>
                </div>

                {/* Cash Bounty Earning Card */}
                <div className="w-64 p-3 rounded-xl bg-[#0E1014] border border-[#10B981]/40 shadow-[0_0_25px_rgba(16,185,129,0.15)] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-[#10B981]" />
                      Verified Bounty
                    </span>
                    <span className="font-mono text-[#10B981] text-[11px] font-bold">
                      +$240.00
                    </span>
                  </div>
                  <div className="text-[11px] text-text-secondary">
                    120,000 Verified Sample Views @ $2.00 CPM Payout.
                  </div>
                  <div className="pt-1.5 border-t border-white/[0.07] flex items-center justify-between text-[10px] font-mono text-text-muted">
                    <span>Fee: 0% Wallet Reinvest</span>
                    <span className="text-[#10B981] font-semibold">READY TO WITHDRAW</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3 Clickable Timeline Chapter Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t divide-y md:divide-y-0 md:divide-x divide-white/[0.08] bg-[#12151B]">
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
                  isActive ? "bg-[#161920]" : "hover:bg-[#0E1014]"
                }`}
                aria-pressed={isActive}
              >
                {/* Active Progress Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#12151B]">
                    <div
                      className="h-full bg-[#10B981] transition-all duration-100 ease-linear"
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
                          : "bg-[#08090B] text-text-muted border border-white/[0.08]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-display font-semibold text-xs text-[#F4F4F6]">
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

        {/* Direct Action Footer with Magnet */}
        <div className="p-4 bg-[#0E1014] flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.07]">
          <span className="text-xs text-text-muted font-sans">
            Want to see how your own videos look with 98-virality auto-framing?
          </span>
          <Magnet strength={0.2} radius={45}>
            <button
              type="button"
              onClick={onLoadWorkflowSample}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white hover:bg-[#F4F4F6] text-[#08090B] font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
            >
              <span>Try This Exact Workflow Now</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
