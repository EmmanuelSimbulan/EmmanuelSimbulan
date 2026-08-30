"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";
import { siteConfig } from "@/config/site";
import { fadeInUp, staggerContainer } from "@/utils/animations";

export function ContactSection() {
  return (
    <SectionWrapper
      id="contact"
      title="Let's Connect"
      subtitle="Have a project in mind? Let's talk about it."
    >
      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Contact Info Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
          variants={fadeInUp}
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex flex-col items-center gap-3 p-6 rounded-3xl glass hover:border-accent/35 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Mail className="w-4 h-4 text-accent" />
            </div>
            <div className="text-center">
              <p className="text-xs text-text-tertiary mb-1">Email</p>
              <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                Get in Touch
              </p>
            </div>
          </a>

          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 rounded-3xl glass hover:border-accent/35 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Linkedin className="w-4 h-4 text-accent" />
            </div>
            <div className="text-center">
              <p className="text-xs text-text-tertiary mb-1">LinkedIn</p>
              <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                Connect
              </p>
            </div>
          </a>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 rounded-3xl glass hover:border-accent/35 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Github className="w-4 h-4 text-accent" />
            </div>
            <div className="text-center">
              <p className="text-xs text-text-tertiary mb-1">GitHub</p>
              <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                Follow
              </p>
            </div>
          </a>
        </motion.div>

        {/* Location */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-secondary/50 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span className="text-sm text-text-secondary">
              {siteConfig.location}
            </span>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className="p-8 rounded-3xl glass"
          variants={fadeInUp}
          onSubmit={(e) => {
            e.preventDefault();
            window.open(
              `mailto:${siteConfig.email}?subject=Hello Emmanuel!&body=Hi Emmanuel, I found your portfolio and would love to connect.`,
              "_blank"
            );
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-text-tertiary mb-2 uppercase tracking-wider">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-surface-primary border border-border rounded-xl text-sm text-text-primary outline-none focus:border-accent transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-tertiary mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-surface-primary border border-border rounded-xl text-sm text-text-primary outline-none focus:border-accent transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-medium text-text-tertiary mb-2 uppercase tracking-wider">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 bg-surface-primary border border-border rounded-xl text-sm text-text-primary outline-none focus:border-accent transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <button
            type="submit"
            className="aero-gloss w-full py-3 bg-accent text-white rounded-xl font-medium text-sm hover:bg-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            <span className="relative z-10">Send Message</span>
          </button>
        </motion.form>
      </motion.div>
    </SectionWrapper>
  );
}
