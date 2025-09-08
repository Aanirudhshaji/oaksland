import React, { useState } from "react";
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

// All category data for each filter (dummy lists)
const categoryData = {
  All: [
    { name: "Sofas", img: img1 },
    { name: "Beds", img: img2 },
    { name: "Dining", img: img3 },
    { name: "TV Units", img: img4 },
    { name: "Coffee Tables", img: img5 },
    { name: "Cabinets", img: img6 },
    { name: "Wardrobe", img: img7 },
    { name: "Sofa Cum Bed", img: img8 },
    { name: "Book Shelves", img: img9 },
    { name: "All Study Tables", img: img10 },
  ],
  Living: [
    { name: "Sofas", img: img1 },
    { name: "TV Units", img: img4 },
    { name: "Coffee Tables", img: img5 },
    { name: "Sofa Cum Bed", img: img8 },
    { name: "Cabinets", img: img6 },
    { name: "Recliners", img: img2 }, // dummy repeat
    { name: "Side Tables", img: img3 }, // dummy repeat
    { name: "Console Tables", img: img7 }, // dummy repeat
    { name: "Ottomans", img: img9 }, // dummy repeat
    { name: "Lounge Chairs", img: img10 }, // dummy repeat
  ],
  Bedroom: [
    { name: "Beds", img: img2 },
    { name: "Wardrobe", img: img7 },
    { name: "Dressers", img: img1 }, // dummy
    { name: "Night Stands", img: img3 }, // dummy
    { name: "Kids Beds", img: img4 }, // dummy
    { name: "Mattress", img: img5 }, // dummy
    { name: "Storage Beds", img: img6 }, // dummy
    { name: "Side Tables", img: img8 }, // dummy
    { name: "Study Tables", img: img9 }, // dummy
    { name: "Book Shelves", img: img10 }, // dummy
  ],
  Dining: [
    { name: "Dining Sets", img: img3 },
    { name: "Dining Tables", img: img4 },
    { name: "Dining Chairs", img: img1 }, // dummy
    { name: "Sideboards", img: img2 }, // dummy
    { name: "Cabinets", img: img6 },
    { name: "Buffet Tables", img: img5 }, // dummy
    { name: "Bar Stools", img: img7 }, // dummy
    { name: "Storage Units", img: img8 }, // dummy
    { name: "Dining Benches", img: img9 }, // dummy
    { name: "Crockery Units", img: img10 }, // dummy
  ],
  Mattress: [
    { name: "Foam Mattress", img: img1 }, // dummy
    { name: "Spring Mattress", img: img2 }, // dummy
    { name: "Orthopedic Mattress", img: img3 }, // dummy
    { name: "Single Mattress", img: img4 }, // dummy
    { name: "Double Mattress", img: img5 }, // dummy
    { name: "King Mattress", img: img6 }, // dummy
    { name: "Queen Mattress", img: img7 }, // dummy
    { name: "Kids Mattress", img: img8 }, // dummy
    { name: "Memory Foam", img: img9 }, // dummy
    { name: "Latex Mattress", img: img10 }, // dummy
  ],
  Decor: [
    { name: "Cabinets", img: img6 },
    { name: "Book Shelves", img: img9 },
    { name: "Wall Mirrors", img: img1 }, // dummy
    { name: "Lamps", img: img2 }, // dummy
    { name: "Rugs", img: img3 }, // dummy
    { name: "Wall Art", img: img4 }, // dummy
    { name: "Clocks", img: img5 }, // dummy
    { name: "Photo Frames", img: img7 }, // dummy
    { name: "Planters", img: img8 }, // dummy
    { name: "Decorative Bowls", img: img10 }, // dummy
  ],
};

const filters = ["All", "Living", "Bedroom", "Dining", "Mattress", "Decor"];

const Category = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-12">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#4a2e1c] mb-8">
          Shop By Categories
        </h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((filter, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full border border-[#cda45e] text-sm font-medium transition 
                ${
                  activeFilter === filter
                    ? "bg-[#cda45e] text-white"
                    : "bg-white text-[#4a2e1c] hover:bg-[#cda45e] hover:text-white"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categoryData[activeFilter].map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-full overflow-hidden rounded-xl shadow hover:shadow-lg transition">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-16 sm:h-44 lg:h-48 object-cover rounded-xl group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="mt-2 text-xs sm:text-base font-medium text-[#4a2e1c]">
                {cat.name}
              </p>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 bg-[#cda45e] text-white font-medium rounded-full shadow-md hover:bg-[#b38b4a] transition">
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Category;
