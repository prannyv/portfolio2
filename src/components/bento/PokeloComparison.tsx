'use client';

import React, { useState, useEffect } from 'react';
import { PokeloCard } from './PokeloCard';

interface PokemonCard {
  image: string;
  name: string;
}

const DEFAULT_CARDS: PokemonCard[] = [
  { image: '/pokemon/blk_166.jpeg', name: 'Zekrom EX' },
  { image: '/pokemon/blk_170.jpeg', name: 'N\'s Plan' },
  { image: '/pokemon/jtg_167.jpeg', name: 'N\'s Reshiram' },
  { image: '/pokemon/mew_198.jpeg', name: 'Venusaur EX' },
  { image: '/pokemon/mew_199.jpeg', name: 'Charizard EX' },
  { image: '/pokemon/sv1_215.jpeg', name: 'Riolu' },
  { image: '/pokemon/sv6_214.jpeg', name: 'Greninja EX' },
];

interface PokeloComparisonProps {
  cards?: PokemonCard[];
}

export function PokeloComparison({ cards = DEFAULT_CARDS }: PokeloComparisonProps) {
  const [leftCard, setLeftCard] = useState<PokemonCard | null>(null);
  const [rightCard, setRightCard] = useState<PokemonCard | null>(null);
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [selectionMade, setSelectionMade] = useState(false);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);

  // Load two random cards when component mounts or cards change
  useEffect(() => {
    if (cards.length >= 2) {
      loadNewComparison();
    }
  }, [cards.length]);

  const loadNewComparison = () => {
    if (cards.length < 2) return;
    
    // Shuffle and pick two different cards
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setLeftCard(shuffled[0]);
    setRightCard(shuffled[1]);
    setHoveredSide(null);
    setSelectionMade(false);
    setSelectedSide(null);
  };

  const handleSideHover = (side: 'left' | 'right') => {
    if (selectionMade) return;
    setHoveredSide(side);
  };

  const handleSideLeave = () => {
    if (selectionMade) return;
    setHoveredSide(null);
  };

  const handleSideClick = (side: 'left' | 'right') => {
    if (selectionMade) return;
    
    setSelectionMade(true);
    setSelectedSide(side);
    setHoveredSide(side);
  };

  if (!leftCard || !rightCard) {
    return (
      <div className="pokelo-comparison-container flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading cards...</div>
      </div>
    );
  }

  return (
    <div className="pokelo-comparison-container">
      {/* Header Bar */}
      <div className="pokelo-header">
        <span className="pokelo-title">Pokelo</span>
      </div>
      <div className={`pokelo-split-screen ${selectionMade ? 'selection-made' : ''}`}>
        {/* Left Side */}
        <div
          className={`pokelo-split-side pokelo-left-side ${
            hoveredSide === 'left' && !selectionMade ? 'hovered' : ''
          } ${selectionMade && selectedSide === 'left' ? 'selected' : ''}`}
          onMouseEnter={() => handleSideHover('left')}
          onMouseLeave={handleSideLeave}
          onClick={() => handleSideClick('left')}
        >
          <div className="pokelo-card-container">
            <PokeloCard imageUrl={leftCard.image} name={leftCard.name} />
            <div
              className={`pokelo-arrow-indicator pokelo-arrow-left ${
                hoveredSide === 'left' && !selectionMade ? 'hovered' : ''
              } ${selectionMade && selectedSide === 'left' ? 'selected' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="pokelo-split-divider"></div>

        {/* Right Side */}
        <div
          className={`pokelo-split-side pokelo-right-side ${
            hoveredSide === 'right' && !selectionMade ? 'hovered' : ''
          } ${selectionMade && selectedSide === 'right' ? 'selected' : ''}`}
          onMouseEnter={() => handleSideHover('right')}
          onMouseLeave={handleSideLeave}
          onClick={() => handleSideClick('right')}
        >
          <div className="pokelo-card-container">
            <PokeloCard imageUrl={rightCard.image} name={rightCard.name} />
            <div
              className={`pokelo-arrow-indicator pokelo-arrow-right ${
                hoveredSide === 'right' && !selectionMade ? 'hovered' : ''
              } ${selectionMade && selectedSide === 'right' ? 'selected' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Result overlay with next button */}
      {selectionMade && (
        <div
          className="pokelo-result-overlay"
          onClick={loadNewComparison}
        >
          <div className="pokelo-result-message">
            <p>
              <strong>{selectedSide === 'left' ? leftCard.name : rightCard.name}</strong> selected!
            </p>
            <button
              className="pokelo-next-button"
              onClick={(e) => {
                e.stopPropagation();
                loadNewComparison();
              }}
            >
              Next Comparison
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

