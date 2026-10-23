import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Headphones,
  LogIn,
  Zap,
} from "lucide-react";
import { SharkoBrandLogo } from "../brand/SharkoBrandLogo";

interface AppHeaderProps {
  freeExportsCount?: number;
  onOpenSupport?: () => void;
  onOpenDpdp?: () => void;
  onOpenAuth?: (mode?: "login" | "signup") => void;
}

const SECTION_ALIASES: Record<string, string[]> = {
  hero: ["hero", "overview"],
  features: ["studio", "features", "section-studio"],
  walkthrough: ["walkthrough", "how-it-works"],
  studio: ["studio", "section-studio"],
  "why-sharko": ["why-sharko", "comparison"],
  bounties: ["bounties", "section-bounties"],
  pricing: ["pricing", "section-pricing"],
  faq: ["section-faq", "faq"],
};

const getTargetElement = (id: string): HTMLElement | null => {
  const candidateIds = SECTION_ALIASES[id] || [id];
  for (const cid of candidateIds) {
    const el = document.getElementById(cid);
    if (el) return el;
  }
  return document.getElementById(id);
};

export const AppHeader: React.FC<Readonly<AppHeaderProps>> = ({
  freeExportsCount = 3,
  onOpenSupport,
  onOpenDpdp,
  onOpenAuth,
}) => {
  const [showPromo, setShowPromo] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navLinks = [
    { id: "features", label: "Features", target: "studio" },
    { id: "walkthrough", label: "How it works", target: "walkthrough" },
    { id: "why-sharko", label: "Why Sharko", target: "why-sharko" },
    { id: "pricing", label: "Pricing", target: "pricing" },
    { id: "faq", label: "FAQ", target: "faq" },
  ];

  const scrollToSection = (targetId: string) => {
    setMobileMenuOpen(false);
    setActiveSection(targetId);

    if (targetId === "hero" || targetId === "overview") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      return;
    }

    const el = getTargetElement(targetId);
    if (el) {
      const navHeight = 76;
      const targetTop = Math.max(0, el.getBoundingClientRect().top + window.scrollY - navHeight);
      window.scrollTo({ top: targetTop, behavior: "smooth" });
      window.history.replaceState(null, "", `#${targetId}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (window.scrollY < 200) {
        setActiveSection("hero");
        return;
      }

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (atBottom) {
        setActiveSection("faq");
        return;
      }

      const targetLine = 150;
      for (const item of navLinks) {
        const el = getTargetElement(item.target);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= targetLine && rect.bottom > targetLine) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      {/* 1. Top Hot-Pink Promo Marquee Banner (Images 1, 2, 3, 6, 7, 8) */}
      {showPromo && (
        <div className="relative h-[38px] bg-gradient-to-r from-[#FF0055] via-[#FF1464] to-[#FF0055] text-white flex items-center justify-between px-3 sm:px-6 overflow-hidden select-none text-[12px] sm:text-[13px] font-bold shadow-sm">
          {/* Marquee Track */}
          <div className="flex-1 overflow-hidden flex items-center">
            <div className="animate-marquee-slow flex items-center gap-6 text-white tracking-wide uppercase">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 shrink-0">
                  <span className="bg-black text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded shadow-sm">
                    30% OFF
                  </span>
                  <span className="flex items-center gap-1.5 font-extrabold tracking-wider">
                    <Zap className="w-3.5 h-3.5 fill-current" /> ENDS SOON
                  </span>
                  <span className="bg-black text-white font-extrabold text-[11px] px-2.5 py-0.5 rounded shadow-sm">
                    30% OFF
                  </span>
                  <span className="font-extrabold tracking-wider">
                    FULL 30% OFF ON ALL PLANS
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            type="button"
            onClick={() => setShowPromo(false)}
            className="ml-3 p-1 text-white/80 hover:text-white hover:bg-black/20 rounded transition"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 2. Sticky Crisp White Navbar (Image 1, 2, 3, 6, 7, 8 Mirror) */}
      <header
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(15,23,42,0.06)] border-b border-slate-100"
            : "bg-white border-b border-slate-100/80"
        }`}
      >
        <div className="max-w-7xl mx-auto h-[70px] sm:h-[72px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Shark-Fin Play Logo & Wordmark */}
          <button
            type="button"
            onClick={() => scrollToSection("hero")}
            className="text-left group transition-transform active:scale-95 touch-manipulation focus:outline-none"
            aria-label="Sharko — Hunt the Moment"
          >
            <SharkoBrandLogo />
          </button>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-[15px] font-medium text-[#334155]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id || activeSection === link.target;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.target)}
                  className={`transition-colors hover:text-[#0066FF] ${
                    isActive ? "text-[#0066FF] font-semibold" : "text-[#334155]"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Log in Button */}
            <button
              type="button"
              onClick={() => onOpenAuth ? onOpenAuth("login") : scrollToSection("hero")}
              className="hidden sm:inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 lg:px-5 py-2.5 text-[14px] font-semibold text-[#0B0F19] shadow-sm hover:bg-slate-50 active:scale-95 transition"
            >
              Log in
            </button>

            {/* Try Sharko Free → (Electric Blue CTA) */}
            <button
              type="button"
              onClick={() => onOpenAuth ? onOpenAuth("signup") : scrollToSection("hero")}
              className="btn-electric-blue rounded-xl px-4 sm:px-5 py-2.5 text-[14px] font-bold text-white flex items-center gap-1.5 active:scale-95 transition"
            >
              <span>Try Sharko Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button (44x44px touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0B0F19] hover:bg-slate-50 active:scale-95 transition"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Slide-Over Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="fixed inset-0 z-[99998] bg-white p-5 sm:p-6 flex flex-col justify-between md:hidden overflow-y-auto"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <SharkoBrandLogo />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 active:scale-95 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free HD Credit Balance */}
              <div className="mt-4 flex items-center justify-between p-3.5 rounded-2xl bg-[#EBF3FF] border border-[#D0E4FF] font-sans text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                  <span className="text-[#334155] font-medium">Free Exports Left:</span>
                </div>
                <span className="text-[#0066FF] font-bold">{freeExportsCount} / 3 HD Exports</span>
              </div>

              {/* Nav Items */}
              <nav className="mt-5 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.target)}
                    className="w-full min-h-[48px] px-4 rounded-xl text-left font-display text-[16px] font-bold text-[#0B0F19] hover:bg-slate-50 flex items-center justify-between transition"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </nav>

              {/* Mobile Auth CTAs */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth("signup");
                  }}
                  className="btn-electric-blue w-full min-h-[50px] rounded-xl font-display text-[15px] font-bold flex items-center justify-center gap-2"
                >
                  <span>Try Sharko Free →</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth("login");
                  }}
                  className="w-full min-h-[46px] rounded-xl border border-slate-200 bg-white text-[#0B0F19] font-sans text-[14px] font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50"
                >
                  <LogIn className="w-4 h-4 text-[#0066FF]" />
                  <span>Log in</span>
                </button>
              </div>
            </div>

            {/* Drawer Bottom Support Channels */}
            <div className="pt-4 border-t border-slate-100 font-sans text-[12px] text-slate-500 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#0066FF]">
                <span>DIRECT FOUNDER DESK</span>
                <span>Kushagr Rana</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <a
                  href="mailto:kushagrrana7345@gmail.com"
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-center truncate hover:border-[#0066FF]"
                >
                  Gmail Desk
                </a>
                <a
                  href="https://t.me/Kushagr_Rana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[#0066FF] font-semibold text-center hover:bg-blue-50"
                >
                  Telegram: @Kushagr_Rana
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppHeader;
