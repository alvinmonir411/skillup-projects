// FavoriteButton.tsx
"use client"; // This component needs to be a Client Component for interactivity

import { Heart } from "lucide-react";
import React, { useState } from "react";
import { favorite } from "../actions/favorite";

interface FavoriteButtonProps {
  courseId: string;
  initialIsFavorite?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  courseId,
  initialIsFavorite = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const handleToggleFavorite = async () => {
    setIsLoading(true);
    const data = await favorite(courseId);
    alert(`${data.message}`);
    console.log(data);
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`absolute top-3 right-3 
                  p-2 rounded-full 
                  shadow-md 
                  transition-all duration-300 ease-in-out 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                  ${isLoading ? "opacity-60 cursor-wait" : ""}
                  ${
                    isFavorite
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-white text-gray-400 hover:text-red-500 hover:bg-red-50"
                  } 
                `}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={`w-5 h-5  ${isFavorite ? "fill-current" : "fill-none"} `}
      />
    </button>
  );
};

export default FavoriteButton;
