import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { Magnet } from "../react-bits/Magnet";
import { DecryptedText } from "../react-bits/DecryptedText";
import { SharkoLogo } from "../brand/SharkoLogo";

interface AppHeaderProps {
  freeExportsCount: number;
}

export const AppHeader: React.FC<Readonly<AppHeaderProps>> = ({ freeExportsCount }) => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navItems = [
    { id: "walkthrough", label: "Walkthrough" },
    { id: "studio", label: "AI Studio" },
    { id: "bounties", label: "Bounties" },
    { id: "simulator", label: "Simulator" },
    { id: "pricing", label: "Pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["hero", "walkthrough", "studio", "bounties", "simulator", "pricing"];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08090B]/90 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Engine Version */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-left group transition-transform active:scale-95"
            aria-label="Sharko — Hunt the Moments"
          >
            <SharkoLogo />
          </button>
        </div>

        {/* Center Desktop Navigation Pill Bar */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#0E1014]/80 border border-white/[0.08] backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 text-xs font-mono transition-colors duration-200 rounded-full ${
                  isActive ? "text-emerald-300 font-medium" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="headerNavPill"
                    className="absolute inset-0 rounded-full bg-emerald-500/15 border border-emerald-500/30 -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Credit Counter & Magnet CTA */}
        <div className="flex items-center gap-3">
          {/* Credit Counter */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E1014] border border-white/[0.08] font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-400">Credits:</span>
            <span className="text-zinc-100 font-semibold tabular-nums">
              <DecryptedText text={`${freeExportsCount}/3 Free HD`} speed={30} />
            </span>
          </div>

          {/* Primary Action Button */}
          <Magnet strength={0.2}>
            <button
              onClick={() => scrollToSection("hero")}
              className="py-2 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors shadow-sm shadow-emerald-500/20"
            >
              <span>Start Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Magnet>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#0E1014] border border-white/[0.08] text-zinc-400 hover:text-zinc-100"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#08090B] border-b border-white/[0.08] px-4 py-4 space-y-2 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
              <span className="text-zinc-400">Available Free Renders:</span>
              <span className="text-emerald-400 font-bold">{freeExportsCount} / 3 HD Exports</span>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                  activeSection === item.id
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
