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
    { id: "all", name: "All Platforms", icon: "🌐" },
    { id: "tiktok", name: "TikTok", icon: "🎵" },
    { id: "youtube", name: "YouTube Shorts", icon: "▶️" },
    { id: "instagram", name: "IG Reels", icon: "📸" },
    { id: "x", name: "X / Twitter", icon: "𝕏" },
  ];

  const handleApprovePost = () => {
    setApprovalBot((prev) => ({ ...prev, status: "approved" }));
    setToastMessage("✓ Approved! Published to TikTok & YouTube Shorts with verified OAuth 2.0 token.");
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRegenerateHook = () => {
    setApprovalBot((prev) => ({
      ...prev,
      status: "regenerated",
      clipTitle: "Why 99% of Solopreneurs Are Working Too Hard in 2026",
      score: 97,
    }));
    setToastMessage("↻ Hook regenerated: 'Why 99% of Solopreneurs Are Working Too Hard in 2026' (Virality: 97). New preview generated.");
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAutoFillTimes = () => {
    setToastMessage("⚡ Auto-Filled! Calculated peak creator audience engagement times across IST & US view clusters.");
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 select-none" aria-label="Social Scheduler and Mobile Approval">
      {/* Toast Alert Feedback */}
      {toastMessage && (
        <div className="p-3 rounded-xl bg-accent text-slate-950 font-bold text-xs flex items-center justify-between shadow-xl animate-bounce">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 fill-slate-950 text-accent" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-900 hover:text-black font-mono text-xs px-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Profile & Scheduler Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-display font-extrabold text-xl text-text-primary">
              Autonomous Social Calendar & Mobile Approval
            </h3>
            <span className="px-2 py-0.5 rounded-md bg-accent-subtle text-accent border border-accent/20 text-xs font-mono font-bold">
              EasySlice Killer
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Never post blindly. Receive a 10-second mobile push preview before your scheduled shorts hit social feeds.
          </p>
        </div>

        {/* Timezone and Autopilot Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timezone selector */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-subtle border border-border text-xs font-mono text-text-secondary">
            <Globe className="w-3.5 h-3.5 text-primary" />
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
          <div className="p-1 rounded-pill bg-surface-subtle border border-border flex items-center text-xs">
            <button
              type="button"
              onClick={() => setApprovalMode("bot-approval")}
              className={`px-3 py-1 rounded-pill font-medium transition-all ${
                approvalMode === "bot-approval"
                  ? "bg-accent text-slate-950 font-bold shadow-sm"
                  : "text-text-muted hover:text-white"
              }`}
            >
              📱 1-Click Mobile Bot
            </button>
            <button
              type="button"
              onClick={() => setApprovalMode("full-autopilot")}
              className={`px-3 py-1 rounded-pill font-medium transition-all ${
                approvalMode === "full-autopilot"
                  ? "bg-primary text-white font-bold shadow-sm"
                  : "text-text-muted hover:text-white"
              }`}
            >
              ⚡ Full Autopilot
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Mobile Bot Preview + Right Weekly Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Telegram / WhatsApp Bot Approval Card (EasySlice Killer) */}
        <div className="lg:col-span-5 rounded-2xl bg-surface border border-border p-5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">
                    ClipMax Telegram Bot
                  </div>
                  <div className="text-[10px] font-mono text-accent">
                    ● Connected to @creator_clips
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-text-muted">
                12:42 PM
              </span>
            </div>

            {/* Simulated Chat Message Bubble */}
            <div className="mt-4 p-3.5 rounded-2xl bg-surface-subtle border border-border-strong space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>NEW VIRAL CLIP READY</span>
                <span className="px-1.5 py-0.5 rounded bg-accent/20 text-accent font-bold">
                  SCORE: {approvalBot.score}
                </span>
              </div>

              <div className="text-xs font-bold text-white leading-snug">
                "{approvalBot.clipTitle}"
              </div>

              {/* 10-Second Clip Preview Thumbnail */}
              <div className="relative aspect-video w-full rounded-xl bg-canvas-deep overflow-hidden border border-white/[0.06]">
                <img
                  src={approvalBot.thumbnail}
                  alt={approvalBot.clipTitle}
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                    ▶
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white">
                  Preview: {approvalBot.clipDuration}
                </div>
              </div>

              <p className="text-[11px] text-text-secondary leading-relaxed">
                Scheduled to post to <strong>TikTok</strong> and <strong>YouTube Shorts</strong> at 02:45 PM. What would you like to do?
              </p>

              {/* Interactive Bot Response Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleApprovePost}
                  disabled={approvalBot.status === "approved"}
                  className={`py-2 px-3 rounded-xl font-display font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 ${
                    approvalBot.status === "approved"
                      ? "bg-accent/20 text-accent border border-accent/40 cursor-default"
                      : "bg-accent hover:bg-accent-hover text-slate-950"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{approvalBot.status === "approved" ? "Published ✓" : "Approve & Post"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRegenerateHook}
                  className="py-2 px-3 rounded-xl bg-surface-strong hover:bg-surface border border-border text-text-secondary hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate Hook</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] font-mono text-text-muted">
            <span>Anti-Spam Throttling: ON</span>
            <span className="text-primary">1-Click Approval Active</span>
          </div>
        </div>

        {/* Right Column: Weekly Multi-Profile Calendar Grid */}
        <div className="lg:col-span-7 rounded-2xl bg-surface border border-border p-5 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
            {/* Connected Platform Filters */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePlatformFilter(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                    activePlatformFilter === p.id
                      ? "bg-surface-strong text-white border-primary"
                      : "bg-surface-subtle text-text-muted border-border hover:text-white"
                  }`}
                >
                  <span>{p.icon}</span>
                  <span className="hidden sm:inline">{p.name}</span>
                </button>
              ))}
            </div>

            {/* Auto-Fill Best Times CTA */}
            <button
              type="button"
              onClick={handleAutoFillTimes}
              className="px-3 py-1.5 rounded-lg bg-primary-subtle text-primary hover:bg-primary hover:text-white border border-primary/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto-Fill Best Times</span>
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
                  className={`rounded-xl p-2 min-h-[220px] flex flex-col justify-between border ${
                    isToday
                      ? "bg-surface-subtle/90 border-primary/40 ring-1 ring-primary/20"
                      : "bg-surface-subtle/40 border-border"
                  }`}
                >
                  <div className="text-center pb-1 border-b border-border/50">
                    <span className="text-xs font-bold text-white">{day}</span>
                    {isToday && (
                      <span className="block text-[9px] font-mono text-primary font-semibold">
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* Scheduled Slots */}
                  <div className="space-y-1.5 py-2 flex-1">
                    {dayEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-1.5 rounded-lg bg-surface border border-border text-[10px] space-y-1 hover:border-primary transition-colors cursor-pointer"
                        title={evt.clipTitle}
                      >
                        <div className="flex items-center justify-between font-mono text-text-muted">
                          <span>{evt.time.split(" ")[0]}</span>
                          <span
                            className={`font-bold ${
                              evt.status === "posted"
                                ? "text-accent"
                                : "text-primary"
                            }`}
                          >
                            {evt.status === "posted" ? "✓" : "●"}
                          </span>
                        </div>
                        <div className="font-semibold text-white truncate text-[10px]">
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
