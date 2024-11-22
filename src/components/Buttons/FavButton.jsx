import React from "react";
import heartIcon from "./assets/heartPhone.png";

const FavButton = ({ onToggleFavorite, image, isFavorite }) => {
  return (
    <button onClick={() => onToggleFavorite(image)}>
      <img src={heartIcon} alt="Favorite Icon" />
      {isFavorite ? "Unfavorite" : "Favorite"}
    </button>
  );
};

export default FavButton;
