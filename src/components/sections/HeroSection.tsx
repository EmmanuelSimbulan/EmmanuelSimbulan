"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { ProfileImage } from "@/components/premium/ProfileImage";
import { Skyline } from "@/components/premium/Skyline";
import { appleEase as ease } from "@/utils/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMouseParallax } from "@/hooks/useMouseParallax";

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

export function HeroSection() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showNickname, setShowNickname] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [showSocial, setShowSocial] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [pageReady, setPageReady] = useState(false);
  const reducedMotion = useReducedMotion();
  const parallaxRef = useMouseParallax<HTMLDivElement>();

  // Fires shortly after mount, independent of scroll position — Hero now sits
  // below the cinematic intro, so it isn't in the viewport at initial load and
  // a scroll-into-view trigger here would leave the fade overlay stuck open.
  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 100);
    return () => clearTimeout(t);
  }, []);

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
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      style={{ height: "100dvh", maxHeight: "1100px" }}
    >
      {/* Page load fade */}
      <motion.div
        className="fixed inset-0 z-[200] bg-surface-primary pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: pageReady ? 0 : 1 }}
        transition={{ duration: 0.8, ease }}
      />

      {/* Background blobs — drift with the cursor, on top of their own float animation */}
      <div ref={parallaxRef} className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96"
          style={reducedMotion ? undefined : { transform: "translate(calc(var(--mx, 0) * 26px), calc(var(--my, 0) * 26px))", transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <div className="w-full h-full bg-accent/10 dark:bg-accent/15 rounded-full blur-3xl animate-blob-float" />
        </div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96"
          style={reducedMotion ? undefined : { transform: "translate(calc(var(--mx, 0) * -34px), calc(var(--my, 0) * -34px))", transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
        >
          <div className="w-full h-full bg-accent-light/10 dark:bg-accent-light/15 rounded-full blur-3xl animate-blob-float-delay-2" />
        </div>
        <div
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px]"
          style={
            reducedMotion
              ? { transform: "translate(-50%, -50%)" }
              : { transform: "translate(calc(-50% + var(--mx, 0) * 18px), calc(-50% + var(--my, 0) * 18px))", transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }
          }
        >
          <div className="w-full h-full bg-leaf/5 dark:bg-leaf/8 rounded-full blur-3xl animate-blob-float-delay-4" />
        </div>
        <Skyline />
      </div>

      {/* ─── Hero content — vertical flex stack, centered ─── */}
      <div className="relative z-10 w-full mx-auto flex flex-col items-center text-center" style={{ maxWidth: "1280px", paddingInline: "32px", overflow: "visible" }}>

        {/* Top spacer — pushes content below nav */}
        <div className="shrink-0" style={{ height: "clamp(48px, 6vw, 72px)" }} />

        {/* ─── Profile Picture ─── */}
        <div className="shrink-0" style={{ marginBottom: "clamp(24px, 3vw, 36px)" }}>
          <ProfileImage delay={0.3} />
        </div>

        {/* ─── Greeting ─── */}
        <div
          className="shrink-0 relative flex items-center justify-center"
          style={{ height: "1.3em", overflow: "visible", marginBottom: "clamp(12px, 1.5vw, 20px)" }}
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

        {/* ─── Name — nowrap on desktop, wraps on mobile ─── */}
        <div className="shrink-0 w-full" style={{ maxWidth: "1000px", marginBottom: "clamp(16px, 2vw, 28px)" }}>
          <motion.h1
            className="text-gradient font-[800] tracking-tight leading-[1.05] text-center whitespace-normal lg:whitespace-nowrap"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
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
          </motion.h1>
        </div>

        {/* ─── Nickname ─── */}
        <motion.p
          className="shrink-0 text-text-secondary"
          style={{ fontSize: "clamp(0.8rem, 1.2vw, 1.05rem)", marginBottom: "clamp(20px, 2.5vw, 32px)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showNickname ? 1 : 0, y: showNickname ? 0 : 10 }}
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
          className="shrink-0 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
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
              className="glass inline-flex items-center gap-2 rounded-full font-medium text-text-primary transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:scale-[1.03] cursor-default"
              style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)", padding: "clamp(8px, 1vw, 12px) clamp(14px, 1.5vw, 24px)" }}
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
          className="shrink-0 w-10 h-px bg-black/10 dark:bg-white/10"
          style={{ marginBottom: "clamp(20px, 2.5vw, 32px)" }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: showCTA ? 1 : 0, scaleX: showCTA ? 1 : 0 }}
          transition={{ duration: 0.5, ease }}
        />

        {/* ─── CTA ─── */}
        <motion.div
          className="shrink-0"
          style={{ marginBottom: "clamp(20px, 2.5vw, 32px)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showCTA ? 1 : 0, y: showCTA ? 0 : 10 }}
          transition={{ duration: 0.5, ease }}
        >
          <a
            href="#projects"
            className="group aero-gloss inline-flex items-center gap-2.5 rounded-full font-medium text-sm text-white bg-gradient-to-r from-accent to-accent-dark shadow-[0_2px_12px_rgba(30,167,232,0.3)] dark:shadow-[0_2px_16px_rgba(30,167,232,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_6px_24px_rgba(30,167,232,0.4)] dark:hover:shadow-[0_6px_24px_rgba(30,167,232,0.45)]"
            style={{ padding: "clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 36px)" }}
          >
            <span className="relative z-10">View Portfolio</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* ─── Divider ─── */}
        <motion.div
          className="shrink-0 w-10 h-px bg-black/10 dark:bg-white/10"
          style={{ marginBottom: "clamp(20px, 2.5vw, 32px)" }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: showSocial ? 1 : 0, scaleX: showSocial ? 1 : 0 }}
          transition={{ duration: 0.5, ease }}
        />

        {/* ─── Social Links ─── */}
        <motion.div
          className="shrink-0 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
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
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.4, ease }}
              onMouseEnter={() => setActiveTooltip(link.label)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="glass inline-flex items-center gap-2 rounded-full font-medium text-text-secondary hover:text-text-primary transition-all duration-[250ms] ease-out hover:-translate-y-[2px] hover:scale-[1.03]"
                style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)", padding: "clamp(8px, 1vw, 10px) clamp(14px, 1.5vw, 20px)" }}
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
          className="shrink-0 flex flex-col items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: showSocial ? 0.5 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-[10px] sm:text-[11px] text-text-tertiary uppercase tracking-widest">Scroll to Explore</span>
          {reducedMotion ? (
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-tertiary" />
          ) : (
            <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-text-tertiary" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
