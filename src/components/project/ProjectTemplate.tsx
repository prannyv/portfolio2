"use client";

import { ReactNode, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { BackButton } from "./BackButton";
import { TableOfContents } from "./TableOfContents";
import { ProjectHero } from "./ProjectHero";

interface Section {
  id: string;
  title: string;
  content: ReactNode;
}

interface ProjectTemplateProps {
  title: string;
  heroImage: string;
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  sections: Section[];
  backHref?: string;
  aspectRatio?: string;
}

export function ProjectTemplate({
  title,
  heroImage,
  role,
  timeline,
  team,
  tools,
  sections,
  backHref = "/",
  aspectRatio,
}: ProjectTemplateProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || ""
  );
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Intersection Observer for scroll-spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        sectionRefs.current.set(section.id, element);

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(section.id);
              }
            });
          },
          {
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
          }
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  const tocSections = sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <BackButton href={backHref} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-12 xl:gap-20">
          {/* Table of Contents - Left Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents
              sections={tocSections}
              activeSection={activeSection}
              onSectionClick={setActiveSection}
            />
          </aside>

          {/* Main Content */}
          <main className="min-w-0 max-w-4xl">
            {/* Hero Section */}
            <ProjectHero
              title={title}
              heroImage={heroImage}
              role={role}
              timeline={timeline}
              team={team}
              tools={tools}
              aspectRatio={aspectRatio}
            />

            {/* Content Sections */}
            <div className="mt-16 space-y-20">
              {sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="scroll-mt-32"
                >
                  <h2 className="text-2xl md:text-3xl font-sentient font-medium text-black mb-6">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg max-w-none font-geist-sans text-gray-600 leading-relaxed">
                    {section.content}
                  </div>
                </motion.section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

