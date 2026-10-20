import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  italicWord?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  delay?: number;
  stagger?: number;
}

export function BlurText({
  text,
  className = "",
  italicWord,
  as: Component = "span",
  delay = 0,
  stagger = 0.04,
}: Readonly<BlurTextProps>) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
      filter: shouldReduceMotion ? "none" : "blur(12px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 22,
        stiffness: 140,
      },
    },
  };

  return (
    <Component className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="inline-block"
      >
        {words.map((word, index) => {
          const isItalic = italicWord && word.toLowerCase().includes(italicWord.toLowerCase());
          return (
            <motion.span
              key={`${word}-${index}`}
              variants={wordVariants}
              className={`inline-block mr-[0.25em] ${
                isItalic
                  ? "font-editorial italic font-normal text-white drop-shadow-[0_0_24px_rgba(224,109,59,0.35)]"
                  : ""
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.span>
    </Component>
  );
}
