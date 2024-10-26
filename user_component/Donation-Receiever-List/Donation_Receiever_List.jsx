'use client'
import React, { useEffect, useState } from 'react';

const Donation_Receiever_List = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetching data from the API
    fetch('https://backend.aggrabandhuss.org/api/donationreceive/endlist')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDonations(data.data);
      })
      .catch((error) => {
        console.error('Error fetching donations data:', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white text-center" >Donations Receiver</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Member ID</th>
            <th className="py-2 px-4 border bg-blue-500 text-white">Photo</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Name</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Amount</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Death Date</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Address</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id} className="text-center">
                <td className="py-2 px-4 border">{donation.member_id}</td>
              <td className="py-2 px-4 border">
                <img
                  src={`https://backend.aggrabandhuss.org${donation.file}`}
                  alt="Transaction"
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 border">{donation.Member.name}</td>
              <td className="py-2 px-4 border">₹{donation.total_donation_received}</td>
              <td className="py-2 px-4 border">
                {new Date(donation.death_date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">
                {donation.Member.district}, {donation.Member.state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Donation_Receiever_List;
