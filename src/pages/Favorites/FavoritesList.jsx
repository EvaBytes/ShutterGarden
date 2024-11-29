import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReturnPhoneIcon from "../../assets/ReturnPhone.png";
import "./FavoritesList.css";

export const FavoritesList = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleReturnToHome = () => {
    navigate("/");
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-list">
        <header>
          <button className="return-home-button" onClick={handleReturnToHome}>
            <img src={ReturnPhoneIcon} alt="Return to HomePage" />
          </button>
        </header>
        <h2>Collect and view your favorite images here.</h2>
        <p>Tap the heart on any image to add it to your favorites. All your favorite images will appear here.</p>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <header className="favorites-header">
        <button className="return-home-button" onClick={handleReturnToHome}>
          <img src="./assets/homeIcon.png" alt="Return to HomePage" />
        </button>
      </header>

      <div className="filter-bar">
      </div>

      <div className="favorites-gallery">
        {favorites.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.urls.small} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
};
