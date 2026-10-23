import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Star,
  Check,
  Zap,
  Camera,
  Smartphone,
  Coins,
  ShieldCheck,
  Play,
  TrendingUp,
} from 'lucide-react';
import { MarkerUnderline } from '../brand/SharkoBrandLogo';

interface ReviewItem {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatarBg: string;
  quote: string;
  stats: {
    views: string;
    revenue: string;
    highlightPill: string;
    pillColor: 'pink' | 'blue';
  };
  thumbnailGradient: string;
  tag: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'alex',
    name: 'Alex Carter',
    handle: '@alexcarterclips',
    role: 'Podcast Clipper',
    avatarBg: 'bg-blue-600',
    quote:
      'I turned 3 long podcasts into 45 viral shorts in my first week. Closed my first creator client for $2,000/mo retainer.',
    stats: {
      views: '1.4M views',
      revenue: '+$5,940',
      highlightPill: 'Made in 4 days',
      pillColor: 'pink',
    },
    thumbnailGradient: 'from-blue-600 to-indigo-900',
    tag: 'Podcast to 9:16',
  },
  {
    id: 'sophie',
    name: 'Sophie Kim',
    handle: '@sophiekclips',
    role: 'Full-time Creator',
    avatarBg: 'bg-emerald-600',
    quote:
      "Sharko's Smart Reframe did in 10 minutes what used to take me 6 hours in Premiere Pro. The 2-speaker split is unreal.",
    stats: {
      views: '3.8M views',
      revenue: '+$12,480',
      highlightPill: 'First month revenue',
      pillColor: 'blue',
    },
    thumbnailGradient: 'from-amber-600 to-rose-900',
    tag: 'Solo & Split Frame',
  },
  {
    id: 'marcus',
    name: 'Marcus Bell',
    handle: '@marcusb_edits',
    role: 'Side Hustle Clipper',
    avatarBg: 'bg-purple-600',
    quote:
      'The auto scene detection caught hook punchlines I completely missed when watching manually. Engagement jumped 400%.',
    stats: {
      views: '2.1M views',
      revenue: '+$8,215',
      highlightPill: 'Part-time side hustle',
      pillColor: 'pink',
    },
    thumbnailGradient: 'from-cyan-600 to-blue-900',
    tag: 'Auto Hook Detection',
  },
  {
    id: 'emily',
    name: 'Emily Rodriguez',
    handle: '@emilyrcuts',
    role: 'Agency Founder',
    avatarBg: 'bg-rose-600',
    quote:
      'Started clipping during college lectures. Now I run an automated clipping agency with 4 top creator clients.',
    stats: {
      views: '1.9M views',
      revenue: '+$7,430',
      highlightPill: 'Agency founder',
      pillColor: 'blue',
    },
    thumbnailGradient: 'from-fuchsia-600 to-purple-900',
    tag: 'Bulk Clip Factory',
  },
  {
    id: 'daniel',
    name: 'Daniel Park',
    handle: '@danielparkshorts',
    role: 'Faceless Channel',
    avatarBg: 'bg-amber-600',
    quote:
      'Went from zero video editing skills to hitting $10k months with YouTube Shorts automation. Output-only billing is a lifesaver.',
    stats: {
      views: '4.2M views',
      revenue: '+$11,932',
      highlightPill: 'Zero experience',
      pillColor: 'pink',
    },
    thumbnailGradient: 'from-sky-600 to-indigo-900',
    tag: 'Zero Edit Skills',
  },
  {
    id: 'olivia',
    name: 'Olivia Chen',
    handle: '@oliviacreates',
    role: 'Top-Rated Clipper',
    avatarBg: 'bg-teal-600',
    quote:
      'The kinetic captions alone doubled my retention rate. Clients literally message me asking for Sharko animated subtitle styles.',
    stats: {
      views: '2.7M views',
      revenue: '+$9,744',
      highlightPill: 'Top rated clipper',
      pillColor: 'blue',
    },
    thumbnailGradient: 'from-violet-600 to-pink-900',
    tag: 'Kinetic Captions',
  },
];

