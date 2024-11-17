import React from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const handleAddProduct = () => {
    alert('Add Product functionality goes here!');
  };

  const handleEditProduct = () => {
    alert('Edit Product functionality goes here!');
  };

  const handleDeleteProduct = () => {
    alert('Delete Product functionality goes here!');
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleAddProduct}>Add New Product</button>
      <button onClick={handleEditProduct}>Edit Product</button>
      <button onClick={handleDeleteProduct}>Delete Product</button>
      <div className="alert-section">Alert/notification system goes here</div>
    </div>
  );
};

export default AdminPage;
