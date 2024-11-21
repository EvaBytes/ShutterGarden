export const SearchButton = ({ onClick }) => {
    return (
        <button type="submit" aria-label="Search" onClick={onClick}>
            <img src="src/assets/searchSMALL.png" alt="Search Icon" />
        </button>
    );
};
