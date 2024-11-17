import React, { useState } from 'react';
import { useCart } from '../../components/CartContext/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', address: '', email: '' });
  const [error, setError] = useState('');

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty. Add items before proceeding to checkout.');
      return;
    }
    setError('');
    setIsCheckout(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleConfirmPurchase = () => {
    console.log('Purchase Confirmed:', userInfo);
    alert('Thank you for your purchase!');
    setUserInfo({ name: '', address: '', email: '' });
    setIsCheckout(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {error && <p className="error-message">{error}</p>}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="back-to-products-btn">Browse Products</Link>
        </div>
      ) : (
        <div className="cart-container">
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name} className="product-image" />
                  </Link>
                </div>
                <div className="cart-item-details">
                  <Link to={`/product/${item.id}`} className="product-name">
                    <h3>{item.name}</h3>
                  </Link>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                  <div className="cart-item-buttons">
                    <button onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p><strong>Total:</strong> ${calculateTotal()}</p>
            {!isCheckout && (
              <button onClick={handleCheckout} className="checkout-btn">Proceed to Checkout</button>
            )}
          </div>

          {isCheckout && (
            <div className="checkout-form">
              <h3>Checkout Information</h3>
              <label>
                Name:
                <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} required />
              </label>
              <label>
                Address:
                <input type="text" name="address" value={userInfo.address} onChange={handleInputChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} required />
              </label>
              <button onClick={handleConfirmPurchase} className="confirm-btn">Confirm Purchase</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
