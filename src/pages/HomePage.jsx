import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext/CartContext';
import './HomePage.css';

const url = 'https://66870bab83c983911b0469c0.mockapi.io/LaLuna/az/Luna';

const HomePage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'all',
    priceRange: [0, 1000],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(url);
      const products = await response.json();
      setProducts(products);
      setFilteredProducts(products);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Use useCallback to memoize the applyFilters function
  const applyFilters = useCallback(() => {
    let results = products;

    if (filters.searchTerm) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      results = results.filter((product) => product.category === filters.category);
    }

    results = results.filter(
      (product) =>
        product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    setFilteredProducts(results);
  }, [filters, products]);  // Add filters and products as dependencies

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);  // Now use applyFilters in the dependency array

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePagination = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="home-page">
      <header>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <div className="search-bar">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
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
          onChange={handleFilterChange}
        />
        <button onClick={applyFilters}>Search</button>
      </div>

      <div className="filters">
        <div className="price-range">
          <label>Price Range:</label>
          <input
            type="number"
            value={filters.priceRange[0]}
            min="0"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [Number(e.target.value), prev.priceRange[1]],
              }))
            }
          />
          <input
            type="number"
            value={filters.priceRange[1]}
            min="0"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], Number(e.target.value)],
              }))
            }
          />
        </div>
      </div>

      <div className="product-list">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <Link to={`/product/${product.id}`}>
              <button>More Details</button>
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => handlePagination('prev')} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredProducts.length / productsPerPage)}
        </span>
        <button
          onClick={() => handlePagination('next')}
          disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
