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
import { Dock, DockIcon } from "../ui/dock";

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
      targetId: "studio",
    },
    {
      id: "kinetic-captions",
      name: "Kinetic Captions",
      icon: Subtitles,
      targetId: "studio",
    },
    {
      id: "auto-broll",
      name: "Auto B-Roll",
      icon: Layers,
      targetId: "studio",
    },
    {
      id: "hook-predictor",
      name: "Hook Predictor",
      icon: TrendingUp,
      targetId: "studio",
    },
    {
      id: "clean-audio",
      name: "Clean Audio",
      icon: Volume2,
      targetId: "studio",
    },
    {
      id: "silence-cut",
      name: "Silence Cut",
      icon: Scissors,
      targetId: "studio",
    },
    {
      id: "multi-post",
      name: "Multi-Post",
      icon: Share2,
      targetId: "studio",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-1 sm:px-2 select-none" aria-label="Studio Quick Dock">
      <div className="flex flex-col items-center gap-2 w-full overflow-x-auto scrollbar-none py-1">
        <Dock
          magnification={58}
          distance={120}
          className="bg-[#1E1710] border-[#F3E5AB]/15 shadow-2xl h-14 sm:h-16 px-2 sm:px-4"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;

            return (
              <DockIcon
                key={tool.id}
                title={tool.name}
                onClick={() => {
                  setActiveTool(tool.id);
                  if (onToolSelect) onToolSelect(tool.id);
                  const elem = document.getElementById(tool.targetId);
                  if (elem) elem.scrollIntoView({ behavior: "smooth" });
                }}
                className={`transition-all duration-200 relative group ${
                  isActive
                    ? "bg-[#F3E5AB] text-[#17120C] shadow-lg shadow-[#D99B52]/20 ring-2 ring-[#F3E5AB]/30"
                    : "bg-[#2A2016]/80 text-[#D99B52] hover:text-[#F3E5AB] hover:bg-[#382B1E]/90 border border-[#F3E5AB]/10"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[1.8]" />
                {/* Floating tooltip */}
                <span className="absolute -top-8 px-2 py-0.5 rounded bg-[#17120C] border border-[#F3E5AB]/20 text-[10px] font-mono text-[#F3E5AB] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                  {tool.name}
                </span>
              </DockIcon>
            );
          })}
        </Dock>
        <span className="text-[11px] font-mono text-[#F3E5AB]/60 uppercase tracking-widest mt-1">
          7-Module Cinema Precision Dock
        </span>
      </div>
    </div>
  );
}
