"use client";

import React, { useState } from "react";
import {
  Scissors,
  Zap,
  Info,
  Layers,
  HelpCircle,
  Calendar,
  DollarSign,
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
    { id: "clip-edit", label: "Studio", icon: Layers, href: "#studio-command" },
    { id: "how-it-works", label: "How It Works", icon: HelpCircle, href: "#walkthrough" },
    { id: "schedule-approve", label: "Social Autopilot", icon: Calendar, href: "#playgrounds" },
    { id: "bounties", label: "Bounties & Pricing", icon: DollarSign, href: "#bounties" },
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#08090C]/85 hairline-b transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Emblem + Scissor Frame Icon + Agency Pill */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1"
            aria-label="ClipMax Home"
          >
            <div className="relative w-8 h-8 rounded-md bg-surface-subtle hairline-border flex items-center justify-center overflow-hidden">
              <Scissors className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg tracking-tight text-text-primary">
                CLIPMAX
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-mono uppercase font-semibold tracking-wider bg-accent/10 text-blue-400 border border-blue-500/20 rounded-full">
                AGENCY
              </span>
            </div>
          </a>

          {/* Monospace Output-Only Credit Counter */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setShowCreditTooltip(!showCreditTooltip)}
              onMouseEnter={() => setShowCreditTooltip(true)}
              onMouseLeave={() => setShowCreditTooltip(false)}
              className="flex items-center gap-2 px-3 py-1 rounded-md bg-surface-subtle hairline-border hover:border-white/20 text-xs font-mono transition-colors"
              aria-label="Credit balance information"
            >
              <Zap className="w-3 h-3 text-emerald" />
              <span className="text-white/90 font-medium tabular-nums">
                {freeExportsRemaining} / 3 Free HD Exports
              </span>
              <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald transition-all"
                  style={{ width: `${(freeExportsRemaining / 3) * 100}%` }}
                />
              </div>
            </button>

            {/* Credit Trust Tooltip Popover */}
            {showCreditTooltip && (
              <div
                role="tooltip"
                className="absolute left-0 mt-2 w-72 p-3 bg-surface-elevated hairline-border border-white/20 rounded-lg shadow-2xl text-xs space-y-1.5 z-50 text-left"
              >
                <div className="flex items-center gap-1.5 font-semibold text-text-primary">
                  <Info className="w-3.5 h-3.5 text-accent" />
                  <span>Output-Only Metering Guarantee</span>
                </div>
                <p className="text-text-secondary leading-relaxed text-[11px]">
                  Uploading video burns <strong>0 credits</strong>. You only spend credits when you download the finished 1080p vertical video.
                </p>
                <div className="pt-1.5 border-t border-white/[0.07] flex justify-between text-[10px] font-mono text-text-muted">
                  <span>Free Starter Tier</span>
                  <span className="text-emerald font-semibold">100% Rollover</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: 4-Item Navigation */}
        <nav
          className="hidden lg:flex items-center p-1 rounded-lg bg-surface-subtle hairline-border text-xs font-medium"
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md transition-all ${
                  isActive
                    ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
                    : "text-text-secondary hover:text-white"
                }`}
                aria-pressed={isActive}
              >
                <Icon className="w-3.5 h-3.5 text-text-muted" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Solid Studio White CTA & Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-subtle hover:bg-surface-elevated hairline-border text-text-secondary hover:text-white text-xs font-medium transition-colors"
          >
            <span>Load Sample</span>
          </button>

          <button
            type="button"
            onClick={onStartClipping}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-primary hover:bg-white text-primary-obsidian font-semibold text-xs transition-all active:scale-95 shadow-sm"
          >
            <Zap className="w-3 h-3 fill-current text-primary-obsidian" />
            <span>Start Free</span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md bg-surface-subtle text-text-secondary hover:text-white hairline-border"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden hairline-b bg-surface px-4 py-4 space-y-2">
          <div className="grid grid-cols-1 gap-1 text-xs font-medium">
            {navModes.map((mode) => {
              const Icon = mode.icon;
              const isActive = viewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => handleNavClick(mode.id, mode.href)}
                  className={`flex items-center gap-2 p-2.5 rounded-md text-left transition-colors ${
                    isActive
                      ? "bg-surface-elevated text-white font-semibold hairline-border"
                      : "bg-surface-subtle hover:bg-surface-elevated text-text-secondary hover:text-white"
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
              className="flex items-center justify-center gap-2 p-2.5 rounded-md bg-surface-subtle text-text-primary font-medium text-center mt-2 hairline-border"
            >
              <span>Load Sample Podcast Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
