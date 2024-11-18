import React, { useEffect, useState } from 'react';
// import DonationLedgerModal from './DonationLedgerModal';
import ReferenceByPopUp from './TablePopups/ReferenceByPopUp';
import DeathCertificateModal from './TablePopups/DeathCertificateModal';
import NomineeDetailsPopup from './TablePopups/NomineeDetailsPopup';
import BankDetailPopup from './TablePopups/BankDetailPopup';
import RemarkPopup from './TablePopups/RemarkPopup';
import Image from 'next/image';
import DonationLedgerModal from './TablePopups/DonationLedgerModal';

const SortableTable = ({ sortedRows=[], sortConfig, handleSort, 
  getSortIcon, openHandler,setsortedRows,
  memberRights
 }) => {
  
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [referenceData,setReferenceData]=useState({
   
  });



  const [showModal, setShowModal] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState(null);

  const [NomineePopup, setNomineePopup] = useState(false);
  const [NomineeData,setNomineeData]=useState({});

  const [showDetailPopup,setshowDetailPopup]=useState(false);
  const [BandDetailData,setBandDetailData]=useState({});

  const [remarkPopup,setRemarkPopup]=useState(false);
  const [remarkData,setRemarkData]=useState({});

  const activeHandler = (member) => {
    // Map through the sortedRows to find the member with matching id
    const updatedRows = sortedRows.map((row) =>
      row.id === member.id 
        ? { ...row, status: member.status === 'Active' ? 'Inactive' : 'Active' } 
        : row
    );
  
    setsortedRows(updatedRows); // Set the updated rows
  };
  

  const handleRemarkClose=()=>{
    setRemarkPopup(false);
  }

  const handleRemarkOpen=(member)=>{
    setRemarkData(member);
    console.log(member);
    setRemarkPopup(true);
  }






  const handleBankDetailData=(data)=>{
    console.log(data)
    setBandDetailData({...data});
    setshowDetailPopup(true);
  }

  const handleCloseBankDetails=()=>{
    setshowDetailPopup(false);
  }




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
  
  const handleButtonClick = (data) => {
    setReferenceData({...data})
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
    {['srNo', 'member_id', 'profile', 'name', 'referenced_by', 'mobileNo', 'district', 'state', 'deathDate', 'Nominee_Detail', 'startDate', 'endDate', 'noOfDonation', 'totalDonation', 'paymentDetails', 'donationLedger', 'action', 'status', 'remark'].map((column) => (
      (column === 'action' || column === 'status') && !memberRights['Donation Management']?.['edit'] ? null : (
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
      )
    ))}
  </tr>
</thead>
          <tbody>
            {sortedRows.map((member, index) => (
              <tr key={member.index} className="hover:bg-gray-100">
                <td className="border border-gray-300 text-black p-2 text-center">{index+1}</td>
                <td className="border border-gray-300 text-black p-2 text-center">{member.Member.id}</td>
                <td className="border border-gray-300 p-2 text-center">


                  {/* <a href={member.profile} className="text-blue-500 hover:underline">View Profile</a> */}
                
                  <Image
                    src={`https://backend.aggrabandhuss.org${member.Member.profileUrl}`}   // This should be the preview URL of the uploaded image
                    alt="Selected"
                    width={100}    // Use the fill layout to fill the parent container 
                    // objectFit="contain"  // Ensure the image fits inside the container without being cut off
                    objectFit="contain"   // Ensure the image fits inside the container without being cut off
                    objectPosition="top"
                    height={100}  // Align the image to the top of the container
                  />


                </td>
                <td className="border border-gray-300 text-black p-2 text-center">{member.Member.name}</td>
                <td onClick={()=>handleButtonClick(member.refer_by)} className="border cursor-pointer border-gray-300 text-black p-2 text-center">
                <button 
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    // onClick={() => handleLedgerOpen(member)}
                  >
                    View
                  </button>
                </td>
                <td className="border border-gray-300 text-black p-2 text-center">9876514254</td>
                <td className="border border-gray-300 text-black p-2 text-center">{member.Member.district}</td>
                <td className="border border-gray-300 text-black p-2 text-center">{member.Member.state}</td>
                <td  
                onClick={() => handleDeathDateClick(member.file)} className=" cursor-pointer border border-gray-300 text-black p-2 text-center">
                   <button 
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    // onClick={() => handleLedgerOpen(member)}
                  >
                    {new Date(member.death_date).toLocaleDateString('en-GB')}
                  </button>
                
                </td>
                <td 
                onClick={() => handleNomineeData(member)}
                className="border border-gray-300 text-black p-2 text-center">
                   <button 
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    // onClick={() => handleLedgerOpen(member)}
                  >
                   Nominee_Detail
                  </button>
                  
                  </td>


                <td className="border border-gray-300 text-black p-2 text-center">
                  {new Date(member.start_date).toLocaleDateString('en-GB')}
                </td>
                <td className="border border-gray-300 text-black p-2 text-center">
                  {new Date(member.end_date).toLocaleDateString('en-GB')}
                </td>
                <td className="border border-gray-300 text-black  p-2 text-center">0</td>
                <td className="border border-gray-300 text-black  p-2 text-center">{member.total_donation_received}</td>
                <td className="border border-gray-300 text-black p-2 text-center">
                  <button 
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleBankDetailData(member)}
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
                
               {memberRights['Donation Management']?.['edit'] && <td className="border border-gray-300 p-2 text-center">
                  <button 
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 w-24" 
                    onClick={() => openHandler(member)}
                  >
                    Edit
                  </button>
                </td>}

                {memberRights['Donation Management']?.['edit'] && <td 
                  className="border border-gray-300 p-2 text-black text-center cursor-pointer"
                >
                  {/* <button 
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 w-24" 
                    onClick={() => activeHandler(member)}
                  >
                    {member.status === 'Active' ? 'Active' : 'Inactive'}
                  </button> */}

                <button
                  className={`px-4 py-1 rounded w-24 ${
                    member.status === "Active"
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                  onClick={() => activeHandler(member)}
                >
                  {member.status === "Active" ? "Active" : "Inactive"}
                </button>





                </td>}

                <td className="border border-gray-300 p-2 text-center">
                <button 
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    onClick={()=>handleRemarkOpen({id:member.id,remark:member.remark})}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <DonationLedgerModal
        open={ledgerOpen}
        handleClose={handleLedgerClose}
        ledgerId={selectedDonation}
      /> */}

     { ledgerOpen && <DonationLedgerModal ledgerData={selectedDonation} handleLedgerClose={handleLedgerClose} />}

      
      {showPopup && <ReferenceByPopUp data={referenceData} onClose={handleClosePopup} />}

      {showModal && (
        <DeathCertificateModal certificateUrl={certificateUrl} onClose={handleCloseModal} />
      )}

      {NomineePopup && (
        <NomineeDetailsPopup NomineeData={NomineeData} onClose={handleCloseNominee} />
      )}

      {showDetailPopup && (
        <BankDetailPopup BankDetailData={BandDetailData} onClose={handleCloseBankDetails} />
      )}

    { remarkPopup && (
        <RemarkPopup 
        handleRemarkClose={handleRemarkClose}
         remarkData={remarkData} 
         sortedRows={sortedRows}
         setsortedRows={setsortedRows} 
         />
      )}

    </>
  );
};

export default SortableTable;
