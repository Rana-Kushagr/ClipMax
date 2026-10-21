import React, { useRef, useEffect } from 'react';

export const Grainient = ({
  colors = ['#17120C', '#221B12', '#4A351D', '#D99B52', '#F3E5AB'],
  type = 'radial',
  angle = 55,
  bands = 1,
  softness = 1,
  flow = 0.65,
  scale = 1.15,
  speed = 0.35,
  silk = 0.35,
  grainAmount = 0.07,
  grainSize = 1.2,
  grainAnimated = true,
  contrast = 1.05,
  saturation = 0.95,
  interactive = true,
  stir = 0.6,
  clickSwirl = false,
  intro = true,
  className = '',
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Color particles for radial liquid gradients
    const numOrbs = 5;
    const orbs = colors.map((col, i) => ({
      color: col,
      baseX: 0.2 + (i / numOrbs) * 0.6,
      baseY: 0.2 + ((i * 1.618) % 1) * 0.6,
      radius: (Math.min(width, height) * 0.45 * scale) / (1 + (i % 2) * 0.3),
      phase: i * 1.5,
      speed: (0.4 + (i % 3) * 0.2) * speed,
    }));

    // Pre-render grain texture canvas for performance
    const grainCanvas = document.createElement('canvas');
    const grainSizeInt = 128;
    grainCanvas.width = grainSizeInt;
    grainCanvas.height = grainSizeInt;
    const grainCtx = grainCanvas.getContext('2d');
    const grainImg = grainCtx?.createImageData(grainSizeInt, grainSizeInt);

    let seed = 1234567;
    const lcg = () => {
      seed = (1664525 * seed + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const updateGrain = () => {
      if (!grainCtx || !grainImg) return;
      const d = grainImg.data;
      for (let p = 0; p < d.length; p += 4) {
        const val = lcg() * 255;
        d[p] = val;
        d[p + 1] = val;
        d[p + 2] = val;
        d[p + 3] = grainAmount * 255;
      }
      grainCtx.putImageData(grainImg, 0, 0);
    };
    updateGrain();

    let t = 0;
    let frameCount = 0;
    const render = () => {
      t += 0.016 * speed;
      frameCount += 1;
      // Smooth mouse lerp
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
      ctx.filter = `blur(${Math.max(30, width * 0.08 * softness)}px) contrast(${contrast}) saturate(${saturation})`;

      // Render drifting orbs with mouse stir
      orbs.forEach((orb, idx) => {
        const xOffset = Math.sin(t * orb.speed + orb.phase) * width * 0.22 * flow;
        const yOffset = Math.cos(t * orb.speed * 0.8 + orb.phase) * height * 0.22 * flow;
        const mouseShiftX = (mouseRef.current.x - 0.5) * width * 0.15 * stir;
        const mouseShiftY = (mouseRef.current.y - 0.5) * height * 0.15 * stir;

        const cx = orb.baseX * width + xOffset + mouseShiftX;
        const cy = orb.baseY * height + yOffset + mouseShiftY;
        const r = orb.radius * (1 + Math.sin(t * 0.5 + idx) * 0.15 * silk);

        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(10, r));
        radGrad.addColorStop(0, orb.color);
        radGrad.addColorStop(0.7, orb.color + '44');
        radGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(10, r), 0, Math.PI * 2);
        ctx.fill();
      });

      // Reset composite for grain
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'overlay';

      if (grainAnimated && frameCount % 4 === 0) {
        updateGrain();
      }

      // Tile grain texture
      if (grainCanvas) {
        const pattern = ctx.createPattern(grainCanvas, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [
    colors,
    type,
    angle,
    bands,
    softness,
    flow,
    scale,
    speed,
    silk,
    grainAmount,
    grainSize,
    grainAnimated,
    contrast,
    saturation,
    interactive,
    stir,
  ]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default Grainient;
