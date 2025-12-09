"use client";

import { createContext, useContext, useState, ReactNode, RefObject } from "react";

interface CardHoverContextType {
  hoveredCardId: string | null;
  setHoveredCardId: (id: string | null) => void;
  hoveredCardRef: RefObject<HTMLDivElement | null> | null;
  setHoveredCardRef: (ref: RefObject<HTMLDivElement | null> | null) => void;
}

const CardHoverContext = createContext<CardHoverContextType | undefined>(undefined);

export function CardHoverProvider({ children }: { children: ReactNode }) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [hoveredCardRef, setHoveredCardRef] = useState<RefObject<HTMLDivElement | null> | null>(null);

  return (
    <CardHoverContext.Provider value={{ hoveredCardId, setHoveredCardId, hoveredCardRef, setHoveredCardRef }}>
      {children}
    </CardHoverContext.Provider>
  );
}

export function useCardHoverContext() {
  const context = useContext(CardHoverContext);
  if (!context) {
    throw new Error("useCardHoverContext must be used within CardHoverProvider");
  }
  return context;
}

