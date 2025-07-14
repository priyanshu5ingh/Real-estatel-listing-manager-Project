import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`/api/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
      await axios.delete(`/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete property.");
    }
  };

  if (loading) return <div className="signup-main-wrapper-modern">Loading property...</div>;
  if (error) return <div className="signup-main-wrapper-modern">{error}</div>;
  if (!property) return null;

  return (
    <div className="signup-main-wrapper-modern">
      <div className="signup-card-modern">
        <div className="signup-illustration-modern">
          <div className="signup-illustration-gradient">
            <div className="signup-illustration-content">
              <h2>{property.title}</h2>
              <p>{property.address}</p>
              <span style={{ fontWeight: 700, fontSize: "1.2rem" }}>₹{property.price.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
        <div className="signup-form-modern-wrapper">
          <div className="signup-form-modern">
            {property.images && property.images.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                {property.images.map((img, i) => (
                  <img
                    key={img.public_id || i}
                    src={img.url}
                    alt={property.title}
                    style={{ width: 180, height: 120, objectFit: "cover", borderRadius: 8, marginRight: 8 }}
                  />
                ))}
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <strong>Description:</strong>
              <div>{property.description}</div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <strong>Posted by:</strong> {property.user?.email || "Unknown"}
            </div>
            <div style={{ color: "#888", fontSize: 12 }}>Listed on: {new Date(property.createdAt).toLocaleDateString()}</div>
            {property.user && property.user._id === property.userIdFromToken && (
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button className="signup-btn-modern" onClick={() => navigate(`/edit-property/${property._id}`)}>
                  Edit
                </button>
                <button className="signup-btn-modern" style={{ background: "#ff3b3b" }} onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 