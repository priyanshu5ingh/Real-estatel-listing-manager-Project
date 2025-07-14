import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/properties/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setAddress(res.data.address);
      } catch (err) {
        setError("Failed to load property.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
      await axios.put(
        `/api/properties/${id}`,
        { title, description, price, address },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Property updated successfully!");
      setTimeout(() => navigate(`/properties/${id}`), 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update property. Please try again."
      );
    }
  };

  if (loading) return <div className="signup-main-wrapper-modern">Loading property...</div>;
  if (error) return <div className="signup-main-wrapper-modern">{error}</div>;

  return (
    <div className="signup-main-wrapper-modern">
      <div className="signup-card-modern">
        <div className="signup-illustration-modern">
          <div className="signup-illustration-gradient">
            <div className="signup-illustration-content">
              <h2>Edit Property</h2>
              <p>Update your property details below.</p>
            </div>
          </div>
        </div>
        <div className="signup-form-modern-wrapper">
          <form className="signup-form-modern" onSubmit={handleSubmit}>
            <div className="signup-input-row">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="signup-input-modern"
              />
            </div>
            <div className="signup-input-row">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="signup-input-modern"
                rows={3}
              />
            </div>
            <div className="signup-input-row">
              <input
                type="number"
                placeholder="Price (INR)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="signup-input-modern"
                min="0"
              />
            </div>
            <div className="signup-input-row">
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="signup-input-modern"
              />
            </div>
            {success && <p className="auth-success">{success}</p>}
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="signup-btn-modern">Update Property</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProperty; 