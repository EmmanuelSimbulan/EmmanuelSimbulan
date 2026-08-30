"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { staggerContainer, staggerItem } from "@/utils/animations";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface-secondary/30">
      <motion.div
        className="max-w-6xl mx-auto px-6 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size="sm" />
              <span className="text-base font-semibold">
                Emmanuel Simbulan
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Business Analyst & Software Engineer building technology that
              connects business and people.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h3 className="text-sm font-semibold mb-4 text-text-primary">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div variants={staggerItem}>
            <h3 className="text-sm font-semibold mb-4 text-text-primary">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <motion.a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-secondary hover:bg-accent hover:text-white text-text-secondary transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-secondary hover:bg-accent hover:text-white text-text-secondary transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={`https://twitter.com/${siteConfig.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-secondary hover:bg-accent hover:text-white text-text-secondary transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={`mailto:${siteConfig.email}`}
                whileHover={{ y: -2 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-secondary hover:bg-accent hover:text-white text-text-secondary transition-all duration-300"
                aria-label="Email"
              >
                <MdEmail className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          variants={staggerItem}
          className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-text-tertiary">
            © {currentYear} Emmanuel Simbulan. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-leaf fill-leaf" /> using Next.js
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
