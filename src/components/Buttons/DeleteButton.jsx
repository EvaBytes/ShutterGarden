import React from "react";

const DeleteButton = ({ onDelete, image }) => {
  const handleClick = () => {
    if (typeof onDelete === "function") {
      onDelete(image);
    }
  };

  return (
    <button className="delete-button" onClick={handleClick} aria-label="Delete Image">
      
    </button>
  );
};
