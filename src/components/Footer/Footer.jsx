import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/terms">Terms & Conditions</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/contact">Contact Us</a>
      </div>
      <p>&copy; 2024 MyStore, All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
