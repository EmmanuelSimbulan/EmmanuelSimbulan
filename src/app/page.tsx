"use client";

import { useLenis } from "@/hooks/useLenis";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/premium/LoadingScreen";
import { ScrollProgress } from "@/components/premium/ScrollProgress";
import { CommandPalette } from "@/components/premium/CommandPalette";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { HobbiesSection } from "@/components/sections/HobbiesSection";
import { CurrentlyDoingSection } from "@/components/sections/CurrentlyDoingSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  useLenis();

  return (
    <main>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <CommandPalette />

      <HeroSection />
      <AboutSection />
      <JourneySection />
      <ExperienceSection />
      <SkillsSection />
      <TechStackSection />
      <ProjectsSection />
      <BlogSection />
      <HobbiesSection />
      <CurrentlyDoingSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
