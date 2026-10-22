import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

export interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

export interface DockIconProps {
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
}

export function Dock({
  className = "",
  magnification = 56,
  distance = 135,
  direction = "middle",
  children,
}: Readonly<DockProps>) {
  const mouseX = useMotionValue(Infinity);

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement<DockIconProps>(child)) {
        return React.cloneElement(child, {
          mouseX,
          magnification,
          distance,
        });
      }
      return child;
    });
  };

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={`mx-auto flex h-14 items-center gap-1.5 sm:gap-2 rounded-2xl border border-[#F3E5AB]/20 bg-[#1E1710] px-2.5 sm:px-3 py-2 shadow-xl shadow-black/40 max-w-full overflow-x-auto sm:overflow-visible shrink-0 scrollbar-none ${className}`}
    >
      {renderChildren()}
    </motion.div>
  );
}

export function DockIcon({
  magnification = 56,
  distance = 135,
  mouseX,
  className = "",
  children,
  onClick,
  title,
}: Readonly<DockIconProps>) {
  const ref = useRef<HTMLDivElement>(null);

  const defaultMouseX = useMotionValue(Infinity);
  const effectiveMouseX = mouseX || defaultMouseX;

  const distanceCalc = useTransform(effectiveMouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={onClick}
      title={title}
      className={`flex aspect-square cursor-pointer items-center justify-center rounded-xl transition-colors duration-200 ${className}`}
    >
      {children}
    </motion.div>
  );
}
