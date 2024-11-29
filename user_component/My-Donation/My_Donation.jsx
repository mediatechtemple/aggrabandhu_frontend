'use client'
import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const My_Donation = () => {
  const [memberList, setmemberList] = useState([]);

  async function getData(id){
    try{
      const response = await fetch(`https://backend.aggrabandhuss.org/api/donation/mydonation/${id}`);
      if(!response){
        throw new Error('Network Error')
      }
      
      const data=await response.json();
      console.log(data);
      setmemberList(data.data);
    }catch(error){
      
    }
  }

  useEffect(() => {
    let id=JSON.parse(localStorage.getItem('user')).userid;
    console.log(id);
    getData(id);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white text-center" >My Donation</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Member ID</th>
            <th className="py-2 px-4 border bg-blue-500 text-white">Photo</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Name</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Amount</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Status</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Address</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Date</th>
            <th className="py-2 px-4 border  bg-blue-500 text-white">Support</th>
          </tr>
        </thead>
        <tbody>
          {memberList.map((donation) => (
            <tr key={donation.id} className="text-center">
                <td className="py-2 px-4 border">{donation.to.reference_id}</td>
              <td className="py-2 px-4 border">
                <img
                  src={`https://backend.aggrabandhuss.org${donation.to.profileUrl}`}
                  alt="Transaction"
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 border">{donation.to.name}</td>
              <td className="py-2 px-4 border">₹{donation.amount}</td>
              <td className={`py-2 px-4 border ${donation.status==='Rejected'? 'text-red-500' :'text-green-500'}`}>{donation.status}</td>
              
              <td className="py-2 px-4 border">
                {donation.to.state}-{donation.to.district}
              </td>
              <td className="py-2 px-4 border">
                {new Date(donation.createdAt).toLocaleDateString()}
              </td>
              {donation.status === 'Rejected' && (
                <td className="py-2 px-4 border ">
                  <div className='flex justify-center items-center'>
                  <FaWhatsapp
                    className="text-green-500 text-2xl cursor-pointer hover:text-green-600 transition-all duration-300" 
                    onClick={() => window.open(`https://wa.me/?text=Your+custom+message+here`)} 
                  />
                  </div>
                </td>
              )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default My_Donation;
