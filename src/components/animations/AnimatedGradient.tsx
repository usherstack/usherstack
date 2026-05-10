import React, { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { throttle } from "lodash";
import MagneticButton from "./MagneticButton";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export function AnimatedGradient() {
  const isMobile = useIsMobile();

  const bubblesRef = useRef<HTMLDivElement[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Track mouse
  const handleMouseMove = throttle((e: MouseEvent) => {
    mousePosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }, 16);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      handleMouseMove.cancel();
    };
  }, [isMobile]);

  // Bubble interaction animation
  useEffect(() => {
    if (isMobile) return;

    let animationId: number;

    const animate = () => {
      bubblesRef.current.forEach((bubble) => {
        if (!bubble) return;

        const rect = bubble.getBoundingClientRect();

        const bubbleX = rect.left + rect.width / 2;
        const bubbleY = rect.top + rect.height / 2;

        const dx = mousePosition.current.x - bubbleX;
        const dy = mousePosition.current.y - bubbleY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        const radius = 100;

        if (distance < radius) {
          const angle = Math.atan2(dy, dx);

          const force = (1 - distance / radius) * 40;

          const moveX = -Math.cos(angle) * force;
          const moveY = -Math.sin(angle) * force;

          bubble.style.transform = `
            translate(${moveX}px, ${moveY}px)
          `;
        } else {
          bubble.style.transform = `translate(0px, 0px)`;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [isMobile]);

  const bubbles: Bubble[] = Array.from({ length: 18 }, (_, i) => {
    const colors = [
      "bg-primary/40",
      "bg-blue-400/40",
      "bg-cyan-400/40",
      "bg-purple-400/40",
      "bg-pink-400/40",
    ];

    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 120 + 60,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      color: colors[i % colors.length],
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Main Background Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Floating Bubbles */}
      {bubbles.map((bubble, index) => (
        <div
          key={bubble.id}
          ref={(el) => {
            if (el) bubblesRef.current[index] = el;
          }}
          className={`
            absolute
            rounded-full
            blur-3xl
            mix-blend-screen
            ${bubble.color}
          `}
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            marginLeft: `-${bubble.size / 2}px`,
            marginTop: `-${bubble.size / 2}px`,
            animation: `
              float ${bubble.duration}s 
              ease-in-out 
              infinite
            `,
            animationDelay: `${bubble.delay}s`,
            willChange: "transform",
          }}
        />
      ))}

      {/* Global Styles */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            opacity: 0.5;
          }

          50% {
            opacity: 0.9;
          }
        }

        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(120px);
          mix-blend-mode: screen;
          animation: pulse 10s ease-in-out infinite alternate;
        }

        .orb-1 {
          width: 700px;
          height: 700px;
          top: -250px;
          left: -200px;
          background: rgba(99, 102, 241, 0.35);
        }

        .orb-2 {
          width: 600px;
          height: 600px;
          top: 10%;
          right: -200px;
          background: rgba(168, 85, 247, 0.3);
          animation-delay: 2s;
        }

        .orb-3 {
          width: 800px;
          height: 800px;
          bottom: -300px;
          left: 20%;
          background: rgba(6, 182, 212, 0.25);
          animation-delay: 4s;
        }

        @keyframes pulse {
          from {
            transform: scale(0.95);
          }

          to {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
export default AnimatedGradient;