interface ComparisonRow {
  feature: string;
  sharko: string;
  opus: string;
  vizard: string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: 'Credit Metering Model',
    sharko: 'Output-Only (0 credits burned on upload/preview; pay only on HD export)',
    opus: 'Burns 1 credit per minute of uploaded video upfront',
    vizard: 'Burns 1 credit per minute of uploaded video upfront',
    highlight: true,
  },
  {
    feature: 'Free Tier Exports & Watermarks',
    sharko: '3 Free 1080p 60fps Exports/mo • Zero Watermarks • Full Editor',
    opus: '60 upload mins/mo • Watermarked • No editing on Free plan • 3-day expiry',
    vizard: '60 upload mins/mo • 720p Watermarked • 3-day expiry',
    highlight: true,
  },
  {
    feature: 'Entry Pro Pricing',
    sharko: '$9.99 / month (30% OFF • 100% unused credit rollover)',
    opus: '$15/mo Starter or $29/mo Pro (no rollover on expired tiers)',
    vizard: '$14.50/mo Creator ($29 billed monthly; no lower tier)',
  },
  {
    feature: 'Multi-Speaker & Camera Framing',
    sharko: '3 Live Modes: 2-Speaker Split, Solo Face-Track, Auto Scene Switch',
    opus: 'Auto Reframe (Prompt clipping locked behind Pro tier)',
    vizard: 'Auto Reframe + Text-based trimming',
  },
  {
    feature: 'Live Aspect Ratios Supported',
    sharko: '5 Ratios: 9:16, 1:1, 16:9, 4:3, 9:8 (Real-time preview resize)',
    opus: '9:16, 1:1, 16:9, 4:5',
    vizard: '9:16, 1:1, 16:9, 4:5',
  },
  {
    feature: 'Mobile Telegram Approval Gate',
    sharko: 'Included (1-Click Approve or Regenerate before auto-posting)',
    opus: 'Not included (Standard web calendar only)',
    vizard: 'Not included (Standard web calendar only)',
    highlight: true,
  },
  {
    feature: 'Twitch & Kick VOD + Prompt Ingest',
    sharko: 'YouTube, Twitch, Kick, Rumble, Vimeo & Drive + Custom Prompts on all tiers',
    opus: 'YouTube, Twitch, Zoom, Drive (Kick not natively supported)',
    vizard: 'YouTube, Twitch, Drive (Kick not natively supported)',
  },
  {
    feature: 'Built-In Creator Bounty Network',
    sharko: 'Native Verified CPM Escrow Board (0% reinvest fee)',
    opus: 'None (Software subscription only)',
    vizard: 'None (Software subscription only)',
    highlight: true,
  },
  {
    feature: 'India DPDP Act 2023 Privacy Controls',
    sharko: 'Full DPDP Consent, 72h Auto-Purge & 1-Click Data Erasure',
    opus: 'Generic US/EU policy',
    vizard: 'Generic US/EU policy',
  },
];

