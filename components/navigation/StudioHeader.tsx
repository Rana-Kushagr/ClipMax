"use client";

import React, { useState } from "react";
import {
  Sparkles,
  SlidersHorizontal,
  Zap,
  Film,
  Coins,
  Info,
  Menu,
  X,
} from "lucide-react";

interface StudioHeaderProps {
  studioMode: "lightning" | "studio";
  setStudioMode: (mode: "lightning" | "studio") => void;
  creditsRemaining: number;
}

export function StudioHeader({
  studioMode,
  setStudioMode,
  creditsRemaining,
}: StudioHeaderProps) {
  const [showCreditInfo, setShowCreditInfo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-canvas/80 hairline-b transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Studio Tally Indicator */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-accent rounded-md p-1"
            aria-label="ClipMax Home"
          >
            <div className="relative w-8 h-8 rounded-md bg-surface-subtle hairline-border flex items-center justify-center overflow-hidden">
              <Film className="w-4 h-4 text-white group-hover:scale-105 transition-transform" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg tracking-tight text-white">
                  CLIPMAX
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono uppercase font-semibold tracking-wider bg-accent/10 text-blue-400 border border-blue-500/20 rounded-full">
                  AGENCY
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-6 text-xs font-medium text-text-secondary" aria-label="Main Navigation">
            <a
              href="#studio-command"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-surface-subtle transition-colors"
            >
              Command
            </a>
            <a
              href="#walkthrough"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-surface-subtle transition-colors"
            >
              Walkthrough
            </a>
            <a
              href="#playgrounds"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-surface-subtle transition-colors"
            >
              Playgrounds
            </a>
            <a
              href="#bounties"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-surface-subtle transition-colors"
            >
              Bounties
            </a>
            <a
              href="#pricing"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-surface-subtle transition-colors"
            >
              Pricing
            </a>
          </nav>
        </div>

        {/* Center: 2-Mode Switcher */}
        <div className="hidden sm:flex items-center p-0.5 rounded-md bg-surface-subtle hairline-border text-xs font-medium">
          <button
            type="button"
            onClick={() => setStudioMode("lightning")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all ${
              studioMode === "lightning"
                ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            aria-pressed={studioMode === "lightning"}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Lightning</span>
          </button>
          <button
            type="button"
            onClick={() => setStudioMode("studio")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all ${
              studioMode === "studio"
                ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
                : "text-text-muted hover:text-white"
            }`}
            aria-pressed={studioMode === "studio"}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Studio Control</span>
          </button>
        </div>

        {/* Right: Output-Only Credit Counter & CTAs */}
        <div className="flex items-center gap-3">
          {/* Credit Rollover Display */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCreditInfo(!showCreditInfo)}
              onMouseEnter={() => setShowCreditInfo(true)}
              onMouseLeave={() => setShowCreditInfo(false)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-surface-subtle hairline-border hover:border-white/20 text-xs font-mono transition-colors"
              aria-label="Credit balance information"
            >
              <Coins className="w-3.5 h-3.5 text-emerald" />
              <span className="font-semibold text-white tabular-nums">
                {creditsRemaining}
              </span>
              <span className="text-text-muted">/ 1,200</span>
              <span className="hidden xl:inline text-[10px] text-emerald bg-emerald/10 px-1.5 py-0.5 rounded font-sans">
                100% Rollover
              </span>
            </button>

            {/* Credit Trust Tooltip Popover */}
            {showCreditInfo && (
              <div
                role="tooltip"
                className="absolute right-0 mt-2 w-64 p-3 bg-surface-elevated hairline-border border-white/20 rounded-lg shadow-2xl text-xs space-y-1.5 z-50 text-left"
              >
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <Info className="w-3.5 h-3.5 text-accent" />
                  <span>Output-Only Clip Metering</span>
                </div>
                <p className="text-text-secondary leading-relaxed text-[11px] font-sans">
                  <strong>0 credits</strong> charged to upload, transcribe, or preview. You only spend 1 credit when downloading an edited, watermark-free 1080p clip.
                </p>
                <div className="pt-1.5 hairline-t flex justify-between text-[10px] font-mono text-text-muted">
                  <span>Free Monthly: 3 Clips</span>
                  <span className="text-emerald font-semibold">Rollover: ACTIVE</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTA */}
          <a
            href="#studio-command"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-primary hover:bg-white text-primary-obsidian font-semibold text-xs shadow-sm transition-transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Shorts</span>
          </a>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md bg-surface-subtle text-text-secondary hover:text-white hairline-border"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden hairline-b bg-surface px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium pt-2">
            <a
              href="#studio-command"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-surface-subtle hover:bg-surface-elevated text-text-secondary"
            >
              Studio Command
            </a>
            <a
              href="#walkthrough"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-surface-subtle hover:bg-surface-elevated text-text-secondary"
            >
              Walkthrough
            </a>
            <a
              href="#playgrounds"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-surface-subtle hover:bg-surface-elevated text-text-secondary"
            >
              Playgrounds
            </a>
            <a
              href="#bounties"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-surface-subtle hover:bg-surface-elevated text-text-secondary"
            >
              Cash Bounties
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
