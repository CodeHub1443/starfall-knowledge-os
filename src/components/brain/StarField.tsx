import { useEffect, useRef } from "react";

/** Ambient cosmic layer. Canvas-based, cheap, respects reduced motion. */
export function StarField({ density = 0.00008 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let stars: { x: number; y: number; r: number; a: number; s: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(220, Math.floor(canvas.offsetWidth * canvas.offsetHeight * density));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.5 + 0.15,
        s: Math.random() * 0.05 + 0.01,
      }));
    };

    let t = 0;
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const st of stars) {
        const twinkle = reduced ? st.a : st.a * (0.6 + 0.4 * Math.sin(t * 6 * st.s * 20 + st.x));
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 225, 255, ${twinkle})`;
        ctx.fill();
        if (!reduced) {
          st.y -= st.s * 0.35;
          if (st.y < -2) st.y = canvas.offsetHeight + 2;
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
    />
  );
}
