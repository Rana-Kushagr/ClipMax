import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Filter,
  DollarSign,
} from "lucide-react";
import { BOUNTY_CAMPAIGNS } from "../../lib/constants";
import { BountyCampaign } from "../../types/studio";
import { Magnet } from "../react-bits/Magnet";
import { BorderGlow } from "../ui/BorderGlow";

interface BountyCampaignGridProps {
  onSelectCampaign: (url: string) => void;
}

export const BountyCampaignGrid: React.FC<Readonly<BountyCampaignGridProps>> = ({
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
    const heroCard = document.getElementById("hero");
    if (heroCard) {
      heroCard.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#A1A1AA] font-mono tracking-wider shrink-0 mr-2">
          <Filter className="w-3.5 h-3.5 text-[#D99B52]" />
          <span>FILTER:</span>
        </div>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all duration-200 shrink-0 ${
                isActive
                  ? "text-[#17120C] font-semibold"
                  : "text-[#A1A1AA] bg-[#2A2016]/60 border border-[#F3E5AB]/10 hover:text-white hover:bg-[#382B1E]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="bountyCategoryActivePill"
                  className="absolute inset-0 rounded-lg bg-[#F3E5AB] shadow-md -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Campaign Cards Grid with BorderGlow on all active campaigns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <BorderGlow
            key={campaign.id}
            animated={true}
            borderRadius={18}
            glowColor="42 80 78"
            backgroundColor="#1E1710"
            colors={["#F3E5AB", "#D99B52", "#10B981"]}
            className="h-full shadow-2xl"
          >
            <div className="flex flex-col justify-between h-full p-5 group">
              <div>
                {/* Header: Brand & Security Badges */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2A2016] border border-[#F3E5AB]/20 flex items-center justify-center font-mono font-bold text-xs text-[#F3E5AB] group-hover:border-[#F3E5AB]/40 transition-colors">
                      {campaign.logo}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[#F4F4F6] group-hover:text-[#F3E5AB] transition-colors font-display">
                        {campaign.brand}
                      </h3>
                      <div className="text-[11px] font-mono text-[#A1A1AA]">
                        {campaign.brandCategory}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-[11px] font-mono font-semibold">
                    <DollarSign className="w-3 h-3" />
                    <span>${campaign.payoutPerK.toFixed(2)}/1K</span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-sm font-medium text-[#F4F4F6] line-clamp-2 mb-3 leading-snug group-hover:text-white font-sans">
                  {campaign.title}
                </h4>

                {/* Hook Guide Callout */}
                <div className="p-3 rounded-lg bg-[#2A2016]/80 border border-[#F3E5AB]/10 text-xs text-[#A1A1AA] leading-relaxed mb-4">
                  <span className="text-[#D99B52] font-mono text-[10px] uppercase tracking-wider block mb-1">
                    Creative Direction:
                  </span>
                  {campaign.hookGuide}
                </div>

                {/* Anti-Bot & Meta Row */}
                <div className="flex items-center gap-3 text-[11px] font-mono text-[#A1A1AA] mb-4 pb-4 border-b border-[#F3E5AB]/10">
                  <div className="flex items-center gap-1 text-[#10B981]" title="OAuth 2.0 Direct Platform Verification">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>OAuth Verified</span>
                  </div>
                  <span className="text-white/20">•</span>
                  <div className="flex items-center gap-1 text-[#A1A1AA]">
                    <Clock className="w-3 h-3 text-[#D99B52]" />
                    <span>Min {campaign.minDuration}</span>
                  </div>
                </div>

                {/* Pool Progress */}
                <div className="space-y-1.5 mb-5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#A1A1AA]">Campaign Pool</span>
                    <span className="text-[#F4F4F6]">
                      <span className="text-[#10B981] font-semibold">${campaign.remainingPool.toLocaleString()}</span>
                      <span className="text-[#A1A1AA]"> / ${campaign.totalPool.toLocaleString()}</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#2A2016] rounded-full overflow-hidden border border-[#F3E5AB]/10">
                    <div
                      className="h-full bg-gradient-to-r from-[#10B981] via-[#D99B52] to-[#F3E5AB] rounded-full transition-all duration-500"
                      style={{ width: `${100 - campaign.claimedPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#A1A1AA]">
                    <span>{100 - campaign.claimedPercent}% remaining</span>
                    <span className="text-[#D99B52]">{campaign.claimedPercent}% claimed</span>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <Magnet strength={0.2}>
                <button
                  type="button"
                  onClick={() => handleClipCampaign(campaign)}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#F3E5AB] hover:bg-white text-[#17120C] text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md active:scale-95"
                >
                  <span>Clip This Campaign</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </Magnet>
            </div>
          </BorderGlow>
        ))}
      </div>
    </div>
  );
};
