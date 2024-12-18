import Image from "next/image";
import React from "react";

const BankDetailPopup = ({ BankDetailData, onClose }) => {
  const { bank_detail, upi_id, upi_number, upi_name, qrcode } = BankDetailData;
  
  // Parse the `bank_detail` JSON string into an object
  let bankDetail = JSON.parse(bank_detail);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[2800]"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 z-[2800] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-center mb-4 text-blue-500">
          Payment Details
        </h2>

        {/* Bank Details Section */}
        <div className="border border-green-400 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium text-green-500 mb-3 border-b border-gray-300 pb-2">
            Bank Details
          </h3>

          <div className="mb-3 text-black">
            <label className="block text-gray-600">Bank Name:</label>
            <p className="bg-gray-100 p-2 rounded">
              {bankDetail?.bank_name || "No Bank Name"}
            </p>
          </div>

          <div className="mb-3 text-black">
            <label className="block text-gray-600">Account Number:</label>
            <p className="bg-gray-100 p-2 rounded">
              {bankDetail?.account_number || "No Account Number"}
            </p>
          </div>

          <div className="mb-3 text-black">
            <label className="block text-gray-600">IFSC Code:</label>
            <p className="bg-gray-100 p-2 rounded">
              {bankDetail?.ifsc_code || "No IFSC Code"}
            </p>
          </div>
        </div>

        {/* UPI Details Section */}
        <div className="border border-green-400 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium text-green-500 mb-3 border-b border-gray-300 pb-2">
            UPI Details
          </h3>

          <div className="mb-3 text-black">
            <label className="block text-gray-600">UPI ID:</label>
            <p className="bg-gray-100 p-2 rounded">
              {upi_id || "No UPI ID"}
            </p>
          </div>

          
        </div>

        <div className="border border-green-400 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-medium text-green-500 mb-3 border-b border-gray-300 pb-2">
            UPI Details
          </h3>
          <div className="mb-3 text-black">
            <label className="block text-gray-600">UPI Number:</label>
            <p className="bg-gray-100 p-2 rounded">
              {upi_number || "No UPI Number"}
            </p>
          </div>

          <div className="mb-3 text-black">
            <label className="block text-gray-600">UPI Name:</label>
            <p className="bg-gray-100 p-2 rounded">
              {upi_name || "No UPI Name"}
            </p>
          </div>

          
        </div>







        <div className="border border-green-400 rounded-lg p-4">
        <h3 className="text-lg font-medium text-green-500 mb-3 border-b border-gray-300 pb-2">
            QR Details
          </h3>
        <div className="mb-3">
            <label className="block text-gray-600">QR Code:</label>
            {qrcode ? (
              <Image
                src={`https://backend.aggrabandhuss.org${qrcode}`}
                alt="QR Code"
                className="w-full h-32 object-contain rounded"
                width={200}
                height={200}
              />
            ) : (
              <p className="bg-gray-100 p-2 rounded text-black">
                No QR Code Available
              </p>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BankDetailPopup;
