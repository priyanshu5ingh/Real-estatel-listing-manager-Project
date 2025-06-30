import React, { useState } from "react";
import "./Value.css";
import data from "../../utils/accordion";

const Value = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="value-wrapper" id="value">
      <div className="value-container">
        <div className="value-left">
          <div className="value-img-circle">
            <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80" alt="Value" className="value-img" />
          </div>
        </div>
        <div className="value-right">
          <span className="value-best">Our Value</span>
          <h2 className="value-title">Value We Give to You</h2>
          <p className="value-desc">
            We always ready to help by providing the best service for you. We believe a good place to live can make your life better.
          </p>
          <div className="value-accordion">
            {data.map((item, i) => (
              <div className="value-accordion-item" key={i}>
                <div className="value-accordion-header" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <span className="value-icon">{item.icon}</span>
                  <span className="value-accordion-heading">{item.heading}</span>
                  <span className="value-accordion-toggle">{openIndex === i ? "-" : "+"}</span>
                </div>
                {openIndex === i && (
                  <div className="value-accordion-body">{item.detail}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Value; 