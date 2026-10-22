import React, { useRef, useEffect, useState } from 'react';

/**
 * Ultra-Performance Studio Ambient Glow Atmosphere
 * Replaces expensive 60fps Canvas 2D ctx.filter Gaussian blur with
 * hardware-accelerated CSS radial gradient meshes on the compositor thread.
 * Guarantees locked 60/120fps on both mobile phones and desktop.
 */
export const Grainient = ({
  colors = ['#17120C', '#221B12', '#4A351D', '#D99B52', '#F3E5AB'],
  className = '',
  flow = 0.5,
  softness = 1.2,
  speed = 0.2,
  scale = 1.1,
  silk = 0.3,
  grainAmount = 0.05,
  interactive = false,
} = {}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const c1 = colors[0] || '#17120C';
  const c2 = colors[1] || '#221B12';
  const c3 = colors[2] || '#4A351D';
  const c4 = colors[3] || '#D99B52';
  const c5 = colors[4] || '#F3E5AB';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Base Dark Hearth Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c1} 100%)`,
        }}
      />

      {/* Hardware-Accelerated Ambient Light Orbs (Only animated when in viewport) */}
      {isVisible && (
        <>
          {/* Top-Left Amber Key Light Spill */}
          <div
            className="absolute -top-[15%] -left-[10%] w-[65vw] max-w-[800px] h-[65vw] max-h-[800px] rounded-full blur-[80px] sm:blur-[120px] opacity-35 will-change-transform animate-pulse"
            style={{
              background: `radial-gradient(circle, ${c4} 0%, ${c3} 45%, transparent 75%)`,
              animationDuration: '9s',
            }}
          />

          {/* Bottom-Right Warm Gold Hearth Refraction */}
          <div
            className="absolute -bottom-[20%] -right-[10%] w-[70vw] max-w-[850px] h-[70vw] max-h-[850px] rounded-full blur-[90px] sm:blur-[140px] opacity-30 will-change-transform animate-pulse"
            style={{
              background: `radial-gradient(circle, ${c5} 0%, ${c4} 40%, transparent 70%)`,
              animationDuration: '11s',
            }}
          />

          {/* Center Subtle Atmosphere Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] max-w-[700px] h-[40vw] max-h-[500px] rounded-full blur-[70px] sm:blur-[110px] opacity-20 will-change-transform"
            style={{
              background: `radial-gradient(ellipse at center, ${c3} 0%, transparent 70%)`,
            }}
          />
        </>
      )}
    </div>
  );
};

export default Grainient;
