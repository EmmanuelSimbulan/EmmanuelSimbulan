"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { projects } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/utils/animations";

export function ProjectsSection() {
  return (
    <SectionWrapper
      id="projects"
      title="Featured Projects"
      subtitle="A selection of projects I'm proud of"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="group rounded-3xl bg-surface-secondary/30 border border-border hover:border-apple-blue/20 overflow-hidden transition-all duration-500"
            variants={staggerItem}
            whileHover={{ y: -4 }}
          >
            {/* Image */}
            <div className="relative h-48 bg-gradient-to-br from-apple-blue/10 to-apple-purple/10 flex items-center justify-center">
              <span className="text-6xl opacity-20">
                {project.featured ? "🚀" : "📦"}
              </span>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-apple-blue transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-medium bg-surface-secondary rounded-full text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Business impact */}
              {project.impact && (
                <p className="text-xs text-apple-green font-medium mb-4">
                  {project.impact}
                </p>
              )}

              {/* Links */}
              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-apple-blue transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    Code
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-apple-blue transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
