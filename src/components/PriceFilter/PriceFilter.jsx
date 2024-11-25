import React from 'react';

const PriceFilter = ({ priceRange, onPriceChange }) => (
  <div className="price-filter">
    <label className="price-label">Price Range:</label>
    <input
      type="number"
      value={priceRange[0]}
      min="0"
      onChange={(e) => onPriceChange('min', Number(e.target.value))}
      className="price-input"
    />
    <input
      type="number"
      value={priceRange[1]}
      min="0"
      onChange={(e) => onPriceChange('max', Number(e.target.value))}
      className="price-input"
    />
  </div>
);

export default PriceFilter;
