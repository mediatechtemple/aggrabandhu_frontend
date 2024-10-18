'use client'
import React, { useState } from "react";
// import Popup from "./Popup"; // Importing the Popup component

const Popup = ({ data, onClose }) => {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">User Information</h2>
        <p><strong>ID:</strong> {data.id}</p>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>Address:</strong> {data.address}</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

// export default Popup;


const ParentComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  
  // Sample data
  const userData = {
    id: 101,
    name: "John Doe",
    phone: "123-456-7890",
    address: "123, Main Street, City, Country"
  };

  const handleButtonClick = () => {
    setShowPopup(true); // Show popup on button click
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close popup when close button is clicked
  };

  return (
    <div className="p-8">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Show User Info
      </button>

      {showPopup && <Popup data={userData} onClose={handleClosePopup} />}
    </div>
  );
};

export default ParentComponent;
