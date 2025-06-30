import React from "react";
import CountUp from "react-countup";
import "./Stats.css";

const statsData = [
  { label: "Properties Sold", value: 1200 },
  { label: "Happy Clients", value: 950 },
  { label: "Cities Covered", value: 25 },
  { label: "Years of Experience", value: 10 },
];

const Stats = () => (
  <section className="stats-wrapper">
    <div className="stats-container">
      {statsData.map((stat, i) => (
        <div className="stat-card" key={i}>
          <span className="stat-value">
            <CountUp end={stat.value} duration={2} separator="," />
            {stat.label === "Properties Sold" ? "+" : ""}
          </span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Stats; 