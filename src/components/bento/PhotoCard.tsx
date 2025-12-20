'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Inline SVG icons to avoid loading the entire @mui/icons-material library
const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path d="M12 21c-4-4-8-7.5-8-12a8 8 0 1116 0c0 4.5-4 8-8 12z" />
    <circle cx="12" cy="9" r="3" />
  </svg>
);

const PeopleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <circle cx="9" cy="7" r="4" />
    <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
    <circle cx="17" cy="7" r="3" />
    <path d="M21 21v-2a3 3 0 00-2-2.83" />
  </svg>
);

const FoodIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path d="M3 6h18M3 12h18M3 18h18M7 3v3M7 18v3M17 3v3M17 18v3M12 6v12" />
  </svg>
);

interface PhotoCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  photos: string[]; // Array of local file paths (e.g., '/photos/cat1pic1.jpg')
}

const baseCategories: Omit<PhotoCategory, 'photos'>[] = [
  {
    id: 'cat1',
    name: 'Category 1',
    icon: SunIcon,
  },
  {
    id: 'cat2',
    name: 'Category 2',
    icon: LocationIcon,
  },
  {
    id: 'cat3',
    name: 'Category 3',
    icon: PeopleIcon,
  },
  {
    id: 'cat4',
    name: 'Category 4',
    icon: FoodIcon,
  }
];

export function PhotoCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPhotoDark, setIsPhotoDark] = useState(false);
  const [isPopupMounted, setIsPopupMounted] = useState(false);
  const [categories, setCategories] = useState<PhotoCategory[]>(
    baseCategories.map(cat => ({ ...cat, photos: [] }))
  );

  // Load photos automatically from the photos directory
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch('/api/photos');
        if (!response.ok) return;
        
        const photosByCategory = await response.json();
        
        setCategories(baseCategories.map(cat => ({
          ...cat,
          photos: photosByCategory[cat.id] || []
        })));
      } catch (error) {
        console.error('Failed to load photos:', error);
      }
    };

    loadPhotos();
  }, []);

  const currentPhotos = categories[selectedCategory].photos;
  const currentPhoto = currentPhotos.length > 0 ? currentPhotos[currentPhotoIndex] : null;

  // Check image brightness to determine if icons should be light
  const checkImageBrightness = (imageUrl: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Sample pixels only from the bottom fourth of the image
      const width = canvas.width;
      const height = canvas.height;
      const bottomFourthStart = Math.floor(height * 0.75); // Start from 75% down
      
      const imageData = ctx.getImageData(0, bottomFourthStart, width, height - bottomFourthStart);
      const data = imageData.data;
      let totalBrightness = 0;
      let sampleCount = 0;

      // Sample every 10th pixel from the bottom fourth
      for (let i = 0; i < data.length; i += 40) { // Sample every 10th pixel (RGBA = 4 bytes)
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Calculate brightness using luminance formula
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        totalBrightness += brightness;
        sampleCount++;
      }

      const averageBrightness = totalBrightness / sampleCount;
      // If average brightness is below 0.5 (50%), consider it dark
      setIsPhotoDark(averageBrightness < 0.5);
    };

    img.onerror = () => {
      setIsPhotoDark(false); // Default to light icons on error
    };

    img.src = imageUrl;
  };

  // Auto-rotate photos every 5 seconds
  useEffect(() => {
    const photos = categories[selectedCategory].photos;
    if (photos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedCategory, categories]);

  // Reset photo index when category changes
  useEffect(() => {
    setCurrentPhotoIndex(0);
  }, [selectedCategory]);

  // Check brightness when photo changes
  useEffect(() => {
    if (currentPhoto) {
      checkImageBrightness(currentPhoto);
    } else {
      setIsPhotoDark(false);
    }
  }, [currentPhoto]);

  // Enable pill animation after popup mount animation completes
  useEffect(() => {
    if (isHovered) {
      const timer = setTimeout(() => {
        setIsPopupMounted(true);
      }, 200); // Match the popup animation duration
      return () => clearTimeout(timer);
    } else {
      setIsPopupMounted(false);
    }
  }, [isHovered]);

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={(e) => {
        // Keep hovered when mouse is over popup area
        const target = e.target as HTMLElement;
        if (target.closest('.photo-popup')) {
          setIsHovered(true);
        }
      }}
    >
      {/* Single Photo Display with Auto-Rotation */}
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
        {currentPhoto ? (
          <AnimatePresence>
            <motion.img
              key={`${selectedCategory}-${currentPhotoIndex}-${currentPhoto}`}
              src={currentPhoto}
              alt={`Photo ${currentPhotoIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 w-full h-full object-cover object-center"
              onError={(e) => {
                // Image will fallback to gradient background
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            No photos available
          </div>
        )}
      </div>

      {/* Photos Icon in Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <img
          src="/photos.png"
          alt="Photos"
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Hover Popup from Bottom - Option 1: Direct Application */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="photo-popup liquid-glass absolute bottom-0 left-0 right-0 z-30 pointer-events-auto py-1.5 px-4 mx-3 mb-3"
            style={{ willChange: 'transform, opacity' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Category Selector */}
            <div className="relative flex p-1">
              {/* Category Icons - Each takes exactly 1/4 of the space */}
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                const isSelected = selectedCategory === index;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(index)}
                    className={cn(
                      "relative z-10 flex-1 flex items-center justify-center h-12 transition-all duration-200",
                      isPhotoDark 
                        ? (isSelected ? "text-white" : "text-gray-200")
                        : (isSelected ? "text-black" : "text-gray-800")
                    )}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* Sliding Background Bubble - Pill shaped with glass effect */}
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 m-auto h-12 liquid-glass shadow-lg"
                        style={{ 
                          width: 'calc(100%)',
                          borderRadius: '24px',
                        }}
                        layoutId={isPopupMounted ? "pill" : undefined}
                        initial={!isPopupMounted ? { opacity: 1 } : false}
                        transition={isPopupMounted ? { 
                          type: 'spring', 
                          stiffness: 300, 
                          damping: 35,
                          layout: { duration: 0.3 }
                        } : { duration: 0 }}
                      />
                    )}
                    <IconComponent className="relative z-10 w-6 h-6" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

