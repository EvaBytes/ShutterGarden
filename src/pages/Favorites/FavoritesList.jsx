import React from "react";
import { useNavigate } from "react-router-dom";
import "./FavoritesList.css";

export const FavoritesList = ({ filterFavorite, deleteButton, gallery: Gallery }) => {
  const navigate = useNavigate();

  const handleReturnToHome = () => {
    navigate("/");
  };

  return (
    <div className="favorites-list">
      <h1>Favorites</h1>
      <button className="return-button" onClick={handleReturnToHome}>
        Return to HomePage
      </button>
      {filterFavorite}
      <Gallery deleteButton={deleteButton} />
    </div>
  );
};
