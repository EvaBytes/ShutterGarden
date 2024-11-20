import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnsplashImages } from '../../features/unsplashSlice';
import { addFavorite } from '../../features/favoritesSlice';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';

const Gallery = () => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.unsplash);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = (query) => {
    dispatch(fetchUnsplashImages({ query, page: 1, perPage: 10 }));
  };

  const handleFavorite = (image) => {
    dispatch(addFavorite(image));
  };

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <h1>ShutterGarden</h1>
        <button onClick={() => (window.location.href = '/favorites')} className="favorites-button">
          <i className="fas fa-heart"></i> Favorites
        </button>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="gallery-grid">
        {images.map((image) => (
          <ImageCard key={image.id} image={image} onFavorite={handleFavorite} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
