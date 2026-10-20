import React, { useState, useOptimistic, useTransition } from "react";
import { AppHeader } from "./components/navigation/AppHeader";
import { StudioEnvironmentBg } from "./components/background/StudioEnvironmentBg";
import { HeroViewfinderHud } from "./components/hero/HeroViewfinderHud";
import { HeroCommandCenter } from "./components/hero/HeroCommandCenter";
import { HowItWorksWalkthrough } from "./components/walkthrough/HowItWorksWalkthrough";
import { InteractiveStudioShowcase } from "./components/studio/InteractiveStudioShowcase";
import { BountyCampaignGrid } from "./components/bounties/BountyCampaignGrid";
import { ProfitSimulator } from "./components/bounties/ProfitSimulator";
import { OutputOnlyPricing } from "./components/bounties/OutputOnlyPricing";
import { StudioFooter } from "./components/footer/StudioFooter";
import { NoiseOverlay } from "./components/react-bits/NoiseOverlay";
import { BlurText } from "./components/react-bits/BlurText";
import { useClipMaxGsap } from "./hooks/useClipMaxGsap";
import { CheckCircle2, X } from "lucide-react";

export function App() {
  const { progressBarRef, hudContainerRef } = useClipMaxGsap();

  // React 19 useOptimistic for free export credits
  const [actualFreeExports, setActualFreeExports] = useState(3);
  const [, startTransition] = useTransition();
  const [optimisticFreeExports, setOptimisticFreeExports] = useOptimistic(
    actualFreeExports,
    (current, decrementAmount: number) => Math.max(0, current - decrementAmount)
  );

  // Studio State
  const [studioMode, setStudioMode] = useState<"lightning" | "studio">("lightning");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    "Podcast & Interview",
    "Dev & Architecture",
  ]);
  const [promptQuery, setPromptQuery] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(7200);
  const [selectedPersona, setSelectedPersona] = useState("auto");
  const [activeTool, setActiveTool] = useState("auto-detect");
  const [videoUrl, setVideoUrl] = useState("");
  const [activeStudioTab, setActiveStudioTab] = useState<
    "clips" | "reframe" | "captions" | "schedule"
  >("clips");

  // Export success notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleClipsGenerated = () => {
    const studioSection = document.getElementById("studio");
    if (studioSection) {
      studioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectCampaign = (url: string) => {
    setVideoUrl(url);
    const heroCard = document.getElementById("hero-command-center");
    if (heroCard) {
      heroCard.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoadWorkflowSample = () => {
    setVideoUrl("https://youtube.com/watch?v=LexFridman_AI_Architecture_DeepDive");
    const heroCard = document.getElementById("hero-command-center");
    if (heroCard) {
      heroCard.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleExportSuccess = (clipTitle: string) => {
    startTransition(() => {
      setOptimisticFreeExports(1);
    });
    setActualFreeExports((prev) => Math.max(0, prev - 1));
    setToastMessage(`HD Render Complete: "${clipTitle}". Download started.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#090A0D] text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-300 relative overflow-x-hidden font-sans">
      {/* 1. Top Viewport GSAP Scroll Progress Ribbon */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-[#E06D3B] to-emerald-400 origin-left z-50 pointer-events-none scale-x-0"
      />

      {/* 2. Normal Scrolling Cinema Desk Background - Moves Naturally with Page Content */}
      <StudioEnvironmentBg heroImageUrl={`${import.meta.env.BASE_URL}cinema-desk-bg.jpg`} />

      {/* 3. Kodak Vision3 35mm Micro SVG Noise Grain Texture */}
      <NoiseOverlay opacity={0.024} />

      {/* 4. Global App Header */}
      <AppHeader freeExportsCount={optimisticFreeExports} />

      {/* 5. Hero Section with Viewfinder HUD and Command Center */}
      <section
        id="hero"
        className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden border-b border-white/[0.06]"
      >
        {/* GSAP Dissolving Viewfinder HUD */}
        <HeroViewfinderHud hudRef={hudContainerRef} isInputActive={videoUrl.length > 0} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <HeroCommandCenter
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
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
          />
        </div>
      </section>

      {/* 6. Section 01: How It Works 60FPS Walkthrough */}
      <section id="walkthrough" className="py-24 relative overflow-hidden">
        {/* Subtle Warm Tungsten Floor Reflection */}
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none -z-10 blur-[130px]"
          style={{ background: "rgba(224, 109, 59, 0.05)" }}
          aria-hidden="true"
        />
        <HowItWorksWalkthrough onLoadWorkflowSample={handleLoadWorkflowSample} />
      </section>

      {/* 7. Section 02: AI Studio Interactive Workspace */}
      <section id="studio" className="py-24 relative border-t border-white/[0.08] overflow-hidden">
        {/* Subtle Studio Emerald Floor Reflection */}
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none -z-10 blur-[130px]"
          style={{ background: "rgba(16, 185, 129, 0.05)" }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              CINEMA PRODUCTION SUITE
            </span>
            <BlurText
              text="Cinema-grade AI studio, built for retention"
              className="text-3xl sm:text-4xl font-display font-bold text-zinc-100"
            />
            <p className="text-sm text-zinc-400 font-sans">
              Inspect autonomous viral scoring, fine-tune multi-speaker crop boundaries, style
              word-by-word kinetic captions, and sync with Telegram approval bots.
            </p>
          </div>

          <InteractiveStudioShowcase
            activeStudioTab={activeStudioTab}
            setActiveStudioTab={setActiveStudioTab}
            onExportSuccess={handleExportSuccess}
          />
        </div>
      </section>

      {/* 8. Section 03: Bounty Marketplace */}
      <section id="bounties" className="py-24 relative border-t border-white/[0.08] overflow-hidden">
        {/* Subtle Warm Tungsten Floor Reflection */}
        <div
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[650px] h-[350px] pointer-events-none -z-10 blur-[130px]"
          style={{ background: "rgba(224, 109, 59, 0.05)" }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              CREATOR MONETIZATION MARKETPLACE
            </span>
            <BlurText
              text="Monetize your clipping skills with instant bounties"
              className="text-3xl sm:text-4xl font-display font-bold text-zinc-100"
            />
            <p className="text-sm text-zinc-400 font-sans">
              Browse verified brand campaigns, generate high-performing shorts in 1-click, and
              claim direct payouts from locked escrow pools.
            </p>
          </div>

          <BountyCampaignGrid onSelectCampaign={handleSelectCampaign} />
        </div>
      </section>

      {/* 9. Earnings Profit Simulator */}
      <section id="simulator" className="py-24 relative border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E06D3B] px-3 py-1 rounded-full bg-[#E06D3B]/10 border border-[#E06D3B]/20">
              PREDICTIVE FINANCIAL MODEL
            </span>
            <BlurText
              text="Calculate your monthly short-form earnings"
              className="text-3xl sm:text-4xl font-display font-bold text-zinc-100"
            />
            <p className="text-sm text-zinc-400 font-sans">
              Real-time projection based on verified CPMs ($3.50 – $4.25 / 1K views) across YouTube
              Shorts, TikTok, and Instagram Reels.
            </p>
          </div>

          <ProfitSimulator />
        </div>
      </section>

      {/* 10. Output-Only Pricing */}
      <section id="pricing" className="py-24 relative border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              OUTPUT-ONLY PRICING ARCHITECTURE
            </span>
            <BlurText
              text="Zero credits burned on previews. Pay only for finished exports."
              className="text-3xl sm:text-4xl font-display font-bold text-zinc-100"
            />
            <p className="text-sm text-zinc-400 font-sans">
              No subscriptions that expire unused. All plans include 100% credit rollover and zero
              watermarks.
            </p>
          </div>

          <OutputOnlyPricing />
        </div>
      </section>

      {/* 11. Studio Footer */}
      <StudioFooter />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0E1015] border border-emerald-500/40 text-xs font-mono text-zinc-200 shadow-xl shadow-black/60 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-zinc-500 hover:text-zinc-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
