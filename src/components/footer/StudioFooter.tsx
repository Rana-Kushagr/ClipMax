import React from "react";
import {
  ShieldCheck,
  Terminal,
  Cpu,
  ArrowUp,
  Github,
  Mail,
  Send,
  MessageCircle,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { SharkoLogo } from "../brand/SharkoLogo";

interface StudioFooterProps {
  onOpenSupport?: () => void;
  onOpenDpdp?: () => void;
}

export const StudioFooter: React.FC<Readonly<StudioFooterProps>> = ({
  onOpenSupport,
  onOpenDpdp,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#17120C]/90 backdrop-blur-md relative z-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F3E5AB]/10">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <SharkoLogo />

            <p className="text-xs text-[#A1A1AA] max-w-sm leading-relaxed font-sans">
              Autonomous AI video extraction, multi-speaker reframing, and kinetic subtitle
              engine designed for high-velocity content operations. Hunt the moments that convert.
            </p>

            {/* Telemetry Status Bar */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#2A2016] border border-[#F3E5AB]/15 text-[11px] font-mono text-[#A1A1AA]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-white">All Systems Operational</span>
              <span className="text-white/20">•</span>
              <span className="text-[#F3E5AB]">29.97 FPS Engine</span>
            </div>
          </div>

          {/* Col 3: Engine */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F3E5AB] font-semibold">
              Studio Engine
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#A1A1AA]">
              <li>
                <a href="#walkthrough" className="hover:text-[#F3E5AB] transition-colors">
                  Audio Peak Detection
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-[#F3E5AB] transition-colors">
                  Autonomous Reframe
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-[#F3E5AB] transition-colors">
                  Kinetic Captions
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-[#F3E5AB] transition-colors">
                  Telegram Approval Bot
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Ecosystem & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F3E5AB] font-semibold">
              Ecosystem & DPDP
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#A1A1AA]">
              <li>
                <a href="#why-sharko" className="hover:text-[#F3E5AB] transition-colors">
                  Why Sharko (vs Opus/Vizard)
                </a>
              </li>
              <li>
                <a href="#section-faq" className="hover:text-[#F3E5AB] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDpdp}
                  className="hover:text-[#F3E5AB] transition-colors text-left text-xs font-mono"
                >
                  India DPDP Act & Privacy Center
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenDpdp}
                  className="hover:text-[#F3E5AB] transition-colors text-left text-xs font-mono text-[#D99B52]"
                >
                  Grievance Officer (Sec. 13)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenSupport}
                  className="hover:text-[#F3E5AB] transition-colors text-left text-xs font-mono text-[#10B981]"
                >
                  Support Desk (Kushagr Rana)
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/Rana-Kushagr/ClipMax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F3E5AB] transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F3E5AB] font-semibold">
              Technical Stack
            </h4>
            <div className="space-y-2 text-[11px] font-mono text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-[#F4F4F6]">React 19 + TypeScript 5</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#D99B52]" />
                <span className="text-[#F4F4F6]">Vite 6 + GSAP 3 Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F3E5AB]" />
                <span className="text-[#F4F4F6]">India DPDP 2023 Conforming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Founder & Direct Support Hub Card */}
        <div className="my-10 rounded-2xl border border-[#F3E5AB]/20 bg-[#1D160F] p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[11px] font-mono text-[#34D399]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Founder Desk & Direct Support</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                Connect Directly with Kushagr Rana
              </h3>
              <p className="text-xs text-[#E5E0D8]/75 font-sans max-w-xl">
                Questions about high-volume API keys, enterprise DPDP data agreements, or brand bounty sponsorships? Direct response within 24 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="mailto:kushagrrana7345@gmail.com"
                className="px-3.5 py-2 rounded-xl bg-[#F3E5AB] hover:bg-white text-[#17120C] font-mono text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>kushagrrana7345@gmail.com</span>
              </a>

              <a
                href="https://t.me/Kushagr_Rana"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl border border-[#F3E5AB]/25 bg-[#2A2016] hover:bg-[#382B1E] text-white font-mono text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Telegram: @Kushagr_Rana</span>
              </a>

              <a
                href="https://www.instagram.com/_ranakushagr/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl border border-[#F3E5AB]/25 bg-[#2A2016] hover:bg-[#382B1E] text-white font-mono text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#D99B52]" />
                <span>Instagram: @_ranakushagr</span>
              </a>

              <a
                href="https://www.threads.com/@_ranakushagr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl border border-[#F3E5AB]/25 bg-[#2A2016] hover:bg-[#382B1E] text-white font-mono text-xs font-medium transition-all flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#F3E5AB]" />
                <span>Threads: @_ranakushagr</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Hairline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A1A1AA]">
          <div>
            &copy; {new Date().getFullYear()} Sharko Cinema Systems Inc. Hunt the Moments. Zero credits burned on previews.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#D99B52]">SMPTE ST 2067-21 Conforming</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#2A2016] border border-[#F3E5AB]/20 text-[#F3E5AB] hover:text-white hover:border-[#F3E5AB]/50 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
