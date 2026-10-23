import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Zap,
  Flame,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';
import { SharkoBrandLogo, MarkerUnderline } from '../brand/SharkoBrandLogo';
import { LegalTabId } from '../compliance/LegalCenterModal';

export interface AuthPayload {
  mode: 'login' | 'signup';
  email: string;
  password?: string;
  fullName?: string;
  dpdpConsent?: boolean;
}

interface SharkoAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onAuthSubmit?: (payload: AuthPayload) => Promise<void> | void;
  onOAuthClick?: (provider: 'google') => void;
  onOpenLegalTab?: (tab: LegalTabId) => void;
}

export const SharkoAuthModal: React.FC<SharkoAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  onAuthSubmit,
  onOAuthClick,
  onOpenLegalTab,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dpdpConsent, setDpdpConsent] = useState(true);
  const [honeypot, setHoneypot] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (mode === 'signup' && !dpdpConsent) {
      setStatusMessage('Please accept the DPDP Act 2023 privacy terms to continue.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const payload: AuthPayload = {
      mode,
      email: email.trim(),
      password,
      fullName: mode === 'signup' ? fullName.trim() : undefined,
      dpdpConsent,
    };

    try {
      if (onAuthSubmit) {
        await onAuthSubmit(payload);
      } else {
        await new Promise((r) => setTimeout(r, 600));
        setStatusMessage(
          mode === 'signup'
            ? 'Account created! Welcome to Sharko Studio (+3 Free HD Exports).'
            : 'Welcome back! Signed in successfully.'
        );
        setTimeout(() => onClose(), 1000);
      }
    } catch {
      setStatusMessage('Authentication failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sharko Authentication"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[99999] overflow-y-auto bg-black/60 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center min-h-screen"
    >
      {/* Modal Card Container with max-height and internal scrolling */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-[960px] max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-[#0F172A] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
      >
        {/* Top Header Bar inside Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0F172A] shrink-0">
          <SharkoBrandLogo size="sm" showSubtitle={false} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <span>Back to Studio</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Split-Screen Body */}
        <div className="overflow-y-auto grid grid-cols-1 lg:grid-cols-12 flex-1">
          {/* Left Column (5 Cols on LG): Value Proposition & Social Proof */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#F4F8FF] to-white dark:from-[#0B1120] dark:to-[#0F172A] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FF] dark:bg-[#0066FF]/20 border border-[#BFDBFE] dark:border-[#0066FF]/40 text-[#0066FF] dark:text-[#89CFF0] text-[11px] font-bold tracking-wider uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 animate-spark" />
                <span>START FREE • NO CARD REQUIRED</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] dark:text-white tracking-tight font-display mb-3">
                Start your clipping{' '}
                <MarkerUnderline color="pink" showSparks>
                  side hustle
                </MarkerUnderline>{' '}
                today.
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans mb-6">
                Turn long podcasts and streams into viral 9:16 clips in minutes. Build a scalable income stream with autonomous AI clipping.
              </p>

              {/* 3 Value Pillars */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF3FF] dark:bg-[#0066FF]/20 text-[#0066FF] dark:text-[#89CFF0] flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Autonomous 9:16 Reframe</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Multi-speaker face tracking & split screen for TikTok, Reels & Shorts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FFEBF0] dark:bg-[#FF1464]/20 text-[#FF1464] flex items-center justify-center shrink-0 mt-0.5">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Kinetic Subtitles Engine</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      MrBeast, Hormozi & Dev typography that doubles average viewer retention.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Output-Only Billing</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      0 credits burned on link preview or scoring. Pay only on finished HD export.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Trust Badge */}
            <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex -space-x-1.5">
                  <div className="w-6 h-6 rounded-full bg-blue-600 border border-white dark:border-slate-800 text-[9px] font-bold text-white flex items-center justify-center">
                    ER
                  </div>
                  <div className="w-6 h-6 rounded-full bg-purple-600 border border-white dark:border-slate-800 text-[9px] font-bold text-white flex items-center justify-center">
                    MB
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-600 border border-white dark:border-slate-800 text-[9px] font-bold text-white flex items-center justify-center">
                    SK
                  </div>
                  <div className="w-6 h-6 rounded-full bg-amber-600 border border-white dark:border-slate-800 text-[9px] font-bold text-white flex items-center justify-center">
                    AC
                  </div>
                </div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Trusted by 200,000+ creators and clippers worldwide
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols on LG): Auth Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-white dark:bg-[#0F172A] flex flex-col justify-center">
            {/* Mode Switcher Tabs */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 mb-6 border border-slate-200/80 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setStatusMessage(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Sign up free
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setStatusMessage(null);
                }}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Log in
              </button>
            </div>

            {/* Google OAuth Button */}
            <button
              type="button"
              onClick={() =>
                onOAuthClick
                  ? onOAuthClick('google')
                  : setStatusMessage('Google OAuth ready for backend integration.')
              }
              className="w-full py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 transition-all shadow-sm cursor-pointer mb-5"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
              <span className="bg-white dark:bg-[#0F172A] px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 absolute">
                or continue with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <input
                type="text"
                name="user_trap"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
              />

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Kushagr Rana"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="dpdp-consent"
                    checked={dpdpConsent}
                    onChange={(e) => setDpdpConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#0066FF] focus:ring-[#0066FF] cursor-pointer"
                  />
                  <label htmlFor="dpdp-consent" className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    I accept{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegalTab?.('privacy')}
                      className="text-[#0066FF] dark:text-[#89CFF0] font-semibold hover:underline inline p-0 m-0 cursor-pointer"
                    >
                      India DPDP Act 2023 privacy rights
                    </button>{' '}
                    and the{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegalTab?.('terms')}
                      className="text-[#0066FF] dark:text-[#89CFF0] font-semibold hover:underline inline p-0 m-0 cursor-pointer"
                    >
                      72h source video auto-purge policy
                    </button>
                    .
                  </label>
                </div>
              )}

              {statusMessage && (
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-[#0066FF] dark:text-[#89CFF0] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-sharko-shimmer w-full py-3.5 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_rgba(0,102,255,0.25)] hover:shadow-[0_12px_28px_rgba(0,102,255,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                <span>
                  {isSubmitting
                    ? 'Processing...'
                    : mode === 'signup'
                    ? 'Create free account →'
                    : 'Log in to account →'}
                </span>
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                No credit card required to start • 3 free HD exports included
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
