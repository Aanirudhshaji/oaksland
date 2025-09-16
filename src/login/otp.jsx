import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Otp = ({ isRegistration = true }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const [otp, setOtp] = useState(new Array(4).fill("")); // 4 separate boxes
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  // Prevent direct access
  useEffect(() => {
    if (!email) navigate("/signup");
  }, [email, navigate]);

  // Countdown for resend
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  // Handle OTP input
  const handleChange = (value, index) => {
    if (/[^0-9]/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input automatically
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      setError("Enter a valid 4-digit OTP.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const endpoint = isRegistration
        ? "/api/register/verify/"
        : "/api/otp/verify/";

      await axios.post(endpoint, { email, otp: otpValue });

      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (timer > 0) return;

    try {
      const endpoint = isRegistration
        ? "/api/register/resend-otp/"
        : "/api/otp/request/";

      await axios.post(endpoint, { email });
      setTimer(30);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Verify OTP
        </h2>
        {email && (
          <p className="text-center text-gray-600 mb-6 text-sm">
            We sent a code to <span className="font-medium">{email}</span>
          </p>
        )}

        {success ? (
          <p className="text-center text-green-600 font-semibold text-lg animate-pulse">
            ✅ OTP Verified! Redirecting...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Boxes */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>

            {/* Error message */}
            {error && (
              <p className="text-center text-red-500 text-sm font-medium">
                {error}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg transition font-medium ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Resend option */}
            <p className="text-center text-sm text-gray-600">
              Didn’t receive OTP?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={timer > 0}
                className={`font-medium ${
                  timer > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:underline"
                }`}
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend"}
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Otp;
