"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface InteractiveButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function InteractiveButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  onClick,
  disabled = false,
  loading = false,
}: InteractiveButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantClasses = {
    primary: "rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-indigo-500 text-slate-900 shadow-[0_25px_60px_-25px_rgba(56,189,248,0.9)] hover:from-sky-300 hover:via-sky-400 hover:to-indigo-400 focus:ring-sky-500",
    secondary: "rounded-full border border-white/25 text-white hover:border-sky-400/60 hover:text-sky-200 focus:ring-sky-500",
    ghost: "rounded-full border border-transparent text-slate-400 hover:border-white/10 hover:text-white focus:ring-white/20",
  };

  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const buttonContent = (
    <motion.div
      className="relative flex items-center gap-2"
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {loading && (
        <motion.div
          className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span className="relative z-10">{children}</span>
      
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Hover gradient overlay */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "0%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        aria-disabled={disabled}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-disabled={disabled || loading}
    >
      {buttonContent}
    </motion.button>
  );
}
