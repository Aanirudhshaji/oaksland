// Hero.jsx
import React from "react";
import heroImg from "../assets/hero.jpg"; // ✅ Correct import

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] md:h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImg} // ✅ Use imported image
          alt="Luxury Furniture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 text-white max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-medium leading-tight drop-shadow-lg">
          Where Everyday Moments <br className="hidden md:block" />
          Become Extraordinary
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-200">
          Explore high-quality customizable office furniture
        </p>
        <button className="mt-3 bg-[#d7a75f] hover:bg-[#c4944e] text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
