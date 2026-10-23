import React from 'react';
import {
  ArrowUp,
  Mail,
  Send,
  ExternalLink,
  ShieldCheck,
  Check,
  ArrowRight,
  Youtube,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { SharkoBrandLogo, MarkerUnderline } from '../brand/SharkoBrandLogo';
import { LegalTabId } from '../compliance/LegalCenterModal';
import { VenomButton } from '../ui/VenomSymbioteEngine';

interface StudioFooterProps {
  onOpenSupport?: () => void;
  onOpenDpdp?: () => void;
  onOpenLegalTab?: (tab: LegalTabId) => void;
  onTryFree?: () => void;
}

export const StudioFooter: React.FC<StudioFooterProps> = ({
  onOpenSupport,
  onOpenDpdp,
  onOpenLegalTab,
  onTryFree,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLegal = (tab: LegalTabId) => {
    if (onOpenLegalTab) {
      onOpenLegalTab(tab);
    } else if (onOpenDpdp) {
      onOpenDpdp();
    }
  };

  const handleCta = () => {
    if (onTryFree) {
      onTryFree();
    } else {
      const target = document.getElementById('command-center') || document.getElementById('hero');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        scrollToTop();
      }
    }
  };

  return (
    <footer className="w-full relative z-20 select-none transition-colors duration-300">
      {/* 1. Pre-Footer Call to Action (Image 7 Mirror) */}
      <div className="bg-white dark:bg-[#060913] py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0B0F19] dark:text-white tracking-tight font-display">
            Your first clip could{' '}
            <span className="text-[#0066FF] relative inline-block">
              go live tonight.
              <MarkerUnderline color="blue" showBothSparks>
                <span className="opacity-0">go live tonight.</span>
              </MarkerUnderline>
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-sans">
            Start clipping for free today. Turn your favorite podcasts and long videos into money-making viral shorts.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <VenomButton
              size="lg"
              variant="venom-black"
              onClick={handleCta}
              className="w-full sm:w-auto"
            >
              Try Sharko Free <ArrowRight className="w-5 h-5 ml-1" />
            </VenomButton>
          </div>

          {/* Micro-perks strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
              3 free HD exports / month
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
              Zero watermarks
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
              No credit card required
            </span>
          </div>
        </div>
      </div>

      {/* 2. Fluid Wave Transition SVG */}
      <div className="w-full overflow-hidden leading-none bg-white dark:bg-[#060913] transition-colors duration-300">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 text-[#F8FAFC] dark:text-[#0B1120] preserve-3d transition-colors duration-300"
        >
          <path
            d="M0,32L48,42.7C96,53,192,75,288,69.3C384,64,480,32,576,26.7C672,21,768,43,864,53.3C960,64,1056,64,1152,53.3C1248,43,1344,21,1392,10.7L1440,0L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 3. Multi-Column Footer (Image 7 Mirror) */}
      <div className="bg-[#F8FAFC] dark:bg-[#0B1120] border-t border-slate-200/80 dark:border-slate-800 pt-16 pb-12 text-slate-600 dark:text-slate-400 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
            {/* Col 1 & 2: Brand & Socials */}
            <div className="lg:col-span-2 space-y-5">
              <SharkoBrandLogo size="md" showSubtitle />

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm font-sans">
                The fastest way to build a money-making clipping side hustle. Autonomous AI video
                extraction, multi-speaker reframing, and kinetic subtitles that convert.
              </p>

              {/* Social Channels Row */}
              <div className="flex items-center gap-2.5 pt-1 text-slate-400">
                <a
                  href="https://www.instagram.com/_ranakushagr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 hover:border-[#0066FF] hover:text-[#0066FF] dark:hover:border-[#0066FF] dark:hover:text-[#89CFF0] flex items-center justify-center transition-colors shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me/Kushagr_Rana"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 hover:border-[#0066FF] hover:text-[#0066FF] dark:hover:border-[#0066FF] dark:hover:text-[#89CFF0] flex items-center justify-center transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href="https://www.threads.com/@_ranakushagr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 hover:border-[#0066FF] hover:text-[#0066FF] dark:hover:border-[#0066FF] dark:hover:text-[#89CFF0] flex items-center justify-center transition-colors shadow-sm font-bold text-xs"
                >
                  @
                </a>
                <a
                  href="mailto:kushagrrana7345@gmail.com"
                  aria-label="Email"
                  className="w-8 h-8 rounded-lg bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 hover:border-[#0066FF] hover:text-[#0066FF] dark:hover:border-[#0066FF] dark:hover:text-[#89CFF0] flex items-center justify-center transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 3: Product */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-sans">
                Product
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <li>
                  <a href="#studio" className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors">
                    Viral 9:16 Strip
                  </a>
                </li>
                <li>
                  <a href="#studio" className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors">
                    Smart Reframe
                  </a>
                </li>
                <li>
                  <a href="#studio" className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors">
                    Kinetic Captions
                  </a>
                </li>
                <li>
                  <a href="#bounties" className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors">
                    Creator Bounties
                  </a>
                </li>
                <li>
                  <a href="#simulator" className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors">
                    Income Calculator
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Company */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-sans">
                Company
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <li>
                  <a href="#why-sharko" className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors">
                    Why Sharko
                  </a>
                </li>
                <li>
                  <a href="#why-sharko" className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors">
                    Reviews & Wall of Love
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors">
                    Pricing Plans
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:kushagrrana7345@gmail.com"
                    className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors"
                  >
                    Contact Founder
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 5: Tools & Formats */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-sans">
                Tools
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <li>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">YouTube to Shorts</span>
                </li>
                <li>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Twitch Clip Cutter</span>
                </li>
                <li>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Podcast Repurposer</span>
                </li>
                <li>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">Auto Subtitles AI</span>
                </li>
                <li>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">5 Aspect Ratios</span>
                </li>
              </ul>
            </div>

            {/* Col 6: Legal & Compliance */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-sans">
                Legal & DPDP
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('terms')}
                    className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors text-left cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('privacy')}
                    className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors text-left cursor-pointer"
                  >
                    India DPDP Act & Privacy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('cookies')}
                    className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors text-left cursor-pointer"
                  >
                    Cookie Policy & Consent
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleOpenLegal('refunds')}
                    className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors text-left cursor-pointer"
                  >
                    Refund Policy
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/Rana-Kushagr/ClipMax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0066FF] dark:hover:text-[#89CFF0] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>GitHub Repository</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Founder Direct Card in Soft Ice Blue */}
          <div className="my-8 rounded-2xl border border-[#BFDBFE]/60 dark:border-blue-900/40 bg-[#EEF6FF] dark:bg-[#0F172A] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-[#BFDBFE] dark:border-slate-700 text-[11px] font-bold text-[#0066FF] dark:text-[#89CFF0]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Founder Desk & Direct Support</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Have questions about high-volume API or brand campaigns?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Reach founder Kushagr Rana directly at kushagrrana7345@gmail.com or Telegram @Kushagr_Rana.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="mailto:kushagrrana7345@gmail.com"
                className="px-4 py-2 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Founder</span>
              </a>
              <a
                href="https://t.me/Kushagr_Rana"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-[#0066FF] dark:text-[#89CFF0]" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Bottom Hairline Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 font-sans">
            <div>
              &copy; {new Date().getFullYear()} Sharko Systems Inc. All rights reserved. Zero credits burned on previews.
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400 dark:text-slate-500">Hunt the Moment</span>
              <button
                type="button"
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#0066FF] dark:hover:text-[#89CFF0] hover:border-[#0066FF] transition-colors shadow-sm cursor-pointer"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
