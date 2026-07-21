"use client";

import { motion } from "framer-motion";

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Resume</h1>
              <p className="text-lg text-text-secondary">
                Emmanuel Simbulan — Business Analyst & Software Engineer
              </p>
            </div>
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 bg-apple-blue text-white rounded-xl font-medium text-sm hover:bg-apple-blue-dark transition-all duration-300 hover:shadow-lg hover:shadow-apple-blue/25"
            >
              Download PDF
            </a>
          </div>

          {/* Resume Content */}
          <div className="p-8 md:p-12 rounded-3xl bg-surface-secondary/30 border border-border">
            <div className="space-y-12">
              {/* Header */}
              <div className="text-center border-b border-border pb-8">
                <h2 className="text-2xl font-bold mb-1">Emmanuel Simbulan</h2>
                <p className="text-text-secondary">
                  Business Analyst • Software Engineer
                </p>
                <p className="text-sm text-text-tertiary mt-2">
                  emmanuel.simbulan@email.com • Philippines
                </p>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-blue mb-4">
                  Professional Summary
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Business Analyst with a passion for software engineering.
                  Experienced in bridging business needs with technology
                  solutions. Skilled in requirements gathering, process
                  improvement, and Agile methodologies. Continuously growing
                  technical expertise in full-stack development.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-blue mb-4">
                  Experience
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-base font-semibold">
                        Business Analyst
                      </h4>
                      <span className="text-xs text-text-tertiary">
                        Present
                      </span>
                    </div>
                    <p className="text-sm text-apple-blue mb-2">
                      Current Role
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="w-1 h-1 rounded-full bg-text-tertiary mt-2 flex-shrink-0" />
                        Leading requirements elicitation for enterprise projects
                      </li>
                      <li className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="w-1 h-1 rounded-full bg-text-tertiary mt-2 flex-shrink-0" />
                        Reduced reporting time by 60% through process automation
                      </li>
                      <li className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="w-1 h-1 rounded-full bg-text-tertiary mt-2 flex-shrink-0" />
                        Facilitating Agile ceremonies and stakeholder workshops
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-blue mb-4">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Python",
                    "Java",
                    "PostgreSQL",
                    "MongoDB",
                    "SQL",
                    "Git",
                    "Docker",
                    "Azure",
                    "AWS",
                    "Figma",
                    "Jira",
                    "Confluence",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs bg-surface-secondary rounded-full text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-blue mb-4">
                  Education
                </h3>
                <div>
                  <h4 className="text-base font-semibold">
                    Bachelor&apos;s Degree
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Information Technology / Computer Science
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
