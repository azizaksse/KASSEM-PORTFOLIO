"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedGradientBackgroundProps {
  variant?: "default" | "hero" | "contact";
  className?: string;
}

export function AnimatedGradientBackground({ 
  variant = "default", 
  className = "" 
}: AnimatedGradientBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const variants = {
    default: {
      gradients: [
        {
          colors: ["rgba(56,189,248,0.15)", "rgba(99,102,241,0.1)", "transparent"],
          position: { x: 20, y: 20 },
          size: 400,
        },
        {
          colors: ["rgba(168,85,247,0.12)", "rgba(6,182,212,0.08)", "transparent"],
          position: { x: 80, y: 60 },
          size: 350,
        },
        {
          colors: ["rgba(236,72,153,0.1)", "rgba(59,130,246,0.06)", "transparent"],
          position: { x: 50, y: 80 },
          size: 300,
        },
      ],
    },
    hero: {
      gradients: [
        {
          colors: ["rgba(56,189,248,0.25)", "rgba(99,102,241,0.2)", "transparent"],
          position: { x: 30, y: 30 },
          size: 500,
        },
        {
          colors: ["rgba(168,85,247,0.2)", "rgba(6,182,212,0.15)", "transparent"],
          position: { x: 70, y: 70 },
          size: 450,
        },
        {
          colors: ["rgba(236,72,153,0.15)", "rgba(59,130,246,0.1)", "transparent"],
          position: { x: 50, y: 90 },
          size: 400,
        },
      ],
    },
    contact: {
      gradients: [
        {
          colors: ["rgba(56,189,248,0.3)", "rgba(99,102,241,0.25)", "transparent"],
          position: { x: 25, y: 25 },
          size: 600,
        },
        {
          colors: ["rgba(168,85,247,0.25)", "rgba(6,182,212,0.2)", "transparent"],
          position: { x: 75, y: 75 },
          size: 550,
        },
      ],
    },
  };

  const currentVariant = variants[variant];

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      {currentVariant.gradients.map((gradient, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            width: gradient.size,
            height: gradient.size,
            left: `${gradient.position.x}%`,
            top: `${gradient.position.y}%`,
            background: `radial-gradient(circle, ${gradient.colors.join(", ")})`,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 2,
          }}
        />
      ))}
      
      {/* Interactive mouse-following gradient */}
      <motion.div
        className="absolute rounded-full blur-2xl opacity-30"
        style={{
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(56,189,248,0.2), transparent)",
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute rounded-full bg-white/10"
          style={{
            width: 2 + (index % 3),
            height: 2 + (index % 3),
            left: `${20 + (index * 7) % 60}%`,
            top: `${30 + (index * 11) % 50}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
          }}
        />
      ))}
    </div>
  );
}
