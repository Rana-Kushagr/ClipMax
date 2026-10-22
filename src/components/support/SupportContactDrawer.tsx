import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Copy,
  Check,
  Send,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";

interface SupportContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportContactDrawer: React.FC<Readonly<SupportContactDrawerProps>> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const email = "kushagrrana7345@gmail.com";
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
    "[Sharko Studio Support] Inquiry for Kushagr Rana"
  )}`;

  const handleCopyEmail = () => {
    void navigator.clipboard.writeText(email).catch(() => {
      // Fallback
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socials = [
    {
      name: "Telegram Desk",
      handle: "@Kushagr_Rana",
      url: "https://t.me/Kushagr_Rana",
      badge: "Direct Chat",
      color: "#229ED9",
    },
    {
      name: "Instagram",
      handle: "@_ranakushagr",
      url: "https://www.instagram.com/_ranakushagr/",
      badge: "Creator DM",
      color: "#E1306C",
    },
    {
      name: "Threads",
      handle: "@_ranakushagr",
      url: "https://www.threads.com/@_ranakushagr",
      badge: "Discussions",
      color: "#F3E5AB",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Backdrop click dismiss */}
          <button
            type="button"
            onClick={onClose}
            className="fixed inset-0 -z-10 cursor-default bg-transparent border-none w-full h-full"
            aria-label="Dismiss support drawer"
            tabIndex={-1}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-3xl border border-[#89CFF0]/30 bg-[#000816] p-6 sm:p-8 shadow-2xl text-[#FFFFFF] space-y-6"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#89CFF0]/15">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#0047AB]/25 border border-[#89CFF0]/35 text-[11px] font-mono text-[#89CFF0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#89CFF0] animate-pulse" />
                  <span>Founder Desk • 24h SLA</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white">
                  Official Support & Direct Contact
                </h3>
                <p className="text-xs text-zinc-400 font-sans">
                  Direct line to Kushagr Rana (Founder & Lead Architect). Inquiries, custom studio
                  integrations, or brand sponsorships.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-[#040C1E] text-zinc-400 hover:text-white border border-[#89CFF0]/20"
                aria-label="Close support dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Email Primary Card */}
            <div className="rounded-2xl border border-[#89CFF0]/25 bg-[#00040A] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#89CFF0]">
                  <Mail className="w-4 h-4 text-[#89CFF0]" />
                  <span>Official Support & Sponsorship Email</span>
                </div>
                <span className="text-[10px] font-mono text-[#89CFF0]">Priority Inbox</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-[#040C1E] px-3.5 py-2.5 border border-[#89CFF0]/15 text-xs sm:text-sm font-mono text-white">
                <span className="truncate">{email}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-[11px] font-mono text-[#89CFF0] hover:text-white px-2 py-1 rounded bg-[#050D1E] ml-2 shrink-0 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-[#89CFF0]" />
                      <span className="text-[#89CFF0]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`mailto:${email}`}
                  className="btn-sharko-primary flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all shadow-md active:scale-95 text-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open Mail App</span>
                </a>
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#89CFF0]/30 bg-[#040C1E] hover:bg-[#0047AB]/25 text-[#89CFF0] font-mono text-xs font-semibold transition-all text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mail in Gmail Web</span>
                </a>
              </div>
            </div>

            {/* Social Direct Desks */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                Direct Messaging Channels
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col justify-between p-3 rounded-xl border border-[#89CFF0]/15 bg-[#00040A] hover:border-[#89CFF0]/40 hover:bg-[#000B1D] transition-all group"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>{s.badge}</span>
                      <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-bold text-white font-display">{s.name}</div>
                      <div className="text-[11px] font-mono text-[#89CFF0] truncate">{s.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* SLA Trust Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[#89CFF0]/15 text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#89CFF0]" />
                Direct founder replies • Zero bot redirects
              </span>
              <button
                type="button"
                onClick={onClose}
                className="hover:text-white transition-colors underline"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
