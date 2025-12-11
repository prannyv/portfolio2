"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useRef, useState, useEffect } from "react";
import { CaseButton } from "./CaseButton";
import { useCardHoverContext } from "@/contexts/CardHoverContext";

interface CardProps {
  children?: ReactNode;
  className?: string;
  caseHref?: string;
  caseLabel?: string;
  caseTitle?: string;
  caseSubtitle?: string;
  showCaseButton?: boolean;
}

let cardIdCounter = 0;

export function Card({ 
  children, 
  className,
  caseHref,
  caseLabel,
  caseTitle,
  caseSubtitle,
  showCaseButton = true
}: CardProps) {
  const [cardId] = useState(() => `card-${cardIdCounter++}`);
  const cardRef = useRef<HTMLDivElement>(null);
  const { hoveredCardId } = useCardHoverContext();
  const isCardHovered = hoveredCardId === cardId;
  const [shouldElevate, setShouldElevate] = useState(false);

  // Keep z-index elevated during the transition period (300ms)
  useEffect(() => {
    if (isCardHovered) {
      setShouldElevate(true);
    } else {
      // Delay removing z-index to match overlay fade-out duration
      const timer = setTimeout(() => {
        setShouldElevate(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isCardHovered]);

  // Check if padding is 0 (p-0 in className)
  const hasNoPadding = className?.includes("p-0");
  // Inner border radius: outer (12px from rounded-xl) - border (5px) = 7px
  const innerBorderRadius = hasNoPadding ? "rounded-[7px]" : "";

  return (
    <div 
      ref={cardRef}
      className={cn(
        "relative overflow-visible rounded-xl shadow-sm bg-white p-6",
        "border-[5px] border-[var(--background-card-grey)]",
        "transition-[z-index] duration-300 ease-in-out",
        shouldElevate && "z-50",
        className
      )}
    >
      <div className={cn("h-full w-full", hasNoPadding && "overflow-hidden", innerBorderRadius)}>
        {children}
      </div>
      <CaseButton 
        href={caseHref} 
        label={caseLabel}
        title={caseTitle}
        subtitle={caseSubtitle}
        enabled={showCaseButton}
        cardId={cardId}
        cardRef={cardRef}
      />
    </div>
  );
}
