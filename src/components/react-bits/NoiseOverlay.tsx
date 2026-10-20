import React from "react";

interface NoiseOverlayProps {
  opacity?: number;
}

export function NoiseOverlay({ opacity = 0.025 }: Readonly<NoiseOverlayProps>) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle SVG feTurbulence film grain */}
      <svg
        className="w-full h-full mix-blend-overlay pointer-events-none"
        style={{ opacity }}
      >
        <filter id="film-grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain-noise)" />
      </svg>
    </div>
  );
}
