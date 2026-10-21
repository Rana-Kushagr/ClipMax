import React, { useRef, useEffect } from 'react';

export const Grainient = ({
  colors = ['#17120C', '#221B12', '#4A351D', '#D99B52', '#F3E5AB'],
  softness = 1,
  flow = 0.5,
  scale = 1.1,
  speed = 0.25,
  silk = 0.3,
  grainAmount = 0.05,
  grainAnimated = false,
  contrast = 1.05,
  saturation = 0.95,
  interactive = true,
  stir = 0.5,
  className = '',
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animFrameRef = useRef(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth || window.innerWidth);
    let height = (canvas.height = container.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth || window.innerWidth;
      height = canvas.height = container.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      if (!interactive || !isVisibleRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (rect.width || 1);
      const y = (e.clientY - rect.top) / (rect.height || 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Color particles for radial liquid gradients
    const numOrbs = colors.length;
    const orbs = colors.map((col, i) => ({
      color: col,
      baseX: 0.2 + (i / numOrbs) * 0.6,
      baseY: 0.2 + ((i * 1.618) % 1) * 0.6,
      radius: (Math.min(width, height) * 0.45 * scale) / (1 + (i % 2) * 0.3),
      phase: i * 1.5,
      speed: (0.3 + (i % 3) * 0.15) * speed,
    }));

    // Pre-render static grain pattern for zero CPU usage
    const grainCanvas = document.createElement('canvas');
    const grainSizeInt = 96;
    grainCanvas.width = grainSizeInt;
    grainCanvas.height = grainSizeInt;
    const grainCtx = grainCanvas.getContext('2d');
    const grainImg = grainCtx?.createImageData(grainSizeInt, grainSizeInt);

    let seed = 1234567;
    const lcg = () => {
      seed = (1664525 * seed + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    if (grainCtx && grainImg) {
      const d = grainImg.data;
      for (let p = 0; p < d.length; p += 4) {
        const val = lcg() * 255;
        d[p] = val;
        d[p + 1] = val;
        d[p + 2] = val;
        d[p + 3] = grainAmount * 255;
      }
      grainCtx.putImageData(grainImg, 0, 0);
    }

    const grainPattern = ctx.createPattern(grainCanvas, 'repeat');

    let t = 0;
    const render = () => {
      if (!isVisibleRef.current) return;
      t += 0.016 * speed;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05 * stir;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05 * stir;

      ctx.clearRect(0, 0, width, height);

      // Base gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, colors[0] || '#17120C');
      bgGrad.addColorStop(1, colors[1] || '#221B12');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'screen';
      ctx.filter = `blur(${Math.max(24, width * 0.06 * softness)}px) contrast(${contrast}) saturate(${saturation})`;

      // Render drifting orbs with mouse stir
      orbs.forEach((orb, idx) => {
        const xOffset = Math.sin(t * orb.speed + orb.phase) * width * 0.18 * flow;
        const yOffset = Math.cos(t * orb.speed * 0.8 + orb.phase) * height * 0.18 * flow;
        const mouseShiftX = (mouseRef.current.x - 0.5) * width * 0.12 * stir;
        const mouseShiftY = (mouseRef.current.y - 0.5) * height * 0.12 * stir;

        const cx = orb.baseX * width + xOffset + mouseShiftX;
        const cy = orb.baseY * height + yOffset + mouseShiftY;
        const r = orb.radius * (1 + Math.sin(t * 0.5 + idx) * 0.12 * silk);

        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(10, r));
        radGrad.addColorStop(0, orb.color);
        radGrad.addColorStop(0.7, orb.color + '44');
        radGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(10, r), 0, Math.PI * 2);
        ctx.fill();
      });

      // Overlay static pre-rendered grain
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'overlay';

      if (grainPattern) {
        ctx.fillStyle = grainPattern;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.globalCompositeOperation = 'source-over';
      animFrameRef.current = requestAnimationFrame(render);
    };

    // IntersectionObserver to pause loop completely when off-screen!
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !wasVisible) {
          animFrameRef.current = requestAnimationFrame(render);
        } else if (!entry.isIntersecting && wasVisible) {
          cancelAnimationFrame(animFrameRef.current);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [
    colors,
    softness,
    flow,
    scale,
    speed,
    silk,
    grainAmount,
    contrast,
    saturation,
    interactive,
    stir,
  ]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default Grainient;
