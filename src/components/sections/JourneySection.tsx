"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { timeline } from "@/lib/data";
import { fadeInUp } from "@/utils/animations";

export function JourneySection() {
  return (
    <SectionWrapper
      id="journey"
      title="My Journey"
      subtitle="Every step has led to where I am today"
    >
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        <div className="space-y-12">
          {timeline.map((entry, index) => (
            <motion.div
              key={entry.id}
              className={`relative flex items-start gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  className="w-8 h-8 rounded-full bg-surface-primary dark:bg-black border-2 border-apple-blue flex items-center justify-center shadow-lg shadow-apple-blue/10"
                  whileInView={{ scale: [0.8, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-xs">{entry.icon}</span>
                </motion.div>
              </div>

              {/* Content */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <motion.div
                  className="p-6 rounded-2xl bg-surface-secondary/50 border border-border hover:border-apple-blue/20 transition-colors duration-300"
                  whileHover={{ y: -2 }}
                >
                  <span className="text-xs font-medium text-apple-blue uppercase tracking-wider">
                    {entry.year}
                  </span>
                  <h3 className="text-lg font-semibold mt-2 mb-2 text-text-primary">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {entry.description}
                  </p>
                </motion.div>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
