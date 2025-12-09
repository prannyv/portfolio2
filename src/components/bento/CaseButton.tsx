"use client";

import { useState, useEffect, RefObject } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCardHoverContext } from "@/contexts/CardHoverContext";

interface CaseButtonProps {
  href?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  enabled?: boolean;
  className?: string;
  cardId?: string;
  cardRef?: RefObject<HTMLDivElement | null>;
}

export function CaseButton({ 
  href = "#", 
  label,
  title,
  subtitle,
  enabled = true,
  className,
  cardId,
  cardRef
}: CaseButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { setHoveredCardId, setHoveredCardRef } = useCardHoverContext();

  useEffect(() => {
    if (isHovered && cardId && cardRef) {
      setHoveredCardId(cardId);
      setHoveredCardRef(cardRef);
    } else if (!isHovered) {
      setHoveredCardId(null);
      setHoveredCardRef(null);
    }
  }, [isHovered, cardId, cardRef, setHoveredCardId, setHoveredCardRef]);

  if (!enabled) return null;

  return (
    <>
      <Link
        href={href}
        className={cn(
          "absolute bottom-4 left-4 z-20",
          "w-10 h-10 rounded-full",
          "border border-gray-300",
          "bg-white/20 backdrop-blur-md",
          "flex items-center justify-center",
          "transition-all duration-200",
          "hover:scale-110 hover:bg-white/30",
          "group",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Arrow icon pointing diagonally up-right */}
        <svg
          width="14"
          height="14"
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
      
      {/* Text label that appears on hover */}
      {isHovered && (title || label) && (
        <div
          className={cn(
            "absolute left-4 z-30",
            "text-sm text-gray-700",
            "whitespace-nowrap",
            "pointer-events-none"
          )}
          style={{ bottom: '-36px' }}
        >
          {title && subtitle ? (
            <>
              <span className="font-semibold">{title}</span>
              <span className="mx-2">—</span>
              <span className="font-medium">{subtitle}</span>
            </>
          ) : (
            <span className="font-semibold">{label || title}</span>
          )}
        </div>
      )}
    </>
  );
}

