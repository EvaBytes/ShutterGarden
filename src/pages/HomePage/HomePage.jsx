import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages } from "./features/unsplashSlice.js";
import DeleteButton from "./components/DeleteButton";
import DownloadButton from "./components/DownloadButton";
import FavButton from "../components/FavButton";
import FilterFavorite from "./components/FilterFavorite";
import "./pages/HomePage/HomePage.css";

const HomePage = () => {
    const dispatch = useDispatch();
    const { images: photos, loading: status, error } = useSelector((state) => state.unsplash);
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        dispatch(fetchImages({ query: "", page: 1 }));
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            console.error("Search query cannot be empty");
            return;
        }
        dispatch(fetchImages({ query: searchQuery.trim(), page: 1 }));
    };
    

    const handleAddToFavorites = (image) => {
        setFavorites((prev) =>
            prev.some((fav) => fav.id === image.id)
                ? prev.filter((fav) => fav.id !== image.id)
                : [...prev, image]
        );
    };

    return (
        <div className="homepage">
            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" aria-label="Search">
                    <img src="src/assets/searchSMALL.png" alt="Search Icon" />
                </button>
            </form>

            <FilterFavorite onFilter={() => console.log("Filtering favorites...")} />
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p className="error-message">{error}</p>}

            <div className="image-gallery">
                {photos.length > 0 &&
                    photos.map((image) => (
                        <div key={image.id} className="image-container">
                            <img src={image.urls.small} alt={image.alt_description} />
                            <div className="image-actions">
                                <DownloadButton image={image} />
                                <FavButton
                                    image={image}
                                    onToggleFavorite={handleAddToFavorites}
                                    isFavorite={favorites.some((fav) => fav.id === image.id)}
                                />
                                <DeleteButton image={image} onDelete={() => console.log("Delete")} />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default HomePage;