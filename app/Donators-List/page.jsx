'use client'
import useSortableData from '@/components/DonationManagement/Hooks/useSortableData';
import Pagination from '@/user_component/Pagination/Pagination';
import React, { useEffect, useState } from 'react';
const headers = [
  { key: "id", label: "ID" },
  { key: "name", label: "Member Name" },
  { key: "email", label: "Email" },
  { key: "amount", label: "Amount" },
  { key: "donation_date", label: "Donation Date" },
  { key: "transaction_id", label: "Transaction ID" },
  { key: "status", label: "Status" },
  { key: "state", label: "State" },
  { key: "district", label: "District" }
];

const Page =  () => {
  const [donators,setDonators]=useState([]);
  const { items: sortedData, requestSort, getSortIcon } = useSortableData(donators);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setitemsPerPage] = useState(2);

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemPerChange = (pageNumber) => {
    setCurrentPage(1)
    setitemsPerPage(pageNumber);
  };

  useEffect(()=>{
    getData()
  },[])


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

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
            {headers.map((header) => (
              <th
                key={header.key}
                onClick={() => requestSort(header.key)}
                 className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2 cursor-pointer"
              >
                {header.label}{getSortIcon(header.key)}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
            {currentItems.map((donator) => (
              <tr key={donator.id}>
                <td className="py-2 px-4 border border-spacing-1">{donator.id}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.Member.name}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.Member.email || 'N/A'}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.amount}</td>
                <td className="py-2 px-4 border border-spacing-1">{new Date(donator.donation_date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.transaction_id}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.status}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.Member.state}</td>
                <td className="py-2 px-4 border border-spacing-1">{donator.Member.district}</td>
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
        membersLength={currentItems.length}
      />
    </div>
  );
};

export default Page;
