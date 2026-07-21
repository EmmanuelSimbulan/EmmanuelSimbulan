"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { fadeInUp, staggerContainer } from "@/utils/animations";

export function CurrentlyDoingSection() {
  return (
    <SectionWrapper
      id="currently"
      title="Currently"
      subtitle="What I'm focused on right now"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Work */}
        <motion.div
          className="p-6 rounded-3xl bg-surface-secondary/30 border border-border"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💼</span>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Working On
            </h3>
          </div>
          <ul className="space-y-2">
            {[
              "Leading requirements for enterprise projects",
              "Building internal dashboards",
              "Agile sprint collaboration",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-apple-blue mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Learning */}
        <motion.div
          className="p-6 rounded-3xl bg-surface-secondary/30 border border-border"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📚</span>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Learning
            </h3>
          </div>
          <ul className="space-y-2">
            {[
              "Advanced System Design",
              "Cloud Architecture (Azure & AWS)",
              "Production Next.js patterns",
              "AI integration in apps",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-apple-green mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Goals */}
        <motion.div
          className="p-6 rounded-3xl bg-surface-secondary/30 border border-border"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🎯</span>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Goals
            </h3>
          </div>
          <ul className="space-y-2">
            {[
              "Become a world-class Software Engineer",
              "Lead a major product initiative",
              "Contribute to open source",
              "Speak at a tech conference",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-apple-purple mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Reading */}
        <motion.div
          className="p-6 rounded-3xl bg-surface-secondary/30 border border-border"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📖</span>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Reading
            </h3>
          </div>
          <ul className="space-y-2">
            {[
              "Clean Architecture — Robert C. Martin",
              "The Pragmatic Programmer",
              "Atomic Habits — James Clear",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-apple-orange mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Gym */}
        <motion.div
          className="p-6 rounded-3xl bg-surface-secondary/30 border border-border"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🏋️</span>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Fitness
            </h3>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            Currently on a Push-Pull-Legs split. Focused on progressive
            overload and consistency. Building strength and discipline—one rep
            at a time.
          </p>
        </motion.div>

        {/* Life Update */}
        <motion.div
          className="p-6 rounded-3xl bg-surface-secondary/30 border border-border"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✨</span>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Life
            </h3>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            Embracing the journey of growth. Every day is an opportunity to be
            1% better. Dreaming of visiting Japan and watching FC Barcelona at
            Camp Nou.
          </p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
