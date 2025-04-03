// src/app/components/RecipeCard.tsx
"use client";
import React from 'react';

interface RecipeCardProps {
  title: string;
  image: string;
  description: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, image, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <a href="#" className="text-blue-500 hover:text-blue-700">
          Ver receta completa
        </a>
      </div>
    </div>
  );
};

export default RecipeCard;
