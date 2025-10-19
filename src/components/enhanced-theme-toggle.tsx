"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type ThemeId = "dark" | "light" | "system";

interface ThemeOption {
  id: ThemeId;
  label: string;
  icon: string;
  description: string;
}

const themeOptions: ThemeOption[] = [
  {
    id: "dark",
    label: "Dark",
    icon: "\u263D",
    description: "Deep space vibes",
  },
  {
    id: "light",
    label: "Light",
    icon: "\u2600",
    description: "Clean and bright",
  },
  {
    id: "system",
    label: "System",
    icon: "\u2699",
    description: "Follows device",
  },
];

export function EnhancedThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = (theme as ThemeId) ?? "dark";
  const displayTheme =
    activeTheme === "system" ? ((resolvedTheme as ThemeId) ?? "dark") : activeTheme;
  const triggerIcon =
    activeTheme === "system"
      ? themeOptions.find((option) => option.id === displayTheme)?.icon ?? "\u2699"
      : themeOptions.find((option) => option.id === activeTheme)?.icon ?? "\u263D";

  useEffect(() => {
    if (!mounted) {
      return;
    }

    document.documentElement.setAttribute("data-theme", displayTheme);
  }, [displayTheme, mounted]);

  const handleThemeChange = (id: ThemeId) => {
    setTheme(id);
    setIsOpen(false);
  };

  if (!mounted) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/20 backdrop-blur-lg" />
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen((open) => !open)}
        className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/30 text-slate-900 shadow-lg shadow-sky-500/10 backdrop-blur-xl transition-all duration-300 hover:shadow-sky-500/20 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`${activeTheme}-${displayTheme}`}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-lg"
          >
            {triggerIcon}
          </motion.span>
        </AnimatePresence>

        <motion.span
          className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 dark:from-purple-500/30"
          whileHover={{ opacity: 1 }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="absolute right-0 top-14 z-50 min-w-[200px] rounded-2xl border border-white/20 bg-white/90 p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {themeOptions.map((option) => {
                const isActive =
                  activeTheme === option.id ||
                  (activeTheme === "system" && option.id === "system");

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleThemeChange(option.id)}
                    className={`group relative flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 ${
                      isActive
                        ? "bg-sky-400/20 text-sky-600 dark:bg-sky-400/20 dark:text-sky-300"
                        : "text-slate-700 hover:bg-white/50 dark:text-slate-300 dark:hover:bg-white/10"
                    }`}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs opacity-70">{option.description}</div>
                    </div>
                    {isActive && (
                      <motion.div
                        className="h-2 w-2 rounded-full bg-sky-400"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
