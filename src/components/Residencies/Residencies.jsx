import React from "react";
import "./Residencies.css";
import data from "../../utils/slider.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

const Residencies = () => {
  return (
    <section className="residencies-wrapper" id="residencies">
      <div className="residencies-container">
        <div className="residencies-headings">
          <span className="residencies-best">Best Choices</span>
          <span className="residencies-title">Popular Residencies</span>
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
          {data.map((card, i) => (
            <SwiperSlide key={i}>
              <motion.div
                className="residency-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <img src={card.image.replace("./", "/")} alt={card.name} className="residency-img" />
                <div className="residency-info">
                  <span className="residency-price">{card.price}</span>
                  <h3>{card.name}</h3>
                  <p className="residency-detail">{card.detail}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies; 