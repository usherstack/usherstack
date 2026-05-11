import React, { useEffect, useMemo, useRef } from "react";
import { throttle } from "lodash";
import { useIsMobile } from "@/hooks/use-mobile";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export function AnimatedBall() {
  const isMobile = useIsMobile();

  const bubblesRef = useRef<HTMLDivElement[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  // Mouse Tracking
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

  // Cursor interaction
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

        const radius = 50;

        if (distance < radius) {
          const angle = Math.atan2(dy, dx);

          const force = (1 - distance / radius) * 50;

          const moveX = -Math.cos(angle) * force;
          const moveY = -Math.sin(angle) * force;

          bubble.style.transform = `
            translate(${moveX}px, ${moveY}px)
          `;
        } else {
          bubble.style.transform = `translate(0px,0px)`;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [isMobile]);

  // Multiple balls covering whole screen
  const bubbles: Bubble[] = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => {
        const colors = [
          "bg-green-400/50",
          "bg-blue-400/50",
          "bg-yellow-400/50",
          "bg-red-400/50",
          "bg-orange-400/50",
          "bg-cyan-400/50",
          "bg-purple-400/50",
          "bg-pink-400/50",
        ];

        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 50 + 20 + 10,
          duration: Math.random() * 6 + 4 + 2,
          delay: Math.random() * 3,
          color: colors[i % colors.length],
        };
      }),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Large Background Glow */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Balls */}
      {bubbles.map((bubble, index) => (
        <div
          key={bubble.id}
          ref={(el) => {
            if (el) bubblesRef.current[index] = el;
          }}
          className={`
            absolute
            rounded-full
            blur-l
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
              bounceMove ${bubble.duration}s
              ease-in-out
              infinite alternate
            `,
            animationDelay: `${bubble.delay}s`,
            willChange: "transform",
            transition: "transform 0.12s linear",
          }}
        />
      ))}

      <style>{`
        @keyframes bounceMove {
          0% {
            transform: translate(0px, 0px) scale(1);
            opacity: 0.5;
          }

          20% {
            transform: translate(30px, -40px) scale(1.15);
            opacity: 0.9;
          }

          40% {
            transform: translate(-40px, 50px) scale(0.9);
            opacity: 0.7;
          }

          60% {
            transform: translate(45px, 70px) scale(1.1);
            opacity: 1;
          }

          80% {
            transform: translate(-35px, -30px) scale(0.95);
            opacity: 0.8;
          }

          100% {
            transform: translate(20px, 40px) scale(1);
            opacity: 0.6;
          }
        }

        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          mix-blend-mode: screen;
          animation: orbFloat 18s ease-in-out infinite alternate;
        }

        .orb-1 {
          width: 700px;
          height: 700px;
          top: -250px;
          left: -200px;
          background: rgba(59, 130, 246, 0.25);
        }

        .orb-2 {
          width: 600px;
          height: 600px;
          top: 10%;
          right: -200px;
          background: rgba(168, 85, 247, 0.25);
          animation-delay: 2s;
        }

        .orb-3 {
          width: 800px;
          height: 800px;
          bottom: -300px;
          left: 20%;
          background: rgba(6, 182, 212, 0.2);
          animation-delay: 4s;
        }

        @keyframes orbFloat {
          0% {
            transform: scale(1) translate(0px, 0px);
          }

          50% {
            transform: scale(1.1) translate(60px, -40px);
          }

          100% {
            transform: scale(0.95) translate(-50px, 50px);
          }
        }
      `}</style>
    </div>
  );
}

export default AnimatedBall;
