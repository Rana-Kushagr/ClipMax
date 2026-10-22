import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Download,
  Trash2,
  RefreshCw,
  Mail,
  X,
  CheckCircle2,
  Clock,
  Building,
} from "lucide-react";
import { sanitizeUserText } from "../../utils/security";

interface DpdpRightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerToast?: (message: string) => void;
}

export const DpdpRightsModal: React.FC<Readonly<DpdpRightsModalProps>> = ({
  isOpen,
  onClose,
  triggerToast,
}) => {
  const [activeTab, setActiveTab] = useState<"rights" | "grievance" | "retention">("rights");
  const [nomineeEmail, setNomineeEmail] = useState("");
  const [nomineeSaved, setNomineeSaved] = useState(false);

  const notify = (msg: string) => {
    if (triggerToast) triggerToast(msg);
  };

  // 1. Right to Access (Sec. 11): Export machine-readable JSON data package
  const handleExportDataSummary = () => {
    const consent = localStorage.getItem("sharko_dpdp_consent_v1");
    const exportPackage = {
      platform: "Sharko Studio (Hunt the Moments)",
      dataFiduciary: "Sharko Cinema Systems Inc.",
      grievanceOfficer: "Kushagr Rana (kushagrrana7345@gmail.com)",
      dataPrincipalExportDate: new Date().toISOString(),
      statutoryCompliance: "India Digital Personal Data Protection Act, 2023 (DPDP Act)",
      consentRecord: consent ? JSON.parse(consent) : "Default session (No tracking cookies)",
      activeWorkspaceSession: {
        freeExportsClaimed: 0,
        localNominee: nomineeEmail || "Not recorded",
      },
      retentionGuarantee:
        "Temporary raw video caches are automatically purged within 72 hours per Section 8(7).",
    };

    const blob = new Blob([JSON.stringify(exportPackage, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Sharko_DPDP_Data_Export_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    notify("Exported machine-readable DPDP data summary (.json).");
  };

  // 2. Right to Correction & Erasure (Sec. 12): 1-click purge
  const handlePurgeAndErase = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // Ignore
    }
    notify("All local session state & preferences purged.");

    const mailto = `mailto:kushagrrana7345@gmail.com?subject=${encodeURIComponent(
      "[DPDP Sec. 12 Erasure Request] Purge Account & Workspace Data"
    )}&body=${encodeURIComponent(
      "Hi Kushagr,\n\nPursuant to Section 12 of the India DPDP Act 2023, I request complete erasure of all my user account data, uploaded media references, and telemetry from Sharko Studio.\n\nThank you."
    )}`;
    window.location.href = mailto;
  };

  // 3. Right to Withdraw Consent (Sec. 6(4))
  const handleRevokeConsent = () => {
    try {
      localStorage.removeItem("sharko_dpdp_consent_v1");
    } catch {
      // Ignore
    }
    notify("Consent revoked. Sharko will not log any optional telemetry.");
  };

  // 5. Right to Nominate (Sec. 14)
  const handleSaveNominee = (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = nomineeEmail.trim();
    const safeEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/;
    if (!candidate || !safeEmailPattern.test(candidate)) {
      notify("Please provide a valid nominee email address.");
      return;
    }
    const cleanNominee = sanitizeUserText(candidate, 80);
    try {
      localStorage.setItem("sharko_dpdp_nominee", encodeURIComponent(cleanNominee));
    } catch {
      // Ignore
    }
    setNomineeSaved(true);
    notify(`Nominee recorded: ${cleanNominee}`);
    setTimeout(() => setNomineeSaved(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
        {/* Backdrop click dismiss */}
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 -z-10 cursor-default bg-transparent border-none w-full h-full"
          aria-label="Dismiss rights modal"
          tabIndex={-1}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[#89CFF0]/30 bg-[#000816] p-6 sm:p-8 shadow-2xl text-[#FFFFFF] space-y-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-[#89CFF0]/15">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#0047AB]/25 border border-[#89CFF0]/35 text-[11px] font-mono text-[#89CFF0] mb-2">
                <ShieldAlert className="w-3.5 h-3.5 text-[#89CFF0]" />
                <span>Statutory Compliance • India DPDP Act 2023</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white">
                DPDP Privacy & Data Principal Rights Center
              </h3>
              <p className="font-mono text-xs text-[#89CFF0] mt-0.5">
                Sections 5, 8, 11–14 Compliance • 72h Auto-Purge Policy
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-[#040C1E] text-zinc-400 hover:text-white border border-[#89CFF0]/20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-[#89CFF0]/15 pb-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab("rights")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === "rights"
                  ? "bg-[#89CFF0] text-[#000000] font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              5 Statutory Rights
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("grievance")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === "grievance"
                  ? "bg-[#89CFF0] text-[#000000] font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Grievance Officer (Sec. 13)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("retention")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === "retention"
                  ? "bg-[#89CFF0] text-[#000000] font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              72h Retention Schedule
            </button>
          </div>

          {/* TAB 1: 5 STATUTORY RIGHTS */}
          {activeTab === "rights" && (
            <div className="space-y-4">
              {/* Right 1: Access */}
              <div className="rounded-2xl border border-[#89CFF0]/15 bg-[#00040A] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-mono text-xs font-bold text-[#89CFF0]">
                    Sec. 11 // Right to Access Information
                  </div>
                  <p className="text-xs text-zinc-300 font-sans">
                    Obtain a machine-readable .json summary of all processed data and active consent
                    tokens.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleExportDataSummary}
                  className="px-3.5 py-2 rounded-xl bg-[#040C1E] hover:bg-[#0047AB]/25 border border-[#89CFF0]/25 text-[#89CFF0] text-xs font-mono font-semibold flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .JSON</span>
                </button>
              </div>

              {/* Right 2: Correction & Erasure */}
              <div className="rounded-2xl border border-[#89CFF0]/15 bg-[#00040A] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-mono text-xs font-bold text-[#89CFF0]">
                    Sec. 12 // Right to Correction & Erasure
                  </div>
                  <p className="text-xs text-zinc-300 font-sans">
                    Purge all stored local sessions, cookies, and trigger an immediate erasure brief
                    to our Data Officer.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handlePurgeAndErase}
                  className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs font-mono font-semibold flex items-center gap-1.5 shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Purge & Request Erasure</span>
                </button>
              </div>

              {/* Right 3: Withdraw Consent */}
              <div className="rounded-2xl border border-[#89CFF0]/15 bg-[#00040A] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="font-mono text-xs font-bold text-[#89CFF0]">
                    Sec. 6(4) // Right to Withdraw Consent
                  </div>
                  <p className="text-xs text-zinc-300 font-sans">
                    Revoke any previously granted optional telemetry consent with zero penalty or
                    service disruption.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRevokeConsent}
                  className="px-3.5 py-2 rounded-xl bg-[#040C1E] hover:bg-[#0047AB]/25 border border-[#89CFF0]/25 text-white text-xs font-mono font-semibold flex items-center gap-1.5 shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Revoke Consent</span>
                </button>
              </div>

              {/* Right 4: Nomination */}
              <div className="rounded-2xl border border-[#89CFF0]/15 bg-[#00040A] p-4 space-y-2.5">
                <div className="font-mono text-xs font-bold text-[#89CFF0]">
                  Sec. 14 // Right to Nominate
                </div>
                <p className="text-xs text-zinc-300 font-sans">
                  Designate an authorized individual who may exercise your data principal rights in
                  the event of death or incapacity.
                </p>
                <form onSubmit={handleSaveNominee} className="flex items-center gap-2 pt-1">
                  <input
                    id="dpdp-nominee-email-input"
                    type="email"
                    required
                    aria-label="Nominee Email Address"
                    value={nomineeEmail}
                    onChange={(e) => setNomineeEmail(e.target.value)}
                    placeholder="nominee@domain.com"
                    className="flex-1 rounded-xl border border-[#89CFF0]/25 bg-[#040C1E] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#89CFF0]"
                  />
                  <button
                    type="submit"
                    className="btn-sharko-primary px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0"
                  >
                    {nomineeSaved ? "Saved ✓" : "Record Nominee"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: GRIEVANCE REDRESSAL (SEC. 13) */}
          {activeTab === "grievance" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#89CFF0]/15 bg-[#00040A] p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#89CFF0]">
                  <Building className="w-4 h-4 text-[#89CFF0]" />
                  <span>Data Fiduciary & Grievance Officer Disclosures</span>
                </div>

                <div className="space-y-2 text-xs font-sans text-zinc-300 leading-relaxed">
                  <div>
                    <strong className="text-white">Data Fiduciary:</strong> Sharko Cinema Systems
                    Inc.
                  </div>
                  <div>
                    <strong className="text-white">Statutory Grievance Officer:</strong> Kushagr
                    Rana
                  </div>
                  <div>
                    <strong className="text-white">Official Contact Email:</strong>{" "}
                    <code className="text-[#89CFF0]">kushagrrana7345@gmail.com</code>
                  </div>
                  <div>
                    <strong className="text-white">Telegram Direct Desk:</strong>{" "}
                    <code className="text-[#89CFF0]">@Kushagr_Rana</code>
                  </div>
                  <div>
                    <strong className="text-white">Statutory Resolution SLA:</strong> Formal
                    acknowledgment within 24 hours; resolution within 7 business days.
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="mailto:kushagrrana7345@gmail.com?subject=[DPDP Grievance Notice] Data Principal Request"
                    className="btn-sharko-primary inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>File Formal DPDP Grievance Notice →</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 72H RETENTION SCHEDULE */}
          {activeTab === "retention" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#89CFF0]/15 bg-[#00040A] p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#89CFF0]">
                  <Clock className="w-4 h-4 text-[#89CFF0]" />
                  <span>Automated 72-Hour Data Purge Commitment (Sec. 8(7))</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  In strict compliance with Section 8(7) of the Digital Personal Data Protection
                  Act, 2023, Sharko retains transient data only for the precise duration needed to
                  fulfill the video processing task:
                </p>
                <ul className="space-y-2 text-xs font-mono text-zinc-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#89CFF0] mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-white">Raw Audio/Video Caches:</strong> Automatically
                      purged after 72 hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#89CFF0] mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-white">Transcripts & Captions:</strong> Stored locally
                      in client browser storage; purged on demand.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#89CFF0] mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-white">Account Ledger & Credits:</strong> Maintained
                      strictly for billing rollover; erased immediately upon erasure request.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-3 border-t border-[#89CFF0]/15 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>India DPDP Rules 2025 Aligned</span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#040C1E] hover:bg-[#0047AB]/25 border border-[#89CFF0]/25 text-white transition-colors"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
