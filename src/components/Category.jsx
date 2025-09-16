import React, { useState, useEffect } from "react";
import img1 from "../assets/category/1.jpg";
import img2 from "../assets/category/2.jpg";
import img3 from "../assets/category/3.jpg";
import img4 from "../assets/category/4.jpg";
import img5 from "../assets/category/5.jpg";
import img6 from "../assets/category/6.jpg";
import img7 from "../assets/category/7.jpg";
import img8 from "../assets/category/8.jpg";
import img9 from "../assets/category/9.jpg";
import img10 from "../assets/category/10.jpg";

// Replace these dummy images with correct assets for the new categories
import img11 from "../assets/category/1.jpg";
import img12 from "../assets/category/2.jpg";
import img13 from "../assets/category/3.jpg";
import img14 from "../assets/category/4.jpg";
import img15 from "../assets/category/5.jpg";
import img16 from "../assets/category/6.jpg";
import img17 from "../assets/category/7.jpg";
import img18 from "../assets/category/8.jpg";

// Full categories list (18 items)
const categories = [
  { name: "Sale Items", img: img1 },
  { name: "Sofa", img: img2 },
  { name: "Table", img: img3 },
  { name: "Lounge Chairs", img: img4 },
  { name: "Bed", img: img5 },
  { name: "Wardrobes", img: img6 },
  { name: "Dining Tables", img: img7 },
  { name: "Office Chairs", img: img8 },
  { name: "Kids Furniture", img: img9 },
  { name: "Outdoor Furniture", img: img10 },
  { name: "Office Furniture", img: img11 },
  { name: "Storage Ottomans", img: img12 },
  { name: "Shoe Cabinets", img: img13 },
  { name: "Dressing Tables", img: img14 },
  { name: "Ergonomic Chairs", img: img15 },
  { name: "Balcony Chairs", img: img16 },
  { name: "Workstation", img: img17 },
  { name: "Office Tables", img: img18 },
];

const Category = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Tailwind "sm" breakpoint = 640px
    };

    handleResize(); // run on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show 6 items on mobile, 10 on desktop
  const defaultCount = isMobile ? 6 : 10;
  const visibleCategories = showAll ? categories : categories.slice(0, defaultCount);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#4a2e1c] mb-8">
          Shop By Categories
        </h2>

        {/* Categories Grid (Old Style) */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {visibleCategories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-full overflow-hidden rounded-xl shadow hover:shadow-lg transition">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-24 sm:h-44 lg:h-48 object-cover rounded-xl group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="mt-2 text-xs sm:text-base font-medium text-[#4a2e1c]">
                {cat.name}
              </p>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        {categories.length > defaultCount && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 bg-[#cda45e] text-white font-medium rounded-full shadow-md hover:bg-[#b38b4a] transition"
            >
              {showAll ? "View Less" : "View More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
