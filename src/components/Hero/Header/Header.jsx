import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { auth } from "../../../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

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
            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>
              </>
            )}
            {user && (
              <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            )}
          </ul>
        </nav>
        <a href="#contact" className="contact-btn">Contact</a>
      </div>
    </header>
  );
};

export default Header;