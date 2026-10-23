import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { MarkerUnderline } from '../brand/SharkoBrandLogo';

interface ProfitSimulatorProps {
  onStartClipping?: () => void;
}

export const ProfitSimulator: React.FC<ProfitSimulatorProps> = ({ onStartClipping }) => {
  // State for the 3 interactive sliders mirroring Image 4
  const [views, setViews] = useState<number>(1000000);
  const [rpm, setRpm] = useState<number>(0.12);
  const [clips, setClips] = useState<number>(30);

  // Exact reference calculation:
  // (views / 1,000) * rpm * clips
  // 1,000,000 / 1000 = 1,000 * 0.12 = $120 per clip * 30 clips = $3,600
  const estimatedPayout = Math.round((views / 1000) * rpm * clips);

  const formatViews = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`;
    }
    return `${Math.round(val / 1000)}K`;
  };

  return (
    <section id="simulator" className="relative py-20 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EBF3FF] border border-[#BFDBFE] text-[#0066FF] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TURN VIEWS INTO INCOME</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B0F19] tracking-tight font-display mb-3">
            Estimate your monthly{' '}
            <MarkerUnderline color="pink" showSparks>
              clipping income.
            </MarkerUnderline>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-sans">
            See how clipping can turn views into revenue.
          </p>
        </div>

        {/* Outer Container with Decorative Tilted Badges */}
        <div className="relative">
          {/* Left Tilted Badge (Desktop) */}
          <div className="hidden lg:flex absolute -left-12 top-12 -rotate-12 flex-col items-center pointer-events-none select-none z-10">
            <div className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-md text-xs font-bold text-slate-800">
              More views more income
            </div>
            {/* Curved pink arrow pointing down-right */}
            <svg width="46" height="42" viewBox="0 0 50 45" fill="none" className="text-[#FF1464] mt-1 ml-6">
              <path
                d="M10 5 C 18 20, 28 32, 42 36"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M32 37 L 42 36 L 40 26"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Right Tilted Badge (Desktop) */}
          <div className="hidden lg:flex absolute -right-10 top-24 rotate-12 flex-col items-center pointer-events-none select-none z-10">
            <div className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-md text-xs font-bold text-slate-800">
              Turn your content into cash
            </div>
            {/* Curved pink arrow pointing down-left */}
            <svg width="46" height="42" viewBox="0 0 50 45" fill="none" className="text-[#FF1464] mt-1 mr-6">
              <path
                d="M40 5 C 32 20, 22 32, 8 36"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M18 37 L 8 36 L 10 26"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(0,102,255,0.08)] p-6 sm:p-10 relative">
            <div className="space-y-8">
              {/* Slider 1: Monthly short-form views */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="font-semibold text-slate-900">Monthly short-form views</span>
                  <span className="font-bold text-slate-900">
                    {views.toLocaleString('en-US')} views / month
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={10000}
                    max={10000000}
                    step={10000}
                    value={views}
                    onChange={(e) => setViews(Number(e.target.value))}
                    aria-label="Monthly short-form views"
                    className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                  <span>10K views</span>
                  <span>10M views</span>
                </div>
              </div>

              {/* Slider 2: Estimated RPM */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="font-semibold text-slate-900">Estimated RPM</span>
                  <span className="font-bold text-slate-900">
                    ${rpm.toFixed(2)} per 1,000 views
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={0.01}
                    max={1.0}
                    step={0.01}
                    value={rpm}
                    onChange={(e) => setRpm(Number(e.target.value))}
                    aria-label="Estimated RPM"
                    className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                  <span>$0.01</span>
                  <span>$1.00</span>
                </div>
              </div>

              {/* Slider 3: Monthly clips posted */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="font-semibold text-slate-900">Monthly clips posted</span>
                  <span className="font-bold text-slate-900">{clips} clips / month</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={clips}
                    onChange={(e) => setClips(Number(e.target.value))}
                    aria-label="Monthly clips posted"
                    className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0066FF]"
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 font-medium">
                  <span>1 clip</span>
                  <span>100 clips</span>
                </div>
              </div>

              {/* Bottom Payout Bar */}
              <div className="mt-8 rounded-2xl bg-[#EEF6FF] border border-[#BFDBFE]/70 p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
                  <span className="text-sm font-semibold text-slate-700">
                    Estimated monthly payout:
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[#0066FF] tracking-tight font-display">
                      ${estimatedPayout.toLocaleString('en-US')}
                    </span>
                    {/* Pink Spark Rays */}
                    <div className="text-[#FF1464] select-none">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="8" y1="16" x2="18" y2="6" />
                        <line x1="12" y1="20" x2="20" y2="12" />
                        <line x1="6" y1="14" x2="16" y2="4" />
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onStartClipping) {
                      onStartClipping();
                    } else {
                      document.getElementById('command-center')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-semibold text-sm sm:text-base shadow-[0_8px_20px_rgba(0,102,255,0.25)] hover:shadow-[0_12px_28px_rgba(0,102,255,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Start clipping now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
