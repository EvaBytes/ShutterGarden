import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages } from "../../features/unsplashSlice";
import { DownloadButton } from "../../components/Buttons/DownloadButton.jsx";
import { FavButton } from "../../components/Buttons/FavButton.jsx";
import { useNavigate } from "react-router-dom";
import search from "../../assets/searchSMALL.png";
import heartPhoneIcon from "../../assets/heartPhone.png";
import emptyHeart from "../../assets/IconFAV.png";
import filledHeart from "../../assets/filledHeart.png";
import debounce from "lodash/debounce";
import "./HomePage.css";

export const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { images, loading, error } = useSelector((state) => state.unsplash);
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageMobile, setSelectedImageMobile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(false);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
        dispatch(fetchImages(""));
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isModalOpen) {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen]);

    const handleSearch = debounce((query) => {
        dispatch(fetchImages(query));
    }, 300);

    const handleToggleFavorite = (image) => {
        setFavorites((prev) =>
            prev.some((fav) => fav.id === image.id)
                ? prev.filter((fav) => fav.id !== image.id)
                : [...prev, image]
        );
    };

    const preloadImage = (url) => {
        const img = new Image();
        img.src = url;
    };

    const openModal = (image) => {
        setIsImageLoading(true);
        setSelectedImage(image);
        setIsModalOpen(true);
        preloadImage(image.urls.full);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const handleImageLoaded = () => {
        setIsImageLoading(false);
    };

    const handleImageClick = (image) => {
        if (window.innerWidth <= 768) {
            setSelectedImageMobile(prev => (prev?.id === image.id ? null : image));
        } else {
            openModal(image);
        }
    };

    return (
        <div className="homepage">
            <header className="homepage-header">
                <button
                    className="favorites-button"
                    onClick={() => navigate("/favorites")}
                    aria-label="Go to Favorites"
                >
                    <img className="favorites-icon" src={heartPhoneIcon} alt="Go to Favorites" />
                    <span className="favorites-text">Favorites ❤ </span>
                </button>
            </header>

            <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    aria-label="Search Input"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleSearch(e.target.value);
                    }}
                />
                <button type="submit" aria-label="Search">
                    <img src={search} alt="Search" />
                </button>
            </form>

            {loading && <p className="loading">Loading images...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            {!loading && images.length === 0 && (
                <p className="no-results">No images found. Try a different search.</p>
            )}

            <div className="image-gallery">
                {images.map((image) => (
                    <div
                        key={image.id}
                        className={`image-card ${selectedImageMobile?.id === image.id ? "selected" : ""}`}
                        onClick={() => handleImageClick(image)}
                    >
                        <img src={image.urls.small} alt={image.alt_description} />
                        <div className="image-overlay">
                            <div onClick={(e) => e.stopPropagation()} className="button-container">
                                <DownloadButton image={image} />
                            </div>
                            <div onClick={(e) => e.stopPropagation()} className="button-container">
                                <FavButton
                                    onToggleFavorite={handleToggleFavorite}
                                    image={image}
                                    isFavorite={favorites.some(fav => fav.id === image.id)}
                                    filledIcon={filledHeart}
                                    emptyIcon={emptyHeart}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {isImageLoading && <p className="loading-spinner">Loading image...</p>}
                        <img
                            src={selectedImage?.urls.full}
                            alt="Selected"
                            className="modal-image"
                            onLoad={handleImageLoaded}
                            style={{
                                display: isImageLoading ? "none" : "block",
                            }}
                        />
                        <button className="close-button" onClick={closeModal}>
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
