"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { siteConfig } from "@/config/site";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroSection() {
  const [phase, setPhase] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 2600),
      setTimeout(() => setPhase(3), 3400),
    ];
    return () => timers.forEach(clearTimeout);
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
          transition={{ duration: 0.8, delay: 0.1, ease }}
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

        {/* Greeting */}
        <motion.p
          className="text-base md:text-lg text-text-secondary mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 1 ? 1 : 0 }}
          transition={{ duration: 0.4, ease }}
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name — Emmanuel Simbulan */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8 transition-opacity duration-500"
          style={{ opacity: phase >= 2 ? 0 : 1 }}
        >
          <span className="text-gradient">Emmanuel</span>
          <br />
          <span className="text-text-primary dark:text-white">Simbulan</span>
        </h1>

        {/* Name — You can call me Yman */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-8 transition-opacity duration-500"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            position: phase >= 2 ? "relative" : "absolute",
            pointerEvents: phase >= 2 ? "auto" : "none",
          }}
        >
          <span className="text-sm md:text-base font-medium text-text-secondary block mb-1 normal-case tracking-normal">
            You can call me
          </span>
          <span className="text-gradient">Yman</span>
        </h1>

        {/* Titles */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 12 }}
          transition={{ duration: 0.5, delay: 0.3, ease }}
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 12 }}
          transition={{ duration: 0.5, ease }}
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 12 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
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
          animate={{ opacity: phase >= 3 ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
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
