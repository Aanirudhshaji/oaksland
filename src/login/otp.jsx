import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Otp = ({ isRegistration = true }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) navigate("/signup"); // redirect if accessed directly
  }, [email, navigate]);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert("Enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);

    try {
      const endpoint = isRegistration
        ? "/api/register/verify/" // Django endpoint for registration OTP
        : "/api/otp/verify/";    // Django endpoint for login OTP

      const response = await axios.post(endpoint, { email, otp });

      setSuccess(true);
      setTimeout(() => {
        // navigate after success
        navigate(isRegistration ? "/dashboard" : "/dashboard");
      }, 1000);
    } catch (err) {
      alert(err.response?.data?.error || "OTP verification failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      const endpoint = isRegistration
        ? "/api/register/resend-otp/" // optional: implement resend endpoint
        : "/api/otp/request/";

      await axios.post(endpoint, { email });
      alert(`OTP sent again ✅`);
      setTimer(30); // 30s cooldown
    } catch (err) {
      alert(err.response?.data?.error || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Enter OTP
        </h2>
        {email && (
          <p className="text-center text-gray-600 mb-6">
            OTP sent to: <span className="font-medium">{email}</span>
          </p>
        )}

        {success ? (
          <p className="text-center text-green-600 font-semibold text-lg">
            OTP Verified ✅ Redirecting...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300 text-center tracking-widest"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Didn’t receive OTP?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={timer > 0}
                className={`${
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
