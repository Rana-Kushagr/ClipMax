"use client";

import React, { useEffect, useRef } from "react";

interface CinemaStageBackgroundProps {
  isInputActive?: boolean;
}

export function CinemaStageBackground({ isInputActive = false }: CinemaStageBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // 5 harmonic audio-waveform lines (Cobalt and Emerald)
    const harmonicWaves = [
      { color: "rgba(59, 130, 246, 0.24)", freq: 0.007, baseAmp: 30, speed: 0.02, phase: 0 },
      { color: "rgba(16, 185, 129, 0.20)", freq: 0.011, baseAmp: 22, speed: 0.025, phase: 1.2 },
      { color: "rgba(59, 130, 246, 0.18)", freq: 0.005, baseAmp: 38, speed: 0.015, phase: 2.5 },
      { color: "rgba(16, 185, 129, 0.16)", freq: 0.014, baseAmp: 18, speed: 0.03, phase: 3.8 },
      { color: "rgba(99, 102, 241, 0.18)", freq: 0.009, baseAmp: 26, speed: 0.018, phase: 4.9 },
    ];

    // Peak viral markers along the wave
    const clipPeakMarkers = [
      { xPct: 0.18, label: "94 VIRAL" },
      { xPct: 0.35, label: "98 VIRAL" },
      { xPct: 0.52, label: "92 VIRAL" },
      { xPct: 0.72, label: "88 HIGH" },
      { xPct: 0.88, label: "85 HIGH" },
    ];

    let time = 0;
    let isVisible = true;

    // IntersectionObserver to pause loop when canvas is scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      if (!isVisible || prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep multi-depth stage radial spotlight
      const radialGradient = ctx.createRadialGradient(
        width / 2,
        height * 0.32,
        40,
        width / 2,
        height * 0.36,
        width * 0.75
      );
      radialGradient.addColorStop(0, "rgba(22, 31, 51, 0.55)");
      radialGradient.addColorStop(0.5, "rgba(11, 15, 23, 0.85)");
      radialGradient.addColorStop(1, "rgba(7, 9, 14, 1)");

      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      time += isInputActive ? 0.045 : 0.02;
      const centerY = height * 0.38;

      // Draw 5 Harmonic Waveform Lines
      harmonicWaves.forEach((wave, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = isInputActive ? 1.5 : 1;

        const effectiveAmp = isInputActive ? wave.baseAmp * 1.5 : wave.baseAmp;
        const effectiveFreq = isInputActive ? wave.freq * 1.3 : wave.freq;

        for (let x = 0; x < width; x += 8) {
          const envelope = Math.sin((x / width) * Math.PI); // Pinches at gutters
          const y =
            centerY +
            Math.sin(x * effectiveFreq + time * wave.speed + wave.phase) *
              effectiveAmp *
              envelope;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Highlight peak clip markers on primary wave
        if (idx === 0) {
          clipPeakMarkers.forEach((marker) => {
            const markerX = width * marker.xPct;
            const markerEnvelope = Math.sin((markerX / width) * Math.PI);
            const markerY =
              centerY +
              Math.sin(markerX * effectiveFreq + time * wave.speed + wave.phase) *
                effectiveAmp *
                markerEnvelope;

            // Draw glowing marker point
            ctx.beginPath();
            ctx.fillStyle = isInputActive ? "#10B981" : "#3B82F6";
            ctx.arc(markerX, markerY, isInputActive ? 3.5 : 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Glow ring
            ctx.beginPath();
            ctx.strokeStyle = isInputActive
              ? "rgba(16, 185, 129, 0.4)"
              : "rgba(59, 130, 246, 0.3)";
            ctx.lineWidth = 1;
            ctx.arc(markerX, markerY, isInputActive ? 7 : 5, 0, Math.PI * 2);
            ctx.stroke();
          });
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInputActive]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Living Harmonic Waveform Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Layer 2: Architectural SMPTE Timecode Rulers & 9:16 Safe Frame Guides */}
      <div className="hidden lg:flex fixed left-5 top-24 bottom-12 flex-col justify-between text-[10px] font-mono text-text-muted/60 select-none z-10 border-l border-white/[0.06] pl-2.5">
        <div className="space-y-1">
          <div className="text-primary font-semibold tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse-subtle inline-block" />
            <span>SMPTE 00:00:00:00</span>
          </div>
          <div>29.97 FPS NTSC DROP</div>
          <div className="text-text-muted/50">TIMELINE SCAN: READY</div>
        </div>

        {/* 9:16 safe-zone vertical crop corner bracket */}
        <div className="py-4 space-y-2 border-y border-white/[0.04] my-auto">
          <div className="text-[9px] text-text-muted/70 tracking-widest uppercase">
            9:16 SAFE ZONE
          </div>
          <div className="w-12 h-20 border border-dashed border-primary/30 rounded-sm relative flex items-center justify-center">
            <span className="text-[8px] text-accent font-bold">1080×1920</span>
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-accent" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-accent" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-accent" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-accent" />
          </div>
          <div className="text-[9px] text-accent/80 font-semibold">CROP LOCKED</div>
        </div>

        <div className="space-y-1 text-text-muted/50">
          <div>PEAK BUFFER: 64MB</div>
          <div>LATENCY: 18ms</div>
          <div className="text-accent/80">OUTPUT-ONLY METER</div>
        </div>
      </div>

      <div className="hidden lg:flex fixed right-5 top-24 bottom-12 flex-col justify-between items-end text-[10px] font-mono text-text-muted/60 select-none z-10 border-r border-white/[0.06] pr-2.5 text-right">
        <div className="space-y-1">
          <div className="text-accent font-semibold tracking-wider">
            VIRAL HARMONICS
          </div>
          <div>DIARIZATION ACTIVE</div>
          <div className="text-text-muted/50">WHISPER-V3 DUAL</div>
        </div>

        {/* Live Audio dB Ticks */}
        <div className="py-4 space-y-1.5 my-auto flex flex-col items-end">
          <div className="text-[9px] text-text-muted/70 tracking-widest">
            AUDIO PEAK
          </div>
          <div className="flex items-end gap-1 h-16">
            <div className="w-1 h-12 bg-surface-subtle rounded-t overflow-hidden flex flex-col justify-end">
              <div className="w-full h-8 bg-gradient-to-t from-accent via-accent/80 to-warning" />
            </div>
            <div className="w-1 h-12 bg-surface-subtle rounded-t overflow-hidden flex flex-col justify-end">
              <div className="w-full h-10 bg-gradient-to-t from-accent via-primary to-warning" />
            </div>
          </div>
          <div className="text-[8px] text-text-muted/60">-12dB / 0dB PEAK</div>
        </div>

        <div className="space-y-1 text-text-muted/50">
          <div>AV1 / H.265 HW</div>
          <div>WATERMARK: NONE</div>
          <div className="text-primary font-medium">100% ROLLOVER</div>
        </div>
      </div>

      {/* Layer 3: Oversized Embossed CLIPMAX Studio Watermark */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.035] font-display font-extrabold text-[clamp(4.5rem,15vw,14rem)] tracking-tighter text-white whitespace-nowrap pointer-events-none studio-emboss">
        CLIPMAX
      </div>

      {/* Subtle Studio Reticle Grid */}
      <div className="absolute inset-0 studio-grid-subtle opacity-30" />
    </div>
  );
}
