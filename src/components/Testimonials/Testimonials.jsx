import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    feedback: "I found my dream home in Mumbai thanks to this platform. The process was smooth and transparent!"
  },
  {
    name: "Rahul Verma",
    city: "Bengaluru",
    feedback: "Excellent service and great property options. Highly recommended for anyone looking to buy in India."
  },
  {
    name: "Anjali Singh",
    city: "Delhi",
    feedback: "Professional team and quick responses. I am very happy with my new apartment in Delhi!"
  }
];

const Testimonials = () => (
  <section className="testimonials-wrapper">
    <div className="testimonials-container">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-cards">
        {testimonials.map((t, i) => (
          <div className="testimonial-card" key={i}>
            <p className="testimonial-feedback">"{t.feedback}"</p>
            <span className="testimonial-name">- {t.name}, {t.city}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials; 