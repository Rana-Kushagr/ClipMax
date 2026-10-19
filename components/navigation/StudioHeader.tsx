"use client";

import React, { useState } from "react";
import {
  Sparkles,
  SlidersHorizontal,
  Zap,
  Film,
  Coins,
  ChevronDown,
  Info,
  Layers,
  Calendar,
  DollarSign,
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-canvas/80 border-b border-border/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Studio Tally Indicator */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
            aria-label="ClipMax Home"
          >
            <div className="relative w-8 h-8 rounded-lg bg-surface-strong border border-border flex items-center justify-center overflow-hidden">
              <Film className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-danger animate-pulse-subtle" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-lg tracking-tight text-white">
                  CLIP<span className="text-primary">MAX</span>
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase font-bold tracking-wider bg-primary/10 text-primary border border-primary/20 rounded">
                  STUDIO
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-6 text-xs font-medium text-slate-400" aria-label="Main Navigation">
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
              Live Playgrounds
            </a>
            <a
              href="#bounties"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-surface-subtle transition-colors"
            >
              Cash Bounties
            </a>
            <a
              href="#pricing"
              className="px-3 py-1.5 rounded-md hover:text-white hover:bg-surface-subtle transition-colors"
            >
              Output-Only Pricing
            </a>
          </nav>
        </div>

        {/* Center: Toy-Simple 2-Mode Switcher */}
        <div className="hidden sm:flex items-center p-1 rounded-pill bg-surface-subtle border border-border text-xs font-medium shadow-inner">
          <button
            type="button"
            onClick={() => setStudioMode("lightning")}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-pill transition-all ${
              studioMode === "lightning"
                ? "bg-primary text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
            aria-pressed={studioMode === "lightning"}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>⚡ 1-Click Lightning</span>
          </button>
          <button
            type="button"
            onClick={() => setStudioMode("studio")}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-pill transition-all ${
              studioMode === "studio"
                ? "bg-accent text-white font-bold shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
            aria-pressed={studioMode === "studio"}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>🎬 Studio Control</span>
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
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface-subtle border border-border hover:border-border-strong text-xs font-mono transition-colors"
              aria-label="Credit balance information"
            >
              <Coins className="w-3.5 h-3.5 text-warning" />
              <span className="font-semibold text-slate-200 tabular-nums">
                {creditsRemaining}
              </span>
              <span className="text-slate-500">/ 1,200</span>
              <span className="hidden xl:inline text-[10px] text-primary bg-primary/10 px-1 py-0.5 rounded font-sans">
                100% Rollover
              </span>
            </button>

            {/* Credit Trust Tooltip Popover */}
            {showCreditInfo && (
              <div
                role="tooltip"
                className="absolute right-0 mt-2 w-64 p-3 bg-surface-strong border border-border-strong rounded-xl shadow-2xl text-xs space-y-1.5 z-50"
              >
                <div className="flex items-center gap-1.5 font-bold text-slate-100">
                  <Info className="w-3.5 h-3.5 text-primary" />
                  <span>Output-Only Clip Metering</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  <strong>0 credits</strong> charged to upload, transcribe, or preview. You only spend 1 credit when downloading an edited, watermark-free 1080p clip.
                </p>
                <div className="pt-1.5 border-t border-border flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Free Monthly: 3 Clips</span>
                  <span className="text-primary font-semibold">Rollover: ACTIVE</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTA */}
          <a
            href="#studio-command"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-slate-950 font-display font-bold text-xs shadow-md transition-transform active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Shorts</span>
          </a>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-surface-subtle text-slate-300 hover:text-white border border-border"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-4 py-4 space-y-3">
          <div className="flex items-center justify-between p-1 rounded-pill bg-surface-subtle border border-border text-xs">
            <button
              type="button"
              onClick={() => {
                setStudioMode("lightning");
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-center rounded-pill font-medium ${
                studioMode === "lightning" ? "bg-primary text-slate-950 font-bold" : "text-slate-400"
              }`}
            >
              ⚡ Lightning
            </button>
            <button
              type="button"
              onClick={() => {
                setStudioMode("studio");
                setMobileMenuOpen(false);
              }}
              className={`flex-1 py-1.5 text-center rounded-pill font-medium ${
                studioMode === "studio" ? "bg-accent text-white font-bold" : "text-slate-400"
              }`}
            >
              🎬 Studio Control
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium pt-2">
            <a
              href="#studio-command"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-surface-subtle hover:bg-surface-strong text-slate-300"
            >
              Studio Command
            </a>
            <a
              href="#walkthrough"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-surface-subtle hover:bg-surface-strong text-slate-300"
            >
              Walkthrough
            </a>
            <a
              href="#playgrounds"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-surface-subtle hover:bg-surface-strong text-slate-300"
            >
              Playgrounds
            </a>
            <a
              href="#bounties"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-surface-subtle hover:bg-surface-strong text-slate-300"
            >
              Cash Bounties
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-surface-subtle hover:bg-surface-strong text-slate-300 col-span-2 text-center"
            >
              Output-Only Pricing
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
