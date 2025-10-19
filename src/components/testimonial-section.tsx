"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Kassem transformed our digital presence with his liquid glass design approach. The motion and interactivity he brought to our platform elevated our brand to a whole new level.",
    author: "Sarah Chen",
    role: "Product Director",
    company: "TechFlow Inc.",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Working with Kassem was a game-changer. His attention to detail, performance optimization, and creative vision resulted in a website that not only looks stunning but performs flawlessly.",
    author: "Marcus Rodriguez",
    role: "Founder",
    company: "InnovateLab",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The liquid glass aesthetic Kassem implemented perfectly captured our brand's premium feel. The micro-interactions and smooth animations create an experience our customers love.",
    author: "Emily Watson",
    role: "Brand Manager",
    company: "Luxury Brands Co.",
    rating: 5,
  },
];

export function TestimonialSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <motion.section
      className="glass-subtle relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.15),rgba(56,189,248,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.1),rgba(168,85,247,0))]" />
      </div>

      <div className="relative z-10">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="text-xs uppercase tracking-[0.36em] text-slate-400"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Client Stories
          </motion.span>
          <motion.h2
            className="mt-3 text-3xl font-semibold text-white md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            What partners say about working with me
          </motion.h2>
        </motion.div>

        <div className="relative">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-[rgba(10,15,26,0.68)] p-8"
            key={activeTestimonial}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <motion.div
                  className="mb-4 flex gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, index) => (
                    <motion.span
                      key={index}
                      className="text-yellow-400"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      aria-hidden="true"
                    >
                      {"\u2605"}
                    </motion.span>
                  ))}
                  <span className="sr-only">
                    {testimonials[activeTestimonial].rating} out of 5 stars
                  </span>
                </motion.div>

                <motion.blockquote
                  className="text-lg leading-relaxed text-slate-200 md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </motion.blockquote>

                <motion.div
                  className="mt-6 flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white font-semibold">
                    {testimonials[activeTestimonial].author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {testimonials[activeTestimonial].author}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimonials[activeTestimonial].role} at{" "}
                      {testimonials[activeTestimonial].company}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial
                    ? "scale-125 bg-sky-400"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                onClick={() => setActiveTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition-all duration-300 hover:border-sky-400/60 hover:bg-white/20"
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            aria-label="Previous testimonial"
          >
            <span aria-hidden="true">{"\u2190"}</span>
          </motion.button>
          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition-all duration-300 hover:border-sky-400/60 hover:bg-white/20"
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            aria-label="Next testimonial"
          >
            <span aria-hidden="true">{"\u2192"}</span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
