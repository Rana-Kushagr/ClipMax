import React, { useEffect, useState } from 'react';
import { Shield, FileText, Cookie, RefreshCcw, X, CheckCircle2, Mail, ExternalLink } from 'lucide-react';

export type LegalTabId = 'terms' | 'privacy' | 'cookies' | 'refunds';

interface LegalCenterModalProps {
  isOpen: boolean;
  initialTab?: LegalTabId;
  onClose: () => void;
  onUpdateCookiePreferences?: (analyticsAccepted: boolean) => void;
}

export const LegalCenterModal: React.FC<LegalCenterModalProps> = ({
  isOpen,
  initialTab = 'terms',
  onClose,
  onUpdateCookiePreferences,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabId>(initialTab);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('sharko_dpdp_consent_v2');
      if (!stored) return false;
      return Boolean(JSON.parse(stored).analytics);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = origOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveCookieToggle = (nextValue: boolean) => {
    setAnalyticsEnabled(nextValue);
    const payload = {
      essential: true,
      analytics: nextValue,
      timestamp: new Date().toISOString(),
      version: '2026.2-DPDP-GDPR',
    };
    localStorage.setItem('sharko_dpdp_consent_v2', JSON.stringify(payload));
    if (onUpdateCookiePreferences) {
      onUpdateCookiePreferences(nextValue);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sharko-legal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-[0_24px_70px_rgba(0,0,0,0.28)] overflow-hidden text-slate-900 dark:text-slate-100"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-[#F4F8FF] dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0066FF] text-white flex items-center justify-center shadow-md shadow-[#0066FF]/25">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 id="sharko-legal-modal-title" className="text-lg sm:text-xl font-extrabold tracking-tight">
                Sharko Legal, Terms & Privacy Center
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Effective Date: March 2026 • Compliant with India DPDP Act 2023, GDPR & CCPA
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Legal Center"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] px-4 sm:px-6 gap-2 pt-3">
          {[
            { id: 'terms', label: 'Terms & Conditions', icon: FileText },
            { id: 'privacy', label: 'Privacy Policy (DPDP Act)', icon: Shield },
            { id: 'cookies', label: 'Cookie Policy & Controls', icon: Cookie },
            { id: 'refunds', label: 'Refunds & Billing', icon: RefreshCcw },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as LegalTabId)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-t-xl border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#0066FF] text-[#0066FF] bg-[#F4F8FF] dark:bg-slate-800/70'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Legal Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {activeTab === 'terms' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#F4F8FF] dark:bg-slate-900 border border-[#0066FF]/20">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0066FF] mb-1">
                  Plain-English Summary
                </p>
                <p className="text-slate-700 dark:text-slate-200 font-medium">
                  You own 100% of the clips you generate on Sharko. You are responsible for ensuring you have the right to clip the source videos you submit. AI virality scores and income calculators are estimates, not guaranteed financial returns.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  1. Acceptance of Terms & Service Scope
                </h3>
                <p>
                  By accessing or using <strong>Sharko ("Hunt the Moment")</strong>, creating an account, or exporting AI-generated video clips, you agree to be bound by these Terms & Conditions. Sharko provides automated AI hook detection, dynamic 9:16 reframing, and animated caption generation for short-form video creators and agencies.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  2. Intellectual Property & 100% Creator Content Ownership
                </h3>
                <p>
                  <strong>You retain 100% ownership and full commercial monetization rights</strong> to all original videos you upload and all exported 9:16 clips, captions, and brand kits generated through your Sharko account. Sharko claims zero ownership or royalties over your exported content or social media payouts.
                </p>
                <p>
                  By submitting a video link (e.g., YouTube, Twitch, Kick, or podcast feed) or uploading a file, you represent and warrant that you own the rights, have creator permission, or operate under applicable fair-use/authorized clipping campaign rules for that source media.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  3. AI Output, Virality Score & Earnings Calculator Disclaimer ("As-Is" Warranty)
                </h3>
                <p>
                  Sharko's AI hook detection, virality scores, auto-captions, and interactive Monthly Clipping Income Calculator are provided strictly on an <strong>"AS-IS" and "AS-AVAILABLE" basis</strong> for informational and creative assistance. Payout showcases and calculator projections reflect illustrative creator RPM ranges ($0.01–$1.00 per 1,000 views) and do not guarantee specific view counts, platform monetization approval, or financial earnings.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  4. Output-Only Credit Metering & Acceptable Use
                </h3>
                <p>
                  Sharko meters credits based on finished exported clips rather than penalizing you for raw source upload minutes. You agree not to use automated scraping bots, reverse-engineer our AI endpoints, bypass rate limits, or upload unlawful, defamatory, or non-consensual content.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  5. Limitation of Liability & Governing Law
                </h3>
                <p>
                  To the maximum extent permitted by applicable law, Sharko and its founder shall not be liable for any indirect, incidental, consequential, or platform account-suspension damages arising from your use of the service. Total cumulative liability for any claim shall not exceed the total subscription fees paid by you to Sharko in the twelve (12) months preceding the claim. These Terms are governed by the laws of India.
                </p>
              </section>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#F4F8FF] dark:bg-slate-900 border border-[#0066FF]/20">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0066FF] mb-1">
                  India DPDP Act 2023 & Global GDPR / CCPA Compliance
                </p>
                <p className="text-slate-700 dark:text-slate-200 font-medium">
                  We collect only the minimum data needed to run your clipping studio, never sell your personal data to third-party ad brokers, and never train public AI models on your private video uploads without consent.
                </p>
              </div>

              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  1. Personal Data We Collect & Purpose Limitation
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Account & Identity Data:</strong> Email address and authentication profile when you sign up via Email or Google OAuth.</li>
                  <li><strong>Studio & Clipping Data:</strong> Video URLs submitted, generated clip timestamps, caption preferences, and custom brand kit assets.</li>
                  <li><strong>Security & Consent Logs:</strong> Anonymized IP rate-limiting logs and cookie consent timestamps required for security and regulatory compliance.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  2. Your Rights as a Data Principal (Sections 11–14, India DPDP Act 2023 & GDPR/CCPA)
                </h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Right to Access & Summary (Section 11):</strong> Request a complete summary of your personal data and third-party subprocessors (authentication, cloud storage, payment gateway).</li>
                  <li><strong>Right to Correction & Erasure (Section 12):</strong> Request immediate correction or permanent deletion ("Right to be Forgotten") of your account, clips, and brand kits.</li>
                  <li><strong>Right to Withdraw Consent (Section 6):</strong> Withdraw optional analytics cookie consent or marketing communications at any time with 1 click.</li>
                  <li><strong>CCPA Notice:</strong> Sharko does <strong>not</strong> sell or share your personal information for cross-context behavioral advertising.</li>
                </ul>
              </section>

              <section className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#0066FF]" />
                  <span>3. Data Protection & Grievance Redressal Officer</span>
                </h3>
                <p className="text-xs sm:text-sm">
                  For any privacy request, account deletion, sponsor campaign inquiry, or grievance under the Digital Personal Data Protection Act, 2023 (India), contact our Grievance Officer directly:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-semibold">
                  <a
                    href="mailto:kushagrrana7345@gmail.com?subject=Sharko%20Privacy%20%2F%20Legal%20Request"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0066FF] hover:underline"
                  >
                    <span>📧 kushagrrana7345@gmail.com</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                  </a>
                  <a
                    href="https://t.me/Kushagr_Rana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0066FF] hover:underline"
                  >
                    <span>✈️ Telegram: @Kushagr_Rana</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                  </a>
                  <a
                    href="https://www.instagram.com/_ranakushagr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0066FF] hover:underline"
                  >
                    <span>📸 Instagram: @_ranakushagr</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                  </a>
                  <a
                    href="https://www.threads.com/@_ranakushagr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#0066FF] hover:underline"
                  >
                    <span>🧵 Threads: @_ranakushagr</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                  </a>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-5">
              <p>
                Like leading AI video clipping studios, Sharko uses cookies and local storage to keep your login session secure, remember your Day/Night theme preference, and improve AI hook-finding speed.
              </p>

              {/* Strictly Necessary Cookies Card */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      1. Strictly Necessary Studio & Security Cookies
                    </span>
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Required for secure authentication (session protection), Day/Night theme persistence (`sharko_theme_mode`), and storing your privacy consent choice.
                  </p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
              </div>

              {/* Optional Analytics Cookies Card with Live Toggle */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      2. AI Performance & Studio Analytics Cookies (Optional)
                    </span>
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-[#0066FF]/10 text-[#0066FF]">
                      Opt-In Only
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Helps us measure clip export speed, caption rendering performance, and UI responsiveness. Never fires unless you explicitly opt in.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analyticsEnabled}
                  onClick={() => handleSaveCookieToggle(!analyticsEnabled)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    analyticsEnabled
                      ? 'bg-[#0066FF] text-white shadow-md shadow-[#0066FF]/25'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {analyticsEnabled ? 'Enabled (Click to Disable)' : 'Disabled (Click to Enable)'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'refunds' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                1. 1-Click Anytime Subscription Cancellation
              </h3>
              <p>
                All Sharko plans (<strong>Starter $9.99/mo</strong>, <strong>Creator $29.99/mo</strong>, and <strong>Agency $69.99/mo</strong>) are billed monthly with zero long-term lock-in contracts. You can cancel your subscription with 1 click from your account settings or by emailing <a href="mailto:kushagrrana7345@gmail.com" className="text-[#0066FF] font-semibold hover:underline">kushagrrana7345@gmail.com</a> at any time before your next renewal date.
              </p>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                2. Refund Eligibility & Credit Guarantee
              </h3>
              <p>
                If you experience a technical bug where an exported clip fails to render properly, we immediately restore the deducted clip credits to your balance. First-time subscribers who have exported fewer than 3 clips within 7 days of purchase may request a full refund by contacting support.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-[#F4F8FF] dark:bg-slate-900/90">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Questions? Reach founder Kushagr Rana at{' '}
            <a href="mailto:kushagrrana7345@gmail.com" className="text-[#0066FF] font-semibold hover:underline">
              kushagrrana7345@gmail.com
            </a>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-[#0066FF]/25 transition cursor-pointer"
          >
            Got it, return to Sharko
          </button>
        </div>
      </div>
    </div>
  );
};
