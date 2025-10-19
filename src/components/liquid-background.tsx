"use client";

import { motion } from "framer-motion";
import { useId, useMemo } from "react";

const blobs = [
  {
    radius: 380,
    initial: { x: -180, y: -220 },
    animate: {
      x: [-240, 120, -160],
      y: [-200, -20, -240],
      scale: [1, 1.12, 0.88],
    },
    duration: 30,
    gradient: [
      { offset: "0%", color: "#86EFAC" },
      { offset: "100%", color: "#22D3EE" },
    ],
  },
  {
    radius: 320,
    initial: { x: 200, y: 240 },
    animate: {
      x: [260, -20, 300],
      y: [240, 300, 220],
      scale: [1, 0.82, 1.18],
    },
    duration: 34,
    gradient: [
      { offset: "0%", color: "#A78BFA" },
      { offset: "100%", color: "#60A5FA" },
    ],
  },
  {
    radius: 340,
    initial: { x: -40, y: 360 },
    animate: {
      x: [-80, 50, -20],
      y: [360, 300, 390],
      scale: [1, 1.06, 0.9],
    },
    duration: 36,
    gradient: [
      { offset: "0%", color: "#0F172A" },
      { offset: "100%", color: "#1E293B" },
    ],
  },
];

export function LiquidBackground() {
  const rawId = useId();
  const id = useMemo(() => rawId.replace(/:/g, ""), [rawId]);

  return (
    <svg
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden
    >
      <defs>
        {blobs.map((blob, index) => (
          <radialGradient
            key={`gradient-${index}`}
            id={`${id}-gradient-${index}`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            {blob.gradient.map((stop, stopIndex) => (
              <stop
                key={stopIndex}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </radialGradient>
        ))}
        <filter id={`${id}-goo`}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="90" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 48 -20"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" result="mix" />
        </filter>
      </defs>
      <g filter={`url(#${id}-goo)`}>
        {blobs.map((blob, index) => (
          <motion.circle
            key={`blob-${index}`}
            cx="50%"
            cy="50%"
            r={blob.radius}
            fill={`url(#${id}-gradient-${index})`}
            initial={blob.initial}
            animate={blob.animate}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            style={{
              mixBlendMode: "screen",
            }}
          />
        ))}
      </g>
    </svg>
  );
}
