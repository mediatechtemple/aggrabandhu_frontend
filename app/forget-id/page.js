'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgetId = () => {
  const [aadhaarNo, setAadhaarNo] = useState("");
  const [dob, setDob] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API URL for the request
    const apiUrl = "https://agerbandhu-production.up.railway.app/api/member/forget-id";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            aadhar_no: aadhaarNo,
            dob: dob,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // If response is OK, set the response data and show the popup
        setResponseData(data);
        setShowPopup(true);
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    router.push("/Login"); // Redirect to the login page
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Forgot ID</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label htmlFor="aadhaarNo" className="block text-gray-700">Aadhaar No:</label>
          <input
            type="text"
            id="aadhaarNo"
            value={aadhaarNo}
            onChange={(e) => setAadhaarNo(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block text-gray-700">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Submit
        </button>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">User ID</h2>
            <p className="mb-4">{responseData?.mobile}</p>
            <button onClick={handleClosePopup} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
    <div className="">
      
    </div>
    </>
  );
};

export default ForgetId;
