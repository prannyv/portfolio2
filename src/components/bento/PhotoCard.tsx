'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';

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
    icon: WbSunnyOutlinedIcon,
  },
  {
    id: 'cat2',
    name: 'Category 2',
    icon: LocationOnOutlinedIcon,
  },
  {
    id: 'cat3',
    name: 'Category 3',
    icon: PeopleOutlineIcon,
  },
  {
    id: 'cat4',
    name: 'Category 4',
    icon: FastfoodOutlinedIcon,
  }
];

export function PhotoCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPhotoDark, setIsPhotoDark] = useState(false);
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
  }, [selectedCategory]);

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

  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-lg"
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
      <div className="relative w-full h-full overflow-hidden rounded-sm bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
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
      <div className="absolute top-6 right-6 z-20">
        <img
          src="/photos.png"
          alt="Photos"
          className="w-[52px] h-[52px] scale-150 object-contain"
        />
      </div>

      {/* Hover Popup from Bottom - Option 1: Direct Application */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="photo-popup liquid-glass absolute bottom-0 left-0 right-0 z-30 pointer-events-auto py-2.5 px-4 mx-3 mb-3"
            style={{ willChange: 'transform, opacity' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Category Selector */}
            <div className="relative flex p-1.5">
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
                        layoutId="pill"
                        transition={{ 
                          type: 'spring', 
                          stiffness: 300, 
                          damping: 35,
                          layout: { duration: 0.3 }
                        }}
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

