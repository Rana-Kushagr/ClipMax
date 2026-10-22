import { useEffect } from "react";

/**
 * High-performance hook to lock document.body scrolling when a modal or drawer is active.
 * Shared across modals to prevent code duplication and layout shifts.
 */
export function useBodyScrollLock(isLocked: boolean, onEscape?: () => void) {
  useEffect(() => {
    if (!isLocked || typeof document === "undefined") return;

    const scrollY = window.scrollY;
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onEscape) {
        onEscape();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.width = originalStyle.width;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLocked, onEscape]);
}

export default useBodyScrollLock;
