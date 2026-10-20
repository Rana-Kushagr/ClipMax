"use client";

import React, { useState } from "react";
import { CinemaStageBackground } from "@/components/background/CinemaStageBackground";
import { AppHeader, WorkspaceViewMode } from "@/components/navigation/AppHeader";
import { ClipCommandCenter } from "@/components/hero/ClipCommandCenter";
import { ScrollMotionGuide } from "@/components/walkthrough/ScrollMotionGuide";
import { InteractiveStudioShowcase } from "@/components/studio/InteractiveStudioShowcase";
import { BountyAndPricingSection } from "@/components/marketplace/BountyAndPricingSection";
import { StudioFooter } from "@/components/footer/StudioFooter";
import { BountyCampaign } from "@/types/studio";
import { CheckCircle2, X } from "lucide-react";

export default function ClipMaxHome() {
  const [viewMode, setViewMode] = useState<WorkspaceViewMode>("clip-edit");
  const [studioMode, setStudioMode] = useState<"lightning" | "studio">("lightning");
  const [freeExportsRemaining, setFreeExportsRemaining] = useState(3);
  const [activeStudioTab, setActiveStudioTab] = useState<"clips" | "reframe" | "captions" | "schedule">("clips");
  const [activeTool, setActiveTool] = useState("long-to-shorts");
  const [isInputActive, setIsInputActive] = useState(false);

  // Global Toast
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  // Studio parameter states
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    "Podcast & Interview",
    "Tech & Hardware",
  ]);
  const [promptQuery, setPromptQuery] = useState(
    "Extract core technical trade-offs and architectural decisions"
  );
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(900); // 15 mins
  const [selectedPersona, setSelectedPersona] = useState("deep-dive");

  const showNotification = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 4500);
  };

  const handleClipsGenerated = () => {
    setActiveStudioTab("clips");
    showNotification("6 Ranked 9:16 Vertical Shorts generated. Scored with Whisper-v3 diarization.");
  };

  const handleLoadSamplePodcast = () => {
    setStudioMode("studio");
    setSelectedPersona("deep-dive");
    setPromptQuery("Extract core technical trade-offs and architectural decisions");
    showNotification("Sample Loaded: System Architecture & Video Pipelines (2h 14m)");
    const elem = document.getElementById("studio-command");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartClipping = () => {
    const elem = document.getElementById("studio-command");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const handleClipCampaign = (campaign: BountyCampaign) => {
    setStudioMode("studio");
    setPromptQuery(`Extract key highlights for ${campaign.brand}: ${campaign.hookGuide}`);
    showNotification(`Campaign Footage Loaded: ${campaign.brand} - ${campaign.title} (Pool: $${campaign.totalPool.toLocaleString()})`);
    const elem = document.getElementById("studio-command");
    if (elem) elem.scrollIntoView({ behavior: "smooth" });
  };

  const handleExportSuccess = (msg: string) => {
    setFreeExportsRemaining((prev) => Math.max(0, prev - 1));
    showNotification(msg);
  };

  return (
    <div className="relative min-h-screen bg-canvas text-text-primary selection:bg-accent/20 selection:text-white">
      {/* 4-Layer Signature Cinema Background */}
      <CinemaStageBackground isInputActive={isInputActive} />

      {/* Global Notification Toast */}
      {globalToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-surface-elevated hairline-border border-white/20 shadow-2xl flex items-center gap-3 text-xs text-text-primary backdrop-blur-md max-w-md transition-all duration-200"
        >
          <div className="w-6 h-6 rounded-md bg-emerald/15 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
          </div>
          <div className="flex-1 font-medium">{globalToast}</div>
          <button
            type="button"
            onClick={() => setGlobalToast(null)}
            className="text-text-muted hover:text-white p-1"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main App Navigation Header */}
      <AppHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        onLoadSample={handleLoadSamplePodcast}
        onStartClipping={handleStartClipping}
        freeExportsRemaining={freeExportsRemaining}
      />

      {/* Main Content Area */}
      <main className="relative z-10 space-y-12 pb-24">
        {/* Above-the-Fold Hero: Universal Command Center */}
        <div
          onMouseEnter={() => setIsInputActive(true)}
          onMouseLeave={() => setIsInputActive(false)}
        >
          <ClipCommandCenter
            studioMode={studioMode}
            setStudioMode={setStudioMode}
            onClipsGenerated={handleClipsGenerated}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            promptQuery={promptQuery}
            setPromptQuery={setPromptQuery}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            selectedPersona={selectedPersona}
            setSelectedPersona={setSelectedPersona}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
          />
        </div>

        {/* First Scroll Hook: Scroll-Expanding Motion Graphic Walkthrough */}
        <ScrollMotionGuide onLoadWorkflowSample={handleLoadSamplePodcast} />

        {/* Interactive Studio Workspace: The 4 Live Playgrounds */}
        <InteractiveStudioShowcase
          activeStudioTab={activeStudioTab}
          setActiveStudioTab={setActiveStudioTab}
          onExportSuccess={handleExportSuccess}
        />

        {/* Two-Sided Bounty Marketplace & Transparent Pricing */}
        <BountyAndPricingSection onClipCampaign={handleClipCampaign} />
      </main>

      {/* Cinema Studio Footer */}
      <StudioFooter />
    </div>
  );
}
