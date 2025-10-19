"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  year: string;
};

const cardHover = {
  y: -8,
  scale: 1.02,
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div
        whileHover={cardHover}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/50 p-8 shadow-[0_24px_60px_-40px_rgba(56,189,248,0.56)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/10 dark:shadow-[0_24px_60px_-35px_rgba(56,189,248,0.45)]"
      >
        <div className="absolute -left-12 top-10 h-36 w-36 rounded-full bg-sky-400/20 blur-3xl transition duration-700 group-hover:opacity-80 dark:bg-sky-500/30" />
        <div className="absolute -right-20 -top-16 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl transition duration-700 group-hover:opacity-70 dark:bg-purple-500/30" />

        <div className="relative flex items-center justify-between gap-4">
          <span className="inline-flex min-w-[88px] justify-center rounded-full border border-white/40 bg-white/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-700/80 transition duration-300 group-hover:border-slate-900/60 group-hover:text-slate-900 dark:border-white/25 dark:bg-white/10 dark:text-slate-100">
            {project.year}
          </span>
          <div className="flex gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-transparent bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur-sm dark:bg-white/10 dark:text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <h3 className="relative mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
          {project.title}
        </h3>
        <p className="relative mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>
        <div className="relative mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/40 bg-white/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700/90 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={project.href}
          target="_blank"
          className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition group-hover:text-sky-500 dark:text-sky-300 dark:group-hover:text-sky-200"
        >
          View project
          <motion.span
            aria-hidden
            className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            -&gt;
          </motion.span>
        </Link>
      </motion.div>
    </motion.article>
  );
}
