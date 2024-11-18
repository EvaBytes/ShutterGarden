import React from 'react';

const Header = () => {
    return (
    <header className="header">
        <h1 className="logo">ShutterGarden</h1>
    <div className="search-container">
        <input type="text" placeholder="What are you looking for?" />
        <button className="search-button">🔍</button>
    </div>
    <div className="header-icons">
        <button className="favourites-button">❤️</button>
        <div className="profile-pic">👤</div>
    
    </div>
    </header>
    );
};

export default Header;
