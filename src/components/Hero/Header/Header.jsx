import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          Homy<span className="logo-dot" />z
        </div>
        <nav>
          <ul className="nav-list">
            <li><a href="#residencies">Residencies</a></li>
            <li><a href="#value">Our Value</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#get-started">Get Started</a></li>
          </ul>
        </nav>
        <a href="#contact" className="contact-btn">Contact</a>
      </div>
    </header>
  );
};

export default Header;