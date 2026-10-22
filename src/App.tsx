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
import { WhySharkoComparison } from "./components/comparison/WhySharkoComparison";
import { StudioFaqSection } from "./components/faq/StudioFaqSection";
import { DpdpConsentBanner } from "./components/compliance/DpdpConsentBanner";
import { DpdpRightsModal } from "./components/compliance/DpdpRightsModal";
import { SupportContactDrawer } from "./components/support/SupportContactDrawer";
import { StudioFooter } from "./components/footer/StudioFooter";
import { NoiseOverlay } from "./components/react-bits/NoiseOverlay";
import { SharkoAuthModal } from "./components/auth/SharkoAuthModal";
import { SmartOptionsState } from "./components/hero/SmartOptionsDrawer";
import { useClipMaxGsap } from "./hooks/useClipMaxGsap";
import { CheckCircle2, X } from "lucide-react";

interface SharkoBlockProps {
  variant: "block-a" | "block-b";
  children: React.ReactNode;
}

function SharkoBlock({ variant, children }: Readonly<SharkoBlockProps>) {
  const blockClass = variant === "block-a" ? "sharko-block-a" : "sharko-block-b";
  return (
    <div className={`relative ${blockClass}`}>
      {children}
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

  // Authentication Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<"login" | "signup">("login");

  const handleOpenAuth = (mode: "login" | "signup" = "login") => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  // Support & India DPDP Act modal states
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isDpdpRightsOpen, setIsDpdpRightsOpen] = useState(false);

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
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] selection:bg-[#89CFF0]/25 selection:text-[#89CFF0] relative overflow-x-hidden font-sans">
      {/* 1. Top Viewport GSAP Scroll Progress Ribbon */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0047AB] via-[#89CFF0] to-[#FFFFFF] origin-left z-50 pointer-events-none scale-x-0"
      />

      {/* 2. Normal Scrolling Cinema Desk Background - Moves Naturally with Page Content */}
      <StudioEnvironmentBg heroImageUrl={`${import.meta.env.BASE_URL}cinema-desk-bg.jpg`} />

      {/* 3. Kodak Vision3 35mm Micro SVG Noise Grain Texture */}
      <NoiseOverlay opacity={0.024} />

      {/* 4. Global App Header */}
      <AppHeader
        freeExportsCount={optimisticFreeExports}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenDpdp={() => setIsDpdpRightsOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* 5. Hero Section with Viewfinder HUD and Command Center (No bottom border!) */}
      <section
        id="hero"
        className="relative min-h-[92vh] pt-28 lg:pt-36 pb-24 flex flex-col justify-center overflow-hidden scroll-mt-20 sm:scroll-mt-24"
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
            onSelectStudioTab={setActiveStudioTab}
          />
        </div>
      </section>

      {/* =========================================================================
          COLOUR BLOCK A: Deep Obsidian Void (#000000) with Subtle Cobalt Accent Ambient
          Contains: Section 01: How Sharko Works Walkthrough
          ========================================================================= */}
      <SharkoBlock variant="block-a">
        {/* Section 01: How It Works 60FPS Walkthrough */}
        <section id="walkthrough" className="py-24 relative overflow-hidden z-10 scroll-mt-20 sm:scroll-mt-24">
          {/* Subtle Cobalt Refraction Glow */}
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[650px] h-[350px] pointer-events-none -z-10 blur-[130px]"
            style={{ background: "rgba(0, 71, 171, 0.12)" }}
            aria-hidden="true"
          />
          <HowItWorksWalkthrough onLoadWorkflowSample={handleLoadWorkflowSample} />
        </section>
      </SharkoBlock>

      {/* =========================================================================
          COLOUR BLOCK B: Deep Obsidian with Sky Blue Accent Ambient
          Contains: Section 02: AI Studio Interactive Workspace
          ========================================================================= */}
      <SharkoBlock variant="block-b">
        {/* Section 02: AI Studio Interactive Workspace (No top border!) */}
        <section id="studio" className="py-24 relative overflow-hidden z-10 scroll-mt-20 sm:scroll-mt-24">
          {/* Subtle Studio Sky Blue Floor Reflection */}
          <div
            className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none -z-10 blur-[130px]"
            style={{ background: "rgba(137, 207, 240, 0.08)" }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-3xl sm:text-4xl font-display font-bold text-[#FFFFFF] tracking-tight"
              >
                Cinema-grade AI studio,{" "}
                <span className="serif-italic text-[#89CFF0]">built for retention.</span>
              </motion.h2>
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
      </SharkoBlock>

      {/* =========================================================================
          COLOUR BLOCK A: Deep Obsidian Void (#000000) with Subtle Olive & Cobalt
          Contains: Section 02b: Why Sharko, Section 03: Bounty Marketplace & Profit Simulator
          ========================================================================= */}
      <SharkoBlock variant="block-a">
        {/* Section 02b: Why Sharko — Architecture & Competitor Comparison (No top border!) */}
        <WhySharkoComparison />

        {/* Section 03: Bounty Marketplace (No top border!) */}
        <section id="bounties" className="py-24 relative overflow-hidden z-10 scroll-mt-20 sm:scroll-mt-24">
          <span id="section-bounties" className="absolute -top-20" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#FFFFFF]"
              >
                Monetize your clipping skills with{" "}
                <span className="serif-italic font-normal text-[#89CFF0]">instant bounties.</span>
              </motion.h2>
              <p className="text-sm text-zinc-400 font-sans">
                Browse verified brand campaigns, generate high-performing shorts in 1-click, and
                claim direct payouts from locked escrow pools.
              </p>
            </div>

            <BountyCampaignGrid
              onSelectCampaign={handleSelectCampaign}
              triggerToast={(msg) => setToastMessage(msg)}
            />
          </div>
        </section>

        {/* Section 03b: Earnings Profit Simulator (No top border!) */}
        <section id="simulator" className="py-24 relative overflow-hidden z-10 scroll-mt-20 sm:scroll-mt-24">
          <span id="section-calculator" className="absolute -top-20" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-3xl sm:text-4xl font-display font-bold text-[#FFFFFF] tracking-tight"
              >
                Calculate your{" "}
                <span className="serif-italic text-[#89CFF0]">monthly</span> short-form earnings.
              </motion.h2>
              <p className="text-sm text-zinc-400 font-sans">
                Real-time projection based on verified CPMs ($3.50 – $4.25 / 1K views) across YouTube
                Shorts, TikTok, and Instagram Reels.
              </p>
            </div>

            <ProfitSimulator />
          </div>
        </section>
      </SharkoBlock>

      {/* =========================================================================
          COLOUR BLOCK B: Deep Obsidian with Sky Blue Accent Ambient
          Contains: Section 04: Pricing & Studio Footer
          ========================================================================= */}
      <SharkoBlock variant="block-b">
        {/* Section 04: Output-Only Pricing (No top border!) */}
        <section id="pricing" className="py-24 relative overflow-hidden z-10 scroll-mt-20 sm:scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-3xl sm:text-4xl font-display font-bold text-[#FFFFFF] tracking-tight"
              >
                Zero credits burned on previews.{" "}
                <span className="serif-italic text-[#89CFF0]">Pay only for finished exports.</span>
              </motion.h2>
              <p className="text-sm text-zinc-400 font-sans">
                No subscriptions that expire unused. All plans include 100% credit rollover and zero
                watermarks.
              </p>
            </div>

            <OutputOnlyPricing />
          </div>
        </section>

        {/* Section 05: Frequently Asked Questions (No top border!) */}
        <StudioFaqSection />

        {/* Studio Footer with Direct Contact Hub & DPDP Links */}
        <StudioFooter
          onOpenSupport={() => setIsSupportOpen(true)}
          onOpenDpdp={() => setIsDpdpRightsOpen(true)}
        />
      </SharkoBlock>

      {/* Split-Screen Sharko Auth Experience (Modal Portal) */}
      <SharkoAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authInitialMode}
      />

      {/* Official Support & Founder Contact Desk Drawer */}
      <SupportContactDrawer
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* India DPDP Act 2023 Statutory Rights Center Modal */}
      <DpdpRightsModal
        isOpen={isDpdpRightsOpen}
        onClose={() => setIsDpdpRightsOpen(false)}
        triggerToast={(msg) => setToastMessage(msg)}
      />

      {/* India DPDP Act 2023 Itemized Consent Banner */}
      <DpdpConsentBanner
        onOpenRightsModal={() => setIsDpdpRightsOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#050B16] border border-[#89CFF0]/50 text-xs font-mono text-[#FFFFFF] shadow-2xl shadow-black/80 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#89CFF0] shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-zinc-400 hover:text-white"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
