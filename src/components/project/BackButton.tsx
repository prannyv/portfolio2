"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BackButtonProps {
  href?: string;
}

export function BackButton({ href = "/" }: BackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-8 left-8 z-50"
    >
      <Link
        href={href}
        className="group flex items-center gap-3 text-gray-500 hover:text-black transition-colors duration-200"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </div>
        <span className="text-sm font-medium font-geist-sans opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Back
        </span>
      </Link>
    </motion.div>
  );
}

