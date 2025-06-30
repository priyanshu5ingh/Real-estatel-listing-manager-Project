import React from "react";
import "./Contact.css";
import { FaPhoneAlt, FaComments, FaVideo, FaEnvelope } from "react-icons/fa";

const contactOptions = [
  { icon: <FaPhoneAlt />, label: "Call", info: "+91 98765 43210", action: "Call now" },
  { icon: <FaComments />, label: "Chat", info: "Live chat 24/7", action: "Chat now" },
  { icon: <FaVideo />, label: "Video Call", info: "Schedule a call", action: "Video call" },
  { icon: <FaEnvelope />, label: "Message", info: "info@homyz.in", action: "Message us" },
];

const Contact = () => {
  return (
    <section className="contact-wrapper" id="contact">
      <div className="contact-container">
        <div className="contact-left">
          <span className="contact-best">Our Contact Us</span>
          <h2 className="contact-title">Easy to contact us</h2>
          <p className="contact-desc">
            We are always ready to help by providing the best services for you. We believe a good place to live can make your life better.
          </p>
          <div className="contact-cards">
            {contactOptions.map((opt, i) => (
              <div className="contact-card" key={i}>
                <span className="contact-card-icon">{opt.icon}</span>
                <div className="contact-card-info">
                  <span className="contact-card-label">{opt.label}</span>
                  <span className="contact-card-detail">{opt.info}</span>
                </div>
                <button className="contact-card-action">{opt.action}</button>
              </div>
            ))}
          </div>
        </div>
        <div className="contact-right">
          <div className="contact-img-circle">
            <img src="/contact.jpg" alt="Contact" className="contact-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 