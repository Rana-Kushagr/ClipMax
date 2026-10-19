"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Scissors,
  Percent,
  Check,
  Zap,
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

  return (
    <section id="bounties" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* 1. Bounty Marketplace Board */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-accent-subtle border border-accent/20 text-accent text-xs font-semibold mb-2">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Two-Sided Creator Bounty Marketplace</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
              Earn Cash Bounties for Every 1,000 Views
            </h2>
            <p className="text-sm text-text-secondary mt-1 max-w-xl">
              Brands deposit prize pools. You clip their long-form podcasts or demos into viral vertical shorts and earn verified per-view cash rewards.
            </p>
          </div>

          {/* Niches Filter */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface border border-border">
            {niches.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNiche(n.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedNiche === n.id
                    ? "bg-accent text-slate-950 font-bold"
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
              className="rounded-3xl bg-surface border border-border p-6 flex flex-col justify-between space-y-6 hover:border-accent/50 transition-all shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{bounty.logo}</span>
                    <div>
                      <h3 className="font-display font-bold text-sm text-white">
                        {bounty.brand}
                      </h3>
                      <span className="text-[10px] font-mono text-text-muted">
                        {bounty.brandCategory}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-accent/15 border border-accent/30 text-accent text-xs font-mono font-bold">
                    ${bounty.payoutPerK.toFixed(2)} / 1K Views
                  </span>
                </div>

                <h4 className="font-display font-bold text-base text-text-primary mb-2 group-hover:text-accent transition-colors leading-snug">
                  {bounty.title}
                </h4>

                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  {bounty.hookGuide}
                </p>

                {/* Prize Pool Progress Bar */}
                <div className="space-y-1.5 p-3 rounded-xl bg-surface-subtle border border-border">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-text-muted">Verified Pool:</span>
                    <span className="text-accent font-semibold">
                      ${bounty.remainingPool.toLocaleString()} remaining of ${bounty.totalPool.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-canvas rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
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
                className="w-full py-3 px-4 rounded-xl bg-accent hover:bg-accent-hover text-slate-950 font-display font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Scissors className="w-4 h-4 stroke-[2.5]" />
                <span>✂️ Clip This Campaign in 1 Click</span>
              </button>
            </div>
          ))}
        </div>

        {/* 2. Interactive Clipper Earnings & Reinvestment Calculator */}
        <div className="rounded-3xl bg-surface/80 border border-border-strong p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-mono text-accent uppercase font-bold tracking-wider">
              Clipper Profit Simulator
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Calculate Your Monthly Cash Payout
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Based on standard $2.50 per 1,000 verified short views across TikTok, Shorts, and Reels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {/* Daily Clips Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-text-secondary">Daily Shorts Created:</span>
                  <span className="text-accent font-bold">{dailyClips} clips / day</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={dailyClips}
                  onChange={(e) => setDailyClips(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer"
                  aria-label="Daily clips slider"
                />
              </div>

              {/* Average Views Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-text-secondary">Avg Views per Short:</span>
                  <span className="text-accent font-bold">{avgViewsPerClip.toLocaleString()} views</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={avgViewsPerClip}
                  onChange={(e) => setAvgViewsPerClip(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer"
                  aria-label="Average views per short slider"
                />
              </div>

              {/* 0% Fee Reinvestment Toggle */}
              <div className="p-3.5 rounded-2xl bg-surface-subtle border border-border flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Percent className="w-3.5 h-3.5 text-accent" />
                    <span>0% Fee Wallet-to-Credits Reinvestment</span>
                  </div>
                  <div className="text-[11px] text-text-muted mt-0.5">
                    Boost payout by <strong>+25%</strong> when converting to ClipMax export credits.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReinvestInCredits(!reinvestInCredits)}
                  className={`w-12 h-6 rounded-pill transition-colors p-1 flex items-center ${
                    reinvestInCredits ? "bg-accent justify-end" : "bg-surface-strong justify-start"
                  }`}
                  aria-pressed={reinvestInCredits}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-950 shadow-md" />
                </button>
              </div>
            </div>

            {/* Payout Display */}
            <div className="p-6 rounded-2xl bg-surface-subtle border border-accent/40 text-center space-y-3">
              <span className="text-xs font-mono text-text-muted uppercase">
                ESTIMATED MONTHLY CASH EARNINGS
              </span>
              <div className="font-mono font-black text-4xl sm:text-5xl text-accent tabular-nums">
                ${finalPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-text-secondary">
                From approximately <strong>{(totalMonthlyViews / 1000000).toFixed(2)}M</strong> total views generated.
              </p>
              <div className="pt-2 border-t border-border flex justify-around text-[10px] font-mono text-text-muted">
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
      <div id="pricing" className="pt-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-primary-subtle border border-primary/20 text-primary text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 fill-primary" />
            <span>Output-Only Fair Pricing Guarantee</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
            Only Pay When You Export
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary">
            Never pay for uploaded video minutes. Keep 100% of unused credits with lifetime rollover.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="inline-flex items-center p-1 rounded-pill bg-surface border border-border mt-4 text-xs font-medium">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-pill transition-all ${
                billingCycle === "monthly"
                  ? "bg-primary text-white font-bold"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 rounded-pill transition-all flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-primary text-white font-bold"
                  : "text-text-muted hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] bg-accent/20 text-accent px-1.5 py-0.2 rounded font-mono font-bold">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Starter Free */}
          <div className="rounded-3xl bg-surface border border-border p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-text-muted uppercase font-bold">
                STARTER FREE
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono font-black text-4xl text-white">$0</span>
                <span className="text-xs text-text-muted">/ forever</span>
              </div>
              <p className="text-xs text-text-secondary">
                Perfect for trying ClipMax on your latest podcast or stream.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-border text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span><strong>3 Watermark-Free</strong> 1080p clips/mo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span><strong>0 credits</strong> burned on upload</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span>All 5 kinetic caption styles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span>Smart 9:16 speaker reframing</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-surface-subtle hover:bg-surface-strong border border-border text-white font-bold text-xs transition-colors"
            >
              Start Free (No Card Needed)
            </button>
          </div>

          {/* Card 2: Creator Pro (Dominant Primary) */}
          <div className="rounded-3xl bg-surface border-2 border-primary p-6 flex flex-col justify-between space-y-6 relative shadow-2xl ring-1 ring-primary/40">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold uppercase tracking-wider shadow">
              MOST POPULAR FOR CREATORS
            </div>

            <div className="space-y-4">
              <span className="text-xs font-mono text-primary uppercase font-bold">
                CREATOR PRO
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono font-black text-4xl text-white tabular-nums">
                  ${billingCycle === "monthly" ? "14" : "10"}
                </span>
                <span className="text-xs text-text-muted">/ month</span>
              </div>
              <p className="text-xs text-text-secondary">
                For podcasters, streamers, and video agencies scaling shorts.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-border text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>100 Exported Clips / month</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span><strong>100% Lifetime Credit Rollover</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>1-Click Mobile Bot Approval (Telegram/WhatsApp)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Autonomous Multi-Platform Social Scheduler</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  <span>Earn from verified brand cash bounties</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-display font-extrabold text-xs shadow-lg transition-all active:scale-95"
            >
              Get Creator Pro
            </button>
          </div>

          {/* Card 3: Agency & Brand Hub */}
          <div className="rounded-3xl bg-surface border border-border p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono text-accent uppercase font-bold">
                AGENCY & BRAND HUB
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono font-black text-4xl text-white tabular-nums">
                  ${billingCycle === "monthly" ? "39" : "29"}
                </span>
                <span className="text-xs text-text-muted">/ month</span>
              </div>
              <p className="text-xs text-text-secondary">
                For brands launching clipping bounties and high-volume studios.
              </p>

              <div className="space-y-2.5 pt-4 border-t border-border text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span><strong>400 Exported Clips / month</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span>Launch Paid Bounty Campaigns ($100 min)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span>Multi-team workspace & permission seats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span>Custom Watermark & Font Branding Presets</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-surface-subtle hover:bg-surface-strong border border-border text-white font-bold text-xs transition-colors"
            >
              Launch Brand Hub
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
