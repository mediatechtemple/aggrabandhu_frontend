import React, { useEffect, useState } from 'react';
import DonationLedgerModal from './DonationLedgerModal';
import ReferenceByPopUp from './TablePopups/ReferenceByPopUp';
import DeathCertificateModal from './TablePopups/DeathCertificateModal';
import NomineeDetailsPopup from './TablePopups/NomineeDetailsPopup';

const SortableTable = ({ sortedRows=[], sortConfig, handleSort, getSortIcon, openHandler }) => {
  
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [referenceData,setReferenceData]=useState({
    id: 101,
    name: "John Doe",
    phone: "123-456-7890",
    address: "123, Main Street, City, Country"
  });



  const [showModal, setShowModal] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState(null);

  const [NomineePopup, setNomineePopup] = useState(false);
  const [NomineeData,setNomineeData]=useState({});

  const handleOpenNominee=()=>{
    setNomineePopup(true);
  }

  const handleCloseNominee=()=>{
    setNomineePopup(false);
  }

  const handleDeathDateClick = (url) => {
    setCertificateUrl(url); // Set the certificate URL to display
    setShowModal(true);      // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);     // Close the modal
  };
  
  const handleButtonClick = () => {
    setShowPopup(true); // Show popup on button click
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close popup when close button is clicked
  };

  

  console.log(sortedRows);

  const handleLedgerOpen = (donation) => {
    setLedgerOpen(true);
    setSelectedDonation(donation);
  };

  const handleLedgerClose = () => {
    setLedgerOpen(false);
    setSelectedDonation(null);
  };

  const handleNomineeData=(data)=>{
    handleOpenNominee();
    console.log(data)
    setNomineeData({...data});
  }

  const handleStatusToggle = (index) => {
    window.alert('Hello brother, how are you!!!!! ' + index);
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              {['srNo', 'member_id','name', 'referenced_by', 'mobileNo', 'district', 'state','deathDate','Nominee_Detail', 'startDate', 'endDate', 'noOfDonation', 'totalDonation', 'paymentDetails', 'donationLedger', 'profile', 'action', 'status', 'remark'].map((column) => (
                <th 
                  key={column} 
                  className="border border-gray-300 p-2 text-center cursor-pointer"
                  onClick={() => handleSort(column)}
                >
                  <div className="flex justify-center items-center">
                    {column === 'srNo' ? 'Sr. No' : column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    {getSortIcon(column, sortConfig)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((member, index) => (
              <tr key={member.index} className="hover:bg-gray-100">
                <td className="border border-gray-300 text-black p-2 text-center">{index+1}</td>
                <td className="border border-gray-300 text-black p-2 text-center">{member.id}</td>
                <td className="border border-gray-300 text-black p-2 text-center">{member.Member.name}</td>
                <td onClick={handleButtonClick} className="border cursor-pointer border-gray-300 text-black p-2 text-center">Ashoka...</td>
                <td className="border border-gray-300 text-black p-2 text-center">9876514254</td>
                <td className="border border-gray-300 text-black p-2 text-center">{member.Member.district}</td>
                <td className="border border-gray-300 text-black p-2 text-center">{member.Member.state}</td>
                <td  
                onClick={() => handleDeathDateClick(member.file)} className=" cursor-pointer border border-gray-300 text-black p-2 text-center">
                {new Date(member.death_date).toLocaleDateString('en-GB')}
                </td>
                <td 
                onClick={() => handleNomineeData(member)}
                className="border border-gray-300 text-black p-2 text-center">Nominee_Detail</td>


                <td className="border border-gray-300 text-black p-2 text-center">
                  {new Date(member.start_date).toLocaleDateString('en-GB')}
                </td>
                <td className="border border-gray-300 text-black p-2 text-center">
                  {new Date(member.end_date).toLocaleDateString('en-GB')}
                </td>
                <td className="border border-gray-300 text-black  p-2 text-center">{member.total_donation_received}</td>
                <td className="border border-gray-300 text-black  p-2 text-center">0</td>
                <td className="border border-gray-300 text-black p-2 text-center">
                  <button 
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleLedgerOpen(member)}
                  >
                    Payment
                  </button>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button 
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleLedgerOpen(member)}
                  >
                    Ledger
                  </button>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <a href={member.profile} className="text-blue-500 hover:underline">View Profile</a>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button 
                    className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
                    onClick={() => openHandler(member)}
                  >
                    Edit
                  </button>
                </td>
                <td 
                  className="border border-gray-300 p-2 text-black text-center cursor-pointer"
                  onClick={() => handleStatusToggle(index)}
                >
                  {member.status === 'active' ? 'Active' : 'Inactive'}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                <button 
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleLedgerOpen(member)}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DonationLedgerModal
        open={ledgerOpen}
        handleClose={handleLedgerClose}
        donation={selectedDonation}
      />
      {showPopup && <ReferenceByPopUp data={referenceData} onClose={handleClosePopup} />}
      {showModal && (
        <DeathCertificateModal certificateUrl={certificateUrl} onClose={handleCloseModal} />
      )}

      {NomineePopup && (
        <NomineeDetailsPopup NomineeData={NomineeData} onClose={handleCloseNominee} />
      )}

    </>
  );
};

export default SortableTable;
