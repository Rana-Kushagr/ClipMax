"use client";

import React from "react";
import { Scissors, ShieldCheck } from "lucide-react";

export function StudioFooter() {
  return (
    <footer className="relative z-10 hairline-t bg-canvas-deep text-xs text-text-muted py-12 px-4 sm:px-6">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-surface-subtle hairline-border flex items-center justify-center">
              <Scissors className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-white text-sm tracking-tight">
              CLIPMAX
            </span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="text-text-secondary text-[11px] font-sans">
            Autonomous AI Video Clipping Studio & Pay-Per-View Bounty Marketplace.
          </span>
        </div>

        {/* Live Studio Status */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface hairline-border font-mono text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
          <span className="text-white/80">SMPTE ENGINE:</span>
          <span className="text-emerald font-medium">ALL SYSTEMS OPERATIONAL</span>
        </div>

        {/* Anchors */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-text-secondary text-xs font-sans">
          <a href="#studio-command" className="hover:text-white transition-colors">
            Command Center
          </a>
          <a href="#walkthrough" className="hover:text-white transition-colors">
            Walkthrough
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

      <div className="max-w-[1240px] mx-auto mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-muted font-sans">
        <div>
          © 2026 ClipMax Inc. Zero credit burn on upload. Private, uncompressed 4K processing.
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-text-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
            Private Encrypted Processing
          </span>
        </div>
      </div>
    </footer>
  );
}
