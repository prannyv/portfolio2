"use client";

import { useCardHoverContext } from "@/contexts/CardHoverContext";

export function CardOverlay() {
  const { hoveredCardId } = useCardHoverContext();

  // Always render the overlay but control opacity for smooth transitions
  // The card will appear above it due to higher z-index (z-50 vs z-40)
  return (
    <div
      className={`fixed inset-0 z-40 pointer-events-none bg-white/80 transition-opacity duration-300 ease-in-out ${
        hoveredCardId ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}

