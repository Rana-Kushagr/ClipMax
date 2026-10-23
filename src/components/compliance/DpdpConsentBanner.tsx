import React, { useEffect, useState } from 'react';
import { Cookie, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { LegalTabId } from './LegalCenterModal';

const CONSENT_STORAGE_KEY = 'sharko_dpdp_consent_v2';

interface DpdpConsentBannerProps {
  onOpenLegalTab: (tab: LegalTabId) => void;
  onOpenRightsModal?: () => void;
}

export const DpdpConsentBanner: React.FC<DpdpConsentBannerProps> = ({ onOpenLegalTab }) => {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(true);

  useEffect(() => {
    const existing = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const saveDecision = (acceptAnalytics: boolean) => {
    const record = {
      essential: true,
      analytics: acceptAnalytics,
      timestamp: new Date().toISOString(),
      version: '2026.2-DPDP-GDPR',
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-[100] rounded-3xl bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-[0_24px_60px_rgba(0,102,255,0.16)] p-5 sm:p-6 text-slate-900 dark:text-slate-100 transition-all duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-[#EBF3FF] dark:bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center shrink-0 shadow-sm">
          <Cookie className="w-5 h-5" />
        </div>

        <div className="flex-1 text-xs sm:text-sm leading-relaxed">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
              We use cookies to power your clipping studio
            </span>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-[#FFEBF0] dark:bg-[#FF1464]/20 text-[#FF1464]">
              Privacy Protected
            </span>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-[13px] leading-relaxed">
            Sharko uses essential cookies to keep your studio session, 9:16 clip exports, and account secure, plus optional analytics cookies to improve AI hook detection speed. By clicking{' '}
            <strong className="text-slate-900 dark:text-white">Accept All</strong>, you agree to our cookie use as outlined in our{' '}
            <button
              type="button"
              onClick={() => onOpenLegalTab('terms')}
              className="font-bold text-[#0066FF] hover:underline cursor-pointer"
            >
              Terms & Conditions
            </button>
            ,{' '}
            <button
              type="button"
              onClick={() => onOpenLegalTab('privacy')}
              className="font-bold text-[#0066FF] hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            , and{' '}
            <button
              type="button"
              onClick={() => onOpenLegalTab('cookies')}
              className="font-bold text-[#0066FF] hover:underline cursor-pointer"
            >
              Cookie Policy
            </button>
            .
          </p>

          {showCustomize && (
            <div className="mt-3 p-3.5 rounded-2xl bg-[#F4F8FF] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Strictly Necessary Studio Cookies
                </span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Always Active</span>
              </div>
              <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-slate-200/70 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  AI Hook Speed & Studio Performance Analytics
                </span>
                <input
                  type="checkbox"
                  checked={analyticsOptIn}
                  onChange={(e) => setAnalyticsOptIn(e.target.checked)}
                  className="w-4 h-4 accent-[#0066FF] rounded cursor-pointer"
                />
              </label>
            </div>
          )}

          {/* Equal-Prominence Action Buttons */}
          <div className="mt-4 flex flex-wrap items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setShowCustomize((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-[#0066FF] text-xs font-bold transition cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showCustomize ? 'Hide Options' : 'Customize'}</span>
            </button>

            <button
              type="button"
              onClick={() => saveDecision(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
            >
              Reject Non-Essential
            </button>

            <button
              type="button"
              onClick={() => saveDecision(showCustomize ? analyticsOptIn : true)}
              className="btn-sharko-shimmer px-5 py-2 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white text-xs font-extrabold shadow-md shadow-[#0066FF]/25 transition cursor-pointer"
            >
              {showCustomize ? 'Save Preferences' : 'Accept All'}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
