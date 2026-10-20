import React from "react";
import { Film, ShieldCheck, Terminal, Cpu, ArrowUp, Github } from "lucide-react";

export const StudioFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#08090B] border-t border-white/[0.08] relative z-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Film className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg text-zinc-100 tracking-tight">
                Clip<span className="text-emerald-400">Max</span> Studio
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Autonomous AI video extraction, multi-speaker reframing, and kinetic subtitle
              engine designed for high-velocity content operations.
            </p>

            {/* Telemetry Status Bar */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#0E1014] border border-white/[0.06] text-[11px] font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">29.97 FPS Engine</span>
            </div>
          </div>

          {/* Col 3: Engine */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Studio Engine
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <a href="#walkthrough" className="hover:text-emerald-400 transition-colors">
                  Audio Peak Detection
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-emerald-400 transition-colors">
                  Autonomous Reframe
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-emerald-400 transition-colors">
                  Kinetic Captions
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-emerald-400 transition-colors">
                  Telegram Approval Bot
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Creator Economy */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li>
                <a href="#bounties" className="hover:text-emerald-400 transition-colors">
                  Bounty Marketplace
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-emerald-400 transition-colors">
                  Profit Calculator
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-emerald-400 transition-colors">
                  Output-Only Plans
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Rana-Kushagr/ClipMax"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Architecture */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Technical Stack
            </h4>
            <div className="space-y-2 text-[11px] font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>React 19 + TypeScript 5</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#E06D3B]" />
                <span>Vite 6 + GSAP 3 Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>WCAG 2.2 AA Conforming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hairline Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} ClipMax Cinema Systems Inc. Zero credits burned on previews.
          </div>

          <div className="flex items-center gap-4">
            <span>SMPTE ST 2067-21 Conforming</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#0E1014] border border-white/[0.08] text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
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
