import React from "react";
import { Routes, Route } from "react-router-dom";

// import OffersBar from "./components/OffersBar";
import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import Category from "./components/Category";
import Footer from "./components/Footer";

import Login from "./login/login";
import ForgotPassword from "./login/ForgotPassword";
import Signup from "./login/Signup";
import Otp from "./login/Otp";

function App() {
  return (
    <>

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
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
