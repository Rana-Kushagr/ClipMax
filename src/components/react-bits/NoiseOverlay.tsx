import React from "react";

interface NoiseOverlayProps {
  opacity?: number;
}

export function NoiseOverlay({ opacity = 0.03 }: Readonly<NoiseOverlayProps>) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden"
      style={{
        opacity,
        backgroundImage: `radial-gradient(rgba(243, 229, 171, 0.45) 0.5px, transparent 0.5px)`,
        backgroundSize: "4px 4px",
      }}
      aria-hidden="true"
    />
  );
}
