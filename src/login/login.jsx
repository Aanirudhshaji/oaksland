import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleLogin, clearError } from "../redux/authSlice";
import bgImage from "../assets/signup/signup.jpg";
import logo from "../assets/logo.png";

const sanitizeInput = (input) => input.replace(/[^\w@.\-+]/gi, "").trim();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = sanitizeInput(e.target.email.value.toLowerCase());
    const password = e.target.password.value;

    if (!email || !password) {
      setFormError("Email and password are required");
      return;
    }

    setFormError("");
    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err) {
      setFormError(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(googleLogin()).unwrap();
    } catch (err) {
      setFormError(err);
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      if (error) dispatch(clearError());
    };
  }, [dispatch, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6a77a] to-[#9d6b3f] p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Form */}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="mb-6 flex justify-center md:justify-start">
            <img src={logo} alt="logo" className="h-12 object-contain" />
          </div>

          <h2 className="text-3xl font-bold text-gray-800">Login</h2>
          <p className="text-sm text-gray-500 mt-2 mb-8">
            Enter your email and password to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="johncanny@gmail.com"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#8b5b2b] focus:outline-none shadow-sm text-sm"
                required
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••••"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#8b5b2b] focus:outline-none shadow-sm text-sm"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-9 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Errors */}
            {(formError || error) && (
              <p className="text-red-500 text-sm mt-1">{formError || error}</p>
            )}

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-[#8b5b2b] font-medium hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#8b5b2b] hover:bg-[#6d431b]"} text-white font-semibold py-3 rounded-full shadow-md transition duration-300`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#8b5b2b] font-medium hover:underline">
              Signup
            </Link>
          </p>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 rounded-full py-3 shadow-sm hover:bg-gray-50 transition"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={20} className="mr-2" />
            <span className="text-gray-700 font-medium text-sm">Sign in with Google</span>
          </button>
        </div>

        {/* Image */}
        <div className="hidden md:block">
          <img src={bgImage} alt="background" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;
