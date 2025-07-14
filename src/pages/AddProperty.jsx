import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import "./AddProperty.css";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      showError("You can only upload up to 5 images.");
      return;
    }
    
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        showError(`${file.name} is not a valid image type. Please use JPEG or PNG.`);
      }
      if (!isValidSize) {
        showError(`${file.name} is too large. Please use images under 5MB.`);
      }
      
      return isValidType && isValidSize;
    });
    
    setImages(validFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !price.trim() || !address.trim()) {
      showError("Please fill in all required fields.");
      return;
    }
    
    if (images.length === 0) {
      showError("Please select at least one image.");
      return;
    }
    
    setLoading(true);
    
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("price", price.trim());
    formData.append("address", address.trim());
    
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showError("Please log in to add a property.");
        navigate("/login");
        return;
      }
      
      await axios.post("/api/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      
      showSuccess("Property added successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setAddress("");
      setImages([]);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to add property. Please try again.";
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="add-property-bg">
      <div className="add-property-modern-card">
        <div className="add-property-modern-image-section">
          <img src="/pexels-binyaminmellish-1396132.jpg" alt="Modern Home" className="add-property-modern-image" />
          <div className="add-property-modern-branding">
            <div className="add-property-modern-logo">Homy<span className="logo-dot" />z</div>
            <div className="add-property-modern-slogan">List your dream property with us!</div>
          </div>
        </div>
        <div className="add-property-modern-form-section">
          <h2 className="add-property-heading">Add a New Property</h2>
          <p className="add-property-subheading">Fill in the details to list a new property on the platform.</p>
          <form className="add-property-form" onSubmit={handleSubmit}>
            <div className="add-property-input-row">
              <input
                type="text"
                placeholder="Property Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="add-property-input"
                disabled={loading}
              />
            </div>
            <div className="add-property-input-row">
              <textarea
                placeholder="Property Description *"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="add-property-input"
                rows={4}
                disabled={loading}
              />
            </div>
            <div className="add-property-input-row">
              <input
                type="number"
                placeholder="Price (INR) *"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="add-property-input"
                min="0"
                disabled={loading}
              />
            </div>
            <div className="add-property-input-row">
              <input
                type="text"
                placeholder="Property Address *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="add-property-input"
                disabled={loading}
              />
            </div>
            <div className="add-property-input-row">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="add-property-input"
                disabled={loading}
              />
              <small className="add-property-hint">
                Upload up to 5 images (JPEG, PNG, max 5MB each)
              </small>
            </div>
            {images.length > 0 && (
              <div className="add-property-image-preview-container">
                <h4 className="add-property-image-preview-title">Selected Images:</h4>
                <div className="add-property-image-preview-grid">
                  {images.map((image, index) => (
                    <div key={index} className="add-property-image-preview-item">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="add-property-image-preview"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="add-property-image-remove-btn"
                        disabled={loading}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button type="submit" className="add-property-btn" disabled={loading}>
              {loading ? (
                <>
                  <LoadingSpinner size="small" text="" />
                  Adding Property...
                </>
              ) : (
                "Add Property"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty; 