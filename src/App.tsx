import React, { useState, useOptimistic, useTransition } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppHeader } from './components/navigation/AppHeader';
import { HeroCommandCenter } from './components/hero/HeroCommandCenter';
import { HowItWorksWalkthrough } from './components/walkthrough/HowItWorksWalkthrough';
import { InteractiveStudioShowcase, StudioTabId } from './components/studio/InteractiveStudioShowcase';
import { BountyCampaignGrid } from './components/bounties/BountyCampaignGrid';
import { ProfitSimulator } from './components/bounties/ProfitSimulator';
import { OutputOnlyPricing } from './components/bounties/OutputOnlyPricing';
import { WhySharkoComparison } from './components/comparison/WhySharkoComparison';
import { StudioFaqSection } from './components/faq/StudioFaqSection';
import { DpdpConsentBanner } from './components/compliance/DpdpConsentBanner';
import { DpdpRightsModal } from './components/compliance/DpdpRightsModal';
import { LegalCenterModal, LegalTabId } from './components/compliance/LegalCenterModal';
import { SupportContactDrawer } from './components/support/SupportContactDrawer';
import { StudioFooter } from './components/footer/StudioFooter';
import { SharkoAuthModal } from './components/auth/SharkoAuthModal';
import { SmartOptionsState } from './components/hero/SmartOptionsDrawer';
import { useClipMaxGsap } from './hooks/useClipMaxGsap';
import { VenomSymbioteEngine } from './components/ui/VenomSymbioteEngine';
import { CheckCircle2, X } from 'lucide-react';

