import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import { CartProvider } from './components/CartContext/CartContext';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage/CartPage';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import LoginPage from './pages/Login/Login'; // Import LoginPage
import AdminPage from './pages/AdminPage/AdminPage'; // Import AdminPage
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';

const App = () => {
  const isLoggedIn = true; // Replace with your actual authentication logic
  const isAdmin = true; // Replace with your actual admin-check logic

  return (
    <UserProvider>
      <Router>
        <CartProvider>
          <Menu />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Admin Route */}
            <Route
              path="/admin"
              element={
                isLoggedIn && isAdmin ? (
                  <AdminPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </CartProvider>
      </Router>
    </UserProvider>
  );
};

export default App;

