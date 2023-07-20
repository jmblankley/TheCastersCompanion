import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="Search">
      <div>
        <input
          type="text"
          placeholder="Search . . ."
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <i className="bi bi-filter-right filterButton fs-6"></i>
      </div>
    </div>
  );
};

export default Search;
