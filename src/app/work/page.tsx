"use client";

import { WorkCard } from "@/components/work/WorkCard";
import { CardOverlay } from "@/components/bento/CardOverlay";

interface Project {
  title: string;
  subtitle: string;
  href: string;
  image?: string;
  showFocusButton?: boolean;
}

const projects: Project[] = [
  {
    title: "Hack Western",
    subtitle: "Web Developer",
    href: "/work/hackwestern",
  },
  {
    title: "Workspace Marketplace",
    subtitle: "Software Engineer Intern",
    href: "/work/marketplace",
  },
  {
    title: "RBC Design Thinking",
    subtitle: "UX Designer",
    href: "/work/designthinking",
  },
  {
    title: "NBA Highlights (WIP)",
    subtitle: "Full Stack Developer",
    href: "/work/nbahighlights",
    showFocusButton: false,
  },
  {
    title: "Miso",
    subtitle: "NLP Message Moderation",
    href: "/work/miso",
  },
  {
    title: "Mookie",
    subtitle: "Automatic Spotify Queue",
    href: "/work/mookie",
  },
  {
    title: "Shopify",
    subtitle: "Software Engineer Intern — Payments Infrastructure",
    href: "/work/shopify",
    showFocusButton: false,
  },
  {
    title: "Dayforce",
    subtitle: "Software Developer Intern — Core Services",
    href: "/work/dayforce",
    showFocusButton: false,
  },
  {
    title: "Western Dev Society",
    subtitle: "Co-President",
    href: "/work/wds",
    showFocusButton: false,
  },
];

export default function Work() {
  return (
    <div className="min-h-screen">
      <CardOverlay />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project) => (
            <WorkCard
              key={project.href}
              title={project.title}
              subtitle={project.subtitle}
              href={project.href}
              image={project.image}
              showFocusButton={project.showFocusButton}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
