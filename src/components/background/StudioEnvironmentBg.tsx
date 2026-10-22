import React from "react";

interface StudioEnvironmentBgProps {
  heroImageUrl?: string;
}

export function StudioEnvironmentBg({
  heroImageUrl = "./cinema-desk-bg.jpg",
}: Readonly<StudioEnvironmentBgProps>) {
  return (
    <div
      className="absolute top-0 left-0 right-0 w-full h-[1400px] pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Normal Scrolling Background Image - Moves Naturally 1:1 with Content */}
      <img
        src={heroImageUrl}
        alt=""
        className="w-full h-full object-cover object-center pointer-events-none select-none brightness-[0.95] contrast-[1.04]"
      />

      {/* 2. Soft Protective Contrast Tint for Flawless Text Readability */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />

      {/* 3. Smooth Seamless Fade into Obsidian Void (#000000) */}
      <div className="absolute inset-x-0 bottom-0 h-[280px] bg-gradient-to-b from-transparent via-[#000000]/80 to-[#000000] pointer-events-none" />

      {/* 4. Subtle Optical Perimeter Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 45%, transparent 52%, rgba(5, 6, 9, 0.50) 100%)",
        }}
      />
    </div>
  );
}
