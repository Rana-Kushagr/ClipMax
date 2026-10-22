import React from 'react';

export const SharkoLogo: React.FC<{ className?: string; showTagline?: boolean }> = ({
  className = 'h-10',
  showTagline = true,
}) => (
  <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
    {/* Geometric Shark + Play-Button Fin Icon */}
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#030914] border border-[#89CFF0]/25 shadow-[0_0_20px_rgba(0,71,171,0.3)] group-hover:border-[#89CFF0] transition-colors duration-200">
      <svg
        viewBox="0 0 120 120"
        className="h-8 w-8 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sharko Logo"
      >
        <title>Sharko Logo</title>
        <defs>
          <linearGradient id="sharkoBodyGrad" x1="15" y1="15" x2="105" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="48%" stopColor="#89CFF0" />
            <stop offset="100%" stopColor="#0047AB" />
          </linearGradient>
          <linearGradient id="sharkoFaceGrad" x1="55" y1="35" x2="105" y2="75" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#89CFF0" />
          </linearGradient>
          <linearGradient id="sharkoPlayFinGrad" x1="40" y1="52" x2="82" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#89CFF0" />
            <stop offset="65%" stopColor="#0047AB" />
            <stop offset="100%" stopColor="#757500" />
          </linearGradient>
        </defs>
        {/* Dorsal Fin + Upper Shark Body + Tail */}
        <path
          d="M42 16C40 16 39 18 40 21C43 29 45 36 42 41C34 47 22 55 20 66C18 75 26 83 34 89C37 74 41 56 48 49C55 43 66 49 76 56C91 49 102 42 106 37C107 35 105 33 101 32C86 28 69 28 58 31C53 23 47 17 42 16Z"
          fill="url(#sharkoBodyGrad)"
          stroke="#89CFF0"
          strokeOpacity="0.8"
          strokeWidth="1.5"
        />
        {/* Sunlit Sand Shark Face & Eye */}
        <path
          d="M58 43C71 36 89 35 105 36C101 51 89 65 76 66C71 66 64 59 54 51C55 48 56 45 58 43Z"
          fill="url(#sharkoFaceGrad)"
          stroke="#89CFF0"
          strokeOpacity="0.7"
          strokeWidth="1.2"
        />
        <circle cx="81" cy="49" r="4.8" fill="#000B1D" />
        {/* Lower Play-Button Triangle Fin */}
        <path
          d="M49 56C51 50 57 49 62 53L81 67C86 71 85 78 79 81L50 98C44 101 38 97 39 90L49 56Z"
          fill="url(#sharkoPlayFinGrad)"
          stroke="#89CFF0"
          strokeOpacity="0.75"
          strokeWidth="1.5"
        />
      </svg>
    </div>

    {/* Wordmark + Tagline */}
    <div className="flex flex-col text-left">
      <span className="font-display text-[19px] font-extrabold leading-none tracking-[-0.03em] text-[#FFFFFF]">
        Sharko
      </span>
      {showTagline && (
        <span className="mt-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[#89CFF0]">
          Hunt the Moments
        </span>
      )}
    </div>
  </div>
);

export default SharkoLogo;
