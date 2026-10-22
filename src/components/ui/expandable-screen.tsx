import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";

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
  animationDuration = 0.28,
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

  // Hard Main-Page Scroll Lock When Expanded
  useBodyScrollLock(isExpanded, () => setIsExpanded(false));

  const overlayNode = isExpanded && typeof document !== "undefined"
    ? createPortal(
        <AnimatePresence>
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain bg-[#0D0A07]/92 backdrop-blur-xl"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Backdrop click to dismiss */}
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 -z-10 cursor-default bg-transparent border-none w-full h-full"
              aria-label="Close modal backdrop"
              tabIndex={-1}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{
                duration: animationDuration,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ borderRadius: contentRadius }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#1E1710] border border-[#F3E5AB]/25 shadow-2xl p-6"
            >
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#2A2016] text-[#F3E5AB] hover:text-white hover:bg-[#382B1E] border border-[#F3E5AB]/20 transition-colors z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              {children}
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )
    : null;

  return (
    <ExpandableContext.Provider value={{ isExpanded, setIsExpanded, layoutId }}>
      {/* Trigger */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsExpanded(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(true);
          }
        }}
        className="cursor-pointer"
        style={{ borderRadius: triggerRadius }}
      >
        {trigger}
      </div>

      {/* Portaled overlay */}
      {overlayNode}
    </ExpandableContext.Provider>
  );
}
