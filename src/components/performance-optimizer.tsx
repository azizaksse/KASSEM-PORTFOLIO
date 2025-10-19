"use client";

import { useEffect } from "react";

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

type NavigatorWithDeviceInfo = Navigator & {
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
  };
};

export function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {

  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preload critical fonts
      const fontLinks = [
        "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&display=swap",
        "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap",
      ];

      fontLinks.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "style";
        link.href = href;
        document.head.appendChild(link);
      });

      // Preload critical images
      const criticalImages = ["/logo.jpg"];
      criticalImages.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimize animations based on device performance
    const optimizeAnimations = () => {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      
      if (!gl) {
        // Disable complex animations for devices without WebGL
        document.documentElement.classList.add("reduced-animations");
        return;
      }

      // Check device memory if available
      const enhancedNavigator = navigator as NavigatorWithDeviceInfo;

      if (typeof enhancedNavigator.deviceMemory === "number") {
        if (enhancedNavigator.deviceMemory < 4) {
          document.documentElement.classList.add("reduced-animations");
        }
      }

      const connection = enhancedNavigator.connection;
      if (connection?.effectiveType === "slow-2g") {
        document.documentElement.classList.add("reduced-animations");
      }

      // Check for reduced motion preference
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.documentElement.classList.add("reduced-animations");
      }
    };

    // Lazy load non-critical resources
    const lazyLoadResources = () => {
      // Intersection Observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
              }
            }
          });
        },
        { rootMargin: "50px" }
      );

      // Observe all images with data-src
      document.querySelectorAll("img[data-src]").forEach((img) => {
        observer.observe(img);
      });
    };

    // Initialize optimizations
    preloadResources();
    optimizeAnimations();
    lazyLoadResources();

    // Cleanup
    return () => {
      document.documentElement.classList.remove("reduced-animations");
    };
  }, []);

  // Service Worker registration for caching
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    }
  }, []);

  return <>{children}</>;
}
