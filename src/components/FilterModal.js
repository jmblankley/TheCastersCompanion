import React from 'react';

const FilterModal = ({ isOpen, onClose, onFilter, selectedFilters }) => {
  const [selectedLevel, setSelectedLevel] = React.useState(
    selectedFilters.level || ''
  );
  const [selectedSchool, setSelectedSchool] = React.useState(
    selectedFilters.school || ''
  );

  const handleFilterApply = (e) => {
    e.preventDefault();
    const filters = {
      level: selectedLevel,
      school: selectedSchool,
    };
    onFilter(filters);
  };

  if (!isOpen) {
    return null;
  }

  const handleClearFilters = () => {
    setSelectedLevel('');
    setSelectedSchool('');
    onFilter({ level: '', school: '' }); // Clear filters and show all spells
  };

  return (
    <div className="modal container">
      <div className="modalContent">
        <span className="closeButton" onClick={onClose}>
          &times;
        </span>
        <h2>Filter Options</h2>
        <form onSubmit={handleFilterApply}>
          <div className="mb-3">
            <label htmlFor="level" className="mx-3">
              Level:
            </label>
            <select
              id="level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
              <option value="6">Level 6</option>
              <option value="7">Level 7</option>
              <option value="8">Level 8</option>
              <option value="9">Level 9</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="school" className="mx-3">
              School:
            </label>
            <select
              id="school"
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
            >
              <option value="">All Schools</option>
              <option value="Abjuration">Abjuration</option>
              <option value="Conjuration">Conjuration</option>
              <option value="Divination">Divination</option>
              <option value="Enchantment">Enchantment</option>
              <option value="Evocation">Evocation</option>
              <option value="Illusion">Illusion</option>
              <option value="Necromancy">Necromancy</option>
              <option value="Transmutation">Transmutation</option>
            </select>
          </div>
          <button className="myButton mx-1" type="submit">
            Apply Filters
          </button>
          <button
            className="myButtonInverted mx-1"
            type="button"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </form>
      </div>
    </div>
  );
};

export default FilterModal;
