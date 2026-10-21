import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  italicWord?: string;
  italicWords?: string[];
  as?: "h1" | "h2" | "h3" | "span" | "div";
  delay?: number;
  stagger?: number;
}

export function BlurText({
  text,
  className = "",
  italicWord,
  italicWords,
  as: Component = "span",
  delay = 0,
  stagger = 0.04,
}: Readonly<BlurTextProps>) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  const checkIsItalic = (word: string) => {
    const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (italicWord && cleanWord.includes(italicWord.toLowerCase().replace(/[^a-z0-9]/g, ""))) {
      return true;
    }
    if (italicWords && italicWords.some((w) => cleanWord.includes(w.toLowerCase().replace(/[^a-z0-9]/g, "")))) {
      return true;
    }
    return false;
  };

  return (
    <Component className={className}>
      <span className="inline">
        {words.map((word, index) => {
          const isItalic = checkIsItalic(word);
          return (
            <motion.span
              key={`${word}-${index}`}
              className={`inline-block mr-[0.28em] last:mr-0 ${
                isItalic
                  ? "font-editorial italic font-normal text-[#F3E5AB] drop-shadow-[0_0_24px_rgba(217,155,82,0.4)]"
                  : ""
              }`}
              initial={{
                opacity: shouldReduceMotion ? 1 : 0,
                y: shouldReduceMotion ? 0 : 18,
                filter: shouldReduceMotion ? "none" : "blur(8px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: delay + index * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </span>
    </Component>
  );
}
