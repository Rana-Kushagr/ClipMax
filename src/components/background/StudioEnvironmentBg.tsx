import React from "react";

interface StudioEnvironmentBgProps {
  heroImageUrl?: string;
}

export function StudioEnvironmentBg({
  heroImageUrl = "./hero-bg.webp",
}: Readonly<StudioEnvironmentBgProps>) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Main User Background Artwork - Fixed, Vibrant, and 100% Visible */}
      <img
        src={heroImageUrl}
        alt=""
        className="w-full h-full object-cover object-center fixed inset-0 pointer-events-none z-0 select-none brightness-[0.92] contrast-[1.05]"
      />

      {/* 2. Soft Protective Overlay for High-Contrast Text Legibility */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60 pointer-events-none z-0" />

      {/* 3. Subtle Edge Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 50%, transparent 45%, rgba(4, 5, 8, 0.60) 100%)",
        }}
      />
    </div>
  );
}
