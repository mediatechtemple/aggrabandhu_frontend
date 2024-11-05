// Page.js
'use client';
import React, { useState } from 'react';
import useSortableData from './hooks/useSortableData';
import useFetchMembers from './hooks/useFetchMembers';
import Pagination from '@/user_component/Pagination/Pagination';

const Refral_Report = () => {
  const { data: members, loading, error } = useFetchMembers('https://backend.aggrabandhuss.org/api/member/referall');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setitemsPerPage] = useState(50);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { items: sortedMembers, requestSort, getSortIcon } = useSortableData(members);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemPerChange = (pageNumber) => {
    setitemsPerPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page on new search
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Column configuration
  const columns = [
    { key: 'SNo', label: 'S.No' },
    { key: 'id', label: 'Member Id' },
    { key: 'reference_id', label: 'Reference Id' },
    { key: 'name', label: 'Member Name' },
    { key: 'mobile_no', label: 'Phone No' },
    { key: 'address', label: 'Address' },
    { key: 'referCount', label: 'Total Referred' },
  ];

  return (
    <>
      <h1 className="text-center text-2xl text-white mb-5 bg-blue-500">Referral Reports</h1>

      {/* Search Input */}
      <div className="mb-4 flex justify-end">
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
                <td className="p-2 text-center border">{item.id}</td>
                <td className="p-2 text-center border">{item.reference_id}</td>
                <td className="p-2 text-center border">{item.name}</td>
                <td className="p-2 text-center border">{item.mobile_no}</td>
                <td className="p-2 text-center border">{item.address}</td>
                <td className="p-2 text-center border">{item.referCount}</td>
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
    </>
  );
};

export default Refral_Report;
