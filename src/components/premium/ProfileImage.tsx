"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { ProfileLightbox } from "./ProfileLightbox";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ProfileImageProps {
  delay?: number;
}

export function ProfileImage({ delay = 0.3 }: ProfileImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const imageSrc = `${siteConfig.basePath}/images/profile.jpg`;
  const fallbackSrc = `${siteConfig.basePath}/images/profile-placeholder.svg`;
  const alt = "Emmanuel Robledo Simbulan";

  const handleOpen = useCallback(() => {
    setMounted(true);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setMounted(false), 500);
  }, []);

  return (
    <>
      {/* Thumbnail */}
      <motion.div
        className="relative cursor-pointer group mx-auto"
        style={{ width: "clamp(88px, 10vw, 140px)", height: "clamp(88px, 10vw, 140px)" }}
        initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay, ease }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleOpen}
        role="button"
        aria-label="View profile picture"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-apple-blue to-apple-purple p-[3px] shadow-2xl shadow-apple-blue/20 transition-shadow duration-300 group-hover:shadow-apple-blue/40">
          <div className="w-full h-full rounded-full bg-surface-primary dark:bg-black overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = fallbackSrc;
              }}
            />
          </div>
        </div>

        {/* Online badge */}
        <div
          className="absolute -bottom-0.5 -right-0.5 bg-apple-green rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
          style={{ width: "clamp(20px, 2vw, 28px)", height: "clamp(20px, 2vw, 28px)" }}
        >
          <span className="text-white" style={{ fontSize: "clamp(9px, 1vw, 12px)" }}>✓</span>
        </div>
      </motion.div>

      {mounted && (
        <ProfileLightbox
          isOpen={isOpen}
          onClose={handleClose}
          imageSrc={imageSrc}
          alt={alt}
        />
      )}
    </>
  );
}
