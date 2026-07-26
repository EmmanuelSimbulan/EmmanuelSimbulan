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
      className="relative h-screen max-h-[1100px] min-h-[600px] flex items-center justify-center overflow-hidden"
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-apple-teal/3 dark:bg-apple-teal/5 rounded-full blur-3xl animate-blob-delay-4" />
      </div>

      {/* Main content — visible overflow, wide container */}
      <div
        className="relative w-full mx-auto flex flex-col items-center text-center"
        style={{
          maxWidth: "1200px",
          paddingInline: "clamp(24px, 4vw, 48px)",
          overflow: "visible",
        }}
      >
        {/* Top spacer — breathing room from nav */}
        <div style={{ height: "clamp(20px, 3vw, 40px)" }} />

        {/* Profile */}
        <motion.div
          style={{ marginBottom: "clamp(24px, 3vw, 36px)" }}
          initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
          animate={{
            opacity: pageReady ? 1 : 0,
            scale: pageReady ? 1 : 0.85,
            filter: pageReady ? "blur(0px)" : "blur(12px)",
          }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <div className="relative mx-auto" style={{ width: "clamp(88px, 10vw, 140px)", height: "clamp(88px, 10vw, 140px)" }}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-apple-blue to-apple-purple p-[3px] shadow-2xl shadow-apple-blue/20">
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
            <div
              className="absolute -bottom-0.5 -right-0.5 bg-apple-green rounded-full flex items-center justify-center shadow-md"
              style={{ width: "clamp(20px, 2vw, 28px)", height: "clamp(20px, 2vw, 28px)" }}
            >
              <span className="text-white" style={{ fontSize: "clamp(9px, 1vw, 12px)" }}>✓</span>
            </div>
          </div>
        </motion.div>

        {/* ─── Greeting ─── */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "1.3em",
            overflow: "visible",
            marginBottom: "clamp(10px, 1.5vw, 20px)",
          }}
        >
          <span
            className="invisible whitespace-nowrap font-medium tracking-wide"
            aria-hidden="true"
            style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
          >
            Bonjour, je suis
          </span>

          <AnimatePresence mode="wait">
            <motion.span
              key={greetingIndex}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-medium tracking-wide text-text-tertiary dark:text-white/45"
              style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
              initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
              transition={{ duration: 0.4, ease }}
            >
              {greetings[greetingIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ─── Name — NO whitespace-nowrap, text-wrap: balance ─── */}
        <h1
          className="mx-auto"
          style={{
            maxWidth: "900px",
            marginBottom: "clamp(16px, 2vw, 28px)",
          }}
        >
          <motion.span
            className="text-gradient block font-[800] tracking-tight leading-[1.05]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              textWrap: "balance",
            }}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{
              opacity: pageReady ? 1 : 0,
              y: pageReady ? 0 : 24,
              filter: pageReady ? "blur(0px)" : "blur(8px)",
            }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              type: "spring",
              stiffness: 70,
              damping: 14,
            }}
          >
            Emmanuel Robledo Simbulan
          </motion.span>
        </h1>

        {/* ─── Nickname ─── */}
        <motion.p
          className="text-text-secondary"
          style={{
            fontSize: "clamp(0.8rem, 1.2vw, 1.05rem)",
            marginBottom: "clamp(20px, 2.5vw, 32px)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: showNickname ? 1 : 0,
            y: showNickname ? 0 : 10,
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

        {/* ─── Badges ─── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}
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
              className="inline-flex items-center gap-2 rounded-full font-medium
                bg-white/70 dark:bg-white/[0.06]
                border border-black/[0.06] dark:border-white/[0.08]
                shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]
                backdrop-blur-md
                text-text-primary dark:text-white/90
                transition-all duration-[250ms] ease-out
                hover:-translate-y-[3px] hover:scale-[1.03]
                hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)]
                cursor-default"
              style={{
                fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
                padding: "clamp(8px, 1vw, 12px) clamp(14px, 1.5vw, 24px)",
              }}
              variants={{
                hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.4, ease }}
            >
              <role.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-60" />
              {role.label}
            </motion.span>
          ))}
        </motion.div>

        {/* ─── Divider ─── */}
        <motion.div
          className="w-10 h-px bg-black/10 dark:bg-white/10"
          style={{ marginBottom: "clamp(20px, 2.5vw, 32px)" }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: showCTA ? 1 : 0, scaleX: showCTA ? 1 : 0 }}
          transition={{ duration: 0.5, ease }}
        />

        {/* ─── CTA ─── */}
        <motion.div
          style={{ marginBottom: "clamp(20px, 2.5vw, 32px)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showCTA ? 1 : 0, y: showCTA ? 0 : 10 }}
          transition={{ duration: 0.5, ease }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 rounded-full font-medium text-sm text-white
              bg-gradient-to-r from-apple-blue to-apple-blue-dark
              shadow-[0_2px_12px_rgba(0,122,255,0.25)] dark:shadow-[0_2px_16px_rgba(0,122,255,0.3)]
              transition-all duration-300 ease-out
              hover:-translate-y-0.5 hover:scale-[1.02]
              hover:shadow-[0_6px_24px_rgba(0,122,255,0.35)] dark:hover:shadow-[0_6px_24px_rgba(0,122,255,0.4)]"
            style={{
              padding: "clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 36px)",
            }}
          >
            View Portfolio
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* ─── Divider ─── */}
        <motion.div
          className="w-10 h-px bg-black/10 dark:bg-white/10"
          style={{ marginBottom: "clamp(20px, 2.5vw, 32px)" }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: showSocial ? 1 : 0, scaleX: showSocial ? 1 : 0 }}
          transition={{ duration: 0.5, ease }}
        />

        {/* ─── Social Links ─── */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}
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
                hidden: { opacity: 0, y: 10 },
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
                className="inline-flex items-center gap-2 rounded-full font-medium
                  bg-white/60 dark:bg-white/[0.05]
                  border border-black/[0.06] dark:border-white/[0.07]
                  shadow-[0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.15)]
                  backdrop-blur-md
                  text-text-secondary hover:text-text-primary
                  transition-all duration-[250ms] ease-out
                  hover:-translate-y-[2px] hover:scale-[1.03]
                  hover:border-black/[0.12] dark:hover:border-white/[0.14]
                  hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                style={{
                  fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
                  padding: "clamp(8px, 1vw, 10px) clamp(14px, 1.5vw, 20px)",
                }}
              >
                <link.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
          className="flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSocial ? 0.5 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-[10px] sm:text-[11px] text-text-tertiary uppercase tracking-widest">
            Scroll to Explore
          </span>
          {reducedMotion ? (
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-tertiary" />
          ) : (
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-tertiary" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
