'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import './BorderGlow.css';

export interface BorderGlowProps {
  children?: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  borderRadius?: number;
  animated?: boolean;
  colors?: string[];
  glowColor?: string;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  edgeSensitivity?: number;
}

export const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  backgroundColor = '#1E1710',
  borderRadius = 22,
  animated = false,
  colors = ['#F3E5AB', '#D99B52', '#10B981'],
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafPendingRef = useRef(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / mobile devices where pointer tracking is irrelevant
    const isTouch =
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    setIsTouchDevice(isTouch);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isTouchDevice || rafPendingRef.current) return;
      rafPendingRef.current = true;
      const clientX = e.clientX;
      const clientY = e.clientY;

      requestAnimationFrame(() => {
        rafPendingRef.current = false;
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const radians = Math.atan2(dy, dx);
        let degrees = radians * (180 / Math.PI) + 90;
        if (degrees < 0) degrees += 360;

        card.style.setProperty('--cursor-angle', `${degrees.toFixed(1)}deg`);
      });
    },
    [isTouchDevice]
  );

  const c1 = colors[0] || '#F3E5AB';
  const c2 = colors[1] || '#D99B52';
  const c3 = colors[2] || '#10B981';

  return (
    <div
      ref={cardRef}
      onPointerMove={isTouchDevice ? undefined : handlePointerMove}
      className={`border-glow-card ${animated ? 'border-glow-animated' : ''} ${className}`}
      style={
        {
          '--card-bg': backgroundColor,
          '--border-radius': `${borderRadius}px`,
          '--c1': c1,
          '--c2': c2,
          '--c3': c3,
        } as React.CSSProperties
      }
    >
      <div className="border-glow-inner h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
