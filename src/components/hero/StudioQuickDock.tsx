import React from "react";
import {
  UploadCloud,
  Scissors,
  Crop,
  Subtitles,
  Calendar,
  Coins,
  Calculator,
} from "lucide-react";
import { Dock, DockIcon } from "../ui/dock";
import { StudioTabId } from "../studio/InteractiveStudioShowcase";

interface StudioQuickDockProps {
  activeTool: string;
  setActiveTool: (toolId: string) => void;
  onSelectStudioTab?: (tab: StudioTabId) => void;
  onFocusIngest?: () => void;
}

export function StudioQuickDock({
  activeTool,
  setActiveTool,
  onSelectStudioTab,
  onFocusIngest,
}: Readonly<StudioQuickDockProps>) {
  const tools = [
    {
      id: "ingest",
      name: "Ingest Stream",
      icon: UploadCloud,
      action: () => {
        const input = document.getElementById("hero-url-input") as HTMLInputElement | null;
        if (input) {
          input.focus();
          input.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          const hero = document.getElementById("hero") || document.getElementById("section-overview");
          if (hero) hero.scrollIntoView({ behavior: "smooth" });
        }
        if (onFocusIngest) onFocusIngest();
      },
    },
    {
      id: "strip",
      name: "Viral 9:16 Strip",
      icon: Scissors,
      action: () => {
        if (onSelectStudioTab) onSelectStudioTab("strip");
        const elem = document.getElementById("studio") || document.getElementById("playgrounds");
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "reframe",
      name: "Smart Reframe",
      icon: Crop,
      action: () => {
        if (onSelectStudioTab) onSelectStudioTab("reframe");
        const elem = document.getElementById("studio") || document.getElementById("playgrounds");
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "captions",
      name: "Kinetic Captions",
      icon: Subtitles,
      action: () => {
        if (onSelectStudioTab) onSelectStudioTab("captions");
        const elem = document.getElementById("studio") || document.getElementById("playgrounds");
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "schedule",
      name: "Schedule & Bot",
      icon: Calendar,
      action: () => {
        if (onSelectStudioTab) onSelectStudioTab("schedule");
        const elem = document.getElementById("studio") || document.getElementById("playgrounds");
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "bounties",
      name: "Bounty Board",
      icon: Coins,
      action: () => {
        const elem = document.getElementById("section-bounties") || document.getElementById("bounties");
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "calculator",
      name: "Profit Calculator",
      icon: Calculator,
      action: () => {
        const elem = document.getElementById("section-calculator") || document.getElementById("simulator");
        if (elem) elem.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  return (
    <div className="w-full max-w-[94vw] sm:max-w-3xl mx-auto px-1 sm:px-2 select-none overflow-x-auto no-scrollbar" aria-label="Studio Quick Dock">
      <div className="flex flex-col items-center gap-2 w-full overflow-x-auto no-scrollbar py-1">
        <Dock
          magnification={58}
          distance={120}
          className="bg-[#000B1D]/95 border-[#89CFF0]/25 shadow-2xl h-14 sm:h-16 px-2 sm:px-4 shrink-0"
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
                  tool.action();
                }}
                className={`transition-all duration-200 relative group flex items-center justify-center shrink-0 min-h-[40px] touch-manipulation ${
                  isActive
                    ? "bg-[#89CFF0] text-[#000000] shadow-lg shadow-[#0047AB]/40 ring-2 ring-[#89CFF0]/60 scale-105"
                    : "bg-[#050D1E] text-zinc-300 hover:text-white hover:bg-[#0047AB]/30 border border-[#89CFF0]/20"
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2]" />
                {/* Floating Tooltip Badge */}
                <span className="absolute -top-9 px-2.5 py-1 rounded-lg bg-[#000000] border border-[#89CFF0]/40 text-[11px] font-mono font-bold text-[#89CFF0] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-30">
                  {tool.name}
                </span>
              </DockIcon>
            );
          })}
        </Dock>
        <span className="text-[11px] font-mono text-[#89CFF0]/70 uppercase tracking-widest mt-1">
          7-Module Precision Dock
        </span>
      </div>
    </div>
  );
}
