import React, { useState } from 'react';
import './Menu.css'; 
import Navigation from '../Navigation/Navigation';
import { useCart } from '../CartContext/CartContext';
import { LOGIN } from "../../routes/routeConstants";
import { Link, useLocation } from 'react-router-dom';
import { BsCart3 } from "react-icons/bs";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation(); 

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  if (location.pathname === LOGIN) {
    return null;
  }

  return (
    <div>
      <div className="menu-container">
        {!isOpen && (
          <div className="menu-icon" onClick={toggleMenu}>
            ☰ 
          </div>
        )}
     
        {isOpen && <div className="overlay" onClick={closeMenu} />}
        <div className={`side-menu ${isOpen ? 'open' : ''}`}>
          <button className="close-button" onClick={closeMenu}>
            &times; 
          </button>
        
          <div className="title-image1">
        <img src="/LaLuna.png" alt="La Luna" className="title-img-menu1" />
      </div>
          <Navigation closeMenu={closeMenu} /> 
        </div>
      </div>
      
          {/* Title Image */}
          <div className="title-image">
            <img src="/LaLuna.png" alt="La Luna" className="title-img-menu" />
          </div>

          {/* Cart Section */}
          <div className="menu-cart">
            <Link to="/cart">
              <BsCart3 className="cart-icon" />
              <span className="cart-count">{cartItems.length}</span>
            </Link>
          </div>

    </div>
  );
};

export default Menu;
