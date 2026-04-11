"use client";

import { HeroSection } from "@/components/shared/HeroSection";
import ProjectArchives from "@/components/shared/ProjectArchives";
import ProjectsSection from "@/components/shared/ProjectsSection";
import CertificationsSection from "@/components/shared/CertificationsSection";
import SkillsSection from "@/components/shared/SkillsSection";
import CtaSection from "@/components/shared/CtaSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProjectArchives />
      <ProjectsSection />
      <SkillsSection />
      <CertificationsSection />
      <CtaSection />
      {/* Sections to be added here in future issues */}
    </main>
  );
}
