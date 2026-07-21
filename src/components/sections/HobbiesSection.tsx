"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "./SectionWrapper";
import { hobbies, favorites } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/utils/animations";

export function HobbiesSection() {
  return (
    <SectionWrapper
      id="hobbies"
      title="Beyond the Screen"
      subtitle="The things that make me, me"
    >
      {/* Hobbies */}
      <motion.div
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <h3 className="text-xl font-semibold mb-8 text-center text-text-primary">
          Hobbies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {hobbies.map((hobby) => (
            <motion.div
              key={hobby.name}
              className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-surface-secondary/30 border border-border hover:border-apple-blue/20 transition-all duration-300 group"
              variants={staggerItem}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                {hobby.icon}
              </span>
              <span className="text-sm font-medium text-text-primary text-center">
                {hobby.name}
              </span>
              {hobby.description && (
                <span className="text-[11px] text-text-tertiary text-center">
                  {hobby.description}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Favorites */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <h3 className="text-xl font-semibold mb-8 text-center text-text-primary">
          Favorites
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((fav) => (
            <motion.div
              key={fav.category}
              className="p-5 rounded-3xl bg-surface-secondary/30 border border-border hover:border-apple-blue/20 transition-all duration-300 group"
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{fav.icon}</span>
                <span className="text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
                  {fav.category}
                </span>
              </div>
              <h4 className="text-base font-semibold text-text-primary group-hover:text-apple-blue transition-colors">
                {fav.value}
              </h4>
              {fav.description && (
                <p className="text-xs text-text-secondary mt-1">
                  {fav.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
