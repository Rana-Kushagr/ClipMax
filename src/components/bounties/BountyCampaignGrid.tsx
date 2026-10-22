import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  ArrowUpRight,
  Filter,
  DollarSign,
  X,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { BountyCampaign } from "../../types/studio";
import { BorderGlow } from "../ui/BorderGlow";
import { Magnet } from "../react-bits/Magnet";
import { sharkoApi } from "../../services/sharkoApi";
import { sanitizeUserText } from "../../utils/security";

interface BountyCampaignGridProps {
  onSelectCampaign: (url: string) => void;
  triggerToast?: (message: string) => void;
}

const CATEGORIES = [
  "All Niches",
  "Developer Tools",
  "Cloud Infrastructure",
  "AI Systems",
  "Productivity Tools",
] as const;

export const BountyCampaignGrid: React.FC<Readonly<BountyCampaignGridProps>> = ({
  onSelectCampaign,
  triggerToast,
}) => {
  const [campaigns, setCampaigns] = useState<BountyCampaign[]>([]);
  const [isLoadingBounties, setIsLoadingBounties] = useState<boolean>(false);
  const [activeNiche, setActiveNiche] = useState<string>("All Niches");
  const [showBrandApplicationModal, setShowBrandApplicationModal] = useState<boolean>(false);
  const [clipperAlertSubscribed, setClipperAlertSubscribed] = useState<boolean>(false);

  // Brand registration form state
  const [brandForm, setBrandForm] = useState({
    brandName: "",
    contactEmail: "",
    budgetUsd: "$5,000 USD",
    cpmRate: "$2.50 / 1K views",
    niche: "Developer Tools",
    sourceVideoUrl: "",
    notes: "",
    website_hp: "",
  });
  const [isSubmittingBrand, setIsSubmittingBrand] = useState(false);
  const [lastEmailUrls, setLastEmailUrls] = useState<{ mailto: string; gmail: string } | null>(null);

  const showToast = (msg: string) => {
    if (triggerToast) {
      triggerToast(msg);
    }
  };

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function fetchLiveBounties() {
      setIsLoadingBounties(true);
      try {
        const res = await sharkoApi.fetchBounties(controller.signal);
        if (mounted && res.ok && Array.isArray(res.data?.campaigns)) {
          setCampaigns(res.data.campaigns);
        } else if (mounted) {
          // Zero fake listings policy: keep array empty when no backend campaigns exist
          setCampaigns([]);
        }
      } catch {
        if (mounted) setCampaigns([]);
      } finally {
        if (mounted) setIsLoadingBounties(false);
      }
    }

    fetchLiveBounties();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const filteredCampaigns =
    activeNiche === "All Niches"
      ? campaigns
      : campaigns.filter(
          (c) =>
            (c.niche || c.brandCategory)?.toLowerCase() === activeNiche.toLowerCase()
        );

  const handleClipCampaign = (campaign: BountyCampaign) => {
    const url = campaign.sourceVideoUrl || campaign.footageUrl;
    onSelectCampaign(url);
    const heroCard = document.getElementById("hero") || document.getElementById("section-overview");
    if (heroCard) {
      heroCard.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Anti-bot honeypot check: if filled by bot, silently abort
    if (brandForm.website_hp) {
      setShowBrandApplicationModal(false);
      return;
    }

    const brandName = sanitizeUserText(brandForm.brandName, 100);
    const sponsorEmail = sanitizeUserText(brandForm.contactEmail, 100);
    const budget = sanitizeUserText(brandForm.budgetUsd, 60);
    const cpmRate = sanitizeUserText(brandForm.cpmRate, 60);
    const niche = sanitizeUserText(brandForm.niche, 60);
    const sourceUrl = sanitizeUserText(brandForm.sourceVideoUrl, 300);
    const notes = sanitizeUserText(brandForm.notes, 500);

    if (!brandName || !sponsorEmail || !sourceUrl) {
      showToast("Please fill all required campaign fields.");
      return;
    }

    const recipient = "kushagrrana7345@gmail.com";
    const subject = encodeURIComponent(`[Sharko Brand Bounty Request] ${brandName} — Budget: ${budget}`);
    const body = encodeURIComponent(
      `Hi Kushagr,\n\nWe want to launch a verified Brand Bounty Campaign on Sharko ("Hunt the Moments").\n\n` +
      `• Brand / Sponsor Name: ${brandName}\n` +
      `• Official Contact Email: ${sponsorEmail}\n` +
      `• Proposed Campaign Pool Budget: ${budget}\n` +
      `• Target CPM Payout Rate: ${cpmRate}\n` +
      `• Niche / Category: ${niche}\n` +
      `• Source Video / Stream URL: ${sourceUrl}\n` +
      `• Campaign Requirements:\n${notes}\n\n` +
      `Submitted via Sharko Verified Escrow Portal.`
    );
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;

    setLastEmailUrls({ mailto: mailtoUrl, gmail: gmailWebUrl });

    setIsSubmittingBrand(true);
    await sharkoApi.submitBrandCampaign({
      brandName,
      contactEmail: sponsorEmail,
      budgetUsd: parseFloat(budget.replace(/[^0-9.]/g, "")) || 5000,
      niche,
      sourceVideoUrl: sourceUrl,
    });
    setIsSubmittingBrand(false);

    showToast(`Campaign request generated for "${brandName}". Redirecting to email...`);
    window.location.href = mailtoUrl;
  };

  return (
    <div className="w-full select-none" id="section-bounties-grid">
      {/* Category Filter Pills & Launch Brand CTA */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#A1A1AA] font-mono tracking-wider shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5 text-[#D99B52]" />
            <span>FILTER:</span>
          </div>
          {CATEGORIES.map((cat) => {
            const isActive = activeNiche === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveNiche(cat)}
                className={`relative px-4 py-2 text-xs font-mono font-medium rounded-xl transition-all duration-200 shrink-0 ${
                  isActive
                    ? "text-[#17120C] font-semibold"
                    : "text-[#A1A1AA] bg-[#2A2016]/60 border border-[#F3E5AB]/10 hover:text-white hover:bg-[#382B1E]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="bountyCategoryActivePill"
                    className="absolute inset-0 rounded-xl bg-[#F3E5AB] shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setShowBrandApplicationModal(true)}
          className="shrink-0 px-4 py-2.5 rounded-xl bg-[#F3E5AB] hover:bg-white text-[#17120C] font-mono text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
        >
          <span>+ Sponsor / Launch a Verified Brand Campaign</span>
        </button>
      </div>

      {/* Grid Content Area: Loading vs Real Live Campaigns vs Authentic Empty State */}
      {isLoadingBounties ? (
        <div className="mt-8 rounded-3xl border border-[#F3E5AB]/15 bg-[#14100B]/90 p-12 text-center shadow-2xl">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#F3E5AB] border-t-transparent" />
          <p className="mt-3 font-mono text-xs uppercase tracking-widest text-[#F3E5AB]">
            Syncing Verified Escrow Ledger...
          </p>
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        {campaign.logo || (campaign.brandName || campaign.brand || "BR").slice(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#F4F4F6] group-hover:text-[#F3E5AB] transition-colors font-display">
                          {campaign.brandName || campaign.brand}
                        </h3>
                        <div className="text-[11px] font-mono text-[#A1A1AA]">
                          {campaign.niche || campaign.brandCategory}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-[11px] font-mono font-semibold">
                      <DollarSign className="w-3 h-3" />
                      <span>${(campaign.cpmRateUsd || campaign.payoutPerK || 3.5).toFixed(2)}/1K</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-medium text-[#F4F4F6] line-clamp-2 mb-3 leading-snug group-hover:text-white font-sans">
                    {campaign.title}
                  </h4>

                  {/* Hook Guide Callout */}
                  {campaign.hookGuide && (
                    <div className="p-3 rounded-lg bg-[#2A2016]/80 border border-[#F3E5AB]/10 text-xs text-[#A1A1AA] leading-relaxed mb-4">
                      <span className="text-[#D99B52] font-mono text-[10px] uppercase tracking-wider block mb-1">
                        Creative Direction:
                      </span>
                      {campaign.hookGuide}
                    </div>
                  )}

                  {/* Anti-Bot & Meta Row */}
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#A1A1AA] mb-4 pb-4 border-b border-[#F3E5AB]/10">
                    <div className="flex items-center gap-1 text-[#10B981]" title="OAuth 2.0 Direct Platform Verification">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                      <span>OAuth Verified</span>
                    </div>
                    <span className="text-white/20">•</span>
                    <div className="flex items-center gap-1 text-[#A1A1AA]">
                      <Clock className="w-3 h-3 text-[#D99B52]" />
                      <span>Min {campaign.minDuration || "30s"}</span>
                    </div>
                  </div>

                  {/* Pool Progress */}
                  <div className="space-y-1.5 mb-5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#A1A1AA]">Campaign Pool</span>
                      <span className="text-[#F4F4F6]">
                        <span className="text-[#10B981] font-semibold">
                          ${(campaign.escrowRemainingUsd || campaign.remainingPool || 0).toLocaleString()}
                        </span>
                        <span className="text-[#A1A1AA]">
                          {" "}
                          / ${(campaign.escrowTotalUsd || campaign.totalPool || 0).toLocaleString()}
                        </span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#2A2016] rounded-full overflow-hidden border border-[#F3E5AB]/10">
                      <div
                        className="h-full bg-gradient-to-r from-[#10B981] via-[#D99B52] to-[#F3E5AB] rounded-full transition-all duration-500"
                        style={{ width: `${100 - (campaign.claimedPercent || 0)}%` }}
                      />
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
      ) : (
        /* REAL, OG VERIFIED ESCROW BOARD (ZERO FAKE CAMPAIGNS) */
        <div className="mt-6 rounded-3xl border border-[#F3E5AB]/20 bg-gradient-to-b from-[#1A140E] to-[#110D09] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F3E5AB]/12 pb-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#10B981]/35 bg-[#10B981]/10 px-3.5 py-1">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#34D399]">
                100% Real Escrow Policy • 0 Fake Listings
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#E5E0D8]/65">
              Filter: <strong className="text-[#F3E5AB]">{activeNiche}</strong> • Live Backend Endpoint:{" "}
              <code className="text-[#34D399]">GET /api/v1/bounties</code>
            </span>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F4F5F7] tracking-tight">
                No simulated campaigns. Only verified brand escrow pools appear here.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#E5E0D8]/75">
                Sharko never lists placeholder or fake brand bounties. Every campaign that goes live on this board is backed by locked USDC/Stripe/UPI escrow and verified OAuth view tracking across TikTok, YouTube Shorts, Instagram Reels, and X.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#F3E5AB]/12 bg-[#14100B] p-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#D99B52]">
                    01 // LOCKED ESCROW
                  </div>
                  <div className="mt-1 font-display text-sm font-bold text-white">
                    100% Pre-Funded Pools
                  </div>
                  <p className="mt-0.5 text-xs text-[#E5E0D8]/65">
                    Brands lock real payout budgets before clippers cut a single frame.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#F3E5AB]/12 bg-[#14100B] p-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#34D399]">
                    02 // OAUTH TELEMETRY
                  </div>
                  <div className="mt-1 font-display text-sm font-bold text-white">
                    Real View Verification
                  </div>
                  <p className="mt-0.5 text-xs text-[#E5E0D8]/65">
                    Direct API polling verifies organic short-form impressions automatically.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#F3E5AB]/12 bg-[#14100B] p-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#F3E5AB]">
                    03 // INSTANT SETTLEMENT
                  </div>
                  <div className="mt-1 font-display text-sm font-bold text-white">
                    0% Reinvest Fee
                  </div>
                  <p className="mt-0.5 text-xs text-[#E5E0D8]/65">
                    Withdraw via UPI/Stripe or convert earnings into Studio HD credits.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Action Cards for Clippers & Brands */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 rounded-2xl border border-[#F3E5AB]/15 bg-[#14100B] p-6 shadow-xl">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#F3E5AB]">
                BOUNTY NETWORK ONBOARDING
              </div>
              <p className="text-xs leading-relaxed text-[#E5E0D8]/75">
                Get pinged on <strong className="text-white">@SharkoStudioBot</strong> the second a verified brand pool drops, or fund a campaign for your own stream/product.
              </p>

              <button
                type="button"
                onClick={() => {
                  setClipperAlertSubscribed(true);
                  showToast("Connected @SharkoStudioBot alert for live verified bounty drops.");
                }}
                className={`w-full rounded-xl py-3 px-4 font-display text-[13.5px] font-bold transition-all ${
                  clipperAlertSubscribed
                    ? "bg-[#10B981] text-[#08090B]"
                    : "bg-[#F3E5AB] text-[#14100B] hover:bg-[#FFF3C4]"
                }`}
              >
                {clipperAlertSubscribed
                  ? "✓ Subscribed to Verified Bounty Drops"
                  : "Notify Me When Live Campaigns Drop →"}
              </button>

              <button
                type="button"
                onClick={() => setShowBrandApplicationModal(true)}
                className="w-full rounded-xl border border-[#F3E5AB]/25 bg-[#1E1810] py-3 px-4 font-display text-[13.5px] font-bold text-[#F3E5AB] hover:border-[#F3E5AB]/50 hover:bg-[#261E14] transition-all"
              >
                + Launch a Verified Brand Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Brand Campaign Application Modal */}
      <AnimatePresence>
        {showBrandApplicationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl border border-[#F3E5AB]/30 bg-[#16120D] p-6 sm:p-8 shadow-2xl text-[#F4F4F6]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#F3E5AB]/15 mb-6">
                <div>
                  <h4 className="font-display font-bold text-xl text-white">
                    Launch a Verified Brand Campaign
                  </h4>
                  <p className="font-mono text-xs text-[#D99B52] mt-0.5">
                    Pre-Funded Escrow Pool • Organic Viral Reach
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBrandApplicationModal(false)}
                  className="p-1.5 rounded-lg bg-[#2A2016] text-[#A1A1AA] hover:text-white"
                  aria-label="Close brand modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleBrandSubmit} className="space-y-4">
                {/* Anti-bot honeypot */}
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  value={brandForm.website_hp}
                  onChange={(e) => setBrandForm({ ...brandForm, website_hp: e.target.value })}
                />

                <div>
                  <label className="block text-xs font-mono text-[#E5E0D8] mb-1">
                    Brand / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={brandForm.brandName}
                    onChange={(e) => setBrandForm({ ...brandForm, brandName: e.target.value })}
                    placeholder="e.g. Supabase, Convex, Linear"
                    className="w-full rounded-xl border border-[#F3E5AB]/20 bg-[#1F1811] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F3E5AB]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#E5E0D8] mb-1">
                      Sponsor Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={brandForm.contactEmail}
                      onChange={(e) => setBrandForm({ ...brandForm, contactEmail: e.target.value })}
                      placeholder="sponsor@yourbrand.com"
                      className="w-full rounded-xl border border-[#F3E5AB]/20 bg-[#1F1811] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F3E5AB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#E5E0D8] mb-1">
                      Total Escrow Budget ($ / ₹) *
                    </label>
                    <input
                      type="text"
                      required
                      value={brandForm.budgetUsd}
                      onChange={(e) => setBrandForm({ ...brandForm, budgetUsd: e.target.value })}
                      placeholder="e.g. $5,000 USD or ₹4,00,000 INR"
                      className="w-full rounded-xl border border-[#F3E5AB]/20 bg-[#1F1811] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F3E5AB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-[#E5E0D8] mb-1">
                      Target CPM Rate (per 1K views) *
                    </label>
                    <input
                      type="text"
                      required
                      value={brandForm.cpmRate}
                      onChange={(e) => setBrandForm({ ...brandForm, cpmRate: e.target.value })}
                      placeholder="e.g. $2.50 / 1K views"
                      className="w-full rounded-xl border border-[#F3E5AB]/20 bg-[#1F1811] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F3E5AB]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-[#E5E0D8] mb-1">
                      Niche / Category
                    </label>
                    <select
                      value={brandForm.niche}
                      onChange={(e) => setBrandForm({ ...brandForm, niche: e.target.value })}
                      className="w-full rounded-xl border border-[#F3E5AB]/20 bg-[#1F1811] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F3E5AB]"
                    >
                      <option value="Developer Tools">Developer Tools</option>
                      <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                      <option value="AI Systems">AI Systems</option>
                      <option value="Productivity Tools">Productivity Tools</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#E5E0D8] mb-1">
                    Source Stream / Podcast Video URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={brandForm.sourceVideoUrl}
                    onChange={(e) => setBrandForm({ ...brandForm, sourceVideoUrl: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full rounded-xl border border-[#F3E5AB]/20 bg-[#1F1811] px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#F3E5AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#E5E0D8] mb-1">
                    Campaign Goals & Clip Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={brandForm.notes}
                    onChange={(e) => setBrandForm({ ...brandForm, notes: e.target.value })}
                    placeholder="Highlight our API speed benchmark, terminal workflows, and mention link in bio..."
                    className="w-full rounded-xl border border-[#F3E5AB]/20 bg-[#1F1811] px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F3E5AB] resize-none"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isSubmittingBrand}
                    className="w-full rounded-xl bg-[#F3E5AB] hover:bg-white text-[#17120C] py-3 font-display font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {isSubmittingBrand ? "Generating Request..." : "Send Campaign Request to Kushagr →"}
                  </button>

                  {/* 1-Click Open in Gmail Web */}
                  {lastEmailUrls?.gmail && (
                    <a
                      href={lastEmailUrls.gmail}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center w-full rounded-xl border border-[#F3E5AB]/30 bg-[#2A2016] hover:bg-[#382B1E] text-[#F3E5AB] py-2 font-mono text-xs font-semibold transition-all"
                    >
                      Open Directly in Gmail Web ↗
                    </a>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
