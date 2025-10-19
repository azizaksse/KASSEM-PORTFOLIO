import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LavaLamp } from "@/components/ui/fluid-blob";
import { AnimatedGradientBackground } from "@/components/animated-gradient-background";
import { InteractiveButton } from "@/components/interactive-button";
import { TestimonialSection } from "@/components/testimonial-section";
import { EnhancedThemeToggle } from "@/components/enhanced-theme-toggle";
import { AccessibilityEnhancedForm } from "@/components/accessibility-enhanced-form";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const metrics = [
  { label: "Projects shipped", value: "24" },
  { label: "Years crafting UI", value: "4+" },
  { label: "Avg. performance score", value: "98" },
];

const services = [
  {
    title: "Experience Design",
    description:
      "Design systems and narrative-led flows that feel cinematic, inclusive, and unmistakably on brand.",
    tags: ["UX Strategy", "Design Systems", "Accessibility"],
  },
  {
    title: "Motion & Interactions",
    description:
      "Micro-interactions and product storytelling choreographed with intention to guide and delight.",
    tags: ["Framer Motion", "Microcopy", "Prototyping"],
  },
  {
    title: "Frontend Engineering",
    description:
      "Next.js builds engineered for performance, maintainability, and effortless handoff to teams.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
];

const projects = [
  {
    title: "Bonnaball Restaurant",
    description:
      "Immersive restaurant platform pairing liquid surfaces, adaptive menus, and cinematic storytelling.",
    deliverables: ["Experience Strategy", "Motion System", "CMS Integrations"],
    link: "https://bonnaball.vercel.app/",
  },
  {
    title: "Tarek Visuals Portfolio",
    description:
      "Photography portfolio with light + dark themes, fluid galleries, and scroll-bound narratives.",
    deliverables: ["Brand Site", "Theming Architecture", "Content Modeling"],
    link: "https://tarek-visuals-portfolio.vercel.app/",
  },
  {
    title: "Dr. Kamal Sbiti Dental Clinic",
    description:
      "Care-forward clinic experience focused on transparency, service clarity, and seamless booking.",
    deliverables: ["Service UX", "Design System", "API Integration"],
    link: "https://dr-kamal-sbiti-dental-clinic.vercel.app/",
  },
  {
    title: "L’Atelier Car Care",
    description:
      "Premium detailing brand with 3D-inspired reflections, modular sections, and heartbeat animations.",
    deliverables: ["Brand Refresh", "Performance Tuning", "CMS Handoff"],
    link: "https://l-atelier-car-care-a8am.vercel.app/",
  },
];

const socials = [
  { label: "Email", href: "mailto:webcrafters.agenc@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/webcrafters.agenc/" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "https://github.com/azizaksse" },
  { label: "Telegram", href: "https://t.me/belkacem23" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040810] text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <LavaLamp />
        <div className="absolute inset-0 bg-[#040810]/75" />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-20 top-0 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.55),rgba(56,189,248,0)_65%)] blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-[-180px] h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle_at_40%_70%,rgba(168,85,247,0.5),rgba(6,182,212,0)_65%)] blur-3xl opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(65%_65%_at_50%_35%,rgba(15,23,42,0.25),rgba(4,8,16,0.92))]" />
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#8b5cf6_1px,transparent_0)] [background-size:18px_18px]" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-24 px-6 pb-20 pt-10 sm:px-10 lg:px-12">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-strong sticky top-4 z-20 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-5"
        >
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.span 
              className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-[0_12px_45px_-20px_rgba(56,189,248,0.6)]"
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 12px 45px -20px rgba(56,189,248,0.8)",
                borderColor: "rgba(56,189,248,0.3)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Image
                src="/logo.jpg"
                alt="Kassem Bell logo"
                width={44}
                height={44}
                className="h-full w-full object-cover"
                priority
                quality={90}
                unoptimized={false}
              />
            </motion.span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-300">
                Kassem Bell
              </p>
              <p className="text-xs text-slate-400">
                Creative Developer - Algiers
              </p>
            </div>
          </motion.div>
          <nav className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.26em] text-slate-400">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="group relative rounded-full border border-transparent px-4 py-2 transition-all duration-300 hover:border-white/10 hover:text-white"
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {item.label}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/5"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <EnhancedThemeToggle />
            <InteractiveButton
              href="https://wa.me/213676610457"
              variant="secondary"
              size="sm"
            >
              Let&apos;s talk 💬
            </InteractiveButton>
          </motion.div>
        </motion.header>

        <main className="flex flex-col gap-24">
          <motion.section
            id="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-strong relative grid gap-12 overflow-hidden rounded-[40px] border border-white/10 bg-white/5 px-10 py-14 backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <LavaLamp />
              <AnimatedGradientBackground variant="hero" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#040810]/80 via-transparent to-[#040810]/60" />
            </div>
            <motion.div 
              className="flex flex-col gap-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="inline-flex max-w-max items-center gap-2 rounded-full border border-white/10 bg-[rgba(15,23,42,0.65)] px-4 py-2 text-[11px] uppercase tracking-[0.38em] text-sky-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(56,189,248,0.3)" }}
              >
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ⭐
                </motion.span>
                Webcarfters Owner
              </motion.span>
              <motion.h1 
                className="text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                I engineer immersive web experiences where motion, clarity, and
                story flow together.
              </motion.h1>
              <motion.p 
                className="max-w-xl text-sm text-slate-300 md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                I blend UX strategy, creative coding, and motion direction to
                craft interfaces that feel alive—guided by data, tuned for
                performance, and delivered with meticulous polish.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <InteractiveButton
                  href="#projects"
                  variant="primary"
                  size="md"
                >
                  View selected work →
                </InteractiveButton>
                <InteractiveButton
                  href="#services"
                  variant="secondary"
                  size="md"
                >
                  Explore services
                </InteractiveButton>
              </motion.div>
              <motion.dl 
                className="mt-6 grid gap-6 sm:grid-cols-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {metrics.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                      boxShadow: "0 25px 70px -45px rgba(59,130,246,0.9)"
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-white/15 bg-[rgba(10,15,26,0.72)] p-4 text-center shadow-[0_20px_60px_-45px_rgba(59,130,246,0.8)] transition-all duration-300"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-indigo-500/10"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <dt className="relative text-[11px] uppercase tracking-[0.32em] text-slate-400">
                      {item.label}
                    </dt>
                    <motion.dd 
                      className="relative mt-3 text-3xl font-semibold text-white"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.value}
                    </motion.dd>
                  </motion.div>
                ))}
              </motion.dl>
            </motion.div>

            <motion.div 
              className="relative flex flex-col justify-between gap-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div 
                className="group relative overflow-hidden rounded-[32px] border border-white/15 bg-[rgba(10,15,26,0.68)] p-8 text-sm text-slate-200 shadow-[0_30px_90px_-45px_rgba(99,102,241,0.8)]"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-violet-400/5 to-indigo-500/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.p 
                  className="relative text-xs uppercase tracking-[0.32em] text-sky-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Pillars
                </motion.p>
                <ul className="relative mt-4 space-y-3">
                  {[
                    { color: "bg-sky-300", text: "Human-centered journeys crafted with research, empathy, and strategic storytelling." },
                    { color: "bg-violet-300", text: "Motion systems engineered to guide focus, signal state, and add delight without friction." },
                    { color: "bg-cyan-300", text: "Scalable frontend foundations tuned for collaboration, accessibility, and long-term growth." }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 + index * 0.2 }}
                    >
                      <motion.span 
                        className={`mt-[6px] h-2 w-2 rounded-full ${item.color}`}
                        whileHover={{ scale: 1.5, boxShadow: "0 0 10px currentColor" }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                      <p>{item.text}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              <motion.div 
                className="glass group relative flex flex-col gap-3 overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-6 text-xs uppercase tracking-[0.32em] text-slate-200"
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-cyan-500/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span 
                  className="relative text-slate-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                >
                  Currently crafting
                </motion.span>
                <div className="relative flex items-center justify-between text-sm normal-case tracking-normal">
                  <div>
                    <motion.p 
                      className="text-slate-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.8 }}
                    >
                      Aurora Campus Hub
                    </motion.p>
                    <p className="text-xs text-slate-400">
                      Operating System - product sprint
                    </p>
                  </div>
                  <motion.span 
                    className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.0 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      In Motion
                    </motion.span>
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>

          <motion.section 
            id="services" 
            className="flex flex-col gap-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="flex flex-col gap-3"
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
                How I help teams
              </motion.span>
              <motion.h2 
                className="text-3xl font-semibold text-white md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Strategy, motion, and code connected end-to-end.
              </motion.h2>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -8,
                    transition: { type: "spring", stiffness: 300, damping: 25 }
                  }}
                  className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/15 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),rgba(9,13,23,0.78))] p-8 transition-all duration-300 hover:border-sky-400/40 hover:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.26),rgba(9,13,23,0.7))]"
                >
                  <motion.div 
                    className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-sky-200 shadow-[0_18px_50px_-26px_rgba(56,189,248,0.8)]"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 180,
                      boxShadow: "0 25px 60px -26px rgba(56,189,248,0.9)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <motion.span 
                      className="text-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      ✧
                    </motion.span>
                  </motion.div>
                  <div className="space-y-3">
                    <motion.h3 
                      className="text-xl font-semibold text-white"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {service.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-slate-300"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {service.description}
                    </motion.p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.32em] text-slate-400">
                    {service.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 + tagIndex * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ 
                          scale: 1.05, 
                          borderColor: "rgba(56,189,248,0.4)",
                          color: "rgb(56,189,248)"
                        }}
                        className="rounded-full border border-white/10 px-3 py-1 text-[11px] transition-all duration-300 group-hover:border-sky-400/40 group-hover:text-sky-200"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-sky-400/5 to-indigo-500/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.article>
              ))}
            </div>
          </motion.section>

          <motion.section 
            id="projects" 
            className="flex flex-col gap-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="flex flex-col gap-3"
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
                Featured work
              </motion.span>
              <motion.h2 
                className="text-3xl font-semibold text-white md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Interfaces engineered to feel fluid, confident, and alive.
              </motion.h2>
              <motion.p 
                className="max-w-2xl text-sm text-slate-300 md:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                Each build is a partnership—from research and positioning to
                visual language, motion design, and deployment—crafted to leave
                a lasting impression.
              </motion.p>
            </motion.div>
            <div className="grid gap-6 lg:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 25 }
                  }}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),rgba(9,13,23,0.8))] p-8 transition-all duration-300 hover:border-sky-400/40 hover:bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.24),rgba(9,13,23,0.72))]"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-sky-400/5 to-indigo-500/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <motion.h3 
                        className="text-xl font-semibold text-white"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.span 
                        className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.32em] text-slate-400 transition-all duration-300 group-hover:border-sky-400/50 group-hover:text-sky-200"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        Case Study
                      </motion.span>
                    </div>
                    <motion.p 
                      className="text-sm text-slate-300"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.description}
                    </motion.p>
                    <ul className="space-y-2 text-xs text-slate-400">
                      {project.deliverables.map((deliverable, deliverableIndex) => (
                        <motion.li 
                          key={deliverable} 
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.6 + deliverableIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <motion.span 
                            className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-sky-300"
                            whileHover={{ scale: 1.5, boxShadow: "0 0 8px rgb(56,189,248)" }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          />
                          {deliverable}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link relative mt-8 inline-flex w-max items-center gap-2 overflow-hidden rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-white transition-all duration-300 group-hover:border-sky-400/60 group-hover:text-sky-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <motion.span
                      className="relative z-10 flex items-center gap-2"
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      Visit Live
                      <motion.span 
                        aria-hidden 
                        className="text-sky-200"
                        animate={{ rotate: [0, 15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        ↗
                      </motion.span>
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-indigo-500/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.article>
              ))}
            </div>
          </motion.section>

          <TestimonialSection />

          <section
            id="about"
            className="glass-subtle grid gap-10 rounded-[36px] p-10 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.36em] text-slate-400">
              About Kassem
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                I partner with design-led teams who care about craft and impact.
              </h2>
              <p className="text-sm text-slate-300 md:text-base">
                From product startups to cultural brands, I help teams translate
                ambition into immersive, scalable digital experiences. Collaboration
                is at the heart of my process—bringing strategy, visual design,
                motion direction, and engineering together in one narrative thread.
              </p>
              <p className="text-sm text-slate-300 md:text-base">
                When I’m not prototyping, you’ll find me documenting motion studies,
                exploring generative art, or coaching students on sustainable design systems.
              </p>
              <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.32em] text-slate-400">
                {[
                  "Next.js",
                  "TypeScript",
                  "Tailwind",
                  "Framer Motion",
                  "Three.js",
                  "Design Systems",
                  "Content Strategy",
                  "Creative Direction",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 px-3 py-1"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6">
              <div className="glass rounded-[28px] p-8 shadow-[0_30px_90px_-40px_rgba(56,189,248,0.7)]">
                <p className="text-xs uppercase tracking-[0.36em] text-sky-200">
                  Process
                </p>
                <ol className="mt-4 space-y-4 text-sm text-slate-300">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-sky-200">
                      01
                    </span>
                    Discovery sessions that align intent, success metrics, and emotional direction.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-sky-200">
                      02
                    </span>
                    Prototyping with motion and narrative to validate before writing a line of production code.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs font-semibold text-sky-200">
                      03
                    </span>
                    Production-ready delivery, documentation, and collaborative handoff to elevate your team.
                  </li>
                </ol>
              </div>
              <div className="glass rounded-[28px] p-6 text-xs uppercase tracking-[0.36em] text-slate-300">
                <p>Currently booking</p>
                <p className="mt-3 text-lg font-semibold text-white">
                  February 2026
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  2-week design & build intensives - 1 long-form partnership
                </p>
              </div>
            </div>
          </section>

          <section
            id="contact"
            className="glass-strong relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 px-10 py-16 text-center backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0 -z-10">
              <AnimatedGradientBackground variant="contact" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.45),rgba(56,189,248,0))]" />
            </div>
            <span className="text-xs uppercase tracking-[0.36em] text-slate-300">
              Collaborate with me
            </span>
            <h2 className="mt-5 text-4xl font-semibold text-white md:text-5xl">
              Let’s build what’s next.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-200 md:text-base">
              Whether you&apos;re launching a new product, refreshing a brand, or
              bringing motion to an existing experience, I&apos;d love to hear your story.
            </p>
            <AccessibilityEnhancedForm
              fields={[
                {
                  name: "name",
                  label: "Name",
                  type: "text",
                  placeholder: "Enter your name",
                  required: true,
                },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "you@example.com",
                  required: true,
                  validation: (value) => {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(value) ? null : "Please enter a valid email address";
                  },
                },
                {
                  name: "mobile",
                  label: "Mobile",
                  type: "tel",
                  placeholder: "+213676610457",
                  required: true,
                },
                {
                  name: "subject",
                  label: "Subject",
                  type: "text",
                  placeholder: "Tell me about your project",
                  required: true,
                },
                {
                  name: "message",
                  label: "Project details",
                  type: "textarea",
                  placeholder: "Share goals, timeline, and anything that will help me understand your vision.",
                  required: true,
                },
              ]}
              onSubmit={async (data) => {
                // Handle form submission
                const formData = new FormData();
                formData.append("_captcha", "false");
                formData.append("_subject", "✨ New project inquiry from kassembell.com");
                formData.append("_template", "table");
                formData.append("_next", "https://webcrafters.agenc/");
                
                Object.entries(data).forEach(([key, value]) => {
                  formData.append(key, value);
                });

                const response = await fetch("https://formsubmit.co/webcrafters.agenc@gmail.com", {
                  method: "POST",
                  body: formData,
                });

                if (!response.ok) {
                  throw new Error("Failed to send message");
                }
              }}
              submitText="Send inquiry"
              className="mx-auto mt-10 w-full max-w-3xl"
            />
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <InteractiveButton
                href="mailto:webcrafters.agenc@gmail.com"
                variant="primary"
                size="md"
              >
                Start a project
              </InteractiveButton>
              <InteractiveButton
                href="https://wa.me/213676610457"
                variant="secondary"
                size="md"
              >
                Schedule a call
              </InteractiveButton>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.32em] text-slate-400">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-4 py-2 transition hover:border-sky-400/50 hover:text-sky-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </section>
        </main>

        <footer className="flex flex-col gap-3 border-t border-white/10 py-6 text-center text-xs uppercase tracking-[0.32em] text-slate-500">
          <span>&copy; 2025 Kassem &#8212; High-performance design & code.</span>
        </footer>
      </div>
    </div>
  );
}
















