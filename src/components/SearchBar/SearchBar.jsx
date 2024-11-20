import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="What are you looking for?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>
        <i className="fas fa-search"></i> 
      </button>
    </div>
  );
};

export default SearchBar;
