import React, { useState } from "react";
import {
  Calculator,
  CheckCircle2,
} from "lucide-react";
import { SpotlightCard } from "../react-bits/SpotlightCard";
import { CountUp } from "../react-bits/CountUp";

export const ProfitSimulator: React.FC = () => {
  const [dailyShorts, setDailyShorts] = useState<number>(5);
  const [avgViews, setAvgViews] = useState<number>(25000);
  const [reinvest, setReinvest] = useState<boolean>(false);

  // Baseline verified marketplace CPM average: $3.75 per 1,000 views
  const BASE_CPM = 3.75;
  const monthlyShorts = dailyShorts * 30;
  const monthlyImpressions = monthlyShorts * avgViews;
  const baseMonthlyPayout = (monthlyImpressions / 1000) * BASE_CPM;
  const bonusMultiplier = reinvest ? 1.15 : 1.0;
  const finalMonthlyPayout = baseMonthlyPayout * bonusMultiplier;
  const annualizedRunRate = finalMonthlyPayout * 12;

  return (
    <SpotlightCard
      spotlightColor="rgba(224, 109, 59, 0.15)"
      className="w-full bg-[#0E1014] border border-white/[0.08] rounded-2xl p-6 lg:p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Sliders & Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E06D3B]/10 border border-[#E06D3B]/30 flex items-center justify-center text-[#E06D3B]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
                Creator Bounty Earnings Simulator
              </h3>
              <p className="text-xs text-zinc-400">
                Model verified bounty payout run-rate based on verified brand campaign CPMs.
              </p>
            </div>
          </div>

          {/* Slider 1: Daily Shorts */}
          <div className="space-y-2 p-4 rounded-xl bg-[#14171F]/80 border border-white/[0.06]">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-300 font-medium">Daily Shorts Published</span>
              <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                {dailyShorts} clips / day
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={1}
              value={dailyShorts}
              onChange={(e) => setDailyShorts(Number.parseInt(e.target.value, 10))}
              aria-label="Daily shorts published slider"
              className="w-full h-2 bg-[#08090B] rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-white/[0.08]"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
              <span>1 clip</span>
              <span>10 clips</span>
              <span>20 clips</span>
            </div>
          </div>

          {/* Slider 2: Average Views per Short */}
          <div className="space-y-2 p-4 rounded-xl bg-[#14171F]/80 border border-white/[0.06]">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-300 font-medium">Avg Views per Short</span>
              <span className="text-[#E06D3B] font-bold px-2 py-0.5 rounded bg-[#E06D3B]/10 border border-[#E06D3B]/20">
                {avgViews.toLocaleString()} views
              </span>
            </div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={avgViews}
              onChange={(e) => setAvgViews(Number.parseInt(e.target.value, 10))}
              aria-label="Average views per short slider"
              className="w-full h-2 bg-[#08090B] rounded-lg appearance-none cursor-pointer accent-[#E06D3B] border border-white/[0.08]"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
              <span>1,000</span>
              <span>50,000</span>
              <span>100,000</span>
            </div>
          </div>

          {/* Reinvestment Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#14171F]/80 border border-white/[0.06]">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-200">
                  Reinvest into Pro Credits
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  0% FEE + 15% BONUS
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Swap payouts directly into high-speed render compute with zero cash-out transfer fees.
              </p>
            </div>
            <button
              onClick={() => setReinvest(!reinvest)}
              role="switch"
              aria-checked={reinvest}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                reinvest ? "bg-emerald-500" : "bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                  reinvest ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Payout Display (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-[#08090B] border border-white/[0.08] relative overflow-hidden h-full">
          {/* Subtle Ambient Refraction */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#E06D3B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase">
                Projected Monthly Payout
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-300 border border-white/[0.06]">
                30-DAY CYCLE
              </span>
            </div>

            {/* Big Counter */}
            <div className="text-4xl lg:text-5xl font-mono font-bold text-zinc-100 flex items-baseline">
              <CountUp
                to={finalMonthlyPayout}
                prefix="$"
                decimals={2}
                className="text-emerald-400"
              />
              <span className="text-sm font-sans font-normal text-zinc-400 ml-2">/ month</span>
            </div>

            {/* Telemetry Breakdown */}
            <div className="pt-4 border-t border-white/[0.06] space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Monthly Output</span>
                <span className="text-zinc-200">{monthlyShorts} videos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Total Impressions</span>
                <span className="text-zinc-200">
                  {(monthlyImpressions / 1000000).toFixed(2)}M views
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Verified Base CPM</span>
                <span className="text-emerald-400 font-semibold">${BASE_CPM.toFixed(2)} / 1K</span>
              </div>
              {reinvest && (
                <div className="flex justify-between items-center text-emerald-400">
                  <span>Reinvestment Boost</span>
                  <span>+15% credit yield</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-white/[0.04]">
                <span className="text-zinc-400">Annual Run Rate</span>
                <span className="text-[#E06D3B] font-bold">
                  ${Math.round(annualizedRunRate).toLocaleString()} / yr
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-zinc-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Direct Stripe & Wise payouts • Instant escrow release</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};
