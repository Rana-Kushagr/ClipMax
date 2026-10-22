import React, { useState, useOptimistic, useTransition } from "react";
import { motion } from "framer-motion";
import { AppHeader } from "./components/navigation/AppHeader";
import { StudioEnvironmentBg } from "./components/background/StudioEnvironmentBg";
import { HeroViewfinderHud } from "./components/hero/HeroViewfinderHud";
import { HeroCommandCenter } from "./components/hero/HeroCommandCenter";
import { HowItWorksWalkthrough } from "./components/walkthrough/HowItWorksWalkthrough";
import { InteractiveStudioShowcase, StudioTabId } from "./components/studio/InteractiveStudioShowcase";
import { BountyCampaignGrid } from "./components/bounties/BountyCampaignGrid";
import { ProfitSimulator } from "./components/bounties/ProfitSimulator";
import { OutputOnlyPricing } from "./components/bounties/OutputOnlyPricing";
import { StudioFooter } from "./components/footer/StudioFooter";
import { NoiseOverlay } from "./components/react-bits/NoiseOverlay";
import { Grainient } from "./components/backgrounds/Grainient";
import { SmartOptionsState } from "./components/hero/SmartOptionsDrawer";
import { useClipMaxGsap } from "./hooks/useClipMaxGsap";
import { CheckCircle2, X } from "lucide-react";

interface SandyBlockProps {
  variant: "sand" | "terracotta";
  children: React.ReactNode;
  showBottomFeather?: boolean;
}

const SANDY_CONFIG = {
  sand: {
    bg: "bg-[#221B12]",
    opacity: "opacity-25",
    colors: ["#17120C", "#221B12", "#4A351D", "#D99B52", "#F3E5AB"],
    flow: 0.5,
    softness: 1.2,
    speed: 0.25,
    feather: "from-[#221B12] to-[#17120C]",
  },
  terracotta: {
    bg: "bg-[#17120C]",
    opacity: "opacity-20",
    colors: ["#17120C", "#2B1E13", "#5C3A1E", "#D99B52", "#E06D3B"],
    flow: 0.45,
    softness: 1.2,
    speed: 0.2,
    feather: "from-[#17120C] to-[#221B12]",
  },
};

