import React from "react";
import { DecryptedText } from "../react-bits/DecryptedText";

interface HeroViewfinderHudProps {
  hudRef?: React.RefObject<HTMLDivElement | null>;
  isInputActive?: boolean;
}

export function HeroViewfinderHud({
  hudRef,
  isInputActive = false,
}: Readonly<HeroViewfinderHudProps>) {
  const chromaticReticleStyle: React.CSSProperties = {
    filter:
      "drop-shadow(-0.4px 0px 0px rgba(224,109,59,0.4)) drop-shadow(0.4px 0px 0px rgba(16,185,129,0.4))",
  };

  return (
    <div
      ref={hudRef}
      className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Optical Barrel-Vignette around Viewport Perimeter */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 58%, rgba(5, 6, 8, 0.68) 100%)",
        }}
      />

      {/* 4 Precision Corner Viewfinder Brackets with 0.4px Optical Chromatic Shift */}
      <div
        className="absolute top-6 left-6 hud-corner-bracket"
        style={chromaticReticleStyle}
      >
        <div className="w-6 h-6 border-t-2 border-l-2 border-white/60" />
      </div>
      <div
        className="absolute top-6 right-6 hud-corner-bracket"
        style={chromaticReticleStyle}
      >
        <div className="w-6 h-6 border-t-2 border-r-2 border-white/60" />
      </div>
      <div
        className="absolute bottom-6 left-6 hud-corner-bracket"
        style={chromaticReticleStyle}
      >
        <div className="w-6 h-6 border-b-2 border-l-2 border-white/60" />
      </div>
      <div
        className="absolute bottom-6 right-6 hud-corner-bracket"
        style={chromaticReticleStyle}
      >
        <div className="w-6 h-6 border-b-2 border-r-2 border-white/60" />
      </div>

      {/* Left Broadcast Telemetry Rail (Softer 0.55 Opacity for Natural Depth) */}
      <div className="hidden xl:flex absolute left-8 top-16 bottom-16 flex-col justify-between text-[10px] font-mono text-text-muted/70 border-l border-white/[0.08] pl-3 opacity-55 transition-opacity duration-300">
        <div className="space-y-1">
          <div className="text-white font-medium tracking-wider flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full inline-block ${
                isInputActive ? "bg-[#E06D3B] animate-pulse" : "bg-[#10B981]"
              }`}
            />
            <span className="text-white">SMPTE </span>
            <DecryptedText text="00:00:00:00" speed={30} className="text-[#10B981] font-semibold" />
          </div>
          <div className="text-text-muted">29.97 FPS NTSC DROP</div>
          <div className="text-text-muted/60">TIMELINE: ARRI RAW</div>
        </div>

        {/* 9:16 safe-zone vertical crop bracket */}
        <div className="py-4 space-y-2 border-y border-white/[0.06] my-auto">
          <div className="text-[9px] text-text-muted/80 tracking-widest uppercase font-semibold">
            9:16 SAFE ZONE
          </div>
          <div className="w-12 h-20 border border-dashed border-white/30 rounded-sm relative flex items-center justify-center bg-white/[0.02]">
            <span className="text-[8px] text-white/90 font-mono">1080A-1920</span>
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/60" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/60" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/60" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/60" />
          </div>
          <div className="text-[9px] text-[#10B981] font-medium">AUTOFRAME ON</div>
        </div>

        <div className="space-y-1 text-text-muted/60">
          <div>BUFFER: 64MB HW</div>
          <div>LATENCY: 14ms</div>
          <div className="text-[#10B981]">OUTPUT-ONLY METER</div>
        </div>
      </div>

      {/* Right Broadcast Telemetry Rail (Softer 0.55 Opacity) */}
      <div className="hidden xl:flex absolute right-8 top-16 bottom-16 flex-col justify-between items-end text-[10px] font-mono text-text-muted/70 border-r border-white/[0.08] pr-3 text-right opacity-55 transition-opacity duration-300">
        <div className="space-y-1">
          <div className="text-white font-medium tracking-wider">
            VIRAL HARMONICS
          </div>
          <div className="text-[#10B981]">DIARIZATION ACTIVE</div>
          <div className="text-text-muted/60">WHISPER-V3 DUAL</div>
        </div>

        {/* Studio Peak Audio Meter */}
        <div className="py-4 space-y-1.5 my-auto flex flex-col items-end">
          <div className="text-[9px] text-text-muted/80 tracking-widest font-semibold">
            AUDIO PEAK
          </div>
          <div className="flex items-end gap-1 h-12">
            {[45, 75, 92, 60, 85, 96, 68, 52].map((val, idx) => (
              <div
                key={`meter-${idx}-${val}`}
                className="w-1.5 bg-[#14171F] rounded-t-sm overflow-hidden flex flex-col justify-end h-full"
              >
                <div
                  className={`w-full rounded-t-sm transition-all duration-300 ${
                    val > 90
                      ? "bg-[#E06D3B]"
                      : val > 70
                      ? "bg-[#10B981]"
                      : "bg-[#10B981]/50"
                  }`}
                  style={{ height: `${val}%` }}
                />
              </div>
            ))}
          </div>
          <div className="text-[8px] text-[#10B981] font-mono">-3.2 dBFS PEAK</div>
        </div>

        <div className="space-y-1 text-text-muted/60">
          <div>CH 01: HOST (L)</div>
          <div>CH 02: GUEST (R)</div>
          <div className="text-[#10B981]">AES67 SYNC LOCKED</div>
        </div>
      </div>
    </div>
  );
}
