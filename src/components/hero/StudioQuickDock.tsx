import React from "react";
import {
  Crop,
  Subtitles,
  Layers,
  TrendingUp,
  Volume2,
  Scissors,
  Share2,
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
}: Readonly<StudioQuickDockProps>) {
  const tools = [
    {
      id: "ai-reframe",
      name: "AI Reframe",
      icon: Crop,
      targetId: "playgrounds",
    },
    {
      id: "kinetic-captions",
      name: "Kinetic Captions",
      icon: Subtitles,
      targetId: "playgrounds",
    },
    {
      id: "auto-broll",
      name: "Auto B-Roll",
      icon: Layers,
      targetId: "playgrounds",
    },
    {
      id: "hook-predictor",
      name: "Hook Predictor",
      icon: TrendingUp,
      targetId: "playgrounds",
    },
    {
      id: "clean-audio",
      name: "Clean Audio",
      icon: Volume2,
      targetId: "playgrounds",
    },
    {
      id: "silence-cut",
      name: "Silence Cut",
      icon: Scissors,
      targetId: "playgrounds",
    },
    {
      id: "multi-post",
      name: "Multi-Post",
      icon: Share2,
      targetId: "playgrounds",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-2 select-none" aria-label="Studio Quick Dock">
      <div className="p-2.5 rounded-xl bg-[#0E1014] border border-white/[0.08] shadow-2xl flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
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
              className="flex-1 min-w-[76px] flex flex-col items-center gap-1.5 p-1 rounded-lg transition-all group"
              aria-label={`${tool.name} tool`}
              aria-pressed={isActive}
            >
              {/* 52px x 52px circular dock button */}
              <div
                className={`w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all ${
                  isActive
                    ? "bg-white text-black shadow-md ring-2 ring-white/20"
                    : "bg-[#12151B] border border-white/[0.07] group-hover:border-white/30 text-text-secondary group-hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span
                className={`text-[12px] font-medium transition-colors text-center ${
                  isActive ? "text-white font-semibold" : "text-text-muted group-hover:text-white"
                }`}
              >
                {tool.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
