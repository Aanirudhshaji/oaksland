// ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/signup/signup.jpg";
import logo from "../assets/logo.png";

const sanitizeInput = (input) => input.replace(/[^\w@.\-+]/gi, "").trim();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = sanitizeInput(email.toLowerCase());

    if (!cleanEmail) {
      setFormError("Email is required");
      return;
    }

    setFormError("");
    setSuccessMessage("");
    setLoading(true);

    try {
      // TODO: integrate with your backend forgot password API
      await new Promise((resolve) => setTimeout(resolve, 1500)); // fake delay
      setSuccessMessage("Password reset link has been sent to your email.");
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6a77a] to-[#9d6b3f] p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Form */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="mb-6 flex justify-center md:justify-start">
            <img src={logo} alt="logo" className="h-12 object-contain" />
          </div>

          <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-sm text-gray-500 mt-2 mb-8">
            Enter your email and we’ll send you a reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="johncanny@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#8b5b2b] focus:outline-none shadow-sm text-sm"
                required
              />
            </div>

            {/* Errors / Success */}
            {formError && <p className="text-red-500 text-sm">{formError}</p>}
            {successMessage && (
              <p className="text-green-600 text-sm">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#8b5b2b] hover:bg-[#6d431b]"
              } text-white font-semibold py-3 rounded-full shadow-md transition duration-300`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-[#8b5b2b] font-medium hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>

        {/* Image */}
        <div className="hidden md:block">
          <img
            src={bgImage}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
