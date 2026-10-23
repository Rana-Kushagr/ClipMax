import React, { useEffect, useRef } from 'react';

interface VenomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** 'venom-black' = glossy 3D black pill from reference photo; 'sharko-blue' = #0066FF Electric Blue pill */
  variant?: 'venom-black' | 'sharko-blue';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Stationary 3D Glossy Pill Button.
 * Layered at z-[92] so its crisp pill border sits cleanly ABOVE the symbiote tentacle roots (z-[90]),
 * making the tentacles emerge directly from INSIDE/BEHIND the button body with zero rough edge artifacts.
 */
export const VenomButton: React.FC<VenomButtonProps> = ({
  children,
  variant = 'venom-black',
  size = 'lg',
  className = '',
  ...props
}) => {
  const sizeClasses =
    size === 'sm'
      ? 'px-5 py-2.5 text-xs sm:text-sm'
      : size === 'md'
      ? 'px-6 py-3 text-sm sm:text-base'
      : 'px-8 py-4 text-base sm:text-lg';

  const variantClasses =
    variant === 'venom-black'
      ? 'bg-[radial-gradient(circle_at_30%_22%,#252830_0%,#0A0B10_58%,#040507_100%)] text-white shadow-[0_18px_34px_-10px_rgba(0,0,0,0.42),inset_0_2px_3px_rgba(255,255,255,0.32),inset_0_-4px_8px_rgba(0,0,0,0.85)] hover:shadow-[0_22px_40px_-8px_rgba(0,0,0,0.52),inset_0_2px_3px_rgba(255,255,255,0.38)]'
      : 'bg-[radial-gradient(circle_at_30%_22%,#3385FF_0%,#0066FF_58%,#0047B3_100%)] text-white shadow-[0_18px_34px_-10px_rgba(0,102,255,0.45),inset_0_2px_3px_rgba(255,255,255,0.38),inset_0_-4px_8px_rgba(0,30,90,0.75)]';

  return (
    <button
      type="button"
      data-venom-btn="true"
      data-venom-variant={variant}
      className={`venom-symbiote-target relative z-[92] inline-flex items-center justify-center gap-2 rounded-full font-extrabold tracking-tight cursor-pointer select-none transition-shadow duration-300 ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* Top-Left 3D Specular Glass Reflection (Matches Reference Photo) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1.5 left-4 right-10 h-3 rounded-full bg-gradient-to-r from-white/40 via-white/15 to-transparent blur-[0.4px]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
};

interface TendrilStrand {
  /** Horizontal/tangential offset inside the button interior (px) */
  spreadOffset: number;
  /** Depth inside the button border where the root is anchored (px) */
  insetDepth: number;
  /** Width of the tendril root inside the button (px) */
  baseWidth: number;
  /** Width at the cursor tip (px) */
  tipWidth: number;
  /** How much the strand bows inward toward the central core */
  inwardSag: number;
  /** Stagger delay (ms) after cursor enters range before this tendril shoots out ("one by one trap") */
  staggerMs: number;
  /** Individual max stretch distance factor (outer strands snap off earlier than the central core) */
  snapFactor: number;
  /** Spring stiffness & damping for organic Verlet motion */
  stiffness: number;
  damping: number;
  /** Dynamic runtime state */
  reach: number; // 0 = retracted inside button, 1 = locked onto cursor
  tipX: number;
  tipY: number;
  vx: number;
  vy: number;
  ctrlX: number;
  ctrlY: number;
  cvx: number;
  cvy: number;
  phase: number;
}

/**
 * Global Butter-Smooth Venom Symbiote Canvas Engine.
 * - Keeps native cursor 100% untouched.
 * - Keeps buttons 100% stationary.
 * - Roots tendrils deep INSIDE the button (z-[90] canvas behind z-[92] button) and attaches them one-by-one like a trap.
 */
export const VenomSymbioteEngine: React.FC<{
  engageDistance?: number;
  maxStretchDistance?: number;
}> = ({ engageDistance = 145, maxStretchDistance = 235 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Raw & smoothed pointer coordinates for zero-jitter sub-pixel tracking
    const rawMouse = { x: -9999, y: -9999 };
    const smoothMouse = { x: -9999, y: -9999 };
    let hasMouseMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      rawMouse.x = e.clientX;
      rawMouse.y = e.clientY;
      if (!hasMouseMoved) {
        smoothMouse.x = e.clientX;
        smoothMouse.y = e.clientY;
        hasMouseMoved = true;
      }
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 8 Symbiote Tendrils ordered with staggered trap delays (0ms -> 360ms)
    // Central scout latches first; flanking tendrils shoot out one by one from inside the button!
    const tendrils: TendrilStrand[] = [
      {
        spreadOffset: 0,
        insetDepth: 22,
        baseWidth: 11.5,
        tipWidth: 1.4,
        inwardSag: 0.02,
        staggerMs: 0, // #1: Central core scout shoots out immediately
        snapFactor: 1.0, // Holds on the longest when pulling away
        stiffness: 0.28,
        damping: 0.72,
        reach: 0,
        tipX: 0,
        tipY: 0,
        vx: 0,
        vy: 0,
        ctrlX: 0,
        ctrlY: 0,
        cvx: 0,
        cvy: 0,
        phase: 0.0,
      },
      {
        spreadOffset: -9,
        insetDepth: 20,
        baseWidth: 7.2,
        tipWidth: 1.0,
        inwardSag: 0.14,
        staggerMs: 55, // #2: Inner-left tendril latches 55ms later
        snapFactor: 0.94,
        stiffness: 0.25,
        damping: 0.74,
        reach: 0,
        tipX: 0,
        tipY: 0,
        vx: 0,
        vy: 0,
        ctrlX: 0,
        ctrlY: 0,
        cvx: 0,
        cvy: 0,
        phase: 1.1,
      },
      {
        spreadOffset: 10,
        insetDepth: 20,
        baseWidth: 6.8,
        tipWidth: 1.0,
        inwardSag: 0.15,
        staggerMs: 110, // #3: Inner-right tendril latches 110ms later
        snapFactor: 0.91,
        stiffness: 0.24,
        damping: 0.74,
        reach: 0,
        tipX: 0,
        tipY: 0,
        vx: 0,
        vy: 0,
        ctrlX: 0,
        ctrlY: 0,
        cvx: 0,
        cvy: 0,
        phase: 2.3,
      },
      {
        spreadOffset: -19,
        insetDepth: 18,
        baseWidth: 4.8,
        tipWidth: 0.85,
        inwardSag: 0.24,
        staggerMs: 170, // #4: Mid-left tendril shoots out
        snapFactor: 0.85,
        stiffness: 0.22,
        damping: 0.76,
        reach: 0,
        tipX: 0,
        tipY: 0,
        vx: 0,
        vy: 0,
        ctrlX: 0,
        ctrlY: 0,
        cvx: 0,
        cvy: 0,
        phase: 3.4,
      },
      {
        spreadOffset: 21,
        insetDepth: 18,
        baseWidth: 4.5,
        tipWidth: 0.85,
        inwardSag: 0.26,
        staggerMs: 230, // #5: Mid-right tendril shoots out
        snapFactor: 0.82,
        stiffness: 0.21,
        damping: 0.76,
        reach: 0,
        tipX: 0,
        tipY: 0,
        vx: 0,
        vy: 0,
        ctrlX: 0,
        ctrlY: 0,
        cvx: 0,
        cvy: 0,
        phase: 4.5,
      },
      {
        spreadOffset: -30,
        insetDepth: 16,
        baseWidth: 3.2,
        tipWidth: 0.7,
        inwardSag: 0.35,
        staggerMs: 290, // #6: Outer-left web filament shoots out
        snapFactor: 0.76,
        stiffness: 0.19,
        damping: 0.78,
        reach: 0,
        tipX: 0,
        tipY: 0,
        vx: 0,
        vy: 0,
        ctrlX: 0,
        ctrlY: 0,
        cvx: 0,
        cvy: 0,
        phase: 5.1,
      },
      {
        spreadOffset: 32,
        insetDepth: 16,
        baseWidth: 3.0,
        tipWidth: 0.7,
        inwardSag: 0.38,
        staggerMs: 350, // #7: Outer-right web filament shoots out
        snapFactor: 0.73,
        stiffness: 0.18,
        damping: 0.78,
        reach: 0,
        tipX: 0,
        tipY: 0,
        vx: 0,
        vy: 0,
        ctrlX: 0,
        ctrlY: 0,
        cvx: 0,
        cvy: 0,
        phase: 5.9,
      },
    ];

    const getTargetButtons = (): HTMLElement[] => {
      const all = Array.from(document.querySelectorAll<HTMLElement>('button, a'));
      return all.filter((el) => {
        const isVenom = el.dataset.venomBtn === 'true';
        const txt = (el.textContent || '').trim().toLowerCase();
        const matchesText =
          txt.includes('try sharko free') ||
          txt.includes('try sharko for free') ||
          txt.includes('try sharko') ||
          txt.includes("let's collaborate");

        if (isVenom || matchesText) {
          // Ensure button sits above canvas so tentacles emerge from INSIDE/BEHIND the button
          if (!el.style.zIndex || el.style.zIndex !== '92') {
            el.style.position = el.style.position || 'relative';
            el.style.zIndex = '92';
          }
          return true;
        }
        return false;
      });
    };

    /**
     * Computes the anchor point INSIDE the capsule button so tentacles emerge from within the button body,
     * never from a rough lump on the outer border.
     */
    const getCapsuleInteriorAnchor = (rect: DOMRect, px: number, py: number) => {
      const r = rect.height / 2;
      const clampedX = Math.max(rect.left + r, Math.min(rect.right - r, px));
      const cy = rect.top + r;
      const dx = px - clampedX;
      const dy = py - cy;
      const len = Math.hypot(dx, dy) || 0.0001;
      const nx = dx / len;
      const ny = dy / len;

      // Edge point on the perimeter
      const edgeX = clampedX + nx * r;
      const edgeY = cy + ny * r;
      const distFromEdge = Math.max(0, len - r);

      return { edgeX, edgeY, nx, ny, distFromEdge };
    };

    /**
     * Draws a butter-smooth, filled, tapered cubic-Bezier symbiote ribbon from (sx, sy) to (ex, ey)
     * with control point (cx, cy), tapering smoothly from startWidth to endWidth.
     */
    const drawTaperedTendril = (
      sx: number,
      sy: number,
      cx: number,
      cy: number,
      ex: number,
      ey: number,
      startWidth: number,
      endWidth: number,
      fillStyle: string
    ) => {
      const dx = ex - sx;
      const dy = ey - sy;
      const len = Math.hypot(dx, dy) || 1;
      // Perpendicular normal vector
      const px = -dy / len;
      const py = dx / len;

      const halfStart = startWidth * 0.5;
      const halfMid = (startWidth * 0.34 + endWidth * 0.66) * 0.5;
      const halfEnd = endWidth * 0.5;

      ctx.fillStyle = fillStyle;
      ctx.beginPath();
      // Left side of ribbon from root -> tip
      ctx.moveTo(sx + px * halfStart, sy + py * halfStart);
      ctx.quadraticCurveTo(
        cx + px * halfMid,
        cy + py * halfMid,
        ex + px * halfEnd,
        ey + py * halfEnd
      );
      // Rounded sub-pixel tip cap
      ctx.arc(ex, ey, halfEnd, Math.atan2(py, px), Math.atan2(-py, -px), false);
      // Right side of ribbon from tip -> root
      ctx.quadraticCurveTo(
        cx - px * halfMid,
        cy - py * halfMid,
        sx - px * halfStart,
        sy - py * halfStart
      );
      ctx.closePath();
      ctx.fill();
    };

    let activeBtn: HTMLElement | null = null;
    let trapEngagedAt = 0;
    let lastFrameTime = performance.now();
    let lastAnchor = { edgeX: 0, edgeY: 0, nx: 0, ny: 1 };

    const animate = (now: number) => {
      const dt = Math.min(2.2, Math.max(0.5, (now - lastFrameTime) / 16.667));
      lastFrameTime = now;

      // Sub-pixel pointer smoothing
      smoothMouse.x += (rawMouse.x - smoothMouse.x) * (1 - Math.pow(0.45, dt));
      smoothMouse.y += (rawMouse.y - smoothMouse.y) * (1 - Math.pow(0.45, dt));

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const buttons = getTargetButtons();
      let nearestBtn: HTMLElement | null = null;
      let nearestInfo = {
        edgeX: 0,
        edgeY: 0,
        nx: 0,
        ny: 1,
        distFromEdge: Infinity,
      };

      for (const btn of buttons) {
        const rect = btn.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        const info = getCapsuleInteriorAnchor(rect, smoothMouse.x, smoothMouse.y);
        if (info.distFromEdge < nearestInfo.distFromEdge) {
          nearestBtn = btn;
          nearestInfo = info;
        }
      }

      const isCurrentlyTrapped = activeBtn !== null;
      const triggerLimit = isCurrentlyTrapped ? maxStretchDistance : engageDistance;

      if (nearestBtn && nearestInfo.distFromEdge < triggerLimit) {
        if (activeBtn !== nearestBtn) {
          activeBtn = nearestBtn;
          trapEngagedAt = now;
          // Initialize tendril tips inside the button so they shoot OUT from inside the button!
          const initX = nearestInfo.edgeX - nearestInfo.nx * 18;
          const initY = nearestInfo.edgeY - nearestInfo.ny * 18;
          tendrils.forEach((t) => {
            if (t.reach < 0.05) {
              t.tipX = initX;
              t.tipY = initY;
              t.ctrlX = initX;
              t.ctrlY = initY;
              t.vx = 0;
              t.vy = 0;
            }
          });
        }
        lastAnchor = {
          edgeX: nearestInfo.edgeX,
          edgeY: nearestInfo.edgeY,
          nx: nearestInfo.nx,
          ny: nearestInfo.ny,
        };
      } else {
        activeBtn = null;
      }

      const elapsedTrapMs = activeBtn ? now - trapEngagedAt : 0;
      const { edgeX, edgeY, nx, ny } = lastAnchor;
      // Tangent vector along the button's interior spine
      const tx = -ny;
      const ty = nx;

      // Track active strand midpoints for cross-webbing
      const activeStrandData: {
        rootX: number;
        rootY: number;
        ctrlX: number;
        ctrlY: number;
        tipX: number;
        tipY: number;
        reach: number;
      }[] = [];

      // Soft ambient shadow under the symbiote web (matches the photo's soft shadow on light background)
      ctx.save();
      ctx.shadowColor = 'rgba(11, 15, 25, 0.16)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 8;

      tendrils.forEach((t) => {
        // Root is positioned DEEP INSIDE the button (edge - nx * insetDepth)
        const rootX = edgeX - nx * t.insetDepth + tx * t.spreadOffset;
        const rootY = edgeY - ny * t.insetDepth + ty * t.spreadOffset;

        // Check if this specific tendril should be attached ("one by one trap" stagger + individual snap limit)
        const individualMaxDist = maxStretchDistance * t.snapFactor;
        const shouldAttach =
          activeBtn !== null &&
          elapsedTrapMs >= t.staggerMs &&
          nearestInfo.distFromEdge < individualMaxDist;

        if (shouldAttach) {
          // Smoothly extend reach from 0 -> 1 like a creeping symbiote trap
          t.reach += (1 - t.reach) * 0.14 * dt;

          // Spring tip toward cursor
          const targetX = smoothMouse.x;
          const targetY = smoothMouse.y;
          t.vx = (t.vx + (targetX - t.tipX) * t.stiffness * dt) * Math.pow(t.damping, dt);
          t.vy = (t.vy + (targetY - t.tipY) * t.stiffness * dt) * Math.pow(t.damping, dt);
          t.tipX += t.vx * dt;
          t.tipY += t.vy * dt;
        } else {
          // Smoothly retract back INSIDE the button root
          t.reach *= Math.pow(0.84, dt);
          t.vx = (t.vx + (rootX - t.tipX) * 0.26 * dt) * Math.pow(0.7, dt);
          t.vy = (t.vy + (rootY - t.tipY) * 0.26 * dt) * Math.pow(0.7, dt);
          t.tipX += t.vx * dt;
          t.tipY += t.vy * dt;
        }

        if (t.reach > 0.015) {
          const currentDist = Math.hypot(t.tipX - rootX, t.tipY - rootY);
          const stretchRatio = Math.min(1, currentDist / maxStretchDistance);
          // Strands thin out organically as they stretch taut
          const tensionScale = (1 - stretchRatio * 0.45) * Math.min(1, t.reach * 1.25);

          // Organic control point that bows inward toward the central core strand
          const idealCtrlX =
            (rootX + t.tipX) * 0.5 -
            tx * t.spreadOffset * t.inwardSag +
            Math.sin(now * 0.004 + t.phase) * 1.4 * t.reach;
          const idealCtrlY =
            (rootY + t.tipY) * 0.5 -
            ty * t.spreadOffset * t.inwardSag +
            Math.cos(now * 0.004 + t.phase) * 1.4 * t.reach;

          t.ctrlX += (idealCtrlX - t.ctrlX) * 0.24 * dt;
          t.ctrlY += (idealCtrlY - t.ctrlY) * 0.24 * dt;

          // 1. Subtle smoky secondary ghost strand (visible on the left side in the reference photo)
          if (Math.abs(t.spreadOffset) > 8) {
            drawTaperedTendril(
              rootX + tx * 2,
              rootY + ty * 2,
              t.ctrlX + tx * 4,
              t.ctrlY + ty * 4,
              t.tipX,
              t.tipY,
              t.baseWidth * 0.55 * tensionScale,
              t.tipWidth * 0.6,
              'rgba(12, 14, 20, 0.22)'
            );
          }

          // 2. Primary liquid-smooth tapered symbiote tendril
          drawTaperedTendril(
            rootX,
            rootY,
            t.ctrlX,
            t.ctrlY,
            t.tipX,
            t.tipY,
            t.baseWidth * tensionScale,
            Math.max(0.55, t.tipWidth * tensionScale),
            '#08090D'
          );

          activeStrandData.push({
            rootX,
            rootY,
            ctrlX: t.ctrlX,
            ctrlY: t.ctrlY,
            tipX: t.tipX,
            tipY: t.tipY,
            reach: t.reach,
          });
        }
      });

      // 3. Draw Fine Diagonal Symbiote Web Bridges Between Adjacent Locked Tendrils
      ctx.shadowColor = 'transparent';
      if (activeStrandData.length >= 2) {
        // Sort left-to-right by root position so web bridges connect neighboring strands cleanly
        activeStrandData.sort((a, b) => a.rootX * tx + a.rootY * ty - (b.rootX * tx + b.rootY * ty));

        for (let i = 0; i < activeStrandData.length - 1; i++) {
          const s1 = activeStrandData[i];
          const s2 = activeStrandData[i + 1];
          const bridgeAlpha = Math.min(s1.reach, s2.reach);
          if (bridgeAlpha < 0.35) continue;

          // Upper web filament near the button exit
          const p1x = s1.rootX * 0.55 + s1.ctrlX * 0.45;
          const p1y = s1.rootY * 0.55 + s1.ctrlY * 0.45;
          const p2x = s2.rootX * 0.4 + s2.ctrlX * 0.6;
          const p2y = s2.rootY * 0.4 + s2.ctrlY * 0.6;

          ctx.strokeStyle = `rgba(8, 9, 13, ${(0.75 * bridgeAlpha).toFixed(2)})`;
          ctx.lineWidth = 1.05 * bridgeAlpha;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p1x, p1y);
          ctx.quadraticCurveTo(
            (p1x + p2x) * 0.5 + nx * 5,
            (p1y + p2y) * 0.5 + ny * 5,
            p2x,
            p2y
          );
          ctx.stroke();

          // Lower diagonal web filament closer to the cursor
          const q1x = s1.ctrlX * 0.65 + s1.tipX * 0.35;
          const q1y = s1.ctrlY * 0.65 + s1.tipY * 0.35;
          const q2x = s2.ctrlX * 0.5 + s2.tipX * 0.5;
          const q2y = s2.ctrlY * 0.5 + s2.tipY * 0.5;

          ctx.strokeStyle = `rgba(8, 9, 13, ${(0.52 * bridgeAlpha).toFixed(2)})`;
          ctx.lineWidth = 0.75 * bridgeAlpha;
          ctx.beginPath();
          ctx.moveTo(q1x, q1y);
          ctx.quadraticCurveTo(
            (q1x + q2x) * 0.5 + nx * 3,
            (q1y + q2y) * 0.5 + ny * 3,
            q2x,
            q2y
          );
          ctx.stroke();
        }
      }

      ctx.restore();
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [engageDistance, maxStretchDistance]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[90]"
      aria-hidden="true"
    />
  );
};
