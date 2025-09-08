// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaUser, FaHeart, FaShoppingCart, FaStore } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, refreshSession } from "../redux/authSlice";
import logo from "../assets/logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // ------------------- Redux State -------------------
  const { user } = useSelector((state) => state.auth);
  const { cartCount } = useSelector((state) => state.cart);
  const { wishlistCount } = useSelector((state) => state.wishlist);

  // ------------------- Local State -------------------
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ------------------- Categories -------------------
  const categories = [
    {
      name: "Sofas",
      image: "https://cdn-icons-png.flaticon.com/512/3063/3063064.png",
      subcategories: ["Fabric Sofas", "Leather Sofas", "Sectional Sofas", "Recliners"],
    },
    {
      name: "Living Room",
      image: "https://cdn-icons-png.flaticon.com/512/681/681494.png",
      subcategories: ["TV Units", "Coffee Tables", "Bookshelves", "Shoe Racks"],
    },
    {
      name: "Bedroom",
      image: "https://cdn-icons-png.flaticon.com/512/3107/3107790.png",
      subcategories: ["Beds", "Wardrobes", "Bedside Tables", "Dressing Units"],
    },
    {
      name: "Mattresses",
      image: "https://cdn-icons-png.flaticon.com/512/1624/1624406.png",
      subcategories: ["Single Mattress", "Queen Mattress", "King Mattress"],
    },
    {
      name: "Dining",
      image: "https://cdn-icons-png.flaticon.com/512/3105/3105889.png",
      subcategories: ["Dining Sets", "Dining Tables", "Dining Chairs", "Cabinets"],
    },
    {
      name: "Storage",
      image: "https://cdn-icons-png.flaticon.com/512/2919/2919709.png",
      subcategories: ["Wardrobes", "Cabinets", "Chest of Drawers", "Sideboards"],
    },
  ];

  const profileMenu = [
    { label: "My Profile" },
    { label: "My Orders" },
    { label: "My Wishlist" },
    { label: "Saved Addresses" },
    { label: "Wallet" },
    { label: "Track Order" },
    { label: "Customer Support" },
  ];

  // ------------------- Effects -------------------
  useEffect(() => {
    // Refresh session on mount (silent login)
    dispatch(refreshSession());

    // Close dropdown on outside click
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  // ------------------- Handlers -------------------
  const handleProfileClick = () => setDropdownOpen((prev) => !prev);
  const handleLogout = () => {
    dispatch(logoutUser());
    setDropdownOpen(false);
  };

  return (
    <nav className="w-full font-sans relative z-50">
      {/* Sticky Container */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between px-8 py-3 bg-white">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" className="h-16 lg:h-20 w-auto" />
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Products, Color & More..."
                className="w-full px-4 py-2 pr-10 border border-[#BD8E4A] rounded-full outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BD8E4A]">
                <MdSearch size={20} />
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-8 text-yellow-700 relative">
            {/* Profile Dropdown */}
            <div
              ref={dropdownRef}
              className="flex flex-col items-center text-sm hover:text-black cursor-pointer relative"
              onClick={handleProfileClick}
            >
              <FaUser size={20} />
              <span>{user ? `Hi ${user.name}` : "Profile"}</span>

              {dropdownOpen && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-60 bg-white border rounded-lg shadow-lg text-gray-700 z-50">
                  {!user ? (
                    <div className="p-4 border-b">
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
                      >
                        SIGN IN
                      </button>
                      <p className="text-xs mt-2">
                        New Customer?{" "}
                        <span
                          className="text-[#BD8E4A] font-medium cursor-pointer hover:underline"
                          onClick={() => navigate("/signup")}
                        >
                          Start Here
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 border-b">
                      <p className="font-medium">Hello, {user.name}</p>
                      <button
                        onClick={handleLogout}
                        className="mt-2 w-full bg-red-500 text-white py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}

                  <ul className="flex flex-col text-sm">
                    {profileMenu.map((item, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <div
              className="flex flex-col items-center text-sm hover:text-black cursor-pointer"
              onClick={() => navigate("/wishlist")}
            >
              <FaHeart size={20} />
              <span>Wishlist ({wishlistCount})</span>
            </div>

            {/* Cart */}
            <div
              className="flex flex-col items-center text-sm hover:text-black cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FaShoppingCart size={20} />
              <span>Cart ({cartCount})</span>
            </div>

            {/* Stores */}
            <div className="flex flex-col items-center text-sm hover:text-black cursor-pointer">
              <FaStore size={20} />
              <span>Stores</span>
            </div>
          </div>
        </div>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center justify-center gap-10 py-3 border-t border-gray-200 bg-white text-sm font-medium">
          <a href="#" className="hover:text-yellow-700">Home Sofas</a>
          <a href="#" className="hover:text-yellow-700">Office Sofas</a>
          <a href="#" className="hover:text-yellow-700">Office Tables</a>
          <a href="#" className="hover:text-yellow-700">Restaurant, Cafe</a>
          <a href="#" className="hover:text-yellow-700">Home Furniture</a>
          <a href="#" className="hover:text-yellow-700">Office Furniture</a>
        </div>

        {/* ---------------- Mobile Navbar ---------------- */}
        <div className="md:hidden relative px-4 py-3 bg-white flex items-center justify-between">
          <button onClick={() => setDrawerOpen(true)} aria-label="Menu">
            <HiOutlineMenu size={28} />
          </button>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-auto cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Only Wishlist & Cart here (Profile removed) */}
          <div className="flex items-center gap-4 text-yellow-700">
            <FaHeart
              size={22}
              className="cursor-pointer"
              onClick={() => navigate("/wishlist")}
            />
            <span className="text-sm">{wishlistCount}</span>
            <FaShoppingCart
              size={22}
              className="cursor-pointer"
              onClick={() => navigate("/cart")}
            />
            <span className="text-sm">{cartCount}</span>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3 bg-white">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Products, Color & More..."
              className="w-full px-4 py-2 pr-10 border border-[#BD8E4A] rounded-full outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#BD8E4A]">
              <MdSearch size={20} />
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile Drawer ---------------- */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => {
              setDrawerOpen(false);
              setSelectedCategory(null);
            }}
          />

          <div
            className={`fixed top-0 left-0 h-full w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ${
              drawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-4 border-b">
              {/* Back Arrow */}
              <button
                className="text-gray-700"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close Menu"
              >
                <span className="text-2xl">&#8592;</span>
              </button>

              <img src={logo} alt="Logo" className="h-8 w-auto" />

              <FaUser
                size={22}
                className="text-gray-700 cursor-pointer"
                onClick={() => {
                  setDrawerOpen(false);
                  navigate(user ? "/profile" : "/login");
                }}
              />
            </div>

            <div className="flex flex-col divide-y divide-gray-200">
              {categories.map((category, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center justify-between px-4 py-4 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="text-base text-gray-800">{category.name}</span>
                  </div>
                  <span className="text-gray-400 text-xl">&#8250;</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subcategory Panel */}
          {selectedCategory && (
            <div className="fixed top-0 left-0 h-full w-full bg-white z-50 shadow-lg transition-transform duration-300">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <button
                  className="text-gray-700"
                  onClick={() => setSelectedCategory(null)}
                  aria-label="Back"
                >
                  <span className="text-xl">&#8592;</span>
                </button>
                <span className="text-lg font-semibold">{selectedCategory.name}</span>
                <div className="w-6" />
              </div>

              <div className="flex flex-col divide-y divide-gray-200">
                {selectedCategory.subcategories.map((sub, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="text-base text-gray-800">{sub}</span>
                    <span className="text-gray-400 text-xl">&#8250;</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
