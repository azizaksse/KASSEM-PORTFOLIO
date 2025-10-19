"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

type LenisProviderProps = {
  children: ReactNode;
};

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
      document.documentElement.classList.remove("lenis");
      return;
    }

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const lenis = new Lenis({
      duration: 0.4, // Faster duration for responsiveness
      lerp: hasFinePointer ? 0.3 : 0.2, // More responsive
      wheelMultiplier: hasFinePointer ? 1.2 : 1.5, // Faster scrolling
      touchMultiplier: hasFinePointer ? 1.2 : 1.8, // Much faster touch
      smoothWheel: hasFinePointer,
      syncTouch: false,
      easing: (t: number) => 1 - Math.pow(1 - t, 2), // Quadratic ease out
    });

    let animationFrame: number;

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
