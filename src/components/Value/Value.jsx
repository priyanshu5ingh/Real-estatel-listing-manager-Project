import React, { useState } from "react";
import "./Value.css";
import data from "../../utils/accordion";

const Value = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="value-wrapper-modern" id="value">
      <div className="value-bg-accent" />
      <div className="value-glass-card">
        <div className="value-modern-left">
          <div className="value-modern-img-container">
            <img src="/value.jpg" alt="Value" className="value-modern-img" />
            <div className="value-modern-gradient-overlay" />
          </div>
        </div>
        <div className="value-modern-right">
          <span className="value-best">Our Value</span>
          <h2 className="value-title">Value We Give to You</h2>
          <p className="value-desc">
            We always ready to help by providing the best service for you. We believe a good place to live can make your life better.
          </p>
          <div className="value-modern-accordion">
            {data.map((item, i) => (
              <div className={`value-modern-accordion-item${openIndex === i ? " open" : ""}`} key={i}>
                <div className="value-modern-accordion-header" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <span className="value-icon">{item.icon}</span>
                  <span className="value-accordion-heading">{item.heading}</span>
                  <span className="value-accordion-toggle">{openIndex === i ? "−" : "+"}</span>
                </div>
                <div
                  className="value-modern-accordion-body"
                  style={{ maxHeight: openIndex === i ? 120 : 0, opacity: openIndex === i ? 1 : 0, transition: 'all 0.4s cubic-bezier(.4,2,.6,1)' }}
                >
                  {openIndex === i && <div>{item.detail}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Value; 