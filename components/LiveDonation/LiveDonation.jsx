'use client'
import React, { useEffect, useState } from 'react';
import PaymentPopUp from './LiveDonationPopUp/PaymentPopUp';
import DeathCertificateModal from './LiveDonationPopUp/DeathCertificateModal';
import useSortableData from '@/hooks/TablesortingHook';
import Pagination from '@/user_component/Pagination/Pagination';

const getAllValues = (obj) => {
  let values = [];
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      values = values.concat(getAllValues(obj[key]));
    } else {
      values.push(obj[key]);
    }
  }
  return values;
};


const LiveDonation = () => {
  const [donationData, setDonationData] = useState([]); // State to store fetched data
  const { sortedItems, requestSort, getSortIcon } = useSortableData(donationData); 
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [token,setToken]=useState(null);
  
  const [formData,setFormData]=useState({
  });
  const [searchQuery, setSearchQuery] = useState('');

  const [paymentPopUp, setpaymentPopUp] = useState(false); // State for Screenshot inputs
  const [paymentData, setPaymentData] = useState({}); 


  const [showDeathPage,setshowDeathPage]=useState(false);
  const [certificateUrl,setcertificateUrl]=useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setitemsPerPage] = useState(100);



  const handleInputChange = (id, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [field]: value,
      },
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleItemPerChange = (pageNumber) => {
    setCurrentPage(1)
    setitemsPerPage(pageNumber);
  };



  // Handle Screenshot file input change
  const handleScreenshotChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      screenshots: e.target.files[0],
    }));
  };

 
  



  useEffect(() => {
    const fetchDonationData = async (token) => {
     let id= JSON.parse(localStorage.getItem('user')).userid;
      try {

        const response = await fetch(`https://backend.aggrabandhuss.org/api/donationreceive/donating/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json(); // Parse the response JSON
        console.log('hi brother');
        console.log(data.data);
        setDonationData(data.data); // Store the data in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message); // Handle and store the error
        setLoading(false); // Set loading to false in case of error
      }
    };
    // Function to fetch data from the API

    let toke=JSON.parse( localStorage.getItem('user')).token;
    setToken(toke);

    fetchDonationData(toke); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs only on mount



const paymentPopUpHandler=(Data)=>{
    setPaymentData(Data);
    console.log(Data);
    setPaymentData({
      ...Data,
      receivingMethods:JSON.parse(Data.receivingMethods),
      bank_detail:JSON.parse(Data.bank_detail),
    })
    setpaymentPopUp(!paymentPopUp);
}

const paymentPopDownHandler=()=>{
    setpaymentPopUp(false);
}

const handleOpenModal=(deathFile)=>{
  console.log(deathFile)
  setcertificateUrl(deathFile.file);
  setshowDeathPage(!showDeathPage);

}

const handleCloseModal=()=>{
  setshowDeathPage(false)
}


const postDataToApi = async (data) => {
  try {
    const response = await fetch('https://backend.aggrabandhuss.org/api/donation/', {
      method: 'POST',
      headers:{
        'Authorization':`bearer ${token}`
      },
      body: data, // No need to stringify FormData
    });
    const result = await response.json();
    console.log('Response:', result);
    alert('donation successfull')
  } catch (error) {
    console.error('Error:', error);
  }
};


const handleRowSubmit = (item) => {
  console.log(item);

  // Create FormData object
  const formDataToSend = new FormData();

  // Append all fields to FormData object
  
  formDataToSend.append('member_id', JSON.parse( localStorage.getItem('user')).userid);
  formDataToSend.append('donation_id', item.id);
  formDataToSend.append('amount', formData[item.id]?.donatedAmounts || '');
  formDataToSend.append('transaction_id', formData[item.id]?.transactionNos || '');
  formDataToSend.append('donation_date', formData[item.id]?.donationDate || '');
  formDataToSend.append('payment_method', 'google');

  // Handle file
  if (formData[item.id]?.screenshots) {
    formDataToSend.append('file', formData[item.id]?.screenshots); // Append file
  } else {
    console.log('No file uploaded for this entry.');
  }

  console.log('FormData being sent: ', formDataToSend);

  // Post FormData to API
  postDataToApi(formDataToSend);
};


const filteredDonations = sortedItems.filter((item) =>
  getAllValues(item).some((value) =>
    typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
  )
);


const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDonations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);



  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state
  
  const headers = [
    { key: 'member_id', label: 'Member ID' },
    { key: 'Member.name', label: 'Name' },
    { key: 'death_date', label: 'Death Date' },
    // { key: 'min_amount', label: 'Min Donate Amount' },
    // { key: 'donated', label: 'Donated' },
  ];

  return (
    <>
     <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search Donations"
          className="p-2 border border-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-spacing-1 w-full">
        {/* <thead>
          <tr>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">S.No</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Member ID</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Name</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Death Date</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Death Certificate</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Payment Method</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Min Donate Amount</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Payment Date</th>

            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Transaction ID</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Donated Amount</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Screenshot</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Action</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Donated</th>

          </tr>
        </thead> */}
         <thead>
    <tr>
      <th className="bg-blue-500 text-white p-2 border">S.No</th>
      {headers.map((header) => (
        <th
          key={header.key}
          onClick={() => requestSort(header.key)}
          className="bg-blue-500 text-white p-2 border cursor-pointer"
        >
          {header.label} {getSortIcon(header.key)}
        </th>
      ))}
      <th className="bg-blue-500 text-white p-2 border">Death Certificate</th>
      <th className="bg-blue-500 text-white p-2 border">Payment Method</th>
      <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Min Donate Amount</th>
      <th className="bg-blue-500 text-white p-2 border">Payment Date</th>

      <th className="bg-blue-500 text-white p-2 border">Transaction ID</th>
      <th className="bg-blue-500 text-white p-2 border">Donated Amount</th>
      <th className="bg-blue-500 text-white p-2 border">Screenshot</th>
      <th className="bg-blue-500 text-white p-2 border">Action</th>
      <th 
      className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400"
      >Donated</th>

    </tr>
  </thead>
        <tbody>
        {currentItems.map((donation, index) => (
            <tr key={donation.id}>
              <td className="p-2 text-center border">{index + 1}</td>
              <td className="p-2 text-center border">{donation.member_id}</td>
              <td className="p-2 text-center border">{donation.Member.name || 'N/A'}</td>
              <td className="p-2 text-center border">{new Date(donation.death_date).toLocaleDateString() || 'N/A'}</td>
              <td className="p-2 text-center border">
                <button onClick={()=>handleOpenModal(donation)} className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600'>
                  View
                </button>
              </td>
              <td className="p-2 text-center border">
                <button  onClick={()=>paymentPopUpHandler(donation)} className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600'>
                  Payment
                </button>
              </td>
              <td className="p-2 text-center border">₹{donation.min_amount || 'N/A'}</td>
              <td className="p-2 text-center border">
                <input
                  type="date"
                  value={formData[donation.id]?.donationDate || ''}
                  onChange={(e) => handleInputChange(donation.id, 'donationDate', e.target.value)}
                  className="border p-2 rounded"
                  required
                />
              </td>
              <td className="p-2 text-center border">
                <input
                  type="text"
                  placeholder='Transaction No'
                  className="border p-1"
                  value={formData[donation.id]?.transactionNos || ''}
                  onChange={(e) => handleInputChange(donation.id, 'transactionNos', e.target.value)}
                />
              </td>
              <td className="p-2 text-center border">
                <input
                  type="text"
                  placeholder='Donated Amount'
                  className="border p-1"
                  value={formData[donation.id]?.donatedAmounts || ''}
                  onChange={(e) => handleInputChange(donation.id, 'donatedAmounts', e.target.value)}
                />
              </td>
              <td className="p-2 text-center border">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange(donation.id, 'screenshots', e.target.files[0])}
                />
              </td>
              <td className="p-2 text-center border">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => handleRowSubmit(donation)}
                >
                  Submit
                </button>
              </td>
              <td className={`p-2 text-center border ${donation.donated=='yes'? 'text-green-500':donation.donated=='no'? 'text-red-500':'text-yellow-500'}`}>{donation.donated.charAt(0).toUpperCase()+donation.donated.slice(1)}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        handleItemPerChange={handleItemPerChange}
        membersLength={filteredDonations.length}
      />
    



    {
      paymentPopUp  &&  <PaymentPopUp 
      receivingMethods={paymentData.receivingMethods}
      paymentData={paymentData}
      preview={{qrcode:'null'}}
      paymentPopDownHandler={paymentPopDownHandler}
      />
    }

        {showDeathPage && (
        <DeathCertificateModal certificateUrl={certificateUrl} onClose={handleCloseModal} />
      )}

    </>
  );
};

export default LiveDonation;

