"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export function TableOfContents({
  sections,
  activeSection,
  onSectionClick,
}: TableOfContentsProps) {
  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onSectionClick(id);
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="sticky top-32 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="space-y-1"
      >
        <p className="text-xs uppercase tracking-wider text-gray-400 font-medium mb-4">
          Contents
        </p>
        <ul className="space-y-2">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            
            return (
              <motion.li
                key={section.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <button
                  onClick={(e) => handleClick(e, section.id)}
                  className={cn(
                    "text-left transition-all duration-300 ease-out cursor-pointer block",
                    "hover:text-black font-geist-sans",
                    isActive
                      ? "text-black text-base font-medium"
                      : "text-gray-400 text-sm"
                  )}
                >
                  {section.title}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </nav>
  );
}

