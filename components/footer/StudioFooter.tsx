"use client";

import React from "react";
import { Scissors, ShieldCheck, Film, Zap, Heart } from "lucide-react";

export function StudioFooter() {
  return (
    <footer className="relative z-10 border-t border-border bg-canvas-deep text-xs text-text-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-surface-strong border border-border flex items-center justify-center">
              <Scissors className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-display font-extrabold text-white text-sm tracking-tight">
              Clip<span className="text-primary">Max</span>
            </span>
          </div>
          <span className="hidden sm:inline text-border-strong">•</span>
          <span className="text-text-secondary text-[11px]">
            The Two-Sided AI Video Clipping Studio & Pay-Per-View Bounty Marketplace.
          </span>
        </div>

        {/* Live Studio Status */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-pill bg-surface border border-border font-mono text-[10px]">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle" />
          <span className="text-white">SMPTE ENGINE:</span>
          <span className="text-accent font-semibold">ALL SYSTEMS NOMINAL</span>
        </div>

        {/* Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-text-secondary text-xs">
          <a href="#studio-command" className="hover:text-white transition-colors">
            Command Center
          </a>
          <a href="#walkthrough" className="hover:text-white transition-colors">
            15s Walkthrough
          </a>
          <a href="#playgrounds" className="hover:text-white transition-colors">
            Live Playgrounds
          </a>
          <a href="#bounties" className="hover:text-white transition-colors">
            Cash Bounties
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Output-Only Pricing
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-muted">
        <div>
          © 2026 ClipMax Inc. Zero credit burn on upload. Private, uncompressed 4K processing.
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            Private Encrypted Processing
          </span>
        </div>
      </div>
    </footer>
  );
}
