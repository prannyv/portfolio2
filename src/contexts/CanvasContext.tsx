'use client';

import React, { createContext, useContext, useState, ReactNode, useRef, useCallback, useEffect } from 'react';
import { useMotionValue, MotionValue, useTransform, useMotionValueEvent } from 'framer-motion';
import { motion } from 'framer-motion';

interface CanvasContextType {
  scale: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  isResetting: boolean;
  maxZIndex: number;
  setMaxZIndex: (z: number) => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export function CanvasProvider({ 
  children,
  x,
  y,
  scale,
  isResetting,
  maxZIndex,
  setMaxZIndex,
}: {
  children: ReactNode;
  x: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  isResetting: boolean;
  maxZIndex: number;
  setMaxZIndex: (z: number) => void;
}) {
  return (
    <CanvasContext.Provider
      value={{
        scale,
        x,
        y,
        isResetting,
        maxZIndex,
        setMaxZIndex,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvasContext() {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvasContext must be used within CanvasProvider');
  }
  return context;
}
