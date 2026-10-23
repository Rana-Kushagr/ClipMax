import React, { useState } from 'react';
import { Check, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { MarkerUnderline } from '../brand/SharkoBrandLogo';
import { sharkoApi } from '../../services/sharkoApi';

interface OutputOnlyPricingProps {
  onSelectPlan?: (planId: string) => void;
}

export const OutputOnlyPricing: React.FC<OutputOnlyPricingProps> = ({ onSelectPlan }) => {
  const [submittingTierId, setSubmittingTierId] = useState<string | null>(null);

  const handleTierAction = async (tierId: string) => {
    if (onSelectPlan) {
      onSelectPlan(tierId);
      return;
    }

    if (submittingTierId) return;
    setSubmittingTierId(tierId);

    const res = await sharkoApi.createCheckoutSession({
      planId: tierId as 'starter' | 'pro' | 'agency',
      billingCycle: 'monthly',
    });

    setSubmittingTierId(null);

    if (res.ok && res.data?.checkoutUrl) {
      try {
        const checkoutUrlObj = new URL(res.data.checkoutUrl);
        const allowedHosts = ['checkout.stripe.com', 'buy.stripe.com', 'billing.stripe.com'];
        const isAllowed = allowedHosts.some(
          (host) => checkoutUrlObj.hostname === host || checkoutUrlObj.hostname.endsWith(`.${host}`)
        );
        if (checkoutUrlObj.protocol === 'https:' && isAllowed) {
          window.location.assign(checkoutUrlObj.href);
          return;
        }
      } catch {
        // Fallback to command center
      }
    }
    const target = document.getElementById('command-center') || document.getElementById('hero');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$9.99',
      originalPrice: '$14.99',
      discount: '30% OFF',
      highlight: false,
      features: [
        '120 Exported Clips / month',
        'Full 1080p 60fps HD Resolution',
        'Zero Watermarks on any clip',
        'Auto 9:16 Reframe & Camera Track',
        '5 Kinetic Captions Typography Styles',
        'Unused Credits Rollover 100%',
      ],
      cta: 'Start Free',
      ctaType: 'secondary' as const,
    },
    {
      id: 'creator',
      name: 'Creator',
      badge: '👑 RECOMMENDED',
      price: '$29.99',
      originalPrice: '$42.99',
      discount: '30% OFF',
      highlight: true,
      features: [
        '400 Exported Clips / month',
        'Ultra 4K & 1080p 60fps Resolution',
        'Zero Watermarks + Custom Brand Logo',
        'Multi-Speaker Split & Auto Scene Switch',
        'All Kinetic Captions & Custom Fonts',
        'Mobile Telegram Approval Bot Gate',
        'Unused Credits Rollover Forever',
      ],
      cta: 'Start Free',
      ctaType: 'primary' as const,
    },
    {
      id: 'agency',
      name: 'Agency',
      price: '$69.99',
      originalPrice: '$99.99',
      discount: '30% OFF',
      highlight: false,
      features: [
        '1,200 Exported Clips / month',
        'Fast GPU Priority Render Queue',
        'Batch URL Ingest (YouTube, Twitch, Drive)',
        'Team Seats (5 Clippers & Editors)',
        'Premiere Pro & DaVinci XML Export',
        'Launch Brand Bounty Escrow Campaigns',
        'Dedicated Account Support & SLA',
      ],
      cta: 'Start Free',
      ctaType: 'secondary' as const,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Image 3 Mirror */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B0F19] tracking-tight font-display mb-3">
            Choose your{' '}
            <MarkerUnderline color="pink" showSparks>
              clipping plan.
            </MarkerUnderline>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-sans">
            Start free, then scale your clipping side hustle.
          </p>
        </div>

        {/* 3 Pricing Cards Grid: Image 3 Mirror */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-3xl bg-white transition-all duration-300 flex flex-col justify-between ${
                tier.highlight
                  ? 'border-2 border-[#0066FF] shadow-[0_20px_50px_rgba(0,102,255,0.12)] -translate-y-2 lg:-translate-y-3'
                  : 'border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-lg'
              } p-7 sm:p-9`}
            >
              {/* Highlight Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-[#0066FF] text-white text-xs font-bold tracking-wide shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Spark accents on recommended card corners */}
              {tier.highlight && (
                <div className="absolute top-4 right-4 text-[#FF1464] pointer-events-none select-none">
                  <Sparkles className="w-5 h-5" />
                </div>
              )}

              <div>
                {/* Header: Tier Name & Discount Pill */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                    {tier.name}
                  </h3>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFEBF0] text-[#FF1464] text-xs font-bold">
                    {tier.discount}
                  </span>
                </div>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 font-display">
                      {tier.price}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">/month</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-400 font-medium">
                    <span className="line-through">{tier.originalPrice}/month</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3.5 mb-8">
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-tight">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA & Urgency */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={submittingTierId === tier.id}
                  onClick={() => handleTierAction(tier.id)}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    tier.ctaType === 'primary'
                      ? 'bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_8px_20px_rgba(0,102,255,0.25)] hover:shadow-[0_12px_28px_rgba(0,102,255,0.35)] transform hover:-translate-y-0.5'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-slate-400 shadow-sm'
                  } disabled:opacity-75 disabled:cursor-wait`}
                >
                  <span>{submittingTierId === tier.id ? 'Connecting...' : `${tier.cta} →`}</span>
                </button>

                {/* Discount Expiry Urgency Footer */}
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#FF1464]" />
                  <span>Discount expires in 22h 50m</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
