import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  characters?: string;
}

export function DecryptedText({
  text,
  speed = 45,
  maxIterations = 8,
  className = "",
  characters = "0123456789ABCDEF!@#$%",
}: Readonly<DecryptedTextProps>) {
  const originalText = text;
  const [displayText, setDisplayText] = useState(originalText);
  const [isHovering, setIsHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const iterationRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Safe Cryptographic Random Function (SonarCloud S2245 compliant)
  const getSafeRandom = () => {
    if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
      const buffer = new Uint32Array(1);
      window.crypto.getRandomValues(buffer);
      return buffer[0] / 4294967296;
    }
    return 0.5;
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(originalText);
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    iterationRef.current = 0;

    intervalRef.current = setInterval(() => {
      iterationRef.current += 1;

      if (iterationRef.current >= maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setDisplayText(originalText);
        return;
      }

      setDisplayText(
        originalText
          .split("")
          .map((char, index) => {
            if (char === " " || index < iterationRef.current / (maxIterations / originalText.length)) {
              return originalText[index];
            }
            const randIndex = Math.floor(getSafeRandom() * characters.length);
            return characters[randIndex] || char;
          })
          .join("")
      );
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setDisplayText(originalText);
    };
  }, [originalText, speed, maxIterations, characters, isHovering, shouldReduceMotion]);

  return (
    <span
      className={`font-mono inline-block ${className}`}
      onMouseEnter={() => setIsHovering(!isHovering)}
    >
      {displayText}
    </span>
  );
}
