// components/ForgotPassword.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [mobileNo, setMobileNo] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false); // To toggle the OTP modal
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  // Handle Mobile Number Submit
  const handleMobileSubmit = async (e) => {
    e.preventDefault();
  
    // Example API URL for sending OTP
    const apiUrl = `https://agerbandhu-production.up.railway.app/api/member/forget-password/${mobileNo}`;
  
    try {
      // Make an API call to send OTP
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNo: mobileNo, // Send mobile number to API
        }),
      });
  
      // Handle the API response
      const result = await response.json();
  
      if (response.ok) {
        // If API is successful, show OTP modal
        setShowOTPModal(true);
        alert(result.message || "OTP sent successfully!");
      } else {
        // If API fails, show an error message
        alert(result.error || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      // Handle errors (like network errors)
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending OTP. Please try again.");
    }
  };
  

  // Handle OTP and Password Submit
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
  
    // Example API URL for OTP verification and password reset
    const apiUrl = `https://agerbandhu-production.up.railway.app/api/member/verify/${mobileNo}`;
  
    try {
      if (password === confirmPassword) {
        // Make an API call to verify OTP and reset password
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: otp, // Send OTP and password in the request body
            password: password,
          }),
        });
  
        // Handle the API response
        const result = await response.json();
  
        if (response.ok) {
          // If the API call is successful, redirect to the login page
          alert(result.message || "Password reset successful! Redirecting to login page.");
          router.push("/Login");
        } else {
          // If API fails, show an error message
          alert(result.error || "Failed to reset password. Please try again.");
        }
      } else {
        // Show an error if passwords do not match
        alert("Passwords do not match.");
      }
    } catch (error) {
      // Handle network or other unexpected errors
      console.error("Error resetting password:", error);
      alert("An error occurred while resetting the password. Please try again.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Forgot Password Form */}
      <form onSubmit={handleMobileSubmit} className="w-1/3 p-4 shadow-lg rounded">
        <h2 className="text-xl mb-4 text-center">Forgot Password</h2>
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-lg font-bold mb-4 text-center">Verify OTP</h3>
            <form onSubmit={handleOTPSubmit}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
