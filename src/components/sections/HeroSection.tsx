"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const greetings = ["Hi, I'm", "Hola, soy", "Bonjour, je suis", "안녕하세요, 저는"];

const titles = ["Business Analyst", "Software Engineer", "Problem Solver"];

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
  const [titleIndex, setTitleIndex] = useState(0);
  const [showNickname, setShowNickname] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
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
        setShowDesc(true);
        setShowButtons(true);
        setShowSocial(true);
      }
      return;
    }
    const t1 = setTimeout(() => setShowNickname(true), 1600);
    const t2 = setTimeout(() => setShowDesc(true), 2400);
    const t3 = setTimeout(() => setShowButtons(true), 3000);
    const t4 = setTimeout(() => setShowSocial(true), 3400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [pageReady, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setGreetingIndex((prev) => (prev + 1) % greetings.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (!showDesc || reducedMotion) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showDesc, reducedMotion]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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

      {/* Wide container — enough room for full name on one line */}
      <div className="w-full max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Profile */}
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

        {/* ─── Greeting — sized to longest phrase ─── */}
        <div
          className="relative flex items-center justify-center mb-2"
          style={{ height: "1.2em", overflow: "visible" }}
        >
          {/* Invisible sizer — sets width to longest greeting */}
          <span
            className="invisible whitespace-nowrap text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            aria-hidden="true"
          >
            Bonjour, je suis
          </span>

          {/* Animated greeting — positioned over sizer */}
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

        {/* ─── Name — one line, never wraps, never moves ─── */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-5 whitespace-nowrap"
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

        {/* Nickname */}
        <motion.p
          className="text-base md:text-lg text-text-secondary mb-10"
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

        {/* Rotating Title */}
        <div className="h-8 mb-8 flex items-center justify-center">
          {reducedMotion ? (
            <span className="text-lg md:text-xl font-semibold text-text-primary dark:text-white">
              {titles[0]}
            </span>
          ) : (
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                className="text-lg md:text-xl font-semibold text-text-primary dark:text-white"
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.45, ease }}
              >
                {titles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          )}
        </div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-[650px] mb-12"
          style={{ textWrap: "balance" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showDesc ? 1 : 0, y: showDesc ? 0 : 12 }}
          transition={{ duration: 0.5, ease }}
        >
          I bridge business strategy and software engineering to design
          meaningful digital experiences and build solutions that make
          technology simpler, smarter, and more human.
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 12 }}
          transition={{ duration: 0.5, ease }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-8 py-4 bg-apple-blue text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-apple-blue-dark hover:shadow-lg hover:shadow-apple-blue/25 hover:scale-105"
          >
            View Portfolio
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16"
          initial="hidden"
          animate={showSocial ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
          }}
        >
          {socialLinks.map((link) => (
            <motion.div
              key={link.label}
              className="relative"
              variants={fadeUp}
              transition={{ duration: 0.4, ease }}
              onMouseEnter={() => setActiveTooltip(link.label)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary hover:bg-surface-secondary/80 text-text-secondary hover:text-text-primary rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <link.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{link.label}</span>
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
          animate={{ opacity: showSocial ? 0.6 : 0 }}
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
