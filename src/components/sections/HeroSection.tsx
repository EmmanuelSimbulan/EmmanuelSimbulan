"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { siteConfig } from "@/config/site";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection() {
  const [showNickname, setShowNickname] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setShowNickname(true), 2800);
    const t2 = setTimeout(() => setShowDesc(true), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/5 dark:bg-apple-blue/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-apple-purple/5 dark:bg-apple-purple/10 rounded-full blur-3xl animate-blob-delay-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-apple-teal/3 dark:bg-apple-teal/5 rounded-full blur-3xl animate-blob-delay-4" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Profile */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <div className="relative">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-apple-blue to-apple-purple p-[3px] shadow-2xl shadow-apple-blue/20">
              <div className="w-full h-full rounded-full bg-surface-primary dark:bg-black overflow-hidden">
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
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-apple-green rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
        </motion.div>

        {/* "Hi, I'm" — stays visible throughout */}
        <motion.p
          className="text-base md:text-lg text-text-secondary mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease }}
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name crossfade */}
        <div className="relative h-[110px] md:h-[140px] lg:h-[160px] flex items-center justify-center mb-6">
          {/* Emmanuel Simbulan */}
          <motion.h1
            className="absolute inset-0 flex flex-col items-center justify-center text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: showNickname ? 0 : 1,
              y: showNickname ? -20 : 0,
              filter: showNickname ? "blur(8px)" : "blur(0px)",
            }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="text-gradient">Emmanuel</span>
            <span className="text-text-primary dark:text-white">Simbulan</span>
          </motion.h1>

          {/* You can call me Yman */}
          <motion.h1
            className="absolute inset-0 flex flex-col items-center justify-center text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{
              opacity: showNickname ? 1 : 0,
              y: showNickname ? 0 : 30,
              filter: showNickname ? "blur(0px)" : "blur(8px)",
            }}
            transition={{ duration: 0.6, ease, delay: showNickname ? 0.15 : 0 }}
          >
            <span className="text-sm md:text-base lg:text-lg font-medium text-text-secondary mb-2 normal-case tracking-normal">
              You can call me
            </span>
            <span className="text-gradient">
              <span
                className="relative cursor-default"
                onMouseEnter={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
              >
                Yman
                <AnimatePresence>
                  {tooltip && (
                    <motion.span
                      className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg shadow-lg z-50 pointer-events-none"
                      initial={{ opacity: 0, y: 4, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.92 }}
                      transition={{ duration: 0.15, ease }}
                    >
                      Nickname from friends &amp; colleagues 👋
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>
        </div>

        {/* Titles */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5, ease }}
        >
          <span className="px-4 py-2 bg-apple-blue/10 text-apple-blue rounded-full text-sm font-medium">
            Business Analyst
          </span>
          <span className="px-4 py-2 bg-apple-purple/10 text-apple-purple rounded-full text-sm font-medium">
            Software Engineer
          </span>
        </motion.div>

        {/* Description */}
        <motion.div
          className="max-w-xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showDesc ? 1 : 0,
            y: showDesc ? 0 : 20,
          }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            I&apos;m Emmanuel, a{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-medium text-text-primary dark:text-white">
                Business Analyst
              </span>
              <span className="absolute bottom-0.5 left-0 right-0 h-px bg-apple-blue/30" />
            </span>{" "}
            who fell in love with the art of{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-medium text-text-primary dark:text-white">
                building software
              </span>
              <span className="absolute bottom-0.5 left-0 right-0 h-px bg-apple-purple/30" />
            </span>
            . My journey started with a simple question:{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-medium text-text-primary dark:text-white">
                &quot;How can technology make this better?&quot;
              </span>
              <span className="absolute bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-apple-blue/30 to-apple-purple/30" />
            </span>
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: showDesc ? 1 : 0,
            y: showDesc ? 0 : 15,
          }}
          transition={{ delay: 0.2, duration: 0.5, ease }}
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

        {/* Scroll */}
        <motion.div
          className="flex flex-col items-center gap-2 animate-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: showDesc ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <span className="text-xs text-text-tertiary uppercase tracking-widest">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-text-tertiary" />
        </motion.div>
      </div>
    </section>
  );
}
