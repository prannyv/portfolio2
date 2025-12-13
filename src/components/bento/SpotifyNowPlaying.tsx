'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumImageUrl?: string;
  songUrl?: string;
  backgroundColor?: string;
}

export function SpotifyNowPlaying() {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSpotifyData = async () => {
    try {
      const response = await fetch('/api/spotify/now-playing');
      if (!response.ok) {
        throw new Error('Failed to fetch Spotify data');
      }
      const data = await response.json();
      setSpotifyData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch immediately
    fetchSpotifyData();

    // Then fetch every 10 seconds to keep it updated
    const interval = setInterval(fetchSpotifyData, 10000);

    return () => clearInterval(interval);
  }, []);

  // Default fallback gradient
  const defaultBackground = 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900';
  const backgroundStyle = spotifyData?.backgroundColor 
    ? { backgroundColor: spotifyData.backgroundColor }
    : {};

  if (isLoading) {
    return (
      <div className={`h-full w-full flex items-center justify-center ${defaultBackground} transition-colors duration-500`}>
        <div className="text-white/60 text-sm">Loading...</div>
      </div>
    );
  }

  if (!spotifyData || !spotifyData.title || !spotifyData.artist || !spotifyData.albumImageUrl) {
    return (
      <div className={`h-full w-full flex items-center justify-center ${defaultBackground} transition-colors duration-500`}>
        <div className="text-white/60 text-sm">Nothing playing</div>
      </div>
    );
  }

  return (
    <div 
      className={`h-full w-full relative ${!spotifyData.backgroundColor ? defaultBackground : ''} p-6 flex flex-col transition-colors duration-500 overflow-hidden`}
      style={backgroundStyle}
    >
      {/* Spotify Logo - Top Right */}
      {spotifyData.songUrl && (
        <a 
          href={spotifyData.songUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-10 cursor-pointer hover:opacity-100 transition-opacity"
        >
          <Image
            src="/spotify-logo.png"
            alt="Spotify"
            width={48}
            height={48}
            className="opacity-80"
            onError={(e) => {
              // Hide logo if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </a>
      )}
      {!spotifyData.songUrl && (
        <div className="absolute top-4 right-4 z-10">
          <Image
            src="/spotify-logo.png"
            alt="Spotify"
            width={64}
            height={64}
            className="opacity-80"
            onError={(e) => {
              // Hide logo if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Album Art - Top Left, Slightly Offset */}
      <div className="relative mb-2.5 mt-10 self-start">
        <div className="w-32 h-32 sm:w-40 sm:h-40 relative shadow-lg">
          <Image
            src={spotifyData.albumImageUrl}
            alt={spotifyData.album || 'Album cover'}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 640px) 128px, 160px"
          />
        </div>
      </div>

      {/* Song Title - Bold */}
      <div className="mb-0 min-w-0 w-full overflow-hidden">
        <h3 className="text-white font-bold text-base sm:text-lg truncate">
          {spotifyData.title}
        </h3>
      </div>

      {/* Artist Name */}
      <div className="min-w-0 w-full overflow-hidden">
        <p className="text-white/80 text-xs sm:text-sm truncate">
          {spotifyData.artist}
        </p>
      </div>
    </div>
  );
}

