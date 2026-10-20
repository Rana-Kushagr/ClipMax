"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface CinemaStageBackgroundProps {
  isInputActive?: boolean;
}

export function CinemaStageBackground({ isInputActive = false }: CinemaStageBackgroundProps) {
  const [scrollY, setScrollY] = useState(0);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const bgImageUrl = `${basePath}/hero-bg.webp`;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Bespoke 16:9 Cinema Studio Photograph Base */}
      <div
        className="absolute inset-0 w-full h-[120vh] -top-10 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
        }}
      >
        <Image
          src={bgImageUrl}
          alt="Cinema Stage Studio Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-35"
        />
      </div>

      {/* Layer 2: Multi-Stop Studio Vignette Scrim (Guarantees Razor-Sharp Text Contrast) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 50% 24%, rgba(8, 9, 12, 0.75) 0%, rgba(8, 9, 12, 0.92) 65%, #08090C 100%), linear-gradient(180deg, rgba(8, 9, 12, 0.45) 0%, #08090C 95%)",
        }}
      />

      {/* Layer 3: Oversized Embossed CLIPMAX Studio Watermark */}
      <div className="absolute top-[18%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center pointer-events-none">
        <span
          className="font-display font-black text-[clamp(4.5rem,14vw,12rem)] tracking-[-0.05em] text-white/[0.03] uppercase whitespace-nowrap studio-emboss"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)",
          }}
        >
          CLIPMAX
        </span>
      </div>

      {/* Layer 4: Architectural 1240px Hairline Rails & Corner Crosshairs */}
      <div className="relative max-w-[1240px] h-full mx-auto border-l border-r border-white/[0.06] hidden md:block">
        {/* Top left and right corner crosshair ticks */}
        <div className="absolute top-20 -left-[5px] text-[10px] font-mono text-white/20 select-none leading-none">
          +
        </div>
        <div className="absolute top-20 -right-[5px] text-[10px] font-mono text-white/20 select-none leading-none">
          +
        </div>
        <div className="absolute top-1/2 -left-[5px] text-[10px] font-mono text-white/20 select-none leading-none">
          +
        </div>
        <div className="absolute top-1/2 -right-[5px] text-[10px] font-mono text-white/20 select-none leading-none">
          +
        </div>
        <div className="absolute bottom-20 -left-[5px] text-[10px] font-mono text-white/20 select-none leading-none">
          +
        </div>
        <div className="absolute bottom-20 -right-[5px] text-[10px] font-mono text-white/20 select-none leading-none">
          +
        </div>
      </div>

      {/* Left Cinema Studio Broadcast Rail */}
      <div className="hidden xl:flex fixed left-6 top-28 bottom-12 flex-col justify-between text-[10px] font-mono text-text-muted/60 select-none z-10 border-l border-white/[0.06] pl-3">
        <div className="space-y-1">
          <div className="text-white/80 font-medium tracking-wider flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full inline-block ${
                isInputActive ? "bg-accent animate-pulse" : "bg-emerald"
              }`}
            />
            <span>SMPTE 00:00:00:00</span>
          </div>
          <div>29.97 FPS NTSC DROP</div>
          <div className="text-text-muted/40">TIMELINE: ARRI RAW</div>
        </div>

        {/* 9:16 safe-zone vertical crop bracket */}
        <div className="py-4 space-y-2 border-y border-white/[0.04] my-auto">
          <div className="text-[9px] text-text-muted/70 tracking-widest uppercase">
            9:16 SAFE ZONE
          </div>
          <div className="w-12 h-20 border border-dashed border-white/20 rounded-sm relative flex items-center justify-center bg-white/[0.01]">
            <span className="text-[8px] text-white/70 font-mono">1080×1920</span>
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/40" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/40" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/40" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/40" />
          </div>
          <div className="text-[9px] text-accent font-medium">AUTOFRAME ON</div>
        </div>

        <div className="space-y-1 text-text-muted/40">
          <div>BUFFER: 64MB HW</div>
          <div>LATENCY: 14ms</div>
          <div className="text-emerald">OUTPUT-ONLY METER</div>
        </div>
      </div>

      {/* Right Cinema Studio Broadcast Rail */}
      <div className="hidden xl:flex fixed right-6 top-28 bottom-12 flex-col justify-between items-end text-[10px] font-mono text-text-muted/60 select-none z-10 border-r border-white/[0.06] pr-3 text-right">
        <div className="space-y-1">
          <div className="text-white/80 font-medium tracking-wider">
            VIRAL HARMONICS
          </div>
          <div>DIARIZATION ACTIVE</div>
          <div className="text-text-muted/40">WHISPER-V3 DUAL</div>
        </div>

        {/* Studio Peak Audio Meter */}
        <div className="py-4 space-y-1.5 my-auto flex flex-col items-end">
          <div className="text-[9px] text-text-muted/70 tracking-widest">
            AUDIO PEAK
          </div>
          <div className="flex items-end gap-1 h-14">
            <div className="w-1 h-10 bg-surface-subtle rounded-t overflow-hidden flex flex-col justify-end">
              <div className="w-full h-6 bg-gradient-to-t from-accent to-emerald" />
            </div>
            <div className="w-1 h-10 bg-surface-subtle rounded-t overflow-hidden flex flex-col justify-end">
              <div className="w-full h-8 bg-gradient-to-t from-accent via-emerald to-warning" />
            </div>
          </div>
          <div className="text-[8px] text-text-muted/50">-12dB TRUE PEAK</div>
        </div>

        <div className="space-y-1 text-text-muted/40">
          <div>AV1 / H.265 HW</div>
          <div>WATERMARK: NONE</div>
          <div className="text-accent font-medium">100% ROLLOVER</div>
        </div>
      </div>

      {/* Layer 5: Film Grain Overlay (inline SVG feTurbulence) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="film-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#film-grain)" />
        </svg>
      </div>
    </div>
  );
}
