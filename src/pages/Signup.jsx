import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { onAuthStateChanged } from "firebase/auth";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login?signup=success");
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="signup-main-wrapper-modern">
      <div className="signup-card-modern">
        <div className="signup-illustration-modern">
          <div className="signup-illustration-gradient">
            <div className="signup-illustration-content">
              <h2>Start your journey<br />with our platform.</h2>
              <p>Sign up to access our user-friendly admin dashboard and manage your properties with ease.</p>
              <svg className="signup-bubble-svg" width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="60" cy="30" rx="55" ry="25" fill="url(#bubbleGradient)"/>
                <defs>
                  <linearGradient id="bubbleGradient" x1="0" y1="0" x2="120" y2="60" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#fff6"/>
                    <stop offset="1" stopColor="#fff2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <div className="signup-form-modern-wrapper">
          <form className="signup-form-modern" onSubmit={handleSubmit}>
            <h2 className="signup-title-modern">Create an Account</h2>
            <p className="signup-subtitle-modern">Sign up to get started</p>
            <div className="signup-input-row">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="signup-input-modern"
              />
            </div>
            <div className="signup-input-row">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="signup-input-modern"
              />
              <span className="signup-eye-icon" onClick={() => setShowPassword((v) => !v)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="signup-input-row">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="signup-input-modern"
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="signup-btn-modern">Create Account</button>
            <div className="signup-divider-modern-row">
              <span className="signup-divider-modern" />
              <span className="signup-or-modern">Or Sign up with</span>
              <span className="signup-divider-modern" />
            </div>
            <div className="signup-social-modern-row">
              <button type="button" className="signup-social-modern-btn google"><FaGoogle /> Google</button>
              <button type="button" className="signup-social-modern-btn facebook"><FaFacebookF /> Facebook</button>
            </div>
            <p className="signup-login-modern-link">
              Already have an account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup; 