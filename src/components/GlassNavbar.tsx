"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function GlassNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-navbar">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-2xl font-bold text-white">
          Your Name
        </Link>

        <div className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white/80 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="glass-card mx-4 my-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-white/80 transition-colors hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
