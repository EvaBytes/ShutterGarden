import { useDispatch, useSelector } from 'react-redux';
import { fetchUnsplashImages } from '../features/unsplashSlice';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.unsplash);

  const handleSearch = () => {
    dispatch(fetchUnsplashImages({ query: 'nature', page: 1, perPage: 10 }));
  };

  return (
    <div>
      <button onClick={handleSearch}>Search Images</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.urls.thumb} alt={image.alt_description} />
        ))}
      </div>
    </div>
  );
};
