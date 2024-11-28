import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages } from "../../features/unsplashSlice";
import { DownloadButton } from "../../components/Buttons/DownloadButton.jsx";
import { FavButton } from "../../components/Buttons/FavButton.jsx";
import { useNavigate } from "react-router-dom"; 
import search from "../../assets/searchSMALL.png";
import heartPhoneIcon from "../../assets/heartPhone.png";
import "./HomePage.css";

export const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { images, loading, error } = useSelector((state) => state.unsplash);
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
        dispatch(fetchImages(""));
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

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

    const handleImageClick = (imageId) => {
        setSelectedImageId((prev) => (prev === imageId ? null : imageId));
    };

    return (
        <div className="homepage">
            <header className="homepage-header">
                <button
                    className="favorites-button"
                    onClick={() => navigate("/favorites")} 
                >
                    <img
                        className="favorites-icon"
                        src={heartPhoneIcon}
                        alt="Go to Favorites"
                    />
                </button>
            </header>

            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    aria-label="Search Input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" aria-label="Search">
                    <img src={search} alt="Search" />
                </button>
            </form>

            {loading && <p className="loading">Loading images...</p>}
            {error && <p className="error-message">Error: {error}</p>}

            <div className="image-gallery">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={`image-card ${
                            selectedImageId === image.id ? "selected" : ""
                        }`}
                        onClick={() => handleImageClick(image.id)} 
                    >
                        <img src={image.urls.small} alt={image.alt_description} />
                        <div
                            className={`image-overlay ${
                                selectedImageId === image.id ? "visible" : ""
                            }`}
                        >
                            <DownloadButton image={image} />
                            <FavButton
                                onToggleFavorite={handleToggleFavorite}
                                image={image}
                                isFavorite={favorites.some(
                                    (fav) => fav.id === image.id
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
