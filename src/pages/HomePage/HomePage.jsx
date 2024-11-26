import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages } from "../../features/unsplashSlice";
import DeleteButton from "../../components/Buttons/DeleteButton.jsx";
import DownloadButton from "../../components/Buttons/DownloadButton.jsx";
import FavButton from "../../components/Buttons/FavButton.jsx";
import "./HomePage.css";

const HomePage = () => {
    const dispatch = useDispatch();
    const { images, loading, error } = useSelector((state) => state.unsplash);
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    
    useEffect(() => {
    dispatch(fetchImages(""));
}, [dispatch]);

const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchImages(searchQuery));
};

const handleToggleFavorite = (image) => {
    setFavorites((prev) =>
        prev.some((fav) => fav.id === image.id)
        ? prev.filter((fav) => fav.id !== image.id)
        : [...prev, image]
    );
};

const displayedImages = showFavoritesOnly
    ? images.filter((image) =>
        favorites.some((fav) => fav.id === image.id)
    )
    : images;

return (
    <div className="homepage">
      {/* Header */}
    <header className="homepage-header">
        <img src="./assets/ShutterGarden.png" alt="ShutterGarden Logo" className="homepage-logo" />
        <button
        className="favorites-button"
        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
            
            <img
            src={showFavoritesOnly ? "./assets/heartFull.png" : "./assets/heartEmpty.png"}
            alt="Favorites"
            />
        </button>
    </header>

      {/* Search Bar */}
    <form className="search-bar" onSubmit={handleSearch}>
        <input
        type="text"
        placeholder="What are you looking for?"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">
            <img src="./assets/searchIcon.png" alt="Search" />
        </button>
        </form>

      {/* Image Gallery */}
    {loading && <p>Loading...</p>}
    {error && <p className="error-message">Error: {error}</p>}
    <div className="image-gallery">
        {displayedImages.length > 0 ? (
            displayedImages.map((image) => (
            <div key={image.id} className="image-card">
                <img src={image.urls.small} alt={image.alt_description} />
                <div className="image-actions">
                <DownloadButton image={image} />
                <FavButton
                onToggleFavorite={handleToggleFavorite}
                image={image}
                isFavorite={favorites.some((fav) => fav.id === image.id)}
                />
                <DeleteButton />
                </div>
            </div>
        ))
        ) : (
            !loading && <p>No images to display.</p>
        )}
        </div>
    </div>
    );
};

export default HomePage;