export const FavButton = ({ onClick }) => {
    return (
        <button className="favorites-button" onClick={onClick}>
            <img src="src/assets/heartPhone.png" alt="Favorite Icon" />
        </button>
    );
};
