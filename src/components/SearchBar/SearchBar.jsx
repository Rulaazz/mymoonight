import React from 'react';



const SearchBar = ({ filters, onFilterChange }) => (
  <div className="search-bar">
    <select
      name="category"
      value={filters.category}
      onChange={(e) => onFilterChange(e.target.name, e.target.value)}
      className="filter-select"
    >
      <option value="all">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="fashion">Fashion</option>
    </select>
    <input
      type="text"
      placeholder="Search products..."
      name="searchTerm"
      value={filters.searchTerm}
      onChange={(e) => onFilterChange(e.target.name, e.target.value)}
      className="search-input"
    />
  </div>
);

export default SearchBar;
