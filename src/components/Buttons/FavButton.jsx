import React from 'react';

const ImageCard = ({ image, onFavorite }) => {
  return (
    <div className="image-card">
      <img src={image.urls.small} alt={image.alt_description} />
      <button className="favorite-button" onClick={() => onFavorite(image)}>
        <i className="fas fa-heart"></i> 
      </button>
    </div>
  );
};

export default ImageCard;
