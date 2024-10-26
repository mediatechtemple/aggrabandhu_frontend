import Image from "next/image";
import React from "react";

const DeathCertificateModal = ({ certificateUrl, onClose }) => {
  // let ImageUrl=certificateUrl ? {`https://backend.aggrabandhuss.org${certificateUrl}`} :''
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[1400]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 z-[1401] ">
        <h2 className="text-xl font-bold mb-4 text-blue-500 text-center">Death Certificate</h2>
        {/* Here, you can display the certificate, for example an image */}
        {
        certificateUrl && <div className="flex justify-center">
        <Image 
        src={`https://backend.aggrabandhuss.org${certificateUrl}`} 
        alt="Death Certificate" 
        className="mb-4"
        width={200}
        height={200}
        />
        </div>
        }
        {!certificateUrl && <h1>No certificate uploaded!</h1>}
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default DeathCertificateModal;
