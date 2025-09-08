import React from "react";
import { Routes, Route } from "react-router-dom";

import OffersBar from "./components/OffersBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import Category from "./components/Category";
import Footer from "./components/Footer";

import Login from "./login/Login";
import Signup from "./login/Signup";
import Otp from "./login/Otp";

function App() {
  return (
    <>
      <OffersBar />
      <Navbar />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Banner />
              <Category />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
