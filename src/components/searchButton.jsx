import React from "react";
import searchIcon from "./assets/searchSMALL.png";

const SearchButton = ({ onClick }) => {
    return (
        <button type="submit" aria-label="Search" onClick={onClick}>
            <img src={searchIcon} alt="Search Icon" />
        </button>
    );
};

export {SearchButton};