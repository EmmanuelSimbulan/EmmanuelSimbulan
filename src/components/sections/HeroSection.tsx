"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Briefcase,
  Code,
  Lightbulb,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const greetings = ["Hi, I'm", "Hola, soy", "Bonjour, je suis", "안녕하세요, 저는"];

const roles = [
  { label: "Business Analyst", icon: Briefcase },
  { label: "Software Engineer", icon: Code },
  { label: "Problem Solver", icon: Lightbulb },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: siteConfig.github },
  { icon: Linkedin, label: "LinkedIn", href: siteConfig.linkedin },
  { icon: Mail, label: "Email", href: `mailto:${siteConfig.email}` },
  {
    icon: ExternalLink,
    label: "Resume",
    href: siteConfig.resumeUrl,
    external: true,
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function HeroSection() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showNickname, setShowNickname] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [pageReady, setPageReady] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setPageReady(true), 100);
    return () => clearTimeout(t);
  }, [inView]);

  useEffect(() => {
    if (!pageReady || reducedMotion) {
      if (reducedMotion) {
        setShowNickname(true);
        setShowBadges(true);
        setShowCTA(true);
        setShowSocial(true);
      }
      return;
    }
    const t1 = setTimeout(() => setShowNickname(true), 1500);
    const t2 = setTimeout(() => setShowBadges(true), 2000);
    const t3 = setTimeout(() => setShowCTA(true), 2600);
    const t4 = setTimeout(() => setShowSocial(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [pageReady, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
    >
      {/* Page load fade */}
      <motion.div
        className="fixed inset-0 z-[200] bg-white dark:bg-black pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: pageReady ? 0 : 1 }}
        transition={{ duration: 0.8, ease }}
      />

      {/* Background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/5 dark:bg-apple-blue/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-apple-purple/5 dark:bg-apple-purple/10 rounded-full blur-3xl animate-blob-delay-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-apple-teal/3 dark:bg-apple-teal/5 rounded-full blur-3xl animate-blob-delay-4" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">

        {/* Profile — mb-10 */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
          animate={{
            opacity: pageReady ? 1 : 0,
            scale: pageReady ? 1 : 0.85,
            filter: pageReady ? "blur(0px)" : "blur(12px)",
          }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <div className="relative">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-apple-blue to-apple-purple p-[3px] shadow-2xl shadow-apple-blue/20">
              <div className="w-full h-full rounded-full bg-surface-primary dark:bg-black overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${siteConfig.basePath}/images/profile.jpg`}
                  alt="Emmanuel Robledo Simbulan"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `${siteConfig.basePath}/images/profile-placeholder.svg`;
                  }}
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-apple-green rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        </motion.div>

        {/* ─── Greeting — mb-5 (20px) ─── */}
        <div
          className="relative flex items-center justify-center mb-5"
          style={{ height: "1.2em", overflow: "visible" }}
        >
          <span
            className="invisible whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            aria-hidden="true"
          >
            Bonjour, je suis
          </span>

          <AnimatePresence mode="wait">
            <motion.span
              key={greetingIndex}
              className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary dark:text-white whitespace-nowrap"
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease }}
            >
              {greetings[greetingIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ─── Name — mb-7 (28px) ─── */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-7 whitespace-nowrap"
        >
          <motion.span
            className="text-gradient"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{
              opacity: pageReady ? 1 : 0,
              y: pageReady ? 0 : 24,
              filter: pageReady ? "blur(0px)" : "blur(8px)",
            }}
            transition={{
              delay: 0.6,
              duration: 0.7,
              type: "spring",
              stiffness: 80,
              damping: 15,
            }}
          >
            Emmanuel Robledo Simbulan
          </motion.span>
        </h1>

        {/* ─── Nickname — mb-7 (28px) ─── */}
        <motion.p
          className="text-base md:text-lg text-text-secondary mb-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: showNickname ? 1 : 0,
            y: showNickname ? 0 : 12,
          }}
          transition={{ duration: 0.5, ease }}
        >
          You can also call me{" "}
          <span
            className="relative inline-block cursor-default"
            onMouseEnter={() => setActiveTooltip("yman")}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <span className="text-gradient font-semibold">&ldquo;Yman&rdquo;</span>
            <motion.span
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg shadow-lg z-50 pointer-events-none"
              initial={false}
              animate={{
                opacity: activeTooltip === "yman" ? 1 : 0,
                y: activeTooltip === "yman" ? 0 : 4,
                scale: activeTooltip === "yman" ? 1 : 0.92,
              }}
              transition={{ duration: 0.15, ease }}
            >
              Nickname from friends &amp; colleagues
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45" />
            </motion.span>
          </span>
        </motion.p>

        {/* ─── Badges — mb-12 (48px) ─── */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
          initial="hidden"
          animate={showBadges ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          {roles.map((role) => (
            <motion.span
              key={role.label}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium
                bg-white/70 dark:bg-white/[0.06]
                border border-black/[0.06] dark:border-white/[0.08]
                shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]
                backdrop-blur-md
                text-text-primary dark:text-white/90
                transition-all duration-[250ms] ease-out
                hover:-translate-y-[3px] hover:scale-[1.03]
                hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)]
                cursor-default"
              variants={{
                hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.4, ease }}
            >
              <role.icon className="w-4 h-4 opacity-60" />
              {role.label}
            </motion.span>
          ))}
        </motion.div>

        {/* ─── Divider ─── */}
        <motion.div
          className="w-12 h-px bg-black/10 dark:bg-white/10 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: showCTA ? 1 : 0, scaleX: showCTA ? 1 : 0 }}
          transition={{ duration: 0.5, ease }}
        />

        {/* ─── CTA — mb-8 (32px) ─── */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showCTA ? 1 : 0, y: showCTA ? 0 : 12 }}
          transition={{ duration: 0.5, ease }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-medium text-sm text-white
              bg-gradient-to-r from-apple-blue to-apple-blue-dark
              shadow-[0_2px_12px_rgba(0,122,255,0.25)] dark:shadow-[0_2px_16px_rgba(0,122,255,0.3)]
              transition-all duration-300 ease-out
              hover:-translate-y-0.5 hover:scale-[1.02]
              hover:shadow-[0_6px_24px_rgba(0,122,255,0.35)] dark:hover:shadow-[0_6px_24px_rgba(0,122,255,0.4)]"
          >
            View Portfolio
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* ─── Divider ─── */}
        <motion.div
          className="w-12 h-px bg-black/10 dark:bg-white/10 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: showSocial ? 1 : 0, scaleX: showSocial ? 1 : 0 }}
          transition={{ duration: 0.5, ease }}
        />

        {/* ─── Social Links — frosted glass pills ─── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
          initial="hidden"
          animate={showSocial ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
          }}
        >
          {socialLinks.map((link) => (
            <motion.div
              key={link.label}
              className="relative"
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease }}
              onMouseEnter={() => setActiveTooltip(link.label)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                  bg-white/60 dark:bg-white/[0.05]
                  border border-black/[0.06] dark:border-white/[0.07]
                  shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.15)]
                  backdrop-blur-md
                  text-text-secondary hover:text-text-primary
                  transition-all duration-[250ms] ease-out
                  hover:-translate-y-[2px] hover:scale-[1.03]
                  hover:border-black/[0.12] dark:hover:border-white/[0.14]
                  hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </a>
              <motion.span
                className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 text-[11px] font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md shadow-lg z-50 pointer-events-none"
                initial={false}
                animate={{
                  opacity: activeTooltip === link.label ? 1 : 0,
                  y: activeTooltip === link.label ? 0 : 4,
                  scale: activeTooltip === link.label ? 1 : 0.92,
                }}
                transition={{ duration: 0.15, ease }}
              >
                {link.label}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSocial ? 0.5 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-xs text-text-tertiary uppercase tracking-widest">
            Scroll to Explore
          </span>
          {reducedMotion ? (
            <ArrowDown className="w-4 h-4 text-text-tertiary" />
          ) : (
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-4 h-4 text-text-tertiary" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
