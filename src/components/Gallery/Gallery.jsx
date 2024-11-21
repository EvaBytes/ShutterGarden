import React, { useState } from 'react';

const Gallery = ({ images }) => {
    if (images.length === 0) {
        return <p>No images to display.</p>;
    }
    
    return (
    <div className="gallery">
        {images.map((image) => (
            <div className="gallery-item" key={image.id}>
                <img
                    src={image.urls.small}
                    alt={image.alt_description || "Unsplash Image"}
                    className="gallery-image"
                />
            </div>
        ))}
    </div>
    );
};

export default Gallery;