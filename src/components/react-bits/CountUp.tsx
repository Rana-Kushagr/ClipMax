import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({
  to,
  from = 0,
  duration = 0.8,
  prefix = "",
  suffix = "",
  decimals = 2,
  className = "",
}: Readonly<CountUpProps>) {
  const [current, setCurrent] = useState(from);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrent(to);
      return;
    }

    const start = performance.now();
    const startVal = current;
    const diff = to - startVal;

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = (now - start) / (duration * 1000);
      if (elapsed >= 1) {
        setCurrent(to);
      } else {
        // Ease out expo
        const ease = 1 - Math.pow(2, -10 * elapsed);
        setCurrent(startVal + diff * ease);
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [to, duration, shouldReduceMotion]);

  const formatted = current.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
