import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import "./Login.css";
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useToast();
  const signupSuccess = location.search.includes("signup=success");

  useEffect(() => {
    if (signupSuccess) {
      showSuccess("Account created successfully! Please log in.", 6000);
    }
  }, [signupSuccess, showSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      showSuccess("Login successful! Welcome back.");
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid email or password. Please try again.";
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    showError(`${provider} login is not implemented yet. Please use email/password.`);
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
                disabled={loading}
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
                disabled={loading}
              />
              <span className="login-eye-icon" onClick={() => setShowPassword((v) => !v)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="login-forgot-row">
              <a href="#" className="login-forgot-link">Forgot password?</a>
            </div>
            <button type="submit" className="login-btn-modern" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size="small" text="" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
            <div className="login-divider-modern-row">
              <span className="login-divider-modern" />
              <span className="login-or-modern">Or Login with</span>
              <span className="login-divider-modern" />
            </div>
            <div className="login-social-modern-row">
              <button 
                type="button" 
                className="login-social-modern-btn google"
                onClick={() => handleSocialLogin("Google")}
                disabled={loading}
              >
                <FaGoogle /> Google
              </button>
              <button 
                type="button" 
                className="login-social-modern-btn facebook"
                onClick={() => handleSocialLogin("Facebook")}
                disabled={loading}
              >
                <FaFacebookF /> Facebook
              </button>
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