'use client'
import Pagination from '@/components/Member/Pagination';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const My_Donation = () => {
  const [memberList, setmemberList] = useState([]);
  const [page,setPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1);

  async function getData(lim,page=1){
    let id=JSON.parse(localStorage.getItem('user')).userid;
    console.log(id);
    try{
      const response = await fetch(`https://backend.aggrabandhuss.org/api/donation/mydonation/${id}?limit=${lim}&&page=${page}`);
      if(!response){
        throw new Error('Network Error')
      }
      
      const data=await response.json();
      console.log(data);
      setmemberList(data.data);
      setPage(data.currentPage);
      setTotalPages(data.totalPages)

    }catch(error){
      
    }
  }

  useEffect(() => {
    // let id=JSON.parse(localStorage.getItem('user')).userid;
    // console.log(id);
    getData();
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
                <td >
                  <div className="flex justify-center items-center">
                  <Link
                    href="https://wa.me/7830305040" // Replace with your WhatsApp number
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-600"
                  >
                    <FaWhatsapp size={48} />
                  </Link>
                  </div>
                </td>
              )}

            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
      page={page} 
      totalPages={totalPages} 
        fetchMembers={getData} 
       />
    </div>
    
  );
};

export default My_Donation;
