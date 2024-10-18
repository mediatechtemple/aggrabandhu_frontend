import React from 'react';

const NomineeDetailsPopup = ({ 
  NomineeData,
  onClose 
}) => {
  console.log(NomineeData);
 const { nominee1, nominee2, nominee3, nominee4, 
  relation1, relation2, relation3, relation4, 
  mobile_no1, mobile_no2, mobile_no3, mobile_no4} =NomineeData;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1400]">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h3 className="mt-4 mb-2 font-bold text-2xl text-blue-500 text-center font-serif">Nominee and Mobile Details</h3>
        
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-black text-center">
          <thead>
            <tr>
              <th className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2">Nominee</th>
              <th className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2">Relation</th>
              <th className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2">Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {relation1 && nominee1 && (
              <tr>
                <td className="border border-gray-300 px-4 py-2">{nominee1}</td>
                <td className="border border-gray-300 px-4 py-2">{relation1}</td>
                <td className="border border-gray-300 px-4 py-2">{mobile_no1 || '-'}</td>
              </tr>
            )}
            {relation2 && nominee2 && (
              <tr>
                <td className="border border-gray-300 px-4 py-2">{relation2}</td>
                <td className="border border-gray-300 px-4 py-2">{nominee2}</td>
                <td className="border border-gray-300 px-4 py-2">{mobile_no2 || '-'}</td>
              </tr>
            )}
            {relation3 && nominee3 && (
              <tr>
                <td className="border border-gray-300 px-4 py-2">{relation3}</td>
                <td className="border border-gray-300 px-4 py-2">{nominee3}</td>
                <td className="border border-gray-300 px-4 py-2">{mobile_no3 || '-'}</td>
              </tr>
            )}
            {relation4 && nominee4 && (
              <tr>
                <td className="border border-gray-300 px-4 py-2">{relation4}</td>
                <td className="border border-gray-300 px-4 py-2">{nominee4}</td>
                <td className="border border-gray-300 px-4 py-2">{mobile_no4 || '-'}</td>
              </tr>
            )}
          </tbody>
        </table>

        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Close
        </button>
      </div>
    </div>
  );
};

export default NomineeDetailsPopup;
