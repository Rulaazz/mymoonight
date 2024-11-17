import React from 'react';

const productDetails = ({ match }) => {
 
  const productId = match.params.id;

  
  const productDetails = {
    id: productId,
    name: 'Product A',
    coach: 'Coach A',
    description: 'Detailed description of Product A.',
    
  };

  return (
    <div>
      <h2>{productDetails.name}</h2>
      <p>Coach: {productDetails.coach}</p>
      <p>Description: {productDetails.description}</p>
      <button>Add to Cart</button>
      <button>Add to Wishlist</button>
    </div>
  );
};

export default productDetails;
