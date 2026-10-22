import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { SharkoLogo } from '../brand/SharkoLogo';

export interface AuthPayload {
  mode: 'login' | 'signup' | 'magic';
  email: string;
  password?: string;
  fullName?: string;
  role?: string;
  dpdpConsent?: boolean;
  rememberMe?: boolean;
}

interface SharkoAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  /** Backend Developer Hook: Plug your POST /api/auth/login or Supabase/Clerk call here */
  onAuthSubmit?: (payload: AuthPayload) => Promise<void> | void;
  /** Backend Developer Hook: Plug your OAuth redirect (Google / GitHub / Discord) here */
  onOAuthClick?: (provider: 'google' | 'github' | 'discord') => void;
}

export const SharkoAuthModal: React.FC<SharkoAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onAuthSubmit,
  onOAuthClick,
}) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'magic'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Creator / Podcaster');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [dpdpConsent, setDpdpConsent] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-bot trap for backend
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Password strength calculation for Signup
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score; // 0 to 4
  };
  const strength = getPasswordStrength(password);
  const strengthLabels = ['Too Short', 'Weak', 'Fair', 'Good', 'Studio Grade'];
  const strengthColors = ['bg-zinc-700', 'bg-red-500', 'bg-[#757500]', 'bg-[#0047AB]', 'bg-[#89CFF0]'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent bot reject
    if (mode === 'signup' && !dpdpConsent) {
      setStatusMessage('Please accept the India DPDP Act 2023 data privacy terms to create your account.');
      return;
    }
    setIsSubmitting(true);
    setStatusMessage(null);

    const payload: AuthPayload = {
      mode,
      email: email.trim(),
      password: mode === 'magic' ? undefined : password,
      fullName: mode === 'signup' ? fullName.trim() : undefined,
      role: mode === 'signup' ? role : undefined,
      dpdpConsent,
      rememberMe,
    };

    try {
      if (onAuthSubmit) {
        await onAuthSubmit(payload);
      } else {
        // Default UI preview feedback until backend dev attaches API endpoint
        await new Promise((r) => setTimeout(r, 600));
        setStatusMessage(
          mode === 'magic'
            ? `Magic sign-in link dispatched to ${payload.email} (Ready for Backend Auth Hook).`
            : `Authenticated as ${payload.email} — Studio Passport Active (+3 Free HD Exports).`
        );
        setTimeout(() => onClose(), 1200);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sharko Studio Authentication"
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 p-0 sm:p-4 backdrop-blur-md overflow-y-auto"
    >
      {/* Main Split-Screen Container: Full-screen scrollable on mobile, 980px 2-column glass card on desktop */}
      <div className="relative flex min-h-[100dvh] sm:min-h-0 w-full max-w-[1000px] flex-col lg:grid lg:grid-cols-12 overflow-hidden sm:rounded-3xl border-0 sm:border border-[#89CFF0]/30 bg-[#000000] shadow-[0_0_70px_rgba(0,71,171,0.45)]">
        
        {/* Top-Right Close Button (44x44px touch target for mobile & desktop) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Login Modal"
          className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#89CFF0]/25 bg-[#000B1D]/90 text-white hover:border-[#89CFF0] hover:bg-[#0047AB] transition touch-manipulation"
        >
          &#10005;
        </button>

        {/* LEFT COLUMN (7 Cols): INTERACTIVE AUTH FORM (Shadcn + Aceternity Bottom-Beam Inputs) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-10 bg-[#000000] relative z-10">
          <div>
            {/* Brand Header + Mobile Trust Pill */}
            <div className="flex flex-wrap items-center justify-between gap-2 pr-12">
              <SharkoLogo />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#757500]/60 bg-[#757500]/20 px-3 py-1 font-mono text-[10.5px] font-semibold text-[#E2E260]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#89CFF0]"></span>
                DPDP 2023 Encrypted
              </span>
            </div>

            {/* Mode Switcher Segmented Control (Sign In | Create Account | Magic Link) */}
            <div className="mt-6 grid grid-cols-3 gap-1 rounded-xl border border-[#89CFF0]/20 bg-[#040B18] p-1">
              <button
                type="button"
                onClick={() => { setMode('login'); setStatusMessage(null); }}
                className={`min-h-[42px] rounded-lg font-display text-[13px] font-bold transition touch-manipulation ${
                  mode === 'login'
                    ? 'bg-[#89CFF0] text-[#000000] shadow-[0_0_15px_rgba(137,207,240,0.4)]'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setStatusMessage(null); }}
                className={`min-h-[42px] rounded-lg font-display text-[13px] font-bold transition touch-manipulation ${
                  mode === 'signup'
                    ? 'bg-[#89CFF0] text-[#000000] shadow-[0_0_15px_rgba(137,207,240,0.4)]'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                Sign Up Free
              </button>
              <button
                type="button"
                onClick={() => { setMode('magic'); setStatusMessage(null); }}
                className={`min-h-[42px] rounded-lg font-display text-[13px] font-bold transition touch-manipulation ${
                  mode === 'magic'
                    ? 'bg-[#0047AB] text-[#FFFFFF] border border-[#89CFF0]/50'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                Magic OTP
              </button>
            </div>

            {/* Dynamic Heading */}
            <div className="mt-6">
              <h2 className="font-display text-[24px] sm:text-[28px] font-extrabold tracking-tight text-white">
                {mode === 'login' && 'Welcome back to Sharko Studio'}
                {mode === 'signup' && 'Create your Studio Passport'}
                {mode === 'magic' && 'Passwordless Instant Sign-In'}
              </h2>
              <p className="mt-1 text-[13.5px] text-zinc-400">
                {mode === 'login' && 'Sign in to access your 9:16 viral clips, scheduled queues, and bounty wallet.'}
                {mode === 'signup' && 'Start with 3 watermark-free 1080p exports. Zero credits burned on source uploads.'}
                {mode === 'magic' && 'We will send a one-time cryptographic login code straight to your inbox.'}
              </p>
            </div>

            {/* 1-Click OAuth Social Row (Google, GitHub, Discord) */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => onOAuthClick ? onOAuthClick('google') : setStatusMessage('Google OAuth ready for backend client_id.')}
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#89CFF0]/20 bg-[#050D1E] px-3 py-2.5 text-[13px] font-semibold text-white hover:border-[#89CFF0] hover:bg-[#0047AB]/30 transition touch-manipulation"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 15.65 5 12c0-3.65 3.36-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => onOAuthClick ? onOAuthClick('github') : setStatusMessage('GitHub OAuth ready for backend client_id.')}
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#89CFF0]/20 bg-[#050D1E] px-3 py-2.5 text-[13px] font-semibold text-white hover:border-[#89CFF0] hover:bg-[#0047AB]/30 transition touch-manipulation"
              >
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </button>

              <button
                type="button"
                onClick={() => onOAuthClick ? onOAuthClick('discord') : setStatusMessage('Discord OAuth ready for backend client_id.')}
                className="flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#89CFF0]/20 bg-[#050D1E] px-3 py-2.5 text-[13px] font-semibold text-white hover:border-[#89CFF0] hover:bg-[#0047AB]/30 transition touch-manipulation"
              >
                <span className="font-mono text-[#89CFF0] font-bold">DIS</span>
                <span>Discord</span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#89CFF0]/25 to-transparent"></div>
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-zinc-400">OR CONTINUE WITH EMAIL</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#89CFF0]/25 to-transparent"></div>
            </div>

            {/* Main Form (16px font on inputs to prevent iOS Safari zoom!) */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Hidden Anti-Bot Honeypot */}
              <input
                id="company_website_trap"
                type="text"
                name="company_website_trap"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
                className="hidden"
              />

              {mode === 'signup' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="group relative">
                    <label htmlFor="auth-full-name-input" className="block font-mono text-[11px] uppercase tracking-wider text-[#89CFF0] mb-1">
                      Full Name / Creator Handle
                    </label>
                    <input
                      id="auth-full-name-input"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Kushagr Rana"
                      className="w-full min-h-[46px] rounded-xl border border-[#89CFF0]/25 bg-[#030914] px-3.5 py-2.5 text-[16px] sm:text-[14px] text-white placeholder-zinc-500 focus:border-[#89CFF0] focus:outline-none focus:ring-1 focus:ring-[#89CFF0]"
                    />
                  </div>

                  <div>
                    <label htmlFor="auth-role-select" className="block font-mono text-[11px] uppercase tracking-wider text-[#89CFF0] mb-1">
                      Primary Workflow
                    </label>
                    <select
                      id="auth-role-select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full min-h-[46px] rounded-xl border border-[#89CFF0]/25 bg-[#030914] px-3.5 py-2.5 text-[16px] sm:text-[14px] text-white focus:border-[#89CFF0] focus:outline-none"
                    >
                      <option value="Creator / Podcaster">Creator / Podcaster</option>
                      <option value="Bounty Clipper">Bounty Clipper (Earn CPM)</option>
                      <option value="Agency / Video Editor">Agency / Video Editor</option>
                      <option value="Brand Sponsor">Brand Sponsor</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Email Input with Aceternity Bottom Glow Beam */}
              <div className="group relative">
                <label htmlFor="auth-email-input" className="block font-mono text-[11px] uppercase tracking-wider text-[#89CFF0] mb-1">
                  Studio Email Address
                </label>
                <input
                  id="auth-email-input"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@sharkostudio.com"
                  className="w-full min-h-[46px] rounded-xl border border-[#89CFF0]/25 bg-[#030914] px-3.5 py-2.5 text-[16px] sm:text-[14px] text-white placeholder-zinc-500 focus:border-[#89CFF0] focus:outline-none focus:shadow-[0_4px_20px_-2px_rgba(137,207,240,0.35)] transition"
                />
              </div>

              {/* Password Field (Hidden in Magic Link Mode) */}
              {mode !== 'magic' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="auth-password-input" className="font-mono text-[11px] uppercase tracking-wider text-[#89CFF0]">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('magic')}
                        className="font-mono text-[11px] text-[#89CFF0] hover:underline"
                      >
                        Forgot password? Use Magic OTP &rarr;
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="auth-password-input"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full min-h-[46px] rounded-xl border border-[#89CFF0]/25 bg-[#030914] px-3.5 py-2.5 pr-16 text-[16px] sm:text-[14px] text-white placeholder-zinc-500 focus:border-[#89CFF0] focus:outline-none focus:shadow-[0_4px_20px_-2px_rgba(137,207,240,0.35)] transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 font-mono text-[11px] text-[#89CFF0] hover:bg-[#0047AB]/30"
                    >
                      {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                  </div>

                  {/* Password Strength Meter on Sign Up */}
                  {mode === 'signup' && password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-1 h-1.5">
                        {[1, 2, 3, 4].map((lvl) => (
                          <div
                            key={lvl}
                            className={`flex-1 rounded-full transition-all ${
                              strength >= lvl ? strengthColors[strength] : 'bg-zinc-800'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="mt-1 flex justify-between font-mono text-[10px] text-zinc-400">
                        <span>Security: {strengthLabels[strength]}</span>
                        <span>Min 8 chars, 1 number &amp; symbol</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Remember Me / DPDP Act 2023 Affirmative Consent */}
              {mode === 'login' && (
                <label htmlFor="auth-remember-me-checkbox" className="flex items-center gap-2.5 text-[13px] text-zinc-300 cursor-pointer select-none">
                  <input
                    id="auth-remember-me-checkbox"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#89CFF0]"
                  />
                  <span>Keep my studio session signed in for 30 days</span>
                </label>
              )}

              {mode === 'signup' && (
                <label htmlFor="auth-dpdp-consent-checkbox" className="flex items-start gap-2.5 rounded-xl border border-[#757500]/50 bg-[#757500]/10 p-3 text-[12px] text-zinc-200 cursor-pointer">
                  <input
                    id="auth-dpdp-consent-checkbox"
                    type="checkbox"
                    checked={dpdpConsent}
                    onChange={(e) => setDpdpConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#89CFF0]"
                  />
                  <span>
                    I consent to Sharko Studio processing my email and workspace telemetry strictly for video clipping &amp; payout verification in accordance with the <strong>India DPDP Act 2023</strong>.
                  </span>
                </label>
              )}

              {/* Status Banner */}
              {statusMessage && (
                <div className="rounded-xl border border-[#89CFF0]/40 bg-[#0047AB]/25 px-3.5 py-2.5 font-mono text-[12px] text-[#89CFF0]">
                  {statusMessage}
                </div>
              )}

              {/* Primary Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-sharko-primary w-full min-h-[48px] rounded-xl py-3 font-display text-[15px] font-extrabold tracking-tight transition active:scale-[0.99] touch-manipulation"
              >
                {isSubmitting
                  ? 'Verifying Studio Credentials...'
                  : mode === 'login'
                  ? 'Enter Sharko Studio \u2192'
                  : mode === 'signup'
                  ? 'Create Free Account & Claim 3 HD Exports \u2192'
                  : 'Send Instant Magic Login Link \u2192'}
              </button>
            </form>
          </div>

          {/* Footer Support & Grievance Officer Hook */}
          <div className="mt-6 border-t border-[#89CFF0]/15 pt-4 flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-zinc-400">
            <span>Need help? <a href="mailto:kushagrrana7345@gmail.com" className="text-[#89CFF0] underline">kushagrrana7345@gmail.com</a></span>
            <span className="font-mono text-[10.5px] text-zinc-500">Zero-Trust Auth Ready</span>
          </div>
        </div>

        {/* RIGHT COLUMN (5 Cols): LIVE SHARKO TELEMETRY SHOWCASE (Cobalt #0047AB + Sky #89CFF0 + Olive #757500) */}
        <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#89CFF0]/20 bg-gradient-to-b from-[#00183D] via-[#000B1E] to-[#000000] p-6 sm:p-8 relative overflow-hidden">
          {/* Ambient Cobalt & Sky Glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#0047AB]/35 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#89CFF0]/15 blur-3xl"></div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#89CFF0]/35 bg-[#0047AB]/30 px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#89CFF0]">
              &#9733; SHARKO ENGINE v3.8 PASSPORT
            </span>
            <h3 className="mt-4 font-display text-[22px] font-bold leading-snug text-white">
              Hunt the viral moments. <span className="serif-italic text-[#89CFF0] font-normal">Pay only for finished exports.</span>
            </h3>

            {/* Live Mini 9:16 Telemetry Card Preview */}
            <div className="mt-5 rounded-2xl border border-[#89CFF0]/25 bg-[#000000]/80 p-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-[14px] font-bold text-white">9:16 Active Speaker Lock</div>
                  <div className="font-mono text-[11px] text-[#89CFF0]">Faster-Whisper + Gemini Flash</div>
                </div>
                <span className="rounded-full bg-[#89CFF0] px-2.5 py-1 font-mono text-[11px] font-extrabold text-[#000000]">
                  99% VIRAL
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-center font-mono text-[10.5px]">
                <div className="rounded-lg border border-[#0047AB]/60 bg-[#0047AB]/20 p-2 text-white">
                  0 Credits on Upload
                </div>
                <div className="rounded-lg border border-[#757500]/60 bg-[#757500]/20 p-2 text-[#E2E260]">
                  100% Credit Rollover
                </div>
              </div>
            </div>

            {/* Key Perks Checklist */}
            <ul className="mt-5 space-y-2.5 text-[13px] text-zinc-200">
              <li className="flex items-center gap-2">
                <span className="text-[#89CFF0] font-bold">&#10003;</span>
                <span>3 free 1080p 60fps watermark-free exports on sign-up</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#89CFF0] font-bold">&#10003;</span>
                <span>1-click Telegram Bot (@Kushagr_Rana) mobile approval</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#89CFF0] font-bold">&#10003;</span>
                <span>Direct sponsor campaign intake &amp; verified bounty wallet</span>
              </li>
            </ul>
          </div>

          {/* Direct Support & Founder Channels */}
          <div className="relative z-10 mt-6 rounded-xl border border-[#89CFF0]/20 bg-[#000000]/70 p-3.5 font-mono text-[11px] text-zinc-300">
            <div className="text-[#89CFF0] font-semibold mb-1">FOUNDER &amp; SUPPORT CHANNELS</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <a href="https://www.instagram.com/_ranakushagr/" target="_blank" rel="noopener noreferrer" className="hover:text-[#89CFF0] underline">IG: @_ranakushagr</a>
              <a href="https://t.me/Kushagr_Rana" target="_blank" rel="noopener noreferrer" className="hover:text-[#89CFF0] underline">TG: @Kushagr_Rana</a>
              <a href="https://www.threads.net/@_ranakushagr" target="_blank" rel="noopener noreferrer" className="hover:text-[#89CFF0] underline">Threads</a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SharkoAuthModal;
