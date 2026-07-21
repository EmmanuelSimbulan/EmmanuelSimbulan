"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { experiences } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/utils/animations";

export function ExperienceSection() {
  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="Where I've made an impact"
    >
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            className="p-8 md:p-10 rounded-3xl bg-surface-secondary/30 border border-border hover:border-apple-blue/20 transition-all duration-500 group"
            variants={staggerItem}
            whileHover={{ y: -2 }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-apple-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-apple-blue/20 transition-colors">
                <Briefcase className="w-5 h-5 text-apple-blue" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-1">
                  {exp.title}
                </h3>
                <p className="text-sm text-apple-blue font-medium">
                  {exp.company} • {exp.period}
                </p>
                <p className="text-base text-text-secondary mt-3 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Responsibilities */}
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  Responsibilities
                </h4>
                <ul className="space-y-2.5">
                  {exp.responsibilities.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-apple-blue mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  Achievements
                </h4>
                <ul className="space-y-2.5">
                  {exp.achievements.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <CheckCircle className="w-4 h-4 text-apple-green mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {exp.technologies && (
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-surface-secondary rounded-full text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
