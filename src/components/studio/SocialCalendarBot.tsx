import React, { useState } from "react";
import {
  Calendar,
  Smartphone,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Globe,
  Check,
  Music,
  Video,
  Camera,
  Zap,
  X,
} from "lucide-react";
import { MobileApprovalBot } from "../../types/studio";
import { SCHEDULE_EVENTS, MOCK_APPROVAL_BOT } from "../../lib/constants";
import { sharkoApi } from "../../services/sharkoApi";

export function SocialCalendarBot() {
  const events = SCHEDULE_EVENTS;
  const [approvalBot, setApprovalBot] = useState<MobileApprovalBot>(MOCK_APPROVAL_BOT);
  const [approvalMode, setApprovalMode] = useState<"bot-approval" | "full-autopilot">("bot-approval");
  const [selectedTimezone, setSelectedTimezone] = useState("IST (UTC+5:30)");
  const [activePlatformFilter, setActivePlatformFilter] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmittingApproval, setIsSubmittingApproval] = useState(false);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

  const platforms = [
    { id: "all", name: "All Networks", icon: Globe },
    { id: "tiktok", name: "TikTok", icon: Music },
    { id: "youtube", name: "YouTube", icon: Video },
    { id: "instagram", name: "Reels", icon: Camera },
    { id: "x", name: "X / Twitter", icon: Zap },
  ];

  const handleApprovePost = async () => {
    if (isSubmittingApproval || approvalBot.status === "approved") return;
    setIsSubmittingApproval(true);
    const prevStatus = approvalBot.status;
    setApprovalBot((prev) => ({ ...prev, status: "approved" }));
    setToastMessage(
      "Approved. Queued for auto-publish across TikTok & YouTube Shorts with verified OAuth token."
    );

    const res = await sharkoApi.approveBotSchedule({
      clipId: approvalBot.id || "clip-1",
      targetNetworks: ["tiktok", "youtube"],
      scheduledAtIso: new Date().toISOString(),
      timezone: selectedTimezone,
    });

    setIsSubmittingApproval(false);

    if (!res.ok && !res.isOfflineFallback) {
      setApprovalBot((prev) => ({ ...prev, status: prevStatus }));
      setToastMessage(res.error || "Failed to sync schedule with OAuth bot.");
    } else {
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleRegenerateHook = () => {
    setApprovalBot((prev) => ({
      ...prev,
      status: "regenerated",
      clipTitle: "Query Optimization: Analyzing Execution Plans",
      score: 97,
    }));
    setToastMessage("Hook regenerated: 'Query Optimization: Analyzing Execution Plans' (Virality: 97).");
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAutoFillTimes = () => {
    setToastMessage("Auto-Filled: Calculated peak audience engagement slots across global view clusters.");
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 select-none" aria-label="Social Scheduler and Mobile Approval">
      {/* Toast Alert Feedback */}
      {toastMessage && (
        <div className="p-3 rounded-lg bg-[#161920] border border-white/20 text-white font-medium text-xs flex items-center justify-between shadow-xl transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-text-muted hover:text-white p-1"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Profile & Scheduler Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white" />
            <h3 className="font-display font-semibold text-lg text-[#F4F4F6]">
              Autonomous Social Calendar & Mobile Approval Bot
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#161920] text-text-secondary border border-white/[0.08] text-xs font-mono">
              Auto Schedule Engine
            </span>
          </div>
          <p className="text-xs text-text-muted mt-1 font-sans">
            Never post blindly. Receive a 10-second mobile push preview before your scheduled shorts hit social feeds.
          </p>
        </div>

        {/* Timezone and Autopilot Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timezone selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#12151B] border border-white/[0.08] text-xs font-mono text-text-secondary">
            <Globe className="w-3.5 h-3.5 text-text-muted" />
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="bg-transparent text-[#F4F4F6] focus:outline-none cursor-pointer"
            >
              <option value="IST (UTC+5:30)" className="bg-[#0E1014]">IST (UTC+5:30)</option>
              <option value="EST (UTC-5)" className="bg-[#0E1014]">EST (UTC-5)</option>
              <option value="PST (UTC-8)" className="bg-[#0E1014]">PST (UTC-8)</option>
              <option value="UTC" className="bg-[#0E1014]">UTC (GMT)</option>
            </select>
          </div>

          {/* Autopilot vs Mobile Bot Approval Toggle */}
          <div className="p-0.5 rounded-md bg-[#12151B] border border-white/[0.08] flex items-center text-xs">
            <button
              type="button"
              onClick={() => setApprovalMode("bot-approval")}
              className={`px-3 py-1 rounded transition-all font-medium ${
                approvalMode === "bot-approval"
                  ? "bg-[#161920] text-white font-semibold border border-white/[0.12] shadow-sm"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Mobile Bot Mode
            </button>
            <button
              type="button"
              onClick={() => setApprovalMode("full-autopilot")}
              className={`px-3 py-1 rounded transition-all font-medium ${
                approvalMode === "full-autopilot"
                  ? "bg-[#161920] text-white font-semibold border border-white/[0.12] shadow-sm"
                  : "text-text-muted hover:text-white"
              }`}
            >
              Full Autopilot
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Mobile Bot Preview + Right Weekly Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Mobile Bot Approval Card */}
        <div className="lg:col-span-5 rounded-xl bg-[#12151B] border border-white/[0.08] p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-[#0E1014] border border-white/[0.08] flex items-center justify-center text-text-secondary">
                  <Smartphone className="w-4 h-4 text-[#10B981]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white leading-tight">
                    @SharkoStudioBot
                  </div>
                  <div className="text-[10px] font-mono text-[#10B981]">
                    ● Connected to @creator_clips
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-text-muted tabular-nums">
                12:42 PM
              </span>
            </div>

            {/* Simulated Chat Message Bubble */}
            <div className="mt-4 p-3.5 rounded-lg bg-[#0E1014] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>NEW VIRAL CLIP READY</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-[#10B981] font-semibold tabular-nums">
                  SCORE: {approvalBot.score}
                </span>
              </div>

              <div className="text-xs font-semibold text-white leading-snug font-sans">
                "{approvalBot.clipTitle}"
              </div>

              {/* 10-Second Clip Preview Thumbnail */}
              <div className="relative aspect-video w-full rounded-md bg-[#040507] overflow-hidden border border-white/[0.08]">
                <img
                  src={approvalBot.thumbnail}
                  alt={approvalBot.clipTitle}
                  className="w-full h-full object-cover filter brightness-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                    ▶
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white tabular-nums">
                  Preview: {approvalBot.clipDuration}
                </div>
              </div>

              <p className="text-[11px] text-text-secondary leading-relaxed font-sans">
                Scheduled to post to <strong>TikTok</strong> and <strong>YouTube Shorts</strong> at 02:45 PM. What would you like to do?
              </p>

              {/* Interactive Bot Response Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleApprovePost}
                  disabled={approvalBot.status === "approved" || isSubmittingApproval}
                  className={`py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                    approvalBot.status === "approved"
                      ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 cursor-default"
                      : "bg-white hover:bg-[#F4F4F6] text-[#08090B] disabled:opacity-75"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>
                    {isSubmittingApproval
                      ? "Syncing..."
                      : approvalBot.status === "approved"
                      ? "Queued"
                      : "✓ Approve & Queue"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleRegenerateHook}
                  className="py-2 px-3 rounded-md bg-[#161920] hover:bg-white/10 border border-white/[0.08] text-text-secondary hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>↻ Regenerate Hook</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.07] flex items-center justify-between text-[11px] font-mono text-text-muted">
            <span>Anti-Spam Throttling: ON</span>
            <span className="text-[#10B981]">1-Click Mobile Bot Active</span>
          </div>
        </div>

        {/* Right Column: Weekly Multi-Profile Calendar Grid */}
        <div className="lg:col-span-7 rounded-xl bg-[#12151B] border border-white/[0.08] p-5 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.07]">
            {/* Connected Platform Filters */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {platforms.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePlatformFilter(p.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                      activePlatformFilter === p.id
                        ? "bg-[#161920] text-white border-white/40 shadow-sm"
                        : "bg-[#0E1014] border-white/[0.07] text-text-muted hover:text-white"
                    }`}
                  >
                    <Icon className="w-3 h-3 text-text-muted" />
                    <span className="hidden sm:inline">{p.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Auto-Fill Best Times CTA */}
            <button
              type="button"
              onClick={handleAutoFillTimes}
              className="px-3 py-1.5 rounded-md bg-[#0E1014] hover:bg-[#161920] text-text-primary border border-white/[0.08] text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Auto-Fill Times</span>
            </button>
          </div>

          {/* 7-Day Calendar Grid: Horizontally Scrollable on Mobile */}
          <div className="overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
            <div className="min-w-[560px] grid grid-cols-7 gap-1.5">
            {days.map((day) => {
              const dayEvents = events.filter((e) => e.day === day);
              const isToday = day === "Mon";

              return (
                <div
                  key={day}
                  className={`rounded-lg p-2 min-h-[220px] flex flex-col justify-between border ${
                    isToday
                      ? "bg-[#0E1014] border-white/30"
                      : "bg-[#0E1014]/60 border-white/[0.06]"
                  }`}
                >
                  <div className="text-center pb-1 border-b border-white/[0.05]">
                    <span className="text-xs font-semibold text-white">{day}</span>
                    {isToday && (
                      <span className="block text-[9px] font-mono text-[#10B981] font-semibold">
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* Scheduled Slots */}
                  <div className="space-y-1.5 py-2 flex-1">
                    {dayEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-1.5 rounded bg-[#12151B] border border-white/[0.07] text-[10px] space-y-1 hover:border-white/30 transition-colors cursor-pointer"
                        title={evt.clipTitle}
                      >
                        <div className="flex items-center justify-between font-mono text-text-muted tabular-nums">
                          <span>{evt.time.split(" ")[0]}</span>
                          {evt.status === "posted" ? (
                            <Check className="w-2.5 h-2.5 text-[#10B981] stroke-[3]" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-white/70 inline-block" />
                          )}
                        </div>
                        <div className="font-medium text-white truncate text-[10px]">
                          {evt.clipTitle}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[9px] font-mono text-center text-text-muted">
                    {dayEvents.length} clips
                  </div>
                </div>
              );
            })}
            </div>
          </div>
          <div className="flex sm:hidden items-center justify-center text-[10px] font-mono text-[#D99B52] pt-1">
            <span>← Swipe 7-day schedule horizontally →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