export const WhySharkoComparison: React.FC = () => {
  const [showMatrix, setShowMatrix] = useState<boolean>(false);

  return (
    <section id="why-sharko" className="py-24 bg-white relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header: Image 5 Mirror */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B0F19] tracking-tight font-display mb-3">
            Clippers who{' '}
            <MarkerUnderline color="pink" showSparks>
              stayed.
            </MarkerUnderline>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-sans">
            Real reviews from real Sharko users.
          </p>
        </div>

        {/* 6-Card Reviews Grid: Image 5 Mirror */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,102,255,0.08)] transition-all duration-300 p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header: User Info & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full ${rev.avatarBg} text-white font-bold text-base flex items-center justify-center shadow-sm`}
                    >
                      {rev.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-sm">{rev.name}</span>
                        <span className="w-4 h-4 rounded-full bg-[#0066FF] text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{rev.role}</span>
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 leading-relaxed mb-5 font-sans">
                  "{rev.quote}"
                </p>

                {/* Mini Video Thumbnail Preview with stats */}
                <div
                  className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${rev.thumbnailGradient} p-4 text-white aspect-[16/9] flex flex-col justify-between mb-4 shadow-inner`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20">
                      {rev.tag}
                    </span>
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
                      {rev.stats.views}
                    </span>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white/95 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
                      {rev.stats.revenue}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        rev.stats.pillColor === 'pink'
                          ? 'bg-[#FF1464] text-white'
                          : 'bg-[#0066FF] text-white'
                      }`}
                    >
                      {rev.stats.highlightPill}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Verified Strip */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">{rev.handle}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Verified Payout
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Head-to-Head Specification Matrix Toggle & Section */}
        <div className="pt-10">
          <div className="bg-[#F8FAFC] rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-xs font-semibold text-[#0066FF] mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Architecture & Competitive Benchmark</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-2">
                Why creator teams choose Sharko over OpusClip & Vizard
              </h3>
              <p className="text-sm text-slate-500">
                Traditional AI clippers bill you for input duration and expire unused credits. Sharko
                charges only for finished HD exports.
              </p>
            </div>

            {/* 4 Feature Pillars in White Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF3FF] text-[#0066FF] flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">Output-Only Metering</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  0 credits burned on upload or preview. Pay only when exporting 1080p/4K clips.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF3FF] text-[#0066FF] flex items-center justify-center font-bold">
                  <Camera className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">3 Neural Camera Modes</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  2-Speaker Split, Solo Face-Track, and Auto Scene Switch across 5 aspect ratios.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF3FF] text-[#0066FF] flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">Telegram Safety Gate</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Instant mobile push approval to review clips before auto-posting to TikTok & YouTube.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-[#EBF3FF] text-[#0066FF] flex items-center justify-center font-bold">
                  <Coins className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900">Creator Escrow Bounties</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Built-in verified CPM brand campaigns and direct sponsor intake for clippers.
                </p>
              </div>
            </div>

            {/* Matrix Accordion Toggle */}
            <div className="text-center mb-6">
              <button
                type="button"
                onClick={() => setShowMatrix(!showMatrix)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-xs hover:border-[#0066FF] hover:text-[#0066FF] transition-colors shadow-sm cursor-pointer"
              >
                <span>{showMatrix ? 'Hide Specification Matrix' : 'Show Full Head-to-Head Specification Matrix'}</span>
                <span className="text-xs font-mono">{showMatrix ? '▲' : '▼'}</span>
              </button>
            </div>

            {/* Matrix Table */}
            {showMatrix && (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-md">
                <table className="w-full text-left text-xs font-sans border-collapse min-w-[760px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="py-4 px-5 text-slate-500 uppercase tracking-wider w-[28%] font-semibold">
                        Feature / Capability
                      </th>
                      <th className="py-4 px-5 text-[#0066FF] font-bold w-[34%] bg-[#EEF6FF] border-x border-[#BFDBFE]">
                        Sharko ("Hunt the Moment")
                      </th>
                      <th className="py-4 px-5 text-slate-500 w-[19%]">OpusClip</th>
                      <th className="py-4 px-5 text-slate-500 w-[19%]">Vizard AI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {COMPARISON_DATA.map((row) => (
                      <tr
                        key={row.feature}
                        className={`transition-colors hover:bg-slate-50/60 ${
                          row.highlight ? 'bg-blue-50/20' : ''
                        }`}
                      >
                        <td className="py-3.5 px-5 font-semibold text-slate-800">{row.feature}</td>
                        <td className="py-3.5 px-5 text-[#0066FF] font-bold bg-[#EEF6FF]/60 border-x border-[#BFDBFE]/60">
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" />
                            <span>{row.sharko}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 text-slate-500">
                          <div className="flex items-start gap-1.5">
                            <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                            <span>{row.opus}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 text-slate-500">
                          <div className="flex items-start gap-1.5">
                            <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                            <span>{row.vizard}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
