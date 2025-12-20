'use client';

import React, { useState } from 'react';

interface PokeloCardProps {
  imageUrl: string;
  name?: string;
}

export function PokeloCard({ imageUrl, name }: PokeloCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="pokelo-card">
      <div className="pokelo-card-image-container">
        {imageError ? (
          <div className="pokelo-card-image-placeholder">
            <div className="pokelo-card-name-placeholder">
              {name || 'Card'}
            </div>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={name || 'Pokemon card'}
            className="pokelo-card-image"
            onError={handleImageError}
          />
        )}
      </div>
    </div>
  );
}

