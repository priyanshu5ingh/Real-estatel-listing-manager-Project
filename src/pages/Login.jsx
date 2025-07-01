import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { onAuthStateChanged } from "firebase/auth";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const signupSuccess = location.search.includes("signup=success");

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
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-main-wrapper">
      <div className="login-card-modern">
        <div className="login-illustration-modern">
          <div className="login-illustration-gradient">
            <div className="login-illustration-content">
              <h2>Simplify<br />management with<br />our dashboard.</h2>
              <p>Simplify your search with our user friendly admin dashboard</p>
              <svg className="login-bubble-svg" width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div className="login-form-modern-wrapper">
          <form className="login-form-modern" onSubmit={handleSubmit}>
            {signupSuccess && (
              <div className="login-success-message">Your account is created, please log in now.</div>
            )}
            <h2 className="login-title-modern">Welcome Back</h2>
            <p className="login-subtitle-modern">Please login to your account</p>
            <div className="login-input-row">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input-modern"
              />
            </div>
            <div className="login-input-row">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input-modern"
              />
              <span className="login-eye-icon" onClick={() => setShowPassword((v) => !v)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="login-forgot-row">
              <a href="#" className="login-forgot-link">Forgot password?</a>
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="login-btn-modern">Login</button>
            <div className="login-divider-modern-row">
              <span className="login-divider-modern" />
              <span className="login-or-modern">Or Login with</span>
              <span className="login-divider-modern" />
            </div>
            <div className="login-social-modern-row">
              <button type="button" className="login-social-modern-btn google"><FaGoogle /> Google</button>
              <button type="button" className="login-social-modern-btn facebook"><FaFacebookF /> Facebook</button>
            </div>
            <p className="login-signup-modern-link">
              Don&apos;t have an account? <a href="/signup">Signup</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 