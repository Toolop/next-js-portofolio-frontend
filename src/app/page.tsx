"use client";

import { HeroSection } from "@/components/shared/HeroSection";
import ProjectArchives from "@/components/shared/ProjectArchives";
import ProjectsSection from "@/components/shared/ProjectsSection";
import CertificationsSection from "@/components/shared/CertificationsSection";
import SkillsSection from "@/components/shared/SkillsSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectArchives />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      {/* Sections to be added here in future issues */}
    </main>
  );
}
