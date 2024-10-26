import React from 'react'
import Image from 'next/image'

const PaymentPopUp = ({ receivingMethods, paymentData, preview,paymentPopDownHandler }) => {
  console.log(paymentData.bank_detail);
  return (
    <div onClick={paymentPopDownHandler} className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[2800]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[60vh] overflow-y-auto z-[2800]">
        {/* Content ko scrollable banaya hai with max height */}

        {/* Bank Details Section */}
        {receivingMethods.includes('bank_detail') && (
          <div className="border border-gray-300 rounded-md p-4 mt-4">
            <h6 className="border-b border-gray-300 pb-2 mb-2 text-blue-500">
              Bank Details
            </h6>
            <p className="w-full p-2 mb-2 border rounded-md">
              Bank Name: {paymentData.bank_detail.bank_name}
            </p>
            <p className="w-full p-2 mb-2 border rounded-md">
              Account Number: {paymentData.bank_detail.account_number}
            </p>
            <p className="w-full p-2 mb-2 border rounded-md">
              IFSC Code: {paymentData.bank_detail.ifsc_code}
            </p>
          </div>
        )}

        {/* UPI ID Section */}
        {receivingMethods.includes('upi_id') && (
          <div className="border border-gray-300 rounded-md p-4 mt-4">
            <h6 className="border-b border-gray-300 pb-2 mb-2 text-blue-500">
              UPI ID Details
            </h6>
            <p className="w-full p-2 mb-2 border rounded-md">
              UPI ID: {paymentData.upi_id}
            </p>
          </div>
        )}

        {/* UPI Number Section */}
        {receivingMethods.includes('upi_number') && (
          <div className="border border-gray-300 rounded-md p-4 mt-4">
            <h6 className="border-b border-gray-300 pb-2 mb-2 text-blue-500">
              UPI Number Details
            </h6>
            <p className="w-full p-2 mb-2 border rounded-md">
              UPI Name: {paymentData.upi_name}
            </p>
            <p className="w-full p-2 mb-2 border rounded-md">
              UPI Number: {paymentData.upi_number}
            </p>
          </div>
        )}

        {/* QR Code Section */}
        {receivingMethods.includes('qrcode') && (
          <div className="border border-gray-300 rounded-md p-4 mt-4">
            <h6 className="border-b border-gray-300 pb-2 mb-2 text-blue-500">
              QR Code Details
            </h6>

            {/* Display Selected Image */}
            {paymentData.qrcode && (
              <div>
                <p className="text-blue-500 mb-2">
                  Selected Image: {paymentData.qrcode.name}
                </p>
                <div className="relative w-1/3 h-24">
                  <Image
                    src={`https://backend.aggrabandhuss.org${paymentData.qrcode}`} 
                    alt="Selected"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="top"
                  />
                </div>
              </div>
            )}
          </div>
        )}



        
        
      </div>
    </div>
  );
};

export default PaymentPopUp;
