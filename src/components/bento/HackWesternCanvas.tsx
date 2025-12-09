'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { CanvasProvider } from '@/contexts/CanvasContext';
import { DraggableImage } from '@/components/bento/draggable';

interface Sticker {
  id: string;
  x: number;
  y: number;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

// Canvas dimensions - larger than viewport for panning
const canvasWidth = 2000;
const canvasHeight = 1500;

// Generate random positions around the center within viewport bounds
function generateRandomPositions(
  centerX: number, 
  centerY: number, 
  count: number, 
  viewportWidth: number,
  viewportHeight: number,
  zoom: number
) {
  const positions: { x: number; y: number }[] = [];
  
  // Calculate visible canvas area at current zoom
  const visibleCanvasWidth = viewportWidth / zoom;
  const visibleCanvasHeight = viewportHeight / zoom;
  
  // Generate positions within a safe area (80% of visible area to ensure they're fully visible)
  const maxDistanceX = (visibleCanvasWidth * 0.4) - 50; // 40% of visible width, minus icon size buffer
  const maxDistanceY = (visibleCanvasHeight * 0.4) - 50; // 40% of visible height, minus icon size buffer
  const maxDistance = Math.min(maxDistanceX, maxDistanceY, 200); // Cap at 200px
  const minDistance = 120; // Minimum distance from center
  
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;
    
    positions.push({ x: Math.round(x), y: Math.round(y) });
  }
  
  return positions;
}

