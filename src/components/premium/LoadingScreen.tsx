"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { appleEase } from "@/utils/animations";
import { Logo } from "@/components/layout/Logo";

const risingBubbles = [
  { size: 14, left: "12%", duration: 3.4, delay: 0 },
  { size: 24, left: "24%", duration: 4.2, delay: 0.6 },
  { size: 10, left: "38%", duration: 2.8, delay: 1.3 },
  { size: 18, left: "50%", duration: 3.8, delay: 0.2 },
  { size: 28, left: "62%", duration: 4.6, delay: 1.7 },
  { size: 12, left: "74%", duration: 3.1, delay: 0.9 },
  { size: 20, left: "86%", duration: 3.9, delay: 2.1 },
  { size: 16, left: "6%", duration: 3.5, delay: 2.5 },
  { size: 22, left: "68%", duration: 4, delay: 0.4 },
];

function RisingBubble({ size, left, duration, delay }: (typeof risingBubbles)[number]) {
  return (
    <motion.div
      className="absolute bottom-0 rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        background:
          "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.2) 24%, rgba(79,224,212,0.18) 58%, rgba(79,224,212,0.05) 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)",
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: -560, opacity: [0, 1, 1, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#BFE6FA_0%,#E4F5FD_45%,#FFFFFF_100%)] dark:bg-[linear-gradient(180deg,#071523_0%,#0D2740_50%,#0A1C2B_100%)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
        >
          {risingBubbles.map((b, i) => (
            <RisingBubble key={i} {...b} />
          ))}

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              className="relative"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: [1, 1.07, 1], opacity: 1 }}
              transition={{
                scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.5, ease: appleEase },
              }}
            >
              <Logo size="lg" />
              {/* Soft halo, like light through a bubble wall */}
              <div
                className="absolute -inset-3 -z-10 rounded-full blur-md"
                style={{ background: "radial-gradient(circle, rgba(79,224,212,0.35) 0%, rgba(79,224,212,0) 70%)" }}
              />
            </motion.div>

            <motion.div
              className="w-44 h-2 rounded-full overflow-hidden"
              style={{
                background: "rgba(30,167,232,0.12)",
                boxShadow: "inset 0 1px 3px rgba(6,32,46,0.15), inset 0 0 0 1px rgba(255,255,255,0.3)",
              }}
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 1.4, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
