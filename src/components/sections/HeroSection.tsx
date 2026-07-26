"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { siteConfig } from "@/config/site";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const titleWords = "Hi, I'm Emmanuel Robledo Simbulan.".split(" ");

export function HeroSection() {
  const [showNickname, setShowNickname] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setShowNickname(true), 1400);
    const t2 = setTimeout(() => setShowDesc(true), 2200);
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
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
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

        {/* Main Heading — word stagger, stays forever */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-4">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.3em] ${
                word === "Emmanuel" || word === "Robledo" || word === "Simbulan."
                  ? "text-gradient"
                  : "text-text-primary dark:text-white"
              }`}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.4 + i * 0.12,
                duration: 0.6,
                ease,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Nickname */}
        <motion.p
          className="text-base md:text-lg text-text-secondary mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showNickname ? 1 : 0, y: showNickname ? 0 : 12 }}
          transition={{ duration: 0.5, ease }}
        >
          You can also call me{" "}
          <span
            className="relative inline-block cursor-default"
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
          >
            <span className="text-gradient font-semibold">&ldquo;Yman&rdquo;</span>
            <motion.span
              className="absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 text-xs font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg shadow-lg z-50 pointer-events-none"
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

        {/* Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showDesc ? 1 : 0, y: showDesc ? 0 : 12 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="px-4 py-2 bg-apple-blue/10 text-apple-blue rounded-full text-sm font-medium">
            Business Analyst
          </span>
          <span className="text-text-tertiary hidden sm:inline">•</span>
          <span className="px-4 py-2 bg-apple-purple/10 text-apple-purple rounded-full text-sm font-medium">
            Software Engineer
          </span>
          <span className="text-text-tertiary hidden sm:inline">•</span>
          <span className="px-4 py-2 bg-apple-green/10 text-apple-green rounded-full text-sm font-medium">
            Problem Solver
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showDesc ? 1 : 0, y: showDesc ? 0 : 12 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
        >
          I enjoy bridging business strategy and software engineering to build
          thoughtful, user-centered solutions. From analyzing complex business
          requirements to designing and developing modern applications, I&apos;m
          driven by curiosity, continuous learning, and creating technology that
          makes a meaningful impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: showDesc ? 1 : 0, y: showDesc ? 0 : 12 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
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
          transition={{ duration: 0.5, delay: 0.4 }}
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
