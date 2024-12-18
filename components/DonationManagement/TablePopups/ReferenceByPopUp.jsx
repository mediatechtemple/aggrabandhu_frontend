import React from "react";

const ReferenceByPopUp = ({ data, onClose }) => {
  console.log(data);
  return (
    <div onClick={onClose}  className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[1400]">
      <div className="bg-white p-8 rounded-lg shadow-lg text-black">
        <h2 className="text-xl text-blue-500 font-bold text-center mb-4">Refer BY</h2>
        <p><strong>Member ID:</strong> {data.id}</p>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Mobile No:</strong> {data.mobile_no}</p>

        {/* <p><strong>Phone:</strong> {data.mobile_no}</p> */}
        <p><strong>Address:</strong> {data.state},{data.district}</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default ReferenceByPopUp;
