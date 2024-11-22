import React from "react";
import "./Gallery.css";

export const Gallery = ({ images, deleteButton, downloadButton, favButton }) => (
  <div className="gallery">
    {images.map((image) => (
      <div key={image.id} className="image-container">
        <img src={image.urls.small} alt={image.alt_description} />
        <div className="buttons">
          {favButton}
          {deleteButton}
          {downloadButton}
        </div>
      </div>
    ))}
  </div>
);
