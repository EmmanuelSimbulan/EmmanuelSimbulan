"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { siteConfig } from "@/config/site";
import { staggerContainer, fadeInUp } from "@/utils/animations";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/5 dark:bg-apple-blue/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-apple-purple/5 dark:bg-apple-purple/10 rounded-full blur-3xl animate-blob-delay-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-apple-teal/3 dark:bg-apple-teal/5 rounded-full blur-3xl animate-blob-delay-4" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Profile Image */}
          <motion.div
            className="mb-8"
            variants={fadeInUp}
          >
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-apple-blue to-apple-purple p-1 shadow-2xl shadow-apple-blue/20">
                <div className="w-full h-full rounded-full bg-surface-primary dark:bg-black flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/profile.jpg"
                    alt="Emmanuel Simbulan"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/profile-placeholder.svg";
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
            variants={fadeInUp}
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            variants={fadeInUp}
          >
            <span className="text-gradient">Emmanuel</span>
            <br />
            <span className="text-text-primary dark:text-white">Simbulan</span>
          </motion.h1>

          {/* Titles */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 mb-8"
            variants={fadeInUp}
          >
            <span className="px-4 py-2 bg-apple-blue/10 text-apple-blue rounded-full text-sm font-medium">
              Business Analyst
            </span>
            <span className="text-text-tertiary hidden sm:inline">•</span>
            <span className="px-4 py-2 bg-apple-purple/10 text-apple-purple rounded-full text-sm font-medium">
              Software Engineer
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed mb-10"
            variants={fadeInUp}
          >
            Building technology that connects business and people.
            <br />
            <span className="text-text-tertiary">
              Solving problems with empathy, code, and purpose.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
            variants={fadeInUp}
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
            variants={fadeInUp}
          >
            <span className="text-xs text-text-tertiary uppercase tracking-widest">
              Scroll
            </span>
            <ArrowDown className="w-4 h-4 text-text-tertiary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
