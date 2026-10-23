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

interface StudioFooterProps {
  onOpenSupport?: () => void;
  onOpenDpdp?: () => void;
  onTryFree?: () => void;
}

export const StudioFooter: React.FC<StudioFooterProps> = ({
  onOpenSupport,
  onOpenDpdp,
  onTryFree,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <footer className="w-full relative z-20 select-none">
      {/* 1. Pre-Footer Call to Action (Image 7 Mirror) */}
      <div className="bg-white py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-t border-slate-100">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#0B0F19] tracking-tight font-display">
            Your first clip could{' '}
            <span className="text-[#0066FF] relative inline-block">
              go live tonight.
              <MarkerUnderline color="blue" showBothSparks>
                <span className="opacity-0">go live tonight.</span>
              </MarkerUnderline>
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto font-sans">
            Start clipping for free today. Turn your favorite podcasts and long videos into money-making viral shorts.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleCta}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-base shadow-[0_10px_25px_rgba(0,102,255,0.3)] hover:shadow-[0_14px_35px_rgba(0,102,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Try Sharko Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Micro-perks strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              3 free HD exports / month
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              Zero watermarks
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              No credit card required
            </span>
          </div>
        </div>
      </div>

      {/* 2. Fluid Wave Transition SVG */}
      <div className="w-full overflow-hidden leading-none bg-white">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 text-[#F8FAFC] preserve-3d"
        >
          <path
            d="M0,32L48,42.7C96,53,192,75,288,69.3C384,64,480,32,576,26.7C672,21,768,43,864,53.3C960,64,1056,64,1152,53.3C1248,43,1344,21,1392,10.7L1440,0L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* 3. Multi-Column Footer (Image 7 Mirror) */}
      <div className="bg-[#F8FAFC] border-t border-slate-200/80 pt-16 pb-12 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-200">
            {/* Col 1 & 2: Brand & Socials */}
            <div className="lg:col-span-2 space-y-5">
              <SharkoBrandLogo size="md" showSubtitle />

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm font-sans">
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
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-[#0066FF] hover:text-[#0066FF] flex items-center justify-center transition-colors shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://t.me/Kushagr_Rana"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-[#0066FF] hover:text-[#0066FF] flex items-center justify-center transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </a>
                <a
                  href="https://www.threads.com/@_ranakushagr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-[#0066FF] hover:text-[#0066FF] flex items-center justify-center transition-colors shadow-sm font-bold text-xs"
                >
                  @
                </a>
                <a
                  href="mailto:kushagrrana7345@gmail.com"
                  aria-label="Email"
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:border-[#0066FF] hover:text-[#0066FF] flex items-center justify-center transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 3: Product */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                Product
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-500">
                <li>
                  <a href="#studio" className="hover:text-[#0066FF] transition-colors">
                    Viral 9:16 Strip
                  </a>
                </li>
                <li>
                  <a href="#studio" className="hover:text-[#0066FF] transition-colors">
                    Smart Reframe
                  </a>
                </li>
                <li>
                  <a href="#studio" className="hover:text-[#0066FF] transition-colors">
                    Kinetic Captions
                  </a>
                </li>
                <li>
                  <a href="#bounties" className="hover:text-[#0066FF] transition-colors">
                    Creator Bounties
                  </a>
                </li>
                <li>
                  <a href="#simulator" className="hover:text-[#0066FF] transition-colors">
                    Income Calculator
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Comparison & Company */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                Company
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-500">
                <li>
                  <a href="#why-sharko" className="hover:text-[#0066FF] transition-colors">
                    Why Sharko
                  </a>
                </li>
                <li>
                  <a href="#why-sharko" className="hover:text-[#0066FF] transition-colors">
                    Reviews & Wall of Love
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-[#0066FF] transition-colors">
                    Pricing Plans
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#0066FF] transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:kushagrrana7345@gmail.com"
                    className="hover:text-[#0066FF] transition-colors"
                  >
                    Contact Founder
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 5: Tools & Formats */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                Tools
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-500">
                <li>
                  <span className="text-slate-700 font-medium">YouTube to Shorts</span>
                </li>
                <li>
                  <span className="text-slate-700 font-medium">Twitch Clip Cutter</span>
                </li>
                <li>
                  <span className="text-slate-700 font-medium">Podcast Repurposer</span>
                </li>
                <li>
                  <span className="text-slate-700 font-medium">Auto Subtitles AI</span>
                </li>
                <li>
                  <span className="text-slate-700 font-medium">5 Aspect Ratios</span>
                </li>
              </ul>
            </div>

            {/* Col 6: Legal & DPDP Compliance */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                Legal & DPDP
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-500">
                <li>
                  <button
                    type="button"
                    onClick={onOpenDpdp}
                    className="hover:text-[#0066FF] transition-colors text-left"
                  >
                    India DPDP Act 2023
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenDpdp}
                    className="hover:text-[#0066FF] transition-colors text-left"
                  >
                    Privacy Rights Center
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenDpdp}
                    className="hover:text-[#0066FF] transition-colors text-left"
                  >
                    Grievance Officer (Sec. 13)
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/Rana-Kushagr/ClipMax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#0066FF] transition-colors flex items-center gap-1"
                  >
                    <span>GitHub Open Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Founder Direct Card in Soft Ice Blue */}
          <div className="my-8 rounded-2xl border border-[#BFDBFE]/60 bg-[#EEF6FF] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#BFDBFE] text-[11px] font-bold text-[#0066FF]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Founder Desk & Direct Support</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                Have questions about high-volume API or brand campaigns?
              </h4>
              <p className="text-xs text-slate-600">
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
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Bottom Hairline Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
            <div>
              &copy; {new Date().getFullYear()} Sharko Systems Inc. All rights reserved. Zero credits burned on previews.
            </div>

            <div className="flex items-center gap-4">
              <span className="text-slate-400">Hunt the Moment</span>
              <button
                type="button"
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#0066FF] hover:border-[#0066FF] transition-colors shadow-sm cursor-pointer"
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
