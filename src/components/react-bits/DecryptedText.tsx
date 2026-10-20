import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  animateOnView?: boolean;
}

const DEFAULT_CHARS = "0123456789ABCDEF%$#@*";

export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  characters = DEFAULT_CHARS,
  className = "",
  animateOnView = true,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const triggerScramble = () => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "-" || char === ":" || char === "/") return char;
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      iteration += 1 / (maxIterations / text.length || 1);
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, speed);
  };

  useEffect(() => {
    if (!animateOnView) {
      triggerScramble();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerScramble();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [text]);

  return (
    <span
      ref={containerRef}
      onMouseEnter={() => {
        if (!isHovered) {
          setIsHovered(true);
          triggerScramble();
        }
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`font-mono tabular-nums ${className}`}
    >
      {displayText}
    </span>
  );
}
