import React from 'react';

interface SharkoBrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const SharkoBrandLogo: React.FC<SharkoBrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const subSizes = {
    sm: 'text-[9.5px]',
    md: 'text-[11px]',
    lg: 'text-[13px]',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Blue Shark-Fin Play Icon */}
      <div className={`relative shrink-0 flex items-center justify-center ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,102,255,0.35)]"
        >
          <defs>
            <linearGradient id="sharkFinBlueGrad" x1="4" y1="4" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2B95FF" />
              <stop offset="100%" stopColor="#005CE6" />
            </linearGradient>
          </defs>
          {/* Play triangle with shark-fin bite silhouette */}
          <path
            d="M8 8.2C8 6.1 10.4 4.8 12.2 6.0L37.5 21.0C39.2 22.0 39.2 24.5 37.5 25.5L12.2 40.5C10.4 41.7 8 40.4 8 38.3C10.2 33.5 13.5 28.5 12 23.5C10.5 18.5 8.2 13 8 8.2Z"
            fill="url(#sharkFinBlueGrad)"
          />
          {/* Subtle glossy inner highlight */}
          <path
            d="M12 9L34 22L13 35C14.5 30 15 25 13.5 22C12.2 19.5 11.5 14 12 9Z"
            fill="#FFFFFF"
            fillOpacity="0.22"
          />
        </svg>
      </div>

      {/* Brand Wordmark & Subtitle */}
      <div className="flex flex-col leading-none text-left">
        <span className={`font-display font-extrabold tracking-tight text-[#0B0F19] ${titleSizes[size]}`}>
          Sharko
        </span>
        {showSubtitle && (
          <span className={`font-sans font-medium text-[#64748B] mt-0.5 tracking-normal ${subSizes[size]}`}>
            Hunt the Moment
          </span>
        )}
      </div>
    </div>
  );
};

export const SharkoLogo = SharkoBrandLogo;

export const MarkerUnderline: React.FC<{
  color?: 'pink' | 'blue';
  showSparks?: boolean;
  showBothSparks?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ color = 'pink', showSparks = false, showBothSparks = false, children, className = '' }) => {
  const strokeColor = color === 'pink' ? '#FF1464' : '#0066FF';
  return (
    <span className={`relative inline-block ${className}`}>
      {showBothSparks && (
        <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-[#0066FF] pointer-events-none select-none animate-spark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="16" y1="8" x2="6" y2="6" />
            <line x1="18" y1="12" x2="4" y2="12" />
            <line x1="16" y1="16" x2="6" y2="18" />
          </svg>
        </span>
      )}
      <span className="relative z-10">{children}</span>
      {/* Hand-drawn marker underline SVG with self-drawing stroke animation */}
      <svg
        className="absolute -bottom-1.5 left-0 w-full h-[12px] sm:h-[15px] pointer-events-none overflow-visible"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 9C25 4 65 3.5 98 7.5C75 11 35 12 5 11"
          stroke={strokeColor}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw-marker"
        />
      </svg>
      {showSparks && (
        <span className="absolute -top-3.5 -right-6 text-[#FF1464] pointer-events-none select-none animate-spark">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="8" y1="16" x2="18" y2="6" />
            <line x1="12" y1="20" x2="20" y2="12" />
            <line x1="6" y1="14" x2="16" y2="4" />
          </svg>
        </span>
      )}
      {showBothSparks && (
        <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-[#0066FF] pointer-events-none select-none animate-spark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="8" y1="8" x2="18" y2="6" />
            <line x1="6" y1="12" x2="20" y2="12" />
            <line x1="8" y1="16" x2="18" y2="18" />
          </svg>
        </span>
      )}
    </span>
  );
};
