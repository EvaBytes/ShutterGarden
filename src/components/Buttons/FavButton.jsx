import React from "react";
import heartIcon from "../../assets/heartPhone.png";
import "./FavButton.css";

export const FavButton = ({ onToggleFavorite, image, isFavorite }) => {
  const handleClick = () => {
    onToggleFavorite(image);
  };

  return (
    <button className="fav-button" onClick={handleClick} aria-label="Favorite">
      <img src={heartIcon} alt="Favorite Icon" />
    </button>
  );
};
