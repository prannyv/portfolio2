'use client';

import React, {
  useRef,
  useEffect,
  forwardRef,
  useState,
} from 'react';
import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  type HTMLMotionProps,
  type PanInfo,
} from 'framer-motion';
import { useCanvasContext } from '@/contexts/CanvasContext';

interface Point {
  x: number;
  y: number;
}

export interface DraggableProps extends HTMLMotionProps<'div'> {
  initialPos?: Point;
  shouldStopPropagation?: (e: React.PointerEvent) => boolean;
  onDragStart?: () => void;
}

const defaultPos = { x: 0, y: 0 };

export const Draggable = forwardRef<HTMLDivElement, DraggableProps>(
  (props, ref) => {
    const {
      initialPos: passedPos,
      children,
      style,
      shouldStopPropagation = () => true,
      onDragStart,
      ...restProps
    } = props;

    const {
      scale: parentZoom,
      isResetting,
      maxZIndex,
      setMaxZIndex,
    } = useCanvasContext();

    const initialPos = passedPos ?? defaultPos;

    const x = useMotionValue(initialPos.x);
    const y = useMotionValue(initialPos.y);

    const logicalPositionRef = useRef<Point>({ ...initialPos });
    const controls = useAnimationControls();

    const [zIndex, setZIndex] = useState(1);

    useEffect(() => {
      if (isResetting) {
        logicalPositionRef.current = { ...initialPos };
        void animate(x, initialPos.x, {
          duration: 0.3,
          type: 'spring',
          damping: 14,
          stiffness: 120,
          mass: 1,
        });
        void animate(y, initialPos.y, {
          duration: 0.3,
          type: 'spring',
          damping: 14,
          stiffness: 120,
          mass: 1,
        });
      }
    }, [initialPos, controls, isResetting, x, y]);

    const handleDrag = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      controls.stop();
      const deltaParentX = info.delta.x / parentZoom.get();
      const deltaParentY = info.delta.y / parentZoom.get();

      logicalPositionRef.current.x += deltaParentX;
      logicalPositionRef.current.y += deltaParentY;

      x.set(logicalPositionRef.current.x);
      y.set(logicalPositionRef.current.y);

      if (zIndex < maxZIndex) {
        setZIndex(maxZIndex + 1);
        setMaxZIndex(maxZIndex + 1);
      }
    };

    const handleDragStart = () => {
      onDragStart?.();
    };

    return (
      <motion.div
        ref={ref}
        dragMomentum={false}
        drag
        animate={controls}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        style={{
          ...style,
          x,
          y,
          zIndex,
        }}
        initial={{
          scale: 1,
          filter: 'drop-shadow(0 0px 0px rgba(0, 0, 0, 0)) brightness(1)',
          position: 'relative',
        }}
        onPointerDown={(e: React.PointerEvent) => {
          if (shouldStopPropagation?.(e)) {
            e.stopPropagation();
          }
        }}
        transition={{
          duration: 0.1,
          ease: 'easeOut',
        }}
        {...restProps}
      >
        {children}
      </motion.div>
    );
  },
);

Draggable.displayName = 'Draggable';

export interface DraggableImageProps extends DraggableProps {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  scale?: number;
  onDragStart?: () => void;
}

function drawImageToCanvas(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return;
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
}

function getAlphaAtCoords(
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement | null,
  img: HTMLImageElement | null,
): number {
  if (!canvas || !img) return 0;

  const ctx = canvas.getContext('2d');
  if (!ctx) return 0;

  const rect = img.getBoundingClientRect();

  const x = ((clientX - rect.left) / rect.width) * img.naturalWidth;
  const y = ((clientY - rect.top) / rect.height) * img.naturalHeight;

  const alpha = ctx.getImageData(x, y, 1, 1).data[3] ?? 0;
  return alpha;
}

function isMouseOverImage(
  clientX: number,
  clientY: number,
  img: HTMLImageElement | null,
) {
  if (!img) return false;
  const rect = img.getBoundingClientRect();
  return (
    clientX >= rect.left &&
    clientX <= rect.right &&
    clientY >= rect.top &&
    clientY <= rect.bottom
  );
}

function updateCursor(
  opaque: boolean,
  isMouseDown: boolean,
  img: HTMLImageElement | null,
) {
  let cursor = 'grab'; // Show grab when hovering over sticker
  if (isMouseDown) cursor = 'grabbing'; // Show grabbing when dragging
  if (img) img.style.cursor = cursor;
}

export function DraggableImage(props: DraggableImageProps) {
  const {
    src,
    alt,
    width,
    height,
    initialPos,
    animate,
    className,
    scale,
    onDragStart,
    ...restProps
  } = props;
  const imgRef = React.useRef<HTMLImageElement>(null);
  const [isOpaque, setIsOpaque] = useState(true); // default to true for better UX
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const isMouseDown = React.useRef(false);

  // create a invisible canvas element to check the alpha value of the image
  useEffect(() => {
    if (typeof window !== 'undefined' && !canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    if (!img.complete) {
      img.onload = () => drawImageToCanvas(img, canvas);
    } else {
      drawImageToCanvas(img, canvas);
    }
    return () => {
      if (img) img.onload = null;
    };
  }, []);

  // handle global mouse move to update cursor and opacity
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const img = imgRef.current;
      if (!img) return;

      if (
        !isMouseDown.current &&
        isMouseOverImage(e.clientX, e.clientY, img)
      ) {
        const alpha = getAlphaAtCoords(
          e.clientX,
          e.clientY,
          canvasRef.current,
          img,
        );

        // checking alpha > n rather than 0 to not trigger on shadows and such
        const opaque = alpha > 128;

        setIsOpaque(opaque);
        updateCursor(opaque, false, img);
      } else if (!isMouseDown.current) {
        // Reset cursor when not over image
        img.style.cursor = '';
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  const handlePointerDown = React.useCallback((e: React.PointerEvent) => {
    isMouseDown.current = true;
    e.stopPropagation(); // Prevents the event from bubbling up
    updateCursor(true, true, imgRef.current);
  }, []);

  const handlePointerUp = () => {
    isMouseDown.current = false;
    const img = imgRef.current;
    if (img) {
      // Reset to grab if over opaque area, otherwise let parent handle cursor
      if (isOpaque) {
        updateCursor(true, false, img);
      } else {
        img.style.cursor = '';
      }
    }
  };

  const hoverScale = isOpaque ? (scale ?? 1) * 1.05 : (scale ?? 1);

  return (
    <Draggable
      initialPos={initialPos}
      className={className}
      drag={isOpaque}
      style={{
        height: 0,
      }}
      onDragStart={onDragStart}
      {...restProps}
    >
      <motion.img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        animate={animate}
        draggable="false"
        whileHover={{ scale: hoverScale }}
        style={{
          scale: scale ?? 1,
          pointerEvents: isOpaque ? 'auto' : 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
    </Draggable>
  );
}

