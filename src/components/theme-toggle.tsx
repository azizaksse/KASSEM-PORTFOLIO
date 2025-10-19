"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, type Transition } from "framer-motion";

const spring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 26,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const icon = useMemo(
    () =>
      isDark ? (
        <motion.svg
          key="moon"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 45 }}
          transition={spring}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
        >
          <path d="M21.34 14.61a.86.86 0 0 0-1.1-.48 6.76 6.76 0 0 1-8.37-8.38.86.86 0 0 0-.48-1.1 8.07 8.07 0 1 0 9.95 9.96Z" />
        </motion.svg>
      ) : (
        <motion.svg
          key="sun"
          initial={{ opacity: 0, rotate: 45 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: -45 }}
          transition={spring}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
        >
          <path d="M12 7.25a4.75 4.75 0 1 0 4.75 4.75A4.76 4.76 0 0 0 12 7.25Zm0-4.13a1 1 0 0 1 1 1v1.25a1 1 0 0 1-2 0V4.12a1 1 0 0 1 1-1Zm0 17.76a1 1 0 0 1 1 1V22a1 1 0 0 1-2 0v-.37a1 1 0 0 1 1-1ZM5.64 5.64a1 1 0 0 1 1.42 0l.89.89a1 1 0 1 1-1.42 1.42l-.89-.89a1 1 0 0 1 0-1.42Zm10.41 10.41a1 1 0 0 1 1.42 0l.89.89a1 1 0 0 1-1.42 1.42l-.89-.89a1 1 0 0 1 0-1.42ZM2.12 11a1 1 0 0 1 1-1h1.25a1 1 0 0 1 0 2H3.12a1 1 0 0 1-1-1Zm17.51-1H20.9a1 1 0 0 1 0 2h-1.27a1 1 0 0 1 0-2Zm-13.38 7.78.89-.89a1 1 0 0 1 1.42 1.42l-.89.89a1 1 0 1 1-1.42-1.42Zm10.41-10.41.89-.89a1 1 0 0 1 1.42 1.42l-.89.89a1 1 0 0 1-1.42-1.42Z" />
        </motion.svg>
      ),
    [isDark],
  );

  if (!mounted) {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/20 backdrop-blur-lg dark:border-white/10 dark:bg-white/5" />
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/30 text-slate-900 shadow-lg shadow-sky-500/10 backdrop-blur-xl transition hover:shadow-sky-500/20 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">{icon}</AnimatePresence>
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 dark:from-purple-500/30"
        whileHover={{ opacity: 1 }}
      />
    </button>
  );
}
