import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
  tag?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "How does Sharko's \"Output-Only\" credit pricing work compared to OpusClip and Vizard?",
    a: "OpusClip and Vizard charge you by input duration—uploading a 2-hour podcast immediately burns 120 minutes of your quota even if you don't like a single clip. Sharko charges zero credits for uploading, transcribing, virality scoring, and previewing inside the Studio. A credit is only deducted when you click Download HD or Export 1080p/4K MP4.",
    tag: "Pricing & Metering",
  },
  {
    q: "How is my data and API usage protected from hackers, and does Sharko comply with India's DPDP Act 2023?",
    a: "Yes. Sharko enforces a strict zero-client-secret architecture (all AI/LLM and payment keys stay isolated on hardened backend servers behind sliding-window rate limits and SSRF/XSS firewalls). We fully comply with India's Digital Personal Data Protection Act, 2023 (DPDP Act): raw source caches auto-purge within 72 hours, we never sell personal data, and you can exercise your Right to Access, Correction, Consent Withdrawal, or 1-Click Erasure anytime or contact our Grievance Officer (Kushagr Rana at kushagrrana7345@gmail.com).",
    tag: "Security & DPDP",
  },
  {
    q: "Can I switch camera angles and aspect ratios before exporting a clip?",
    a: "Yes. Inside both the Smart Reframe tab and Edit Mode (Studio Inspector Modal), you can switch in real time between 2-Speaker Split, Solo Face-Track (85mm single-speaker close-up), and Auto Scene Switch, and resize your canvas across 9:16, 1:1, 16:9, 4:3, and 9:8 with live resolution telemetry.",
    tag: "Studio Engine",
  },
  {
    q: "How do brands or sponsors launch a paid clipping campaign on Sharko?",
    a: "We maintain a 100% real, zero-fake-listing policy on our Bounty Board. Sponsors click \"+ Launch a Verified Brand Campaign\" in the Bounty Marketplace, fill in their campaign budget, target CPM, and source stream link, and their brief is routed directly to our Campaign Desk at kushagrrana7345@gmail.com (or via Telegram @Kushagr_Rana) for escrow verification and onboarding.",
    tag: "Bounties & Escrow",
  },
  {
    q: "What is the 1-Click Telegram Safety Gate (@SharkoStudioBot)?",
    a: "Blind auto-posting tools often publish awkward cuts to your main social channels while you sleep. Sharko sends a 10-second preview to your Telegram first—tap Approve & Queue to publish to TikTok, Reels, YouTube Shorts, and X, or tap Regenerate to request a fresh hook cut.",
    tag: "Mobile Bot",
  },
  {
    q: "Are free exports really watermark-free, and do unused Pro credits roll over?",
    a: "Every user gets 3 free 1080p 60fps exports per month with zero watermarks and full access to the Studio Inspector. On paid plans (Creator Pro at $9/mo annual and Agency Hub at $29/mo annual), 100% of your unused export credits roll over into the next billing cycle.",
    tag: "Commercial License",
  },
  {
    q: "Which video platforms and file formats can Sharko ingest?",
    a: "You can paste any https:// link from YouTube, Twitch, Kick, Rumble, Vimeo, or Google Drive, or upload raw .mp4, .mov, .webm, and .mkv files up to 2GB. All links pass through our anti-SSRF security validator before ingestion.",
    tag: "Ingest Platforms",
  },
  {
    q: "How can I reach Sharko Support or connect directly with the founder?",
    a: "You can reach Kushagr Rana directly anytime via Email at kushagrrana7345@gmail.com, on Telegram at @Kushagr_Rana, on Instagram at @_ranakushagr, or on Threads at @_ranakushagr.",
    tag: "Founder Support",
  },
];

export const StudioFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="section-faq" className="py-24 relative overflow-hidden z-10 select-none scroll-mt-20 sm:scroll-mt-24">
      <span id="faq" className="absolute -top-20" aria-hidden="true" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#000B1D] border border-[#89CFF0]/25 text-xs font-mono text-[#89CFF0]">
            <HelpCircle className="w-3.5 h-3.5 text-[#89CFF0]" />
            <span>Frequently Asked Questions</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-[#FFFFFF] tracking-tight"
          >
            Everything you need to know about{" "}
            <span className="serif-italic text-[#89CFF0]">Sharko.</span>
          </motion.h2>
          <p className="text-sm text-zinc-400 font-sans">
            Clear answers about output-only billing, anti-hallucination Telegram controls, and DPDP
            Act 2023 compliance.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#89CFF0]/40 bg-[#000816] shadow-xl shadow-black/40"
                    : "border-[#89CFF0]/15 bg-[#00040A] hover:border-[#89CFF0]/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 sm:px-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 flex-1 pr-2">
                    {item.tag && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#89CFF0] block">
                        {item.tag}
                      </span>
                    )}
                    <span className="font-display font-bold text-sm sm:text-base text-white">
                      {item.q}
                    </span>
                  </div>
                  <div
                    className={`p-1.5 rounded-lg bg-[#040C1E] text-[#89CFF0] transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 bg-[#89CFF0] text-[#000000]" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 border-t border-[#89CFF0]/15 text-xs sm:text-[13.5px] leading-relaxed text-zinc-300 font-sans">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer Prompt */}
        <div className="text-center pt-4">
          <p className="text-xs font-mono text-zinc-400">
            Have a technical or custom pipeline question?{" "}
            <a
              href="mailto:kushagrrana7345@gmail.com"
              className="text-[#89CFF0] underline hover:text-white"
            >
              Email founder Kushagr Rana directly →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
