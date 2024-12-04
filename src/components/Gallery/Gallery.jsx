import {React} from "react";
import "./Gallery.css";

export const Gallery = ({ images, downloadButton, favButton }) => (
  <div className="gallery">
    {images.map((image) => (
      <div key={image.id} className="image-container">
        <img src={image.urls.regular} alt={image.alt_description} />
        <div className="buttons">
          {favButton}
          {downloadButton}
        </div>
      </div>
    ))}
  </div>
);
