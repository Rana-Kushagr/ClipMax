"use client";

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
import { MobileApprovalBot } from "@/types/studio";
import { SCHEDULE_EVENTS, MOCK_APPROVAL_BOT } from "@/lib/constants";

export function SocialCalendarApproval() {
  const events = SCHEDULE_EVENTS;
  const [approvalBot, setApprovalBot] = useState<MobileApprovalBot>(MOCK_APPROVAL_BOT);
  const [approvalMode, setApprovalMode] = useState<"bot-approval" | "full-autopilot">("bot-approval");
  const [selectedTimezone, setSelectedTimezone] = useState("IST (UTC+5:30)");
  const [activePlatformFilter, setActivePlatformFilter] = useState<string>("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

  const platforms = [
    { id: "all", name: "All Networks", icon: Globe },
    { id: "tiktok", name: "TikTok", icon: Music },
    { id: "youtube", name: "YouTube", icon: Video },
    { id: "instagram", name: "Reels", icon: Camera },
    { id: "x", name: "X / Twitter", icon: Zap },
  ];

  const handleApprovePost = () => {
    setApprovalBot((prev) => ({ ...prev, status: "approved" }));
    setToastMessage("Approved. Published to TikTok & YouTube Shorts with verified OAuth token.");
    setTimeout(() => setToastMessage(null), 4000);
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
        <div className="p-3 rounded-lg bg-surface-elevated hairline-border border-white/20 text-white font-medium text-xs flex items-center justify-between shadow-xl transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald" />
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
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 hairline-b">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-white" />
            <h3 className="font-display font-semibold text-lg text-text-primary">
              Autonomous Social Calendar & Mobile Approval
            </h3>
            <span className="px-2 py-0.5 rounded bg-surface-subtle text-text-secondary hairline-border text-xs font-mono">
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
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface-subtle hairline-border text-xs font-mono text-text-secondary">
            <Globe className="w-3.5 h-3.5 text-text-muted" />
            <select
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="bg-transparent text-text-primary focus:outline-none cursor-pointer"
            >
              <option value="IST (UTC+5:30)" className="bg-surface">IST (UTC+5:30)</option>
              <option value="EST (UTC-5)" className="bg-surface">EST (UTC-5)</option>
              <option value="PST (UTC-8)" className="bg-surface">PST (UTC-8)</option>
              <option value="UTC" className="bg-surface">UTC (GMT)</option>
            </select>
          </div>

          {/* Autopilot vs Mobile Bot Approval Toggle */}
          <div className="p-0.5 rounded-md bg-surface-subtle hairline-border flex items-center text-xs">
            <button
              type="button"
              onClick={() => setApprovalMode("bot-approval")}
              className={`px-3 py-1 rounded transition-all font-medium ${
                approvalMode === "bot-approval"
                  ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
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
                  ? "bg-surface-elevated text-white font-semibold hairline-border shadow-sm"
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
        <div className="lg:col-span-5 rounded-xl bg-surface-subtle hairline-border p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 hairline-b">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-surface hairline-border flex items-center justify-center text-text-secondary">
                  <Smartphone className="w-4 h-4 text-emerald" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white leading-tight">
                    ClipMax Telegram Bot
                  </div>
                  <div className="text-[10px] font-mono text-emerald">
                    ● Connected to @creator_clips
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-text-muted tabular-nums">
                12:42 PM
              </span>
            </div>

            {/* Simulated Chat Message Bubble */}
            <div className="mt-4 p-3.5 rounded-lg bg-surface hairline-border space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>NEW VIRAL CLIP READY</span>
                <span className="px-1.5 py-0.5 rounded bg-white/10 text-emerald font-semibold tabular-nums">
                  SCORE: {approvalBot.score}
                </span>
              </div>

              <div className="text-xs font-semibold text-white leading-snug font-sans">
                "{approvalBot.clipTitle}"
              </div>

              {/* 10-Second Clip Preview Thumbnail */}
              <div className="relative aspect-video w-full rounded-md bg-canvas-deep overflow-hidden hairline-border">
                <img
                  src={approvalBot.thumbnail}
                  alt={approvalBot.clipTitle}
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm hairline-border flex items-center justify-center text-white">
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
                  disabled={approvalBot.status === "approved"}
                  className={`py-2 px-3 rounded-md font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
                    approvalBot.status === "approved"
                      ? "bg-emerald/20 text-emerald hairline-border cursor-default"
                      : "bg-primary hover:bg-white text-primary-obsidian"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{approvalBot.status === "approved" ? "Published" : "Approve & Post"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRegenerateHook}
                  className="py-2 px-3 rounded-md bg-surface-elevated hover:bg-white/10 hairline-border text-text-secondary hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate Hook</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 hairline-t flex items-center justify-between text-[11px] font-mono text-text-muted">
            <span>Anti-Spam Throttling: ON</span>
            <span className="text-emerald">1-Click Approval Active</span>
          </div>
        </div>

        {/* Right Column: Weekly Multi-Profile Calendar Grid */}
        <div className="lg:col-span-7 rounded-xl bg-surface-subtle hairline-border p-5 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 hairline-b">
            {/* Connected Platform Filters */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {platforms.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePlatformFilter(p.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium hairline-border transition-colors flex items-center gap-1.5 ${
                      activePlatformFilter === p.id
                        ? "bg-surface-elevated text-white border-white/40"
                        : "bg-surface text-text-muted hover:text-white"
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
              className="px-3 py-1.5 rounded-md bg-surface hover:bg-surface-elevated text-text-primary hairline-border text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Auto-Fill Times</span>
            </button>
          </div>

          {/* 7-Day Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((day) => {
              const dayEvents = events.filter((e) => e.day === day);
              const isToday = day === "Mon";

              return (
                <div
                  key={day}
                  className={`rounded-lg p-2 min-h-[220px] flex flex-col justify-between hairline-border ${
                    isToday
                      ? "bg-surface border-white/30"
                      : "bg-surface/50"
                  }`}
                >
                  <div className="text-center pb-1 border-b border-white/[0.05]">
                    <span className="text-xs font-semibold text-white">{day}</span>
                    {isToday && (
                      <span className="block text-[9px] font-mono text-emerald font-semibold">
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* Scheduled Slots */}
                  <div className="space-y-1.5 py-2 flex-1">
                    {dayEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-1.5 rounded bg-surface-subtle hairline-border text-[10px] space-y-1 hover:border-white/30 transition-colors cursor-pointer"
                        title={evt.clipTitle}
                      >
                        <div className="flex items-center justify-between font-mono text-text-muted tabular-nums">
                          <span>{evt.time.split(" ")[0]}</span>
                          {evt.status === "posted" ? (
                            <Check className="w-2.5 h-2.5 text-emerald stroke-[3]" />
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
      </div>
    </div>
  );
}
