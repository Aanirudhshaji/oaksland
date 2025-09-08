import React, { useState, useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, googleLogin } from "../redux/authSlice";
import bgImage from "../assets/signup/signup.jpg";
import logo from "../assets/logo.png";

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const sanitizeInput = (value) => value.replace(/[<>"]/g, "").trim();

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const isStrongPassword = useCallback(
    (password) => strongPasswordRegex.test(password),
    []
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const form = e.target;

      const full_name = sanitizeInput(form.name.value);
      const email = sanitizeInput(form.email.value).toLowerCase();
      const phone = "+91" + sanitizeInput(form.phone.value); // ✅ +91 fixed
      const password = sanitizeInput(form.password.value);

      if (!full_name || !email || !phone || !password) {
        setFormError("All fields are required");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setFormError("Please enter a valid email");
        return;
      }

      if (!isStrongPassword(password)) {
        setFormError(
          "Password must include uppercase, lowercase, number, and special character."
        );
        return;
      }

      setFormError("");

      try {
        await dispatch(registerUser({ full_name, email, phone, password })).unwrap();
        navigate("/otp", { state: { email } });
      } catch (err) {
        setFormError(err);
      }
    },
    [dispatch, isStrongPassword, navigate]
  );

  const handleGoogleSignIn = async () => {
    try {
      const user = await dispatch(googleLogin()).unwrap();
      navigate("/otp", { state: { email: user.email } });
    } catch (err) {
      setFormError(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6a77a] to-[#9d6b3f] p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6 flex justify-center md:justify-start">
            <img src={logo} alt="logo" className="h-12 object-contain" />
          </div>

          <h2 className="text-3xl font-bold text-gray-800">Create an account</h2>
          <p className="text-sm text-gray-500 mt-2 mb-8">
            Choose from 10,000+ products across 400+ categories
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#8b5b2b] focus:outline-none shadow-sm text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="johncanny@gmail.com"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#8b5b2b] focus:outline-none shadow-sm text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 py-3 rounded-l-full border border-gray-300 bg-gray-100 text-gray-700">
                  +91
                </span>
                <input
                  id="phone"
                  type="text"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded-r-full border border-l-0 border-gray-300 focus:ring-2 focus:ring-[#8b5b2b] focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••••"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#8b5b2b] focus:outline-none shadow-sm text-sm"
              />
              <button
                type="button"
                className="absolute right-4 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {(formError || error) && <p className="text-red-500 text-sm">{formError || error}</p>}

            {/* Terms Checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer text-sm">
              <input type="checkbox" className="h-4 w-4 text-[#8b5b2b] rounded focus:ring-[#8b5b2b]" />
              <span className="text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-[#8b5b2b] hover:underline">
                  Terms & Privacy
                </a>
              </span>
            </label>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#8b5b2b] hover:bg-[#6d431b] text-white"
              }`}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? <Link to="/login" className="text-[#8b5b2b] font-medium hover:underline">Login Now</Link>
          </p>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 rounded-full py-3 shadow-sm hover:bg-gray-50 transition"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={20} className="mr-2" />
            <span className="text-gray-700 font-medium text-sm">Sign in with Google</span>
          </button>
        </div>

        {/* Background Image */}
        <div className="hidden md:block">
          <img src={bgImage} alt="background" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
