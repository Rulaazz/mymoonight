import React from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const buttonActions = {
    add: () => alert('Add Product functionality goes here!'),
    edit: () => alert('Edit Product functionality goes here!'),
    delete: () => alert('Delete Product functionality goes here!'),
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button className="add-product-btn" onClick={buttonActions.add}>
        Add New Product
      </button>
      <button className="edit-product-btn" onClick={buttonActions.edit}>
        Edit Product
      </button>
      <button className="delete-product-btn" onClick={buttonActions.delete}>
        Delete Product
      </button>
      <div className="alert-section">Alert/notification system goes here</div>
    </div>
  );
};

export default AdminPage;
