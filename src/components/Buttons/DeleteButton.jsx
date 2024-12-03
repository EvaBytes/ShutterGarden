import React, {useState} from "react";

export const DeleteButton = () => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleClick = () => {
    console.log("Delete action triggered.");
    setIsDeleted(true);
  };

  if (isDeleted) {
    return <p>Image deleted</p>;
  }

  return (
    <button className="delete-button" onClick={handleClick} aria-label="Delete Image">
      Delete
    </button>
  );
};

