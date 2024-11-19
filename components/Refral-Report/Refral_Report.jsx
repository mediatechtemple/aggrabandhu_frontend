// Page.js
'use client';
import React, { useEffect, useState } from 'react';
import useSortableData from './hooks/useSortableData';
import useFetchMembers from './hooks/useFetchMembers';
import Pagination from '@/user_component/Pagination/Pagination';
import DownloadCSVButton from '../DataConverters/DownloadCSVButton';
import DownloadPDFButton from '../DataConverters/DownloadPDFButton';
import Image from 'next/image';
import ReferredDialog from './ReferalPopup/ReferredDialog';

const Refral_Report = () => {
  const [token,setToken]=useState(null);
  const { data: members, loading, error,downloadData1 } = useFetchMembers('https://backend.aggrabandhuss.org/api/member/referall',token);
  const[referDialog,setReferDialog]=useState(false);
  const[referDialogId,setReferDialogId]=useState(false);
  const[referDialogName,setReferDialogName]=useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setitemsPerPage] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { items: sortedMembers, requestSort, getSortIcon } = useSortableData(members);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemPerChange = (pageNumber) => {
    setCurrentPage(1)
    setitemsPerPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const referDialogOpneHandler = (id,name) => {
    setReferDialog(true);
    setReferDialogId(id);
    setReferDialogName(name);
  };

  const referDialogCloseHandler = (id) => {
    setReferDialog(false);
  };





  // Filter members based on the search term
  const filteredMembers = sortedMembers.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic with filtered results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  useEffect(()=>{
    setToken(JSON.parse( localStorage.getItem('user')).token);
  },[]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Column configuration
  const columns = [
    { key: 'SNo', label: 'S.No' },
    { key: 'id', label: 'Member Id' },
    { key: 'referFrom', label: 'Referred Member' },
    { key: 'referFrom', label: 'Referred Name' },
     { key: 'referFrom', label: 'Referred Photo' },
    // { key: 'reference_id', label: 'Reference Id' },
    { key: 'name', label: 'Member Name' },
    { key: 'Member Photo', label: 'Member Photo' },
    { key: 'father_name', label: 'Father Name' },
    { key: 'mobile_no', label: 'Phone No' },
    { key: 'address', label: 'Address' },
    { key: 'referCount', label: 'Total Referred' },
  ];

  return (
    <>
    {/* <div className="flex space-x-4 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded p-2"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded p-2"
          placeholder="End Date"
        />
      </div> */}
      <h1 className="text-center text-2xl text-white mb-5 bg-blue-500">Referral Reports</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-between">
      <div>
      <DownloadCSVButton data={downloadData1} filename="my_data.csv" />
      <DownloadPDFButton data={downloadData1} filename="table_data.pdf" />
    </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-60 p-2 border border-gray-300 rounded mb-4"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  className="p-2 bg-customBlue border text-white cursor-pointer"
                  onClick={() => requestSort(key)}
                >
                  <span>{label}</span>
                  <span className="m-1 w-6 inline-block text-center">{getSortIcon(key)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 text-center border">{index + 1 + indexOfFirstItem}</td>
                <td className="p-2 text-center border">{item.reference_id}</td>
                <td className="p-2 text-center border">{item.referFrom}</td>
                <td className="p-2 text-center border">{item.refer_name}</td>
                <td className="p-2 text-center border">
                 { item.refer_profileUrl && <Image src={`https://backend.aggrabandhuss.org${item.refer_profileUrl}`} width={60} height={60} />
               } </td>
                {/* <td className="p-2 text-center border">{item.reference_id}</td> */}
                <td className="p-2 text-center border">{item.name}</td>
                <td className="p-2 text-center border">
                 { item.profileUrl && <Image src={`https://backend.aggrabandhuss.org${item.profileUrl}`} width={60} height={60} />
               } </td>
                <td className="p-2 text-center border">{item.father_name}</td>
                <td className="p-2 text-center border">{item.mobile_no}</td>
                <td className="p-2 text-center border">{item.address}</td>
                <td onClick={() => referDialogOpneHandler(item.id,item.name)} className="p-2 text-center border">
                <button className="bg-blue-500
                 text-white font-semibold py-1 px-3 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                  {item.referCount}
                </button>
              </td>
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
        membersLength={members.length}
      />

      {referDialog && <ReferredDialog id={referDialogId}
       referDialogCloseHandler={referDialogCloseHandler} 
       referDialogName={referDialogName}
       />}
    </>
  );
};

export default Refral_Report;
