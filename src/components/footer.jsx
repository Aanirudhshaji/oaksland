// Footer.jsx
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png"; 
import visa from "../assets/payments/visa.png";
import mastercard from "../assets/payments/mastercard.png";
import maestro from "../assets/payments/maestro.png";
import amex from "../assets/payments/amex.png";
import rupay from "../assets/payments/rupay.png";

const Footer = () => {
  return (
    <footer className="bg-[#b8864a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:items-start">
          {/* Logo + Office (left aligned) */}
          <div className="lg:text-left">
            <img src={logo} alt="Logo" className="h-18 mb-3" />
            <p className="text-sm leading-relaxed">
              <strong>Registered Office</strong> <br />
              The Woodenstreet Furniture's Pvt. Ltd. <br />
              101-104, Luhadia Tower, Ashok Marg, C Scheme, Jaipur-302001. <br />
              Corporate Identity Number: U36100RJ2015PTC047992
            </p>
          </div>

          {/* Consumer Policy + Help (center aligned in desktop) */}
          <div className="grid grid-cols-2 gap-6 lg:col-span-2 lg:text-left">
            {/* Consumer Policy */}
            <div>
              <h3 className="font-semibold mb-3 underline">CONSUMER POLICY</h3>
              <ul className="space-y-2 text-sm">
                <li>Cancellation & Returns</li>
                <li>Terms Of Use</li>
                <li>Security</li>
                <li>Privacy</li>
                <li>Sitemap</li>
                <li>Grievance Redressal</li>
                <li>EPR Compliance</li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="font-semibold mb-3 underline">HELP</h3>
              <ul className="space-y-2 text-sm">
                <li>Payments</li>
                <li>Shipping</li>
                <li>Cancellation & Returns</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>

          {/* Mail + Social (right aligned in desktop) */}
          <div className="lg:text-left">
            <h3 className="font-semibold mb-3 underline">Mail Us:</h3>
            <p className="leading-relaxed mb-3 text-sm">
              Flipkart Internet Private Limited, <br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village, <br />
              Outer Ring Road, Devarabeesanahalli Village, <br />
              Bengaluru, 560103, Karnataka, India
            </p>
            <h3 className="font-semibold mb-2 underline">Social</h3>
            <div className="flex gap-4 text-xl justify-left lg:justify-start">
              <a href="#" className="hover:text-gray-200">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-gray-200">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-gray-200">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-white/50" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <p>2007-2025 Oaksl.com</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span>We accept:</span>
            <img src={visa} alt="Visa" className="h-6" />
            <img src={mastercard} alt="MasterCard" className="h-6" />
            <img src={maestro} alt="Maestro" className="h-6" />
            <img src={amex} alt="Amex" className="h-6" />
            <img src={rupay} alt="RuPay" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
