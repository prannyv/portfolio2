"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectHeroProps {
  title: string;
  heroImage: string;
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  aspectRatio?: string;
}

export function ProjectHero({
  title,
  heroImage,
  role,
  timeline,
  team,
  tools,
  aspectRatio = "16/10",
}: ProjectHeroProps) {
  const metadata = [
    { label: "Role", value: role },
    { label: "Timeline", value: timeline },
    { label: "Team", value: team },
    { label: "Tools", value: tools.join(", ") },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-4xl md:text-5xl lg:text-6xl font-sentient font-medium text-black leading-tight"
      >
        {title}
      </motion.h1>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="relative w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
        style={{ aspectRatio }}
      >
        <Image
          src={heroImage}
          alt={`${title} hero image`}
          fill
          className="object-cover object-top"
          priority
        />
      </motion.div>

      {/* Metadata Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-gray-200"
      >
        {metadata.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            className="space-y-2"
          >
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium font-geist-sans">
              {item.label}
            </p>
            <p className="text-sm text-black font-geist-sans leading-relaxed">
              {item.value}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

