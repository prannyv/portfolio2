"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCardHoverContext } from "@/contexts/CardHoverContext";

interface WorkCardProps {
  title: string;
  subtitle: string;
  href: string;
  image?: string; // For future use
  className?: string;
  showFocusButton?: boolean;
}

let workCardIdCounter = 0;

export function WorkCard({ 
  title, 
  subtitle, 
  href,
  image,
  className,
  showFocusButton = true
}: WorkCardProps) {
  const [cardId] = useState(() => `work-card-${workCardIdCounter++}`);
  const cardRef = useRef<HTMLDivElement>(null);
  const { hoveredCardId, setHoveredCardId, setHoveredCardRef } = useCardHoverContext();
  const isCardHovered = hoveredCardId === cardId;
  const [shouldElevate, setShouldElevate] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Keep z-index elevated during the transition period (300ms)
  useEffect(() => {
    if (isCardHovered) {
      setShouldElevate(true);
    } else {
      const timer = setTimeout(() => {
        setShouldElevate(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isCardHovered]);

  // Handle hover state for overlay
  useEffect(() => {
    if (isButtonHovered && cardId && cardRef) {
      setHoveredCardId(cardId);
      setHoveredCardRef(cardRef);
    } else if (!isButtonHovered) {
      setHoveredCardId(null);
      setHoveredCardRef(null);
    }
  }, [isButtonHovered, cardId, cardRef, setHoveredCardId, setHoveredCardRef]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl bg-[var(--background-card-grey)]",
        "border-[5px] border-[var(--background-card-grey)]",
        "transition-[z-index] duration-300 ease-in-out",
        "aspect-square flex flex-col",
        shouldElevate && "z-50",
        className
      )}
    >
      {/* Content Area */}
      <div className="flex flex-col flex-1">
        {/* Title & Subtitle */}
        <div className="p-8 pb-0">
          <h3 className="text-3xl sm:text-4xl font-semibold text-black font-sentient">
            {title}
          </h3>
          <p className="text-gray-400 mt-3 text-xl font-geist-sans">
            {subtitle}
          </p>
        </div>
        
        {/* Horizontal Line - full width */}
        <div className="mt-6 mx-8 border-t border-gray-300"></div>
        
        {/* Image area - for future use */}
        {image && (
          <div className="flex-1 flex items-center justify-center p-8 pt-0">
            {/* Image will go here when provided */}
          </div>
        )}
      </div>

      {/* Focus Button - Top Right, Larger */}
      {showFocusButton && (
        <Link
          href={href}
          className={cn(
            "absolute top-6 right-6 z-20",
            "w-14 h-14 rounded-full",
            "border border-gray-300",
            "bg-white/40 backdrop-blur-md",
            "flex items-center justify-center",
            "transition-all duration-200",
            "hover:scale-110 hover:bg-white/60",
            "group"
          )}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          {/* Arrow icon pointing diagonally up-right */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-600"
          >
            <path
              d="M4 12L12 4M12 4H6M12 4V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}

