"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Scissors,
  Percent,
  Check,
  Zap,
  Shield,
  ShoppingBag,
  FileText,
} from "lucide-react";
import { BountyCampaign } from "@/types/studio";
import { BOUNTY_CAMPAIGNS } from "@/lib/constants";

interface BountyAndPricingSectionProps {
  onClipCampaign: (campaign: BountyCampaign) => void;
}

export function BountyAndPricingSection({
  onClipCampaign,
}: BountyAndPricingSectionProps) {
  const [selectedNiche, setSelectedNiche] = useState("all");
  const [dailyClips, setDailyClips] = useState(5);
  const [avgViewsPerClip, setAvgViewsPerClip] = useState(15000);
  const [reinvestInCredits, setReinvestInCredits] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const niches = [
    { id: "all", name: "All Niches" },
    { id: "saas", name: "SaaS & AI" },
    { id: "podcasts", name: "Podcasts" },
    { id: "ecommerce", name: "E-Commerce" },
  ];

  // Earnings calculation based on $2.50 average CPM
  const totalMonthlyViews = dailyClips * 30 * avgViewsPerClip;
  const estimatedCash = (totalMonthlyViews / 1000) * 2.5;
  const finalPayout = reinvestInCredits ? estimatedCash * 1.25 : estimatedCash;

  const renderBrandIcon = (logoCode: string) => {
    if (logoCode === "NORD") return <Shield className="w-4 h-4 text-emerald" />;
    if (logoCode === "SHOP") return <ShoppingBag className="w-4 h-4 text-accent" />;
    return <FileText className="w-4 h-4 text-white" />;
  };

  return (
    <section id="bounties" className="relative z-10 py-16 px-4 sm:px-6 max-w-[1240px] mx-auto space-y-16">
      {/* 1. Bounty Marketplace Board */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle hairline-border text-text-secondary text-xs font-medium mb-2">
              <DollarSign className="w-3.5 h-3.5 text-emerald" />
              <span>Two-Sided Creator Bounty Marketplace</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-text-primary tracking-tight">
              Monetize your clipping skills with{" "}
              <span className="font-editorial italic font-normal text-text-primary">
                instant bounties
              </span>
              .
            </h2>
            <p className="text-sm text-text-secondary mt-1 max-w-xl font-sans">
              Brands deposit prize pools. You clip their long-form podcasts or demos into viral vertical shorts and earn verified per-view cash rewards.
            </p>
          </div>

          {/* Niches Filter */}
          <div className="flex items-center gap-1 p-0.5 rounded-md bg-surface-subtle hairline-border">
            {niches.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNiche(n.id)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  selectedNiche === n.id
                    ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {n.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Brand Bounty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BOUNTY_CAMPAIGNS.map((bounty) => (
            <div
              key={bounty.id}
              className="rounded-xl bg-surface hairline-border p-6 flex flex-col justify-between space-y-6 hover:border-white/30 transition-all shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-surface-subtle hairline-border flex items-center justify-center">
                      {renderBrandIcon(bounty.logo)}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-sm text-white">
                        {bounty.brand}
                      </h3>
                      <span className="text-[10px] font-mono text-text-muted">
                        {bounty.brandCategory}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-subtle text-emerald hairline-border text-xs font-mono font-semibold tabular-nums">
                    ${bounty.payoutPerK.toFixed(2)} / 1K Views
                  </span>
                </div>

                <h4 className="font-display font-semibold text-base text-text-primary mb-2 group-hover:text-white transition-colors leading-snug">
                  {bounty.title}
                </h4>

                <p className="text-xs text-text-muted leading-relaxed mb-4 font-sans">
                  {bounty.hookGuide}
                </p>

                {/* Prize Pool Progress Bar */}
                <div className="space-y-1.5 p-3 rounded-lg bg-surface-subtle hairline-border">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-text-muted">Verified Pool:</span>
                    <span className="text-emerald font-semibold tabular-nums">
                      ${bounty.remainingPool.toLocaleString()} left of ${bounty.totalPool.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald rounded-full transition-all"
                      style={{ width: `${bounty.claimedPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-text-muted pt-0.5">
                    <span>OAuth Anti-Bot Verified</span>
                    <span>Min: {bounty.minDuration}</span>
                  </div>
                </div>
              </div>

              {/* 1-Click Clip Campaign Button */}
              <button
                type="button"
                onClick={() => onClipCampaign(bounty)}
                className="w-full py-2.5 px-4 rounded-md bg-surface-elevated hover:bg-white hover:text-primary-obsidian text-white hairline-border font-semibold text-xs shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>Clip Campaign Footage</span>
              </button>
            </div>
          ))}
        </div>

        {/* 2. Interactive Clipper Earnings & Reinvestment Calculator */}
        <div className="rounded-xl bg-surface hairline-border p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-mono text-emerald uppercase font-semibold tracking-wider">
              Clipper Profit Simulator
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-0.5">
              Calculate Your Monthly Cash Payout
            </h3>
            <p className="text-xs text-text-muted mt-1 font-sans">
              Based on standard $2.50 per 1,000 verified short views across TikTok, Shorts, and Reels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {/* Daily Clips Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-text-secondary">Daily Shorts Created:</span>
                  <span className="text-white font-semibold tabular-nums">{dailyClips} clips / day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={dailyClips}
                  onChange={(e) => setDailyClips(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                  aria-label="Daily clips slider"
                />
              </div>

              {/* Average Views Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-text-secondary">Avg Views per Short:</span>
                  <span className="text-white font-semibold tabular-nums">{avgViewsPerClip.toLocaleString()} views</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={avgViewsPerClip}
                  onChange={(e) => setAvgViewsPerClip(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                  aria-label="Average views per short slider"
                />
              </div>

              {/* 0% Fee Reinvestment Toggle */}
              <div className="p-3.5 rounded-lg bg-surface-subtle hairline-border flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-emerald" />
                    <span>0% Fee Wallet-to-Credits Reinvestment</span>
                  </div>
                  <div className="text-[11px] text-text-muted mt-0.5 font-sans">
                    Boost payout value by <strong>+25%</strong> when converting to ClipMax export credits.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReinvestInCredits(!reinvestInCredits)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                    reinvestInCredits ? "bg-emerald justify-end" : "bg-surface-elevated justify-start hairline-border"
                  }`}
                  aria-pressed={reinvestInCredits}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            </div>

            {/* Payout Display */}
            <div className="p-6 rounded-xl bg-surface-subtle hairline-border text-center space-y-3">
              <span className="text-xs font-mono text-text-muted uppercase">
                ESTIMATED MONTHLY CASH EARNINGS
              </span>
              <div className="font-mono font-bold text-4xl sm:text-5xl text-emerald tabular-nums">
                ${finalPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-text-secondary font-sans">
                From approximately <strong>{(totalMonthlyViews / 1000000).toFixed(2)}M</strong> total views generated.
              </p>
              <div className="pt-2 hairline-t flex justify-around text-[10px] font-mono text-text-muted">
                <span>Direct Bank Deposit</span>
                <span>•</span>
                <span>Stripe / Wise</span>
                <span>•</span>
                <span>USDC Crypto</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Output-Only Pricing Section */}
      <div id="pricing" className="pt-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-subtle hairline-border text-text-secondary text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-emerald" />
            <span>Output-Only Fair Pricing Guarantee</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl text-text-primary tracking-tight">
            Only pay when you{" "}
            <span className="font-editorial italic font-normal text-text-primary">
              export finished clips
            </span>
            .
          </h2>
          <p className="text-xs sm:text-sm text-text-muted font-sans">
            Never pay for uploaded video minutes. Keep 100% of unused credits with lifetime rollover.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center p-0.5 rounded-md bg-surface-subtle hairline-border mt-4 text-xs font-medium">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded transition-all ${
                billingCycle === "monthly"
                  ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
                  : "text-text-muted hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-emerald/20 text-emerald px-1.5 py-0.2 rounded font-mono font-semibold">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Starter Free */}
          <div className="rounded-xl bg-surface hairline-border p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-text-muted uppercase font-medium">
                STARTER FREE
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono font-bold text-4xl text-white">$0</span>
                <span className="text-xs text-text-muted font-sans">/ forever</span>
              </div>
              <p className="text-xs text-text-muted font-sans">
                Perfect for trying ClipMax on your latest podcast or stream.
              </p>

              <div className="space-y-2.5 pt-4 hairline-t text-xs text-text-secondary font-sans">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span><strong>3 Watermark-Free</strong> 1080p clips/mo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span><strong>0 credits</strong> burned on upload</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span>All 5 kinetic caption styles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span>Smart 9:16 speaker reframing</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-md bg-surface-subtle hover:bg-surface-elevated hairline-border text-white font-semibold text-xs transition-colors"
            >
              Start Free (No Card Needed)
            </button>
          </div>

          {/* Card 2: Creator Pro (Dominant Primary - Solid White CTA) */}
          <div className="rounded-xl bg-surface-subtle hairline-border border-white/30 p-6 flex flex-col justify-between space-y-6 relative shadow-2xl ring-1 ring-white/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-white text-black font-mono text-[10px] font-bold uppercase tracking-wider shadow">
              MOST POPULAR FOR CREATORS
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono text-emerald uppercase font-semibold">
                CREATOR PRO
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono font-bold text-4xl text-white tabular-nums">
                  ${billingCycle === "monthly" ? "14" : "10"}
                </span>
                <span className="text-xs text-text-muted font-sans">/ month</span>
              </div>
              <p className="text-xs text-text-muted font-sans">
                For podcasters, streamers, and video agencies scaling shorts.
              </p>

              <div className="space-y-2.5 pt-4 hairline-t text-xs text-text-secondary font-sans">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span><strong>100 Exported Clips / month</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span><strong>100% Lifetime Credit Rollover</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span>1-Click Mobile Bot Approval (Telegram/WhatsApp)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span>Autonomous Multi-Platform Social Scheduler</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span>Earn from verified brand cash bounties</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-md bg-primary hover:bg-white text-primary-obsidian font-semibold text-xs shadow-md transition-all active:scale-95"
            >
              Get Creator Pro
            </button>
          </div>

          {/* Card 3: Agency & Brand Hub */}
          <div className="rounded-xl bg-surface hairline-border p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-text-muted uppercase font-medium">
                AGENCY & BRAND HUB
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono font-bold text-4xl text-white tabular-nums">
                  ${billingCycle === "monthly" ? "39" : "29"}
                </span>
                <span className="text-xs text-text-muted font-sans">/ month</span>
              </div>
              <p className="text-xs text-text-muted font-sans">
                For brands launching clipping bounties and high-volume studios.
              </p>

              <div className="space-y-2.5 pt-4 hairline-t text-xs text-text-secondary font-sans">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span><strong>400 Exported Clips / month</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span>Launch Paid Bounty Campaigns ($100 min)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span>Multi-team workspace & permission seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald shrink-0" />
                  <span>Custom Watermark & Font Branding Presets</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-md bg-surface-subtle hover:bg-surface-elevated hairline-border text-white font-semibold text-xs transition-colors"
            >
              Launch Brand Hub
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
