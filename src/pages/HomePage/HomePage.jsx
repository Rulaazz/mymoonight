import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../components/CartContext/CartContext';
import './HomePage.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://66870bab83c983911b0469c0.mockapi.io/LaLuna/az/Luna';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const ProductCard = ({ product, addToCart }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>${product.price}</p>
    <button onClick={() => addToCart(product)}>Add to Cart</button>
    <Link to={`/product/${product.id}`}>
      <button>More Details</button>
    </Link>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    <button onClick={() => onPageChange('prev')} disabled={currentPage === 1}>
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button onClick={() => onPageChange('next')} disabled={currentPage === totalPages}>
      Next
    </button>
  </div>
);

const SearchBar = ({ filters, onFilterChange }) => (
  <div className="search-bar">
    <select
      name="category"
      value={filters.category}
      onChange={(e) => onFilterChange(e.target.name, e.target.value)}
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
    />
  </div>
);

const PriceFilter = ({ priceRange, onPriceChange }) => (
  <div className="price-range">
    <label>Price Range:</label>
    <input
      type="number"
      value={priceRange[0]}
      min="0"
      onChange={(e) => onPriceChange('min', Number(e.target.value))}
    />
    <input
      type="number"
      value={priceRange[1]}
      min="0"
      onChange={(e) => onPriceChange('max', Number(e.target.value))}
    />
  </div>
);

const HomePage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'all',
    priceRange: [0, 1000],
  });
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      .filter(
        (product) =>
          filters.category === 'all' || product.category === filters.category
      )
      .filter(
        (product) =>
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1]
      );
  }, [products, debouncedSearchTerm, filters]);

  const totalPages = Math.ceil(filteredProducts.length / 10);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * 10;
    return filteredProducts.slice(start, start + 12);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (direction) => {
    setCurrentPage((prev) =>
      direction === 'next' ? Math.min(prev + 1, totalPages) : Math.max(prev - 1, 1)
    );
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    if (name !== 'priceRange') setCurrentPage(1);
  };

  const handlePriceChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: type === 'min' ? [value, prev.priceRange[1]] : [prev.priceRange[0], value],
    }));
  };

  if (loading) {
    return (
      <div className="loading">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="skeleton-card"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-page">
      <SearchBar filters={filters} onFilterChange={handleFilterChange} />
      <PriceFilter priceRange={filters.priceRange} onPriceChange={handlePriceChange} />
      <div className="product-list">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
