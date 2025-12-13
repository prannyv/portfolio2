'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Image from 'next/image';

interface SongData {
  title: string;
  artist: string;
  albumArt: string;
}

interface MookieItem {
  id: string;
  label: string;
  image: string;
  song: SongData;
}

const MOOKIE_ITEMS: MookieItem[] = [
  {
    id: 'beach',
    label: 'Beach',
    image: '/mookie/beach.jpg',
    song: {
      title: 'Ocean Eyes',
      artist: 'Billie Eilish',
      albumArt: 'https://i.scdn.co/image/ab67616d00004851a9f6c04ba168640b48aa5795',
    },
  },
  {
    id: 'night',
    label: 'Night',
    image: '/mookie/night.jpg',
    song: {
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      albumArt: 'https://i.scdn.co/image/ab67616d00004851a3eff72f62782fb589a492f9',
    },
  },
  {
    id: 'tree',
    label: 'Forest',
    image: '/mookie/tree.jpeg',
    song: {
      title: 'Tree Among Shrubs',
      artist: 'Men I Trust',
      albumArt: 'https://i.scdn.co/image/ab67616d000048519843089bfdc548de16945f64',
    },
  },
  {
    id: 'sun',
    label: 'Sunset',
    image: '/mookie/sun.jpeg',
    song: {
      title: 'Golden Hour',
      artist: 'JVKE',
      albumArt: 'https://i.scdn.co/image/ab67616d000048510af4476af141051c728ee8b9',
    },
  },
];

export function MookieCard() {
  const [activeItem, setActiveItem] = useState<MookieItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const magnifyingGlassRef = useRef<HTMLDivElement>(null);

  // Motion values for draggable magnifying glass
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Track initial position for reset
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Set initial position once mounted
  useEffect(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      // Position magnifying glass in the center-top area
      const startX = containerRect.width / 2 - 24; // 24 = half of magnifying glass size
      const startY = 60;
      setInitialPos({ x: startX, y: startY });
      x.set(startX);
      y.set(startY);
    }
  }, [x, y]);

  // Check which item the magnifying glass is over
  const checkActiveItem = () => {
    if (!magnifyingGlassRef.current || !containerRef.current) return;

    const glassRect = magnifyingGlassRef.current.getBoundingClientRect();
    const glassCenterX = glassRect.left + glassRect.width / 2;
    const glassCenterY = glassRect.top + glassRect.height / 2;

    let foundItem: MookieItem | null = null;

    itemRefs.current.forEach((itemRef, index) => {
      if (!itemRef) return;
      const itemRect = itemRef.getBoundingClientRect();

      if (
        glassCenterX >= itemRect.left &&
        glassCenterX <= itemRect.right &&
        glassCenterY >= itemRect.top &&
        glassCenterY <= itemRect.bottom
      ) {
        foundItem = MOOKIE_ITEMS[index];
      }
    });

    setActiveItem(foundItem);
  };

  const handleDrag = () => {
    checkActiveItem();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Optionally animate back to initial position
    // animate(x, initialPos.x, { type: 'spring', stiffness: 300, damping: 25 });
    // animate(y, initialPos.y, { type: 'spring', stiffness: 300, damping: 25 });
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col overflow-hidden relative"
    >
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <span className="text-white font-semibold text-sm">Mookie</span>
        <span className="text-slate-400 text-xs">drag to queue</span>
      </div>

      {/* Photo Grid - Top 2/3 */}
      <div className="flex-1 px-4 pb-2">
        <div className="grid grid-cols-2 gap-2 h-full">
          {MOOKIE_ITEMS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className={`rounded-lg overflow-hidden relative transition ease-out duration-150 ${
                activeItem?.id === item.id
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-[1.02]'
                  : 'opacity-80'
              }`}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover scale-[1.02]"
                sizes="(max-width: 768px) 50vw, 150px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Draggable Magnifying Glass */}
      <motion.div
        ref={magnifyingGlassRef}
        className="absolute cursor-grab active:cursor-grabbing z-20"
        style={{ x, y }}
        drag
        dragConstraints={containerRef}
        dragMomentum={false}
        dragElastic={0}
        onDrag={handleDrag}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.1 }}
      >
        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full border-4 border-white/80 flex items-center justify-center shadow-lg">
          <svg
            className="w-5 h-5 text-white/80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </motion.div>

      {/* Now Playing - Bottom 1/3 */}
      <div className="h-[110px] border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        {activeItem ? (
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full px-4 py-3 flex items-center gap-3"
          >
            {/* Album Art */}
            <div
              className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden shadow-md relative"
            >
              <Image
                src={activeItem.song.albumArt}
                alt={activeItem.song.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-500 text-xs font-medium">NOW PLAYING</span>
              </div>
              <h4 className="text-white font-semibold text-sm truncate">
                {activeItem.song.title}
              </h4>
              <p className="text-slate-400 text-xs truncate">
                {activeItem.song.artist}
              </p>
            </div>

            {/* Play Icon */}
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-slate-900 ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </motion.div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-500 text-sm">
              Hover over an image to queue music
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

