import React, { useEffect, useState } from "react";

const OffersBar = () => {
  // Rotating Announcement Messages
  const offers = [
    "Upto ₹2,500 Off on Your First Purchase",
    "Free Shipping on Orders Above ₹999",
    "New Luxury Bedroom Collection Just Dropped",
    "Festive Sale: Flat 20% Off on Selected Items",
  ];

  const [currentOffer, setCurrentOffer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 3000); // changes every 3 seconds

    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <div className="bg-[#BD8E4A] text-white text-center text-sm py-2 px-4 transition-all duration-500">
      {offers[currentOffer]}
    </div>
  );
};

export default OffersBar;
