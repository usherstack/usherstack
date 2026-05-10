import React, { useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface Sprinkle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  createdAt: number;
}

const MAX_SPRINKLES = 30;
const SPRINKLE_LIFESPAN = 600; // ms
const START_DELAY_MS = 1500; // Defer to avoid competing with LCP/FCP

export function CursorEffect() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Hard-disable for performance + accessibility.
  if (prefersReducedMotion || isMobile) return null;

  const sprinklesRef = useRef<Sprinkle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const lastSprinkleTime = useRef(0);

  const glowX = useSpring(0);
  const glowY = useSpring(0);

  const rafRef = useRef<number>(0);

  const updateMousePosition = useCallback(
    (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        mousePosition.current = { x: e.clientX, y: e.clientY };
        glowX.set(e.clientX - 192); // 192 = half of glow size
        glowY.set(e.clientY - 192);
      });
    },
    [glowX, glowY],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let startTimeoutId: number | undefined;

    const primaryRgb = () => {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-primary-rgb")
        .trim();
      // If the CSS var isn't present, fall back to black.
      return raw || "0,0,0";
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      if (
        now - lastSprinkleTime.current > 50 &&
        sprinklesRef.current.length < MAX_SPRINKLES
      ) {
        lastSprinkleTime.current = now;
        sprinklesRef.current.push({
          id: now,
          createdAt: now,
          x: mousePosition.current.x,
          y: mousePosition.current.y,
          angle: Math.random() * Math.PI * 2,
          distance: 30 + Math.random() * 20,
        });
      }

      sprinklesRef.current.forEach((sprinkle, index) => {
        const elapsed = now - sprinkle.createdAt;
        if (elapsed > SPRINKLE_LIFESPAN) {
          sprinklesRef.current.splice(index, 1);
          return;
        }

        const progress = elapsed / SPRINKLE_LIFESPAN;
        const currentDistance = sprinkle.distance * progress;
        const opacity = 1 - progress;

        const x = sprinkle.x + Math.cos(sprinkle.angle) * currentDistance;
        const y = sprinkle.y + Math.sin(sprinkle.angle) * currentDistance;

        ctx.fillStyle = `rgba(${primaryRgb()}, ${opacity})`;
        ctx.fillRect(x, y, 2, 2);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const start = () => {
      // Size once at start to stabilize.
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const onVisibility = () => {
      if (document.visibilityState !== "visible") {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", handleResize);

    startTimeoutId = window.setTimeout(start, START_DELAY_MS);

    return () => {
      if (startTimeoutId) window.clearTimeout(startTimeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateMousePosition]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]"
      />

      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none z-[-1]"
        style={{ x: glowX, y: glowY }}
      />
    </>
  );
}
