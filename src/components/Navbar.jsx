import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext'; // Correct import

const Navbar = () => {
  const { user } = useUser(); // Access the user context

  // Check if user exists and is admin
  const isAdmin = user && user.role === 'admin';

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/Login">Sign In</Link></li>
        {/* Conditionally render Admin link based on user role */}
        {isAdmin && <li><Link to="/AdminPage">Admin</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
