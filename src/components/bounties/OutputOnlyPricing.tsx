import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Magnet } from "../react-bits/Magnet";
import { BorderGlow } from "../ui/BorderGlow";

export const OutputOnlyPricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const isAnnual = billingCycle === "annual";

  const tiers = [
    {
      id: "starter",
      name: "Starter Free",
      description: "For individual creators testing autonomous clipping workflows.",
      monthlyPrice: 0,
      annualPrice: 0,
      highlight: false,
      badge: "NO CREDIT CARD",
      features: [
        "3 watermark-free 1080p exports / mo",
        "0 credits burned on link preview or ranking",
        "Multi-speaker active speaker tracking",
        "5 kinetic caption styling presets",
        "Manual clip download & export",
      ],
      cta: "Get Started Free",
      ctaSubtext: "Includes 3 free full HD renders",
    },
    {
      id: "pro",
      name: "Creator Pro",
      description: "For active channels scaling daily short-form content output.",
      monthlyPrice: 14,
      annualPrice: 9,
      highlight: true,
      badge: "MOST POPULAR",
      features: [
        "100–120 exported HD clips / mo",
        "100% unused credit rollover",
        "Telegram mobile approval bot (@ClipMaxStudioBot)",
        "Custom kinetic typography & animation styling",
        "Multi-platform auto-scheduler (TikTok, Reels, Shorts)",
        "Priority GPU render queue (sub-60s turnaround)",
      ],
      cta: "Upgrade to Pro",
      ctaSubtext: "14-day money back guarantee",
    },
    {
      id: "agency",
      name: "Agency & Brand Hub",
      description: "For production studios, podcast networks, and brands sponsoring bounties.",
      monthlyPrice: 39,
      annualPrice: 29,
      highlight: false,
      badge: "ENTERPRISE GRADE",
      features: [
        "400–500 exported 4K/1080p clips / mo",
        "Launch & sponsor paid creator bounty campaigns",
        "Full REST API & MCP autonomous agent execution keys",
        "5 team seats with shared brand kits & fonts",
        "Custom webhook dispatches & webhook retries",
        "Dedicated isolated rendering instance",
      ],
      cta: "Deploy Agency Hub",
      ctaSubtext: "Custom SLA & dedicated support",
    },
  ];

  const renderCardContent = (tier: typeof tiers[0], price: number) => (
    <div className="flex flex-col justify-between h-full p-6 lg:p-8">
      {/* Badge if highlight or custom */}
      {tier.badge && (
        <div className="flex justify-end mb-2">
          <span
            className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border tracking-wider ${
              tier.highlight
                ? "bg-[#F3E5AB]/20 text-[#F3E5AB] border-[#F3E5AB]/40"
                : "bg-white/[0.05] text-[#A1A1AA] border-[#F3E5AB]/10"
            }`}
          >
            {tier.badge}
          </span>
        </div>
      )}

      <div>
        {/* Header */}
        <h3 className="text-xl font-bold text-[#F4F4F6] mb-1 font-display">{tier.name}</h3>
        <p className="text-xs text-[#A1A1AA] min-h-[36px] leading-relaxed mb-6 font-sans">
          {tier.description}
        </p>

        {/* Price Display */}
        <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#F3E5AB]/10">
          <span className="text-4xl lg:text-5xl font-mono font-bold text-[#F4F4F6] tabular-nums">
            ${price}
          </span>
          <div className="space-y-0.5">
            <span className="text-xs text-[#A1A1AA] block font-mono">/ month</span>
            {isAnnual && price > 0 && (
              <span className="text-[10px] text-[#D99B52] block font-mono">
                billed annually (${price * 12}/yr)
              </span>
            )}
          </div>
        </div>

        {/* Feature List */}
        <div className="space-y-3 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1A1AA] block">
            What's Included:
          </span>
          <ul className="space-y-2.5">
            {tier.features.map((feature, idx) => (
              <li key={`${tier.id}-feat-${idx}`} className="flex items-start gap-2.5 text-xs text-[#F4F4F6]">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    tier.highlight
                      ? "bg-[#10B981]/20 text-[#10B981]"
                      : "bg-[#2A2016] text-[#A1A1AA]"
                  }`}
                >
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="space-y-2 pt-4 border-t border-[#F3E5AB]/10">
        <Magnet strength={0.2}>
          <button
            type="button"
            onClick={() => {
              const hero = document.getElementById("hero");
              if (hero) hero.scrollIntoView({ behavior: "smooth" });
            }}
            className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
              tier.highlight
                ? "bg-[#F3E5AB] hover:bg-white text-[#17120C] shadow-lg shadow-[#D99B52]/20"
                : "bg-[#2A2016] hover:bg-[#382B1E] text-[#F3E5AB] border border-[#F3E5AB]/20"
            }`}
          >
            <span>{tier.cta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Magnet>
        <p className="text-[10px] font-mono text-center text-[#A1A1AA]">
          {tier.ctaSubtext}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Interactive Segmented Pill Billing Switch with Framer Motion Sliding Thumb */}
      <div className="flex items-center justify-center mb-12">
        <div className="relative inline-flex p-1.5 rounded-full bg-[#1E1710]/90 border border-[#F3E5AB]/20 shadow-2xl backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={`relative px-6 py-2.5 rounded-full text-xs font-mono font-semibold transition-colors duration-200 z-10 ${
              !isAnnual ? "text-[#17120C]" : "text-[#A1A1AA] hover:text-[#F4F4F6]"
            }`}
          >
            {!isAnnual && (
              <motion.div
                layoutId="activeBillingThumb"
                className="absolute inset-0 rounded-full bg-[#F3E5AB] shadow-md -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <span>MONTHLY BILLING</span>
          </button>

          <button
            type="button"
            onClick={() => setBillingCycle("annual")}
            className={`relative px-6 py-2.5 rounded-full text-xs font-mono font-semibold transition-colors duration-200 z-10 flex items-center gap-2 ${
              isAnnual ? "text-[#17120C]" : "text-[#A1A1AA] hover:text-[#F4F4F6]"
            }`}
          >
            {isAnnual && (
              <motion.div
                layoutId="activeBillingThumb"
                className="absolute inset-0 rounded-full bg-[#F3E5AB] shadow-md -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <span>ANNUAL BILLING</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                isAnnual
                  ? "bg-[#17120C]/15 text-[#17120C]"
                  : "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
              }`}
            >
              SAVE 25%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid with BorderGlow on Creator Pro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {tiers.map((tier) => {
          const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;

          if (tier.id === "pro") {
            return (
              <div key={tier.id} className="h-full flex flex-col">
                <BorderGlow
                  animated={true}
                  borderRadius={20}
                  glowColor="42 80 78"
                  backgroundColor="#1E1710"
                  colors={["#F3E5AB", "#D99B52", "#10B981"]}
                  className="h-full flex-1 shadow-2xl"
                >
                  {renderCardContent(tier, price)}
                </BorderGlow>
              </div>
            );
          }

          return (
            <div
              key={tier.id}
              className="flex flex-col justify-between h-full rounded-2xl bg-[#1E1710]/85 backdrop-blur-xl border border-[#F3E5AB]/15 shadow-xl transition-all duration-300 hover:border-[#F3E5AB]/30"
            >
              {renderCardContent(tier, price)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
