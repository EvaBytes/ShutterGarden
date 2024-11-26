export const FavoritesList = ({ favorites, filterFavorite, deleteButton }) => {
  const navigate = useNavigate();

  const handleReturnToHome = () => {
    navigate("/");
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-list">
        <h1>Favorites</h1>
        <p>No favorite images added yet.</p>
        <button className="return-button" onClick={handleReturnToHome}>
          Return to HomePage
        </button>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <h1>Favorites</h1>
      <button className="return-button" onClick={handleReturnToHome}>
        Return to HomePage
      </button>
      {filterFavorite}
      <div className="favorites-gallery">
        {favorites.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.urls.small} alt={image.alt_description} />
            <div className="image-actions">
              {deleteButton && React.cloneElement(deleteButton, { image })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
