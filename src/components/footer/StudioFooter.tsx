import React from "react";
import { Film, ShieldCheck, Terminal, Cpu, ArrowUp, Github } from "lucide-react";

export const StudioFooter: React.FC = () => {
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
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#F3E5AB]/10 border border-[#F3E5AB]/30 flex items-center justify-center text-[#F3E5AB]">
                <Film className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-[#F4F4F6] tracking-tight">
                Clip<span className="text-[#F3E5AB]">Max</span> Studio
              </span>
            </div>

            <p className="text-xs text-[#A1A1AA] max-w-sm leading-relaxed font-sans">
              Autonomous AI video extraction, multi-speaker reframing, and kinetic subtitle
              engine designed for high-velocity content operations.
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

          {/* Col 4: Creator Economy */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#F3E5AB] font-semibold">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#A1A1AA]">
              <li>
                <a href="#bounties" className="hover:text-[#F3E5AB] transition-colors">
                  Bounty Marketplace
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#F3E5AB] transition-colors">
                  Profit Calculator
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#F3E5AB] transition-colors">
                  Output-Only Plans
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Rana-Kushagr/ClipMax"
                  target="_blank"
                  rel="noreferrer"
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
                <span className="text-[#F4F4F6]">WCAG 2.2 AA Conforming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hairline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A1A1AA]">
          <div>
            &copy; {new Date().getFullYear()} ClipMax Cinema Systems Inc. Zero credits burned on previews.
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
