import React from "react";

export const FavButton = ({ 
    onToggleFavorite, 
    image, 
    isFavorite, 
    filledIcon, 
    emptyIcon 
}) => {
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
                src={isFavorite ? filledIcon : emptyIcon}
                alt={isFavorite ? "Remove from favorites" : "Add to favorites"}
            />
        </button>
    );
};
