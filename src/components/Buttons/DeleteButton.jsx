import React from "react";
import DeleteFavorites from "../../assets/Trash.png";

export const DeleteButton = ({ onDelete }) => {
    const handleClick = (e) => {
        e.stopPropagation(); 
        if (onDelete && typeof onDelete === "function") {
            onDelete();
        }
    };

    return (
        <button
            className="delete-button"
            onClick={handleClick}
            aria-label="Delete Image"
        >
            <img src={DeleteFavorites} alt="Delete image" />
        </button>
    );
};
