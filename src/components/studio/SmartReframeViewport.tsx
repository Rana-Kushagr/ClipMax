import React, { useState, useEffect } from "react";

export type FramingMode = "split" | "solo" | "auto";
export type AspectRatioKey = "9:16" | "1:1" | "16:9" | "4:3" | "9:8";

export const ASPECT_RATIO_CONFIG: Record<
  AspectRatioKey,
  {
    cssRatio: string;
    widthPx: number;
    resolution: string;
    platformLabel: string;
    isLandscape: boolean;
  }
> = {
  "9:16": {
    cssRatio: "9 / 16",
    widthPx: 230,
    resolution: "1080×1920",
    platformLabel: "TikTok • Reels • Shorts",
    isLandscape: false,
  },
  "1:1": {
    cssRatio: "1 / 1",
    widthPx: 300,
    resolution: "1080×1080",
    platformLabel: "Instagram • X Square Feed",
    isLandscape: false,
  },
  "16:9": {
    cssRatio: "16 / 9",
    widthPx: 380,
    resolution: "1920×1080",
    platformLabel: "YouTube • X Widescreen",
    isLandscape: true,
  },
  "4:3": {
    cssRatio: "4 / 3",
    widthPx: 340,
    resolution: "1440×1080",
    platformLabel: "Classic Cinema • LinkedIn",
    isLandscape: true,
  },
  "9:8": {
    cssRatio: "9 / 8",
    widthPx: 315,
    resolution: "1080×960",
    platformLabel: "Tall Viral Split Feed",
    isLandscape: false,
  },
};

export const FRAMING_MODE_CONFIG: Record<
  FramingMode,
  {
    label: string;
    badge: string;
    cameraAngleTitle: string;
    cameraAngleDesc: string;
    focalLength: string;
  }
> = {
  split: {
    label: "2-Speaker Split",
    badge: "DUAL CAM SPLIT",
    cameraAngleTitle: "Two speakers stacked in one frame.",
    cameraAngleDesc:
      "Locks Cam A onto the active speaker and Cam B onto the guest reaction shot simultaneously.",
    focalLength: "35mm Dual Crop • 99.4% Lock",
  },
  solo: {
    label: "Solo Face-Track",
    badge: "SINGLE SPEAKER 85MM",
    cameraAngleTitle: "Tight single-speaker portrait tracking.",
    cameraAngleDesc:
      "Crops 100% of the viewport onto the primary speaker with real-time neural face centering and zero dead space.",
    focalLength: "85mm Close-Up • 99.8% Face Lock",
  },
  auto: {
    label: "Auto Scene Switch",
    badge: "AI DIRECTOR CUT",
    cameraAngleTitle: "Dynamic camera switching on voice peaks.",
    cameraAngleDesc:
      "Automatically cuts between Host Close-Up, Guest Reaction, and AI B-Roll Picture-in-Picture whenever the active voice changes.",
    focalLength: "Multi-Cam Auto Switch • 60 FPS",
  },
};

export interface SmartReframeViewportProps {
  framingMode: FramingMode;
  setFramingMode: (m: FramingMode) => void;
  aspectRatio: AspectRatioKey;
  setAspectRatio: (r: AspectRatioKey) => void;
  captionClass?: string;
  captionText?: string;
  clipScore?: number;
}

