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
  speed = 50,
  maxIterations = 10,
  className = "",
  characters = "0123456789ABCDEF!@#$%&*",
}: Readonly<DecryptedTextProps>) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const iterationRef = useRef(0);

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
      setDisplayText(text);
      return;
    }

    iterationRef.current = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || index < iterationRef.current) {
              return text[index];
            }
            const randIndex = Math.floor(getSafeRandom() * characters.length);
            return characters[randIndex];
          })
          .join("")
      );

      if (iterationRef.current >= text.length) {
        clearInterval(interval);
      }

      iterationRef.current += 1 / (maxIterations / text.length || 1);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, characters, isHovering, shouldReduceMotion]);

  return (
    <span
      className={`font-mono inline-block ${className}`}
      onMouseEnter={() => setIsHovering(!isHovering)}
    >
      {displayText}
    </span>
  );
}
