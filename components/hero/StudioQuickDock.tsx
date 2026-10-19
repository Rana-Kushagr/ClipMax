"use client";

import React from "react";
import {
  Scissors,
  Subtitles,
  Columns,
  Sparkles,
  Smartphone,
  Calendar,
  DollarSign,
} from "lucide-react";

interface StudioQuickDockProps {
  activeTool: string;
  setActiveTool: (toolId: string) => void;
  onToolSelect?: (toolId: string) => void;
}

export function StudioQuickDock({
  activeTool,
  setActiveTool,
  onToolSelect,
}: StudioQuickDockProps) {
  const tools = [
    {
      id: "long-to-shorts",
      name: "Long to Shorts",
      icon: Scissors,
      badge: "AI Viral",
      targetId: "playgrounds",
    },
    {
      id: "ai-captions",
      name: "Kinetic Captions",
      icon: Subtitles,
      badge: "5 Presets",
      targetId: "playgrounds",
    },
    {
      id: "split-screen",
      name: "Smart Reframe",
      icon: Columns,
      badge: "2-Speaker",
      targetId: "playgrounds",
    },
    {
      id: "prompt-finder",
      name: "Prompt Moment Finder",
      icon: Sparkles,
      badge: "NL Query",
      targetId: "studio-command",
    },
    {
      id: "mobile-bot",
      name: "Mobile Bot Approval",
      icon: Smartphone,
      badge: "1-Click Post",
      targetId: "playgrounds",
    },
    {
      id: "social-scheduler",
      name: "Social Scheduler",
      icon: Calendar,
      badge: "Auto Pilot",
      targetId: "playgrounds",
    },
    {
      id: "cash-bounties",
      name: "Cash Bounties",
      icon: DollarSign,
      badge: "$100+ Pools",
      targetId: "bounties",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-2 select-none" aria-label="Studio Quick Dock">
      <div className="p-1.5 rounded-2xl bg-surface/90 border border-border backdrop-blur-md shadow-2xl flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => {
                setActiveTool(tool.id);
                if (onToolSelect) onToolSelect(tool.id);
                const elem = document.getElementById(tool.targetId);
                if (elem) elem.scrollIntoView({ behavior: "smooth" });
              }}
              className={`flex-1 min-w-[90px] sm:min-w-0 flex flex-col items-center py-2 px-1.5 rounded-xl transition-all relative group ${
                isActive
                  ? "bg-surface-strong text-white border border-border-strong shadow-md"
                  : "text-slate-400 hover:text-slate-200 hover:bg-surface-subtle"
              }`}
              aria-label={`${tool.name} tool`}
              aria-pressed={isActive}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors mb-1 ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "bg-surface-subtle group-hover:bg-surface-strong text-slate-400 group-hover:text-primary"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-medium leading-tight text-center line-clamp-1">
                {tool.name}
              </span>
              <span
                className={`text-[9px] font-mono mt-0.5 px-1 py-0.2 rounded ${
                  isActive
                    ? "bg-primary/20 text-primary font-bold"
                    : "text-slate-500 bg-white/[0.03]"
                }`}
              >
                {tool.badge}
              </span>

              {/* Active Glow Line */}
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full shadow-[0_0_8px_rgba(0,229,153,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
