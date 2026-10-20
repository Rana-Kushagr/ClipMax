import React from "react";

interface StudioEnvironmentBgProps {
  heroImageUrl?: string;
}

export function StudioEnvironmentBg({
  heroImageUrl = "./hero-bg.webp",
}: Readonly<StudioEnvironmentBgProps>) {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-30 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Base Layer: Rich Warm Cinema-Darkroom Charcoal Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090A0D] via-[#0B0D12] to-[#0D1015]" />

      {/* 2. Real Photographic Studio Background Plate (High Fidelity & Clearly Visible) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-luminosity filter brightness-[0.85] contrast-[1.08] transition-opacity duration-700"
        style={{
          backgroundImage: `url('${heroImageUrl}')`,
        }}
      />

      {/* 3. Subtle Vertical Acoustic Studio Slat Texture (Out-of-focus wood slats) */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 48px)",
          maskImage:
            "radial-gradient(ellipse 80% 65% at 50% 35%, black 20%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 35%, black 20%, transparent 90%)",
        }}
      />

      {/* 4. Natural Anamorphic Tungsten Key Light (Top-Left 3200K Desk Lamp Spill) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 18% 12%, rgba(224, 109, 59, 0.13) 0%, rgba(217, 119, 54, 0.04) 55%, transparent 100%)",
        }}
      />

      {/* 5. Studio Monitor Phosphor Rim Light (Center-Right Backlight) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 72% 28%, rgba(16, 185, 129, 0.10) 0%, rgba(16, 185, 129, 0.03) 60%, transparent 100%)",
        }}
      />

      {/* 6. Deep Optical Barrel Vignette around Viewport Perimeter */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 58%, rgba(5, 6, 8, 0.68) 100%)",
        }}
      />
    </div>
  );
}