export function App() {
  const { progressBarRef } = useClipMaxGsap();

  // React 19 useOptimistic for free export credits
  const [actualFreeExports, setActualFreeExports] = useState(3);
  const [, startTransition] = useTransition();
  const [optimisticFreeExports, setOptimisticFreeExports] = useOptimistic(
    actualFreeExports,
    (current, decrementAmount: number) => Math.max(0, current - decrementAmount)
  );

  // Studio State
  const [studioMode, setStudioMode] = useState<'lightning' | 'studio'>('lightning');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    'Podcast & Interview',
    'Dev & Architecture',
  ]);
  const [promptQuery, setPromptQuery] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(7200);
  const [selectedPersona, setSelectedPersona] = useState('auto');
  const [activeTool, setActiveTool] = useState('auto-detect');
  const [videoUrl, setVideoUrl] = useState('');
  const [activeStudioTab, setActiveStudioTab] = useState<StudioTabId>('strip');

  // Export success notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication Modal State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('signup');

  const handleOpenAuth = (mode: 'login' | 'signup' = 'signup') => {
    setAuthInitialMode(mode);
    setIsAuthOpen(true);
  };

  // Support & India DPDP Act / Legal modal states
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isDpdpRightsOpen, setIsDpdpRightsOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<{ open: boolean; tab: LegalTabId }>({
    open: false,
    tab: 'terms',
  });

  const handleOpenLegalTab = (tab: LegalTabId) => {
    setLegalModal({ open: true, tab });
  };

  const handleClipsGenerated = () => {
    const studioSection = document.getElementById('studio');
    if (studioSection) {
      studioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCampaign = (url: string) => {
    setVideoUrl(url);
    const commandCenter = document.getElementById('command-center') || document.getElementById('hero');
    if (commandCenter) {
      commandCenter.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadWorkflowSample = () => {
    setVideoUrl('https://youtube.com/watch?v=LexFridman_AI_Architecture_DeepDive');
    const commandCenter = document.getElementById('command-center') || document.getElementById('hero');
    if (commandCenter) {
      commandCenter.scrollIntoView({ behavior: 'smooth' });
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
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#060913] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-[#0066FF]/20 selection:text-[#0066FF] relative overflow-x-hidden font-sans">
        {/* Global Multi-Button Venom Symbiote Tendril Engine */}
        <VenomSymbioteEngine engageDistance={145} maxStretchDistance={235} />

        {/* 1. Top Viewport GSAP Scroll Progress Ribbon */}
        <div
          ref={progressBarRef}
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0066FF] via-[#FF1464] to-[#0066FF] origin-left z-50 pointer-events-none scale-x-0"
        />

        {/* 2. Global Sticky Header with Top Promo Marquee & Day/Night Toggle */}
        <AppHeader
          freeExportsCount={optimisticFreeExports}
          onOpenSupport={() => setIsSupportOpen(true)}
          onOpenDpdp={() => handleOpenLegalTab('privacy')}
          onOpenAuth={handleOpenAuth}
        />

        {/* 3. Hero Section (Image 1 Mirror) */}
        <section id="hero" className="relative scroll-mt-20">
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
            onOpenAuth={handleOpenAuth}
          />
        </section>

        {/* 4. Section 2: Payout Bento Grid & Real Sponsor Intake (Image 2 Mirror) */}
        <section id="bounties" className="relative scroll-mt-20">
          <BountyCampaignGrid
            onSelectCampaign={handleSelectCampaign}
            triggerToast={(msg) => setToastMessage(msg)}
          />
        </section>

        {/* 5. Section 3: Interactive Studio Workspace (Viral Strip, Reframe, Captions, Bot) */}
        <section id="studio" className="py-16 bg-[#F8FAFC] dark:bg-[#0B1120] border-y border-slate-200/80 dark:border-slate-800 relative scroll-mt-20 transition-colors duration-300">
          <span id="features" className="absolute -top-20" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InteractiveStudioShowcase
              activeStudioTab={activeStudioTab}
              setActiveStudioTab={setActiveStudioTab}
              onExportSuccess={handleExportSuccess}
            />
          </div>
        </section>

        {/* 6. Section 4: How It Works Walkthrough */}
        <section id="walkthrough" className="py-16 bg-white dark:bg-[#060913] relative scroll-mt-20 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HowItWorksWalkthrough onLoadWorkflowSample={handleLoadWorkflowSample} />
          </div>
        </section>

        {/* 7. Section 5: Profit Simulator (Image 4 Mirror) */}
        <section id="simulator" className="relative scroll-mt-20">
          <ProfitSimulator
            onStartClipping={() => {
              const el = document.getElementById('command-center') || document.getElementById('hero');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </section>

        {/* 8. Section 6: Clippers Who Stayed Reviews & Specification Matrix (Image 5 Mirror) */}
        <section id="why-sharko" className="relative scroll-mt-20">
          <WhySharkoComparison />
        </section>

        {/* 9. Section 7: Output-Only Pricing (Image 3 Mirror) */}
        <section id="pricing" className="relative scroll-mt-20">
          <OutputOnlyPricing
            onSelectPlan={(_planId) => {
              handleOpenAuth('signup');
            }}
          />
        </section>

        {/* 10. Section 8: FAQ Accordion (Image 6 Mirror) */}
        <section id="faq" className="relative scroll-mt-20">
          <StudioFaqSection />
        </section>

        {/* 11. Pre-Footer Call to Action & Multi-Column Footer (Image 7 Mirror) */}
        <StudioFooter
          onOpenSupport={() => setIsSupportOpen(true)}
          onOpenDpdp={() => handleOpenLegalTab('privacy')}
          onOpenLegalTab={handleOpenLegalTab}
          onTryFree={() => {
            const el = document.getElementById('command-center') || document.getElementById('hero');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Split-Screen Sharko Auth Experience (Image 8 Mirror - Never overflows screen) */}
        <SharkoAuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          initialMode={authInitialMode}
          onOpenLegalTab={handleOpenLegalTab}
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

        {/* Interactive 4-Tab Legal Center Modal (Terms, Privacy, Cookies, Refunds) */}
        <LegalCenterModal
          isOpen={legalModal.open}
          initialTab={legalModal.tab}
          onClose={() => setLegalModal((prev) => ({ ...prev, open: false }))}
        />

        {/* India DPDP Act 2023 Itemized Consent Banner */}
        <DpdpConsentBanner
          onOpenLegalTab={handleOpenLegalTab}
        />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-sans text-white shadow-2xl animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
