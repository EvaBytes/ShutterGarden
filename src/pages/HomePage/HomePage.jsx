import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./HomePage.css";

export const HomePage = () => {
    const [images, setImages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const fetchImages = async (query = "") => {
        try {
            const clientId = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

            if (!clientId) {
                console.error("Unsplash Access Key is missing!");
                return;
            }

            const endpoint = query
                ? `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${clientId}`
                : `https://api.unsplash.com/photos/random?count=12&client_id=${clientId}`;

            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            setImages(query ? data.results : data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchImages(searchQuery);
    };

    const navigateToFavorites = () => {
        navigate("/favorites");
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

            <button className="favorites-button" onClick={navigateToFavorites}>
                <img src="src/assets/heartPhone.png" alt="Favorite Icon" />
            </button>

            <div className="image-gallery">
                {images.map((image) => (
                    <div key={image.id} className="image-container">
                        <img src={image.urls.small} alt={image.alt_description} />
                        <button onClick={() => handleAddToFavorites(image)}>Add to Favorites</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
