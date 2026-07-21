"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { skillCategories } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/utils/animations";

export function SkillsSection() {
  return (
    <SectionWrapper
      id="skills"
      title="Skills"
      subtitle="A comprehensive toolkit built through experience and continuous learning"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.name}
            className="p-6 rounded-3xl bg-surface-secondary/30 border border-border hover:border-apple-blue/20 transition-all duration-500 group"
            variants={staggerItem}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-base font-semibold text-text-primary">
                {category.name}
              </h3>
            </div>

            <div className="space-y-3.5">
              {category.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-text-secondary">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-medium text-text-tertiary">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-apple-blue rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.2,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
