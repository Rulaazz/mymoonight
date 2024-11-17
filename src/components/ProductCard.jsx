import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Coach: {product.coach}</p>
      <p>Description: {product.description}</p>
      <Link to={`/products/${product.id}`}>View Details</Link>
    </div>
  );
};

export default ProductCard;
