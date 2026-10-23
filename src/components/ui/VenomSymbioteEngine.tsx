import React, { useEffect, useRef, useState } from 'react';

interface VenomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  /** 'venom-black' = glossy black 3D pill from the viral video; 'sharko-blue' = #0066FF Electric Blue pill */
  variant?: 'venom-black' | 'sharko-blue';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable "Try Sharko Free" button with 3D specular glass highlight & automatic Venom Symbiote registration
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
      ? 'bg-[radial-gradient(circle_at_30%_22%,#262932_0%,#090A0E_58%,#040507_100%)] text-white shadow-[0_20px_38px_-10px_rgba(0,0,0,0.45),inset_0_2px_3px_rgba(255,255,255,0.32),inset_0_-4px_8px_rgba(0,0,0,0.85)]'
      : 'bg-[radial-gradient(circle_at_30%_22%,#3385FF_0%,#0066FF_58%,#0047B3_100%)] text-white shadow-[0_20px_38px_-10px_rgba(0,102,255,0.5),inset_0_2px_3px_rgba(255,255,255,0.38),inset_0_-4px_8px_rgba(0,30,90,0.75)]';

  return (
    <button
      type="button"
      data-venom-btn="true"
      data-venom-variant={variant}
      className={`venom-symbiote-target relative inline-flex items-center justify-center gap-2 rounded-full font-extrabold tracking-tight select-none transition-shadow duration-300 will-change-transform cursor-pointer ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {/* Top-Left 3D Specular Glass Highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1.5 left-4 right-10 h-3 rounded-full bg-gradient-to-r from-white/40 via-white/15 to-transparent blur-[0.4px]"
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
};

/**
 * Single Global 60FPS Canvas Engine that powers the Venom Symbiote tendrils for ALL "Try Sharko Free" buttons on the page
 */
export const VenomSymbioteEngine: React.FC<{ snapDistance?: number }> = ({
  snapDistance = 195,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAttached, setIsAttached] = useState(false);
  const [handState, setHandState] = useState({ x: -100, y: -100, angle: 0 });

  useEffect(() => {
    // Skip on touch-only mobile devices where there is no hover cursor
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const mouse = { x: -9999, y: -9999 };
    const tip = { x: 0, y: 0, vx: 0, vy: 0 };
    const btnSpring = new Map<
      HTMLElement,
      { x: number; y: number; vx: number; vy: number }
    >();

    let activeBtn: HTMLElement | null = null;
    let lastAnchor = { ax: 0, ay: 0, nx: 0, ny: 1, color: '#090A0E' };
    let attached = false;
    let recoil = 0;
    let time = 0;

    // 7 Symbiote Web Strands (central thick core + 6 flanking viscoelastic web filaments)
    const strands = [
      { spread: -32, sag: 0.35, width: 1.7, phase: 0.3 },
      { spread: -21, sag: 0.22, width: 2.6, phase: 1.2 },
      { spread: -10, sag: 0.12, width: 4.4, phase: 2.1 },
      { spread: 0, sag: 0.04, width: 7.4, phase: 0.0 },
      { spread: 10, sag: 0.14, width: 4.2, phase: 3.3 },
      { spread: 22, sag: 0.25, width: 2.5, phase: 4.4 },
      { spread: 33, sag: 0.38, width: 1.6, phase: 5.2 },
    ];

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Discover all "Try Sharko Free" buttons or [data-venom-btn="true"] elements
    const getTargetButtons = (): HTMLElement[] => {
      const allBtns = Array.from(document.querySelectorAll<HTMLElement>('button, a'));
      return allBtns.filter((el) => {
        if (el.dataset.venomBtn === 'true') return true;
        const text = (el.textContent || '').trim().toLowerCase();
        return text.includes('try sharko free') || text.includes("let's collaborate");
      });
    };

    const getClosestCapsulePoint = (rect: DOMRect, px: number, py: number) => {
      const r = rect.height / 2;
      const clampedX = Math.max(rect.left + r, Math.min(rect.right - r, px));
      const cy = rect.top + r;
      const dx = px - clampedX;
      const dy = py - cy;
      const len = Math.hypot(dx, dy) || 0.0001;
      const nx = dx / len;
      const ny = dy / len;
      return {
        ax: clampedX + nx * (r - 2),
        ay: cy + ny * (r - 2),
        nx,
        ny,
        dist: Math.max(0, len - r),
      };
    };

    const render = () => {
      time += 0.065;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const targets = getTargetButtons();
      let closestBtn: HTMLElement | null = null;
      let closestData = {
        ax: 0,
        ay: 0,
        nx: 0,
        ny: 1,
        dist: Infinity,
        rect: null as DOMRect | null,
      };

      for (const el of targets) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        const pt = getClosestCapsulePoint(rect, mouse.x, mouse.y);
        if (pt.dist < closestData.dist) {
          closestBtn = el;
          closestData = { ...pt, rect };
        }
      }

      const limit = attached ? snapDistance : snapDistance * 0.7;

      if (closestBtn && closestData.rect && closestData.dist < limit) {
        activeBtn = closestBtn;
        const isBlack = closestBtn.dataset.venomVariant === 'venom-black';
        lastAnchor = {
          ax: closestData.ax,
          ay: closestData.ay,
          nx: closestData.nx,
          ny: closestData.ny,
          color: isBlack ? '#090A0E' : '#090A0E', // Classic black Venom symbiote web strands
        };

        if (!attached) {
          attached = true;
          setIsAttached(true);
          document.body.style.cursor = 'none';
        }
        closestBtn.style.cursor = 'none';
        recoil += (1 - recoil) * 0.26;

        tip.vx = (tip.vx + (mouse.x - tip.x) * 0.36) * 0.62;
        tip.vy = (tip.vy + (mouse.y - tip.y) * 0.36) * 0.62;
        tip.x += tip.vx;
        tip.y += tip.vy;

        const angleDeg =
          (Math.atan2(closestData.ay - mouse.y, closestData.ax - mouse.x) * 180) / Math.PI + 90;
        setHandState({ x: mouse.x, y: mouse.y, angle: angleDeg * 0.25 });
      } else {
        if (attached) {
          attached = false;
          setIsAttached(false);
          document.body.style.cursor = '';
        }
        recoil *= 0.82;
        tip.vx = (tip.vx + (lastAnchor.ax - tip.x) * 0.28) * 0.68;
        tip.vy = (tip.vy + (lastAnchor.ay - tip.y) * 0.28) * 0.68;
        tip.x += tip.vx;
        tip.y += tip.vy;
      }

      // Update magnetic spring offset on all target buttons
      for (const el of targets) {
        if (!btnSpring.has(el)) {
          btnSpring.set(el, { x: 0, y: 0, vx: 0, vy: 0 });
        }
        const sp = btnSpring.get(el)!;
        if (attached && el === activeBtn && closestData.rect) {
          const cx = closestData.rect.left + closestData.rect.width / 2;
          const cy = closestData.rect.top + closestData.rect.height / 2;
          const pull = Math.min(1, closestData.dist / snapDistance);
          const tx = (mouse.x - cx) * 0.14 * pull;
          const ty = (mouse.y - cy) * 0.18 * pull;
          sp.vx = (sp.vx + (tx - sp.x) * 0.22) * 0.72;
          sp.vy = (sp.vy + (ty - sp.y) * 0.22) * 0.72;
        } else {
          el.style.cursor = '';
          sp.vx = (sp.vx - sp.x * 0.18) * 0.75;
          sp.vy = (sp.vy - sp.y * 0.18) * 0.75;
        }
        sp.x += sp.vx;
        sp.y += sp.vy;
        if (Math.abs(sp.x) > 0.05 || Math.abs(sp.y) > 0.05) {
          el.style.transform = `translate3d(${sp.x.toFixed(1)}px, ${sp.y.toFixed(1)}px, 0) rotate(${(
            sp.x * 0.18
          ).toFixed(2)}deg)`;
        } else {
          el.style.transform = '';
        }
      }

      const { ax, ay, nx, ny, color } = lastAnchor;
      const tx = -ny;
      const ty = nx;

      // Pre-attach symbiote edge spikes when cursor approaches a "Try Sharko Free" button
      if (
        !attached &&
        closestBtn &&
        closestData.dist < snapDistance * 1.3 &&
        closestData.dist >= limit
      ) {
        const prox = 1 - (closestData.dist - limit) / (snapDistance * 0.6);
        const cAx = closestData.ax;
        const cAy = closestData.ay;
        const cNx = closestData.nx;
        const cNy = closestData.ny;
        const cTx = -cNy;
        const cTy = cNx;

        ctx.save();
        ctx.fillStyle = '#090A0E';
        for (let i = -2; i <= 2; i++) {
          const bx = cAx + cTx * (i * 7);
          const by = cAy + cTy * (i * 7);
          const spike = (6 + Math.sin(time * 2 + i) * 2.5) * prox;
          ctx.beginPath();
          ctx.moveTo(bx - cTx * 3.5, by - cTy * 3.5);
          ctx.quadraticCurveTo(
            bx + cNx * spike,
            by + cNy * spike,
            bx + cTx * 3.5,
            by + cTy * 3.5
          );
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw multi-strand Venom symbiote web tendrils when attached or recoiling
      if (recoil > 0.02) {
        const stretch = Math.min(1, Math.hypot(tip.x - ax, tip.y - ay) / snapDistance);
        const thin = 1 - stretch * 0.42;

        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.24)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 9;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Webbed Gooey Base on Button Edge
        ctx.beginPath();
        ctx.moveTo(ax - tx * 34 * recoil, ay - ty * 34 * recoil);
        ctx.quadraticCurveTo(
          ax + nx * 24 * recoil,
          ay + ny * 24 * recoil,
          ax + tx * 34 * recoil,
          ay + ty * 34 * recoil
        );
        ctx.closePath();
        ctx.fill();

        const mids: { sx: number; sy: number; mx: number; my: number }[] = [];

        strands.forEach((s) => {
          const sx = ax + tx * s.spread * recoil;
          const sy = ay + ty * s.spread * recoil;
          const mx =
            (sx + tip.x) * 0.5 -
            tx * s.spread * s.sag +
            Math.sin(time + s.phase) * 1.6 * recoil;
          const my =
            (sy + tip.y) * 0.5 -
            ty * s.spread * s.sag +
            Math.cos(time + s.phase) * 1.6 * recoil;

          mids.push({ sx, sy, mx, my });

          ctx.beginPath();
          ctx.lineWidth = Math.max(0.9, s.width * thin * recoil);
          ctx.moveTo(sx, sy);
          ctx.quadraticCurveTo(mx, my, tip.x, tip.y);
          ctx.stroke();
        });

        // Cross-linked Venom Web Bridges
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = 1.15 * recoil;
        for (let i = 0; i < mids.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo((mids[i].sx + mids[i].mx) * 0.5, (mids[i].sy + mids[i].my) * 0.5);
          ctx.quadraticCurveTo(
            (mids[i].mx + mids[i + 1].mx) * 0.5,
            (mids[i].my + mids[i + 1].my) * 0.5 + 5,
            mids[i + 1].mx,
            mids[i + 1].my
          );
          ctx.stroke();
        }

        ctx.restore();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [snapDistance]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        aria-hidden="true"
      />
      {isAttached && (
        <div
          className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
          style={{
            transform: `translate3d(${handState.x - 14}px, ${handState.y - 6}px, 0) rotate(${handState.angle}deg)`,
          }}
          aria-hidden="true"
        >
          <svg
            width="44"
            height="48"
            viewBox="0 0 44 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[4px_8px_10px_rgba(0,0,0,0.28)]"
          >
            <path
              d="M14 4C14 1.8 15.8 0 18 0C20.2 0 22 1.8 22 4V17H24.5C26.4 17 28 18.6 28 20.5V22H30.5C32.4 22 34 23.6 34 25.5V27.5H36C37.9 27.5 39.5 29.1 39.5 31V36.5C39.5 41.5 35.5 45.5 30.5 45.5H17.5C13.2 45.5 9.8 42.6 8.5 38.5L4.5 27.5C3.7 25.3 4.8 22.8 7 22C9.1 21.2 11.4 22.2 12.3 24.2L14 28V4Z"
              fill="#FFFFFF"
              stroke="#0B0C10"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <line x1="20" y1="30" x2="21" y2="38" stroke="#0B0C10" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="25.5" y1="30.5" x2="26.5" y2="38.5" stroke="#0B0C10" strokeWidth="2.6" strokeLinecap="round" />
            <line x1="31" y1="31.5" x2="31.8" y2="38.5" stroke="#0B0C10" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M14 43.5H33" stroke="#0B0C10" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </>
  );
};
