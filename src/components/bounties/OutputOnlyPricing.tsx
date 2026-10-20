import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { SpotlightCard } from "../react-bits/SpotlightCard";
import { Magnet } from "../react-bits/Magnet";

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
      spotlightColor: "rgba(255, 255, 255, 0.08)",
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
      spotlightColor: "rgba(16, 185, 129, 0.18)",
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
      spotlightColor: "rgba(224, 109, 59, 0.14)",
    },
  ];

  return (
    <div className="w-full">
      {/* Billing Switch */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <span
          className={`text-xs font-mono transition-colors ${
            !isAnnual ? "text-zinc-100 font-semibold" : "text-zinc-400"
          }`}
        >
          MONTHLY BILLING
        </span>
        <button
          onClick={() => setBillingCycle(isAnnual ? "monthly" : "annual")}
          role="switch"
          aria-checked={isAnnual}
          className="relative inline-flex h-7 w-14 items-center rounded-full bg-[#14171F] border border-white/[0.08] transition-colors p-1"
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`w-5 h-5 rounded-full ${
              isAnnual ? "bg-emerald-400 translate-x-7" : "bg-zinc-400 translate-x-0"
            }`}
          />
        </button>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-mono transition-colors ${
              isAnnual ? "text-zinc-100 font-semibold" : "text-zinc-400"
            }`}
          >
            ANNUAL BILLING
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            SAVE 25%
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {tiers.map((tier) => {
          const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;
          return (
            <SpotlightCard
              key={tier.id}
              spotlightColor={tier.spotlightColor}
              className={`flex flex-col justify-between h-full rounded-2xl p-6 lg:p-8 bg-[#0E1014] border transition-all duration-300 relative ${
                tier.highlight
                  ? "border-emerald-500/40 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20"
                  : "border-white/[0.08] hover:border-white/[0.15]"
              }`}
            >
              {/* Badge if highlight or custom */}
              {tier.badge && (
                <div className="absolute top-5 right-5">
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border tracking-wider ${
                      tier.highlight
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-white/[0.05] text-zinc-400 border-white/[0.08]"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Header */}
                <h3 className="text-xl font-bold text-zinc-100 mb-1">{tier.name}</h3>
                <p className="text-xs text-zinc-400 min-h-[36px] leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-white/[0.06]">
                  <span className="text-4xl lg:text-5xl font-mono font-bold text-zinc-100 tabular-nums">
                    ${price}
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-xs text-zinc-400 block font-mono">/ month</span>
                    {isAnnual && price > 0 && (
                      <span className="text-[10px] text-zinc-400 block font-mono">
                        billed annually (${price * 12}/yr)
                      </span>
                    )}
                  </div>
                </div>

                {/* Feature List */}
                <div className="space-y-3 mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                    What's Included:
                  </span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feature, idx) => (
                      <li key={`${tier.id}-feat-${idx}`} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            tier.highlight
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-white/[0.08] text-zinc-400"
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
              <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                <Magnet strength={0.2}>
                  <button
                    onClick={() => {
                      const hero = document.getElementById("hero-command-center");
                      if (hero) hero.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                      tier.highlight
                        ? "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20"
                        : "bg-white/[0.06] hover:bg-white/[0.1] text-zinc-200 border border-white/[0.08]"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Magnet>
                <p className="text-[10px] font-mono text-center text-zinc-400">
                  {tier.ctaSubtext}
                </p>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
};
