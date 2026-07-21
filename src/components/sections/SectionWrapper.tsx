"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { cn } from "@/lib/cn";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function SectionWrapper({
  id,
  children,
  className,
  title,
  subtitle,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("section-padding", className)}>
      <div className="max-w-6xl mx-auto px-6">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {title && (
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
                variants={fadeInUp}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                className="text-lg text-text-secondary max-w-2xl mx-auto"
                variants={fadeInUp}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
