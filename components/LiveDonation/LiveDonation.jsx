'use client'
import React, { useEffect, useState } from 'react';
import PaymentPopUp from './LiveDonationPopUp/PaymentPopUp';
import DeathCertificateModal from './LiveDonationPopUp/DeathCertificateModal';

const LiveDonation = () => {
  const [donationData, setDonationData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [token,setToken]=useState(null);
  
  const [formData,setFormData]=useState({
  });


  const [paymentPopUp, setpaymentPopUp] = useState(false); // State for Screenshot inputs
  const [paymentData, setPaymentData] = useState({}); 


  const [showDeathPage,setshowDeathPage]=useState(false);
  const [certificateUrl,setcertificateUrl]=useState(null);


  const handleInputChange = (id, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [field]: value,
      },
    }));
  };



  // Handle Screenshot file input change
  const handleScreenshotChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      screenshots: e.target.files[0],
    }));
  };

  // useEffect(()=>{
    
  // },[]);
  



  useEffect(() => {
    // Function to fetch data from the API
    const fetchDonationData = async (token) => {
      try {
        const response = await fetch('https://backend.aggrabandhuss.org/api/donationreceive/', {
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
  } catch (error) {
    console.error('Error:', error);
  }
};


const handleRowSubmit = (item) => {
  console.log(item);

  // Create FormData object
  const formDataToSend = new FormData();

  // Append all fields to FormData object
  formDataToSend.append('member_id', item.member_id);
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




  // const handleSubmit = async (member) => {
  //   console.log(member.id);
  //   console.log(member.member_id);

  //   const formData = new FormData();
  //   formData.append('member_id', transactionNos);
  //   formData.append('donation_id', donatedAmounts);

  //   console.log(formData);


  //   console.log(formData);

  //   return ;

  //   try {
  //     const response = await fetch('https://backend.aggrabandhuss.org/api/donation', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(dataToPost), // Send the data as JSON
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to post data');
  //     }

  //     const result = await response.json(); // Parse the response JSON
  //     console.log('Success:', result); // Log the result on success
  //   } catch (error) {
  //     console.error('Error posting data:', error); // Handle errors
  //   }
  // };
















  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state

  return (
    <>
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-spacing-1 w-full">
        <thead>
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
          </tr>
        </thead>
        <tbody>
        {donationData.map((donation, index) => (
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
            </tr>
          ))}

        </tbody>

        
      </table>
    </div>
    



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















































// {donationData.map((donation, index) => (
//   <tr key={donation.id}> {/* Use a unique key for each row */}
//     <td className="p-2 text-center border">{index + 1}</td> {/* Serial number */}
//     <td className="p-2 text-center border">{donation.member_id}</td>
//     <td className="p-2 text-center border">{donation.Member.name || 'N/A'}</td> {/* Member Name */}
//     <td className="p-2 text-center border">{new Date(donation.death_date).toLocaleDateString() || 'N/A'}</td> {/* Death Date */}
//     <td className="p-2 text-center border">
//     <button onClick={()=>handleOpenModal(donation)} className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600'>
//           View
//     </button>
//     </td>
//     <td className="p-2 text-center border">
//       <button onClick={()=>paymentPopUpHandler(donation)} className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600'>
//           Payment
//       </button>
//     </td>
//       <td className="p-2 text-center border">₹{ donation.min_amount || 'N/A'}</td> {/* Min Donate Amount */}
//     <td className="p-2 text-center border">
//     <input 
//       type="date" 
//       name="donationDate" // Adding name attribute for date input
//       value={formData.donationDate} 
//       onChange={handleInputChange} // Use handleInputChange for date input
//       className="border p-2 rounded" 
//       required 
//     />
//     </td>
//     <td className="p-2 text-center border">
//       <input 
//         type="text" 
//         placeholder='Transaction No' 
//         className="border p-1" 
//         name='transactionNos'
//         value={formData.transactionNos || ''} 
//         onChange={(e) => handleInputChange(e)} 
//       />
//     </td>
//     <td className="p-2 text-center border">
//       <input 
//         type="text" 
//         placeholder='Donated Amount' 
//         className="border p-1" 
//         name='donatedAmounts'
//         value={formData.donatedAmounts || ''} 
//         onChange={(e) => handleInputChange(e)} 
//       />
//     </td>
//     <td className="p-2 text-center border">
//       <input 
//         type="file" 
//         name='screenshots'
//         accept="image/*" 
//         onChange={(e) => handleScreenshotChange(e)} 
//       />
//     </td>
//     <td className="p-2 text-center border">
//       <button 
//         className="bg-green-500 text-white px-4 py-2 rounded" 
//         onClick={() => handleSubmit(donation)} 
//       >
//         Submit
//       </button>
//     </td>
//   </tr>
// ))}


















































// import React from 'react';

// const Page = () => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="table-auto border-collapse border border-spacing-1 w-full">
//         <thead>
//           <tr>
//             <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">S.No</th>
//             <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Member ID</th>
//             <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Name</th>
//             <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Death Date</th>
//             <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Death Certificate</th>
//             <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Min Donate Amount</th>
//             <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Transaction ID</th>
//             <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Donated Amount</th>
//             <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Screenshot</th>
//             <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="p-2 text-center border">1</td>
//             <td className="p-2 text-center border">1234</td>
//             <td className="p-2 text-center border">John Doe</td>
//             <td className="p-2 text-center border">01-01-2022</td>
//             <td className="p-2 text-center border">
//               <a href="#" className="text-blue-500 underline">View</a>
//             </td>
//             <td className="p-2 text-center border">$500</td>
//             <td className="p-2 text-center border">
//                 <input type="text" placeholder='transaction no' className="border p-1" />
//             </td>
//             <td className="p-2 text-center border">
//                 <input type="text" placeholder='donated amount' className="border p-1"/>
//             </td>
//             <td className="p-2 text-center border">
//                 <input type="file" className="border p-1"/>
//             </td>
//             <td className="p-2 text-center border">
//               <button className="bg-green-500 text-white px-4 py-2 rounded">Approve</button>
//             </td>
//           </tr>
//           {/* Add more rows as needed */}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Page;






