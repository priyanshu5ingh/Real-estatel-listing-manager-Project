import React, { useEffect, useState } from "react";
import "./Residencies.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

const Residencies = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/api/properties");
        setProperties(res.data);
      } catch (err) {
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) return <div className="residencies-loading">Loading properties...</div>;
  if (error) return <div className="residencies-error">{error}</div>;

  // Extract unique cities from property addresses
  const cities = Array.from(
    new Set(
      properties
        .map((p) => {
          // Try to extract city from address (assume last part after last comma)
          const parts = p.address.split(",");
          return parts.length > 1 ? parts[parts.length - 2].trim() : "";
        })
        .filter(Boolean)
    )
  );

  const filteredProperties = properties.filter((property) => {
    const q = search.toLowerCase();
    const price = Number(property.price);
    const matchesSearch =
      property.title.toLowerCase().includes(q) ||
      property.address.toLowerCase().includes(q);
    const matchesMin = minPrice === "" || price >= Number(minPrice);
    const matchesMax = maxPrice === "" || price <= Number(maxPrice);
    const cityFromAddress = (() => {
      const parts = property.address.split(",");
      return parts.length > 1 ? parts[parts.length - 2].trim() : "";
    })();
    const matchesCity = city === "" || cityFromAddress === city;
    return matchesSearch && matchesMin && matchesMax && matchesCity;
  });

  return (
    <section className="residencies-wrapper" id="residencies">
      <div className="residencies-container">
        <div className="residencies-headings">
          <span className="residencies-best">Best Choices</span>
          <span className="residencies-title">Popular Residencies</span>
        </div>
        <div style={{ marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 16 }}>
          <input
            type="text"
            placeholder="Search by title or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: 220,
              padding: "0.8rem 1rem",
              borderRadius: 8,
              border: "1.5px solid #e0e0e0",
              fontSize: "1.08rem",
              marginBottom: 8,
            }}
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{
              width: 120,
              padding: "0.8rem 1rem",
              borderRadius: 8,
              border: "1.5px solid #e0e0e0",
              fontSize: "1.08rem",
              marginBottom: 8,
            }}
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{
              width: 120,
              padding: "0.8rem 1rem",
              borderRadius: 8,
              border: "1.5px solid #e0e0e0",
              fontSize: "1.08rem",
              marginBottom: 8,
            }}
            min="0"
          />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              width: 160,
              padding: "0.8rem 1rem",
              borderRadius: 8,
              border: "1.5px solid #e0e0e0",
              fontSize: "1.08rem",
              marginBottom: 8,
            }}
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {filteredProperties.map((property, i) => (
            <SwiperSlide key={property._id || i}>
              <Link to={`/properties/${property._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <motion.div
                  className="residency-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {property.images && property.images.length > 0 && (
                    <img src={property.images[0].url} alt={property.title} className="residency-img" />
                  )}
                  <div className="residency-info">
                    <span className="residency-price">₹{property.price.toLocaleString("en-IN")}</span>
                    <h3>{property.title}</h3>
                    <p className="residency-detail">{property.address}</p>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies; 