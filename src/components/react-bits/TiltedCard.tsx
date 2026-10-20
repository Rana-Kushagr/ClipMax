import React, { useRef, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxAngle?: number;
  scale?: number;
  glareOpacity?: number;
}

export function TiltedCard({
  children,
  className = "",
  maxAngle = 9,
  scale = 1.02,
  glareOpacity = 0.18,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { stiffness: 280, damping: 25 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const cardScale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxAngle;
    const rotY = ((x - centerX) / centerX) * maxAngle;

    rotateX.set(rotX);
    rotateY.set(rotY);
    cardScale.set(scale);

    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: glareOpacity,
    });
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    rotateX.set(0);
    rotateY.set(0);
    cardScale.set(1);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      style={{ perspective: "950px" }}
      className={`relative ${className}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: cardScale,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-xl overflow-hidden"
      >
        {children}

        {/* Specular glare reflection */}
        {!shouldReduceMotion && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 z-30"
            style={{
              opacity: glarePosition.opacity,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
