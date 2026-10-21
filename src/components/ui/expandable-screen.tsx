import React, { useEffect, createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ExpandableContextType {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
  layoutId: string;
}

const ExpandableContext = createContext<ExpandableContextType | null>(null);

export function useExpandable() {
  const ctx = useContext(ExpandableContext);
  if (!ctx) {
    throw new Error("useExpandable must be used within an ExpandableScreen");
  }
  return ctx;
}

interface ExpandableScreenProps {
  layoutId: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  triggerRadius?: string;
  contentRadius?: string;
  animationDuration?: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ExpandableScreen({
  layoutId,
  trigger,
  children,
  triggerRadius = "16px",
  contentRadius = "24px",
  animationDuration = 0.32,
  isOpen: controlledIsOpen,
  onOpenChange,
}: Readonly<ExpandableScreenProps>) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isExpanded =
    controlledIsOpen !== undefined ? controlledIsOpen : uncontrolledIsOpen;

  const setIsExpanded = (val: boolean) => {
    if (onOpenChange) {
      onOpenChange(val);
    } else {
      setUncontrolledIsOpen(val);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  return (
    <ExpandableContext.Provider value={{ isExpanded, setIsExpanded, layoutId }}>
      {/* Trigger */}
      <motion.div
        layoutId={`expandable-trigger-${layoutId}`}
        onClick={() => setIsExpanded(true)}
        className="cursor-pointer"
        style={{ borderRadius: triggerRadius }}
      >
        {trigger}
      </motion.div>

      {/* Expanded Screen Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md -z-10"
            />

            {/* Modal Container */}
            <motion.div
              layoutId={`expandable-trigger-${layoutId}`}
              transition={{
                duration: animationDuration,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ borderRadius: contentRadius }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#1A140E] border border-[#F3E5AB]/25 shadow-2xl p-6"
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.06] text-[#F3E5AB] hover:bg-white/[0.12] transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ExpandableContext.Provider>
  );
}
