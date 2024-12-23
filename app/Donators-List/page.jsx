'use client'
import DownloadCSVButton from '@/components/DataConverters/DownloadCSVButton';
import DownloadPDFButton from '@/components/DataConverters/DownloadPDFButton';
import useSortableData from '@/components/DonationManagement/Hooks/useSortableData';
import Pagination from '@/components/Member/Pagination';
// import Pagination from '@/user_component/Pagination/Pagination';
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
  const[state,setState]=useState([]);
  const[district,setDistrict]=useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setitemsPerPage] = useState(2);
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    searchText:''
});

const [page,setPage]=useState(1);
const [totalPages,setTotalPages]=useState(1);

const handleFilterInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
};





  async function getData(lim,page=1){
    console.log(lim,page);
    try{
      const response = await fetch(`https://backend.aggrabandhuss.org/api/donation?limit=${lim}&&page=${page}`);
      if(!response){
        throw new Error('Network Error')
      }
      
      const data=await response.json();
      console.log(data);
      setPage(data.currentPage);
      setTotalPages(data.totalpages)
      setDonators(data.data);
      setState([...new Set(data.data.map(item => item.Member.state))]);

      // Extract unique districts
      setDistrict([...new Set(data.data.map(item => item.Member.district))])
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

  function ExportData(data){

    return data.map((item)=>{
      return {
        name:item.Member.name,
        email:item.Member.email,
        state:item.Member.state,
        district:item.Member.district,
        donationDate:new Date(item.donation_date).toLocaleDateString('en-GB'),  
        transactionId:item.transaction_id,
        status:item.status,
        Amount:item.amount
      }
    })
    // return data;
  }

  useEffect(()=>{
    getData(100)
  },[])


  useEffect(()=>{
    console.log(filters);
  },[filters])


  const datafilter = sortedData.filter((donator) => {
    const stateMatch = filters.state ? donator.Member.state.toLowerCase().includes(filters.state.toLowerCase()) : true;
    const districtMatch = filters.district ? donator.Member.district.toLowerCase().includes(filters.district.toLowerCase()) : true;
    const searchTextMatch = filters.searchText ? JSON.stringify(donator).toLowerCase().includes(filters.searchText.toLowerCase()) : true;
  
    return stateMatch && districtMatch && searchTextMatch;
  });


  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = datafilter.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems=datafilter;
  // const totalPages = Math.ceil(datafilter.length / itemsPerPage);

  if(donators.length==0){
    <p>Loading...</p>
  }
  
  return (
    <div className="p-5">
      
      <h2 className="text-3xl text-center font-bold mb-4 bg-blue-500 text-white">Donators List</h2>
    <div className="flex justify-between items-center my-4">
  <div>
    <DownloadCSVButton data={ExportData(sortedData)} />
    <DownloadPDFButton data={ExportData(sortedData)} />
  </div>

  <div className="flex justify-end items-center gap-4">
    {/* State filter */}
    <div>
      <label className="block text-sm font-medium">State</label>
      <select
        name="state"
        value={filters.state}
        onChange={handleFilterInputChange}
        className="border rounded px-2 py-1 w-[200px]"
      >
        <option value="">All</option>
        {state.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>

    {/* District filter */}
    <div>
      <label className="block text-sm font-medium">District</label>
      <select
        name="district"
        value={filters.district}
        onChange={handleFilterInputChange}
        className="border rounded px-2 py-1 w-[200px]"
      >
        <option value="">All</option>
        {district.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>

    {/* Search input */}
    <div>
    <label className="block text-sm font-medium">Search</label>
    <input
      className="border p-1"
      placeholder="Search..."
      type="text"
      name='searchText'
      value={filters.searchText}
      onChange={handleFilterInputChange}
    />
    </div>
    
  </div>
</div>
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
        {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        handleItemPerChange={handleItemPerChange}
        membersLength={currentItems.length}
      /> */}
      <Pagination
      page={page} 
      totalPages={totalPages} 
        fetchMembers={getData} 
       />
    </div>
  );
};

export default Page;
