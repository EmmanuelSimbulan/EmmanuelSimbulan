"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { appleEase } from "@/utils/animations";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Logo } from "./Logo";

// Scattered positions for the floating nav bubbles (hand-placed, not random, so
// server/client markup matches — kept clear of the hero title and building cluster).
const bubblePositions = [
  { top: "18%", left: "8%" },
  { top: "40%", left: "5%" },
  { top: "64%", left: "10%" },
  { top: "15%", left: "89%" },
  { top: "40%", left: "92%" },
  { top: "64%", left: "88%" },
  { top: "84%", left: "50%" },
];

const droplets = [
  { dx: -30, dy: -18 },
  { dx: 28, dy: -22 },
  { dx: -22, dy: 24 },
  { dx: 26, dy: 20 },
  { dx: 0, dy: -34 },
];

// Loose random-walk paths (hand-authored, not Math.random — keeps SSR/client markup
// identical). Each bubble drifts through its own loop of offsets from its base spot,
// at its own pace, so they wander independently instead of bobbing in place.
const wanderPaths = [
  { x: [0, 45, -25, 35, 0], y: [0, -40, 25, -18, 0], duration: 9 },
  { x: [0, -35, 40, -15, 0], y: [0, 35, -30, 18, 0], duration: 10.5 },
  { x: [0, 30, -40, 22, 0], y: [0, -22, 35, -12, 0], duration: 8 },
  { x: [0, -40, 22, -32, 0], y: [0, 28, -32, 12, 0], duration: 11 },
  { x: [0, 35, -28, 18, 0], y: [0, -32, 22, -22, 0], duration: 9.5 },
  { x: [0, -22, 38, -28, 0], y: [0, 22, -18, 28, 0], duration: 10 },
  { x: [0, 38, -22, 28, -38, 0], y: [0, -22, -38, 12, -25, 0], duration: 12 },
];

function FloatingNavBubbles({
  visible,
  activeSection,
  onNavigate,
}: {
  visible: boolean;
  activeSection: string;
  onNavigate: (href: string) => void;
}) {
  const [burstingHref, setBurstingHref] = useState<string | null>(null);

  function handleClick(e: React.MouseEvent, href: string) {
    e.preventDefault();
    if (burstingHref) return;
    setBurstingHref(href);
    setTimeout(() => {
      onNavigate(href);
      setBurstingHref(null);
    }, 420);
  }

  return (
    <div
      className={cn(
        "hidden md:block fixed inset-0 z-40 transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-hidden={!visible}
    >
      {siteConfig.navItems.map((item, index) => {
        const pos = bubblePositions[index % bubblePositions.length];
        const path = wanderPaths[index % wanderPaths.length];
        const isActive = activeSection === item.href.replace("#", "");
        const isBursting = burstingHref === item.href;

        return (
          <motion.a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-[11px] font-medium text-center leading-tight px-2 cursor-pointer"
            style={{
              top: pos.top,
              left: pos.left,
              width: 92,
              height: 92,
              background:
                "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.18) 25%, rgba(79,224,212,0.2) 60%, rgba(79,224,212,0.05) 100%)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5), 0 6px 18px rgba(30,167,232,0.2)",
              color: isActive ? "var(--color-accent)" : "var(--color-text-primary)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              isBursting
                ? { opacity: 0, scale: 1.7 }
                : visible
                  ? { opacity: 1, scale: 1, x: path.x, y: path.y }
                  : { opacity: 0, scale: 0.5 }
            }
            transition={
              isBursting
                ? { duration: 0.4, ease: "easeOut" }
                : {
                    opacity: { duration: 0.4, delay: index * 0.06 },
                    scale: { duration: 0.4, delay: index * 0.06 },
                    x: { duration: path.duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                    y: { duration: path.duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                  }
            }
            whileHover={!isBursting ? { scale: 1.12 } : undefined}
          >
            <span
              className="absolute rounded-full bg-white/80 pointer-events-none"
              style={{ width: 14, height: 7, top: 14, left: 22, transform: "rotate(-30deg)" }}
            />
            <span className="relative">{item.label}</span>

            {isBursting &&
              droplets.map((d, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-accent-light/70 pointer-events-none"
                  style={{ width: 6, height: 6, top: "50%", left: "50%" }}
                  initial={{ opacity: 0.9, x: 0, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, x: d.dx, y: d.dy, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
              ))}
          </motion.a>
        );
      })}
    </div>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const sectionIds = useMemo(
    () => siteConfig.navItems.map((item) => item.href.replace("#", "")),
    []
  );
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function navigateTo(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <FloatingNavBubbles visible={!isScrolled} activeSection={activeSection} onNavigate={navigateTo} />

      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "glass-strong shadow-sm"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2.5 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Logo size="sm" />
            <span className="text-base font-semibold text-text-primary hidden sm:inline">
              Emmanuel
            </span>
          </motion.a>

          {/* Desktop Nav — hidden while the floating bubbles are showing, fades in once scrolled */}
          <motion.div
            className="hidden md:flex items-center gap-1"
            animate={{ opacity: isScrolled ? 1 : 0 }}
            transition={{ duration: 0.4, ease: appleEase }}
            style={{ pointerEvents: isScrolled ? "auto" : "none" }}
          >
            {siteConfig.navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-1.5 text-sm transition-colors rounded-lg hover:bg-surface-secondary/50",
                    isActive
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-accent"
                      transition={{ duration: 0.3, ease: appleEase }}
                    />
                  )}
                </a>
              );
            })}
          </motion.div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-secondary/50 transition-colors text-text-secondary hover:text-text-primary"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <span className="text-lg">☀️</span>
                ) : (
                  <span className="text-lg">🌙</span>
                )}
              </button>
            )}

            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="aero-gloss hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent rounded-xl hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
            >
              <span className="relative z-10">Resume</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl hover:bg-surface-secondary/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-0 right-0 glass-strong border-b border-border shadow-xl"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-4 px-6 flex flex-col gap-1">
                {siteConfig.navItems.map((item) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "px-4 py-3 text-base font-medium hover:bg-surface-secondary/50 rounded-xl transition-all",
                        isActive
                          ? "text-accent"
                          : "text-text-secondary hover:text-text-primary"
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aero-gloss mt-2 px-4 py-3 text-base font-medium text-white bg-accent rounded-xl text-center"
                >
                  <span className="relative z-10">Resume</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
