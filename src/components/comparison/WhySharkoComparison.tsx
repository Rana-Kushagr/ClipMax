import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Camera,
  Smartphone,
  Coins,
  CheckCircle2,
  XCircle,
  ShieldCheck,
} from "lucide-react";

interface ComparisonRow {
  feature: string;
  sharko: string;
  opus: string;
  vizard: string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Credit Metering Model",
    sharko: "Output-Only (0 credits burned on upload/preview; pay only on HD export)",
    opus: "Burns 1 credit per minute of uploaded video upfront",
    vizard: "Burns 1 credit per minute of uploaded video upfront",
    highlight: true,
  },
  {
    feature: "Free Tier Exports & Watermarks",
    sharko: "3 Free 1080p 60fps Exports/mo • Zero Watermarks • Full Editor",
    opus: "60 upload mins/mo • Watermarked • No editing on Free plan • 3-day expiry",
    vizard: "60 upload mins/mo • 720p Watermarked • 3-day expiry",
    highlight: true,
  },
  {
    feature: "Entry Pro Pricing (Annual)",
    sharko: "$9 / month (100% unused credit rollover)",
    opus: "$15/mo Starter (no annual discount) or $14.50/mo Pro ($29 monthly)",
    vizard: "$14.50/mo Creator ($29 billed monthly; no lower tier)",
  },
  {
    feature: "Multi-Speaker & Camera Framing",
    sharko: "3 Live Modes: 2-Speaker Split, Solo Face-Track, Auto Scene Switch",
    opus: "Auto Reframe (Prompt clipping locked behind Pro tier)",
    vizard: "Auto Reframe + Text-based trimming",
  },
  {
    feature: "Live Aspect Ratios Supported",
    sharko: "5 Ratios: 9:16, 1:1, 16:9, 4:3, 9:8 (Real-time preview resize)",
    opus: "9:16, 1:1, 16:9, 4:5",
    vizard: "9:16, 1:1, 16:9, 4:5",
  },
  {
    feature: "Mobile Telegram Approval Gate",
    sharko: "Included (1-Click Approve or Regenerate before auto-posting)",
    opus: "Not included (Standard web calendar only)",
    vizard: "Not included (Standard web calendar only)",
    highlight: true,
  },
  {
    feature: "Twitch & Kick VOD + Prompt Ingest",
    sharko: "YouTube, Twitch, Kick, Rumble, Vimeo & Drive + Custom Prompts on all tiers",
    opus: "YouTube, Twitch, Zoom, Drive (Kick not natively supported; prompts Pro-only)",
    vizard: "YouTube, Twitch, Drive (Kick not natively supported)",
  },
  {
    feature: "Built-In Creator Bounty Marketplace",
    sharko: "Native Verified CPM Escrow Board (0% reinvest fee)",
    opus: "None (Software subscription only)",
    vizard: "None (Software subscription only)",
    highlight: true,
  },
  {
    feature: "Premiere Pro / DaVinci XML Export",
    sharko: "Included",
    opus: "Locked to Pro plan ($29/mo)",
    vizard: "Not available on standard tiers",
  },
  {
    feature: "India DPDP Act 2023 Privacy Controls",
    sharko: "Full DPDP Consent, 72h Auto-Purge & 1-Click Data Erasure",
    opus: "Generic US/EU policy",
    vizard: "Generic US/EU policy",
  },
];

