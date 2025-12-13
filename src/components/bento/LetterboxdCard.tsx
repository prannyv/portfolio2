'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface FavoriteFilm {
  title: string;
  year: number;
  poster: string;
  letterboxdUrl: string;
}

interface RecentFilm {
  title: string;
  year: number;
  poster: string;
  rating: number;
  letterboxdUrl: string;
}

const FAVORITE_FILMS: FavoriteFilm[] = [
  {
    title: "Spider-Man: Across The Spider-Verse",
    year: 2023,
    poster: "https://a.ltrbxd.com/resized/film-poster/4/9/7/6/3/1/497631-spider-man-across-the-spider-verse-0-2000-0-3000-crop.jpg?v=f2acbf1b8a",
    letterboxdUrl: "https://letterboxd.com/film/spider-man-across-the-spider-verse/",
  },
  {
    title: "Everything Everywhere All at Once",
    year: 2022,
    poster: "https://a.ltrbxd.com/resized/film-poster/4/7/4/4/7/4/474474-everything-everywhere-all-at-once-0-500-0-750-crop.jpg",
    letterboxdUrl: "https://letterboxd.com/film/everything-everywhere-all-at-once/",
  },
  {
    title: "Nope",
    year: 2022,
    poster: "https://a.ltrbxd.com/resized/film-poster/6/8/2/5/4/7/682547-nope-0-2000-0-3000-crop.jpg?v=d6a6158cc3",
    letterboxdUrl: "https://letterboxd.com/film/nope/",
  },
  {
    title: "Baby Driver",
    year: 2017,
    poster: "https://a.ltrbxd.com/resized/film-poster/2/6/8/9/5/0/268950-baby-driver-0-2000-0-3000-crop.jpg?v=61304ddfc8",
    letterboxdUrl: "https://letterboxd.com/film/baby-driver/",
  },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={i} className="text-xs" style={{ color: '#00c030' }}>★</span>
      ))}
      {hasHalfStar && (
        <span className="text-xs" style={{ color: '#00c030' }}>½</span>
      )}
    </div>
  );
}

export function LetterboxdCard() {
  const [recentFilms, setRecentFilms] = useState<RecentFilm[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentFilms = async () => {
      try {
        const response = await fetch('/api/letterboxd');
        if (!response.ok) {
          throw new Error('Failed to fetch Letterboxd data');
        }
        const data = await response.json();
        setRecentFilms(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Letterboxd data:', error);
        setIsLoading(false);
      }
    };

    fetchRecentFilms();
  }, []);

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 flex flex-col gap-4 overflow-hidden relative">
      {/* Letterboxd Logo - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <a
          href="https://letterboxd.com/pranavarma/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <Image
            src="/letterboxd.png"
            alt="Letterboxd"
            width={48}
            height={48}
            className="opacity-90"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </a>
      </div>

      {/* Favorites Section */}
      <div className="flex flex-col min-w-0 overflow-hidden flex-shrink-0">
        <h3 className="text-sm mb-2 flex-shrink-0" style={{ color: '#8d9198', fontFamily: "'Neue Haas Grotesk Display', 'Neue Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: '0.05em' }}>FAVORITES</h3>
        <div className="grid grid-cols-4 gap-1.5 w-full justify-items-center items-start">
          {FAVORITE_FILMS.map((film, index) => (
            <a
              key={index}
              href={film.letterboxdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-xs overflow-hidden hover:opacity-80 transition-opacity inline-block"
              style={{ 
                height: '100px',
                margin: 0,
                padding: 0,
              }}
            >
              <img
                src={film.poster}
                alt={film.title}
                className="h-full w-auto object-contain"
                style={{ display: 'block', margin: 0, padding: 0 }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <h3 className="text-sm mb-2 flex-shrink-0" style={{ color: '#8d9198', fontFamily: "'Neue Haas Grotesk Display', 'Neue Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: '0.05em' }}>RECENT ACTIVITY</h3>
        {isLoading ? (
          <div className="text-white/60 text-xs">Loading...</div>
        ) : recentFilms.length === 0 ? (
          <div className="text-white/60 text-xs">No recent activity</div>
        ) : (
          <div className="grid grid-cols-2 grid-rows-2 gap-2 flex-1 min-h-0">
            {recentFilms.slice(0, 4).map((film, index) => (
              <a
                key={index}
                href={film.letterboxdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={film.poster}
                    alt={film.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-white text-xs font-medium line-clamp-1">
                    {film.title}
                  </p>
                  <p className="text-white/60 text-xs">{film.year}</p>
                  <div className="mt-1">
                    <StarRating rating={film.rating} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

