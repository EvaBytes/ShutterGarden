import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DownloadButton } from "../../components/Buttons/DownloadButton.jsx";
import { DeleteButton } from "../../components/Buttons/DeleteButton.jsx";
import ReturnHomeIcon from "../../assets/ReturnHome.png";
import BackgroundFavorites from "../../assets/favoriteBG.png";
import EditText from "../../assets/EditText.png";
import "./FavoritesList.css";

export const FavoritesList = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [editingImageId, setEditingImageId] = useState(null);
    const [selectedImageId, setSelectedImageId] = useState(null);

    useEffect(() => {
        try {
            const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
            setFavorites(savedFavorites);
        } catch (error) {
            console.error("Error parsing favorites from localStorage:", error);
            setFavorites([]);
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }, 500);

        return () => clearTimeout(timeout);
    }, [favorites]);

    const handleReturnToHome = () => {
        navigate("/");
    };

    const handleDelete = (imageId) => {
        setFavorites((prev) => prev.filter((image) => image.id !== imageId));
    };

    const handleDescriptionChange = (imageId, newDescription) => {
        if (typeof newDescription !== "string") {
            console.error("Description must be a string.");
            return;
        }

        setFavorites((prev) =>
            prev.map((image) =>
                image.id === imageId
                    ? { ...image, alt_description: newDescription.trim() || image.alt_description }
                    : image
            )
        );
    };

    const toggleEditing = (imageId) => {
        setEditingImageId((prev) => (prev === imageId ? null : imageId));
    };

    return (
        <div className="favorites-list">
            <header className="favorites-header">
                <button
                    className="return-home-button"
                    onClick={handleReturnToHome}
                    aria-label="Return to Home Page"
                >
                    <span className="return-homepage">Homepage </span>
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
                        <p>
                            Tap the heart on any image to add it to your favorites. All your
                            favorite images will appear here.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="favorites-gallery">
                    {favorites.map((image) => (
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
                                {editingImageId === image.id ? (
                                    <input
                                        type="text"
                                        value={image.alt_description || ""}
                                        onChange={(e) =>
                                            handleDescriptionChange(image.id, e.target.value)
                                        }
                                        placeholder="Add a description..."
                                        autoFocus
                                    />
                                ) : (
                                    <p>{image.alt_description || "No description added"}</p>
                                )}
                                <button
                                    className="edit-button"
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        toggleEditing(image.id);
                                    }}
                                >
                                    <img src={EditText} alt="Edit Description" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
};
