import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            Homy<span className="footer-logo-dot" />z
          </div>
          <p className="footer-tagline">Our vision is to make all people the best place to live for them.</p>
        </div>
        <div className="footer-right">
          <h4 className="footer-info-title">Information</h4>
          <ul className="footer-links">
            <li><a href="#">Property</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Product</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 