function SandyBlock({ variant, children, showBottomFeather = false }: Readonly<SandyBlockProps>) {
  const cfg = SANDY_CONFIG[variant];
  return (
    <div className={`relative ${cfg.bg}`}>
      <div className={`absolute inset-0 pointer-events-none ${cfg.opacity} overflow-hidden`}>
        <Grainient
          colors={cfg.colors}
          flow={cfg.flow}
          softness={cfg.softness}
          speed={cfg.speed}
        />
      </div>
      {children}
      {showBottomFeather && (
        <div
          className={`h-40 w-full bg-gradient-to-b ${cfg.feather} pointer-events-none relative z-10`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

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
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTabId>("strip");

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
    const heroCard = document.getElementById("hero");
    if (heroCard) {
      heroCard.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoadWorkflowSample = () => {
    setVideoUrl("https://youtube.com/watch?v=LexFridman_AI_Architecture_DeepDive");
    const heroCard = document.getElementById("hero");
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

  const smartOptions: SmartOptionsState = {
    selectedPersona,
    setSelectedPersona,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    promptQuery,
    setPromptQuery,
    selectedGenres,
    setSelectedGenres,
  };

  return (
    <div className="min-h-screen bg-[#221B12] text-[#F4F4F6] selection:bg-[#F3E5AB]/25 selection:text-[#F3E5AB] relative overflow-x-hidden font-sans">
      {/* 1. Top Viewport GSAP Scroll Progress Ribbon */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#10B981] via-[#D99B52] to-[#F3E5AB] origin-left z-50 pointer-events-none scale-x-0"
      />

      {/* 2. Normal Scrolling Cinema Desk Background - Moves Naturally with Page Content */}
      <StudioEnvironmentBg heroImageUrl={`${import.meta.env.BASE_URL}cinema-desk-bg.jpg`} />

      {/* 3. Kodak Vision3 35mm Micro SVG Noise Grain Texture */}
      <NoiseOverlay opacity={0.024} />

      {/* 4. Global App Header */}
      <AppHeader freeExportsCount={optimisticFreeExports} />

      {/* 5. Hero Section with Viewfinder HUD and Command Center (No bottom border!) */}
      <section
        id="hero"
        className="relative min-h-[92vh] pt-32 pb-24 flex flex-col justify-center overflow-hidden"
      >
        {/* GSAP Dissolving Viewfinder HUD */}
        <HeroViewfinderHud hudRef={hudContainerRef} isInputActive={videoUrl.length > 0} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <HeroCommandCenter
            studioMode={studioMode}
            setStudioMode={setStudioMode}
            onClipsGenerated={handleClipsGenerated}
            options={smartOptions}
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
          />
        </div>
      </section>

      {/* =========================================================================
          COLOUR BLOCK 1: Pastel Sunlit Sand & Warm Parchment Umber (#221B12)
          Contains: Section 01: How ClipMax Works Walkthrough
          ========================================================================= */}
      <SandyBlock variant="sand" showBottomFeather>
        {/* Section 01: How It Works 60FPS Walkthrough */}
        <section id="walkthrough" className="py-24 relative overflow-hidden z-10">
          {/* Subtle Warm Amber Refraction Glow */}
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[650px] h-[350px] pointer-events-none -z-10 blur-[130px]"
            style={{ background: "rgba(217, 155, 82, 0.08)" }}
            aria-hidden="true"
          />
          <HowItWorksWalkthrough onLoadWorkflowSample={handleLoadWorkflowSample} />
        </section>
      </SandyBlock>

      {/* =========================================================================
          COLOUR BLOCK 2: Burnished Honey Terracotta & Deep Espresso Hearth (#17120C)
          Contains: Section 02: AI Studio Interactive Workspace
          ========================================================================= */}
      <SandyBlock variant="terracotta" showBottomFeather>
        {/* Section 02: AI Studio Interactive Workspace (No top border!) */}
        <section id="studio" className="py-24 relative overflow-hidden z-10">
          {/* Subtle Studio Warm Terracotta Floor Reflection */}
          <div
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none -z-10 blur-[130px]"
            style={{ background: "rgba(224, 109, 59, 0.06)" }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-3xl sm:text-4xl font-display font-bold text-[#F4F4F6] tracking-tight"
              >
                Cinema-grade AI studio,{" "}
                <span className="serif-italic text-[#F3E5AB]">built for retention.</span>
              </motion.h2>
              <p className="text-sm text-[#A1A1AA] font-sans">
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
      </SandyBlock>

      {/* =========================================================================
          COLOUR BLOCK 1: Pastel Sunlit Sand & Warm Parchment Umber (#221B12)
          Contains: Section 03: Bounty Marketplace & Profit Simulator
          ========================================================================= */}
      <SandyBlock variant="sand" showBottomFeather>
        {/* Section 03: Bounty Marketplace (No top border!) */}
        <section id="bounties" className="py-24 relative overflow-hidden z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-3xl sm:text-4xl font-display font-bold text-[#F4F4F6] tracking-tight"
              >
                Monetize your clipping skills with{" "}
                <span className="serif-italic text-[#D99B52]">instant bounties.</span>
              </motion.h2>
              <p className="text-sm text-[#A1A1AA] font-sans">
                Browse verified brand campaigns, generate high-performing shorts in 1-click, and
                claim direct payouts from locked escrow pools.
              </p>
            </div>

            <BountyCampaignGrid onSelectCampaign={handleSelectCampaign} />
          </div>
        </section>

        {/* Section 03b: Earnings Profit Simulator (No top border!) */}
        <section id="simulator" className="py-24 relative overflow-hidden z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-3xl sm:text-4xl font-display font-bold text-[#F4F4F6] tracking-tight"
              >
                Calculate your{" "}
                <span className="serif-italic text-[#F3E5AB]">monthly</span> short-form earnings.
              </motion.h2>
              <p className="text-sm text-[#A1A1AA] font-sans">
                Real-time projection based on verified CPMs ($3.50 – $4.25 / 1K views) across YouTube
                Shorts, TikTok, and Instagram Reels.
              </p>
            </div>

            <ProfitSimulator />
          </div>
        </section>
      </SandyBlock>

      {/* =========================================================================
          COLOUR BLOCK 2: Burnished Honey Terracotta & Deep Espresso Hearth (#17120C)
          Contains: Section 04: Pricing & Studio Footer
          ========================================================================= */}
      <SandyBlock variant="terracotta">
        {/* Section 04: Output-Only Pricing (No top border!) */}
        <section id="pricing" className="py-24 relative overflow-hidden z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-3xl sm:text-4xl font-display font-bold text-[#F4F4F6] tracking-tight"
              >
                Zero credits burned on previews.{" "}
                <span className="serif-italic text-[#10B981]">Pay only for finished exports.</span>
              </motion.h2>
              <p className="text-sm text-[#A1A1AA] font-sans">
                No subscriptions that expire unused. All plans include 100% credit rollover and zero
                watermarks.
              </p>
            </div>

            <OutputOnlyPricing />
          </div>
        </section>

        {/* Studio Footer */}
        <StudioFooter />
      </SandyBlock>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1E1710] border border-[#10B981]/50 text-xs font-mono text-[#F4F4F6] shadow-2xl shadow-black/80 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-[#A1A1AA] hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
