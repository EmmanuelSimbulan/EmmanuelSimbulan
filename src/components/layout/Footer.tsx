"use client";

import { Heart } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface-secondary/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-apple-blue flex items-center justify-center">
                <span className="text-white text-sm font-bold">E</span>
              </div>
              <span className="text-base font-semibold">
                Emmanuel Simbulan
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Business Analyst & Software Engineer building technology that
              connects business and people.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-text-primary">
              Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {siteConfig.navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-text-secondary hover:text-apple-blue transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-text-primary">
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-secondary hover:bg-apple-blue hover:text-white text-text-secondary transition-all duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-secondary hover:bg-apple-blue hover:text-white text-text-secondary transition-all duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/${siteConfig.twitter.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-secondary hover:bg-apple-blue hover:text-white text-text-secondary transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-secondary hover:bg-apple-blue hover:text-white text-text-secondary transition-all duration-300"
                aria-label="Email"
              >
                <MdEmail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            © {currentYear} Emmanuel Simbulan. All rights reserved.
          </p>
          <p className="text-xs text-text-tertiary flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-apple-red fill-apple-red" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
