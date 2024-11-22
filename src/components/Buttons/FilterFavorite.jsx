const FilterFavorite = ({ onFilter }) => {
  const handleClick = () => {
    if (typeof onFilter === "function") {
      onFilter();
    }
  };

  return (
    <button
      className="filter-favorite-button"
      onClick={handleClick}
      aria-label="Filter Favorites"
    >
      Favorites
    </button>
  );
};
