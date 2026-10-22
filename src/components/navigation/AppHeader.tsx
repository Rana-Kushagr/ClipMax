import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Headphones,
  LogIn,
  Sparkles,
} from "lucide-react";
import { Magnet } from "../react-bits/Magnet";
import { DecryptedText } from "../react-bits/DecryptedText";
import { SharkoLogo } from "../brand/SharkoLogo";

interface AppHeaderProps {
  freeExportsCount: number;
  onOpenSupport?: () => void;
  onOpenDpdp?: () => void;
  onOpenAuth?: (mode?: 'login' | 'signup') => void;
}

export const AppHeader: React.FC<Readonly<AppHeaderProps>> = ({
  freeExportsCount,
  onOpenSupport,
  onOpenAuth,
}) => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navItems = [
    { id: "hero", label: "Overview & Command" },
    { id: "walkthrough", label: "How It Works" },
    { id: "studio", label: "Cinema AI Studio" },
    { id: "why-sharko", label: "Why Sharko" },
    { id: "bounties", label: "Bounties & Escrow" },
    { id: "simulator", label: "Profit Calculator" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQs" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = [
        "hero",
        "walkthrough",
        "studio",
        "why-sharko",
        "bounties",
        "simulator",
        "pricing",
        "section-faq",
      ];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          const matched = sections[i] === "section-faq" ? "faq" : sections[i];
          setActiveSection(matched);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const targetId = id === "faq" ? "section-faq" : id;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#000000]/95 backdrop-blur-md border-b border-[#89CFF0]/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
            : "bg-transparent border-b border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-left group transition-transform active:scale-95 touch-manipulation"
              aria-label="Sharko — Hunt the Moments"
            >
              <SharkoLogo />
            </button>
          </div>

          {/* Center Desktop Navigation Pill Bar */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#050D1E]/80 border border-[#89CFF0]/20 backdrop-blur-md">
            {navItems.slice(1).map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono transition-colors duration-200 rounded-full select-none ${
                    isActive ? "text-[#89CFF0] font-bold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="headerNavPill"
                      className="absolute inset-0 rounded-full bg-[#0047AB]/30 border border-[#89CFF0]/50 -z-10 shadow-[0_0_12px_rgba(137,207,240,0.25)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Log In, Support, Credit Counter & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Log In / Sign Up Trigger */}
            {onOpenAuth && (
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#89CFF0]/30 bg-[#050D1E] hover:border-[#89CFF0] text-[#89CFF0] font-mono text-xs font-semibold transition touch-manipulation"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            )}

            {/* Support Desk Button */}
            {onOpenSupport && (
              <button
                type="button"
                onClick={onOpenSupport}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#89CFF0]/25 bg-[#030914] hover:bg-[#0047AB]/25 text-[#89CFF0] font-mono text-xs transition"
              >
                <Headphones className="w-3.5 h-3.5 text-[#89CFF0]" />
                <span>Support</span>
              </button>
            )}

            {/* Credit Counter */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#050D1E] border border-[#89CFF0]/20 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#89CFF0] animate-pulse" />
              <span className="text-zinc-400">Credits:</span>
              <span className="text-white font-bold tabular-nums">
                <DecryptedText text={`${freeExportsCount}/3 Free HD`} speed={30} />
              </span>
            </div>

            {/* Primary Action Button */}
            <Magnet strength={0.2}>
              <button
                onClick={() => onOpenAuth ? onOpenAuth('signup') : scrollToSection("hero")}
                className="btn-sharko-primary py-2 px-4 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition active:scale-95 touch-manipulation shadow-md"
              >
                <span>Start Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Magnet>

            {/* 44x44px Mobile Hamburger Button (Touch Target Optimized) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-xl bg-[#050D1E] border border-[#89CFF0]/30 text-[#89CFF0] hover:border-[#89CFF0] active:scale-95 transition touch-manipulation"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Drawer (320px–767px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[9998] bg-[#000000]/98 backdrop-blur-2xl p-5 sm:p-6 flex flex-col justify-between md:hidden overflow-y-auto"
          >
            {/* Top Bar inside Drawer */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#89CFF0]/20">
                <SharkoLogo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#89CFF0]/30 bg-[#050D1E] text-white hover:border-[#89CFF0] active:scale-95 transition touch-manipulation"
                  aria-label="Close mobile navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Export Status Pill */}
              <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-[#000B1D] border border-[#89CFF0]/25 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#89CFF0] animate-pulse" />
                  <span className="text-zinc-300">Free Studio Balance:</span>
                </div>
                <span className="text-[#89CFF0] font-bold">{freeExportsCount} / 3 HD Exports</span>
              </div>

              {/* 48px-Tall Nav Items for One-Thumb Ergonomics */}
              <nav className="mt-4 space-y-1.5" aria-label="Mobile Navigation Links">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full min-h-[48px] px-4 rounded-xl text-left font-display text-[15px] font-semibold flex items-center justify-between transition-colors touch-manipulation ${
                        isActive
                          ? "bg-[#0047AB]/30 border border-[#89CFF0]/50 text-[#89CFF0]"
                          : "text-zinc-300 hover:text-white hover:bg-[#050D1E] border border-transparent"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className={`w-4 h-4 ${isActive ? "text-[#89CFF0]" : "text-zinc-600"}`} />
                    </button>
                  );
                })}
              </nav>

              {/* Auth CTA in Mobile Drawer */}
              {onOpenAuth && (
                <div className="mt-4 pt-3 border-t border-[#89CFF0]/15 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('signup');
                    }}
                    className="btn-sharko-primary w-full min-h-[48px] rounded-xl font-display text-[14px] font-extrabold flex items-center justify-center gap-2 touch-manipulation"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Create Studio Account & Claim 3 HD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="w-full min-h-[44px] rounded-xl border border-[#89CFF0]/30 bg-[#050D1E] text-[#89CFF0] font-mono text-xs font-semibold flex items-center justify-center gap-2 touch-manipulation"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Log In to Existing Studio</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Founder & Support Links */}
            <div className="pt-4 border-t border-[#89CFF0]/20 font-mono text-[11.5px] text-zinc-400 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#89CFF0] font-semibold">DIRECT FOUNDER DESK</span>
                <span className="text-[10px] text-zinc-500">Kushagr Rana</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <a
                  href="mailto:kushagrrana7345@gmail.com"
                  className="p-2 rounded-lg bg-[#050D1E] border border-[#89CFF0]/20 text-[#89CFF0] text-center truncate hover:underline"
                >
                  kushagrrana7345@gmail.com
                </a>
                <a
                  href="https://t.me/Kushagr_Rana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#050D1E] border border-[#89CFF0]/20 text-[#89CFF0] text-center hover:underline"
                >
                  Telegram: @Kushagr_Rana
                </a>
                <a
                  href="https://www.instagram.com/_ranakushagr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#050D1E] border border-[#89CFF0]/20 text-[#89CFF0] text-center hover:underline"
                >
                  IG: @_ranakushagr
                </a>
                <a
                  href="https://www.threads.net/@_ranakushagr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[#050D1E] border border-[#89CFF0]/20 text-[#89CFF0] text-center hover:underline"
                >
                  Threads: @_ranakushagr
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppHeader;
