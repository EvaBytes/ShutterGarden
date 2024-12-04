import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReturnHomeIcon from "../../assets/ReturnHome.png";
import BackgroundFavorites from "../../assets/favoriteBG.png";
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

  const getFilteredFavorites = () => {
    if (filter === "all") return favorites;

    const sortedFavorites = [...favorites];

    switch (filter) {
      case "date":
        return sortedFavorites.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "width":
        return sortedFavorites.sort((a, b) => b.width - a.width);
      case "height":
        return sortedFavorites.sort((a, b) => b.height - a.height);
      case "likes":
        return sortedFavorites.sort((a, b) => b.likes - a.likes);
      default:
        return favorites;
    }
  };


  return (
    <div className="favorites-list">
      <header className="favorites-header">
        <button className="return-home-button" onClick={handleReturnToHome}>
          <img src={ReturnHomeIcon} alt="Return to HomePage" />
        </button>
      </header>

      {!favorites || favorites.length === 0 ? (
        <div className="overlay-container">
          <img
            className="favorites-background"
            src={BackgroundFavorites}
            alt="Heart Background"
          />
          <div className="text-overlay">
            <h2>Collect and view your favorite images here.</h2>
            <p>Tap the heart on any image to add it to your favorites. All your favorite images will appear here.</p>
          </div>
        </div>
      ) : (

        <>
          <div className="filter-bar">
            {/* Agrega aquí los filtros si son necesarios */}
          </div>

          <div className="favorites-gallery">
            {favorites.map((image) => (
              <div key={image.id} className="image-card">
                <img src={image.urls.small} alt={image.alt_description} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