export const SmartReframeViewport: React.FC<SmartReframeViewportProps> = ({
  framingMode,
  setFramingMode,
  aspectRatio,
  setAspectRatio,
  captionClass = "cap-hormozi",
  captionText = "THIS AI AGENT STACK PRINTS WHILE YOU SLEEP",
  clipScore = 99,
}) => {
  const ratioSpec = ASPECT_RATIO_CONFIG[aspectRatio];
  const frameSpec = FRAMING_MODE_CONFIG[framingMode];

  // For "Auto Scene Switch", cycle active camera angle every 2.2 seconds
  const [autoCutStage, setAutoCutStage] = useState<"host" | "guest" | "pip">("host");
  useEffect(() => {
    if (framingMode !== "auto") return;
    const timer = setInterval(() => {
      setAutoCutStage((prev) =>
        prev === "host" ? "guest" : prev === "guest" ? "pip" : "host"
      );
    }, 2200);
    return () => clearInterval(timer);
  }, [framingMode]);

  return (
    <div className="flex flex-col gap-5">
      {/* Control Bar: 3 Framing Switcher Buttons + 5 Aspect Ratio Pills */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#030914] p-3 border border-[#89CFF0]/20">
        {/* 3 Framing Mode Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-[#89CFF0]">
            Camera Angle:
          </span>
          {(["split", "solo", "auto"] as FramingMode[]).map((mode) => {
            const active = framingMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setFramingMode(mode)}
                className={`rounded-xl px-3.5 py-2 font-display text-[12.5px] font-bold transition-all duration-200 touch-manipulation ${
                  active
                    ? "bg-[#89CFF0] text-[#000000] shadow-[0_0_16px_rgba(137,207,240,0.4)]"
                    : "bg-[#050D1E] text-zinc-300 hover:bg-[#0047AB]/25 hover:text-white border border-[#89CFF0]/15"
                }`}
              >
                {FRAMING_MODE_CONFIG[mode].label}
              </button>
            );
          })}
        </div>

        {/* 5 Aspect Ratio Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-[#89CFF0]">
            Ratio:
          </span>
          {(["9:16", "1:1", "16:9", "4:3", "9:8"] as AspectRatioKey[]).map((r) => {
            const active = aspectRatio === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setAspectRatio(r)}
                className={`rounded-lg px-2.5 py-1.5 font-mono text-[11.5px] font-bold transition-all duration-200 touch-manipulation ${
                  active
                    ? "bg-[#89CFF0] text-[#000000] shadow-[0_0_14px_rgba(137,207,240,0.4)] scale-105"
                    : "bg-[#050D1E] text-zinc-300 border border-[#89CFF0]/15 hover:border-[#89CFF0]/40 hover:text-white"
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Dynamic Viewport Stage */}
      <div className="flex flex-col items-center justify-center rounded-2xl bg-[#000000] p-4 sm:p-6 border border-[#89CFF0]/15 min-h-[430px]">
        {/* Live Telemetry Header Above Frame */}
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-[11px]">
          <span className="rounded-md bg-[#0047AB]/25 border border-[#89CFF0]/30 px-2.5 py-1 text-[#89CFF0] font-semibold">
            {frameSpec.badge} • {frameSpec.focalLength}
          </span>
          <span className="rounded-md bg-[#757500]/20 border border-[#757500]/40 px-2.5 py-1 text-[#E2E260] font-semibold">
            RATIO {aspectRatio} ({ratioSpec.resolution}) • {ratioSpec.platformLabel}
          </span>
        </div>

        {/* DYNAMICALLY SIZED & SHAPED VIDEO PREVIEW FRAME */}
        <div
          style={{
            aspectRatio: ratioSpec.cssRatio,
            width: `${ratioSpec.widthPx}px`,
            maxWidth: "100%",
          }}
          className="relative rounded-[22px] border-2 border-[#89CFF0]/40 bg-[#00040A] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col justify-between transition-all duration-300 ease-out mx-auto my-2"
        >
          {/* Top HUD Overlay */}
          <div className="relative z-20 flex items-center justify-between px-1">
            <span className="rounded-full bg-[#89CFF0] px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-[#000000]">
              {clipScore} VIRAL
            </span>
            <span className="rounded bg-black/80 px-2 py-0.5 font-mono text-[9.5px] font-bold text-[#89CFF0] border border-[#89CFF0]/25">
              {aspectRatio} • {frameSpec.badge}
            </span>
          </div>

          {/* CAMERA ANGLE 1: 2-SPEAKER SPLIT MODE */}
          {framingMode === "split" && (
            <div
              className={`my-1.5 flex-1 flex ${
                ratioSpec.isLandscape ? "flex-row" : "flex-col"
              } gap-1.5 overflow-hidden rounded-xl`}
            >
              {/* Speaker 1 (Host) */}
              <div className="relative flex-1 rounded-lg bg-gradient-to-br from-[#001D47] via-[#050D1E] to-[#000000] border border-[#89CFF0]/50 flex flex-col items-center justify-center p-2">
                <span className="absolute top-1.5 left-1.5 rounded bg-[#89CFF0] px-1.5 py-0.5 font-mono text-[8px] font-bold text-black">
                  CAM A • HOST (ACTIVE)
                </span>
                <div className="h-11 w-11 rounded-full bg-[#0047AB]/30 border-2 border-[#89CFF0] flex items-center justify-center font-display text-xs font-extrabold text-[#89CFF0] shadow-[0_0_15px_rgba(137,207,240,0.35)]">
                  LF
                </div>
                <span className="mt-1 font-mono text-[9.5px] text-[#FFFFFF]">
                  Lex Fridman • Mic Peak -3dB
                </span>
              </div>

              {/* Speaker 2 (Guest Reaction) */}
              <div className="relative flex-1 rounded-lg bg-gradient-to-br from-[#1A1A00] via-[#050D1E] to-[#000000] border border-[#757500]/50 flex flex-col items-center justify-center p-2">
                <span className="absolute top-1.5 left-1.5 rounded bg-[#757500] px-1.5 py-0.5 font-mono text-[8px] font-bold text-white">
                  CAM B • GUEST REACTION
                </span>
                <div className="h-11 w-11 rounded-full bg-[#757500]/30 border-2 border-[#E2E260] flex items-center justify-center font-display text-xs font-extrabold text-[#E2E260]">
                  SH
                </div>
                <span className="mt-1 font-mono text-[9.5px] text-[#E2E260]">
                  Sam Altman • Face Lock 98.9%
                </span>
              </div>
            </div>
          )}

          {/* CAMERA ANGLE 2: SOLO FACE-TRACK (SINGLE SPEAKER CLOSE-UP) */}
          {framingMode === "solo" && (
            <div className="relative my-1.5 flex-1 rounded-xl bg-gradient-to-b from-[#002B66] via-[#050D1E] to-[#000000] border-2 border-[#89CFF0]/60 flex flex-col items-center justify-center p-3 overflow-hidden">
              {/* Green Neural Face-Tracking Bounding Reticle */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-[#89CFF0] bg-[#89CFF0]/10 shadow-[0_0_25px_rgba(137,207,240,0.3)]">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#89CFF0] px-1.5 py-0.5 font-mono text-[8px] font-extrabold text-black">
                  SOLO FACE LOCK • 99.8%
                </span>
                <div className="h-14 w-14 rounded-full bg-[#0047AB]/30 border-2 border-[#89CFF0] flex items-center justify-center font-display text-base font-extrabold text-white">
                  LF
                </div>
              </div>
              <div className="mt-2.5 text-center">
                <div className="font-display text-[12px] font-bold text-white">
                  Single Speaker 85mm Portrait Crop
                </div>
                <div className="font-mono text-[9.5px] text-[#89CFF0]">
                  Auto-Centering X: +0.2° • Y: 0.0° (No Black Bars)
                </div>
              </div>
            </div>
          )}

          {/* CAMERA ANGLE 3: AUTO SCENE SWITCH (DYNAMIC AI DIRECTOR CUTS) */}
          {framingMode === "auto" && (
            <div className="relative my-1.5 flex-1 rounded-xl bg-gradient-to-br from-[#001D47] via-[#050D1E] to-[#000000] border-2 border-[#89CFF0]/50 flex flex-col items-center justify-center p-3 overflow-hidden">
              {/* Manual / Live Cut Switcher Pills inside Auto Scene View */}
              <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between">
                <span className="rounded bg-[#89CFF0] px-1.5 py-0.5 font-mono text-[8px] font-extrabold text-black">
                  AI DIRECTOR: {autoCutStage.toUpperCase()} SHOT
                </span>
                <div className="flex gap-1">
                  {(["host", "guest", "pip"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setAutoCutStage(s)}
                      className={`rounded px-1.5 py-0.5 font-mono text-[8px] uppercase ${
                        autoCutStage === s
                          ? "bg-[#89CFF0] text-black font-bold"
                          : "bg-black/60 text-zinc-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {autoCutStage === "host" && (
                <div className="mt-4 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-full bg-[#0047AB]/30 border-2 border-[#89CFF0] flex items-center justify-center font-display text-sm font-extrabold text-[#89CFF0]">
                    CAM 1
                  </div>
                  <div className="mt-1.5 font-display text-[11.5px] font-bold text-white">
                    Active Voice: Host Close-Up
                  </div>
                  <div className="font-mono text-[9px] text-[#89CFF0]">
                    Voice Trigger Detected &rarr; Locked Cam 1
                  </div>
                </div>
              )}

              {autoCutStage === "guest" && (
                <div className="mt-4 flex flex-col items-center text-center">
                  <div className="h-14 w-14 rounded-full bg-[#757500]/30 border-2 border-[#E2E260] flex items-center justify-center font-display text-sm font-extrabold text-[#E2E260]">
                    CAM 2
                  </div>
                  <div className="mt-1.5 font-display text-[11.5px] font-bold text-[#E2E260]">
                    Counter-Cut: Guest Interjection
                  </div>
                  <div className="font-mono text-[9px] text-[#E2E260]">
                    Auto-Cut on Laugh / Interruption Peak
                  </div>
                </div>
              )}

              {autoCutStage === "pip" && (
                <div className="mt-4 w-full rounded-lg border border-[#89CFF0]/30 bg-black/60 p-2 text-center relative">
                  <div className="font-mono text-[9px] text-[#89CFF0]">
                    AI B-ROLL OVERLAY + PIP SPEAKER
                  </div>
                  <div className="mt-1 font-display text-[11px] font-bold text-white">
                    Live Revenue Telemetry Graph
                  </div>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#0047AB]/30 border border-[#89CFF0] px-2 py-0.5 font-mono text-[8.5px] text-[#89CFF0]">
                    <span>PIP: Host Corner Cam</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Live Kinetic Caption Overlay */}
          <div className="relative z-20 text-center px-1 pb-0.5">
            <div className={`${captionClass} text-[12px] leading-tight`}>
              {captionText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
