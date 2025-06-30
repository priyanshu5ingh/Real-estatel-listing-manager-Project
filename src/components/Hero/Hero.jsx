import React from "react";
import "./Hero.css";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import CountUp from "react-countup";

const statsData = [
  { label: "Premium Product", value: 9000 },
  { label: "Happy Customer", value: 2000 },
  { label: "Awards Winning", value: 28 },
];

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-title-row">
            <h1 className="hero-title">
              Discover<br />Most Suitable<br />Property
              <span className="hero-dot" />
            </h1>
          </div>
          <p className="hero-subtext">
            Find a variety of properties that suit you very easily<br />
            Forget all difficulties in finding a residence for you
          </p>
          <form className="hero-search-bar">
            <span className="hero-search-icon"><FaMapMarkerAlt /></span>
            <input type="text" placeholder="Search location..." />
            <button type="submit">Search</button>
          </form>
          <div className="hero-stats">
            {statsData.map((stat, i) => (
              <div className="hero-stat" key={i}>
                <span className="hero-stat-value">
                  <CountUp end={stat.value} duration={2} separator="," />
                  <span className="hero-stat-plus"> +</span>
                </span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-right">
          <motion.div
            className="hero-img-circle"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Hero" className="hero-img" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