export const WhySharkoComparison: React.FC = () => {
  const pillars = [
    {
      icon: Zap,
      title: "Zero Credits Burned on Previews",
      subtitle: "Output-Only Metering",
      desc: "OpusClip and Vizard charge 1 credit per minute of uploaded video upfront—a 3-hour stream burns 180 credits before you see a cut. Sharko scans, scores, and previews for 0 credits; pay only when you export a finished 1080p/4K MP4.",
      accent: "#89CFF0",
    },
    {
      icon: Camera,
      title: "3 Neural Camera Modes & 5 Aspect Ratios",
      subtitle: "Dynamic Viewport",
      desc: "Switch live between 2-Speaker Split, Solo Face-Track (85mm portrait lock), and Auto Scene Switch across 9:16, 1:1, 16:9, 4:3, and 9:8 with SMPTE alignment and zero black bars.",
      accent: "#0047AB",
    },
    {
      icon: Smartphone,
      title: "1-Click Telegram Safety Gate",
      subtitle: "@SharkoStudioBot",
      desc: "Never let an AI hallucination post blindly to your main channel. Sharko sends a 10-second mobile push preview to your phone first so you can tap Approve & Queue or Regenerate.",
      accent: "#89CFF0",
    },
    {
      icon: Coins,
      title: "Built-In Creator Bounty Network",
      subtitle: "Verified Escrow Pools",
      desc: "Sharko is the only AI studio with an organic escrow marketplace where clippers earn real CPM payouts ($3.50 – $4.25 / 1K views) and sponsors launch campaigns directly with 0% reinvest fees.",
      accent: "#757500",
    },
  ];

  return (
    <section id="why-sharko" className="py-24 relative overflow-hidden z-10 select-none scroll-mt-20 sm:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#000B1D] border border-[#89CFF0]/25 text-xs font-mono text-[#89CFF0]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#89CFF0]" />
            <span>Architecture & Competitive Benchmark (2026 Specs)</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-3xl sm:text-5xl font-display font-extrabold text-[#FFFFFF] tracking-tight"
          >
            Why creator teams switch from{" "}
            <span className="serif-italic text-[#89CFF0]">OpusClip & Vizard</span> to Sharko.
          </motion.h2>
          <p className="text-sm text-zinc-400 font-sans max-w-2xl mx-auto">
            Traditional AI clippers bill you for input duration and expire your unused credits. Sharko
            is architected from the ground up on output-only billing, multi-camera direction, and
            native creator bounties.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-[#89CFF0]/20 bg-[#000816] p-6 space-y-3 shadow-xl transition-all duration-300 hover:border-[#89CFF0]/50 group"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: `${p.accent}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.accent }} />
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500">0{i + 1}</span>
                </div>
                <div className="space-y-0.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#89CFF0]">
                    {p.subtitle}
                  </div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-[#89CFF0] transition-colors">
                    {p.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#89CFF0]/20">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Head-to-Head Specification Matrix
            </h3>
            <span className="text-xs font-mono text-[#89CFF0]">Q4 2026 Verified Data</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#89CFF0]/25 bg-[#00040A] shadow-2xl">
            <table className="w-full text-left text-xs font-mono border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#89CFF0]/20 bg-[#000816]">
                  <th className="py-4 px-5 text-zinc-400 uppercase tracking-wider w-[28%] font-semibold">
                    Feature / Capability
                  </th>
                  <th className="py-4 px-5 text-[#89CFF0] font-bold w-[34%] bg-[#0047AB]/20 border-x border-[#89CFF0]/35">
                    Sharko ("Hunt the Moments")
                  </th>
                  <th className="py-4 px-5 text-zinc-400 w-[19%]">OpusClip (2026)</th>
                  <th className="py-4 px-5 text-zinc-400 w-[19%]">Vizard AI (2026)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#89CFF0]/10 text-xs">
                {COMPARISON_DATA.map((row) => (
                  <tr
                    key={row.feature}
                    className={`transition-colors hover:bg-white/[0.02] ${
                      row.highlight ? "bg-[#89CFF0]/[0.04]" : ""
                    }`}
                  >
                    <td className="py-3.5 px-5 font-semibold text-white/90">{row.feature}</td>
                    <td className="py-3.5 px-5 text-[#89CFF0] font-bold bg-[#0047AB]/10 border-x border-[#89CFF0]/20">
                      <div className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#89CFF0] shrink-0 mt-0.5" />
                        <span>{row.sharko}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-zinc-400">
                      <div className="flex items-start gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-red-400/70 shrink-0 mt-0.5" />
                        <span>{row.opus}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-zinc-400">
                      <div className="flex items-start gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-red-400/70 shrink-0 mt-0.5" />
                        <span>{row.vizard}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
