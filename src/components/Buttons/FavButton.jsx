import React from "react";
import heartIcon from "../../assets/iconFAV.png";

export const FavButton = ({ onToggleFavorite, image, isFavorite }) => {
    const handleClick = () => {
        if (typeof onToggleFavorite !== "function" || !image) {
            console.error("onToggleFavorite must be a function and image must be provided.");
            return;
        }
        onToggleFavorite(image);
    };

    return (
        <button
            className={`fav-button ${isFavorite ? "selected" : ""}`}
            onClick={handleClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
            <img
                src={heartIcon}
                alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
            />
        </button>
    );
};
