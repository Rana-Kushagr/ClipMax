import React, { useState } from "react";
import {
  TrendingUp,
  Phone,
  Video,
  Mail,
  CheckCircle2,
  ExternalLink,
  X,
  Sparkles,
  Send,
  Building2,
  DollarSign,
} from "lucide-react";
import { MarkerUnderline } from "../brand/SharkoBrandLogo";
import { sanitizeUserText } from "../../utils/security";

interface BountyCampaignGridProps {
  onSelectCampaign?: (url: string) => void;
  triggerToast?: (message: string) => void;
}

export const BountyCampaignGrid: React.FC<Readonly<BountyCampaignGridProps>> = ({
  onSelectCampaign,
  triggerToast,
}) => {
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [brandForm, setBrandForm] = useState({
    brandName: "",
    contactEmail: "",
    budgetUsd: "$2,500 USD",
    cpmTarget: "$3.50 / 1K views",
    sourceVideoUrl: "",
    notes: "",
  });
  const [formSent, setFormSent] = useState(false);

  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanBrand = sanitizeUserText(brandForm.brandName);
    const cleanEmail = sanitizeUserText(brandForm.contactEmail);
    const cleanUrl = sanitizeUserText(brandForm.sourceVideoUrl);
    const cleanNotes = sanitizeUserText(brandForm.notes);

    const subject = encodeURIComponent(`[Sharko Sponsor Campaign] Intake from ${cleanBrand}`);
    const body = encodeURIComponent(
      `Hello Kushagr,\n\nI want to sponsor a verified clipping campaign on Sharko.\n\nBrand Name: ${cleanBrand}\nContact Email: ${cleanEmail}\nBudget: ${brandForm.budgetUsd}\nTarget CPM: ${brandForm.cpmTarget}\nSource Stream / Video URL: ${cleanUrl}\n\nCampaign Brief & Requirements:\n${cleanNotes}\n\nPlease reply with escrow deposit and clipper allocation details.`
    );

    const mailtoUrl = `mailto:kushagrrana7345@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, "_blank");
    setFormSent(true);
    if (triggerToast) {
      triggerToast("Sponsor brief dispatched to kushagrrana7345@gmail.com");
    }
  };

  return (
    <section id="bounties" className="py-16 sm:py-24 bg-white dark:bg-[#060913] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Headline Mirroring Image 2 */}
        <h2 className="font-display text-[34px] sm:text-[48px] lg:text-[54px] font-extrabold tracking-[-0.035em] text-[#0B0F19] dark:text-white leading-[1.12]">
          Your first payout could happen <br className="hidden sm:inline" />
          sooner{" "}
          <MarkerUnderline color="pink" showSparks className="text-[#0B0F19] dark:text-white">
            than you think.
          </MarkerUnderline>
        </h2>
        <p className="mt-3 text-[16px] sm:text-[18px] text-[#475569] dark:text-slate-300 font-sans">
          Real clippers are using short-form content to earn online.
        </p>

        {/* =========================================================================
            8-CARD BENTO GRID (1:1 PIXEL-PERFECT MIRROR OF IMAGE 2 `image_ad5486.jpg`)
            ========================================================================= */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 text-left">
          
          {/* -------------------------------------------------------------
              CARD 1: Ethan R. (White Card + PayPal Receipt)
              ------------------------------------------------------------- */}
          <div className="sharko-card-hover rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between">
            <div>
              {/* User Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Ethan R."
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-display font-bold text-[14px] text-[#0B0F19]">Ethan R.</h4>
                    <p className="text-[11px] text-slate-500">Colorado, USA</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#EBF3FF] text-[#0066FF] font-bold text-[11px]">
                  Made $892
                </span>
              </div>

              {/* Quote */}
              <p className="mt-4 text-[13px] text-[#334155] leading-relaxed italic">
                &ldquo;I started clipping 2 weeks ago with Sharko and just got my first payout! I never thought short clips could actually make real money.&rdquo;
              </p>
            </div>

            {/* PayPal Receipt Box */}
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#003087] flex items-center justify-center text-white font-extrabold text-xs">
                  P
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Payment received &bull; Jan 12, 2025</div>
                  <div className="font-extrabold text-[15px] text-[#0B0F19]">$892.17</div>
                  <div className="text-[10px] text-slate-500">From YouTube</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                Completed
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------------
              CARD 2: Mike T. (Dark #0B0F17 Chat Card)
              ------------------------------------------------------------- */}
          <div className="sharko-card-hover rounded-2xl border border-slate-900 bg-[#0B0F17] p-5 shadow-lg flex flex-col justify-between text-white">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Mike T."
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0F17]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[13px] text-white">Mike T.</h4>
                  <p className="text-[10.5px] text-emerald-400">Active now</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone className="w-3.5 h-3.5" />
                <Video className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Chat Bubbles */}
            <div className="space-y-2 mt-3 text-[12px]">
              <div className="bg-[#1E293B] text-slate-200 p-2.5 rounded-2xl rounded-tl-sm max-w-[85%]">
                Bro this is crazy...
              </div>
              <div className="bg-[#1E293B] text-slate-200 p-2.5 rounded-2xl rounded-tl-sm max-w-[90%]">
                Just hit $1,200 this month from clipped content! 🔥
                <span className="block text-[9.5px] text-slate-400 mt-1">10:24 AM</span>
              </div>
              <div className="ml-auto bg-[#0066FF] text-white p-2.5 rounded-2xl rounded-tr-sm max-w-[85%]">
                Let&apos;s go! Which platform?
                <span className="block text-[9.5px] text-blue-200 mt-1 text-right">10:25 AM</span>
              </div>
              <div className="bg-[#1E293B] text-slate-200 p-2.5 rounded-2xl rounded-tl-sm max-w-[90%]">
                Mostly YouTube + TikTok. Sharko makes it so easy to find viral moments.
                <span className="block text-[9.5px] text-slate-400 mt-1">10:26 AM</span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              CARD 3: YouTube Analytics (White Card + Blue Bar Chart)
              ------------------------------------------------------------- */}
          <div className="sharko-card-hover rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between transition">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className="text-red-600 font-black">▶</span> YouTube
                </div>
                <span>Last 28 days</span>
              </div>

              {/* Total Payout */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display font-extrabold text-[28px] text-[#0B0F19] tracking-tight">
                  $1,286.48
                </span>
                <span className="inline-flex items-center text-emerald-600 font-bold text-[12px]">
                  ↑ +312%
                </span>
              </div>
            </div>

            {/* Vertical Blue Bar Chart with Tooltip */}
            <div className="mt-5 relative pt-4">
              {/* Tooltip on Jan 21 bar */}
              <div className="absolute top-0 left-[62%] -translate-x-1/2 bg-[#0B0F17] text-white text-[9.5px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                $148.32 Jan 21
              </div>

              <div className="flex items-end justify-between gap-1 h-24 pt-4 border-b border-slate-200">
                {[25, 35, 45, 30, 55, 40, 65, 50, 75, 45, 60, 55, 80, 70, 95, 65, 85, 75, 90, 80].map((h, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-t transition-all ${
                      i === 14 ? "bg-[#0066FF]" : "bg-[#D0E4FF] hover:bg-[#0066FF]"
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              {/* X-Axis labels */}
              <div className="flex justify-between text-[9.5px] text-slate-400 mt-1.5">
                <span>Jan 1</span>
                <span>Jan 7</span>
                <span>Jan 14</span>
                <span>Jan 21</span>
                <span>Jan 28</span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              CARD 4: Sophie L. (Dark #0B0F17 Chat Card)
              ------------------------------------------------------------- */}
          <div className="sharko-card-hover rounded-2xl border border-slate-900 bg-[#0B0F17] p-5 shadow-lg flex flex-col justify-between text-white">

            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                    alt="Sophie L."
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0F17]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[13px] text-white">Sophie L.</h4>
                  <p className="text-[10.5px] text-emerald-400">Active now</p>
                </div>
              </div>
              <span className="text-slate-500 font-mono text-sm">&bull;&bull;&bull;</span>
            </div>

            <div className="space-y-2 mt-3 text-[12px]">
              <div className="bg-[#1E293B] text-slate-200 p-2.5 rounded-2xl rounded-tl-sm max-w-[90%]">
                Just got monetized! Your clips helped me hit the requirements so fast 🙏
                <span className="block text-[9.5px] text-slate-400 mt-1">4:17 PM</span>
              </div>
              <div className="ml-auto bg-[#0066FF] text-white p-2.5 rounded-2xl rounded-tr-sm max-w-[85%]">
                That&apos;s amazing! How long did it take?
                <span className="block text-[9.5px] text-blue-200 mt-1 text-right">4:18 PM</span>
              </div>
              <div className="bg-[#1E293B] text-slate-200 p-2.5 rounded-2xl rounded-tl-sm max-w-[90%]">
                3 weeks! Now I&apos;m making $50-100/day from these clips while working full time.
                <span className="block text-[9.5px] text-slate-400 mt-1">4:19 PM</span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------
              CARD 5: TikTok Shop Creator Fund (White Card + Area Chart)
              ------------------------------------------------------------- */}
          <div className="sharko-card-hover rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between transition">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span className="text-black font-black">♪</span> TikTok Shop Creator Fund
                </div>
                <span>Last 30 days</span>
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-display font-extrabold text-[28px] text-[#0B0F19] tracking-tight">
                  $634.21
                </span>
                <span className="inline-flex items-center text-emerald-600 font-bold text-[12px]">
                  ↑ +245%
                </span>
              </div>
            </div>

            {/* Smooth Blue SVG Area Wave Chart */}
            <div className="mt-6">
              <svg viewBox="0 0 200 60" fill="none" className="w-full h-16 overflow-visible">
                <defs>
                  <linearGradient id="areaChartBlueGrad" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#0066FF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0066FF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 45C30 42 60 48 90 32C120 16 150 24 180 8L200 4"
                  stroke="#0066FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0 45C30 42 60 48 90 32C120 16 150 24 180 8L200 4V60H0Z"
                  fill="url(#areaChartBlueGrad)"
                />
              </svg>
            </div>
          </div>

          {/* -------------------------------------------------------------
              CARD 6: Daniel K. (White Card + TikTok Payout Box)
              ------------------------------------------------------------- */}
          <div className="sharko-card-hover rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between transition">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                    alt="Daniel K."
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="font-display font-bold text-[14px] text-[#0B0F19] dark:text-white">Daniel K.</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">London, UK</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#EBF3FF] dark:bg-blue-900/30 text-[#0066FF] font-bold text-[11px]">
                  Made $457
                </span>
              </div>

              <p className="mt-4 text-[13px] text-[#334155] dark:text-slate-300 leading-relaxed italic">
                &ldquo;I use Sharko to find viral moments, add captions, and post to TikTok. Just got my biggest payout yet!&rdquo;
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-extrabold text-xs">
                  ♪
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Creator Rewards Program &bull; Jan 8, 2025</div>
                  <div className="font-extrabold text-[15px] text-[#0B0F19] dark:text-white">$457.32</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                Completed
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------------
              CARD 7: Google AdSense Notification (Dark #0B0F17 Card)
              ------------------------------------------------------------- */}
          <div className="sharko-card-hover rounded-2xl border border-slate-900 bg-[#0B0F17] p-5 shadow-lg flex flex-col justify-between text-white">
            {/* Top Gmail Notification Banner */}
            <div className="rounded-xl border border-slate-800 bg-[#141B26] p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-xs">
                  M
                </div>
                <div>
                  <div className="font-bold text-[12px] text-white">Google AdSense</div>
                  <div className="text-[10px] text-slate-400">Payout sent: $1,024.15</div>
                </div>
              </div>
              <span className="text-[10px] text-slate-400">5m ago</span>
            </div>

            {/* Notification Body */}
            <div className="mt-4 space-y-1.5">
              <h4 className="font-display font-bold text-[14px] text-white">
                Your payment has been sent
              </h4>
              <p className="text-[12px] text-slate-400 leading-relaxed">
                Your payment of $1,024.15 has been sent to your bank account ending in 1234.
              </p>
            </div>
          </div>

          {/* -------------------------------------------------------------
              CARD 8: Chris M. (White Card + AdSense Box)
              ------------------------------------------------------------- */}
          <div className="sharko-card-hover rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] flex flex-col justify-between transition">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80"
                    alt="Chris M."
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-display font-bold text-[14px] text-[#0B0F19]">Chris M.</h4>
                    <p className="text-[11px] text-slate-500">Austin, USA</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#EBF3FF] text-[#0066FF] font-bold text-[11px]">
                  Made $1,024
                </span>
              </div>

              <p className="mt-4 text-[13px] text-[#334155] leading-relaxed italic">
                &ldquo;Sharko completely changed my workflow. I can find, clip, and post in minutes. This is now a real side income for me.&rdquo;
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-extrabold text-xs">
                  ▲
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">AdSense Payout &bull; Jan 21, 2025</div>
                  <div className="font-extrabold text-[15px] text-[#0B0F19]">$1,024.15</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                Completed
              </span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            REAL VERIFIED BRAND SPONSOR INTAKE (ZERO FAKE DATA - 100% AUTHENTIC)
            ========================================================================= */}
        <div className="mt-12 rounded-3xl border border-[#D0E4FF] bg-gradient-to-r from-[#F4F8FF] via-white to-[#F4F8FF] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="text-left space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FF] text-[#0066FF] text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>SPONSOR INTAKE &bull; 0% REINVEST FEE</span>
            </div>
            <h3 className="font-display font-extrabold text-[20px] sm:text-[24px] text-[#0B0F19]">
              Are you a brand or creator looking to scale short-form reach?
            </h3>
            <p className="text-[14px] text-slate-600">
              Launch a verified escrow clipping campaign. Clippers earn directly from views, and your content reaches millions on YouTube Shorts, TikTok, and Reels.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowSponsorModal(true)}
            className="btn-electric-blue shrink-0 rounded-2xl px-6 py-3.5 text-[15px] font-bold text-white flex items-center gap-2"
          >
            <span>+ Launch Brand Campaign</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Sponsor Intake Modal */}
      {showSponsorModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSponsorModal(false);
          }}
          className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200 text-left my-auto"
          >
            <button
              type="button"
              onClick={() => setShowSponsorModal(false)}
              className="absolute right-4 top-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-[#0066FF] mb-2">
              <Building2 className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                Direct Founder Campaign Desk
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl text-[#0B0F19]">
              Launch a Verified Sponsor Campaign
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Your brief will be routed directly to founder Kushagr Rana at{" "}
              <a href="mailto:kushagrrana7345@gmail.com" className="text-[#0066FF] underline">
                kushagrrana7345@gmail.com
              </a>{" "}
              for escrow verification.
            </p>

            <form onSubmit={handleSponsorSubmit} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brand or Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={brandForm.brandName}
                  onChange={(e) => setBrandForm({ ...brandForm, brandName: e.target.value })}
                  placeholder="e.g. Supabase, Vercel, Linear"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={brandForm.contactEmail}
                    onChange={(e) => setBrandForm({ ...brandForm, contactEmail: e.target.value })}
                    placeholder="partner@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target Budget
                  </label>
                  <select
                    value={brandForm.budgetUsd}
                    onChange={(e) => setBrandForm({ ...brandForm, budgetUsd: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066FF] focus:outline-none bg-white"
                  >
                    <option value="$1,000 USD">$1,000 USD</option>
                    <option value="$2,500 USD">$2,500 USD</option>
                    <option value="$5,000 USD">$5,000 USD</option>
                    <option value="$10,000+ USD">$10,000+ USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Source Video or Channel URL *
                </label>
                <input
                  type="url"
                  required
                  value={brandForm.sourceVideoUrl}
                  onChange={(e) => setBrandForm({ ...brandForm, sourceVideoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Campaign Brief &amp; Key Value Prop
                </label>
                <textarea
                  rows={3}
                  value={brandForm.notes}
                  onChange={(e) => setBrandForm({ ...brandForm, notes: e.target.value })}
                  placeholder="Tell our clippers what product features, clips, or callouts to prioritize..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0066FF] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn-electric-blue w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Dispatch Campaign Brief to Founder &rarr;</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default BountyCampaignGrid;
