"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Maximize2,
  Sliders,
  Check,
  RotateCcw,
  Sparkles,
  Columns,
  User,
  Users,
  Film,
} from "lucide-react";
import { VideoClip } from "@/types/studio";

interface ReframeCropModalProps {
  clip: VideoClip | null;
  isOpen: boolean;
  onClose: () => void;
  onApplyCrop: (clipId: string, aspectRatio: string, layout: string) => void;
}

export function ReframeCropModal({
  clip,
  isOpen,
  onClose,
  onApplyCrop,
}: ReframeCropModalProps) {
  const [aspectRatio, setAspectRatio] = useState<string>("9:16");
  const [layoutMode, setLayoutMode] = useState<"solo" | "split" | "switching">("split");
  const [cropBoxPosition, setCropBoxPosition] = useState<number>(50); // 0 to 100 percentage horizontally

  useEffect(() => {
    if (clip) {
      setAspectRatio(clip.aspectRatio || "9:16");
      setLayoutMode(clip.speakerType || "split");
      setCropBoxPosition(50);
    }
  }, [clip]);

  // Keyboard close with Escape per Rulebook Section 14.10
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !clip) return null;

  const ratios = [
    { id: "9:16", label: "9:16", description: "TikTok / Shorts / Reels" },
    { id: "1:1", label: "1:1", description: "Instagram Square Feed" },
    { id: "16:9", label: "16:9", description: "YouTube Landscape" },
    { id: "4:3", label: "4:3", description: "Classic Television" },
    { id: "9:8", label: "9:8", description: "Facebook Dual" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="crop-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas-deep/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-3xl rounded-3xl bg-surface border border-border-strong shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-subtle">
          <div>
            <h3
              id="crop-modal-title"
              className="font-display font-extrabold text-lg text-white"
            >
              Smart Reframe & Multi-Speaker Crop
            </h3>
            <p className="text-xs text-text-muted">
              Auto-tracks active speakers and centers faces for 9:16 vertical distribution.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-surface hover:bg-surface-strong text-text-muted hover:text-white transition-colors"
            aria-label="Close Crop Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Multi-Speaker Layout Mode Switcher */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-text-primary block">
              Speaker Layout Mode:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLayoutMode("solo")}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  layoutMode === "solo"
                    ? "bg-primary-subtle border-primary text-white"
                    : "bg-surface-subtle border-border text-text-secondary hover:text-white"
                }`}
              >
                <User className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <div className="text-xs font-bold">Solo Speaker Tracking</div>
                  <div className="text-[10px] text-text-muted">
                    Locks camera on single dominant face
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode("split")}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  layoutMode === "split"
                    ? "bg-accent-subtle border-accent text-white"
                    : "bg-surface-subtle border-border text-text-secondary hover:text-white"
                }`}
              >
                <Columns className="w-4 h-4 text-accent shrink-0" />
                <div>
                  <div className="text-xs font-bold">2-Speaker Split-Screen</div>
                  <div className="text-[10px] text-text-muted">
                    Stacks host & guest top/bottom
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode("switching")}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  layoutMode === "switching"
                    ? "bg-warning/15 border-warning text-white"
                    : "bg-surface-subtle border-border text-text-secondary hover:text-white"
                }`}
              >
                <Film className="w-4 h-4 text-warning shrink-0" />
                <div>
                  <div className="text-xs font-bold">Auto Scene Switching</div>
                  <div className="text-[10px] text-text-muted">
                    Cuts to speaker whenever audio cues change
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Aspect Ratio Selector Pills */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-text-primary block">
              Target Aspect Ratio:
            </span>
            <div className="flex flex-wrap gap-2">
              {ratios.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setAspectRatio(r.id)}
                  className={`px-3 py-1.5 rounded-pill text-xs font-mono font-medium border transition-colors flex items-center gap-1.5 ${
                    aspectRatio === r.id
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-surface-subtle border-border text-text-secondary hover:text-white"
                  }`}
                >
                  <span>{r.label}</span>
                  <span className="text-[10px] opacity-75 font-sans">
                    ({r.description})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Widescreen Stage with Draggable Crop Reticle */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-text-muted">
              <span>Interactive Framing Stage (16:9 Master Stream):</span>
              <span className="font-mono text-primary font-semibold">
                Reticle Center: {cropBoxPosition}%
              </span>
            </div>

            <div className="relative aspect-video w-full rounded-2xl bg-canvas-deep border border-border overflow-hidden select-none">
              <img
                src={clip.thumbnail}
                alt={clip.title}
                className="w-full h-full object-cover filter brightness-75"
              />

              {/* Dimming mask outside crop box */}
              <div className="absolute inset-0 bg-black/40" />

              {/* 9:16 or Selected Crop Reticle Overlay */}
              <div
                className="absolute top-2 bottom-2 border-2 border-accent rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] flex flex-col justify-between p-2 pointer-events-none transition-all duration-75"
                style={{
                  left: `${Math.max(10, Math.min(65, cropBoxPosition - 18))}%`,
                  width: aspectRatio === "9:16" ? "32%" : aspectRatio === "1:1" ? "50%" : "65%",
                }}
              >
                {/* Safe Frame Guides */}
                <div className="flex justify-between items-center text-[9px] font-mono text-accent bg-canvas-deep/80 px-1 rounded">
                  <span>SAFE ZONE</span>
                  <span>{aspectRatio}</span>
                </div>

                {layoutMode === "split" && (
                  <div className="w-full h-[1px] bg-accent/60 my-auto border-t border-dashed border-accent" />
                )}

                <div className="text-center font-mono text-[9px] text-accent bg-canvas-deep/80 px-1 rounded">
                  {layoutMode === "split"
                    ? "2-SPEAKER VERTICAL SPLIT"
                    : layoutMode === "switching"
                    ? "AUTO SCENE DETECTION"
                    : "ACTIVE FACE CENTERED"}
                </div>
              </div>
            </div>

            {/* Slider to adjust horizontal crop center */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-mono text-text-muted shrink-0">
                Pan Offset:
              </span>
              <input
                type="range"
                min="20"
                max="80"
                value={cropBoxPosition}
                onChange={(e) => setCropBoxPosition(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
                aria-label="Crop pan horizontal position"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-surface-subtle border-t border-border flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              setAspectRatio("9:16");
              setLayoutMode("split");
              setCropBoxPosition(50);
            }}
            className="px-4 py-2 rounded-xl bg-surface hover:bg-surface-strong border border-border text-xs text-text-secondary hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-text-muted hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onApplyCrop(clip.id, aspectRatio, layoutMode);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-display font-bold text-xs shadow-md flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Apply Smart Reframe</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
