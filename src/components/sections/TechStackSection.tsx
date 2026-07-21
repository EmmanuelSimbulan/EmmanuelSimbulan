"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { techStack } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/utils/animations";

export function TechStackSection() {
  return (
    <SectionWrapper
      id="techstack"
      title="Technology Stack"
      subtitle="The tools and technologies I work with"
    >
      <motion.div
        className="flex flex-wrap justify-center gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            className="group relative"
            variants={staggerItem}
          >
            <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-secondary/50 border border-border rounded-xl hover:border-apple-blue/30 hover:bg-apple-blue/5 transition-all duration-300 cursor-default">
              <span className="text-sm font-medium text-text-secondary group-hover:text-apple-blue transition-colors">
                {tech.name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
