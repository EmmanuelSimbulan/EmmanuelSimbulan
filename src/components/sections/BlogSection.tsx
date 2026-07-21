"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { staggerContainer, staggerItem } from "@/utils/animations";

const blogPosts = [
  {
    slug: "bridging-business-and-code",
    title: "Bridging Business and Code: Why Analysts Should Learn to Program",
    description:
      "How understanding both business analysis and software engineering makes you a more effective professional.",
    date: "Jan 10, 2025",
    tags: ["Business Analysis", "Software Engineering", "Career"],
    readingTime: "5 min read",
    category: "Career",
  },
  {
    slug: "agile-mindset",
    title: "The Agile Mindset: More Than Just Sprints and Standups",
    description:
      "True agility is a philosophy, not a framework. Here's how it changed the way I work.",
    date: "Dec 20, 2024",
    tags: ["Agile", "Mindset", "Project Management"],
    readingTime: "4 min read",
    category: "Methodology",
  },
  {
    slug: "building-with-purpose",
    title: "Building Software with Purpose: A Business Analyst's Perspective",
    description:
      "Why understanding the 'why' behind every feature leads to better products.",
    date: "Nov 15, 2024",
    tags: ["Product", "Engineering", "Purpose"],
    readingTime: "6 min read",
    category: "Engineering",
  },
];

export function BlogSection() {
  return (
    <SectionWrapper
      id="blog"
      title="Blog"
      subtitle="Thoughts on technology, business, and continuous growth"
    >
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {blogPosts.map((post) => (
          <motion.article
            key={post.slug}
            className="group p-6 md:p-8 rounded-3xl bg-surface-secondary/30 border border-border hover:border-apple-blue/20 transition-all duration-500 cursor-pointer"
            variants={staggerItem}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-apple-blue/10 text-apple-blue rounded-full">
                {post.category}
              </span>
              <span className="text-[11px] text-text-tertiary flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime}
              </span>
            </div>

            <h3 className="text-lg font-bold text-text-primary mb-3 group-hover:text-apple-blue transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-text-secondary leading-relaxed mb-6 line-clamp-3">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] bg-surface-secondary rounded-full text-text-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 text-xs font-medium text-apple-blue group-hover:gap-2 transition-all">
              Read more
              <ArrowRight className="w-3 h-3" />
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
