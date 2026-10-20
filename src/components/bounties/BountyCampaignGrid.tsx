import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Filter,
  DollarSign,
  Layers,
  Sparkles,
} from "lucide-react";
import { BOUNTY_CAMPAIGNS } from "../../lib/constants";
import { BountyCampaign } from "../../types/studio";
import { SpotlightCard } from "../react-bits/SpotlightCard";
import { Magnet } from "../react-bits/Magnet";

interface BountyCampaignGridProps {
  onSelectCampaign: (url: string) => void;
}

export const BountyCampaignGrid: React.FC<BountyCampaignGridProps> = ({
  onSelectCampaign,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Niches");

  const categories = [
    "All Niches",
    "Developer Tools",
    "Cloud Infrastructure",
    "AI Systems",
    "Productivity Tools",
  ];

  const filteredCampaigns =
    selectedCategory === "All Niches"
      ? BOUNTY_CAMPAIGNS
      : BOUNTY_CAMPAIGNS.filter(
          (c) => c.brandCategory.toLowerCase() === selectedCategory.toLowerCase()
        );

  const handleClipCampaign = (campaign: BountyCampaign) => {
    onSelectCampaign(campaign.footageUrl);
    const heroCard = document.getElementById("hero-command-center");
    if (heroCard) {
      heroCard.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-500 font-mono tracking-wider shrink-0 mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>FILTER:</span>
        </div>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all duration-200 shrink-0 ${
                isActive
                  ? "text-emerald-300 bg-emerald-500/10 border border-emerald-500/30"
                  : "text-zinc-400 bg-white/[0.02] border border-white/[0.06] hover:text-zinc-200 hover:bg-white/[0.05]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="bountyCategoryActivePill"
                  className="absolute inset-0 rounded-lg bg-emerald-500/10 -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <SpotlightCard
            key={campaign.id}
            spotlightColor="rgba(16, 185, 129, 0.12)"
            className="flex flex-col justify-between h-full bg-[#0E1014] border border-white/[0.08] rounded-xl p-5 hover:border-emerald-500/30 transition-all duration-300 group"
          >
            <div>
              {/* Header: Brand & Security Badges */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#14171F] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-xs text-emerald-400 group-hover:border-emerald-500/40 transition-colors">
                    {campaign.logo}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-300 transition-colors">
                      {campaign.brand}
                    </h3>
                    <div className="text-[11px] font-mono text-zinc-400">
                      {campaign.brandCategory}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                  <DollarSign className="w-3 h-3" />
                  <span>${campaign.payoutPerK.toFixed(2)}/1K</span>
                </div>
              </div>

              {/* Title */}
              <h4 className="text-sm font-medium text-zinc-200 line-clamp-2 mb-3 leading-snug group-hover:text-zinc-100">
                {campaign.title}
              </h4>

              {/* Hook Guide Callout */}
              <div className="p-3 rounded-lg bg-[#14171F]/80 border border-white/[0.05] text-xs text-zinc-400 leading-relaxed mb-4">
                <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-wider block mb-1">
                  Creative Direction:
                </span>
                {campaign.hookGuide}
              </div>

              {/* Anti-Bot & Meta Row */}
              <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 mb-4 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-1 text-emerald-400/90" title="OAuth 2.0 Direct Platform Verification">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>OAuth Verified</span>
                </div>
                <span className="text-zinc-600">•</span>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  <span>Min {campaign.minDuration}</span>
                </div>
              </div>

              {/* Pool Progress */}
              <div className="space-y-1.5 mb-5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">Campaign Pool</span>
                  <span className="text-zinc-200">
                    <span className="text-emerald-400 font-semibold">${campaign.remainingPool.toLocaleString()}</span>
                    <span className="text-zinc-500"> / ${campaign.totalPool.toLocaleString()}</span>
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#14171F] rounded-full overflow-hidden border border-white/[0.04]">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-[#E06D3B] rounded-full transition-all duration-500"
                    style={{ width: `${100 - campaign.claimedPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>{100 - campaign.claimedPercent}% remaining</span>
                  <span>{campaign.claimedPercent}% claimed</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <Magnet strength={0.2}>
              <button
                onClick={() => handleClipCampaign(campaign)}
                className="w-full py-2.5 px-4 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500 text-emerald-300 hover:text-emerald-200 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
              >
                <span>Clip This Campaign</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Magnet>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};
