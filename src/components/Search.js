import React, { useState } from 'react';
import FilterModal from './FilterModal';

const Search = ({ onSearch, onFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState({
    level: '',
    school: '',
  });

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleFilterButtonClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (filters) => {
    setSelectedFilter(filters);
    onFilter(filters); // Pass filters to the parent component for filtering
    setIsFilterModalOpen(false);
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
        <i
          className="bi bi-filter-right filterButton fs-6"
          onClick={handleFilterButtonClick}
        ></i>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onFilter={handleApplyFilters}
        selectedFilters={selectedFilter}
      />
    </div>
  );
};

export default Search;
