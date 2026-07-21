"use client";

import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-text-secondary mb-12">
            Thoughts on technology, business, and continuous growth.
          </p>

          <div className="space-y-8">
            {[
              {
                title: "Bridging Business and Code",
                description:
                  "Why analysts should learn to program and how it makes you more effective.",
                date: "Jan 10, 2025",
                tags: ["Career", "Business Analysis"],
              },
              {
                title: "The Agile Mindset",
                description:
                  "True agility is a philosophy, not a framework.",
                date: "Dec 20, 2024",
                tags: ["Agile", "Methodology"],
              },
              {
                title: "Building Software with Purpose",
                description:
                  "Understanding the 'why' behind every feature.",
                date: "Nov 15, 2024",
                tags: ["Engineering", "Product"],
              },
            ].map((post, index) => (
              <motion.article
                key={post.title}
                className="p-8 rounded-3xl bg-surface-secondary/30 border border-border hover:border-apple-blue/20 transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-text-tertiary">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-text-primary mb-2 group-hover:text-apple-blue transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-text-secondary mb-4">
                  {post.description}
                </p>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] bg-surface-secondary rounded-full text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
