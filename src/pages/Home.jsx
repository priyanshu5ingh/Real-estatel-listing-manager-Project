import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Hero from "../components/Hero/Hero";
import Companies from "../components/Companies/Companies";
import Stats from "../components/Stats/Stats";
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/Value/Value";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import Testimonials from "../components/Testimonials/Testimonials";
import GetStarted from "../components/GetStarted/GetStarted";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <Hero />
      <Companies />
      <Stats />
      <Residencies />
      <Value />
      <Testimonials />
      <Contact />
      <GetStarted />
      <Footer />
      {/* Other sections will be added here as in the video */}
    </>
  );
};

export default Home; 