'use client'
import React, { useEffect, useState } from 'react';

const Page =  () => {
  const [donators,setDonators]=useState([]);
  async function getData(){
    try{
      const response = await fetch('https://backend.aggrabandhuss.org/api/donation/');
      if(!response){
        throw new Error('Network Error')
      }
      
      const data=await response.json();
      console.log(data);
      setDonators(data.data);
    }catch(error){
      
    }
  }

  useEffect(()=>{
    getData()
  },[])

  if(donators.length==0){
    <p>Loading...</p>
  }
  
  return (
    <div className="p-5">
      <h2 className="text-3xl text-center font-bold mb-4 bg-blue-500 text-white">Donators List</h2>
      {/* Container with horizontal and vertical scroll */}
      <div className="overflow-x-auto overflow-y-auto max-h-[80vh]">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-spacing-1 bg-blue-500 text-white">ID</th>
              <th className="py-2 px-4 border border-spacing-1 bg-blue-500 text-white">Member Name</th>
              <th className="py-2 px-4 border border-spacing-1 bg-blue-500 text-white">Email</th>
              <th className="py-2 px-4 border border-spacing-1 bg-blue-500 text-white">Amount</th>
              <th className="py-2 px-4 border border-spacing-1 bg-blue-500 text-white">Donation Date</th>
              <th className="py-2 px-4 border border-spacing-1 bg-blue-500 text-white">Transaction ID</th>
              {/* <th className="py-2 px-4 border border-spacing-1 bg-blue-500 text-white">Payment Method</th> */}
              <th className="py-2 px-4 border border-spacing-1 bg-blue-500 text-white">Status</th>
              <th className="py-2 px-4 border border-spacing-1 bg-blue-500 text-white">State</th>
              <th className="py-2 px-4 border border-spacing-1 bg-blue-500 text-white">District</th>
            </tr>
          </thead>
          <tbody>
            {donators.map((donator) => (
              <tr key={donator.id}>
                <td className="py-2 px-4 border border-spacing-1">{donator.id}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.Member.name}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.Member.email || 'N/A'}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.amount}</td>
                <td className="py-2 px-4 border border-spacing-1">{new Date(donator.donation_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.transaction_id}</td>
                {/* <td className="py-2 px-4 border border-spacing-1">{donator.payment_method}</td> */}
                <td className="py-2 px-4 border border-spacing-1">{donator.status}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.Member.state}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.Member.district}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
