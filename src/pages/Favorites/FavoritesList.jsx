import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownloadButton } from '../../components/Buttons/DownloadButton.jsx';
import { DeleteButton } from '../../components/Buttons/DeleteButton.jsx';
import ReturnHomeIcon from '../../assets/ReturnHome.png';
import BackgroundFavorites from '../../assets/favoriteBG.png';
import EditText from '../../assets/EditText.png';
import './FavoritesList.css';

export const FavoritesList = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const [modalDescription, setModalDescription] = useState("");
    const [notification, setNotification] = useState(null);
    const [filter, setFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState("ascending");

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
    }, []);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleReturnToHome = () => {
        navigate("/");
    };

    const handleDelete = (imageId) => {
        const updatedFavorites = favorites.filter((image) => image.id !== imageId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        showNotification("Image removed from favorites.");
    };

    const openModal = (image) => {
        setModalImage(image);
        setModalDescription(image.alt_description || "");
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImage(null);
        setModalDescription("");
    };

    const saveDescription = () => {
        const updatedFavorites = favorites.map((image) =>
            image.id === modalImage.id
                ? { ...image, alt_description: modalDescription }
                : image
        );
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        closeModal();
        showNotification("Description updated successfully.");
    };

    const filterAndSortFavorites = (favorites, filter, sortOrder) => {
        let filtered = favorites;

        switch (filter) {
            case "height":
                filtered = favorites.sort((a, b) =>
                    sortOrder === "ascending" ? a.height - b.height : b.height - a.height
                );
                break;
            case "width":
                filtered = favorites.sort((a, b) =>
                    sortOrder === "ascending" ? a.width - b.width : b.width - a.width
                );
                break;
            case "likes":
                filtered = favorites.sort((a, b) =>
                    sortOrder === "ascending" ? a.likes - b.likes : b.likes - a.likes
                );
                break;
            case "date":
                filtered = favorites.sort((a, b) =>
                    sortOrder === "ascending"
                        ? new Date(a.date_added) - new Date(b.date_added)
                        : new Date(b.date_added) - new Date(a.date_added)
                );
                break;
            default:
                filtered = favorites; 
        }

        return filtered;
    };

    const sortedAndFilteredFavorites = filterAndSortFavorites(
        favorites,
        filter,
        sortOrder
    );

    return (
        <div className="favorites-list">
            <header className="favorites-header">
                <button
                    className="return-home-button"
                    onClick={handleReturnToHome}
                    aria-label="Return to Home Page"
                >
                    <span className="return-homepage">Homepage</span>
                    <img src={ReturnHomeIcon} alt="Return to HomePage" />
                </button>
            </header>

            <div className="filter-buttons">
                <button className="filter-button" onClick={() => setFilter("all")}>All</button>
                <button className="filter-button" onClick={() => setFilter("height")}>Height</button>
                <button className="filter-button" onClick={() => setFilter("width")}>Width</button>
                <button className="filter-button" onClick={() => setFilter("likes")}>Likes</button>
                <button className="filter-button" onClick={() => setFilter("date")}>Date</button>

                <div className="sort-order-controls">
                    <label>Sort Order:</label>
                    <button
                        className={`sort-button ${sortOrder === "ascending" ? "active" : ""}`}
                        onClick={() => setSortOrder("ascending")}
                    >
                        <span>↑</span>
                    </button>
                    <button
                        className={`sort-button ${sortOrder === "descending" ? "active" : ""}`}
                        onClick={() => setSortOrder("descending")}
                    >
                        <span>↓</span>
                    </button>
                </div>
            </div>

            {!favorites || favorites.length === 0 ? (
                <div className="overlay-container">
                    <img
                        className="favorites-background"
                        src={BackgroundFavorites}
                        alt="Heart Background"
                    />
                    <div className="text-overlay">
                        <h2>Collect and view your favorite images here.</h2>
                        <p>
                            Tap the heart on any image on the Homepage to add it to your
                            favorites. All your favorite images will appear here.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="favorites-gallery">
                    {sortedAndFilteredFavorites.map((image) => (
                        <div
                            key={image.id}
                            className={`image-card ${
                                selectedImageId === image.id ? "selected" : ""
                            }`}
                            onClick={() =>
                                setSelectedImageId((prev) => (prev === image.id ? null : image.id))
                            }
                        >
                            <img src={image.urls.small} alt={image.alt_description} />
                            {selectedImageId === image.id && (
                                <div className="image-overlay visible">
                                    <DownloadButton image={image} />
                                    <DeleteButton onDelete={() => handleDelete(image.id)} />
                                </div>
                            )}
                            <div className="description-container">
                                <p>{image.alt_description || "No description added"}</p>
                                <button
                                    className="edit-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openModal(image);
                                    }}
                                >
                                    <img src={EditText} alt="Edit Description" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={modalImage?.urls.small}
                            alt={modalImage?.alt_description || "Image"}
                            className="modal-image"
                        />
                        <h2>Edit your description</h2>
                        <input
                            type="text"
                            value={modalDescription}
                            onChange={(e) => setModalDescription(e.target.value)}
                            placeholder="Add a description..."
                        />
                        <div className="modal-actions">
                            <button onClick={saveDescription}>Save</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
        </div>
    );
};
