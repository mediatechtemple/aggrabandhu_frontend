'use client'
import React, { useEffect, useState } from 'react';

const Member_List = () => {
  const [memberList, setmemberList] = useState([]);

  useEffect(() => {
    // Fetching data from the API
    fetch('https://backend.aggrabandhuss.org/api/member')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setmemberList(data.data);
      })
      .catch((error) => {
        console.error('Error fetching memberList data:', error);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white text-center" >Member List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Member ID</th>
            <th className="py-2 px-4 border bg-blue-500 text-white">Photo</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Name</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Profession</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Address</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Joining Date</th>
          </tr>
        </thead>
        <tbody>
          {memberList.map((donation) => (
            <tr key={donation.id} className="text-center">
                <td className="py-2 px-4 border">{donation.id}</td>
              <td className="py-2 px-4 border">
                <img
                  src={`https://backend.aggrabandhuss.org${donation.profileUrl}`}
                  alt="Transaction"
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 border">{donation.name}</td>
              <td className="py-2 px-4 border">₹{donation.profession}</td>
              <td className="py-2 px-4 border">
                {new Date(donation.address).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">
                {new Date(donation.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Member_List;
