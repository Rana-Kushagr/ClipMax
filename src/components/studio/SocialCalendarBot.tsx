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
  Play,
  Clock,
  ShieldCheck,
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
      "Approved! Queued for auto-publish across TikTok & YouTube Shorts with verified OAuth token."
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
    <div className="space-y-6 select-none text-white font-sans" aria-label="Social Scheduler and Mobile Approval">
      {/* Toast Alert Feedback */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-slate-900 border border-[#0066FF]/40 text-white font-medium text-xs flex items-center justify-between shadow-2xl transition-all">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-100">{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 cursor-pointer"
            aria-label="Close message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Profile & Scheduler Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-7 h-7 rounded-lg bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center text-[#0066FF]">
              <Calendar className="w-4 h-4 text-[#0066FF]" />
            </div>
            <h3 className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight">
              Autonomous Social Calendar & Mobile Approval Bot
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/30 text-[11px] font-mono font-bold">
              Auto Schedule Engine
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 font-sans">
            Never post blindly. Receive a 10-second mobile push preview before your scheduled shorts hit social feeds.
          </p>
        </div>

        {/* Timezone and Autopilot Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Timezone selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-200">
            <Globe className="w-3.5 h-3.5 text-[#0066FF]" />
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer font-medium"
            >
              <option value="IST (UTC+5:30)" className="bg-slate-900 text-white">IST (UTC+5:30)</option>
              <option value="EST (UTC-5)" className="bg-slate-900 text-white">EST (UTC-5)</option>
              <option value="PST (UTC-8)" className="bg-slate-900 text-white">PST (UTC-8)</option>
              <option value="UTC" className="bg-slate-900 text-white">UTC (GMT)</option>
            </select>
          </div>

          {/* Autopilot vs Mobile Bot Approval Toggle */}
          <div className="p-1 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center text-xs">
            <button
              type="button"
              onClick={() => setApprovalMode("bot-approval")}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold cursor-pointer ${
                approvalMode === "bot-approval"
                  ? "bg-[#0066FF] text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Mobile Bot Mode
            </button>
            <button
              type="button"
              onClick={() => setApprovalMode("full-autopilot")}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold cursor-pointer ${
                approvalMode === "full-autopilot"
                  ? "bg-[#0066FF] text-white shadow-md"
                  : "text-slate-400 hover:text-white"
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
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-[#0066FF]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">
                    @SharkoStudioBot
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 font-medium">
                    ● Connected to @creator_clips
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400 tabular-nums">
                12:42 PM
              </span>
            </div>

            {/* Simulated Chat Message Bubble */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-300 font-semibold tracking-wider">NEW VIRAL CLIP READY</span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold tabular-nums">
                  SCORE: {approvalBot.score}
                </span>
              </div>

              <div className="text-sm font-bold text-white leading-snug font-sans">
                "{approvalBot.clipTitle}"
              </div>

              {/* 10-Second Clip Preview Thumbnail */}
              <div className="relative aspect-video w-full rounded-xl bg-slate-900 overflow-hidden border border-slate-700/60 group">
                <img
                  src={approvalBot.thumbnail}
                  alt={approvalBot.clipTitle}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm text-[10px] font-mono text-white tabular-nums flex items-center gap-1.5 border border-white/10">
                  <Clock className="w-3 h-3 text-[#0066FF]" />
                  <span>Preview: {approvalBot.clipDuration}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Scheduled to post to <strong className="text-white">TikTok</strong> and <strong className="text-white">YouTube Shorts</strong> at 02:45 PM. What would you like to do?
              </p>

              {/* Interactive Bot Response Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleApprovePost}
                  disabled={approvalBot.status === "approved" || isSubmittingApproval}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    approvalBot.status === "approved"
                      ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 cursor-default"
                      : "bg-[#0066FF] hover:bg-[#0052CC] text-white disabled:opacity-75"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>
                    {isSubmittingApproval && "Syncing..."}
                    {!isSubmittingApproval && approvalBot.status === "approved" && "Queued"}
                    {!isSubmittingApproval && approvalBot.status !== "approved" && "Approve & Queue"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleRegenerateHook}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate Hook</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Anti-Spam Throttling: ON</span>
            </span>
            <span className="text-emerald-400 font-semibold">1-Click Mobile Bot Active</span>
          </div>
        </div>

        {/* Right Column: Weekly Multi-Profile Calendar Grid */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
            {/* Connected Platform Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {platforms.map((p) => {
                const Icon = p.icon;
                const isSelected = activePlatformFilter === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePlatformFilter(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-[#0066FF] text-white border-[#0066FF] shadow-sm"
                        : "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{p.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Auto-Fill Best Times CTA */}
            <button
              type="button"
              onClick={handleAutoFillTimes}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Auto-Fill Times</span>
            </button>
          </div>

          {/* 7-Day Calendar Grid: Horizontally Scrollable on Mobile */}
          <div className="overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
            <div className="min-w-[560px] grid grid-cols-7 gap-2">
            {days.map((day) => {
              const dayEvents = events.filter((e) => e.day === day);
              const isToday = day === "Mon";

              return (
                <div
                  key={day}
                  className={`rounded-xl p-2.5 min-h-[230px] flex flex-col justify-between border ${
                    isToday
                      ? "bg-slate-950 border-[#0066FF]/60 shadow-[0_0_15px_rgba(0,102,255,0.15)]"
                      : "bg-slate-950/80 border-slate-800"
                  }`}
                >
                  <div className="text-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white">{day}</span>
                    {isToday && (
                      <span className="block text-[9.5px] font-mono text-[#0066FF] font-extrabold tracking-wide mt-0.5">
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* Scheduled Slots */}
                  <div className="space-y-1.5 py-2 flex-1">
                    {dayEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px] space-y-1 hover:border-[#0066FF]/60 transition-all cursor-pointer group"
                        title={evt.clipTitle}
                      >
                        <div className="flex items-center justify-between font-mono text-slate-400 tabular-nums">
                          <span className="font-semibold text-slate-300">{evt.time.split(" ")[0]}</span>
                          {evt.status === "posted" ? (
                            <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                          )}
                        </div>
                        <div className="font-medium text-white truncate text-[10.5px] leading-tight group-hover:text-[#0066FF] transition-colors">
                          {evt.clipTitle}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] font-mono text-center text-slate-400 pt-1 border-t border-slate-800/60">
                    {dayEvents.length} clips
                  </div>
                </div>
              );
            })}
            </div>
          </div>
          <div className="flex sm:hidden items-center justify-center text-[10px] font-mono text-slate-400 pt-1">
            <span>← Swipe 7-day schedule horizontally →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
