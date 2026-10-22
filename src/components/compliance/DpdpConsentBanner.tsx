import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Globe, ChevronRight } from "lucide-react";

interface DpdpConsentBannerProps {
  onOpenRightsModal: () => void;
}

export const DpdpConsentBanner: React.FC<Readonly<DpdpConsentBannerProps>> = ({
  onOpenRightsModal,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [telemetryOptIn, setTelemetryOptIn] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sharko_dpdp_consent_v1");
      if (!stored) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (acceptedAll: boolean) => {
    const consentPayload = {
      version: "dpdp_2023_v1",
      timestamp: new Date().toISOString(),
      language,
      essential: true,
      telemetry: acceptedAll || telemetryOptIn,
      marketing: acceptedAll || marketingOptIn,
      fiduciary: "Sharko Cinema Systems Inc.",
      grievanceOfficer: "Kushagr Rana (kushagrrana7345@gmail.com)",
    };

    try {
      localStorage.setItem("sharko_dpdp_consent_v1", JSON.stringify(consentPayload));
    } catch {
      // Ignore local storage error
    }
    setIsVisible(false);
  };

  const handleReject = () => {
    const refusalPayload = {
      version: "dpdp_2023_v1",
      timestamp: new Date().toISOString(),
      language,
      essential: true,
      telemetry: false,
      marketing: false,
      status: "refused_non_essential",
    };
    try {
      localStorage.setItem("sharko_dpdp_consent_v1", JSON.stringify(refusalPayload));
    } catch {
      // Ignore
    }
    setIsVisible(false);
  };

  const t = {
    en: {
      tag: "India DPDP Act 2023 Notice",
      title: "Your Digital Personal Data & Consent Preferences",
      summary:
        "Under Section 5 of India's Digital Personal Data Protection Act, 2023, Sharko requires your specific, informed, and unambiguous consent before processing optional session data. Raw video streams are automatically purged within 72 hours.",
      essential: "1. Essential Studio Session & Security (Always Active)",
      telemetry: "2. Performance & Error Telemetry (Optional)",
      marketing: "3. Verified Campaign & Product Alerts (Optional)",
      rejectBtn: "Reject Non-Essential",
      acceptBtn: "Accept Selected",
      rightsLink: "View DPDP Data Principal Rights & Grievance Officer →",
    },
    hi: {
      tag: "भारत डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम (DPDP) 2023 सूचना",
      title: "आपका डिजिटल व्यक्तिगत डेटा और सहमति विकल्प",
      summary:
        "भारत के DPDP अधिनियम 2023 की धारा 5 के अंतर्गत, शार्को को केवल आपकी स्पष्ट सहमति से ही वैकल्पिक डेटा एकत्र करने की अनुमति है। कच्चे वीडियो स्ट्रीम 72 घंटों के भीतर स्वतः नष्ट कर दिए जाते हैं।",
      essential: "1. आवश्यक स्टूडियो सत्र और सुरक्षा (सदैव सक्रिय)",
      telemetry: "2. प्रदर्शन एवं त्रुटि विश्लेषण (वैकल्पिक)",
      marketing: "3. ब्रांड अभियान और उत्पाद सूचनाएं (वैकल्पिक)",
      rejectBtn: "अनावश्यक अस्वीकार करें",
      acceptBtn: "चयनित स्वीकार करें",
      rightsLink: "डेटा अधिकार एवं शिकायत अधिकारी विवरण देखें →",
    },
  }[language];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 md:max-w-4xl md:mx-auto z-50 rounded-2xl border border-[#F3E5AB]/25 bg-[#17120C]/95 backdrop-blur-xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-[#F4F4F6]"
        aria-label="DPDP Act Privacy and Consent Preferences"
      >
        <div className="flex flex-col gap-3">
          {/* Top Bar with Language Toggle */}
          <div className="flex items-center justify-between border-b border-[#F3E5AB]/10 pb-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span className="font-mono text-[11px] font-bold text-[#F3E5AB] uppercase tracking-wider">
                {t.tag}
              </span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[#2A2016] border border-[#F3E5AB]/15 text-xs font-mono">
              <Globe className="w-3.5 h-3.5 text-[#D99B52] ml-1.5" />
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  language === "en" ? "bg-[#F3E5AB] text-[#17120C] font-bold" : "text-[#A1A1AA]"
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage("hi")}
                className={`px-2 py-0.5 rounded transition-colors ${
                  language === "hi" ? "bg-[#F3E5AB] text-[#17120C] font-bold" : "text-[#A1A1AA]"
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-[#E5E0D8]/80 leading-relaxed font-sans">{t.summary}</p>

          {/* Unbundled Non-Pre-Ticked Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-1 text-[11.5px] font-mono">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-[#221A12] border border-[#F3E5AB]/10 text-white/90">
              <Lock className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span className="truncate">{t.essential}</span>
            </div>

            <label className="flex items-center gap-2 p-2 rounded-xl bg-[#221A12] border border-[#F3E5AB]/10 hover:border-[#F3E5AB]/30 cursor-pointer text-white/80 transition-colors">
              <input
                type="checkbox"
                checked={telemetryOptIn}
                onChange={(e) => setTelemetryOptIn(e.target.checked)}
                className="rounded border-[#F3E5AB]/30 text-[#10B981] focus:ring-0 bg-[#17120C]"
              />
              <span className="truncate">{t.telemetry}</span>
            </label>

            <label className="flex items-center gap-2 p-2 rounded-xl bg-[#221A12] border border-[#F3E5AB]/10 hover:border-[#F3E5AB]/30 cursor-pointer text-white/80 transition-colors">
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className="rounded border-[#F3E5AB]/30 text-[#10B981] focus:ring-0 bg-[#17120C]"
              />
              <span className="truncate">{t.marketing}</span>
            </label>
          </div>

          {/* Actions: Equal prominence for Reject and Accept */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#F3E5AB]/10">
            <button
              type="button"
              onClick={onOpenRightsModal}
              className="text-xs font-mono text-[#D99B52] hover:text-[#F3E5AB] transition-colors flex items-center gap-1 self-start sm:self-center"
            >
              <span>{t.rightsLink}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReject}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-[#F3E5AB]/25 bg-[#2A2016] hover:bg-[#382B1E] text-[#E5E0D8] font-mono text-xs font-semibold transition-all active:scale-95"
              >
                {t.rejectBtn}
              </button>

              <button
                type="button"
                onClick={() => saveConsent(false)}
                className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-[#F3E5AB] hover:bg-white text-[#17120C] font-mono text-xs font-bold transition-all shadow-md active:scale-95"
              >
                {t.acceptBtn}
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
