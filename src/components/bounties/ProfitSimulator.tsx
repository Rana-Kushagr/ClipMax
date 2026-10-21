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
      spotlightColor="rgba(243, 229, 171, 0.15)"
      className="w-full bg-[#1E1710] border border-[#F3E5AB]/15 rounded-2xl p-6 lg:p-8 shadow-2xl overflow-visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-visible">
        {/* Left Column: Sliders & Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 overflow-visible">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#D99B52]/10 border border-[#D99B52]/30 flex items-center justify-center text-[#D99B52]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F4F4F6] flex items-center gap-2 font-display">
                Creator Bounty Earnings Simulator
              </h3>
              <p className="text-xs text-[#A1A1AA] font-sans">
                Model verified bounty payout run-rate based on verified brand campaign CPMs.
              </p>
            </div>
          </div>

          {/* Slider 1: Daily Shorts */}
          <div className="space-y-2 p-4 rounded-xl bg-[#2A2016] border border-[#F3E5AB]/10 overflow-visible">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#F4F4F6] font-medium">Daily Shorts Published</span>
              <span className="text-[#F3E5AB] font-bold px-2 py-0.5 rounded bg-[#F3E5AB]/10 border border-[#F3E5AB]/25">
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
              className="w-full h-2 bg-[#17120C] rounded-lg appearance-none cursor-pointer accent-[#F3E5AB] border border-[#F3E5AB]/20"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-[#A1A1AA]">
              <span>1 clip</span>
              <span>10 clips</span>
              <span>20 clips</span>
            </div>
          </div>

          {/* Slider 2: Average Views per Short */}
          <div className="space-y-2 p-4 rounded-xl bg-[#2A2016] border border-[#F3E5AB]/10 overflow-visible">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[#F4F4F6] font-medium">Average Views per Short</span>
              <span className="text-[#10B981] font-bold px-2 py-0.5 rounded bg-[#10B981]/10 border border-[#10B981]/20">
                {avgViews.toLocaleString()} views
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={5000}
              value={avgViews}
              onChange={(e) => setAvgViews(Number.parseInt(e.target.value, 10))}
              aria-label="Average views per short slider"
              className="w-full h-2 bg-[#17120C] rounded-lg appearance-none cursor-pointer accent-[#10B981] border border-[#F3E5AB]/20"
            />
            <div className="flex justify-between items-center text-[10px] font-mono text-[#A1A1AA]">
              <span>5K views</span>
              <span>75K views</span>
              <span>150K views</span>
            </div>
          </div>

          {/* Reinvestment Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#2A2016] border border-[#F3E5AB]/10 overflow-visible">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#F4F4F6]">
                  Reinvest into Pro Credits
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                  0% FEE + 15% BONUS
                </span>
              </div>
              <p className="text-[11px] text-[#A1A1AA]">
                Swap payouts directly into high-speed render compute with zero cash-out transfer fees.
              </p>
            </div>
            <button
              onClick={() => setReinvest(!reinvest)}
              role="switch"
              aria-checked={reinvest}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                reinvest ? "bg-[#10B981]" : "bg-[#17120C] border border-[#F3E5AB]/20"
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
        <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-[#2A2016] border border-[#F3E5AB]/20 relative overflow-hidden h-full shadow-xl">
          {/* Subtle Ambient Refraction */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#D99B52]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#A1A1AA] tracking-wider uppercase">
                Projected Monthly Payout
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-[#F3E5AB] border border-[#F3E5AB]/20">
                30-DAY CYCLE
              </span>
            </div>

            {/* Big Counter */}
            <div className="text-4xl lg:text-5xl font-mono font-bold text-white flex items-baseline">
              <CountUp
                to={finalMonthlyPayout}
                prefix="$"
                decimals={2}
                className="text-[#10B981]"
              />
              <span className="text-sm font-sans font-normal text-[#A1A1AA] ml-2">/ month</span>
            </div>

            {/* Telemetry Breakdown */}
            <div className="pt-4 border-t border-[#F3E5AB]/10 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-[#A1A1AA]">Monthly Output</span>
                <span className="text-[#F4F4F6]">{monthlyShorts} videos</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A1A1AA]">Total Impressions</span>
                <span className="text-[#F4F4F6]">
                  {(monthlyImpressions / 1000000).toFixed(2)}M views
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#A1A1AA]">Verified Base CPM</span>
                <span className="text-[#10B981] font-semibold">${BASE_CPM.toFixed(2)} / 1K</span>
              </div>
              {reinvest && (
                <div className="flex justify-between items-center text-[#10B981]">
                  <span>Reinvestment Boost</span>
                  <span>+15% credit yield</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-[#F3E5AB]/10">
                <span className="text-[#A1A1AA]">Annual Run Rate</span>
                <span className="text-[#D99B52] font-bold">
                  ${Math.round(annualizedRunRate).toLocaleString()} / yr
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F3E5AB]/10 flex items-center gap-2 text-[11px] text-[#A1A1AA]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
            <span>Direct Stripe & Wise payouts • Instant escrow release</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};
