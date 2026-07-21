"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { fadeInUp, staggerContainer, fadeIn } from "@/utils/animations";

const beliefs = [
  "Software isn't only about writing code—it's about improving people's lives.",
  "Great products start with understanding the people who use them.",
  "The best engineers combine technical excellence with business empathy.",
  "Continuous learning is not optional—it's a way of life.",
];

export function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="The story behind the code"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left - Story */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.p
            className="text-lg text-text-secondary leading-relaxed"
            variants={fadeInUp}
          >
            {"I'm Emmanuel—a Business Analyst who fell in love with the art of "}
            building software. My journey started with a simple question:{" "}
            <span className="text-text-primary font-medium">
              &quot;How can technology make this better?&quot;
            </span>
          </motion.p>

          <motion.p
            className="text-lg text-text-secondary leading-relaxed"
            variants={fadeInUp}
          >
            That question led me from analyzing business processes to writing
            code, from creating documentation to crafting user interfaces. I
            found my sweet spot at the intersection of business understanding
            and technical implementation.
          </motion.p>

          <motion.p
            className="text-lg text-text-secondary leading-relaxed"
            variants={fadeInUp}
          >
            Today, I bridge the gap between what businesses need and what
            technology can deliver. I believe that the best software comes from
            deeply understanding the problem before writing a single line of
            code.
          </motion.p>

          <motion.p
            className="text-lg text-text-secondary leading-relaxed"
            variants={fadeInUp}
          >
            My goal is simple: become a world-class Software Engineer who builds
            products that genuinely help people—all while combining business
            acumen, product thinking, and engineering excellence.
          </motion.p>
        </motion.div>

        {/* Right - Values & Beliefs */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div
            className="p-8 rounded-3xl bg-surface-secondary/50 border border-border"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-semibold mb-6 text-text-primary">
              What I Believe
            </h3>
            <div className="space-y-4">
              {beliefs.map((belief, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  variants={fadeIn}
                >
                  <div className="w-6 h-6 rounded-full bg-apple-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-apple-blue" />
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {belief}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* MBTI Card */}
          <motion.div
            className="p-6 rounded-3xl bg-gradient-to-br from-apple-blue/5 to-apple-purple/5 border border-border"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🧠</span>
              <h4 className="text-base font-semibold text-text-primary">
                MBTI: ESFJ • Enneagram: 3w2
              </h4>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Approachable, ambitious, and people-oriented. I lead with empathy
              and discipline. Every detail matters. Growth is the default state.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
