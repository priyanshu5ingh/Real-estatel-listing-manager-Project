import React from "react";
import "./Companies.css";

const Companies = () => {
  return (
    <section className="companies-wrapper" id="companies">
      <div className="companies-container">
        <img src="/prologis.png" alt="Prologis" />
        <img src="/tower.png" alt="Tower" />
        <img src="/equinix.png" alt="Equinix" />
        <img src="/realty.png" alt="Realty" />
      </div>
    </section>
  );
};

export default Companies; 