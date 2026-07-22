"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useRef } from "react";

const appleEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

function CharReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className={`inline-block ${className ?? ""}`}
          initial={{ y: "120%", rotateX: -80, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.7,
            delay: delay + i * staggerDelay,
            ease: appleEase,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          style={{ transformOrigin: "bottom center", perspective: 600 }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

function TextRevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.span
      className="block overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.01 }}
    >
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.9,
          delay,
          ease: appleEase,
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

export function HeroSection() {
  const [phase, setPhase] = useState<"greeting" | "transitioning" | "nickname">("greeting");
  const [showNickname, setShowNickname] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true });

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setPhase("transitioning"), 2200);
    const t2 = setTimeout(() => setShowNickname(true), 2400);
    const t3 = setTimeout(() => setPhase("nickname"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [inView]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/5 dark:bg-apple-blue/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-apple-purple/5 dark:bg-apple-purple/10 rounded-full blur-3xl animate-blob-delay-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-apple-teal/3 dark:bg-apple-teal/5 rounded-full blur-3xl animate-blob-delay-4" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center">

          {/* Profile Image */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: appleEase }}
          >
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-apple-blue to-apple-purple p-1 shadow-2xl shadow-apple-blue/20">
                <div className="w-full h-full rounded-full bg-surface-primary dark:bg-black flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${siteConfig.basePath}/images/profile.jpg`}
                    alt="Emmanuel Simbulan"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `${siteConfig.basePath}/images/profile-placeholder.svg`;
                    }}
                  />
                </div>
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-apple-green rounded-full flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
              >
                <span className="text-white text-sm">✓</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            className="text-base md:text-lg text-text-secondary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: appleEase }}
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name Animation Container */}
          <div className="relative h-[120px] md:h-[140px] lg:h-[160px] mb-6 flex items-center justify-center">
            {/* Emmanuel Simbulan — entering */}
            <AnimatePresence mode="wait">
              {!showNickname && (
                <motion.div
                  key="fullname"
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: appleEase }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                    <span className="block">
                      <CharReveal text="Emmanuel" delay={0.7} />
                    </span>
                    <span className="block text-text-primary dark:text-white">
                      <CharReveal text="Simbulan" delay={1.1} />
                    </span>
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Yman — entering */}
            <AnimatePresence mode="wait">
              {showNickname && (
                <motion.div
                  key="nickname"
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                    <span className="text-gradient block">
                      <CharReveal text="Yman" delay={0} staggerDelay={0.06} />
                    </span>
                  </h1>
                  <motion.p
                    className="text-base md:text-lg text-text-secondary mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: appleEase }}
                  >
                    You can also call me{" "}
                    <span
                      className="relative inline-block cursor-default"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <span className="text-gradient font-semibold">Yman</span>
                      <AnimatePresence>
                        {showTooltip && (
                          <motion.span
                            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-text-primary dark:bg-white text-white dark:text-black rounded-lg shadow-lg pointer-events-none"
                            initial={{ opacity: 0, y: 5, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            transition={{ duration: 0.2, ease: appleEase }}
                          >
                            Nickname from friends & colleagues 👋
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-text-primary dark:bg-white rotate-45" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Titles */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8, ease: appleEase }}
          >
            <span className="px-4 py-2 bg-apple-blue/10 text-apple-blue rounded-full text-sm font-medium">
              Business Analyst
            </span>
            <span className="text-text-tertiary hidden sm:inline">•</span>
            <span className="px-4 py-2 bg-apple-purple/10 text-apple-purple rounded-full text-sm font-medium">
              Software Engineer
            </span>
          </motion.div>

          {/* Description — text reveal */}
          <div className="max-w-xl mb-10">
            <TextRevealLine delay={phase === "nickname" ? 0.6 : 99}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                I&apos;m Emmanuel, a{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 font-medium text-text-primary dark:text-white">
                    Business Analyst
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-px bg-apple-blue/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.4, duration: 0.8, ease: appleEase }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>{" "}
                who fell in love with the art of{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 font-medium text-text-primary dark:text-white">
                    building software
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-px bg-apple-purple/30"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.6, duration: 0.8, ease: appleEase }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
                .
              </p>
            </TextRevealLine>
            <TextRevealLine delay={phase === "nickname" ? 0.9 : 99}>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed mt-2">
                My journey started with a simple question:{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 font-medium text-text-primary dark:text-white">
                    &quot;How can technology make this better?&quot;
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-apple-blue/40 to-apple-purple/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.8, duration: 0.8, ease: appleEase }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>
              </p>
            </TextRevealLine>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: phase === "nickname" ? 1.2 : 99, ease: appleEase }}
          >
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-apple-blue text-white rounded-xl font-medium text-sm hover:bg-apple-blue-dark transition-all duration-300 hover:shadow-lg hover:shadow-apple-blue/25 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-surface-secondary hover:bg-surface-secondary/80 text-text-primary rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-surface-secondary hover:bg-surface-secondary/80 text-text-primary rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 px-6 py-3 bg-surface-secondary hover:bg-surface-secondary/80 text-text-primary rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 animate-scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: phase === "nickname" ? 1.5 : 99, duration: 0.6 }}
          >
            <span className="text-xs text-text-tertiary uppercase tracking-widest">
              Scroll
            </span>
            <ArrowDown className="w-4 h-4 text-text-tertiary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
