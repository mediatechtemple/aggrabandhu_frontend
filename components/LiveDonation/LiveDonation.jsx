'use client'
import React, { useEffect, useState } from 'react';

const LiveDonation = () => {
  const [donationData, setDonationData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [transactionNos, setTransactionNos] = useState({}); // State for Transaction No inputs
  const [donatedAmounts, setDonatedAmounts] = useState({}); // State for Donated Amount inputs
  const [screenshots, setScreenshots] = useState({}); // State for Screenshot inputs

  useEffect(() => {
    // Function to fetch data from the API
    const fetchDonationData = async () => {
      try {
        const response = await fetch('https://backend.aggrabandhuss.org/api/donationreceive/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json(); // Parse the response JSON
        console.log(data.data);
        setDonationData(data.data); // Store the data in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message); // Handle and store the error
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchDonationData(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs only on mount















  const handleInputChange = (index, field, value) => {
    // Update the state based on the input field changed
    if (field === 'transactionNo') {
      setTransactionNos(prev => ({ ...prev, [index]: value }));
    } else if (field === 'donatedAmount') {
      setDonatedAmounts(prev => ({ ...prev, [index]: value }));
    } else if (field === 'screenshot') {
      setScreenshots(prev => ({ ...prev, [index]: value }));
    }
  };




  const handleSubmit = async (index) => {
    // Gather all data from the row including the fetched data and inputs
    const transactionNo = transactionNos[index];
    const donatedAmount = donatedAmounts[index];
    const screenshot = screenshots[index];

    // Fetch current row data
    const currentDonation = donationData[index];

    // Prepare data to post
    const dataToPost = {
      member_id: currentDonation.member_id,
      member_name: currentDonation.Member.name || 'N/A',
      death_date: new Date(currentDonation.donation_date).toLocaleDateString() || 'N/A',
      death_certificate: currentDonation.transaction_file,
      min_donate_amount: currentDonation.min_donate_amount || 'N/A',
      transaction_no: transactionNo,
      donated_amount: donatedAmount,
      screenshot: screenshot ? screenshot.name : null, // Assuming you want the file name
    };

    try {
      const response = await fetch('https://backend.aggrabandhuss.org/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPost), // Send the data as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to post data');
      }

      const result = await response.json(); // Parse the response JSON
      console.log('Success:', result); // Log the result on success
    } catch (error) {
      console.error('Error posting data:', error); // Handle errors
    }
  };

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
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Transaction ID</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Donated Amount</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Screenshot</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {donationData.map((donation, index) => (
            <tr key={donation.id}> {/* Use a unique key for each row */}
              <td className="p-2 text-center border">{index + 1}</td> {/* Serial number */}
              <td className="p-2 text-center border">{donation.member_id}</td>
              <td className="p-2 text-center border">{donation.Member.name || 'N/A'}</td> {/* Member Name */}
              <td className="p-2 text-center border">{new Date(donation.donation_date).toLocaleDateString() || 'N/A'}</td> {/* Death Date */}
              <td className="p-2 text-center border">
                <a href={donation.transaction_file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a> {/* Death Certificate */}
              </td>
              <td className="p-2 text-center border">Ashoka</td>

              <td className="p-2 text-center border">${donation.min_donate_amount || 'N/A'}</td> {/* Min Donate Amount */}
              <td className="p-2 text-center border">
                <input 
                  type="text" 
                  placeholder='Transaction No' 
                  className="border p-1" 
                  value={transactionNos[index] || ''} 
                  onChange={(e) => handleInputChange(index, 'transactionNo', e.target.value)} 
                />
              </td>
              <td className="p-2 text-center border">
                <input 
                  type="text" 
                  placeholder='Donated Amount' 
                  className="border p-1" 
                  value={donatedAmounts[index] || ''} 
                  onChange={(e) => handleInputChange(index, 'donatedAmount', e.target.value)} 
                />
              </td>
              <td className="p-2 text-center border">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleInputChange(index, 'screenshot', e.target.files[0])} 
                />
              </td>
              <td className="p-2 text-center border">
                <button 
                  className="bg-green-500 text-white px-4 py-2 rounded" 
                  onClick={() => handleSubmit(index)} 
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    </>
  );
};

export default LiveDonation;


































































































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






