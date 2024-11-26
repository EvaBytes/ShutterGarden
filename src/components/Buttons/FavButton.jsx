import {React} from "react";
import "./FavButton.css";
import heartIcon from "../../assets/heartPhone.png";

export const FavButton = ({ onToggleFavorite, image, isFavorite }) => {
  return (
    <button
      className={`fav-button ${isFavorite ? "active" : ""}`}
      onClick={() => onToggleFavorite(image)}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <img src={heartIcon} alt="Favorite Icon" />
      {isFavorite ? "Unfavorite" : "Favorite"}
    </button>
  );
};