export function HackWesternCanvas() {
  const [isPanning, setIsPanning] = useState(false);
  const [panStartPoint, setPanStartPoint] = useState({ x: 0, y: 0 });
  const [initialPanOffset, setInitialPanOffset] = useState({ x: 0, y: 0 });
  const [isResetting] = useState(false);
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, scale: 0.85 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  // Motion values for pan and zoom - initialize scale to 0.85
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0.85);

  // Track coordinates for display
  useMotionValueEvent(x, 'change', (latest) => {
    setCoordinates(prev => ({ ...prev, x: Math.round(latest) }));
  });

  useMotionValueEvent(y, 'change', (latest) => {
    setCoordinates(prev => ({ ...prev, y: Math.round(latest) }));
  });

  useMotionValueEvent(scale, 'change', (latest) => {
    setCoordinates(prev => ({ ...prev, scale: Math.round(latest * 100) / 100 }));
  });

  // Sticker positions - centered on canvas
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  
  // Horse is at centerX - 60, centerY - 60, so its center is at centerX, centerY
  const horseCenterX = centerX;
  const horseCenterY = centerY;
  
  // Store random positions in state so we can regenerate when viewport is known
  const [randomPositions, setRandomPositions] = useState<{ x: number; y: number }[]>([]);

  const stickers: Sticker[] = useMemo(() => [
    { 
      id: 'horse', 
      x: centerX - 60,
      y: centerY - 60,
      src: '/stickers/horse.svg', 
      alt: 'Horse', 
      width: 120, 
      height: 120 
    },
    { 
      id: 'pencils', 
      x: randomPositions[0]?.x || centerX + 150, 
      y: randomPositions[0]?.y || centerY + 100, 
      src: '/stickers/pencils.png', 
      alt: 'Pencils', 
      width: 96, // 80 * 1.2 = 96
      height: 96 
    },
    { 
      id: 'paintbrush', 
      x: randomPositions[1]?.x || centerX - 150, 
      y: randomPositions[1]?.y || centerY - 100, 
      src: '/stickers/paintbrush.png', 
      alt: 'Paintbrush', 
      width: 96, 
      height: 96 
    },
    { 
      id: 'lightbulb', 
      x: randomPositions[2]?.x || centerX + 100, 
      y: randomPositions[2]?.y || centerY - 150, 
      src: '/stickers/lightbulb.png', 
      alt: 'Lightbulb', 
      width: 96, 
      height: 96 
    },
  ], [centerX, centerY, randomPositions]);

  // Initialize canvas position to center on horse at 0.85x zoom
  useEffect(() => {
    if (!viewportRef.current || isInitialized) return;

    // Wait for next frame to ensure viewport has dimensions
    const initCanvas = () => {
      if (!viewportRef.current) return;
      
      const viewportWidth = viewportRef.current.offsetWidth;
      const viewportHeight = viewportRef.current.offsetHeight;
      
      // If viewport has no dimensions yet, wait
      if (viewportWidth === 0 || viewportHeight === 0) {
        requestAnimationFrame(initCanvas);
        return;
      }
      
      // Calculate minimum zoom to fill viewport (prevent white space)
      const minZoomWidth = viewportWidth / canvasWidth;
      const minZoomHeight = viewportHeight / canvasHeight;
      const minZoom = Math.max(minZoomWidth, minZoomHeight);
      
      // Fixed initial scale at 0.85, but ensure it's at least the minimum
      const initialScale = Math.max(0.85, minZoom);

      // Center the horse in the viewport
      // Horse center is at (horseCenterX, horseCenterY) in canvas coordinates
      // We want this to appear at the center of the viewport
      const viewportCenterX = viewportWidth / 2;
      const viewportCenterY = viewportHeight / 2;
      
      // Calculate pan offset to center the horse
      const initialX = viewportCenterX - horseCenterX * initialScale;
      const initialY = viewportCenterY - horseCenterY * initialScale;

      // Apply bounds checking
      const minPanX = viewportWidth - canvasWidth * initialScale;
      const maxPanX = 0;
      const minPanY = viewportHeight - canvasHeight * initialScale;
      const maxPanY = 0;

      const clampedX = Math.min(Math.max(initialX, minPanX), maxPanX);
      const clampedY = Math.min(Math.max(initialY, minPanY), maxPanY);

      x.set(clampedX);
      y.set(clampedY);
      scale.set(initialScale);
      
      // Generate random positions within viewport bounds
      const positions = generateRandomPositions(
        centerX,
        centerY,
        3,
        viewportWidth,
        viewportHeight,
        initialScale
      );
      setRandomPositions(positions);
      
      setIsInitialized(true);
    };

    requestAnimationFrame(initCanvas);
  }, [x, y, scale, isInitialized, horseCenterX, horseCenterY, centerX, centerY]);

  // Add native wheel event listener for better compatibility
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleNativeWheel = (e: WheelEvent) => {
      // Only handle if event is on the viewport
      if (!viewport.contains(e.target as Node)) return;
      
      e.preventDefault();
      e.stopPropagation();

      const isPinch = e.ctrlKey || e.metaKey;
      const isMouseWheelZoom = Math.abs(e.deltaY) >= 100;
      const ZOOM_SENSITIVITY = isMouseWheelZoom ? 0.0015 : 0.015;
      
      const rect = viewport.getBoundingClientRect();
      const viewportWidth = rect.width;
      const viewportHeight = rect.height;
      
      // Calculate minimum zoom to fill viewport (prevent white space)
      const minZoomWidth = viewportWidth / canvasWidth;
      const minZoomHeight = viewportHeight / canvasHeight;
      const MIN_ZOOM = Math.max(minZoomWidth, minZoomHeight);
      const MAX_ZOOM = 2;
      
      if (isPinch) {
        const currentZoom = scale.get();
        const nextZoom = Math.max(
          Math.min(currentZoom * (1 - e.deltaY * ZOOM_SENSITIVITY), MAX_ZOOM),
          MIN_ZOOM
        );
        
        const vpLeft = rect.left;
        const vpTop = rect.top;
        
        const cursorSceneX = (e.clientX - vpLeft - x.get()) / currentZoom;
        const cursorSceneY = (e.clientY - vpTop - y.get()) / currentZoom;
        
        let newPanX = e.clientX - vpLeft - cursorSceneX * nextZoom;
        let newPanY = e.clientY - vpTop - cursorSceneY * nextZoom;
        
        const minPanX = viewportWidth - canvasWidth * nextZoom;
        const minPanY = viewportHeight - canvasHeight * nextZoom;
        const maxPanX = 0;
        const maxPanY = 0;
        
        newPanX = Math.min(maxPanX, Math.max(minPanX, newPanX));
        newPanY = Math.min(maxPanY, Math.max(minPanY, newPanY));
        
        x.set(newPanX);
        y.set(newPanY);
        scale.set(nextZoom);
      } else {
        const scrollSpeed = 1;
        const currentScale = scale.get();
        const viewportWidth = viewport.offsetWidth;
        const viewportHeight = viewport.offsetHeight;
        
        const newPanX = x.get() - e.deltaX * scrollSpeed;
        const newPanY = y.get() - e.deltaY * scrollSpeed;
        
        const minPanX = viewportWidth - canvasWidth * currentScale;
        const maxPanX = 0;
        const minPanY = viewportHeight - canvasHeight * currentScale;
        const maxPanY = 0;
        
        const clampedPanX = Math.min(Math.max(newPanX, minPanX), maxPanX);
        const clampedPanY = Math.min(Math.max(newPanY, minPanY), maxPanY);
        
        x.set(clampedPanX);
        y.set(clampedPanY);
      }
    };

    viewport.addEventListener('wheel', handleNativeWheel, { passive: false });
    
    return () => {
      viewport.removeEventListener('wheel', handleNativeWheel);
    };
  }, [x, y, scale]);

  // Pan handlers
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (viewportRef.current) {
      viewportRef.current.setPointerCapture(e.pointerId);
    }
    setIsPanning(true);
    setPanStartPoint({ x: e.clientX, y: e.clientY });
    setInitialPanOffset({ x: x.get(), y: y.get() });
  }, [x, y]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    
    const deltaX = e.clientX - panStartPoint.x;
    const deltaY = e.clientY - panStartPoint.y;
    
    const currentScale = scale.get();
    const viewportWidth = viewportRef.current?.offsetWidth || 0;
    const viewportHeight = viewportRef.current?.offsetHeight || 0;
    
    // Calculate bounds
    const minPanX = viewportWidth - canvasWidth * currentScale;
    const maxPanX = 0;
    const minPanY = viewportHeight - canvasHeight * currentScale;
    const maxPanY = 0;
    
    const newX = Math.min(Math.max(initialPanOffset.x + deltaX, minPanX), maxPanX);
    const newY = Math.min(Math.max(initialPanOffset.y + deltaY, minPanY), maxPanY);
    
    x.set(newX);
    y.set(newY);
  }, [isPanning, panStartPoint, initialPanOffset, x, y, scale]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (viewportRef.current) {
      viewportRef.current.releasePointerCapture(e.pointerId);
    }
    setIsPanning(false);
  }, []);

  // Zoom handler - prevent page zoom but allow canvas zoom
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    // Always prevent page zoom when interacting with canvas
    e.preventDefault();
    e.stopPropagation();
    
    const isPinch = e.ctrlKey || e.metaKey;
    const isMouseWheelZoom = Math.abs(e.deltaY) >= 100;
    const ZOOM_SENSITIVITY = isMouseWheelZoom ? 0.0015 : 0.015;
    
    const MIN_ZOOM = 0.3;
    const MAX_ZOOM = 2;
    
    if (isPinch) {
      // Zoom in/out with Ctrl/Cmd + scroll
      const currentZoom = scale.get();
      const nextZoom = Math.max(
        Math.min(currentZoom * (1 - e.deltaY * ZOOM_SENSITIVITY), MAX_ZOOM),
        MIN_ZOOM
      );
      
      const rect = viewportRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const vpLeft = rect.left;
      const vpTop = rect.top;
      const viewportWidth = rect.width;
      const viewportHeight = rect.height;
      
      // Zoom towards cursor position
      const cursorSceneX = (e.clientX - vpLeft - x.get()) / currentZoom;
      const cursorSceneY = (e.clientY - vpTop - y.get()) / currentZoom;
      
      let newPanX = e.clientX - vpLeft - cursorSceneX * nextZoom;
      let newPanY = e.clientY - vpTop - cursorSceneY * nextZoom;
      
      const minPanX = viewportWidth - canvasWidth * nextZoom;
      const minPanY = viewportHeight - canvasHeight * nextZoom;
      const maxPanX = 0;
      const maxPanY = 0;
      
      newPanX = Math.min(maxPanX, Math.max(minPanX, newPanX));
      newPanY = Math.min(maxPanY, Math.max(minPanY, newPanY));
      
      x.set(newPanX);
      y.set(newPanY);
      scale.set(nextZoom);
    } else {
      // Pan with regular scroll
      const scrollSpeed = 1;
      const currentScale = scale.get();
      const viewportWidth = viewportRef.current?.offsetWidth || 0;
      const viewportHeight = viewportRef.current?.offsetHeight || 0;
      
      const newPanX = x.get() - e.deltaX * scrollSpeed;
      const newPanY = y.get() - e.deltaY * scrollSpeed;
      
      const minPanX = viewportWidth - canvasWidth * currentScale;
      const maxPanX = 0;
      const minPanY = viewportHeight - canvasHeight * currentScale;
      const maxPanY = 0;
      
      const clampedPanX = Math.min(Math.max(newPanX, minPanX), maxPanX);
      const clampedPanY = Math.min(Math.max(newPanY, minPanY), maxPanY);
      
      x.set(clampedPanX);
      y.set(clampedPanY);
    }
  }, [x, y, scale]);

  // Gradient background (subtle Hack Western style gradient - beige to soft purple)
  const gradientBgImage = `radial-gradient(ellipse ${canvasWidth}px ${canvasHeight}px at ${canvasWidth / 2}px ${canvasHeight}px, #f4e4c1 0%, #f0e0d0 25%, #e8d8e8 45%, #e0d0e0 65%, #f0e0d0 85%, #f4e4c1 100%)`;

  return (
    <CanvasProvider
      x={x}
      y={y}
      scale={scale}
      isResetting={isResetting}
      maxZIndex={maxZIndex}
      setMaxZIndex={setMaxZIndex}
    >
      <div className="h-full flex flex-col relative overflow-hidden bg-white rounded-[7px]">
        {/* Coordinate Display */}
        <div className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs font-mono shadow-sm border border-gray-200">
          <span className="text-gray-600">
            ({coordinates.x}, {coordinates.y}) | {coordinates.scale}x
          </span>
        </div>

        {/* Canvas Viewport */}
        <div
          ref={viewportRef}
          className="flex-1 relative touch-none select-none overflow-hidden"
          style={{ 
            touchAction: 'none',
            cursor: isPanning 
              ? 'grabbing' 
              : `url('/customcursor.svg'), auto`
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <motion.div
            ref={sceneRef}
            className="absolute origin-top-left"
            style={{
              width: `${canvasWidth}px`,
              height: `${canvasHeight}px`,
              x,
              y,
              scale,
            }}
          >
            {/* Gradient Background */}
            <div
              className="absolute inset-0 h-full w-full opacity-100 pointer-events-none"
              style={{
                backgroundImage: gradientBgImage,
              }}
            />
            
            {/* Dots Pattern */}
            <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#776780_1.5px,transparent_1px)] opacity-35 [background-size:22px_22px] pointer-events-none" />

            {/* Draggable Stickers */}
            {stickers.map((sticker) => (
              <DraggableImage
                key={sticker.id}
                src={sticker.src}
                alt={sticker.alt}
                width={sticker.width}
                height={sticker.height}
                initialPos={{ x: sticker.x, y: sticker.y }}
                scale={1}
                className="absolute"
                onDragStart={sticker.id === 'horse' ? () => setHasDragged(true) : undefined}
                animate={sticker.id === 'horse' ? {
                  rotate: [2, -2],
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                } : undefined}
              />
            ))}

            {/* Drag Me Indicator */}
            {!hasDragged && (
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: `${centerX + 80}px`, // Position to the right of horse
                  top: `${centerY - 20}px`, // Slightly above center
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <img
                  src="/dragme.svg"
                  alt="drag me"
                  width={101}
                  height={64}
                  className="select-none"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </CanvasProvider>
  );
}
