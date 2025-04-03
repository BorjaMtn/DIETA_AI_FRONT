// src/app/page.tsx
'use client';

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
