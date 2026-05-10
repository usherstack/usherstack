"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Ball {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  delay: number;
}

const COLORS = [
  "#7c3aed", // purple
  "#3b82f6", // blue
  "#f59e0b", // yellow
  "#f97316", // orange
  "#22c55e", // green
  "#8b5cf6", // violet
  "#06b6d4", // cyan
];

export function BouncingBalls() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<HTMLDivElement[]>([]);
  const animationRef = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });
  const isMouseDown = useRef(false);

  const [springX, springY] = [useMotionValue(0), useMotionValue(0)];

  // Track mouse position
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseDown = useCallback(() => {
    isMouseDown.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isMouseDown.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  // Generate balls
  const balls: Ball[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 20,
    color: COLORS[i % COLORS.length],
    speedX: (Math.random() - 0.5) * 2,
    speedY: (Math.random() - 0.5) * 2,
    delay: Math.random() * 3,
  }));

  // Physics animation
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const bounds = { width: rect.width, height: rect.height };

    const positions = balls.map(() => ({
      x: Math.random() * (bounds.width - 60) + 30,
      y: Math.random() * (bounds.height - 60) + 30,
      vx: balls.map((_, i) => balls[i].speedX),
      vy: balls.map((_, i) => balls[i].speedY),
    }));

    const posX = balls.map((_, i) => positions[i].x);
    const posY = balls.map((_, i) => positions[i].y);
    const velX = balls.map((_, i) => balls[i].speedX);
    const velY = balls.map((_, i) => balls[i].speedY);

    let frameId: number;

    const animate = () => {
      const newX = [...posX];
      const newY = [...posY];

      for (let i = 0; i < balls.length; i++) {
        // Update position
        newX[i] += velX[i];
        newY[i] += velY[i];

        // Bounce off walls
        if (newX[i] <= balls[i].size / 2 || newX[i] >= bounds.width - balls[i].size / 2) {
          velX[i] *= -1;
          newX[i] = Math.max(balls[i].size / 2, Math.min(bounds.width - balls[i].size / 2, newX[i]));
        }
        if (newY[i] <= balls[i].size / 2 || newY[i] >= bounds.height - balls[i].size / 2) {
          velY[i] *= -1;
          newY[i] = Math.max(balls[i].size / 2, Math.min(bounds.height - balls[i].size / 2, newY[i]));
        }

        // Mouse repulsion
        if (container) {
          const dx = mousePosition.current.x - (rect.left + newX[i]);
          const dy = mousePosition.current.y - (rect.top + newY[i]);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 120;

          if (distance < repelRadius && distance > 0) {
            const force = (1 - distance / repelRadius) * 8;
            velX[i] -= (dx / distance) * force * 0.5;
            velY[i] -= (dy / distance) * force * 0.5;
          }
        }

        // Damping
        velX[i] *= 0.998;
        velY[i] *= 0.998;

        // Apply to DOM
        if (ballsRef.current[i]) {
          ballsRef.current[i].style.transform = `translate(${newX[i]}px, ${newY[i]}px)`;
          // Scale based on velocity
          const speed = Math.sqrt(velX[i] * velX[i] + velY[i] * velY[i]);
          const scale = 1 + speed * 0.03;
          ballsRef.current[i].style.transform = `translate(${newX[i]}px, ${newY[i]}px) scale(${Math.min(scale, 1.5)})`;
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [balls]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] animate-pulse delay-1000" />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-yellow-500/5 blur-[100px] animate-pulse delay-2000" />

      {/* Bouncing balls */}
      {balls.map((ball, index) => (
        <div
          key={ball.id}
          ref={(el) => {
            if (el) ballsRef.current[index] = el;
          }}
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            backgroundColor: ball.color,
            opacity: 0.6,
            boxShadow: `0 0 ${ball.size * 0.8}px ${ball.color}40, inset 0 0 ${ball.size * 0.3}px ${ball.color}80`,
            border: `1px solid ${ball.color}30`,
            backdropFilter: "blur(2px)",
            willChange: "transform",
            transition: "box-shadow 0.3s ease",
          }}
        />
      ))}

      {/* Particle sparks */}
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={`spark-${i}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: COLORS[i % COLORS.length],
            opacity: Math.random() * 0.4 + 0.1,
            animation: `sparkFloat ${Math.random() * 6 + 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes sparkFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.15;
          }
          25% {
            transform: translateY(-20px) scale(1.5);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-10px) scale(1.2);
            opacity: 0.25;
          }
          75% {
            transform: translateY(-25px) scale(1.3);
            opacity: 0.35;
          }
        }
      `}</style>
    </div>
  );
}