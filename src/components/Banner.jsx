// Banner.jsx
import React from "react";
import { FaTruck, FaCouch, FaTags } from "react-icons/fa";

const Banner = () => {
  const features = [
    {
      icon: <FaTruck className="text-2xl sm:text-3xl text-[#9c6527]" />,
      title: "Free Worldwide Shipping",
      description:
        "Free Shipping to all over the world with many specials only for our dear customers",
    },
    {
      icon: <FaCouch className="text-2xl sm:text-3xl text-[#9c6527]" />,
      title: "Best Quality Product",
      description:
        "Many customers entrust various furniture needs to us, and customer satisfaction is our pride.",
    },
    {
      icon: <FaTags className="text-2xl sm:text-3xl text-[#9c6527]" />,
      title: "Super Affordable Price",
      description:
        "You can get various furniture with the highest quality at an affordable price",
    },
  ];

  return (
    <section className="bg-[#f2ede7] py-8 sm:py-10">
      <div
        className="
          max-w-7xl mx-auto 
          px-4 sm:px-6 lg:px-12
          grid grid-cols-3 gap-10
          text-center md:text-left
        "
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center md:items-start gap-3"
          >
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-xs sm:text-lg font-semibold text-[#4a2e1c]">
                {feature.title}
              </h3>
              {/* ✅ Hide description on mobile, show on md+ */}
              <p className="hidden md:block text-sm text-gray-700 mt-1">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
