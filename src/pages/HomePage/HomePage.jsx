import { useEffect, useState } from "react";

export const HomePage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getRandomImages = async () => {
            try {
                const clientId = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

                if (!clientId) {
                    console.error("Unsplash Access Key is missing!");
                    return;
                }

                
                const response = await fetch(
                    `https://api.unsplash.com/photos/random?count=12&client_id=${clientId}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setImages(data); // 
                localStorage.setItem("randomImages", JSON.stringify(data));
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        getRandomImages();
    }, []);

    return (
        <div>
            {images.map((image) => (
                <img key={image.id} src={image.urls.small} alt={image.alt_description} />
            ))}
        </div>
    );
};
