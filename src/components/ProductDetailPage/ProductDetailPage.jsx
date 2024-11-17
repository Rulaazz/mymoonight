import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../CartContext/CartContext';
import './ProductDetailPage.css';

const url = 'https://66870bab83c983911b0469c0.mockapi.io/LaLuna/az/Luna';

const ProductDetailPage = () => {
  const { id } = useParams(); // Get product ID from URL
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${url}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <Link to="/">Back to Products</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-message">
        <p>Product not found</p>
        <Link to="/">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="back-button">
        <Link to="/">Back to Products</Link>
      </div>

      <div className="product-detail">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
        <h2>{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>

        <button
          onClick={() => {
            addToCart(product);
            alert(`${product.name} added to cart!`);
          }}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
