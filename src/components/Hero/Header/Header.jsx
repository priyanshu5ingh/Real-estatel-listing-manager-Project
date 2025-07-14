import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for changes to localStorage (login/logout in other tabs)
    const handleStorage = () => {
      setUser(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}>
          Homy<span className="logo-dot" />z
        </div>
        <nav>
          <ul className="nav-list">
            <li><a href="#residencies">Residencies</a></li>
            <li><a href="#value">Our Value</a></li>
            <li><a href="#get-started">Get Started</a></li>
            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
            {user && (
              <>
                <li><Link to="/add-property">Add Property</Link></li>
                <li className="profile-dropdown">
                  <button className="profile-btn">Profile ▾</button>
                  <ul className="profile-menu">
                    <li><Link to="/profile">Profile</Link></li>
                    <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;