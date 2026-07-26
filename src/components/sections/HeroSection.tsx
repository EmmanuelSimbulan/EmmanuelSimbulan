"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/config/site";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const titles = ["Business Analyst", "Software Engineer", "Problem Solver"];

const headingWords = ["Hi,", "I'm", "Emmanuel", "Robledo", "Simbulan."];

export function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [showNickname, setShowNickname] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const t0 = setTimeout(() => setPageReady(true), 200);
    const t1 = setTimeout(() => setShowNickname(true), 1600);
    const t2 = setTimeout(() => setShowDesc(true), 2600);
    const t3 = setTimeout(() => setShowButtons(true), 3000);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [inView]);

  // Title rotation
  useEffect(() => {
    if (!showDesc) return;
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showDesc]);

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

      <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Profile */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
          animate={{ opacity: pageReady ? 1 : 0, scale: pageReady ? 1 : 0.85, filter: pageReady ? "blur(0px)" : "blur(12px)" }}
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

        {/* Main Heading — word stagger, permanent */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-5">
          {headingWords.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.3em] ${
                i >= 2
                  ? "text-gradient"
                  : "text-text-primary dark:text-white"
              }`}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{
                opacity: pageReady ? 1 : 0,
                y: pageReady ? 0 : 40,
                filter: pageReady ? "blur(0px)" : "blur(10px)",
              }}
              transition={{
                delay: 0.6 + i * 0.1,
                duration: 0.7,
                type: "spring",
                stiffness: 80,
                damping: 15,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Nickname */}
        <motion.p
          className="text-base md:text-lg text-text-secondary mb-10"
          initial={{ opacity: 0, y: 15, scale: 0.97 }}
          animate={{
            opacity: showNickname ? 1 : 0,
            y: showNickname ? 0 : 15,
            scale: showNickname ? 1 : 0.97,
          }}
          transition={{ duration: 0.6, ease }}
        >
          You can also call me{" "}
          <span
            className="relative inline-block cursor-default"
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
          >
            <span className="text-gradient font-semibold">&ldquo;Yman&rdquo;</span>
            <motion.span
              className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg shadow-lg z-50 pointer-events-none"
              initial={false}
              animate={{
                opacity: tooltip ? 1 : 0,
                y: tooltip ? 0 : 4,
                scale: tooltip ? 1 : 0.92,
              }}
              transition={{ duration: 0.15, ease }}
            >
              Nickname from friends &amp; colleagues 👋
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45" />
            </motion.span>
          </span>
        </motion.p>

        {/* Rotating Titles */}
        <div className="h-8 mb-8 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={titleIndex}
              className="text-lg md:text-xl font-semibold text-text-primary dark:text-white"
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease }}
            >
              {titles[titleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-[650px] mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: showDesc ? 1 : 0, y: showDesc ? 0 : 15 }}
          transition={{ duration: 0.6, ease }}
        >
          I bridge business strategy and software engineering to design
          meaningful digital experiences and build solutions that make
          technology simpler, smarter, and more human.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          animate={{
            opacity: showButtons ? 1 : 0,
            y: showButtons ? 0 : 15,
            scale: showButtons ? 1 : 0.95,
          }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
        >
          <a
            href="#projects"
            className="flex items-center gap-2 px-7 py-3.5 bg-apple-blue text-white rounded-xl font-medium text-sm transition-all duration-300 hover:bg-apple-blue-dark hover:shadow-lg hover:shadow-apple-blue/25 hover:scale-105"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-7 py-3.5 bg-surface-secondary hover:bg-surface-secondary/80 text-text-primary rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-md hover:scale-105"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showButtons ? 0.6 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-xs text-text-tertiary uppercase tracking-widest">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-text-tertiary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
