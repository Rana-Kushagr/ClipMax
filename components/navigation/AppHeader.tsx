"use client";

import React, { useState } from "react";
import {
  Scissors,
  Zap,
  Sparkles,
  Info,
  DollarSign,
  Calendar,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

export type WorkspaceViewMode = "clip-edit" | "how-it-works" | "schedule-approve" | "bounties";

interface AppHeaderProps {
  viewMode: WorkspaceViewMode;
  setViewMode: (mode: WorkspaceViewMode) => void;
  onLoadSample: () => void;
  onStartClipping: () => void;
  freeExportsRemaining: number;
}

export function AppHeader({
  viewMode,
  setViewMode,
  onLoadSample,
  onStartClipping,
  freeExportsRemaining,
}: AppHeaderProps) {
  const [showCreditTooltip, setShowCreditTooltip] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navModes = [
    { id: "clip-edit", label: "1. Clip & Edit", icon: Scissors, href: "#studio-command" },
    { id: "how-it-works", label: "2. How It Works", icon: HelpCircle, href: "#walkthrough" },
    { id: "schedule-approve", label: "3. Schedule & Approve", icon: Calendar, href: "#playgrounds" },
    { id: "bounties", label: "4. Earn Cash Bounties", icon: DollarSign, href: "#bounties" },
  ] as const;

  const handleNavClick = (mode: WorkspaceViewMode, href: string) => {
    setViewMode(mode);
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-surface-glass border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Emblem + Scissor Frame Icon + Output-Only Credit Pill */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 group focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
            aria-label="ClipMax Home"
          >
            <div className="relative w-8 h-8 rounded-lg bg-surface-strong border border-border flex items-center justify-center overflow-hidden">
              <Scissors className="w-4 h-4 text-primary group-hover:rotate-45 transition-transform" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                Clip<span className="text-primary">Max</span>
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono uppercase font-bold tracking-wider bg-primary-subtle text-primary border border-primary/20 rounded">
                STUDIO
              </span>
            </div>
          </a>

          {/* Live Credit Pill (Section 3) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCreditTooltip(!showCreditTooltip)}
              onMouseEnter={() => setShowCreditTooltip(true)}
              onMouseLeave={() => setShowCreditTooltip(false)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-accent-subtle border border-accent/30 text-accent hover:border-accent text-xs font-mono transition-colors"
              aria-label="Credit balance information"
            >
              <Zap className="w-3 h-3 fill-accent" />
              <span className="font-semibold tabular-nums">
                ⚡ {freeExportsRemaining} Free HD Exports Left
              </span>
              <span className="hidden xl:inline text-text-muted text-[10px]">
                • 0 Burned on Upload
              </span>
            </button>

            {/* Credit Trust Tooltip Popover */}
            {showCreditTooltip && (
              <div
                role="tooltip"
                className="absolute left-0 mt-2 w-72 p-3 bg-surface-strong border border-border-strong rounded-xl shadow-2xl text-xs space-y-1.5 z-50 text-left"
              >
                <div className="flex items-center gap-1.5 font-bold text-text-primary">
                  <Info className="w-3.5 h-3.5 text-accent" />
                  <span>Output-Only Metering Guarantee</span>
                </div>
                <p className="text-text-secondary leading-relaxed text-[11px]">
                  Unlike OpusClip and Quso, uploading a 2-hour video burns <strong>0 credits</strong>. You only spend credits when you download the finished 1080p vertical video.
                </p>
                <div className="pt-1.5 border-t border-border flex justify-between text-[10px] font-mono text-text-muted">
                  <span>Free Starter Tier</span>
                  <span className="text-accent font-semibold">100% Rollover</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: The "9-Year-Old to Pro" Mode Switcher */}
        <nav
          className="hidden lg:flex items-center p-1 rounded-pill bg-surface-subtle border border-border text-xs font-medium"
          aria-label="Workspace View Mode"
        >
          {navModes.map((mode) => {
            const Icon = mode.icon;
            const isActive = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleNavClick(mode.id, mode.href)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill transition-all ${
                  isActive
                    ? "bg-primary text-white font-bold shadow-sm"
                    : "text-text-muted hover:text-text-primary hover:bg-surface-strong/50"
                }`}
                aria-pressed={isActive}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-surface-strong border border-border text-text-secondary hover:text-white text-xs font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-warning" />
            <span>Try Sample Project</span>
          </button>

          <button
            type="button"
            onClick={onStartClipping}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white font-display font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Start Clipping Free</span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-surface-subtle text-text-secondary hover:text-white border border-border"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-surface px-4 py-4 space-y-2">
          <div className="grid grid-cols-1 gap-1 text-xs font-medium">
            {navModes.map((mode) => {
              const Icon = mode.icon;
              const isActive = viewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => handleNavClick(mode.id, mode.href)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-left transition-colors ${
                    isActive
                      ? "bg-primary text-white font-bold"
                      : "bg-surface-subtle hover:bg-surface-strong text-text-secondary hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                onLoadSample();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-surface-subtle text-warning font-semibold text-center mt-2 border border-warning/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load Sample Podcast Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
